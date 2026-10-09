---
id: browsingContext
title: El objeto BrowsingContext
description: Mantén una pestaña, una ventana o un frame como un objeto y ejecuta comandos en él directamente, sin cambiar la sesión a él.
---

Un contexto de navegación (browsing context) es una pestaña, una ventana o un frame que mantienes como un objeto. Los comandos que llamas sobre él se ejecutan en esa pestaña o frame, mientras que la sesión y todos los demás contextos permanecen donde están. Desde la v10, esta es la forma en que WebdriverIO trabaja con pestañas, ventanas y frames en una sesión WebDriver BiDi, y reemplaza allí a `switchWindow()` y `switchFrame()`.

```ts title="test/specs/tabs.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('browsing contexts', () => {
    it('works with two tabs and a frame at the same time', async () => {
        const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
        const docs = await browser.newWindow('https://webdriver.io/docs/api', { type: 'tab' })

        const top = await page.frame({ selector: 'frame[name="frame-top"]' })
        const middle = await top.frame({ selector: 'frame[name="frame-middle"]' })

        await expect(middle.$('#content')).toHaveText('MIDDLE')
        await expect(docs.$('h1')).toBeDisplayed()
        console.log(await page.getTitle(), await docs.getTitle())
    })
})
```

## Obtener un contexto de navegación

| Llamada | Devuelve |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | El primer contexto de nivel superior de la sesión, después de navegar en él. `browser.url()` siempre navega en este. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | Una nueva pestaña (`type: 'tab'`) o ventana, una vez que su página se ha cargado. La sesión no cambia a ella. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Todos los contextos de nivel superior abiertos (pestañas y ventanas, no frames), p. ej. una pestaña que la propia página abrió. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | Un frame de un contexto, incluidos los de origen cruzado y los anidados. |

Conserva el objeto y llama a los comandos sobre él. No existe una pestaña o frame "actual" entre los que cambiar, por lo que los contextos también pueden usarse en paralelo:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## Sesiones WebDriver BiDi y Classic

Los contextos de navegación necesitan una sesión WebDriver BiDi, que es la predeterminada desde la v10 para Chrome, Edge y Firefox. En una sesión WebDriver Classic, p. ej. con Appium o Safari, solo existe el contexto actual de la sesión. Allí:

- `browser.url()` devuelve un sustituto del navegador. Comandos como `$`, `execute` o `getTitle` se ejecutan en el navegador, `url`, `isFrame` y `parent` describen la página actual, y `contextId` es `undefined`.
- `frame()`, `navigate()` y `activate()` se rechazan e indican el comando Classic que debe usarse en su lugar: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) o [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Comprueba `browser.isBidi` cuando el mismo código se ejecute en ambos tipos de sesión.

## Propiedades

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| `contextId` | `String` | El id del contexto de navegación de WebDriver BiDi. `undefined` en una sesión Classic. |
| `url` | `String` | La URL a la que se navegó por última vez en el contexto con `browser.url()`, `navigate()` o `newWindow()`. Las navegaciones que realiza la propia página (enlaces, `location`, `history.pushState`) solo se muestran después de [`getUrl()`](/docs/api/browsingContext/getUrl). |
| `isFrame` | `Boolean` | `true` para un frame, `false` para una pestaña o ventana. |
| `parent` | `BrowsingContext \| undefined` | Para un frame, el contexto sobre el que se llamó a `frame()` (o el frame intermedio, en el caso de un frame anidado más profundamente). `undefined` para una pestaña o ventana. |
| `browser` | `Browser` | El [objeto browser](/docs/api/browser) de la sesión. |
| `request` | `Request \| undefined` | Información de carga de la última navegación mediante `browser.url()` o `navigate()`: URL, cabeceras, respuesta, redirecciones y las solicitudes que realizó la página. |
| `sessionId` | `String` | Id de la sesión, igual que `browser.sessionId`. |
| `capabilities` | `Object` | Capacidades de la sesión, igual que `browser.capabilities`. |
| `options` | `Object` | Opciones de WebdriverIO, igual que `browser.options`. |
| `isBidi` | `Boolean` | Si la sesión usa WebDriver BiDi. |
| `isMobile` | `Boolean` | Si la sesión automatiza un dispositivo móvil. |

## Métodos

### Comandos de un contexto de navegación

Estos comandos actúan sobre el contexto en el que se llaman. Cada uno tiene su propia página de referencia.

| Comando | Detalles |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Obtiene un frame de este contexto como un contexto de navegación propio. |
| [`navigate`](/docs/api/browsingContext/navigate) | Navega en este contexto, con las mismas opciones que `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Recarga este contexto. Un frame recarga solo su propio documento. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Se desplaza por el historial de esta pestaña o ventana. |
| [`activate`](/docs/api/browsingContext/activate) | Trae esta pestaña o ventana al frente. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Cierra esta pestaña o ventana. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Lee el título o la URL del documento mostrado en este contexto. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Responde o lee el aviso de usuario abierto en este contexto. |

### Comandos del navegador que se ejecutan en un contexto

Estos son los [comandos del navegador](/docs/api/browser) con el mismo nombre, aplicados a este contexto en lugar de al primero de la sesión. Aceptan los mismos argumentos.

| Comando | En un contexto de navegación |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Busca elementos en el documento de este contexto. |
| [`execute`](/docs/api/browser/execute) | Ejecuta un script en el documento de este contexto. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Envía entrada a este contexto, incluso cuando es una pestaña en segundo plano. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Captura este contexto. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Lee y modifica las cookies de la partición de almacenamiento de este contexto. |
| [`setViewport`](/docs/api/browser/setViewport) | Cambia el tamaño del viewport de esta pestaña o ventana. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Ejecuta un script antes de los scripts de la página, solo en esta pestaña o ventana. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Simula (mock) las solicitudes solo de esta pestaña o ventana. Un mock termina cuando se cierra su pestaña. |
| [`emulate`](/docs/api/browser/emulate) | Emula una propiedad del dispositivo, p. ej. la geolocalización o el reloj, solo en esta pestaña o ventana. |
| [`restore`](/docs/api/browser/restore) | Restaura las emulaciones, igual que `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | Igual que en el navegador. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // las solicitudes de `tab` reciben la respuesta simulada, las solicitudes de `page` llegan al servidor
})
```

### Solo de nivel superior {#top-level-only}

Un frame comparte el historial, el viewport, la red y la emulación de su pestaña, por lo que estos comandos se rechazan en un frame con `` `<command>` is only available on a top-level browsing context ``. Llámalos sobre la pestaña: `frame.parent` hasta que `parent` sea `undefined`, o el contexto sobre el que llamaste a `frame()`.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### No disponibles en un contexto de navegación

Los comandos de sesión, como `deleteSession`, `newWindow` o `browsingContexts`, solo están en el [objeto browser](/docs/api/browser). Lo mismo ocurre con los comandos personalizados: [`addCommand`](/docs/customcommands) y `overwriteCommand` se rechazan en un contexto; regístralos en `browser`.

### Eventos

`on`, `once`, `off`, `emit`, `removeListener` y `removeAllListeners` registran listeners en el navegador, por lo que los eventos son los de toda la sesión. Por ejemplo, un evento [`dialog`](/docs/api/dialog) se dispara para un aviso en cualquier pestaña o frame.

## Elementos de un contexto de navegación

Un elemento que obtienes a través de un contexto pertenece a ese contexto. Los comandos de elemento como `click`, `setValue` o `getText` se ejecutan en el documento de ese contexto, incluso cuando es una pestaña en segundo plano o un frame. Siguen la especificación WebDriver al igual que los drivers, por lo que devuelven los mismos resultados y los mismos errores (p. ej. `element click intercepted`) que para un elemento de la página en primer plano. `getComputedRole` y `getComputedLabel` se rechazan para un elemento de un contexto distinto del primero de la sesión.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // muestra: "BOTTOM"
```

## Solución de problemas

| Error | Causa y solución |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Llama a [`frame()`](/docs/api/browsingContext/frame) sobre el contexto devuelto por `browser.url()` o `browser.newWindow()`. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Conserva el contexto devuelto por `browser.url()` o `browser.newWindow()`, o busca uno con `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | La sesión es una sesión Classic (p. ej. Appium o Safari). Usa el comando Classic que indica el mensaje. |
| `` `<command>` is only available on a top-level browsing context `` | El comando se llamó sobre un frame. Llámalo sobre la pestaña del frame; consulta [Solo de nivel superior](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Registra los comandos personalizados en `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | La página que contenía el frame navegó a otro lugar. Obtén el frame de nuevo con `frame()` en la nueva página. |

## Relacionado

- [El objeto Browser](/docs/api/browser)
- [Migrar a v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Diálogos](/docs/api/dialog)