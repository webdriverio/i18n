---
id: action
title: action 动作
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

action 命令是一个为网络浏览器提供虚拟设备输入动作的低级接口。

除了像 `scrollIntoView`、`doubleClick` 这样的高级命令外，Action API 还提供了对指定输入设备可以执行的操作的精确控制。WebdriverIO 为三种输入源提供了接口：

- 用于键盘设备的按键输入
- 用于鼠标、笔或触摸设备的指针输入
- 用于滚轮设备的滚轮输入

每个动作命令链都必须通过调用 `perform` 来完成，以触发一组动作。这会导致动作[被释放](https://w3c.github.io/webdriver/#release-actions)并触发事件。你可以通过传入 `true`（例如 `browser.actions(...).perform(true)`）来跳过这一步。

:::info

对此命令和特定动作的支持可能因环境而异。开发进度可以在 [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned) 上关注。
对于移动设备，你可能需要使用 Appium 特定的手势命令，适用于 [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch) 和 [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands)。

:::

### 按键输入源

按键输入源是与键盘类型设备相关联的输入源。它可以通过使用 `key` 类型参数触发。例如：

```ts
browser.action('key')
```

它返回一个支持以下操作的 `KeyAction` 对象：

- `down(value: string)`：生成按键按下动作
- `up(value: string)`：生成按键释放动作
- `pause(ms: number)`：表示输入源在特定时刻不执行任何操作

#### 特殊字符

如果你想使用特殊字符，例如 `Control`、`Page Up` 或 `Shift`，请确保从 `webdriverio` 包中导入 [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417) 对象，如下所示：

```ts
import { Key } from 'webdriverio'
```

该对象允许你访问所需特殊字符的 Unicode 表示。

### 指针输入源

指针输入源是与指针类型输入设备相关联的输入源。可以在调用 `action` 命令时指定类型，例如：

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" 是默认值，也可能是："pen" 或 "touch"
})
```

它返回一个支持以下操作的 `PointerAction` 对象：

- `down (button: 'left' | 'middle' | 'right')`：创建一个按下单个键的动作
- `down (params: PointerActionParams)`：创建一个带有详细参数的按下单个键的动作
- `move (x: number, y: number)`：创建一个从视口移动指针 `x` 和 `y` 像素的动作
- `move (params: PointerActionMoveParams)`：创建一个从指定 `origin` 移动指针 `x` 和 `y` 像素的动作。`origin` 可以定义为指针当前位置（例如 "pointer"）、视口（例如 "viewport"）或特定元素的中心。
- `up (button: 'left' | 'middle' | 'right')`：创建一个释放单个键的动作
- `up (params: PointerActionUpParams)`：创建一个带有详细参数的释放单个键的动作
- `cancel()`：取消此指针当前输入的动作。
- `pause(ms: number)`：表示输入源在特定时刻不执行任何操作

你可以在项目类型定义中找到关于 [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35)、[`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) 和 [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19) 参数类型的详细信息。

### 滚轮输入源

滚轮输入源是与滚轮类型输入设备相关联的输入源。

```ts
browser.action('wheel')
```

它返回一个支持以下操作的 `WheelAction` 对象：

- `scroll (params: ScrollParams)`：将页面滚动到给定的坐标或起点
- `pause(ms: number)`：表示输入源在特定时刻不执行任何操作

你可以在项目类型定义中找到关于 [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) 参数类型的详细信息。

##### 用法

```js
browser.action()
```

##### 示例

```js title="pointer-action.js"
it('drag and drop using pointer action command', async () => {
    const origin = await $('#source')
    const targetOrigin = await $('#target')

    return browser.action('pointer')
        .move({ duration: 0, origin, x: 0, y: 0 })
        .down({ button: 0 }) // left button
        .pause(10)
        .move({ duration: 0, origin: targetOrigin })
        .up({ button: 0 })
        .perform()
});
```

```js title="key-action.js"
import { Key } from 'webdriverio'

it('should emit key events using key action commands', async () => {
    const elem = await $('input')
    await elem.click() // make element active

    await browser.action('key')
        .down('f')
        .down('o')
        .down('o')
        .up('f')
        .up('o')
        .up('o')
        .perform()

    console.log(await elem.getValue()) // returns "foo"

    // copy value out of input element
    await browser.action('key')
        .down(Key.Ctrl).down('c')
        .pause(10)
        .up(Key.Ctrl).up('c')
        .perform()
})
```

```js title="wheel-action.js"
it('should scroll using wheel action commands', async () => {
    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform()
    console.log(await browser.execute(() => window.scrollY)) // returns 500
})
```