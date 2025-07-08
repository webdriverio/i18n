---
id: bestpractices
title: Najlepsze Praktyki
---

# Najlepsze Praktyki

Ten przewodnik ma na celu podzielenie się najlepszymi praktykami, które pomogą Ci pisać wydajne i odporne testy.

## Używaj odpornych selektorów

Używając selektorów, które są odporne na zmiany w DOM, będziesz mieć mniej lub nawet wcale testów, które zawodzą, gdy na przykład klasa zostanie usunięta z elementu.

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

__Uwaga:__ Aby dowiedzieć się o wszystkich możliwych selektorach obsługiwanych przez WebdriverIO, sprawdź naszą stronę [Selektory](./Selectors.md).

## Ogranicz liczbę zapytań o elementy

Za każdym razem, gdy używasz komendy [`$`](https://webdriver.io/docs/api/browser/$) lub [`$$`](https://webdriver.io/docs/api/browser/$$) (dotyczy to również ich łączenia), WebdriverIO próbuje zlokalizować element w DOM. Te zapytania są kosztowne, więc powinieneś starać się je ograniczyć.

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

Jedynym przypadkiem, w którym powinieneś używać łańcuchowania, jest łączenie różnych [strategii selektorów](https://webdriver.io/docs/selectors/#custom-selector-strategies).
W przykładzie używamy [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), czyli strategii wejścia do shadow DOM elementu.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Preferuj lokalizowanie pojedynczego elementu zamiast pobierania go z listy

Nie zawsze jest to możliwe, ale używając pseudoklas CSS jak [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child), możesz dopasować elementy na podstawie indeksów elementów na liście potomków ich rodziców.

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

Używając wbudowanych asercji, WebdriverIO automatycznie poczeka, aż rzeczywisty wynik będzie zgodny z oczekiwanym wynikiem, co skutkuje odpornymi testami.
Osiąga to poprzez automatyczne ponawianie asercji, aż zostanie ona zaliczona lub nastąpi przekroczenie limitu czasu.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Leniwe ładowanie i łańcuchowanie obietnic

WebdriverIO ma kilka sztuczek w rękawie, jeśli chodzi o pisanie czystego kodu, ponieważ może leniwie ładować element, co pozwala łączyć obietnice i redukować ilość `await`. Pozwala to również na przekazanie elementu jako ChainablePromiseElement zamiast Element, co ułatwia korzystanie z obiektów stron.

Kiedy więc należy używać `await`?
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

## Nie nadużywaj komend i asercji

Używając expect.toBeDisplayed, niejawnie czekasz również na istnienie elementu. Nie ma potrzeby używania komend waitForXXX, gdy masz już asercję wykonującą to samo.

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

Nie ma potrzeby czekać na istnienie elementu lub jego wyświetlenie podczas interakcji lub podczas sprawdzania czegoś takiego jak jego tekst, chyba że element może być wyraźnie niewidoczny (na przykład opacity: 0) lub może być wyraźnie wyłączony (atrybut disabled), w takim przypadku czekanie na wyświetlenie elementu ma sens.

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

## Dynamiczne testy

Używaj zmiennych środowiskowych do przechowywania dynamicznych danych testowych, np. tajnych danych uwierzytelniających, w swoim środowisku, zamiast umieszczać je bezpośrednio w teście. Przejdź do strony [Parametryzacja testów](parameterize-tests), aby uzyskać więcej informacji na ten temat.

## Lintuj swój kod

Używając eslint do lintowania kodu, możesz potencjalnie wcześnie wykryć błędy. Używaj naszych [reguł lintowania](https://www.npmjs.com/package/eslint-plugin-wdio), aby upewnić się, że niektóre z najlepszych praktyk są zawsze stosowane.

## Nie używaj pauzy

Może być kuszące użycie komendy pause, ale jej stosowanie to zły pomysł, ponieważ nie jest ona odporna i w dłuższej perspektywie spowoduje niestabilne testy.

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

## Pętle asynchroniczne

Gdy masz kod asynchroniczny, który chcesz powtarzać, ważne jest, aby wiedzieć, że nie wszystkie pętle mogą to zrobić.
Na przykład funkcja forEach tablicy nie pozwala na asynchroniczne wywołania zwrotne, jak można przeczytać na [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Uwaga:__ Nadal możesz ich używać, gdy nie potrzebujesz, aby operacja była asynchroniczna, jak pokazano w tym przykładzie `console.log(await $$('h1').map((h1) => h1.getText()))`.

Poniżej znajdują się przykłady, co to oznacza.

Poniższy kod nie zadziała, ponieważ asynchroniczne wywołania zwrotne nie są obsługiwane.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Poniższy kod zadziała.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Zachowaj prostotę

Czasami widzimy, że nasi użytkownicy mapują dane takie jak tekst lub wartości. Często nie jest to potrzebne i jest oznaką problemów w kodzie. Sprawdź poniższe przykłady, dlaczego tak jest.

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

// 👎 znajduje elementy po ich tekście, ale nie bierze pod uwagę pozycji elementów
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 używaj unikalnych identyfikatorów (często używanych dla niestandardowych elementów)
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

Jeśli nie zależy Ci na kolejności, w jakiej wykonywany jest kod, możesz wykorzystać [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), aby przyspieszyć wykonanie.

__Uwaga:__ Ponieważ sprawia to, że kod jest trudniejszy do odczytania, możesz to ukryć, używając obiektu strony lub funkcji, chociaż powinieneś również zastanowić się, czy korzyść w wydajności jest warta kosztu czytelności.

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

Po ukryciu mogłoby to wyglądać tak jak poniżej, gdzie logika jest umieszczona w metodzie o nazwie submitWithDataOf, a dane są pobierane przez klasę Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```