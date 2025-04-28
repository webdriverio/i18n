---
id: gettingstarted
title: Komma igång
---

Välkommen till WebdriverIO-dokumentationen. Den hjälper dig att komma igång snabbt. Om du stöter på problem kan du hitta hjälp och svar på vår [Discord Support Server](https://discord.webdriver.io) eller kontakta mig på [Twitter](https://twitter.com/webdriverio).

:::info
Detta är dokumentationen för den senaste versionen (__>=9.x__) av WebdriverIO. Om du fortfarande använder en äldre version, besök [gamla dokumentationswebbplatser](/versions)!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Officiell YouTube-kanal 🎥

Du kan hitta fler videor om WebdriverIO på den [officiella YouTube-kanalen](https://youtube.com/@webdriverio). Se till att du prenumererar!

:::

## Starta en WebdriverIO-konfiguration

För att lägga till en fullständig WebdriverIO-konfiguration till ett befintligt eller nytt projekt med hjälp av [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio), kör:

Om du befinner dig i rotkatalogen för ett befintligt projekt, kör:

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

Detta enda kommando laddar ner WebdriverIO CLI-verktyget och kör en konfigurationsguide som hjälper dig att konfigurera din testsuite.

<CreateProjectAnimation />

Guiden kommer att ställa en uppsättning frågor som vägleder dig genom konfigurationen. Du kan skicka en `--yes`-parameter för att välja en standardkonfiguration som kommer att använda Mocha med Chrome och [Page Object](https://martinfowler.com/bliki/PageObject.html)-mönstret.

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

## Installera CLI manuellt

Du kan också lägga till CLI-paketet till ditt projekt manuellt via:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # skriver ut t.ex. `8.13.10`

# kör konfigurationsguiden
npx wdio config
```

## Kör test

Du kan starta din testsuite genom att använda kommandot `run` och peka på WebdriverIO-konfigurationen som du just skapat:

```sh
npx wdio run ./wdio.conf.js
```

Om du vill köra specifika testfiler kan du lägga till en `--spec`-parameter:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

eller definiera testsviter i din konfigurationsfil och bara köra de testfiler som definierats i en svit:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Kör i ett skript

Om du vill använda WebdriverIO som en automatiseringsmotor i [Fristående läge](/docs/setuptypes#standalone-mode) inom ett Node.JS-skript kan du också direkt installera WebdriverIO och använda det som ett paket, t.ex. för att generera en skärmdump av en webbplats:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Obs:__ alla WebdriverIO-kommandon är asynkrona och måste hanteras korrekt med [`async/await`](https://javascript.info/async-await).

## Spela in tester

WebdriverIO tillhandahåller verktyg för att hjälpa dig komma igång genom att spela in dina teståtgärder på skärmen och automatiskt generera WebdriverIO-testskript. Se [Spela in tester med Chrome DevTools Recorder](/docs/record) för mer information.

## Systemkrav

Du behöver ha [Node.js](http://nodejs.org) installerat.

- Installera minst v18.20.0 eller högre eftersom detta är den äldsta aktiva LTS-versionen
- Endast versioner som är eller kommer att bli en LTS-version stöds officiellt

Om Node för närvarande inte är installerat på ditt system föreslår vi att du använder ett verktyg som [NVM](https://github.com/creationix/nvm) eller [Volta](https://volta.sh/) för att hjälpa till att hantera flera aktiva Node.js-versioner. NVM är ett populärt val, medan Volta också är ett bra alternativ.