// src/components/SplashScreen.jsx
import { useState, useEffect } from 'react'
import '../styles/SplashScreen.css'

function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className={`splash-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <img 
          src="/images/pally-logo.jpeg" 
          alt="PALLY - send money with ease" 
          className="splash-logo"
        />
      </div>
    </div>
  )
}

export default SplashScreen