# ADR-003: Open WebUI 二开策略

**状态**: 已采纳  
**日期**: 2026-06-02  
**作者**: XXX  
**关联**: 前端架构

---

## 背景

AIForge 需要一个 AI 对话界面，面临"自研 vs 二开"的选择。

---

## 考虑的方案

### 方案 A: 完全自研前端
**优点**: 完全自主控制，可深度定制  
**缺点**: 工作量巨大（流式输出、Markdown 渲染、文件上传等都需要自己实现），
对于兼职开发不现实，预计至少 2 个月才能达到可用水平

### 方案 B: 基于 Open WebUI 二开 ✅ 已采纳
**优点**: 立刻拥有成熟的对话界面，专注于企业级扩展功能  
**缺点**: 受 Open WebUI 架构约束，升级时可能有冲突

### 方案 C: 基于 Dify 二开
**优点**: 企业功能更完整  
**缺点**: 架构更重，二开难度更高，且 Dify 本身定位与 AIForge 重叠

---

## 决策

**采纳方案 B：Open WebUI 二开**

### 二开策略

**原则：最小化侵入，最大化复用**

```
Open WebUI 上游（不动）:
  - 对话核心逻辑
  - 流式输出渲染
  - Markdown / 代码高亮
  - 文件上传

AIForge 扩展（新增）:
  - 租户管理页面（全新页面）
  - API Key 管理（全新页面）
  - 用量统计 Dashboard（全新页面）
  - Topbar 租户切换器（组件注入）
  - 模型来源 Badge（组件扩展）

修改（尽量少改）:
  - 配置项：指向 AIForge Gateway
  - 登录页：对接企业 SSO（Phase 2）
```

### 升级策略

维护一个 `upstream-sync` 分支定期跟进 Open WebUI 上游更新，
通过 cherry-pick 而非直接 merge 来控制冲突范围。

---

## 接口兼容性

Open WebUI 通过 OpenAI 兼容接口连接后端，AIForge Gateway 需要实现：
- `POST /v1/chat/completions`（流式 + 非流式）
- `GET /v1/models`

这也是 AIForge Gateway 的接口标准来源，确保未来可以对接其他前端。

---

## 结果与验证

- [ ] Open WebUI 成功指向 AIForge Gateway
- [ ] 本地 Qwen3 对话正常（流式输出）
- [ ] 新增的租户管理页面风格与 DESIGN.md 一致
- [ ] 上游升级策略文档化
