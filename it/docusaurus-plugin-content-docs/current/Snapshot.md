---
id: snapshot
title: Snapshot
---

I test snapshot possono essere molto utili per verificare contemporaneamente una vasta gamma di aspetti del tuo componente o della tua logica. In WebdriverIO puoi acquisire snapshot di qualsiasi oggetto arbitrario, così come della struttura DOM di un WebElement o dei risultati dei comandi WebdriverIO.

Simile ad altri framework di test, WebdriverIO acquisirà uno snapshot del valore fornito, quindi lo confronterà con un file di snapshot di riferimento memorizzato insieme al test. Il test fallirà se i due snapshot non corrispondono: o la modifica è imprevista, o lo snapshot di riferimento deve essere aggiornato alla nuova versione del risultato.

:::info Supporto Multi-Piattaforma

Queste funzionalità di snapshot sono disponibili per l'esecuzione di test end-to-end nell'ambiente Node.js, così come per l'esecuzione di test [unitari e di componenti](/docs/component-testing) nel browser o su dispositivi mobili.

:::

## Utilizzo degli Snapshot
Per acquisire uno snapshot di un valore, puoi utilizzare `toMatchSnapshot()` dall'API [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

La prima volta che questo test viene eseguito, WebdriverIO crea un file di snapshot che assomiglia a questo:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

L'artefatto dello snapshot dovrebbe essere committato insieme alle modifiche del codice e rivisto come parte del processo di revisione del codice. Nelle successive esecuzioni di test, WebdriverIO confronterà l'output renderizzato con lo snapshot precedente. Se corrispondono, il test passerà. Se non corrispondono, o il test runner ha trovato un bug nel tuo codice che dovrebbe essere risolto, oppure l'implementazione è cambiata e lo snapshot deve essere aggiornato.

Per aggiornare lo snapshot, passa il flag `-s` (o `--updateSnapshot`) al comando `wdio`, ad esempio:

```sh
npx wdio run wdio.conf.js -s
```

__Nota:__ se esegui test con più browser in parallelo, viene creato e confrontato un solo snapshot. Se desideri avere uno snapshot separato per capacità, per favore [apri una issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) e facci conoscere il tuo caso d'uso.

## Snapshot Inline

Allo stesso modo, puoi utilizzare `toMatchInlineSnapshot()` per memorizzare lo snapshot inline all'interno del file di test.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Invece di creare un file di snapshot, Vitest modificherà direttamente il file di test per aggiornare lo snapshot come stringa:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Questo ti consente di vedere l'output previsto direttamente senza saltare tra file diversi.

## Snapshot Visivi

Acquisire uno snapshot DOM di un elemento potrebbe non essere la soluzione migliore, specialmente se la struttura DOM è troppo grande e contiene proprietà di elementi dinamici. In questi casi, è consigliabile affidarsi a snapshot visivi per gli elementi.

Per abilitare gli snapshot visivi, aggiungi `@wdio/visual-service` alla tua configurazione. Puoi seguire le istruzioni di configurazione nella [documentazione](/docs/visual-testing#installation) per i Test Visivi.

Puoi quindi acquisire uno snapshot visivo tramite `toMatchElementSnapshot()`, ad esempio:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Un'immagine viene quindi memorizzata nella directory di base. Consulta [Visual Testing](/docs/visual-testing) per maggiori informazioni.