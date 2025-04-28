---
id: customservices
title: Własne Usługi
---

Możesz napisać własną niestandardową usługę dla programu testowego WDIO, aby dokładnie dopasować ją do swoich potrzeb.

Usługi to dodatki stworzone dla wielokrotnie używanej logiki, która upraszcza testy, zarządza pakietem testów i integruje wyniki. Usługi mają dostęp do tych samych [haków](/docs/configurationfile), które są dostępne w pliku `wdio.conf.js`.

Istnieją dwa rodzaje usług, które można zdefiniować: usługa uruchamiająca (launcher), która ma dostęp tylko do haków `onPrepare`, `onWorkerStart`, `onWorkerEnd` i `onComplete`, które są wykonywane tylko raz na cykl testowy, oraz usługa pracownika (worker), która ma dostęp do wszystkich innych haków i jest wykonywana dla każdego pracownika. Pamiętaj, że nie możesz współdzielić (globalnych) zmiennych między obydwoma typami usług, ponieważ usługi pracownika działają w innym procesie (procesie pracownika).

Usługę uruchamiającą można zdefiniować w następujący sposób:

```js
export default class CustomLauncherService {
    // Jeśli hak zwraca obietnicę, WebdriverIO będzie czekać, aż ta obietnica zostanie rozwiązana, aby kontynuować.
    async onPrepare(config, capabilities) {
        // TODO: coś przed uruchomieniem wszystkich pracowników
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: coś po zakończeniu pracy pracowników
    }

    // niestandardowe metody usługi ...
}
```

Z kolei usługa pracownika powinna wyglądać tak:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` zawiera wszystkie opcje specyficzne dla usługi
     * np. jeśli zdefiniowano w następujący sposób:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * parametr `serviceOptions` będzie: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * obiekt przeglądarki jest przekazywany tutaj po raz pierwszy
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: coś przed uruchomieniem wszystkich testów, np.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: coś po wykonaniu wszystkich testów
    }

    beforeTest(test, context) {
        // TODO: coś przed każdym testem Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: coś przed każdym scenariuszem Cucumber
    }

    // inne haki lub niestandardowe metody usługi ...
}
```

Zaleca się przechowywanie obiektu przeglądarki przez parametr przekazany w konstruktorze. Na koniec należy wyeksportować oba typy pracowników w następujący sposób:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Jeśli używasz TypeScript i chcesz upewnić się, że parametry metod hacków są bezpieczne typowo, możesz zdefiniować swoją klasę usługi w następujący sposób:

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

## Obsługa Błędów Usługi

Błąd zgłoszony podczas wykonywania hooka usługi zostanie zalogowany, podczas gdy program testowy będzie kontynuował działanie. Jeśli hook w twojej usłudze jest krytyczny dla konfiguracji lub zamknięcia programu testowego, można użyć `SevereServiceError` wyeksportowanego z pakietu `webdriverio`, aby zatrzymać program.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: coś krytycznego dla konfiguracji przed uruchomieniem wszystkich pracowników

        throw new SevereServiceError('Coś poszło nie tak.')
    }

    // niestandardowe metody usługi ...
}
```

## Importowanie Usługi z Modułu

Jedyną rzeczą, którą trzeba teraz zrobić, aby skorzystać z tej usługi, jest przypisanie jej do właściwości `services`.

Zmodyfikuj swój plik `wdio.conf.js`, aby wyglądał następująco:

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
         * użyj bezwzględnej ścieżki do usługi
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Publikowanie Usługi w NPM

Aby ułatwić korzystanie z usług i ich odkrywanie przez społeczność WebdriverIO, postępuj zgodnie z poniższymi zaleceniami:

* Usługi powinny używać tej konwencji nazewnictwa: `wdio-*-service`
* Używaj słów kluczowych NPM: `wdio-plugin`, `wdio-service`
* Wpis `main` powinien `eksportować` instancję usługi
* Przykładowe usługi: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Stosowanie zalecanego wzorca nazewnictwa pozwala na dodawanie usług po nazwie:

```js
// Dodaj wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Dodawanie Opublikowanej Usługi do WDIO CLI i Dokumentacji

Doceniamy każdy nowy plugin, który może pomóc innym osobom w lepszym przeprowadzaniu testów! Jeśli stworzyłeś taki plugin, rozważ dodanie go do naszego CLI i dokumentacji, aby był łatwiejszy do znalezienia.

Zgłoś pull request z następującymi zmianami:

- dodaj swoją usługę do listy [obsługiwanych usług](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) w module CLI
- uzupełnij [listę usług](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json), aby dodać swoją dokumentację do oficjalnej strony Webdriver.io