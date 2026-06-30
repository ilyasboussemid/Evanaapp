import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../services/api.js'

function AdminDashboard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({ name: '', description: '', shortDescription: '', price: '', category: '', imageUrl: '', stock: '' })

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
    setForm({ name: '', description: '', shortDescription: '', price: '', category: '', imageUrl: '', stock: '' })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name, description: product.description, shortDescription: product.shortDescription || '',
      price: product.price.toString(), category: product.category, imageUrl: product.imageUrl || '', stock: product.stock.toString()
    })
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
    const productData = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }
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
