---
id: custommatchers
title: Benutzerdefinierte Matcher
---

WebdriverIO verwendet eine Jest-ähnliche [`expect`](https://webdriver.io/docs/api/expect-webdriverio) Assertion-Bibliothek, die mit speziellen Funktionen und benutzerdefinierten Matchern für Web- und Mobile-Tests ausgestattet ist. Obwohl die Bibliothek der Matcher umfangreich ist, passt sie sicherlich nicht zu allen möglichen Situationen. Daher ist es möglich, die vorhandenen Matcher mit eigenen benutzerdefinierten Matchern zu erweitern.

:::warning

Obwohl es derzeit keinen Unterschied gibt, wie Matcher definiert werden, die spezifisch für das [`browser`](/docs/api/browser) Objekt oder eine [element](/docs/api/element) Instanz sind, könnte sich dies in Zukunft ändern. Behalten Sie [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) im Auge für weitere Informationen zu dieser Entwicklung.

:::

## Benutzerdefinierte Browser-Matcher

Um einen benutzerdefinierten Browser-Matcher zu registrieren, rufen Sie `extend` auf dem `expect` Objekt entweder direkt in Ihrer Spec-Datei oder als Teil des z.B. `before` Hooks in Ihrer `wdio.conf.js` auf:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Wie im Beispiel gezeigt, nimmt die Matcher-Funktion das erwartete Objekt, z.B. das Browser- oder Element-Objekt, als ersten Parameter und den erwarteten Wert als zweiten. Sie können den Matcher dann wie folgt verwenden:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Benutzerdefinierte Element-Matcher

Ähnlich wie bei benutzerdefinierten Browser-Matchern unterscheiden sich Element-Matcher nicht. Hier ist ein Beispiel, wie man einen benutzerdefinierten Matcher erstellt, um das aria-label eines Elements zu überprüfen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Dies ermöglicht es Ihnen, die Assertion wie folgt aufzurufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript-Unterstützung

Wenn Sie TypeScript verwenden, ist ein weiterer Schritt erforderlich, um die Typsicherheit Ihrer benutzerdefinierten Matcher zu gewährleisten. Durch die Erweiterung der `Matcher`-Schnittstelle mit Ihren benutzerdefinierten Matchern verschwinden alle Typprobleme:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Wenn Sie einen benutzerdefinierten [asymmetrischen Matcher](https://jestjs.io/docs/expect#expectextendmatchers) erstellt haben, können Sie die `expect`-Typen ähnlich wie folgt erweitern:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```