---
id: export
title: Esportare una sessione come test
description: Trasforma i passaggi eseguiti in wdio session in uno spec, page object e comandi personalizzati.
---

`export` scrive uno spec a partire dai passaggi registrati. I riferimenti vengono sostituiti con selettori stabili. Per una pagina web, viene utilizzato il primo dei seguenti che corrisponde esattamente a un elemento: un test id (`data-testid`, `data-test`, `data-qa`), un [selettore di ruolo](/docs/selectors#role-selector) come `role/button[name="Add to cart"]`, un nome accessibile (`aria/Add to cart`), un id, il testo di un pulsante o di un link, il nome di un campo di un modulo e infine un percorso CSS.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` stampa i passaggi prima dell'esportazione. `history clear` li elimina.

## Page object

`--page-objects` scrive un page object accanto allo spec. I selettori sono raggruppati in base al percorso su cui sono stati eseguiti. Un `$('…')` letterale in un passaggio registrato diventa un getter. `$$`, le stringhe che contengono casualmente `$('…')` e un `$(selector)` dinamico rimangono invariati.

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

Il comando si rifiuta di sovrascrivere un page object già presente nella directory di output. Sposta `--out` o rimuovi prima quel file. Il file dello spec, invece, viene riscritto.

Un `import` all'inizio di un passaggio `exec` viene spostato in cima allo spec, al di fuori della funzione di test.

## Helper

Aggiungi un file in `.wdio/helpers/` quando un passaggio è troppo lungo per `exec`. Ogni file esporta come default una funzione che riceve il browser e registra comandi con `addCommand`. Le importazioni relative restano relative a quel file. Le importazioni di pacchetti semplici vengono risolte a partire dal progetto.

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

Gli helper vengono caricati all'apertura della sessione e di nuovo con `npx wdio session helpers --reload`. Se `.wdio/helpers` non esiste ancora, la sessione ne monitora la creazione. Gli helper diventano comandi personalizzati nel test esportato.

## Prossimi passi

- [Eseguire codice](/docs/session/exec) — i passaggi che `export` registra
- [Comandi](/docs/session-commands) — i flag di `export`, `history` e `helpers`