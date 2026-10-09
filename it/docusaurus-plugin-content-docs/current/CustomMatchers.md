---
id: custommatchers
title: Matcher Personalizzati
description: "Registra matcher personalizzati per browser ed elementi con expect.extend e aggiungi i relativi tipi TypeScript."
---

WebdriverIO utilizza una libreria di asserzioni [`expect`](https://webdriver.io/docs/api/expect-webdriverio) in stile Jest che offre funzionalità speciali e matcher personalizzati specifici per l'esecuzione di test web e mobile. Sebbene la libreria di matcher sia ampia, certamente non copre tutte le situazioni possibili. Per questo motivo è possibile estendere i matcher esistenti con matcher personalizzati definiti da te.

:::warning

Sebbene attualmente non ci sia differenza nel modo in cui vengono definiti i matcher specifici per l'oggetto [`browser`](/docs/api/browser) o per un'istanza di [elemento](/docs/api/element), questo potrebbe certamente cambiare in futuro. Tieni d'occhio [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) per ulteriori informazioni su questo sviluppo.

:::

:::info Jasmine

Con il framework Jasmine, chiama `expect.extend` in un file di spec o nell'hook `before`, prima dell'esecuzione dei test. I matcher diventano matcher asincroni di Jasmine, quindi usa `await` con essi. Un matcher con il nome di un matcher sincrono di Jasmine viene eseguito solo per i valori WebdriverIO, come i matcher di WebdriverIO. I matcher asimmetrici personalizzati (`expect.myMatcher()`) non sono disponibili. Puoi anche usare `jasmine.addMatchers` per un matcher sincrono o `jasmine.addAsyncMatchers` per un matcher asincrono, consulta il [tutorial sui matcher personalizzati di Jasmine](https://jasmine.github.io/tutorials/custom_matchers).

:::

## Matcher Personalizzati per il Browser

Per registrare un matcher personalizzato per il browser, chiama `extend` sull'oggetto `expect` direttamente nel tuo file di spec oppure, ad esempio, come parte dell'hook `before` nel tuo `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Come mostrato nell'esempio, la funzione matcher accetta l'oggetto atteso, ad esempio l'oggetto browser o elemento, come primo parametro e il valore atteso come secondo. Puoi quindi utilizzare il matcher come segue:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Matcher Personalizzati per gli Elementi

Analogamente ai matcher personalizzati per il browser, i matcher per gli elementi non sono diversi. Ecco un esempio di come creare un matcher personalizzato per verificare l'aria-label di un elemento:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Questo ti permette di chiamare l'asserzione come segue:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Supporto TypeScript

Se stai usando TypeScript, è necessario un ulteriore passaggio per garantire la sicurezza dei tipi dei tuoi matcher personalizzati. Estendendo l'interfaccia `Matcher` con i tuoi matcher personalizzati, tutti i problemi di tipo scompaiono:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Se hai creato un [matcher asimmetrico](https://jestjs.io/docs/expect#expectextendmatchers) personalizzato, puoi estendere in modo simile i tipi di `expect` come segue:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```