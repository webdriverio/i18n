---
id: wdio-eslinter-service
title: Automatyczne wykrywanie brakujących importów z usługą eslint
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service to pakiet zewnętrzny, więcej informacji znajdziesz na [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

Czy kiedykolwiek uruchamiałeś testy e2e, tylko po to, by 10, 15 lub 30 minut później dowiedzieć się, że istniał brakujący/błędnie napisany import, który nie pojawił się aż do środka uruchomienia testu? Kiedy to się dzieje, test runner zgłasza te testy jako uszkodzone.

eslint jest świetnym narzędziem do wyłapywania różnych błędów przed uruchomieniem, a ta usługa uruchamia narzędzie eslint przed wykonaniem testów WebdriverIO, jako zautomatyzowany krok zamiast ręcznego.

Często lepiej jest szybciej wykryć błędy, abyśmy mogli naprawić problemy szybciej, a nie później.

Zalecana konfiguracja to użycie runnera 'unresolved' tylko do sprawdzania brakujących importów, ale jeśli chcesz, możesz również skonfigurować usługę do uruchamiania eslinta w swoim projekcie za pomocą runnera npm lub yarn, lub przekazując flagę, która informuje system, aby użył również twojej konfiguracji .eslintrc.

## Instalacja

Zainstaluj wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### Szybki start - Sprawdzanie tylko brakujących lub nierozwiązanych importów

Domyślnie, ta minimalna konfiguracja, runner "unresolved", sprawdza nierozwiązane importy require i zgłasza błąd, jeśli takie zostały znalezione. Usługa następnie zatrzymuje wykonanie. Możesz dostosować .eslintrc.js, aby wykonać więcej kontroli za pomocą runnerów "npm" lub "yarn", jeśli chcesz. Zobacz [eslint](https://www.npmjs.com/package/eslint), aby uzyskać więcej szczegółów.

Jeśli nie masz w swoim projekcie konfiguracji `.eslintrc.js`, wdio-eslinter-service można skonfigurować do użycia domyślnej, która sprawdza tylko brakujące importy przed uruchomieniem testów. Jest to przydatne, abyś dowiedział się o niepoprawnych importach szybciej, a nie później. Aby to skonfigurować, dodaj następującą konfigurację eslintera do tablicy usług (zakładając, że już używasz usługi chromedriver; w przeciwnym razie, pomiń tę część):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

W tym momencie rozpocznij uruchamianie testów, a jeśli istnieje brakujący lub niepoprawny import, WebdriverIO zaloguje to i natychmiast zakończy uruchomienie testu:

```
$ npx wdio
```


#### Opcjonalnie - jeśli używasz module-alias

Jeśli używasz modułu [module-alias](https://www.npmjs.com/package/module-alias), który pozwala na konfigurację aliasów zastępujących ścieżki względne, będziesz musiał przekazać to do konfiguracji eslintera za pomocą wtyczki eslint-import-resolver-custom-alias. Poniżej znajduje się przykład:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

Zainstaluj wtyczkę w swoim projekcie:

```
$ npm i eslint-import-resolver-custom-alias
```

Uruchom testy i sprawdź, czy system znajdzie niepoprawne importy, które używają aliasów modułów:

```
$ npx wdio
```

#### Eksperymentalne - Użycie wraz z istniejącą konfiguracją eslintrc w twoim projekcie

Aby usługa eslintera używała również istniejącej konfiguracji eslintrc w twoim projekcie, ustaw `includeProjectEslintrc` na true w tablicy usług konfiguracji wdio.conf.js.

Doświadczyłem problemów z konfliktującymi wtyczkami. Jeśli twoja konfiguracja eslint w projekcie również szuka nierozwiązanych importów, może to nie działać i może wymagać dostosowania twojego .eslintrc.js. Nie jest to zalecane na tym etapie.


### Zaawansowane alternatywy - Korzystanie z runnerów npm i yarn

Runnery npm i yarn pomagają zapewnić dodatkową kontrolę nad uruchamianiem istniejącej konfiguracji eslintera w twoim projekcie. Dzięki tej konfiguracji możesz zdefiniować dodatkowe polecenia do uruchomienia w sekcji run-scripts w twoim package.json:

W twoim `package.json` dodaj ten wpis do skryptów uruchomieniowych:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**UWAGA: Dodanie eslint do package.json jest wymagane, aby usługa działała przy użyciu runnerów npm lub yarn.**

Jeśli nie masz jeszcze zainstalowanego i skonfigurowanego eslint, będziesz musiał go zainstalować i skonfigurować w swoim projekcie, a także wszelkie używane wtyczki, takie jak eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

Jeśli używasz wtyczki eslint-import-resolver-custom-alias do mapowania aliasów modułów do ich rzeczywistych ścieżek, będziesz musiał również ją zainstalować:

```
$ npm i eslint-import-resolver-custom-alias
```

Będziesz również potrzebował utworzyć plik `.eslintrc.js`, jeśli nie masz jeszcze jednego z plików konfiguracyjnych eslintrc w swoim projekcie. Oto podstawowa konfiguracja, która tylko sprawdza nierozwiązane importy, a możesz rozszerzyć tę konfigurację, aby sprawdzać inne aspekty jakości kodu przed uruchomieniem testów:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

Na koniec dodaj usługę `eslinter` do tablicy usług w `wdio.conf.js`:

```javascript
    services: ['eslinter']
```

Uruchom `npm run eslint`, aby zweryfikować i sprawdzić błędy.

Jeśli używasz `yarn`, możesz skonfigurować opcję usługi `runnerType`:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

Jeśli masz już skrypt lintera, którego chciałbyś użyć ponownie (zamiast `eslint`), możesz skonfigurować opcję usługi `scriptName`:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## Używanie w WebdriverIO

Uruchom test runner WebdriverIO jak zwykle. eslint sprawdzi kod. Jeśli zostaną znalezione błędy, wykonanie natychmiast zostanie przerwane.

```bash
$ npx wdio
```


**Przykład:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```