---
id: ai-steps
title: Passaggi AI nei test
description: Scrivi i passaggi dei test come intenzioni con browser.act() e leggi dati tipizzati con browser.extract() usando @wdio/ai-service, quindi riproducili da una cache salvata nel repository senza un modello e verifica ogni riparazione.
---

`@wdio/ai-service` consente a un test di descrivere un passaggio invece di programmarlo: `browser.act('Add a blue shirt to the cart')` chiede al tuo modello di eseguirlo, registra i comandi WebdriverIO che ha eseguito e li riproduce da un file di cache in ogni esecuzione successiva. Il modello viene richiamato solo quando la pagina è cambiata e un passaggio registrato non può più essere riparato senza di esso. Usalo per flussi il cui markup cambia spesso, oppure per far funzionare un test prima di conoscere i selettori. Usa i normali comandi WebdriverIO per tutto ciò che sai già come programmare.

## Configurare il servizio

Installa il servizio e il pacchetto LangChain del tuo provider di modelli:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

Aggiungi il servizio alla tua configurazione e imposta nell'ambiente la chiave API del provider (qui `ANTHROPIC_API_KEY`):

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        webSocketUrl: true
    }],
    framework: 'mocha',
    services: [['ai', {
        model: 'anthropic:claude-sonnet-5-5'
    }]]
}
```

`webSocketUrl: true` apre una sessione WebDriver BiDi. Il servizio funziona anche con WebDriver Classic, ma BiDi gli permette di verificare cosa ha fatto ogni passaggio e di leggere le risposte API della pagina. Consulta la pagina [AI Service](/docs/ai-service) per tutte le opzioni e i provider, inclusi i modelli locali tramite Ollama.

## Scrivere un test

```ts title="test/specs/cart.e2e.ts"
import { browser, expect } from '@wdio/globals'
import { z } from 'zod'

describe('cart', () => {
    it('adds a shirt', async () => {
        await browser.url('https://shop.example/')
        await browser.act('Add a blue shirt in size M to the shopping cart')

        const cart = await browser.extract(
            'the line items in the cart',
            z.array(z.object({ name: z.string(), size: z.string(), qty: z.number() }))
        )
        expect(cart).toContainEqual({ name: 'Blue Shirt', size: 'M', qty: 1 })
    })
})
```

- `act` esegue il passaggio e non effettua mai asserzioni. Verifica il risultato con `expect`.
- `extract` legge soltanto la pagina e convalida la risposta rispetto allo schema. Non viene mai memorizzato nella cache.
- I segreti vanno nei segnaposto. Il modello vede `{{password}}`, mai il valore:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- Chiama `act` su un elemento per mantenere il modello al suo interno, oppure su un frame o una scheda acquisiti:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## Registra una volta, riproduci senza un modello

La prima esecuzione registra i passaggi di ogni chiamata `act` in `__act__/<spec file>.json` accanto alla spec:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Esegui il commit della directory `__act__`. Le esecuzioni successive riproducono i comandi registrati, quindi un'esecuzione riuscita non effettua chiamate al modello e non consuma token.

| `cache` | Usalo per |
| --- | --- |
| `auto` (predefinito) | `write` in locale, `heal` quando `process.env.CI` è impostato |
| `write` | registrare e aggiornare i file di cache |
| `heal` | CI: riparare i passaggi non riusciti, scrivere le voci riparate in `<outputDir>/act-cache/` e lasciare invariati i file di cache |
| `locked` | esecuzioni CI che non devono chiamare un modello: solo riproduzione, fallisce quando un passaggio non può essere riparato senza il modello |
| `off` | interrogare sempre il modello |

Esegui `npx wdio run wdio.conf.ts -s` per registrare di nuovo ogni chiamata `act`.

## Verificare le riparazioni

Quando un passaggio registrato fallisce, il servizio prova prima gli altri selettori registrati per l'elemento e poi il suo ruolo e nome accessibile. Solo se anche questo fallisce, il modello prosegue dal passaggio non riuscito. Ogni passaggio riprodotto o riparato deve fare ciò che faceva al momento della registrazione: inviare le stesse richieste, navigare verso la stessa pagina e modificare le stesse parti della pagina. Una riparazione su un pulsante simile ma sbagliato viene rifiutata.

L'esecuzione termina con un riepilogo:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

La cartella delle evidenze contiene uno screenshot della pagina al momento del fallimento del passaggio, uno dopo ogni passaggio di riparazione e un video della riparazione nei browser che registrano uno screencast WebDriver BiDi (attualmente Firefox). Verifica la riparazione, quindi esegui il commit del file di cache aggiornato.

## Trasformare i passaggi in codice normale

Una volta che un flusso è stabile, sostituisci le sue chiamate `act` con i comandi registrati:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Add a blue shirt in size M to the shopping cart
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## Risoluzione dei problemi

| Errore | Soluzione |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | Imposta `model` nelle opzioni del servizio oppure esporta `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | Installa il pacchetto del provider. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Esporta la chiave nella shell o nel secret CI che esegue i test. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | Registra la chiamata in locale con `cache: 'write'` ed esegui il commit del file `__act__`. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | L'elemento è ancora presente ma fa qualcos'altro: si tratta di una regressione, non di una modifica del markup. Controlla l'applicazione. |
| `act("…") failed: …` seguito da `Evidence: <folder>` | Il modello non è riuscito a completare l'istruzione. La cartella contiene ogni snapshot acquisito, gli eventi della console e di rete e i passaggi eseguiti. |

## Passi successivi

- [AI Service](/docs/ai-service): tutte le opzioni, il formato della cache, gli effetti dei passaggi e il workspace
- [Selettori](/docs/selectors#role-selector): il selettore `role/` usato dai passaggi registrati
- [WebdriverIO per agenti di programmazione](/docs/ai-agents): scrivi test insieme a un agente di programmazione