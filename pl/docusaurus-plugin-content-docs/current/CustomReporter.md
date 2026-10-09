---
id: customreporter
title: Własny reporter
description: "Zbuduj własny reporter dla test runnera WDIO w oparciu o @wdio/reporter, obsługuj zdarzenia runnera i opublikuj go w NPM."
---

Możesz napisać własny reporter dla test runnera WDIO, dopasowany do Twoich potrzeb. I to jest łatwe!

Wystarczy utworzyć moduł node, który dziedziczy po pakiecie `@wdio/reporter`, dzięki czemu może odbierać komunikaty z testu.

Podstawowa konfiguracja powinna wyglądać tak:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * spraw, aby reporter domyślnie zapisywał do strumienia wyjściowego
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Aby użyć tego reportera, wystarczy przypisać go do właściwości `reporter` w Twojej konfiguracji.


Twój plik `wdio.conf.js` powinien wyglądać tak:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * użyj zaimportowanej klasy reportera
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * użyj ścieżki bezwzględnej do reportera
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Możesz również opublikować reporter w NPM, aby każdy mógł z niego korzystać. Nazwij pakiet tak jak inne reportery, `wdio-<reportername>-reporter`, i oznacz go słowami kluczowymi takimi jak `wdio` lub `wdio-reporter`.

## Obsługa zdarzeń

Możesz zarejestrować obsługę (event handler) dla kilku zdarzeń, które są wywoływane podczas testowania. Wszystkie poniższe handlery otrzymają dane (payload) z przydatnymi informacjami o bieżącym stanie i postępie.

Struktura tych obiektów zależy od zdarzenia i jest ujednolicona dla wszystkich frameworków (Mocha, Jasmine i Cucumber). Po zaimplementowaniu własnego reportera powinien on działać ze wszystkimi frameworkami.

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

Nazwy metod są dość oczywiste.

Aby wypisać coś przy określonym zdarzeniu, użyj metody `this.write(...)`, którą udostępnia nadrzędna klasa `WDIOReporter`. Przesyła ona treść strumieniowo do `stdout` lub do pliku logu (w zależności od opcji reportera).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Pamiętaj, że nie możesz w żaden sposób opóźnić wykonania testu.

Wszystkie handlery zdarzeń powinny wykonywać operacje synchroniczne (w przeciwnym razie napotkasz problemy z wyścigami - race conditions).

Koniecznie zajrzyj do [sekcji z przykładami](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio), gdzie znajdziesz przykładowy własny reporter, który wypisuje nazwę każdego zdarzenia.

Jeśli zaimplementowałeś własny reporter, który mógłby być przydatny dla społeczności, nie wahaj się utworzyć Pull Requesta, abyśmy mogli udostępnić ten reporter publicznie!

Ponadto, jeśli uruchamiasz test runner WDIO za pomocą interfejsu `Launcher`, nie możesz zastosować własnego reportera jako funkcji w następujący sposób:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // to NIE zadziała, ponieważ CustomReporter nie jest serializowalny
    reporters: ['dot', CustomReporter]
})
```

## Czekaj, aż `isSynchronised`

Jeśli Twój reporter musi wykonywać operacje asynchroniczne, aby raportować dane (np. przesyłanie plików logów lub innych zasobów), możesz nadpisać metodę `isSynchronised` w swoim własnym reporterze, aby runner WebdriverIO poczekał, aż wszystko zostanie przetworzone. Przykład można zobaczyć w [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * nadpisz metodę isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * synchronizuj pliki logów
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
             * usuń przesłane logi z bufora logów
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

W ten sposób runner będzie czekał, aż wszystkie informacje z logów zostaną przesłane.

## Publikowanie reportera w NPM

Aby ułatwić społeczności WebdriverIO korzystanie z reportera i jego odnalezienie, postępuj zgodnie z poniższymi zaleceniami:

* Usługi powinny stosować następującą konwencję nazewnictwa: `wdio-*-reporter`
* Używaj słów kluczowych NPM: `wdio-plugin`, `wdio-reporter`
* Punkt wejścia `main` powinien eksportować (`export`) instancję reportera
* Przykładowy reporter: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Stosowanie zalecanego wzorca nazewnictwa pozwala dodawać usługi po nazwie:

```js
// Dodaj wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Dodaj opublikowaną usługę do WDIO CLI i dokumentacji

Bardzo doceniamy każdą nową wtyczkę, która może pomóc innym w uruchamianiu lepszych testów! Jeśli stworzyłeś taką wtyczkę, rozważ dodanie jej do naszego CLI i dokumentacji, aby łatwiej było ją znaleźć.

Utwórz pull request z następującymi zmianami:

- dodaj swoją usługę do listy [obsługiwanych reporterów](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) w module CLI
- rozszerz [listę reporterów](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json), aby dodać swoją dokumentację do oficjalnej strony Webdriver.io