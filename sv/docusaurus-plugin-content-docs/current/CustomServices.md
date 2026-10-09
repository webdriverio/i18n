---
id: customservices
title: Anpassade tjänster
description: "Skriv en anpassad launcher- eller worker-tjänst för WDIO-testrunnern med hjälp av testrunner-hooks, hantera tjänstefel och publicera den på NPM."
---

Du kan skriva din egen anpassade tjänst för WDIO-testrunnern för att skräddarsy den efter dina behov.

Tjänster är tillägg som skapas för återanvändbar logik för att förenkla tester, hantera din testsvit och integrera resultat. Tjänster har tillgång till samma [hooks](/docs/configurationfile) som finns tillgängliga i `wdio.conf.js`.

Det finns två typer av tjänster som kan definieras: en launcher-tjänst som endast har tillgång till hookarna `onPrepare`, `onWorkerStart`, `onWorkerEnd` och `onComplete`, vilka endast körs en gång per testkörning, och en worker-tjänst som har tillgång till alla andra hooks och som körs för varje worker. Observera att du inte kan dela (globala) variabler mellan de två typerna av tjänster, eftersom worker-tjänster körs i en annan (worker-)process.

En launcher-tjänst kan definieras på följande sätt:

```js
export default class CustomLauncherService {
    // Om en hook returnerar ett promise väntar WebdriverIO tills det promiset har uppfyllts innan det fortsätter.
    async onPrepare(config, capabilities) {
        // TODO: något innan alla workers startas
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: något efter att alla workers har stängts ner
    }

    // anpassade tjänstemetoder ...
}
```

En worker-tjänst bör däremot se ut så här:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` innehåller alla alternativ som är specifika för tjänsten
     * t.ex. om den definieras på följande sätt:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * kommer parametern `serviceOptions` att vara: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * browser-objektet skickas in här för första gången
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: något innan alla tester körs, t.ex.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: något efter att alla tester har körts
    }

    beforeTest(test, context) {
        // TODO: något före varje Mocha/Jasmine-testkörning
    }

    beforeScenario(test, context) {
        // TODO: något före varje Cucumber-scenariokörning
    }

    // andra hooks eller anpassade tjänstemetoder ...
}
```

Det rekommenderas att spara browser-objektet via parametern som skickas in i konstruktorn. Exponera slutligen båda typerna av workers på följande sätt:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Om du använder TypeScript och vill säkerställa att hook-metodernas parametrar är typsäkra kan du definiera din tjänsteklass på följande sätt:

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

## Villkorliga worker-tjänster

En tjänst kan avgöra om dess worker-kod behövs för en testkörning eller för en viss worker. Det finns två valfria kontroller:

| Kontroll | Var den körs | Argument | Effekt av att returnera `false` |
| --- | --- | --- | --- |
| Namngiven modulexport `shouldLoad` | Launcher-processen, efter att tjänstemodulen har importerats | Konfiguration, alla konfigurerade capabilities | Tjänstemodulen importeras inte i någon worker. Dess launcher-tjänst körs fortfarande. |
| Statisk worker-tjänstmetod `shouldRun` | Worker-processen, innan tjänsten konstrueras | Tjänstealternativ, den workerns capabilities, konfiguration | Worker-tjänsten konstrueras inte, så ingen av dess hooks körs i den workern. |

Använd `shouldLoad(config, capabilities)` för tjänstemoduler som konfigureras via namn eller sökväg. Detta är ett beslut som gäller hela paketet: om samma tjänst förekommer mer än en gång med olika alternativ gäller resultatet för alla dessa poster. Till exempel kan en anpassad tjänst som kräver fjärrinloggningsuppgifter exportera:

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

Använd `static shouldRun(options, capabilities, config)` för att fatta beslut separat för varje tjänstepost och worker. Det fungerar även med anpassade tjänsteklasser som skickas direkt i `services`. Till exempel kan den här tjänsten begränsa sina hooks till en konfigurerad webbläsare:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // Körs endast i workers som passerade shouldRun.
    }
}
```

Med `services: [['custom', { browserName: 'chrome' }]]` konstrueras denna worker-tjänst endast för Chrome-capabilities, förutsatt att paketets `shouldLoad`-kontroll också tillåter det. Workern måste importera tjänstemodulen för att kunna anropa `shouldRun`; att returnera `false` från denna metod förhindrar inte den importen och påverkar inte launcher-tjänsten.

Båda kontrollerna kan returnera ett booleskt värde eller ett promise av ett booleskt värde. WebdriverIO inväntar varje resultat, och endast `false` inaktiverar laddning eller konstruktion. Tjänster utan dessa kontroller behåller sitt befintliga beteende. Redan konstruerade tjänsteobjekt som innehåller hooks påverkas inte.

Om någon av kontrollerna kastar ett fel eller avvisas misslyckas initieringen av tjänsten med ett fel som identifierar tjänsten. Detta skiljer sig från fel som kastas av tjänste-hooks, vilka beskrivs nedan.

## Felhantering i tjänster

Ett Error som kastas under en tjänste-hook loggas medan runnern fortsätter. Om en hook i din tjänst är kritisk för uppsättningen eller nedmonteringen av testrunnern kan `SevereServiceError`, som exponeras från paketet `webdriverio`, användas för att stoppa runnern.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: något kritiskt för uppsättningen innan alla workers startas

        throw new SevereServiceError('Something went wrong.')
    }

    // anpassade tjänstemetoder ...
}
```

## Importera tjänst från modul

Det enda som nu återstår för att använda den här tjänsten är att tilldela den till egenskapen `services`.

Ändra din `wdio.conf.js`-fil så att den ser ut så här:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * använd importerad tjänsteklass
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * använd absolut sökväg till tjänsten
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Publicera tjänst på NPM

För att göra tjänster enklare att använda och upptäcka för WebdriverIO-communityt, följ gärna dessa rekommendationer:

* Tjänster bör använda denna namngivningskonvention: `wdio-*-service`
* Använd NPM-nyckelord: `wdio-plugin`, `wdio-service`
* `main`-posten bör `export`:era en instans av tjänsten
* Exempeltjänster: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Genom att följa det rekommenderade namngivningsmönstret kan tjänster läggas till via namn:

```js
// Lägg till wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Lägg till publicerad tjänst i WDIO CLI och dokumentationen

Vi uppskattar verkligen varje nytt plugin som kan hjälpa andra att köra bättre tester! Om du har skapat ett sådant plugin, överväg gärna att lägga till det i vår CLI och dokumentation så att det blir lättare att hitta.

Skapa en pull request med följande ändringar:

- lägg till din tjänst i listan över [tjänster som stöds](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) i CLI-modulen
- utöka [tjänstelistan](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json) för att lägga till din dokumentation på den officiella Webdriver.io-sidan