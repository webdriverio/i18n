---
id: emulation
title: Емуляція
---

За допомогою WebdriverIO ви можете емулювати Web API, використовуючи команду [`emulate`](/docs/api/browser/emulate), щоб повертати власні значення, які допомагають емулювати певну поведінку браузера. Зауважте, що це вимагає від вашого додатку явного використання цих API.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Ця функція вимагає підтримки WebDriver Bidi для браузера. У той час як нові версії Chrome, Edge та Firefox мають таку підтримку, Safari __не має__. Для оновлень стежте за [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Крім того, якщо ви використовуєте хмарного провайдера для запуску браузерів, переконайтеся, що ваш провайдер також підтримує WebDriver Bidi.

Щоб увімкнути WebDriver Bidi для вашого тесту, переконайтеся, що ви встановили `webSocketUrl: true` у своїх capabilities.

:::

## Геолокація

Змінюйте геолокацію браузера на конкретну область, наприклад:

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

Це модифікує, як працює [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) і повертає місцезнаходження, яке ви надали.

## Кольорова схема

Змінюйте налаштування кольорової схеми браузера за замовчуванням через:

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

Це модифікує поведінку [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), коли ви запитуєте кольорову схему через `(prefers-color-scheme: dark)`.

## User Agent

Змінюйте user agent браузера на інший рядок через:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Це змінить значення [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Зауважте, що розробники браузерів поступово відмовляються від User Agent.

## Властивість onLine

Змініть статус онлайн-підключення браузера через:

```ts
await browser.emulate('onLine', false)
```

Це __не__ вимкне мережевий трафік між браузером та інтернетом, а лише змінить значення, що повертається [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Якщо вас цікавить модифікація мережевих можливостей браузера, зверніть увагу на команду [`throttleNetwork`](/docs/api/browser/throttleNetwork).

## Годинник

Ви можете змінити системний годинник браузера за допомогою команди [`emulate`](/docs/emulation). Вона перевизначає нативні глобальні функції, пов'язані з часом, дозволяючи керувати ними синхронно через `clock.tick()` або отриманий об'єкт годинника. Це включає контроль над:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Годинник починається з епохи unix (часова мітка 0). Це означає, що коли ви створюєте новий об'єкт Date у вашому додатку, він матиме час 1 січня 1970 року, якщо ви не передаєте інші параметри в команду `emulate`.

##### Приклад

Коли викликається `browser.emulate('clock', { ... })`, він негайно перезаписує глобальні функції для поточної сторінки, а також усіх наступних сторінок, наприклад:

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

Ви можете змінити системний час, викликавши [`setSystemTime`](/docs/api/clock/setSystemTime) або [`tick`](/docs/api/clock/tick).

Об'єкт `FakeTimerInstallOpts` може мати такі властивості:

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

## Пристрій

Команда `emulate` також підтримує емуляцію певного мобільного чи настільного пристрою шляхом зміни області перегляду, масштабного коефіцієнта пристрою та user agent. Це, у жодному разі, не слід використовувати для мобільного тестування, оскільки рушії десктопних браузерів відрізняються від мобільних. Це слід використовувати лише якщо ваш додаток пропонує специфічну поведінку для менших розмірів області перегляду.

Наприклад, щоб перемкнути user agent та область перегляду на iPhone 15, просто виконайте:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO підтримує фіксований список [всіх визначених пристроїв](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).