---
id: selectors
title: Selettori
description: "Trova elementi con CSS, testo, XPath, nome accessibile, ruolo ARIA e altre strategie di selezione, e scopri quali sono le più robuste."
---

Il [WebDriver Protocol](https://w3c.github.io/webdriver/) fornisce diverse strategie di selezione per interrogare un elemento. WebdriverIO le semplifica per rendere la selezione degli elementi più semplice. Tieni presente che, anche se i comandi per interrogare gli elementi si chiamano `$` e `$$`, non hanno nulla a che fare con jQuery o con il [Sizzle Selector Engine](https://github.com/jquery/sizzle).

Sebbene siano disponibili moltissimi selettori diversi, solo alcuni di essi offrono un modo robusto per trovare l'elemento giusto. Ad esempio, dato il seguente pulsante:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

Raccomandiamo e __sconsigliamo__ i seguenti selettori:

| Selettore | Raccomandato | Note |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Mai | Il peggiore - troppo generico, nessun contesto. |
| `$('.btn.btn-large')` | 🚨 Mai | Pessimo. Legato allo stile. Molto soggetto a modifiche. |
| `$('#main')` | ⚠️ Con moderazione | Meglio. Ma ancora legato allo stile o ai listener di eventi JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Con moderazione | Interrogazione efficace, complesso da scrivere. |
| `$('button[name="submission"]')` | ⚠️ Con moderazione | Legato all'attributo `name`, che ha una semantica HTML. |
| `$('button[data-testid="submit"]')` | ✅ Buono | Richiede un attributo aggiuntivo, non collegato all'a11y. |
| `$('aria/Submit')` | ✅ Buono | Buono. Rispecchia il modo in cui l'utente interagisce con la pagina. Si consiglia di utilizzare file di traduzione, così i tuoi test non si interrompono quando le traduzioni vengono aggiornate. Nelle sessioni WebDriver BiDi utilizza l'albero di accessibilità del browser. Nelle sessioni Classic ripiega su XPath e può essere più lento su pagine di grandi dimensioni. |
| `$('button=Submit')` | ✅ Sempre | Il migliore. Rispecchia il modo in cui l'utente interagisce con la pagina ed è veloce. Si consiglia di utilizzare file di traduzione, così i tuoi test non si interrompono quando le traduzioni vengono aggiornate. |

## Strict Mode

A partire dalla v10 il comando [`$`](/docs/api/browser/$) è __strict__: rappresenta esattamente un elemento. Se il selettore corrisponde a più di un elemento, il comando lancia un `StrictSelectorError` invece di selezionare silenziosamente la prima corrispondenza:

```js
// ci sono 12 pulsanti nella pagina
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

Questo è lo stesso comportamento dei [locator di Playwright](https://playwright.dev/docs/locators#strictness). Cypress è diverso: le sue query possono risolversi in più elementi, e sono i comandi di azione come [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) a rifiutare per impostazione predefinita un soggetto con più elementi. La strict mode fa emergere i selettori troppo generici, che altrimenti interagirebbero silenziosamente con l'elemento sbagliato non appena la pagina cresce.

La regola si applica a ogni passaggio di una [catena](#chain-selectors) e a ogni tipo di selettore accettato da `$`: selettori stringa (inclusi quelli che attraversano lo shadow DOM), [funzioni JS](#js-function), [selettori mobile](#mobile-selectors) e riferimenti a [strategie personalizzate](#custom-selector-strategies).

### Cosa non è interessato

- `$$` continua a restituire zero o più elementi, come un [`ElementArray`](/docs/api/browser/$$). Attendi (await) la lista (o la sua `.length`) prima di leggere il conteggio o di usare `for...of`. `for await` funziona direttamente sulla lista.
- I comandi helper dedicati `custom$`, `shadow$` e `react$` non sono strict: restituiscono ancora la loro prima corrispondenza, così come le loro controparti `$$`.
- Un selettore che non corrisponde a nulla restituisce comunque un elemento risolto in modo lazy, quindi [`waitForExist`](/docs/api/element/waitForExist) e il comportamento di [auto-waiting](/docs/autowait) restano invariati.
- Passare un riferimento a un elemento, ad esempio `$(await browser.getActiveElement())`, si riferisce sempre a un singolo nodo e non viene mai verificato.

:::info Migrazione alla v10

Per sapere come verificare la tua suite alla ricerca di violazioni della strict mode, restringere o escludere singole query e disabilitare la strict mode a livello di progetto, consulta la [guida alla migrazione alla v10](/docs/v10-migration).

:::

## Selettore CSS Query

Se non diversamente indicato, WebdriverIO interrogherà gli elementi utilizzando il pattern dei [selettori CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), ad es.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Testo del link

Per ottenere un elemento anchor con un testo specifico, interroga il testo iniziando con un segno di uguale (`=`).

Ad esempio:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Puoi interrogare questo elemento chiamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Testo parziale del link

Per trovare un elemento anchor il cui testo visibile corrisponde parzialmente al valore cercato,
interrogalo usando `*=` davanti alla stringa di query (ad es. `*=driver`).

Puoi interrogare l'elemento dell'esempio precedente anche chiamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Nota:__ Non puoi combinare più strategie di selezione in un unico selettore. Usa più query di elementi concatenate per raggiungere lo stesso obiettivo, ad es.:

```js
const elem = await $('header h1*=Welcome') // non funziona!!!
// usa invece
const elem = await $('header').$('*=driver')
```

## Elemento con un determinato testo

La stessa tecnica può essere applicata anche agli elementi. Inoltre, è possibile effettuare una corrispondenza senza distinzione tra maiuscole e minuscole usando `.=` o `.*=` all'interno della query.

Ad esempio, ecco una query per un'intestazione di livello 1 con il testo "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Puoi interrogare questo elemento chiamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Oppure usando una query con testo parziale:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Lo stesso funziona per i nomi `id` e `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Puoi interrogare questo elemento chiamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Nota:__ Non puoi combinare più strategie di selezione in un unico selettore. Usa più query di elementi concatenate per raggiungere lo stesso obiettivo, ad es.:

```js
const elem = await $('header h1*=Welcome') // non funziona!!!
// usa invece
const elem = await $('header').$('h1*=Welcome')
```

## Nome del tag

Per interrogare un elemento con un nome di tag specifico, usa `<tag>` o `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Puoi interrogare questo elemento chiamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Attributo name

Per interrogare elementi con uno specifico attributo name, usa un selettore CSS come `[name="some-name"]`. In una sessione mobile, la stessa forma abbreviata viene inviata con la strategia di localizzazione `name` di Appium:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Nota:__ La strategia di localizzazione `name` è un locator di Appium. Le sessioni desktop mantengono `[name="some-name"]` sulla strategia CSS.

## xPath

È anche possibile interrogare gli elementi tramite uno specifico [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

Un selettore xPath ha un formato come `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Puoi interrogare il secondo paragrafo chiamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Puoi usare xPath anche per risalire e discendere l'albero DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Selettore per nome accessibile

Interroga gli elementi in base al loro nome accessibile. Il nome accessibile è ciò che viene annunciato da uno screen reader quando l'elemento riceve il focus. Il valore del nome accessibile può essere sia contenuto visivo sia testo alternativo nascosto.

Nelle sessioni [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (Chrome, Edge, Firefox e altri browser compatibili con BiDi) WebdriverIO utilizza innanzitutto [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) con un locator di accessibilità. Questo interroga direttamente l'albero di accessibilità del browser ed è in genere molto più veloce dell'approssimazione XPath. Se il locator di accessibilità non trova nulla, WebdriverIO ripiega sull'euristica XPath Classic, così le query `aria/` esistenti continuano a trovare corrispondenze.

:::info

Puoi leggere di più su questo selettore nel nostro [post del blog di rilascio](/blog/2022/09/05/accessibility-selector)

:::

### Recupero tramite `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Recupero tramite `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Recupero tramite contenuto

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Recupero tramite titolo

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Recupero tramite proprietà `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## Selettore di ruolo

Interroga gli elementi in base al loro ruolo ARIA e al nome accessibile, nel modo in cui li descrive uno screen reader: "il pulsante *Add to cart*". Un ruolo più un nome continua a trovare corrispondenze anche quando cambiano i nomi delle classi, i test id o la struttura del DOM.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// solo ruolo
const rows = await $$('role/row')

// limitato a un elemento padre
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

La sintassi è `role/<role>` oppure `role/<role>[name="<accessible name>"]`. Funzionano anche gli apici singoli, e una virgoletta all'interno del nome si esegue l'escape con una barra rovesciata: `role/button[name="Say \"hi\""]`.

- Il nome deve corrispondere all'intero nome accessibile.
- Il ruolo deve essere un ruolo ARIA. Un errore di battitura fallisce indicando il ruolo valido più vicino, ad esempio `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` e il suo nome ARIA 1.3 `image` sono lo stesso ruolo.
- Il selettore segue la [strict mode](#strict-mode) di `$` come ogni altro selettore.

In una sessione [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), WebdriverIO passa ruolo e nome a [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). Il browser li calcola entrambi autonomamente, nello stesso modo in cui la tecnologia assistiva vede la pagina. Vengono trovati gli elementi all'interno di shadow root aperti e all'interno di frame, inclusi i frame di un'altra origine. Se il browser non trova alcun elemento, non c'è alcun ripiego su un'euristica. Nota che è il browser a decidere il ruolo: ad esempio, una `<table>` senza intestazioni o didascalia può essere una tabella di layout, e le sue righe non hanno quindi il ruolo `row`.

In una sessione WebDriver Classic, e quando un browser non supporta il locator di ruolo, WebdriverIO calcola ruolo e nome accessibile nella pagina con [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api), l'implementazione utilizzata da Testing Library. Un campo di testo senza etichetta prende il nome dal suo `placeholder`, come fanno i browser. Il selettore di ruolo non è disponibile in un contesto di app mobile nativa. Lì usa un [accessibility id](#accessibility-id).

## ARIA - Attributo role

Per interrogare gli elementi in base ai [ruoli ARIA](https://www.w3.org/TR/html-aria/#docconformance), puoi specificare direttamente il ruolo dell'elemento come `[role=button]` come parametro del selettore. Questo selettore approssima il ruolo a partire dal nome e dagli attributi dell'elemento. Preferisci il [selettore di ruolo](#role-selector), che utilizza il ruolo calcolato dal browser e può anche corrispondere al nome accessibile:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Attributo ID

La strategia di localizzazione "id" non è supportata nel protocollo WebDriver; per trovare elementi tramite ID è necessario utilizzare invece le strategie di selezione CSS o xPath.

Tuttavia alcuni driver (ad es. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) potrebbero ancora [supportare](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) questo selettore.

Le sintassi di selezione attualmente supportate per l'ID sono:

```js
//locator css
const button = await $('#someid')
//locator xpath
const button = await $('//*[@id="someid"]')
//strategia id
// Nota: funziona solo in Appium o framework simili che supportano la strategia di localizzazione "ID"
const button = await $('id=resource-id/iosname')
```

## Funzione JS

Puoi anche utilizzare funzioni JavaScript per recuperare elementi tramite API web native. Naturalmente, puoi farlo solo all'interno di un contesto web (ad es. `browser`, o il contesto web su mobile).

Data la seguente struttura HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Puoi interrogare l'elemento fratello di `#elem` come segue:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Selettori profondi

:::warning

A partire dalla `v9` di WebdriverIO non è più necessario questo selettore speciale, poiché WebdriverIO attraversa automaticamente lo Shadow DOM per te. Si consiglia di abbandonare questo selettore rimuovendo il `>>>` davanti ad esso.

:::

Molte applicazioni frontend si basano fortemente su elementi con [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). È tecnicamente impossibile interrogare elementi all'interno dello shadow DOM senza soluzioni alternative. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) e [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) sono state soluzioni alternative di questo tipo, che avevano i loro [limiti](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Con il selettore profondo puoi ora interrogare tutti gli elementi all'interno di qualsiasi shadow DOM utilizzando il comune comando di query.

Supponiamo di avere un'applicazione con la seguente struttura:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Con questo selettore puoi interrogare l'elemento `<button />` annidato all'interno di un altro shadow DOM, ad es.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Selettori mobile

Per i test mobile ibridi, è importante che il server di automazione si trovi nel *contesto* corretto prima di eseguire i comandi. Per automatizzare i gesti, il driver dovrebbe idealmente essere impostato sul contesto nativo. Ma per selezionare elementi dal DOM, il driver dovrà essere impostato sul contesto webview della piattaforma. Solo *allora* è possibile utilizzare i metodi sopra menzionati.

Per i test mobile nativi, non c'è alcun passaggio tra contesti, poiché devi utilizzare strategie mobile e la tecnologia di automazione del dispositivo sottostante direttamente. Questo è particolarmente utile quando un test necessita di un controllo dettagliato nella ricerca degli elementi.

### Android UiAutomator

Il framework UI Automator di Android offre diversi modi per trovare elementi. Puoi utilizzare la [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), in particolare la [classe UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector), per localizzare gli elementi. In Appium invii il codice Java, come stringa, al server, che lo esegue nell'ambiente dell'applicazione, restituendo l'elemento o gli elementi.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher e ViewMatcher (solo Espresso)

La strategia DataMatcher di Android offre un modo per trovare elementi tramite [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

E analogamente [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (solo Espresso)

La strategia view tag offre un modo comodo per trovare elementi tramite il loro [tag](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Quando si automatizza un'applicazione iOS, è possibile utilizzare il [framework UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) di Apple per trovare elementi.

Questa [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) JavaScript dispone di metodi per accedere alla vista e a tutto ciò che contiene.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Puoi anche utilizzare la ricerca tramite predicati all'interno di iOS UI Automation in Appium per affinare ulteriormente la selezione degli elementi. Vedi [qui](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) per i dettagli.

### iOS XCUITest predicate string e class chain

Con iOS 10 e versioni successive (utilizzando il driver `XCUITest`), puoi utilizzare le [predicate string](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

E le [class chain](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

La strategia di localizzazione `accessibility id` è progettata per leggere un identificatore univoco di un elemento dell'interfaccia utente. Questo ha il vantaggio di non cambiare durante la localizzazione o qualsiasi altro processo che potrebbe modificare il testo. Inoltre, può essere d'aiuto nella creazione di test multipiattaforma, se gli elementi funzionalmente identici hanno lo stesso accessibility id.

- Per iOS si tratta dell'`accessibility identifier` descritto da Apple [qui](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Per Android l'`accessibility id` corrisponde al `content-description` dell'elemento, come descritto [qui](https://developer.android.com/training/accessibility/accessible-app.html).

Per entrambe le piattaforme, ottenere un elemento (o più elementi) tramite il loro `accessibility id` è di solito il metodo migliore. È anche il metodo preferito rispetto alla strategia deprecata `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

La strategia `class name` è una `string` che rappresenta un elemento dell'interfaccia utente nella vista corrente.

- Per iOS è il nome completo di una [classe UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) e inizierà con `UIA-`, come `UIATextField` per un campo di testo. Un riferimento completo è disponibile [qui](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Per Android è il nome completamente qualificato di una [classe](https://developer.android.com/reference/android/widget/package-summary.html) [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator), come `android.widget.EditText` per un campo di testo. Un riferimento completo è disponibile [qui](https://developer.android.com/reference/android/widget/package-summary.html).
- Per Youi.tv è il nome completo di una classe Youi.tv e inizierà con `CYI-`, come `CYIPushButtonView` per un elemento push button. Un riferimento completo è disponibile sulla [pagina GitHub di You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// esempio iOS
await $('UIATextField').click()
// esempio Android
await $('android.widget.DatePicker').click()
// esempio Youi.tv
await $('CYIPushButtonView').click()
```

## Selettori concatenati

Se vuoi essere più specifico nella tua query, puoi concatenare i selettori fino a trovare l'elemento
giusto. Se chiami `element` prima del comando vero e proprio, WebdriverIO avvia la query da quell'elemento.

Ad esempio, se hai una struttura DOM come:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

E vuoi aggiungere il prodotto B al carrello, sarebbe difficile farlo utilizzando solo il selettore CSS.

Con la concatenazione dei selettori è molto più semplice. Restringi semplicemente l'elemento desiderato passo dopo passo:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Selettore di immagini Appium

Utilizzando la strategia di localizzazione `-image`, è possibile inviare ad Appium un file immagine che rappresenta un elemento a cui si vuole accedere.

Formati di file supportati `jpg,png,gif,bmp,svg`

Il riferimento completo è disponibile [qui](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Nota**: Il modo in cui Appium lavora con questo selettore è che effettua internamente uno screenshot (dell'app) e utilizza il selettore di immagine fornito
per verificare se l'elemento può essere trovato in quello screenshot (dell'app).

Tieni presente che Appium potrebbe ridimensionare lo screenshot (dell'app) acquisito per farlo corrispondere alla dimensione CSS dello schermo (dell'app) (questo accade
sugli iPhone ma anche sui Mac con display Retina, perché il DPR è maggiore di 1). Ciò comporterà la mancata corrispondenza, perché
il selettore di immagine fornito potrebbe essere stato ricavato dallo screenshot originale.
Puoi risolvere questo problema aggiornando le impostazioni del server Appium; consulta la [documentazione di Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
per le impostazioni e [questo commento](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) per una spiegazione dettagliata.

## Selettori React

WebdriverIO offre un modo per selezionare i componenti React in base al nome del componente. Per farlo, puoi scegliere tra due comandi: `react$` e `react$$`.

Questi comandi ti permettono di selezionare componenti dal [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) e restituiscono un singolo Element WebdriverIO oppure un array di elementi (a seconda della funzione utilizzata).

**Nota**: I comandi `react$` e `react$$` hanno funzionalità simili, eccetto che `react$$` restituirà *tutte* le istanze corrispondenti come array di elementi WebdriverIO, mentre `react$` restituirà la prima istanza trovata.

I comandi funzionano con React dalla 16 alla 19, per un'app che si avvia con `createRoot` o con `ReactDOM.render`. Leggono i componenti del render corrente, quindi trovano anche i componenti aggiunti da un cambiamento di stato. Se React non ha ancora renderizzato una root della pagina, attendono fino a 5 secondi.

#### Esempio base

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

createRoot(document.querySelector('#root')).render(<App />)
```

Nel codice sopra c'è una semplice istanza di `MyComponent` all'interno dell'applicazione, che React sta renderizzando all'interno di un elemento HTML con `id="root"`.

Con il comando `browser.react$`, puoi selezionare un'istanza di `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Ora che hai l'elemento WebdriverIO memorizzato nella variabile `myCmp`, puoi eseguire comandi sugli elementi su di esso.

#### Filtrare i componenti

Puoi filtrare la tua selezione in base alle props e/o allo stato del componente. Per farlo, passa `props` e/o `state` nel secondo argomento del comando.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Se vuoi selezionare l'istanza di `MyComponent` che ha una prop `name` uguale a `WebdriverIO`, puoi eseguire il comando così:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Se volessi filtrare la selezione in base allo stato, il comando `browser` sarebbe più o meno così:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

Un filtro corrisponde quando ciascuna delle sue chiavi che il componente possiede anch'esso corrisponde. Una chiave che il componente non possiede viene ignorata. Un oggetto annidato corrisponde allo stesso modo, e un array corrisponde quando ha almeno un valore in comune con l'array del componente. `null`, `false` e `0` corrispondono allo stesso valore. Per un componente funzionale con hook, lo stato è lo stato del primo hook (`useState` o `useReducer`): se il primo hook è un altro hook, ad esempio `useRef`, il filtro sullo stato non corrisponde. Con sia `props` sia `state`, un componente deve corrispondere a entrambi.

#### Regole dei selettori

- `*` corrisponde a uno o più caratteri: `browser.react$$('My*')` trova `MyComponent` e `MyOtherComponent`.
- Nomi separati da spazi trovano un componente all'interno di un altro: `browser.react$$('List Item')` trova ogni `Item` all'interno di una `List`.
- Il nome di un componente è il suo `displayName`, oppure il nome della sua funzione o classe. Un componente di `React.memo` ha il nome della sua funzione (la build di sviluppo di React 17 gli assegna anche il `displayName` dell'oggetto memo). Un componente di `React.forwardRef` non ha nome, a meno che non abbia un `displayName`.
- Per un higher-order component con un nome come `withRouter(MyComponent)`, viene utilizzato il nome all'interno delle parentesi: `MyComponent`.
- Senza un ambito di elemento, i comandi cercano in tutte le root React della pagina, nell'ordine del documento, incluse le root all'interno di altre root e le root negli shadow root aperti. `react$` restituisce la prima corrispondenza. Per cercare in una sola root, chiama il comando sul suo contenitore o su un elemento di quella root: `$('#other-root').react$$('MyComponent')`.
- I risultati arrivano una root dopo l'altra. All'interno di una root, arrivano nell'ordine dell'albero dei componenti, livello per livello, non nell'ordine del documento. `react$$` restituisce ogni nodo DOM una sola volta.
- Per un'app in un frame, chiama il comando sul browsing context del frame, o su un elemento del frame: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

Limiti noti:

- Un componente che renderizza solo testo restituisce un nodo di testo. Con WebDriver Classic, un nodo di testo non può essere restituito, e il comando fallisce con `javascript error: circular reference`.
- Mentre React esegue l'hydration di un boundary `Suspense` di una pagina renderizzata lato server, i componenti al suo interno non esistono ancora. Attendi che la pagina abbia completato l'hydration.

#### Gestire `React.Fragment`

Quando usi il comando `react$` per selezionare i [fragment](https://reactjs.org/docs/fragments.html) React, WebdriverIO restituirà il primo figlio di quel componente come nodo del componente. Se usi `react$$`, riceverai un array contenente tutti i nodi HTML all'interno dei fragment che corrispondono al selettore.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Dato l'esempio sopra, ecco come funzionerebbero i comandi:

```js
await browser.react$('MyComponent') // restituisce l'Element WebdriverIO per il primo <div />
await browser.react$$('MyComponent') // restituisce gli Element WebdriverIO per l'array [<div />, <div />]
```

**Nota:** Se hai più istanze di `MyComponent` e usi `react$$` per selezionare questi componenti fragment, ti verrà restituito un array monodimensionale di tutti i nodi. In altre parole, se hai 3 istanze di `<MyComponent />`, ti verrà restituito un array con sei elementi WebdriverIO.

## Strategie di selezione personalizzate


Se la tua app richiede un modo specifico per recuperare gli elementi, puoi definire tu stesso una strategia di selezione personalizzata da utilizzare con `custom$` e `custom$$`. Per farlo, registra la tua strategia una sola volta all'inizio del test, ad es. in un hook `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Dato il seguente frammento HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Utilizzala poi chiamando:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Nota:** questo funziona solo in un ambiente web in cui è possibile eseguire il comando [`execute`](/docs/api/browser/execute).