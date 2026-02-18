---
id: multi-framework-support
title: Wsparcie wielu frameworków
---

DevTools automatycznie współpracuje z Mocha, Jasmine i Cucumber bez konieczności stosowania konfiguracji specyficznej dla danego frameworka. Wystarczy dodać tę usługę do konfiguracji WebDriverIO, a wszystkie funkcje będą działać bezproblemowo, niezależnie od tego, którego frameworka testowego używasz.

**Wspierane frameworki:**
- **Mocha** - Wykonywanie na poziomie testu i zestawu testów z filtrowaniem grep
- **Jasmine** - Pełna integracja z filtrowaniem opartym o grep
- **Cucumber** - Wykonywanie na poziomie scenariusza i przykładu z kierowaniem feature:line

Te same interfejsy debugowania, ponowne uruchamianie testów i funkcje wizualizacji działają spójnie we wszystkich frameworkach.

## Konfiguracja

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // lub 'jasmine' lub 'cucumber'
    services: ['devtools'],
    // ...
};
```