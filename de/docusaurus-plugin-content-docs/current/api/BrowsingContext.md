---
id: browsingContext
title: Das BrowsingContext-Objekt
description: Halten Sie einen Tab, ein Fenster oder einen Frame als Objekt und führen Sie Befehle direkt darin aus, ohne die Session dorthin zu wechseln.
---

Ein Browsing Context ist ein Tab, ein Fenster oder ein Frame, den Sie als Objekt halten. Befehle, die Sie darauf aufrufen, werden in diesem Tab oder Frame ausgeführt, während die Session und alle anderen Contexts bleiben, wo sie sind. Seit v10 arbeitet WebdriverIO auf diese Weise mit Tabs, Fenstern und Frames in einer WebDriver-BiDi-Session und ersetzt dort `switchWindow()` und `switchFrame()`.

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
| [`browser.url(url)`](/docs/api/browser/url) | Der erste Top-Level-Context der Session, nachdem zu der URL navigiert wurde. `browser.url()` navigiert immer diesen Context. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | Ein neuer Tab (`type: 'tab'`) oder ein neues Fenster, sobald die Seite geladen ist. Die Session wechselt nicht dorthin. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Alle geöffneten Top-Level-Contexts (Tabs und Fenster, keine Frames), z. B. einen Tab, den die Seite selbst geöffnet hat. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | Ein Frame eines Contexts, auch Cross-Origin- und verschachtelte Frames. |

Behalten Sie das Objekt und rufen Sie Befehle darauf auf. Es gibt keinen „aktuellen“ Tab oder Frame, zwischen dem gewechselt werden müsste, daher können Contexts auch parallel verwendet werden:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## WebDriver-BiDi- und Classic-Sessions

Browsing Contexts benötigen eine WebDriver-BiDi-Session, die seit v10 der Standard für Chrome, Edge und Firefox ist. In einer WebDriver-Classic-Session, z. B. mit Appium oder Safari, gibt es nur den aktuellen Context der Session. Dort gilt:

- `browser.url()` gibt einen Platzhalter für den Browser zurück. Befehle wie `$`, `execute` oder `getTitle` werden auf dem Browser ausgeführt, `url`, `isFrame` und `parent` beschreiben die aktuelle Seite, und `contextId` ist `undefined`.
- `frame()`, `navigate()` und `activate()` werden abgelehnt und nennen den stattdessen zu verwendenden Classic-Befehl: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) oder [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Prüfen Sie `browser.isBidi`, wenn derselbe Code in beiden Arten von Sessions läuft.

## Eigenschaften

| Name | Typ | Details |
| ---- | ---- | ------- |
| `contextId` | `String` | Die ID des WebDriver-BiDi-Browsing-Contexts. `undefined` in einer Classic-Session. |
| `url` | `String` | Die URL, zu der der Context zuletzt mit `browser.url()`, `navigate()` oder `newWindow()` navigiert wurde. Navigationen, die die Seite selbst durchführt (Links, `location`, `history.pushState`), werden erst nach [`getUrl()`](/docs/api/browsingContext/getUrl) sichtbar. |
| `isFrame` | `Boolean` | `true` für einen Frame, `false` für einen Tab oder ein Fenster. |
| `parent` | `BrowsingContext \| undefined` | Bei einem Frame der Context, auf dem `frame()` aufgerufen wurde (bzw. der dazwischenliegende Frame bei tiefer verschachtelten Frames). `undefined` für einen Tab oder ein Fenster. |
| `browser` | `Browser` | Das [Browser-Objekt](/docs/api/browser) der Session. |
| `request` | `Request \| undefined` | Ladeinformationen der letzten Navigation über `browser.url()` oder `navigate()`: URL, Header, Response, Weiterleitungen und die Requests, die die Seite gestellt hat. |
| `sessionId` | `String` | Session-ID, identisch mit `browser.sessionId`. |
| `capabilities` | `Object` | Session-Capabilities, identisch mit `browser.capabilities`. |
| `options` | `Object` | WebdriverIO-Optionen, identisch mit `browser.options`. |
| `isBidi` | `Boolean` | Ob die Session WebDriver BiDi verwendet. |
| `isMobile` | `Boolean` | Ob die Session ein mobiles Gerät automatisiert. |

## Methoden

### Befehle eines Browsing Contexts

Diese Befehle wirken auf den Context, auf dem sie aufgerufen werden. Jeder hat seine eigene Referenzseite.

| Befehl | Details |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Einen Frame dieses Contexts als eigenen Browsing Context erhalten. |
| [`navigate`](/docs/api/browsingContext/navigate) | Diesen Context navigieren, mit denselben Optionen wie `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Diesen Context neu laden. Ein Frame lädt nur sein eigenes Dokument neu. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Durch den Verlauf dieses Tabs oder Fensters navigieren. |
| [`activate`](/docs/api/browsingContext/activate) | Diesen Tab bzw. dieses Fenster in den Vordergrund bringen. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Diesen Tab bzw. dieses Fenster schließen. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Den Titel oder die URL des in diesem Context angezeigten Dokuments auslesen. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Den in diesem Context geöffneten Benutzerdialog beantworten oder auslesen. |

### Browser-Befehle, die in einem Context ausgeführt werden

Dies sind die gleichnamigen [Browser-Befehle](/docs/api/browser), angewendet auf diesen Context statt auf den ersten Context der Session. Sie akzeptieren dieselben Argumente.

| Befehl | In einem Browsing Context |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Elemente im Dokument dieses Contexts finden. |
| [`execute`](/docs/api/browser/execute) | Ein Skript im Dokument dieses Contexts ausführen. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Eingaben an diesen Context senden, auch wenn es sich um einen Hintergrund-Tab handelt. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Diesen Context erfassen. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Die Cookies der Storage-Partition dieses Contexts lesen und ändern. |
| [`setViewport`](/docs/api/browser/setViewport) | Die Größe des Viewports dieses Tabs oder Fensters ändern. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Ein Skript vor den Seitenskripten ausführen, nur in diesem Tab oder Fenster. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Nur die Requests dieses Tabs oder Fensters mocken. Ein Mock endet, wenn sein Tab geschlossen wird. |
| [`emulate`](/docs/api/browser/emulate) | Eine Geräteeigenschaft, z. B. Geolocation oder die Uhr, nur in diesem Tab oder Fenster emulieren. |
| [`restore`](/docs/api/browser/restore) | Emulationen zurücksetzen, identisch mit `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | Identisch mit dem Verhalten auf dem Browser. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // Requests von `tab` erhalten die gemockte Response, Requests von `page` erreichen den Server
})
```

### Nur Top-Level {#top-level-only}

Ein Frame teilt Verlauf, Viewport, Netzwerk und Emulation mit seinem Tab, daher werden diese Befehle auf einem Frame mit `` `<command>` is only available on a top-level browsing context `` abgelehnt. Rufen Sie sie auf dem Tab auf: `frame.parent`, bis `parent` `undefined` ist, oder der Context, auf dem Sie `frame()` aufgerufen haben.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### Nicht auf einem Browsing Context verfügbar

Session-Befehle wie `deleteSession`, `newWindow` oder `browsingContexts` gibt es nur auf dem [Browser-Objekt](/docs/api/browser). Dasselbe gilt für benutzerdefinierte Befehle: [`addCommand`](/docs/customcommands) und `overwriteCommand` werden auf einem Context abgelehnt; registrieren Sie sie auf `browser`.

### Events

`on`, `once`, `off`, `emit`, `removeListener` und `removeAllListeners` registrieren Listener auf dem Browser, daher handelt es sich um die Events der gesamten Session. Beispielsweise wird ein [`dialog`](/docs/api/dialog)-Event für einen Dialog in jedem beliebigen Tab oder Frame ausgelöst.

## Elemente eines Browsing Contexts

Ein Element, das Sie über einen Context erhalten, gehört zu diesem Context. Element-Befehle wie `click`, `setValue` oder `getText` werden im Dokument dieses Contexts ausgeführt, auch wenn es sich um einen Hintergrund-Tab oder einen Frame handelt. Sie folgen wie die Treiber der WebDriver-Spezifikation und liefern daher dieselben Ergebnisse und dieselben Fehler (z. B. `element click intercepted`) wie für ein Element der Seite im Vordergrund. `getComputedRole` und `getComputedLabel` werden für ein Element abgelehnt, das zu einem anderen Context als dem ersten Context der Session gehört.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // gibt aus: "BOTTOM"
```

## Fehlerbehebung

| Fehler | Ursache und Lösung |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Rufen Sie [`frame()`](/docs/api/browsingContext/frame) auf dem Context auf, der von `browser.url()` oder `browser.newWindow()` zurückgegeben wird. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Behalten Sie den von `browser.url()` oder `browser.newWindow()` zurückgegebenen Context, oder finden Sie einen mit `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | Die Session ist eine Classic-Session (z. B. Appium oder Safari). Verwenden Sie den in der Meldung genannten Classic-Befehl. |
| `` `<command>` is only available on a top-level browsing context `` | Der Befehl wurde auf einem Frame aufgerufen. Rufen Sie ihn auf dem Tab des Frames auf, siehe [Nur Top-Level](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Registrieren Sie benutzerdefinierte Befehle auf `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | Die Seite, die den Frame enthielt, hat weg navigiert. Holen Sie den Frame mit `frame()` auf der neuen Seite erneut. |

## Verwandte Themen

- [Das Browser-Objekt](/docs/api/browser)
- [Migration zu v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Dialoge](/docs/api/dialog)