---
id: browsingContext
title: BrowsingContext-objektet
description: Håll en flik, ett fönster eller en ram som ett objekt och kör kommandon direkt i den, utan att byta sessionen till den.
---

En browsing context är en flik, ett fönster eller en ram som du håller som ett objekt. Kommandon som du anropar på den körs i den fliken eller ramen, medan sessionen och alla andra kontexter stannar där de är. Sedan v10 är det så här WebdriverIO arbetar med flikar, fönster och ramar i en WebDriver BiDi-session, och det ersätter `switchWindow()` och `switchFrame()` där.

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

## Hämta en browsing context

| Anrop | Returnerar |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | Sessionens första toppnivåkontext, efter att den har navigerats. `browser.url()` navigerar alltid denna. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | En ny flik (`type: 'tab'`) eller ett nytt fönster, när dess sida har laddats. Sessionen byter inte till den. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Alla öppna toppnivåkontexter (flikar och fönster, inte ramar), t.ex. en flik som sidan själv öppnade. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | En ram i en kontext, även ramar från andra ursprung (cross-origin) och nästlade ramar. |

Behåll objektet och anropa kommandon på det. Det finns ingen "aktuell" flik eller ram att växla mellan, så kontexter kan också användas parallellt:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## WebDriver BiDi- och Classic-sessioner

Browsing contexts kräver en WebDriver BiDi-session, vilket är standard sedan v10 för Chrome, Edge och Firefox. I en WebDriver Classic-session, t.ex. med Appium eller Safari, finns endast sessionens aktuella kontext. Där gäller:

- `browser.url()` returnerar en ersättare för webbläsaren. Kommandon som `$`, `execute` eller `getTitle` körs på webbläsaren, `url`, `isFrame` och `parent` beskriver den aktuella sidan, och `contextId` är `undefined`.
- `frame()`, `navigate()` och `activate()` avvisas och anger vilket Classic-kommando som ska användas i stället: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) eller [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Kontrollera `browser.isBidi` när samma kod körs i båda typerna av sessioner.

## Egenskaper

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| `contextId` | `String` | WebDriver BiDi-id för browsing context. `undefined` i en Classic-session. |
| `url` | `String` | Den URL som kontexten senast navigerades till med `browser.url()`, `navigate()` eller `newWindow()`. Navigeringar som sidan gör själv (länkar, `location`, `history.pushState`) syns först efter [`getUrl()`](/docs/api/browsingContext/getUrl). |
| `isFrame` | `Boolean` | `true` för en ram, `false` för en flik eller ett fönster. |
| `parent` | `BrowsingContext \| undefined` | För en ram, den kontext som `frame()` anropades på (eller ramen däremellan, för en ram som är nästlad djupare). `undefined` för en flik eller ett fönster. |
| `browser` | `Browser` | Sessionens [browser-objekt](/docs/api/browser). |
| `request` | `Request \| undefined` | Laddningsinformation för den senaste navigeringen via `browser.url()` eller `navigate()`: URL, headers, svar, omdirigeringar och de förfrågningar som sidan gjorde. |
| `sessionId` | `String` | Sessions-id, samma som `browser.sessionId`. |
| `capabilities` | `Object` | Sessionens capabilities, samma som `browser.capabilities`. |
| `options` | `Object` | WebdriverIO-alternativ, samma som `browser.options`. |
| `isBidi` | `Boolean` | Om sessionen använder WebDriver BiDi. |
| `isMobile` | `Boolean` | Om sessionen automatiserar en mobil enhet. |

## Metoder

### Kommandon för en browsing context

Dessa kommandon verkar på den kontext de anropas på. Vart och ett har en egen referenssida.

| Kommando | Detaljer |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Hämta en ram i denna kontext som en egen browsing context. |
| [`navigate`](/docs/api/browsingContext/navigate) | Navigera denna kontext, med samma alternativ som `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Ladda om denna kontext. En ram laddar endast om sitt eget dokument. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Gå bakåt eller framåt i historiken för denna flik eller detta fönster. |
| [`activate`](/docs/api/browsingContext/activate) | Ta fram denna flik eller detta fönster i förgrunden. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Stäng denna flik eller detta fönster. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Läs titeln eller URL:en för dokumentet som visas i denna kontext. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Besvara eller läs den användardialog som är öppen i denna kontext. |

### Browser-kommandon som körs i en kontext

Detta är [browser-kommandona](/docs/api/browser) med samma namn, tillämpade på denna kontext i stället för på sessionens första. De tar samma argument.

| Kommando | I en browsing context |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Hitta element i denna kontexts dokument. |
| [`execute`](/docs/api/browser/execute) | Kör ett skript i denna kontexts dokument. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Skicka inmatning till denna kontext, även när den är en bakgrundsflik. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Fånga denna kontext. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Läs och ändra cookies i denna kontexts lagringspartition. |
| [`setViewport`](/docs/api/browser/setViewport) | Ändra storlek på viewporten för denna flik eller detta fönster. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Kör ett skript före sidans skript, endast i denna flik eller detta fönster. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Mocka förfrågningarna endast för denna flik eller detta fönster. En mock upphör när dess flik stängs. |
| [`emulate`](/docs/api/browser/emulate) | Emulera en enhetsegenskap, t.ex. geolokalisering eller klockan, endast i denna flik eller detta fönster. |
| [`restore`](/docs/api/browser/restore) | Återställ emuleringar, samma som `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | Samma som på webbläsaren. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // förfrågningar från `tab` får det mockade svaret, förfrågningar från `page` når servern
})
```

### Endast toppnivå {#top-level-only}

En ram delar historik, viewport, nätverk och emulering med sin flik, så dessa kommandon avvisas på en ram med `` `<command>` is only available on a top-level browsing context ``. Anropa dem på fliken: `frame.parent` tills `parent` är `undefined`, eller den kontext som du anropade `frame()` på.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### Inte tillgängligt på en browsing context

Sessionskommandon, såsom `deleteSession`, `newWindow` eller `browsingContexts`, finns endast på [browser-objektet](/docs/api/browser). Detsamma gäller anpassade kommandon: [`addCommand`](/docs/customcommands) och `overwriteCommand` avvisas på en kontext, registrera dem på `browser`.

### Händelser

`on`, `once`, `off`, `emit`, `removeListener` och `removeAllListeners` registrerar lyssnare på webbläsaren, så händelserna är de för hela sessionen. Till exempel utlöses en [`dialog`](/docs/api/dialog)-händelse för en dialog i vilken flik eller ram som helst.

## Element i en browsing context

Ett element som du hämtar via en kontext tillhör den kontexten. Elementkommandon som `click`, `setValue` eller `getText` körs i den kontextens dokument, även när den är en bakgrundsflik eller en ram. De följer WebDriver-specifikationen precis som drivrutinerna, så de returnerar samma resultat och samma fel (t.ex. `element click intercepted`) som för ett element på sidan i förgrunden. `getComputedRole` och `getComputedLabel` avvisas för ett element i en annan kontext än sessionens första.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // skriver ut: "BOTTOM"
```

## Felsökning

| Fel | Orsak och åtgärd |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Anropa [`frame()`](/docs/api/browsingContext/frame) på den kontext som returneras av `browser.url()` eller `browser.newWindow()`. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Behåll den kontext som returneras av `browser.url()` eller `browser.newWindow()`, eller hitta en med `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | Sessionen är en Classic-session (t.ex. Appium eller Safari). Använd det Classic-kommando som meddelandet anger. |
| `` `<command>` is only available on a top-level browsing context `` | Kommandot anropades på en ram. Anropa det på ramens flik, se [Endast toppnivå](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Registrera anpassade kommandon på `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | Sidan som innehöll ramen navigerade bort. Hämta ramen igen med `frame()` på den nya sidan. |

## Relaterat

- [Browser-objektet](/docs/api/browser)
- [Migrera till v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Dialoger](/docs/api/dialog)