---
id: async-migration
title: Von Sync zu Async
description: "Migrieren Sie WebdriverIO-Tests Schritt für Schritt von synchroner zu asynchroner Befehlsausführung, einschließlich forEach-Schleifen, Assertions und synchroner Page Objects."
---

Aufgrund von Änderungen in V8 hat das WebdriverIO-Team [angekündigt](https://webdriver.io/blog/2021/07/28/sync-api-deprecation), die synchrone Befehlsausführung bis April 2023 als veraltet zu markieren. Das Team hat hart daran gearbeitet, den Übergang so einfach wie möglich zu gestalten. In diesem Leitfaden erklären wir, wie Sie Ihre Testsuite schrittweise von synchron auf asynchron migrieren können. Als Beispielprojekt verwenden wir das [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), aber der Ansatz ist auch bei allen anderen Projekten derselbe.

## Promises in JavaScript

Der Grund, warum die synchrone Ausführung in WebdriverIO beliebt war, ist, dass sie die Komplexität im Umgang mit Promises beseitigt. Besonders wenn Sie aus anderen Sprachen kommen, in denen dieses Konzept so nicht existiert, kann es anfangs verwirrend sein. Promises sind jedoch ein sehr mächtiges Werkzeug für den Umgang mit asynchronem Code, und das heutige JavaScript macht den Umgang damit tatsächlich einfach. Wenn Sie noch nie mit Promises gearbeitet haben, empfehlen wir Ihnen, den [MDN-Referenzleitfaden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) dazu anzusehen, da es den Rahmen sprengen würde, dies hier zu erklären.

## Async-Übergang

Der WebdriverIO-Testrunner kann asynchrone und synchrone Ausführung innerhalb derselben Testsuite verarbeiten. Das bedeutet, dass Sie Ihre Tests und PageObjects in Ihrem eigenen Tempo Schritt für Schritt migrieren können. Zum Beispiel hat das Cucumber Boilerplate [eine große Anzahl von Step-Definitionen](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) definiert, die Sie in Ihr Projekt kopieren können. Wir können jeweils eine Step-Definition oder eine Datei nach der anderen migrieren.

:::tip

WebdriverIO bietet einen [Codemod](https://github.com/webdriverio/codemod) an, mit dem Sie Ihren synchronen Code nahezu vollautomatisch in asynchronen Code umwandeln können. Führen Sie zuerst den Codemod wie in der Dokumentation beschrieben aus und verwenden Sie diesen Leitfaden bei Bedarf für die manuelle Migration.

:::

In vielen Fällen ist alles, was zu tun ist, die Funktion, in der Sie WebdriverIO-Befehle aufrufen, `async` zu machen und vor jedem Befehl ein `await` hinzuzufügen. Betrachten wir die erste zu transformierende Datei `clearInputField.ts` im Boilerplate-Projekt, so transformieren wir von:

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

Das war's. Den vollständigen Commit mit allen Umschreibungsbeispielen finden Sie hier:

#### Commits:

- _alle Step-Definitionen transformieren_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Dieser Übergang ist unabhängig davon, ob Sie TypeScript verwenden oder nicht. Wenn Sie TypeScript verwenden, stellen Sie lediglich sicher, dass Sie schließlich die Eigenschaft `types` in Ihrer `tsconfig.json` von `webdriverio/sync` auf `@wdio/globals/types` ändern. Stellen Sie außerdem sicher, dass Ihr Kompilierungsziel mindestens auf `ES2018` gesetzt ist.
:::

## Sonderfälle

Es gibt natürlich immer Sonderfälle, bei denen Sie etwas mehr Aufmerksamkeit walten lassen müssen.

### ForEach-Schleifen

Wenn Sie eine `forEach`-Schleife haben, z. B. um über Elemente zu iterieren, müssen Sie sicherstellen, dass der Iterator-Callback ordnungsgemäß asynchron behandelt wird, z. B.:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

Die Funktion, die wir an `forEach` übergeben, ist eine Iterator-Funktion. In einer synchronen Welt würde sie auf alle Elemente klicken, bevor es weitergeht. Wenn wir dies in asynchronen Code umwandeln, müssen wir sicherstellen, dass wir warten, bis jede Iterator-Funktion ihre Ausführung beendet hat. Durch das Hinzufügen von `async`/`await` geben diese Iterator-Funktionen ein Promise zurück, das wir auflösen müssen. Nun ist `forEach` nicht mehr ideal, um über die Elemente zu iterieren, da es das Ergebnis der Iterator-Funktion, also das Promise, auf das wir warten müssen, nicht zurückgibt. Daher müssen wir `forEach` durch `map` ersetzen, das dieses Promise zurückgibt. `map` sowie alle anderen Iterator-Methoden von Arrays wie `find`, `every`, `reduce` und weitere sind so implementiert, dass sie Promises innerhalb der Iterator-Funktionen berücksichtigen, und sind daher für die Verwendung in einem asynchronen Kontext vereinfacht. Das obige Beispiel sieht transformiert so aus:

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
 * gibt zurück:
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

Wenn Ihnen das zu kompliziert erscheint, sollten Sie die Verwendung einfacher for-Schleifen in Betracht ziehen, z. B.:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` gibt ein [`ElementArray`](/docs/api/browser/$$) zurück. Sie können es auch iterieren, bevor Sie auf die Liste warten:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` wirft einen Fehler, bis die Liste aufgelöst ist, da eine synchrone Schleife nicht auf die Abfrage warten kann. Warten Sie zuerst auf die Liste, wie im obigen Beispiel, oder verwenden Sie `for await`.

### WebdriverIO-Assertions

Wenn Sie den WebdriverIO-Assertion-Helfer [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio) verwenden, stellen Sie sicher, dass Sie vor jeden `expect`-Aufruf ein `await` setzen, z. B.:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

muss transformiert werden zu:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### Synchrone PageObject-Methoden und asynchrone Tests

Wenn Sie PageObjects in Ihrer Testsuite synchron geschrieben haben, können Sie diese in asynchronen Tests nicht mehr verwenden. Wenn Sie eine PageObject-Methode sowohl in synchronen als auch in asynchronen Tests verwenden müssen, empfehlen wir, die Methode zu duplizieren und sie für beide Umgebungen anzubieten, z. B.:

```js
class MyPageObject extends Page {
    /**
     * Elemente definieren
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // synchroner Code
    }

    someMethodAsync () {
        // asynchrone Version von MyPageObject.someMethod()
    }
}
```

Sobald Sie die Migration abgeschlossen haben, können Sie die synchronen PageObject-Methoden entfernen und die Benennung bereinigen.

Wenn Sie nicht zwei verschiedene Versionen einer PageObject-Methode pflegen möchten, können Sie auch das gesamte PageObject auf async migrieren und [`browser.call`](https://webdriver.io/docs/api/browser/call) verwenden, um die Methode in einer synchronen Umgebung auszuführen, z. B.:

```js
// vorher:
// MyPageObject.someMethod()
// nachher:
browser.call(() => MyPageObject.someMethod())
```

Der `call`-Befehl stellt sicher, dass die asynchrone `someMethod` aufgelöst wird, bevor mit dem nächsten Befehl fortgefahren wird.

## Fazit

Wie Sie im [resultierenden Rewrite-PR](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) sehen können, ist die Komplexität dieser Umschreibung recht gering. Denken Sie daran, dass Sie jeweils eine Step-Definition nach der anderen umschreiben können. WebdriverIO ist problemlos in der Lage, synchrone und asynchrone Ausführung in einem einzigen Framework zu verarbeiten.