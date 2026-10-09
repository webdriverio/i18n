---
id: cloud-providers
title: Dostawcy chmurowi
description: "Uruchamiaj sesje przeglądarkowe i mobilne WebdriverIO MCP na chmurowych farmach urządzeń, w tym dane uwierzytelniające, przesyłanie aplikacji, tunele i raportowanie."
---

Serwer WebdriverIO MCP ma natywne wsparcie dla uruchamiania sesji automatyzacji przeglądarek i urządzeń mobilnych na chmurowych farmach urządzeń. Nie są wymagane lokalne sterowniki, emulatory ani symulatory. Obsługiwanych jest czterech dostawców:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (przeglądarki) i [App Automate](https://www.browserstack.com/app-automate) (aplikacje mobilne)
- **Sauce Labs** — chmura prawdziwych urządzeń i wirtualnych przeglądarek [Sauce Labs](https://saucelabs.com)
- **TestMu (dawniej LambdaTest)** — chmura prawdziwych urządzeń i przeglądarek [TestMu](https://www.lambdatest.com)
- **TestingBot** — chmura prawdziwych urządzeń i siatka przeglądarek [TestingBot](https://testingbot.com)

Wszyscy czterej dostawcy korzystają z tego samego przepływu pracy: ustaw dane uwierzytelniające, opcjonalnie prześlij aplikację mobilną, a następnie wywołaj `start_session` z nazwą dostawcy. Etykiety raportowania, konfiguracja tunelu i cykl życia aplikacji mobilnej są identyczne u wszystkich dostawców.

## Wymagania wstępne

Przed uruchomieniem serwera MCP ustaw swoje dane uwierzytelniające jako zmienne środowiskowe:

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

| Dostawca     | Zmienna nazwy użytkownika | Zmienna klucza dostępu    | Gdzie znaleźć                                                      |
| ------------ | ------------------------- | ------------------------- | ------------------------------------------------------------------ |
| BrowserStack | `BROWSERSTACK_USERNAME`   | `BROWSERSTACK_ACCESS_KEY` | [Ustawienia konta](https://www.browserstack.com/accounts/settings) |
| Sauce Labs   | `SAUCE_USERNAME`          | `SAUCE_ACCESS_KEY`        | [Ustawienia użytkownika](https://app.saucelabs.com/user-settings)  |
| TestMu       | `TESTMU_USERNAME`         | `TESTMU_ACCESS_KEY`       | [Ustawienia konta](https://accounts.lambdatest.com/detail/profile) |
| TestingBot   | `TESTINGBOT_KEY`          | `TESTINGBOT_SECRET`       | [Ustawienia konta](https://testingbot.com/membership)              |

## Automatyzacja przeglądarek

Uruchom sesję przeglądarki u dowolnego dostawcy chmurowego, ustawiając `provider` w `start_session`:

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

Wszyscy dostawcy obsługują `browser`: `"chrome"`, `"firefox"`, `"edge"`, `"safari"`. Jeśli pominiesz `os` / `osVersion`, dostawca użyje rozsądnych wartości domyślnych (zazwyczaj najnowszego Linuksa dla sesji przeglądarkowych).

### Regiony Sauce Labs

Sauce Labs obsługuje wiele regionów centrów danych. Ustaw parametr `region` w `start_session`:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

Obsługiwane wartości: `"us-west-1"`, `"eu-central-1"` (domyślna), `"apac-southeast-1"`.

## Automatyzacja aplikacji mobilnych

Przepływ pracy dla urządzeń mobilnych składa się z trzech kroków, identycznych u wszystkich dostawców:

### Krok 1: Prześlij swoją aplikację

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

Każde wywołanie zwraca odwołanie do aplikacji, którego użyjesz w `start_session`:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

Opcjonalnie możesz ustawić `customId`, aby uzyskać stabilne odwołania między kolejnymi przesłaniami:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

W przypadku Sauce Labs dodaj `region`, aby dopasować go do regionu magazynu (domyślnie `"eu-central-1"`).

### Krok 2: Wyświetl dostępne aplikacje

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

Opcjonalne parametry dla wszystkich dostawców:
- `sortBy`: `"app_name"` lub `"uploaded_at"` (domyślnie)
- `limit`: maksymalna liczba wyników (domyślnie 20)

BrowserStack obsługuje również `organizationWide: true`, aby wyświetlić wszystkie przesłane pliki organizacji. Sauce Labs akceptuje `region`.

### Krok 3: Uruchom sesję

Użyj odwołania do aplikacji z `upload_app` lub `customId`:

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

## Lokalny tunel

Wszyscy dostawcy obsługują lokalny tunel, dzięki któremu sesje w chmurze mogą łączyć się z serwerami na Twoim komputerze (localhost, środowiska stagingowe, usługi wewnętrzne).

Serwer MCP używa **ujednoliconego parametru `tunnel`**, który działa identycznie u wszystkich dostawców:

### Tunel zarządzany automatycznie (zalecane)

Serwer MCP automatycznie uruchamia i zatrzymuje tunel:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

Przed pierwszą sesją z `tunnel: true` serwer MCP zajmuje się pobraniem i uruchomieniem pliku binarnego tunelu. Jeśli chcesz ręcznie zweryfikować konfigurację, odczytaj zasób local-binary danego dostawcy:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

Tunel zatrzymuje się automatycznie po zamknięciu sesji.

### Tunel zewnętrzny

Jeśli tunel jest już uruchomiony w osobnym procesie:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` informuje serwer MCP, że tunel jest już uruchomiony; ustawia on odpowiednie flagi capabilities, ale nie uruchamia ani nie zatrzymuje żadnego procesu. Ustaw `tunnelName` tak, aby odpowiadał uruchomionemu tunelowi.

### Ręczna konfiguracja tunelu

Jeśli wolisz uruchamiać tunel ręcznie, odczytaj instrukcje konfiguracji z zasobu MCP dla swojego dostawcy i platformy. Na przykład:

```text
// Odczytaj instrukcje konfiguracji (z poziomu klienta AI)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

Każdy zasób zwraca adres URL do pobrania, polecenia specyficzne dla platformy oraz instrukcje uruchamiania w trybie demona.

## Raportowanie

Oznaczaj sesje etykietami projektu, buildu i sesji na potrzeby panelu dostawcy. Działa to identycznie u wszystkich dostawców:

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

Sesje pojawiają się w panelu dostawcy w ramach określonego projektu i buildu:
- BrowserStack: [Panel Automate](https://automate.browserstack.com)
- Sauce Labs: [Wyniki testów](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Panel automatyzacji](https://automation.lambdatest.com)
- TestingBot: [Wyniki testów](https://testingbot.com/members)

## Uwagi dotyczące poszczególnych dostawców

### BrowserStack

- Sesje przeglądarkowe: `os` akceptuje `"Windows"` lub `"OS X"`. Wersje Windows: `"10"`, `"11"`. Wersje macOS: `"Ventura"`, `"Sonoma"`, `"Sequoia"`.
- API zarządzania aplikacjami: `organizationWide: true` w `list_apps` wyświetla wszystkie przesłane pliki zespołu.

### Sauce Labs

- **Regiony mają znaczenie.** Domyślnym regionem jest `eu-central-1`. Jeśli Twoje konto znajduje się w innym regionie, ustaw odpowiednio `region` w `start_session`, `list_apps` i `upload_app`.
- Sesje mobilne obsługują `automationName` (`"XCUITest"` lub `"UiAutomator2"`); wartości domyślne są dobrane odpowiednio do platformy.
- Tunel Sauce Connect jest zarządzany automatycznie za pomocą pakietu npm `saucelabs`. Do `tunnel: true` nie jest potrzebny żaden zewnętrzny plik binarny.

### TestMu

- Nazwa dostawcy to `"testmu"` w `start_session`, `list_apps` i `upload_app`.
- Sesje przeglądarkowe łączą się z `hub.lambdatest.com`; sesje mobilne łączą się z `mobile-hub.lambdatest.com`; jest to obsługiwane automatycznie.
- Tunel jest zarządzany automatycznie za pomocą pakietu npm `@lambdatest/node-tunnel`.
- Zarządzanie aplikacjami mobilnymi pobiera aplikacje Android i iOS za pomocą osobnych wywołań API, a następnie scala wyniki.

### TestingBot

- Nazwa dostawcy to `"testingbot"` w `start_session`, `list_apps` i `upload_app`.
- Zarówno sesje przeglądarkowe, jak i mobilne łączą się z `hub.testingbot.com` na porcie 443 (obsługiwane automatycznie).
- Dane uwierzytelniające wykorzystują `TESTINGBOT_KEY` i `TESTINGBOT_SECRET` (a nie parę nazwa użytkownika/klucz dostępu, jak u innych dostawców).
- Tunel jest zarządzany automatycznie za pomocą pakietu npm `testingbot-tunnel-launcher` (wymaga Java 11+).
- Brak parametru regionu — hub TestingBot jest globalny.
- Obsługiwany jest tryb przeglądarki mobilnej/emulatora: ustaw `platform: "android"` lub `"ios"` wraz z nazwą przeglądarki w `browser` (np. `"chrome"`) zamiast `app`.