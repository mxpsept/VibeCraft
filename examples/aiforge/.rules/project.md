# Rules: 项目级规范（AIForge 专属）

> 适用范围：仅限 AIForge 项目。定义项目特有的约定、模块边界、接口契约。
> 继承：enterprise.md + team.md 的所有规则，本文件只写 AIForge 独有内容。

---

## 模块边界约定

### 严格分层，禁止跨层调用

```
routers/    → 只做：参数校验、调用 service、组装响应
services/   → 只做：业务逻辑、调用 repository 或外部服务
middleware/ → 只做：横切关注点（鉴权、限流、日志、过滤）
models/     → 只做：数据结构定义（Pydantic）
config.py   → 只做：配置读取和默认值
```

### 模型调用唯一入口
```
✅ 所有 LLM 调用必须通过 services/router.py
❌ 不允许在 router 层直接调用 httpx 请求模型
❌ 不允许绕过路由策略直接指定后端
```

### RAG 与 Agent 隔离
```
- RAG 模块：rag/ 目录，对外暴露 query(question, kb_id) 接口
- Agent 模块：agent/ 目录，对外暴露 run(task, tools) 接口
- 两个模块可以互相调用，但必须通过明确的接口，不直接引用内部实现
```

---

## API 设计约定

### URL 规范
```
/v1/chat/completions        ← 兼容 OpenAI 格式（Open WebUI 对接）
/v1/models                  ← 模型列表
/admin/keys                 ← API Key 管理（仅管理员）
/admin/tenants              ← 租户管理（仅超管）
/admin/usage                ← 用量统计
/api/rag/knowledge-bases    ← 知识库管理
/api/rag/query              ← 知识库问答
```

### 响应格式
```python
# 成功响应（列表）
{
    "data": [...],
    "total": 100,
    "page": 1,
    "page_size": 20
}

# 成功响应（单对象）
{
    "data": {...}
}

# 错误响应（继承 enterprise.md）
{
    "code": "BUSINESS_ERROR_CODE",
    "message": "用户友好的错误描述",
    "detail": "可选的详细信息",
    "request_id": "req_xxx"
}
```

### 命名约定
```
URL: kebab-case（knowledge-bases）
JSON 字段: snake_case（tenant_id, created_at）
Python 变量: snake_case
Python 类: PascalCase
常量: UPPER_SNAKE_CASE
```

---

## 数据模型约定

### 所有数据库模型必须包含
```python
id: str          # UUID，主键
tenant_id: str   # 租户 ID，所有业务表必须有
created_at: datetime
updated_at: datetime
is_deleted: bool  # 软删除标记，默认 False
```

### API Key 模型特殊约定
```python
key_hash: str    # 存储 hash，不存明文
key_prefix: str  # 存前8位，用于展示（如: sk-forge-xxxxxx...）
last_used_at: datetime | None
usage_count: int
monthly_limit: int | None  # None = 无限制
```

---

## 环境变量约定

```bash
# 模型配置
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen3:9b
DASHSCOPE_API_KEY=sk-xxx
DASHSCOPE_MODEL=qwen-plus

# 路由策略
ROUTING_DEFAULT=local          # local | cloud
ROUTING_LONG_CONTEXT_THRESHOLD=3000

# 数据库
DATABASE_URL=postgresql+asyncpg://user:pass@localhost/aiforge
REDIS_URL=redis://localhost:6379/0

# 安全
JWT_SECRET=xxx
JWT_EXPIRE_HOURS=24
ADMIN_API_KEY=xxx              # 管理接口鉴权

# 功能开关
ENABLE_SENSITIVE_FILTER=true
ENABLE_AUDIT_LOG=true
ENABLE_MULTI_TENANT=true
```

---

## 测试约定

```
tests/
├── unit/           # 单元测试，覆盖 services/ 层
├── integration/    # 集成测试，覆盖 routers/ + 数据库
└── fixtures/       # 测试数据和 mock

命名: test_<被测函数名>_<场景描述>.py
覆盖率目标: services/ ≥ 80%，routers/ ≥ 60%

Mock 优先: 不依赖真实模型 API（使用 mock 响应）
测试隔离: 每个测试用独立的数据库事务，测试后回滚
```

---

## 开发工作流约定

### 新功能开发步骤
```
1. 在 docs/adr/ 写 ADR（如果涉及架构决策）
2. 定义 Pydantic 模型（models/）
3. 实现 service 层并写单元测试
4. 实现 router 层
5. 更新 CLAUDE.md 中的开发状态
6. 提交 PR
```

### 添加新模型支持步骤
```
1. 在 services/router.py 添加新 backend 枚举值
2. 实现对应的 _call_xxx() 函数
3. 在 ROUTING_RULES["model_overrides"] 注册模型名
4. 更新 /v1/models 接口返回的模型列表
5. 更新 .env.example
```
