# Rules: 个人级规范（Python 工程师）

> 适用范围：作者个人编码习惯，体现工程经验积累。
> 最底层、最稳定的规范，几乎不因项目而变化。
> 📌 使用说明：这是 Python 工程师版本，按自己实际习惯修改。

---

## 编码哲学

> 用几句话概括你的核心信念，这是整个规范的灵魂。

```
{{例：可读性 > 简洁性 > 性能（过早优化是万恶之源）}}
{{例：显式 > 隐式（宁可多写一行，不要让人猜）}}
{{例：错误是数据（明确表达，不要静默失败）}}
{{例：好的命名是最好的注释}}
```

---

## Python 编码偏好

### 类型注解（必须）
```python
# ✅ 所有函数签名必须有类型注解
async def create_user(name: str, role: str = "member") -> User:
    ...

# ✅ 返回可能为 None 时显式声明
def find_by_id(user_id: str) -> User | None:
    ...

# ✅ 复杂类型用 TypeAlias 命名
UserId = str
TenantId = str
```

### 异步编程
```python
# ✅ IO 密集型操作全部 async
# ✅ 并发请求用 asyncio.gather
results = await asyncio.gather(task_a(), task_b())

# ❌ 不在 async 函数里调用同步阻塞 IO
```

### 错误处理
```python
# ✅ 业务错误用自定义异常，不用裸 Exception
class {{ProjectName}}Error(Exception):
    code: str
    status_code: int = 400

# ✅ 外部调用加超时
async with httpx.AsyncClient(timeout=10.0) as client:
    ...

# ❌ 不捕获 Exception 后静默
# ❌ 不用 bare except:
```

### 命名偏好
```python
# 函数：动词开头
def create_api_key()
def validate_access()

# 布尔值：is_/has_/can_ 开头
is_expired: bool
has_permission: bool

# 集合：复数
users: list[User]
settings: dict[str, str]

# 避免缩写（除极通用：id, url, api, db）
# ❌ usr, msg, cfg
# ✅ user, message, config
```

---

## 注释风格

```python
# 单行注释：解释"为什么"，不解释"是什么"
# ❌ # 遍历列表
# ✅ # DashScope 不支持 stream=True 时的 max_tokens，需要单独处理

# 复杂函数写 docstring，简单函数靠命名自解释
def complex_function(param: str) -> Result:
    """
    一句话说明函数做什么。

    更详细的背景（如果需要）。

    Args:
        param: 参数说明

    Returns:
        返回值说明

    Raises:
        XxxError: 什么情况下抛出
    """
```

---

## 文件组织
```
单文件不超过 300 行（超出拆分）
一个文件一个主题
__init__.py 只做导出，不写逻辑
相关的东西放在一起（按功能分，不按类型分）
```

---

## Git 习惯
```
每次提交保持原子性：一个提交做一件事
每天结束前 commit（WIP 也要提交）
不 force push 到已 PR 的分支
```

---

## 工具偏好
```
格式化：black + isort
Lint：  ruff
测试：  pytest + pytest-asyncio
HTTP：  httpx（支持 async）
依赖：  uv（比 pip 快）
编辑器：{{Claude Code / Cursor / VSCode}}
```

---

## 学习记录习惯
```
遇到重要技术决策 → 写 ADR
遇到坑 → 写注释 + 测试复现
完成模块 → 更新 CLAUDE.md 开发状态
```
