---
id: custommatchers
title: Niestandardowe matchery
description: "Rejestruj niestandardowe matchery przeglądarki i elementów za pomocą expect.extend oraz dodawaj dla nich typy TypeScript."
---

WebdriverIO używa biblioteki asercji [`expect`](https://webdriver.io/docs/api/expect-webdriverio) w stylu Jest, która zawiera specjalne funkcje i niestandardowe matchery przeznaczone do uruchamiania testów webowych i mobilnych. Chociaż biblioteka matcherów jest obszerna, z pewnością nie pasuje do wszystkich możliwych sytuacji. Dlatego możliwe jest rozszerzenie istniejących matcherów o własne, zdefiniowane przez Ciebie.

:::warning

Chociaż obecnie nie ma różnicy w sposobie definiowania matcherów specyficznych dla obiektu [`browser`](/docs/api/browser) lub instancji [elementu](/docs/api/element), z pewnością może się to zmienić w przyszłości. Śledź [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408), aby uzyskać więcej informacji na temat tych zmian.

:::

:::info Jasmine

W przypadku frameworka Jasmine wywołaj `expect.extend` w pliku spec lub w hooku `before`, zanim testy zostaną uruchomione. Matchery stają się asynchronicznymi matcherami Jasmine, więc używaj z nimi `await`. Matcher o nazwie synchronicznego matchera Jasmine działa tylko dla wartości WebdriverIO, podobnie jak matchery WebdriverIO. Niestandardowe matchery asymetryczne (`expect.myMatcher()`) nie są dostępne. Możesz także użyć `jasmine.addMatchers` dla matchera synchronicznego lub `jasmine.addAsyncMatchers` dla matchera asynchronicznego, zobacz [samouczek Jasmine dotyczący niestandardowych matcherów](https://jasmine.github.io/tutorials/custom_matchers).

:::

## Niestandardowe matchery przeglądarki

Aby zarejestrować niestandardowy matcher przeglądarki, wywołaj `extend` na obiekcie `expect` bezpośrednio w pliku spec lub na przykład w ramach hooka `before` w pliku `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Jak pokazano w przykładzie, funkcja matchera przyjmuje jako pierwszy parametr oczekiwany obiekt, np. obiekt przeglądarki lub elementu, a jako drugi oczekiwaną wartość. Następnie możesz użyć matchera w następujący sposób:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Niestandardowe matchery elementów

Matchery elementów nie różnią się od niestandardowych matcherów przeglądarki. Oto przykład, jak utworzyć niestandardowy matcher do sprawdzania aria-label elementu:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Pozwala to wywołać asercję w następujący sposób:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Obsługa TypeScript

Jeśli używasz TypeScript, wymagany jest jeszcze jeden krok, aby zapewnić bezpieczeństwo typów niestandardowych matcherów. Rozszerzając interfejs `Matcher` o własne matchery, wszystkie problemy z typami znikają:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Jeśli utworzyłeś niestandardowy [matcher asymetryczny](https://jestjs.io/docs/expect#expectextendmatchers), możesz w podobny sposób rozszerzyć typy `expect`:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```