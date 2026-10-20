---
id: gettingstarted
title: Erste Schritte
description: Erstelle ein WebdriverIO-Projekt mit npm init wdio@latest, führe deinen ersten Test aus und finde die nächste Anleitung für deine Plattform.
---

Richte WebdriverIO mit einem einzigen Befehl in einem bestehenden oder neuen Projekt ein und führe dann deinen ersten Test aus. Der Konfigurationsassistent fragt, was du testen möchtest (Web, Mobile, Desktop oder VS Code-Erweiterungen), welches Framework und welche Reporter verwendet werden sollen, und installiert alles für dich.

:::info
Dies ist die Dokumentation für WebdriverIO __v10__. Noch auf v9? Verwende die [v9-Dokumentation](https://v9.webdriver.io) oder folge dem [v10-Migrationsleitfaden](/docs/v10-migration).
:::

:::tip Verwendest du einen Coding Agent?
Verweise ihn auf [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) oder verbinde den Docs-MCP-Server unter `https://webdriver.io/mcp`. Siehe [WebdriverIO für Coding Agents](/docs/ai-agents).
:::

## Ein WebdriverIO-Setup initiieren

Das [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) fügt einem bestehenden oder neuen Projekt ein vollständiges WebdriverIO-Setup hinzu. Führe im Stammverzeichnis eines bestehenden Projekts Folgendes aus:

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

oder wenn du ein neues Projekt erstellen möchtest:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

oder wenn du ein neues Projekt erstellen möchtest:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

oder wenn du ein neues Projekt erstellen möchtest:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

oder wenn du ein neues Projekt erstellen möchtest:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Dieser eine Befehl lädt das WebdriverIO-CLI-Tool herunter und startet einen Konfigurationsassistenten, der dir hilft, deine Testsuite zu konfigurieren.

<CreateProjectAnimation />

Der Assistent stellt eine Reihe von Fragen, die dich durch die Einrichtung führen. Du kannst einen `--yes`-Parameter übergeben, um ein Standard-Setup zu wählen, das Mocha mit Chrome und dem [Page Object](https://martinfowler.com/bliki/PageObject.html)-Muster verwendet.

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

Jede Frage im Assistenten hat ein Kommandozeilen-Flag. Ein Flag beantwortet seine Frage, und der Assistent fragt nur noch den Rest ab. Zusammen mit `--yes` verwendet der Assistent für den Rest die Standardwerte und stellt keine Fragen, was ein Coding Agent oder ein CI-Job benötigt:

```sh
# Cucumber in JavaScript, mit den Spec- und JUnit-Reportern
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox und Edge statt Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# Eine Android-App mit Appium
npm init wdio@latest . -- --yes --mobile-environment android

# React-Komponententests
npm init wdio@latest . -- --yes --runner component --preset react

# Die Konfiguration schreiben, aber die Abhängigkeiten selbst installieren
npm init wdio@latest . -- --yes --no-npm-install
```

Übergib die Flags bei Yarn, pnpm und bun ohne das Trennzeichen `--`, z. B. `pnpm create wdio@latest . --yes --framework cucumber`.

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
| `--agent-support` / `--no-agent-support` | Den `AGENTS.md`-Abschnitt und den `wdio-session`-Skill schreiben (standardmäßig aktiviert) |
| `--npm-install` / `--no-npm-install` | Die Abhängigkeiten installieren (standardmäßig aktiviert) |

`npm init wdio@latest -- --help` listet jedes Flag, die akzeptierten Werte und die Frage auf, die es beantwortet. Boolesche Flags werden mit dem Präfix `--no-` negiert. Dieselben Flags funktionieren auch mit `npx wdio config`.

Der Assistent prüft jedes Flag anhand deines Setups. Ein unbekannter Wert, ein Flag für eine Frage, die er nicht stellen würde, oder ein Wert, den er für dein Setup nicht anbieten würde, bricht ihn mit Exit-Code 2 ab, bevor er eine Datei schreibt:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## CLI manuell installieren

Du kannst das CLI-Paket auch manuell zu deinem Projekt hinzufügen:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # gibt z. B. `8.13.10` aus

# Konfigurationsassistenten ausführen
npx wdio config
```

## Test ausführen

Du kannst deine Testsuite mit dem `run`-Befehl starten, indem du auf die WebdriverIO-Konfiguration verweist, die du gerade erstellt hast:

```sh
npx wdio run ./wdio.conf.js
```

Wenn du bestimmte Testdateien ausführen möchtest, kannst du einen `--spec`-Parameter hinzufügen:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

oder Suites in deiner Konfigurationsdatei definieren und nur die in einer Suite definierten Testdateien ausführen:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## In einem Skript ausführen

Wenn du WebdriverIO als Automatisierungs-Engine im [Standalone-Modus](/docs/setuptypes#standalone-mode) innerhalb eines Node.JS-Skripts verwenden möchtest, kannst du WebdriverIO auch direkt installieren und als Paket verwenden, z. B. um einen Screenshot einer Website zu erstellen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Hinweis:__ Alle WebdriverIO-Befehle sind asynchron und müssen mit [`async/await`](https://javascript.info/async-await) korrekt behandelt werden.

## Tests aufzeichnen

WebdriverIO bietet Tools, die dir den Einstieg erleichtern, indem sie deine Testaktionen auf dem Bildschirm aufzeichnen und automatisch WebdriverIO-Testskripte generieren. Weitere Informationen findest du unter [Tests mit dem Chrome DevTools Recorder aufzeichnen](/docs/record).

## Systemanforderungen

Du benötigst eine Installation von [Node.js](http://nodejs.org).

- Installiere mindestens v22.19.0 oder höher, da dies die älteste unterstützte LTS-Version ist
- Offiziell unterstützt werden nur Releases, die LTS-Releases sind oder werden

Falls Node derzeit nicht auf deinem System installiert ist, empfehlen wir die Verwendung eines Tools wie [NVM](https://github.com/creationix/nvm) oder [Volta](https://volta.sh/), um mehrere aktive Node.js-Versionen zu verwalten. NVM ist eine beliebte Wahl, aber auch Volta ist eine gute Alternative.

## Die Einführung ansehen

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

Weitere Videos findest du auf dem [offiziellen YouTube-Kanal](https://youtube.com/@webdriverio).

## Nächste Schritte

- Wähle deine Plattform: [Webbrowser](/docs/platforms/web), [Mobile Apps](/docs/platforms/mobile), [Desktop-Apps](/docs/platforms/desktop) oder [Erweiterungen & Editoren](/docs/platforms/apps-and-extensions)
- Lerne, wie du [Elemente auswählst](/docs/selectors) und [Assertions](/docs/assertion) schreibst
- Konfiguriere den Testrunner in [`wdio.conf.ts`](/docs/configurationfile)
- Hol dir Hilfe auf [Discord](https://discord.webdriver.io)