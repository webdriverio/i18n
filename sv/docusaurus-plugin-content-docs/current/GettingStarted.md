---
id: gettingstarted
title: Kom igång
description: Skapa ett WebdriverIO-projekt med npm init wdio@latest, kör ditt första test och hitta nästa guide för din plattform.
---

Konfigurera WebdriverIO i ett befintligt eller nytt projekt med ett enda kommando och kör sedan ditt första test. Konfigurationsguiden frågar vad du vill testa (webb, mobil, desktop eller VS Code-tillägg), vilket ramverk och vilka rapportörer du vill använda, och installerar allt åt dig.

:::info
Detta är dokumentationen för WebdriverIO __v10__. Använder du fortfarande v9? Använd [v9-dokumentationen](https://v9.webdriver.io) eller följ [migreringsguiden för v10](/docs/v10-migration).
:::

:::tip Använder du en kodagent?
Peka den mot [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) eller anslut dokumentationens MCP-server på `https://webdriver.io/mcp`. Se [WebdriverIO för kodagenter](/docs/ai-agents).
:::

## Initiera en WebdriverIO-konfiguration

[WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) lägger till en komplett WebdriverIO-konfiguration i ett befintligt eller nytt projekt. Kör följande i rotkatalogen för ett befintligt projekt:

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

eller om du vill skapa ett nytt projekt:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

eller om du vill skapa ett nytt projekt:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

eller om du vill skapa ett nytt projekt:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

eller om du vill skapa ett nytt projekt:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Detta enda kommando laddar ner WebdriverIO CLI-verktyget och kör en konfigurationsguide som hjälper dig att konfigurera din testsvit.

<CreateProjectAnimation />

Guiden ställer en rad frågor som leder dig genom konfigurationen. Du kan skicka med parametern `--yes` för att välja en standardkonfiguration som använder Mocha med Chrome och mönstret [Page Object](https://martinfowler.com/bliki/PageObject.html).

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

### Besvara guiden med flaggor

Varje fråga i guiden har en kommandoradsflagga. En flagga besvarar sin fråga och guiden ställer bara de återstående frågorna. Tillsammans med `--yes` använder guiden standardvärdena för resten och frågar aldrig något, vilket är vad en kodagent eller ett CI-jobb behöver:

```sh
# Cucumber i JavaScript, med spec- och JUnit-rapportörerna
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox och Edge istället för Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# En Android-app med Appium
npm init wdio@latest . -- --yes --mobile-environment android

# React-komponenttester
npm init wdio@latest . -- --yes --runner component --preset react

# Skriv konfigurationen, men installera beroendena själv
npm init wdio@latest . -- --yes --no-npm-install
```

Med Yarn, pnpm och bun skickar du flaggorna utan avgränsaren `--`, t.ex. `pnpm create wdio@latest . --yes --framework cucumber`.

De vanligaste flaggorna:

| Flagga | Värden |
| --- | --- |
| `--runner` | `e2e` (standard), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (standard), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | TypeScript är standard när projektet har en `tsconfig.json` |
| `--browsers` | Kommaseparerad lista med `chrome` (standard), `firefox`, `safari`, `edge` |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (standard), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, med `--runner component` |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, med `--runner desktop` |
| `--reporters`, `--services`, `--plugins` | Kommaseparerade kortnamn, t.ex. `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | Skriv `AGENTS.md`-avsnittet och `wdio-session`-färdigheten (på som standard) |
| `--npm-install` / `--no-npm-install` | Installera beroendena (på som standard) |

`npm init wdio@latest -- --help` listar alla flaggor, de värden de accepterar och den fråga de besvarar. Booleska flaggor tar prefixet `--no-`. Samma flaggor fungerar med `npx wdio config`.

Guiden kontrollerar varje flagga mot din konfiguration. Ett okänt värde, en flagga för en fråga som den inte skulle ställa, eller ett värde som den inte skulle erbjuda för din konfiguration stoppar den med avslutningskod 2 innan den skriver någon fil:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## Installera CLI manuellt

Du kan också lägga till CLI-paketet i ditt projekt manuellt via:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # skriver ut t.ex. `8.13.10`

# kör konfigurationsguiden
npx wdio config
```

## Kör test

Du kan starta din testsvit genom att använda kommandot `run` och peka på den WebdriverIO-konfiguration som du just skapade:

```sh
npx wdio run ./wdio.conf.js
```

Om du vill köra specifika testfiler kan du lägga till parametern `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

eller definiera sviter i din konfigurationsfil och köra bara de testfiler som definieras i en svit:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Kör i ett skript

Om du vill använda WebdriverIO som automatiseringsmotor i [fristående läge](/docs/setuptypes#standalone-mode) i ett Node.JS-skript kan du också installera WebdriverIO direkt och använda det som ett paket, t.ex. för att ta en skärmdump av en webbplats:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Obs:__ alla WebdriverIO-kommandon är asynkrona och måste hanteras korrekt med [`async/await`](https://javascript.info/async-await).

## Spela in tester

WebdriverIO tillhandahåller verktyg som hjälper dig att komma igång genom att spela in dina teståtgärder på skärmen och generera WebdriverIO-testskript automatiskt. Se [Spela in tester med Chrome DevTools Recorder](/docs/record) för mer information.

## Systemkrav

Du behöver ha [Node.js](http://nodejs.org) installerat.

- Installera minst v22.19.0 eller högre, eftersom detta är den äldsta LTS-versionen som stöds
- Endast versioner som är eller kommer att bli en LTS-version stöds officiellt

Om Node inte är installerat på ditt system för närvarande föreslår vi att du använder ett verktyg som [NVM](https://github.com/creationix/nvm) eller [Volta](https://volta.sh/) för att hantera flera aktiva Node.js-versioner. NVM är ett populärt val, medan Volta också är ett bra alternativ.

## Se introduktionen

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

Fler videor finns på den [officiella YouTube-kanalen](https://youtube.com/@webdriverio).

## Nästa steg

- Välj din plattform: [Webbläsare](/docs/platforms/web), [Mobilappar](/docs/platforms/mobile), [Desktopappar](/docs/platforms/desktop) eller [Tillägg och redigerare](/docs/platforms/apps-and-extensions)
- Lär dig hur du [väljer element](/docs/selectors) och skriver [assertions](/docs/assertion)
- Konfigurera testköraren i [`wdio.conf.ts`](/docs/configurationfile)
- Få hjälp på [Discord](https://discord.webdriver.io)