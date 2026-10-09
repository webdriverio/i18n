---
id: bestpractices
title: Best Practice
description: "Scrivi test veloci e resilienti con WebdriverIO utilizzando selettori stabili, meno query sugli elementi, asserzioni integrate e nessuna pausa manuale."
---

# Best Practice

Questa guida ha lo scopo di condividere le nostre best practice che ti aiutano a scrivere test performanti e resilienti.

## Usa selettori resilienti

Utilizzando selettori resilienti alle modifiche del DOM, avrai meno test o addirittura nessun test che fallisce quando, ad esempio, una classe viene rimossa da un elemento.

Le classi possono essere applicate a più elementi e dovrebbero essere evitate se possibile, a meno che tu non voglia deliberatamente recuperare tutti gli elementi con quella classe.

```js
// 👎
await $('.button')
```

Tutti questi selettori dovrebbero restituire un singolo elemento.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Nota:__ Per scoprire tutti i possibili selettori supportati da WebdriverIO, consulta la nostra pagina [Selettori](./Selectors.md).

## Limita il numero di query sugli elementi

Ogni volta che usi il comando [`$`](https://webdriver.io/docs/api/browser/$) o [`$$`](https://webdriver.io/docs/api/browser/$$) (incluso il loro concatenamento), WebdriverIO cerca di localizzare l'elemento nel DOM. Queste query sono costose, quindi dovresti cercare di limitarle il più possibile.

Esegue query su tre elementi.

```js
// 👎
await $('table').$('tr').$('td')
```

Esegue query su un solo elemento.

``` js
// 👍
await $('table tr td')
```

L'unico caso in cui dovresti usare il concatenamento è quando vuoi combinare diverse [strategie di selezione](https://webdriver.io/docs/selectors/#custom-selector-strategies).
Nell'esempio utilizziamo i [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), una strategia per entrare nello shadow DOM di un elemento.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Preferisci localizzare un singolo elemento invece di prenderne uno da una lista

Non è sempre possibile farlo, ma utilizzando pseudo-classi CSS come [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) puoi selezionare gli elementi in base ai loro indici nella lista dei figli del loro genitore.

Esegue query su tutte le righe della tabella.

```js
// 👎
await $$('table tr')[15]
```

Esegue query su una singola riga della tabella.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Usa le asserzioni integrate

Non usare asserzioni manuali che non attendono automaticamente che i risultati corrispondano, poiché ciò causerà test instabili (flaky).

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Utilizzando le asserzioni integrate, WebdriverIO attenderà automaticamente che il risultato effettivo corrisponda a quello atteso, ottenendo così test resilienti.
Ciò avviene ritentando automaticamente l'asserzione finché non viene superata o non scade il timeout.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lazy loading e concatenamento delle promise

WebdriverIO ha qualche asso nella manica quando si tratta di scrivere codice pulito, poiché può caricare l'elemento in modo lazy, il che ti permette di concatenare le promise e riduce il numero di `await`. Questo ti consente inoltre di passare l'elemento come ChainablePromiseElement invece che come Element, semplificandone l'uso con i page object.

Quindi quando devi usare `await`?
Dovresti sempre usare `await`, ad eccezione dei comandi `$` e `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// or
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// or
await $('div').$('button').click()
```

## Non abusare di comandi e asserzioni

Quando usi expect.toBeDisplayed attendi implicitamente anche che l'elemento esista. Non c'è bisogno di usare i comandi waitForXXX quando hai già un'asserzione che fa la stessa cosa.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

Non è necessario attendere che un elemento esista o sia visualizzato quando interagisci con esso o quando verifichi qualcosa come il suo testo, a meno che l'elemento non possa essere esplicitamente invisibile (ad esempio opacity: 0) o esplicitamente disabilitato (ad esempio con l'attributo disabled), nel qual caso ha senso attendere che l'elemento sia visualizzato.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## Test dinamici

Usa le variabili d'ambiente per memorizzare i dati di test dinamici, ad esempio credenziali segrete, all'interno del tuo ambiente invece di inserirli direttamente nel test. Visita la pagina [Parametrizzare i test](parameterize-tests) per maggiori informazioni su questo argomento.

## Esegui il lint del tuo codice

Utilizzando eslint per il lint del codice puoi potenzialmente individuare gli errori in anticipo; usa le nostre [regole di linting](https://www.npmjs.com/package/eslint-plugin-wdio) per assicurarti che alcune delle best practice vengano sempre applicate.

## Non usare pause

Può essere allettante usare il comando pause, ma è una cattiva idea poiché non è resiliente e a lungo andare causerà solo test instabili.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Cicli asincroni

Quando hai del codice asincrono che vuoi ripetere, è importante sapere che non tutti i cicli possono farlo.
Ad esempio, la funzione forEach degli Array non consente callback asincrone, come si può leggere su [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Nota:__ Puoi comunque utilizzarli quando non hai bisogno che l'operazione sia asincrona, come mostrato in questo esempio `console.log(await $$('h1').map((h1) => h1.getText()))`.

Di seguito alcuni esempi di cosa significa.

Il seguente codice non funzionerà, poiché le callback asincrone non sono supportate.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Il seguente codice funzionerà.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Mantieni le cose semplici

A volte vediamo i nostri utenti mappare dati come testi o valori. Spesso questo non è necessario ed è spesso un code smell; guarda gli esempi qui sotto per capire perché.

```js
// 👎 troppo complesso, asserzione sincrona, usa le asserzioni integrate per evitare test instabili
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 troppo complesso
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 trova gli elementi in base al loro testo ma non tiene conto della posizione degli elementi
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 usa identificatori univoci (spesso usati per elementi personalizzati)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 nomi di accessibilità (spesso usati per elementi html nativi)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Un'altra cosa che vediamo a volte è che cose semplici hanno una soluzione eccessivamente complicata.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## Eseguire codice in parallelo

Se non ti interessa l'ordine in cui viene eseguito del codice, puoi utilizzare [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) per velocizzarne l'esecuzione.

__Nota:__ Poiché questo rende il codice più difficile da leggere, potresti astrarlo utilizzando un page object o una funzione, anche se dovresti chiederti se il vantaggio in termini di prestazioni valga il costo in termini di leggibilità.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

Se astratto, potrebbe apparire come nell'esempio seguente, dove la logica è inserita in un metodo chiamato submitWithDataOf e i dati vengono recuperati dalla classe Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```