---
id: selenium
title: Selenium DevTools
description: "Lägg till felsökningsgränssnittet DevTools i Selenium WebDriver-tester i Node.js eller Python med valfri testkörare, och aktivera trace-läge."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Selenium WebDriver-adapter för [WebdriverIO DevTools](https://github.com/webdriverio/devtools) – ger samma visuella felsökningsgränssnitt till alla Selenium-tester, i **Node.js** eller **Python**, oavsett testkörare.

Node.js fungerar med **Mocha**, **Jest**, **Cucumber** eller ett vanligt skript – pluginet identifierar testköraren automatiskt och kopplar in testgränserna därefter. Python fungerar med **pytest** eller ett vanligt skript, och under pytest krävs inga ändringar alls i dina testfiler.

Välj ditt språk i flikarna nedan; valet följer med dig nedåt på sidan.

## Installation

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Kräver Python 3.10+ och `selenium>=4.44`.** Båda deklareras i paketets metadata, så pip upprätthåller dem i stället för att låta dig upptäcka en tom Network-flik vid körning. Nätverksinsamlingen prenumererar via det publika BiDi-händelse-API som selenium genererade om i 4.44; den privata anslutning det ersatte togs bort i samma version, och det är 4.44 som sätter golvet för Python.

</TabItem>
</Tabs>

## Konfiguration

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Varje block nedan är ett **komplett exempel som är redo att kopiera och klistra in**, inklusive anropet `DevTools.configure(...)`. Välj den testkörare du använder, lägg in kodsnutten i ditt projekt och kör den.

### Mocha

```js
// tests/example.test.js
import { strict as assert } from 'node:assert'
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com and reads the heading', async function () {
    await driver.get('https://example.com')
    const heading = await driver.wait(until.elementLocated(By.css('h1')), 10000)
    assert.equal(await heading.getText(), 'Example Domain')
  })
})
```

Kör det:

```bash
mocha --timeout 60000 tests/example.test.js
```

> Alternativ: hoppa över importen i varje fil och använd `mocha --require @wdio/selenium-devtools` för att ladda pluginet en gång för hela körningen.

### Jest

```js
// test/example.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('login flow', () => {
  let driver

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  }, 60000)

  afterEach(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  test('logs in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login')
    await driver.findElement(By.id('username')).sendKeys('tomsmith')
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!')
    await driver.findElement(By.css('button[type="submit"]')).click()

    await driver.wait(until.urlContains('/secure'), 10000)
    const flash = await driver.findElement(By.id('flash'))
    expect(await flash.getText()).toMatch(/You logged into a secure area/i)
  }, 60000)
})
```

`jest.config.json`:

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

Kör det (ESM kräver den experimentella flaggan):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

Cucumbers uppdelade struktur innebär tre små filer – en för att ladda pluginet, en för World/hooks och en för stegdefinitioner.

`features/support/setup.js` – ladda pluginet och konfigurera en gång:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` – driverns livscykel:

```js
import {
  setWorldConstructor,
  World,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'

setDefaultTimeout(60000)

class CustomWorld extends World {
  constructor (options) {
    super(options)
    this.driver = null
  }
}

setWorldConstructor(CustomWorld)

Before(async function () {
  this.driver = await new Builder().forBrowser('chrome').build()
})

After(async function () {
  if (this.driver) {
    await this.driver.quit()
    this.driver = null
  }
})
```

`cucumber.json` – koppla in setup-filen **först** så att pluginet patchar Selenium innan något steg körs:

```json
{
  "default": {
    "import": [
      "features/support/setup.js",
      "features/support/world.js",
      "features/support/steps.js"
    ],
    "paths": ["features/*.feature"],
    "format": ["progress"]
  }
}
```

Kör det:

```bash
cucumber-js --config cucumber.json
```

### Vanligt Node-skript (ingen testkörare)

Om du kör `node tests/google.test.js` direkt finns det ingen testkörare som pluginet automatiskt kan haka in i. Som standard får du en enda rad "Selenium Session" i dashboarden. För att få en namngiven testgräns anropar du `DevTools.startTest` / `endTest` runt ditt arbete:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // valfritt – namnger testraden

  const driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.google.com')
    const searchBox = await driver.findElement(By.name('q'))
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.ENTER)
    await driver.wait(until.titleContains('Selenium'), 10000)
    DevTools.endTest('passed')
  } catch (err) {
    DevTools.endTest('failed')
    throw err
  } finally {
    await driver.quit()
  }
}

run()
```

```bash
node tests/google.test.js
```

> Använd endast `startTest` / `endTest` för vanliga Node-skript. Under Mocha / Jest / Cucumber vet pluginet redan när varje test startar och slutar – att anropa dessa manuellt skulle skapa dubbletter av rader.

</TabItem>
<TabItem value="python" label="Python">

### pytest

Ingenting behöver läggas i dina testfiler – pluginet upptäcks automatiskt, och en flagga slår på det för körningen:

```bash
pytest --devtools tests/              # live-dashboard
pytest --devtools-trace tests/        # skriv ett trace-arkiv i stället (innebär --devtools)
```

Eller checka in valet, så att ingen behöver komma ihåg flaggan:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # trace-arkiv i stället för en dashboard
# devtools_trace_granularity = "test"            # ... ett arkiv per test
# devtools_trace_policy = "retain-on-failure"    # ... behåll endast det som misslyckades
```

En `pytest.ini` med en `[pytest]`-sektion tar samma nycklar. De två trace-inställningarna beskrivs under [Hur många arkiv, och vilka som ska behållas](#how-many-archives-and-which-ones-to-keep).

Insamling är alltid opt-in – att installera paketet får aldrig ändra hur en befintlig svit beter sig. Det enda som skiljer är *hur* du säger ja:

| Hur du väljer att delta | Omfattning |
|---|---|
| `--devtools` / `--devtools-trace` | denna körning |
| `devtools` / `devtools_trace` i `[tool.pytest.ini_options]` | detta projekt |
| `DEVTOOLS_ENABLE=1` (eller `DEVTOOLS_PORT=<n>`, som också ansluter till en dashboard som redan körs) | detta skal – för CI |

Högst vinner: CLI, sedan ini, sedan miljön. `pytest -o devtools=false` stänger av ett projektstandardvärde för en enskild körning, vilket är anledningen till att det inte finns någon `--no-devtools`. `DEVTOOLS_TRACE=1` väljer trace-läge men slår **inte** på insamlingen av sig självt, så att exportera den för dina egna skript fångar aldrig en pytest-körning du inte bad om.

I live-läge öppnas dashboarden i ett dedikerat webbläsarfönster och **förblir öppen efter körningen** så att du kan granska vad som hände; stäng den (eller tryck `Ctrl-C`) för att avsluta. Två typer av körningar förblir oinsamlade även när du valt att delta: `--collect-only`, där ingenting körs, och en körning som inte samlade in några tester – en felstavad sökväg skulle annars parkera din terminal på en tom dashboard.

### Vanligt Python-skript (ingen testkörare)

Två rader runt din befintliga Selenium-kod:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # öppna dashboarden, fånga varje kommando
# devtools.enable(trace=True)         # eller: skriv en trace.zip och öppna inget fönster

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # håll gränssnittet uppe för granskning (no-op när inget fönster är öppet)
devtools.disable()
```

Om backenden inte kan startas eller nås loggar `enable()` en varning och returnerar `None`. Insamlingen hoppas över och dina tester körs ändå – en saknad dashboard får aldrig en svit att misslyckas.

### Parallella körningar (`pytest -n`)

**pytest-xdist fungerar utan extra konfiguration.** Alla processer som rapporterar till en körning måste vara överens om ett körnings-id, annars behandlar backenden varje anslutning som en ny körning och raderar det den föregående samlade in. Med xdist är de överens: pluginet laddas även i **controllern**, och när insamlingen aktiveras där bestäms id:t innan xdist startar någon worker – workers är barnprocesser, så de ärver det.

Det som verkligen blir separata körningar: två oberoende `pytest`-anrop, eller en worker som startats utan miljön. Exportera `DEVTOOLS_RUN_ID` själv för att föra samman sådana processer till en körning.

</TabItem>
</Tabs>

## Konfigurationsalternativ {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Alternativ | Typ | Standard | Beskrivning |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Port för DevTools-backendservern. Räknas upp automatiskt om den redan används. |
| `hostname` | `string` | `'localhost'` | Värdnamn som backendservern binder till. |
| `openUi` | `boolean` | `true` | Öppna DevTools-gränssnittet automatiskt i ett nytt Chrome-fönster. Sätt till `false` för CI. |
| `captureScreenshots` | `boolean` | `true` | Ta en skärmbild efter varje WebDriver-kommando. |
| `headless` | `boolean` | `false` | Kör **test**-webbläsaren headless (injicerar `--headless=old`). DevTools-gränssnittets fönster påverkas inte. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | `.webm`-videoinspelning per session. Alternativen motsvarar sidan [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Kommandomall för omkörning per test. `{{testName}}` ersätts. Härleds automatiskt från testkörarens argv om det utelämnas. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` öppnar DevTools-gränssnittet; `trace` hoppar över det och skriver en portabel artefakt i stället. Se [Trace Mode](/docs/devtools/wdio/trace-mode). Åsidosätter `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Trace-artefaktens struktur. Gäller endast när `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | En trace per session / spec-fil / test. `'test'` skriver var och en till `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Gäller endast när `mode: 'trace'`. Se [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Vilka traces som ska behållas. Används tillsammans med `traceGranularity: 'test'`. Gäller endast när `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Spela in en tät, kontinuerlig screencast i trace-filen för bildruta-för-bildruta-bläddring i spelaren. Gäller endast när `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Trace-läge + `traceGranularity: 'test'`. Skärmbild per test, bifogad inline till Allure (`image/png`) via `allure-js-commons` när en Allure-köraradapter är aktiv. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Trace-läge + `traceGranularity: 'test'`. Screencast-video per test, behållen enligt angiven policy, bifogad inline till Allure (`video/webm`) via `allure-js-commons` när en Allure-köraradapter är aktiv. |
| `emitArtifactsManifest` | `boolean` | auto | Skriv manifestet `devtools-artifacts-<sessionId>.json` — det generiska index som reporters/CI läser för att hitta producerade artefakter — bredvid trace-filen. Avstängt som standard; **aktiveras automatiskt** när en `allure-js-commons`-runtime är aktiv. Endast trace-läge. |
| `captureAssertions` | `boolean` | `true` | Fånga `node:assert`-assertioner (både godkända och misslyckade) som åtgärdsrader i trace-filen. Sätt till `false` för att avstå. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **För CI**, sätt både `headless: true` (dölj testwebbläsaren) och `openUi: false` (försök inte öppna dashboard-fönstret – CI-miljöer har ingen skärm). Backenden fortsätter att köra på den konfigurerade porten så att du fortfarande kan öppna gränssnittet senare vid behov.

</TabItem>
<TabItem value="python" label="Python">

Det finns inget alternativobjekt – ingenting devtools-specifikt behöver förekomma i din testkod. Under pytest konfigurerar du adaptern på samma sätt som du konfigurerar pytest; ett skript skickar nyckelordsargument till `enable()`; allt som saknar flagga är en miljövariabel.

| pytest-flagga | `[tool.pytest.ini_options]` | Effekt |
|---|---|---|
| `--devtools` | `devtools = true` | Samla in denna körning och öppna dashboarden. |
| `--devtools-trace` | `devtools_trace = true` | Samla in denna körning och skriv ett trace-arkiv i stället för att öppna en dashboard. Innebär `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Ett arkiv för hela körningen (`session`, standard) eller ett per test. Innebär `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Vilka arkiv som är värda att behålla. Innebär `--devtools-trace`. Se [Hur många arkiv, och vilka som ska behållas](#how-many-archives-and-which-ones-to-keep). |

Högst vinner: CLI, sedan ini, sedan miljön nedan. `pytest -o devtools=false` stänger av ett projektstandardvärde för en körning, och `pytest -o devtools_trace_policy=on` gör detsamma för vilket som helst av de andra.

| Variabel | Effekt |
|---|---|
| `DEVTOOLS_ENABLE=1` | Slå på insamlingen, när ingen flagga eller ini-inställning redan gjort det. |
| `DEVTOOLS_PORT=<n>` | Anslut till en dashboard som redan lyssnar på denna port; innebär även opt-in. |
| `DEVTOOLS_HOST=<host>` | Värd som dashboarden nås på (standard `localhost`). |
| `DEVTOOLS_TRACE=1` | Skriv ett trace-arkiv i stället för att öppna en dashboard. Väljer läget för ett vanligt skript; under pytest väljer den inte in körningen av sig själv. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Trace-läge: ett arkiv för hela körningen, eller ett per test. Omgivande, så den väljer aldrig trace-läge av sig själv – kombinera den med `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Trace-läge: vilka arkiv som är värda att behålla. Omgivande, så den väljer aldrig trace-läge av sig själv – kombinera den med `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Trace-läge: utelämna den täta filmremsan från arkivet. |
| `DEVTOOLS_A11Y=0` | Trace-läge: hoppa över A11y-trädet och elementrektanglarna per åtgärd. |
| `DEVTOOLS_OPEN=0` | Öppna inte dashboard-fönstret (CI). |
| `DEVTOOLS_BIDI=0` | Inaktivera BiDi, och därmed konsol- och nätverksinsamling. |
| `DEVTOOLS_RUN_ID=<id>` | För samman flera processer till en körning. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Starta backenden med ett explicit kommando i stället för det upplösta. |

Backenden är en Node-applikation, så **Node.js 22.19 eller senare måste finnas tillgängligt i alla lägen** – även i trace-läge, där inget dashboard-fönster någonsin öppnas. Det handlar inte bara om gränssnittet: sidinsamlaren serveras av backenden, hela händelseflödet går över dess WebSocket, och i trace-läge är det också den som bygger arkivet. `enable()` kontrollerar Node i förväg och anger vad som saknas i stället för att misslyckas senare med en timeout vid start. Adaptern hittar eller startar backenden åt dig – se [köra backenden fristående](/docs/devtools/dashboard#running-the-backend-on-its-own) om du hellre vill hantera den själv, eller peka `DEVTOOLS_PORT` mot en som du redan kör, i vilket fall ingen lokal Node behövs.

### Assertioner

Godkända och misslyckade `assert`-satser visas som rader med **förväntat** och **faktiskt** värde, och misslyckanden når Errors-fliken. Pythons `assert` är en sats snarare än ett anrop, så till skillnad från Node-adapterns patchning av `node:assert` finns det inget att omsluta – utfallet kommer från testköraren.

**Under pytest** kommer värdena från assertion-omskrivaren, så varje rad innehåller riktiga operander. Att fånga *godkända* assertioner kräver pytests `enable_assertion_pass_hook`, som pluginet slår på åt sig självt. En förbehåll: pytest avgör per modul, *medan den skrivs om*, om hooken ska emitteras, så en modul vars omskrivna bytekod cachades innan pluginet installerades fortsätter att endast rapportera misslyckanden. Adaptern säger det en gång vid insamlingen och anger vilken cache som ska raderas – vilket **inte** alltid är `__pycache__` bredvid dina tester, eftersom `sys.pycache_prefix` (satt som standard i macOS system-Python) skickar varje omskriven modul till ett centralt träd.

**I ett vanligt skript** finns ingen omskrivare, så utfallen kommer från tolkens radhändelser och värdena läses från den ram som ska köra assert-satsen. Endast läsningar som inte kan köra din kod löses upp: en literal eller en lokal variabel löses upp, ett attribut eller ett anrop gör det inte, eftersom att utvärdera `driver.current_url` en andra gång skulle skicka ytterligare ett WebDriver-kommando.

</TabItem>
</Tabs>

## Trace-läge {#trace-mode}

Headless insamlingsväg, i **båda språken** – inget DevTools-gränssnittsfönster öppnas, och körningen skriver ett portabelt trace-arkiv till en `test-results/`-mapp, med samma form som WebdriverIO:s trace-artefakt. De två skiljer sig endast i hur mycket av artefakten du kan justera, och i vem som bygger den.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Vid sessionens slut skriver adaptern själv `trace-<sessionId>.zip` (eller en katalog) till `test-results/` bredvid den upplösta test-/konfigurationskatalogen.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // valfritt; standard 'zip'
})
```

Backendens portbindning, gränssnittsfönstret och alternativet `screencast` hoppas alla över i trace-läge. För den fullständiga funktionsreferensen (artefaktens innehåll, visare, mobiltestning, när du ska välja `zip` respektive `ndjson-directory`), se [sidan Trace Mode](/docs/devtools/wdio/trace-mode).

### Artefakter per test och lagring

Vid `traceGranularity: 'test'` får varje test sin egen artefaktmapp, och `tracePolicy` avgör vilka som behålls (t.ex. `retain-on-failure`). I det läget kan du även ta en `screenshot` (PNG) och `video` (`.webm`) per test, och aktivera en tät `filmstrip` som spelas in i trace-filen för bildruta-för-bildruta-bläddring. När en `allure-js-commons`-köraradapter är aktiv bifogas traces / skärmbilder / videor per test inline i Allure-rapporten (och `emitArtifactsManifest` aktiveras automatiskt); annars skrivs de till `test-results/` och registreras i manifestet.

```js
DevTools.configure({
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure',
  filmstrip: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
})
```

</TabItem>
<TabItem value="python" label="Python">

Det finns inget alternativobjekt att ställa in – en flagga under pytest, ett nyckelordsargument i ett skript:

```bash
pytest --devtools-trace tests/        # innebär --devtools
DEVTOOLS_TRACE=1 python3 login.py     # vanligt skript; samma som devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # skriv en trace.zip i stället för att öppna en dashboard
```

Arkivet hamnar i `test-results/` bredvid den testfil som det första insamlade kommandot kom från – samma katalog som screencast-videor redan skrivs till – med namnet `trace-<sessionId>.zip`, eller namngivet efter varje test när du ber om [ett arkiv per test](#how-many-archives-and-which-ones-to-keep). När inget kommando bar en källplats från din kod faller det tillbaka till `test-results/` under den aktuella katalogen.

**Inget dashboard-fönster öppnas.** Artefakten är utdata, och en live-körning blockerar på fönstret tills du stänger det – ett fönster skulle förvandla skrivandet av en fil till en interaktiv session. Backenden startar ändå, eftersom det är den som *bygger* arkivet: trace-transformationerna är skrivna i TypeScript, så en Python-körning ber backenden om dem i stället för att leverera en andra kopia av dem. Det är det enda sätt som detta skiljer sig från Node.js-adapterns backendfria trace-läge, och anledningen till att [Node.js 22.19 eller senare krävs i alla lägen](#configuration-options).

Utöver kommandoraderna, skärmbilder och selektorer per kommando, konsol och nätverk som båda lägena samlar in, innehåller arkivet:

| I arkivet | Standard | Avstå |
|---|---|---|
| DOM-tidsresor – mutationsflödet som spelaren spelar upp steg för steg | på | - |
| Tät filmremsa – screencast-bildrutorna, inbakade i trace-filen i stället för en `.webm` | på | `DEVTOOLS_FILMSTRIP=0` |
| A11y-träd och elementöverlägg – läses bredvid varje åtgärd, till priset av två extra rundresor per kommando | på | `DEVTOOLS_A11Y=0` |

Trace-läget kodar ingen `.webm`, så det behöver ingen `ffmpeg` – bildrutorna *är* filmremsan.

**Exporten begärs när körningen avslutas, inte när processen avslutas** – pytest begär den vid `sessionfinish` och ett skripts `disable()` exporterar innan transporten stängs, så CI får artefakten oavsett om ett fönster någonsin var inblandat.

### Hur många arkiv, och vilka som ska behållas {#how-many-archives-and-which-ones-to-keep}

Två inställningar avgör det, och ingen av dem betyder något utanför trace-läge.

**Granularitet** – hur många arkiv körningen skriver:

| `--devtools-trace-granularity` | Resultat |
|---|---|
| `session` (standard) | Ett arkiv för hela körningen. |
| `test` | Ett arkiv per test, där vart och ett endast innehåller det testets egna kommandon, konsol, nätverk, DOM-mutationer, a11y-träd och screencast-bildrutor. |

Det finns medvetet inget `spec`-värde här. Denna adapters spec *är* dess testfil, så ett tredje namn skulle bara i tysthet kunna betyda ett av de två ovan.

**Policy** – vilka av dessa arkiv som behålls:

| `--devtools-trace-policy` | Resultat |
|---|---|
| `on` (standard) | Behåll allt. |
| `retain-on-failure` | Behåll endast det som misslyckades. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Accepteras, men beter sig i dag **exakt som `retain-on-failure`**. |

De fyra sista är inte medvetna om omförsök ännu, och det är värt att säga rakt ut snarare än att upptäcka det genom ett arkiv du förväntade dig: ingenting som denna adapter skickar över förbindelsen innehåller ett försöksnummer, så ett omkört test skriver över sitt eget tidigare utfall och frågan om omförsök kan inte ens ställas. Backenden loggar degraderingen i stället för att låtsas något annat. Välj en av dem endast om du vill ha `retain-on-failure` under ett namn som kommer att betyda mer senare.

De två kombineras:

| Granularitet | Policy | Vad du får |
|---|---|---|
| `test` | `retain-on-failure` | Endast de tester som misslyckades. |
| `session` | `retain-on-failure` | Hela körningens arkiv, om något i det misslyckades. |
| någon av dem | `on` | Allt. |

Varje arkiv som behålls med `test`-granularitet namnges efter sitt test (`trace-<test>-<hash>.zip`, där hashen tas från testets nodeid så att två parametriserade fall med samma titel inte kan skriva över varandra). En körning som inte behåller något skriver ingenting alls, vilket är poängen – de arkiv du har kvar är de som är värda att öppna, och en avböjd export är policyn som fungerar snarare än ett fel.

Ställ in dem för en körning:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

Eller checka in dem, så att en bidragsgivare som klonar projektet samlar in på samma sätt utan att behöva bli tillsagd:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` i `pyproject.toml` tar samma nycklar, och `pytest -o devtools_trace_policy=on tests/` åsidosätter en av dem för en enskild körning utan att redigera filen. En fullständigt kommenterad version – varje inställning och varje miljövariabel, med vad var och en är till för – finns i repot under [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

Ett vanligt skript skickar samma två som nyckelordsargument:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Att uttryckligen ange någon av dem väljer trace-läge.** CLI-flaggan, ini-inställningen och `enable()`-argumentet innebär det alla, eftersom en policy eller en granularitet inte betyder något i live-läge och att respektera en utan läget skulle i tysthet ignorera det du bad om. `DEVTOOLS_TRACE_POLICY` och `DEVTOOLS_TRACE_GRANULARITY` gör det medvetet **inte**: en exporterad variabel är omgivande och kan ha satts för ett annat skript i samma skal, så att växla en live-körning till trace-läge på den grunden skulle ta bort dashboarden som ingen bett om att förlora – kombinera dem med `DEVTOOLS_TRACE=1`. En körning som till slut ignorerar en exporterad trace-inställning loggar en varning, i stället för att låta dig märka ett arkiv som aldrig dök upp.

</TabItem>
</Tabs>

### Visa trace-filen

Öppna valfri trace-`.zip` i förstapartsspelaren — samma DevTools-gränssnitt i ett dedikerat **player**-läge:

```bash
npx show-trace path/to/trace.zip      # i ett projekt som installerar adaptern
pnpm show-trace path/to/trace.zip     # från devtools-monorepot
```

`show-trace`-binären levereras med `@wdio/selenium-devtools`, så den finns tillgänglig i alla projekt som installerar den — inget extra beroende. Ett Python-projekt installerar ingen Node.js-adapter, men samma spelare levereras med backenden som adaptern redan hämtar åt dig: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Eftersom Selenium-adaptern fångar sidans **DOM-mutationsflöde** och en element-/tillgänglighetsögonblicksbild per kommando tillsammans med varje skärmbild, driver en Selenium-trace spelarens fullständiga funktionsuppsättning — DOM-tidsresor, A11y-fliken och pick-locator-överlägget, Transcript-fliken med Copy-for-LLM, Cucumber-nästlingen Feature → Scenario → Step, och den bläddringsbara tidslinjen. En Python-trace innehåller samma mutationsflöde och ögonblicksbild per åtgärd (element-/a11y-läsningen sker där endast i trace-läge, och är på som standard); Gherkin-nästlingen är den enda posten som saknar motsvarighet i pytest.

Trace-filen använder ett portabelt NDJSON-schema, så samma `.zip` (eller katalog) kan även öppnas i andra kompatibla trace-visare. Se sidan **[Trace Player](/docs/devtools/trace-player)** för den fullständiga genomgången.

## Publikt API

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // ange körtidsalternativ (se ovan)
DevTools.startTest(name, meta?)      // markera en namngiven testgräns (endast vanliga Node-skript)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Under Mocha / Jest / Cucumber hakar pluginet automatiskt in i testkörarens livscykel, så du behöver inte `startTest` / `endTest` manuellt – att anropa dem skulle skapa dubbletter av rader.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # anslut och instrumentera; idempotent
devtools.disable()                    # riv ned; säkert att anropa två gånger
devtools.wait_for_dashboard_close()   # blockera tills fönstret stängs
devtools.get_capturer()               # den aktiva SessionCapturer, eller None
devtools.dashboard_url()              # URL:en som dashboarden serveras på
```

`enable()` tar en valfri `host` och `port`, samt nyckelordsargument:

```python
devtools.enable(trace=True)                            # skriv en trace.zip; öppna inget fönster
devtools.enable(trace=True, filmstrip=False)           # ... utan den täta filmremsan
devtools.enable(trace=True, a11y=False)                # ... utan element-/a11y-läsningen per åtgärd
devtools.enable(trace_granularity='test')              # ... ett arkiv per test (innebär trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... behåll endast det som misslyckades (innebär trace=True)
```

`filmstrip` och `a11y` gäller endast trace-läge, och var och en är på som standard (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` ställer in samma sak från miljön). `trace` faller tillbaka på `DEVTOOLS_TRACE`. `trace_granularity` och `trace_policy` faller tillbaka på `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`, och att skicka någon av dem slår på trace-läge av sig själv – se [Hur många arkiv, och vilka som ska behållas](#how-many-archives-and-which-ones-to-keep). Ett värde utanför den accepterade mängden ger en varning och faller tillbaka till standardvärdet i stället för att upptäckas senare som en saknad fil.

Under pytest styr pluginet allt detta från `--devtools` / `--devtools-trace` (eller motsvarande ini-inställning, eller `DEVTOOLS_ENABLE=1`), och testgränserna kommer från pytests egna hooks – det finns ingen motsvarighet till `startTest` / `endTest` att anropa.

</TabItem>
</Tabs>

## Exempel

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Fungerande exempel finns i repots katalog `examples/` på toppnivå. Bygg arbetsytan en gång (`pnpm install && pnpm build`) och kör sedan från repots rot. `pnpm demo:selenium` kör standardexemplet (Cucumber); varianterna per testkörare är:

| Katalog | Testkörare | Kommando |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Python-exemplen finns i [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Installera adaptern och bygg arbetsytan en gång (`pnpm install && pnpm build`, så att backenden finns) och kör sedan från repots rot:

| Exempel | Vad det visar | Kommando |
|---|---|---|
| `web_form.py` | Konfigurationen med tre rader för ett vanligt skript | `pnpm demo:python` |
| `login.py` | Ett längre skript: navigering, formulärifyllnad, assertioner | `pnpm demo:python:login` |
| `trace-py-test/` | pytest med en klass och ett test på modulnivå, plus en `pytest.ini` som checkar in trace-läge, granularitet och lagring – varje inställning i den är kommenterad med vad den gör | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Funktioner

Selenium-adaptern ger samma DevTools-gränssnittsupplevelse som WebdriverIO, i båda språken. Varje funktion nedan samlas in automatiskt utan konfiguration per funktion — grundläggande `DevTools.configure({})` i Node.js, eller `pytest --devtools` i Python. Konsol och nätverk strömmas via Seleniums BiDi-hanterare, med en injicerad insamlare som reserv i Node.js. Länkarna går till varje funktions fullständiga referens.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Live-förhandsvisningar av webbläsaren, skärmbilder per kommando och omkörning av test/svit med ett klick
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Ta en ögonblicksbild av ett misslyckat test, kör om det och jämför de två körningarna sida vid sida
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Identifierar automatiskt Mocha, Jest, Cucumber eller ett vanligt skript i Node.js; pytest eller ett vanligt skript i Python
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Fånga och granska webbläsarens konsolutdata
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Övervaka API-anrop och nätverksaktivitet
- **[Metadata](/docs/devtools/wdio/metadata)** - Sessionens capabilities, miljö och tidsåtgång per webbläsarsession
- **[TestLens](/docs/devtools/wdio/testlens)** - Hoppa från valfritt kommando till källraden som utlöste det
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Automatisk videoinspelning av webbläsarsessioner
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Headless insamling som producerar en portabel `trace.zip` (inget gränssnittsfönster), i båda språken, med uppdelning och lagring per test i båda (`traceGranularity` / `tracePolicy` i Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` i Python). `screenshot` / `video` per test och inline-bifogning till Allure finns fortfarande endast i Node.js; se [Trace-läge](#trace-mode)

I Node.js är screencast den enda funktionen med egna alternativ (se [Konfigurationsalternativ](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

I Python behövs ingen konfiguration: Chrome strömmar bildrutor över CDP, andra webbläsare faller tillbaka på en skärmbild per kommando, och kodning av `.webm` kräver `ffmpeg` i `PATH`. I trace-läge blir samma bildrutor arkivets täta filmremsa i stället för en `.webm`, så ingenting kodas och `ffmpeg` behövs inte.

## Hur det fungerar

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Pluginet patchar `selenium-webdriver`:s prototyper `Builder`, `WebDriver` och `WebElement` vid importtillfället:

- **`Builder.build()`** - efter konstruktionen registreras drivern hos sessionsinsamlaren och DevTools-backenden startas i en frikopplad barnprocess.
- **Varje publik `WebDriver`- / `WebElement`-metod** - omsluts med kommandoinsamling (argument + resultat + skärmbild + anropskälla).
- **`WebDriver.quit()`** - en inväntad städhook tömmer screencast-kodningen, WebSocket-bufferten och slutlig metadata innan den ursprungliga quit körs.

När BiDi är tillgängligt (Chrome ≥114) strömmas konsolloggar, JavaScript-undantag och nätverkshändelser direkt via Seleniums BiDi-hanterare. Annars faller pluginet tillbaka på ett injicerat insamlarskript på webbläsarsidan.

Samma injicerade insamlare registrerar även sidans **DOM-mutationsflöde** och en element-/tillgänglighetsögonblicksbild per kommando, så att en trace innehåller tillräckligt för att återskapa den levande DOM:en vid varje steg (mappning per navigering) — det är detta som driver spelarens DOM-tidsresor och A11y-flik i stället för en uppspelning med enbart skärmbilder.

</TabItem>
<TabItem value="python" label="Python">

Det finns inga prototyper att patcha, så Python-adaptern omsluter i stället en metod:

- **`WebDriver.execute()`** - den enda flaskhals som varje kommando passerar genom. Elementmetoder delegerar också till den (`self._parent.execute`), så `click`, `send_keys` och `text` fångas av samma omslag utan att röra elementklasserna.
- **Sessionsuppstart** - vid det första riktiga kommandot registreras drivern, metadata skickas och BiDi, insamlaren och screencasten aktiveras.
- **`quit()`** - fångas upp innan sessionen rivs ned, så att screencasten kodas och de sista bildrutorna töms medan drivern fortfarande finns.

Konsol, JavaScript-undantag och nätverk strömmas över seleniums BiDi-lager (4.44+), som adaptern aktiverar åt dig genom att injicera capabilityn `webSocketUrl` i `newSession`-begäran.

**DOM-mutationsflödet** kommer från samma insamlare på webbläsarsidan som i Node.js, registrerad vid dokumentstart via BiDi så att en sida instrumenterar sig själv innan något av dess egna skript körs. I Chrome skickas screencasten av webbläsaren över en egen CDP-websocket — separat från sessionens kommandokanal, vilket är det som gör ett riktigt bildflöde säkert när en Selenium-session inte är trådsäker.

</TabItem>
</Tabs>

## Begränsningar

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Begränsning | Detalj |
|-----------|--------|
| Omkörning av enskilda Cucumber-steg | Cucumbers `--name`-filter riktar sig mot scenarier, inte enskilda Gherkin-steg. Dashboardens omkörning per steg är inaktiverad under Cucumber. |
| Förbehåll för headless-läge | `headless: true` injicerar `--headless=old`; `--headless=new` ger helt svarta CDP-bildrutor i screencasten. |
| Initial viewport | Dashboardens ögonblicksbild-iframe faller tillbaka på 1280×800 tills den första navigeringen är klar och insamlaren på webbläsarsidan rapporterar den verkliga viewporten. |

</TabItem>
<TabItem value="python" label="Python">

| Begränsning | Detalj |
|-----------|--------|
| Ingen skärmbild, video eller Allure-bifogning per test | **Trace-arkiv** per test stöds (`--devtools-trace-granularity test`), men Node.js-adapterns alternativ `screenshot` och `video` per test och dess inline-bifogning via `allure-js-commons` saknar motsvarighet i Python – arkiven är artefakterna. |
| Lagring med medvetenhet om omförsök degraderas | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` och `retain-on-failure-and-retries` accepteras men beter sig exakt som `retain-on-failure`: ingenting som skickas över förbindelsen innehåller ett försöksnummer, så ett omkört test skriver över sitt eget tidigare utfall. Backenden loggar degraderingen. |
| Node krävs i alla lägen | Backenden är en Node-applikation – den serverar sidinsamlaren, bär händelseflödet och bygger trace-arkivet – så Node.js 22.19 eller senare måste finnas även i trace-läge, där inget fönster öppnas. Adaptern hittar eller startar den åt dig. |
| Webbläsaralternativen är dina | Det finns inget `headless`-alternativ; konfigurera Chrome via seleniums eget `Options`-objekt som du normalt gör. |
| Video i live-läge kräver ffmpeg | Utan `ffmpeg` i `PATH` hoppas `.webm`-kodningen över med en varning i stället för ett fel. Trace-läget kodar ingen – dess bildrutor går in i filmremsan – så det behöver aldrig ffmpeg. |

</TabItem>
</Tabs>