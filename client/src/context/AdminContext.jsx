import { createContext, useContext, useState, useCallback } from 'react'

const AdminContext = createContext(null)

const DEMO_PASSWORD = 'LetsGetRich'
const SESSION_KEY   = 'apex_admin_token'

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!sessionStorage.getItem(SESSION_KEY)
  )
  const [authError, setAuthError] = useState('')

  const login = useCallback(async (password) => {
    const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_API_URL

    if (DEMO_MODE) {
      if (password === DEMO_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'demo-token')
        setIsAuthenticated(true)
        setAuthError('')
        return true
      }
      setAuthError('Incorrect password.')
      return false
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        sessionStorage.setItem(SESSION_KEY, data.token)
        setIsAuthenticated(true)
        setAuthError('')
        return true
      }
      setAuthError(data.message || 'Incorrect password.')
      return false
    } catch {
      setAuthError('Server unavailable. Try demo mode.')
      return false
    }
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }, [])

  const getToken = useCallback(() => sessionStorage.getItem(SESSION_KEY), [])

  return (
    <AdminContext.Provider value={{ isAuthenticated, authError, login, logout, getToken }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
