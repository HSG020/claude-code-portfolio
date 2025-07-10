import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const StatsCounter = ({ 
  value, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  shouldStart = true,
  formatNumber = true
}) => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!shouldStart || hasStarted) return

    setHasStarted(true)
    
    const increment = value / (duration / 16) // 60fps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [shouldStart, value, duration, hasStarted])

  const formatValue = (num) => {
    if (!formatNumber) return num.toString()
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
  }

  return (
    <span>
      {prefix}{formatValue(count)}{suffix}
    </span>
  )
}

export default StatsCounter