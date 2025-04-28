---
id: element
title: L'Oggetto Element
---

Un Oggetto Element è un oggetto che rappresenta un elemento nell'agente utente remoto, es. un [DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element) quando si esegue una sessione all'interno di un browser o [un elemento mobile](https://developer.apple.com/documentation/swift/sequence/element) per dispositivi mobili. Può essere ottenuto utilizzando uno dei molti comandi di query elementi, es. [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) o [`shadow$`](/docs/api/element/shadow$).

## Proprietà

Un oggetto elemento ha le seguenti proprietà:

| Nome | Tipo | Dettagli |
| ---- | ---- | ------- |
| `sessionId` | `String` | ID di sessione assegnato dal server remoto. |
| `elementId` | `String` | [Riferimento all'elemento web](https://w3c.github.io/webdriver/#elements) associato che può essere utilizzato per interagire con l'elemento a livello di protocollo |
| `selector` | `String` | [Selettore](/docs/selectors) utilizzato per interrogare l'elemento. |
| `parent` | `Object` | O l'[Oggetto Browser](/docs/api/browser) quando l'elemento è stato recuperato da esso (es. `const elem = browser.$('selector')`) o un [Oggetto Element](/docs/api/element) se è stato recuperato da un ambito elemento (es. `elem.$('selector')`) |
| `options` | `Object` | [Opzioni](/docs/configuration) WebdriverIO a seconda di come è stato creato l'oggetto browser. Vedi maggiori [tipi di configurazione](/docs/setuptypes). |

## Metodi
Un oggetto elemento fornisce tutti i metodi dalla sezione protocollo, es. protocollo [WebDriver](/docs/api/webdriver) così come i comandi elencati nella sezione element. I comandi del protocollo disponibili dipendono dal tipo di sessione. Se esegui una sessione di browser automatizzata, nessuno dei comandi Appium [comandi](/docs/api/appium) sarà disponibile e viceversa.

Oltre a ciò, sono disponibili i seguenti comandi:

| Nome | Parametri | Dettagli |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Consente di definire comandi personalizzati che possono essere chiamati dall'oggetto browser per scopi di composizione. Leggi di più nella guida [Comandi Personalizzati](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Consente di sovrascrivere qualsiasi comando del browser con funzionalità personalizzate. Usa con cautela poiché può confondere gli utenti del framework. Leggi di più nella guida [Comandi Personalizzati](/docs/customcommands#overwriting-native-commands). |

## Osservazioni

### Catena di Elementi

Quando si lavora con gli elementi, WebdriverIO fornisce una sintassi speciale per semplificare l'interrogazione e comporre ricerche di elementi nidificati complessi. Poiché gli oggetti elemento ti permettono di trovare elementi all'interno del loro ramo dell'albero utilizzando metodi di query comuni, gli utenti possono recuperare elementi nidificati come segue:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // outputs "I am a headline"
```

Con strutture profondamente nidificate, assegnare qualsiasi elemento nidificato a un array per poi utilizzarlo può essere piuttosto prolisso. Pertanto WebdriverIO ha il concetto di query di elementi concatenati che consentono di recuperare elementi nidificati in questo modo:

```js
console.log(await $('#header').$('#headline').getText())
```

Questo funziona anche quando si recupera un insieme di elementi, es.:

```js
// get the text of the 3rd headline within the 2nd header
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

Quando si lavora con un insieme di elementi, questo può essere particolarmente utile quando si cerca di interagire con essi, quindi invece di fare:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

Puoi chiamare direttamente i metodi Array sulla catena di elementi, es.:

```js
const location = await $$('div').map((el) => el.getLocation())
```

equivalente a:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO utilizza un'implementazione personalizzata che supporta iteratori asincroni sotto il cofano, quindi tutti i comandi della loro API sono supportati anche per questi casi d'uso.

__Nota:__ tutti gli iteratori asincroni restituiscono una promessa anche se la tua callback non ne restituisce una, es.:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ returns "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ returns "string[]"
```

### Comandi Personalizzati

Puoi impostare comandi personalizzati nell'ambito del browser per astrarre i flussi di lavoro che vengono comunemente utilizzati. Consulta la nostra guida su [Comandi Personalizzati](/docs/customcommands#adding-custom-commands) per maggiori informazioni.