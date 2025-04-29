---
id: wdio-cucumberjs-json-reporter
title: Raporter CucumberJS JSON
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter jest pakietem zewnętrznym, więcej informacji można znaleźć na [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

Raporter WDIO, który tworzy pliki JSON CucumberJS dla WebdriverIO v8 i nowszych.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## Co to robi
Ten raporter generuje **plik Cucumber JSON** dla każdej funkcji, która jest testowana. Plik JSON może być używany z dowolnym raportem, którego chcesz użyć, jak na przykład [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

Dodaje również metadane o uruchomionej instancji do pliku funkcji i co nie mniej ważne, daje możliwość dodania załączników do wyjścia JSON.

## Instalacja
Najłatwiejszym sposobem jest przechowywanie `wdio-cucumberjs-json-reporter` jako devDependency w pliku `package.json`.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

Możesz to zrobić po prostu przez:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

dzięki czemu zostanie automatycznie dodany do Twojego `package.json`

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted).

## Konfiguracja
Skonfiguruj katalog wyjściowy i język w pliku wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [
        // W ten sposób z domyślnymi opcjami, patrz opcje poniżej
        'cucumberjs-json',

        // LUB w ten sposób, jeśli chcesz ustawić folder i język
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> NIE UŻYWAJ OBU SPOSOBÓW DODAWANIA RAPORTORA, TO TYLKO PRZYKŁAD!

## Opcje
### `jsonFolder`
- **Typ:** `String`
- **Obowiązkowe:** Nie
- **Domyślnie:** `.tmp/json/`

Katalog, w którym będą przechowywane pliki JSON generowane przez ten raport, względem miejsca, z którego uruchomiony jest skrypt.

**Uwaga:** Jeśli używasz skryptu npm z wiersza poleceń, na przykład `npm run test`, `jsonFolder` będzie względem ścieżki, z której skrypt jest wykonywany. Wykonanie go z katalogu głównego projektu spowoduje również utworzenie `jsonFolder` w katalogu głównym projektu.

### `language`
- **Typ:** `String`
- **Obowiązkowe:** Nie
- **Domyślnie:** `en`

Język, w którym napisane są scenariusze Gherkin (domyślnie angielski). Lista kodów języków i ich słów kluczowych znajduje się [tutaj](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **Typ:** `boolean`
- **Obowiązkowe:** Nie
- **Domyślnie:** `false`

Szczegóły hooka nie będą częścią generowania, jeśli ta właściwość będzie ustawiona na `true`.

### `reportFilePerRetry`
- **Typ:** `boolean`
- **Obowiązkowe:** Nie
- **Domyślnie:** `true`

Gdy specyfikacja jest ponawiana, raport zostanie dołączony do istniejącego pliku raportu z poprzednich prób, jeśli ta właściwość jest ustawiona na `false`.

**Przykład**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## Metadane

> **Uwaga:**\
> Obecnie nie jest to obsługiwane w WebdriverIO V6, WebdriverIO V5 nadal to obsługuje, a WebdriverIO V7 ponownie to obsługuje

Jak wspomniano, ten raport może automatycznie przechowywać metadane bieżącej maszyny / urządzenia, na którym wykonywana jest funkcja.

Aby to dostosować, możesz dodać to, dodając następujący obiekt do swoich `capabilities`

```js
// Przykład wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Dodaj to
            'cjson:metadata': {
                // Dla przeglądarki
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // dla aplikacji
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> Obiekt metadanych musi mieć prefiks `cjson`, w przeciwnym razie nie będzie działać!

### Wartości metadanych
#### `metadata.app.name`
- **Typ:** `string`

**np.:** Nazwa aplikacji.

#### `metadata.app.version`
- **Typ:** `string`

**np.:** Wersja aplikacji.

#### `metadata.browser.name`
- **Typ:** `string`
- **Możliwe wartości:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **Typ:** `string`

**np.:** Wersja przeglądarki, może być dodana ręcznie lub pobrana podczas wykonywania testów, aby uzyskać dokładny numer wersji.

#### `metadata.device`
- **Typ:** `string`

**np.:** Nazwa reprezentująca typ urządzenia. Na przykład, jeśli uruchamiasz go na maszynie wirtualnej, możesz umieścić tutaj `Virtual Machine`,
lub nazwę urządzenia mobilnego, jak na przykład `iPhone 7 Plus`.

#### `metadata.platform.name`
- **Typ:** `string`
- **Możliwe wartości:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **Typ:** `string`

**np.:** Wersja platformy

> Jeśli nie podasz obiektu `browser` w metadanych, moduł automatycznie określi go dla Ciebie. **Zawsze nadpisze go najnowszą wartością, którą może określić.**

> Jeśli nie podasz `device` i/lub obiektu `platform`, zostanie to domyślnie ustawione na `not known`

> Jeśli nie podasz `browser.name` lub `browser.version`, moduł spróbuje to automatycznie określić.

## Załącznik
Masz możliwość dołączania danych do pliku JSON we wszystkich tych hookach / krokach:

- Before(All)
- After(All)
- Given
- When
- Then
- And

Jedyną rzeczą, którą musisz zapewnić, jest następujący kod w plikach kroków.

Dla ES Modules (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Dołącz ciąg znaków (jeśli nie podano typu, automatycznie zostanie ustawiony na `text/plain`)
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// Dołącz JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// Dołącz zrzut ekranu w hooku before
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
Dla CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Dołącz ciąg znaków (jeśli nie podano typu, automatycznie zostanie ustawiony na `text/plain`)
attach('just a string');
attach('just a second string', 'text/plain');

// Dołącz JSON
attach({"json-string": true}, 'application/json');

// Dołącz zrzut ekranu w hooku before
attach(await browser.takeScreenshot(), 'image/png');
```

## Używaj go z multiple-cucumber-html-reporter
Poprzedni moduł dla WebdriverIO V4, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
miał wbudowane połączenie z modułem [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter). **Nie ma tego przypadku dla tego
raportora** ponieważ nowa konfiguracja WebdriverIO V5 opiera się na instancji, która nie pozwala mi używać hooków `onPrepare` i `onComplete`.

Jeśli nadal chcesz używać modułu [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter), możesz dodać następujące elementy do pliku konfiguracyjnego.

- Zainstaluj moduł za pomocą

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- Dodaj to do swojego pliku konfiguracyjnego

    ```js
    import fs from 'node:fs/promises'
    // Importuj moduł
    import { generate } from 'multiple-cucumber-html-reporter'

    // Przykład wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * Wykonuje się raz przed uruchomieniem wszystkich workerów.
       */
      onPrepare: () => {
        // Usuń folder `.tmp/`, który przechowuje pliki json i raporty
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Wykonuje się po wyłączeniu wszystkich workerów i przed zakończeniem procesu.
       */
      onComplete: () => {
        // Generuj raport, gdy wszystkie testy zostaną wykonane
        generate({
          // Wymagane
          // Ta część musi być tą samą ścieżką, gdzie przechowujesz pliki JSON
          // domyślnie = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // więcej opcji znajdziesz na https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## Starsze wersje WebdriverIO

> **TEN MODUŁ MOŻE DZIAŁAĆ TYLKO Z WebdriverIO V8+!**\
> **Dla V6 sprawdź dokumentację [tutaj](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) i użyj wersji 2.0.4**\
> **Dla V5 sprawdź dokumentację [tutaj](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) i użyj wersji 1.3.0**

> **TEN MODUŁ NIE JEST ZAMIENNIKIEM [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). TAMTEN MODUŁ OBSŁUGUJE TYLKO WEBDRIVERIO V4 I RÓWNIEŻ TWORZY RAPORT. TEN MODUŁ TWORZY TYLKO JSON, NIE RAPORT!!**