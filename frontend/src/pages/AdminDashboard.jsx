import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../services/api.js'

function AdminDashboard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({ name: '', description: '', shortDescription: '', price: '', category: '', imageUrl: '', stock: '', onSale: false, salePrice: '', discountPercent: '' })
  const [sizesForm, setSizesForm] = useState([{ size: '', stock: '' }])
  const [colorsForm, setColorsForm] = useState([{ name: '', hexCode: '' }])

  useEffect(() => {
    const admin = localStorage.getItem('evana-admin')
    if (!admin) { navigate('/admin'); return }
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    setLoading(true)
    adminService.getProducts()
      .then(res => { setProducts(Array.isArray(res.data) ? res.data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  const handleLogout = () => {
    localStorage.removeItem('evana-admin')
    navigate('/admin')
  }

  const resetForm = () => {
    setForm({ name: '', description: '', shortDescription: '', price: '', category: '', imageUrl: '', stock: '', onSale: false, salePrice: '', discountPercent: '' })
    setSizesForm([{ size: '', stock: '' }])
    setColorsForm([{ name: '', hexCode: '' }])
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name, description: product.description, shortDescription: product.shortDescription || '',
      price: product.price.toString(), category: product.category, imageUrl: product.imageUrl || '', stock: product.stock.toString(),
      onSale: product.onSale || false, salePrice: product.salePrice ? product.salePrice.toString() : '', discountPercent: product.discountPercent ? product.discountPercent.toString() : ''
    })
    setSizesForm(product.sizes && product.sizes.length > 0 ? product.sizes.map(s => ({ size: s.size, stock: s.stock.toString() })) : [{ size: '', stock: '' }])
    setColorsForm(product.colors && product.colors.length > 0 ? product.colors.map(c => ({ name: c.name, hexCode: c.hexCode, stock: c.stock ? c.stock.toString() : '0' })) : [{ name: '', hexCode: '', stock: '' }])
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return
    try {
      await adminService.deleteProduct(id)
      fetchProducts()
    } catch (err) { alert('Erreur lors de la suppression') }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const productData = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      onSale: form.onSale,
      salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
      discountPercent: form.discountPercent ? parseInt(form.discountPercent) : null,
      sizes: sizesForm.filter(s => s.size && s.stock).map(s => ({ size: s.size, stock: parseInt(s.stock) })),
      colors: colorsForm.filter(c => c.name && c.hexCode).map(c => ({ name: c.name, hexCode: c.hexCode, stock: parseInt(c.stock) || 0 }))
    }
    try {
      if (editingProduct) {
        await adminService.updateProduct(editingProduct.id, productData)
      } else {
        await adminService.createProduct(productData)
      }
      resetForm()
      fetchProducts()
    } catch (err) { alert('Erreur lors de la sauvegarde') }
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Dashboard Admin</h1>
          <p className="text-muted">Gestion des produits Evana</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true) }}>+ Ajouter un produit</button>
          <button className="btn btn-ghost" onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>{editingProduct ? 'Modifier le produit' : 'Nouveau produit'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Nom *</label>
                <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Catégorie *</label>
                <select className="select" style={{ width: '100%' }} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
                  <option value="">Sélectionner</option>
                  <option value="Chaussures Femmes">Chaussures Femmes</option>
                  <option value="Sacs Femmes">Sacs Femmes</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Description courte</label>
              <input className="input" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Description complète</label>
              <textarea className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" style={{ resize: 'vertical', minHeight: '80px' }} />
            </div>
            <div className="grid grid-3" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Prix (MAD) *</label>
                <input className="input" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Stock *</label>
                <input className="input" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>URL Image</label>
                <input className="input" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
              </div>
            </div>

            {/* Sale section */}
            <div className="card-flat" style={{ padding: '1rem', marginBottom: '1rem' }}>
              <label className="flex items-center gap-1" style={{ cursor: 'pointer', marginBottom: form.onSale ? '1rem' : 0 }}>
                <input type="checkbox" checked={form.onSale} onChange={(e) => setForm({ ...form, onSale: e.target.checked })} />
                <span className="text-sm" style={{ fontWeight: 600 }}>Produit en solde</span>
              </label>
              {form.onSale && (
                <div className="grid grid-2" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label>Prix soldé (MAD)</label>
                    <input className="input" type="number" step="0.01" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Réduction (%)</label>
                    <input className="input" type="number" value={form.discountPercent} onChange={(e) => setForm({ ...form, discountPercent: e.target.value })} placeholder="30" />
                  </div>
                </div>
              )}
            </div>

            {/* Sizes section */}
            <div className="card-flat" style={{ padding: '1rem', marginBottom: '1rem' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                <span className="text-sm" style={{ fontWeight: 600 }}>Pointures / Tailles</span>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSizesForm([...sizesForm, { size: '', stock: '' }])}>+ Ajouter</button>
              </div>
              {sizesForm.map((s, i) => (
                <div key={i} className="flex items-center gap-1" style={{ marginBottom: '0.5rem' }}>
                  <input className="input" placeholder="Taille (ex: 38)" value={s.size} onChange={(e) => { const n = [...sizesForm]; n[i].size = e.target.value; setSizesForm(n) }} style={{ flex: 1 }} />
                  <input className="input" type="number" placeholder="Stock" value={s.stock} onChange={(e) => { const n = [...sizesForm]; n[i].stock = e.target.value; setSizesForm(n) }} style={{ width: '100px' }} />
                  {sizesForm.length > 1 && <button type="button" onClick={() => setSizesForm(sizesForm.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: 'var(--status-error)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>}
                </div>
              ))}
            </div>

            {/* Colors section */}
            <div className="card-flat" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                <span className="text-sm" style={{ fontWeight: 600 }}>Couleurs disponibles</span>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setColorsForm([...colorsForm, { name: '', hexCode: '' }])}>+ Ajouter</button>
              </div>
              {colorsForm.map((c, i) => (
                <div key={i} className="flex items-center gap-1" style={{ marginBottom: '0.5rem' }}>
                  <input className="input" placeholder="Nom (ex: Noir)" value={c.name} onChange={(e) => { const n = [...colorsForm]; n[i].name = e.target.value; setColorsForm(n) }} style={{ flex: 1 }} />
                  <input className="input" type="color" value={c.hexCode || '#000000'} onChange={(e) => { const n = [...colorsForm]; n[i].hexCode = e.target.value; setColorsForm(n) }} style={{ width: '50px', padding: '0.3rem', height: '38px' }} />
                  <input className="input" type="number" placeholder="Stock" value={c.stock || ''} onChange={(e) => { const n = [...colorsForm]; n[i].stock = e.target.value; setColorsForm(n) }} style={{ width: '80px' }} />
                  {colorsForm.length > 1 && <button type="button" onClick={() => setColorsForm(colorsForm.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: 'var(--status-error)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button type="submit" className="btn btn-primary">{editingProduct ? 'Enregistrer' : 'Ajouter'}</button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      <div className="card-flat" style={{ padding: 0 }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <span className="text-sm text-muted">{products.length} produit{products.length > 1 ? 's' : ''}</span>
        </div>
        {loading ? (
          <div className="loader"><div style={{ textAlign: 'center' }}><div className="loader-spinner" /><p className="text-muted text-sm" style={{ marginTop: '1rem' }}>Chargement...</p></div></div>
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td><img src={product.imageUrl} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '8px' }} /></td>
                    <td style={{ fontWeight: 600 }}>{product.name}</td>
                    <td><span className="badge badge-sm">{product.category}</span></td>
                    <td style={{ fontWeight: 600, color: 'var(--accent)' }}>{product.price.toFixed(2)} MAD</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(product)}>Modifier</button>
                        <button className="btn btn-sm" style={{ background: 'var(--status-error-bg)', color: 'var(--status-error)' }} onClick={() => handleDelete(product.id)}>Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
