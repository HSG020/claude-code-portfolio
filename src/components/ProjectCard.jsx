import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  Github, 
  Star, 
  GitFork, 
  Eye, 
  Calendar,
  Code2,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Users
} from 'lucide-react'

const ProjectCard = ({ project, featured = false, variant = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // 状态颜色映射
  const statusColors = {
    completed: 'bg-green-100 text-green-800 border-green-200',
    active: 'bg-blue-100 text-blue-800 border-blue-200',
    planning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    archived: 'bg-gray-100 text-gray-800 border-gray-200'
  }

  // 难度颜色映射
  const difficultyColors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500', 
    advanced: 'bg-orange-500',
    expert: 'bg-red-500'
  }

  // 卡片变体样式
  const cardVariants = {
    default: 'card hover:shadow-2xl',
    minimal: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg',
    glassmorphism: 'glass hover:glass-dark',
    gradient: 'bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-2xl'
  }

  return (
    <motion.div
      className={`${cardVariants[variant]} transition-all duration-300 overflow-hidden group ${
        featured ? 'lg:col-span-1' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 项目图片区域 */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
        {/* 主图片 */}
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Code2 className="w-16 h-16 text-white/50" />
          </div>
        )}
        
        {/* 图片轮播指示器 */}
        {project.images && project.images.length > 1 && (
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}

        {/* 状态标签 */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
            {project.status === 'completed' ? '已完成' : 
             project.status === 'active' ? '进行中' : 
             project.status === 'planning' ? '规划中' : '已归档'}
          </span>
          
          {featured && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 flex items-center">
              <Star className="w-3 h-3 mr-1" />
              精选
            </span>
          )}
        </div>

        {/* 项目链接 */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <AnimatePresence>
            {isHovered && (
              <>
                {project.links?.github && (
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                )}
                {project.links?.demo && (
                  <motion.a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-500/80 hover:bg-blue-600/80 text-white rounded-full transition-colors"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* 难度指示器 */}
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center space-x-1">
            <span className="text-xs text-white/80">难度:</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-1.5 h-1.5 rounded-full ${
                    level <= (project.difficulty === 'beginner' ? 2 : 
                            project.difficulty === 'intermediate' ? 3 :
                            project.difficulty === 'advanced' ? 4 : 5)
                      ? difficultyColors[project.difficulty]
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 项目内容区域 */}
      <div className="p-6">
        {/* 项目标题和副标题 */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {project.subtitle}
          </p>
        </div>

        {/* 项目描述 */}
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* 技术标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="skill-tag text-xs"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{project.tags.length - 4} 更多
            </span>
          )}
        </div>

        {/* 项目统计 */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div className="group/stat">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {project.stats.stars}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Stars</div>
          </div>
          
          <div className="group/stat">
            <div className="flex items-center justify-center mb-1">
              <GitFork className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {project.stats.forks}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Forks</div>
          </div>
          
          <div className="group/stat">
            <div className="flex items-center justify-center mb-1">
              <Code2 className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {(project.stats.linesOfCode / 1000).toFixed(1)}k
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Lines</div>
          </div>
        </div>

        {/* 项目时间线 */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Calendar className="w-3 h-3 mr-1" />
          <span>
            {new Date(project.timeline.started).toLocaleDateString('zh-CN')} - {' '}
            {project.timeline.completed ? 
              new Date(project.timeline.completed).toLocaleDateString('zh-CN') : 
              '进行中'
            }
          </span>
          <span className="mx-2">•</span>
          <span>{project.timeline.duration}</span>
        </div>

        {/* 项目特色功能（featured项目显示） */}
        {featured && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              核心功能
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {project.features.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-center text-gray-600 dark:text-gray-400">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 性能指标（如果有） */}
        {project.performance && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              性能表现
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(project.performance).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 底部操作按钮 */}
        <div className="flex space-x-2">
          {project.links?.demo && (
            <motion.a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group/btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              查看演示
            </motion.a>
          )}
          
          {project.links?.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group/btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
              源码
            </motion.a>
          )}
        </div>
      </div>

      {/* 悬浮时的额外信息 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 bg-black/90 text-white p-6 flex flex-col justify-center"
          >
            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
            <p className="text-sm leading-relaxed mb-4 opacity-90">
              {project.longDescription ? 
                project.longDescription.substring(0, 200) + '...' : 
                project.description
              }
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-yellow-400" />
                优先级: <span className="ml-1 capitalize">{project.priority}</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                技术栈: {project.tags.slice(0, 3).join(', ')}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-green-400" />
                贡献者: {project.stats.contributors}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProjectCard