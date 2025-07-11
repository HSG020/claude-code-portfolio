import React from 'react'
import { motion } from 'framer-motion'
import { FaRobot, FaLightbulb, FaGem, FaRocket } from 'react-icons/fa'

const AboutPage = () => {
  const features = [
    {
      icon: <FaLightbulb className="text-3xl text-yellow-500" />,
      title: "快速开发",
      description: "AI辅助编程，显著提升开发效率"
    },
    {
      icon: <FaGem className="text-3xl text-purple-500" />,
      title: "高质量代码",
      description: "遵循最佳实践，生成可维护的代码"
    },
    {
      icon: <FaRocket className="text-3xl text-blue-500" />,
      title: "创新能力",
      description: "探索AI在软件开发中的无限可能"
    }
  ]

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <FaRobot className="text-6xl text-indigo-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">关于 Claude Code</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              AI开发专家，专注于创新的人工智能解决方案
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">项目背景</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              这个作品集展示了使用Claude Code进行AI辅助开发的强大能力。从游戏引擎到Web应用，
              从数据分析到自动化系统，Claude Code能够帮助开发者快速创建高质量的软件项目。
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              通过展示这5个不同领域的项目，我们可以看到AI在软件开发中的巨大潜力。
              每个项目都代表了不同的技术挑战和创新解决方案。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">技术栈</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "JavaScript", "Python", "React", "TypeScript",
                "Node.js", "Flask", "Docker", "Kubernetes",
                "Three.js", "Canvas API", "Machine Learning", "APIs",
                "Tailwind CSS", "Vite", "Git", "GitHub Pages"
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage