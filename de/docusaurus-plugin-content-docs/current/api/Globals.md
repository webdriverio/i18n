---
id: globals
title: Globale Variablen
---

In Ihren Testdateien stellt WebdriverIO jede dieser Methoden und Objekte in der globalen Umgebung bereit. Sie müssen nichts importieren, um sie zu verwenden. Wenn Sie jedoch explizite Importe bevorzugen, können Sie `import { browser, $, $$, expect } from '@wdio/globals'` verwenden und `injectGlobals: false` in Ihrer WDIO-Konfiguration setzen.

Die folgenden globalen Objekte werden gesetzt, sofern nicht anders konfiguriert:

- `browser`: WebdriverIO [Browser-Objekt](https://webdriver.io/docs/api/browser)
- `driver`: Alias für `browser` (wird beim Ausführen von mobilen Tests verwendet)
- `multiRemoteBrowser`: Alias für `browser` oder `driver`, wird jedoch nur für [Multi-Remote](/docs/multiremote)-Sessions gesetzt
- `$`: Befehl zum Abrufen eines Elements (mehr dazu in der [API-Dokumentation](/docs/api/browser/$))
- `$$`: Befehl zum Abrufen von Elementen (mehr dazu in der [API-Dokumentation](/docs/api/browser/$$))
- `expect`: Assertion-Framework für WebdriverIO (siehe [API-Dokumentation](/docs/api/expect-webdriverio))

__Hinweis:__ WebdriverIO hat keine Kontrolle darüber, ob verwendete Frameworks (z. B. Mocha oder Jasmine) beim Initialisieren ihrer Umgebung globale Variablen setzen.