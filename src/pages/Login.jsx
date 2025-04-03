// src/pages/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful login after a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if email and password are valid (demo only)
      if (email === 'demo@pally.com' && password === 'password') {
        onLogin()
        navigate('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <Link to="/" className="back-button">←</Link>
        <h1>Login</h1>
      </div>
      
      <div className="auth-form-container">
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          
          <button 
            type="submit" 
            className="button primary full-width" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-alternate">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
      
      <div className="auth-footer">
        <p>For demo, use: demo@pally.com / password</p>
      </div>
    </div>
  )
}

export default Login