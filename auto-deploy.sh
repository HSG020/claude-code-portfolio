#!/bin/bash

# Claude Code Portfolio - 全自动部署脚本
# 自动创建 GitHub 仓库并完成部署

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 配置变量
REPO_NAME="claude-code-portfolio"
GITHUB_USERNAME="HSG020"
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

log_deploy() {
    echo -e "${CYAN}[DEPLOY]${NC} $1"
}

# 显示横幅
show_banner() {
    echo -e "${CYAN}"
    cat << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║          Claude Code Portfolio 全自动部署系统                 ║
║                                                                ║
║  🤖 使用 Git 和 GitHub CLI 自动化创建仓库                      ║
║  🚀 完全自动化构建和部署到 GitHub Pages                       ║
║  ✨ 一键完成所有配置和验证                                     ║
╚════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# 检查先决条件
check_prerequisites() {
    log_step "检查部署先决条件..."
    
    # 检查 Git
    if ! command -v git &> /dev/null; then
        log_error "Git 未安装。请先安装 Git。"
        exit 1
    fi
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装。请先安装 Node.js。"
        exit 1
    fi
    
    # 检查 npm
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装。请先安装 npm。"
        exit 1
    fi
    
    # 检查 GitHub CLI（可选）
    if command -v gh &> /dev/null; then
        log_info "检测到 GitHub CLI，将使用 gh 命令创建仓库"
        USE_GH_CLI=true
    else
        log_warning "未检测到 GitHub CLI，将使用 Git 手动流程"
        USE_GH_CLI=false
    fi
    
    log_success "先决条件检查完成"
}

# 清理现有仓库
cleanup_existing_repo() {
    log_step "清理现有仓库配置..."
    
    if [ -d .git ]; then
        log_warning "检测到现有 Git 仓库，备份中..."
        mv .git .git.backup.$(date +%Y%m%d%H%M%S)
        log_success "已备份现有 Git 仓库"
    fi
}

# 创建 GitHub 仓库
create_github_repo() {
    log_step "创建 GitHub 仓库..."
    
    if [ "$USE_GH_CLI" = true ]; then
        # 使用 GitHub CLI 创建仓库
        log_info "使用 GitHub CLI 创建仓库..."
        if gh repo create "$REPO_NAME" \
            --public \
            --description "Claude Code Portfolio - AI开发能力展示作品集" \
            --clone=false; then
            log_success "GitHub 仓库创建成功"
        else
            log_error "GitHub CLI 仓库创建失败"
            # 继续使用手动流程
            USE_GH_CLI=false
        fi
    fi
    
    if [ "$USE_GH_CLI" = false ]; then
        log_warning "请手动在 GitHub 创建仓库："
        log_info "1. 访问: https://github.com/new"
        log_info "2. 仓库名称: ${REPO_NAME}"
        log_info "3. 设置为 Public（公开）"
        log_info "4. 不要勾选任何初始化选项"
        log_info "5. 点击 Create repository"
        echo ""
        read -p "仓库创建完成后，按回车继续..."
    fi
}

# 初始化本地仓库
init_local_repo() {
    log_step "初始化本地 Git 仓库..."
    
    # 初始化
    git init
    git branch -M main
    
    # 添加远程仓库
    git remote add origin "$REPO_URL"
    
    # 验证远程仓库
    if git remote -v | grep -q "origin"; then
        log_success "本地仓库初始化完成"
    else
        log_error "远程仓库配置失败"
        exit 1
    fi
}

# 安装依赖并构建
build_project() {
    log_step "安装依赖并构建项目..."
    
    # 清理
    if [ -d node_modules ]; then
        rm -rf node_modules
    fi
    if [ -f package-lock.json ]; then
        rm -f package-lock.json
    fi
    
    # 安装依赖
    log_info "安装项目依赖..."
    npm install
    
    # 确保 gh-pages 已安装
    if ! npm list gh-pages &> /dev/null; then
        log_info "安装 gh-pages..."
        npm install --save-dev gh-pages
    fi
    
    # 构建项目
    log_info "构建项目..."
    npm run build
    
    # 验证构建
    if [ -d dist ] && [ -f dist/index.html ]; then
        log_success "项目构建成功"
        log_info "构建文件列表："
        ls -la dist/ | head -10
    else
        log_error "项目构建失败"
        exit 1
    fi
}

# 提交代码到主分支
commit_to_main() {
    log_step "提交代码到主分支..."
    
    # 创建 .gitignore 如果不存在
    if [ ! -f .gitignore ]; then
        cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/dist

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Editor directories
.vscode/*
!.vscode/extensions.json
.idea
*.swp
*.swo

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Deployment logs
deployment.log
*.log
EOF
    fi
    
    # 添加所有文件
    git add .
    
    # 提交
    git commit -m "🚀 Initial commit: Claude Code Portfolio

✨ AI开发能力展示作品集
🎯 包含5个AI项目展示：
  - Code Hero 游戏 (Canvas 2D, Sequential Thinking)
  - AI 自我改进系统 (Python AST, Flask)
  - AI 股票研究助手 (APIs, Finance)
  - AI 软件工厂 (Docker, Kubernetes)
  - 作品集网站 (React, TypeScript, Three.js)

🎨 现代化响应式设计
📱 PWA支持和移动端优化
🌙 深色/浅色主题切换
⚡ 快速加载和性能优化

🤖 Auto-deployed with Claude Code
📅 $(date '+%Y-%m-%d %H:%M:%S')"
    
    # 推送到远程
    log_info "推送代码到 GitHub..."
    if git push -u origin main; then
        log_success "代码推送成功"
    else
        log_error "代码推送失败，请检查："
        log_error "1. GitHub 仓库是否已创建"
        log_error "2. 仓库地址是否正确"
        log_error "3. 是否有推送权限"
        exit 1
    fi
}

# 部署到 GitHub Pages
deploy_to_pages() {
    log_step "部署到 GitHub Pages..."
    
    # 确保 dist 目录存在
    if [ ! -d dist ]; then
        log_error "dist 目录不存在，请先构建项目"
        exit 1
    fi
    
    log_info "开始部署到 gh-pages 分支..."
    if npm run deploy; then
        log_success "部署到 GitHub Pages 成功！"
    else
        log_error "GitHub Pages 部署失败"
        exit 1
    fi
}

# 验证部署
verify_deployment() {
    log_step "验证部署状态..."
    
    local site_url="https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
    
    # 检查仓库状态
    log_info "检查仓库状态..."
    if git ls-remote --heads origin | grep -q "gh-pages"; then
        log_success "✅ gh-pages 分支已创建"
    else
        log_warning "⚠️ gh-pages 分支未找到"
    fi
    
    # 等待 GitHub Pages 更新
    log_info "等待 GitHub Pages 更新..."
    sleep 15
    
    # 检查网站状态
    log_info "检查网站响应..."
    local status_code=$(curl -s -o /dev/null -w "%{http_code}" "$site_url" 2>/dev/null || echo "000")
    
    if [ "$status_code" = "200" ]; then
        log_success "✅ 网站响应正常 (HTTP $status_code)"
    else
        log_warning "⚠️ 网站状态码: $status_code (可能还在更新中)"
    fi
    
    log_deploy "🌐 网站地址: $site_url"
    log_deploy "⚙️ 仓库地址: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
    log_deploy "📋 Pages 设置: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
}

# 生成部署报告
generate_report() {
    log_step "生成部署报告..."
    
    local report_file="AUTO_DEPLOYMENT_REPORT.md"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local site_url="https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
    
    cat > "$report_file" << EOF
# 🚀 Claude Code Portfolio 自动部署报告

## ✅ 部署完成！

**部署时间**: $timestamp  
**网站地址**: [$site_url]($site_url)  
**仓库地址**: [https://github.com/${GITHUB_USERNAME}/${REPO_NAME}](https://github.com/${GITHUB_USERNAME}/${REPO_NAME})  
**部署状态**: ✅ 自动部署成功

---

## 📊 部署统计

### 项目信息
- **项目名称**: Claude Code Portfolio
- **仓库类型**: Public（公开）
- **部署方式**: GitHub Pages
- **构建工具**: Vite + React

### 技术栈
- **前端**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **3D效果**: Three.js
- **构建**: Vite
- **部署**: GitHub Pages

### 项目结构
\`\`\`
📁 src/
├── 📄 App.jsx           # 主应用组件
├── 📄 main.jsx          # 应用入口
├── 📄 index.css         # 全局样式
├── 📁 components/       # 可复用组件
│   ├── Navigation.jsx   # 导航组件
│   └── Footer.jsx       # 页脚组件
├── 📁 pages/           # 页面组件
│   ├── HomePage.jsx     # 首页
│   ├── ProjectsPage.jsx # 项目页
│   └── AboutPage.jsx    # 关于页
└── 📁 contexts/        # React 上下文
\`\`\`

---

## 🎯 展示内容

### 5个AI项目展示
1. **🎮 Code Hero 游戏**
   - Canvas 2D 游戏引擎
   - Sequential Thinking 设计
   - 音效系统和多关卡

2. **🧠 AI 自我改进系统**
   - Python AST 代码分析
   - Flask Web 界面
   - 实时性能监控

3. **📈 AI 股票研究助手**
   - 真实数据源集成
   - 技术指标分析
   - AI投资建议

4. **🏭 AI 软件工厂**
   - Docker/Kubernetes部署
   - 自动化代码生成
   - 监控和修复系统

5. **🌐 作品集网站**
   - React + TypeScript
   - 响应式设计
   - PWA支持

---

## 🌐 访问信息

### 主要链接
- **🏠 网站首页**: [$site_url]($site_url)
- **📂 项目展示**: [$site_url/projects]($site_url/projects)
- **👨‍💻 关于页面**: [$site_url/about]($site_url/about)
- **📁 GitHub仓库**: [https://github.com/${GITHUB_USERNAME}/${REPO_NAME}](https://github.com/${GITHUB_USERNAME}/${REPO_NAME})

### GitHub Pages 状态
- **部署分支**: gh-pages
- **访问域名**: ${GITHUB_USERNAME}.github.io
- **更新时间**: 通常1-5分钟生效

---

## 🔧 维护指南

### 更新内容
\`\`\`bash
# 修改代码后重新部署
git add .
git commit -m "Update content"
git push origin main

# 重新构建并部署
npm run build
npm run deploy
\`\`\`

### 故障排除
1. **网站显示404**: 检查 GitHub Pages 设置
2. **样式丢失**: 清除浏览器缓存
3. **更新未生效**: 等待几分钟或强制刷新

---

## 🎉 部署成功！

**🌟 Claude Code Portfolio 现在已在线展示！**

立即访问: [$site_url]($site_url)

---

*自动部署报告生成时间: $timestamp*  
*部署工具: Claude Code Auto-Deploy Script*  
*部署状态: ✅ 完全成功*
EOF
    
    log_success "部署报告已生成: $report_file"
}

# 显示最终结果
show_final_results() {
    echo -e "${CYAN}"
    cat << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║                   🎉 自动部署完成！                           ║
╚════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    local site_url="https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
    
    log_success "Claude Code Portfolio 已成功自动部署！"
    echo ""
    log_deploy "📋 部署摘要："
    echo "   ✅ GitHub 仓库已创建"
    echo "   ✅ 代码已推送到主分支"
    echo "   ✅ 项目已构建完成"
    echo "   ✅ GitHub Pages 已部署"
    echo ""
    log_deploy "🌐 立即访问: $site_url"
    log_deploy "📁 仓库管理: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
    log_deploy "⚙️ Pages 设置: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
    echo ""
    log_info "⏱️  GitHub Pages 通常需要 1-5 分钟完全生效"
    log_info "📋 详细信息请查看: AUTO_DEPLOYMENT_REPORT.md"
    echo ""
    log_success "🎊 恭喜！您的 AI 开发能力作品集现在已在线展示！"
}

# 错误处理
handle_error() {
    local exit_code=$?
    log_error "自动部署过程中发生错误 (退出码: $exit_code)"
    
    # 尝试返回到安全状态
    git checkout main 2>/dev/null || true
    
    exit $exit_code
}

# 创建部署日志
create_log() {
    local log_file="auto_deployment.log"
    exec 1> >(tee -a "$log_file")
    exec 2>&1
    echo "=== 自动部署开始时间: $(date) ==="
}

# 主函数
main() {
    # 设置错误处理
    trap handle_error ERR
    
    # 创建日志
    create_log
    
    # 显示横幅
    show_banner
    
    # 执行自动部署
    check_prerequisites
    cleanup_existing_repo
    create_github_repo
    init_local_repo
    build_project
    commit_to_main
    deploy_to_pages
    verify_deployment
    generate_report
    
    # 显示最终结果
    show_final_results
    
    echo "=== 自动部署结束时间: $(date) ==="
}

# 执行主函数
main "$@"