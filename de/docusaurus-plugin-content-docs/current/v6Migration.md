---
id: v6-migration
title: Von v5 zu v6
description: "Aktualisieren Sie ein WebdriverIO-Projekt von v5 auf v6, indem Sie die Abhängigkeiten aktualisieren, die Konfigurationsdatei transformieren und Specs sowie Page Objects aktualisieren."
---

Dieses Tutorial richtet sich an Personen, die noch `v5` von WebdriverIO verwenden und auf `v6` oder die neueste Version von WebdriverIO migrieren möchten. Wie in unserem [Release-Blogbeitrag](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released) erwähnt, lassen sich die Änderungen für dieses Versions-Upgrade wie folgt zusammenfassen:

- wir haben die Parameter für einige Befehle konsolidiert (z. B. `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) und alle optionalen Parameter in ein einzelnes Objekt verschoben, z. B.

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- Konfigurationen für Services wurden in die Service-Liste verschoben, z. B.

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- einige Service-Optionen wurden zur Vereinfachung umbenannt
- wir haben den Befehl `launchApp` für Chrome-WebDriver-Sessions in `launchChromeApp` umbenannt

:::info

Wenn Sie WebdriverIO `v4` oder älter verwenden, führen Sie bitte zuerst ein Upgrade auf `v5` durch.

:::

Auch wenn wir uns einen vollständig automatisierten Prozess wünschen würden, sieht die Realität anders aus. Jeder hat ein anderes Setup. Jeder Schritt sollte eher als Orientierungshilfe und weniger als Schritt-für-Schritt-Anleitung verstanden werden. Wenn Sie Probleme mit der Migration haben, zögern Sie nicht, [uns zu kontaktieren](https://github.com/webdriverio/codemod/discussions/new).

## Setup

Ähnlich wie bei anderen Migrationen können wir den WebdriverIO-[Codemod](https://github.com/webdriverio/codemod) verwenden. Um den Codemod zu installieren, führen Sie Folgendes aus:

```sh
npm install jscodeshift @wdio/codemod
```

## WebdriverIO-Abhängigkeiten aktualisieren

Da alle WebdriverIO-Versionen eng miteinander verknüpft sind, ist es am besten, immer auf einen bestimmten Tag zu aktualisieren, z. B. `6.12.0`. Wenn Sie sich entscheiden, direkt von `v5` auf `v7` zu aktualisieren, können Sie den Tag weglassen und die neuesten Versionen aller Pakete installieren. Dazu kopieren wir alle WebdriverIO-bezogenen Abhängigkeiten aus unserer `package.json` und installieren sie erneut über:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Normalerweise sind WebdriverIO-Abhängigkeiten Teil der Dev-Dependencies, was je nach Projekt jedoch variieren kann. Danach sollten Ihre `package.json` und `package-lock.json` aktualisiert sein. __Hinweis:__ Dies sind Beispielabhängigkeiten, Ihre können davon abweichen. Stellen Sie sicher, dass Sie die neueste v6-Version finden, indem Sie z. B. Folgendes aufrufen:

```sh
npm show webdriverio versions
```

Versuchen Sie, für alle Core-Pakete von WebdriverIO die neueste verfügbare Version 6 zu installieren. Bei Community-Paketen kann dies von Paket zu Paket unterschiedlich sein. Hier empfehlen wir, das Changelog auf Informationen darüber zu prüfen, welche Version noch mit v6 kompatibel ist.

## Konfigurationsdatei transformieren

Ein guter erster Schritt ist, mit der Konfigurationsdatei zu beginnen. Alle Breaking Changes können mit dem Codemod vollautomatisch behoben werden:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Der Codemod unterstützt noch keine TypeScript-Projekte. Siehe [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Wir arbeiten daran, die Unterstützung dafür bald zu implementieren. Wenn Sie TypeScript verwenden, beteiligen Sie sich bitte!

:::

## Spec-Dateien und Page Objects aktualisieren

Um alle Befehlsänderungen zu übernehmen, führen Sie den Codemod auf allen Ihren E2E-Dateien aus, die WebdriverIO-Befehle enthalten, z. B.:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

Das war's! Keine weiteren Änderungen notwendig 🎉

## Fazit

Wir hoffen, dass dieses Tutorial Sie ein wenig durch den Migrationsprozess zu WebdriverIO `v6` führt. Wir empfehlen dringend, weiter auf die neueste Version zu aktualisieren, da das Update auf `v7` aufgrund fast fehlender Breaking Changes trivial ist. Bitte sehen Sie sich den Migrationsleitfaden [für das Upgrade auf v7](v7-migration) an.

Die Community verbessert den Codemod kontinuierlich, während sie ihn mit verschiedenen Teams in verschiedenen Organisationen testet. Zögern Sie nicht, [ein Issue zu erstellen](https://github.com/webdriverio/codemod/issues/new), wenn Sie Feedback haben, oder [eine Diskussion zu starten](https://github.com/webdriverio/codemod/discussions/new), wenn Sie während des Migrationsprozesses auf Schwierigkeiten stoßen.