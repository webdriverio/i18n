---
id: gettingstarted
title: Iniziare
---

Benvenuto alla documentazione di WebdriverIO. Ti aiuterà a iniziare velocemente. Se riscontri problemi, puoi trovare aiuto e risposte sul nostro [Server di Supporto Discord](https://discord.webdriver.io) o puoi contattarci su [𝕏](https://x.com/webdriverio).

:::info
Questa è la documentazione per la versione più recente (__>=9.x__) di WebdriverIO. Se stai ancora utilizzando una versione precedente, visita i [vecchi siti di documentazione](/versions)!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Canale YouTube Ufficiale 🎥

Puoi trovare più video su WebdriverIO sul [canale YouTube ufficiale](https://youtube.com/@webdriverio). Assicurati di iscriverti!

:::

## Inizia una configurazione WebdriverIO

Per aggiungere una configurazione completa di WebdriverIO a un progetto esistente o nuovo utilizzando [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio), esegui:

Se sei nella directory principale di un progetto esistente, esegui:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

o se vuoi creare un nuovo progetto:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

o se vuoi creare un nuovo progetto:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

o se vuoi creare un nuovo progetto:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

o se vuoi creare un nuovo progetto:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Questo singolo comando scarica lo strumento CLI di WebdriverIO ed esegue una procedura guidata di configurazione che ti aiuta a configurare la tua suite di test.

<CreateProjectAnimation />

La procedura guidata ti porrà una serie di domande che ti guideranno attraverso la configurazione. Puoi passare un parametro `--yes` per scegliere una configurazione predefinita che utilizzerà Mocha con Chrome usando il pattern [Page Object](https://martinfowler.com/bliki/PageObject.html).

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

## Installare CLI manualmente

Puoi anche aggiungere manualmente il pacchetto CLI al tuo progetto tramite:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # stampa ad esempio `8.13.10`

# esegui la procedura guidata di configurazione
npx wdio config
```

## Eseguire i test

Puoi avviare la tua suite di test utilizzando il comando `run` e puntando alla configurazione WebdriverIO che hai appena creato:

```sh
npx wdio run ./wdio.conf.js
```

Se desideri eseguire file di test specifici, puoi aggiungere un parametro `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

o definire suite nel tuo file di configurazione ed eseguire solo i file di test definiti in una suite:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Eseguire in uno script

Se desideri utilizzare WebdriverIO come motore di automazione in [Standalone Mode](/docs/setuptypes#standalone-mode) all'interno di uno script Node.JS, puoi anche installare direttamente WebdriverIO e utilizzarlo come pacchetto, ad esempio per generare uno screenshot di un sito web:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Nota:__ tutti i comandi WebdriverIO sono asincroni e devono essere gestiti correttamente utilizzando [`async/await`](https://javascript.info/async-await).

## Registrare test

WebdriverIO fornisce strumenti per aiutarti a iniziare registrando le tue azioni di test sullo schermo e generando automaticamente script di test WebdriverIO. Vedi [Registrare test con Chrome DevTools Recorder](/docs/record) per ulteriori informazioni.

## Requisiti di sistema

Avrai bisogno di [Node.js](http://nodejs.org) installato.

- Installa almeno v18.20.0 o superiore poiché questa è la versione LTS attiva più vecchia
- Sono ufficialmente supportate solo le versioni che sono o diventeranno una versione LTS

Se Node non è attualmente installato sul tuo sistema, ti suggeriamo di utilizzare uno strumento come [NVM](https://github.com/creationix/nvm) o [Volta](https://volta.sh/) per aiutarti a gestire più versioni attive di Node.js. NVM è una scelta popolare, mentre Volta è anche una buona alternativa.