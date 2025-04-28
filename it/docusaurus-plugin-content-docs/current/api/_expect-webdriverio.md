---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Quando scrivi test, spesso hai bisogno di verificare che i valori soddisfino determinate condizioni. `expect` ti dà accesso a una serie di "matcher" che ti permettono di validare diverse cose sul `browser`, un oggetto `element` o `mock`.

## Opzioni Predefinite

Queste opzioni predefinite sottostanti sono collegate alle opzioni [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) e [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) impostate nella configurazione.

Imposta le opzioni qui sotto solo se desideri attendere timeout specifici per le tue asserzioni.

```js
{
    wait: 2000, // ms di attesa per il successo dell'aspettativa
    interval: 100, // intervallo tra i tentativi
}
```

Se desideri scegliere timeout e intervalli diversi, imposta queste opzioni in questo modo:

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

### Opzioni dei Matcher

Ogni matcher può accettare diverse opzioni che ti permettono di modificare l'asserzione:

##### Opzioni dei Comandi

| Nome | Tipo | Dettagli |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | tempo in ms di attesa per il successo dell'aspettativa. Predefinito: `3000` |
| <code><var>interval</var></code> | number | intervallo tra i tentativi. Predefinito: `100` |
| <code><var>beforeAssertion</var></code> | function | funzione da chiamare prima di effettuare l'asserzione |
| <code><var>afterAssertion</var></code> | function | funzione da chiamare dopo aver effettuato l'asserzione contenente i risultati dell'asserzione |
| <code><var>message</var></code> | string | messaggio utente da anteporre all'errore di asserzione |

##### Opzioni delle Stringhe

Questa opzione può essere applicata in aggiunta alle opzioni dei comandi quando vengono confrontate stringhe.

| Nome | Tipo | Dettagli |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | applica `toLowerCase` sia ai valori effettivi che a quelli attesi |
| <code><var>trim</var></code> | boolean | applica `trim` al valore effettivo |
| <code><var>replace</var></code> | Replacer \| Replacer[] | sostituisce parti del valore effettivo che corrispondono alla stringa/RegExp. Il replacer può essere una stringa o una funzione.
| <code><var>containing</var></code> | boolean | si aspetta che il valore effettivo contenga il valore atteso, altrimenti uguaglianza stretta. |
| <code><var>asString</var></code> | boolean | potrebbe essere utile per forzare la conversione del valore della proprietà in stringa |
| <code><var>atStart</var></code> | boolean | si aspetta che il valore effettivo inizi con il valore atteso |
| <code><var>atEnd</var></code> | boolean | si aspetta che il valore effettivo finisca con il valore atteso |
| <code><var>atIndex</var></code> | number | si aspetta che il valore effettivo abbia il valore atteso all'indice dato |

##### Opzioni dei Numeri

Questa opzione può essere applicata in aggiunta alle opzioni dei comandi quando vengono confrontati numeri.

| Nome | Tipo | Dettagli |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | uguale a |
| <code><var>lte</var></code> | number | minore o uguale a |
| <code><var>gte</var></code> | number | maggiore o uguale a |

### Gestione delle Entità HTML

Un'entità HTML è un pezzo di testo ("stringa") che inizia con una e commerciale (`&`) e termina con un punto e virgola (`;`). Le entità sono spesso utilizzate per visualizzare caratteri riservati (che altrimenti sarebbero interpretati come codice HTML) e caratteri invisibili (come gli spazi non interrompibili, ad esempio `&nbsp;`).

Per trovare o interagire con un tale elemento, usa l'equivalente unicode dell'entità. Ad esempio:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

Puoi trovare tutti i riferimenti unicode nelle [specifiche HTML](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**Nota:** unicode non fa distinzione tra maiuscole e minuscole, quindi sia `\u00a0` che `\u00A0` funzionano. Per trovare l'elemento nell'ispezione del browser, rimuovi `u` dall'unicode, ad esempio: `div[data="Some\00a0Value"]`

## Matcher del Browser

### toHaveUrl

Controlla se il browser è su una pagina specifica.

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

Controlla se il sito web ha un titolo specifico.

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

Controlla se il browser ha un testo specifico memorizzato negli appunti.

##### Utilizzo

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Matcher degli Elementi

### toBeDisplayed

Chiama [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) sull'elemento dato.

##### Utilizzo

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

Chiama [`isExisting`](https://webdriver.io/docs/api/element/isExisting) sull'elemento dato.

##### Utilizzo

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

Uguale a `toExist`.

##### Utilizzo

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

Uguale a `toExist`.

##### Utilizzo

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

Controlla se l'elemento ha il focus. Questa asserzione funziona solo in un contesto web.

##### Utilizzo

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

Controlla se un elemento ha un certo attributo con un valore specifico.

##### Utilizzo

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

Uguale a `toHaveAttribute`.

##### Utilizzo

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

Controlla se un elemento ha un singolo nome di classe. Può anche essere chiamato con un array come parametro quando l'elemento può avere più nomi di classe.

##### Utilizzo

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

Controlla se un elemento ha una certa proprietà.

##### Utilizzo

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

Controlla se un elemento input ha un certo valore.

##### Utilizzo

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

Controlla se un elemento può essere cliccato chiamando [`isClickable`](https://webdriver.io/docs/api/element/isClickable) sull'elemento.

##### Utilizzo

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

Controlla se un elemento è disabilitato chiamando [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) sull'elemento.

##### Utilizzo

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// same as
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

Controlla se un elemento è abilitato chiamando [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) sull'elemento.

##### Utilizzo

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// same as
await expect(elem).not.toBeDisabled()
```

### toBeSelected

Controlla se un elemento è abilitato chiamando [`isSelected`](https://webdriver.io/docs/api/element/isSelected) sull'elemento.

##### Utilizzo

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

Uguale a `toBeSelected`.

##### Utilizzo

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

Controlla se l'elemento ha un'etichetta WAI-ARIA calcolata specifica. Può anche essere chiamato con un array come parametro nel caso in cui l'elemento possa avere etichette diverse.

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

Controlla se l'elemento ha un ruolo WAI-ARIA calcolato specifico. Può anche essere chiamato con un array come parametro nel caso in cui l'elemento possa avere etichette diverse.

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

Controlla se l'elemento link ha un target di collegamento specifico.

##### Utilizzo

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

Uguale a `toHaveHref`.

##### Utilizzo

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

Controlla se l'elemento ha un attributo `id` specifico.

##### Utilizzo

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

Controlla se l'elemento ha un testo specifico. Può anche essere chiamato con un array come parametro nel caso in cui l'elemento possa avere testi diversi.

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

Nel caso in cui ci sia un elenco di elementi nel div sottostante:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

Puoi asserirli usando un array:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

Controlla se l'elemento ha un testo specifico. Può anche essere chiamato con un array come parametro nel caso in cui l'elemento possa avere testi diversi.

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

Controlla se un elemento è all'interno della viewport chiamando [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) sull'elemento.

##### Utilizzo

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

Controlla la quantità dei figli dell'elemento recuperato chiamando il comando `element.$('./*')`.

##### Utilizzo

```js
const list = await $('ul')
await expect(list).toHaveChildren() // la lista ha almeno un elemento
// equivale a
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // la lista ha 3 elementi
// equivale a 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

Controlla se l'elemento ha una larghezza specifica.

##### Utilizzo

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

Controlla se l'elemento ha un'altezza specifica.

##### Utilizzo

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

Controlla se l'elemento ha una dimensione specifica.

##### Utilizzo

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

Controlla la quantità di elementi recuperati usando il comando [`$$`](https://webdriver.io/docs/api/element/$).

**Nota:** Questo matcher aggiornerà l'array passato con gli ultimi elementi se l'asserzione passa. Tuttavia, se hai riassegnato la variabile, dovrai recuperare nuovamente gli elementi.

##### Utilizzo

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 elementi nella lista

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// equivale a
assert.ok(listItems.length <= 10)
```

## Matcher di Rete

### toBeRequested

Controlla che il mock sia stato chiamato

##### Utilizzo

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

Controlla che il mock sia stato chiamato per il numero previsto di volte

##### Utilizzo

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // richiesta chiamata almeno 5 volte ma meno di 11
```

### toBeRequestedWith

Controlla che il mock sia stato chiamato secondo le opzioni previste.

La maggior parte delle opzioni supporta matcher parziali di expect/jasmine come [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### Utilizzo

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [opzionale] string | function | custom matcher
    method: 'POST',                                 // [opzionale] string | array
    statusCode: 200,                                // [opzionale] number | array
    requestHeaders: { Authorization: 'foo' },       // [opzionale] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [opzionale] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [opzionale] object | function | custom matcher
    response: { success: true },                    // [opzionale] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // sia POST che PUT
    statusCode: [401, 403],  // sia 401 che 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Matcher di Snapshot

WebdriverIO supporta sia i test di snapshot di base che i test di snapshot DOM.

### toMatchSnapshot

Controlla se un oggetto arbitrario corrisponde a un certo valore. Se passi un [`WebdriverIO.Element`](https://webdriver.io/docs/api/element), verrà automaticamente eseguito uno snapshot dello stato [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML).

##### Utilizzo

```js
// snapshot di oggetti arbitrari (non serve "await" qui)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot di `outerHTML` di WebdriverIO.Element (snapshot DOM, richiede "await")
await expect($('elem')).toMatchSnapshot()
// snapshot del risultato del comando dell'elemento
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

Allo stesso modo, puoi utilizzare `toMatchInlineSnapshot()` per memorizzare lo snapshot inline all'interno del file di test. Ad esempio, dato:

```js
await expect($('img')).toMatchInlineSnapshot()
```

Invece di creare un file di snapshot, WebdriverIO modificherà direttamente il file di test per aggiornare lo snapshot come stringa:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Matcher di Snapshot Visivi

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

I seguenti matcher sono implementati come parte del plugin `@wdio/visual-service` e sono disponibili solo quando il servizio è configurato. Assicurati di seguire correttamente le [istruzioni di configurazione](https://webdriver.io/docs/visual-testing).

### toMatchElementSnapshot

Controlla che l'elemento dato corrisponda allo snapshot della baseline.

##### Utilizzo

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // opzioni
})
```

Il risultato atteso è per impostazione predefinita `0`, quindi puoi scrivere la stessa asserzione come:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // opzioni
})
```

o non passare alcuna opzione:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

Controlla che la schermata corrente corrisponda allo snapshot della baseline.

##### Utilizzo

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // opzioni
})
```

Il risultato atteso è per impostazione predefinita `0`, quindi puoi scrivere la stessa asserzione come:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // opzioni
})
```

o non passare alcuna opzione:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

Controlla che lo screenshot della pagina intera corrisponda allo snapshot della baseline.

##### Utilizzo

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // opzioni
})
```

Il risultato atteso è per impostazione predefinita `0`, quindi puoi scrivere la stessa asserzione come:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // opzioni
})
```

o non passare alcuna opzione:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

Controlla che lo screenshot della pagina intera, inclusi i segni di tabulazione, corrisponda allo snapshot della baseline.

##### Utilizzo

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // opzioni
})
```

Il risultato atteso è per impostazione predefinita `0`, quindi puoi scrivere la stessa asserzione come:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // opzioni
})
```

o non passare alcuna opzione:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## Utilizzo di espressioni regolari

Puoi anche utilizzare direttamente espressioni regolari per tutti i matcher che effettuano confronti di testo.

##### Utilizzo

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Matcher Predefiniti

Oltre ai matcher `expect-webdriverio`, puoi utilizzare le asserzioni incorporate di Jest [expect](https://jestjs.io/docs/en/expect) o [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) per Jasmine.

## Matcher Asimmetrici

WebdriverIO supporta l'uso di matcher asimmetrici ovunque si confrontino valori di testo, ad esempio:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

o

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

Se stai utilizzando il [Testrunner WDIO](https://webdriver.io/docs/clioptions), tutto sarà configurato automaticamente. Segui semplicemente la [guida alla configurazione](https://webdriver.io/docs/typescript#framework-setup) dalla documentazione. Tuttavia, se esegui WebdriverIO con un altro testrunner o in un semplice script Node.js, dovrai aggiungere `expect-webdriverio` a `types` nel `tsconfig.json`.

- `"expect-webdriverio"` per tutti tranne gli utenti di Jasmine/Jest.
- `"expect-webdriverio/jasmine"` per Jasmine
- `"expect-webdriverio/jest"` per Jest

## JavaScript (VSCode)

È necessario creare `jsconfig.json` nella radice del progetto e fare riferimento alle definizioni di tipo per far funzionare l'autocompletamento in JavaScript vanilla.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## Aggiungere i tuoi matcher personalizzati

Simile a come `expect-webdriverio` estende i matcher di Jasmine/Jest, è possibile aggiungere matcher personalizzati.

- Per Jasmine, consulta la documentazione sui [matcher personalizzati](https://jasmine.github.io/2.5/custom_matcher.html)
- Per tutti gli altri, consulta [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) di Jest

I matcher personalizzati dovrebbero essere aggiunti nell'hook `before` di wdio

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
// myMatchers.js - Esempio Jest
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Soluzione temporanea. Vedi https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```