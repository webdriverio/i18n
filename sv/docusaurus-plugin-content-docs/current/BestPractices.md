---
id: bestpractices
title: Bästa praxis
description: "Skriv snabba och robusta tester med WebdriverIO genom att använda stabila selektorer, färre elementförfrågningar, inbyggda assertions och inga manuella pauser."
---

# Bästa praxis

Den här guiden syftar till att dela med oss av vår bästa praxis som hjälper dig att skriva prestandaeffektiva och robusta tester.

## Använd robusta selektorer

Genom att använda selektorer som är robusta mot förändringar i DOM:en får du färre eller till och med inga tester som misslyckas när till exempel en klass tas bort från ett element.

Klasser kan tillämpas på flera element och bör undvikas om möjligt, såvida du inte avsiktligt vill hämta alla element med den klassen.

```js
// 👎
await $('.button')
```

Alla dessa selektorer bör returnera ett enda element.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Obs:__ För att ta reda på alla möjliga selektorer som WebdriverIO stöder, kolla in vår sida om [Selektorer](./Selectors.md).

## Begränsa antalet elementförfrågningar

Varje gång du använder kommandot [`$`](https://webdriver.io/docs/api/browser/$) eller [`$$`](https://webdriver.io/docs/api/browser/$$) (detta inkluderar när de kedjas) försöker WebdriverIO hitta elementet i DOM:en. Dessa förfrågningar är kostsamma, så du bör försöka begränsa dem så mycket som möjligt.

Söker efter tre element.

```js
// 👎
await $('table').$('tr').$('td')
```

Söker efter endast ett element.

``` js
// 👍
await $('table tr td')
```

Det enda tillfället du bör använda kedjning är när du vill kombinera olika [selektorstrategier](https://webdriver.io/docs/selectors/#custom-selector-strategies).
I exemplet använder vi [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), vilket är en strategi för att gå in i ett elements shadow DOM.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Föredra att hitta ett enskilt element istället för att ta ett från en lista

Det är inte alltid möjligt att göra detta, men med hjälp av CSS-pseudoklasser som [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) kan du matcha element baserat på deras index i föräldraelementets lista av barn.

Söker efter alla tabellrader.

```js
// 👎
await $$('table tr')[15]
```

Söker efter en enda tabellrad.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Använd de inbyggda assertions

Använd inte manuella assertions som inte automatiskt väntar på att resultaten ska matcha, eftersom detta leder till instabila (flaky) tester.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Genom att använda de inbyggda assertions väntar WebdriverIO automatiskt på att det faktiska resultatet ska matcha det förväntade resultatet, vilket ger robusta tester.
Detta uppnås genom att assertion automatiskt försöks igen tills den lyckas eller når en timeout.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lazy loading och kedjning av promises

WebdriverIO har några knep i rockärmen när det gäller att skriva ren kod, eftersom det kan lazy-loada elementet, vilket gör att du kan kedja dina promises och minska antalet `await`. Detta gör det också möjligt att skicka elementet som ett ChainablePromiseElement istället för ett Element, vilket underlättar användningen med page objects.

Så när måste du använda `await`?
Du bör alltid använda `await`, med undantag för kommandona `$` och `$$`.

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

## Överanvänd inte kommandon och assertions

När du använder expect.toBeDisplayed väntar du implicit också på att elementet ska existera. Det finns inget behov av att använda waitForXXX-kommandona när du redan har en assertion som gör samma sak.

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

Det finns inget behov av att vänta på att ett element ska existera eller visas när du interagerar med det eller gör en assertion om till exempel dess text, såvida inte elementet uttryckligen kan vara osynligt (till exempel opacity: 0) eller uttryckligen kan vara inaktiverat (till exempel med attributet disabled). I sådana fall är det rimligt att vänta på att elementet ska visas.

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

## Dynamiska tester

Använd miljövariabler för att lagra dynamisk testdata, t.ex. hemliga inloggningsuppgifter, i din miljö istället för att hårdkoda dem i testet. Gå till sidan [Parametrisera tester](parameterize-tests) för mer information om detta ämne.

## Linta din kod

Genom att använda eslint för att linta din kod kan du potentiellt fånga fel tidigt. Använd våra [lintingregler](https://www.npmjs.com/package/eslint-plugin-wdio) för att säkerställa att en del av den bästa praxisen alltid tillämpas.

## Pausa inte

Det kan vara frestande att använda kommandot pause, men det är en dålig idé eftersom det inte är robust och i längden bara leder till instabila tester.

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

## Asynkrona loopar

När du har asynkron kod som du vill upprepa är det viktigt att veta att inte alla loopar klarar detta.
Till exempel tillåter inte Arrays forEach-funktion asynkrona callbacks, vilket du kan läsa om på [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Obs:__ Du kan fortfarande använda dessa när du inte behöver att operationen är asynkron, som visas i detta exempel `console.log(await $$('h1').map((h1) => h1.getText()))`.

Nedan följer några exempel på vad detta innebär.

Följande fungerar inte eftersom asynkrona callbacks inte stöds.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Följande fungerar.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Håll det enkelt

Ibland ser vi att våra användare mappar data som text eller värden. Detta behövs ofta inte och är ofta en code smell. Se exemplen nedan för varför det är så.

```js
// 👎 för komplext, synkron assertion, använd de inbyggda assertions för att förhindra instabila tester
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 för komplext
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 hittar element utifrån deras text men tar inte hänsyn till elementens position
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 använd unika identifierare (används ofta för anpassade element)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 tillgänglighetsnamn (används ofta för inbyggda html-element)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

En annan sak vi ibland ser är att enkla saker får en överkomplicerad lösning.

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

## Köra kod parallellt

Om du inte bryr dig om i vilken ordning viss kod körs kan du använda [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) för att snabba upp exekveringen.

__Obs:__ Eftersom detta gör koden svårare att läsa kan du abstrahera bort det med hjälp av ett page object eller en funktion, men du bör också fråga dig om prestandavinsten är värd kostnaden i läsbarhet.

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

Om det abstraheras bort skulle det kunna se ut ungefär som nedan, där logiken placeras i en metod som heter submitWithDataOf och datan hämtas via klassen Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```