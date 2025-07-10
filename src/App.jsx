import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

// 懒加载组件
const HomePage = lazy(() => import('./pages/HomePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const StatsPage = lazy(() => import('./pages/StatsPage'))

// 布局组件
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ThemeToggle from './components/ThemeToggle'
import LoadingSpinner from './components/LoadingSpinner'

// Context
import { ThemeProvider } from './contexts/ThemeContext'
import { ProjectProvider } from './contexts/ProjectContext'

// Hooks
import { usePageTracking } from './hooks/usePageTracking'
import { usePerformanceMonitoring } from './hooks/usePerformanceMonitoring'

const App = () => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  
  // 页面追踪和性能监控
  usePageTracking()
  usePerformanceMonitoring()
  
  useEffect(() => {
    // 模拟初始加载
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // 页面切换动画配置
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 0.98
    }
  }
  
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  }
  
  // 加载状态
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  return (
    <ThemeProvider>
      <ProjectProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {/* SEO和Meta标签 */}
          <Helmet>
            <title>Claude Code 作品集 | AI开发能力展示</title>
            <meta name="description" content="Claude Code 作品集 - 展示强大的AI开发能力，包括AI助手矩阵、内容帝国自动化、股票研究助手等创新项目" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#0f172a" />
            <link rel="canonical" href={`https://yourusername.github.io/claude-code-portfolio${location.pathname}`} />
          </Helmet>
          
          {/* 导航栏 */}
          <Navigation />
          
          {/* 主题切换按钮 */}
          <ThemeToggle />
          
          {/* 主要内容区域 */}
          <main className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="min-h-screen"
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes location={location}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    {/* 404页面 */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>
          
          {/* 页脚 */}
          <Footer />
          
          {/* 回到顶部按钮 */}
          <BackToTop />
          
          {/* 性能监控面板（仅开发环境） */}
          {process.env.NODE_ENV === 'development' && <PerformancePanel />}
        </div>
      </ProjectProvider>
    </ThemeProvider>
  )
}

// 404页面组件
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-gradient-primary mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            页面未找到
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            抱歉，您访问的页面不存在或已被移动。
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            返回首页
          </motion.a>
          <motion.a
            href="/projects"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            查看项目
          </motion.a>
        </div>
        
        {/* 404动画装饰 */}
        <div className="mt-16 opacity-50">
          <motion.div
            className="text-6xl"
            animate={{
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🤖
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// 性能监控面板（开发环境）
const PerformancePanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0
  })
  
  useEffect(() => {
    let frameId
    let lastTime = performance.now()
    let frameCount = 0
    
    const updateMetrics = () => {
      const now = performance.now()
      frameCount++
      
      if (now - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (now - lastTime)),
          memory: Math.round((performance.memory?.usedJSHeapSize || 0) / 1024 / 1024)
        }))
        
        frameCount = 0
        lastTime = now
      }
      
      frameId = requestAnimationFrame(updateMetrics)
    }
    
    frameId = requestAnimationFrame(updateMetrics)
    
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [])
  
  return (
    <div className="fixed top-4 left-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/80 text-white p-2 rounded-lg text-xs font-mono"
        whileHover={{ scale: 1.05 }}
      >
        📊 Dev
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 left-0 bg-black/90 text-white p-4 rounded-lg text-xs font-mono min-w-48"
          >
            <div>FPS: {metrics.fps}</div>
            <div>Memory: {metrics.memory}MB</div>
            <div>Route: {location.pathname}</div>
            <div>Viewport: {window.innerWidth}x{window.innerHeight}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App