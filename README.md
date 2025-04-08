# 💰 财富自由计算器 (Wealth Freedom Calculator)

> 一个现代化、高颜值的财富阶段诊断与规划系统。从“吃土青年”到“隐形富豪”，精准定位你的财务坐标，规划通往未来的财富之路。

![项目预览](./screenshot.png)

## 🌟 核心价值

本项目不仅是一个简单的理财工具，更是一场关于财务未来的“沉浸式探索体验”。通过科学的复利模型和趣味十足的阶段设定，帮助用户在轻松的氛围中审视自身财务状况。

---

## ✨ 关键特性

### 📊 深度财务洞察
- **财富阶段诊断**：基于 `stages.json` 预设的 **50+ 个独特阶段**，从负债累累的“系统级风险”到资产千亿的“别想了兄弟”，覆盖全生命周期的财务状态。
- **多维度分析面板**：
    - **年储蓄与储蓄率**：实时分析资产积累效率。
    - **生存月数预测**：计算在无收入情况下的财务韧性。
    - **投资收益模拟**：内置 0%-20% 动态收益率滑块，直观感受复利威力。

### 🎯 进阶路线规划
- **动态路线图**：自动预测到达未来各个财富阶段所需的**预计年数**与**到达年龄**。
- **实时进度追踪**：精细化展示距离“下一阶段”的缺口，并提供基于当前结余的达成时间估算。
- **专家级建议**：根据用户当前阶段，自动匹配专业的（或幽默且扎心的）理财、生活与法律建议。

### 🎨 极致视觉体验
- **现代美学设计**：采用流行的 **Glassmorphism（玻璃态）** 风格，极致的模糊透明质感。
- **沉浸式交互**：动态粒子背景跟随，配合丝滑的过渡动画与响应式反馈。
- **双模主题**：支持深色/浅色模式一键切换，偏好持久化。
- **零干扰操作**：采用 LocalStorage 自动保存数据，无需登录，即扫即用。

---

## 🛠️ 技术栈

- **Core**: HTML5, CSS3 (Modern Features: Variables, Grid, Flexbox, Backdrop Filter)
- **Logic**: Vanilla JavaScript ES6+ (No redundant frameworks, ultra-low latency)
- **Data**: JSON-driven configuration system (`stages.json`)
- **Icons**: Font Awesome 6
- **Typography**: Google Fonts (Inter & Noto Sans SC)

---

## 🚀 快速启动

### 方式 A：即刻在线体验
点击访问：[https://wealth-freedom.vercel.app](https://wealth-freedom.vercel.app)

### 方式 B：本地开发调试
```bash
# 1. 克隆仓库
git clone https://github.com/your-username/wealth-freedom.git

# 2. 进入项目目录
cd wealth-freedom

# 3. 启动静态服务
# 使用 npx
npx http-server . -p 8080 -o
# 或者 Python
python -m http.server 8080
```

---

## 📁 目录结构

```text
wealth-freedom/
├── index.html      # 结构逻辑，包含 SEO 优化与结构化内容
├── styles.css      # 视觉系统，包含玻璃态、主题切换与响应式定义
├── app.js          # 核心引擎，处理复利算法与 UI 动态逻辑
├── stages.json     # 内容引擎，定义所有财富阶段的数据资产
├── screenshot.png  # 项目视觉缩略图
├── appreciate.jpg  # 社交支持模块
└── README.md       # 开发者指南
```

---

## ⚙️ 自定义配置

你可以通过简单修改 `stages.json` 来定制属于你的财富等级系统：

```json
{
  "minAssets": 1000000,
  "name": "千万俱乐部",
  "title": "资产配置玩家",
  "description": "描述性文字...",
  "icon": "fas fa-gem",
  "tag": ["标签1", "标签2"],
  "advice": "针对该阶段的特殊理财建议..."
}
```

---

## 📜 许可证

本项目采用 [MIT License](LICENSE) 授权。欢迎任何形式的 Fork、PR 或 Issue！

---

## 🙏 致谢

- 感谢 [Font Awesome](https://fontawesome.com/) 提供精美的图标支持。
- 感谢 [Google Fonts](https://fonts.google.com/) 提供的优质中英文字体。

---

**⚠️ 免责声明**：本应用计算结果基于特定数学模型，仅供理财规划参考及娱乐使用，不构成任何实质性投资建议。市场有风险，投资需谨慎。

*如果这个项目让你对财务自由有了新的思考，别忘了点个 ⭐ Star！*