---
id: gettingstarted
title: Erste Schritte
---

Willkommen bei der WebdriverIO-Dokumentation. Sie wird Ihnen helfen, schnell einzusteigen. Wenn Sie auf Probleme stoßen, können Sie Hilfe und Antworten auf unserem [Discord Support Server](https://discord.webdriver.io) finden oder uns auf [𝕏](https://x.com/webdriverio) kontaktieren.

:::info
Dies ist die Dokumentation für die neueste Version (__>=9.x__) von WebdriverIO. Wenn Sie noch eine ältere Version verwenden, besuchen Sie bitte die [alten Dokumentationswebsites](/versions)!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Offizieller YouTube-Kanal 🎥

Weitere Videos rund um WebdriverIO finden Sie auf dem [offiziellen YouTube-Kanal](https://youtube.com/@webdriverio). Vergessen Sie nicht zu abonnieren!

:::

## WebdriverIO-Setup initiieren

Um ein vollständiges WebdriverIO-Setup zu einem bestehenden oder neuen Projekt hinzuzufügen, verwenden Sie das [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) mit folgendem Befehl:

Wenn Sie sich im Stammverzeichnis eines bestehenden Projekts befinden, führen Sie aus:

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

oder wenn Sie ein neues Projekt erstellen möchten:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

oder wenn Sie ein neues Projekt erstellen möchten:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

oder wenn Sie ein neues Projekt erstellen möchten:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

oder wenn Sie ein neues Projekt erstellen möchten:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Dieser einzelne Befehl lädt das WebdriverIO CLI-Tool herunter und führt einen Konfigurationsassistenten aus, der Ihnen bei der Konfiguration Ihrer Testsuite hilft.

<CreateProjectAnimation />

Der Assistent stellt eine Reihe von Fragen, die Sie durch die Einrichtung führen. Sie können einen `--yes` Parameter übergeben, um eine Standardeinrichtung zu wählen, die Mocha mit Chrome unter Verwendung des [Page Object](https://martinfowler.com/bliki/PageObject.html) Musters verwendet.

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

## CLI manuell installieren

Sie können das CLI-Paket auch manuell zu Ihrem Projekt hinzufügen:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # gibt z.B. `8.13.10` aus

# Konfigurationsassistenten ausführen
npx wdio config
```

## Test ausführen

Sie können Ihre Testsuite mit dem Befehl `run` starten und auf die WebdriverIO-Konfiguration verweisen, die Sie gerade erstellt haben:

```sh
npx wdio run ./wdio.conf.js
```

Wenn Sie bestimmte Testdateien ausführen möchten, können Sie einen `--spec` Parameter hinzufügen:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

oder definieren Sie Suites in Ihrer Konfigurationsdatei und führen Sie nur die Testdateien aus, die in einer Suite definiert sind:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## In einem Skript ausführen

Wenn Sie WebdriverIO als Automatisierungs-Engine im [Standalone-Modus](/docs/setuptypes#standalone-mode) innerhalb eines Node.JS-Skripts verwenden möchten, können Sie WebdriverIO auch direkt installieren und als Paket verwenden, z.B. um einen Screenshot einer Website zu erstellen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Hinweis:__ Alle WebdriverIO-Befehle sind asynchron und müssen mit [`async/await`](https://javascript.info/async-await) ordnungsgemäß behandelt werden.

## Tests aufzeichnen

WebdriverIO bietet Tools, die Ihnen helfen, den Einstieg zu erleichtern, indem Sie Ihre Testaktionen auf dem Bildschirm aufzeichnen und automatisch WebdriverIO-Testskripte generieren. Weitere Informationen finden Sie unter [Tests mit Chrome DevTools Recorder aufzeichnen](/docs/record).

## Systemanforderungen

Sie benötigen [Node.js](http://nodejs.org) auf Ihrem System.

- Installieren Sie mindestens v18.20.0 oder höher, da dies die älteste aktive LTS-Version ist
- Offiziell werden nur Versionen unterstützt, die bereits eine LTS-Version sind oder eine werden

Wenn Node derzeit nicht auf Ihrem System installiert ist, empfehlen wir die Verwendung eines Tools wie [NVM](https://github.com/creationix/nvm) oder [Volta](https://volta.sh/), um bei der Verwaltung mehrerer aktiver Node.js-Versionen zu helfen. NVM ist eine beliebte Wahl, während Volta ebenfalls eine gute Alternative darstellt.