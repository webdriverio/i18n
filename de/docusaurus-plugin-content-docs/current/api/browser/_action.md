---
id: action
title: action
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

Der action-Befehl ist eine Low-Level-Schnittstelle zur Bereitstellung virtualisierter Geräteeingabeaktionen für den Webbrowser.

Zusätzlich zu High-Level-Befehlen wie `scrollIntoView`, `doubleClick` bietet die Actions API eine detaillierte
Kontrolle darüber, was bestimmte Eingabegeräte tun können. WebdriverIO bietet eine Schnittstelle für 3 Arten von Eingabequellen:

- eine Tastatureingabe für Tastaturgeräte
- eine Zeigereingabe für Maus-, Stift- oder Touchgeräte
- und Radeingaben für Scrollradgeräte

Jede Kette von Aktionsbefehlen muss mit dem Aufruf von `perform` abgeschlossen werden, um die Aktionen auszulösen. Dies
führt dazu, dass Aktionen [freigegeben werden](https://w3c.github.io/webdriver/#release-actions) und Ereignisse ausgelöst werden. Sie können
dies überspringen, indem Sie `true` übergeben (z.B. `browser.actions(...).perform(true)`).

:::info

Die Unterstützung für diesen Befehl und bestimmte Aktionen kann je nach Umgebung unterschiedlich sein. Der Fortschritt bei der Entwicklung
kann auf [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned) verfolgt werden.
Für Mobilgeräte sollten Sie möglicherweise die spezifischen Appium-Gesten-Befehle für [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch)
und [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands) verwenden.

:::

### Tastatur-Eingabequelle

Eine Tastatur-Eingabequelle ist eine Eingabequelle, die mit einem Tastatur-ähnlichen Gerät verbunden ist. Sie kann
durch Verwendung des `key`-Typparameters ausgelöst werden, z.B.:

```ts
browser.action('key')
```

Es gibt ein `KeyAction`-Objekt zurück, das die folgenden Aktionen unterstützt:

- `down(value: string)`: erzeugt eine Taste-Runter-Aktion
- `up(value: string)`: erzeugt eine Taste-Hoch-Aktion
- `pause(ms: number)`: zeigt an, dass eine Eingabequelle während eines bestimmten Takts nichts tut

#### Sonderzeichen

Wenn Sie Sonderzeichen wie z.B. `Control`, `Page Up` oder `Shift` verwenden möchten, stellen Sie sicher, dass Sie das
[`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417)-Objekt
aus dem `webdriverio`-Paket wie folgt importieren:

```ts
import { Key } from 'webdriverio'
```

Das Objekt ermöglicht Ihnen den Zugriff auf die Unicode-Darstellung des gewünschten Sonderzeichens.

### Zeiger-Eingabequelle

Eine Zeiger-Eingabequelle ist eine Eingabequelle, die mit einem Zeiger-Eingabegerät verbunden ist. Der Typ kann
beim Aufrufen des `action`-Befehls angegeben werden, z.B.:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" ist der Standardwert, auch möglich: "pen" oder "touch"
})
```

Es gibt ein `PointerAction`-Objekt zurück, das die folgenden Aktionen unterstützt:

- `down (button: 'left' | 'middle' | 'right')`: erstellt eine Aktion zum Drücken einer einzelnen Taste
- `down (params: PointerActionParams)`: erstellt eine Aktion zum Drücken einer einzelnen Taste mit detaillierten Parametern
- `move (x: number, y: number)`: Erstellt eine Aktion zum Bewegen des Zeigers um `x` und `y` Pixel vom Viewport
- `move (params: PointerActionMoveParams)`: Erstellt eine Aktion zum Bewegen des Zeigers um `x` und `y` Pixel vom
  angegebenen `origin`. Der `origin` kann als aktuelle Position des Zeigers (z.B. "pointer"), der Viewport
  (z.B. "viewport") oder die Mitte eines bestimmten Elements definiert werden.
- `up (button: 'left' | 'middle' | 'right')`: erstellt eine Aktion zum Loslassen einer einzelnen Taste
- `up (params: PointerActionUpParams)`: erstellt eine Aktion zum Loslassen einer einzelnen Taste mit detaillierten Parametern
- `cancel()`: Eine Aktion, die die aktuelle Eingabe dieses Zeigers abbricht.
- `pause(ms: number)`: zeigt an, dass eine Eingabequelle während eines bestimmten Takts nichts tut

Detaillierte Informationen zu den Parametertypen [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) und [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19)
finden Sie in der Projekt-Typdefinition.

### Rad-Eingabequelle

Eine Rad-Eingabequelle ist eine Eingabequelle, die mit einem Rad-Eingabegerät verbunden ist.

```ts
browser.action('wheel')
```

Es gibt ein `WheelAction`-Objekt zurück, das die folgenden Aktionen unterstützt:

- `scroll (params: ScrollParams)`: scrollt eine Seite zu bestimmten Koordinaten oder Ursprung
- `pause(ms: number)`: zeigt an, dass eine Eingabequelle während eines bestimmten Takts nichts tut

Detaillierte Informationen zum Parametertyp [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) finden Sie in der Projekt-Typdefinition.

##### Verwendung

```js
browser.action()
```

##### Beispiele

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
