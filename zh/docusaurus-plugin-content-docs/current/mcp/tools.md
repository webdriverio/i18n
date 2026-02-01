---
id: tools
title: 工具
---

以下工具可通过WebdriverIO MCP服务器获取。这些工具使AI助手能够自动化浏览器和移动应用程序。

## 会话管理

### `start_browser`

启动Chrome浏览器会话。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `headless` | boolean | 否 | `false` | 以无头模式运行Chrome |
| `windowWidth` | number | 否 | `1920` | 浏览器窗口宽度(400-3840) |
| `windowHeight` | number | 否 | `1080` | 浏览器窗口高度(400-2160) |
| `navigationUrl` | string | 否 | - | 启动浏览器后导航到的URL |

#### 示例

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### 支持

- 桌面浏览器

---

### `start_app_session`

通过Appium在iOS或Android上启动移动应用程序会话。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `platform` | string | 是 | - | 自动化平台：`iOS` 或 `Android` |
| `deviceName` | string | 是 | - | 设备或模拟器/仿真器的名称 |
| `appPath` | string | 否* | - | 应用程序文件路径(.app, .ipa, 或 .apk) |
| `platformVersion` | string | 否 | - | 操作系统版本(例如，`17.0`, `14`) |
| `automationName` | string | 否 | Auto | `XCUITest`(iOS)，`UiAutomator2` 或 `Espresso`(Android) |
| `udid` | string | 否 | - | 唯一设备标识符(真实iOS设备需要) |
| `noReset` | boolean | 否 | `false` | 在会话之间保留应用程序状态 |
| `fullReset` | boolean | 否 | `true` | 会话前卸载并重新安装应用程序 |
| `autoGrantPermissions` | boolean | 否 | `true` | 自动授予应用程序权限 |
| `autoAcceptAlerts` | boolean | 否 | `true` | 自动接受系统提示 |
| `autoDismissAlerts` | boolean | 否 | `false` | 关闭(而不是接受)提示 |
| `appWaitActivity` | string | 否 | - | 启动时等待的活动(仅Android) |
| `newCommandTimeout` | number | 否 | `60` | 因不活动导致会话超时的秒数 |
| `appiumHost` | string | 否 | `127.0.0.1` | Appium服务器主机名 |
| `appiumPort` | number | 否 | `4723` | Appium服务器端口 |
| `appiumPath` | string | 否 | `/` | Appium服务器路径 |

*必须提供`appPath`，或设置`noReset: true`连接到已运行的应用程序。

#### 示例

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### 支持

- iOS模拟器
- iOS真机
- Android模拟器
- Android真机

---

### `close_session`

关闭当前浏览器或应用程序会话。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `detach` | boolean | 否 | `false` | 从会话分离而不是关闭(保持浏览器/应用运行) |

#### 注意

设置`noReset: true`或没有`appPath`的会话会在关闭时自动分离以保留状态。

#### 支持

- 桌面浏览器
- 移动应用

---

## 导航

### `navigate`

导航到URL。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `url` | string | 是 | 要导航到的URL |

#### 示例

```
Navigate to https://webdriver.io
```

#### 支持

- 桌面浏览器

---

## 元素交互

### `click_element`

点击由选择器标识的元素。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `selector` | string | 是 | - | CSS选择器、XPath或移动选择器 |
| `scrollToView` | boolean | 否 | `true` | 点击前将元素滚动到视图中 |
| `timeout` | number | 否 | `3000` | 等待元素的最长时间(毫秒) |

#### 注意

- 支持WebdriverIO文本选择器：`button=Exact text` 或 `a*=Contains text`
- 滚动定位使用中心对齐

#### 示例

```
Click the element with selector "#submit-button"
```

#### 支持

- 桌面浏览器
- 移动原生应用

---

### `set_value`

在输入字段中输入文本。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `selector` | string | 是 | - | 输入元素的选择器 |
| `value` | string | 是 | - | 要输入的文本 |
| `scrollToView` | boolean | 否 | `true` | 输入前将元素滚动到视图中 |
| `timeout` | number | 否 | `3000` | 等待元素的最长时间(毫秒) |

#### 注意

在输入新文本前清除现有值。

#### 示例

```
Set the value "john@example.com" in the element with selector "#email"
```

#### 支持

- 桌面浏览器
- 移动原生应用

---

## 页面分析

### `get_visible_elements`

获取当前页面或屏幕上可见和可交互的元素。这是发现可用于交互的元素的主要工具。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `elementType` | string | 否 | `interactable` | 元素类型：`interactable`(按钮/链接/输入)、`visual`(图像/SVG)或`all` |
| `inViewportOnly` | boolean | 否 | `true` | 仅返回视口中可见的元素 |
| `includeContainers` | boolean | 否 | `false` | 包括布局容器(ViewGroup, ScrollView等) |
| `includeBounds` | boolean | 否 | `false` | 包括元素坐标(x, y, width, height) |
| `limit` | number | 否 | `0` | 最大返回元素数(0 = 无限制) |
| `offset` | number | 否 | `0` | 要跳过的元素数(用于分页) |

#### 返回值

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Web元素包括：** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**移动元素包括：** 多种定位策略(accessibility ID, resource ID, XPath, UiAutomator/predicates)、元素类型、文本和可选的边界

#### 注意

- **Web**：使用优化的浏览器脚本进行快速元素检测
- **移动**：使用高效的XML页面源分析(2个HTTP调用 vs 600+元素查询)
- 对于大页面，使用分页(`limit`和`offset`)来减少令牌使用

#### 示例

```
Get all visible elements on the page with their coordinates
```

#### 支持

- 桌面浏览器
- 移动应用

---

### `get_accessibility`

获取当前页面的无障碍树，包含有关角色、名称和状态的语义信息。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `limit` | number | 否 | `100` | 最大返回节点数(0 = 无限制) |
| `offset` | number | 否 | `0` | 要跳过的节点数(用于分页) |
| `roles` | string[] | 否 | 全部 | 过滤特定角色(例如，`["button", "link", "textbox"]`) |
| `namedOnly` | boolean | 否 | `true` | 仅返回有名称/标签的节点 |

#### 返回值

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### 注意

- 仅限浏览器。对于移动应用，请使用`get_visible_elements`
- 当`get_visible_elements`未返回预期元素时很有用
- `namedOnly: true`过滤掉匿名容器并减少噪音

#### 支持

- 桌面浏览器

---

## 截图

### `take_screenshot`

捕获当前视口的截图。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `outputPath` | string | 否 | 保存截图文件的路径。如果省略，返回base64数据 |

#### 返回值

Base64编码的图像数据(PNG或JPEG)及大小信息。

#### 注意

截图会自动优化：
- 最大尺寸：2000px(如果更大则缩小)
- 最大文件大小：1MB
- 格式：最大压缩的PNG，或根据需要JPEG以满足大小限制

#### 支持

- 桌面浏览器
- 移动应用

---

## 滚动

### `scroll`

将页面向上或向下滚动指定像素数。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `direction` | string | 是 | - | 滚动方向：`up` 或 `down` |
| `pixels` | number | 否 | `500` | 要滚动的像素数 |

#### 注意

仅限浏览器。对于移动滚动，请使用`swipe`工具。

#### 支持

- 桌面浏览器

---

## Cookie管理

### `get_cookies`

从当前会话获取cookies。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `name` | string | 否 | 要获取的特定cookie名称(省略则获取所有cookie) |

#### 返回值

Cookie对象，包含name、value、domain、path、expiry、secure和httpOnly属性。

#### 支持

- 桌面浏览器

---

### `set_cookie`

在当前会话中设置cookie。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `name` | string | 是 | - | Cookie名称 |
| `value` | string | 是 | - | Cookie值 |
| `domain` | string | 否 | 当前 | Cookie域 |
| `path` | string | 否 | `/` | Cookie路径 |
| `expiry` | number | 否 | - | 过期时间为Unix时间戳(秒) |
| `secure` | boolean | 否 | - | Secure标志 |
| `httpOnly` | boolean | 否 | - | HttpOnly标志 |
| `sameSite` | string | 否 | - | SameSite属性：`strict`、`lax`或`none` |

#### 支持

- 桌面浏览器

---

### `delete_cookies`

从当前会话删除cookies。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `name` | string | 否 | 要删除的特定cookie名称(省略则删除所有) |

#### 支持

- 桌面浏览器

---

## 触摸手势(移动)

### `tap_element`

点击元素或屏幕坐标。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `selector` | string | 否* | 要点击的元素选择器 |
| `x` | number | 否* | 点击的X坐标 |
| `y` | number | 否* | 点击的Y坐标 |

*需要`selector`或同时提供`x`和`y`。

#### 支持

- 移动应用

---

### `swipe`

在指定方向执行滑动手势。

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|-----------|---------|-------------|
| `direction` | string | 是 | - | 滑动方向：`up`、`down`、`left`、`right` |
| `duration` | number | 否 | `500` | 滑动持续时间(毫秒)(100-5000) |
| `percent` | number | 否 | 0.5/0.95 | 屏幕滑动百分比(0-1) |

#### 注意

- 默认百分比：垂直滑动为0.5，水平滑动为0.95
- 方向表示内容移动："向上滑动"使内容向上滚动

#### 示例

```
Swipe up to scroll down the screen
```

#### 支持

- 移动应用

---

### `drag_and_drop`

将元素拖动到另一个元素或坐标。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | 是 | 要拖动的源元素选择器 |
| `targetSelector` | string | 否* | 要放置到的目标元素选择器 |
| `x` | number | 否* | 目标X偏移(如果没有targetSelector) |
| `y` | number | 否* | 目标Y偏移(如果没有targetSelector) |
| `duration` | number | 否 | 默认 | 拖动持续时间(毫秒)(100-5000) |

*需要`targetSelector`或同时提供`x`和`y`。

#### 支持

- 移动应用

---

## 应用生命周期(移动)

### `get_app_state`

获取应用程序的当前状态。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `bundleId` | string | 是 | 应用标识符(iOS的bundle ID，Android的package name) |

#### 返回值

应用状态：`not installed`, `not running`, `running in background (suspended)`, `running in background`, 或 `running in foreground`。

#### 支持

- 移动应用

---

## 上下文切换(混合应用)

### `get_contexts`

列出所有可用上下文(原生和webview)。

#### 参数

无

#### 返回值

上下文名称数组(例如，`["NATIVE_APP", "WEBVIEW_com.example.app"]`)。

#### 支持

- 移动混合应用

---

### `get_current_context`

获取当前活动的上下文。

#### 参数

无

#### 返回值

当前上下文名称(例如，`NATIVE_APP`或`WEBVIEW_*`)。

#### 支持

- 移动混合应用

---

### `switch_context`

在原生和webview上下文之间切换。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `context` | string | 是 | 从`get_contexts`获取的上下文名称或索引(从1开始) |

#### 示例

```
Switch to the WEBVIEW_com.example.app context
```

#### 支持

- 移动混合应用

---

## 设备控制(移动)

### `rotate_device`

将设备旋转到特定方向。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `orientation` | string | 是 | `PORTRAIT` 或 `LANDSCAPE` |

#### 支持

- 移动应用

---

### `hide_keyboard`

隐藏屏幕键盘。

#### 参数

无

#### 支持

- 移动应用

---

### `get_geolocation`

获取当前GPS坐标。

#### 参数

无

#### 返回值

包含`latitude`、`longitude`和`altitude`的对象。

#### 支持

- 移动应用

---

### `set_geolocation`

设置设备GPS坐标。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `latitude` | number | 是 | 纬度坐标(-90到90) |
| `longitude` | number | 是 | 经度坐标(-180到180) |
| `altitude` | number | 否 | 海拔(米) |

#### 示例

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### 支持

- 移动应用

---

## 脚本执行

### `execute_script`

在浏览器中执行JavaScript或通过Appium执行移动命令。

#### 参数

| 参数 | 类型 | 必填 | 描述 |
|-----------|------|-----------|-------------|
| `script` | string | 是 | JavaScript代码(浏览器)或移动命令(如`mobile: pressKey`) |
| `args` | array | 否 | 脚本的参数 |

#### 浏览器示例

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### 移动(Appium)示例

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### 常用Android按键代码

| 按键 | 代码 |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### 更多移动命令

有关可用Appium移动命令的完整列表，请参阅：
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### 支持

- 桌面浏览器
- 移动应用(通过Appium移动命令)