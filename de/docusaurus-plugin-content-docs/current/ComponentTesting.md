---
id: component-testing
title: Komponententests
description: "Führen Sie Unit- und Komponententests in echten Browsern mit dem WebdriverIO Browser Runner aus, basierend auf Vite, inklusive Einrichtung, Test-Harness und Debugging."
---

Mit dem [Browser Runner](/docs/runner#browser-runner) von WebdriverIO können Sie Tests in einem echten Desktop- oder mobilen Browser ausführen und dabei WebdriverIO und das WebDriver-Protokoll verwenden, um das, was auf der Seite gerendert wird, zu automatisieren und damit zu interagieren. Dieser Ansatz hat [viele Vorteile](/docs/runner#browser-runner) gegenüber anderen Test-Frameworks, die nur das Testen gegen [JSDOM](https://www.npmjs.com/package/jsdom) erlauben.

## Browser-Unterstützung

Der Browser Runner führt das Test-Bundle im Browser aus. Dieses Bundle läuft in Chrome 90, Edge 90, Firefox 90 und Safari 14.1 sowie in späteren Versionen dieser Browser.

End-to-End-Tests laufen in Node.js. Code, der an [`browser.execute`](/docs/api/browser/execute) übergeben wird, läuft hingegen im automatisierten Browser, der älter sein kann als die oben genannten Versionen. Halten Sie diesen Code auf ES2021-Niveau.

## Wie funktioniert es?

Der Browser Runner verwendet [Vite](https://vitejs.dev/), um eine Testseite zu rendern und ein Test-Framework zu initialisieren, das Ihre Tests im Browser ausführt. Derzeit wird nur Mocha unterstützt, aber Jasmine und Cucumber sind [auf der Roadmap](https://github.com/orgs/webdriverio/projects/1). Dies ermöglicht es, jede Art von Komponenten zu testen, sogar in Projekten, die kein Vite verwenden.

Der Vite-Server wird vom WebdriverIO-Testrunner gestartet und so konfiguriert, dass Sie alle Reporter und Services wie gewohnt bei normalen E2E-Tests verwenden können. Darüber hinaus initialisiert er eine [`browser`](/docs/api/browser)-Instanz, die Ihnen Zugriff auf eine Teilmenge der [WebdriverIO-API](/docs/api) gibt, um mit beliebigen Elementen auf der Seite zu interagieren. Ähnlich wie bei E2E-Tests können Sie auf diese Instanz über die im globalen Scope verfügbare Variable `browser` zugreifen oder sie aus `@wdio/globals` importieren, je nachdem, wie [`injectGlobals`](/docs/api/globals) eingestellt ist.

WebdriverIO bietet integrierte Unterstützung für die folgenden Frameworks:

- [__Nuxt__](https://nuxt.com/): Der Testrunner von WebdriverIO erkennt eine Nuxt-Anwendung, richtet automatisch die Composables Ihres Projekts ein und hilft dabei, das Nuxt-Backend zu mocken. Mehr dazu in der [Nuxt-Dokumentation](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): Der Testrunner von WebdriverIO erkennt, ob Sie TailwindCSS verwenden, und lädt die Umgebung korrekt in die Testseite

## Einrichtung

Um WebdriverIO für Unit- oder Komponententests im Browser einzurichten, initiieren Sie ein neues WebdriverIO-Projekt über:

```bash
npm init wdio@latest ./
# oder
yarn create wdio ./
```

Sobald der Konfigurationsassistent startet, wählen Sie `browser` für die Ausführung von Unit- und Komponententests und wählen Sie gegebenenfalls eine der Voreinstellungen aus, andernfalls _"Other"_, wenn Sie nur einfache Unit-Tests ausführen möchten. Sie können auch eine benutzerdefinierte Vite-Konfiguration einrichten, falls Sie Vite bereits in Ihrem Projekt verwenden. Weitere Informationen finden Sie in allen [Runner-Optionen](/docs/runner#runner-options).

:::info

__Hinweis:__ WebdriverIO führt Browser-Tests in CI standardmäßig headless aus, z. B. wenn eine `CI`-Umgebungsvariable auf `'1'` oder `'true'` gesetzt ist. Sie können dieses Verhalten manuell über die [`headless`](/docs/runner#headless)-Option des Runners konfigurieren.

:::

Am Ende dieses Prozesses sollten Sie eine `wdio.conf.js` finden, die verschiedene WebdriverIO-Konfigurationen enthält, einschließlich einer `runner`-Eigenschaft, z. B.:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Durch das Definieren verschiedener [Capabilities](/docs/configuration#capabilities) können Sie Ihre Tests in verschiedenen Browsern ausführen, auf Wunsch auch parallel.

Wenn Sie noch unsicher sind, wie alles funktioniert, sehen Sie sich das folgende Tutorial zum Einstieg in Komponententests mit WebdriverIO an:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test-Harness

Es liegt ganz bei Ihnen, was Sie in Ihren Tests ausführen und wie Sie die Komponenten rendern möchten. Wir empfehlen jedoch die [Testing Library](https://testing-library.com/) als Hilfs-Framework, da sie Plugins für verschiedene Komponenten-Frameworks wie React, Preact, Svelte und Vue bereitstellt. Sie ist sehr nützlich, um Komponenten in die Testseite zu rendern, und räumt diese Komponenten nach jedem Test automatisch auf.

Sie können Primitive der Testing Library beliebig mit WebdriverIO-Befehlen kombinieren, z. B.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Hinweis:__ Die Verwendung von Render-Methoden der Testing Library hilft dabei, erstellte Komponenten zwischen den Tests zu entfernen. Wenn Sie die Testing Library nicht verwenden, stellen Sie sicher, dass Sie Ihre Testkomponenten an einen Container anhängen, der zwischen den Tests aufgeräumt wird.

## Setup-Skripte

Sie können Ihre Tests vorbereiten, indem Sie beliebige Skripte in Node.js oder im Browser ausführen, z. B. um Styles einzufügen, Browser-APIs zu mocken oder eine Verbindung zu einem Drittanbieterdienst herzustellen. Die WebdriverIO-[Hooks](/docs/configuration#hooks) können verwendet werden, um Code in Node.js auszuführen, während [`mochaOpts.require`](/docs/frameworks#require) es Ihnen ermöglicht, Skripte in den Browser zu importieren, bevor die Tests geladen werden, z. B.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // Setup-Skript bereitstellen, das im Browser ausgeführt wird
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // Testumgebung in Node.js einrichten
    }
    // ...
}
```

Wenn Sie beispielsweise alle [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)-Aufrufe in Ihrem Test mocken möchten, können Sie das folgende Setup-Skript verwenden:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// Code ausführen, bevor alle Tests geladen werden
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // Code ausführen, nachdem die Testdatei geladen wurde
}

export const mochaGlobalTeardown = () => {
    // Code ausführen, nachdem die Spec-Datei ausgeführt wurde
}

```

Nun können Sie in Ihren Tests benutzerdefinierte Antwortwerte für alle Browser-Anfragen bereitstellen. Mehr über globale Fixtures erfahren Sie in der [Mocha-Dokumentation](https://mochajs.org/#global-fixtures).

## Test- und Anwendungsdateien überwachen

Es gibt mehrere Möglichkeiten, Ihre Browser-Tests zu debuggen. Am einfachsten ist es, den WebdriverIO-Testrunner mit dem `--watch`-Flag zu starten, z. B.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Dadurch werden zunächst alle Tests durchlaufen, und der Runner hält an, sobald alle ausgeführt wurden. Anschließend können Sie Änderungen an einzelnen Dateien vornehmen, die dann einzeln erneut ausgeführt werden. Wenn Sie [`filesToWatch`](/docs/configuration#filestowatch) so setzen, dass es auf Ihre Anwendungsdateien verweist, werden alle Tests erneut ausgeführt, sobald Änderungen an Ihrer App vorgenommen werden.

## Debugging

Auch wenn es (noch) nicht möglich ist, Breakpoints in Ihrer IDE zu setzen und diese vom Remote-Browser erkennen zu lassen, können Sie den [`debug`](/docs/api/browser/debug)-Befehl verwenden, um den Test an beliebiger Stelle anzuhalten. So können Sie die DevTools öffnen und den Test debuggen, indem Sie Breakpoints im [Sources-Tab](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools) setzen.

Wenn der `debug`-Befehl aufgerufen wird, erhalten Sie außerdem eine Node.js-REPL-Schnittstelle in Ihrem Terminal mit folgender Meldung:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Drücken Sie `Ctrl` bzw. `Command` + `c` oder geben Sie `.exit` ein, um mit dem Test fortzufahren.

## Ausführung über ein Selenium Grid

Wenn Sie ein [Selenium Grid](https://www.selenium.dev/documentation/grid/) eingerichtet haben und Ihren Browser über dieses Grid ausführen, müssen Sie die Browser-Runner-Option `host` setzen, damit der Browser auf den richtigen Host zugreifen kann, auf dem die Testdateien bereitgestellt werden, z. B.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // Netzwerk-IP des Rechners, auf dem der WebdriverIO-Prozess läuft
        host: 'http://172.168.0.2'
    }]
}
```

Dadurch wird sichergestellt, dass der Browser korrekt die richtige Serverinstanz öffnet, die auf dem Rechner gehostet wird, auf dem die WebdriverIO-Tests laufen.

## Beispiele

Verschiedene Beispiele zum Testen von Komponenten mit gängigen Komponenten-Frameworks finden Sie in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples).