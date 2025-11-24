---
id: gettingstarted
title: Pierwsze kroki
---

Witaj w dokumentacji WebdriverIO. Pomoże ci szybko rozpocząć pracę. Jeśli napotkasz problemy, możesz znaleźć pomoc i odpowiedzi na naszym [Serwerze Wsparcia Discord](https://discord.webdriver.io) lub możesz do nas napisać na [𝕏](https://x.com/webdriverio).

:::info
To jest dokumentacja dla najnowszej wersji (__>=9.x__) WebdriverIO. Jeśli nadal korzystasz ze starszej wersji, odwiedź [stare strony dokumentacji](/versions)!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Oficjalny kanał YouTube 🎥

Więcej filmów dotyczących WebdriverIO znajdziesz na [oficjalnym kanale YouTube](https://youtube.com/@webdriverio). Pamiętaj, aby się zasubskrybować!

:::

## Inicjacja konfiguracji WebdriverIO

Aby dodać pełną konfigurację WebdriverIO do istniejącego lub nowego projektu za pomocą [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio), wykonaj:

Jeśli jesteś w katalogu głównym istniejącego projektu, wykonaj:

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

Ta pojedyncza komenda pobiera narzędzie WebdriverIO CLI i uruchamia kreator konfiguracji, który pomaga skonfigurować zestaw testów.

<CreateProjectAnimation />

Kreator zada serię pytań, które przeprowadzą cię przez proces konfiguracji. Możesz przekazać parametr `--yes`, aby wybrać domyślną konfigurację, która będzie używać Mocha z Chrome, stosując wzorzec [Page Object](https://martinfowler.com/bliki/PageObject.html).

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

# uruchom kreator konfiguracji
npx wdio config
```

## Uruchomienie testów

Możesz uruchomić swój zestaw testów za pomocą polecenia `run` i wskazując plik konfiguracyjny WebdriverIO, który właśnie utworzyłeś:

```sh
npx wdio run ./wdio.conf.js
```

Jeśli chcesz uruchomić określone pliki testowe, możesz dodać parametr `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

lub zdefiniować zestawy (suites) w pliku konfiguracyjnym i uruchomić tylko pliki testowe zdefiniowane w zestawie:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Uruchamianie w skrypcie

Jeśli chcesz używać WebdriverIO jako silnika automatyzacji w [trybie samodzielnym](/docs/setuptypes#standalone-mode) w skrypcie Node.JS, możesz bezpośrednio zainstalować WebdriverIO i używać go jako pakietu, np. do wygenerowania zrzutu ekranu strony internetowej:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Uwaga:__ wszystkie polecenia WebdriverIO są asynchroniczne i muszą być odpowiednio obsługiwane za pomocą [`async/await`](https://javascript.info/async-await).

## Nagrywanie testów

WebdriverIO dostarcza narzędzia, które pomogą ci rozpocząć pracę poprzez nagrywanie twoich działań testowych na ekranie i automatyczne generowanie skryptów testowych WebdriverIO. Zobacz [Nagrywanie testów z Chrome DevTools Recorder](/docs/record) aby uzyskać więcej informacji.

## Wymagania systemowe

Potrzebujesz zainstalowanego [Node.js](http://nodejs.org).

- Zainstaluj co najmniej wersję v18.20.0 lub wyższą, ponieważ jest to najstarsza aktywna wersja LTS
- Oficjalnie obsługiwane są tylko wersje, które są lub staną się wydaniami LTS

Jeśli Node nie jest obecnie zainstalowany w twoim systemie, sugerujemy korzystanie z narzędzia takiego jak [NVM](https://github.com/creationix/nvm) lub [Volta](https://volta.sh/) aby pomóc w zarządzaniu wieloma aktywnymi wersjami Node.js. NVM jest popularnym wyborem, podczas gdy Volta jest również dobrą alternatywą.