import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Sparkles } from 'lucide-react'

const LoadingSpinner = ({ size = 'default', message = '正在加载...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12', 
    large: 'w-16 h-16'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* 主加载动画 */}
        <div className="relative mb-8">
          {/* 外圈旋转 */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full" />
          </motion.div>
          
          {/* 内圈反向旋转 */}
          <motion.div
            className="absolute inset-2"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-16 h-16 border-2 border-purple-200 dark:border-purple-800 border-b-purple-600 dark:border-b-purple-400 rounded-full" />
          </motion.div>
          
          {/* 中心图标 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </motion.div>
          
          {/* 装饰性粒子 */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0'
              }}
              animate={{
                rotate: [0, 360],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* 加载文字 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Claude Code Portfolio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {message}
          </p>
          
          {/* 加载进度点 */}
          <div className="flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* 技能标签动画 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {['AI', 'React', 'Python', 'TypeScript'].map((skill, i) => (
            <motion.span
              key={skill}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 1.2 + i * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// 简单的内联加载器
export const InlineLoader = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div className="w-full h-full border-2 border-gray-300 border-t-blue-600 rounded-full" />
    </motion.div>
  )
}

// 骨架屏加载器
export const SkeletonLoader = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className={`bg-gray-300 dark:bg-gray-700 rounded ${
            i === lines - 1 ? 'h-4 w-3/4' : 'h-4 w-full'
          } ${i < lines - 1 ? 'mb-2' : ''}`}
        />
      ))}
    </div>
  )
}

export default LoadingSpinner