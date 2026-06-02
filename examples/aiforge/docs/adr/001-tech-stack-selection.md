# ADR-001: 技术栈选型

**状态**: 已采纳  
**日期**: 2026-06-02  
**作者**: XXX  
**关联**: AIForge Phase 1

---

## 背景

从零搭建 AIForge 企业级 AI 应用平台，需要确定核心技术栈。
决策需要平衡：个人技术积累（Java）、AI 生态现状（Python）、开源社区影响力。

---

## 决策驱动因素

1. **AI 生态**：LangChain、LangGraph、vLLM 等核心 AI 库原生 Python，Java 生态（Spring AI）相对滞后
2. **开发效率**：兼职开发（每天 2-3 小时），需要快速迭代
3. **开源吸引力**：Python 项目在 GitHub AI 社区更容易获得关注
4. **个人背景**：7 年 Java 架构经验，Python 作为补充，需要强化 Python 工程化能力

---

## 考虑的方案

### 方案 A: Java 主导（Spring AI + SpringBoot）
**优点**: 个人最熟悉，企业级特性成熟（安全、事务、多线程）  
**缺点**: AI 生态相对薄弱，Spring AI 功能不如 LangChain 完整，社区较小

### 方案 B: Python 主导（FastAPI + LangChain）✅ 已采纳
**优点**: AI 生态最完整，开发效率高，GitHub 社区更活跃  
**缺点**: 需要强化 Python 工程化规范（弥补 Java 体系的严谨性）

### 方案 C: 混合架构（Java Gateway + Python AI Engine）
**优点**: 发挥各自优势  
**缺点**: 维护成本翻倍，对独立开发者不友好

---

## 决策

**采纳方案 B：Python 全栈主导**

技术栈明细：
- **Web 框架**: FastAPI（异步、自动 API 文档、Pydantic 集成）
- **AI 框架**: LangChain + LangGraph（RAG + Agent 双引擎）
- **模型接入**: Ollama（本地 Qwen3）+ DashScope SDK（云端）
- **前端**: Open WebUI 二开（Vue3，不重复造轮子）
- **数据库**: PostgreSQL（主存储）+ Redis（缓存/队列）+ Milvus（向量）
- **部署**: Docker Compose（降低试用门槛）

---

## 补偿措施

为弥补 Python 项目工程规范不如 Java 严谨的问题：
- 强制 Pydantic 类型校验（等效 Java Bean Validation）
- ruff + black 统一代码风格
- 完整的 .rules/ 规范体系约束 AI 辅助开发
- 明确的分层架构禁止跨层调用

---

## 结果与验证

Phase 1 完成后验证以下指标：
- [ ] 代码质量：ruff 检查零警告
- [ ] API 文档：FastAPI 自动生成，完整可用
- [ ] 部署体验：docker-compose up 一键启动，< 5 分钟完成
