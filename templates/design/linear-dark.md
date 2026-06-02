# {{PROJECT_NAME}} Design System
# 风格：Linear Dark — 超简约 · 精准 · 工程师审美

> 适用场景：开发者工具 / B 端 SaaS / 企业平台
> 📌 使用说明：替换品牌色和项目名后即可使用。

---

## 设计哲学

**Less, but precise（少，但精准）**

{{描述你的产品 UI 设计理念，1-3 句话}}

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
--color-bg-base:        #0F0F10;
--color-bg-elevated:    #161618;
--color-bg-overlay:     #1C1C1F;
--color-bg-subtle:      #232326;

/* 边框 */
--color-border:         #2A2A2E;
--color-border-strong:  #3A3A3F;

/* 文字 */
--color-text-primary:   #F0F0F2;
--color-text-secondary: #8B8B9A;
--color-text-tertiary:  #55555F;
--color-text-inverse:   #0F0F10;

/* 品牌色 ← 替换为你的品牌色 */
--color-brand:          {{#7C5CFC}};
--color-brand-hover:    {{#9070FF}};
--color-brand-muted:    {{#7C5CFC26}};
--color-brand-subtle:   {{#2D2540}};

/* 语义色（保持不变）*/
--color-success:        #30D158;
--color-success-muted:  #30D15820;
--color-warning:        #FFD60A;
--color-warning-muted:  #FFD60A20;
--color-error:          #FF453A;
--color-error-muted:    #FF453A20;
--color-info:           #0A84FF;
--color-info-muted:     #0A84FF20;
```

---

## 字体系统

```css
--font-sans: "Inter", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", "SF Mono", monospace;

/* 字号比例 */
--text-xs:   11px;
--text-sm:   13px;
--text-base: 14px;
--text-md:   16px;
--text-lg:   20px;
--text-xl:   24px;
--text-2xl:  32px;
--text-3xl:  48px;
```

---

## 间距系统

```css
/* 基于 4px 网格 */
--space-1: 4px;   --space-2: 8px;
--space-3: 12px;  --space-4: 16px;
--space-5: 20px;  --space-6: 24px;
--space-8: 32px;  --space-10: 40px;
--space-12: 48px; --space-16: 64px;
```

---

## 组件规范

### Button
```
Primary:   bg=brand, text=white
Secondary: bg=bg-elevated, border=border
Ghost:     bg=transparent, text=secondary
Danger:    bg=error-muted, text=error

尺寸: sm(h=28) / md(h=32) / lg(h=40)
```

### Card
```
bg=bg-elevated, border=border, radius=8px, p=24px
hover: border=border-strong, transition 150ms
```

### Badge
```
default / success / warning / error / brand
px=8px, py=4px, radius=4px, text-xs, weight-medium
```

---

## 布局

```
顶部栏：h=48px
侧边栏：240px（收起 56px）
内容区：max-w=1200px，px=32px，py=24px
卡片间距：16px
```

---

## 交互规范

```
颜色过渡：100ms ease
尺寸变化：150ms ease
弹窗动画：200ms ease-out
```

---

## 禁止规则

```
❌ 不使用白色背景（#FFFFFF）
❌ 不使用超过 2 种字体
❌ 不在卡片内嵌套卡片超过 2 层
❌ 不省略 loading 和空状态
❌ 不使用渐变作为主背景
```
