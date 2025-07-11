import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaRobot, FaCode, FaChartLine, FaBrain, FaRocket } from 'react-icons/fa'

const HomePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const projects = [
    {
      icon: <FaCode className="text-4xl text-green-500" />,
      title: "Code Hero 游戏",
      description: "Canvas 2D游戏引擎，包含音效系统和多关卡设计"
    },
    {
      icon: <FaBrain className="text-4xl text-purple-500" />,
      title: "AI 自我改进系统",
      description: "能够分析并优化自己代码生成能力的AI系统"
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-500" />,
      title: "AI 股票研究助手",
      description: "接入真实数据源的智能股票分析助手"
    },
    {
      icon: <FaRocket className="text-4xl text-orange-500" />,
      title: "AI 软件工厂",
      description: "完整的软件开发自动化系统"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div {...fadeIn}>
            <FaRobot className="text-6xl mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Claude Code Portfolio</h1>
            <p className="text-xl mb-8">AI开发能力展示作品集</p>
            <div className="flex gap-4 justify-center">
              <Link to="/projects" className="btn-primary bg-white text-indigo-600 hover:bg-gray-100">
                查看项目
              </Link>
              <Link to="/about" className="btn-secondary bg-indigo-700 text-white hover:bg-indigo-800">
                了解更多
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            项目亮点
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-center mb-4">
                  {project.icon}
                  <h3 className="text-xl font-bold mt-4">{project.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-indigo-600">5</h3>
              <p className="text-gray-600 dark:text-gray-300">AI项目</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">8+</h3>
              <p className="text-gray-600 dark:text-gray-300">编程语言</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-purple-600">48</h3>
              <p className="text-gray-600 dark:text-gray-300">开发小时</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-orange-600">100%</h3>
              <p className="text-gray-600 dark:text-gray-300">完成率</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage