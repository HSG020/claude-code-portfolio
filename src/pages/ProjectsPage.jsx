import React from 'react'
import { motion } from 'framer-motion'
import { FaGamepad, FaBrain, FaChartLine, FaIndustry, FaGlobe, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      icon: <FaGamepad className="text-5xl text-green-500" />,
      title: "Code Hero 游戏",
      description: "使用Canvas 2D和Sequential Thinking设计的游戏引擎，包含音效系统、多关卡和敌人系统。",
      technologies: ["JavaScript", "Canvas 2D", "Game Engine", "Web Audio API"],
      features: [
        "Sequential Thinking 游戏设计",
        "动态音效生成系统",
        "3个精心设计的关卡",
        "多种敌人类型和能力系统"
      ],
      status: "已完成",
      date: "2025年1月"
    },
    {
      id: 2,
      icon: <FaBrain className="text-5xl text-purple-500" />,
      title: "AI 自我改进系统",
      description: "能够分析并优化自己代码生成能力的AI系统，使用Python AST解析和Flask Web界面。",
      technologies: ["Python", "Flask", "AST", "SocketIO", "Machine Learning"],
      features: [
        "代码质量自动分析",
        "性能优化建议生成",
        "实时Web监控界面",
        "代码模式学习能力"
      ],
      status: "已完成",
      date: "2025年1月"
    },
    {
      id: 3,
      icon: <FaChartLine className="text-5xl text-blue-500" />,
      title: "AI 股票研究助手",
      description: "接入Alpha Vantage和Yahoo Finance真实数据源的股票分析AI助手，提供智能投资建议。",
      technologies: ["Python", "APIs", "Pandas", "NumPy", "Machine Learning"],
      features: [
        "实时股票数据获取",
        "技术指标分析",
        "AI驱动的投资建议",
        "风险评估系统"
      ],
      status: "已完成",
      date: "2025年1月"
    },
    {
      id: 4,
      icon: <FaIndustry className="text-5xl text-orange-500" />,
      title: "AI 软件工厂",
      description: "完整的软件开发自动化系统，包含云服务部署模拟、监控和自动修复功能。",
      technologies: ["Docker", "Kubernetes", "Python", "CI/CD", "Monitoring"],
      features: [
        "自动化代码生成",
        "云部署模拟系统",
        "实时监控和告警",
        "自动故障修复"
      ],
      status: "已完成",
      date: "2025年1月"
    },
    {
      id: 5,
      icon: <FaGlobe className="text-5xl text-indigo-500" />,
      title: "作品集网站",
      description: "这个精美的作品集网站，展示了React + TypeScript + Three.js的现代化Web开发能力。",
      technologies: ["React", "TypeScript", "Three.js", "Tailwind CSS", "Vite"],
      features: [
        "响应式设计",
        "3D粒子效果",
        "PWA支持",
        "深色模式"
      ],
      status: "已完成",
      date: "2025年1月"
    }
  ]

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          项目展示
        </motion.h1>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  {project.icon}
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {project.status}
                      </span>
                      <span className="ml-2 text-gray-500 text-sm">{project.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                        <FaGithub className="text-xl" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                        <FaExternalLinkAlt className="text-xl" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">主要功能：</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                      {project.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage