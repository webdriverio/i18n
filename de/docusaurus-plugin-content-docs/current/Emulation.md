---
id: emulation
title: Emulation
---

Mit WebdriverIO können Sie Web-APIs mit dem Befehl [`emulate`](/docs/api/browser/emulate) emulieren, um benutzerdefinierte Werte zurückzugeben, die Ihnen helfen, bestimmte Browser-Verhaltensweisen zu emulieren. Beachten Sie, dass Ihre Anwendung diese APIs explizit verwenden muss.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Diese Funktion erfordert WebDriver Bidi-Unterstützung für den Browser. Während neuere Versionen von Chrome, Edge und Firefox diese Unterstützung haben, unterstützt Safari sie __nicht__. Für Updates folgen Sie [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Wenn Sie einen Cloud-Anbieter zum Starten von Browsern verwenden, stellen Sie außerdem sicher, dass Ihr Anbieter auch WebDriver Bidi unterstützt.

Um WebDriver Bidi für Ihren Test zu aktivieren, stellen Sie sicher, dass `webSocketUrl: true` in Ihren Capabilities gesetzt ist.

:::

## Geolocation

Ändern Sie die Browser-Geolocation auf einen bestimmten Bereich, z.B.:

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

Dies patcht, wie [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) funktioniert und gibt den von Ihnen angegebenen Standort zurück.

## Color Scheme

Ändern Sie das Standard-Farbschema des Browsers über:

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

Dies patcht, wie sich [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) verhält, wenn Sie das Farbschema über `(prefers-color-scheme: dark)` abfragen.

## User Agent

Ändern Sie den User Agent des Browsers auf einen anderen String über:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Dies ändert den Wert von [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Beachten Sie, dass Browser-Anbieter den User Agent schrittweise veralten lassen.

## onLine Property

Ändern Sie den Online-Status des Browsers über:

```ts
await browser.emulate('onLine', false)
```

Dies schaltet __nicht__ den Netzwerkverkehr zwischen dem Browser und dem Internet ab und ändert nur den Rückgabewert von [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Wenn Sie daran interessiert sind, die Netzwerkfähigkeiten des Browsers zu modifizieren, schauen Sie sich den Befehl [`throttleNetwork`](/docs/api/browser/throttleNetwork) an.

## Clock

Sie können die Systemuhr des Browsers mit dem Befehl [`emulate`](/docs/emulation) ändern. Er überschreibt native globale Funktionen im Zusammenhang mit der Zeit und ermöglicht es, sie synchron über `clock.tick()` oder das erzeugte Clock-Objekt zu steuern. Dies umfasst die Steuerung von:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Die Uhr beginnt bei der Unix-Epoche (Zeitstempel 0). Das bedeutet, wenn Sie in Ihrer Anwendung ein neues Date-Objekt instanziieren, hat es die Zeit des 1. Januar 1970, wenn Sie keine anderen Optionen an den Befehl `emulate` übergeben.

##### Beispiel

Wenn Sie `browser.emulate('clock', { ... })` aufrufen, werden sofort die globalen Funktionen für die aktuelle Seite sowie alle folgenden Seiten überschrieben, z.B.:

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

Sie können die Systemzeit ändern, indem Sie [`setSystemTime`](/docs/api/clock/setSystemTime) oder [`tick`](/docs/api/clock/tick) aufrufen.

Das `FakeTimerInstallOpts`-Objekt kann die folgenden Eigenschaften haben:

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

## Device

Der Befehl `emulate` unterstützt auch die Emulation eines bestimmten mobilen oder Desktop-Geräts durch Ändern des Viewports, des Geräte-Skalierungsfaktors und des User Agents. Dies sollte keinesfalls für mobiles Testen verwendet werden, da sich Desktop-Browser-Engines von mobilen unterscheiden. Dies sollte nur verwendet werden, wenn Ihre Anwendung ein spezifisches Verhalten für kleinere Viewport-Größen bietet.

Um beispielsweise den User Agent und den Viewport auf ein iPhone 15 umzustellen, führen Sie einfach aus:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO pflegt eine feste Liste von [allen definierten Geräten](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).