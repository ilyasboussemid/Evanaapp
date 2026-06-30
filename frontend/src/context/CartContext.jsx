import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('evana-cart')
    return saved ? JSON.parse(saved) : []
  })

  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    localStorage.setItem('evana-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    const cartKey = `${product.id}-${product.selectedSize || 'none'}-${product.selectedColor || 'none'}`
    const maxStock = product.selectedSizeStock || product.stock || 99

    setCartItems(prev => {
      const existing = prev.find(item => item.cartKey === cartKey)
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, maxStock)
        if (newQty === existing.quantity) return prev
        return prev.map(item =>
          item.cartKey === cartKey
            ? { ...item, quantity: newQty }
            : item
        )
      }
      return [...prev, { ...product, cartKey, quantity: Math.min(quantity, maxStock), maxStock }]
    })
  }

  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(item => item.cartKey !== cartKey))
  }

  const updateQuantity = (cartKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartKey)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartKey === cartKey ? { ...item, quantity: Math.min(quantity, item.maxStock || 99) } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    lastOrder,
    setLastOrder
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
