# Rules: 团队协作规范（GitHub Flow）

> 适用范围：使用 GitHub Flow 的团队。
> 📌 使用说明：根据团队实际规模调整 Review 要求。

---

## 分支策略（GitHub Flow）

```
main              ← 保护分支，始终可部署
  └── feat/xxx    ← 功能开发
  └── fix/xxx     ← Bug 修复
  └── docs/xxx    ← 文档
  └── refactor/   ← 重构
  └── chore/      ← 构建/依赖/配置
```

**规则**：
```
✅ main 分支保护，不允许直接 push
✅ 功能分支从 main 切出，完成后 PR 合并
✅ 分支命名小写 + 连字符：feat/api-key-management
✅ 功能分支生命周期最长 7 天
❌ 不在 main 上直接开发
```

---

## 提交规范（Conventional Commits）

### 格式
```
<type>(<scope>): <subject>

[optional body]
```

### Type 类型
```
feat:      新功能
fix:       Bug 修复
docs:      文档
style:     格式（不影响功能）
refactor:  重构
perf:      性能优化
test:      测试
chore:     构建/依赖/工具
ci:        CI/CD
```

### 示例
```
feat(auth): add JWT refresh token support
fix(api): handle null response from model endpoint
docs(adr): add ADR-004 for caching strategy
perf(db): add index on tenant_id + created_at
```

### 禁止
```
❌ "fix bug" / "update" / "修改" 等无意义描述
❌ 包含调试代码（console.log、print、pdb）
❌ 包含硬编码密钥
❌ 超过 500 行的单次提交
```

---

## Code Review 标准

### 提 PR 前自检
```
- [ ] 本地测试通过
- [ ] 无调试代码残留
- [ ] 无硬编码密钥
- [ ] 提交信息符合规范
- [ ] 安全规范检查通过（enterprise.md）
```

### Review 优先级
```
P0 安全：密钥泄露、权限绕过、注入攻击
P1 正确性：业务逻辑、边界条件、错误处理
P2 设计：接口设计、模块职责、可扩展性
P3 性能：N+1 查询、未加缓存的热点路径
P4 风格：命名、注释、可读性
```

### Review 回复标记
```
[blocking]   必须修改才能合并
[suggestion] 建议修改，不强制
[question]   需要解释
[nit]        细节，作者自行决定
```

---

## 版本发布（Semantic Versioning）

```
MAJOR.MINOR.PATCH

PATCH: Bug 修复，向后兼容
MINOR: 新功能，向后兼容
MAJOR: 破坏性变更

发布 Checklist:
- [ ] CHANGELOG.md 更新
- [ ] 版本号更新
- [ ] GitHub Release 创建
- [ ] Docker 镜像打标签
```
