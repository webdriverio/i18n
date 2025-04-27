---
id: mobile
title: 移动端命令
---

# WebdriverIO中自定义和增强的移动端命令介绍

测试移动应用和移动网页应用带来了独特的挑战，特别是在处理Android和iOS之间的平台特定差异时。虽然Appium提供了处理这些差异的灵活性，但它通常要求你深入研究复杂的、平台相关的文档（[Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md)，[iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)）和命令。这可能使编写测试脚本更加耗时、容易出错且难以维护。

为了简化这个过程，WebdriverIO引入了专门为移动网页和原生应用测试定制的**自定义和增强的移动端命令**。这些命令抽象了底层Appium API的复杂性，使你能够编写简洁、直观且与平台无关的测试脚本。通过专注于易用性，我们旨在减少开发Appium脚本时的额外负担，并使你能够轻松自动化移动应用。

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## 为什么需要自定义移动端命令？

### 1. **简化复杂API**
一些Appium命令，如手势或元素交互，涉及冗长而复杂的语法。例如，使用原生Appium API执行长按操作需要手动构建一个`action`链：

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

使用WebdriverIO的自定义命令，相同的操作可以用一行简洁的代码完成：

```ts
await $('~Contacts').longPress();
```

这大大减少了样板代码，使你的脚本更清晰，更容易理解。

### 2. **跨平台抽象**
移动应用通常需要特定平台的处理。例如，在原生应用中滚动在[Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture)和[iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll)之间有显著差异。WebdriverIO通过提供像`scrollIntoView()`这样的统一命令来弥合这一差距，这些命令无论底层实现如何，都能在各个平台上无缝工作。

```ts
await $('~element').scrollIntoView();
```

这种抽象确保你的测试是可移植的，不需要不断分支或条件逻辑来适应操作系统差异。

### 3. **提高生产力**
通过减少理解和实现低级Appium命令的需求，WebdriverIO的移动端命令使你能够专注于测试应用的功能，而不是纠结于平台特定的细微差别。这对于在移动自动化方面经验有限的团队或那些寻求加速开发周期的团队特别有益。

### 4. **一致性和可维护性**
自定义命令为你的测试脚本带来一致性。你的团队可以依赖标准化、可重用的命令，而不是为类似的操作使用不同的实现。这不仅使代码库更易维护，还降低了新团队成员的入职障碍。

## 为什么要增强某些移动端命令？

### 1. 增加灵活性
某些移动端命令得到增强，提供了默认Appium API中不可用的额外选项和参数。例如，WebdriverIO添加了重试逻辑、超时和按特定条件过滤webview的能力，使复杂场景的控制更加灵活。

```ts
// 示例：自定义webview检测的重试间隔和超时
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // 每1秒重试一次
  androidWebviewConnectTimeout: 10000,    // 10秒后超时
});
```

这些选项帮助适应动态应用行为，无需额外的样板代码。

### 2. 改善可用性
增强的命令抽象了原生API中的复杂性和重复模式。它们允许你用更少的代码行执行更多的操作，降低新用户的学习曲线，使脚本更易于阅读和维护。

```ts
// 示例：通过标题切换上下文的增强命令
await driver.switchContext({
  title: 'My Webview Title',
});
```

与默认的Appium方法相比，增强的命令消除了手动检索可用上下文并过滤它们等额外步骤的需要。

### 3. 标准化行为
WebdriverIO确保增强的命令在Android和iOS等平台上行为一致。这种跨平台抽象最小化了基于操作系统的条件分支逻辑需求，从而产生更可维护的测试脚本。

```ts
// 示例：两个平台统一的滚动命令
await $('~element').scrollIntoView();
```

这种标准化简化了代码库，特别是对于在多个平台上自动化测试的团队。

### 4. 提高可靠性
通过纳入重试机制、智能默认值和详细的错误消息，增强的命令降低了测试不稳定的可能性。这些改进确保你的测试对webview初始化延迟或瞬态应用状态等问题具有弹性。

```ts
// 示例：具有强大匹配逻辑的增强webview切换
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

这使测试执行更可预测，不易受环境因素导致的失败影响。

### 5. 增强调试能力
增强的命令通常返回更丰富的元数据，使复杂场景的调试更容易，特别是在混合应用中。例如，getContext和getContexts等命令可以返回有关webview的详细信息，包括标题、URL和可见性状态。

```ts
// 示例：检索详细元数据用于调试
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

这些元数据有助于更快地识别和解决问题，改善整体调试体验。


通过增强移动端命令，WebdriverIO不仅使自动化更容易，还符合其提供强大、可靠且直观使用的工具的使命。

---

## 混合应用

混合应用结合了网页内容和原生功能，在自动化过程中需要专门处理。这些应用使用webview在原生应用内渲染网页内容。WebdriverIO提供了增强的方法，用于有效处理混合应用。

### 理解Webview
Webview是嵌入原生应用中的类浏览器组件：

- **Android:** Webview基于Chrome/System Webview，可能包含多个页面（类似于浏览器标签）。这些webview需要ChromeDriver来自动化交互。Appium可以根据设备上安装的System WebView或Chrome版本自动确定所需的ChromeDriver版本，并在尚未可用时自动下载。这种方法确保了无缝兼容性并最小化了手动设置。参考[Appium UIAutomator2-documentation](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver)了解Appium如何自动下载正确的ChromeDriver版本。
- **iOS:** Webview由Safari（WebKit）提供支持，并由像`WEBVIEW_{id}`这样的通用ID标识。

### 混合应用的挑战
1. 在多个选项中识别正确的webview。
2. 检索额外的元数据，如标题、URL或包名，以获得更好的上下文。
3. 处理Android和iOS之间的平台特定差异。
4. 在混合应用中可靠地切换到正确的上下文。

### 混合应用的关键命令

#### 1. `getContext`
检索会话的当前上下文。默认情况下，它的行为类似于Appium的getContext方法，但在启用`returnDetailedContext`时可以提供详细的上下文信息。更多信息请参阅[`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
返回可用上下文的详细列表，改进了Appium的contexts方法。这使得更容易识别正确的webview进行交互，而无需调用额外的命令来确定标题、url或活动的`bundleId|packageName`。更多信息请参阅[`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
基于名称、标题或url切换到特定的webview。提供额外的灵活性，如使用正则表达式进行匹配。更多信息请参阅[`switchContext`](/docs/api/mobile/switchContext)

### 混合应用的关键特性
1. 详细元数据：检索全面的详细信息用于调试和可靠的上下文切换。
2. 跨平台一致性：统一的Android和iOS行为，无缝处理平台特定的特性。
3. 自定义重试逻辑（Android）：调整webview检测的重试间隔和超时。


:::info 注意事项和限制
- Android提供额外的元数据，如`packageName`和`webviewPageId`，而iOS则专注于`bundleId`。
- 重试逻辑可针对Android进行自定义，但不适用于iOS。
- 有几种情况下iOS无法找到Webview。Appium为`appium-xcuitest-driver`提供了不同的额外功能，以找到Webview。如果你认为Webview没有被找到，可以尝试设置以下功能之一：
    - `appium:includeSafariInWebviews`：在原生/webview应用测试期间将Safari网页上下文添加到可用上下文列表中。如果测试打开Safari并需要能够与之交互，这很有用。默认为`false`。
    - `appium:webviewConnectRetries`：在放弃web视图页面检测之前的最大重试次数。每次重试之间的延迟为500毫秒，默认为`10`次重试。
    - `appium:webviewConnectTimeout`：等待web视图页面被检测到的最大时间（毫秒）。默认为`5000`毫秒。

有关高级示例和详细信息，请参阅WebdriverIO移动API文档。
:::


---

我们不断增长的命令集反映了我们致力于使移动自动化变得易于访问和优雅的承诺。无论你是在执行复杂的手势还是与原生应用元素交互，这些命令都符合WebdriverIO创建无缝自动化体验的理念。而我们不会就此停步——如果你希望看到某个功能，我们欢迎你的反馈。请随时通过[此链接](https://github.com/webdriverio/webdriverio/issues/new/choose)提交你的请求。