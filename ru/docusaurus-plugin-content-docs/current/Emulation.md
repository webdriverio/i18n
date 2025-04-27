---
id: emulation
title: Эмуляция
---

С помощью WebdriverIO вы можете эмулировать Web API, используя команду [`emulate`](/docs/api/browser/emulate) для возврата пользовательских значений, которые помогают эмулировать определенное поведение браузера. Обратите внимание, что это требует, чтобы ваше приложение явно использовало эти API.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Эта функция требует поддержки WebDriver Bidi для браузера. Хотя последние версии Chrome, Edge и Firefox имеют такую поддержку, Safari __не имеет__. Для обновлений следите за [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Кроме того, если вы используете облачного провайдера для запуска браузеров, убедитесь, что ваш провайдер также поддерживает WebDriver Bidi.

Чтобы включить WebDriver Bidi для вашего теста, убедитесь, что в ваших capabilities установлено `webSocketUrl: true`.

:::

## Геолокация

Измените геолокацию браузера на определенную область, например:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Это модифицирует работу [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) и возвращает местоположение, указанное вами.

## Цветовая схема

Измените настройку цветовой схемы браузера по умолчанию с помощью:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

Это модифицирует поведение [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) при запросе цветовой схемы через `(prefers-color-scheme: dark)`.

## User Agent

Измените user agent браузера на другую строку с помощью:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Это изменит значение [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Обратите внимание, что производители браузеров постепенно отказываются от User Agent.

## Свойство onLine

Измените онлайн-статус браузера с помощью:

```ts
await browser.emulate('onLine', false)
```

Это __не__ отключает сетевой трафик между браузером и интернетом, а только изменяет возвращаемое значение [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Если вы заинтересованы в изменении сетевых возможностей браузера, обратите внимание на команду [`throttleNetwork`](/docs/api/browser/throttleNetwork).

## Часы

Вы можете изменить системные часы браузера с помощью команды [`emulate`](/docs/emulation). Она переопределяет нативные глобальные функции, связанные со временем, позволяя управлять ими синхронно через `clock.tick()` или полученный объект clock. Это включает управление:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Часы начинаются с начала эпохи Unix (временная метка 0). Это означает, что когда вы создаете новый объект Date в своем приложении, он будет иметь время 1 января 1970 года, если вы не передадите другие параметры в команду `emulate`.

##### Пример

При вызове `browser.emulate('clock', { ... })` немедленно перезаписываются глобальные функции для текущей страницы, а также для всех последующих страниц, например:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Вы можете изменить системное время, вызвав [`setSystemTime`](/docs/api/clock/setSystemTime) или [`tick`](/docs/api/clock/tick).

Объект `FakeTimerInstallOpts` может иметь следующие свойства:

```ts
interface FakeTimerInstallOpts {
    // Installs fake timers with the specified unix epoch
    // @default: 0
    now?: number | Date | undefined;

    // An array with names of global methods and APIs to fake. By default, WebdriverIO
    // does not replace `nextTick()` and `queueMicrotask()`. For instance,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` will fake only
    // `setTimeout()` and `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // The maximum number of timers that will be run when calling runAll() (default: 1000)
    loopLimit?: number | undefined;

    // Tells WebdriverIO to increment mocked time automatically based on the real system
    // time shift (e.g. the mocked time will be incremented by 20ms for every 20ms change
    // in the real system time)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevant only when using with shouldAdvanceTime: true. increment mocked time by
    // advanceTimeDelta ms every advanceTimeDelta ms change in the real system time
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Tells FakeTimers to clear 'native' (i.e. not fake) timers by delegating to their
    // respective handlers. These are not cleared by default, leading to potentially
    // unexpected behavior if timers existed prior to installing FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Устройство

Команда `emulate` также поддерживает эмуляцию определенного мобильного или настольного устройства путем изменения области просмотра, коэффициента масштабирования устройства и user agent. Это ни в коем случае не должно использоваться для мобильного тестирования, поскольку движки настольных браузеров отличаются от мобильных. Это следует использовать только в том случае, если ваше приложение предлагает специфическое поведение для областей просмотра меньшего размера.

Например, чтобы переключить user agent и область просмотра на iPhone 15, просто выполните:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO поддерживает фиксированный список [всех определенных устройств](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).