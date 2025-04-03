// src/pages/Profile.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Profile.css'

function Profile() {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
  })
  const navigate = useNavigate()

  const handleLogout = () => {
    // In a real app, you would call your logout API
    navigate('/')
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Link to="/dashboard" className="back-button">←</Link>
        <h1>Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-avatar">
          <span className="avatar-text">AJ</span>
        </div>
        <h1 className="profile-name">{user.name}</h1>

        <div className="profile-card">
          <h2 className="section-title">Account Information</h2>

          <div className="info-item">
            <p className="info-label">Email</p>
            <p className="info-value">{user.email}</p>
          </div>

          <div className="info-item">
            <p className="info-label">Phone</p>
            <p className="info-value">{user.phone}</p>
          </div>
        </div>

        <div className="profile-card">
          <h2 className="section-title">Settings</h2>

          <div className="settings-item">
            <p>Notifications</p>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <p>Face ID / Touch ID</p>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <p>Dark Mode</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
}

export default Profile