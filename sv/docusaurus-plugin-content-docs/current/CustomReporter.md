---
id: customreporter
title: Anpassad Reporter
---

Du kan skriva din egen anpassade reporter för WDIO-testrunner som är skräddarsydd efter dina behov. Och det är enkelt!

Allt du behöver göra är att skapa en nodmodul som ärver från paketet `@wdio/reporter`, så att den kan ta emot meddelanden från testet.

Den grundläggande inställningen bör se ut så här:

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

För att använda denna reporter behöver du bara tilldela den till egenskapen `reporter` i din konfiguration.


Din `wdio.conf.js`-fil bör se ut så här:

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

Du kan också publicera reportern på NPM så att alla kan använda den. Namnge paketet som andra reporters `wdio-<reportername>-reporter`, och tagga det med nyckelord som `wdio` eller `wdio-reporter`.

## Händelsehanterare

Du kan registrera en händelsehanterare för flera händelser som utlöses under testning. Alla följande hanterare kommer att ta emot nyttolaster med användbar information om aktuellt tillstånd och framsteg.

Strukturen för dessa nyttolastobjekt beror på händelsen och är enhetliga över ramverken (Mocha, Jasmine och Cucumber). När du implementerar en anpassad reporter bör den fungera för alla ramverk.

Följande lista innehåller alla möjliga metoder du kan lägga till i din reporter-klass:

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

För att skriva ut något vid en viss händelse, använd metoden `this.write(...)`, som tillhandahålls av föräldraklassen `WDIOReporter`. Den strömmar antingen innehållet till `stdout` eller till en loggfil (beroende på reporterns alternativ).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Observera att du inte kan fördröja testutförandet på något sätt.

Alla händelsehanterare bör utföra synkrona rutiner (annars kan du hamna i kapplöpningstillstånd).

Se till att kolla in [exempelsektionen](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) där du kan hitta ett exempel på en anpassad reporter som skriver ut händelsenamnet för varje händelse.

Om du har implementerat en anpassad reporter som kan vara användbar för gemenskapen, tveka inte att göra en Pull Request så att vi kan göra reportern tillgänglig för allmänheten!

Dessutom, om du kör WDIO-testrunner via `Launcher`-gränssnittet, kan du inte använda en anpassad reporter som funktion enligt följande:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## Vänta tills `isSynchronised`

Om din reporter måste utföra asynkrona operationer för att rapportera data (t.ex. uppladdning av loggfiler eller andra tillgångar) kan du skriva över metoden `isSynchronised` i din anpassade reporter för att låta WebdriverIO-runnern vänta tills du har beräknat allt. Ett exempel på detta kan ses i [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

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

På detta sätt kommer runnern att vänta tills all logginformation har laddats upp.

## Publicera Reporter på NPM

För att göra reportern lättare att använda och upptäcka av WebdriverIO-gemenskapen, följ dessa rekommendationer:

* Tjänster bör använda denna namnkonvention: `wdio-*-reporter`
* Använd NPM-nyckelord: `wdio-plugin`, `wdio-reporter`
* `main`-inmatningen bör `export` en instans av reportern
* Exempel på reporter: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Att följa det rekommenderade namnmönstret gör att tjänster kan läggas till med namn:

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Lägg till publicerad tjänst till WDIO CLI och dokumentation

Vi uppskattar verkligen varje nytt plugin som kan hjälpa andra att köra bättre tester! Om du har skapat ett sådant plugin, överväg att lägga till det i vår CLI och dokumentation för att göra det lättare att hitta.

Skapa gärna en pull request med följande ändringar:

- lägg till din tjänst i listan över [supporterade reporters](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) i CLI-modulen
- förbättra [reporter-listan](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json) för att lägga till din dokumentation på den officiella Webdriver.io-sidan