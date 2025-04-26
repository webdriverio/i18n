---
id: async-migration
title: Von Sync zu Async
---

Aufgrund von Änderungen in V8 hat das WebdriverIO-Team [angekündigt](https://webdriver.io/blog/2021/07/28/sync-api-deprecation), die synchrone Befehlsausführung bis April 2023 zu veralten. Das Team hat hart daran gearbeitet, den Übergang so einfach wie möglich zu gestalten. In diesem Leitfaden erklären wir, wie Sie Ihre Testsuite schrittweise von sync zu async migrieren können. Als Beispielprojekt verwenden wir das [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), aber der Ansatz ist bei allen anderen Projekten gleich.

## Promises in JavaScript

Der Grund, warum die synchrone Ausführung in WebdriverIO beliebt war, ist, dass sie die Komplexität der Arbeit mit Promises beseitigt. Besonders wenn Sie aus anderen Sprachen kommen, in denen dieses Konzept nicht auf diese Weise existiert, kann es anfangs verwirrend sein. Promises sind jedoch ein sehr leistungsfähiges Werkzeug für den Umgang mit asynchronem Code, und das heutige JavaScript macht es tatsächlich einfach, damit umzugehen. Wenn Sie noch nie mit Promises gearbeitet haben, empfehlen wir Ihnen, den [MDN-Referenzleitfaden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) zu lesen, da es den Rahmen sprengen würde, es hier zu erklären.

## Async-Übergang

Der WebdriverIO-Testrunner kann asynchrone und synchrone Ausführung innerhalb derselben Testsuite verarbeiten. Das bedeutet, dass Sie Ihre Tests und PageObjects schrittweise in Ihrem eigenen Tempo migrieren können. Das Cucumber Boilerplate hat beispielsweise [eine große Anzahl von Schrittdefinitionen](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) definiert, die Sie in Ihr Projekt kopieren können. Wir können eine Schrittdefinition oder eine Datei nach der anderen migrieren.

:::tip

WebdriverIO bietet ein [Codemod](https://github.com/webdriverio/codemod) an, mit dem Sie Ihren synchronen Code fast vollautomatisch in asynchronen Code umwandeln können. Führen Sie das Codemod wie in der Dokumentation beschrieben aus und verwenden Sie diesen Leitfaden für die manuelle Migration, falls erforderlich.

:::

In vielen Fällen besteht alles, was zu tun ist, darin, die Funktion, in der Sie WebdriverIO-Befehle aufrufen, mit `async` zu versehen und vor jeden Befehl ein `await` zu setzen. Wenn wir uns die erste zu transformierende Datei `clearInputField.ts` im Boilerplate-Projekt ansehen, transformieren wir von:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

zu:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

Das ist alles. Sie können den vollständigen Commit mit allen Umschreibungsbeispielen hier sehen:

#### Commits:

- _transform all step definitions_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Dieser Übergang ist unabhängig davon, ob Sie TypeScript verwenden oder nicht. Wenn Sie TypeScript verwenden, stellen Sie sicher, dass Sie schließlich die `types`-Eigenschaft in Ihrer `tsconfig.json` von `webdriverio/sync` zu `@wdio/globals/types` ändern. Stellen Sie auch sicher, dass Ihr Kompilierungsziel mindestens auf `ES2018` gesetzt ist.
:::

## Spezialfälle

Es gibt natürlich immer Spezialfälle, bei denen Sie etwas mehr Aufmerksamkeit benötigen.

### ForEach-Schleifen

Wenn Sie eine `forEach`-Schleife haben, z.B. um über Elemente zu iterieren, müssen Sie sicherstellen, dass der Iterator-Callback ordnungsgemäß asynchron behandelt wird, z.B.:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

Die Funktion, die wir in `forEach` übergeben, ist eine Iteratorfunktion. In einer synchronen Welt würde sie auf alle Elemente klicken, bevor sie weitermacht. Wenn wir dies in asynchronen Code umwandeln, müssen wir sicherstellen, dass wir auf jede Iteratorfunktion warten, bis sie die Ausführung beendet hat. Durch Hinzufügen von `async`/`await` geben diese Iteratorfunktionen ein Promise zurück, auf das wir warten müssen. Nun ist `forEach` nicht mehr ideal, um über die Elemente zu iterieren, da es nicht das Ergebnis der Iteratorfunktion zurückgibt, das Promise, auf das wir warten müssen. Daher müssen wir `forEach` durch `map` ersetzen, das dieses Promise zurückgibt. Die `map`-Methode sowie alle anderen Iterationsmethoden von Arrays wie `find`, `every`, `reduce` und mehr sind so implementiert, dass sie Promises innerhalb der Iteratorfunktionen respektieren und daher für die Verwendung in einem asynchronen Kontext vereinfacht sind. Das obige Beispiel sieht transformiert so aus:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Um beispielsweise alle `<h3 />`-Elemente abzurufen und deren Textinhalt zu erhalten, können Sie Folgendes ausführen:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

Wenn Ihnen das zu kompliziert erscheint, sollten Sie einfache for-Schleifen in Betracht ziehen, z.B.:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### WebdriverIO-Assertions

Wenn Sie den WebdriverIO-Assertion-Helper [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio) verwenden, stellen Sie sicher, dass Sie vor jeden `expect`-Aufruf ein `await` setzen, z.B.:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

muss transformiert werden zu:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### Synchrone PageObject-Methoden und asynchrone Tests

Wenn Sie PageObjects in Ihrer Testsuite synchron geschrieben haben, können Sie sie in asynchronen Tests nicht mehr verwenden. Wenn Sie eine PageObject-Methode sowohl in synchronen als auch in asynchronen Tests verwenden müssen, empfehlen wir, die Methode zu duplizieren und sie für beide Umgebungen anzubieten, z.B.:

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

Sobald Sie die Migration abgeschlossen haben, können Sie die synchronen PageObject-Methoden entfernen und die Benennung bereinigen.

Wenn Sie nicht zwei verschiedene Versionen einer PageObject-Methode pflegen möchten, können Sie auch das gesamte PageObject zu async migrieren und [`browser.call`](https://webdriver.io/docs/api/browser/call) verwenden, um die Methode in einer synchronen Umgebung auszuführen, z.B.:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

Der `call`-Befehl stellt sicher, dass die asynchrone `someMethod` aufgelöst wird, bevor zum nächsten Befehl übergegangen wird.

## Fazit

Wie Sie im [resultierenden Umschreibungs-PR](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) sehen können, ist die Komplexität dieser Umschreibung ziemlich einfach. Denken Sie daran, dass Sie eine Schrittdefinition nach der anderen umschreiben können. WebdriverIO ist perfekt in der Lage, synchrone und asynchrone Ausführung in einem einzigen Framework zu handhaben.