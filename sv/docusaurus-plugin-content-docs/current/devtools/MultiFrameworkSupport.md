---
id: multi-framework-support
title: Stöd för Flera Ramverk
---

DevTools fungerar automatiskt med Mocha, Jasmine och Cucumber utan att kräva någon ramverksspecifik konfiguration. Lägg helt enkelt till tjänsten i din WebDriverIO-konfiguration och alla funktioner fungerar sömlöst oavsett vilket testramverk du använder.

**Ramverk som stöds:**
- **Mocha** - Test- och svit-nivå körning med grep-filtrering
- **Jasmine** - Fullständig integration med grep-baserad filtrering
- **Cucumber** - Scenario- och exempel-nivå körning med feature:line-inriktning

Samma felsökningsgränssnitt, test-omkörning och visualiseringsfunktioner fungerar konsekvent över alla ramverk.

## Konfiguration

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // or 'jasmine' or 'cucumber'
    services: ['devtools'],
    // ...
};
```