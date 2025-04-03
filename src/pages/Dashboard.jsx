"use client"

import { useState, useEffect } from "react"
import { X, Plus, Menu, ChevronUp } from 'lucide-react'
import { Link } from "react-router-dom"
import "../styles/Dashboard.css"
import { supabase } from "../lib/supabase"

function Dashboard() {
  const [amount, setAmount] = useState("0.00")
  const [recipients, setRecipients] = useState(["Alex", "Alex"])
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)

  // Fetch transactions when component mounts
  useEffect(() => {
    fetchTransactions()
  }, [])

  // Function to fetch transactions from Supabase
  async function fetchTransactions() {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        
      if (error) {
        console.error('Error fetching transactions:', error)
        return
      }
      
      // Transform the data into the format your component expects
      const formattedNotifications = data?.map(transaction => ({
        id: transaction.id,
        text: `${transaction.sender || 'Someone'} with ${transaction.amount} USDC payment request`,
        isNew: !transaction.read,
      })) || []
      
      setNotifications(formattedNotifications)
    } catch (err) {
      console.error('Error in fetchTransactions:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle sending money
  async function handleSendMoney() {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    
    if (recipients.length === 0) {
      alert('Please add at least one recipient')
      return
    }
    
    setIsSending(true)
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          amount: parseFloat(amount),
          recipients: recipients,
          sender: 'You', // Or get from user profile
          created_at: new Date().toISOString(),
          read: false
        }])
        
      if (error) throw error
      
      // Reset form
      setAmount('0.00')
      setRecipients([])
      
      // Show success message
      alert('Money sent successfully!')
      
      // Refresh transactions
      fetchTransactions()
    } catch (err) {
      console.error('Error sending money:', err)
      alert('Failed to send money. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const handleAddRecipient = () => {
    setRecipients([...recipients, "Alex"])
  }

  const handleRemoveRecipient = (index) => {
    const newRecipients = [...recipients]
    newRecipients.splice(index, 1)
    setRecipients(newRecipients)
  }

  const handleAmountChange = (e) => {
    // Only allow numbers and a single decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "")
    // Prevent multiple decimal points
    const parts = value.split(".")
    if (parts.length > 2) {
      return
    }
    setAmount(value)
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <span className="logo-text">PALLY</span>
        </div>
        <button className="menu-button">
          <Menu size={24} />
        </button>
      </header>

      <div className="dashboard-content">
        <h1 className="dashboard-title">Send custom payment transfers anytime, anywhere.</h1>

        <div className="action-buttons">
          <button className="action-button active">Deposit</button>
          <Link to="/withdrawal">
            <button className="action-button">Withdrawal</button>
          </Link>
          <Link to="/timelock">
            <button className="action-button">Timelock</button>
          </Link>
          <button className="action-button more">···</button>
        </div>

        <div className="transfer-card slide-up">
          <div className="card-section recipients-section">
            <label>Recipient(s)</label>
            <div className="recipients-list">
              {recipients.map((recipient, index) => (
                <div key={index} className="recipient-tag">
                  <span>{recipient}</span>
                  <button className="remove-recipient" onClick={() => handleRemoveRecipient(index)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button className="add-recipient" onClick={handleAddRecipient}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="card-divider">
            <div className="arrow-up">
              <ChevronUp size={20} />
            </div>
          </div>

          <div className="card-section amount-section">
            <div className="amount-label">You send:</div>
            <div className="amount-input-container">
              <input type="text" className="amount-input" value={amount} onChange={handleAmountChange} />
              <button className="token-button transition-all hover-brightness">Token</button>
            </div>
          </div>

          <button 
            className="send-button transition-all hover-brightness" 
            onClick={handleSendMoney}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>

        <div className="notifications-section">
          <h2 className="section-title">Notifications</h2>
          {isLoading ? (
            <div className="loading">Loading transactions...</div>
          ) : (
            <div className="notifications-list">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className="notification-item fade-in">
                    <div className="notification-text">
                      {notification.isNew && <span className="notification-dot"></span>}
                      {notification.text}
                    </div>
                    <button className="view-button transition-all hover-brightness">View</button>
                  </div>
                ))
              ) : (
                <div className="no-notifications">No transactions yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard