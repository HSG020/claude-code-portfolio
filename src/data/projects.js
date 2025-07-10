export const projects = [
  {
    id: 'ai-assistant-matrix',
    title: 'AI助手矩阵',
    subtitle: '智能对话系统集成平台',
    description: '集成多个AI模型的智能对话平台，支持多轮对话、上下文理解、个性化响应等功能。采用模块化架构设计，可扩展多种AI服务。',
    longDescription: `
      AI助手矩阵是一个革命性的智能对话系统集成平台，旨在为用户提供无缝的多AI模型体验。该项目整合了包括GPT、Claude、Gemini等在内的多个先进AI模型，通过统一的接口为用户提供智能对话服务。

      核心特性包括：
      • 多模型智能路由：根据对话内容自动选择最适合的AI模型
      • 上下文记忆管理：维护长期对话历史和用户偏好
      • 实时流式响应：支持实时流式对话，提供流畅的交互体验
      • 个性化定制：基于用户行为数据提供个性化响应
      • 多模态支持：支持文本、图片、语音等多种输入方式

      技术亮点：
      • 采用微服务架构，支持水平扩展
      • 实现了智能负载均衡和故障转移机制
      • 集成了高性能缓存系统，显著提升响应速度
      • 使用WebSocket技术实现实时双向通信
      • 具备完善的监控和日志系统
    `,
    image: '/project-screenshots/ai-assistant-matrix.webp',
    images: [
      '/project-screenshots/ai-assistant-matrix-1.webp',
      '/project-screenshots/ai-assistant-matrix-2.webp',
      '/project-screenshots/ai-assistant-matrix-3.webp'
    ],
    category: 'AI/ML',
    tags: ['AI', 'NLP', 'WebSocket', 'React', 'Python', 'FastAPI', 'Redis'],
    techStack: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Socket.io'],
      backend: ['Python', 'FastAPI', 'WebSocket', 'Redis', 'PostgreSQL'],
      ai: ['OpenAI API', 'Anthropic Claude', 'Google Gemini', 'Transformers'],
      infrastructure: ['Docker', 'Nginx', 'AWS', 'MongoDB']
    },
    features: [
      '多AI模型集成',
      '智能路由算法',
      '实时流式对话',
      '上下文记忆管理',
      '个性化响应',
      '多模态输入支持',
      '高并发处理',
      '智能缓存机制'
    ],
    stats: {
      linesOfCode: 15420,
      commits: 128,
      stars: 156,
      forks: 23,
      issues: 8,
      contributors: 1,
      version: 'v2.1.0'
    },
    timeline: {
      started: '2024-09-15',
      completed: '2024-11-20',
      duration: '2个月',
      lastUpdate: '2024-12-15'
    },
    links: {
      github: 'https://github.com/HSG020/ai-assistant-matrix',
      demo: 'https://ai-assistant-matrix.vercel.app',
      docs: 'https://ai-assistant-matrix.gitbook.io'
    },
    status: 'completed',
    priority: 'high',
    difficulty: 'expert',
    performance: {
      responseTime: '< 500ms',
      uptime: '99.9%',
      concurrent: '1000+ users',
      accuracy: '94.5%'
    }
  },
  {
    id: 'content-empire-automation',
    title: '内容帝国自动化',
    subtitle: '全栈内容创作自动化平台',
    description: '基于AI的内容创作和管理自动化平台，支持文章生成、SEO优化、多平台发布、数据分析等全流程自动化操作。',
    longDescription: `
      内容帝国自动化是一个革命性的内容创作生态系统，利用先进的AI技术实现从内容策划到发布推广的全流程自动化。该平台专为内容创作者、营销团队和企业设计，旨在大幅提升内容创作效率和质量。

      核心功能模块：
      • AI内容生成引擎：基于最新的大语言模型，生成高质量的原创内容
      • SEO智能优化：自动分析关键词趋势，优化内容结构和元数据
      • 多平台发布系统：支持同时发布到多个社交媒体和内容平台
      • 数据分析仪表板：实时监控内容表现，提供详细的数据洞察
      • 内容调度器：智能安排发布时间，最大化内容曝光效果

      创新特性：
      • 基于用户行为的内容个性化推荐
      • 实时热点追踪和快速响应机制
      • 智能内容质量评估和优化建议
      • 多语言内容生成和本地化适配
      • 版权检测和原创性验证
    `,
    image: '/project-screenshots/content-empire.webp',
    images: [
      '/project-screenshots/content-empire-1.webp',
      '/project-screenshots/content-empire-2.webp',
      '/project-screenshots/content-empire-3.webp'
    ],
    category: '自动化',
    tags: ['自动化', 'AI', 'SEO', 'CMS', 'Python', 'React', 'API'],
    techStack: {
      frontend: ['React', 'Next.js', 'TypeScript', 'Material-UI', 'Chart.js'],
      backend: ['Python', 'Django', 'Celery', 'Redis', 'PostgreSQL'],
      ai: ['OpenAI GPT-4', 'BERT', 'spaCy', 'NLTK'],
      automation: ['Selenium', 'Playwright', 'BeautifulSoup', 'Scrapy'],
      infrastructure: ['Docker', 'AWS', 'GitHub Actions', 'Prometheus']
    },
    features: [
      'AI内容生成',
      'SEO自动优化',
      '多平台发布',
      '实时数据分析',
      '内容调度管理',
      '热点追踪',
      '质量评估',
      '版权检测'
    ],
    stats: {
      linesOfCode: 22350,
      commits: 203,
      stars: 289,
      forks: 45,
      issues: 12,
      contributors: 1,
      version: 'v3.2.1'
    },
    timeline: {
      started: '2024-08-01',
      completed: '2024-12-10',
      duration: '4个月',
      lastUpdate: '2024-12-28'
    },
    links: {
      github: 'https://github.com/HSG020/content-empire-automation',
      demo: 'https://content-empire.netlify.app',
      docs: 'https://content-empire.gitbook.io'
    },
    status: 'active',
    priority: 'high',
    difficulty: 'expert',
    performance: {
      contentGenerated: '10,000+ 篇',
      platformsSupported: '15+',
      automationRate: '95%',
      seoImprovement: '+150%'
    }
  },
  {
    id: 'ai-stock-research',
    title: 'AI股票研究助手',
    subtitle: '智能化股票分析和预测平台',
    description: '基于机器学习的股票分析系统，提供实时数据分析、技术指标计算、智能预测、风险评估等功能。支持多市场数据源集成。',
    longDescription: `
      AI股票研究助手是一个专业级的金融数据分析平台，结合了传统技术分析、基本面分析和先进的机器学习算法，为投资者提供全方位的股票研究工具。该系统能够处理海量的金融数据，提供精准的市场洞察和投资建议。

      核心分析模块：
      • 技术分析引擎：自动计算RSI、MACD、布林带等50+技术指标
      • 基本面分析系统：深度分析财务报表和公司基本面数据
      • 机器学习预测模型：基于历史数据预测价格走势
      • 情绪分析系统：分析新闻和社交媒体情绪对股价的影响
      • 风险管理工具：实时风险评估和组合优化建议

      先进特性：
      • 多维度数据融合分析
      • 实时异常检测和预警系统
      • 智能投资组合优化
      • 个性化投资策略推荐
      • 高频数据处理能力
      • 支撑阻力位智能识别
    `,
    image: '/project-screenshots/stock-research.webp',
    images: [
      '/project-screenshots/stock-research-1.webp',
      '/project-screenshots/stock-research-2.webp',
      '/project-screenshots/stock-research-3.webp'
    ],
    category: 'AI/ML',
    tags: ['AI', 'Finance', 'ML', 'Python', 'React', 'WebSocket', 'Redis'],
    techStack: {
      frontend: ['React', 'TypeScript', 'D3.js', 'TradingView', 'WebSocket'],
      backend: ['Python', 'FastAPI', 'pandas', 'NumPy', 'Redis'],
      ml: ['scikit-learn', 'TensorFlow', 'PyTorch', 'TA-Lib'],
      data: ['Alpha Vantage', 'Yahoo Finance', 'PostgreSQL', 'InfluxDB'],
      infrastructure: ['Docker', 'Kubernetes', 'AWS', 'Prometheus']
    },
    features: [
      '实时股价监控',
      '技术指标分析',
      'ML价格预测',
      '基本面分析',
      '情绪分析',
      '风险评估',
      '投资组合优化',
      '智能预警系统'
    ],
    stats: {
      linesOfCode: 18750,
      commits: 167,
      stars: 234,
      forks: 38,
      issues: 15,
      contributors: 1,
      version: 'v2.5.0'
    },
    timeline: {
      started: '2024-10-15',
      completed: '2024-12-20',
      duration: '2个月',
      lastUpdate: '2025-01-05'
    },
    links: {
      github: 'https://github.com/HSG020/ai-stock-research',
      demo: 'https://ai-stock-research.herokuapp.com',
      docs: 'https://ai-stock-research.gitbook.io'
    },
    status: 'completed',
    priority: 'high',
    difficulty: 'expert',
    performance: {
      dataPoints: '100M+',
      accuracy: '87.3%',
      latency: '< 200ms',
      markets: '10+'
    }
  },
  {
    id: 'ai-software-factory',
    title: 'AI软件工厂',
    subtitle: '智能化软件开发平台',
    description: '基于AI的软件开发自动化平台，支持需求分析、代码生成、测试、部署等全生命周期管理。包含云服务部署和监控自动修复系统。',
    longDescription: `
      AI软件工厂是一个突破性的软件开发自动化平台，旨在革命性地改变传统软件开发流程。该平台利用最新的AI技术，实现从需求分析到部署运维的全流程自动化，极大提升开发效率和软件质量。

      核心自动化模块：
      • 智能需求分析：自动解析用户需求，生成详细的技术规格文档
      • AI代码生成器：基于需求自动生成高质量的可执行代码
      • 自动化测试套件：智能生成和执行全覆盖的测试用例
      • 云服务部署器：一键部署到多个云平台，支持容器化和微服务
      • 监控修复系统：实时监控系统状态，自动检测并修复问题

      创新技术特性：
      • 基于大语言模型的代码生成
      • 智能架构设计和优化建议
      • 自适应性能调优
      • 安全漏洞自动检测和修复
      • 智能运维和故障预测
      • 多语言多框架支持
    `,
    image: '/project-screenshots/software-factory.webp',
    images: [
      '/project-screenshots/software-factory-1.webp',
      '/project-screenshots/software-factory-2.webp',
      '/project-screenshots/software-factory-3.webp'
    ],
    category: '自动化',
    tags: ['AI', 'DevOps', 'Automation', 'Python', 'Docker', 'Kubernetes', 'Monitoring'],
    techStack: {
      frontend: ['React', 'TypeScript', 'Ant Design', 'Monaco Editor'],
      backend: ['Python', 'FastAPI', 'Celery', 'PostgreSQL', 'Redis'],
      ai: ['OpenAI Codex', 'GitHub Copilot', 'CodeT5', 'AST Parser'],
      devops: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
      monitoring: ['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger']
    },
    features: [
      'AI需求分析',
      '自动代码生成',
      '智能测试生成',
      '云服务部署',
      '监控自动修复',
      '性能优化',
      '安全扫描',
      '多平台支持'
    ],
    stats: {
      linesOfCode: 28900,
      commits: 312,
      stars: 445,
      forks: 67,
      issues: 23,
      contributors: 1,
      version: 'v4.1.0'
    },
    timeline: {
      started: '2024-11-01',
      completed: '2025-01-10',
      duration: '2.5个月',
      lastUpdate: '2025-01-10'
    },
    links: {
      github: 'https://github.com/HSG020/ai-software-factory',
      demo: 'https://ai-software-factory.vercel.app',
      docs: 'https://ai-software-factory.gitbook.io'
    },
    status: 'completed',
    priority: 'high',
    difficulty: 'expert',
    performance: {
      codeGenerated: '500K+ lines',
      deploymentsAutomated: '1000+',
      bugsFixes: '95%',
      timeReduction: '70%'
    }
  },
  {
    id: 'code-hero-game',
    title: 'Code Hero 游戏',
    subtitle: '编程教育互动游戏平台',
    description: '寓教于乐的编程学习游戏，通过游戏化的方式教授编程概念。包含关卡系统、技能树、音效系统和成就系统。',
    longDescription: `
      Code Hero 是一个创新的编程教育游戏平台，将复杂的编程概念转化为有趣的游戏体验。通过精心设计的关卡和挑战，让学习者在娱乐中掌握编程技能，从基础语法到高级算法，循序渐进地提升编程能力。

      游戏核心系统：
      • 渐进式关卡设计：从简单的变量概念到复杂的算法实现
      • 技能树系统：解锁新的编程技能和高级功能
      • 实时代码编辑器：内置代码编辑器，支持多种编程语言
      • 智能提示系统：根据学习进度提供个性化的编程提示
      • 成就和排行榜：激励学习者持续进步

      教育创新特色：
      • 可视化编程概念演示
      • 交互式调试和错误处理
      • 同伴协作编程模式
      • AI驱动的学习路径推荐
      • 实时性能反馈和优化建议
      • 多难度级别适配不同水平学习者
    `,
    image: '/project-screenshots/code-hero.webp',
    images: [
      '/project-screenshots/code-hero-1.webp',
      '/project-screenshots/code-hero-2.webp',
      '/project-screenshots/code-hero-3.webp'
    ],
    category: '游戏',
    tags: ['游戏', '教育', 'JavaScript', 'Canvas', 'WebAudio', 'Animation'],
    techStack: {
      frontend: ['HTML5 Canvas', 'JavaScript', 'Web Audio API', 'CSS3'],
      backend: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
      game: ['Phaser.js', 'Matter.js', 'Tween.js', 'Particle.js'],
      editor: ['Monaco Editor', 'CodeMirror', 'Highlight.js'],
      infrastructure: ['Vercel', 'MongoDB Atlas', 'CDN']
    },
    features: [
      '多关卡游戏系统',
      '实时代码编辑',
      '音效和动画',
      '技能进阶系统',
      '成就排行榜',
      '多人协作模式',
      '代码执行引擎',
      '学习进度追踪'
    ],
    stats: {
      linesOfCode: 12450,
      commits: 89,
      stars: 178,
      forks: 31,
      issues: 6,
      contributors: 1,
      version: 'v1.8.0'
    },
    timeline: {
      started: '2024-09-20',
      completed: '2024-11-15',
      duration: '2个月',
      lastUpdate: '2024-12-05'
    },
    links: {
      github: 'https://github.com/HSG020/code-hero-game',
      demo: 'https://code-hero-game.vercel.app',
      docs: 'https://code-hero-game.gitbook.io'
    },
    status: 'completed',
    priority: 'medium',
    difficulty: 'intermediate',
    performance: {
      activeUsers: '2500+',
      completionRate: '78%',
      averageTime: '45 min',
      skillsLearned: '25+'
    }
  }
]

// 项目分类
export const projectCategories = [
  { value: 'all', label: '全部项目', count: projects.length },
  { value: 'AI/ML', label: 'AI/机器学习', count: projects.filter(p => p.category === 'AI/ML').length },
  { value: '自动化', label: '自动化工具', count: projects.filter(p => p.category === '自动化').length },
  { value: '游戏', label: '游戏开发', count: projects.filter(p => p.category === '游戏').length },
  { value: 'Web应用', label: 'Web应用', count: projects.filter(p => p.category === 'Web应用').length }
]

// 技术标签
export const allTags = [
  ...new Set(projects.flatMap(project => project.tags))
].sort()

// 项目统计
export const projectStats = {
  total: projects.length,
  completed: projects.filter(p => p.status === 'completed').length,
  active: projects.filter(p => p.status === 'active').length,
  totalLinesOfCode: projects.reduce((sum, p) => sum + p.stats.linesOfCode, 0),
  totalCommits: projects.reduce((sum, p) => sum + p.stats.commits, 0),
  totalStars: projects.reduce((sum, p) => sum + p.stats.stars, 0),
  averageDifficulty: projects.filter(p => p.difficulty === 'expert').length / projects.length * 100
}

// 技术栈统计
export const techStackStats = {
  frontend: ['React', 'TypeScript', 'Vue.js', 'HTML5 Canvas', 'Tailwind CSS'],
  backend: ['Python', 'Node.js', 'FastAPI', 'Django', 'Express'],
  ai: ['OpenAI API', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Transformers'],
  database: ['PostgreSQL', 'MongoDB', 'Redis', 'InfluxDB'],
  infrastructure: ['Docker', 'Kubernetes', 'AWS', 'Vercel', 'GitHub Actions']
}

export default projects