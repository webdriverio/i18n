---
id: action
title: acción
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

El comando action es una interfaz de bajo nivel para proporcionar acciones de entrada de dispositivo virtualizadas al navegador web.

Además de comandos de alto nivel como `scrollIntoView`, `doubleClick`, la API de Actions proporciona un control granular
sobre exactamente lo que los dispositivos de entrada designados pueden hacer. WebdriverIO proporciona una interfaz para 3 tipos de fuentes
de entrada:

- una entrada de tecla para dispositivos de teclado
- una entrada de puntero para dispositivos de ratón, lápiz o táctiles
- y entradas de rueda para dispositivos de rueda de desplazamiento

Cada cadena de comandos de acción debe completarse llamando a `perform` para activar el conjunto de acciones. Esto
hace que las acciones [se liberen](https://w3c.github.io/webdriver/#release-actions) y los eventos se disparen. Puedes
omitir esto pasando `true` (por ejemplo, `browser.actions(...).perform(true)`).

:::info

El soporte para este comando y acciones específicas puede diferir según el entorno. El progreso en el desarrollo
puede seguirse en [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned).
Para dispositivos móviles es posible que desees usar comandos de gestos específicos de Appium en [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch)
y [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands).

:::

### Fuente de entrada de tecla

Una fuente de entrada de tecla es una fuente de entrada asociada con un dispositivo tipo teclado. Puede activarse
utilizando el parámetro de tipo `key`. Por ejemplo:

```ts
browser.action('key')
```

Devuelve un objeto `KeyAction` que admite las siguientes acciones:

- `down(value: string)`: genera una acción de pulsación de tecla
- `up(value: string)`: genera una acción de liberación de tecla
- `pause(ms: number)`: indica que una fuente de entrada no hace nada durante un tick particular

#### Caracteres Especiales

Si deseas usar caracteres especiales como `Control`, `Page Up` o `Shift`, asegúrate de importar el
objeto [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417)
del paquete `webdriverio` de la siguiente manera:

```ts
import { Key } from 'webdriverio'
```

El objeto te permite acceder a la representación unicode del carácter especial deseado.

### Fuente de entrada de puntero

Una fuente de entrada de puntero es una fuente de entrada asociada con un dispositivo tipo puntero. El tipo puede ser
especificado al invocar el comando `action`, por ejemplo:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" es el valor predeterminado, también posible: "pen" o "touch"
})
```

Devuelve un objeto `PointerAction` que admite las siguientes acciones:

- `down (button: 'left' | 'middle' | 'right')`: crea una acción para presionar una sola tecla
- `down (params: PointerActionParams)`: crea una acción para presionar una sola tecla con parámetros detallados
- `move (x: number, y: number)`: crea una acción para mover el puntero `x` e `y` píxeles desde el viewport
- `move (params: PointerActionMoveParams)`: crea una acción para mover el puntero `x` e `y` píxeles desde el
  `origin` especificado. El `origin` puede definirse como la posición actual del puntero (por ejemplo, "pointer"), el viewport
  (por ejemplo, "viewport") o el centro de un elemento específico.
- `up (button: 'left' | 'middle' | 'right')`: crea una acción para liberar una sola tecla
- `up (params: PointerActionUpParams)`: crea una acción para liberar una sola tecla con parámetros detallados
- `cancel()`: una acción que cancela la entrada actual de este puntero.
- `pause(ms: number)`: indica que una fuente de entrada no hace nada durante un tick particular

Puedes encontrar información detallada sobre los tipos de parámetros [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) y [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19)
en la definición de tipos del proyecto.

### Fuente de entrada de rueda

Una fuente de entrada de rueda es una fuente de entrada asociada con un dispositivo tipo rueda.

```ts
browser.action('wheel')
```

Devuelve un objeto `WheelAction` que admite las siguientes acciones:

- `scroll (params: ScrollParams)`: desplaza una página a las coordenadas u origen dados
- `pause(ms: number)`: indica que una fuente de entrada no hace nada durante un tick particular

Puedes encontrar información detallada sobre el tipo de parámetro [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) en la definición de tipos del proyecto.

##### Uso

```js
browser.action()
```

##### Ejemplos

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