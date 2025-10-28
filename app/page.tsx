'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    price: 29.99,
    category: 'Tops',
    image: '👕',
    description: 'Comfortable cotton t-shirt, perfect for everyday wear'
  },
  {
    id: 2,
    name: 'Slim Fit Jeans',
    price: 79.99,
    category: 'Bottoms',
    image: '👖',
    description: 'Modern slim fit denim jeans with stretch'
  },
  {
    id: 3,
    name: 'Summer Dress',
    price: 59.99,
    category: 'Dresses',
    image: '👗',
    description: 'Flowy summer dress in vibrant colors'
  },
  {
    id: 4,
    name: 'Leather Jacket',
    price: 199.99,
    category: 'Outerwear',
    image: '🧥',
    description: 'Premium leather jacket for all seasons'
  },
  {
    id: 5,
    name: 'Casual Sneakers',
    price: 89.99,
    category: 'Footwear',
    image: '👟',
    description: 'Comfortable sneakers for everyday activities'
  },
  {
    id: 6,
    name: 'Wool Sweater',
    price: 69.99,
    category: 'Tops',
    image: '🧶',
    description: 'Cozy wool sweater for cold weather'
  },
  {
    id: 7,
    name: 'Designer Handbag',
    price: 149.99,
    category: 'Accessories',
    image: '👜',
    description: 'Elegant handbag with multiple compartments'
  },
  {
    id: 8,
    name: 'Baseball Cap',
    price: 24.99,
    category: 'Accessories',
    image: '🧢',
    description: 'Adjustable baseball cap in various colors'
  },
]

export default function Home() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [showCart, setShowCart] = useState(false)

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>Fashion Store</h1>
          <button
            className={styles.cartButton}
            onClick={() => setShowCart(!showCart)}
          >
            🛒 Cart ({cartItemCount})
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Welcome to Our Clothing Store</h2>
          <p>Discover the latest trends in fashion</p>
        </section>

        <div className={styles.filterBar}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                selectedCategory === category ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>{product.image}</div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.productFooter}>
                <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
                <button
                  className={styles.addToCartButton}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showCart && (
        <div className={styles.cartOverlay} onClick={() => setShowCart(false)}>
          <div className={styles.cartPanel} onClick={e => e.stopPropagation()}>
            <div className={styles.cartHeader}>
              <h2>Shopping Cart</h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.cartContent}>
              {cart.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.product.id} className={styles.cartItem}>
                      <div className={styles.cartItemImage}>
                        {item.product.image}
                      </div>
                      <div className={styles.cartItemDetails}>
                        <h4>{item.product.name}</h4>
                        <p>${item.product.price.toFixed(2)}</p>
                      </div>
                      <div className={styles.cartItemQuantity}>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className={styles.cartTotal}>
                    <h3>Total: ${cartTotal.toFixed(2)}</h3>
                    <button className={styles.checkoutButton}>
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>&copy; 2025 Fashion Store. All rights reserved.</p>
      </footer>
    </div>
  )
}
