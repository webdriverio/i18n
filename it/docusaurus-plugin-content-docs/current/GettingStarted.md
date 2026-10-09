---
id: gettingstarted
title: Per Iniziare
description: Crea un progetto WebdriverIO con npm init wdio@latest, esegui il tuo primo test e trova la prossima guida per la tua piattaforma.
---

Configura WebdriverIO in un progetto esistente o nuovo con un solo comando, quindi esegui il tuo primo test. La procedura guidata di configurazione ti chiede cosa vuoi testare (web, mobile, desktop o estensioni di VS Code), quale framework e quali reporter utilizzare, e installa tutto per te.

:::info
Questa è la documentazione per WebdriverIO __v10__. Usi ancora la v9? Consulta la [documentazione v9](https://v9.webdriver.io) o segui la [guida alla migrazione alla v10](/docs/v10-migration).
:::

:::tip Usi un coding agent?
Indirizzalo a [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) oppure collega il server MCP della documentazione all'indirizzo `https://webdriver.io/mcp`. Consulta [WebdriverIO per Coding Agent](/docs/ai-agents).
:::

## Avviare una Configurazione WebdriverIO

Lo [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) aggiunge una configurazione completa di WebdriverIO a un progetto esistente o nuovo. Nella directory principale di un progetto esistente, esegui:

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

oppure, se vuoi creare un nuovo progetto:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

oppure, se vuoi creare un nuovo progetto:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

oppure, se vuoi creare un nuovo progetto:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

oppure, se vuoi creare un nuovo progetto:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Questo singolo comando scarica lo strumento CLI di WebdriverIO ed esegue una procedura guidata di configurazione che ti aiuta a configurare la tua suite di test.

<CreateProjectAnimation />

La procedura guidata ti porrà una serie di domande che ti guideranno attraverso la configurazione. Puoi passare il parametro `--yes` per scegliere una configurazione predefinita che utilizzerà Mocha con Chrome seguendo il pattern [Page Object](https://martinfowler.com/bliki/PageObject.html).

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

### Rispondere alla procedura guidata con i flag

Ogni domanda della procedura guidata ha un flag da riga di comando. Un flag risponde alla sua domanda e la procedura guidata chiede solo le restanti. Insieme a `--yes`, la procedura guidata usa i valori predefiniti per il resto e non pone mai domande, ed è proprio ciò di cui ha bisogno un coding agent o un job di CI:

```sh
# Cucumber in JavaScript, con i reporter spec e JUnit
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox ed Edge invece di Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# Un'app Android con Appium
npm init wdio@latest . -- --yes --mobile-environment android

# Test di componenti React
npm init wdio@latest . -- --yes --runner component --preset react

# Scrivi la configurazione, ma installa le dipendenze manualmente
npm init wdio@latest . -- --yes --no-npm-install
```

Con Yarn, pnpm e bun, passa i flag senza il separatore `--`, ad esempio `pnpm create wdio@latest . --yes --framework cucumber`.

I flag più comuni:

| Flag | Valori |
| --- | --- |
| `--runner` | `e2e` (predefinito), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (predefinito), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | TypeScript è il predefinito quando il progetto ha un `tsconfig.json` |
| `--browsers` | Elenco separato da virgole di `chrome` (predefinito), `firefox`, `safari`, `edge` |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (predefinito), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, con `--runner component` |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, con `--runner desktop` |
| `--reporters`, `--services`, `--plugins` | Nomi brevi separati da virgole, ad esempio `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | Scrive la sezione `AGENTS.md` e la skill `wdio-session` (attivo per impostazione predefinita) |
| `--npm-install` / `--no-npm-install` | Installa le dipendenze (attivo per impostazione predefinita) |

`npm init wdio@latest -- --help` elenca ogni flag, i valori che accetta e la domanda a cui risponde. I flag booleani accettano il prefisso `--no-`. Gli stessi flag funzionano con `npx wdio config`.

La procedura guidata verifica ogni flag rispetto alla tua configurazione. Un valore sconosciuto, un flag per una domanda che non verrebbe posta, o un valore che non verrebbe offerto per la tua configurazione la interrompono con codice di uscita 2 prima che venga scritto qualsiasi file:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## Installare la CLI Manualmente

Puoi anche aggiungere manualmente il pacchetto CLI al tuo progetto tramite:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # stampa ad es. `8.13.10`

# esegui la procedura guidata di configurazione
npx wdio config
```

## Eseguire i Test

Puoi avviare la tua suite di test utilizzando il comando `run` e indicando la configurazione WebdriverIO che hai appena creato:

```sh
npx wdio run ./wdio.conf.js
```

Se desideri eseguire file di test specifici, puoi aggiungere il parametro `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

oppure definire delle suite nel tuo file di configurazione ed eseguire solo i file di test definiti in una suite:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Eseguire in uno script

Se desideri utilizzare WebdriverIO come motore di automazione in [Modalità Standalone](/docs/setuptypes#standalone-mode) all'interno di uno script Node.JS, puoi anche installare direttamente WebdriverIO e usarlo come pacchetto, ad esempio per generare uno screenshot di un sito web:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Nota:__ tutti i comandi WebdriverIO sono asincroni e devono essere gestiti correttamente utilizzando [`async/await`](https://javascript.info/async-await).

## Registrare i test

WebdriverIO fornisce strumenti che ti aiutano a iniziare registrando le tue azioni di test sullo schermo e generando automaticamente script di test WebdriverIO. Consulta [Registrare i test con Chrome DevTools Recorder](/docs/record) per maggiori informazioni.

## Requisiti di Sistema

È necessario avere [Node.js](http://nodejs.org) installato.

- Installa almeno la v22.19.0 o superiore, poiché è la versione LTS più vecchia supportata
- Sono ufficialmente supportate solo le release che sono o diventeranno release LTS

Se Node non è attualmente installato sul tuo sistema, suggeriamo di utilizzare uno strumento come [NVM](https://github.com/creationix/nvm) o [Volta](https://volta.sh/) per gestire più versioni attive di Node.js. NVM è una scelta popolare, mentre anche Volta è una buona alternativa.

## Guarda l'Introduzione

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

Altri video sono disponibili sul [canale YouTube ufficiale](https://youtube.com/@webdriverio).

## Prossimi Passi

- Scegli la tua piattaforma: [Browser Web](/docs/platforms/web), [App Mobile](/docs/platforms/mobile), [App Desktop](/docs/platforms/desktop) o [Estensioni ed Editor](/docs/platforms/apps-and-extensions)
- Scopri come [selezionare gli elementi](/docs/selectors) e scrivere le [asserzioni](/docs/assertion)
- Configura il test runner in [`wdio.conf.ts`](/docs/configurationfile)
- Ottieni aiuto su [Discord](https://discord.webdriver.io)