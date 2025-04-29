---
id: sauce-service
title: Sauce Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Usługa WebdriverIO, która zapewnia lepszą integrację z Sauce Labs. Ta usługa może być używana dla:

- chmury maszyn wirtualnych Sauce Labs (Desktop Web/Emulator/Simulator)
- chmury rzeczywistych urządzeń Sauce Labs (iOS i Android)

Może aktualizować metadane zadania ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') i uruchamiać Sauce Connect, jeśli jest to pożądane.

Co jeszcze ta usługa zrobi dla Ciebie:

- Domyślnie usługa Sauce zaktualizuje 'name' zadania, gdy zadanie się rozpocznie. Daje to możliwość aktualizacji nazwy w dowolnym momencie.
- Możesz zdefiniować parametr `setJobName` i dostosować nazwę zadania zgodnie z Twoimi capabilities, opcjami i tytułem zestawu testów
- Usługa Sauce przekaże również stos błędów nieudanego testu do zakładki poleceń Sauce Labs
- Pozwoli Ci automatycznie skonfigurować i uruchomić [Sauce Connect](https://docs.saucelabs.com/secure-connections/)
- I ustawi punkty kontekstowe w Twojej liście poleceń, aby zidentyfikować, które polecenia zostały wykonane w jakim teście

## Instalacja

Najłatwiejszy sposób to utrzymanie `@wdio/sauce-service` jako devDependency w pliku `package.json`, poprzez:

```sh
npm install @wdio/sauce-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted)

## Konfiguracja

Aby korzystać z usługi dla chmury maszyn wirtualnych Desktop/Emulator/Simulator i chmury rzeczywistych urządzeń, musisz ustawić `user` i `key` w pliku `wdio.conf.js`. Automatycznie użyje Sauce Labs do uruchomienia testów integracyjnych. Jeśli uruchamiasz testy na Sauce Labs, możesz określić region, w którym chcesz uruchamiać testy za pomocą właściwości `region`. Dostępne skróty dla regionów to `us` (domyślnie) i `eu`. Te regiony są używane zarówno dla chmury maszyn wirtualnych Sauce Labs, jak i chmury rzeczywistych urządzeń Sauce Labs. Jeśli nie podasz regionu, domyślnie będzie to `us`.

Jeśli chcesz, aby WebdriverIO automatycznie uruchomił tunel [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy), musisz ustawić `sauceConnect: true`. Jeśli chcesz zmienić centrum danych na UE, dodaj `region:'eu'`, ponieważ centrum danych w USA jest ustawione jako domyślne.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // lub 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

Jeśli chcesz użyć istniejącego tunelu Sauce Connect, musisz jedynie podać `tunnelName`. Jeśli korzystasz z udostępnionego tunelu, a nie jesteś użytkownikiem, który utworzył tunel, musisz zidentyfikować użytkownika Sauce Labs, który utworzył tunel, aby móc z niego korzystać w swoim teście. Dołącz `tunnelOwner` do capabilities w następujący sposób:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Opcje usługi Sauce

Aby autoryzować usługę Sauce Labs, Twoja konfiguracja musi zawierać opcje [`user`](https://webdriver.io/docs/options#user) i [`key`](https://webdriver.io/docs/options#key).

### maxErrorStackLength

Ta usługa automatycznie przekazuje stos błędów do Sauce Labs, gdy test nie powiedzie się. Domyślnie przekazywane jest tylko pierwszych 5 linii, ale w razie potrzeby można to zmienić. Pamiętaj, że więcej linii oznacza więcej wywołań WebDrivera, co może spowolnić wykonanie.

Typ: `number`<br />
Domyślnie: `5`

### sauceConnect

Jeśli `true`, uruchamia Sauce Connect i otwiera bezpieczne połączenie między maszyną wirtualną Sauce Labs uruchamiającą testy w przeglądarce.

Typ: `Boolean`<br />
Domyślnie: `false`

### sauceConnectOpts

Zastosuj opcje Sauce Connect (np. zmiana numeru portu lub ustawienia logFile). Zobacz [tę listę](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) aby uzyskać więcej informacji.

UWAGA: Podczas określania opcji należy pominąć `--`. Można również przekształcić je w camelCase (np. `shared-tunnel` lub `sharedTunnel`).

Typ: `Object`<br />
Domyślnie: `{ }`

### uploadLogs

Jeśli `true`, ta opcja przesyła wszystkie pliki dziennika WebdriverIO do platformy Sauce Labs w celu dalszej inspekcji. Upewnij się, że masz ustawione [`outputDir`](https://webdriver.io/docs/options#outputdir) w konfiguracji wdio, aby zapisywać logi do plików, w przeciwnym razie dane będą przesyłane do stdout i nie będą mogły zostać przesłane.

Typ: `Boolean`<br />
Domyślnie: `true`

### setJobName

Pozwala użytkownikom dynamicznie ustawiać nazwę zadania na podstawie parametrów workera, takich jak konfiguracja WebdriverIO, używane capabilities i oryginalny tytuł zestawu testów.

Typ: `Function`<br />
Domyślnie: `(config, capabilities, suiteTitle) => suiteTitle`

----

## Nadpisywanie wygenerowanych metadanych nazwy

Usługa automatycznie generuje nazwę dla każdego testu na podstawie nazwy zestawu, nazwy przeglądarki i innych informacji.

Możesz to nadpisać, podając wartość dla pożądanej capabilities `name`, ale będzie to miało efekt uboczny w postaci nadania wszystkim testom tej samej nazwy.

----

Aby uzyskać więcej informacji na temat WebdriverIO, odwiedź [stronę główną](https://webdriver.io).