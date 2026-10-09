---
id: typescript
title: Configurazione di TypeScript
description: "Scrivi test WebdriverIO in TypeScript con tsx, configura tsconfig.json e aggiungi le definizioni dei tipi per framework, servizi e comandi personalizzati."
---

Puoi scrivere i test utilizzando [TypeScript](http://www.typescriptlang.org) per ottenere il completamento automatico e la sicurezza dei tipi.

Dovrai avere [`tsx`](https://github.com/privatenumber/tsx) installato nelle `devDependencies`, tramite:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO rileverà automaticamente se queste dipendenze sono installate e compilerà la tua configurazione e i tuoi test. Assicurati di avere un file `tsconfig.json` nella stessa directory della tua configurazione WDIO.

#### TSConfig personalizzato

Se hai bisogno di impostare un percorso diverso per `tsconfig.json`, imposta la variabile d'ambiente TSCONFIG_PATH con il percorso desiderato, oppure usa l'[impostazione tsConfigPath](/docs/configurationfile) della configurazione wdio.

In alternativa, puoi usare la [variabile d'ambiente](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) per `tsx`.


#### Controllo dei tipi

Nota che `tsx` non supporta il controllo dei tipi: se desideri verificare i tuoi tipi, dovrai farlo in un passaggio separato con `tsc`.

## Configurazione del framework

Il tuo `tsconfig.json` deve contenere quanto segue:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Evita di importare esplicitamente `webdriverio` o `@wdio/sync`.
I tipi `WebdriverIO` e `WebDriver` sono accessibili ovunque una volta aggiunti a `types` in `tsconfig.json`. Se utilizzi servizi o plugin aggiuntivi di WebdriverIO o il pacchetto di automazione `devtools`, aggiungili anche all'elenco `types`, poiché molti forniscono tipizzazioni aggiuntive.

## Tipi del framework

A seconda del framework che utilizzi, dovrai aggiungere i tipi di quel framework alla proprietà types del tuo `tsconfig.json`, oltre a installarne le definizioni dei tipi. Questo è particolarmente importante se vuoi avere il supporto dei tipi per la libreria di asserzioni integrata [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Ad esempio, se decidi di usare il framework Mocha, devi installare `@types/mocha` e aggiungerlo in questo modo per avere tutti i tipi disponibili globalmente:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

`jasmine` carica `@types/jasmine`, che fornisce `jasmine`, `spyOn` ed `expectAsync`. Con `@wdio/jasmine-framework`, l'`expect` globale restituisce `void` per i matcher sincroni di Jasmine e una `Promise` per i matcher di WebdriverIO e i matcher asincroni di Jasmine. Anche `expectAsync` dispone dei matcher di WebdriverIO. L'export `expect` di `expect-webdriverio` mantiene i suoi matcher Jest.

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## Servizi

Se utilizzi servizi che aggiungono comandi allo scope del browser, devi includerli anche nel tuo `tsconfig.json`. Ad esempio, se usi `@wdio/lighthouse-service`, assicurati di aggiungerlo anche ai `types`, ad esempio:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

Aggiungere servizi e reporter alla tua configurazione TypeScript rafforza anche la sicurezza dei tipi del file di configurazione di WebdriverIO.

## Definizioni dei tipi

Quando si eseguono comandi WebdriverIO, tutte le proprietà sono solitamente tipizzate, quindi non devi occuparti di importare tipi aggiuntivi. Tuttavia, ci sono casi in cui vuoi definire delle variabili in anticipo. Per garantire che siano type safe, puoi usare tutti i tipi definiti nel pacchetto [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Ad esempio, se vuoi definire le opzioni remote per `webdriverio`, puoi fare:

```ts
import type { Options } from '@wdio/types'

// Ecco un esempio in cui potresti voler importare direttamente i tipi
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// Per altri casi, puoi usare il namespace `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Altre opzioni di configurazione
}
```

## Suggerimenti e consigli

### Compilazione e lint

Per essere completamente sicuro, puoi considerare di seguire le best practice: compila il tuo codice con il compilatore TypeScript (esegui `tsc` o `npx tsc`) e fai eseguire [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) tramite un [hook di pre-commit](https://github.com/typicode/husky).