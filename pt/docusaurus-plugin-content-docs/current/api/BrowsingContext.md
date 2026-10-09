---
id: browsingContext
title: O Objeto BrowsingContext
description: Mantenha uma aba, uma janela ou um frame como um objeto e execute comandos nele diretamente, sem mudar a sessão para ele.
---

Um contexto de navegação (browsing context) é uma aba, uma janela ou um frame que você mantém como um objeto. Os comandos que você chama nele são executados naquela aba ou frame, enquanto a sessão e todos os outros contextos permanecem onde estão. Desde a v10, é assim que o WebdriverIO trabalha com abas, janelas e frames em uma sessão WebDriver BiDi, e isso substitui `switchWindow()` e `switchFrame()` nesse cenário.

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

## Obter um contexto de navegação

| Chamada | Retorna |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | O primeiro contexto de nível superior da sessão, após navegar nele. `browser.url()` sempre navega neste. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | Uma nova aba (`type: 'tab'`) ou janela, assim que sua página for carregada. A sessão não muda para ela. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Todos os contextos de nível superior abertos (abas e janelas, não frames), por exemplo, uma aba que a própria página abriu. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | Um frame de um contexto, incluindo frames de outra origem (cross-origin) e aninhados. |

Mantenha o objeto e chame comandos nele. Não existe uma aba ou frame "atual" entre os quais alternar, então os contextos também podem ser usados em paralelo:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## Sessões WebDriver BiDi e Classic

Os contextos de navegação precisam de uma sessão WebDriver BiDi, que é o padrão desde a v10 para Chrome, Edge e Firefox. Em uma sessão WebDriver Classic, por exemplo com Appium ou Safari, existe apenas o contexto atual da sessão. Nesse caso:

- `browser.url()` retorna um substituto para o navegador. Comandos como `$`, `execute` ou `getTitle` são executados no navegador, `url`, `isFrame` e `parent` descrevem a página atual, e `contextId` é `undefined`.
- `frame()`, `navigate()` e `activate()` são rejeitados e indicam o comando Classic a ser usado no lugar: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) ou [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Verifique `browser.isBidi` quando o mesmo código for executado em ambos os tipos de sessão.

## Propriedades

| Nome | Tipo | Detalhes |
| ---- | ---- | ------- |
| `contextId` | `String` | O id do contexto de navegação WebDriver BiDi. `undefined` em uma sessão Classic. |
| `url` | `String` | A URL para a qual o contexto foi navegado pela última vez com `browser.url()`, `navigate()` ou `newWindow()`. Navegações feitas pela própria página (links, `location`, `history.pushState`) só aparecem após [`getUrl()`](/docs/api/browsingContext/getUrl). |
| `isFrame` | `Boolean` | `true` para um frame, `false` para uma aba ou janela. |
| `parent` | `BrowsingContext \| undefined` | Para um frame, o contexto em que `frame()` foi chamado (ou o frame intermediário, para um frame aninhado mais profundamente). `undefined` para uma aba ou janela. |
| `browser` | `Browser` | O [objeto browser](/docs/api/browser) da sessão. |
| `request` | `Request \| undefined` | Informações de carregamento da última navegação através de `browser.url()` ou `navigate()`: URL, cabeçalhos, resposta, redirecionamentos e as requisições que a página fez. |
| `sessionId` | `String` | Id da sessão, o mesmo que `browser.sessionId`. |
| `capabilities` | `Object` | Capabilities da sessão, o mesmo que `browser.capabilities`. |
| `options` | `Object` | Opções do WebdriverIO, o mesmo que `browser.options`. |
| `isBidi` | `Boolean` | Se a sessão usa WebDriver BiDi. |
| `isMobile` | `Boolean` | Se a sessão automatiza um dispositivo móvel. |

## Métodos

### Comandos de um contexto de navegação

Estes comandos atuam no contexto em que são chamados. Cada um tem sua própria página de referência.

| Comando | Detalhes |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Obtém um frame deste contexto como um contexto de navegação próprio. |
| [`navigate`](/docs/api/browsingContext/navigate) | Navega neste contexto, com as mesmas opções de `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Recarrega este contexto. Um frame recarrega apenas seu próprio documento. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Move-se pelo histórico desta aba ou janela. |
| [`activate`](/docs/api/browsingContext/activate) | Traz esta aba ou janela para a frente. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Fecha esta aba ou janela. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Lê o título ou a URL do documento exibido neste contexto. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Responde ou lê o prompt de usuário aberto neste contexto. |

### Comandos do navegador que são executados em um contexto

Estes são os [comandos do navegador](/docs/api/browser) de mesmo nome, aplicados a este contexto em vez do primeiro contexto da sessão. Eles recebem os mesmos argumentos.

| Comando | Em um contexto de navegação |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Encontra elementos no documento deste contexto. |
| [`execute`](/docs/api/browser/execute) | Executa um script no documento deste contexto. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Envia entradas para este contexto, mesmo quando é uma aba em segundo plano. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Captura este contexto. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Lê e altera os cookies da partição de armazenamento deste contexto. |
| [`setViewport`](/docs/api/browser/setViewport) | Redimensiona o viewport desta aba ou janela. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Executa um script antes dos scripts da página, apenas nesta aba ou janela. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Simula (mock) as requisições apenas desta aba ou janela. Um mock termina quando sua aba é fechada. |
| [`emulate`](/docs/api/browser/emulate) | Emula uma propriedade do dispositivo, por exemplo geolocalização ou o relógio, apenas nesta aba ou janela. |
| [`restore`](/docs/api/browser/restore) | Restaura emulações, o mesmo que `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | O mesmo que no navegador. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // as requisições de `tab` recebem a resposta simulada, as requisições de `page` chegam ao servidor
})
```

### Apenas nível superior

Um frame compartilha o histórico, o viewport, a rede e a emulação de sua aba, então estes comandos são rejeitados em um frame com `` `<command>` is only available on a top-level browsing context ``. Chame-os na aba: `frame.parent` até que `parent` seja `undefined`, ou o contexto em que você chamou `frame()`.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### Não disponíveis em um contexto de navegação

Comandos de sessão, como `deleteSession`, `newWindow` ou `browsingContexts`, existem apenas no [objeto browser](/docs/api/browser). O mesmo vale para comandos personalizados: [`addCommand`](/docs/customcommands) e `overwriteCommand` são rejeitados em um contexto; registre-os no `browser`.

### Eventos

`on`, `once`, `off`, `emit`, `removeListener` e `removeAllListeners` registram listeners no navegador, portanto os eventos são os de toda a sessão. Por exemplo, um evento [`dialog`](/docs/api/dialog) é disparado para um prompt em qualquer aba ou frame.

## Elementos de um contexto de navegação

Um elemento que você obtém através de um contexto pertence a esse contexto. Comandos de elemento como `click`, `setValue` ou `getText` são executados no documento desse contexto, mesmo quando é uma aba em segundo plano ou um frame. Eles seguem a especificação WebDriver assim como os drivers, então retornam os mesmos resultados e os mesmos erros (por exemplo, `element click intercepted`) que para um elemento da página em primeiro plano. `getComputedRole` e `getComputedLabel` são rejeitados para um elemento de um contexto diferente do primeiro contexto da sessão.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // exibe: "BOTTOM"
```

## Solução de problemas

| Erro | Causa e solução |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Chame [`frame()`](/docs/api/browsingContext/frame) no contexto retornado por `browser.url()` ou `browser.newWindow()`. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Mantenha o contexto retornado por `browser.url()` ou `browser.newWindow()`, ou encontre um com `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | A sessão é uma sessão Classic (por exemplo, Appium ou Safari). Use o comando Classic indicado na mensagem. |
| `` `<command>` is only available on a top-level browsing context `` | O comando foi chamado em um frame. Chame-o na aba do frame, veja [Apenas nível superior](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Registre comandos personalizados no `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | A página que continha o frame foi navegada. Obtenha o frame novamente com `frame()` na nova página. |

## Relacionados

- [O Objeto Browser](/docs/api/browser)
- [Migrar para a v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Diálogos](/docs/api/dialog)