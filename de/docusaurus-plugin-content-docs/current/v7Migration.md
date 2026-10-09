---
id: v7-migration
title: Von v6 zu v7
description: "Aktualisieren Sie ein WebdriverIO-Projekt von v6 auf v7, indem Sie die Abhängigkeiten aktualisieren, die Konfigurationsdatei transformieren und die Cucumber-Step-Definitionen anpassen."
---

Dieses Tutorial richtet sich an Personen, die noch `v6` von WebdriverIO verwenden und auf `v7` migrieren möchten. Wie in unserem [Release-Blogbeitrag](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released) erwähnt, betreffen die Änderungen hauptsächlich interne Abläufe, und das Upgrade sollte ein unkomplizierter Prozess sein.

:::info

Wenn Sie WebdriverIO `v5` oder älter verwenden, aktualisieren Sie bitte zuerst auf `v6`. Bitte sehen Sie sich unseren [v6-Migrationsleitfaden](v6-migration) an.

:::

Obwohl wir gerne einen vollständig automatisierten Prozess dafür hätten, sieht die Realität anders aus. Jeder hat ein anderes Setup. Jeder Schritt sollte eher als Orientierungshilfe und weniger als Schritt-für-Schritt-Anleitung betrachtet werden. Wenn Sie Probleme bei der Migration haben, zögern Sie nicht, [uns zu kontaktieren](https://github.com/webdriverio/codemod/discussions/new).

## Setup

Ähnlich wie bei anderen Migrationen können wir den WebdriverIO-[Codemod](https://github.com/webdriverio/codemod) verwenden. Für dieses Tutorial verwenden wir ein [Boilerplate-Projekt](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), das von einem Community-Mitglied eingereicht wurde, und migrieren es vollständig von `v6` auf `v7`.

Um den Codemod zu installieren, führen Sie Folgendes aus:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commits:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## WebdriverIO-Abhängigkeiten aktualisieren

Da alle WebdriverIO-Versionen eng miteinander verknüpft sind, ist es am besten, immer auf ein bestimmtes Tag zu aktualisieren, z. B. `latest`. Dazu kopieren wir alle WebdriverIO-bezogenen Abhängigkeiten aus unserer `package.json` und installieren sie erneut über:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Normalerweise sind WebdriverIO-Abhängigkeiten Teil der Dev-Dependencies, dies kann jedoch je nach Projekt variieren. Danach sollten Ihre `package.json` und `package-lock.json` aktualisiert sein. __Hinweis:__ Dies sind die Abhängigkeiten, die vom [Beispielprojekt](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) verwendet werden; Ihre können davon abweichen.

#### Commits:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Konfigurationsdatei transformieren

Ein guter erster Schritt ist es, mit der Konfigurationsdatei zu beginnen. In WebdriverIO `v7` müssen keine Compiler mehr manuell registriert werden. Tatsächlich müssen sie sogar entfernt werden. Dies kann mit dem Codemod vollständig automatisch erledigt werden:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Der Codemod unterstützt TypeScript-Projekte noch nicht. Siehe [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Wir arbeiten daran, die Unterstützung dafür bald zu implementieren. Wenn Sie TypeScript verwenden, beteiligen Sie sich bitte!

:::

#### Commits:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Step-Definitionen aktualisieren

Wenn Sie Jasmine oder Mocha verwenden, sind Sie hier fertig. Der letzte Schritt besteht darin, die Cucumber.js-Imports von `cucumber` auf `@cucumber/cucumber` zu aktualisieren. Dies kann ebenfalls automatisch über den Codemod erfolgen:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

Das war's! Keine weiteren Änderungen notwendig 🎉

#### Commits:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Fazit

Wir hoffen, dass dieses Tutorial Sie ein wenig durch den Migrationsprozess zu WebdriverIO `v7` begleitet. Die Community verbessert den Codemod kontinuierlich, während sie ihn mit verschiedenen Teams in verschiedenen Organisationen testet. Zögern Sie nicht, [ein Issue zu erstellen](https://github.com/webdriverio/codemod/issues/new), wenn Sie Feedback haben, oder [eine Diskussion zu starten](https://github.com/webdriverio/codemod/discussions/new), wenn Sie während des Migrationsprozesses Schwierigkeiten haben.