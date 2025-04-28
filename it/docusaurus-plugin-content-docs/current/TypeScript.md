---
id: typescript
title: Configurazione TypeScript
---

Puoi scrivere test utilizzando [TypeScript](http://www.typescriptlang.org) per ottenere auto-completamento e sicurezza dei tipi.

Avrai bisogno di [`tsx`](https://github.com/privatenumber/tsx) installato nelle `devDependencies`, tramite:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO rileverà automaticamente se queste dipendenze sono installate e compilerà la tua configurazione e i test per te. Assicurati di avere un `tsconfig.json` nella stessa directory del tuo file di configurazione WDIO.

#### TSConfig personalizzato

Se hai bisogno di impostare un percorso diverso per `tsconfig.json`, imposta la variabile di ambiente TSCONFIG_PATH con il percorso desiderato, oppure utilizza l'[impostazione tsConfigPath](/docs/configurationfile) nella configurazione wdio.

In alternativa, puoi utilizzare la [variabile d'ambiente](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) per `tsx`.


#### Controllo dei tipi

Nota che `tsx` non supporta il controllo dei tipi - se desideri controllare i tuoi tipi, dovrai farlo in un passaggio separato con `tsc`.

## Configurazione del Framework

Il tuo `tsconfig.json` necessita di quanto segue:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Evita di importare esplicitamente `webdriverio` o `@wdio/sync`.
I tipi `WebdriverIO` e `WebDriver` sono accessibili da qualsiasi punto una volta aggiunti a `types` in `tsconfig.json`. Se utilizzi servizi WebdriverIO aggiuntivi, plugin o il pacchetto di automazione `devtools`, aggiungili anche all'elenco `types` poiché molti forniscono tipizzazioni aggiuntive.

## Tipi del Framework

A seconda del framework che utilizzi, dovrai aggiungere i tipi per quel framework alla proprietà `types` del tuo `tsconfig.json`, oltre a installare le sue definizioni di tipo. Questo è particolarmente importante se desideri avere supporto per i tipi per la libreria di asserzioni integrata [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Ad esempio, se decidi di utilizzare il framework Mocha, devi installare `@types/mocha` e aggiungerlo così per avere tutti i tipi disponibili globalmente:

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
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

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

Se utilizzi servizi che aggiungono comandi allo scope del browser, devi includerli anche nel tuo `tsconfig.json`. Ad esempio, se utilizzi il `@wdio/lighthouse-service`, assicurati di aggiungerlo anche ai `types`, ad esempio:

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

L'aggiunta di servizi e reporter alla tua configurazione TypeScript rafforza anche la sicurezza dei tipi del tuo file di configurazione WebdriverIO.

## Definizioni di tipo

Quando esegui i comandi WebdriverIO, tutte le proprietà sono solitamente tipizzate in modo da non dover importare tipi aggiuntivi. Tuttavia, ci sono casi in cui desideri definire variabili in anticipo. Per garantire che queste siano sicure dal punto di vista dei tipi, puoi utilizzare tutti i tipi definiti nel pacchetto [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Ad esempio, se desideri definire l'opzione remote per `webdriverio`, puoi fare:

```ts
import type { Options } from '@wdio/types'

// Ecco un esempio in cui potresti voler importare i tipi direttamente
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// Per altri casi, puoi utilizzare il namespace `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Altre opzioni di configurazione
}
```

## Suggerimenti e consigli

### Compilazione e Lint

Per essere completamente sicuro, puoi considerare di seguire le migliori pratiche: compila il tuo codice con il compilatore TypeScript (esegui `tsc` o `npx tsc`) e usa [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) in esecuzione su [hook pre-commit](https://github.com/typicode/husky).