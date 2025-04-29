---
id: component-testing
title: Komponententests
---

Mit WebdriverIOs [Browser Runner](/docs/runner#browser-runner) können Sie Tests in einem echten Desktop- oder mobilen Browser ausführen, während Sie WebdriverIO und das WebDriver-Protokoll verwenden, um zu automatisieren und mit dem zu interagieren, was auf der Seite gerendert wird. Dieser Ansatz hat [viele Vorteile](/docs/runner#browser-runner) im Vergleich zu anderen Test-Frameworks, die nur Tests gegen [JSDOM](https://www.npmjs.com/package/jsdom) erlauben.

## Wie funktioniert es?

Der Browser Runner verwendet [Vite](https://vitejs.dev/), um eine Testseite zu rendern und ein Test-Framework zu initialisieren, um Ihre Tests im Browser auszuführen. Derzeit unterstützt es nur Mocha, aber Jasmine und Cucumber sind [auf der Roadmap](https://github.com/orgs/webdriverio/projects/1). Dies ermöglicht das Testen jeder Art von Komponenten, selbst für Projekte, die Vite nicht verwenden.

Der Vite-Server wird vom WebdriverIO-Testrunner gestartet und so konfiguriert, dass Sie alle Reporter und Services wie gewohnt für normale E2E-Tests verwenden können. Darüber hinaus initialisiert es eine [`browser`](/docs/api/browser)-Instanz, die Ihnen den Zugriff auf eine Teilmenge der [WebdriverIO-API](/docs/api) ermöglicht, um mit allen Elementen auf der Seite zu interagieren. Ähnlich wie bei E2E-Tests können Sie auf diese Instanz über die `browser`-Variable zugreifen, die an den globalen Bereich angehängt ist, oder indem Sie sie aus `@wdio/globals` importieren, je nachdem, wie [`injectGlobals`](/docs/api/globals) eingestellt ist.

WebdriverIO bietet integrierte Unterstützung für die folgenden Frameworks:

- [__Nuxt__](https://nuxt.com/): Der WebdriverIO-Testrunner erkennt eine Nuxt-Anwendung und richtet automatisch Ihre Projekt-Composables ein und hilft beim Mocken des Nuxt-Backends. Lesen Sie mehr in der [Nuxt-Dokumentation](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): Der WebdriverIO-Testrunner erkennt, ob Sie TailwindCSS verwenden, und lädt die Umgebung ordnungsgemäß in die Testseite

## Einrichtung

Um WebdriverIO für Unit- oder Komponententests im Browser einzurichten, starten Sie ein neues WebdriverIO-Projekt über:

```bash
npm init wdio@latest ./
# oder
yarn create wdio ./
```

Sobald der Konfigurationsassistent startet, wählen Sie `browser` für die Ausführung von Unit- und Komponententests und wählen Sie eines der Presets, falls gewünscht, oder gehen Sie mit _"Other"_, wenn Sie nur grundlegende Unit-Tests ausführen möchten. Sie können auch eine benutzerdefinierte Vite-Konfiguration konfigurieren, wenn Sie Vite bereits in Ihrem Projekt verwenden. Weitere Informationen finden Sie unter [Runner-Optionen](/docs/runner#runner-options).

:::info

__Hinweis:__ WebdriverIO führt Browsertests in CI standardmäßig kopflos (headless) aus, z.B. wenn eine `CI`-Umgebungsvariable auf `'1'` oder `'true'` gesetzt ist. Sie können dieses Verhalten manuell mit der [`headless`](/docs/runner#headless)-Option für den Runner konfigurieren.

:::

Am Ende dieses Prozesses sollten Sie eine `wdio.conf.js` finden, die verschiedene WebdriverIO-Konfigurationen enthält, einschließlich einer `runner`-Eigenschaft, z.B.:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Durch die Definition verschiedener [Capabilities](/docs/configuration#capabilities) können Sie Ihre Tests in verschiedenen Browsern ausführen, wenn gewünscht auch parallel.

Wenn Sie sich noch unsicher sind, wie alles funktioniert, schauen Sie sich das folgende Tutorial an, um mit Komponententests in WebdriverIO zu beginnen:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test-Harness

Es liegt ganz bei Ihnen, was Sie in Ihren Tests ausführen möchten und wie Sie die Komponenten rendern möchten. Wir empfehlen jedoch, die [Testing Library](https://testing-library.com/) als Utility-Framework zu verwenden, da sie Plugins für verschiedene Komponenten-Frameworks wie React, Preact, Svelte und Vue bietet. Sie ist sehr nützlich zum Rendern von Komponenten in die Testseite und bereinigt diese Komponenten automatisch nach jedem Test.

Sie können Testing Library-Primitive mit WebdriverIO-Befehlen nach Belieben mischen, z.B.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Hinweis:__ Die Verwendung von Render-Methoden aus der Testing Library hilft dabei, erstellte Komponenten zwischen den Tests zu entfernen. Wenn Sie die Testing Library nicht verwenden, stellen Sie sicher, dass Sie Ihre Testkomponenten an einen Container anhängen, der zwischen den Tests bereinigt wird.

## Setup-Skripte

Sie können Ihre Tests einrichten, indem Sie beliebige Skripte in Node.js oder im Browser ausführen, z.B. Styles einfügen, Browser-APIs mocken oder eine Verbindung zu einem Drittanbieter-Service herstellen. Die WebdriverIO [Hooks](/docs/configuration#hooks) können verwendet werden, um Code in Node.js auszuführen, während [`mochaOpts.require`](/docs/frameworks#require) es Ihnen ermöglicht, Skripte in den Browser zu importieren, bevor Tests geladen werden, z.B.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // bieten Sie ein Setup-Skript zur Ausführung im Browser
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // Testumgebung in Node.js einrichten
    }
    // ...
}
```

Wenn Sie beispielsweise alle [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)-Aufrufe in Ihrem Test mit dem folgenden Setup-Skript mocken möchten:

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

In Ihren Tests können Sie nun benutzerdefinierte Antwortswerte für alle Browser-Anfragen bereitstellen. Lesen Sie mehr über globale Fixtures in der [Mocha-Dokumentation](https://mochajs.org/#global-fixtures).

## Test- und Anwendungsdateien beobachten

Es gibt mehrere Möglichkeiten, wie Sie Ihre Browser-Tests debuggen können. Am einfachsten ist es, den WebdriverIO-Testrunner mit dem Flag `--watch` zu starten, z.B.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Dies durchläuft zunächst alle Tests und hält an, sobald alle ausgeführt wurden. Sie können dann Änderungen an einzelnen Dateien vornehmen, die dann einzeln erneut ausgeführt werden. Wenn Sie [`filesToWatch`](/docs/configuration#filestowatch) so einstellen, dass es auf Ihre Anwendungsdateien zeigt, werden alle Tests erneut ausgeführt, wenn Änderungen an Ihrer App vorgenommen werden.

## Debugging

Obwohl es (noch) nicht möglich ist, Breakpoints in Ihrer IDE zu setzen und diese vom Remote-Browser erkennen zu lassen, können Sie den Befehl [`debug`](/docs/api/browser/debug) verwenden, um den Test an jedem Punkt anzuhalten. Dadurch können Sie DevTools öffnen, um den Test zu debuggen, indem Sie Breakpoints im [Sources-Tab](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools) setzen.

Wenn der Befehl `debug` aufgerufen wird, erhalten Sie auch eine Node.js-REPL-Schnittstelle in Ihrem Terminal:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Drücken Sie `Strg` oder `Befehl` + `c` oder geben Sie `.exit` ein, um mit dem Test fortzufahren.

## Ausführung mit einem Selenium Grid

Wenn Sie ein [Selenium Grid](https://www.selenium.dev/documentation/grid/) eingerichtet haben und Ihren Browser über dieses Grid ausführen, müssen Sie die Option `host` des Browser-Runners festlegen, damit der Browser auf den richtigen Host zugreifen kann, auf dem die Testdateien bereitgestellt werden, z.B.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // Netzwerk-IP des Computers, der den WebdriverIO-Prozess ausführt
        host: 'http://172.168.0.2'
    }]
}
```

Dies stellt sicher, dass der Browser die richtige Serverinstanz öffnet, die auf der Instanz gehostet wird, die die WebdriverIO-Tests ausführt.

## Beispiele

Sie finden verschiedene Beispiele für das Testen von Komponenten mit beliebten Komponenten-Frameworks in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples).