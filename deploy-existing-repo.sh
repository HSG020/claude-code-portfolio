#!/bin/bash

# Claude Code Portfolio - 部署到现有仓库
# 处理仓库已存在的情况，直接部署项目

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
║        Claude Code Portfolio 现有仓库部署系统                 ║
║                                                                ║
║  📦 使用现有 GitHub 仓库                                       ║
║  🚀 完全自动化构建和部署                                      ║
║  ✨ 清理并重新部署所有内容                                    ║
╚════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# 初始化仓库
init_repo() {
    log_step "初始化仓库配置..."
    
    # 删除现有 git 配置
    if [ -d .git ]; then
        log_warning "清理现有 Git 配置..."
        rm -rf .git
    fi
    
    # 重新初始化
    git init
    git branch -M main
    git remote add origin "$REPO_URL"
    
    log_success "仓库配置完成"
}

# 安装依赖并构建
build_project() {
    log_step "安装依赖并构建项目..."
    
    # 清理旧文件
    rm -rf node_modules package-lock.json dist 2>/dev/null || true
    
    # 安装依赖
    log_info "安装依赖..."
    npm install
    
    # 确保 gh-pages 已安装
    if ! npm list gh-pages &> /dev/null; then
        npm install --save-dev gh-pages
    fi
    
    # 构建项目
    log_info "构建项目..."
    npm run build
    
    # 验证构建
    if [ -d dist ] && [ -f dist/index.html ]; then
        log_success "项目构建成功"
        log_info "构建文件："
        ls -la dist/
    else
        log_error "项目构建失败"
        exit 1
    fi
}

# 提交代码
commit_code() {
    log_step "提交代码..."
    
    # 确保 .gitignore 存在
    if [ ! -f .gitignore ]; then
        cat > .gitignore << 'EOF'
node_modules/
dist/
.env*
*.log
.DS_Store
coverage/
.nyc_output/
EOF
    fi
    
    # 添加所有文件
    git add .
    
    # 检查是否有变化
    if git diff --staged --quiet; then
        log_warning "没有检测到代码变化"
    else
        # 提交
        git commit -m "🚀 Deploy: Updated Claude Code Portfolio

✨ 最新的AI开发能力展示作品集
🎯 包含完整的5个AI项目
🎨 现代化响应式设计
📱 优化的移动端体验

🤖 Auto-deployed $(date '+%Y-%m-%d %H:%M:%S')"
        
        log_success "代码提交完成"
    fi
}

# 推送到 GitHub
push_to_github() {
    log_step "推送到 GitHub..."
    
    # 强制推送到 main 分支
    if git push -f origin main; then
        log_success "代码推送成功"
    else
        log_error "推送失败"
        exit 1
    fi
}

# 部署到 GitHub Pages
deploy_to_pages() {
    log_step "部署到 GitHub Pages..."
    
    log_info "开始部署到 gh-pages 分支..."
    if npm run deploy; then
        log_success "GitHub Pages 部署成功！"
    else
        log_error "GitHub Pages 部署失败"
        exit 1
    fi
}

# 验证部署
verify_deployment() {
    log_step "验证部署..."
    
    local site_url="https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
    
    # 等待一会儿
    log_info "等待 GitHub Pages 更新..."
    sleep 10
    
    # 检查网站
    log_info "检查网站状态..."
    local status_code=$(curl -s -o /dev/null -w "%{http_code}" "$site_url" 2>/dev/null || echo "000")
    
    if [ "$status_code" = "200" ]; then
        log_success "✅ 网站响应正常"
    else
        log_warning "⚠️ 网站状态: $status_code (可能还在更新)"
    fi
    
    echo ""
    log_deploy "🌐 网站地址: $site_url"
    log_deploy "📁 仓库地址: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
    log_deploy "⚙️ Pages 设置: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
}

# 显示结果
show_results() {
    echo -e "${CYAN}"
    cat << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║                   🎉 部署完成！                               ║
╚════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    local site_url="https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
    
    log_success "Claude Code Portfolio 部署成功！"
    echo ""
    log_info "📋 部署摘要："
    echo "   ✅ 项目构建完成"
    echo "   ✅ 代码推送到 GitHub"  
    echo "   ✅ GitHub Pages 部署完成"
    echo ""
    log_deploy "🚀 立即访问: $site_url"
    echo ""
    log_info "⏱️  网站通常需要 1-5 分钟完全生效"
    log_success "🎊 您的作品集现已在线展示！"
}

# 主函数
main() {
    show_banner
    init_repo
    build_project
    commit_code
    push_to_github
    deploy_to_pages
    verify_deployment
    show_results
}

# 错误处理
trap 'log_error "部署失败"; exit 1' ERR

# 执行
main "$@"