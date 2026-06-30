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

export default api
