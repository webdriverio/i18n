---
id: emulation
title: 模拟
---

使用WebdriverIO，你可以通过[`emulate`](/docs/api/browser/emulate)命令模拟Web API，返回自定义值来帮助你模拟特定的浏览器行为。注意，这要求你的应用程序明确使用这些API。

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

此功能需要浏览器支持WebDriver Bidi。虽然最新版本的Chrome、Edge和Firefox都支持此功能，但Safari**不支持**。有关更新，请关注[wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned)。此外，如果你使用云供应商启动浏览器，请确保你的供应商也支持WebDriver Bidi。

要为测试启用WebDriver Bidi，请确保在你的capabilities中设置`webSocketUrl: true`。

:::

## 地理位置

将浏览器的地理位置更改为特定区域，例如：

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // 输出: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

这将修改[`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)的工作方式，并返回你提供的位置。

## 颜色方案

通过以下方式更改浏览器的默认颜色方案设置：

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // 输出: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // 输出: "#000000"
```

这将修改当你通过`(prefers-color-scheme: dark)`查询颜色方案时[`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)的行为。

## 用户代理

通过以下方式将浏览器的用户代理更改为不同的字符串：

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

这将更改[`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)的值。请注意，浏览器供应商正在逐步弃用User Agent。

## onLine属性

通过以下方式更改浏览器的在线状态：

```ts
await browser.emulate('onLine', false)
```

这**不会**关闭浏览器与互联网之间的网络流量，只会改变[`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)的返回值。如果你对修改浏览器的网络功能感兴趣，请查看[`throttleNetwork`](/docs/api/browser/throttleNetwork)命令。

## 时钟

你可以使用[`emulate`](/docs/emulation)命令修改浏览器系统时钟。它会覆盖与时间相关的原生全局函数，使它们可以通过`clock.tick()`或生成的时钟对象同步控制。这包括控制：

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

时钟从unix纪元（时间戳为0）开始。这意味着，如果你在应用程序中实例化新的Date，如果你没有向`emulate`命令传递任何其他选项，它的时间将是1970年1月1日。

##### 示例

当调用`browser.emulate('clock', { ... })`时，它会立即覆盖当前页面及所有后续页面的全局函数，例如：

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// 返回 "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// 返回 "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// 返回 "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// 返回 "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

你可以通过调用[`setSystemTime`](/docs/api/clock/setSystemTime)或[`tick`](/docs/api/clock/tick)修改系统时间。

`FakeTimerInstallOpts`对象可以具有以下属性：

```ts
interface FakeTimerInstallOpts {
    // 使用指定的unix纪元安装假计时器
    // @default: 0
    now?: number | Date | undefined;

    // 要伪造的全局方法和API名称数组。默认情况下，WebdriverIO
    // 不会替换`nextTick()`和`queueMicrotask()`。例如，
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })`将只伪造
    // `setTimeout()`和`nextTick()`
    toFake?: FakeMethod[] | undefined;

    // 调用runAll()时将运行的计时器的最大数量（默认值：1000）
    loopLimit?: number | undefined;

    // 告诉WebdriverIO根据实际系统时间变化自动递增模拟时间
    // （例如，对于每20ms的实际系统时间变化，模拟时间将增加20ms）
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // 仅在使用shouldAdvanceTime: true时相关。每advanceTimeDelta ms的实际系统时间变化，
    // 模拟时间增加advanceTimeDelta ms
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // 告诉FakeTimers通过委托给各自的处理程序来清除'原生'（即非假的）计时器。默认情况下不会清除这些计时器，
    // 如果在安装FakeTimers之前存在计时器，可能会导致意外行为。
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## 设备

`emulate`命令还支持通过更改视口、设备缩放因子和用户代理来模拟特定的移动或桌面设备。这绝不应该用于移动测试，因为桌面浏览器引擎与移动浏览器引擎不同。这只应在应用程序为较小的视口大小提供特定行为时使用。

例如，要将用户代理和视口切换到iPhone 15，只需运行：

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// 测试你的应用程序...

// 重置为原始视口和用户代理
await restore()
```

WebdriverIO维护一个[所有已定义设备](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts)的固定列表。