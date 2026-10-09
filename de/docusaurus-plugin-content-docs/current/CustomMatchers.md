---
id: custommatchers
title: Benutzerdefinierte Matcher
description: "Registrieren Sie benutzerdefinierte Browser- und Element-Matcher mit expect.extend und fügen Sie TypeScript-Typen für diese hinzu."
---

WebdriverIO verwendet eine Assertion-Bibliothek im Jest-Stil namens [`expect`](https://webdriver.io/docs/api/expect-webdriverio), die spezielle Funktionen und benutzerdefinierte Matcher speziell für die Ausführung von Web- und Mobile-Tests mitbringt. Obwohl die Bibliothek an Matchern groß ist, deckt sie sicherlich nicht alle möglichen Situationen ab. Daher ist es möglich, die bestehenden Matcher um eigene, von Ihnen definierte Matcher zu erweitern.

:::warning

Auch wenn es derzeit keinen Unterschied in der Definition von Matchern gibt, die spezifisch für das [`browser`](/docs/api/browser)-Objekt oder eine [Element](/docs/api/element)-Instanz sind, kann sich dies in Zukunft durchaus ändern. Behalten Sie [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) im Auge, um weitere Informationen zu dieser Entwicklung zu erhalten.

:::

:::info Jasmine

Rufen Sie beim Jasmine-Framework `expect.extend` in einer Spec-Datei oder im `before`-Hook auf, bevor die Tests laufen. Die Matcher werden zu asynchronen Jasmine-Matchern, verwenden Sie daher `await`. Ein Matcher mit dem Namen eines synchronen Jasmine-Matchers wird, wie die WebdriverIO-Matcher, nur für WebdriverIO-Werte ausgeführt. Benutzerdefinierte asymmetrische Matcher (`expect.myMatcher()`) sind nicht verfügbar. Sie können auch `jasmine.addMatchers` für einen synchronen Matcher oder `jasmine.addAsyncMatchers` für einen asynchronen Matcher verwenden, siehe das [Jasmine-Tutorial zu benutzerdefinierten Matchern](https://jasmine.github.io/tutorials/custom_matchers).

:::

## Benutzerdefinierte Browser-Matcher

Um einen benutzerdefinierten Browser-Matcher zu registrieren, rufen Sie `extend` auf dem `expect`-Objekt auf, entweder direkt in Ihrer Spec-Datei oder z. B. als Teil des `before`-Hooks in Ihrer `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Wie im Beispiel gezeigt, nimmt die Matcher-Funktion das erwartete Objekt, z. B. das Browser- oder Element-Objekt, als ersten Parameter und den erwarteten Wert als zweiten Parameter entgegen. Anschließend können Sie den Matcher wie folgt verwenden:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Benutzerdefinierte Element-Matcher

Element-Matcher unterscheiden sich nicht von benutzerdefinierten Browser-Matchern. Hier ist ein Beispiel dafür, wie Sie einen benutzerdefinierten Matcher erstellen, um das aria-label eines Elements zu überprüfen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Dadurch können Sie die Assertion wie folgt aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript-Unterstützung

Wenn Sie TypeScript verwenden, ist ein weiterer Schritt erforderlich, um die Typsicherheit Ihrer benutzerdefinierten Matcher zu gewährleisten. Indem Sie das `Matcher`-Interface um Ihre benutzerdefinierten Matcher erweitern, verschwinden alle Typprobleme:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Wenn Sie einen benutzerdefinierten [asymmetrischen Matcher](https://jestjs.io/docs/expect#expectextendmatchers) erstellt haben, können Sie die `expect`-Typen auf ähnliche Weise wie folgt erweitern:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```