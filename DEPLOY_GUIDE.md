# Claude Code Portfolio - GitHub Pages 部署指南

## 🚀 快速开始

### 一键自动部署
```bash
# 使脚本可执行
chmod +x setup-github-deploy.sh

# 执行自动部署
./setup-github-deploy.sh
```

## 📋 部署前检查清单

### ✅ 必需条件
- [ ] 已安装 Node.js (16+ 版本)
- [ ] 已安装 Git
- [ ] GitHub 账户
- [ ] GitHub 仓库已创建并配置远程地址

### ✅ 项目状态检查
```bash
# 检查是否在项目根目录
ls package.json vite.config.js

# 检查 Git 状态
git status

# 检查远程仓库
git remote -v
```

## 🛠️ 手动部署步骤

如果自动部署脚本遇到问题，可以按照以下步骤手动部署：

### 1. 配置 Git 用户信息
```bash
# 检查当前配置
git config user.name
git config user.email

# 如果未配置，设置用户信息
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2. 检测 GitHub 仓库信息
```bash
# 获取远程仓库 URL
git remote get-url origin

# 从 URL 中提取用户名和仓库名
# 例如: https://github.com/username/repository-name.git
```

### 3. 更新配置文件

#### 更新 vite.config.js
```javascript
export default defineConfig({
  base: '/your-repository-name/',  // 替换为实际仓库名
  // ... 其他配置
})
```

#### 更新 package.json
```json
{
  "homepage": "https://username.github.io/repository-name/",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 4. 安装部署依赖
```bash
npm install --save-dev gh-pages
npm install
```

### 5. 构建和部署
```bash
# 构建项目
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 🔧 GitHub Pages 设置

### 启用 GitHub Pages
1. 前往 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 向下滚动到 **Pages** 部分
4. 在 **Source** 下选择 **Deploy from a branch**
5. 选择 **gh-pages** 分支
6. 点击 **Save**

### 自定义域名 (可选)
1. 在 **Pages** 设置中的 **Custom domain** 字段输入域名
2. 确保 DNS 设置正确指向 GitHub Pages
3. 启用 **Enforce HTTPS**

## 🎯 访问地址

部署成功后，你的网站将在以下地址可用：
```
https://username.github.io/repository-name/
```

## 🚨 常见问题和解决方案

### 问题 1: 404 错误
**症状**: 访问网站显示 404 Not Found

**解决方案**:
1. 检查 GitHub Pages 是否已启用
2. 确认选择了正确的分支 (gh-pages)
3. 检查 `vite.config.js` 中的 `base` 配置是否正确
4. 等待几分钟让 GitHub Pages 生效

### 问题 2: 资源加载失败
**症状**: 页面显示但 CSS/JS 文件 404

**解决方案**:
1. 检查 `base` 路径配置
2. 确保构建时使用了正确的 base 路径
3. 清除浏览器缓存重新访问

### 问题 3: gh-pages 部署失败
**症状**: `gh-pages` 命令执行失败

**解决方案**:
```bash
# 清理 gh-pages 缓存
npx gh-pages-clean

# 重新安装 gh-pages
npm uninstall gh-pages
npm install --save-dev gh-pages

# 重新部署
npm run deploy
```

### 问题 4: Git 推送权限错误
**症状**: Permission denied 错误

**解决方案**:
1. 检查 GitHub 账户权限
2. 使用 SSH 密钥或个人访问令牌
3. 配置 Git 凭据管理器

### 问题 5: 构建失败
**症状**: `npm run build` 失败

**解决方案**:
```bash
# 清理依赖重新安装
rm -rf node_modules package-lock.json
npm install

# 检查 Node.js 版本
node --version  # 确保 16+ 版本

# 清理构建缓存
rm -rf dist .vite
npm run build
```

## 🔍 验证部署

### 部署后检查
1. **GitHub Pages 状态**
   - 前往仓库 Settings > Pages
   - 确认显示绿色勾号和网站地址

2. **网站功能测试**
   - 访问主页
   - 测试页面导航
   - 检查响应式设计
   - 验证 PWA 功能

3. **性能检查**
   ```bash
   # 使用 Lighthouse 检查性能
   npm run lighthouse
   ```

### 部署状态监控
- 在 GitHub 仓库的 **Actions** 标签页查看部署日志
- 检查 **Deployments** 部分的部署历史

## 🔄 更新部署

### 更新网站内容
```bash
# 修改代码后重新部署
git add .
git commit -m "Update portfolio content"
git push origin main

# 重新部署到 GitHub Pages
npm run deploy
```

### 自动化部署 (可选)
创建 GitHub Actions 工作流实现自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm install
    - run: npm run build
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 📊 性能优化

### 构建优化
- 启用代码分割 (已配置)
- 压缩图片资源
- 使用 CDN 加速
- 启用 PWA 缓存

### 监控工具
- Google Analytics
- Lighthouse 性能报告
- GitHub Pages 使用统计

## 🆘 获取帮助

### 官方文档
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages 包文档](https://www.npmjs.com/package/gh-pages)

### 社区支持
- GitHub Discussions
- Stack Overflow
- Vite 官方 Discord

## 📈 后续步骤

### 增强功能
1. **添加自定义域名**
2. **配置 CDN 加速**
3. **集成分析工具**
4. **设置 SEO 优化**
5. **添加站点地图**

### 维护建议
- 定期更新依赖包
- 监控网站性能
- 备份重要配置
- 关注安全更新

---

## 🎉 部署成功！

恭喜！你的 Claude Code Portfolio 现在已经成功部署到 GitHub Pages。

**快速访问链接**: https://username.github.io/repository-name/

如果遇到任何问题，请参考上述故障排除指南或查看部署报告文件。