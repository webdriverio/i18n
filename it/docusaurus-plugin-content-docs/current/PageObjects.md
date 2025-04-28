---
id: pageobjects
title: Pattern Page Object
---

La versione 5 di WebdriverIO è stata progettata con il supporto del Pattern Page Object in mente. Introducendo il principio degli "elementi come cittadini di prima classe", è ora possibile costruire grandi suite di test utilizzando questo pattern.

Non sono necessari pacchetti aggiuntivi per creare page object. Si scopre che le classi moderne e pulite forniscono tutte le funzionalità necessarie:

- ereditarietà tra page object
- caricamento lazy degli elementi
- incapsulamento di metodi e azioni

L'obiettivo dell'utilizzo dei page object è quello di astrarre qualsiasi informazione della pagina dai test effettivi. Idealmente, dovresti memorizzare tutti i selettori o le istruzioni specifiche che sono uniche per una determinata pagina in un page object, in modo da poter eseguire il tuo test anche dopo aver completamente riprogettato la tua pagina.

## Creazione di un Page Object

Prima di tutto, abbiamo bisogno di un page object principale che chiamiamo `Page.js`. Conterrà selettori o metodi generali che tutti i page object erediteranno.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

Esporteremo sempre un'istanza di un page object, e non creeremo mai quell'istanza nel test. Poiché stiamo scrivendo test end-to-end, consideriamo sempre la pagina come un costrutto senza stato&mdash;proprio come ogni richiesta HTTP è un costrutto senza stato.

Certo, il browser può trasportare informazioni di sessione e quindi può visualizzare pagine diverse in base a sessioni diverse, ma questo non dovrebbe riflettersi all'interno di un page object. Questi tipi di cambiamenti di stato dovrebbero risiedere nei tuoi test effettivi.

Iniziamo a testare la prima pagina. A scopo dimostrativo, utilizziamo il sito web [The Internet](http://the-internet.herokuapp.com) di [Elemental Selenium](http://elementalselenium.com) come cavia. Proviamo a costruire un esempio di page object per la [pagina di login](http://the-internet.herokuapp.com/login).

## Ottenere i tuoi selettori con `Get`

Il primo passo è scrivere tutti i selettori importanti necessari nel nostro oggetto `login.page` come funzioni getter:

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

Definire i selettori nelle funzioni getter potrebbe sembrare un po' strano, ma è davvero utile. Queste funzioni vengono valutate _quando accedi alla proprietà_, non quando generi l'oggetto. In questo modo richiedi sempre l'elemento prima di eseguire un'azione su di esso.

## Concatenamento dei comandi

WebdriverIO ricorda internamente l'ultimo risultato di un comando. Se concateni un comando elemento con un comando azione, trova l'elemento dal comando precedente e utilizza il risultato per eseguire l'azione. Con questo puoi rimuovere il selettore (primo parametro) e il comando appare semplice come:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Che è fondamentalmente la stessa cosa di:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

o

```js
await $('#username').setValue('Max Mustermann')
```

## Utilizzo dei Page Object nei tuoi test

Dopo aver definito gli elementi e i metodi necessari per la pagina, puoi iniziare a scrivere il test per essa. Tutto ciò che devi fare per utilizzare il page object è `import` (o `require`). Ecco fatto!

Poiché hai esportato un'istanza già creata del page object, importandola puoi iniziare a utilizzarla immediatamente.

Se utilizzi un framework di asserzione, i tuoi test possono essere ancora più espressivi:

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

Dal lato strutturale, ha senso separare i file spec e i page object in directory diverse. Inoltre, puoi dare a ogni page object il suffisso: `.page.js`. Questo rende più chiaro che stai importando un page object.

## Andare oltre

Questo è il principio base di come scrivere page object con WebdriverIO. Ma puoi costruire strutture di page object molto più complesse di questa! Ad esempio, potresti avere page object specifici per finestre modali, o suddividere un page object enorme in classi diverse (ognuna rappresentante una parte diversa della pagina web complessiva) che ereditano dal page object principale. Il pattern offre davvero molte opportunità per separare le informazioni della pagina dai tuoi test, il che è importante per mantenere la tua suite di test strutturata e chiara in tempi in cui il progetto e il numero di test crescono.

Puoi trovare questo esempio (e ancora più esempi di page object) nella [`cartella example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) su GitHub.