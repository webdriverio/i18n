---
id: configuration
title: Konfiguration
description: "Slå upp alla konfigurationsalternativ för WebDriver, fristående WebdriverIO och WDIO-testrunnern, inklusive alla testrunner-hooks."
---

Beroende på [installationstypen](/docs/setuptypes) (t.ex. om du använder de råa protokollbindningarna, WebdriverIO som fristående paket eller WDIO-testrunnern) finns det olika uppsättningar alternativ för att styra miljön.

## WebDriver-alternativ

Följande alternativ definieras när du använder protokollpaketet [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

<Option type="String" default="http">

Protokoll som ska användas vid kommunikation med drivrutinsservern.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Värd för din drivrutinsserver.

</Option>

### port

<Option type="Number" default="undefined">

Porten som din drivrutinsserver körs på.

</Option>

### path

<Option type="String" default="/">

Sökväg till drivrutinsserverns endpoint.

</Option>

### queryParams

<Option type="Object" default="undefined">

Frågeparametrar som skickas vidare till drivrutinsservern.

</Option>

### user

<Option type="String" default="undefined">

Ditt användarnamn för molntjänsten (fungerar endast för konton hos [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) eller [TestMu AI](https://www.testmuai.com/)). Om det är angivet kommer WebdriverIO automatiskt att ställa in anslutningsalternativ åt dig. Om du inte använder en molnleverantör kan detta användas för att autentisera mot vilken annan WebDriver-backend som helst.

</Option>

### key

<Option type="String" default="undefined">

Din åtkomstnyckel eller hemliga nyckel för molntjänsten (fungerar endast för konton hos [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) eller [TestMu AI](https://www.testmuai.com/)). Om den är angiven kommer WebdriverIO automatiskt att ställa in anslutningsalternativ åt dig. Om du inte använder en molnleverantör kan detta användas för att autentisera mot vilken annan WebDriver-backend som helst.

</Option>

### capabilities

<Option type="Object" default="null">

Definierar de capabilities som du vill köra i din WebDriver-session. Se [WebDriver-protokollet](https://w3c.github.io/webdriver/#capabilities) för mer information.

Utöver de WebDriver-baserade capabilities kan du ange webbläsar- och leverantörsspecifika alternativ som möjliggör en djupare konfiguration av fjärrwebbläsaren eller enheten. Dessa finns dokumenterade i respektive leverantörs dokumentation, t.ex.:

- `goog:chromeOptions`: för [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: för [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: för [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: för [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: för [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: för [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Ett användbart verktyg är dessutom Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/), som hjälper dig att skapa detta objekt genom att klicka ihop dina önskade capabilities.

</Option>
**Exempel:**

```js
{
    browserName: 'chrome', // alternativ: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // webbläsarversion
    platformName: 'Windows 10' // OS-plattform
}
```

Om du kör webb- eller native-tester på mobila enheter skiljer sig `capabilities` från WebDriver-protokollet. Se [Appium-dokumentationen](https://appium.io/docs/en/latest/guides/caps/) för mer information.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Nivå för loggningens detaljrikedom.

</Option>

### outputDir

<Option type="String" default="null">

Katalog där alla loggfiler från testrunnern lagras (inklusive reporterloggar och `wdio`-loggar). Om den inte anges strömmas alla loggar till `stdout`. Eftersom de flesta reporters är gjorda för att logga till `stdout` rekommenderas det att endast använda detta alternativ för specifika reporters där det är mer rimligt att skriva rapporten till en fil (som till exempel `junit`-reportern).

När WebdriverIO körs i fristående läge är den enda logg som genereras `wdio`-loggen.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

Timeout för alla WebDriver-förfrågningar till en drivrutin eller ett grid.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Maximalt antal nya försök för förfrågningar till Selenium-servern.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

Timeout (i ms) för att ett WebDriver Bidi-kommando ska få ett svar från webbläsaren. Öka detta om du kör kommandon, t.ex. [`execute`](/docs/api/browser/execute), som av legitima skäl tar längre tid än standardvärdet att slutföras, annars slutar WebdriverIO att vänta innan webbläsaren är klar.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Gör det möjligt att använda en anpassad` http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) för att göra förfrågningar.

</Option>

### headers

<Option type="Object" default={`{}`}>

Ange anpassade `headers` som ska skickas med i varje WebDriver-förfrågan. Om ditt Selenium Grid kräver Basic Authentication rekommenderar vi att du skickar med en `Authorization`-header via detta alternativ för att autentisera dina WebDriver-förfrågningar, t.ex.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Läs användarnamn och lösenord från miljövariabler
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Kombinera användarnamn och lösenord med ett kolon som avgränsare
const credentials = `${username}:${password}`;
// Koda inloggningsuppgifterna med Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

Funktion som fångar upp [HTTP-förfrågningsalternativ](https://github.com/sindresorhus/got#options) innan en WebDriver-förfrågan görs

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

Funktion som fångar upp HTTP-svarsobjekt efter att ett WebDriver-svar har anlänt. Funktionen får det ursprungliga svarsobjektet som första argument och motsvarande `RequestOptions` som andra argument.

</Option>

### strictSSL

<Option type="Boolean" default="true">

Huruvida SSL-certifikatet inte behöver vara giltigt.
Det kan anges via miljövariablerna `STRICT_SSL` eller `strict_ssl`.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

Huruvida [Appiums funktion för direktanslutning](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) ska aktiveras.
Det gör ingenting om svaret inte innehöll rätt nycklar medan flaggan är aktiverad.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Sökvägen till roten av cachekatalogen. Denna katalog används för att lagra alla drivrutiner som laddas ner när man försöker starta en session.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

För säkrare loggning kan reguljära uttryck som anges med `maskingPatterns` dölja känslig information i loggen.
 - Strängformatet är ett reguljärt uttryck med eller utan flaggor (t.ex. `/.../i`) och kommaseparerat för flera reguljära uttryck.
 - För mer information om maskeringsmönster, se [avsnittet Masking Patterns i WDIO Logger README](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**Exempel:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

Följande alternativ (inklusive de som listas ovan) kan användas med WebdriverIO i fristående läge:

### automationProtocol

<Option type="String" default="webdriver">

Definiera vilket protokoll du vill använda för din webbläsarautomatisering. För närvarande stöds endast [`webdriver`](https://www.npmjs.com/package/webdriver), eftersom det är den huvudsakliga webbläsarautomatiseringstekniken som WebdriverIO använder.

Om du vill automatisera webbläsaren med en annan automatiseringsteknik, se till att du sätter denna egenskap till en sökväg som pekar på en modul som följer följande gränssnitt:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Starta en automatiseringssession och returnera en WebdriverIO-[monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * med respektive automatiseringskommandon. Se paketet [webdriver](https://www.npmjs.com/package/webdriver)
     * som en referensimplementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO-alternativ
     * @param {Function} hook som gör det möjligt att modifiera klienten innan den släpps från funktionen
     * @param {PropertyDescriptorMap} userPrototype låter användaren lägga till anpassade protokollkommandon
     * @param {Function} customCommandWrapper gör det möjligt att modifiera kommandots exekvering
     * @returns en WebdriverIO-kompatibel klientinstans
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * låter användaren ansluta till befintliga sessioner
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Ändrar instansens sessions-id och webbläsarens capabilities för den nya sessionen
     * direkt i det inskickade webbläsarobjektet
     *
     * @optional
     * @param   {object} instance  objektet vi får från en ny webbläsarsession.
     * @returns {string}           webbläsarens nya sessions-id
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

Förkorta anrop till `url`-kommandot genom att ange en bas-URL.
- Om din `url`-parameter börjar med `/` läggs `baseUrl` till i början (förutom `baseUrl`-sökvägen, om den har en).
- Om din `url`-parameter börjar utan ett schema eller `/` (som `some/path`) läggs hela `baseUrl` till direkt i början.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Standard-timeout för alla `waitFor*`-kommandon. (Observera det gemena `f` i alternativets namn.) Denna timeout påverkar __endast__ kommandon som börjar med `waitFor*` och deras standardväntetid.

För att öka timeouten för ett _test_, se ramverkets dokumentation.

</Option>

### waitforInterval

<Option type="Number" default="100">

Standardintervall för alla `waitFor*`-kommandon för att kontrollera om ett förväntat tillstånd (t.ex. synlighet) har ändrats.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Gör att kommandot [`$`](/docs/api/browser/$) kastar ett `StrictSelectorError` när den angivna selektorn matchar mer än ett element, istället för att i tysthet använda den första träffen. `$$` påverkas inte.

Du kan välja bort detta för en enskild fråga genom att skicka `{ strict: false }` som andra argument, t.ex. `$('button', { strict: false })`.

Se guiden [Selektorer](/docs/selectors#strict-mode) för mer information.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Maximal storlek på svarskroppen (i byte) som kan returneras när kommandot [`mock`](/docs/api/browser/mock) används. Använd `0` för att inaktivera datainsamling av den övervakade nyttolasten.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Om du kör på Sauce Labs kan du välja att köra tester i olika datacenter.
Använd de korta regionbeteckningarna `us` (standard, motsvarar `us-west-1`) eller `eu` (motsvarar `eu-central-1`), eller de fullständiga regionnamnen direkt.

__Obs:__ Detta har endast effekt om du anger alternativen `user` och `key` som är kopplade till ditt Sauce Labs-konto.

</Option>
*(endast för vm och/eller em/simulatorer, förutom `us-east-4` och `asia-south-2` som endast tillhandahåller riktiga enheter)*

## Testrunner-alternativ

Följande alternativ (inklusive de som listas ovan) är endast definierade för att köra WebdriverIO med WDIO-testrunnern:

### specs

<Option type="(String | String[])[]" default="[]">

Definiera specs för testkörning. Du kan antingen ange ett glob-mönster för att matcha flera filer på en gång, eller omsluta ett glob-mönster eller en uppsättning sökvägar i en array för att köra dem inom en enda worker-process. Alla sökvägar betraktas som relativa till konfigurationsfilens sökväg.

</Option>

### exclude

<Option type="String[]" default="[]">

Exkludera specs från testkörning. Alla sökvägar betraktas som relativa till konfigurationsfilens sökväg.

</Option>

### suites

<Option type="Object" default={`{}`}>

Ett objekt som beskriver olika sviter, som du sedan kan ange med alternativet `--suite` i `wdio`-CLI:t.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

Samma som avsnittet `capabilities` som beskrivs ovan, men med möjligheten att ange antingen ett [multiremote](/docs/multiremote)-objekt eller flera WebDriver-sessioner i en array för parallell körning.

Du kan använda samma leverantörs- och webbläsarspecifika capabilities som definieras [ovan](/docs/configuration#capabilities).

</Option>

### maxInstances

<Option type="Number" default="100">

Maximalt totalt antal parallellt körande workers.

__Obs:__ att det kan vara ett så högt tal som `100` när testerna utförs hos externa leverantörer, till exempel på Sauce Labs maskiner. Där testas inte testerna på en enda maskin, utan snarare på flera virtuella maskiner. Om testerna ska köras på en lokal utvecklingsmaskin, använd ett mer rimligt tal, såsom `3`, `4` eller `5`. I grund och botten är detta antalet webbläsare som kommer att startas samtidigt och köra dina tester parallellt, så det beror på hur mycket RAM-minne din maskin har och hur många andra appar som körs på din maskin.

Du kan också ange `maxInstances` i dina capability-objekt med hjälp av capabilityn `wdio:maxInstances`. Detta begränsar antalet parallella sessioner för just den capabilityn.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Maximalt totalt antal parallellt körande workers per capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Lägger in WebdriverIO:s globala variabler (t.ex. `browser`, `$` och `$$`) i den globala miljön.
Om du sätter det till `false` bör du importera från `@wdio/globals`, t.ex.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Obs: WebdriverIO hanterar inte injicering av globala variabler som är specifika för testramverk.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Om du vill att din testkörning ska avbrytas efter ett visst antal misslyckade tester, använd `bail`.
(Standardvärdet är `0`, vilket kör alla tester oavsett vad.) **Obs:** Ett test i detta sammanhang är alla tester inom en enskild spec-fil (vid användning av Mocha eller Jasmine) eller alla steg inom en feature-fil (vid användning av Cucumber). Om du vill styra bail-beteendet inom tester i en enskild testfil, ta en titt på de tillgängliga alternativen för [ramverk](frameworks).

</Option>

### specFileRetries

<Option type="Number" default="0">

Antalet gånger en hel spec-fil ska köras om när den misslyckas som helhet.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Fördröjning i sekunder mellan försöken att köra om spec-filen

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Huruvida spec-filer som körs om ska köras om omedelbart eller skjutas upp till slutet av kön.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Välj vy för loggutdata.

Om det är satt till `false` skrivs loggar från olika testfiler ut i realtid. Observera att detta kan leda till att loggutdata från olika filer blandas när tester körs parallellt.

Om det är satt till `true` grupperas loggutdata per test-spec och skrivs ut först när test-specen är klar.

Som standard är det satt till `false` så att loggar skrivs ut i realtid.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Styr om WebdriverIO automatiskt kontrollerar alla soft assertions i slutet av varje test. När det är satt till `true` kontrolleras alla ackumulerade soft assertions automatiskt och gör att testet misslyckas om någon assertion misslyckades. När det är satt till `false` måste du manuellt anropa assert-metoden för att kontrollera soft assertions.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Services tar över en specifik uppgift som du inte vill hantera själv. De förbättrar din testuppsättning nästan utan ansträngning.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Definierar testramverket som ska användas av WDIO-testrunnern.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Specifika ramverksrelaterade alternativ. Se dokumentationen för ramverksadaptern för vilka alternativ som finns tillgängliga. Läs mer om detta under [Ramverk](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Lista över cucumber-features med radnummer (när [cucumber-ramverket används](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Lista över reporters som ska användas. En reporter kan vara antingen en sträng eller en array av
`['reporterName', { /* reporter options */}]` där det första elementet är en sträng med reporterns namn och det andra elementet ett objekt med reporteralternativ.

</Option>
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

<Option type="Number" default="100 (ms)">

Bestämmer med vilket intervall reporters ska kontrollera om de är synkroniserade, om de rapporterar sina loggar asynkront (t.ex. om loggar strömmas till en tredjepartsleverantör).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Bestämmer den maximala tid som reporters har på sig att slutföra uppladdningen av alla sina loggar innan ett fel kastas av testrunnern.

</Option>

### execArgv

<Option type="String[]" default="null">

Node-argument som ska anges när barnprocesser startas.

</Option>

### cpuProf

<Option type="Boolean" default="false">

Aktivera CPU-profilering för worker-processen. Profilen genereras automatiskt när worker-processen avslutas.

</Option>

### heapProf

<Option type="Boolean" default="false">

Aktivera heap-profilering för worker-processen. Ögonblicksbilden genereras automatiskt när worker-processen avslutas (använder sampling heap profiler).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

Katalog där CPU-profilerna (`.cpuprofile`) och heap-profilerna (`.heapprofile`) sparas.

</Option>

### filesToWatch

<Option type="String[]" default="[]">

En lista med strängmönster med stöd för glob som talar om för testrunnern att även bevaka andra filer, t.ex. applikationsfiler, när den körs med flaggan `--watch`. Som standard bevakar testrunnern redan alla spec-filer.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

Sätt till true om du vill uppdatera dina snapshots. Används helst som en del av en CLI-parameter, t.ex. `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

Åsidosätter standardsökvägen för snapshots. Till exempel för att lagra snapshots bredvid testfilerna.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO använder `tsx` för att kompilera TypeScript-filer. Din TSConfig identifieras automatiskt från den aktuella arbetskatalogen, men du kan ange en anpassad sökväg här eller genom att sätta miljövariabeln TSX_TSCONFIG_PATH.

Se `tsx`-dokumentationen: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Starta en virtuell skärm för körningen på Linux när varken `DISPLAY` eller `WAYLAND_DISPLAY` är satt. Sätt till `false` när du kör headless eller enbart på en molntjänst eller ett fjärr-grid. Det styr endast om en skärmserver startas: om endast `WAYLAND_DISPLAY` är satt sätter testrunnern ändå `XDG_SESSION_TYPE`, `GDK_BACKEND` och `ELECTRON_OZONE_PLATFORM_HINT` till `wayland` för körningen. Se [Headless & skärmservrar](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Vilken skärmserver som ska startas. `auto` försöker med Weston och faller tillbaka på Xvfb när Weston saknas eller inte lyckas starta. `wayland` och `xvfb` försöker endast med respektive server.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Installera en saknad skärmserver med systemets pakethanterare när ingen installerad server startar.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Hur den inbyggda installationen körs: `root` installerar endast vid körning som root, `sudo` använder icke-interaktivt `sudo -n` när processen inte körs som root, eller installerar utan det när `sudo` inte är installerat.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Ett kommando som körs istället för den inbyggda installationen, oförändrat och utan `sudo`. Det körs endast med `displayServerAutoInstall: true`. En sträng körs i ett skal, en array körs utan skal. Med `auto` körs det först för Weston, och igen för Xvfb endast om Weston fortfarande inte är tillgängligt eller inte lyckas starta, och Xvfb fortfarande saknas. Sätt `displayServer` till den server som kommandot installerar för att hoppa över försöket med den andra servern.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

Skärmbredd för den virtuella skärmen i pixlar.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

Skärmhöjd för den virtuella skärmen i pixlar.

</Option>

### displayServerDepth

<Option type="Number" default="24">

Färgdjup för den virtuella skärmen. Endast Xvfb.

</Option>

## Hooks

WDIO-testrunnern låter dig ange hooks som utlöses vid specifika tidpunkter i testets livscykel. Detta möjliggör anpassade åtgärder (t.ex. att ta en skärmdump om ett test misslyckas).

Varje hook har som parameter specifik information om livscykeln (t.ex. information om testsviten eller testet). Läs mer om alla hook-egenskaper i [vår exempelkonfiguration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Obs:** Vissa hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` och `onComplete`) körs i en annan process och kan därför inte dela någon global data med de andra hooks som lever i worker-processen.

### onPrepare

Körs en gång innan alla workers startas.

Parametrar:

- `config` (`object`): WebdriverIO-konfigurationsobjekt
- `param` (`object[]`): lista med detaljer om capabilities

### onWorkerStart

Körs innan en worker-process startas och kan användas för att initiera en specifik service för den workern samt för att modifiera körmiljöer asynkront.

Parametrar:

- `cid` (`string`): capability-id (t.ex. 0-0)
- `caps` (`object`): innehåller capabilities för sessionen som kommer att startas i workern
- `specs` (`string[]`): specs som ska köras i worker-processen
- `args` (`object`): objekt som kommer att slås samman med huvudkonfigurationen när workern har initierats
- `execArgv` (`string[]`): lista med strängargument som skickas till worker-processen

### onWorkerEnd

Körs direkt efter att en worker-process har avslutats.

Parametrar:

- `cid` (`string`): capability-id (t.ex. 0-0)
- `exitCode` (`number`): 0 - lyckades, 1 - misslyckades. En worker som avslutades av en signal rapporterar istället `128` + signalnumret, t.ex. `139` för en `SIGSEGV`
- `specs` (`string[]`): specs som ska köras i worker-processen
- `retries` (`number`): antal omkörningar på spec-nivå som använts enligt definitionen i [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis)
- `signal` (`string`): signal som avslutade workern, t.ex. `SIGSEGV`, eller `null` om den avslutades av sig själv

### beforeSession

Körs precis innan webdriver-sessionen och testramverket initieras. Den låter dig manipulera konfigurationer beroende på capability eller spec.

Parametrar:

- `config` (`object`): WebdriverIO-konfigurationsobjekt
- `caps` (`object`): innehåller capabilities för sessionen som kommer att startas i workern
- `specs` (`string[]`): specs som ska köras i worker-processen

### before

Körs innan testkörningen börjar. Vid denna tidpunkt har du tillgång till alla globala variabler som `browser`. Det är det perfekta stället att definiera anpassade kommandon.

Parametrar:

- `caps` (`object`): innehåller capabilities för sessionen som kommer att startas i workern
- `specs` (`string[]`): specs som ska köras i worker-processen
- `browser` (`object`): instans av den skapade webbläsar-/enhetssessionen

### beforeSuite

Hook som körs innan sviten startar (endast i Mocha/Jasmine)

Parametrar:

- `suite` (`object`): detaljer om sviten

### beforeHook

Hook som körs *innan* en hook inom sviten startar (t.ex. körs innan beforeEach anropas i Mocha)

Parametrar:

- `test` (`object`): detaljer om testet
- `context` (`object`): testkontext (representerar World-objektet i Cucumber)

### afterHook

Hook som körs *efter* att en hook inom sviten avslutats (t.ex. körs efter att afterEach anropats i Mocha)

Parametrar:

- `test` (`object`): detaljer om testet
- `context` (`object`): testkontext (representerar World-objektet i Cucumber)
- `result` (`object`): hookens resultat (innehåller egenskaperna `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funktion som körs före ett test (endast i Mocha/Jasmine).

Parametrar:

- `test` (`object`): detaljer om testet
- `context` (`object`): scope-objekt som testet kördes med

### beforeCommand

Körs innan ett WebdriverIO-kommando exekveras.

Parametrar:

- `commandName` (`string`): kommandots namn
- `args` (`*`): argument som kommandot skulle ta emot

### afterCommand

Körs efter att ett WebdriverIO-kommando har exekverats.

Parametrar:

- `commandName` (`string`): kommandots namn
- `args` (`*`): argument som kommandot skulle ta emot
- `result` (`*`): kommandots resultat
- `error` (`Error`): felobjekt, om något

### afterTest

Funktion som körs efter att ett test (i Mocha/Jasmine) avslutats.

Parametrar:

- `test` (`object`): detaljer om testet
- `context` (`object`): scope-objekt som testet kördes med
- `result.error` (`Error`): felobjekt om testet misslyckas, annars `undefined`
- `result.result` (`Any`): returobjekt från testfunktionen
- `result.duration` (`Number`): testets varaktighet
- `result.passed` (`Boolean`): true om testet har passerat, annars false
- `result.retries` (`Object`): information om omkörningar för enskilda tester enligt definitionen för [Mocha och Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) samt [Cucumber](./Retry.md#rerunning-in-cucumber), t.ex. `{ attempts: 0, limit: 0 }`, se
- `result` (`object`): hookens resultat (innehåller egenskaperna `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook som körs efter att sviten har avslutats (endast i Mocha/Jasmine)

Parametrar:

- `suite` (`object`): detaljer om sviten

### after

Körs efter att alla tester är klara. Du har fortfarande tillgång till alla globala variabler från testet.

Parametrar:

- `result` (`number`): 0 - testet passerade, 1 - testet misslyckades
- `caps` (`object`): innehåller capabilities för sessionen som kommer att startas i workern
- `specs` (`string[]`): specs som ska köras i worker-processen

### afterSession

Körs direkt efter att webdriver-sessionen har avslutats.

Parametrar:

- `config` (`object`): WebdriverIO-konfigurationsobjekt
- `caps` (`object`): innehåller capabilities för sessionen som kommer att startas i workern
- `specs` (`string[]`): specs som ska köras i worker-processen

### onComplete

Körs efter att alla workers har stängts ner och processen är på väg att avslutas. Ett fel som kastas i onComplete-hooken leder till att testkörningen misslyckas.

Parametrar:

- `exitCode` (`number`): 0 - lyckades, 1 - misslyckades
- `config` (`object`): WebdriverIO-konfigurationsobjekt
- `caps` (`object`): innehåller capabilities för sessionen som kommer att startas i workern
- `result` (`object`): resultatobjekt som innehåller testresultat

### onReload

Körs när en uppdatering sker.

Parametrar:

- `oldSessionId` (`string`): sessions-id för den gamla sessionen
- `newSessionId` (`string`): sessions-id för den nya sessionen

### beforeFeature

Körs före en Cucumber-feature.

Parametrar:

- `uri` (`string`): sökväg till feature-filen
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber-featureobjekt

### afterFeature

Körs efter en Cucumber-feature.

Parametrar:

- `uri` (`string`): sökväg till feature-filen
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber-featureobjekt

### beforeScenario

Körs före ett Cucumber-scenario.

Parametrar:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): world-objekt som innehåller information om pickle och teststeg
- `context` (`object`): Cucumber World-objekt

### afterScenario

Körs efter ett Cucumber-scenario.

Parametrar:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): world-objekt som innehåller information om pickle och teststeg
- `result` (`object`): resultatobjekt som innehåller scenariots resultat
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
- `result`: (`object`): resultatobjekt som innehåller stegets resultat
- `result.passed` (`boolean`): true om scenariot har passerat
- `result.error` (`string`): felstack om scenariot misslyckades
- `result.duration` (`number`): scenariots varaktighet i millisekunder
- `context` (`object`): Cucumber World-objekt

### beforeAssertion

Hook som körs innan en WebdriverIO-assertion sker.

Parametrar:

- `params`: information om assertionen
- `params.matcherName` (`string`): namnet på den matcher som testet anropade (t.ex. `toHaveTitle`). För ett alias är det aliasets namn (t.ex. `toBeExisting`, inte `toExist`).
- `params.expectedValue`: värde som skickas till matchern
- `params.options`: alternativ för assertionen

### afterAssertion

Hook som körs efter att en WebdriverIO-assertion har skett.

Parametrar:

- `params`: information om assertionen
- `params.matcherName` (`string`): namnet på den matcher som testet anropade (t.ex. `toHaveTitle`). För ett alias är det aliasets namn (t.ex. `toBeExisting`, inte `toExist`).
- `params.expectedValue`: värde som skickas till matchern
- `params.options`: alternativ för assertionen
- `params.result` (`object`): matcherns resultat, med `pass` (`boolean`) och `message()`. `pass` är `true` när värdet matchar det förväntade värdet, även med `.not`: med `.not` passerar assertionen när `pass` är `false`.