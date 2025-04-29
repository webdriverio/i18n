---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---



Beim Schreiben von Tests müssen Sie oft überprüfen, ob Werte bestimmte Bedingungen erfüllen. `expect` gibt Ihnen Zugriff auf eine Reihe von "Matchern", mit denen Sie verschiedene Dinge auf dem `browser`, einem `element` oder `mock` Objekt validieren können.

## Standardoptionen

Diese Standardoptionen unten sind mit den [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) und [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) Optionen in der Konfiguration verbunden.

Setzen Sie die Optionen unten nur, wenn Sie für Ihre Assertions bestimmte Timeouts festlegen möchten.

```js
{
    wait: 2000, // ms to wait for expectation to succeed
    interval: 100, // interval between attempts
}
```

Wenn Sie andere Timeouts und Intervalle wählen möchten, setzen Sie diese Optionen wie folgt:

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### Matcher-Optionen

Jeder Matcher kann mehrere Optionen annehmen, die es Ihnen ermöglichen, die Assertion zu modifizieren:

##### Befehlsoptionen

| Name | Type | Details |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | Zeit in ms, die gewartet werden soll, bis die Erwartung erfüllt ist. Standard: `3000` |
| <code><var>interval</var></code> | number | Intervall zwischen den Versuchen. Standard: `100` |
| <code><var>beforeAssertion</var></code> | function | Funktion, die vor der Assertion aufgerufen werden soll |
| <code><var>afterAssertion</var></code> | function | Funktion, die nach der Assertion aufgerufen werden soll und die Assertionsergebnisse enthält |
| <code><var>message</var></code> | string | Benutzernachricht, die vor dem Assertionsfehler angezeigt werden soll |

##### String-Optionen

Diese Option kann zusätzlich zu den Befehlsoptionen angewendet werden, wenn Strings überprüft werden.

| Name | Type | Details |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | wendet `toLowerCase` auf tatsächliche und erwartete Werte an |
| <code><var>trim</var></code> | boolean | wendet `trim` auf den tatsächlichen Wert an |
| <code><var>replace</var></code> | Replacer \| Replacer[] | ersetzt Teile des tatsächlichen Wertes, die mit der Zeichenfolge/RegExp übereinstimmen. Der Replacer kann eine Zeichenfolge oder eine Funktion sein. |
| <code><var>containing</var></code> | boolean | erwartet, dass der tatsächliche Wert den erwarteten Wert enthält, sonst streng gleich. |
| <code><var>asString</var></code> | boolean | kann hilfreich sein, um die Eigenschaftswerte in Strings umzuwandeln |
| <code><var>atStart</var></code> | boolean | erwartet, dass der tatsächliche Wert mit dem erwarteten Wert beginnt |
| <code><var>atEnd</var></code> | boolean | erwartet, dass der tatsächliche Wert mit dem erwarteten Wert endet |
| <code><var>atIndex</var></code> | number | erwartet, dass der tatsächliche Wert den erwarteten Wert an der angegebenen Position hat |

##### Zahlenoptionen

Diese Option kann zusätzlich zu den Befehlsoptionen angewendet werden, wenn Zahlen überprüft werden.

| Name | Type | Details |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | gleich |
| <code><var>lte</var></code> | number | kleiner oder gleich |
| <code><var>gte</var></code> | number | größer oder gleich |

### Umgang mit HTML-Entitäten

Eine HTML-Entität ist ein Textstück ("string"), das mit einem Kaufmanns-Und (`&`) beginnt und mit einem Semikolon (`;`) endet. Entitäten werden häufig verwendet, um reservierte Zeichen (die sonst als HTML-Code interpretiert würden) und unsichtbare Zeichen (wie geschützte Leerzeichen, z.B. `&nbsp;`) anzuzeigen.

Um ein solches Element zu finden oder damit zu interagieren, verwenden Sie das Unicode-Äquivalent der Entität. z.B.:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

Alle Unicode-Referenzen finden Sie in der [HTML-Spezifikation](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**Hinweis:** Unicode ist case-insensitive, daher funktionieren sowohl `\u00a0` als auch `\u00A0`. Um ein Element im Browser zu finden, entfernen Sie `u` aus dem Unicode, z.B.: `div[data="Some\00a0Value"]`

## Browser-Matcher

### toHaveUrl

Prüft, ob der Browser sich auf einer bestimmten Seite befindet.

##### Verwendung

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### Verwendung

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

Prüft, ob die Website einen bestimmten Titel hat.

##### Verwendung

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

Prüft, ob der Browser einen bestimmten Text in der Zwischenablage gespeichert hat.

##### Verwendung

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Element-Matcher

### toBeDisplayed

Ruft [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) für das gegebene Element auf.

##### Verwendung

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

Ruft [`isExisting`](https://webdriver.io/docs/api/element/isExisting) für das gegebene Element auf.

##### Verwendung

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

Gleich wie `toExist`.

##### Verwendung

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

Gleich wie `toExist`.

##### Verwendung

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

Prüft, ob das Element den Fokus hat. Diese Assertion funktioniert nur in einem Web-Kontext.

##### Verwendung

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

Prüft, ob ein Element ein bestimmtes Attribut mit einem bestimmten Wert hat.

##### Verwendung

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

Gleich wie `toHaveAttribute`.

##### Verwendung

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

Prüft, ob ein Element einen einzelnen Klassennamen hat. Kann auch mit einem Array als Parameter aufgerufen werden, wenn das Element mehrere Klassennamen haben kann.

##### Verwendung

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

Prüft, ob ein Element eine bestimmte Eigenschaft hat.

##### Verwendung

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

Prüft, ob ein Eingabeelement einen bestimmten Wert hat.

##### Verwendung

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

Prüft, ob ein Element angeklickt werden kann, indem [`isClickable`](https://webdriver.io/docs/api/element/isClickable) für das Element aufgerufen wird.

##### Verwendung

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

Prüft, ob ein Element deaktiviert ist, indem [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) für das Element aufgerufen wird.

##### Verwendung

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// same as
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

Prüft, ob ein Element aktiviert ist, indem [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) für das Element aufgerufen wird.

##### Verwendung

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// same as
await expect(elem).not.toBeDisabled()
```

### toBeSelected

Prüft, ob ein Element ausgewählt ist, indem [`isSelected`](https://webdriver.io/docs/api/element/isSelected) für das Element aufgerufen wird.

##### Verwendung

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

Gleich wie `toBeSelected`.

##### Verwendung

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

Prüft, ob ein Element ein bestimmtes berechnetes WAI-ARIA-Label hat. Kann auch mit einem Array als Parameter aufgerufen werden, falls das Element verschiedene Labels haben kann.

##### Verwendung

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### Verwendung

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

Prüft, ob ein Element eine bestimmte berechnete WAI-ARIA-Rolle hat. Kann auch mit einem Array als Parameter aufgerufen werden, falls das Element verschiedene Labels haben kann.

##### Verwendung

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### Verwendung

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

Prüft, ob ein Link-Element ein bestimmtes Link-Ziel hat.

##### Verwendung

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

Gleich wie `toHaveHref`.

##### Verwendung

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

Prüft, ob ein Element ein bestimmtes `id`-Attribut hat.

##### Verwendung

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

Prüft, ob ein Element einen bestimmten Text hat. Kann auch mit einem Array als Parameter aufgerufen werden, falls das Element verschiedene Texte haben kann.

##### Verwendung

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

Für den Fall, dass sich in dem div unten eine Liste von Elementen befindet:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

Sie können diese mit einem Array überprüfen:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

Prüft, ob ein Element einen bestimmten Text hat. Kann auch mit einem Array als Parameter aufgerufen werden, falls das Element verschiedene Texte haben kann.

##### Verwendung

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### Verwendung

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

Prüft, ob ein Element innerhalb des Viewports ist, indem [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) für das Element aufgerufen wird.

##### Verwendung

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

Prüft die Anzahl der abgerufenen Kindelemente, indem der Befehl `element.$('./*')` aufgerufen wird.

##### Verwendung

```js
const list = await $('ul')
await expect(list).toHaveChildren() // the list has at least one item
// same as
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // the list has 3 items
// same as 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

Prüft, ob ein Element eine bestimmte Breite hat.

##### Verwendung

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

Prüft, ob ein Element eine bestimmte Höhe hat.

##### Verwendung

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

Prüft, ob ein Element eine bestimmte Größe hat.

##### Verwendung

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

Prüft die Anzahl der abgerufenen Elemente mit dem [`$$`](https://webdriver.io/docs/api/element/$) Befehl.

**Hinweis:** Dieser Matcher aktualisiert das übergebene Array mit den neuesten Elementen, wenn die Assertion erfolgreich ist. Wenn Sie die Variable jedoch neu zugewiesen haben, müssen Sie die Elemente erneut abrufen.

##### Verwendung

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 items in the list

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// same as
assert.ok(listItems.length <= 10)
```

## Netzwerk-Matcher

### toBeRequested

Prüft, ob ein Mock aufgerufen wurde

##### Verwendung

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

Prüft, ob ein Mock für die erwartete Anzahl von Malen aufgerufen wurde

##### Verwendung

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // request called at least 5 times but less than 11
```

### toBeRequestedWith

Prüft, ob ein Mock entsprechend den erwarteten Optionen aufgerufen wurde.

Die meisten Optionen unterstützen expect/jasmine-Partial-Matcher wie [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### Verwendung

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [optional] string | function | custom matcher
    method: 'POST',                                 // [optional] string | array
    statusCode: 200,                                // [optional] number | array
    requestHeaders: { Authorization: 'foo' },       // [optional] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [optional] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [optional] object | function | custom matcher
    response: { success: true },                    // [optional] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // either POST or PUT
    statusCode: [401, 403],  // either 401 or 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Snapshot-Matcher

WebdriverIO unterstützt sowohl grundlegende Snapshot-Tests als auch DOM-Snapshot-Tests.

### toMatchSnapshot

Prüft, ob ein beliebiges Objekt mit einem bestimmten Wert übereinstimmt. Wenn Sie ein [`WebdriverIO.Element`](https://webdriver.io/docs/api/element) übergeben, wird automatisch ein Snapshot des [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) Zustands erstellt.

##### Verwendung

```js
// snapshot arbitrary objects (no "await" needed here)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot `outerHTML` of WebdriverIO.Element (DOM snapshot, requires "await")
await expect($('elem')).toMatchSnapshot()
// snapshot result of element command
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

Ähnlich können Sie `toMatchInlineSnapshot()` verwenden, um den Snapshot inline in der Testdatei zu speichern. Zum Beispiel:

```js
await expect($('img')).toMatchInlineSnapshot()
```

Anstatt eine Snapshot-Datei zu erstellen, modifiziert WebdriverIO die Testdatei direkt, um den Snapshot als String zu aktualisieren:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Visuelle Snapshot-Matcher

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

Die folgenden Matcher sind als Teil des `@wdio/visual-service`-Plugins implementiert und nur verfügbar, wenn der Service eingerichtet ist. Stellen Sie sicher, dass Sie die [Einrichtungsanweisungen](https://webdriver.io/docs/visual-testing) entsprechend befolgen.

### toMatchElementSnapshot

Prüft, ob das gegebene Element mit dem Snapshot der Baseline übereinstimmt.

##### Verwendung

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // options
})
```

Das erwartete Ergebnis ist standardmäßig `0`, so dass Sie die gleiche Assertion wie folgt schreiben können:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // options
})
```

oder überhaupt keine Optionen übergeben:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

Prüft, ob der aktuelle Bildschirm mit dem Snapshot der Baseline übereinstimmt.

##### Verwendung

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // options
})
```

Das erwartete Ergebnis ist standardmäßig `0`, so dass Sie die gleiche Assertion wie folgt schreiben können:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // options
})
```

oder überhaupt keine Optionen übergeben:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

Prüft, ob der vollständige Seitenscreenshot mit dem Snapshot der Baseline übereinstimmt.

##### Verwendung

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // options
})
```

Das erwartete Ergebnis ist standardmäßig `0`, so dass Sie die gleiche Assertion wie folgt schreiben können:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // options
})
```

oder überhaupt keine Optionen übergeben:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

Prüft, ob der vollständige Seitenscreenshot einschließlich Tab-Markierungen mit dem Snapshot der Baseline übereinstimmt.

##### Verwendung

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // options
})
```

Das erwartete Ergebnis ist standardmäßig `0`, so dass Sie die gleiche Assertion wie folgt schreiben können:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // options
})
```

oder überhaupt keine Optionen übergeben:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## Verwendung von regulären Ausdrücken

Sie können auch direkt reguläre Ausdrücke für alle Matcher verwenden, die Textvergleiche durchführen.

##### Verwendung

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Standard-Matcher

Zusätzlich zu den `expect-webdriverio`-Matchern können Sie die eingebauten [expect](https://jestjs.io/docs/en/expect)-Assertions von Jest oder [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) für Jasmine verwenden.

## Asymmetrische Matcher

WebdriverIO unterstützt die Verwendung von asymmetrischen Matchern überall dort, wo Sie Textwerte vergleichen, z.B.:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

oder

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

Wenn Sie den [WDIO Testrunner](https://webdriver.io/docs/clioptions) verwenden, wird alles automatisch eingerichtet. Folgen Sie einfach der [Einrichtungsanleitung](https://webdriver.io/docs/typescript#framework-setup) aus der Dokumentation. Wenn Sie WebdriverIO jedoch mit einem anderen Testrunner oder in einem einfachen Node.js-Skript ausführen, müssen Sie `expect-webdriverio` zu `types` in der `tsconfig.json` hinzufügen.

- `"expect-webdriverio"` für alle außer Jasmine/Jest-Benutzer.
- `"expect-webdriverio/jasmine"` für Jasmine
- `"expect-webdriverio/jest"` für Jest

## JavaScript (VSCode)

Es ist erforderlich, eine `jsconfig.json` im Projektstamm zu erstellen und auf die Typdefinitionen zu verweisen, damit die automatische Vervollständigung in Vanilla-JS funktioniert.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## Hinzufügen eigener Matcher

Ähnlich wie `expect-webdriverio` die Jasmine/Jest-Matcher erweitert, ist es möglich, eigene Matcher hinzuzufügen.

- Für Jasmine siehe die Dokumentation zu [custom matchers](https://jasmine.github.io/2.5/custom_matcher.html)
- Für alle anderen siehe [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) von Jest

Benutzerdefinierte Matcher sollten im wdio `before`-Hook hinzugefügt werden

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - Jest example
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Temporary workaround. See https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```