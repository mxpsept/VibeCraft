# 贡献指南

感谢你对 VibeCraft 的兴趣！这个项目靠社区驱动，每一份贡献都很有价值。

---

## 贡献类型

### 🎯 最欢迎的贡献

**新模板**：
- 不同行业的 `enterprise.md`（医疗、教育、电商、游戏）
- 不同框架的 `project.md`（Django、Spring Boot、Rust Axum、Ruby on Rails）
- 不同设计风格的 `DESIGN.md`（Notion 温暖、Stripe 专业、Apple 极简）
- 不同职能的 `personal.md`（前端工程师、数据工程师、DevOps）

**示例项目**：
- 完整的真实项目文档体系（脱敏后）
- 不同规模团队的实践案例（个人 / 小团队 / 中型企业）

**改进现有内容**：
- 发现模板中不合理的规范
- 补充遗漏的重要场景
- 优化表达和结构

---

## 模板质量标准

提交新模板前，请确认：

```
- [ ] 有明确的适用场景说明（第一行注释）
- [ ] 所有 {{占位符}} 有清晰的填写说明
- [ ] 规范条目有 ✅/❌ 明确标识
- [ ] 不包含特定公司的私有信息
- [ ] 中文为主（面向中文开发者社区）
- [ ] 文件名符合命名规范（见下方）
```

### 文件命名规范

```
templates/claude/    → <场景>.md（fullstack-app, api-service, ai-platform）
templates/design/    → <风格>-<主题>.md（linear-dark, stripe-light）
templates/rules/     → <层级>-<语言或框架>.md（personal-python, team-gitflow）
examples/            → <项目类型>/（aiforge, saas-starter）
```

---

## 提交流程

```bash
# 1. Fork 并 clone
git clone https://github.com/your-username/vibecraft.git

# 2. 创建分支
git checkout -b feat/add-django-project-rules

# 3. 开发并测试
# 确保你的模板在真实项目中验证过

# 4. 提交
git commit -m "feat(rules): add Django project-level rules template"

# 5. 创建 PR
# PR 描述中说明：模板适用场景、来自哪个真实项目实践
```

---

## 行为准则

- 尊重所有贡献者
- 不提交包含公司机密或个人隐私的内容
- 模板内容应基于真实工程实践，不是纸上谈兵
- 遇到分歧先在 Issue 讨论，再开始开发

---

## 获得认可

所有贡献者将被列入 `CONTRIBUTORS.md`。
质量优秀的模板作者将在 README 中获得署名展示。

感谢你让 Vibe Coding 更有章可循 🔨
