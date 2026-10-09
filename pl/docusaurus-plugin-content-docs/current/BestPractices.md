---
id: bestpractices
title: Najlepsze praktyki
description: "Pisz szybkie i odporne testy z WebdriverIO, używając stabilnych selektorów, mniejszej liczby zapytań o elementy, wbudowanych asercji i bez ręcznych pauz."
---

# Najlepsze praktyki

Ten przewodnik ma na celu przedstawienie naszych najlepszych praktyk, które pomogą Ci pisać wydajne i odporne testy.

## Używaj odpornych selektorów

Używając selektorów odpornych na zmiany w DOM, będziesz mieć mniej lub nawet wcale testów kończących się niepowodzeniem, gdy na przykład klasa zostanie usunięta z elementu.

Klasy mogą być przypisane do wielu elementów i należy ich unikać, jeśli to możliwe, chyba że celowo chcesz pobrać wszystkie elementy z daną klasą.

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

__Uwaga:__ Aby poznać wszystkie możliwe selektory obsługiwane przez WebdriverIO, sprawdź naszą stronę [Selektory](./Selectors.md).

## Ograniczaj liczbę zapytań o elementy

Za każdym razem, gdy używasz polecenia [`$`](https://webdriver.io/docs/api/browser/$) lub [`$$`](https://webdriver.io/docs/api/browser/$$) (dotyczy to również ich łączenia w łańcuchy), WebdriverIO próbuje zlokalizować element w DOM. Te zapytania są kosztowne, więc powinieneś starać się je jak najbardziej ograniczać.

Wysyła zapytania o trzy elementy.

```js
// 👎
await $('table').$('tr').$('td')
```

Wysyła zapytanie tylko o jeden element.

``` js
// 👍
await $('table tr td')
```

Łączenia w łańcuchy powinieneś używać tylko wtedy, gdy chcesz połączyć różne [strategie selektorów](https://webdriver.io/docs/selectors/#custom-selector-strategies).
W przykładzie używamy [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), czyli strategii pozwalającej wejść do shadow DOM elementu.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Preferuj lokalizowanie pojedynczego elementu zamiast wybierania go z listy

Nie zawsze jest to możliwe, ale używając pseudoklas CSS, takich jak [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child), możesz dopasowywać elementy na podstawie ich indeksów na liście dzieci ich rodziców.

Wysyła zapytanie o wszystkie wiersze tabeli.

```js
// 👎
await $$('table tr')[15]
```

Wysyła zapytanie o pojedynczy wiersz tabeli.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Używaj wbudowanych asercji

Nie używaj ręcznych asercji, które nie czekają automatycznie na dopasowanie wyników, ponieważ prowadzi to do niestabilnych testów.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Korzystając z wbudowanych asercji, WebdriverIO automatycznie poczeka, aż rzeczywisty wynik będzie zgodny z oczekiwanym, co skutkuje odpornymi testami.
Osiąga to poprzez automatyczne ponawianie asercji, dopóki nie zakończy się ona sukcesem lub nie upłynie limit czasu.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Leniwe ładowanie i łączenie obietnic w łańcuchy

WebdriverIO ma kilka sztuczek w zanadrzu, jeśli chodzi o pisanie czystego kodu, ponieważ potrafi leniwie ładować element, co pozwala łączyć obietnice w łańcuchy i ogranicza liczbę `await`. Pozwala to również przekazywać element jako ChainablePromiseElement zamiast Element i ułatwia korzystanie z obiektów stron (page objects).

Kiedy więc musisz używać `await`?
Zawsze powinieneś używać `await`, z wyjątkiem poleceń `$` i `$$`.

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

## Nie nadużywaj poleceń i asercji

Używając expect.toBeDisplayed, niejawnie czekasz również na istnienie elementu. Nie ma potrzeby używania poleceń waitForXXX, gdy masz już asercję, która robi to samo.

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

Nie ma potrzeby czekać, aż element zacznie istnieć lub zostanie wyświetlony, podczas interakcji z nim lub sprawdzania czegoś takiego jak jego tekst, chyba że element może być jawnie niewidoczny (na przykład opacity: 0) lub jawnie wyłączony (na przykład atrybut disabled) – w takim przypadku czekanie na wyświetlenie elementu ma sens.

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

## Testy dynamiczne

Używaj zmiennych środowiskowych do przechowywania dynamicznych danych testowych, np. tajnych danych uwierzytelniających, w swoim środowisku, zamiast zapisywać je na sztywno w teście. Więcej informacji na ten temat znajdziesz na stronie [Parametryzacja testów](parameterize-tests).

## Lintuj swój kod

Używając eslint do lintowania kodu, możesz potencjalnie wcześnie wychwycić błędy. Skorzystaj z naszych [reguł lintowania](https://www.npmjs.com/package/eslint-plugin-wdio), aby upewnić się, że niektóre z najlepszych praktyk są zawsze stosowane.

## Nie używaj pauz

Używanie polecenia pause może być kuszące, ale to zły pomysł, ponieważ nie jest odporne i na dłuższą metę spowoduje jedynie niestabilne testy.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // czekaj, aż przycisk wysyłania zostanie włączony
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Pętle asynchroniczne

Gdy masz kod asynchroniczny, który chcesz powtarzać, ważne jest, aby wiedzieć, że nie wszystkie pętle to umożliwiają.
Na przykład funkcja forEach tablicy nie obsługuje asynchronicznych wywołań zwrotnych, o czym można przeczytać na [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Uwaga:__ Nadal możesz ich używać, gdy nie potrzebujesz, aby operacja była asynchroniczna, jak pokazano w tym przykładzie: `console.log(await $$('h1').map((h1) => h1.getText()))`.

Poniżej znajduje się kilka przykładów tego, co to oznacza.

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

Czasami widzimy, jak nasi użytkownicy mapują dane, takie jak teksty lub wartości. Często nie jest to potrzebne i bywa sygnałem złego kodu (code smell). Sprawdź poniższe przykłady, aby zobaczyć, dlaczego tak jest.

```js
// 👎 zbyt skomplikowane, synchroniczna asercja, używaj wbudowanych asercji, aby zapobiec niestabilnym testom
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 zbyt skomplikowane
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 znajduje elementy po ich tekście, ale nie uwzględnia ich pozycji
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 używaj unikalnych identyfikatorów (często stosowanych dla niestandardowych elementów)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 nazwy dostępności (często stosowane dla natywnych elementów html)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Kolejną rzeczą, którą czasami widzimy, jest to, że proste rzeczy mają przesadnie skomplikowane rozwiązania.

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

## Równoległe wykonywanie kodu

Jeśli nie zależy Ci na kolejności wykonywania części kodu, możesz wykorzystać [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), aby przyspieszyć wykonanie.

__Uwaga:__ Ponieważ utrudnia to czytanie kodu, możesz go wyabstrahować za pomocą obiektu strony lub funkcji, choć powinieneś również zastanowić się, czy zysk wydajności jest wart utraty czytelności.

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

Po wyabstrahowaniu mogłoby to wyglądać mniej więcej tak jak poniżej, gdzie logika jest umieszczona w metodzie o nazwie submitWithDataOf, a dane są pobierane przez klasę Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```