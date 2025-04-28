---
id: action
title: action
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

Action-kommandot är ett lågnivågränssnitt för att tillhandahålla virtualiserade enhetsinmatningsåtgärder till webbläsaren.

Förutom högnivåkommandon som `scrollIntoView`, `doubleClick`, ger Actions API detaljerad 
kontroll över exakt vad designerade inmatningsenheter kan göra. WebdriverIO tillhandahåller ett gränssnitt för 3 typer av inmatningskällor:

- en tangentinmatning för tangentbordsenheter
- en pekarinmatning för mus, penna eller pekskärmsenheter
- och hjulinmatningar för rullhjulsenheter

Varje kedja av åtgärdskommandon måste avslutas med `perform` för att utlösa uppsättningen av åtgärder. Detta
gör att åtgärder [släpps](https://w3c.github.io/webdriver/#release-actions) och händelser utlöses. Du kan
hoppa över detta genom att skicka in `true` (t.ex. `browser.actions(...).perform(true)`).

:::info

Stöd för detta kommando och specifika åtgärder kan variera beroende på miljön. Framsteg i utvecklingen
kan följas på [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned).
För mobil kanske du vill använda Appium-specifika gestkommandon på [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch)
och [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands).

:::

### Tangentinmatningskälla

En tangentinmatningskälla är en inmatningskälla som är associerad med en tangentbordstypenhet. Den kan utlösas
genom att använda parametrarna för typen `key`. t.ex.:

```ts
browser.action('key')
```

Den returnerar ett `KeyAction`-objekt som stöder följande åtgärder:

- `down(value: string)`: genererar en tangent-ned-åtgärd
- `up(value: string)`: genererar en tangent-upp-åtgärd
- `pause(ms: number)`: indikerar att en inmatningskälla inte gör något under en särskild period

#### Specialtecken

Om du vill använda specialtecken som t.ex. `Control`, `Page Up` eller `Shift`, se till att importera
[`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417)-objektet
från paketet `webdriverio` så här:

```ts
import { Key } from 'webdriverio'
```

Objektet låter dig komma åt unicode-representationen av det önskade specialtecknet.

### Pekarinmatningskälla

En pekarinmatningskälla är en inmatningskälla som är associerad med en pekartypenhet. Typen kan
anges när man anropar kommandot `action`, t.ex.:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" är standardvärde, också möjligt: "pen" eller "touch"
})
```

Den returnerar ett `PointerAction`-objekt som stöder följande åtgärder:

- `down (button: 'left' | 'middle' | 'right')`: skapar en åtgärd för att trycka på en enskild knapp
- `down (params: PointerActionParams)`: skapar en åtgärd för att trycka på en enskild knapp med detaljerade parametrar
- `move (x: number, y: number)`: Skapar en åtgärd för att flytta pekaren `x` och `y` pixlar från visningsområdet
- `move (params: PointerActionMoveParams)`: Skapar en åtgärd för att flytta pekaren `x` och `y` pixlar från den
  angivna `origin`. `origin` kan definieras som pekarens aktuella position (t.ex. "pointer"), visningsområdet
  (t.ex. "viewport") eller mitten av ett specifikt element.
- `up (button: 'left' | 'middle' | 'right')`: skapar en åtgärd för att släppa en enskild knapp
- `up (params: PointerActionUpParams)`: skapar en åtgärd för att släppa en enskild knapp med detaljerade parametrar
- `cancel()`: En åtgärd som avbryter denna pekares aktuella inmatning.
- `pause(ms: number)`: indikerar att en inmatningskälla inte gör något under en särskild period

Du kan hitta detaljerad information om [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) och [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19)
parametertyper i projektets typdefinition.

### Hjulinmatningskälla

En hjulinmatningskälla är en inmatningskälla som är associerad med en hjultypenhet.

```ts
browser.action('wheel')
```

Den returnerar ett `WheelAction`-objekt som stöder följande åtgärder:

- `scroll (params: ScrollParams)`: rullar en sida till givna koordinater eller ursprung
- `pause(ms: number)`: indikerar att en inmatningskälla inte gör något under en särskild period

Du kan hitta detaljerad information om parametertypen [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) i projektets typdefinition.

##### Användning

```js
browser.action()
```

##### Exempel

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