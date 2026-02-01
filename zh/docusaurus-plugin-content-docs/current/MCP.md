---
id: mcp
title: MCP（模型上下文协议）
---

## 它能做什么？

WebdriverIO MCP 是一个**模型上下文协议（MCP）服务器**，使 Claude Desktop 和 Claude Code 等 AI 助手能够自动化并与网络浏览器和移动应用程序交互。

### 为什么选择 WebdriverIO MCP？

-   **移动优先**：不同于仅支持浏览器的 MCP 服务器，WebdriverIO MCP 通过 Appium 支持 iOS 和 Android 原生应用自动化
-   **跨平台选择器**：智能元素检测自动生成多种定位策略（可访问性 ID、XPath、UiAutomator、iOS 谓词）
-   **WebdriverIO 生态系统**：基于经过实战检验的 WebdriverIO 框架，拥有丰富的服务和报告生态系统

它为以下平台提供了统一的接口：

-   🖥️ **桌面浏览器**（Chrome - 有头或无头模式）
-   📱 **原生移动应用**（iOS 模拟器 / Android 模拟器 / 通过 Appium 连接的真机）
-   📳 **混合移动应用**（通过 Appium 在原生和 WebView 上下文之间切换）

通过 [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) 包实现。

这使得 AI 助手能够：

-   **启动和控制浏览器**，可配置尺寸、无头模式和可选的初始导航
-   **浏览网站**并与元素交互（点击、输入、滚动）
-   **分析页面内容**，通过可访问性树和可见元素检测（支持分页）
-   **截图**自动优化（调整大小、压缩至最大 1MB）
-   **管理 cookies** 用于会话处理
-   **控制移动设备**，包括手势（点击、滑动、拖放）
-   **在混合应用中切换上下文**，在原生和 webview 之间切换
-   **执行脚本** - 浏览器中的 JavaScript，设备上的 Appium 移动命令
-   **处理设备功能**，如旋转、键盘、地理位置
-   以及更多功能，请参阅[工具](./mcp/tools)和[配置](./mcp/configuration)选项

:::info

注意：对于移动应用
移动自动化需要运行中的 Appium 服务器，并安装适当的驱动程序。请参阅[先决条件](#prerequisites)获取设置说明。

:::

## 安装

使用 `@wdio/mcp` 最简单的方法是通过 npx，无需本地安装：

```sh
npx @wdio/mcp
```

或全局安装：

```sh
npm install -g @wdio/mcp
```

## 与 Claude 一起使用

要将 WebdriverIO MCP 与 Claude 一起使用，请修改配置文件：

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

添加配置后，重启 Claude。WebdriverIO MCP 工具将可用于浏览器和移动自动化任务。

### 与 Claude Code 一起使用

Claude Code 会自动检测 MCP 服务器。您可以在项目的 `.claude/settings.json` 或 `.mcp.json` 中配置它。

或者通过执行以下命令将其添加到全局的 .claude.json 中：
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
通过在 claude code 中运行 `/mcp` 命令来验证它。

## 快速入门示例

### 浏览器自动化

请求 Claude 自动执行浏览器任务：

```
"打开 Chrome 并导航到 https://webdriver.io"
"点击'Get Started'按钮"
"截取页面的屏幕截图"
"查找页面上所有可见链接"
```

### 移动应用自动化

请求 Claude 自动执行移动应用任务：

```
"在 iPhone 15 模拟器上启动我的 iOS 应用"
"点击登录按钮"
"向上滑动以向下滚动"
"截取当前屏幕的屏幕截图"
```

## 功能

### 浏览器自动化 (Chrome)

| 功能 | 描述 |
|---------|-------------|
| **会话管理** | 以有头/无头模式启动 Chrome，自定义尺寸和可选的导航 URL |
| **导航** | 导航到 URL |
| **元素交互** | 点击元素，输入文本，通过各种选择器查找元素 |
| **页面分析** | 获取可见元素（带分页），可访问性树（带过滤） |
| **截图** | 捕获截图（自动优化到最大 1MB） |
| **滚动** | 通过可配置的像素数量上下滚动 |
| **Cookie 管理** | 获取、设置和删除 cookies |
| **脚本执行** | 在浏览器上下文中执行自定义 JavaScript |

### 移动应用自动化 (iOS/Android)

| 功能 | 描述 |
|---------|-------------|
| **会话管理** | 在模拟器、仿真器或真机上启动应用 |
| **触摸手势** | 点击、滑动、拖放 |
| **元素检测** | 具有多种定位策略和分页的智能元素检测 |
| **应用生命周期** | 获取应用状态（通过 `execute_script` 激活/终止） |
| **上下文切换** | 在混合应用中的原生和 webview 上下文之间切换 |
| **设备控制** | 旋转设备，键盘控制 |
| **地理位置** | 获取和设置设备 GPS 坐标 |
| **权限** | 自动权限和警告处理 |
| **脚本执行** | 执行 Appium 移动命令（pressKey、deepLink、shell 等） |

## 先决条件

### 浏览器自动化

-   系统中必须安装 **Chrome**
-   WebdriverIO 处理自动 ChromeDriver 管理

### 移动自动化

#### iOS

1. **安装 Xcode** 从 Mac App Store
2. **安装 Xcode 命令行工具**：
   ```sh
   xcode-select --install
   ```
3. **安装 Appium**：
   ```sh
   npm install -g appium
   ```
4. **安装 XCUITest 驱动程序**：
   ```sh
   appium driver install xcuitest
   ```
5. **启动 Appium 服务器**：
   ```sh
   appium
   ```
6. **对于模拟器**：打开 Xcode → Window → Devices and Simulators 创建/管理模拟器
7. **对于真机**：您需要设备 UDID（40 字符的唯一标识符）

#### Android

1. **安装 Android Studio** 并设置 Android SDK
2. **设置环境变量**：
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **安装 Appium**：
   ```sh
   npm install -g appium
   ```
4. **安装 UiAutomator2 驱动程序**：
   ```sh
   appium driver install uiautomator2
   ```
5. **启动 Appium 服务器**：
   ```sh
   appium
   ```
6. **创建模拟器** 通过 Android Studio → Virtual Device Manager
7. **在运行测试前启动模拟器**

## 架构

### 工作原理

WebdriverIO MCP 充当 AI 助手和浏览器/移动自动化之间的桥梁：

```
┌─────────────────┐     MCP 协议      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  或 Claude Code │      (stdio)          │     服务器      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Chrome     │             │    Appium     │             │    Appium     │
            │   (浏览器)    │             │     (iOS)     │             │   (Android)   │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### 会话管理

-   **单会话模型**：一次只能有一个浏览器或应用会话处于活动状态
-   **会话状态**在工具调用之间全局维护
-   **自动分离**：具有保留状态的会话（`noReset: true`）在关闭时自动分离

### 元素检测

#### 浏览器（Web）

-   使用优化的浏览器脚本查找所有可见、可交互的元素
-   返回具有 CSS 选择器、ID、类和 ARIA 信息的元素
-   默认过滤为视口可见元素

#### 移动（原生应用）

-   使用高效的 XML 页面源解析（2 次 HTTP 调用 vs 传统查询的 600+ 次）
-   针对 Android 和 iOS 的平台特定元素分类
-   为每个元素生成多种定位策略：
    -   可访问性 ID（跨平台，最稳定）
    -   资源 ID / 名称属性
    -   文本 / 标签匹配
    -   XPath（完整和简化）
    -   UiAutomator（Android）/ 谓词（iOS）

## 选择器语法

MCP 服务器支持多种选择器策略。详细文档请参阅[选择器](./mcp/selectors)。

### Web (CSS/XPath)

```
# CSS 选择器
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# 文本选择器（WebdriverIO 特有）
button=精确按钮文本
a*=部分链接文本
```

### 移动（跨平台）

```
# 可访问性 ID（推荐 - 适用于 iOS 和 Android）
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS 谓词字符串
-ios predicate string:label == "Login"

# iOS 类链
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath（适用于两个平台）
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## 可用工具

MCP 服务器提供了 25 个用于浏览器和移动自动化的工具。完整参考请参阅[工具](./mcp/tools)。

### 浏览器工具

| 工具 | 描述 |
|------|-------------|
| `start_browser` | 启动 Chrome 浏览器（可选初始 URL） |
| `close_session` | 关闭或分离会话 |
| `navigate` | 导航到 URL |
| `click_element` | 点击元素 |
| `set_value` | 在输入框中输入文本 |
| `get_visible_elements` | 获取可见/可交互元素（带分页） |
| `get_accessibility` | 获取可访问性树（带过滤） |
| `take_screenshot` | 捕获截图（自动优化） |
| `scroll` | 上下滚动页面 |
| `get_cookies` / `set_cookie` / `delete_cookies` | Cookie 管理 |
| `execute_script` | 在浏览器中执行 JavaScript |

### 移动工具

| 工具 | 描述 |
|------|-------------|
| `start_app_session` | 启动 iOS/Android 应用 |
| `tap_element` | 点击元素或坐标 |
| `swipe` | 朝某个方向滑动 |
| `drag_and_drop` | 在位置之间拖动 |
| `get_app_state` | 检查应用是否正在运行 |
| `get_contexts` / `switch_context` | 混合应用上下文切换 |
| `rotate_device` | 旋转到纵向/横向 |
| `get_geolocation` / `set_geolocation` | 获取或设置 GPS 坐标 |
| `hide_keyboard` | 关闭屏幕键盘 |
| `execute_script` | 执行 Appium 移动命令 |

## 自动处理

### 权限

默认情况下，MCP 服务器自动授予应用权限（`autoGrantPermissions: true`），无需在自动化过程中手动处理权限对话框。

### 系统提醒

系统提醒（如"允许通知？"）默认自动接受（`autoAcceptAlerts: true`）。可以通过 `autoDismissAlerts: true` 配置为自动关闭。

## 配置

### 环境变量

配置 Appium 服务器连接：

| 变量 | 默认值 | 描述 |
|----------|---------|-------------|
| `APPIUM_URL` | `127.0.0.1` | Appium 服务器主机名 |
| `APPIUM_URL_PORT` | `4723` | Appium 服务器端口 |
| `APPIUM_PATH` | `/` | Appium 服务器路径 |

### 自定义 Appium 服务器示例

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724"
            }
        }
    }
}
```

## 性能优化

MCP 服务器针对高效的 AI 助手通信进行了优化：

-   **TOON 格式**：使用面向令牌的对象表示法以最小化令牌使用量
-   **XML 解析**：移动元素检测使用 2 次 HTTP 调用（相比传统的 600+ 次）
-   **截图压缩**：使用 Sharp 自动将图像压缩到最大 1MB
-   **视口过滤**：默认只返回可见元素
-   **分页**：大型元素列表可以分页以减少响应大小

## TypeScript 支持

MCP 服务器使用 TypeScript 编写，包含完整的类型定义。如果您要扩展或以编程方式与服务器集成，您将受益于自动完成和类型安全。

## 错误处理

所有工具都设计有稳健的错误处理：

-   错误作为文本内容返回（永不抛出），保持 MCP 协议稳定性
-   描述性错误消息帮助诊断问题
-   即使单个操作失败，会话状态也会被保留

## 用例

### 质量保证

-   AI 驱动的测试用例执行
-   使用截图进行视觉回归测试
-   通过可访问性树分析进行可访问性审计

### Web 抓取与数据提取

-   导航复杂的多页面流程
-   从动态内容中提取结构化数据
-   处理认证和会话管理

### 移动应用测试

-   跨平台测试自动化（iOS + Android）
-   入职流程验证
-   深层链接和导航测试

### 集成测试

-   端到端工作流测试
-   API + UI 集成验证
-   多平台一致性检查

## 故障排除

### 浏览器无法启动

-   确保已安装 Chrome
-   检查没有其他进程使用默认调试端口（9222）
-   如果出现显示问题，请尝试无头模式

### Appium 连接失败

-   验证 Appium 服务器是否正在运行（`appium`）
-   检查 Appium URL 和端口配置
-   确保已安装适当的驱动程序（`appium driver list`）

### iOS 模拟器问题

-   确保已安装并更新 Xcode
-   检查模拟器是否可用（`xcrun simctl list devices`）
-   对于真机，验证 UDID 是否正确

### Android 模拟器问题

-   确保 Android SDK 配置正确
-   验证模拟器是否正在运行（`adb devices`）
-   检查是否设置了 `ANDROID_HOME` 环境变量

## 资源

-   [工具参考](./mcp/tools) - 可用工具的完整列表
-   [选择器指南](./mcp/selectors) - 选择器语法文档
-   [配置](./mcp/configuration) - 配置选项
-   [常见问题](./mcp/faq) - 常见问题解答
-   [GitHub 仓库](https://github.com/webdriverio/mcp) - 源代码和问题
-   [NPM 包](https://www.npmjs.com/package/@wdio/mcp) - npm 上的包
-   [模型上下文协议](https://modelcontextprotocol.io/) - MCP 规范