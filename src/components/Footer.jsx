import React from 'react'
import { FaGithub, FaEnvelope, FaTwitter, FaCode } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="gradient-bg text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start">
              <FaCode className="mr-2" />
              Claude Code Portfolio
            </h3>
            <p className="text-sm opacity-90">展示AI辅助开发的强大能力</p>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://github.com/HSG020/claude-code-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="#"
              className="hover:text-blue-200 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="text-2xl" />
            </a>
            <a
              href="#"
              className="hover:text-blue-200 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="text-2xl" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-75">
            © 2025 Claude Code Portfolio. 使用 Claude Code 创建。
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer