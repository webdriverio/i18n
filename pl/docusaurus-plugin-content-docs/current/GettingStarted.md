---
id: gettingstarted
title: Pierwsze kroki
---

Witamy w dokumentacji WebdriverIO. Pomoże Ci szybko rozpocząć pracę. Jeśli napotkasz problemy, możesz znaleźć pomoc i odpowiedzi na naszym [Serwerze Wsparcia Discord](https://discord.webdriver.io) lub możesz napisać do mnie na [Twitterze](https://twitter.com/webdriverio).

:::info
To jest dokumentacja dla najnowszej wersji (__>=9.x__) WebdriverIO. Jeśli nadal używasz starszej wersji, odwiedź [stare strony dokumentacji](/versions)!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Oficjalny kanał YouTube 🎥

Więcej filmów na temat WebdriverIO znajdziesz na [oficjalnym kanale YouTube](https://youtube.com/@webdriverio). Nie zapomnij zasubskrybować!

:::

## Rozpocznij konfigurację WebdriverIO

Aby dodać pełną konfigurację WebdriverIO do istniejącego lub nowego projektu za pomocą [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio), uruchom:

Jeśli jesteś w katalogu głównym istniejącego projektu, uruchom:

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

To pojedyncze polecenie pobiera narzędzie WebdriverIO CLI i uruchamia kreatora konfiguracji, który pomaga skonfigurować pakiet testowy.

<CreateProjectAnimation />

Kreator zada zestaw pytań, które prowadzą przez proces konfiguracji. Możesz przekazać parametr `--yes`, aby wybrać domyślną konfigurację, która będzie używać Mocha z Chrome, wykorzystując wzorzec [Page Object](https://martinfowler.com/bliki/PageObject.html).

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

## Ręczna instalacja CLI

Możesz również dodać pakiet CLI do swojego projektu ręcznie za pomocą:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # wyświetla np. `8.13.10`

# uruchom kreatora konfiguracji
npx wdio config
```

## Uruchom testy

Możesz uruchomić swój pakiet testów za pomocą polecenia `run` i wskazując na konfigurację WebdriverIO, którą właśnie utworzyłeś:

```sh
npx wdio run ./wdio.conf.js
```

Jeśli chcesz uruchomić konkretne pliki testowe, możesz dodać parametr `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

lub zdefiniować zestawy w pliku konfiguracyjnym i uruchomić tylko pliki testowe zdefiniowane w zestawie:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Uruchom w skrypcie

Jeśli chcesz używać WebdriverIO jako silnika automatyzacji w [trybie autonomicznym](/docs/setuptypes#standalone-mode) w skrypcie Node.JS, możesz również bezpośrednio zainstalować WebdriverIO i używać go jako pakietu, np. aby wygenerować zrzut ekranu strony internetowej:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Uwaga:__ wszystkie polecenia WebdriverIO są asynchroniczne i muszą być odpowiednio obsługiwane za pomocą [`async/await`](https://javascript.info/async-await).

## Nagrywanie testów

WebdriverIO udostępnia narzędzia, które pomogą Ci rozpocząć pracę, rejestrując twoje działania testowe na ekranie i automatycznie generując skrypty testowe WebdriverIO. Zobacz [Nagrywanie testów za pomocą Chrome DevTools Recorder](/docs/record), aby uzyskać więcej informacji.

## Wymagania systemowe

Będziesz potrzebować zainstalowanego [Node.js](http://nodejs.org).

- Zainstaluj co najmniej wersję v18.20.0 lub wyższą, ponieważ jest to najstarsza aktywna wersja LTS
- Oficjalnie obsługiwane są tylko wydania, które są lub staną się wydaniem LTS

Jeśli Node nie jest obecnie zainstalowany w Twoim systemie, sugerujemy korzystanie z narzędzia takiego jak [NVM](https://github.com/creationix/nvm) lub [Volta](https://volta.sh/), aby pomóc w zarządzaniu wieloma aktywnymi wersjami Node.js. NVM jest popularnym wyborem, podczas gdy Volta jest również dobrą alternatywą.