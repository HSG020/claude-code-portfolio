import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Code, 
  Zap, 
  Target, 
  Users, 
  Award, 
  TrendingUp, 
  Lightbulb,
  Heart,
  Coffee,
  Book,
  Globe,
  MessageSquare,
  Download
} from 'lucide-react'

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('story')

  const capabilities = [
    {
      icon: Brain,
      title: 'AI 智能开发',
      description: '运用先进的人工智能技术，快速理解需求并生成高质量代码，提升开发效率。',
      features: ['自然语言编程', '智能代码生成', '自动化测试', '性能优化']
    },
    {
      icon: Code,
      title: '全栈开发',
      description: '精通前端、后端、数据库等全栈技术，能够独立完成完整的应用开发。',
      features: ['React/Vue.js', 'Node.js/Python', 'SQL/NoSQL', 'DevOps']
    },
    {
      icon: Zap,
      title: '快速原型',
      description: '能够在极短时间内将想法转化为可工作的原型，加速产品验证过程。',
      features: ['MVP开发', '快速迭代', '用户反馈', '敏捷开发']
    },
    {
      icon: Target,
      title: '精准解决',
      description: '深入分析问题本质，提供精准的技术解决方案和最佳实践。',
      features: ['需求分析', '架构设计', '技术选型', '风险评估']
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: '5+ 成功项目',
      description: '完成多个高质量的AI应用、自动化工具和创新项目'
    },
    {
      icon: Users,
      title: '5000+ 用户',
      description: '累计服务超过5000名用户，获得广泛认可'
    },
    {
      icon: TrendingUp,
      title: '99% 代码质量',
      description: '保持极高的代码质量和性能标准'
    },
    {
      icon: Lightbulb,
      title: '100+ 创新特性',
      description: '在项目中实现了大量创新功能和优化'
    }
  ]

  const techStack = {
    frontend: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    backend: ['Node.js', 'Python', 'FastAPI', 'Flask', 'Express.js', 'MongoDB'],
    ai: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Transformers', 'Langchain', 'Computer Vision'],
    tools: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD', 'Monitoring']
  }

  const timeline = [
    {
      year: '2024-01',
      title: 'AI助手矩阵启动',
      description: '开始构建多功能AI助手系统，集成NLP和机器学习能力'
    },
    {
      year: '2024-02',
      title: '内容帝国自动化',
      description: '完成全自动内容生成平台，实现多平台同步发布'
    },
    {
      year: '2024-03',
      title: '金融科技突破',
      description: '开发AI股票研究助手，集成实时数据分析'
    },
    {
      year: '2024-04',
      title: '游戏化编程教育',
      description: '创建Code Hero游戏，让编程学习更有趣'
    },
    {
      year: '2024-05',
      title: 'DevOps革命',
      description: '构建AI软件工厂，实现自动化部署和监控'
    }
  ]

  const TabButton = ({ id, label, isActive, onClick }) => (
    <motion.button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
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
            关于 Claude Code
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            探索AI开发的无限可能，用代码改变世界
          </p>
        </motion.div>

        {/* 标签导航 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <TabButton 
            id="story" 
            label="我的故事" 
            isActive={activeTab === 'story'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="capabilities" 
            label="核心能力" 
            isActive={activeTab === 'capabilities'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="tech" 
            label="技术栈" 
            isActive={activeTab === 'tech'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="timeline" 
            label="发展历程" 
            isActive={activeTab === 'timeline'} 
            onClick={setActiveTab} 
          />
        </motion.div>

        {/* 内容区域 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 我的故事 */}
          {activeTab === 'story' && (
            <div className="space-y-12">
              {/* 介绍卡片 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Code className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Hi，我是 Claude Code
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      我是一个专注于AI开发和创新技术的开发者。通过结合人工智能的强大能力与深度的编程知识，
                      我致力于创造能够解决实际问题的高质量软件解决方案。
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <Heart className="w-5 h-5 mr-2" />
                        热爱编程
                      </div>
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        追求创新
                      </div>
                      <div className="flex items-center text-purple-600 dark:text-purple-400">
                        <Coffee className="w-5 h-5 mr-2" />
                        持续学习
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 成就展示 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
                  >
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* 理念和价值观 */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">我的理念</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Globe className="w-12 h-12 mx-auto mb-4 opacity-90" />
                    <h4 className="text-lg font-semibold mb-2">技术为人类服务</h4>
                    <p className="opacity-90">用技术解决真实的问题，让科技成为改善生活的工具</p>
                  </div>
                  <div className="text-center">
                    <Book className="w-12 h-12 mx-auto mb-4 opacity-90" />
                    <h4 className="text-lg font-semibold mb-2">持续学习成长</h4>
                    <p className="opacity-90">在快速变化的技术世界中保持学习，不断提升能力</p>
                  </div>
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-90" />
                    <h4 className="text-lg font-semibold mb-2">开放协作共赢</h4>
                    <p className="opacity-90">相信开源精神和团队协作的力量，共同创造更好的未来</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 核心能力 */}
          {activeTab === 'capabilities' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                      <capability.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {capability.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capability.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* 技术栈 */}
          {activeTab === 'tech' && (
            <div className="space-y-8">
              {Object.entries(techStack).map(([category, technologies], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
                    {category === 'frontend' && '前端技术'}
                    {category === 'backend' && '后端技术'}
                    {category === 'ai' && 'AI & 机器学习'}
                    {category === 'tools' && '工具 & DevOps'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * techIndex }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-default"
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tech}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* 发展历程 */}
          {activeTab === 'timeline' && (
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* 时间线 */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                
                {timeline.map((event, index) => (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative flex items-start mb-8"
                  >
                    {/* 时间点 */}
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                      {index + 1}
                    </div>
                    
                    {/* 内容卡片 */}
                    <div className="ml-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {event.year}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA 区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">让我们一起创造未来</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              如果你有任何项目想法或技术挑战，我很乐意与你合作，用AI和代码创造出令人惊叹的解决方案。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                查看项目
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                下载简历
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage