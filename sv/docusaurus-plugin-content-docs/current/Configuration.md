---
id: configuration
title: Konfiguration
---

Baserat på [installationstypen](/docs/setuptypes) (t.ex. användning av råprotokollbindningar, WebdriverIO som fristående paket eller WDIO-testkörnare) finns det olika uppsättningar alternativ tillgängliga för att kontrollera miljön.

## WebDriver-alternativ

Följande alternativ definieras när du använder paketet [`webdriver`](https://www.npmjs.com/package/webdriver) protokoll:

### protocol

Protokoll som används vid kommunikation med drivrutinsservern.

Typ: `String`<br />
Standard: `http`

### hostname

Värdnamn för din drivrutinsserver.

Typ: `String`<br />
Standard: `0.0.0.0`

### port

Porten som din drivrutinsserver använder.

Typ: `Number`<br />
Standard: `undefined`

### path

Sökväg till drivrutinsserverns slutpunkt.

Typ: `String`<br />
Standard: `/`

### queryParams

Frågeparametrar som propageras till drivrutinsservern.

Typ: `Object`<br />
Standard: `undefined`

### user

Ditt molntjänstanvändarnamn (fungerar endast för [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) eller [LambdaTest](https://www.lambdatest.com) konton). Om angiven kommer WebdriverIO automatiskt att ställa in anslutningsalternativ för dig. Om du inte använder en molnleverantör kan detta användas för att autentisera andra WebDriver-backend.

Typ: `String`<br />
Standard: `undefined`

### key

Din molntjänståtkomstnyckel eller hemliga nyckel (fungerar endast för [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) eller [LambdaTest](https://www.lambdatest.com) konton). Om angiven kommer WebdriverIO automatiskt att ställa in anslutningsalternativ för dig. Om du inte använder en molnleverantör kan detta användas för att autentisera andra WebDriver-backend.

Typ: `String`<br />
Standard: `undefined`

### capabilities

Definierar de funktioner du vill köra i din WebDriver-session. Kolla in [WebDriver-protokollet](https://w3c.github.io/webdriver/#capabilities) för mer detaljer. Om du kör en äldre drivrutin som inte stöder WebDriver-protokollet behöver du använda [JSONWireProtocol-funktioner](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) för att framgångsrikt köra en session.

Förutom WebDriver-baserade funktioner kan du tillämpa webbläsar- och leverantörsspecifika alternativ som möjliggör djupare konfiguration till fjärrwebbläsaren eller enheten. Dessa dokumenteras i motsvarande leverantörsdokumentation, t.ex.:

- `goog:chromeOptions`: för [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: för [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: för [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: för [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: för [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: för [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Dessutom är ett användbart verktyg Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/), som hjälper dig att skapa detta objekt genom att klicka ihop dina önskade funktioner.

Typ: `Object`<br />
Standard: `null`

**Exempel:**

```js
{
    browserName: 'chrome', // alternativ: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // webbläsarversion
    platformName: 'Windows 10' // OS-plattform
}
```

Om du kör webb- eller nativa tester på mobila enheter, skiljer sig `capabilities` från WebDriver-protokollet. Se [Appium Docs](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) för mer detaljer.

### logLevel

Nivå av loggningens detaljnivå.

Typ: `String`<br />
Standard: `info`<br />
Alternativ: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Katalog för att lagra alla testkörarloggfiler (inklusive rapportörloggar och `wdio`-loggar). Om inte inställt, streamas alla loggar till `stdout`. Eftersom de flesta rapportörer är gjorda för att logga till `stdout`, rekommenderas det att endast använda detta alternativ för specifika rapportörer där det är mer meningsfullt att skicka rapporten till en fil (som `junit`-rapportören, till exempel).

När du kör i fristående läge är den enda loggen som genereras av WebdriverIO `wdio`-loggen.

Typ: `String`<br />
Standard: `null`

### connectionRetryTimeout

Timeout för alla WebDriver-förfrågningar till en drivrutin eller grid.

Typ: `Number`<br />
Standard: `120000`

### connectionRetryCount

Maximalt antal förfrågningsförsök till Selenium-servern.

Typ: `Number`<br />
Standard: `3`

### agent

Tillåter dig att använda en anpassad `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) för att göra förfrågningar.

Typ: `Object`<br />
Standard:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Specificera anpassade `headers` för att skicka med i varje WebDriver-förfrågan. Om din Selenium Grid kräver Basic Authentication rekommenderar vi att du skickar in en `Authorization`-header genom detta alternativ för att autentisera dina WebDriver-förfrågningar, t.ex.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Typ: `Object`<br />
Standard: `{}`

### transformRequest

Funktion som fångar upp [HTTP-förfrågningsalternativ](https://github.com/sindresorhus/got#options) innan en WebDriver-förfrågan görs

Typ: `(RequestOptions) => RequestOptions`<br />
Standard: *none*

### transformResponse

Funktion som fångar upp HTTP-svarsobjekt efter att ett WebDriver-svar har anlänt. Funktionen får det ursprungliga svarsobjektet som första och motsvarande `RequestOptions` som andra argument.

Typ: `(Response, RequestOptions) => Response`<br />
Standard: *none*

### strictSSL

Huruvida det inte kräver att SSL-certifikatet är giltigt.
Det kan ställas in via miljövariabler som `STRICT_SSL` eller `strict_ssl`.

Typ: `Boolean`<br />
Standard: `true`

### enableDirectConnect

Huruvida aktivera [Appium direktanslutningsfunktion](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Det gör ingenting om svaret inte har rätt nycklar medan flaggan är aktiverad.

Typ: `Boolean`<br />
Standard: `true`

### cacheDir

Sökvägen till roten av cachekatalogen. Denna katalog används för att lagra alla drivrutiner som laddas ner när man försöker starta en session.

Typ: `String`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

Följande alternativ (inklusive de som anges ovan) kan användas med WebdriverIO i fristående läge:

### automationProtocol

Definiera det protokoll du vill använda för din webbläsarautomation. För närvarande stöds endast [`webdriver`](https://www.npmjs.com/package/webdriver), eftersom det är den huvudsakliga webbläsarautomatiseringsteknologin som WebdriverIO använder.

Om du vill automatisera webbläsaren med en annan automatiseringsteknologi, se till att du ställer in denna egenskap till en sökväg som löser till en modul som följer följande gränssnitt:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Typ: `String`<br />
Standard: `webdriver`

### baseUrl

Förkorta `url`-kommandoanrop genom att ställa in en basURL.
- Om din `url`-parameter börjar med `/`, föregås `baseUrl` (förutom `baseUrl`-sökvägen, om den har en).
- Om din `url`-parameter börjar utan ett schema eller `/` (som `some/path`), föregås hela `baseUrl` direkt.

Typ: `String`<br />
Standard: `null`

### waitforTimeout

Standardtimeout för alla `waitFor*`-kommandon. (Observera det lilla `f` i alternativnamnet.) Denna timeout påverkar __endast__ kommandon som börjar med `waitFor*` och deras standardväntetid.

För att öka timeout för ett _test_, se ramverksdokumentationen.

Typ: `Number`<br />
Standard: `5000`

### waitforInterval

Standardintervall för alla `waitFor*`-kommandon för att kontrollera om ett förväntat tillstånd (t.ex. synlighet) har ändrats.

Typ: `Number`<br />
Standard: `100`

### region

Om du kör på Sauce Labs kan du välja att köra tester mellan olika datacenter: US eller EU.
För att ändra din region till EU, lägg till `region: 'eu'` i din konfiguration.

__Observera:__ Detta har endast effekt om du tillhandahåller `user` och `key`-alternativ som är kopplade till ditt Sauce Labs-konto.

Typ: `String`<br />
Standard: `us`

*(endast för vm och/eller em/simulatorer)*

---

## Testköraralternativ

Följande alternativ (inklusive de som anges ovan) definieras endast för att köra WebdriverIO med WDIO-testköraren:

### specs

Definiera specifikationer för testkörning. Du kan antingen ange ett globalt mönster för att matcha flera filer på en gång eller paketera ett globalt mönster eller uppsättning sökvägar till en array för att köra dem inom en enda arbetarprocess. Alla sökvägar ses som relativa från konfigurationsfilens sökväg.

Typ: `(String | String[])[]`<br />
Standard: `[]`

### exclude

Exkludera specifikationer från testkörning. Alla sökvägar ses som relativa från konfigurationsfilens sökväg.

Typ: `String[]`<br />
Standard: `[]`

### suites

Ett objekt som beskriver olika sviter, som du sedan kan specificera med alternativet `--suite` på `wdio`-kommandoraden.

Typ: `Object`<br />
Standard: `{}`

### capabilities

Samma som avsnittet `capabilities` som beskrivs ovan, förutom alternativet att specificera antingen ett [`multiremote`](/docs/multiremote)-objekt, eller flera WebDriver-sessioner i en array för parallell körning.

Du kan tillämpa samma leverantörs- och webbläsarspecifika funktioner som definieras [ovan](/docs/configuration#capabilities).

Typ: `Object`|`Object[]`<br />
Standard: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Maximalt antal parallella arbetare totalt.

__Observera:__ att det kan vara ett tal så högt som `100`, när testerna utförs på externa leverantörer som Sauce Labs maskiner. Där testas inte testerna på en enda maskin, utan snarare på flera virtuella maskiner. Om testerna ska köras på en lokal utvecklingsmaskin, använd ett mer rimligt tal som `3`, `4` eller `5`. I grund och botten är detta antalet webbläsare som kommer att startas samtidigt och köra dina tester samtidigt, så det beror på hur mycket RAM det finns på din maskin och hur många andra appar som körs på din maskin.

Du kan också tillämpa `maxInstances` inom dina capability-objekt med hjälp av `wdio:maxInstances`-förmågan. Detta begränsar antalet parallella sessioner för den specifika förmågan.

Typ: `Number`<br />
Standard: `100`

### maxInstancesPerCapability

Maximalt antal parallella arbetare per förmåga.

Typ: `Number`<br />
Standard: `100`

### injectGlobals

Infogar WebdriverIOs globala variabler (t.ex. `browser`, `$` och `$$`) i den globala miljön.
Om du ställer in till `false`, bör du importera från `@wdio/globals`, t.ex.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Observera: WebdriverIO hanterar inte injektion av testramverksspecifika globala variabler.

Typ: `Boolean`<br />
Standard: `true`

### bail

Om du vill att din testkörning ska stoppa efter ett specifikt antal testmisslyckanden, använd `bail`.
(Det är som standard `0`, vilket kör alla tester oavsett vad.) **Observera:** Ett test i detta sammanhang är alla tester inom en enda specifikationsfil (när du använder Mocha eller Jasmine) eller alla steg inom en funktionsfil (när du använder Cucumber). Om du vill kontrollera bail-beteendet inom tester i en enda testfil, ta en titt på de tillgängliga [ramverksalternativen](frameworks).

Typ: `Number`<br />
Standard: `0` (avbryt inte; kör alla tester)

### specFileRetries

Antalet gånger att försöka köra en hel specifikationsfil när den misslyckas som helhet.

Typ: `Number`<br />
Standard: `0`

### specFileRetriesDelay

Fördröjning i sekunder mellan försöken att köra specifikationsfilen

Typ: `Number`<br />
Standard: `0`

### specFileRetriesDeferred

Huruvida omförsök för specifikationsfiler ska göras omedelbart eller skjutas upp till slutet av kön.

Typ: `Boolean`<br />
Standard: `true`

### groupLogsByTestSpec

Välj loggutdatavyn.

Om inställd på `false` skrivs loggar från olika testfiler ut i realtid. Observera att detta kan resultera i blandning av loggutdata från olika filer när du kör parallellt.

Om inställd på `true` grupperas loggutdata efter testspecifikation och skrivs ut först när testspecifikationen är klar.

Som standard är den inställd på `false` så loggar skrivs ut i realtid.

Typ: `Boolean`<br />
Standard: `false`

### services

Tjänster tar över en specifik uppgift som du inte vill ta hand om. De förbättrar din testuppsättning med nästan ingen ansträngning.

Typ: `String[]|Object[]`<br />
Standard: `[]`

### framework

Definierar det testramverk som ska användas av WDIO-testköraren.

Typ: `String`<br />
Standard: `mocha`<br />
Alternativ: `mocha` | `jasmine`

### mochaOpts, jasmineOpts och cucumberOpts

Specifika ramverksrelaterade alternativ. Se ramverksadapterdokumentationen för vilka alternativ som är tillgängliga. Läs mer om detta i [Ramverk](frameworks).

Typ: `Object`<br />
Standard: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Lista över cucumber-funktioner med radnummer (när [använda cucumber-ramverket](./Frameworks.md#using-cucumber)).

Typ: `String[]`
Standard: `[]`

### reporters

Lista över rapportörer att använda. En rapportör kan antingen vara en sträng eller en array av
`['reporterName', { /* reporter options */}]` där det första elementet är en sträng med rapportörens namn och det andra elementet ett objekt med rapportörsalternativ.

Typ: `String[]|Object[]`<br />
Standard: `[]`

Exempel:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

Bestämmer i vilket intervall rapportören ska kontrollera om de är synkroniserade om de rapporterar sina loggar asynkront (t.ex. om loggar strömmas till en tredjepartsleverantör).

Typ: `Number`<br />
Standard: `100` (ms)

### reporterSyncTimeout

Bestämmer den maximala tiden som rapportörer har på sig att slutföra uppladdningen av alla sina loggar innan ett fel kastas av testköraren.

Typ: `Number`<br />
Standard: `5000` (ms)

### execArgv

Node-argument att specificera när barnprocesser startas.

Typ: `String[]`<br />
Standard: `null`

### filesToWatch

En lista med glob-stödjande strängmönster som talar om för testköraren att den dessutom ska övervaka andra filer, t.ex. applikationsfiler, när den körs med flaggan `--watch`. Som standard övervakar testköraren redan alla specifikationsfiler.

Typ: `String[]`<br />
Standard: `[]`

### updateSnapshots

Ställ in till true om du vill uppdatera dina snapshots. Helst används som en del av en CLI-parameter, t.ex. `wdio run wdio.conf.js --s`.

Typ: `'new' | 'all' | 'none'`<br />
Standard: `none` om inte angiven och tester körs i CI, `new` om inte angiven, annars det som har angetts

### resolveSnapshotPath

Åsidosätter standard snapshot-sökväg. Till exempel, för att lagra snapshots bredvid testfiler.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Typ: `(testPath: string, snapExtension: string) => string`<br />
Standard: lagrar snapshot-filer i katalogen `__snapshots__` bredvid testfilen

### tsConfigPath

WDIO använder `tsx` för att kompilera TypeScript-filer. Din TSConfig upptäcks automatiskt från den aktuella arbetskatalogen men du kan ange en anpassad sökväg här eller genom att ställa in miljövariabeln TSX_TSCONFIG_PATH.

Se `tsx`-dokumentationen: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Typ: `String`<br />
Standard: `null`<br />

## Hooks

WDIO-testköraren låter dig ställa in krokar som utlöses vid specifika tidpunkter i testlivscykeln. Detta möjliggör anpassade åtgärder (t.ex. ta en skärmdump om ett test misslyckas).

Varje krok har som parameter specifik information om livscykeln (t.ex. information om testsviten eller testet). Läs mer om alla krokegenskaper i [vår exempelkonfiguration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Observera:** Vissa krokar (`onPrepare`, `onWorkerStart`, `onWorkerEnd` och `onComplete`) körs i en annan process och kan därför inte dela någon global data med de andra krokarna som finns i arbetarprocessen.

### onPrepare

Körs en gång innan alla arbetare startas.

Parametrar:

- `config` (`object`): WebdriverIO-konfigurationsobjekt
- `param` (`object[]`): lista med funktionsdetaljer

### onWorkerStart

Körs innan en arbetarprocess startas och kan användas för att initialisera specifika tjänster för den arbetaren samt modifiera körningsmiljöer på ett asynkront sätt.

Parametrar:

- `cid` (`string`): förmåge-id (t.ex. 0-0)
- `caps` (`object`): innehåller funktioner för sessionen som kommer att startas i arbetaren
- `specs` (`string[]`): specifikationer som ska köras i arbetarprocessen
- `args` (`object`): objekt som kommer att slås samman med huvudkonfigurationen när arbetaren är initierad
- `execArgv` (`string[]`): lista med strängargument som skickas till arbetarprocessen

### onWorkerEnd

Körs precis efter att en arbetarprocess har avslutats.

Parametrar:

- `cid` (`string`): förmåge-id (t.ex. 0-0)
- `exitCode` (`number`): 0 - framgång, 1 - misslyckande
- `specs` (`string[]`): specifikationer som ska köras i arbetarprocessen
- `retries` (`number`): antal specifikationsnivåförsök som används enligt definitionen i [_"Lägg till omförsök på en per-specifikationsfil-basis"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Körs precis innan WebDriver-sessionen och testramverket initieras. Det låter dig manipulera konfigurationer beroende på förmåga eller specifikation.

Parametrar:

- `config` (`object`): WebdriverIO-konfigurationsobjekt
- `caps` (`object`): innehåller funktioner för sessionen som kommer att startas i arbetaren
- `specs` (`string[]`): specifikationer som ska köras i arbetarprocessen

### before

Körs innan testutförandet börjar. Vid denna tidpunkt kan du komma åt alla globala variabler som `browser`. Det är den perfekta platsen att definiera anpassade kommandon.

Parametrar:

- `caps` (`object`): innehåller funktioner för sessionen som kommer att startas i arbetaren
- `specs` (`string[]`): specifikationer som ska köras i arbetarprocessen
- `browser` (`object`): instans av skapad webbläsare/enhetssession

### beforeSuite

Krok som körs innan sviten startar (endast i Mocha/Jasmine)

Parametrar:

- `suite` (`object`): svitdetaljer

### beforeHook

Krok som körs *före* en krok inom sviten startar (t.ex. körs före anrop till beforeEach i Mocha)

Parametrar:

- `test` (`object`): testdetaljer
- `context` (`object`): testkontext (representerar World-objekt i Cucumber)

### afterHook

Krok som körs *efter* att en krok inom sviten avslutas (t.ex. körs efter anrop till afterEach i Mocha)

Parametrar:

- `test` (`object`): testdetaljer
- `context` (`object`): testkontext (representerar World-objekt i Cucumber)
- `result` (`object`): krokresultat (innehåller egenskaperna `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funktion som ska köras före ett test (endast i Mocha/Jasmine).

Parametrar:

- `test` (`object`): testdetaljer
- `context` (`object`): scopeobjekt som testet utfördes med

### beforeCommand

Körs innan ett WebdriverIO-kommando utförs.

Parametrar:

- `commandName` (`string`): kommandonamn
- `args` (`*`): argument som kommandot skulle ta emot

### afterCommand

Körs efter att ett WebdriverIO-kommando har utförts.

Parametrar:

- `commandName` (`string`): kommandonamn
- `args` (`*`): argument som kommandot skulle ta emot
- `result` (`number`): 0 - kommandot lyckades, 1 - kommandofel
- `error` (`Error`): felobjekt om något

### afterTest

Funktion som ska köras efter att ett test (i Mocha/Jasmine) avslutas.

Parametrar:

- `test` (`object`): testdetaljer
- `context` (`object`): scopeobjekt som testet utfördes med
- `result.error` (`Error`): felobjekt om testet misslyckas, annars `undefined`
- `result.result` (`Any`): returvärde för testfunktionen
- `result.duration` (`Number`): testets varaktighet
- `result.passed` (`Boolean`): true om testet har passerat, annars false
- `result.retries` (`Object`): information om enskilda testrelaterade omförsök som definieras för [Mocha och Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) samt [Cucumber](./Retry.md#rerunning-in-cucumber), t.ex. `{ attempts: 0, limit: 0 }`, se
- `result` (`object`): krokresultat (innehåller egenskaperna `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Krok som körs efter att sviten har avslutats (endast i Mocha/Jasmine)

Parametrar:

- `suite` (`object`): svitdetaljer

### after

Körs efter att alla tester är klara. Du har fortfarande tillgång till alla globala variabler från testet.

Parametrar:

- `result` (`number`): 0 - testpasserat, 1 - testmisslyckades
- `caps` (`object`): innehåller funktioner för sessionen som kommer att startas i arbetaren
- `specs` (`string[]`): specifikationer som ska köras i arbetarprocessen

### afterSession

Körs direkt efter att WebDriver-sessionen avslutas.

Parametrar:

- `config` (`object`): WebdriverIO-konfigurationsobjekt
- `caps` (`object`): innehåller funktioner för sessionen som kommer att startas i arbetaren
- `specs` (`string[]`): specifikationer som ska köras i arbetarprocessen

### onComplete

Körs efter att alla arbetare har stängts ner och processen är på väg att avslutas. Ett fel som kastas i onComplete-kroken kommer att resultera i att testkörningen misslyckas.

Parametrar:

- `exitCode` (`number`): 0 - framgång, 1 - misslyckande
- `config` (`object`): WebdriverIO-konfigurationsobjekt
- `caps` (`object`): innehåller funktioner för sessionen som kommer att startas i arbetaren
- `result` (`object`): resultatobjekt som innehåller testresultat

### onReload

Körs när en uppdatering sker.

Parametrar:

- `oldSessionId` (`string`): sessions-ID för den gamla sessionen
- `newSessionId` (`string`): sessions-ID för den nya sessionen

### beforeFeature

Körs före en Cucumber-feature.

Parametrar:

- `uri` (`string`): sökväg till featurefilen
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber-featureobjekt

### afterFeature

Körs efter en Cucumber-feature.

Parametrar:

- `uri` (`string`): sökväg till featurefilen
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber-featureobjekt

### beforeScenario

Körs före ett Cucumber-scenario.

Parametrar:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): världsobjekt som innehåller information om pickle och teststeg
- `context` (`object`): Cucumber World-objekt

### afterScenario

Körs efter ett Cucumber-scenario.

Parametrar:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): världsobjekt som innehåller information om pickle och teststeg
- `result` (`object`): resultatobjekt som innehåller scenarioresultat
- `result.passed` (`boolean`): true om scenariot har passerat
- `result.error` (`string`): felstack om scenariot misslyckades
- `result.duration` (`number`): scenariots varaktighet i millisekunder
- `context` (`object`): Cucumber World-objekt

### beforeStep

Körs före ett Cucumber-steg.

Parametrar:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-stegobjekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-scenarioobjekt
- `context` (`object`): Cucumber World-objekt

### afterStep

Körs efter ett Cucumber-steg.

Parametrar:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-stegobjekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-scenarioobjekt
- `result`: (`object`): resultatobjekt som innehåller stegresultat
- `result.passed` (`boolean`): true om scenariot har passerat
- `result.error` (`string`): felstack om scenariot misslyckades
- `result.duration` (`number`): scenariots varaktighet i millisekunder
- `context` (`object`): Cucumber World-objekt

### beforeAssertion

Krok som körs innan en WebdriverIO-bekräftelse sker.

Parametrar:

- `params`: bekräftelseinformation
- `params.matcherName` (`string`): namn på matcharen (t.ex. `toHaveTitle`)
- `params.expectedValue`: värde som skickas in i matcharen
- `params.options`: bekräftelsealternativ

### afterAssertion

Krok som körs efter att en WebdriverIO-bekräftelse har skett.

Parametrar:

- `params`: bekräftelseinformation
- `params.matcherName` (`string`): namn på matcharen (t.ex. `toHaveTitle`)
- `params.expectedValue`: värde som skickas in i matcharen
- `params.options`: bekräftelsealternativ
- `params.result`: bekräftelseresultat