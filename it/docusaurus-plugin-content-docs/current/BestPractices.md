---
id: bestpractices
title: Migliori Pratiche
---

# Migliori Pratiche

Questa guida mira a condividere le nostre migliori pratiche che ti aiutano a scrivere test performanti e resilienti.

## Usa selettori resilienti

Utilizzando selettori che sono resilienti ai cambiamenti nel DOM, avrai meno o addirittura nessun test che fallisce quando, ad esempio, una classe viene rimossa da un elemento.

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

__Nota:__ Per scoprire tutti i possibili selettori supportati da WebdriverIO, consulta la nostra pagina [Selectors](./Selectors.md).

## Limita la quantità di query di elementi

Ogni volta che usi il comando [`$`](https://webdriver.io/docs/api/browser/$) o [`$$`](https://webdriver.io/docs/api/browser/$$) (questo include l'incatenamento), WebdriverIO cerca di localizzare l'elemento nel DOM. Queste query sono costose, quindi dovresti cercare di limitarle il più possibile.

Query di tre elementi.

```js
// 👎
await $('table').$('tr').$('td')
```

Query di un solo elemento.

``` js
// 👍
await $('table tr td')
```

L'unico momento in cui dovresti usare l'incatenamento è quando vuoi combinare diverse [strategie di selezione](https://webdriver.io/docs/selectors/#custom-selector-strategies).
Nell'esempio usiamo i [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), che è una strategia per entrare nel shadow DOM di un elemento.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Preferisci localizzare un singolo elemento invece di prenderne uno da una lista

Non è sempre possibile farlo, ma usando pseudo-classi CSS come [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) puoi abbinare elementi in base agli indici degli elementi nella lista dei figli dei loro genitori.

Query di tutte le righe della tabella.

```js
// 👎
await $$('table tr')[15]
```

Query di una singola riga della tabella.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Usa le asserzioni incorporate

Non usare asserzioni manuali che non attendono automaticamente che i risultati corrispondano, poiché ciò causerà test instabili.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Utilizzando le asserzioni incorporate, WebdriverIO attenderà automaticamente che il risultato effettivo corrisponda al risultato atteso, ottenendo test resilienti.
Questo viene ottenuto riprovando automaticamente l'asserzione fino a quando non passa o scade il tempo.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lazy loading e promise chaining

WebdriverIO ha alcuni trucchi nella manica quando si tratta di scrivere codice pulito, poiché può caricare l'elemento in modo lazy, consentendoti di concatenare le promesse e ridurre la quantità di `await`. Ciò consente anche di passare l'elemento come ChainablePromiseElement invece di Element e per un uso più facile con i page object.

Quindi quando devi usare `await`?
Dovresti sempre usare `await` con l'eccezione dei comandi `$` e `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// oppure
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// oppure
await $('div').$('button').click()
```

## Non abusare di comandi e asserzioni

Quando usi expect.toBeDisplayed implicitamente attendi anche che l'elemento esista. Non c'è bisogno di usare i comandi waitForXXX quando hai già un'asserzione che fa la stessa cosa.

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

Non c'è bisogno di attendere che un elemento esista o sia visualizzato quando si interagisce o quando si asserisce qualcosa come il suo testo, a meno che l'elemento non possa essere esplicitamente invisibile (opacity: 0 per esempio) o possa essere esplicitamente disabilitato (attributo disabled per esempio), nel qual caso attendere che l'elemento sia visualizzato ha senso.

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

## Test Dinamici

Usa variabili d'ambiente per memorizzare dati di test dinamici, ad esempio credenziali segrete, all'interno del tuo ambiente anziché codificarli direttamente nel test. Vai alla pagina [Parameterize Tests](parameterize-tests) per maggiori informazioni su questo argomento.

## Esegui il lint del tuo codice

Utilizzando eslint per fare il lint del tuo codice, puoi potenzialmente rilevare errori in anticipo, usa le nostre [regole di linting](https://www.npmjs.com/package/eslint-plugin-wdio) per assicurarti che alcune delle migliori pratiche siano sempre applicate.

## Non usare pause

Può essere tentante usare il comando pause, ma usarlo è una cattiva idea poiché non è resiliente e causerà solo test instabili nel lungo periodo.

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

## Loop asincroni

Quando hai del codice asincrono che vuoi ripetere, è importante sapere che non tutti i cicli possono farlo.
Ad esempio, la funzione forEach dell'Array non consente callback asincroni, come si può leggere su [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Nota:__ Puoi comunque usarli quando non hai bisogno che l'operazione sia sincrona come mostrato in questo esempio `console.log(await $$('h1').map((h1) => h1.getText()))`.

Di seguito sono riportati alcuni esempi di cosa significa.

Il seguente non funzionerà poiché i callback asincroni non sono supportati.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Il seguente funzionerà.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Mantieni la semplicità

A volte vediamo i nostri utenti mappare dati come testo o valori. Spesso questo non è necessario ed è spesso un sintomo di codice mal strutturato, controlla gli esempi sotto per capire perché questo è il caso.

```js
// 👎 troppo complesso, asserzione sincrona, usa le asserzioni incorporate per prevenire test instabili
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

// 👎 trova elementi per il loro testo ma non tiene conto della posizione degli elementi
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 usa identificatori unici (spesso usati per elementi personalizzati)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 nomi di accessibilità (spesso usati per elementi html nativi)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Un'altra cosa che a volte vediamo è che cose semplici hanno una soluzione eccessivamente complicata.

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

## Esecuzione del codice in parallelo

Se non ti interessa l'ordine in cui viene eseguito del codice, puoi utilizzare [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) per velocizzare l'esecuzione.

__Nota:__ Poiché questo rende il codice più difficile da leggere, potresti astrarlo usando un page object o una funzione, sebbene dovresti anche chiederti se il beneficio in termini di prestazioni vale il costo di leggibilità.

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

Se astratto, potrebbe assomigliare a qualcosa come quanto segue, dove la logica è inserita in un metodo chiamato submitWithDataOf e i dati vengono recuperati dalla classe Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```