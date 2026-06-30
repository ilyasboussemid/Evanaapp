import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const productService = {
  getAll: (search = '', category = '') => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (category) params.append('category', category)
    return api.get(`/products?${params.toString()}`)
  },
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories')
}

export const orderService = {
  create: (orderData) => api.post('/orders', orderData),
  getById: (id) => api.get(`/orders/${id}`)
}

export const adminService = {
  login: (username, password) => api.post('/admin/login', { username, password }),
  getProducts: () => api.get('/admin/products'),
  createProduct: (product) => api.post('/admin/products', product),
  updateProduct: (id, product) => api.put(`/admin/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`)
}

export default api
