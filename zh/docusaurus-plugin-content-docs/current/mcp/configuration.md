---
id: configuration
title: 配置
---

本页面记录了WebdriverIO MCP服务器的所有配置选项。

## MCP服务器配置

MCP服务器通过Claude Desktop或Claude Code配置文件进行配置。

### 基本配置

#### macOS

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`：

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

#### Windows

编辑 `%APPDATA%\Claude\claude_desktop_config.json`：

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

#### Claude Code

编辑项目的 `.claude/settings.json`：

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

---

## 环境变量

通过环境变量配置Appium服务器连接和其他设置。

### Appium连接

| 变量 | 类型 | 默认值 | 描述 |
|----------|------|---------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Appium服务器主机名 |
| `APPIUM_URL_PORT` | number | `4723` | Appium服务器端口 |
| `APPIUM_PATH` | string | `/` | Appium服务器路径 |

### 使用环境变量的示例

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724",
                "APPIUM_PATH": "/wd/hub"
            }
        }
    }
}
```

---

## 浏览器会话选项

通过`start_browser`工具启动浏览器会话时可用的选项。

### `headless`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`

在无头模式下运行Chrome（无可见浏览器窗口）。适用于CI/CD环境或不需要看到浏览器的情况。

### `windowWidth`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `1920`
-   **范围:** `400` - `3840`

初始浏览器窗口宽度（像素）。

### `windowHeight`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `1080`
-   **范围:** `400` - `2160`

初始浏览器窗口高度（像素）。

### `navigationUrl`

-   **类型:** `string`
-   **必填:** 否

浏览器启动后立即导航到的URL。这比单独调用`start_browser`后跟`navigate`更高效。

**示例:** 一次调用启动浏览器并导航：
```
Start Chrome and navigate to https://webdriver.io
```

---

## 移动应用会话选项

通过`start_app_session`工具启动移动应用会话时可用的选项。

### 平台选项

#### `platform`

-   **类型:** `string`
-   **必填:** 是
-   **值:** `iOS` | `Android`

要自动化的移动平台。

#### `platformVersion`

-   **类型:** `string`
-   **必填:** 否

设备/模拟器的操作系统版本（例如，iOS的`17.0`，Android的`14`）。

#### `automationName`

-   **类型:** `string`
-   **必填:** 否
-   **值:** `XCUITest`（iOS），`UiAutomator2` | `Espresso`（Android）

要使用的自动化驱动程序。iOS默认为`XCUITest`，Android默认为`UiAutomator2`。

### 设备选项

#### `deviceName`

-   **类型:** `string`
-   **必填:** 是

要使用的设备、模拟器或仿真器的名称。

**示例:**
-   iOS模拟器: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Android模拟器: `Pixel 7`, `Nexus 5X`
-   真实设备: 系统中显示的设备名称

#### `udid`

-   **类型:** `string`
-   **必填:** 否（真实iOS设备需要）

唯一设备标识符。真实iOS设备需要（40字符标识符），Android真实设备建议提供。

**查找UDID:**
-   **iOS:** 连接设备，打开Finder/iTunes，点击设备→序列号（点击显示UDID）
-   **Android:** 在终端运行`adb devices`

### 应用选项

#### `appPath`

-   **类型:** `string`
-   **必填:** 否*

要安装和启动的应用程序文件路径。

**支持的格式:**
-   iOS模拟器: `.app`目录
-   iOS真实设备: `.ipa`文件
-   Android: `.apk`文件

*必须提供`appPath`，或者设置`noReset: true`以连接到已运行的应用。

#### `appWaitActivity`

-   **类型:** `string`
-   **必填:** 否（仅Android）

应用启动时等待的活动。如果未指定，则使用应用的主活动/启动器活动。

**示例:** `com.example.app.MainActivity`

### 会话状态选项

#### `noReset`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`

在会话之间保留应用状态。当为`true`时：
-   应用数据被保留（登录状态、偏好设置等）
-   会话将**分离**而不是关闭（保持应用运行）
-   适用于测试跨多个会话的用户旅程
-   可以不提供`appPath`而连接到已运行的应用

#### `fullReset`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`

在会话前完全重置应用。当为`true`时：
-   iOS: 卸载并重新安装应用
-   Android: 清除应用数据和缓存
-   适用于从干净状态开始

设置`fullReset: false`和`noReset: true`以完全保留应用状态。

### 会话超时

#### `newCommandTimeout`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `60`

Appium等待新命令的时间（秒），超过此时间将假定客户端已退出并结束会话。增加此值可延长调试会话时间。

**示例:**
-   `60` - 默认值，适合大多数自动化
-   `300` - 5分钟，用于调试或较慢的操作
-   `600` - 10分钟，用于非常长时间运行的测试

### 自动处理选项

#### `autoGrantPermissions`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`

在安装/启动时自动授予应用权限。当为`true`时：
-   相机、麦克风、位置等权限自动授予
-   不需要手动处理权限对话框
-   通过避免权限弹窗简化自动化

:::note 仅适用于Android
此选项主要影响Android。由于系统限制，iOS权限必须以不同方式处理。
:::

#### `autoAcceptAlerts`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`

自动接受自动化过程中出现的系统提醒（对话框）。

**自动接受的提醒示例:**
-   "允许通知？"
-   "应用想要访问您的位置"
-   "允许应用访问照片？"

#### `autoDismissAlerts`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`

关闭（取消）系统提醒，而不是接受它们。设为`true`时优先于`autoAcceptAlerts`。

### Appium服务器覆盖

您可以针对每个会话覆盖Appium服务器连接：

#### `appiumHost`

-   **类型:** `string`
-   **必填:** 否

Appium服务器主机名。覆盖`APPIUM_URL`环境变量。

#### `appiumPort`

-   **类型:** `number`
-   **必填:** 否

Appium服务器端口。覆盖`APPIUM_URL_PORT`环境变量。

#### `appiumPath`

-   **类型:** `string`
-   **必填:** 否

Appium服务器路径。覆盖`APPIUM_PATH`环境变量。

---

## 元素检测选项

`get_visible_elements`工具的选项。

### `elementType`

-   **类型:** `string`
-   **必填:** 否
-   **默认值:** `interactable`
-   **值:** `interactable` | `visual` | `all`

要返回的元素类型：
-   `interactable`: 按钮、链接、输入框和其他可点击元素
-   `visual`: 图像、SVG和视觉元素
-   `all`: 可交互和视觉元素

### `inViewportOnly`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`

只返回当前视口内可见的元素。设为`false`时，返回视图层次结构中的所有元素（适用于查找屏幕外元素）。

### `includeContainers`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`

在结果中包含容器/布局元素。设为`true`时：

**包含的Android容器:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**包含的iOS容器:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

适用于调试布局问题或理解视图层次结构。

### `includeBounds`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `false`

在响应中包含元素边界/坐标（x, y, 宽度, 高度）。设为`true`适用于：
-   基于坐标的交互
-   布局调试
-   视觉元素定位

### 分页选项

对于有许多元素的大页面，使用分页减少令牌使用：

#### `limit`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `0`（无限制）

要返回的最大元素数量。

#### `offset`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `0`

在返回结果前要跳过的元素数量。

**示例:** 获取第21-40个元素：
```
Get visible elements with limit 20 and offset 20
```

---

## 无障碍树选项

`get_accessibility`工具的选项（仅浏览器）。

### `limit`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `100`

要返回的最大节点数。使用`0`表示无限制（不建议用于大页面）。

### `offset`

-   **类型:** `number`
-   **必填:** 否
-   **默认值:** `0`

用于分页的要跳过的节点数。

### `roles`

-   **类型:** `string[]`
-   **必填:** 否
-   **默认值:** 所有角色

筛选特定的无障碍角色。

**常见角色:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**示例:** 只获取按钮和链接：
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **类型:** `boolean`
-   **必填:** 否
-   **默认值:** `true`

只返回有名称/标签的节点。过滤掉匿名容器并减少结果中的噪音。

---

## 截图选项

`take_screenshot`工具的选项。

### `outputPath`

-   **类型:** `string`
-   **必填:** 否

保存截图文件的路径。如果未提供，则返回base64编码的图像数据。

### 自动优化

截图会自动处理以优化LLM消耗：

| 优化 | 值 | 描述 |
|--------------|-------|-------------|
| 最大维度 | 2000px | 大于2000px的图像会缩小 |
| 最大文件大小 | 1MB | 图像被压缩以保持在1MB以下 |
| 格式 | PNG/JPEG | 最大压缩的PNG；如需控制大小则使用JPEG |

此优化确保截图可以高效处理，不超过令牌限制。

---

## 会话行为

### 会话类型

MCP服务器跟踪会话类型以提供适当的工具和行为：

| 类型 | 描述 | 自动分离 |
|------|-------------|-------------|
| `browser` | Chrome浏览器会话 | 否 |
| `ios` | iOS应用会话 | 是（如果`noReset: true`或没有`appPath`） |
| `android` | Android应用会话 | 是（如果`noReset: true`或没有`appPath`） |

### 单会话模型

MCP服务器使用**单会话模型**运行：

-   一次只能有一个浏览器或应用会话处于活动状态
-   启动新会话将关闭/分离当前会话
-   会话状态在工具调用之间全局维护

### 分离 vs 关闭

| 动作 | `detach: false`（关闭） | `detach: true`（分离） |
|--------|-------------------------|-------------------------|
| 浏览器 | 完全关闭Chrome | 保持Chrome运行，断开WebDriver连接 |
| 移动应用 | 终止应用 | 保持应用在当前状态下运行 |
| 使用场景 | 下一会话的干净状态 | 保留状态，手动检查 |

---

## 性能考虑

MCP服务器使用**TOON（面向令牌的对象表示法）**格式优化了与LLM的高效通信，在向Claude发送数据时最小化令牌使用。

### 浏览器自动化

-   **无头模式**更快但不渲染视觉元素
-   **较小的窗口尺寸**减少截图捕获时间
-   **元素检测**通过单一脚本执行进行优化
-   **截图优化**保持图像在1MB以下以高效处理
-   **`inViewportOnly: true`**（默认）仅筛选可见元素

### 移动自动化

-   **XML页面源解析**仅使用2个HTTP调用（与传统元素查询的600+相比）
-   **Accessibility ID选择器**最快且最可靠
-   **XPath选择器**最慢 - 仅作为最后手段使用
-   **`inViewportOnly: true`**（默认）显著减少元素数量
-   **分页**（`limit`和`offset`）减少带有许多元素的屏幕的令牌使用
-   **`includeBounds: false`**（默认）省略坐标数据，除非需要

### 令牌使用提示

| 设置 | 影响 |
|---------|--------|
| `inViewportOnly: true` | 过滤屏幕外元素，减少响应大小 |
| `includeContainers: false` | 排除布局元素（ViewGroup等） |
| `includeBounds: false` | 省略x/y/宽度/高度数据 |
| `limit`与分页 | 批量处理元素而不是一次性处理所有 |
| `namedOnly: true`（无障碍） | 过滤匿名节点 |

---

## Appium服务器设置

在使用移动自动化前，确保正确配置Appium。

### 基本设置

```sh
# 全局安装Appium
npm install -g appium

# 安装驱动程序
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# 启动服务器
appium
```

### 自定义服务器配置

```sh
# 使用自定义主机和端口启动
appium --address 0.0.0.0 --port 4724

# 启用日志记录
appium --log-level debug

# 使用特定基本路径启动
appium --base-path /wd/hub
```

### 验证安装

```sh
# 检查已安装的驱动程序
appium driver list --installed

# 检查Appium版本
appium --version

# 测试连接
curl http://localhost:4723/status
```

---

## 故障排除配置

### MCP服务器不启动

1. 验证npm/npx已安装：`npm --version`
2. 尝试手动运行：`npx @wdio/mcp`
3. 检查Claude Desktop日志中的错误

### Appium连接问题

1. 验证Appium正在运行：`curl http://localhost:4723/status`
2. 检查环境变量是否与Appium服务器设置匹配
3. 确保防火墙允许Appium端口上的连接

### 会话无法启动

1. **浏览器：**确保已安装Chrome
2. **iOS：**验证Xcode和模拟器可用
3. **Android：**检查`ANDROID_HOME`和模拟器是否运行
4. 查看Appium服务器日志获取详细错误消息

### 会话超时

如果会话在调试期间超时：
1. 启动会话时增加`newCommandTimeout`
2. 使用`noReset: true`在会话之间保留状态
3. 关闭时使用`detach: true`保持应用运行