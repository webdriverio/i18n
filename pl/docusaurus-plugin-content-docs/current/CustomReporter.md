---
id: customreporter
title: Niestandardowy Reporter
---

Możesz napisać własny niestandardowy reporter dla testera WDIO, który jest dostosowany do Twoich potrzeb. I to jest proste!

Wszystko, co musisz zrobić, to utworzyć moduł Node, który dziedziczy z pakietu `@wdio/reporter`, aby mógł otrzymywać wiadomości z testu.

Podstawowa konfiguracja powinna wyglądać tak:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Aby używać tego reportera, wystarczy przypisać go do właściwości `reporter` w twojej konfiguracji.


Twój plik `wdio.conf.js` powinien wyglądać tak:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Możesz także opublikować reporter na NPM, aby każdy mógł go używać. Nazwij pakiet jak inne reportery `wdio-<reportername>-reporter` i oznacz go słowami kluczowymi takimi jak `wdio` lub `wdio-reporter`.

## Obsługa zdarzeń

Możesz zarejestrować obsługę zdarzeń dla kilku zdarzeń, które są wyzwalane podczas testowania. Wszystkie z poniższych procedur obsługi otrzymają ładunki z przydatnymi informacjami o bieżącym stanie i postępie.

Struktura tych obiektów ładunku zależy od zdarzenia i jest ujednolicona we wszystkich frameworkach (Mocha, Jasmine i Cucumber). Po zaimplementowaniu niestandardowego reportera powinien on działać dla wszystkich frameworków.

Poniższa lista zawiera wszystkie możliwe metody, które możesz dodać do swojej klasy reportera:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Nazwy metod są dość jasne.

Aby wydrukować coś przy określonym zdarzeniu, użyj metody `this.write(...)`, która jest dostarczana przez klasę nadrzędną `WDIOReporter`. Albo przesyła zawartość do `stdout`, albo do pliku dziennika (w zależności od opcji reportera).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Pamiętaj, że nie możesz w żaden sposób opóźnić wykonania testu.

Wszystkie procedury obsługi zdarzeń powinny wykonywać rutyny synchroniczne (w przeciwnym razie napotkasz warunki wyścigu).

Sprawdź również [sekcję przykładów](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio), gdzie znajdziesz przykładowy niestandardowy reporter, który drukuje nazwę zdarzenia dla każdego zdarzenia.

Jeśli zaimplementowałeś niestandardowego reportera, który może być przydatny dla społeczności, nie wahaj się zrobić Pull Request, abyśmy mogli udostępnić reportera publicznie!

Ponadto, jeśli uruchamiasz tester WDIO za pośrednictwem interfejsu `Launcher`, nie możesz zastosować niestandardowego reportera jako funkcji w następujący sposób:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## Czekanie na `isSynchronised`

Jeśli twój reporter musi wykonywać operacje asynchroniczne w celu raportowania danych (np. przesyłania plików dziennika lub innych zasobów), możesz nadpisać metodę `isSynchronised` w swoim niestandardowym reporterze, aby tester WebdriverIO czekał, aż wszystko zostanie obliczone. Przykład tego można zobaczyć w [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

W ten sposób tester będzie czekał, aż wszystkie informacje dziennika zostaną przesłane.

## Publikowanie reportera na NPM

Aby reporter był łatwiejszy do konsumpcji i odkrycia przez społeczność WebdriverIO, postępuj zgodnie z tymi zaleceniami:

* Usługi powinny używać tej konwencji nazewnictwa: `wdio-*-reporter`
* Używaj słów kluczowych NPM: `wdio-plugin`, `wdio-reporter`
* Główny wpis powinien `export` zawierać instancję reportera
* Przykładowy reporter: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Postępowanie zgodnie z zalecanym wzorcem nazewnictwa pozwala na dodawanie usług według nazwy:

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Dodaj opublikowaną usługę do WDIO CLI i dokumentacji

Bardzo doceniamy każdy nowy plugin, który może pomóc innym ludziom przeprowadzać lepsze testy! Jeśli stworzyłeś taki plugin, rozważ dodanie go do naszego CLI i dokumentacji, aby był łatwiejszy do znalezienia.

Proszę o zgłoszenie pull requesta z następującymi zmianami:

- dodaj swoją usługę do listy [obsługiwanych reporterów](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) w module CLI
- rozszerz [listę reporterów](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json) o swoją dokumentację na oficjalnej stronie Webdriver.io