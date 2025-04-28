---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


När du skriver tester behöver du ofta kontrollera att värden uppfyller vissa villkor. `expect` ger dig tillgång till ett antal "matchers" som låter dig validera olika saker på `browser`, ett `element` eller `mock`-objekt.

## Standardalternativ

Dessa standardalternativ nedan är kopplade till [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) och [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) alternativ som anges i konfigurationen.

Ställ bara in alternativen nedan om du vill vänta på specifika timeouts för dina påståenden.

```js
{
    wait: 2000, // ms att vänta på att förväntan ska lyckas
    interval: 100, // intervall mellan försök
}
```

Om du vill välja olika timeouts och intervall, ställ in dessa alternativ så här:

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

### Matcher-alternativ

Varje matcher kan ta flera alternativ som låter dig modifiera påståendet:

##### Kommandalternativ

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | tid i ms att vänta på att förväntan ska lyckas. Standard: `3000` |
| <code><var>interval</var></code> | number | intervall mellan försök. Standard: `100` |
| <code><var>beforeAssertion</var></code> | function | funktion som ska anropas innan påståendet görs |
| <code><var>afterAssertion</var></code> | function | funktion som ska anropas efter att påståendet gjorts innehållande påståenderesultat |
| <code><var>message</var></code> | string | användarmeddelande att lägga till före påståendefel |

##### Strängalternativ

Detta alternativ kan tillämpas utöver kommandalternativen när strängar påstås. 

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | tillämpa `toLowerCase` på både faktiska och förväntade värden |
| <code><var>trim</var></code> | boolean | tillämpa `trim` på faktiskt värde |
| <code><var>replace</var></code> | Replacer \| Replacer[] | ersätt delar av det faktiska värdet som matchar strängen/RegExp. Ersättaren kan vara en sträng eller en funktion.
| <code><var>containing</var></code> | boolean | förväntar sig att faktiskt värde innehåller förväntat värde, annars strikt lika. |
| <code><var>asString</var></code> | boolean | kan vara till hjälp för att tvinga konvertering av egenskapsvärde till sträng |
| <code><var>atStart</var></code> | boolean | förväntar sig att faktiskt värde börjar med det förväntade värdet |
| <code><var>atEnd</var></code> | boolean | förväntar sig att faktiskt värde slutar med det förväntade värdet |
| <code><var>atIndex</var></code> | number | förväntar sig att faktiskt värde har det förväntade värdet vid det givna indexet |

##### Nummeralternativ

Detta alternativ kan tillämpas utöver kommandalternativen när nummer påstås.

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | lika med |
| <code><var>lte</var></code> | number | mindre än eller lika med |
| <code><var>gte</var></code> | number | större än eller lika med |

### Hantering av HTML-entiteter

En HTML-entitet är en bit text ("sträng") som börjar med ett et-tecken (`&`) och slutar med ett semikolon (`;`). Entiteter används ofta för att visa reserverade tecken (som annars skulle tolkas som HTML-kod) och osynliga tecken (som icke-brytande mellanslag, t.ex. `&nbsp;`).

För att hitta eller interagera med ett sådant element, använd unicode-ekvivalenten för entiteten, t.ex.:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

Du kan hitta alla unicode-referenser i [HTML-specifikationen](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**Obs:** unicode är skiftlägesokänsligt, därför fungerar både `\u00a0` och `\u00A0`. För att hitta element i webbläsarens inspektion, ta bort `u` från unicode, t.ex.: `div[data="Some\00a0Value"]`

## Webbläsarmatcher

### toHaveUrl

Kontrollerar om webbläsaren är på en specifik sida.

##### Användning

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### Användning

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

Kontrollerar om webbplatsen har en specifik titel.

##### Användning

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

Kontrollerar om webbläsaren har en specifik text lagrad i sin urklippshanterare.

##### Användning

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Element-matcher

### toBeDisplayed

Anropar [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) på det givna elementet.

##### Användning

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

Anropar [`isExisting`](https://webdriver.io/docs/api/element/isExisting) på det givna elementet.

##### Användning

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

Samma som `toExist`.

##### Användning

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

Samma som `toExist`.

##### Användning

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

Kontrollerar om elementet har fokus. Denna kontroll fungerar endast i en webbkontext.

##### Användning

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

Kontrollerar om ett element har ett visst attribut med ett specifikt värde.

##### Användning

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

Samma som `toHaveAttribute`.

##### Användning

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

Kontrollerar om ett element har ett enskilt klassnamn. Kan också anropas med en array som parameter när elementet kan ha flera klassnamn.

##### Användning

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

Kontrollerar om ett element har en viss egenskap.

##### Användning

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

Kontrollerar om ett input-element har ett visst värde.

##### Användning

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

Kontrollerar om ett element kan klickas genom att anropa [`isClickable`](https://webdriver.io/docs/api/element/isClickable) på elementet.

##### Användning

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

Kontrollerar om ett element är inaktiverat genom att anropa [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) på elementet.

##### Användning

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// samma som
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

Kontrollerar om ett element är aktiverat genom att anropa [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) på elementet.

##### Användning

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// samma som
await expect(elem).not.toBeDisabled()
```

### toBeSelected

Kontrollerar om ett element är aktiverat genom att anropa [`isSelected`](https://webdriver.io/docs/api/element/isSelected) på elementet.

##### Användning

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

Samma som `toBeSelected`.

##### Användning

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

Kontrollerar om elementet har en specifik beräknad WAI-ARIA-etikett. Kan också anropas med en array som parameter i fall där elementet kan ha olika etiketter.

##### Användning

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### Användning

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

Kontrollerar om elementet har en specifik beräknad WAI-ARIA-roll. Kan också anropas med en array som parameter i fall där elementet kan ha olika etiketter.

##### Användning

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### Användning

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

Kontrollerar om länkelementet har ett specifikt länkmål.

##### Användning

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

Samma som `toHaveHref`.

##### Användning

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

Kontrollerar om elementet har ett specifikt `id`-attribut.

##### Användning

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

Kontrollerar om elementet har en specifik text. Kan också anropas med en array som parameter i fall där elementet kan ha olika texter.

##### Användning

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

Om det finns en lista med element i div:en nedan:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

Du kan kontrollera dem med en array:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

Kontrollerar om elementet har en specifik text. Kan också anropas med en array som parameter i fall där elementet kan ha olika texter.

##### Användning

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### Användning

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

Kontrollerar om ett element är inom visningsområdet genom att anropa [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) på elementet.

##### Användning

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

Kontrollerar antalet barn till det hämtade elementet genom att anropa kommandot `element.$('./*')`.

##### Användning

```js
const list = await $('ul')
await expect(list).toHaveChildren() // listan har minst ett objekt
// samma som
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // listan har 3 objekt
// samma som 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

Kontrollerar om elementet har en specifik bredd.

##### Användning

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

Kontrollerar om elementet har en specifik höjd.

##### Användning

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

Kontrollerar om elementet har en specifik storlek.

##### Användning

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

Kontrollerar antalet hämtade element med kommandot [`$$`](https://webdriver.io/docs/api/element/$).

**Obs:** Denna matcher kommer att uppdatera den passerade arrayen med de senaste elementen om kontrollen godkänns. Men om du har tilldelat variabeln igen måste du hämta elementen igen.

##### Användning

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 objekt i listan

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// samma som
assert.ok(listItems.length <= 10)
```

## Nätverksmatcher

### toBeRequested

Kontrollerar att mock anropades

##### Användning

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

Kontrollerar att mock anropades förväntat antal gånger

##### Användning

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // förfrågan anropades minst 5 gånger men mindre än 11
```

### toBeRequestedWith

Kontrollerar att mock anropades enligt de förväntade alternativen.

De flesta alternativ stöder expect/jasmine partiella matchers som [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### Användning

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [valfritt] sträng | funktion | anpassad matcher
    method: 'POST',                                 // [valfritt] sträng | array
    statusCode: 200,                                // [valfritt] nummer | array
    requestHeaders: { Authorization: 'foo' },       // [valfritt] objekt | funktion | anpassad matcher
    responseHeaders: { Authorization: 'bar' },      // [valfritt] objekt | funktion | anpassad matcher
    postData: { title: 'foo', description: 'bar' }, // [valfritt] objekt | funktion | anpassad matcher
    response: { success: true },                    // [valfritt] objekt | funktion | anpassad matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // antingen POST eller PUT
    statusCode: [401, 403],  // antingen 401 eller 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Snapshot-matcher

WebdriverIO stöder grundläggande snapshot-tester samt DOM-snapshot-testning.

### toMatchSnapshot

Kontrollerar om något godtyckligt objekt matchar ett visst värde. Om du skickar in ett [`WebdriverIO.Element`](https://webdriver.io/docs/api/element) kommer det automatiskt att ta en snapshot av dess [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML)-tillstånd.

##### Användning

```js
// snapshot godtyckliga objekt (inget "await" behövs här)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot `outerHTML` av WebdriverIO.Element (DOM-snapshot, kräver "await")
await expect($('elem')).toMatchSnapshot()
// snapshot resultat av elementkommando
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

På samma sätt kan du använda `toMatchInlineSnapshot()` för att lagra snapshoten inline i testfilen. Till exempel, givet:

```js
await expect($('img')).toMatchInlineSnapshot()
```

Istället för att skapa en snapshot-fil kommer WebdriverIO att ändra testfilen direkt för att uppdatera snapshoten som en sträng:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Visuella snapshot-matchers

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

Följande matchers är implementerade som en del av `@wdio/visual-service`-pluginet och är endast tillgängliga när tjänsten är konfigurerad. Se till att du följer [installationsanvisningarna](https://webdriver.io/docs/visual-testing) korrekt.

### toMatchElementSnapshot

Kontrollerar om det givna elementet matchar med snapshot av baslinjen.

##### Användning

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // alternativ
})
```

Det förväntade resultatet är som standard `0`, så du kan skriva samma påstående som:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // alternativ
})
```

eller inte skicka in några alternativ alls:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

Kontrollerar om den aktuella skärmen matchar med snapshot av baslinjen.

##### Användning

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // alternativ
})
```

Det förväntade resultatet är som standard `0`, så du kan skriva samma påstående som:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // alternativ
})
```

eller inte skicka in några alternativ alls:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

Kontrollerar om skärmavbildningen av hela sidan matchar med snapshot av baslinjen.

##### Användning

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // alternativ
})
```

Det förväntade resultatet är som standard `0`, så du kan skriva samma påstående som:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // alternativ
})
```

eller inte skicka in några alternativ alls:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

Kontrollerar om skärmavbildningen av hela sidan inklusive tabbmarkeringar matchar med snapshot av baslinjen.

##### Användning

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // alternativ
})
```

Det förväntade resultatet är som standard `0`, så du kan skriva samma påstående som:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // alternativ
})
```

eller inte skicka in några alternativ alls:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## Använda reguljära uttryck

Du kan också direkt använda reguljära uttryck för alla matcher som gör textjämförelse.

##### Användning

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Standardmatcher

Utöver `expect-webdriverio`-matcher kan du använda inbyggda Jest's [expect](https://jestjs.io/docs/en/expect)-påståenden eller [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) för Jasmine.

## Asymmetriska matcher

WebdriverIO stöder användning av asymmetriska matcher överallt där du jämför textvärden, t.ex.:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

eller

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

Om du använder [WDIO Testrunner](https://webdriver.io/docs/clioptions) kommer allt att ställas in automatiskt. Följ bara [installationsguiden](https://webdriver.io/docs/typescript#framework-setup) från dokumentationen. Men om du kör WebdriverIO med en annan testrunner eller i ett enkelt Node.js-skript måste du lägga till `expect-webdriverio` till `types` i `tsconfig.json`.

- `"expect-webdriverio"` för alla utom Jasmine/Jest-användare.
- `"expect-webdriverio/jasmine"` Jasmine
- `"expect-webdriverio/jest"` Jest

## JavaScript (VSCode)

Det krävs att skapa `jsconfig.json` i projektets rot och referera till typdefinitionerna för att få autocomplete att fungera i vanlig js.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## Lägga till egna matcher

På liknande sätt som `expect-webdriverio` utökar Jasmine/Jest-matcher är det möjligt att lägga till anpassade matcher.

- Jasmine se [anpassade matcher](https://jasmine.github.io/2.5/custom_matcher.html) dokumentation
- Alla andra se Jests [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers)

Anpassade matcher bör läggas till i wdio's `before`-hook

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
// myMatchers.js - Jest-exempel
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Temporär lösning. Se https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```