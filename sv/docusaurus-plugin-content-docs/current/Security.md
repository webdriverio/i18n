---
id: security
title: Säkerhet
---

WebdriverIO har säkerhetsaspekten i åtanke när de tillhandahåller lösningar. Nedan finns några sätt att bättre säkra dina tester.

## Bästa praxis

- Hårdkoda aldrig känslig data som kan skada din organisation om den exponeras i klartext.
- Använd en mekanism (som ett valv) för att säkert lagra nycklar och lösenord och hämta dem när du startar dina end-to-end-tester.
- Verifiera att ingen känslig data exponeras i loggar eller av molnleverantören, såsom autentiseringstoken i nätverksloggar.

:::info

Även för testdata är det viktigt att fråga om en illvillig person med fel händer skulle kunna hämta information eller använda dessa resurser med skadlig avsikt.

:::

## Maskering av känslig data

Om du använder känslig data under ditt test är det viktigt att säkerställa att de inte är synliga för alla, till exempel i loggar. När du använder en molnleverantör är privata nycklar ofta inblandade. Denna information måste maskeras från loggar, rapportörer och andra kontaktpunkter. Följande ger några maskeringslösningar för att köra tester utan att exponera dessa värden.

### WebDriverIO

#### Maskera textvärdena i kommandon

Kommandona `addValue` och `setValue` stöder ett booleskt mask-värde för att maskera i loggar och rapportörer. Dessutom kommer andra verktyg, såsom prestandaverktyg och tredjepartsverktyg, också att ta emot den maskerade versionen, vilket förbättrar säkerheten.

Om du till exempel använder en verklig produktionsanvändare och behöver ange ett lösenord som du vill maskera, då är det nu möjligt med följande:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Ovanstående kommer att dölja textvärdet från WDIO-loggar enligt följande:

Loggexempel:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Rapportörer, som Allure-rapportörer, och tredjepartsverktyg som Percy från BrowserStack kommer också att hantera den maskerade versionen.
Tillsammans med rätt Appium-version kommer även Appium-loggarna att undantas från din känsliga data.

:::info

Begränsningar:
  - I Appium kan ytterligare plugins läcka även om vi ber om att maskera informationen.
  - Molnleverantörer kan använda en proxy för HTTP-loggning, vilket kringgår maskeringsmekanismen.
  - Kommandot `getValue` stöds inte. Om det används på samma element kan det dessutom exponera värdet som är avsett att maskeras när man använder `addValue` eller `setValue`.

Minsta version som krävs:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Maskering i WDIO-loggar

Med konfigurationen `maskingPatterns` kan vi maskera känslig information från WDIO-loggar. Appium-loggar omfattas dock inte.

Om du till exempel använder en molnleverantör och använder info-nivån, kommer du med största sannolikhet att "läcka" användarens nyckel som visas nedan:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

För att motverka detta kan vi skicka det reguljära uttrycket `'--key=([^ ]*)'` och nu i loggarna ser du 

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Du kan uppnå ovanstående genom att ange det reguljära uttrycket i fältet `maskingPatterns` i konfigurationen.
  - För flera reguljära uttryck, använd en enda sträng men med kommaseparerade värden.
  - För mer information om maskeringsmönster, se [Masking Patterns-avsnittet i WDIO Logger README](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Minsta version som krävs:
 - WDIO v9.15.0

:::

#### Inaktivera WDIO-loggar

Ett annat sätt att blockera loggning av känslig data är att sänka eller tysta loggnivån eller inaktivera loggaren.
Det kan uppnås enligt följande:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
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
Appium erbjuder sin egen maskeringslösning; se [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Det kan vara svårt att använda deras lösning. Ett sätt om möjligt är att skicka en token i din sträng som `@mask@` och använda den som ett reguljärt uttryck
 - I vissa Appium-versioner loggas värdena också med varje tecken kommaseparerat, så vi måste vara försiktiga.
 - Tyvärr stöder BrowserStack inte denna lösning, men den är fortfarande användbar lokalt
 
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

Skicka sedan JSON-filnamnet till fältet `logFilters` i appium-tjänstens konfiguration:
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
 - Tyvärr är lösningen allt-eller-inget, så alla textvärden för angivna kommandon kommer att maskeras.