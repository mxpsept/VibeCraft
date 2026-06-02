# {{PROJECT_NAME}} — CLAUDE.md

> AI Agent 项目总入口。每次开始工作前必须读完本文件。
> 📌 使用说明：将所有 {{占位符}} 替换为实际内容后删除本行。

---

## 项目一句话定位

{{用一句话描述项目}}

---

## 技术栈

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| 前端 | {{React / Vue / Next.js}} | {{选择原因}} |
| 后端 | {{FastAPI / Express / Django}} | {{选择原因}} |
| 数据库 | {{PostgreSQL / MySQL / MongoDB}} | {{选择原因}} |
| 缓存 | {{Redis}} | {{用途}} |
| 部署 | {{Docker / Vercel / AWS}} | {{环境说明}} |

---

## 架构概览

```
{{ASCII 架构图}}
```

---

## 文档导航

| 文件 | 用途 |
|------|------|
| `DESIGN.md` | UI 设计系统 |
| `SKILL.md` | UI 生成约束 |
| `.rules/enterprise.md` | 安全合规 |
| `.rules/team.md` | 团队协作 |
| `.rules/project.md` | 项目约定 |
| `.rules/personal.md` | 个人偏好 |
| `docs/adr/` | 架构决策 |

---

## 当前状态

- [x] {{已完成}}
- [ ] {{进行中}}
- [ ] {{待开始}}

**下一步**：{{具体任务}}

---

## AI Agent 工作指令

1. 改代码前先理解模块在架构中的位置
2. 写 UI 前必须读 `DESIGN.md` + `SKILL.md`
3. 重要技术决策写 ADR 到 `docs/adr/`
4. 安全相关改动先查 `.rules/enterprise.md`
