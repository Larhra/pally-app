// src/pages/GetStarted.jsx
import { Link } from 'react-router-dom'
import '../styles/GetStarted.css'

function GetStarted() {
  return (
    <div className="get-started-container">
      <div className="get-started-content">
        <img 
          src="/images/pally-logo.jpeg" 
          alt="PALLY - send money with ease" 
          className="get-started-logo"
        />
        
        <h1 className="get-started-title">Welcome to PALLY</h1>
        
        <p className="get-started-description">
          The easiest way to send and receive money with friends and family, all with zero fees.
        </p>
        
        <div className="get-started-features">
          <div className="feature-item">
            <div className="feature-icon">💸</div>
            <div className="feature-text">Send money instantly</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <div className="feature-text">Secure transactions</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🌍</div>
            <div className="feature-text">International transfers</div>
          </div>
        </div>
        
        <div className="get-started-buttons">
          <Link to="/signup" className="button primary">Create Account</Link>
          <Link to="/login" className="button secondary">I already have an account</Link>
        </div>
      </div>
    </div>
  )
}

export default GetStarted