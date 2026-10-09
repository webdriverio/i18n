---
id: multi-framework-support
title: Obsługa wielu frameworków
description: "Używaj usługi DevTools z Mocha, Jasmine lub Cucumber bez konfiguracji specyficznej dla frameworka."
---

DevTools automatycznie współpracuje z Mocha, Jasmine i Cucumber bez konieczności konfiguracji specyficznej dla danego frameworka. Wystarczy dodać usługę do konfiguracji WebDriverIO, a wszystkie funkcje będą działać bezproblemowo niezależnie od używanego frameworka testowego.

**Obsługiwane frameworki:**
- **Mocha** - Uruchamianie na poziomie testów i zestawów testów z filtrowaniem grep
- **Jasmine** - Pełna integracja z filtrowaniem opartym na grep
- **Cucumber** - Uruchamianie na poziomie scenariuszy i przykładów z targetowaniem feature:line

Ten sam interfejs debugowania, ponowne uruchamianie testów oraz funkcje wizualizacji działają spójnie we wszystkich frameworkach.

## Konfiguracja

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // lub 'jasmine' lub 'cucumber'
    services: ['devtools'],
    // ...
};
```