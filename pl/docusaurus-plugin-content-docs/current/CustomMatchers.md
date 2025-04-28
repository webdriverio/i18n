---
id: custommatchers
title: Niestandardowe Matchery
---

WebdriverIO używa biblioteki asercji w stylu Jest [`expect`](https://webdriver.io/docs/api/expect-webdriverio), która zawiera specjalne funkcje i niestandardowe matchery przeznaczone do uruchamiania testów internetowych i mobilnych. Mimo że biblioteka matcherów jest duża, z pewnością nie obejmuje wszystkich możliwych sytuacji. Dlatego możliwe jest rozszerzenie istniejących matcherów o niestandardowe, zdefiniowane przez Ciebie.

:::warning

Chociaż obecnie nie ma różnicy w sposobie definiowania matcherów, które są specyficzne dla obiektu [`browser`](/docs/api/browser) lub instancji [element](/docs/api/element), może to ulec zmianie w przyszłości. Śledź [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408), aby uzyskać więcej informacji na temat tego rozwoju.

:::

## Niestandardowe Matchery Przeglądarki

Aby zarejestrować niestandardowy matcher przeglądarki, wywołaj `extend` na obiekcie `expect` bezpośrednio w pliku spec lub jako część np. hooka `before` w pliku `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Jak pokazano w przykładzie, funkcja matchera przyjmuje oczekiwany obiekt, np. przeglądarkę lub element, jako pierwszy parametr i oczekiwaną wartość jako drugi. Następnie możesz używać matchera w następujący sposób:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Niestandardowe Matchery Elementów

Podobnie do niestandardowych matcherów przeglądarki, matchery elementów nie różnią się. Oto przykład, jak utworzyć niestandardowy matcher do asercji atrybutu aria-label elementu:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Pozwala to na wywołanie asercji w następujący sposób:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Wsparcie TypeScript

Jeśli używasz TypeScript, wymagany jest jeszcze jeden krok, aby zapewnić bezpieczeństwo typów Twoich niestandardowych matcherów. Rozszerzając interfejs `Matcher` o niestandardowe matchery, wszystkie problemy z typami znikają:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Jeśli utworzyłeś niestandardowy [asymetryczny matcher](https://jestjs.io/docs/expect#expectextendmatchers), możesz podobnie rozszerzyć typy `expect` w następujący sposób:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```