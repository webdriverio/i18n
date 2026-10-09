---
id: multi-framework-support
title: Stöd för flera ramverk
description: "Använd DevTools-tjänsten med Mocha, Jasmine eller Cucumber utan ramverksspecifik konfiguration."
---

DevTools fungerar automatiskt med Mocha, Jasmine och Cucumber utan att kräva någon ramverksspecifik konfiguration. Lägg helt enkelt till tjänsten i din WebDriverIO-konfiguration så fungerar alla funktioner sömlöst oavsett vilket testramverk du använder.

**Ramverk som stöds:**
- **Mocha** - Körning på test- och svitnivå med grep-filtrering
- **Jasmine** - Fullständig integration med grep-baserad filtrering
- **Cucumber** - Körning på scenario- och exempelnivå med feature:line-inriktning

Samma felsökningsgränssnitt, omkörning av tester och visualiseringsfunktioner fungerar konsekvent i alla ramverk.

## Konfiguration

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // eller 'jasmine' eller 'cucumber'
    services: ['devtools'],
    // ...
};
```