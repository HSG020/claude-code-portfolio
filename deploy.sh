#!/bin/bash

# Claude Code Portfolio 一键部署脚本
# 支持 GitHub Pages, Vercel, Netlify 等平台部署

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# 检查依赖
check_dependencies() {
    log_info "检查系统依赖..."
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装，请先安装 Node.js 16+"
        exit 1
    fi
    
    # 检查 npm
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装，请先安装 npm"
        exit 1
    fi
    
    # 检查 Git
    if ! command -v git &> /dev/null; then
        log_error "Git 未安装，请先安装 Git"
        exit 1
    fi
    
    log_success "系统依赖检查通过"
}

# 安装项目依赖
install_dependencies() {
    log_info "安装项目依赖..."
    
    if [ ! -f "package.json" ]; then
        log_error "package.json 文件不存在，请确保在项目根目录运行此脚本"
        exit 1
    fi
    
    npm install
    
    if [ $? -eq 0 ]; then
        log_success "依赖安装完成"
    else
        log_error "依赖安装失败"
        exit 1
    fi
}

# 构建项目
build_project() {
    log_info "构建生产版本..."
    
    npm run build
    
    if [ $? -eq 0 ]; then
        log_success "项目构建完成"
    else
        log_error "项目构建失败"
        exit 1
    fi
}

# 部署到 GitHub Pages
deploy_github_pages() {
    log_info "部署到 GitHub Pages..."
    
    # 检查 gh-pages 包
    if ! npm list gh-pages &> /dev/null; then
        log_warning "gh-pages 包未安装，正在安装..."
        npm install --save-dev gh-pages
    fi
    
    # 执行部署
    npm run deploy
    
    if [ $? -eq 0 ]; then
        log_success "已成功部署到 GitHub Pages"
        log_info "访问地址: https://yourusername.github.io/claude-code-portfolio/"
    else
        log_error "GitHub Pages 部署失败"
        exit 1
    fi
}

# 部署到 Vercel
deploy_vercel() {
    log_info "部署到 Vercel..."
    
    # 检查 Vercel CLI
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI 未安装，正在安装..."
        npm install -g vercel
    fi
    
    # 执行部署
    vercel --prod
    
    if [ $? -eq 0 ]; then
        log_success "已成功部署到 Vercel"
    else
        log_error "Vercel 部署失败"
        exit 1
    fi
}

# 部署到 Netlify
deploy_netlify() {
    log_info "部署到 Netlify..."
    
    # 检查 Netlify CLI
    if ! command -v netlify &> /dev/null; then
        log_warning "Netlify CLI 未安装，正在安装..."
        npm install -g netlify-cli
    fi
    
    # 执行部署
    netlify deploy --prod --dir=dist
    
    if [ $? -eq 0 ]; then
        log_success "已成功部署到 Netlify"
    else
        log_error "Netlify 部署失败"
        exit 1
    fi
}

# 本地预览
preview_local() {
    log_info "启动本地预览..."
    
    if [ ! -d "dist" ]; then
        log_warning "dist 目录不存在，正在构建..."
        build_project
    fi
    
    npm run preview
}

# 性能检测
run_lighthouse() {
    log_info "运行 Lighthouse 性能检测..."
    
    if ! command -v lighthouse &> /dev/null; then
        log_warning "Lighthouse 未安装，正在安装..."
        npm install -g lighthouse
    fi
    
    # 启动本地服务器进行检测
    npm run preview &
    SERVER_PID=$!
    
    # 等待服务器启动
    sleep 5
    
    # 运行 Lighthouse
    lighthouse http://localhost:4173 --output html --output-path ./lighthouse-report.html
    
    # 停止服务器
    kill $SERVER_PID
    
    log_success "Lighthouse 报告已生成: lighthouse-report.html"
}

# 清理构建文件
clean_build() {
    log_info "清理构建文件..."
    
    rm -rf dist
    rm -rf node_modules/.vite
    
    log_success "构建文件已清理"
}

# 更新依赖
update_dependencies() {
    log_info "更新项目依赖..."
    
    npm update
    npm audit fix
    
    log_success "依赖更新完成"
}

# 生成部署报告
generate_report() {
    log_info "生成部署报告..."
    
    REPORT_FILE="deployment-report.md"
    
    cat > $REPORT_FILE << EOF
# Claude Code Portfolio 部署报告

## 部署信息
- 部署时间: $(date)
- 部署版本: $(git rev-parse --short HEAD)
- Node.js 版本: $(node --version)
- npm 版本: $(npm --version)

## 构建统计
\`\`\`
$(du -sh dist 2>/dev/null || echo "构建目录不存在")
\`\`\`

## 文件列表
\`\`\`
$(find dist -type f 2>/dev/null | head -20 || echo "构建目录不存在")
\`\`\`

## Git 状态
\`\`\`
$(git status --porcelain)
\`\`\`

## 最近提交
\`\`\`
$(git log --oneline -5)
\`\`\`
EOF
    
    log_success "部署报告已生成: $REPORT_FILE"
}

# 显示帮助信息
show_help() {
    echo "Claude Code Portfolio 部署脚本"
    echo ""
    echo "用法: ./deploy.sh [选项]"
    echo ""
    echo "选项:"
    echo "  -h, --help              显示帮助信息"
    echo "  -i, --install           安装项目依赖"
    echo "  -b, --build             构建项目"
    echo "  -d, --deploy [平台]     部署到指定平台"
    echo "      可用平台: github, vercel, netlify"
    echo "  -p, --preview           本地预览"
    echo "  -l, --lighthouse        运行 Lighthouse 检测"
    echo "  -c, --clean             清理构建文件"
    echo "  -u, --update            更新依赖"
    echo "  -r, --report            生成部署报告"
    echo "  --full                  完整部署流程 (安装+构建+部署)"
    echo ""
    echo "示例:"
    echo "  ./deploy.sh --full github          # 完整部署到 GitHub Pages"
    echo "  ./deploy.sh --build --preview      # 构建并本地预览"
    echo "  ./deploy.sh --lighthouse           # 运行性能检测"
}

# 完整部署流程
full_deploy() {
    local platform=$1
    
    log_info "开始完整部署流程..."
    
    check_dependencies
    install_dependencies
    build_project
    
    case $platform in
        github)
            deploy_github_pages
            ;;
        vercel)
            deploy_vercel
            ;;
        netlify)
            deploy_netlify
            ;;
        *)
            log_warning "未指定部署平台，默认部署到 GitHub Pages"
            deploy_github_pages
            ;;
    esac
    
    generate_report
    
    log_success "完整部署流程完成！"
}

# 主函数
main() {
    case $1 in
        -h|--help)
            show_help
            ;;
        -i|--install)
            check_dependencies
            install_dependencies
            ;;
        -b|--build)
            build_project
            ;;
        -d|--deploy)
            case $2 in
                github)
                    deploy_github_pages
                    ;;
                vercel)
                    deploy_vercel
                    ;;
                netlify)
                    deploy_netlify
                    ;;
                *)
                    log_error "请指定部署平台: github, vercel, netlify"
                    exit 1
                    ;;
            esac
            ;;
        -p|--preview)
            preview_local
            ;;
        -l|--lighthouse)
            run_lighthouse
            ;;
        -c|--clean)
            clean_build
            ;;
        -u|--update)
            update_dependencies
            ;;
        -r|--report)
            generate_report
            ;;
        --full)
            full_deploy $2
            ;;
        "")
            log_info "开始默认部署流程..."
            full_deploy github
            ;;
        *)
            log_error "未知选项: $1"
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"