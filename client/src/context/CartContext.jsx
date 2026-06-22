import { createContext, useContext, useReducer, useEffect } from 'react'
import { getBestDiscount } from '../data/discounts'

const CartContext = createContext(null)

const STORAGE_KEY = 'apex_cart'

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.size === action.size
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id && i.size === action.size
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, size: action.size, quantity: action.quantity }],
      }
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.id && i.size === action.size)
        ),
      }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.id && i.size === action.size
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      }
    case 'SET_PROMO':
      return { ...state, promoCode: action.code }
    case 'CLEAR':
      return { items: [], promoCode: '' }
    case 'HYDRATE':
      return action.state
    default:
      return state
  }
}

const initialState = { items: [], promoCode: '' }

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialState
    } catch {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  )

  const discount = getBestDiscount(subtotal, state.promoCode)
  const discountAmount = discount ? (subtotal * discount.percent) / 100 : 0
  const total = subtotal - discountAmount

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  function addToCart(product, size, quantity = 1) {
    dispatch({ type: 'ADD', product, size, quantity })
  }
  function removeFromCart(id, size) {
    dispatch({ type: 'REMOVE', id, size })
  }
  function updateQuantity(id, size, quantity) {
    dispatch({ type: 'UPDATE_QTY', id, size, quantity })
  }
  function setPromoCode(code) {
    dispatch({ type: 'SET_PROMO', code })
  }
  function clearCart() {
    dispatch({ type: 'CLEAR' })
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        promoCode: state.promoCode,
        subtotal,
        discount,
        discountAmount,
        total,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        setPromoCode,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
