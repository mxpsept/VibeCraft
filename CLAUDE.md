# VibeCraft — CLAUDE.md

> VibeCraft 用自己的方法论文档自身。这是项目的 AI Agent 总入口。

---

## 项目一句话定位

VibeCraft 是一套 AI 辅助开发的方法论模板体系，帮助开发者通过结构化文档让 AI Agent 像了解项目 3 个月的工程师一样工作。

**目标用户**：使用 Claude Code / Cursor / Windsurf 等 AI 编码工具的开发者  
**核心价值**：让 Vibe Coding 从"随机应变"变成"有章可循"

---

## 项目结构

```
vibecraft/
├── templates/          # 核心：可复用模板
│   ├── claude/         # CLAUDE.md 模板（按项目类型）
│   ├── design/         # DESIGN.md 模板（按设计风格）
│   ├── rules/          # .rules/ 模板（按层级和技术栈）
│   ├── adr/            # ADR 模板
│   └── commands/       # Claude Code 自定义命令模板
├── examples/           # 完整示例项目
│   └── aiforge/        # 企业级 AI 平台示例（VibeCraft 诞生地）
├── docs/               # 方法论文档
├── scripts/            # 工具脚本（CLI 基础）
├── README.md           # 项目主页
└── CONTRIBUTING.md     # 贡献指南
```

---

## 开发规范

- 所有模板文件使用 `{{占位符}}` 标记需要填写的内容
- 模板注释以 `📌 使用说明：` 开头
- 示例项目必须是真实项目脱敏版本，不能是编造的
- README 中的对比示例必须是真实可运行的

---

## 当前状态

**版本**：v0.1.0（初始开源版本）

- [x] 核心模板体系（CLAUDE / DESIGN / SKILL / rules / ADR）
- [x] AIForge 完整示例
- [x] README 和 CONTRIBUTING
- [ ] CLI 工具（vibecraft init）
- [ ] saas-starter 示例
- [ ] 英文版 README
- [ ] GitHub Actions（模板格式检查）

**下一步**：补充 `examples/aiforge/` 的完整文件，然后开发 CLI。

---

## AI Agent 工作指令

1. 修改模板时，确保 `{{占位符}}` 格式一致
2. 新增模板时，同步更新 README 的模板列表
3. 不要在模板中写死具体的技术细节（保持通用性）
4. 示例项目中的内容应该是"填写完占位符后"的状态
