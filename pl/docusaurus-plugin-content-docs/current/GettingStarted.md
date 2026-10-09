---
id: gettingstarted
title: Pierwsze kroki
description: Utwórz projekt WebdriverIO za pomocą npm init wdio@latest, uruchom swój pierwszy test i znajdź kolejny przewodnik dla swojej platformy.
---

Skonfiguruj WebdriverIO w istniejącym lub nowym projekcie za pomocą jednego polecenia, a następnie uruchom swój pierwszy test. Kreator konfiguracji zapyta, co chcesz testować (aplikacje webowe, mobilne, desktopowe lub rozszerzenia VS Code), jakiego frameworka i jakich reporterów użyć, a następnie zainstaluje wszystko za Ciebie.

:::info
To jest dokumentacja WebdriverIO __v10__. Nadal korzystasz z v9? Skorzystaj z [dokumentacji v9](https://v9.webdriver.io) lub postępuj zgodnie z [przewodnikiem migracji do v10](/docs/v10-migration).
:::

:::tip Korzystasz z agenta kodującego?
Wskaż mu [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) lub podłącz serwer MCP dokumentacji pod adresem `https://webdriver.io/mcp`. Zobacz [WebdriverIO dla agentów kodujących](/docs/ai-agents).
:::

## Inicjowanie konfiguracji WebdriverIO

[WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) dodaje kompletną konfigurację WebdriverIO do istniejącego lub nowego projektu. W katalogu głównym istniejącego projektu uruchom:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

lub jeśli chcesz utworzyć nowy projekt:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

lub jeśli chcesz utworzyć nowy projekt:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

lub jeśli chcesz utworzyć nowy projekt:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

lub jeśli chcesz utworzyć nowy projekt:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

To pojedyncze polecenie pobiera narzędzie WebdriverIO CLI i uruchamia kreator konfiguracji, który pomaga skonfigurować zestaw testów.

<CreateProjectAnimation />

Kreator zada serię pytań, które przeprowadzą Cię przez proces konfiguracji. Możesz przekazać parametr `--yes`, aby wybrać domyślną konfigurację, która użyje Mocha z Chrome oraz wzorca [Page Object](https://martinfowler.com/bliki/PageObject.html).

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### Odpowiadanie na pytania kreatora za pomocą flag

Każde pytanie w kreatorze ma odpowiadającą mu flagę wiersza poleceń. Flaga odpowiada na swoje pytanie, a kreator zadaje tylko pozostałe. W połączeniu z `--yes` kreator używa wartości domyślnych dla pozostałych pytań i nigdy nie wyświetla monitów, czego potrzebuje agent kodujący lub zadanie CI:

```sh
# Cucumber w JavaScript, z reporterami spec i JUnit
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox i Edge zamiast Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# Aplikacja na Androida z Appium
npm init wdio@latest . -- --yes --mobile-environment android

# Testy komponentów React
npm init wdio@latest . -- --yes --runner component --preset react

# Zapisz konfigurację, ale zainstaluj zależności samodzielnie
npm init wdio@latest . -- --yes --no-npm-install
```

W przypadku Yarn, pnpm i bun przekazuj flagi bez separatora `--`, np. `pnpm create wdio@latest . --yes --framework cucumber`.

Najczęściej używane flagi:

| Flaga | Wartości |
| --- | --- |
| `--runner` | `e2e` (domyślnie), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (domyślnie), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | TypeScript jest domyślny, gdy projekt zawiera plik `tsconfig.json` |
| `--browsers` | Lista rozdzielona przecinkami z wartości `chrome` (domyślnie), `firefox`, `safari`, `edge` |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (domyślnie), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, z `--runner component` |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, z `--runner desktop` |
| `--reporters`, `--services`, `--plugins` | Krótkie nazwy rozdzielone przecinkami, np. `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | Zapisuje sekcję `AGENTS.md` oraz umiejętność `wdio-session` (domyślnie włączone) |
| `--npm-install` / `--no-npm-install` | Instaluje zależności (domyślnie włączone) |

`npm init wdio@latest -- --help` wyświetla wszystkie flagi, akceptowane przez nie wartości oraz pytania, na które odpowiadają. Flagi logiczne przyjmują prefiks `--no-`. Te same flagi działają z `npx wdio config`.

Kreator sprawdza każdą flagę pod kątem Twojej konfiguracji. Nieznana wartość, flaga dla pytania, którego kreator by nie zadał, lub wartość, której nie zaoferowałby dla Twojej konfiguracji, zatrzymuje go z kodem wyjścia 2, zanim zapisze jakikolwiek plik:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## Ręczna instalacja CLI

Możesz również dodać pakiet CLI do swojego projektu ręcznie za pomocą:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # wyświetla np. `8.13.10`

# uruchom kreator konfiguracji
npx wdio config
```

## Uruchamianie testów

Możesz uruchomić swój zestaw testów za pomocą polecenia `run`, wskazując na właśnie utworzony plik konfiguracyjny WebdriverIO:

```sh
npx wdio run ./wdio.conf.js
```

Jeśli chcesz uruchomić określone pliki testowe, możesz dodać parametr `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

lub zdefiniować zestawy (suites) w pliku konfiguracyjnym i uruchomić tylko pliki testowe zdefiniowane w danym zestawie:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Uruchamianie w skrypcie

Jeśli chcesz używać WebdriverIO jako silnika automatyzacji w [trybie Standalone](/docs/setuptypes#standalone-mode) w skrypcie Node.JS, możesz również bezpośrednio zainstalować WebdriverIO i używać go jako pakietu, np. do wygenerowania zrzutu ekranu strony internetowej:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Uwaga:__ wszystkie polecenia WebdriverIO są asynchroniczne i muszą być odpowiednio obsługiwane za pomocą [`async/await`](https://javascript.info/async-await).

## Nagrywanie testów

WebdriverIO udostępnia narzędzia, które pomogą Ci zacząć, nagrywając Twoje działania testowe na ekranie i automatycznie generując skrypty testowe WebdriverIO. Więcej informacji znajdziesz w sekcji [Nagrywanie testów za pomocą Chrome DevTools Recorder](/docs/record).

## Wymagania systemowe

Musisz mieć zainstalowany [Node.js](http://nodejs.org).

- Zainstaluj co najmniej wersję v22.19.0 lub nowszą, ponieważ jest to najstarsza wspierana wersja LTS
- Oficjalnie wspierane są tylko wydania, które są lub staną się wydaniami LTS

Jeśli Node nie jest obecnie zainstalowany w Twoim systemie, zalecamy skorzystanie z narzędzia takiego jak [NVM](https://github.com/creationix/nvm) lub [Volta](https://volta.sh/), które pomaga w zarządzaniu wieloma aktywnymi wersjami Node.js. NVM jest popularnym wyborem, a Volta również stanowi dobrą alternatywę.

## Obejrzyj wprowadzenie

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

Więcej filmów znajdziesz na [oficjalnym kanale YouTube](https://youtube.com/@webdriverio).

## Następne kroki

- Wybierz swoją platformę: [Przeglądarki internetowe](/docs/platforms/web), [Aplikacje mobilne](/docs/platforms/mobile), [Aplikacje desktopowe](/docs/platforms/desktop) lub [Rozszerzenia i edytory](/docs/platforms/apps-and-extensions)
- Dowiedz się, jak [wybierać elementy](/docs/selectors) i pisać [asercje](/docs/assertion)
- Skonfiguruj test runner w [`wdio.conf.ts`](/docs/configurationfile)
- Uzyskaj pomoc na [Discordzie](https://discord.webdriver.io)