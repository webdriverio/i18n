---
id: browsingContext
title: Das BrowsingContext-Objekt
description: Halte einen Tab, ein Fenster oder einen Frame als Objekt und führe Befehle direkt darin aus, ohne die Session dorthin zu wechseln.
---

Ein Browsing Context ist ein Tab, ein Fenster oder ein Frame, den du als Objekt hältst. Befehle, die du darauf aufrufst, werden in diesem Tab oder Frame ausgeführt, während die Session und alle anderen Kontexte bleiben, wo sie sind. Seit v10 arbeitet WebdriverIO auf diese Weise mit Tabs, Fenstern und Frames in einer WebDriver-BiDi-Session und ersetzt dort `switchWindow()` und `switchFrame()`.

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

## Einen Browsing Context erhalten

| Aufruf | Rückgabe |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | Der erste Top-Level-Kontext der Session, nachdem er navigiert wurde. `browser.url()` navigiert immer diesen Kontext. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | Ein neuer Tab (`type: 'tab'`) oder ein neues Fenster, sobald dessen Seite geladen ist. Die Session wechselt nicht dorthin. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Jeder geöffnete Top-Level-Kontext (Tabs und Fenster, keine Frames), z. B. ein Tab, den die Seite selbst geöffnet hat. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | Ein Frame eines Kontexts, auch Cross-Origin- und verschachtelte Frames. |

Behalte das Objekt und rufe Befehle darauf auf. Es gibt keinen „aktuellen“ Tab oder Frame, zwischen denen gewechselt werden muss, daher können Kontexte auch parallel verwendet werden:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## WebDriver-BiDi- und Classic-Sessions

Browsing Contexts benötigen eine WebDriver-BiDi-Session, die seit v10 für Chrome, Edge und Firefox der Standard ist. In einer WebDriver-Classic-Session, z. B. mit Appium oder Safari, gibt es nur den aktuellen Kontext der Session. Dort gilt:

- `browser.url()` gibt einen Platzhalter für den Browser zurück. Befehle wie `$`, `execute` oder `getTitle` werden im Browser ausgeführt, `url`, `isFrame` und `parent` beschreiben die aktuelle Seite, und `contextId` ist `undefined`.
- `frame()`, `navigate()` und `activate()` werden abgelehnt und nennen den Classic-Befehl, der stattdessen verwendet werden soll: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) oder [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Prüfe `browser.isBidi`, wenn derselbe Code in beiden Arten von Sessions läuft.

## Eigenschaften

| Name | Typ | Details |
| ---- | ---- | ------- |
| `contextId` | `String` | Die WebDriver-BiDi-Browsing-Context-ID. `undefined` in einer Classic-Session. |
| `url` | `String` | Die URL, zu der der Kontext zuletzt mit `browser.url()`, `navigate()` oder `newWindow()` navigiert wurde. Navigationen, die die Seite selbst durchführt (Links, `location`, `history.pushState`), werden erst nach [`getUrl()`](/docs/api/browsingContext/getUrl) angezeigt. |
| `isFrame` | `Boolean` | `true` für einen Frame, `false` für einen Tab oder ein Fenster. |
| `parent` | `BrowsingContext \| undefined` | Bei einem Frame der Kontext, auf dem `frame()` aufgerufen wurde (bzw. der dazwischenliegende Frame bei tiefer verschachtelten Frames). `undefined` für einen Tab oder ein Fenster. |
| `browser` | `Browser` | Das [Browser-Objekt](/docs/api/browser) der Session. |
| `request` | `Request \| undefined` | Ladeinformationen der letzten Navigation über `browser.url()` oder `navigate()`: URL, Header, Antwort, Weiterleitungen und die Requests, die die Seite gestellt hat. |
| `sessionId` | `String` | Session-ID, identisch mit `browser.sessionId`. |
| `capabilities` | `Object` | Session-Capabilities, identisch mit `browser.capabilities`. |
| `options` | `Object` | WebdriverIO-Optionen, identisch mit `browser.options`. |
| `isBidi` | `Boolean` | Ob die Session WebDriver BiDi verwendet. |
| `isMobile` | `Boolean` | Ob die Session ein mobiles Gerät automatisiert. |

## Methoden

### Befehle eines Browsing Contexts

Diese Befehle wirken auf den Kontext, auf dem sie aufgerufen werden. Jeder hat eine eigene Referenzseite.

| Befehl | Details |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Einen Frame dieses Kontexts als eigenen Browsing Context erhalten. |
| [`navigate`](/docs/api/browsingContext/navigate) | Diesen Kontext navigieren, mit denselben Optionen wie `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Diesen Kontext neu laden. Ein Frame lädt nur sein eigenes Dokument neu. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Durch den Verlauf dieses Tabs oder Fensters navigieren. |
| [`activate`](/docs/api/browsingContext/activate) | Diesen Tab bzw. dieses Fenster in den Vordergrund bringen. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Diesen Tab bzw. dieses Fenster schließen. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Den Titel oder die URL des in diesem Kontext angezeigten Dokuments auslesen. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Den in diesem Kontext geöffneten Benutzer-Prompt beantworten oder auslesen. |

### Browser-Befehle, die in einem Kontext ausgeführt werden

Dies sind die gleichnamigen [Browser-Befehle](/docs/api/browser), angewendet auf diesen Kontext statt auf den ersten Kontext der Session. Sie nehmen dieselben Argumente entgegen.

| Befehl | In einem Browsing Context |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Elemente im Dokument dieses Kontexts finden. |
| [`execute`](/docs/api/browser/execute) | Ein Skript im Dokument dieses Kontexts ausführen. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Eingaben an diesen Kontext senden, auch wenn er ein Hintergrund-Tab ist. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Diesen Kontext erfassen. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Die Cookies der Storage-Partition dieses Kontexts lesen und ändern. |
| [`setViewport`](/docs/api/browser/setViewport) | Die Größe des Viewports dieses Tabs oder Fensters ändern. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Ein Skript vor den Seitenskripten ausführen, nur in diesem Tab bzw. Fenster. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Nur die Requests dieses Tabs bzw. Fensters mocken. Ein Mock endet, wenn sein Tab geschlossen wird. |
| [`emulate`](/docs/api/browser/emulate) | Eine Geräteeigenschaft, z. B. Geolocation oder die Uhr, nur in diesem Tab bzw. Fenster emulieren. |
| [`restore`](/docs/api/browser/restore) | Emulationen wiederherstellen, identisch mit `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | Identisch mit dem Browser. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // Requests von `tab` erhalten die gemockte Antwort, Requests von `page` erreichen den Server
})
```

### Nur Top-Level {#top-level-only}

Ein Frame teilt Verlauf, Viewport, Netzwerk und Emulation mit seinem Tab, daher werden diese Befehle auf einem Frame mit `` `<command>` is only available on a top-level browsing context `` abgelehnt. Rufe sie auf dem Tab auf: `frame.parent`, bis `parent` `undefined` ist, oder der Kontext, auf dem du `frame()` aufgerufen hast.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### Nicht auf einem Browsing Context verfügbar

Session-Befehle wie `deleteSession`, `newWindow` oder `browsingContexts` gibt es nur auf dem [Browser-Objekt](/docs/api/browser). Dasselbe gilt für Custom Commands: [`addCommand`](/docs/customcommands) und `overwriteCommand` werden auf einem Kontext abgelehnt – registriere sie auf `browser`.

### Events

`on`, `once`, `off`, `emit`, `removeListener` und `removeAllListeners` registrieren Listener auf dem Browser, daher handelt es sich um die Events der gesamten Session. Zum Beispiel wird ein [`dialog`](/docs/api/dialog)-Event für einen Prompt in jedem beliebigen Tab oder Frame ausgelöst.

## Elemente eines Browsing Contexts

Ein Element, das du über einen Kontext erhältst, gehört zu diesem Kontext. Element-Befehle wie `click`, `setValue` oder `getText` werden im Dokument dieses Kontexts ausgeführt, auch wenn es sich um einen Hintergrund-Tab oder einen Frame handelt. Sie folgen der WebDriver-Spezifikation wie die Treiber, liefern also dieselben Ergebnisse und dieselben Fehler (z. B. `element click intercepted`) wie für ein Element der Seite im Vordergrund. `getComputedRole` und `getComputedLabel` werden für ein Element eines anderen Kontexts als des ersten Kontexts der Session abgelehnt.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // gibt aus: "BOTTOM"
```

## Fehlerbehebung

| Fehler | Ursache und Lösung |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Rufe [`frame()`](/docs/api/browsingContext/frame) auf dem von `browser.url()` oder `browser.newWindow()` zurückgegebenen Kontext auf. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Behalte den von `browser.url()` oder `browser.newWindow()` zurückgegebenen Kontext oder finde einen mit `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | Die Session ist eine Classic-Session (z. B. Appium oder Safari). Verwende den Classic-Befehl, den die Meldung nennt. |
| `` `<command>` is only available on a top-level browsing context `` | Der Befehl wurde auf einem Frame aufgerufen. Rufe ihn auf dem Tab des Frames auf, siehe [Nur Top-Level](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Registriere Custom Commands auf `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | Die Seite, die den Frame enthielt, hat navigiert. Hole den Frame erneut mit `frame()` auf der neuen Seite. |

## Verwandte Themen

- [Das Browser-Objekt](/docs/api/browser)
- [Migration zu v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Dialoge](/docs/api/dialog)