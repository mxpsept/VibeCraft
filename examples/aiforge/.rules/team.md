# Rules: 团队协作规范

> 适用范围：多人协作项目通用。定义分支策略、提交规范、Review 标准。
> 当前项目（AIForge）处于独立开发阶段，部分规则作为习惯提前建立。

---

## 分支策略

### 分支模型（GitHub Flow 简化版）

```
main          ← 主分支，始终可部署，保护分支
  └── feat/xxx    ← 功能分支
  └── fix/xxx     ← Bug 修复
  └── docs/xxx    ← 文档更新
  └── refactor/xxx ← 重构
  └── chore/xxx   ← 构建/依赖/配置
```

### 分支规则
```
✅ main 分支保护，不允许直接 push
✅ 功能分支从 main 切出，完成后 PR 合并
✅ 分支命名小写 + 连字符：feat/api-key-management
✅ 功能分支生命周期：最长 7 天（超期需重新评估）
❌ 不在 main 上直接开发
❌ 不合并未经测试的分支
```

---

## 提交规范（Conventional Commits）

### 格式
```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Type 类型
```
feat:     新功能
fix:      Bug 修复
docs:     文档更新
style:    代码格式（不影响功能）
refactor: 重构（不是新功能，不是修复）
perf:     性能优化
test:     测试相关
chore:    构建、依赖、工具配置
ci:       CI/CD 配置
```

### Scope 范围（AIForge 专属）
```
gateway:  AI Gateway 核心
rag:      RAG 知识库模块
agent:    Agent 编排模块
auth:     鉴权相关
admin:    管理后台
ui:       前端界面
deploy:   部署配置
```

### 示例
```
feat(gateway): add API key rate limiting middleware
fix(rag): fix chunk overlap causing duplicate content
docs(adr): add ADR-003 for multi-tenant isolation strategy
perf(gateway): optimize token counting with caching
chore: upgrade langchain to 0.2.0
```

### 禁止提交
```
❌ "fix bug" / "update" / "修改" 等无意义描述
❌ 包含调试代码（console.log、print、pdb）
❌ 包含硬编码密钥或密码
❌ 超过 500 行的单次提交（应拆分）
```

---

## Code Review 标准

### 提 PR 前自检
```
- [ ] 本地测试通过
- [ ] 无调试代码残留
- [ ] 新功能有对应文档或注释
- [ ] 安全规范（enterprise.md）检查通过
- [ ] 提交信息符合 Conventional Commits
```

### Review 关注点（优先级从高到低）
```
P0 安全: 密钥泄露、权限绕过、SQL注入
P1 正确性: 业务逻辑、边界条件、错误处理
P2 设计: 接口设计、模块职责、可扩展性
P3 性能: 循环内查询、未加缓存的热点
P4 风格: 命名、注释、代码可读性
```

### Review 回复规范
```
[blocking] 必须修改才能合并
[suggestion] 建议修改，不强制
[question] 不理解，需要解释
[nit] 小细节，作者自行决定
```

---

## 版本发布规范

### 版本号（Semantic Versioning）
```
MAJOR.MINOR.PATCH
  0.1.0 → 初始公开版本（Phase 1 完成）
  0.2.0 → RAG 模块上线（Phase 2）
  0.3.0 → Agent 模块上线（Phase 3）
  1.0.0 → 生产可用，功能稳定
```

### 发布 Checklist
```
- [ ] CHANGELOG.md 更新
- [ ] 版本号更新（pyproject.toml）
- [ ] Docker 镜像打标签
- [ ] GitHub Release 创建（含 changelog）
- [ ] README 版本徽章更新
```
