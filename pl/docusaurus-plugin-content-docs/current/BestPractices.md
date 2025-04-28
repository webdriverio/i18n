---
id: bestpractices
title: Najlepsze Praktyki
---

# Najlepsze Praktyki

Ten przewodnik ma na celu przedstawienie najlepszych praktyk, które pomogą Ci pisać wydajne i odporne testy.

## Używaj odpornych selektorów

Używając selektorów, które są odporne na zmiany w DOM, będziesz mieć mniej lub nawet żadnych testów, które nie przechodzą, gdy na przykład klasa zostanie usunięta z elementu.

Klasy mogą być stosowane do wielu elementów i należy ich unikać, jeśli to możliwe, chyba że celowo chcesz pobrać wszystkie elementy z tą klasą.

```js
// 👎
await $('.button')
```

Wszystkie te selektory powinny zwracać pojedynczy element.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Note:__ Aby dowiedzieć się o wszystkich możliwych selektorach obsługiwanych przez WebdriverIO, sprawdź naszą stronę [Selectors](./Selectors.md).

## Ogranicz liczbę zapytań o elementy

Za każdym razem, gdy używasz komend [`$`](https://webdriver.io/docs/api/browser/$) lub [`$$`](https://webdriver.io/docs/api/browser/$$) (dotyczy to również łączenia ich), WebdriverIO próbuje zlokalizować element w DOM. Te zapytania są kosztowne, więc powinieneś starać się je ograniczyć tak bardzo, jak to możliwe.

Zapytania o trzy elementy.

```js
// 👎
await $('table').$('tr').$('td')
```

Zapytanie tylko o jeden element.

``` js
// 👍
await $('table tr td')
```

Jedynym przypadkiem, kiedy powinieneś używać łańcuchowania, jest łączenie różnych [strategii selektorów](https://webdriver.io/docs/selectors/#custom-selector-strategies).
W przykładzie używamy [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), które są strategią wchodzenia do shadow DOM elementu.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Preferuj lokalizowanie pojedynczego elementu zamiast pobierania go z listy

Nie zawsze jest to możliwe, ale używając pseudoklas CSS, takich jak [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child), możesz dopasować elementy na podstawie indeksów elementów w liście dzieci ich rodziców.

Zapytanie o wszystkie wiersze tabeli.

```js
// 👎
await $$('table tr')[15]
```

Zapytanie o pojedynczy wiersz tabeli.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Używaj wbudowanych asercji

Nie używaj ręcznych asercji, które nie czekają automatycznie na dopasowanie wyników, ponieważ spowoduje to niestabilne testy.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Korzystając z wbudowanych asercji, WebdriverIO automatycznie poczeka, aż rzeczywisty wynik będzie zgodny z oczekiwanym, co skutkuje odpornymi testami.
Osiąga to przez automatyczne ponawianie asercji, aż zostanie przekazana lub upłynie limit czasu.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Leniwe ładowanie i łańcuchowanie obietnic

WebdriverIO ma kilka sztuczek w zanadrzu, jeśli chodzi o pisanie czystego kodu, ponieważ może leninie ładować elementy, co pozwala na łańcuchowanie obietnic i zmniejszenie ilości użycia `await`. Pozwala to również na przekazanie elementu jako ChainablePromiseElement zamiast Element i łatwiejsze użycie z obiektami stron.

Kiedy więc musisz używać `await`?
Zawsze powinieneś używać `await` z wyjątkiem komend `$` i `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// lub
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// lub
await $('div').$('button').click()
```

## Nie nadużywaj poleceń i asercji

Gdy używasz expect.toBeDisplayed, niejawnie czekasz również na istnienie elementu. Nie ma potrzeby używania poleceń waitForXXX, gdy już masz asercję wykonującą to samo.

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

Nie ma potrzeby czekać na istnienie lub wyświetlenie elementu podczas interakcji lub asercji czegoś takiego jak jego tekst, chyba że element może być wyraźnie niewidoczny (na przykład opacity: 0) lub może być wyraźnie wyłączony (na przykład atrybut disabled), w takim przypadku czekanie na wyświetlenie elementu ma sens.

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

## Dynamiczne Testy

Używaj zmiennych środowiskowych do przechowywania dynamicznych danych testowych, np. tajnych danych uwierzytelniających, w swoim środowisku, zamiast kodować je na stałe w teście. Przejdź do strony [Parameterize Tests](parameterize-tests), aby uzyskać więcej informacji na ten temat.

## Lintuj swój kod

Używając eslint do lintowania kodu, możesz potencjalnie wcześnie wykryć błędy; użyj naszych [zasad lintowania](https://www.npmjs.com/package/eslint-plugin-wdio), aby upewnić się, że niektóre z najlepszych praktyk są zawsze stosowane.

## Nie używaj pauzy

Może być kuszące użycie komendy pause, ale używanie jej to zły pomysł, ponieważ nie jest odporna i tylko spowoduje niestabilne testy w dłuższej perspektywie.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // czekaj na włączenie przycisku submit
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Asynchroniczne pętle

Gdy masz kod asynchroniczny, który chcesz powtórzyć, ważne jest, aby wiedzieć, że nie wszystkie pętle mogą to zrobić.
Na przykład funkcja forEach tablicy nie pozwala na asynchroniczne wywołania zwrotne, co można przeczytać na [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Note:__ Nadal możesz ich używać, gdy nie potrzebujesz, aby operacja była synchroniczna, jak pokazano w tym przykładzie `console.log(await $$('h1').map((h1) => h1.getText()))`.

Poniżej znajduje się kilka przykładów tego, co to oznacza.

Poniższe nie zadziała, ponieważ asynchroniczne wywołania zwrotne nie są obsługiwane.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Poniższe zadziała.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Upraszczaj

Czasami widzimy, jak nasi użytkownicy mapują dane, takie jak tekst lub wartości. Często nie jest to potrzebne i często jest zapachem kodu. Sprawdź poniższe przykłady, dlaczego tak jest.

```js
// 👎 zbyt złożone, synchroniczna asercja, użyj wbudowanych asercji, aby zapobiec niestabilnym testom
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 zbyt złożone
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 znajduje elementy według ich tekstu, ale nie bierze pod uwagę pozycji elementów
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 użyj unikalnych identyfikatorów (często używanych dla niestandardowych elementów)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 nazwy dostępności (często używane dla natywnych elementów html)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Inną rzeczą, którą czasami widzimy, jest to, że proste rzeczy mają nadmiernie skomplikowane rozwiązanie.

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

## Wykonywanie kodu równolegle

Jeśli nie dbasz o kolejność, w jakiej uruchamiany jest kod, możesz wykorzystać [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), aby przyspieszyć wykonanie.

__Note:__ Ponieważ to sprawia, że kod jest trudniejszy do odczytania, możesz to wyabstrahować za pomocą obiektu strony lub funkcji, chociaż powinieneś również zastanowić się, czy korzyść wydajnościowa jest warta kosztu czytelności.

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

Po abstrahowaniu mogłoby to wyglądać jak poniżej, gdzie logika jest umieszczona w metodzie o nazwie submitWithDataOf, a dane są pobierane przez klasę Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```