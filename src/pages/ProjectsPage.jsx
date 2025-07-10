import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, ExternalLink, Github, Calendar, Tag, Star } from 'lucide-react'

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('date')

  const projects = [
    {
      id: 1,
      title: 'AI助手矩阵',
      description: '多功能AI助手系统，包含自然语言处理、图像识别、智能推荐等核心功能。采用深度学习技术，提供个性化智能服务。',
      category: 'ai',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'Docker'],
      image: '/projects/ai-assistant.jpg',
      demoUrl: '#',
      githubUrl: '#',
      status: 'completed',
      createdAt: '2024-01',
      featured: true,
      stats: {
        stars: 156,
        commits: 89,
        users: 1200
      }
    },
    {
      id: 2,
      title: '内容帝国自动化',
      description: '全自动内容生成与发布平台，支持多平台同步发布、SEO优化、数据分析等功能。助力内容创作者提升效率。',
      category: 'automation',
      technologies: ['Node.js', 'React', 'MongoDB', 'AWS', 'OpenAI API'],
      image: '/projects/content-empire.jpg',
      demoUrl: '#',
      githubUrl: '#',
      status: 'completed',
      createdAt: '2024-02',
      featured: true,
      stats: {
        stars: 89,
        commits: 156,
        users: 800
      }
    },
    {
      id: 3,
      title: 'AI股票研究助手',
      description: '智能股票分析系统，集成实时数据源、技术指标分析、风险评估等功能。帮助投资者做出更明智的决策。',
      category: 'fintech',
      technologies: ['Python', 'Pandas', 'Flask', 'Alpha Vantage', 'Chart.js'],
      image: '/projects/stock-assistant.jpg',
      demoUrl: '#',
      githubUrl: '#',
      status: 'completed',
      createdAt: '2024-03',
      featured: false,
      stats: {
        stars: 67,
        commits: 234,
        users: 450
      }
    },
    {
      id: 4,
      title: 'Code Hero游戏',
      description: '基于Web技术的编程教育游戏，通过游戏化方式学习编程概念。包含多个关卡、音效系统、敌人AI等。',
      category: 'game',
      technologies: ['JavaScript', 'Canvas API', 'Web Audio', 'CSS3'],
      image: '/projects/code-hero.jpg',
      demoUrl: '#',
      githubUrl: '#',
      status: 'completed',
      createdAt: '2024-04',
      featured: false,
      stats: {
        stars: 123,
        commits: 78,
        users: 2100
      }
    },
    {
      id: 5,
      title: 'AI软件工厂',
      description: '自动化软件开发平台，支持云服务部署、监控系统、自动修复等功能。革命性的软件开发解决方案。',
      category: 'devops',
      technologies: ['Docker', 'Kubernetes', 'Python', 'React', 'AWS'],
      image: '/projects/software-factory.jpg',
      demoUrl: '#',
      githubUrl: '#',
      status: 'completed',
      createdAt: '2024-05',
      featured: true,
      stats: {
        stars: 234,
        commits: 445,
        users: 950
      }
    }
  ]

  const categories = [
    { id: 'all', name: '全部', count: projects.length },
    { id: 'ai', name: 'AI & 机器学习', count: projects.filter(p => p.category === 'ai').length },
    { id: 'automation', name: '自动化', count: projects.filter(p => p.category === 'automation').length },
    { id: 'fintech', name: '金融科技', count: projects.filter(p => p.category === 'fintech').length },
    { id: 'game', name: '游戏开发', count: projects.filter(p => p.category === 'game').length },
    { id: 'devops', name: 'DevOps', count: projects.filter(p => p.category === 'devops').length }
  ]

  const filteredProjects = useMemo(() => {
    let filtered = projects

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'stars':
          return b.stats.stars - a.stats.stars
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  const ProjectCard = ({ project, isGrid }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`
        bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300
        ${isGrid ? 'h-full' : 'flex'}
      `}
    >
      {/* 项目图片 */}
      <div className={`relative ${isGrid ? 'h-48' : 'w-48 flex-shrink-0'} bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center`}>
        <div className="text-white text-6xl font-bold opacity-20">
          {project.title.slice(0, 2)}
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Star className="w-3 h-3 mr-1" />
            精选
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {project.status === 'completed' ? '已完成' : '开发中'}
        </div>
      </div>

      {/* 项目内容 */}
      <div className={`p-6 ${isGrid ? '' : 'flex-1'}`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-1" />
            {project.createdAt}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* 技术栈 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, isGrid ? 4 : 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > (isGrid ? 4 : 6) && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              +{project.technologies.length - (isGrid ? 4 : 6)}
            </span>
          )}
        </div>

        {/* 统计信息 */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            {project.stats.stars}
          </div>
          <div className="flex items-center">
            <Github className="w-4 h-4 mr-1" />
            {project.stats.commits}
          </div>
          <div>
            {project.stats.users}+ 用户
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-3">
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            演示
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-4 h-4 mr-2" />
            代码
          </motion.a>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container-custom">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            项目展示
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            探索 Claude Code 创建的创新项目，从 AI 应用到自动化工具，展示技术的无限可能
          </p>
        </motion.div>

        {/* 搜索和筛选栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索项目、技术..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* 筛选和视图控制 */}
            <div className="flex items-center space-x-4">
              {/* 分类筛选 */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* 排序 */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">按日期排序</option>
                <option value="stars">按热度排序</option>
                <option value="name">按名称排序</option>
              </select>

              {/* 视图切换 */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 结果统计 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            找到 <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredProjects.length}</span> 个项目
            {searchTerm && (
              <span> 匹配 "<span className="font-semibold">{searchTerm}</span>"</span>
            )}
          </p>
        </motion.div>

        {/* 项目网格/列表 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ProjectCard project={project} isGrid={viewMode === 'grid'} />
            </motion.div>
          ))}
        </motion.div>

        {/* 空状态 */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              未找到匹配的项目
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              尝试调整搜索条件或选择不同的分类
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              重置筛选
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage