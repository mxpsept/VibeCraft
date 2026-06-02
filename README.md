<div align="center">

# 🔨 VibeCraft

**让 AI 辅助开发从「随机应变」变成「有章可循」**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/yourusername/vibecraft?style=social)](https://github.com/yourusername/vibecraft)

[English](README.en.md) · [快速开始](#快速开始) · [模板列表](#模板列表) · [示例项目](#示例项目) · [贡献指南](CONTRIBUTING.md)

</div>

---

## 什么是 VibeCraft？

你是否遇到过这些问题：

- 用 Claude Code / Cursor 开发时，每次都要重新解释项目背景
- AI 生成的代码风格不一致，一会儿这样一会儿那样
- 多人协作时 AI 辅助开发缺乏统一规范
- 不知道如何把「Vibe Coding」用到企业级项目上

**VibeCraft 是一套 AI 辅助开发的方法论模板体系**，帮你用结构化文档让 AI Agent 像一个了解项目 3 个月的工程师一样工作。

### 核心理念

```
好的 CLAUDE.md = AI 永远在状态
好的 DESIGN.md = AI 永远出好看的 UI  
好的 .rules/   = AI 永远遵守你的规范
好的 ADR       = AI 永远理解你的决策
```

---

## 文档体系全貌

```
your-project/
│
├── CLAUDE.md                    # AI Agent 读的项目总入口
│   └── 项目定位 / 技术栈 / 架构 / 当前状态 / 工作指令
│
├── DESIGN.md                    # 视觉设计系统
│   └── 色彩 / 字体 / 间距 / 组件规范 / 交互规则
│
├── SKILL.md                     # AI 生成 UI 的硬性约束
│   └── 技术约束 / 质量门禁 / 组件规则 / 性能要求
│
├── .rules/                      # 四层规则体系（核心）
│   ├── enterprise.md            # 企业级：安全 / 日志 / 合规
│   ├── team.md                  # 团队级：分支 / 提交 / Review
│   ├── project.md               # 项目级：架构约定 / API 设计 / 数据模型
│   └── personal.md              # 个人级：编码哲学 / 工具偏好
│
├── .claude/commands/            # 自定义斜杠命令
│   ├── review.md                # /review 代码审查
│   └── adr.md                   # /adr 新建架构决策
│
└── docs/
    ├── adr/                     # 架构决策记录
    │   └── NNN-decision.md      # 每个重要决策一个文件
    └── rfc/                     # 重大功能提案
```

### 四层规则继承关系

```
personal.md    ← 最稳定，体现个人积累（几乎不变）
    ↓ 继承
enterprise.md  ← 行业通用，可跨公司复用
    ↓ 继承
team.md        ← 团队约定，可跨项目复用
    ↓ 继承
project.md     ← 项目专属，只写本项目独有内容
```

**每层只写这一层独有的内容，不重复上层规则。**

---

## 快速开始

### 方式一：CLI 安装（推荐）

```bash
# 安装
npm install -g vibecraft

# 在现有项目中初始化
cd your-project
vibecraft init

# 选择模板后，交互式填写项目信息
# VibeCraft 会生成定制化的文档体系
```

### 方式二：手动复制模板

```bash
# Clone 仓库
git clone https://github.com/yourusername/vibecraft.git

# 复制基础模板到你的项目
cp -r vibecraft/templates/* your-project/

# 按需填写 CLAUDE.md 中的项目信息
```

### 方式三：参考示例项目

直接查看 `examples/` 目录，有完整的真实项目示例：

- [`examples/aiforge/`](examples/aiforge/) — 企业级 AI 应用平台
- [`examples/saas-starter/`](examples/saas-starter/) — SaaS 产品脚手架  
- [`examples/data-platform/`](examples/data-platform/) — 数据分析平台

---

## 模板列表

### CLAUDE.md 模板

| 模板 | 适用场景 |
|------|---------|
| [`claude/fullstack-app.md`](templates/claude/fullstack-app.md) | 全栈 Web 应用 |
| [`claude/api-service.md`](templates/claude/api-service.md) | 后端 API 服务 |
| [`claude/ai-platform.md`](templates/claude/ai-platform.md) | AI 应用平台 |
| [`claude/open-source-lib.md`](templates/claude/open-source-lib.md) | 开源库/工具 |

### DESIGN.md 模板

| 模板 | 风格 | 适用场景 |
|------|------|---------|
| [`design/linear-dark.md`](templates/design/linear-dark.md) | Linear 暗色 | 开发者工具 / B 端 SaaS |
| [`design/vercel-minimal.md`](templates/design/vercel-minimal.md) | Vercel 极简 | 技术产品 / 开发平台 |
| [`design/stripe-professional.md`](templates/design/stripe-professional.md) | Stripe 专业 | 金融 / 企业服务 |
| [`design/notion-warm.md`](templates/design/notion-warm.md) | Notion 温暖 | 生产力工具 / 知识库 |

### .rules 模板

| 模板 | 说明 |
|------|------|
| [`rules/enterprise.md`](templates/rules/enterprise.md) | 企业级安全、日志、合规规范 |
| [`rules/team-github-flow.md`](templates/rules/team-github-flow.md) | GitHub Flow 分支策略 |
| [`rules/team-gitflow.md`](templates/rules/team-gitflow.md) | Gitflow 分支策略 |
| [`rules/personal-python.md`](templates/rules/personal-python.md) | Python 工程师个人规范 |
| [`rules/personal-typescript.md`](templates/rules/personal-typescript.md) | TypeScript 工程师个人规范 |
| [`rules/project-fastapi.md`](templates/rules/project-fastapi.md) | FastAPI 项目专属规范 |
| [`rules/project-nextjs.md`](templates/rules/project-nextjs.md) | Next.js 项目专属规范 |

---

## 示例项目

### AIForge — 企业级 AI 应用平台

> 这也是 VibeCraft 方法论的诞生地

```
examples/aiforge/
├── CLAUDE.md      # AI Gateway + RAG + Agent 平台的完整上下文
├── DESIGN.md      # Linear 风格暗色设计系统
├── SKILL.md       # 企业 AI 平台 UI 生成约束
├── .rules/
│   ├── enterprise.md   # 金融/能源行业安全规范
│   ├── team.md         # 小团队 GitHub Flow
│   ├── project.md      # FastAPI + LangChain 专属约定
│   └── personal.md     # 7年 Java 转 AI 工程师的经验积累
└── docs/adr/
    ├── 001-tech-stack-selection.md
    ├── 002-model-routing-strategy.md
    └── 003-open-webui-fork-strategy.md
```

---

## 为什么需要这套体系？

### 没有 VibeCraft 时

```
你：帮我写一个 API Key 管理模块
AI：好的，这是一个基于 Flask 的实现...
你：我们用 FastAPI！
AI：抱歉，这是 FastAPI 版本...
你：Key 要加密存储！
AI：好的，加上 bcrypt...
你：要有租户隔离！
AI：...（重写）
```

### 有了 VibeCraft 之后

```
你：帮我写一个 API Key 管理模块
AI：（读取 CLAUDE.md + .rules/project.md）
    好的，基于你的 FastAPI + PostgreSQL 技术栈，
    遵循 enterprise.md 的加密存储规范，
    带 tenant_id 多租户隔离，
    以下是实现...
```

**第一次就对，不需要反复纠正。**

---

## 与现有工具的关系

| 工具 | 定位 | VibeCraft 的角色 |
|------|------|----------------|
| Claude Code | AI 编码助手 | 读取 CLAUDE.md + .rules/ |
| Cursor | AI 编辑器 | 读取 .cursorrules（可转换） |
| Windsurf | AI 编辑器 | 读取 .windsurfrules（可转换） |
| awesome-design-md | 设计系统模板 | 作为 DESIGN.md 的内容来源 |
| awesome-cursorrules | Cursor 规则集 | 作为 .rules/ 的内容参考 |

VibeCraft 不替代任何工具，而是提供**跨工具的统一方法论**。

---

## 贡献

欢迎贡献新的模板、示例项目、或改进现有内容。

详见 [CONTRIBUTING.md](CONTRIBUTING.md)

**特别欢迎**：
- 不同行业的 enterprise.md（医疗、教育、电商）
- 不同框架的 project.md（Django、Spring Boot、Rust Axum）
- 不同设计风格的 DESIGN.md

---

## License

MIT © 2026 VibeCraft Contributors

---

<div align="center">

**如果这个项目对你有帮助，欢迎 Star ⭐**

*VibeCraft — Craft your AI development standards.*

</div>
