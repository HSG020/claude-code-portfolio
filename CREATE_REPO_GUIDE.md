# 🚀 Claude Code Portfolio 新仓库创建与部署指南

本指南将帮助您在 GitHub 上创建新仓库并成功部署 Claude Code Portfolio 项目。

## 📋 准备工作

确保您已经：
- ✅ 登录 GitHub 账户
- ✅ 安装了 Git
- ✅ 安装了 Node.js 和 npm
- ✅ 项目路径：`/Users/hsh/Desktop/AI工具调研项目-2025/automation/scripts/claude-code-portfolio`

---

## 🎯 步骤 1：在 GitHub 创建新仓库

### 1.1 访问创建页面
打开浏览器，访问：**https://github.com/new**

### 1.2 填写仓库信息
在创建页面填写以下信息：

```
Repository name: claude-code-portfolio
Description: Claude Code Portfolio - AI开发能力展示作品集
```

### 1.3 重要设置
- **Public/Private**: 选择 **Public** （公开）⚠️ 必须选择 Public
- **Initialize this repository**: 
  - ❌ 不要勾选 "Add a README file"
  - ❌ 不要勾选 "Add .gitignore"
  - ❌ 不要选择 License

### 1.4 创建仓库
点击绿色的 **"Create repository"** 按钮

### 1.5 保存仓库地址
创建成功后，您会看到类似这样的地址：
```
https://github.com/HSG020/claude-code-portfolio.git
```

---

## 🛠️ 步骤 2：部署项目到新仓库

### 2.1 打开终端
打开终端（Terminal）并进入项目目录：
```bash
cd /Users/hsh/Desktop/AI工具调研项目-2025/automation/scripts/claude-code-portfolio
```

### 2.2 运行部署脚本
执行以下命令来部署项目：
```bash
# 确保脚本有执行权限
chmod +x deploy-to-new-repo.sh

# 运行部署脚本
./deploy-to-new-repo.sh
```

### 2.3 等待部署完成
脚本会自动：
1. 初始化 Git 仓库
2. 构建项目
3. 部署到 GitHub Pages
4. 显示部署进度

---

## ✅ 步骤 3：验证部署

### 3.1 检查 GitHub Pages 设置
1. 访问：`https://github.com/HSG020/claude-code-portfolio/settings/pages`
2. 确认以下设置：
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `/ (root)`
   - 显示绿色勾号 ✅ "Your site is live at..."

### 3.2 访问网站
部署成功后（通常需要 1-5 分钟），访问：
```
https://HSG020.github.io/claude-code-portfolio/
```

### 3.3 验证内容
您应该看到：
- 🎨 精美的作品集首页
- 📂 5个AI项目展示
- 📊 开发统计数据
- 👨‍💻 关于页面
- 🎭 流畅的动画效果

---

## 🔧 故障排除

### 问题 1：网站显示 404
**解决方案**：
1. 确认仓库是 Public（公开）
2. 等待 5-10 分钟让 GitHub Pages 生效
3. 检查 Settings > Pages 中的部署状态

### 问题 2：网站显示空白页面
**解决方案**：
1. 清除浏览器缓存
2. 使用无痕模式访问
3. 确认 gh-pages 分支存在

### 问题 3：部署脚本报错
**解决方案**：
1. 确认已安装所有依赖：`npm install`
2. 确认 Git 配置正确：`git config --list`
3. 手动执行部署命令查看详细错误

---

## 📝 手动部署命令（备用）

如果自动脚本失败，可以手动执行以下命令：

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加远程仓库
git remote add origin https://github.com/HSG020/claude-code-portfolio.git

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "Initial commit: Claude Code Portfolio"

# 5. 推送到主分支
git push -u origin main

# 6. 构建项目
npm run build

# 7. 部署到 GitHub Pages
npm run deploy
```

---

## 🎉 部署成功标志

当您看到以下内容时，说明部署成功：
- ✅ 终端显示 "Published to gh-pages"
- ✅ GitHub 仓库有 `gh-pages` 分支
- ✅ 网站可以正常访问
- ✅ 所有页面和功能正常工作

---

## 📞 需要帮助？

如果遇到问题：
1. 检查本指南的故障排除部分
2. 查看部署日志文件：`deployment.log`
3. 确认所有前置条件都已满足

祝您部署成功！🚀