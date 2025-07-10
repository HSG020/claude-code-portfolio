import React, { createContext, useContext, useState, useEffect } from 'react'

const ProjectContext = createContext()

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 模拟项目数据
  const mockProjects = [
    {
      id: 1,
      title: 'AI助手矩阵',
      description: '多功能AI助手系统，包含自然语言处理、图像识别、智能推荐等核心功能。',
      category: 'ai',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'Docker'],
      status: 'completed',
      createdAt: '2024-01',
      featured: true,
      stats: { stars: 156, commits: 89, users: 1200 }
    },
    {
      id: 2,
      title: '内容帝国自动化',
      description: '全自动内容生成与发布平台，支持多平台同步发布、SEO优化、数据分析等功能。',
      category: 'automation',
      technologies: ['Node.js', 'React', 'MongoDB', 'AWS', 'OpenAI API'],
      status: 'completed',
      createdAt: '2024-02',
      featured: true,
      stats: { stars: 89, commits: 156, users: 800 }
    },
    {
      id: 3,
      title: 'AI股票研究助手',
      description: '智能股票分析系统，集成实时数据源、技术指标分析、风险评估等功能。',
      category: 'fintech',
      technologies: ['Python', 'Pandas', 'Flask', 'Alpha Vantage', 'Chart.js'],
      status: 'completed',
      createdAt: '2024-03',
      featured: false,
      stats: { stars: 67, commits: 234, users: 450 }
    },
    {
      id: 4,
      title: 'Code Hero游戏',
      description: '基于Web技术的编程教育游戏，通过游戏化方式学习编程概念。',
      category: 'game',
      technologies: ['JavaScript', 'Canvas API', 'Web Audio', 'CSS3'],
      status: 'completed',
      createdAt: '2024-04',
      featured: false,
      stats: { stars: 123, commits: 78, users: 2100 }
    },
    {
      id: 5,
      title: 'AI软件工厂',
      description: '自动化软件开发平台，支持云服务部署、监控系统、自动修复等功能。',
      category: 'devops',
      technologies: ['Docker', 'Kubernetes', 'Python', 'React', 'AWS'],
      status: 'completed',
      createdAt: '2024-05',
      featured: true,
      stats: { stars: 234, commits: 445, users: 950 }
    }
  ]

  useEffect(() => {
    // 模拟API调用
    const loadProjects = async () => {
      try {
        setLoading(true)
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000))
        setProjects(mockProjects)
        setError(null)
      } catch (err) {
        setError('Failed to load projects')
        console.error('Error loading projects:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const getProjectById = (id) => {
    return projects.find(project => project.id === parseInt(id))
  }

  const getProjectsByCategory = (category) => {
    if (category === 'all') return projects
    return projects.filter(project => project.category === category)
  }

  const getFeaturedProjects = () => {
    return projects.filter(project => project.featured)
  }

  const getProjectStats = () => {
    return {
      total: projects.length,
      completed: projects.filter(p => p.status === 'completed').length,
      inProgress: projects.filter(p => p.status === 'in_progress').length,
      totalUsers: projects.reduce((sum, p) => sum + p.stats.users, 0),
      totalStars: projects.reduce((sum, p) => sum + p.stats.stars, 0),
      totalCommits: projects.reduce((sum, p) => sum + p.stats.commits, 0)
    }
  }

  const value = {
    projects,
    loading,
    error,
    getProjectById,
    getProjectsByCategory,
    getFeaturedProjects,
    getProjectStats,
    setProjects
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContext