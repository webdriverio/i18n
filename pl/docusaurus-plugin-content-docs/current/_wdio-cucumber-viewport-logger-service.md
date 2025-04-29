---
id: wdio-cucumber-viewport-logger-service
title: Serwis Rejestratora Viewportu dla Cucumber
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumber-viewport-logger-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Cucumber Viewport Logger Service dla WebdriverIO

Ten serwis dodaje możliwość rejestrowania kroków Cucumber i innych informacji debugowania bezpośrednio w oknie przeglądarki w rozwiązaniu opartym na WebdriverIO. Szczególnie przydatne może to być w przypadkach korzystania z urządzeń lub maszyn wirtualnych bez bezpośredniego *fizycznego* dostępu do nich i możliwości skonfigurowania sesji interaktywnej do głębokiego debugowania testów e2e.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Szybki start

Zainstaluj pakiet:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

Dodaj usługę do sekcji konfiguracji `services`, np.:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Opcje serwisu

| Opcja  | Opis | Typ |Domyślna wartość |
| --- | --- | --- | --- |
| `numberOfSteps`  | liczba kroków, które będą widoczne w viewporcie  | number |3 |
| `enabled`  | włącz/wyłącz serwis | boolean |true |
| `styles`  | Style CSS dla wrappera loggera, *słowa kluczowego kroku* i *tekstu kroku*, zobacz przykład poniżej  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // serwis będzie włączony tylko gdy ustawisz zmienną środowiskową `VP_LOGGER` na `1`
            // ustaw niestandardowe style CSS dla poszczególnych elementów
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - wyświetla niestandardową wiadomość z niestandardowym stylem CSS (nieobowiązkowe), możesz użyć tego w swoich definicjach kroków
np.:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - usuwa sekcję wiadomości w viewporcie, może być przydatne na przykład do wykonania asercji wizualnej

### pointerEvents: 'none'

Domyślnie wszystkie zdarzenia myszy (klikanie, najechanie kursorem itp.) przechodzą przez sekcję wiadomości, na przykład: zamiast klikać w sekcję wiadomości, Twoje kliknięcie "przechodzi" do elementu obok wiadomości (element Twojej aplikacji), jeśli chcesz zmienić to zachowanie, ustaw opcję stylu wrappera 'pointerEvents' na 'auto', np.:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```