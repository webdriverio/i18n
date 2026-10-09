---
id: console-logs
title: Logi konsoli
description: "Przechwytuj i przeglądaj komunikaty konsoli przeglądarki oraz logi frameworka WebdriverIO rejestrowane przez DevTools podczas wykonywania testów."
---

Przechwytuj i przeglądaj wszystkie dane wyjściowe konsoli przeglądarki podczas wykonywania testów. DevTools rejestruje komunikaty konsoli z Twojej aplikacji (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`), a także logi frameworka WebDriverIO na podstawie poziomu `logLevel` skonfigurowanego w pliku `wdio.conf.ts`.

**Funkcje:**
- Przechwytywanie komunikatów konsoli w czasie rzeczywistym podczas wykonywania testów
- Logi konsoli przeglądarki (log, warn, error, info, debug)
- Logi frameworka WebDriverIO filtrowane według skonfigurowanego poziomu `logLevel` (trace, debug, info, warn, error, silent)
- Znaczniki czasu pokazujące dokładnie, kiedy każdy komunikat został zarejestrowany
- Logi konsoli wyświetlane obok kroków testu i zrzutów ekranu przeglądarki dla lepszego kontekstu

**Konfiguracja:**
```js
// wdio.conf.ts
export const config = {
    // Poziom szczegółowości logowania: trace | debug | info | warn | error | silent
    logLevel: 'info', // Określa, które logi frameworka są przechwytywane
    // ...
};
```

Ułatwia to debugowanie błędów JavaScript, śledzenie zachowania aplikacji oraz podgląd wewnętrznych operacji WebDriverIO podczas wykonywania testów.

## Demo

### >_ Logi konsoli
![Console Logs](/img/devtools/console-logs.gif)