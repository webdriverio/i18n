---
id: pageobjects
title: Pattern Page Object
description: "Struttura i tuoi test con il pattern page object spostando i selettori e le azioni specifiche di una pagina in classi di pagina riutilizzabili."
---

La versione 5 di WebdriverIO è stata progettata tenendo a mente il supporto al Page Object Pattern. Introducendo il principio degli "elementi come cittadini di prima classe", è ora possibile costruire grandi suite di test utilizzando questo pattern.

Non sono necessari pacchetti aggiuntivi per creare page object. Si scopre che classi pulite e moderne forniscono tutte le funzionalità di cui abbiamo bisogno:

- ereditarietà tra page object
- caricamento lazy degli elementi
- incapsulamento di metodi e azioni

L'obiettivo dell'uso dei page object è astrarre qualsiasi informazione della pagina dai test veri e propri. Idealmente, dovresti memorizzare tutti i selettori o le istruzioni specifiche che sono uniche per una determinata pagina in un page object, in modo da poter ancora eseguire il tuo test dopo aver completamente riprogettato la tua pagina.

## Creare un Page Object

Prima di tutto, abbiamo bisogno di un page object principale che chiamiamo `Page.js`. Conterrà selettori o metodi generali da cui erediteranno tutti i page object.

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

Esporteremo sempre (`export`) un'istanza di un page object, e non creeremo mai quell'istanza nel test. Dato che stiamo scrivendo test end-to-end, consideriamo sempre la pagina come un costrutto senza stato&mdash;proprio come ogni richiesta HTTP è un costrutto senza stato.

Certo, il browser può contenere informazioni di sessione e quindi può visualizzare pagine diverse in base a sessioni diverse, ma questo non dovrebbe riflettersi all'interno di un page object. Questi tipi di cambiamenti di stato dovrebbero risiedere nei tuoi test veri e propri.

Iniziamo a testare la prima pagina. A scopo dimostrativo, utilizziamo il sito web [The Internet](http://the-internet.herokuapp.com) di [Elemental Selenium](http://elementalselenium.com) come cavia. Proviamo a costruire un esempio di page object per la [pagina di login](http://the-internet.herokuapp.com/login).

## Usare `Get` per i tuoi selettori

Il primo passo è scrivere tutti i selettori importanti richiesti nel nostro oggetto `login.page` come funzioni getter:

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

Definire i selettori in funzioni getter potrebbe sembrare un po' strano, ma è davvero utile. Queste funzioni vengono valutate _quando accedi alla proprietà_, non quando generi l'oggetto. In questo modo richiedi sempre l'elemento prima di eseguire un'azione su di esso.

## Concatenare i comandi

WebdriverIO ricorda internamente l'ultimo risultato di un comando. Se concateni un comando di elemento con un comando di azione, trova l'elemento dal comando precedente e utilizza il risultato per eseguire l'azione. In questo modo puoi rimuovere il selettore (primo parametro) e il comando appare semplice come:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Che è sostanzialmente la stessa cosa di:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

oppure

```js
await $('#username').setValue('Max Mustermann')
```

## Usare i Page Object nei tuoi test

Dopo aver definito gli elementi e i metodi necessari per la pagina, puoi iniziare a scrivere il test per essa. Tutto ciò che devi fare per usare il page object è importarlo con `import` (o `require`). Tutto qui!

Dato che hai esportato un'istanza già creata del page object, importarlo ti permette di iniziare a usarlo immediatamente.

Se utilizzi un framework di asserzioni, i tuoi test possono essere ancora più espressivi:

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

Dal punto di vista strutturale, ha senso separare i file spec e i page object in directory diverse. Inoltre puoi dare a ogni page object la terminazione: `.page.js`. Questo rende più chiaro che stai importando un page object.

## Andare oltre

Questo è il principio di base su come scrivere page object con WebdriverIO. Ma puoi costruire strutture di page object molto più complesse di questa! Ad esempio, potresti avere page object specifici per le finestre modali, o suddividere un enorme page object in diverse classi (ciascuna rappresentante una parte diversa dell'intera pagina web) che ereditano dal page object principale. Il pattern offre davvero molte opportunità per separare le informazioni della pagina dai tuoi test, il che è importante per mantenere la tua suite di test strutturata e chiara nei periodi in cui il progetto e il numero di test crescono.

Puoi trovare questo esempio (e molti altri esempi di page object) nella [cartella `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) su GitHub.