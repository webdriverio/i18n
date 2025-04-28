---
id: action
title: action
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

Il comando action è un'interfaccia di basso livello per fornire azioni di input virtualizzate al browser web.

Oltre ai comandi di alto livello come `scrollIntoView`, `doubleClick`, l'API Actions fornisce un controllo granulare su ciò che i dispositivi di input designati possono fare. WebdriverIO fornisce un'interfaccia per 3 tipi di fonti di input:

- un input da tastiera per dispositivi keyboard
- un input pointer per mouse, penna o dispositivi touch
- e input wheel per dispositivi con rotella di scorrimento

Ogni catena di comandi d'azione deve essere completata chiamando `perform` per attivare l'insieme di azioni. Questo fa sì che le azioni [vengano rilasciate](https://w3c.github.io/webdriver/#release-actions) e gli eventi vengano generati. Puoi saltare questo passaggio passando `true` (ad esempio `browser.actions(...).perform(true)`).

:::info

Il supporto per questo comando e per specifiche azioni può variare in base all'ambiente. I progressi dello sviluppo possono essere seguiti su [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned).
Per dispositivi mobili potresti voler utilizzare comandi specifici per gesture di Appium su [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch) e [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands).

:::

### Fonte di input da tastiera

Una fonte di input da tastiera è associata a un dispositivo di tipo tastiera. Può essere attivata utilizzando il parametro di tipo `key`, ad esempio:

```ts
browser.action('key')
```

Restituisce un oggetto `KeyAction` che supporta le seguenti azioni:

- `down(value: string)`: genera un'azione di pressione tasto
- `up(value: string)`: genera un'azione di rilascio tasto
- `pause(ms: number)`: indica che una fonte di input non fa nulla durante un particolare momento

#### Caratteri speciali

Se desideri utilizzare caratteri speciali come ad esempio `Control`, `Page Up` o `Shift`, assicurati di importare l'oggetto [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417) dal pacchetto `webdriverio` in questo modo:

```ts
import { Key } from 'webdriverio'
```

L'oggetto ti permette di accedere alla rappresentazione unicode del carattere speciale desiderato.

### Fonte di input pointer

Una fonte di input pointer è associata a un dispositivo di tipo puntatore. Il tipo può essere specificato quando si invoca il comando `action`, ad esempio:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" è il valore predefinito, anche possibile: "pen" o "touch"
})
```

Restituisce un oggetto `PointerAction` che supporta le seguenti azioni:

- `down (button: 'left' | 'middle' | 'right')`: crea un'azione per premere un singolo tasto
- `down (params: PointerActionParams)`: crea un'azione per premere un singolo tasto con parametri dettagliati
- `move (x: number, y: number)`: Crea un'azione per spostare il puntatore di `x` e `y` pixel dalla viewport
- `move (params: PointerActionMoveParams)`: Crea un'azione per spostare il puntatore di `x` e `y` pixel dall'`origin` specificata. L'`origin` può essere definita come la posizione corrente del puntatore (es. "pointer"), la viewport (es. "viewport") o il centro di un elemento specifico.
- `up (button: 'left' | 'middle' | 'right')`: crea un'azione per rilasciare un singolo tasto
- `up (params: PointerActionUpParams)`: crea un'azione per rilasciare un singolo tasto con parametri dettagliati
- `cancel()`: Un'azione che annulla l'input corrente di questo puntatore.
- `pause(ms: number)`: indica che una fonte di input non fa nulla durante un particolare momento

Puoi trovare informazioni dettagliate sui tipi di parametri [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) e [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19) nella definizione dei tipi del progetto.

### Fonte di input wheel

Una fonte di input wheel è associata a un dispositivo di tipo rotella.

```ts
browser.action('wheel')
```

Restituisce un oggetto `WheelAction` che supporta le seguenti azioni:

- `scroll (params: ScrollParams)`: scorre una pagina alle coordinate o all'origine indicata
- `pause(ms: number)`: indica che una fonte di input non fa nulla durante un particolare momento

Puoi trovare informazioni dettagliate sul tipo di parametro [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) nella definizione dei tipi del progetto.

##### Utilizzo

```js
browser.action()
```

##### Esempi

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