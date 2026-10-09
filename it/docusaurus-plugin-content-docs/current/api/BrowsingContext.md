---
id: browsingContext
title: L'oggetto BrowsingContext
description: Gestisci una scheda, una finestra o un frame come oggetto ed esegui comandi direttamente al suo interno, senza dover spostare la sessione su di esso.
---

Un browsing context è una scheda, una finestra o un frame che gestisci come oggetto. I comandi che chiami su di esso vengono eseguiti in quella scheda o in quel frame, mentre la sessione e tutti gli altri contesti restano dove sono. Dalla v10, WebdriverIO gestisce così schede, finestre e frame in una sessione WebDriver BiDi, dove questo approccio sostituisce `switchWindow()` e `switchFrame()`.

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

## Ottenere un browsing context

| Chiamata | Restituisce |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | Il primo contesto top-level della sessione, dopo averlo navigato. `browser.url()` naviga sempre questo contesto. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | Una nuova scheda (`type: 'tab'`) o finestra, una volta caricata la sua pagina. La sessione non si sposta su di essa. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Tutti i contesti top-level aperti (schede e finestre, non i frame), ad esempio una scheda aperta dalla pagina stessa. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | Un frame di un contesto, anche cross-origin e annidato. |

Conserva l'oggetto e chiama i comandi su di esso. Non esiste una scheda o un frame "corrente" tra cui passare, quindi i contesti possono essere usati anche in parallelo:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## Sessioni WebDriver BiDi e Classic

I browsing context richiedono una sessione WebDriver BiDi, che dalla v10 è quella predefinita per Chrome, Edge e Firefox. In una sessione WebDriver Classic, ad esempio con Appium o Safari, esiste solo il contesto corrente della sessione. In questo caso:

- `browser.url()` restituisce un sostituto del browser. Comandi come `$`, `execute` o `getTitle` vengono eseguiti sul browser, `url`, `isFrame` e `parent` descrivono la pagina corrente e `contextId` è `undefined`.
- `frame()`, `navigate()` e `activate()` vengono rifiutati e indicano il comando Classic da usare al loro posto: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) o [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Controlla `browser.isBidi` quando lo stesso codice viene eseguito in entrambi i tipi di sessione.

## Proprietà

| Nome | Tipo | Dettagli |
| ---- | ---- | ------- |
| `contextId` | `String` | L'id del browsing context WebDriver BiDi. `undefined` in una sessione Classic. |
| `url` | `String` | L'URL a cui il contesto è stato navigato l'ultima volta con `browser.url()`, `navigate()` o `newWindow()`. Le navigazioni effettuate dalla pagina stessa (link, `location`, `history.pushState`) sono visibili solo dopo [`getUrl()`](/docs/api/browsingContext/getUrl). |
| `isFrame` | `Boolean` | `true` per un frame, `false` per una scheda o una finestra. |
| `parent` | `BrowsingContext \| undefined` | Per un frame, il contesto su cui è stato chiamato `frame()` (o il frame intermedio, per un frame annidato più in profondità). `undefined` per una scheda o una finestra. |
| `browser` | `Browser` | L'[oggetto browser](/docs/api/browser) della sessione. |
| `request` | `Request \| undefined` | Informazioni di caricamento dell'ultima navigazione tramite `browser.url()` o `navigate()`: URL, header, risposta, reindirizzamenti e le richieste effettuate dalla pagina. |
| `sessionId` | `String` | Id della sessione, uguale a `browser.sessionId`. |
| `capabilities` | `Object` | Capabilities della sessione, uguali a `browser.capabilities`. |
| `options` | `Object` | Opzioni di WebdriverIO, uguali a `browser.options`. |
| `isBidi` | `Boolean` | Indica se la sessione usa WebDriver BiDi. |
| `isMobile` | `Boolean` | Indica se la sessione automatizza un dispositivo mobile. |

## Metodi

### Comandi di un browsing context

Questi comandi agiscono sul contesto su cui vengono chiamati. Ognuno ha la propria pagina di riferimento.

| Comando | Dettagli |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Ottiene un frame di questo contesto come browsing context a sé stante. |
| [`navigate`](/docs/api/browsingContext/navigate) | Naviga questo contesto, con le stesse opzioni di `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Ricarica questo contesto. Un frame ricarica solo il proprio documento. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Si sposta nella cronologia di questa scheda o finestra. |
| [`activate`](/docs/api/browsingContext/activate) | Porta in primo piano questa scheda o finestra. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Chiude questa scheda o finestra. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Legge il titolo o l'URL del documento mostrato in questo contesto. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Risponde al prompt utente aperto in questo contesto o ne legge il testo. |

### Comandi del browser eseguiti in un contesto

Questi sono gli omonimi [comandi del browser](/docs/api/browser), applicati a questo contesto anziché al primo della sessione. Accettano gli stessi argomenti.

| Comando | In un browsing context |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Trovano elementi nel documento di questo contesto. |
| [`execute`](/docs/api/browser/execute) | Esegue uno script nel documento di questo contesto. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Inviano input a questo contesto, anche quando è una scheda in background. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Catturano questo contesto. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Leggono e modificano i cookie della partizione di storage di questo contesto. |
| [`setViewport`](/docs/api/browser/setViewport) | Ridimensiona il viewport di questa scheda o finestra. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Esegue uno script prima degli script della pagina, solo in questa scheda o finestra. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Simulano le richieste solo di questa scheda o finestra. Un mock termina quando la sua scheda viene chiusa. |
| [`emulate`](/docs/api/browser/emulate) | Emula una proprietà del dispositivo, ad esempio la geolocalizzazione o l'orologio, solo in questa scheda o finestra. |
| [`restore`](/docs/api/browser/restore) | Ripristina le emulazioni, come `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | Come sul browser. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // le richieste di `tab` ricevono la risposta simulata, quelle di `page` raggiungono il server
})
```

### Solo top-level {#top-level-only}

Un frame condivide cronologia, viewport, rete ed emulazione con la sua scheda, quindi questi comandi vengono rifiutati su un frame con `` `<command>` is only available on a top-level browsing context ``. Chiamali sulla scheda: `frame.parent` finché `parent` non è `undefined`, oppure il contesto su cui hai chiamato `frame()`.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### Non disponibili su un browsing context

I comandi di sessione, come `deleteSession`, `newWindow` o `browsingContexts`, sono disponibili solo sull'[oggetto browser](/docs/api/browser). Lo stesso vale per i comandi personalizzati: [`addCommand`](/docs/customcommands) e `overwriteCommand` vengono rifiutati su un contesto, registrali su `browser`.

### Eventi

`on`, `once`, `off`, `emit`, `removeListener` e `removeAllListeners` registrano i listener sul browser, quindi gli eventi sono quelli dell'intera sessione. Ad esempio, un evento [`dialog`](/docs/api/dialog) viene emesso per un prompt in qualsiasi scheda o frame.

## Elementi di un browsing context

Un elemento ottenuto tramite un contesto appartiene a quel contesto. I comandi degli elementi come `click`, `setValue` o `getText` vengono eseguiti nel documento di quel contesto, anche quando si tratta di una scheda in background o di un frame. Seguono la specifica WebDriver come fanno i driver, quindi restituiscono gli stessi risultati e gli stessi errori (ad esempio `element click intercepted`) di un elemento della pagina in primo piano. `getComputedRole` e `getComputedLabel` vengono rifiutati per un elemento di un contesto diverso dal primo della sessione.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // restituisce: "BOTTOM"
```

## Risoluzione dei problemi

| Errore | Causa e soluzione |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Chiama [`frame()`](/docs/api/browsingContext/frame) sul contesto restituito da `browser.url()` o `browser.newWindow()`. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Conserva il contesto restituito da `browser.url()` o `browser.newWindow()`, oppure trovane uno con `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | La sessione è una sessione Classic (ad esempio Appium o Safari). Usa il comando Classic indicato nel messaggio. |
| `` `<command>` is only available on a top-level browsing context `` | Il comando è stato chiamato su un frame. Chiamalo sulla scheda del frame, vedi [Solo top-level](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Registra i comandi personalizzati su `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | La pagina che conteneva il frame ha navigato altrove. Ottieni di nuovo il frame con `frame()` sulla nuova pagina. |

## Correlati

- [L'oggetto Browser](/docs/api/browser)
- [Migrazione alla v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Dialoghi](/docs/api/dialog)