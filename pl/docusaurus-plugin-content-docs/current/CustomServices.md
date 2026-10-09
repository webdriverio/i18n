---
id: customservices
title: Niestandardowe usługi
description: "Napisz niestandardową usługę launchera lub workera dla testrunnera WDIO, korzystając z hooków testrunnera, obsługuj błędy usług i opublikuj ją w NPM."
---

Możesz napisać własną niestandardową usługę dla test runnera WDIO, dopasowaną do Twoich potrzeb.

Usługi to dodatki tworzone w celu zapewnienia logiki wielokrotnego użytku, która upraszcza testy, pomaga zarządzać zestawem testów i integrować wyniki. Usługi mają dostęp do tych samych [hooków](/docs/configurationfile), które są dostępne w `wdio.conf.js`.

Można zdefiniować dwa typy usług: usługę launchera (launcher service), która ma dostęp tylko do hooków `onPrepare`, `onWorkerStart`, `onWorkerEnd` i `onComplete`, wykonywanych tylko raz na przebieg testów, oraz usługę workera (worker service), która ma dostęp do wszystkich pozostałych hooków i jest wykonywana dla każdego workera. Pamiętaj, że nie można współdzielić (globalnych) zmiennych między oboma typami usług, ponieważ usługi workera działają w innym procesie (workera).

Usługę launchera można zdefiniować w następujący sposób:

```js
export default class CustomLauncherService {
    // Jeśli hook zwraca promise, WebdriverIO poczeka, aż ten promise zostanie rozwiązany, zanim będzie kontynuować.
    async onPrepare(config, capabilities) {
        // TODO: coś przed uruchomieniem wszystkich workerów
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: coś po zamknięciu workerów
    }

    // niestandardowe metody usługi ...
}
```

Natomiast usługa workera powinna wyglądać tak:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` zawiera wszystkie opcje specyficzne dla usługi
     * np. jeśli zdefiniowano je następująco:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * parametr `serviceOptions` będzie miał wartość: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * tutaj obiekt browser jest przekazywany po raz pierwszy
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: coś przed uruchomieniem wszystkich testów, np.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: coś po uruchomieniu wszystkich testów
    }

    beforeTest(test, context) {
        // TODO: coś przed każdym uruchomieniem testu Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: coś przed każdym uruchomieniem scenariusza Cucumber
    }

    // inne hooki lub niestandardowe metody usługi ...
}
```

Zaleca się przechowywanie obiektu browser przekazanego jako parametr w konstruktorze. Na koniec wyeksportuj oba typy workerów w następujący sposób:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Jeśli używasz TypeScriptu i chcesz mieć pewność, że parametry metod hooków są bezpieczne typowo, możesz zdefiniować klasę usługi w następujący sposób:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## Warunkowe usługi workera

Usługa może zdecydować, czy jej kod workera jest potrzebny dla danego przebiegu testów lub dla konkretnego workera. Dostępne są dwa opcjonalne sprawdzenia:

| Sprawdzenie | Gdzie jest wykonywane | Argumenty | Skutek zwrócenia `false` |
| --- | --- | --- | --- |
| Nazwany eksport modułu `shouldLoad` | Proces launchera, po zaimportowaniu modułu usługi | Konfiguracja, wszystkie skonfigurowane capabilities | Moduł usługi nie jest importowany w żadnym workerze. Jego usługa launchera nadal działa. |
| Statyczna metoda usługi workera `shouldRun` | Proces workera, przed utworzeniem usługi | Opcje usługi, capabilities danego workera, konfiguracja | Usługa workera nie jest tworzona, więc żaden z jej hooków nie jest uruchamiany w tym workerze. |

Używaj `shouldLoad(config, capabilities)` dla modułów usług konfigurowanych za pomocą nazwy lub ścieżki. Jest to decyzja dotycząca całego pakietu: jeśli ta sama usługa występuje więcej niż raz z różnymi opcjami, wynik dotyczy wszystkich tych wpisów. Na przykład niestandardowa usługa wymagająca zdalnych danych uwierzytelniających mogłaby eksportować:

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Używaj `static shouldRun(options, capabilities, config)`, aby podejmować decyzję osobno dla każdego wpisu usługi i każdego workera. Działa to również z niestandardowymi klasami usług przekazanymi bezpośrednio w `services`. Na przykład ta usługa może ograniczyć swoje hooki do skonfigurowanej przeglądarki:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // Uruchamiane tylko w workerach, które przeszły shouldRun.
    }
}
```

Przy `services: [['custom', { browserName: 'chrome' }]]` ta usługa workera jest tworzona tylko dla capabilities Chrome, pod warunkiem że sprawdzenie `shouldLoad` pakietu również na to pozwala. Worker musi zaimportować moduł usługi, aby wywołać `shouldRun`; zwrócenie `false` z tej metody nie zapobiega temu importowi ani nie wpływa na usługę launchera.

Oba sprawdzenia mogą zwracać wartość logiczną lub promise wartości logicznej. WebdriverIO oczekuje na każdy wynik i tylko `false` wyłącza ładowanie lub tworzenie usługi. Usługi bez tych sprawdzeń zachowują dotychczasowe działanie. Już utworzone obiekty usług zawierające hooki pozostają bez zmian.

Jeśli którekolwiek ze sprawdzeń zgłosi błąd lub zostanie odrzucone, inicjalizacja usługi kończy się niepowodzeniem z błędem identyfikującym usługę. Różni się to od błędów zgłaszanych przez hooki usług, opisanych poniżej.

## Obsługa błędów usług

Błąd zgłoszony podczas hooka usługi zostanie zalogowany, a runner będzie kontynuował działanie. Jeśli hook w Twojej usłudze jest krytyczny dla przygotowania lub zakończenia działania test runnera, można użyć `SevereServiceError` udostępnianego przez pakiet `webdriverio`, aby zatrzymać runner.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: coś krytycznego dla przygotowania przed uruchomieniem wszystkich workerów

        throw new SevereServiceError('Something went wrong.')
    }

    // niestandardowe metody usługi ...
}
```

## Importowanie usługi z modułu

Jedyne, co trzeba teraz zrobić, aby użyć tej usługi, to przypisać ją do właściwości `services`.

Zmodyfikuj plik `wdio.conf.js`, aby wyglądał następująco:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * użyj zaimportowanej klasy usługi
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * użyj ścieżki bezwzględnej do usługi
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Publikowanie usługi w NPM

Aby ułatwić społeczności WebdriverIO korzystanie z usług i ich odnajdywanie, postępuj zgodnie z poniższymi zaleceniami:

* Usługi powinny stosować następującą konwencję nazewnictwa: `wdio-*-service`
* Używaj słów kluczowych NPM: `wdio-plugin`, `wdio-service`
* Wpis `main` powinien eksportować (`export`) instancję usługi
* Przykładowe usługi: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Stosowanie zalecanego wzorca nazewnictwa pozwala dodawać usługi za pomocą nazwy:

```js
// Dodaj wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Dodawanie opublikowanej usługi do WDIO CLI i dokumentacji

Bardzo doceniamy każdą nową wtyczkę, która może pomóc innym w uruchamianiu lepszych testów! Jeśli stworzyłeś taką wtyczkę, rozważ dodanie jej do naszego CLI i dokumentacji, aby łatwiej było ją znaleźć.

Utwórz pull request z następującymi zmianami:

- dodaj swoją usługę do listy [obsługiwanych usług](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) w module CLI
- rozszerz [listę usług](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json), aby dodać swoją dokumentację do oficjalnej strony Webdriver.io