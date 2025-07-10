import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Code, 
  Clock, 
  Star, 
  GitBranch, 
  Calendar,
  Activity,
  Award,
  Target,
  Zap,
  Brain,
  Globe
} from 'lucide-react'

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [animatedNumbers, setAnimatedNumbers] = useState({})

  // 模拟数字动画
  useEffect(() => {
    const targets = {
      totalProjects: 5,
      totalUsers: 5430,
      totalCommits: 1002,
      totalStars: 679,
      codeLines: 50000,
      uptime: 99.9
    }

    const animateNumber = (key, target, duration = 2000) => {
      const start = 0
      const startTime = Date.now()
      
      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(start + (target - start) * easeOut)
        
        setAnimatedNumbers(prev => ({ ...prev, [key]: current }))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      animate()
    }

    Object.entries(targets).forEach(([key, target]) => {
      setTimeout(() => animateNumber(key, target), Math.random() * 500)
    })
  }, [])

  const overviewStats = [
    {
      icon: Code,
      title: '项目总数',
      value: animatedNumbers.totalProjects || 0,
      unit: '个',
      color: 'blue',
      trend: '+25%',
      description: '涵盖AI、自动化、游戏等多个领域'
    },
    {
      icon: Users,
      title: '用户总数',
      value: animatedNumbers.totalUsers || 0,
      unit: '+',
      color: 'green',
      trend: '+156%',
      description: '来自全球的活跃用户'
    },
    {
      icon: GitBranch,
      title: '代码提交',
      value: animatedNumbers.totalCommits || 0,
      unit: '次',
      color: 'purple',
      trend: '+89%',
      description: '持续的开发迭代'
    },
    {
      icon: Star,
      title: '获得星标',
      value: animatedNumbers.totalStars || 0,
      unit: '个',
      color: 'yellow',
      trend: '+234%',
      description: '开发者的认可和支持'
    },
    {
      icon: BarChart3,
      title: '代码行数',
      value: animatedNumbers.codeLines || 0,
      unit: '+',
      color: 'indigo',
      trend: '+445%',
      description: '高质量的代码产出'
    },
    {
      icon: Activity,
      title: '系统正常运行时间',
      value: animatedNumbers.uptime || 0,
      unit: '%',
      color: 'emerald',
      trend: '稳定',
      description: '可靠的服务质量'
    }
  ]

  const projectStats = [
    {
      name: 'AI助手矩阵',
      category: 'AI应用',
      users: 1200,
      stars: 156,
      commits: 89,
      languages: ['Python', 'FastAPI', 'React'],
      status: 'active',
      growth: '+23%'
    },
    {
      name: '内容帝国自动化',
      category: '自动化工具',
      users: 800,
      stars: 89,
      commits: 156,
      languages: ['Node.js', 'React', 'MongoDB'],
      status: 'active',
      growth: '+45%'
    },
    {
      name: 'AI股票研究助手',
      category: '金融科技',
      users: 450,
      stars: 67,
      commits: 234,
      languages: ['Python', 'Flask', 'Chart.js'],
      status: 'active',
      growth: '+12%'
    },
    {
      name: 'Code Hero游戏',
      category: '教育游戏',
      users: 2100,
      stars: 123,
      commits: 78,
      languages: ['JavaScript', 'Canvas', 'CSS3'],
      status: 'completed',
      growth: '+67%'
    },
    {
      name: 'AI软件工厂',
      category: 'DevOps平台',
      users: 950,
      stars: 234,
      commits: 445,
      languages: ['Docker', 'Python', 'React'],
      status: 'active',
      growth: '+89%'
    }
  ]

  const skillStats = [
    { name: 'React/Vue.js', level: 95, category: '前端开发' },
    { name: 'Node.js/Python', level: 92, category: '后端开发' },
    { name: 'AI/ML', level: 88, category: '人工智能' },
    { name: 'DevOps', level: 85, category: '运维部署' },
    { name: 'Database', level: 90, category: '数据库' },
    { name: 'Cloud Platform', level: 87, category: '云平台' }
  ]

  const timelineData = [
    { month: '2024-01', projects: 1, users: 150, commits: 45 },
    { month: '2024-02', projects: 2, users: 680, commits: 123 },
    { month: '2024-03', projects: 3, users: 1450, commits: 267 },
    { month: '2024-04', projects: 4, users: 3200, commits: 456 },
    { month: '2024-05', projects: 5, users: 5430, commits: 1002 }
  ]

  const achievements = [
    {
      icon: Award,
      title: '创新先锋',
      description: '在AI应用开发领域的突出贡献',
      date: '2024-05',
      color: 'yellow'
    },
    {
      icon: Target,
      title: '技术专家',
      description: '全栈开发和系统架构设计专家认证',
      date: '2024-04',
      color: 'blue'
    },
    {
      icon: Users,
      title: '用户喜爱',
      description: '用户满意度超过95%的优秀表现',
      date: '2024-03',
      color: 'green'
    },
    {
      icon: Zap,
      title: '效率之星',
      description: '开发效率提升300%的卓越成就',
      date: '2024-02',
      color: 'purple'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-500 border-blue-500',
      green: 'bg-green-500 text-green-500 border-green-500',
      purple: 'bg-purple-500 text-purple-500 border-purple-500',
      yellow: 'bg-yellow-500 text-yellow-500 border-yellow-500',
      indigo: 'bg-indigo-500 text-indigo-500 border-indigo-500',
      emerald: 'bg-emerald-500 text-emerald-500 border-emerald-500'
    }
    return colors[color] || colors.blue
  }

  const StatCard = ({ stat, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center`}>
          <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-700 dark:text-${stat.color}-300`}>
          {stat.trend}
        </span>
      </div>
      <div className="mb-2">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {stat.value.toLocaleString()}{stat.unit}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {stat.title}
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {stat.description}
      </p>
    </motion.div>
  )

  const SkillBar = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.2 * index }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{skill.category}</span>
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
            数据统计
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            用数据说话，展示 Claude Code 的发展历程和技术实力
          </p>
        </motion.div>

        {/* 标签导航 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { id: 'overview', label: '总览', icon: BarChart3 },
            { id: 'projects', label: '项目详情', icon: Code },
            { id: 'skills', label: '技能水平', icon: Brain },
            { id: 'achievements', label: '成就奖项', icon: Award }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* 内容区域 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 总览统计 */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* 主要指标 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {overviewStats.map((stat, index) => (
                  <StatCard key={stat.title} stat={stat} index={index} />
                ))}
              </div>

              {/* 趋势图表区域 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  发展趋势
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 用户增长图 */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      用户增长趋势
                    </h4>
                    <div className="space-y-3">
                      {timelineData.map((data, index) => (
                        <div key={data.month} className="flex items-center">
                          <span className="w-16 text-sm text-gray-600 dark:text-gray-400">
                            {data.month}
                          </span>
                          <div className="flex-1 mx-4">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(data.users / 5430) * 100}%` }}
                                transition={{ duration: 1, delay: 0.1 * index }}
                                className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full"
                              />
                            </div>
                          </div>
                          <span className="w-16 text-sm font-medium text-gray-900 dark:text-white text-right">
                            {data.users.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 项目活跃度 */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      项目活跃度
                    </h4>
                    <div className="space-y-3">
                      {projectStats.slice(0, 3).map((project, index) => (
                        <div key={project.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {project.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {project.users} 用户 • {project.commits} 提交
                            </div>
                          </div>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {project.growth}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 项目详情 */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {projectStats.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {project.name}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {project.status === 'active' ? '活跃' : '已完成'}
                      </span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {project.growth}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.users.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">用户</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.stars}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">星标</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.commits}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">提交</div>
                    </div>
                    <div className="text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {project.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">技术栈</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* 技能水平 */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  技术能力分布
                </h3>
                <div>
                  {skillStats.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  技能雷达图
                </h3>
                <div className="relative h-64 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    技能雷达图可视化
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 成就奖项 */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-${achievement.color}-100 dark:bg-${achievement.color}-900/30 flex items-center justify-center flex-shrink-0`}>
                      <achievement.icon className={`w-6 h-6 text-${achievement.color}-600 dark:text-${achievement.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {achievement.date}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default StatsPage