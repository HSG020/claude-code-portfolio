import { useEffect, useState, useCallback } from 'react'

const usePerformanceMonitoring = () => {
  const [performanceData, setPerformanceData] = useState({
    loading: true,
    metrics: {},
    errors: [],
    warnings: []
  })

  // 性能指标收集
  const collectPerformanceMetrics = useCallback(() => {
    if (!window.performance) {
      console.warn('Performance API not supported')
      return {}
    }

    const navigation = performance.getEntriesByType('navigation')[0]
    const paint = performance.getEntriesByType('paint')
    
    const metrics = {}

    // 页面加载时间
    if (navigation) {
      metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart
      metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
      metrics.timeToFirstByte = navigation.responseStart - navigation.requestStart
      metrics.domInteractive = navigation.domInteractive - navigation.navigationStart
      metrics.domComplete = navigation.domComplete - navigation.navigationStart
    }

    // 绘制时间
    paint.forEach(entry => {
      if (entry.name === 'first-paint') {
        metrics.firstPaint = entry.startTime
      } else if (entry.name === 'first-contentful-paint') {
        metrics.firstContentfulPaint = entry.startTime
      }
    })

    // 内存使用情况（如果支持）
    if (performance.memory) {
      metrics.memoryUsage = {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      }
    }

    // 资源加载时间
    const resources = performance.getEntriesByType('resource')
    metrics.resourceStats = {
      total: resources.length,
      avgLoadTime: resources.reduce((sum, resource) => sum + resource.duration, 0) / resources.length,
      slowestResource: resources.reduce((slowest, resource) => 
        resource.duration > slowest.duration ? resource : slowest, 
        { duration: 0, name: '' }
      )
    }

    return metrics
  }, [])

  // 错误监控
  const errorHandler = useCallback((event) => {
    const errorInfo = {
      message: event.error?.message || event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    setPerformanceData(prev => ({
      ...prev,
      errors: [...prev.errors, errorInfo]
    }))

    console.error('JavaScript Error:', errorInfo)
  }, [])

  // 未处理的Promise拒绝监控
  const unhandledRejectionHandler = useCallback((event) => {
    const errorInfo = {
      type: 'unhandledRejection',
      reason: event.reason,
      timestamp: new Date().toISOString(),
      url: window.location.href
    }

    setPerformanceData(prev => ({
      ...prev,
      errors: [...prev.errors, errorInfo]
    }))

    console.error('Unhandled Promise Rejection:', errorInfo)
  }, [])

  // 网络状态监控
  const [networkInfo, setNetworkInfo] = useState({
    online: navigator.onLine,
    connectionType: null,
    effectiveType: null,
    downlink: null,
    rtt: null
  })

  useEffect(() => {
    // 网络连接信息
    if ('connection' in navigator) {
      const connection = navigator.connection
      setNetworkInfo(prev => ({
        ...prev,
        connectionType: connection.type,
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      }))

      const handleConnectionChange = () => {
        setNetworkInfo(prev => ({
          ...prev,
          connectionType: connection.type,
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        }))
      }

      connection.addEventListener('change', handleConnectionChange)
      return () => connection.removeEventListener('change', handleConnectionChange)
    }
  }, [])

  useEffect(() => {
    // 在线状态监控
    const handleOnline = () => setNetworkInfo(prev => ({ ...prev, online: true }))
    const handleOffline = () => setNetworkInfo(prev => ({ ...prev, online: false }))

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // 错误监控
    window.addEventListener('error', errorHandler)
    window.addEventListener('unhandledrejection', unhandledRejectionHandler)

    // 收集初始性能数据
    const collectInitialMetrics = () => {
      const metrics = collectPerformanceMetrics()
      
      setPerformanceData(prev => ({
        ...prev,
        loading: false,
        metrics: { ...prev.metrics, ...metrics }
      }))
    }

    // 等待页面完全加载后收集指标
    if (document.readyState === 'complete') {
      collectInitialMetrics()
    } else {
      window.addEventListener('load', collectInitialMetrics)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('error', errorHandler)
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler)
      window.removeEventListener('load', collectInitialMetrics)
    }
  }, [errorHandler, unhandledRejectionHandler, collectPerformanceMetrics])

  // 用户体验指标监控
  const [vitals, setVitals] = useState({})

  useEffect(() => {
    // Web Vitals 监控（需要安装 web-vitals 库才能使用）
    const measureVitals = () => {
      // 这里可以集成 web-vitals 库
      // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
      
      // 模拟指标收集
      setTimeout(() => {
        setVitals({
          fcp: Math.random() * 2000 + 800, // First Contentful Paint
          lcp: Math.random() * 3000 + 1200, // Largest Contentful Paint
          fid: Math.random() * 100 + 50, // First Input Delay
          cls: Math.random() * 0.2, // Cumulative Layout Shift
          ttfb: Math.random() * 500 + 200 // Time to First Byte
        })
      }, 1000)
    }

    measureVitals()
  }, [])

  // 实时性能监控
  const [realtimeMetrics, setRealtimeMetrics] = useState({
    fps: 0,
    memoryTrend: [],
    loadingStates: {}
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        setRealtimeMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }))
        
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    measureFPS()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  // 性能报告生成
  const generatePerformanceReport = useCallback(() => {
    return {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      metrics: performanceData.metrics,
      vitals,
      networkInfo,
      realtimeMetrics,
      errors: performanceData.errors,
      warnings: performanceData.warnings
    }
  }, [performanceData, vitals, networkInfo, realtimeMetrics])

  // 性能建议生成
  const getPerformanceRecommendations = useCallback(() => {
    const recommendations = []
    const metrics = performanceData.metrics

    if (metrics.pageLoadTime > 3000) {
      recommendations.push({
        type: 'warning',
        message: 'Page load time is over 3 seconds. Consider optimizing resources.',
        metric: 'pageLoadTime',
        value: metrics.pageLoadTime
      })
    }

    if (metrics.firstContentfulPaint > 1800) {
      recommendations.push({
        type: 'warning',
        message: 'First Contentful Paint is slow. Optimize critical rendering path.',
        metric: 'firstContentfulPaint',
        value: metrics.firstContentfulPaint
      })
    }

    if (vitals.cls > 0.1) {
      recommendations.push({
        type: 'error',
        message: 'Cumulative Layout Shift is high. Ensure proper sizing for images and elements.',
        metric: 'cls',
        value: vitals.cls
      })
    }

    if (performanceData.errors.length > 0) {
      recommendations.push({
        type: 'error',
        message: `${performanceData.errors.length} JavaScript errors detected. Check console for details.`,
        metric: 'errors',
        value: performanceData.errors.length
      })
    }

    return recommendations
  }, [performanceData, vitals])

  return {
    performanceData,
    networkInfo,
    vitals,
    realtimeMetrics,
    generatePerformanceReport,
    getPerformanceRecommendations,
    refreshMetrics: collectPerformanceMetrics
  }
}

export { usePerformanceMonitoring }
export default usePerformanceMonitoring