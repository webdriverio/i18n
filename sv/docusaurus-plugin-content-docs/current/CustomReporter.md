---
id: customreporter
title: Anpassad rapportör
description: "Bygg en anpassad rapportör för WDIO-testköraren ovanpå @wdio/reporter, hantera körarhändelser och publicera den på NPM."
---

Du kan skriva din egen anpassade rapportör för WDIO-testköraren som är skräddarsydd efter dina behov. Och det är enkelt!

Allt du behöver göra är att skapa en node-modul som ärver från paketet `@wdio/reporter`, så att den kan ta emot meddelanden från testet.

Den grundläggande uppsättningen bör se ut så här:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * låt rapportören skriva till utdataströmmen som standard
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

För att använda denna rapportör behöver du bara tilldela den till egenskapen `reporter` i din konfiguration.


Din `wdio.conf.js`-fil bör se ut så här:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * använd importerad rapportörklass
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * använd absolut sökväg till rapportören
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Du kan också publicera rapportören på NPM så att alla kan använda den. Namnge paketet som andra rapportörer, `wdio-<reportername>-reporter`, och tagga det med nyckelord som `wdio` eller `wdio-reporter`.

## Händelsehanterare

Du kan registrera en händelsehanterare för flera händelser som utlöses under testningen. Alla följande hanterare tar emot payloads med användbar information om aktuellt tillstånd och förlopp.

Strukturen på dessa payload-objekt beror på händelsen och är enhetlig över ramverken (Mocha, Jasmine och Cucumber). När du har implementerat en anpassad rapportör bör den fungera för alla ramverk.

Följande lista innehåller alla möjliga metoder du kan lägga till i din rapportörklass:

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

Metodnamnen är ganska självförklarande.

För att skriva ut något vid en viss händelse, använd metoden `this.write(...)`, som tillhandahålls av föräldraklassen `WDIOReporter`. Den strömmar antingen innehållet till `stdout` eller till en loggfil (beroende på rapportörens alternativ).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Observera att du inte på något sätt kan fördröja testkörningen.

Alla händelsehanterare bör köra synkrona rutiner (annars kommer du att stöta på kapplöpningstillstånd).

Se till att kolla in [exempelavsnittet](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) där du hittar ett exempel på en anpassad rapportör som skriver ut händelsenamnet för varje händelse.

Om du har implementerat en anpassad rapportör som kan vara användbar för communityn, tveka inte att skapa en Pull Request så att vi kan göra rapportören tillgänglig för allmänheten!

Om du kör WDIO-testköraren via `Launcher`-gränssnittet kan du inte heller använda en anpassad rapportör som funktion på följande sätt:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // detta fungerar INTE, eftersom CustomReporter inte är serialiserbar
    reporters: ['dot', CustomReporter]
})
```

## Vänta tills `isSynchronised`

Om din rapportör måste utföra asynkrona operationer för att rapportera data (t.ex. uppladdning av loggfiler eller andra tillgångar) kan du skriva över metoden `isSynchronised` i din anpassade rapportör för att låta WebdriverIO-köraren vänta tills du har beräknat allt. Ett exempel på detta finns i [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * skriv över metoden isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * synkronisera loggfiler
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
             * ta bort överförda loggar från logghinken
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

På så sätt väntar köraren tills all logginformation har laddats upp.

## Publicera rapportör på NPM

För att göra rapportören enklare att använda och upptäcka för WebdriverIO-communityn, följ dessa rekommendationer:

* Tjänster bör använda denna namnkonvention: `wdio-*-reporter`
* Använd NPM-nyckelord: `wdio-plugin`, `wdio-reporter`
* `main`-posten bör `export` en instans av rapportören
* Exempel på rapportör: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Genom att följa det rekommenderade namnmönstret kan tjänster läggas till med namn:

```js
// Lägg till wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Lägg till publicerad tjänst i WDIO CLI och dokumentationen

Vi uppskattar verkligen varje nytt plugin som kan hjälpa andra att köra bättre tester! Om du har skapat ett sådant plugin, överväg att lägga till det i vårt CLI och vår dokumentation för att göra det lättare att hitta.

Skapa en pull request med följande ändringar:

- lägg till din tjänst i listan över [stödda rapportörer](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) i CLI-modulen
- utöka [rapportörlistan](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) för att lägga till din dokumentation på den officiella Webdriver.io-sidan