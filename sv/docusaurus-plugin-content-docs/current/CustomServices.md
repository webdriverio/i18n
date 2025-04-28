---
id: customservices
title: Anpassade tjänster
---

Du kan skriva dina egna anpassade tjänster för WDIO testrunner för att passa dina behov.

Tjänster är tillägg som skapas för återanvändbar logik för att förenkla tester, hantera din testsvit och integrera resultat. Tjänster har tillgång till alla samma [hooks](/docs/configurationfile) som finns tillgängliga i `wdio.conf.js`.

Det finns två typer av tjänster som kan definieras: en launcher-tjänst som endast har tillgång till krokarna `onPrepare`, `onWorkerStart`, `onWorkerEnd` och `onComplete` som endast körs en gång per testkörning, och en worker-tjänst som har tillgång till alla andra krokar och som körs för varje worker. Observera att du inte kan dela (globala) variabler mellan de två typerna av tjänster eftersom worker-tjänster körs i en annan (worker) process.

En launcher-tjänst kan definieras så här:

```js
export default class CustomLauncherService {
    // If a hook returns a promise, WebdriverIO will wait until that promise is resolved to continue.
    async onPrepare(config, capabilities) {
        // TODO: something before all workers launch
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: something after the workers shutdown
    }

    // custom service methods ...
}
```

Medan en worker-tjänst bör se ut så här:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contains all options specific to the service
     * e.g. if defined as follows:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * this browser object is passed in here for the first time
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: something before all tests are run, e.g.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: something after all tests are run
    }

    beforeTest(test, context) {
        // TODO: something before each Mocha/Jasmine test run
    }

    beforeScenario(test, context) {
        // TODO: something before each Cucumber scenario run
    }

    // other hooks or custom service methods ...
}
```

Det rekommenderas att lagra browser-objektet genom den parameter som skickas in i konstruktorn. Till sist, exponera båda typerna av workers enligt följande:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Om du använder TypeScript och vill säkerställa att hookmetodernas parametrar är typsäkra, kan du definiera din tjänstklass så här:

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

## Felhantering för tjänster

Ett fel som kastas under en tjänsthook kommer att loggas medan runnern fortsätter. Om en hook i din tjänst är kritisk för inställning eller nedstängning av testrunnern, kan `SevereServiceError` som exponeras från paketet `webdriverio` användas för att stoppa runnern.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: something critical for setup before all workers launch

        throw new SevereServiceError('Something went wrong.')
    }

    // custom service methods ...
}
```

## Importera tjänst från modul

Det enda som nu behöver göras för att använda denna tjänst är att tilldela den till egenskapen `services`.

Modifiera din `wdio.conf.js`-fil så den ser ut så här:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * use imported service class
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * use absolute path to service
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Publicera tjänst på NPM

För att göra tjänster lättare att använda och upptäcka för WebdriverIO-gemenskapen, följ dessa rekommendationer:

* Tjänster bör använda denna namnkonvention: `wdio-*-service`
* Använd NPM-nyckelord: `wdio-plugin`, `wdio-service`
* Huvudinlägget bör `export` en instans av tjänsten
* Exempel på tjänster: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Genom att följa det rekommenderade namnmönstret kan tjänster läggas till med namn:

```js
// Add wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Lägg till publicerad tjänst till WDIO CLI och dokumentation

Vi uppskattar verkligen varje nytt plugin som kan hjälpa andra människor att köra bättre tester! Om du har skapat ett sådant plugin, överväg att lägga till det i vår CLI och dokumentation för att göra det lättare att hitta.

Skapa en pull request med följande ändringar:

- lägg till din tjänst i listan över [stödda tjänster](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) i CLI-modulen
- förbättra [tjänstlistan](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) för att lägga till din dokumentation på den officiella Webdriver.io-sidan