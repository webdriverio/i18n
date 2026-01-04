---
id: globals
title: Globale Variablen
---

In Ihren Testdateien stellt WebdriverIO jede dieser Methoden und Objekte in die globale Umgebung. Sie müssen nichts importieren, um sie zu verwenden. Wenn Sie jedoch explizite Importe bevorzugen, können Sie `import { browser, $, $$, expect } from '@wdio/globals'` verwenden und `injectGlobals: false` in Ihrer WDIO-Konfiguration einstellen.

Die folgenden globalen Objekte werden gesetzt, wenn nicht anders konfiguriert:

- `browser`: WebdriverIO [Browser-Objekt](https://webdriver.io/docs/api/browser)
- `driver`: Alias zu `browser` (wird bei der Ausführung von mobilen Tests verwendet)
- `multiRemoteBrowser`: Alias zu `browser` oder `driver`, aber nur für [Multiremote](/docs/multiremote)-Sitzungen gesetzt
- `$`: Befehl zum Abrufen eines Elements (siehe mehr in [API-Dokumentation](/docs/api/browser/$))
- `$$`: Befehl zum Abrufen von Elementen (siehe mehr in [API-Dokumentation](/docs/api/browser/$$))
- `expect`: Assertion-Framework für WebdriverIO (siehe [API-Dokumentation](/docs/api/expect-webdriverio))

__Hinweis:__ WebdriverIO hat keine Kontrolle darüber, wenn verwendete Frameworks (z.B. Mocha oder Jasmine) globale Variablen setzen, wenn sie ihre Umgebung initialisieren.