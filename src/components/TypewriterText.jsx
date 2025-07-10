import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TypewriterText = ({ 
  texts = [], 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delaySpeed = 2000,
  loop = true,
  showCursor = true,
  cursorChar = '|',
  className = ''
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    if (texts.length === 0) return

    const currentText = texts[currentTextIndex]
    
    const timer = setTimeout(() => {
      if (isWaiting) {
        setIsWaiting(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        // 删除字符
        if (currentCharIndex > 0) {
          setCurrentCharIndex(prev => prev - 1)
          setDisplayText(currentText.substring(0, currentCharIndex - 1))
        } else {
          // 删除完成，切换到下一个文本
          setIsDeleting(false)
          setCurrentTextIndex(prev => 
            loop ? (prev + 1) % texts.length : Math.min(prev + 1, texts.length - 1)
          )
        }
      } else {
        // 打字
        if (currentCharIndex < currentText.length) {
          setCurrentCharIndex(prev => prev + 1)
          setDisplayText(currentText.substring(0, currentCharIndex + 1))
        } else {
          // 打字完成，等待一段时间
          if (loop || currentTextIndex < texts.length - 1) {
            setIsWaiting(true)
          }
        }
      }
    }, isWaiting ? delaySpeed : isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [
    currentTextIndex, 
    currentCharIndex, 
    isDeleting, 
    isWaiting, 
    texts, 
    typingSpeed, 
    deletingSpeed, 
    delaySpeed, 
    loop
  ])

  // 光标闪烁动画
  const cursorVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="font-mono">
        {displayText}
      </span>
      
      {showCursor && (
        <motion.span
          variants={cursorVariants}
          animate="visible"
          initial="hidden"
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="ml-1 text-blue-500 font-mono"
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  )
}

// 高级打字机组件，支持富文本和动画效果
export const AnimatedTypewriter = ({ 
  texts = [], 
  typingSpeed = 80,
  deletingSpeed = 40,
  delaySpeed = 2000,
  className = '',
  gradient = false,
  size = 'text-xl'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (texts.length === 0) return

    const currentText = texts[currentIndex]
    
    const timer = setTimeout(() => {
      if (isTyping) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1))
          setCharIndex(prev => prev + 1)
        } else {
          // 打字完成，等待然后开始删除
          setTimeout(() => {
            setIsTyping(false)
          }, delaySpeed)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.slice(0, charIndex - 1))
          setCharIndex(prev => prev - 1)
        } else {
          // 删除完成，切换到下一个文本
          setIsTyping(true)
          setCurrentIndex(prev => (prev + 1) % texts.length)
        }
      }
    }, isTyping ? typingSpeed : deletingSpeed)

    return () => clearTimeout(timer)
  }, [currentIndex, charIndex, isTyping, texts, typingSpeed, deletingSpeed, delaySpeed])

  return (
    <div className={`${className} ${size}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={`${currentIndex}-${charIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className={gradient ? 'text-gradient-primary' : ''}
        >
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="text-blue-500"
          >
            |
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// 简化的打字机组件，适用于标题
export const SimpleTypewriter = ({ 
  text, 
  speed = 100, 
  className = '',
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [charIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayText}
      {charIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="text-blue-500"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

// 字符逐个显示的动画组件
export const RevealText = ({ 
  text, 
  delay = 0, 
  stagger = 0.05, 
  className = '' 
}) => {
  const letters = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: delay 
      }
    })
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    hidden: {
      opacity: 0,
      y: 20
    }
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default TypewriterText