export const stats = [
  {
    value: 5,
    suffix: '',
    label: '完成项目',
    icon: '🚀',
    description: '高质量AI驱动项目',
    color: 'blue',
    trend: '+100%'
  },
  {
    value: 97241,
    suffix: '',
    label: '代码行数',
    icon: '💻',
    description: '精心编写的代码',
    color: 'green',
    trend: '+150%'
  },
  {
    value: 899,
    suffix: '',
    label: 'Git提交',
    icon: '📝',
    description: '持续的开发迭代',
    color: 'purple',
    trend: '+200%'
  },
  {
    value: 1302,
    suffix: '',
    label: 'GitHub星标',
    icon: '⭐',
    description: '社区认可度',
    color: 'yellow',
    trend: '+180%'
  },
  {
    value: 204,
    suffix: '',
    label: 'Fork数量',
    icon: '🔄',
    description: '项目影响力',
    color: 'indigo',
    trend: '+90%'
  },
  {
    value: 99.2,
    suffix: '%',
    label: '代码质量',
    icon: '✅',
    description: '高标准代码质量',
    color: 'green',
    trend: '+5%'
  },
  {
    value: 15,
    suffix: '+',
    label: '技术栈',
    icon: '🛠️',
    description: '掌握的技术数量',
    color: 'orange',
    trend: '+25%'
  },
  {
    value: 150,
    suffix: '',
    label: '开发天数',
    icon: '📅',
    description: '持续开发时间',
    color: 'teal',
    trend: 'steady'
  }
]

// 详细技术统计
export const techStats = {
  languages: [
    { name: 'Python', percentage: 35, projects: 4, lines: 34000 },
    { name: 'JavaScript/TypeScript', percentage: 30, projects: 5, lines: 28000 },
    { name: 'HTML/CSS', percentage: 15, projects: 5, lines: 15000 },
    { name: 'SQL', percentage: 10, projects: 3, lines: 8000 },
    { name: 'Shell/Bash', percentage: 5, projects: 4, lines: 3000 },
    { name: 'YAML/JSON', percentage: 5, projects: 5, lines: 2000 }
  ],
  frameworks: [
    { name: 'React', count: 4, category: 'Frontend' },
    { name: 'FastAPI', count: 3, category: 'Backend' },
    { name: 'Django', count: 2, category: 'Backend' },
    { name: 'Express.js', count: 2, category: 'Backend' },
    { name: 'TensorFlow', count: 2, category: 'AI/ML' },
    { name: 'PyTorch', count: 2, category: 'AI/ML' },
    { name: 'Docker', count: 5, category: 'DevOps' },
    { name: 'Kubernetes', count: 2, category: 'DevOps' }
  ],
  tools: [
    { name: 'Git', proficiency: 95 },
    { name: 'Docker', proficiency: 90 },
    { name: 'AWS', proficiency: 85 },
    { name: 'MongoDB', proficiency: 88 },
    { name: 'PostgreSQL', proficiency: 92 },
    { name: 'Redis', proficiency: 87 },
    { name: 'Nginx', proficiency: 83 },
    { name: 'GitHub Actions', proficiency: 89 }
  ]
}

// 项目复杂度分析
export const complexityStats = {
  beginner: 0,
  intermediate: 1,
  advanced: 1,
  expert: 3
}

// 开发时间线数据
export const timelineStats = [
  {
    month: '2024-08',
    projects: 1,
    commits: 45,
    lines: 8500
  },
  {
    month: '2024-09',
    projects: 2,
    commits: 123,
    lines: 18000
  },
  {
    month: '2024-10',
    projects: 1,
    commits: 167,
    lines: 18750
  },
  {
    month: '2024-11',
    projects: 2,
    commits: 217,
    lines: 27870
  },
  {
    month: '2024-12',
    projects: 1,
    commits: 203,
    lines: 22350
  },
  {
    month: '2025-01',
    projects: 1,
    commits: 144,
    lines: 1771
  }
]

// 成就系统
export const achievements = [
  {
    id: 'first-project',
    title: '首个项目',
    description: '完成第一个开源项目',
    icon: '🎯',
    unlocked: true,
    date: '2024-08-15'
  },
  {
    id: 'ai-expert',
    title: 'AI专家',
    description: '完成3个AI相关项目',
    icon: '🧠',
    unlocked: true,
    date: '2024-11-20'
  },
  {
    id: 'code-master',
    title: '代码大师',
    description: '编写超过50,000行代码',
    icon: '💻',
    unlocked: true,
    date: '2024-12-01'
  },
  {
    id: 'star-collector',
    title: '星标收集者',
    description: '获得超过1000个GitHub星标',
    icon: '⭐',
    unlocked: true,
    date: '2024-12-20'
  },
  {
    id: 'automation-guru',
    title: '自动化大师',
    description: '创建多个自动化工具',
    icon: '🤖',
    unlocked: true,
    date: '2024-12-10'
  },
  {
    id: 'full-stack',
    title: '全栈开发者',
    description: '掌握前后端多种技术',
    icon: '🔧',
    unlocked: true,
    date: '2024-09-30'
  }
]

// 技能等级
export const skillLevels = {
  'AI/机器学习': 95,
  '前端开发': 92,
  '后端开发': 94,
  '数据分析': 89,
  'DevOps': 87,
  '自动化': 96,
  '游戏开发': 78,
  '移动开发': 65
}

// 项目影响力统计
export const impactStats = {
  totalDownloads: 15600,
  totalUsers: 8900,
  totalForks: 204,
  totalStars: 1302,
  totalIssues: 64,
  totalPRs: 28,
  communitySize: 450
}

// 代码质量指标
export const qualityMetrics = {
  codeReviews: 156,
  testsWritten: 324,
  bugReports: 23,
  securityIssues: 0,
  codeComplexity: 'Low',
  maintainabilityIndex: 87,
  technicalDebt: 'Minimal'
}

export default stats