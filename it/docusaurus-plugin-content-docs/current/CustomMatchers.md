---
id: custommatchers
title: Matcher Personalizzati
---

WebdriverIO utilizza una libreria di asserzioni [`expect`](https://webdriver.io/docs/api/expect-webdriverio) in stile Jest che offre funzionalità speciali e matcher personalizzati specifici per l'esecuzione di test web e mobile. Sebbene la libreria di matcher sia ampia, certamente non si adatta a tutte le situazioni possibili. Pertanto, è possibile estendere i matcher esistenti con quelli personalizzati definiti da te.

:::warning

Sebbene attualmente non ci sia alcuna differenza nel modo in cui vengono definiti i matcher specifici per l'oggetto [`browser`](/docs/api/browser) o un'istanza [element](/docs/api/element), questo potrebbe certamente cambiare in futuro. Tieni d'occhio [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) per ulteriori informazioni su questo sviluppo.

:::

## Matcher Personalizzati per Browser

Per registrare un matcher personalizzato per il browser, chiama `extend` sull'oggetto `expect` direttamente nel tuo file spec o come parte, ad esempio, dell'hook `before` nel tuo `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Come mostrato nell'esempio, la funzione matcher prende l'oggetto atteso, ad esempio l'oggetto browser o elemento, come primo parametro e il valore atteso come secondo. Puoi quindi utilizzare il matcher come segue:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Matcher Personalizzati per Elementi

Analogamente ai matcher personalizzati del browser, i matcher degli elementi non differiscono. Ecco un esempio di come creare un matcher personalizzato per verificare l'aria-label di un elemento:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Questo ti permette di chiamare l'asserzione come segue:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Supporto TypeScript

Se stai utilizzando TypeScript, è necessario un ulteriore passaggio per garantire la sicurezza dei tipi dei tuoi matcher personalizzati. Estendendo l'interfaccia `Matcher` con i tuoi matcher personalizzati, tutti i problemi di tipo scompaiono:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Se hai creato un [matcher asimmetrico](https://jestjs.io/docs/expect#expectextendmatchers) personalizzato, puoi allo stesso modo estendere i tipi di `expect` come segue:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```