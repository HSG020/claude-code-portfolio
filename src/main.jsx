import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
    
    // 发送错误报告（如果需要）
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">出现了一些问题</h1>
            <p className="text-gray-400 mb-6">作品集加载时遇到错误，请刷新页面重试</p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                刷新页面
              </button>
              <a
                href="https://github.com/HSG020"
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors inline-block"
              >
                访问 GitHub
              </a>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-gray-400 cursor-pointer">错误详情</summary>
                <pre className="mt-2 p-4 bg-gray-800 rounded text-red-400 text-sm overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 加载状态组件
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold text-white mb-2">正在加载作品集...</h2>
      <p className="text-gray-400">请稍候，精彩内容即将呈现</p>
    </div>
  </div>
);

// 性能监控
if (typeof performance !== 'undefined' && performance.mark) {
  performance.mark('portfolio-start');
}

// 主应用渲染
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter basename="/claude-code-portfolio">
          <React.Suspense fallback={<LoadingFallback />}>
            <App />
          </React.Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// 性能监控完成
if (typeof performance !== 'undefined' && performance.measure) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performance.mark('portfolio-end');
      performance.measure('portfolio-load-time', 'portfolio-start', 'portfolio-end');
      
      const measure = performance.getEntriesByName('portfolio-load-time')[0];
      console.log(`Portfolio loaded in ${measure.duration.toFixed(2)}ms`);
      
      // 发送性能数据（如果需要）
      if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
          name: 'portfolio_load',
          value: Math.round(measure.duration)
        });
      }
    }, 0);
  });
}

// PWA 更新提示
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // 显示更新提示
    const updateBanner = document.createElement('div');
    updateBanner.className = 'fixed top-0 left-0 right-0 bg-blue-600 text-white p-3 text-center z-50';
    updateBanner.innerHTML = `
      <p>作品集已更新到新版本！<button onclick="window.location.reload()" class="ml-2 underline">点击刷新</button></p>
    `;
    document.body.appendChild(updateBanner);
    
    setTimeout(() => {
      updateBanner.remove();
    }, 10000);
  });
}

// 键盘快捷键
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K 打开搜索
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('[data-search-input]');
    if (searchInput) {
      searchInput.focus();
    }
  }
  
  // Ctrl/Cmd + / 显示快捷键帮助
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    console.log('Keyboard shortcuts:\n- Ctrl/Cmd + K: Open search\n- Ctrl/Cmd + /: Show help');
  }
});

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // 页面重新可见时，可以刷新数据或重新开始动画
    const event = new CustomEvent('page-visible');
    window.dispatchEvent(event);
  }
});

// 检测移动设备并添加相应的类名
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
  document.documentElement.classList.add('is-mobile');
}

// 检测触摸设备
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
  document.documentElement.classList.add('is-touch');
}

// 性能优化：预加载关键资源
const preloadImages = [
  '/hero-bg.webp',
  '/project-screenshots/ai-assistant-matrix.webp',
  '/project-screenshots/content-empire.webp',
  '/project-screenshots/stock-research.webp',
  '/project-screenshots/software-factory.webp',
  '/project-screenshots/code-hero.webp'
];

preloadImages.forEach(src => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
});

console.log('🎨 Claude Code Portfolio initialized');
console.log('🚀 Ready to showcase AI development capabilities!');