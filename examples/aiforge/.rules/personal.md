# Rules: 个人级规范

> 适用范围：作者（XXX）的个人编码习惯和偏好，体现7年以上工程经验积累。
> 这是最底层、最稳定的规范，几乎不会因项目而变化。

---

## 编码哲学

```
1. 可读性 > 简洁性 > 性能（过早优化是万恶之源）
2. 显式 > 隐式（宁可多写一行，不要让人猜）
3. 组合 > 继承（优先用函数组合，慎用深层继承）
4. 错误是数据（用返回值或异常明确表达，不要静默失败）
5. 好的命名是最好的注释
```

---

## Python 编码偏好

### 类型注解
```python
# ✅ 所有函数签名必须有类型注解
async def get_usage(tenant_id: str, days: int = 30) -> UsageStats:
    ...

# ✅ 复杂类型用 TypeAlias 命名
ModelName = str
TenantId = str

# ✅ 返回可能为 None 时显式声明
def find_key(key_hash: str) -> ApiKey | None:
    ...
```

### 异步编程
```python
# ✅ IO 密集型操作全部 async
# ✅ 并发请求用 asyncio.gather
results = await asyncio.gather(
    fetch_local_models(),
    fetch_cloud_models(),
)

# ❌ 不在 async 函数里调用同步阻塞 IO
```

### 错误处理
```python
# ✅ 业务错误用自定义异常，不用裸 Exception
class KeyExpiredError(AIForgeError):
    code = "KEY_EXPIRED"
    status_code = 401

# ✅ 外部调用加超时和重试
async with httpx.AsyncClient(timeout=10.0) as client:
    ...

# ❌ 不捕获 Exception 后静默（至少要 log）
# ❌ 不用 bare except:
```

### 命名偏好
```python
# 函数：动词开头，描述行为
def create_api_key()
def validate_tenant_access()
def estimate_token_count()

# 布尔值：is_/has_/can_/should_ 开头
is_expired: bool
has_permission: bool
can_retry: bool

# 集合：复数
tenants: list[Tenant]
model_overrides: dict[str, ModelBackend]

# 避免缩写（除非极其通用：id, url, api, db）
# ❌ usr, msg, cfg, mgr
# ✅ user, message, config, manager
```

---

## 注释风格

```python
# 单行注释：解释"为什么"，不解释"是什么"
# ❌ # 遍历列表
# ✅ # DashScope 不支持 stream=True 时的 max_tokens 参数，需要单独处理

# 函数文档：复杂函数写 docstring，简单函数靠命名自解释
async def select_backend(model: str, token_count: int) -> ModelBackend:
    """
    根据模型名和消息长度选择路由后端。

    路由优先级：
    1. 模型名显式指定
    2. 无云端 Key → 强制本地
    3. 长上下文 → 云端
    4. 默认 → 本地

    Args:
        model: 请求的模型名（如 "qwen3:9b", "cloud"）
        token_count: 估算的输入 token 数

    Returns:
        ModelBackend.LOCAL 或 ModelBackend.CLOUD
    """
```

---

## 文件组织偏好

```
单文件不超过 300 行（超出拆分）
一个文件一个主题（不要把 model + service + router 混在一起）
相关的东西放在一起（不按类型分，按功能分）
__init__.py 只做导出，不写逻辑
```

---

## Git 习惯

```
每次提交保持原子性：一个提交做一件事
每天结束前 commit（哪怕是 WIP，打上 [wip] 标记）
分支名体现意图：feat/api-key-rate-limit
不 force push 到已经 PR 的分支
```

---

## 工具偏好

```
编辑器:   Claude Code / Cursor
格式化:   black + isort（Python）/ prettier（前端）
Lint:     ruff（Python，比 flake8 快 10-100x）
测试:     pytest + pytest-asyncio
HTTP 客户端: httpx（支持 async，接口与 requests 一致）
依赖管理: uv（比 pip 快，比 poetry 简单）
```

---

## 学习与记录习惯

```
遇到有价值的技术决策 → 立刻写 ADR
遇到坑 → 写注释 + 可能的话写测试复现
完成一个模块 → 更新 CLAUDE.md 中的开发状态
每周回顾 → 检查是否偏离了原始设计意图
```
