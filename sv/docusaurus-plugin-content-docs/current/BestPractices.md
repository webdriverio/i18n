---
id: bestpractices
title: Bästa praxis
---

# Bästa praxis

Denna guide syftar till att dela våra bästa metoder som hjälper dig att skriva prestandaoptimerade och stabila tester.

## Använd robusta selektorer

Genom att använda selektorer som är motståndskraftiga mot förändringar i DOM:en kommer du att ha färre eller inga tester som misslyckas när till exempel en klass tas bort från ett element.

Klasser kan appliceras på flera element och bör undvikas om möjligt, såvida du inte medvetet vill hämta alla element med den klassen.

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

__Obs:__ För att ta reda på alla möjliga selektorer som WebdriverIO stöder, kolla vår [Selectors](./Selectors.md) sida.

## Begränsa antalet elementförfrågningar

Varje gång du använder kommandot [`$`](https://webdriver.io/docs/api/browser/$) eller [`$$`](https://webdriver.io/docs/api/browser/$$) (detta inkluderar kedjning av dem), försöker WebdriverIO lokalisera elementet i DOM:en. Dessa förfrågningar är dyra så du bör försöka begränsa dem så mycket som möjligt.

Söker efter tre element.

```js
// 👎
await $('table').$('tr').$('td')
```

Söker endast efter ett element.

``` js
// 👍
await $('table tr td')
```

Den enda gången du bör använda kedjning är när du vill kombinera olika [selektorstrategier](https://webdriver.io/docs/selectors/#custom-selector-strategies).
I exemplet använder vi [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), vilket är en strategi för att gå in i shadow DOM för ett element.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Föredra att hitta ett enskilt element istället för att ta ett från en lista

Det är inte alltid möjligt att göra detta, men genom att använda CSS pseudo-klasser som [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) kan du matcha element baserat på indexen för elementen i barnlistan för deras föräldrar.

Söker efter alla tabellrader.

```js
// 👎
await $$('table tr')[15]
```

Söker efter en enskild tabellrad.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Använd de inbyggda hävdandena

Använd inte manuella hävdanden som inte automatiskt väntar på att resultaten ska matcha, eftersom detta kommer att orsaka instabila tester.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Genom att använda de inbyggda hävdandena kommer WebdriverIO automatiskt att vänta på att det faktiska resultatet ska matcha det förväntade resultatet, vilket resulterar i stabila tester.
Den uppnår detta genom att automatiskt försöka igen hävdandet tills det passerar eller tar slut på tid.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lazy loading och promise kedjning

WebdriverIO har några trick när det gäller att skriva ren kod eftersom den kan lazy loada elementet, vilket tillåter dig att kedja dina löften och minskar antalet `await`. Detta gör det också möjligt att skicka elementet som ett ChainablePromiseElement istället för ett Element och för enklare användning med page objects.

Så när behöver du använda `await`?
Du bör alltid använda `await` med undantag för kommandona `$` och `$$`.

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

## Överanvänd inte kommandon och hävdanden

När du använder expect.toBeDisplayed väntar du implicit också på att elementet ska existera. Det finns inget behov av att använda waitForXXX-kommandon när du redan har ett hävdande som gör samma sak.

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

Inget behov av att vänta på att ett element ska existera eller visas när du interagerar eller när du hävdar något som dess text, såvida inte elementet uttryckligen kan vara osynligt (opacity: 0 till exempel) eller uttryckligen kan inaktiveras (disabled-attribut till exempel), i vilket fall att vänta på att elementet ska visas är meningsfullt.

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

Använd miljövariabler för att lagra dynamiska testdata, t.ex. hemliga uppgifter, i din miljö istället för att hårdkoda dem i testet. Gå till sidan [Parameterize Tests](parameterize-tests) för mer information om detta ämne.

## Lint din kod

Genom att använda eslint för att lint din kod kan du potentiellt upptäcka fel tidigt, använd våra [lintningsregler](https://www.npmjs.com/package/eslint-plugin-wdio) för att säkerställa att några av de bästa metoderna alltid tillämpas.

## Använd inte pause

Det kan vara frestande att använda pause-kommandot, men att använda detta är en dålig idé eftersom det inte är stabilt och endast kommer att orsaka instabila tester på lång sikt.

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
Till exempel tillåter inte Array's forEach-funktion asynkrona callbacks, vilket kan läsas på [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Obs:__ Du kan fortfarande använda dessa när du inte behöver att operationen ska vara synkron som visas i detta exempel `console.log(await $$('h1').map((h1) => h1.getText()))`.

Nedan är några exempel på vad detta innebär.

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

Ibland ser vi att våra användare mappar data som text eller värden. Detta behövs ofta inte och är ofta ett tecken på dålig kod, kolla exemplen nedan varför detta är fallet.

```js
// 👎 för komplext, synkron hävdande, använd de inbyggda hävdandena för att förhindra instabila tester
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

// 👎 hittar element efter deras text men tar inte hänsyn till elementens position
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 använd unika identifierare (används ofta för anpassade element)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 tillgänglighetsnamn (används ofta för vanliga html-element)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

En annan sak vi ibland ser är att enkla saker har en överkompliserad lösning.

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

## Exekvering av kod parallellt

Om du inte bryr dig om i vilken ordning viss kod körs kan du använda [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) för att snabba upp exekveringen.

__Obs:__ Eftersom detta gör koden svårare att läsa kan du abstrahera detta med hjälp av ett page object eller en funktion, även om du också bör ifrågasätta om fördelen i prestanda är värt kostnaden för läsbarhet.

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

Om det abstraheras skulle det kunna se ut som nedan där logiken läggs i en metod som kallas submitWithDataOf och data hämtas av Person-klassen.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```