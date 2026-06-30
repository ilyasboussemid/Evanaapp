import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../services/api.js'

function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await adminService.login(form.username, form.password)
      if (res.data.success) {
        localStorage.setItem('evana-admin', JSON.stringify(res.data))
        navigate('/admin/dashboard')
      }
    } catch (err) {
      setError('Identifiants incorrects')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ paddingTop: '5rem', maxWidth: '440px' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', margin: '0 auto 1rem' }}>E</div>
          <h2>Administration</h2>
          <p className="text-muted text-sm">Connectez-vous pour gérer les produits</p>
        </div>
        {error && (
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--status-error-bg)', color: 'var(--status-error)', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Nom d'utilisateur</label>
            <input className="input" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="admin" required />
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Mot de passe</label>
            <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
