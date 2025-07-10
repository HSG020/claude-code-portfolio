import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Canvas } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import { 
  Code2, 
  Sparkles, 
  Rocket, 
  Brain, 
  Zap, 
  ArrowDown,
  Github,
  ExternalLink,
  Play,
  Star
} from 'lucide-react'

// 组件导入
import TypewriterText from '../components/TypewriterText'
import ProjectCard from '../components/ProjectCard'
import StatsCounter from '../components/StatsCounter'
import ParticlesBackground from '../components/ParticlesBackground'

// 数据导入
import { projects } from '../data/projects'
import { stats } from '../data/stats'

const HomePage = () => {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const projectsRef = useRef(null)
  const statsRef = useRef(null)
  
  const { scrollYProgress } = useScroll()
  const heroInView = useInView(heroRef, { threshold: 0.3 })
  const projectsInView = useInView(projectsRef, { threshold: 0.1 })
  const statsInView = useInView(statsRef, { threshold: 0.3 })
  
  // 视差效果
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -200])
  
  // 特色项目（前3个）
  const featuredProjects = projects.slice(0, 3)
  
  return (
    <>
      <Helmet>
        <title>Claude Code 作品集 | AI开发能力展示</title>
        <meta name="description" content="Claude Code 作品集首页 - 展示AI开发的强大能力，包含多个创新项目和技术解决方案" />
      </Helmet>
      
      <div ref={containerRef} className="relative">
        {/* 英雄区域 */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
        >
          {/* 3D背景 */}
          <div className="absolute inset-0 opacity-60">
            <Canvas camera={{ position: [0, 0, 1] }}>
              <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
              </Float>
            </Canvas>
          </div>
          
          {/* 粒子背景 */}
          <ParticlesBackground />
          
          {/* 英雄内容 */}
          <motion.div
            style={{ y: heroY }}
            className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          >
            {/* 状态指示器 */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="flex items-center space-x-2 glass-dark px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">AI 开发能力在线</span>
              </div>
            </motion.div>
            
            {/* 主标题 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
            >
              <span className="text-gradient-primary">Claude Code</span>
              <br />
              <span className="text-white">作品集</span>
            </motion.h1>
            
            {/* 打字机效果副标题 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 h-16"
            >
              <TypewriterText
                texts={[
                  "AI 驱动的软件开发专家",
                  "创新项目的智能构建者", 
                  "自动化解决方案的设计师",
                  "未来技术的探索者"
                ]}
                typingSpeed={80}
                deletingSpeed={50}
                delaySpeed={2000}
              />
            </motion.div>
            
            {/* 特色标签 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {[
                { icon: Brain, text: "AI 智能", color: "bg-blue-500" },
                { icon: Zap, text: "高性能", color: "bg-yellow-500" },
                { icon: Rocket, text: "创新性", color: "bg-purple-500" },
                { icon: Sparkles, text: "自动化", color: "bg-green-500" }
              ].map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-2 glass-dark px-4 py-2 rounded-full hover:scale-105 transition-transform cursor-pointer"
                >
                  <badge.icon className={`w-4 h-4 text-white`} />
                  <span className="text-sm text-gray-300">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.a
                href="#projects"
                className="btn-primary group"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                查看作品
              </motion.a>
              
              <motion.a
                href="https://github.com/HSG020"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                GitHub 主页
              </motion.a>
            </motion.div>
            
            {/* 滚动指示器 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center text-gray-400"
              >
                <span className="text-sm mb-2">向下滚动</span>
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* 装饰性几何图形 */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border border-blue-500/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 border border-purple-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </section>
        
        {/* 数据统计区域 */}
        <section 
          ref={statsRef}
          className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
        >
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                开发成果统计
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                数据见证 Claude Code 的强大开发能力
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="card p-6 hover:shadow-xl transition-all duration-300 group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
                      <StatsCounter 
                        value={stat.value} 
                        duration={2000}
                        suffix={stat.suffix}
                        shouldStart={statsInView}
                      />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 特色项目展示 */}
        <section 
          id="projects"
          ref={projectsRef}
          className="py-20 bg-gray-50 dark:bg-gray-900 relative"
        >
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                精选项目
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                展示 Claude Code 最具代表性的开发作品
              </p>
              
              {/* 项目标签过滤器 */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {['全部', 'AI/ML', 'Web应用', '自动化', '游戏'].map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <ProjectCard project={project} featured />
                </motion.div>
              ))}
            </div>
            
            {/* 查看更多按钮 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={projectsInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <motion.a
                href="/projects"
                className="btn-primary group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                查看全部项目
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </section>
        
        {/* 技术能力展示 */}
        <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                技术能力矩阵
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                掌握前沿技术，构建创新解决方案
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "前端开发",
                  skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Three.js"],
                  icon: "🎨",
                  level: 95
                },
                {
                  category: "后端开发", 
                  skills: ["Python", "Node.js", "FastAPI", "PostgreSQL", "Redis"],
                  icon: "⚙️",
                  level: 92
                },
                {
                  category: "AI/机器学习",
                  skills: ["TensorFlow", "PyTorch", "scikit-learn", "OpenAI API", "Transformers"],
                  icon: "🤖",
                  level: 88
                },
                {
                  category: "DevOps/部署",
                  skills: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Nginx"],
                  icon: "🚀",
                  level: 85
                },
                {
                  category: "数据处理",
                  skills: ["Pandas", "NumPy", "Apache Spark", "ElasticSearch", "MongoDB"],
                  icon: "📊",
                  level: 90
                },
                {
                  category: "自动化工具",
                  skills: ["Selenium", "Playwright", "Puppeteer", "Scrapy", "Celery"],
                  icon: "🔧",
                  level: 93
                }
              ].map((tech, index) => (
                <motion.div
                  key={tech.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="card p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{tech.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {tech.category}
                    </h3>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">熟练度</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {tech.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-tag text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA区域 */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                准备开始您的项目了吗？
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Claude Code 随时准备为您提供创新的 AI 解决方案和高质量的软件开发服务
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/about"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  了解更多
                </motion.a>
                <motion.a
                  href="https://github.com/HSG020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5 inline mr-2" />
                  关注 GitHub
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          {/* 装饰性元素 */}
          <motion.div
            className="absolute -top-24 -right-24 w-48 h-48 border border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-12 -left-12 w-32 h-32 border border-white/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </section>
      </div>
    </>
  )
}

export default HomePage