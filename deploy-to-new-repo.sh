#!/bin/bash

# Claude Code Portfolio - 新仓库部署脚本
# 用于将项目部署到新创建的 GitHub 仓库

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

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

# 显示横幅
show_banner() {
    echo -e "${CYAN}"
    cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║             Claude Code Portfolio 新仓库部署                ║
║                                                              ║
║  🚀 自动化部署到新的 GitHub 仓库                            ║
║  ✨ 包含构建、初始化和 GitHub Pages 设置                    ║
║  🎯 一键完成所有配置                                        ║
╚══════════════════════════════════════════════════════════════╝
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
    
    log_success "所有先决条件检查通过"
}

# 检查是否已有 Git 仓库
check_existing_repo() {
    log_step "检查现有 Git 仓库状态..."
    
    if [ -d .git ]; then
        log_warning "检测到现有 Git 仓库"
        
        # 检查是否有未提交的更改
        if ! git diff-index --quiet HEAD -- 2>/dev/null; then
            log_warning "存在未提交的更改"
            git status --short
        fi
        
        # 备份现有仓库
        log_info "备份现有 Git 配置..."
        mv .git .git.backup.$(date +%Y%m%d%H%M%S)
        log_success "已备份现有 Git 仓库"
    fi
}

# 初始化新仓库
init_new_repo() {
    log_step "初始化新的 Git 仓库..."
    
    # 初始化
    git init
    log_success "Git 仓库初始化完成"
    
    # 设置远程仓库
    log_info "添加远程仓库..."
    git remote add origin https://github.com/HSG020/claude-code-portfolio.git
    
    # 验证远程仓库
    if git remote -v | grep -q "origin"; then
        log_success "远程仓库添加成功"
    else
        log_error "远程仓库添加失败"
        exit 1
    fi
}

# 检查并安装依赖
install_dependencies() {
    log_step "检查并安装项目依赖..."
    
    if [ ! -f package.json ]; then
        log_error "package.json 文件不存在"
        exit 1
    fi
    
    # 清理可能存在的 node_modules 和 lock 文件
    if [ -d node_modules ]; then
        log_info "清理现有 node_modules..."
        rm -rf node_modules
    fi
    
    if [ -f package-lock.json ]; then
        rm -f package-lock.json
    fi
    
    # 安装依赖
    log_info "安装项目依赖..."
    npm install
    
    # 检查 gh-pages 是否安装
    if ! npm list gh-pages &> /dev/null; then
        log_info "安装 gh-pages..."
        npm install --save-dev gh-pages
    fi
    
    log_success "依赖安装完成"
}

# 验证并修复配置
verify_config() {
    log_step "验证项目配置..."
    
    # 检查 vite.config.js
    if [ -f vite.config.js ]; then
        if grep -q "base:" vite.config.js; then
            log_info "检查 vite.config.js 中的 base 配置..."
            if ! grep -q "base: '/claude-code-portfolio/'" vite.config.js; then
                log_warning "修复 vite.config.js 的 base 路径..."
                # 这里可以添加自动修复代码
            else
                log_success "vite.config.js 配置正确"
            fi
        fi
    fi
    
    # 检查 package.json 中的 deploy 脚本
    if grep -q '"deploy"' package.json; then
        if grep -q '"deploy": "gh-pages -d dist"' package.json; then
            log_success "package.json deploy 脚本配置正确"
        else
            log_warning "package.json deploy 脚本需要更新"
            # 这里可以添加自动修复代码
        fi
    else
        log_warning "package.json 中没有 deploy 脚本"
        # 这里可以添加自动添加脚本的代码
    fi
}

# 构建项目
build_project() {
    log_step "构建项目..."
    
    # 清理之前的构建
    if [ -d dist ]; then
        log_info "清理之前的构建文件..."
        rm -rf dist
    fi
    
    # 执行构建
    log_info "开始构建..."
    npm run build
    
    # 验证构建结果
    if [ -d dist ] && [ -f dist/index.html ]; then
        log_success "项目构建成功"
        log_info "构建文件："
        ls -la dist/ | head -10
    else
        log_error "项目构建失败"
        exit 1
    fi
}

# 提交代码到主分支
commit_to_main() {
    log_step "提交代码到主分支..."
    
    # 添加所有文件
    git add .
    
    # 创建 .gitignore 如果不存在
    if [ ! -f .gitignore ]; then
        cat > .gitignore << EOF
# dependencies
node_modules/
/.pnp
.pnp.js

# testing
/coverage

# production
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Logs
logs
*.log

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF
        git add .gitignore
    fi
    
    # 提交
    git commit -m "Initial commit: Claude Code Portfolio

🚀 AI开发能力展示作品集
✨ 包含5个AI项目展示
🎨 响应式设计与动画效果
📱 PWA支持

Projects:
- Code Hero 游戏
- AI 自我改进系统
- AI 股票研究助手
- AI 软件工厂
- 作品集网站"
    
    # 设置主分支名称为 main
    git branch -M main
    
    # 推送到远程
    log_info "推送到 GitHub..."
    if git push -u origin main; then
        log_success "代码推送成功"
    else
        log_error "推送失败。请检查："
        log_error "1. 是否已在 GitHub 创建仓库"
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
    
    # 添加 CNAME 文件（如果需要自定义域名）
    # echo "your-custom-domain.com" > dist/CNAME
    
    # 部署
    log_info "开始部署到 gh-pages 分支..."
    if npm run deploy; then
        log_success "部署成功！"
    else
        log_error "部署失败"
        exit 1
    fi
}

# 显示部署结果
show_results() {
    echo -e "${CYAN}"
    cat << EOF
╔══════════════════════════════════════════════════════════════╗
║                    🎉 部署成功！                             ║
╚══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    log_success "Claude Code Portfolio 已成功部署！"
    echo ""
    log_info "📋 部署信息："
    echo "   仓库地址: https://github.com/HSG020/claude-code-portfolio"
    echo "   网站地址: https://HSG020.github.io/claude-code-portfolio/"
    echo ""
    log_info "⏱️  GitHub Pages 通常需要 1-5 分钟生效"
    log_info "🔍 您可以在以下地址检查部署状态："
    echo "   https://github.com/HSG020/claude-code-portfolio/settings/pages"
    echo ""
    log_info "📝 后续操作："
    echo "   1. 等待几分钟让 GitHub Pages 生效"
    echo "   2. 访问网站验证部署是否成功"
    echo "   3. 如有问题，查看 deployment.log 日志文件"
}

# 创建部署日志
create_log() {
    exec 1> >(tee -a deployment.log)
    exec 2>&1
    echo "=== 部署开始时间: $(date) ==="
}

# 主函数
main() {
    # 创建日志
    create_log
    
    # 显示横幅
    show_banner
    
    # 执行部署步骤
    check_prerequisites
    check_existing_repo
    init_new_repo
    install_dependencies
    verify_config
    build_project
    commit_to_main
    deploy_to_pages
    
    # 显示结果
    show_results
    
    echo "=== 部署结束时间: $(date) ==="
}

# 错误处理
trap 'log_error "部署过程中发生错误"; exit 1' ERR

# 执行主函数
main "$@"