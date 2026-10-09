---
id: emulation
title: Эмуляция
description: "Эмулируйте геолокацию, медиа-функции, user agent, сеть, локаль, часовой пояс, экран и устройства с помощью команды emulate."
---

С помощью WebdriverIO вы можете эмулировать поведение браузера, используя команду [`emulate`](/docs/api/browser/emulate). Команда управляет [модулем эмуляции WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-emulation) для текущего контекста просмотра верхнего уровня. Переопределение применяется немедленно. Перезагружать страницу не нужно. Исключением является `clock`: в BiDi нет команды для часов, поэтому эта область по-прежнему устанавливает поддельные таймеры.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Эта функция требует поддержки WebDriver Bidi в браузере. Хотя последние версии Chrome, Edge и Firefox имеют такую поддержку, Safari её __не имеет__. Следите за обновлениями на [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). Кроме того, если вы используете облачного провайдера для запуска браузеров, убедитесь, что ваш провайдер также поддерживает WebDriver Bidi.

Чтобы включить WebDriver Bidi для вашего теста, убедитесь, что в ваших capabilities установлено `webSocketUrl: true`.

Браузер, который не реализует команду, отклоняет вызов со своей собственной ошибкой: `unknown command` или `unsupported operation`. WebdriverIO возвращает эту ошибку. Он не переключается на preload-скрипт или на CDP.

:::

`emulate` возвращает функцию, которая очищает соответствующую область. [`browser.restore()`](/docs/api/browser/restore) очищает все активные области или те области, которые вы перечислите.

## Геолокация

Измените геолокацию браузера на определённую область, например:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.setPermissions({ name: 'geolocation' }, 'granted')
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // выводит: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Здесь используется стек геолокации браузера, включая `getCurrentPosition` и `watchPosition`. Странице всё ещё может потребоваться предоставленное разрешение на геолокацию, как в примере. Необязательные поля: `accuracy`, `altitude`, `altitudeAccuracy`, `heading` и `speed`.

Чтобы страница не смогла прочитать местоположение:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## Цветовая схема и другие медиа-функции

Измените медиа-функцию `prefers-color-scheme`:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // выводит: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // выводит: "#000000"
```

Это обновляет CSS `@media (prefers-color-scheme)`, а также [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). Перезагрузка не требуется.

`media` задаёт остальную часть карты медиа-функций, например уменьшенное движение:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` и `media` используют одну общую карту. Команда BiDi заменяет всю карту целиком, поэтому побеждает более поздний вызов. Восстановление любой из этих областей очищает карту.

`forcedColors` — это отдельная команда. Она задаёт тему принудительных цветов (`'light'` или `'dark'`), а не медиа-функцию `forced-colors`. Эта медиа-функция остаётся в `media` как `forcedColors: 'none' | 'active'`.

## User Agent

Измените user agent браузера с помощью:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Это переопределение user agent на уровне браузера. Это не изменённое свойство `navigator.userAgent`. Производители браузеров постепенно отказываются от User Agent.

## Состояние подключения

Переведите контекст просмотра в офлайн-режим:

```ts
await browser.emulate('onLine', false)
```

`false` отправляет `emulation.setNetworkConditions` с `{ type: 'offline' }`. Fetch, WebSocket и WebTransport перестают работать, и [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) изменяется соответственно. `true`, а также восстановление области, очищает это условие. Пропускная способность и задержка остаются в [`throttleNetwork`](/docs/api/browser/throttleNetwork). Сетевые условия BiDi поддерживают только офлайн-режим.

## Локаль, часовой пояс и сенсорный ввод

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` — это тег BCP 47. `timezone` — это имя IANA или смещение, например `+02:00`. `touch` — это `maxTouchPoints`, и значение должно быть целым числом `>= 1`. Восстановление `touch` очищает переопределение. Установить `0` нельзя.

## Экран, ориентация и макет

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` — это область экрана, доступная веб-странице, а не viewport. `orientation.natural` принимает значения `'portrait'` или `'landscape'`. `orientation.type` принимает значения `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` или `'landscape-secondary'`.

`viewportMeta` принимает только `true`. В спецификации значение — `true | null`, поэтому `false` не существует. Восстановление очищает его. `textLayout` принимает только `'mobile'`. `scripting` можно только отключить. Спецификация не позволяет принудительно включить выполнение скриптов. `scrollbar` принимает значения `'classic'` или `'overlay'`.

## Часы

Вы можете изменять системные часы браузера с помощью команды [`emulate`](/docs/emulation). Она переопределяет нативные глобальные функции, связанные со временем, позволяя управлять ими синхронно через `clock.tick()` или возвращаемый объект часов. Это включает управление:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Часы начинают отсчёт с эпохи unix (временная метка 0). Это означает, что при создании нового Date в вашем приложении он будет иметь время 1 января 1970 года, если вы не передадите другие параметры в команду `emulate`.

##### Пример

При вызове `browser.emulate('clock', { ... })` глобальные функции будут немедленно перезаписаны для текущей страницы, а также для всех последующих страниц, например:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// возвращает "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// возвращает "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// возвращает "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// возвращает "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Вы можете изменить системное время, вызвав [`setSystemTime`](/docs/api/clock/setSystemTime) или [`tick`](/docs/api/clock/tick).

Объект `FakeTimerInstallOpts` может иметь следующие свойства:

 ```ts
interface FakeTimerInstallOpts {
    // Устанавливает поддельные таймеры с указанной эпохой unix
    // @default: 0
    now?: number | Date | undefined;

    // Массив с именами глобальных методов и API для подделки. По умолчанию WebdriverIO
    // не заменяет `nextTick()` и `queueMicrotask()`. Например,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` подделает только
    // `setTimeout()` и `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // Максимальное количество таймеров, которые будут запущены при вызове runAll() (по умолчанию: 1000)
    loopLimit?: number | undefined;

    // Указывает WebdriverIO автоматически увеличивать поддельное время на основе
    // реального изменения системного времени (например, поддельное время будет увеличено на 20 мс
    // за каждые 20 мс изменения реального системного времени)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Актуально только при использовании с shouldAdvanceTime: true. Увеличивает поддельное время на
    // advanceTimeDelta мс при каждом изменении реального системного времени на advanceTimeDelta мс
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Указывает FakeTimers очищать «нативные» (т.е. не поддельные) таймеры, делегируя это
    // их соответствующим обработчикам. По умолчанию они не очищаются, что может привести к
    // неожиданному поведению, если таймеры существовали до установки FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Устройство

Команда `emulate` также поддерживает эмуляцию определённого мобильного или настольного устройства. Ни в коем случае не следует использовать это для мобильного тестирования, поскольку движки настольных браузеров отличаются от мобильных. Это следует использовать только в том случае, если ваше приложение имеет определённое поведение для меньших размеров viewport.

Для устройства WebdriverIO:

- устанавливает user agent из дескриптора
- устанавливает viewport и коэффициент масштабирования устройства
- устанавливает `maxTouchPoints` в `1`, если дескриптор поддерживает сенсорный ввод, и очищает сенсорный ввод в противном случае
- устанавливает мобильный макет текста и мета-тег viewport, если дескриптор мобильный, и очищает их в противном случае

Он не придумывает размер экрана или ориентацию на основе названия устройства. Viewport — это не `screen.width`. Для этого используйте области `screen` и `orientation`.

Изменение viewport отправляется в контекст верхнего уровня, который был текущим в момент вызова `emulate`. Восстановление устройства изменяет размер этого контекста, в том числе после переключения на другое окно.

Если браузер отклоняет одну из этих команд, предыдущие user agent, viewport, сенсорный ввод, макет текста и мета-тег viewport восстанавливаются, и возвращается ошибка. Пользовательский user agent или размер, заданный через `setViewport`, не заменяется значением по умолчанию.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// тестируйте ваше приложение ...

// сброс user agent, viewport, сенсорного ввода, макета текста и мета-тега viewport
await restore()
```

WebdriverIO поддерживает фиксированный список [всех определённых устройств](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).