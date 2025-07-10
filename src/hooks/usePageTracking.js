import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    // 页面访问统计
    const trackPageView = (path) => {
      // 这里可以集成实际的分析服务，如 Google Analytics
      console.log(`Page view: ${path}`)
      
      // 保存到本地存储用于演示
      const pageViews = JSON.parse(localStorage.getItem('pageViews') || '{}')
      pageViews[path] = (pageViews[path] || 0) + 1
      pageViews.lastVisit = new Date().toISOString()
      localStorage.setItem('pageViews', JSON.stringify(pageViews))
      
      // 发送到分析服务（示例）
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: path,
        })
      }
    }

    // 页面标题更新
    const updatePageTitle = (path) => {
      const pageTitles = {
        '/': 'Claude Code - AI开发者作品集',
        '/projects': '项目展示 - Claude Code',
        '/about': '关于我 - Claude Code',
        '/stats': '数据统计 - Claude Code'
      }
      
      const title = pageTitles[path] || 'Claude Code Portfolio'
      document.title = title
    }

    // 页面元数据更新
    const updatePageMetadata = (path) => {
      const metaDescriptions = {
        '/': '探索Claude Code的AI开发项目，包括智能助手、自动化工具、游戏开发等创新应用',
        '/projects': '查看Claude Code完成的所有项目，从AI应用到自动化工具的完整作品集',
        '/about': '了解Claude Code的技术背景、开发理念和专业能力',
        '/stats': '通过数据了解Claude Code的项目统计、技术能力和发展历程'
      }
      
      const description = metaDescriptions[path] || 'Claude Code AI开发者作品集'
      
      // 更新meta description
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.content = description
      
      // 更新Open Graph标签
      let ogTitle = document.querySelector('meta[property="og:title"]')
      if (!ogTitle) {
        ogTitle = document.createElement('meta')
        ogTitle.setAttribute('property', 'og:title')
        document.head.appendChild(ogTitle)
      }
      ogTitle.content = document.title
      
      let ogDesc = document.querySelector('meta[property="og:description"]')
      if (!ogDesc) {
        ogDesc = document.createElement('meta')
        ogDesc.setAttribute('property', 'og:description')
        document.head.appendChild(ogDesc)
      }
      ogDesc.content = description
    }

    // 滚动位置重置
    const resetScrollPosition = () => {
      window.scrollTo(0, 0)
    }

    // 执行页面跟踪
    trackPageView(location.pathname)
    updatePageTitle(location.pathname)
    updatePageMetadata(location.pathname)
    resetScrollPosition()

    // 页面停留时间跟踪
    const startTime = Date.now()
    
    return () => {
      const endTime = Date.now()
      const timeSpent = endTime - startTime
      
      // 记录页面停留时间
      const timeOnPage = JSON.parse(localStorage.getItem('timeOnPage') || '{}')
      const path = location.pathname
      timeOnPage[path] = (timeOnPage[path] || 0) + timeSpent
      localStorage.setItem('timeOnPage', JSON.stringify(timeOnPage))
      
      console.log(`Time spent on ${path}: ${timeSpent}ms`)
    }
  }, [location])

  // 获取页面统计数据
  const getPageStats = () => {
    const pageViews = JSON.parse(localStorage.getItem('pageViews') || '{}')
    const timeOnPage = JSON.parse(localStorage.getItem('timeOnPage') || '{}')
    
    return {
      pageViews,
      timeOnPage,
      totalViews: Object.values(pageViews).reduce((sum, views) => sum + (typeof views === 'number' ? views : 0), 0),
      totalTime: Object.values(timeOnPage).reduce((sum, time) => sum + time, 0)
    }
  }

  // 清除统计数据
  const clearStats = () => {
    localStorage.removeItem('pageViews')
    localStorage.removeItem('timeOnPage')
  }

  return {
    currentPath: location.pathname,
    getPageStats,
    clearStats
  }
}

export { usePageTracking }
export default usePageTracking