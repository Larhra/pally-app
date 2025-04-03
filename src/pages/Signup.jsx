// src/pages/Signup.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

function Signup({ onSignup }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setIsLoading(true)
    
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful signup after a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onSignup()
      navigate('/dashboard')
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
        <h1>Create Account</h1>
      </div>
      
      <div className="auth-form-container">
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          
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
              minLength={8}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>
          
          <div className="terms-agreement">
            <p>By signing up, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></p>
          </div>
          
          <button 
            type="submit" 
            className="button primary full-width" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-alternate">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup