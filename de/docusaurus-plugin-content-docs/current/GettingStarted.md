---
id: gettingstarted
title: Erste Schritte
description: Erstellen Sie ein WebdriverIO-Projekt mit npm init wdio@latest, führen Sie Ihren ersten Test aus und finden Sie den nächsten Leitfaden für Ihre Plattform.
---

Richten Sie WebdriverIO mit einem einzigen Befehl in einem bestehenden oder neuen Projekt ein und führen Sie dann Ihren ersten Test aus. Der Konfigurationsassistent fragt, was Sie testen möchten (Web, Mobile, Desktop oder VS Code-Erweiterungen), welches Framework und welche Reporter verwendet werden sollen, und installiert alles für Sie.

:::info
Dies ist die Dokumentation für WebdriverIO __v10__. Sie verwenden noch v9? Nutzen Sie die [v9-Dokumentation](https://v9.webdriver.io) oder folgen Sie dem [v10-Migrationsleitfaden](/docs/v10-migration).
:::

:::tip Verwenden Sie einen Coding-Agent?
Verweisen Sie ihn auf [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) oder verbinden Sie den Docs-MCP-Server unter `https://webdriver.io/mcp`. Siehe [WebdriverIO für Coding-Agents](/docs/ai-agents).
:::

## Ein WebdriverIO-Setup initiieren

Das [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) fügt einem bestehenden oder neuen Projekt ein vollständiges WebdriverIO-Setup hinzu. Führen Sie im Stammverzeichnis eines bestehenden Projekts Folgendes aus:

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

Dieser einzelne Befehl lädt das WebdriverIO-CLI-Tool herunter und startet einen Konfigurationsassistenten, der Ihnen bei der Konfiguration Ihrer Testsuite hilft.

<CreateProjectAnimation />

Der Assistent stellt eine Reihe von Fragen, die Sie durch die Einrichtung führen. Sie können einen `--yes`-Parameter übergeben, um ein Standard-Setup zu wählen, das Mocha mit Chrome und dem [Page Object](https://martinfowler.com/bliki/PageObject.html)-Muster verwendet.

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

### Den Assistenten mit Flags beantworten

Jede Frage im Assistenten hat ein entsprechendes Kommandozeilen-Flag. Ein Flag beantwortet seine Frage, und der Assistent fragt nur noch den Rest ab. Zusammen mit `--yes` verwendet der Assistent für den Rest die Standardwerte und fragt nie nach – genau das, was ein Coding-Agent oder ein CI-Job benötigt:

```sh
# Cucumber in JavaScript, mit den Spec- und JUnit-Reportern
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox und Edge statt Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# Eine Android-App mit Appium
npm init wdio@latest . -- --yes --mobile-environment android

# React-Komponententests
npm init wdio@latest . -- --yes --runner component --preset react

# Die Konfiguration schreiben, die Abhängigkeiten aber selbst installieren
npm init wdio@latest . -- --yes --no-npm-install
```

Übergeben Sie die Flags bei Yarn, pnpm und bun ohne das `--`-Trennzeichen, z. B. `pnpm create wdio@latest . --yes --framework cucumber`.

Die gängigsten Flags:

| Flag | Werte |
| --- | --- |
| `--runner` | `e2e` (Standard), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (Standard), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | TypeScript ist der Standard, wenn das Projekt eine `tsconfig.json` hat |
| `--browsers` | Kommagetrennte Liste aus `chrome` (Standard), `firefox`, `safari`, `edge` |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (Standard), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, mit `--runner component` |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, mit `--runner desktop` |
| `--reporters`, `--services`, `--plugins` | Kommagetrennte Kurznamen, z. B. `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | Schreibt den `AGENTS.md`-Abschnitt und den `wdio-session`-Skill (standardmäßig aktiviert) |
| `--npm-install` / `--no-npm-install` | Installiert die Abhängigkeiten (standardmäßig aktiviert) |

`npm init wdio@latest -- --help` listet jedes Flag, die akzeptierten Werte und die Frage auf, die es beantwortet. Boolesche Flags akzeptieren ein `--no-`-Präfix. Dieselben Flags funktionieren auch mit `npx wdio config`.

Der Assistent prüft jedes Flag anhand Ihres Setups. Ein unbekannter Wert, ein Flag für eine Frage, die er nicht stellen würde, oder ein Wert, den er für Ihr Setup nicht anbieten würde, bricht den Vorgang mit Exit-Code 2 ab, bevor eine Datei geschrieben wird:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## CLI manuell installieren

Sie können das CLI-Paket auch manuell zu Ihrem Projekt hinzufügen:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # gibt z. B. `8.13.10` aus

# Konfigurationsassistent ausführen
npx wdio config
```

## Test ausführen

Sie können Ihre Testsuite mit dem Befehl `run` starten, indem Sie auf die soeben erstellte WebdriverIO-Konfiguration verweisen:

```sh
npx wdio run ./wdio.conf.js
```

Wenn Sie bestimmte Testdateien ausführen möchten, können Sie einen `--spec`-Parameter hinzufügen:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

oder Sie definieren Suites in Ihrer Konfigurationsdatei und führen nur die in einer Suite definierten Testdateien aus:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## In einem Skript ausführen

Wenn Sie WebdriverIO als Automatisierungs-Engine im [Standalone-Modus](/docs/setuptypes#standalone-mode) innerhalb eines Node.JS-Skripts verwenden möchten, können Sie WebdriverIO auch direkt installieren und als Paket nutzen, z. B. um einen Screenshot einer Website zu erstellen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Hinweis:__ Alle WebdriverIO-Befehle sind asynchron und müssen mit [`async/await`](https://javascript.info/async-await) korrekt behandelt werden.

## Tests aufzeichnen

WebdriverIO bietet Werkzeuge, die Ihnen den Einstieg erleichtern, indem sie Ihre Testaktionen auf dem Bildschirm aufzeichnen und automatisch WebdriverIO-Testskripte generieren. Weitere Informationen finden Sie unter [Tests mit dem Chrome DevTools Recorder aufzeichnen](/docs/record).

## Systemanforderungen

Sie benötigen eine Installation von [Node.js](http://nodejs.org).

- Installieren Sie mindestens v22.19.0 oder höher, da dies die älteste unterstützte LTS-Version ist
- Offiziell unterstützt werden nur Releases, die LTS-Releases sind oder werden

Falls Node derzeit nicht auf Ihrem System installiert ist, empfehlen wir ein Tool wie [NVM](https://github.com/creationix/nvm) oder [Volta](https://volta.sh/), um mehrere aktive Node.js-Versionen zu verwalten. NVM ist eine beliebte Wahl, während Volta ebenfalls eine gute Alternative ist.

## Die Einführung ansehen

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

Weitere Videos finden Sie auf dem [offiziellen YouTube-Kanal](https://youtube.com/@webdriverio).

## Nächste Schritte

- Wählen Sie Ihre Plattform: [Webbrowser](/docs/platforms/web), [Mobile Apps](/docs/platforms/mobile), [Desktop-Apps](/docs/platforms/desktop) oder [Erweiterungen & Editoren](/docs/platforms/apps-and-extensions)
- Lernen Sie, wie Sie [Elemente auswählen](/docs/selectors) und [Assertions](/docs/assertion) schreiben
- Konfigurieren Sie den Testrunner in [`wdio.conf.ts`](/docs/configurationfile)
- Holen Sie sich Hilfe auf [Discord](https://discord.webdriver.io)