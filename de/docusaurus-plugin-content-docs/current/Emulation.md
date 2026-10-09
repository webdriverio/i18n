---
id: emulation
title: Emulation
description: "Emulieren Sie Geolokalisierung, Medienmerkmale, User Agent, Netzwerk, Gebietsschema, Zeitzone, Bildschirm und Geräte mit dem emulate-Befehl."
---

Mit WebdriverIO können Sie Browserverhalten mithilfe des [`emulate`](/docs/api/browser/emulate)-Befehls emulieren. Der Befehl steuert das [WebDriver BiDi Emulationsmodul](https://w3c.github.io/webdriver-bidi/#module-emulation) für den aktuellen Top-Level-Browsing-Kontext. Die Überschreibung wird sofort wirksam. Sie müssen die Seite nicht neu laden. `clock` ist die Ausnahme: BiDi hat keinen Clock-Befehl, daher installiert dieser Bereich weiterhin Fake-Timer.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Diese Funktion erfordert WebDriver-Bidi-Unterstützung durch den Browser. Während aktuelle Versionen von Chrome, Edge und Firefox diese Unterstützung bieten, ist dies bei Safari __nicht__ der Fall. Für Updates verfolgen Sie [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). Wenn Sie außerdem einen Cloud-Anbieter zum Starten von Browsern verwenden, stellen Sie sicher, dass Ihr Anbieter ebenfalls WebDriver Bidi unterstützt.

Um WebDriver Bidi für Ihren Test zu aktivieren, stellen Sie sicher, dass `webSocketUrl: true` in Ihren Capabilities gesetzt ist.

Ein Browser, der einen Befehl nicht implementiert, lehnt den Aufruf mit seinem eigenen Fehler ab, `unknown command` oder `unsupported operation`. WebdriverIO gibt diesen Fehler zurück. Es wird nicht auf ein Preload-Skript oder auf CDP zurückgegriffen.

:::

`emulate` gibt eine Funktion zurück, die diesen Bereich zurücksetzt. [`browser.restore()`](/docs/api/browser/restore) setzt alle aktiven Bereiche oder die von Ihnen aufgelisteten Bereiche zurück.

## Geolokalisierung

Ändern Sie die Geolokalisierung des Browsers auf einen bestimmten Bereich, z. B.:

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
console.log(await browser.getUrl()) // gibt aus: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Dies verwendet den Geolokalisierungs-Stack des Browsers, einschließlich `getCurrentPosition` und `watchPosition`. Eine Seite kann trotzdem erfordern, dass die Geolokalisierungsberechtigung erteilt wird, wie im Beispiel. Optionale Felder sind `accuracy`, `altitude`, `altitudeAccuracy`, `heading` und `speed`.

Damit die Seite keine Position lesen kann:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## Farbschema und andere Medienmerkmale

Ändern Sie das Medienmerkmal `prefers-color-scheme`:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // gibt aus: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // gibt aus: "#000000"
```

Dies aktualisiert CSS `@media (prefers-color-scheme)` sowie [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). Es ist kein Neuladen erforderlich.

`media` setzt den Rest der Medienmerkmal-Map, zum Beispiel reduzierte Bewegung:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` und `media` teilen sich eine Map. Der BiDi-Befehl ersetzt die gesamte Map, daher gewinnt der spätere Aufruf. Das Zurücksetzen eines der beiden Bereiche leert die Map.

`forcedColors` ist ein anderer Befehl. Er setzt das Forced-Colors-Theme (`'light'` oder `'dark'`), nicht das Medienmerkmal `forced-colors`. Dieses Medienmerkmal bleibt bei `media` als `forcedColors: 'none' | 'active'`.

## User Agent

Ändern Sie den User Agent des Browsers über:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Dies ist die User-Agent-Überschreibung des Browsers. Es handelt sich nicht um eine gepatchte `navigator.userAgent`-Eigenschaft. Browserhersteller stellen den User Agent zunehmend als veraltet ein.

## Online-Status

Schalten Sie den Browsing-Kontext offline:

```ts
await browser.emulate('onLine', false)
```

`false` sendet `emulation.setNetworkConditions` mit `{ type: 'offline' }`. Fetch, WebSocket und WebTransport schlagen fehl, und [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) folgt entsprechend. `true` sowie das Zurücksetzen des Bereichs heben die Bedingung auf. Durchsatz und Latenz bleiben bei [`throttleNetwork`](/docs/api/browser/throttleNetwork). BiDi-Netzwerkbedingungen unterstützen nur offline.

## Gebietsschema, Zeitzone und Touch

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` ist ein BCP-47-Tag. `timezone` ist ein IANA-Name oder ein Offset wie `+02:00`. `touch` ist `maxTouchPoints` und muss eine Ganzzahl `>= 1` sein. Das Zurücksetzen von `touch` hebt die Überschreibung auf. Es kann nicht `0` gesetzt werden.

## Bildschirm, Ausrichtung und Layout

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` ist der für das Web sichtbare Bildschirmbereich, nicht der Viewport. `orientation.natural` ist `'portrait'` oder `'landscape'`. `orientation.type` ist `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` oder `'landscape-secondary'`.

`viewportMeta` akzeptiert nur `true`. Der Spezifikationswert ist `true | null`, daher gibt es kein `false`. Restore hebt es auf. `textLayout` akzeptiert nur `'mobile'`. `scripting` kann nur deaktiviert werden. Die Spezifikation kann Scripting nicht erzwingen. `scrollbar` ist `'classic'` oder `'overlay'`.

## Uhr

Sie können die Systemuhr des Browsers mit dem [`emulate`](/docs/emulation)-Befehl ändern. Er überschreibt native globale zeitbezogene Funktionen, sodass diese synchron über `clock.tick()` oder das zurückgegebene Clock-Objekt gesteuert werden können. Dies umfasst die Steuerung von:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Die Uhr beginnt bei der Unix-Epoche (Zeitstempel 0). Das bedeutet, dass ein neues Date-Objekt in Ihrer Anwendung die Zeit 1. Januar 1970 hat, wenn Sie dem `emulate`-Befehl keine anderen Optionen übergeben.

##### Beispiel

Beim Aufruf von `browser.emulate('clock', { ... })` werden die globalen Funktionen sofort für die aktuelle Seite sowie alle folgenden Seiten überschrieben, z. B.:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// gibt zurück: "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// gibt zurück: "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// gibt zurück: "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// gibt zurück: "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Sie können die Systemzeit durch Aufruf von [`setSystemTime`](/docs/api/clock/setSystemTime) oder [`tick`](/docs/api/clock/tick) ändern.

Das `FakeTimerInstallOpts`-Objekt kann folgende Eigenschaften haben:

 ```ts
interface FakeTimerInstallOpts {
    // Installiert Fake-Timer mit der angegebenen Unix-Epoche
    // @default: 0
    now?: number | Date | undefined;

    // Ein Array mit Namen globaler Methoden und APIs, die gefälscht werden sollen. Standardmäßig
    // ersetzt WebdriverIO `nextTick()` und `queueMicrotask()` nicht. Zum Beispiel fälscht
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` nur
    // `setTimeout()` und `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // Die maximale Anzahl an Timern, die beim Aufruf von runAll() ausgeführt werden (Standard: 1000)
    loopLimit?: number | undefined;

    // Weist WebdriverIO an, die gemockte Zeit automatisch basierend auf der Verschiebung der
    // echten Systemzeit zu erhöhen (z. B. wird die gemockte Zeit für jede 20ms-Änderung
    // der echten Systemzeit um 20ms erhöht)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Nur relevant bei Verwendung mit shouldAdvanceTime: true. Erhöht die gemockte Zeit um
    // advanceTimeDelta ms bei jeder Änderung der echten Systemzeit um advanceTimeDelta ms
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Weist FakeTimers an, 'native' (d. h. nicht gefälschte) Timer zu löschen, indem an deren
    // jeweilige Handler delegiert wird. Diese werden standardmäßig nicht gelöscht, was zu
    // unerwartetem Verhalten führen kann, wenn Timer vor der Installation von FakeTimers existierten.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Gerät

Der `emulate`-Befehl unterstützt auch die Emulation eines bestimmten Mobil- oder Desktop-Geräts. Dies sollte keinesfalls für mobiles Testen verwendet werden, da sich Desktop-Browser-Engines von mobilen unterscheiden. Dies sollte nur verwendet werden, wenn Ihre Anwendung ein bestimmtes Verhalten für kleinere Viewport-Größen bietet.

Für ein Gerät führt WebdriverIO Folgendes aus:

- setzt den User Agent aus dem Deskriptor
- setzt den Viewport und den Geräteskalierungsfaktor
- setzt `maxTouchPoints` auf `1`, wenn der Deskriptor Touch unterstützt, und hebt Touch andernfalls auf
- setzt das mobile Textlayout und das Viewport-Meta-Tag, wenn der Deskriptor mobil ist, und hebt sie andernfalls auf

Es wird keine Bildschirmgröße oder Ausrichtung aus dem Gerätenamen abgeleitet. Der Viewport ist nicht `screen.width`. Verwenden Sie dafür die Bereiche `screen` und `orientation`.

Die Viewport-Änderung wird an den Top-Level-Kontext gesendet, der beim Aufruf von `emulate` aktuell war. Das Zurücksetzen des Geräts ändert die Größe dieses Kontexts, auch nach einem Wechsel zu einem anderen Fenster.

Wenn der Browser einen dieser Befehle ablehnt, werden der vorherige User Agent, Viewport, Touch, Textlayout und Viewport-Meta wiederhergestellt und der Fehler wird zurückgegeben. Ein benutzerdefinierter User Agent oder eine `setViewport`-Größe wird nicht durch einen Standardwert ersetzt.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// testen Sie Ihre Anwendung ...

// setzt User Agent, Viewport, Touch, Textlayout und Viewport-Meta zurück
await restore()
```

WebdriverIO pflegt eine feste Liste [aller definierten Geräte](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).