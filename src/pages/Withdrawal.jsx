"use client"

import { useState, useEffect } from "react"
import { ChevronUp, Menu } from 'lucide-react'
import { Link } from "react-router-dom"
import "../styles/Withdrawal.css"
import { supabase } from "../lib/supabase"

function Withdrawal() {
  const [amount, setAmount] = useState("0.00")
  const [address, setAddress] = useState("")
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions() {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('type', 'withdrawal')
        .order('created_at', { ascending: false })
        
      if (error) {
        console.error('Error fetching withdrawals:', error)
        return
      }
      
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

  async function handleWithdraw() {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    
    if (!address) {
      alert('Please enter an address')
      return
    }
    
    setIsWithdrawing(true)
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          amount: parseFloat(amount),
          address: address,
          type: 'withdrawal',
          sender: 'You',
          created_at: new Date().toISOString(),
          read: false
        }])
        
      if (error) throw error
      
      setAmount('0.00')
      setAddress('')
      
      alert('Withdrawal initiated successfully!')
      
      fetchTransactions()
    } catch (err) {
      console.error('Error processing withdrawal:', err)
      alert('Failed to process withdrawal. Please try again.')
    } finally {
      setIsWithdrawing(false)
    }
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
    <div className="withdrawal-container">
      <header className="withdrawal-header">
        <div className="logo">
          <span className="logo-text">PALLY</span>
        </div>
        <button className="menu-button">
          <Menu size={24} />
        </button>
      </header>

      <div className="withdrawal-content">
        <h1 className="withdrawal-title">Send custom payment transfers anytime, anywhere.</h1>

        <div className="action-buttons">
          <Link to="/dashboard">
            <button className="action-button">Deposit</button>
          </Link>
          <button className="action-button active">Withdrawal</button>
          <Link to="/timelock">
            <button className="action-button">Timelock</button>
          </Link>
          <button className="action-button more">···</button>
        </div>

        <div className="withdrawal-card slide-up">
          <div className="card-section amount-section">
            <div className="amount-label">Amount to top up</div>
            <div className="amount-input-container">
              <input type="text" className="amount-input" value={amount} onChange={handleAmountChange} />
              <button className="token-button transition-all hover-brightness">Token</button>
            </div>
          </div>

          <div className="card-divider">
            <div className="arrow-up">
              <ChevronUp size={20} />
            </div>
          </div>

          <div className="card-section address-section">
            <div className="frame-label">Frame 31</div>
            <input
              type="text"
              className="address-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your address"
            />
          </div>

          <button 
            className="withdraw-button transition-all hover-brightness" 
            onClick={handleWithdraw}
            disabled={isWithdrawing}
          >
            {isWithdrawing ? 'Processing...' : 'Withdraw'}
          </button>
        </div>

        <div className="notifications-section">
          {isLoading ? (
            <div className="loading">Loading withdrawals...</div>
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
                <div className="no-notifications">No withdrawals yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Withdrawal