---
id: console-logs
title: Logi Konsoli
---

Przechwytuj i analizuj całe wyjście konsoli przeglądarki podczas wykonywania testu. DevTools rejestruje komunikaty konsoli z Twojej aplikacji (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) oraz logi frameworka WebDriverIO na podstawie `logLevel` skonfigurowanego w Twoim `wdio.conf.ts`.

**Funkcje:**
- Przechwytywanie komunikatów konsoli w czasie rzeczywistym podczas wykonywania testu
- Logi konsoli przeglądarki (log, warn, error, info, debug)
- Logi frameworka WebDriverIO filtrowane według skonfigurowanego `logLevel` (trace, debug, info, warn, error, silent)
- Znaczniki czasu pokazujące dokładnie, kiedy każdy komunikat został zarejestrowany
- Logi konsoli wyświetlane obok kroków testowych i zrzutów ekranu przeglądarki dla kontekstu

**Konfiguracja:**
```js
// wdio.conf.ts
export const config = {
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controls which framework logs are captured
    // ...
};
```

Dzięki temu łatwo można debugować błędy JavaScript, śledzić zachowanie aplikacji i obserwować wewnętrzne operacje WebDriverIO podczas wykonywania testu.

## Demo

### >_ Console Logs
![Console Logs](./demo/console-logs.gif)