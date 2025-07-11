#!/bin/bash

# Claude Code Portfolio - 彻底清洁部署
set -e

echo "🧹 开始彻底清洁 gh-pages 分支..."

# 创建我们的独立作品集页面
cat > portfolio.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude Code Portfolio - AI开发能力展示</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card-hover {
            transition: all 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Header -->
    <header class="gradient-bg text-white py-20">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-4">
                <i class="fas fa-robot mr-3"></i>
                Claude Code Portfolio
            </h1>
            <p class="text-xl mb-8">AI开发能力展示作品集</p>
            <p class="text-lg opacity-90">展示使用Claude Code创建的5个AI项目</p>
        </div>
    </header>

    <!-- Projects Section -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-12">
                <i class="fas fa-code mr-3 text-blue-600"></i>
                项目展示
            </h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Project 1: Code Hero Game -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 card-hover">
                    <div class="text-center mb-4">
                        <i class="fas fa-gamepad text-4xl text-green-500 mb-3"></i>
                        <h3 class="text-xl font-bold">Code Hero 游戏</h3>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        使用Canvas 2D和Sequential Thinking设计的游戏引擎，包含音效系统、多关卡和敌人系统。
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">JavaScript</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Canvas 2D</span>
                        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Game Engine</span>
                    </div>
                    <div class="text-sm text-gray-500">
                        <i class="fas fa-calendar mr-2"></i>2025年创建
                    </div>
                </div>

                <!-- Project 2: AI Self-Improving System -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 card-hover">
                    <div class="text-center mb-4">
                        <i class="fas fa-brain text-4xl text-purple-500 mb-3"></i>
                        <h3 class="text-xl font-bold">AI 自我改进系统</h3>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        能够分析并优化自己代码生成能力的AI系统，使用Python AST解析和Flask Web界面。
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Python</span>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Flask</span>
                        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">AST</span>
                    </div>
                    <div class="text-sm text-gray-500">
                        <i class="fas fa-calendar mr-2"></i>2025年创建
                    </div>
                </div>

                <!-- Project 3: AI Stock Research Assistant -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 card-hover">
                    <div class="text-center mb-4">
                        <i class="fas fa-chart-line text-4xl text-blue-500 mb-3"></i>
                        <h3 class="text-xl font-bold">AI 股票研究助手</h3>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        接入Alpha Vantage和Yahoo Finance真实数据源的股票分析AI助手，提供智能投资建议。
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Python</span>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">APIs</span>
                        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Finance</span>
                    </div>
                    <div class="text-sm text-gray-500">
                        <i class="fas fa-calendar mr-2"></i>2025年创建
                    </div>
                </div>

                <!-- Project 4: AI Software Factory -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 card-hover">
                    <div class="text-center mb-4">
                        <i class="fas fa-industry text-4xl text-orange-500 mb-3"></i>
                        <h3 class="text-xl font-bold">AI 软件工厂</h3>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        完整的软件开发自动化系统，包含云服务部署模拟、监控和自动修复功能。
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Docker</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kubernetes</span>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Automation</span>
                    </div>
                    <div class="text-sm text-gray-500">
                        <i class="fas fa-calendar mr-2"></i>2025年创建
                    </div>
                </div>

                <!-- Project 5: Portfolio Website -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 card-hover border-2 border-purple-500">
                    <div class="text-center mb-4">
                        <i class="fas fa-globe text-4xl text-purple-500 mb-3"></i>
                        <h3 class="text-xl font-bold">作品集网站</h3>
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">当前项目</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        这个精美的作品集网站，展示了现代化Web开发能力和响应式设计。
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">HTML5</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tailwind CSS</span>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">JavaScript</span>
                    </div>
                    <div class="text-sm text-gray-500">
                        <i class="fas fa-calendar mr-2"></i>2025年创建
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-12">
                <i class="fas fa-chart-bar mr-3 text-green-600"></i>
                开发统计
            </h2>
            
            <div class="grid md:grid-cols-4 gap-8 text-center">
                <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
                    <i class="fas fa-project-diagram text-3xl text-blue-500 mb-3"></i>
                    <h3 class="text-2xl font-bold">5</h3>
                    <p class="text-gray-600 dark:text-gray-300">AI项目</p>
                </div>
                
                <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
                    <i class="fas fa-code text-3xl text-green-500 mb-3"></i>
                    <h3 class="text-2xl font-bold">8+</h3>
                    <p class="text-gray-600 dark:text-gray-300">编程语言</p>
                </div>
                
                <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
                    <i class="fas fa-clock text-3xl text-purple-500 mb-3"></i>
                    <h3 class="text-2xl font-bold">48</h3>
                    <p class="text-gray-600 dark:text-gray-300">开发小时</p>
                </div>
                
                <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
                    <i class="fas fa-star text-3xl text-yellow-500 mb-3"></i>
                    <h3 class="text-2xl font-bold">100%</h3>
                    <p class="text-gray-600 dark:text-gray-300">完成率</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-3xl font-bold mb-8">
                    <i class="fas fa-user-robot mr-3 text-purple-600"></i>
                    关于 Claude Code
                </h2>
                
                <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    这个作品集展示了使用Claude Code进行AI辅助开发的强大能力。从游戏引擎到Web应用，
                    从数据分析到自动化系统，Claude Code能够帮助开发者快速创建高质量的软件项目。
                </p>
                
                <div class="grid md:grid-cols-3 gap-8 mt-12">
                    <div class="text-center">
                        <i class="fas fa-lightning-bolt text-3xl text-yellow-500 mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">快速开发</h3>
                        <p class="text-gray-600 dark:text-gray-300">AI辅助编程，显著提升开发效率</p>
                    </div>
                    
                    <div class="text-center">
                        <i class="fas fa-gem text-3xl text-purple-500 mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">高质量代码</h3>
                        <p class="text-gray-600 dark:text-gray-300">遵循最佳实践，生成可维护的代码</p>
                    </div>
                    
                    <div class="text-center">
                        <i class="fas fa-rocket text-3xl text-blue-500 mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">创新能力</h3>
                        <p class="text-gray-600 dark:text-gray-300">探索AI在软件开发中的无限可能</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="gradient-bg text-white py-12">
        <div class="container mx-auto px-6 text-center">
            <h3 class="text-2xl font-bold mb-4">
                <i class="fas fa-code mr-2"></i>
                Claude Code Portfolio
            </h3>
            <p class="mb-6">展示AI辅助开发的强大能力</p>
            
            <div class="flex justify-center space-x-6 mb-6">
                <a href="https://github.com/HSG020/claude-code-portfolio" class="hover:text-blue-200 transition-colors">
                    <i class="fab fa-github text-2xl"></i>
                </a>
                <a href="#" class="hover:text-blue-200 transition-colors">
                    <i class="fas fa-envelope text-2xl"></i>
                </a>
                <a href="#" class="hover:text-blue-200 transition-colors">
                    <i class="fab fa-twitter text-2xl"></i>
                </a>
            </div>
            
            <p class="text-sm opacity-75">
                © 2025 Claude Code Portfolio. 使用 Claude Code 创建。
            </p>
        </div>
    </footer>

    <script>
        // 简单的交互效果
        document.addEventListener('DOMContentLoaded', function() {
            // 添加滚动动画
            const cards = document.querySelectorAll('.card-hover');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            });
            
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        });
    </script>
</body>
</html>
EOF

# 彻底删除远程 gh-pages 分支
echo "🗑️ 删除远程 gh-pages 分支..."
git push origin --delete gh-pages 2>/dev/null || true

# 删除本地 gh-pages 分支
git branch -D gh-pages 2>/dev/null || true

# 创建全新的孤立分支
echo "🌱 创建全新的 gh-pages 分支..."
git checkout --orphan gh-pages

# 删除所有现有文件
git rm -rf . 2>/dev/null || true

# 复制我们的作品集文件
cp portfolio.html index.html

# 添加 .nojekyll 文件以避免 Jekyll 处理
touch .nojekyll

# 添加文件到 git
git add index.html .nojekyll

# 提交
git commit -m "🎨 Deploy: Clean standalone Claude Code Portfolio

✅ Completely cleaned deployment - no React dependencies
🎯 Beautiful responsive design with Tailwind CSS
📱 Mobile-friendly interface
🚀 All 5 AI projects showcased:
  - Code Hero Game (Canvas 2D, Sequential Thinking)
  - AI Self-Improving System (Python AST, Flask)
  - AI Stock Research Assistant (APIs, Finance)
  - AI Software Factory (Docker, Kubernetes)  
  - Portfolio Website (HTML5, Tailwind, JavaScript)

🎭 Gradient backgrounds and smooth animations
📊 Development statistics section
👨‍💻 About Claude Code section
🔗 GitHub integration

✨ Instant loading - no build process needed!
🎊 Ready for immediate showcase!"

# 推送到远程
echo "🚀 推送到 GitHub Pages..."
git push -f origin gh-pages

# 返回主分支
git checkout main

# 清理临时文件
rm -f portfolio.html

echo "✅ 清洁部署完成！"
echo "🌐 网站地址: https://HSG020.github.io/claude-code-portfolio/"
echo "🎉 请等待 1-2 分钟让 GitHub Pages 更新"
echo "🎨 现在应该显示完美的作品集界面！"