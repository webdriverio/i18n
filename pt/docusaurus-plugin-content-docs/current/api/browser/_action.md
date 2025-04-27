---
id: action
title: action
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

O comando action é uma interface de baixo nível para fornecer ações de entrada de dispositivo virtualizado ao navegador web.

Além de comandos de alto nível como `scrollIntoView`, `doubleClick`, a API de Ações fornece controle granular sobre exatamente o que os dispositivos de entrada designados podem fazer. O WebdriverIO fornece uma interface para 3 tipos de fontes de entrada:

- uma entrada de tecla para dispositivos de teclado
- uma entrada de ponteiro para dispositivos de mouse, caneta ou toque
- e entradas de roda para dispositivos de roda de rolagem

Cada cadeia de comandos de ação deve ser concluída chamando `perform` para acionar o conjunto de ações. Isso faz com que as ações [sejam liberadas](https://w3c.github.io/webdriver/#release-actions) e os eventos sejam disparados. Você pode pular isso passando `true` (por exemplo, `browser.actions(...).perform(true)`).

:::info

O suporte para este comando e ações específicas pode diferir com base no ambiente. O progresso no desenvolvimento pode ser acompanhado em [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned).
Para dispositivos móveis, você pode querer usar comandos de gestos específicos do Appium para [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch) e [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands).

:::

### Fonte de entrada de tecla

Uma fonte de entrada de tecla é uma fonte de entrada associada a um dispositivo do tipo teclado. Pode ser acionada usando os parâmetros de tipo `key`. Por exemplo:

```ts
browser.action('key')
```

Ele retorna um objeto `KeyAction` que suporta as seguintes ações:

- `down(value: string)`: gera uma ação de pressionar tecla
- `up(value: string)`: gera uma ação de soltar tecla
- `pause(ms: number)`: indica que uma fonte de entrada não faz nada durante um determinado período

#### Caracteres Especiais

Se você quiser usar caracteres especiais como `Control`, `Page Up` ou `Shift`, certifique-se de importar o objeto [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417) do pacote `webdriverio` da seguinte forma:

```ts
import { Key } from 'webdriverio'
```

O objeto permite que você acesse a representação unicode do caractere especial desejado.

### Fonte de entrada de ponteiro

Uma fonte de entrada de ponteiro é uma fonte de entrada associada a um dispositivo de entrada do tipo ponteiro. O tipo pode ser especificado ao invocar o comando `action`, por exemplo:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" é o valor padrão, também possível: "pen" ou "touch"
})
```

Ele retorna um objeto `PointerAction` que suporta as seguintes ações:

- `down (button: 'left' | 'middle' | 'right')`: cria uma ação para pressionar uma única tecla
- `down (params: PointerActionParams)`: cria uma ação para pressionar uma única tecla com parâmetros detalhados
- `move (x: number, y: number)`: Cria uma ação para mover o ponteiro `x` e `y` pixels a partir da viewport
- `move (params: PointerActionMoveParams)`: Cria uma ação para mover o ponteiro `x` e `y` pixels a partir da `origin` especificada. A `origin` pode ser definida como a posição atual do ponteiro (ex: "pointer"), a viewport (ex: "viewport") ou o centro de um elemento específico.
- `up (button: 'left' | 'middle' | 'right')`: cria uma ação para soltar uma única tecla
- `up (params: PointerActionUpParams)`: cria uma ação para soltar uma única tecla com parâmetros detalhados
- `cancel()`: Uma ação que cancela a entrada atual deste ponteiro.
- `pause(ms: number)`: indica que uma fonte de entrada não faz nada durante um determinado período

Você pode encontrar informações detalhadas sobre os tipos de parâmetros [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) e [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19) na definição de tipo do projeto.

### Fonte de entrada de roda

Uma fonte de entrada de roda é uma fonte de entrada associada a um dispositivo de entrada do tipo roda.

```ts
browser.action('wheel')
```

Ele retorna um objeto `WheelAction` que suporta as seguintes ações:

- `scroll (params: ScrollParams)`: rola uma página para as coordenadas ou origem especificadas
- `pause(ms: number)`: indica que uma fonte de entrada não faz nada durante um determinado período

Você pode encontrar informações detalhadas sobre o tipo de parâmetro [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) na definição de tipo do projeto.

##### Uso

```js
browser.action()
```

##### Exemplos

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