---
id: wdio-rerun-service
title: Usługa ponownego uruchamiania
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service to pakiet zewnętrzny, więcej informacji znajdziesz na [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Ta usługa śledzi nieudane testy Mocha lub Jasmine oraz scenariusze Cucumber wykonywane w ramach frameworka testowego [WebdriverIO](https://webdriver.io). Pozwala na ponowne uruchomienie nieudanych lub niestabilnych testów lub scenariuszy.

_UWAGA_: Użytkownicy frameworka Cucumber korzystający z WebdriverIO w wersji `5.x` i `6.x` powinni używać wersji `1.6.x`. Jeśli korzystasz z najnowszej głównej wersji `7.x`, użyj najnowszej wersji `1.7.x` tej usługi.

## Re-run vs. Retry

Logika `retry` wbudowana w WebdriverIO dla Cucumber i Mocha/Jasmine jest pomocna w obsłudze niestabilnych kroków w Cucumber i Mocha/Jasmine. Ponowne próby w każdym frameworku mają swoje ograniczenia:
* Cucumber: Nie bierze pod uwagę, że niektóre kroki mogą nie nadawać się do ponownego uruchomienia w środku testu. Dwukrotne uruchomienie kroku może zepsuć resztę scenariusza lub może nie być możliwe w kontekście testu.
* Mocha/Jasmine: Logika `retry` może być zastosowana do pojedynczego testu, jednak nadal jest to wykonywane w czasie rzeczywistym i może nie uwzględniać problemów czasowych lub problemów z łącznością sieciową.

Główne różnice `re-run`:
* Ponownie uruchomi cały pojedynczy scenariusz Cucumber, a nie tylko pojedynczy krok
* Umożliwia ponowne uruchomienie całego pliku specyfikacji po zakończeniu głównego wykonania testu
* Może być skopiowany i wykonany lokalnie (`retry` nie może)
* Może być nadal używany w połączeniu z metodami `retry`
* Nie wymaga żadnych zmian w kodzie, aby zastosować logikę `retry` do niestabilnych lub problematycznych testów

Zaleca się poświęcenie czasu na ocenę dostępnych opcji. Rozwiązanie hybrydowe może być najlepszym rozwiązaniem zapewniającym najlepsze rzeczywiste i użyteczne wyniki testów.

## Instalacja

Najłatwiejszym sposobem jest dodanie `wdio-rerun-service` do `devDependencies` w pliku `package.json`.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

Można go zainstalować za pomocą `npm`:

```bash
npm install wdio-rerun-service
```

Po zakończeniu instalacji pakietu, dodaj go do tablicy `services` w `wdio.conf.js`:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguracja

Następujące opcje można dodać do pliku wdio.conf.js. Aby zdefiniować opcje dla usługi, musisz dodać usługę do listy `services` w następujący sposób:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Opcje usługi ponownego uruchamiania tutaj...
        }]
    ],
    // ...
};
```

### rerunDataDir
Katalog, w którym podczas wykonywania będą przechowywane wszystkie dane JSON ponownego uruchomienia.

Typ: `String`

Domyślnie: `./results/rerun`

Przykład:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
Ścieżka do zapisu skryptu Bash ponownego uruchomienia.

Typ: `String`

Domyślnie: `./rerun.sh`

Przykład:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Tylko Cucumber) Zestaw tagów Cucumber do wykluczenia. Jeśli scenariusz zawiera tag, usługa ponownego uruchomienia pominie analizę.

Typ: `Array`

Domyślnie: `[]`

Przykład:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
Prefiks, który zostanie dodany do generowanego polecenia ponownego uruchomienia.

Typ: `String`

Domyślnie: `''`

Przykład:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----