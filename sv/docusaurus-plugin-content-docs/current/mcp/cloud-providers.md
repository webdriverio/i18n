---
id: cloud-providers
title: Molnleverantörer
description: "Kör WebdriverIO MCP-webbläsar- och mobilsessioner på molnbaserade enhetsfarmar, inklusive autentiseringsuppgifter, appuppladdningar, tunnlar och rapportering."
---

WebdriverIO MCP-servern har inbyggt stöd för att köra automatiseringssessioner för webbläsare och mobil på molnbaserade enhetsfarmar. Inga lokala drivrutiner, emulatorer eller simulatorer krävs. Fyra leverantörer stöds:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (webbläsare) och [App Automate](https://www.browserstack.com/app-automate) (mobilappar)
- **Sauce Labs** — [Sauce Labs](https://saucelabs.com) moln med riktiga enheter och virtuella webbläsare
- **TestMu (tidigare LambdaTest)** — [TestMu](https://www.lambdatest.com) moln med riktiga enheter och webbläsare
- **TestingBot** — [TestingBot](https://testingbot.com) moln med riktiga enheter och webbläsarnät

Alla fyra leverantörer delar samma arbetsflöde: ange autentiseringsuppgifter, ladda eventuellt upp en mobilapp och anropa sedan `start_session` med leverantörens namn. Rapporteringsetiketter, tunnelkonfiguration och mobilappens livscykel är identiska för alla leverantörer.

## Förutsättningar

Ange dina autentiseringsuppgifter som miljövariabler innan du startar MCP-servern:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| Leverantör   | Variabel för användarnamn | Variabel för åtkomstnyckel | Var den finns                                                         |
| ------------ | ------------------------- | -------------------------- | --------------------------------------------------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME`   | `BROWSERSTACK_ACCESS_KEY`  | [Kontoinställningar](https://www.browserstack.com/accounts/settings)  |
| Sauce Labs   | `SAUCE_USERNAME`          | `SAUCE_ACCESS_KEY`         | [Användarinställningar](https://app.saucelabs.com/user-settings)      |
| TestMu       | `TESTMU_USERNAME`         | `TESTMU_ACCESS_KEY`        | [Kontoinställningar](https://accounts.lambdatest.com/detail/profile)  |
| TestingBot   | `TESTINGBOT_KEY`          | `TESTINGBOT_SECRET`        | [Kontoinställningar](https://testingbot.com/membership)               |

## Webbläsarautomatisering

Kör en webbläsarsession hos valfri molnleverantör genom att ange `provider` i `start_session`:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

Alla leverantörer stöder `browser`: `"chrome"`, `"firefox"`, `"edge"`, `"safari"`. Om du utelämnar `os` / `osVersion` använder leverantören rimliga standardvärden (vanligtvis senaste Linux för webbläsarsessioner).

### Sauce Labs-regioner

Sauce Labs stöder flera datacenterregioner. Ange parametern `region` i `start_session`:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

Värden som stöds: `"us-west-1"`, `"eu-central-1"` (standard), `"apac-southeast-1"`.

## Automatisering av mobilappar

Mobilarbetsflödet har tre steg, identiska för alla leverantörer:

### Steg 1: Ladda upp din app

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

Varje anrop returnerar en appreferens som du använder i `start_session`:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

Du kan valfritt ange ett `customId` för stabila referenser mellan uppladdningar:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

För Sauce Labs, lägg till `region` som matchar din lagringsregion (standard `"eu-central-1"`).

### Steg 2: Lista tillgängliga appar

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

Valfria parametrar för alla leverantörer:
- `sortBy`: `"app_name"` eller `"uploaded_at"` (standard)
- `limit`: max antal resultat (standard 20)

BrowserStack stöder även `organizationWide: true` för att lista alla uppladdningar i organisationen. Sauce Labs accepterar `region`.

### Steg 3: Starta sessionen

Använd appreferensen från `upload_app`, eller ett `customId`:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## Lokal tunnel

Alla tre leverantörer stöder en lokal tunnel så att molnsessioner kan nå servrar på din dator (localhost, stagingmiljöer, interna tjänster).

MCP-servern använder en **enhetlig `tunnel`-parameter** som fungerar identiskt för alla leverantörer:

### Automatiskt hanterad tunnel (rekommenderas)

MCP-servern startar och stoppar tunneln automatiskt:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

Före din första session med `tunnel: true` hanterar MCP-servern nedladdning och start av tunnelns binärfil. Om du vill verifiera konfigurationen manuellt kan du läsa leverantörens local-binary-resurs:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

Tunneln stoppas automatiskt när du stänger sessionen.

### Extern tunnel

Om du redan kör tunneln i en separat process:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` talar om för MCP-servern att en tunnel redan körs; den sätter lämpliga capability-flaggor men startar eller stoppar inte någon process. Ange `tunnelName` så att det matchar den tunnel som körs.

### Manuell tunnelkonfiguration

Om du föredrar att köra tunneln manuellt kan du läsa konfigurationsinstruktionerna från MCP-resursen för din leverantör och plattform. Till exempel:

```text
// Läs konfigurationsinstruktioner (från din AI-klient)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

Varje resurs returnerar nedladdnings-URL, plattformsspecifika kommandon och instruktioner för att köra som daemon.

## Rapportering

Tagga sessioner med projekt-, bygg- och sessionsetiketter för leverantörens instrumentpanel. Detta fungerar identiskt för alla tre leverantörer:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

Sessionerna visas i leverantörens instrumentpanel under angivet projekt och bygge:
- BrowserStack: [Automate-instrumentpanel](https://automate.browserstack.com)
- Sauce Labs: [Testresultat](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Automatiseringsinstrumentpanel](https://automation.lambdatest.com)
- TestingBot: [Testresultat](https://testingbot.com/members)

## Leverantörsspecifika anteckningar

### BrowserStack

- Webbläsarsessioner: `os` accepterar `"Windows"` eller `"OS X"`. Windows-versioner: `"10"`, `"11"`. macOS-versioner: `"Ventura"`, `"Sonoma"`, `"Sequoia"`.
- API för apphantering: `organizationWide: true` på `list_apps` listar alla teamets uppladdningar.

### Sauce Labs

- **Regioner spelar roll.** Standardregionen är `eu-central-1`. Om ditt konto finns i en annan region, ange `region` på `start_session`, `list_apps` och `upload_app` så att det matchar.
- Mobilsessioner stöder `automationName` (`"XCUITest"` eller `"UiAutomator2"`); standardvärdena är rimliga för respektive plattform.
- Sauce Connect-tunneln hanteras automatiskt via npm-paketet `saucelabs`. Ingen extern binärfil behövs för `tunnel: true`.

### TestMu

- Leverantörsnamnet är `"testmu"` i `start_session`, `list_apps` och `upload_app`.
- Webbläsarsessioner ansluter till `hub.lambdatest.com`; mobilsessioner ansluter till `mobile-hub.lambdatest.com`; detta hanteras automatiskt.
- Tunneln hanteras automatiskt via npm-paketet `@lambdatest/node-tunnel`.
- Mobilapphanteringen hämtar både Android- och iOS-appar via separata API-anrop och slår sedan ihop resultaten.

### TestingBot

- Leverantörsnamnet är `"testingbot"` i `start_session`, `list_apps` och `upload_app`.
- Både webbläsar- och mobilsessioner ansluter till `hub.testingbot.com` på port 443 (hanteras automatiskt).
- Autentiseringsuppgifterna använder `TESTINGBOT_KEY` och `TESTINGBOT_SECRET` (inte ett par av användarnamn/åtkomstnyckel som hos de andra leverantörerna).
- Tunneln hanteras automatiskt via npm-paketet `testingbot-tunnel-launcher` (kräver Java 11+).
- Ingen regionparameter — TestingBots hub är global.
- Läget för mobilwebbläsare/emulator stöds: ange `platform: "android"` eller `"ios"` med ett `browser`-namn (t.ex. `"chrome"`) i stället för `app`.