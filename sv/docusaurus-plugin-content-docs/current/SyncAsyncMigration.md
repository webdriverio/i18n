---
id: async-migration
title: Från Synkron till Asynkron
---

På grund av förändringar i V8 har WebdriverIO-teamet [meddelat](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) att synkron kommandoexekvering kommer att bli inaktuell i april 2023. Teamet har arbetat hårt för att göra övergången så enkel som möjligt. I denna guide förklarar vi hur du gradvis kan migrera din testsvit från synkron till asynkron. Som exempelprojekt använder vi [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), men tillvägagångssättet är detsamma för alla andra projekt.

## Promises i JavaScript

Anledningen till att synkron exekvering var populär i WebdriverIO är att det tar bort komplexiteten med att hantera promises. Särskilt om du kommer från andra språk där detta koncept inte existerar på samma sätt kan det vara förvirrande i början. Men Promises är ett mycket kraftfullt verktyg för att hantera asynkron kod, och dagens JavaScript gör det faktiskt enkelt att hantera det. Om du aldrig har arbetat med Promises rekommenderar vi att du läser [MDN:s referensguide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) eftersom det skulle vara utanför ramen för denna guide att förklara det här.

## Asynkron övergång

WebdriverIO:s testrunner kan hantera både asynkron och synkron exekvering inom samma testsvit. Detta innebär att du gradvis kan migrera dina tester och PageObjects steg för steg i din egen takt. Till exempel har Cucumber Boilerplate definierat [en stor uppsättning stegdefinitioner](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) som du kan kopiera till ditt projekt. Vi kan gå vidare och migrera en stegdefinition eller en fil i taget.

:::tip

WebdriverIO erbjuder en [codemod](https://github.com/webdriverio/codemod) som låter dig transformera din synkrona kod till asynkron kod nästan helt automatiskt. Kör codemod enligt beskrivningen i dokumentationen först och använd denna guide för manuell migrering vid behov.

:::

I många fall är allt som behövs att göra funktionen där du anropar WebdriverIO-kommandon `async` och lägga till ett `await` framför varje kommando. Med tanke på den första filen `clearInputField.ts` som ska transformeras i boilerplate-projektet, transformerar vi från:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

till:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

Det är allt. Du kan se den kompletta commiten med alla omskrivningsexempel här:

#### Commits:

- _transform all step definitions_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Denna övergång är oberoende av om du använder TypeScript eller inte. Om du använder TypeScript, se till att du så småningom ändrar `types`-egenskapen i din `tsconfig.json` från `webdriverio/sync` till `@wdio/globals/types`. Se också till att ditt kompileringsmål är inställt på minst `ES2018`.
:::

## Specialfall

Det finns naturligtvis alltid specialfall där du behöver vara lite mer uppmärksam.

### ForEach-loopar

Om du har en `forEach`-loop, t.ex. för att iterera över element, måste du se till att iteratorcallback hanteras korrekt på ett asynkront sätt, t.ex.:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

Funktionen vi skickar in i `forEach` är en iteratorfunktion. I en synkron värld skulle den klicka på alla element innan den går vidare. Om vi transformerar detta till asynkron kod måste vi säkerställa att vi väntar på att varje iteratorfunktion ska slutföra exekveringen. Genom att lägga till `async`/`await` kommer dessa iteratorfunktioner att returnera ett promise som vi måste lösa. Nu är `forEach` inte längre idealisk för att iterera över elementen eftersom den inte returnerar resultatet av iteratorfunktionen, det promise vi behöver vänta på. Därför behöver vi ersätta `forEach` med `map` som returnerar det promise. `map` såväl som alla andra iteratormetoder för Arrays som `find`, `every`, `reduce` och fler är implementerade så att de respekterar promises inom iteratorfunktionerna och är därför förenklade för användning i en asynkron kontext. Exemplet ovan ser transformerat ut så här:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

För att exempelvis hämta alla `<h3 />`-element och få deras textinnehåll kan du köra:

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

Om detta ser för komplicerat ut kanske du vill överväga att använda enkla for-loopar, t.ex.:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### WebdriverIO-assertions

Om du använder WebdriverIO:s assertion-hjälpare [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio) se till att sätta ett `await` framför varje `expect`-anrop, t.ex.:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

behöver transformeras till:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### Synkrona PageObject-metoder och asynkrona tester

Om du har skrivit PageObjects i din testsvit på ett synkront sätt kommer du inte längre att kunna använda dem i asynkrona tester. Om du behöver använda en PageObject-metod i både synkrona och asynkrona tester rekommenderar vi att du duplicerar metoden och erbjuder dem för båda miljöerna, t.ex.:

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

När du har slutfört migreringen kan du ta bort de synkrona PageObject-metoderna och rensa upp namngivningen.

Om du inte vill underhålla två olika versioner av en PageObject-metod kan du också migrera hela PageObject till asynkron och använda [`browser.call`](https://webdriver.io/docs/api/browser/call) för att exekvera metoden i en synkron miljö, t.ex.:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

`call`-kommandot kommer att se till att den asynkrona `someMethod` löses innan den går vidare till nästa kommando.

## Slutsats

Som du kan se i [den resulterande omskrivnings-PR:en](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) är komplexiteten i denna omskrivning ganska enkel. Kom ihåg att du kan skriva om en stegdefinition i taget. WebdriverIO kan perfekt hantera synkron och asynkron exekvering i ett enda ramverk.