"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SplashScreen from "./components/SplashScreen"
import GetStarted from "./pages/GetStarted"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Withdrawal from "./pages/Withdrawal"
import Timelock from "./pages/Timelock"
import "./App.css"
import "./styles/animations.css" // Add this line
import "./styles/responsive.css" // Add this line

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/withdrawal" element={isAuthenticated ? <Withdrawal /> : <Navigate to="/login" />} />
        <Route path="/timelock" element={isAuthenticated ? <Timelock /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App