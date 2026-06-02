# AIForge — CLAUDE.md

> 这是 AI Agent 的项目总入口。每次开始工作前必须读完本文件。

## 项目一句话定位

**AIForge** 是一个企业级 AI 应用平台，基于 Open WebUI 二开，核心解决企业在使用开源 AI 工具时缺失的工程规范能力：多租户隔离、API Key 管理、用量审计、模型路由、RAG 知识库权限控制。

目标用户：企业 IT 团队 / AI 平台负责人  
开源目标：积累影响力，展示全栈 AI 工程能力

---

## 关键上下文（必读）

### 技术栈
- **后端**: Python · FastAPI · LangChain · LangGraph
- **前端**: Open WebUI（二开）· Vue3
- **模型**: 本地 Qwen3:9b（Ollama）+ 云端 DashScope API
- **存储**: PostgreSQL · Redis · Milvus · Elasticsearch
- **部署**: Docker Compose · 一键启动

### 架构分层
```
Open WebUI (前端二开)
    ↓
AI Gateway (FastAPI) ← 核心层，所有请求必经
    ↓              ↓
RAG Engine      Agent Engine
(LangChain)    (LangGraph)
    ↓
模型层: Ollama(本地) / DashScope(云端)
```

### 路由策略（核心设计）
- 默认走本地 Qwen3（成本优先）
- 消息超过 3000 tokens → 自动切云端
- 云端 Key 未配置 → 强制本地
- 模型名显式指定 → 直接路由

---

## 文档导航

| 文件 | 用途 |
|------|------|
| `DESIGN.md` | UI 视觉设计系统，生成前端代码时必读 |
| `SKILL.md` | AI 生成 UI 的约束规则和质量门禁 |
| `.rules/enterprise.md` | 企业级安全、日志、合规规范 |
| `.rules/team.md` | 分支策略、提交规范、Review 标准 |
| `.rules/project.md` | AIForge 项目专属约定 |
| `.rules/personal.md` | 作者个人编码偏好 |
| `docs/adr/` | 架构决策记录，理解"为什么这样做" |
| `docs/rfc/` | 重大功能提案 |

---

## 开发规范速查

### 代码风格
- Python: 遵循 `.rules/project.md` 中的规范
- 所有函数必须有类型注解
- 异步优先：能用 `async/await` 就用
- 错误处理：统一使用 `HTTPException`，不裸露 500

### 目录约定
```
gateway/
├── main.py          # 入口，只做注册
├── routers/         # 路由层，只做参数校验和响应组装
├── services/        # 业务逻辑层
├── middleware/      # 中间件
├── models/          # Pydantic 数据模型
└── config.py        # 统一配置
```

### 禁止行为
- ❌ 不在 router 层写业务逻辑
- ❌ 不在代码里硬编码 API Key、密码
- ❌ 不跳过 API Key 鉴权中间件
- ❌ 不直接调用模型，必须经过 `services/router.py`

---

## 当前开发状态

**Phase 1 进行中** — 框架跑通

- [x] 项目结构初始化
- [x] FastAPI 入口 + 中间件
- [x] 模型路由服务（本地/云端）
- [ ] API Key 管理模块
- [ ] 用量统计 + Dashboard
- [ ] Open WebUI 接入
- [ ] Docker Compose 一键部署

**下一个要做的事**: `gateway/services/key_manager.py`

---

## 给 AI Agent 的工作指令

1. 修改代码前，先确认你理解了该模块在架构中的位置
2. 生成 UI 代码前，必须读 `DESIGN.md` 和 `SKILL.md`
3. 新增重要技术决策时，在 `docs/adr/` 新建一个 ADR
4. 遇到不确定的设计决策，参考 `docs/adr/` 已有记录
5. 任何涉及安全的改动，先检查 `.rules/enterprise.md`
