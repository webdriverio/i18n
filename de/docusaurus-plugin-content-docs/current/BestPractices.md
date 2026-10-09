---
id: bestpractices
title: Bewährte Praktiken
description: "Schreiben Sie schnelle, robuste Tests mit WebdriverIO, indem Sie stabile Selektoren, weniger Elementabfragen, integrierte Assertions und keine manuellen Pausen verwenden."
---

# Bewährte Praktiken

Dieser Leitfaden soll unsere bewährten Praktiken vorstellen, die Ihnen helfen, performante und robuste Tests zu schreiben.

## Verwenden Sie robuste Selektoren

Wenn Sie Selektoren verwenden, die robust gegenüber Änderungen im DOM sind, schlagen weniger oder sogar gar keine Tests fehl, wenn beispielsweise eine Klasse von einem Element entfernt wird.

Klassen können auf mehrere Elemente angewendet werden und sollten nach Möglichkeit vermieden werden, es sei denn, Sie möchten bewusst alle Elemente mit dieser Klasse abrufen.

```js
// 👎
await $('.button')
```

Alle diese Selektoren sollten ein einzelnes Element zurückgeben.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Hinweis:__ Um alle möglichen Selektoren herauszufinden, die WebdriverIO unterstützt, besuchen Sie unsere Seite [Selektoren](./Selectors.md).

## Begrenzen Sie die Anzahl der Elementabfragen

Jedes Mal, wenn Sie den Befehl [`$`](https://webdriver.io/docs/api/browser/$) oder [`$$`](https://webdriver.io/docs/api/browser/$$) verwenden (dies schließt deren Verkettung ein), versucht WebdriverIO, das Element im DOM zu finden. Diese Abfragen sind aufwendig, daher sollten Sie versuchen, sie so weit wie möglich zu begrenzen.

Fragt drei Elemente ab.

```js
// 👎
await $('table').$('tr').$('td')
```

Fragt nur ein Element ab.

``` js
// 👍
await $('table tr td')
```

Verkettung sollten Sie nur dann verwenden, wenn Sie verschiedene [Selektor-Strategien](https://webdriver.io/docs/selectors/#custom-selector-strategies) kombinieren möchten.
Im Beispiel verwenden wir die [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), eine Strategie, um in das Shadow DOM eines Elements zu gelangen.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Bevorzugen Sie das Auffinden eines einzelnen Elements, anstatt eines aus einer Liste zu nehmen

Dies ist nicht immer möglich, aber mit CSS-Pseudoklassen wie [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) können Sie Elemente anhand ihres Index in der Liste der Kindelemente ihres Elternelements abgleichen.

Fragt alle Tabellenzeilen ab.

```js
// 👎
await $$('table tr')[15]
```

Fragt eine einzelne Tabellenzeile ab.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Verwenden Sie die integrierten Assertions

Verwenden Sie keine manuellen Assertions, die nicht automatisch warten, bis die Ergebnisse übereinstimmen, da dies zu instabilen (flaky) Tests führt.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Durch die Verwendung der integrierten Assertions wartet WebdriverIO automatisch, bis das tatsächliche Ergebnis mit dem erwarteten Ergebnis übereinstimmt, was zu robusten Tests führt.
Dies wird erreicht, indem die Assertion automatisch wiederholt wird, bis sie erfolgreich ist oder ein Timeout eintritt.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lazy Loading und Promise-Verkettung

WebdriverIO hat einige Tricks auf Lager, wenn es um das Schreiben von sauberem Code geht, da es das Element per Lazy Loading laden kann. Dadurch können Sie Ihre Promises verketten und die Anzahl der `await` reduzieren. Außerdem können Sie das Element als ChainablePromiseElement anstelle eines Element übergeben, was die Verwendung mit Page Objects erleichtert.

Wann müssen Sie also `await` verwenden?
Sie sollten immer `await` verwenden, mit Ausnahme der Befehle `$` und `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// or
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// or
await $('div').$('button').click()
```

## Verwenden Sie Befehle und Assertions nicht übermäßig

Wenn Sie expect.toBeDisplayed verwenden, warten Sie implizit auch darauf, dass das Element existiert. Es ist nicht nötig, die waitForXXX-Befehle zu verwenden, wenn Sie bereits eine Assertion haben, die dasselbe tut.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

Es ist nicht nötig, darauf zu warten, dass ein Element existiert oder angezeigt wird, wenn Sie mit ihm interagieren oder etwas wie seinen Text prüfen – es sei denn, das Element kann explizit unsichtbar sein (zum Beispiel opacity: 0) oder explizit deaktiviert sein (zum Beispiel durch das disabled-Attribut). In diesem Fall ist es sinnvoll, darauf zu warten, dass das Element angezeigt wird.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## Dynamische Tests

Verwenden Sie Umgebungsvariablen, um dynamische Testdaten, z. B. geheime Zugangsdaten, in Ihrer Umgebung zu speichern, anstatt sie fest im Test zu kodieren. Weitere Informationen zu diesem Thema finden Sie auf der Seite [Tests parametrisieren](parameterize-tests).

## Linten Sie Ihren Code

Wenn Sie eslint zum Linten Ihres Codes verwenden, können Sie Fehler potenziell frühzeitig erkennen. Verwenden Sie unsere [Linting-Regeln](https://www.npmjs.com/package/eslint-plugin-wdio), um sicherzustellen, dass einige der bewährten Praktiken immer angewendet werden.

## Pausieren Sie nicht

Es mag verlockend sein, den pause-Befehl zu verwenden, aber das ist eine schlechte Idee, da er nicht robust ist und auf lange Sicht nur zu instabilen Tests führt.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Asynchrone Schleifen

Wenn Sie asynchronen Code haben, den Sie wiederholen möchten, ist es wichtig zu wissen, dass nicht alle Schleifen dies können.
Zum Beispiel erlaubt die forEach-Funktion von Arrays keine asynchronen Callbacks, wie auf [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) nachzulesen ist.

__Hinweis:__ Sie können diese dennoch verwenden, wenn die Operation nicht asynchron sein muss, wie in diesem Beispiel gezeigt: `console.log(await $$('h1').map((h1) => h1.getText()))`.

Im Folgenden einige Beispiele, was das bedeutet.

Folgendes funktioniert nicht, da asynchrone Callbacks nicht unterstützt werden.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Folgendes funktioniert.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Halten Sie es einfach

Manchmal sehen wir, dass unsere Benutzer Daten wie Texte oder Werte mappen. Dies ist oft nicht nötig und häufig ein Code Smell. Sehen Sie sich die folgenden Beispiele an, um zu verstehen, warum das so ist.

```js
// 👎 zu komplex, synchrone Assertion, verwenden Sie die integrierten Assertions, um instabile Tests zu vermeiden
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 zu komplex
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 findet Elemente anhand ihres Textes, berücksichtigt aber nicht die Position der Elemente
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 eindeutige Bezeichner verwenden (oft für Custom Elements verwendet)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 Barrierefreiheitsnamen (oft für native HTML-Elemente verwendet)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Eine weitere Sache, die wir manchmal sehen, ist, dass einfache Dinge eine übermäßig komplizierte Lösung haben.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## Code parallel ausführen

Wenn Ihnen die Reihenfolge, in der bestimmter Code ausgeführt wird, egal ist, können Sie [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) verwenden, um die Ausführung zu beschleunigen.

__Hinweis:__ Da dies den Code schwerer lesbar macht, könnten Sie dies mithilfe eines Page Objects oder einer Funktion abstrahieren. Sie sollten sich jedoch auch fragen, ob der Leistungsgewinn die Einbußen bei der Lesbarkeit wert ist.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

Abstrahiert könnte es etwa wie unten aussehen, wobei die Logik in einer Methode namens submitWithDataOf steckt und die Daten von der Klasse Person abgerufen werden.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```