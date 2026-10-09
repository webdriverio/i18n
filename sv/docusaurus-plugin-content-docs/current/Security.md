---
id: security
title: Säkerhet
description: "Skydda känsliga testdata genom att följa bästa praxis för säkerhet och maskera lösenord och nycklar i loggar och rapporter."
---

WebdriverIO har säkerhetsaspekten i åtanke när lösningar tas fram. Nedan följer några sätt att bättre säkra dina tester.

## Bästa praxis

- Hårdkoda aldrig känsliga data som kan skada din organisation om de exponeras i klartext.
- Använd en mekanism (till exempel ett valv) för att lagra nycklar och lösenord säkert och hämta dem när du startar dina end-to-end-tester.
- Kontrollera att inga känsliga data exponeras i loggar eller hos molnleverantören, till exempel autentiseringstokens i nätverksloggar.

:::info

Även för testdata är det viktigt att fråga sig om en illasinnad person, i fel händer, skulle kunna hämta information eller använda dessa resurser i skadligt syfte.

:::

## Maskera känsliga data

Om du använder känsliga data under dina tester är det viktigt att säkerställa att de inte är synliga för alla, till exempel i loggar. När du använder en molnleverantör är dessutom privata nycklar ofta inblandade. Denna information måste maskeras från loggar, rapportörer och andra beröringspunkter. Nedan beskrivs några maskeringslösningar för att köra tester utan att exponera dessa värden.

### WebDriverIO

#### Maskera kommandons textvärde

Kommandona `addValue` och `setValue` stöder ett booleskt mask-värde för att maskera i loggar samt i rapportörer. Dessutom kommer andra verktyg, såsom prestandaverktyg och tredjepartsverktyg, också att få den maskerade versionen, vilket förbättrar säkerheten.

Om du till exempel använder en riktig produktionsanvändare och behöver ange ett lösenord som du vill maskera, är det nu möjligt med följande:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Ovanstående döljer textvärdet i WDIO-loggarna enligt följande:

Loggexempel:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Rapportörer, såsom Allure-rapportörer, och tredjepartsverktyg som Percy från BrowserStack hanterar också den maskerade versionen.
I kombination med rätt Appium-version kommer även Appium-loggarna att vara fria från dina känsliga data.

:::info

Begränsningar:
  - I Appium kan ytterligare plugins läcka information trots att vi begär att den ska maskeras.
  - Molnleverantörer kan använda en proxy för HTTP-loggning, vilket kringgår den maskeringsmekanism som införts.
  - Kommandot `getValue` stöds inte. Om det används på samma element kan det dessutom exponera värdet som var avsett att maskeras när `addValue` eller `setValue` används.

Lägsta version som krävs:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Maskera i WDIO-loggar

Med konfigurationen `maskingPatterns` kan vi maskera känslig information från WDIO-loggar. Appium-loggar omfattas dock inte.

Om du till exempel använder en molnleverantör och loggnivån info, kommer du med största sannolikhet att "läcka" användarens nyckel enligt nedan:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

För att motverka detta kan vi ange det reguljära uttrycket `'--key=([^ ]*)'`, och nu kommer du att se följande i loggarna

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Du kan uppnå ovanstående genom att ange det reguljära uttrycket i fältet `maskingPatterns` i konfigurationen.
  - För flera reguljära uttryck, använd en enda sträng men med kommaseparerade värden.
  - För mer information om maskeringsmönster, se [avsnittet Masking Patterns i WDIO Logger README](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info
Lägsta version som krävs:
 - WDIO v9.15.0
:::

:::warning
För hemligheter som skickas via kommandoraden kan maskeringen misslyckas eftersom filen wdio.conf.ts tolkas senare i exekveringscykeln. Att använda miljövariabler i dessa fall rekommenderas starkt och är mycket säkrare.
:::

#### Inaktivera WDIO-loggare

Ett annat sätt att förhindra loggning av känsliga data är att sänka eller tysta loggnivån eller inaktivera loggaren.
Det kan åstadkommas på följande sätt:

```ts
import logger from '@wdio/logger';

/**
  * Sätt WDIO-loggarens loggnivå till 'silent' innan *ett promise körs, vilket hjälper till att dölja känslig information i loggarna.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

### Tredjepartslösningar

#### Appium
Appium erbjuder en egen maskeringslösning; se [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Det kan vara knepigt att använda deras lösning. Ett sätt, om möjligt, är att lägga in en token i din sträng, till exempel `@mask@`, och använda den som ett reguljärt uttryck
 - I vissa Appium-versioner loggas värdena också med varje tecken kommaseparerat, så vi behöver vara försiktiga.
 - Tyvärr stöder BrowserStack inte denna lösning, men den är ändå användbar lokalt

Med exemplet `@mask@` som nämndes tidigare kan vi använda följande JSON-fil med namnet `appiumMaskLogFilters.json`
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

Ange sedan JSON-filens namn i fältet `logFilters` i Appium-tjänstens konfiguration:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

#### BrowserStack

BrowserStack erbjuder också en viss nivå av maskering för att dölja vissa data; se [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Tyvärr är lösningen allt-eller-inget, så alla textvärden för de angivna kommandona kommer att maskeras.