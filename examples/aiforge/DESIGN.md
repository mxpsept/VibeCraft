# AIForge Design System

> 灵感来源：Linear（超简约·精准·工程师审美）  
> 适用场景：企业级 AI 平台 · 开发者工具 · B 端 SaaS  
> AI Agent 生成 UI 时必须遵循本文件

---

## 设计哲学

**Less, but precise（少，但精准）**

AIForge 的 UI 服务于工程师和企业 IT 决策者。每一个像素都应该有功能性目的。
不追求视觉华丽，追求信息密度与操作效率的极致平衡。

核心原则：
- 暗色优先，减少视觉疲劳
- 层级清晰，信息一眼可读
- 交互克制，避免不必要的动画
- 数据为王，图表胜过文字

---

## 色彩系统

### 基础色板

```css
/* 背景层级 */
--color-bg-base:        #0F0F10;   /* 最底层背景 */
--color-bg-elevated:    #161618;   /* 卡片、面板 */
--color-bg-overlay:     #1C1C1F;   /* 悬浮、弹窗 */
--color-bg-subtle:      #232326;   /* hover 状态、分割区域 */

/* 边框 */
--color-border:         #2A2A2E;   /* 默认边框 */
--color-border-strong:  #3A3A3F;   /* 强调边框 */

/* 文字 */
--color-text-primary:   #F0F0F2;   /* 主文字 */
--color-text-secondary: #8B8B9A;   /* 次要文字、描述 */
--color-text-tertiary:  #55555F;   /* 禁用、占位符 */
--color-text-inverse:   #0F0F10;   /* 深色背景上的文字 */

/* 品牌色：AIForge Purple */
--color-brand:          #7C5CFC;   /* 主品牌色 */
--color-brand-hover:    #9070FF;   /* hover 状态 */
--color-brand-muted:    #7C5CFC26; /* 品牌色背景（透明） */
--color-brand-subtle:   #2D2540;   /* 品牌色区域背景 */

/* 语义色 */
--color-success:        #30D158;
--color-success-muted:  #30D15820;
--color-warning:        #FFD60A;
--color-warning-muted:  #FFD60A20;
--color-error:          #FF453A;
--color-error-muted:    #FF453A20;
--color-info:           #0A84FF;
--color-info-muted:     #0A84FF20;
```

### 特殊用途色

```css
/* 模型来源标识 */
--color-local:          #30D158;   /* 本地模型（绿色=安全/私有）*/
--color-cloud:          #0A84FF;   /* 云端模型（蓝色=连接）*/

/* Token 用量热力 */
--color-usage-low:      #30D158;
--color-usage-mid:      #FFD60A;
--color-usage-high:     #FF6B35;
--color-usage-critical: #FF453A;
```

---

## 字体系统

```css
/* 字体栈 */
--font-sans:  "Inter", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
--font-mono:  "JetBrains Mono", "Fira Code", "SF Mono", monospace;

/* 字号比例（Major Third: 1.25）*/
--text-xs:   11px;   /* 标签、角标 */
--text-sm:   13px;   /* 辅助信息、表格内容 */
--text-base: 14px;   /* 正文基准 */
--text-md:   16px;   /* 小标题、强调 */
--text-lg:   20px;   /* 页面副标题 */
--text-xl:   24px;   /* 页面标题 */
--text-2xl:  32px;   /* 仪表盘大数字 */
--text-3xl:  48px;   /* 空状态标题 */

/* 字重 */
--weight-regular: 400;
--weight-medium:  500;
--weight-semibold: 600;
--weight-bold:    700;

/* 行高 */
--leading-tight:  1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## 间距系统

```css
/* 基于 4px 网格 */
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

---

## 圆角系统

```css
--radius-sm:   4px;   /* 标签、Badge */
--radius-md:   6px;   /* 按钮、输入框 */
--radius-lg:   8px;   /* 卡片 */
--radius-xl:   12px;  /* 面板、弹窗 */
--radius-2xl:  16px;  /* 大卡片 */
--radius-full: 9999px; /* 胶囊按钮、头像 */
```

---

## 组件规范

### Button（按钮）

```
Primary:   bg=brand, text=white, hover=brand-hover, border=none
Secondary: bg=bg-elevated, text=text-primary, border=border, hover=bg-subtle
Ghost:     bg=transparent, text=text-secondary, border=none, hover=bg-subtle
Danger:    bg=error-muted, text=error, border=none, hover=bg=error, hover-text=white

尺寸:
  sm: h=28px, px=12px, text-sm, radius-md
  md: h=32px, px=16px, text-base, radius-md  ← 默认
  lg: h=40px, px=20px, text-md, radius-md

禁用态: opacity=0.4, cursor=not-allowed
加载态: 显示 spinner，禁用点击
```

### Input（输入框）

```
默认: bg=bg-elevated, border=border, text=text-primary, radius-md
焦点: border=brand, box-shadow: 0 0 0 2px var(--color-brand-muted)
错误: border=error, box-shadow: 0 0 0 2px var(--color-error-muted)
禁用: opacity=0.5, bg=bg-subtle, cursor=not-allowed

尺寸: h=32px(sm) / h=36px(md, 默认) / h-40px(lg)
内边距: px=12px
标签: text-sm, text-secondary, mb=space-2, weight-medium
```

### Card（卡片）

```
bg=bg-elevated, border=border, radius-lg, p=space-6
hover: border=border-strong, 过渡 transition: border 150ms ease

数据卡片（Metric Card）:
  标题: text-sm, text-secondary, weight-medium
  数值: text-2xl, text-primary, weight-bold, font-mono
  趋势: text-sm, success/error 语义色
```

### Badge（徽标）

```
结构: inline-flex, px=space-2, py=space-1, radius-sm, text-xs, weight-medium
语义变体:
  default:  bg=bg-subtle, text=text-secondary
  success:  bg=success-muted, text=success
  warning:  bg=warning-muted, text=warning
  error:    bg=error-muted, text=error
  brand:    bg=brand-muted, text=brand
  local:    bg=success-muted, text=success    ← 本地模型专用
  cloud:    bg=info-muted, text=info          ← 云端模型专用
```

### Table（数据表格）

```
header: bg=bg-subtle, text-xs, text-secondary, weight-semibold, uppercase, tracking-wide
row: bg=transparent, border-bottom=border, hover=bg-subtle
cell: text-sm, text-primary, py=space-3, px=space-4
斑马纹: 不使用（依赖 hover 区分）
```

### Sidebar（侧边栏）

```
宽度: 240px（收起: 56px）
bg: bg-base
border-right: border
导航项: h=32px, px=space-3, radius-md, text-sm
  默认: text-secondary
  hover: bg=bg-subtle, text=text-primary
  激活: bg=brand-muted, text=brand, weight-medium
分组标题: text-xs, text-tertiary, weight-semibold, uppercase, px=space-3, mt=space-4
```

---

## 布局规范

### 页面结构

```
┌─────────────────────────────────────────┐
│  Topbar (h=48px, border-bottom)         │
├──────────┬──────────────────────────────┤
│ Sidebar  │  Main Content               │
│ (240px)  │  max-w=1200px, mx=auto      │
│          │  px=space-8, py=space-6     │
└──────────┴──────────────────────────────┘
```

### 内容区网格

```
单列: max-w=680px（表单、详情页）
双列: grid-cols-[2fr_1fr]（主内容+侧边信息）
三列: grid-cols-3（仪表盘卡片）
间距: gap=space-4（卡片之间）
```

### 仪表盘布局

```
顶部 Metrics Row: 4个等宽 Metric Card，gap=space-4
主内容区: 左 2/3（图表/表格）+ 右 1/3（状态/日志）
```

---

## 图表规范

使用 Recharts，遵循以下风格：

```
背景: transparent
网格线: color=border, strokeDasharray="3 3"
坐标轴: text-xs, text-tertiary
Tooltip: bg=bg-overlay, border=border, radius-lg, text-sm
颜色序列: [brand, success, info, warning, error]

折线图: strokeWidth=2, dot=false（数据密集时）
柱状图: radius=[4,4,0,0], gap=2
饼图: innerRadius=60%（环形优先）
```

---

## 交互规范

```
过渡时长:
  micro（颜色/透明度）: 100ms ease
  default（尺寸/位置）: 150ms ease
  modal（弹入/弹出）:   200ms ease-out

Hover: 总是有视觉反馈，不允许无响应的可点击元素
Focus: 品牌色 outline，2px offset
Loading: Skeleton 优于 Spinner（大区块），Spinner 用于按钮内
空状态: 图标 + 标题 + 描述 + CTA，居中布局
错误状态: 红色 Banner 或 inline 错误，不使用 alert()
```

---

## 禁止规则（DO NOT）

```
❌ 不使用白色背景（#FFFFFF）
❌ 不使用超过 3 层的阴影
❌ 不使用渐变作为主要背景（可用于品牌装饰）
❌ 不使用超过 2 种字体
❌ 不在卡片内放置卡片（超过 2 层嵌套）
❌ 不使用红/绿作为纯装饰色（保留给语义）
❌ 不使用 border-radius > 16px（除全圆外）
❌ 不省略 loading 状态和空状态
❌ 不使用超过 3 列的表单布局
```

---

## 品牌语言

```
产品名: AIForge
Slogan: Enterprise AI, Production Ready.
Logo 字形: 等宽 + 品牌紫，"AI" 高亮 + "Forge" 常规
图标风格: Lucide Icons（线性，2px stroke）
插图风格: 无（使用数据可视化代替装饰插图）
```
