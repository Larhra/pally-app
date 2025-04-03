// src/pages/Timelock.jsx
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react'
import '../styles/Timelock.css'

function Timelock() {
  const [currentMonth, setCurrentMonth] = useState('September')
  const [currentYear, setCurrentYear] = useState('2024')
  const [selectedDate, setSelectedDate] = useState(2)
  const [timelockName, setTimelockName] = useState('')
  const [timelockNote, setTimelockNote] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [remindMe, setRemindMe] = useState(false)
  
  // Calendar data with markers
  const calendarDays = [
    { day: 31, month: 'prev' },
    { day: 30, month: 'prev' },
    { day: 1, month: 'current' },
    { day: 2, month: 'current', marker: 'primary' },
    { day: 3, month: 'current', marker: 'blue' },
    { day: 4, month: 'current' },
    { day: 5, month: 'current' },
    { day: 6, month: 'current' },
    { day: 7, month: 'current' },
    { day: 8, month: 'current' },
    { day: 9, month: 'current', marker: 'green' },
    { day: 10, month: 'current' },
    { day: 11, month: 'current' },
    { day: 12, month: 'current' },
    { day: 13, month: 'current', marker: 'blue' },
    { day: 14, month: 'current' },
    { day: 15, month: 'current', marker: 'green' },
    { day: 16, month: 'current' },
    { day: 17, month: 'current', marker: 'green' },
    { day: 18, month: 'current' },
    { day: 19, month: 'current' },
    { day: 20, month: 'current' },
    { day: 21, month: 'current' },
    { day: 22, month: 'current' },
    { day: 23, month: 'current' },
    { day: 24, month: 'current' },
    { day: 25, month: 'current' },
    { day: 26, month: 'current' },
    { day: 27, month: 'current' },
    { day: 28, month: 'current' },
    { day: 29, month: 'current' },
    { day: 30, month: 'current', marker: 'green' },
    { day: 31, month: 'current', marker: 'blue' },
    { day: 1, month: 'next' },
    { day: 2, month: 'next' },
  ]
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  const handlePrevMonth = () => {
    // In a real app, this would navigate to the previous month
    console.log('Navigate to previous month')
  }
  
  const handleNextMonth = () => {
    // In a real app, this would navigate to the next month
    console.log('Navigate to next month')
  }
  
  const handleDateSelect = (day) => {
    if (day.month === 'current') {
      setSelectedDate(day.day)
    }
  }
  
  const getMarkerClass = (marker) => {
    switch (marker) {
      case 'primary':
        return 'marker-primary'
      case 'blue':
        return 'marker-blue'
      case 'green':
        return 'marker-green'
      default:
        return ''
    }
  }

  return (
    <div className="timelock-container">
      <div className="timelock-content">
        <div className="calendar-section">
          <div className="calendar-header">
            <button className="month-nav-button" onClick={handlePrevMonth}>
              <ChevronLeft size={20} />
            </button>
            <div className="current-month">
              <h2>{currentMonth}</h2>
              <p>{currentYear}</p>
            </div>
            <button className="month-nav-button" onClick={handleNextMonth}>
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="weekdays">
            {weekDays.map((day) => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="calendar-grid">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${day.month !== 'current' ? 'other-month' : ''} ${day.day === selectedDate && day.month === 'current' ? 'selected' : ''}`}
                onClick={() => handleDateSelect(day)}
              >
                <span>{day.day}</span>
                {day.marker && <div className={`day-marker ${getMarkerClass(day.marker)}`}></div>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="timelock-form">
          <h3>Add New Timelock</h3>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Name of timelock"
              value={timelockName}
              onChange={(e) => setTimelockName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Type a note"
              value={timelockNote}
              onChange={(e) => setTimelockNote(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <div className="date-input-container">
              <input
                type="text"
                className="form-input"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button className="input-icon-button">
                <Calendar size={18} />
              </button>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <div className="date-input-container">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Start time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <button className="input-icon-button">
                  <Clock size={18} />
                </button>
              </div>
            </div>
            
            <div className="form-group half">
              <div className="date-input-container">
                <input
                  type="text"
                  className="form-input"
                  placeholder="End time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <button className="input-icon-button">
                  <Clock size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="form-group toggle-group">
            <label>Remind me</label>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={remindMe}
                onChange={() => setRemindMe(!remindMe)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timelock