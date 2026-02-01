---
id: selectors
title: 选择器
---

WebdriverIO MCP 服务器支持多种选择器策略，用于定位网页和移动应用程序中的元素。

:::info

有关包括所有 WebdriverIO 选择器策略在内的综合选择器文档，请参阅主要的[选择器](/docs/selectors)指南。本页面主要关注 MCP 服务器常用的选择器。

:::

## Web 选择器

对于浏览器自动化，MCP 服务器支持所有标准的 WebdriverIO 选择器。最常用的包括：

| 选择器 | 示例 | 描述 |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | 标准 CSS 选择器 |
| XPath | `//button[@id='submit']` | XPath 表达式 |
| 文本 | `button=Submit`, `a*=Click` | WebdriverIO 文本选择器 |
| ARIA | `aria/Submit Button` | 无障碍名称选择器 |
| 测试 ID | `[data-testid="submit"]` | 推荐用于测试 |

有关详细示例和最佳实践，请参阅[选择器](/docs/selectors)文档。

---

## 移动端选择器

移动端选择器通过 Appium 在 iOS 和 Android 平台上工作。

### 无障碍 ID（推荐）

无障碍 ID 是**最可靠的跨平台选择器**。它们在 iOS 和 Android 上都能工作，并在应用更新中保持稳定。

```
# 语法
~accessibilityId

# 示例
~loginButton
~submitForm
~usernameField
```

:::tip 最佳实践
尽可能首选无障碍 ID。它们提供：
- 跨平台兼容性（iOS + Android）
- 在 UI 变化中保持稳定
- 更好的测试可维护性
- 改善应用的无障碍性
:::

### Android 选择器

#### UiAutomator

UiAutomator 选择器对 Android 来说强大且快速。

```
# 通过文本
android=new UiSelector().text("Login")

# 通过部分文本
android=new UiSelector().textContains("Log")

# 通过资源 ID
android=new UiSelector().resourceId("com.example:id/login_button")

# 通过类名
android=new UiSelector().className("android.widget.Button")

# 通过描述（无障碍）
android=new UiSelector().description("Login button")

# 组合条件
android=new UiSelector().className("android.widget.Button").text("Login")

# 可滚动容器
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### 资源 ID

资源 ID 在 Android 上提供稳定的元素标识。

```
# 完整资源 ID
id=com.example.app:id/login_button

# 部分 ID（推断应用包）
id=login_button
```

#### XPath (Android)

XPath 在 Android 上有效，但比 UiAutomator 慢。

```
# 通过类和文本
//android.widget.Button[@text='Login']

# 通过资源 ID
//android.widget.EditText[@resource-id='com.example:id/username']

# 通过内容描述
//android.widget.ImageButton[@content-desc='Menu']

# 层次结构
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS 选择器

#### 谓词字符串

iOS 谓词字符串对 iOS 自动化来说快速而强大。

```
# 通过标签
-ios predicate string:label == "Login"

# 通过部分标签
-ios predicate string:label CONTAINS "Log"

# 通过名称
-ios predicate string:name == "loginButton"

# 通过类型
-ios predicate string:type == "XCUIElementTypeButton"

# 通过值
-ios predicate string:value == "ON"

# 组合条件
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# 可见性
-ios predicate string:label == "Login" AND visible == 1

# 不区分大小写
-ios predicate string:label ==[c] "login"
```

**谓词运算符：**

| 运算符 | 描述 |
|----------|-------------|
| `==` | 等于 |
| `!=` | 不等于 |
| `CONTAINS` | 包含子字符串 |
| `BEGINSWITH` | 以...开始 |
| `ENDSWITH` | 以...结束 |
| `LIKE` | 通配符匹配 |
| `MATCHES` | 正则表达式匹配 |
| `AND` | 逻辑与 |
| `OR` | 逻辑或 |

#### 类链

iOS 类链提供层次结构元素定位，性能良好。

```
# 直接子元素
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# 任何后代
-ios class chain:**/XCUIElementTypeButton

# 通过索引
-ios class chain:**/XCUIElementTypeCell[3]

# 与谓词组合
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# 层次结构
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# 最后一个元素
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath 在 iOS 上有效，但比谓词字符串慢。

```
# 通过类型和标签
//XCUIElementTypeButton[@label='Login']

# 通过名称
//XCUIElementTypeTextField[@name='username']

# 通过值
//XCUIElementTypeSwitch[@value='1']

# 层次结构
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## 跨平台选择器策略

当编写需要在 iOS 和 Android 上都能工作的测试时，请按此优先顺序使用：

### 1. 无障碍 ID（最佳）

```
# 在两个平台上都有效
~loginButton
```

### 2. 平台特定与条件逻辑

当无障碍 ID 不可用时，使用平台特定的选择器：

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath（最后选择）

XPath 在两个平台上都有效，但元素类型不同：

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## 元素类型参考

### Android 元素类型

| 类型 | 描述 |
|------|-------------|
| `android.widget.Button` | 按钮 |
| `android.widget.EditText` | 文本输入 |
| `android.widget.TextView` | 文本标签 |
| `android.widget.ImageView` | 图像 |
| `android.widget.ImageButton` | 图像按钮 |
| `android.widget.CheckBox` | 复选框 |
| `android.widget.RadioButton` | 单选按钮 |
| `android.widget.Switch` | 开关 |
| `android.widget.Spinner` | 下拉菜单 |
| `android.widget.ListView` | 列表视图 |
| `android.widget.RecyclerView` | 回收视图 |
| `android.widget.ScrollView` | 滚动容器 |

### iOS 元素类型

| 类型 | 描述 |
|------|-------------|
| `XCUIElementTypeButton` | 按钮 |
| `XCUIElementTypeTextField` | 文本输入 |
| `XCUIElementTypeSecureTextField` | 密码输入 |
| `XCUIElementTypeStaticText` | 文本标签 |
| `XCUIElementTypeImage` | 图像 |
| `XCUIElementTypeSwitch` | 开关 |
| `XCUIElementTypeSlider` | 滑块 |
| `XCUIElementTypePicker` | 选择器 |
| `XCUIElementTypeTable` | 表格视图 |
| `XCUIElementTypeCell` | 表格单元格 |
| `XCUIElementTypeCollectionView` | 集合视图 |
| `XCUIElementTypeScrollView` | 滚动视图 |

---

## 最佳实践

### 应该

- **使用无障碍 ID** 获取稳定的跨平台选择器
- **添加 data-testid 属性** 到网页元素用于测试
- **当无障碍 ID 不可用时使用资源 ID**（Android）
- **在 iOS 上优先使用谓词字符串**而非 XPath
- **保持选择器简单**且具体

### 不应该

- **避免长 XPath 表达式** - 它们慢且脆弱
- **不要依赖索引**来定位动态列表
- **避免基于文本的选择器**用于本地化应用
- **不要使用绝对 XPath**（从根开始）

### 好与坏选择器示例

```
# 好 - 稳定的无障碍 ID
~loginButton

# 坏 - 带索引的脆弱 XPath
//div[3]/form/button[2]

# 好 - 具有测试 ID 的特定 CSS
[data-testid="submit-button"]

# 坏 - 可能会改变的类
.btn-primary-lg-v2

# 好 - 带资源 ID 的 UiAutomator
android=new UiSelector().resourceId("com.app:id/submit")

# 坏 - 可能会被本地化的文本
android=new UiSelector().text("Submit")
```

---

## 调试选择器

### Web（Chrome DevTools）

1. 打开 Chrome DevTools（F12）
2. 使用 Elements 面板检查元素
3. 右键点击元素 → 复制 → 复制选择器
4. 在控制台中测试选择器：`document.querySelector('your-selector')`

### 移动端（Appium Inspector）

1. 启动 Appium Inspector
2. 连接到正在运行的会话
3. 点击元素查看所有可用属性
4. 使用"搜索元素"功能测试选择器

### 使用 `get_visible_elements`

MCP 服务器的 `get_visible_elements` 工具为每个元素返回多种选择器策略：

```
向 Claude 询问："获取屏幕上所有可见元素"
```

这会返回带有预生成选择器的元素，您可以直接使用。

#### 高级选项

要更好地控制元素发现：

```
# 只获取图像和视觉元素
获取元素类型为 "visual" 的可见元素

# 获取带坐标的元素用于布局调试
启用 includeBounds 获取可见元素

# 获取接下来的 20 个元素（分页）
获取限制为 20 并偏移 20 的可见元素

# 包含布局容器用于调试
启用 includeContainers 获取可见元素
```

该工具返回分页响应：
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### 使用 `get_accessibility`（仅限浏览器）

对于浏览器自动化，`get_accessibility` 工具提供页面元素的语义信息：

```
# 获取所有命名的无障碍节点
获取无障碍树

# 只过滤按钮和链接
获取按钮和链接角色过滤的无障碍树

# 获取结果的下一页
获取限制为 50 并偏移 50 的无障碍树
```

当 `get_visible_elements` 没有返回预期元素时，这很有用，因为它查询浏览器的原生无障碍 API。