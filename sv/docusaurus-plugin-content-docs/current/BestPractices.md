---
id: bestpractices
title: Bästa praxis
---

# Bästa praxis

Denna guide syftar till att dela våra bästa metoder som hjälper dig att skriva högpresterande och robusta tester.

## Använd robusta selektorer

Genom att använda selektorer som är motståndskraftiga mot förändringar i DOM:en kommer du att ha färre eller inga tester som misslyckas när till exempel en klass tas bort från ett element.

Klasser kan tillämpas på flera element och bör undvikas om möjligt, såvida du inte medvetet vill hämta alla element med den klassen.

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

__Obs:__ För att ta reda på alla möjliga selektorer som WebdriverIO stödjer, kolla vår [Selectors](./Selectors.md) sida.

## Begränsa antalet elementförfrågningar

Varje gång du använder [`$`](https://webdriver.io/docs/api/browser/$) eller [`$$`](https://webdriver.io/docs/api/browser/$$) kommandot (detta inkluderar kedjesammansättning), försöker WebdriverIO lokalisera elementet i DOM:en. Dessa förfrågningar är dyra så du bör försöka begränsa dem så mycket som möjligt.

Frågar efter tre element.

```js
// 👎
await $('table').$('tr').$('td')
```

Frågar endast efter ett element.

``` js
// 👍
await $('table tr td')
```

Den enda gången du bör använda kedjning är när du vill kombinera olika [selektor-strategier](https://webdriver.io/docs/selectors/#custom-selector-strategies).
I exemplet använder vi [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), vilket är en strategi för att gå in i shadow DOM för ett element.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Föredra att lokalisera ett enskilt element istället för att ta ett från en lista

Det är inte alltid möjligt att göra detta, men med CSS pseudo-klasser som [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) kan du matcha element baserat på indexen för elementen i föräldrarnas barnlista.

Frågar efter alla tabellrader.

```js
// 👎
await $$('table tr')[15]
```

Frågar efter en enskild tabellrad.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Använd de inbyggda kontrollerna

Använd inte manuella kontroller som inte automatiskt väntar på att resultaten ska matcha eftersom detta kommer att orsaka instabila tester.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Genom att använda de inbyggda kontrollerna kommer WebdriverIO automatiskt att vänta på att det faktiska resultatet ska matcha det förväntade resultatet, vilket resulterar i robusta tester.
Den uppnår detta genom att automatiskt försöka igen med kontrollen tills den passerar eller tiden går ut.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lat laddning och löfteskedjning

WebdriverIO har några trick när det gäller att skriva ren kod eftersom det kan lata ladda elementet, vilket gör att du kan kedja dina löften och minskar mängden `await`. Detta gör det också möjligt för dig att skicka elementet som ett ChainablePromiseElement istället för ett Element och för enklare användning med sidobjekt.

Så när måste du använda `await`?
Du bör alltid använda `await` med undantag för `$` och `$$` kommandot.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// eller
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// eller
await $('div').$('button').click()
```

## Överanvänd inte kommandon och kontroller

När du använder expect.toBeDisplayed väntar du implicit också på att elementet ska finnas. Det finns inget behov av att använda waitForXXX-kommandon när du redan har en kontroll som gör samma sak.

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

Inget behov av att vänta på att ett element ska existera eller visas när du interagerar eller när du kontrollerar något som dess text, såvida elementet inte uttryckligen kan vara osynligt (opacity: 0 till exempel) eller uttryckligen kan vara inaktiverat (disabled attribute till exempel), i vilket fall det är rimligt att vänta på att elementet ska visas.

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

Använd miljövariabler för att lagra dynamisk testdata, t.ex. hemliga autentiseringsuppgifter, i din miljö istället för att hårdkoda dem i testet. Gå till sidan [Parameterize Tests](parameterize-tests) för mer information om detta ämne.

## Linta din kod

Genom att använda eslint för att linta din kod kan du potentiellt upptäcka fel tidigt, använd våra [linting-regler](https://www.npmjs.com/package/eslint-plugin-wdio) för att säkerställa att vissa av de bästa metoderna alltid tillämpas.

## Pausa inte

Det kan vara frestande att använda pauskommandot, men att använda detta är en dålig idé eftersom det inte är robust och bara kommer att orsaka instabila tester på lång sikt.

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

När du har asynkron kod som du vill upprepa, är det viktigt att veta att inte alla loopar kan göra detta.
Till exempel tillåter inte Array's forEach-funktion asynkrona callbacks som kan läsas på [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Obs:__ Du kan fortfarande använda dessa när du inte behöver att operationen ska vara asynkron som visas i detta exempel `console.log(await $$('h1').map((h1) => h1.getText()))`.

Nedan finns några exempel på vad detta innebär.

Följande kommer inte att fungera eftersom asynkrona callbacks inte stöds.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Följande kommer att fungera.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Håll det enkelt

Ibland ser vi att våra användare mappar data som text eller värden. Detta behövs ofta inte och är ofta ett tecken på kod-lukt, kolla exemplen nedan varför detta är fallet.

```js
// 👎 för komplex, synkron kontroll, använd de inbyggda kontrollerna för att förhindra instabila tester
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 för komplex
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 hittar element efter deras text men tar inte hänsyn till elementens position
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 använd unika identifierare (ofta används för anpassade element)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 tillgänglighetsnamn (ofta används för inbyggda html-element)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

En annan sak vi ibland ser är att enkla saker har en överkomplexad lösning.

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

## Utföra kod parallellt

Om du inte bryr dig om i vilken ordning viss kod körs kan du använda [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) för att påskynda exekveringen.

__Obs:__ Eftersom detta gör koden svårare att läsa kan du abstrahera detta genom att använda ett sidobjekt eller en funktion, även om du också bör ifrågasätta om fördelen med prestanda är värd kostnaden för läsbarhet.

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

Om det abstraheras bort kan det se ut ungefär som nedan där logiken läggs i en metod som kallas submitWithDataOf och data hämtas av Person-klassen.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```