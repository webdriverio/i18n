---
id: async-migration
title: Från synkron till asynkron
description: "Migrera WebdriverIO-tester från synkron till asynkron kommandokörning steg för steg, inklusive forEach-loopar, assertions och synkrona page objects."
---

På grund av förändringar i V8 [meddelade](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) WebdriverIO-teamet att synkron kommandokörning skulle fasas ut i april 2023. Teamet har arbetat hårt för att göra övergången så enkel som möjligt. I den här guiden förklarar vi hur du gradvis kan migrera din testsvit från synkron till asynkron. Som exempelprojekt använder vi [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), men tillvägagångssättet är detsamma för alla andra projekt också.

## Promises i JavaScript

Anledningen till att synkron körning var populär i WebdriverIO är att den tar bort komplexiteten i att hantera promises. Särskilt om du kommer från andra språk där detta koncept inte finns på samma sätt kan det vara förvirrande i början. Promises är dock ett mycket kraftfullt verktyg för att hantera asynkron kod, och dagens JavaScript gör det faktiskt enkelt att arbeta med dem. Om du aldrig har arbetat med Promises rekommenderar vi att du läser [MDN:s referensguide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) om dem, eftersom det skulle ligga utanför ramen för denna guide att förklara det här.

## Asynkron övergång

WebdriverIO:s testrunner kan hantera asynkron och synkron körning inom samma testsvit. Det innebär att du gradvis kan migrera dina tester och PageObjects steg för steg i din egen takt. Till exempel har Cucumber Boilerplate definierat [en stor uppsättning stegdefinitioner](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) som du kan kopiera till ditt projekt. Vi kan migrera en stegdefinition eller en fil i taget.

:::tip

WebdriverIO erbjuder en [codemod](https://github.com/webdriverio/codemod) som låter dig omvandla din synkrona kod till asynkron kod nästan helt automatiskt. Kör först codemod enligt beskrivningen i dokumentationen och använd denna guide för manuell migrering vid behov.

:::

I många fall är allt som behöver göras att göra funktionen där du anropar WebdriverIO-kommandon `async` och lägga till en `await` framför varje kommando. Om vi tittar på den första filen `clearInputField.ts` som ska omvandlas i boilerplate-projektet, omvandlar vi från:

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

Det var allt. Du kan se hela committen med alla omskrivningsexempel här:

#### Commits:

- _omvandla alla stegdefinitioner_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Denna övergång är oberoende av om du använder TypeScript eller inte. Om du använder TypeScript, se bara till att du så småningom ändrar egenskapen `types` i din `tsconfig.json` från `webdriverio/sync` till `@wdio/globals/types`. Se också till att ditt kompileringsmål är satt till minst `ES2018`.
:::

## Specialfall

Det finns naturligtvis alltid specialfall där du behöver vara lite mer uppmärksam.

### ForEach-loopar

Om du har en `forEach`-loop, t.ex. för att iterera över element, måste du se till att iteratorns callback hanteras korrekt på ett asynkront sätt, t.ex.:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

Funktionen vi skickar in i `forEach` är en iteratorfunktion. I en synkron värld skulle den klicka på alla element innan den går vidare. Om vi omvandlar detta till asynkron kod måste vi säkerställa att vi väntar på att varje iteratorfunktion har körts klart. Genom att lägga till `async`/`await` kommer dessa iteratorfunktioner att returnera ett promise som vi måste vänta in. `forEach` är då inte längre idealiskt för att iterera över elementen, eftersom den inte returnerar resultatet av iteratorfunktionen, alltså det promise vi behöver vänta på. Därför måste vi ersätta `forEach` med `map`, som returnerar detta promise. `map` samt alla andra iteratormetoder för Arrays som `find`, `every`, `reduce` med flera är implementerade så att de respekterar promises inom iteratorfunktionerna och är därför förenklade för användning i en asynkron kontext. Exemplet ovan ser ut så här efter omvandlingen:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Till exempel, för att hämta alla `<h3 />`-element och få deras textinnehåll kan du köra:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returnerar:
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

Om detta ser för komplicerat ut kan du överväga att använda enkla for-loopar, t.ex.:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` returnerar en [`ElementArray`](/docs/api/browser/$$). Du kan också iterera över den innan du väntar in listan:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` kastar ett fel tills listan har lösts upp, eftersom en synkron loop inte kan vänta på frågan. Vänta in listan först, som i exemplet ovan, eller använd `for await`.

### WebdriverIO-assertions

Om du använder WebdriverIO:s assertion-hjälpbibliotek [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), se till att sätta en `await` framför varje `expect`-anrop, t.ex.:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

behöver omvandlas till:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### Synkrona PageObject-metoder och asynkrona tester

Om du har skrivit PageObjects i din testsvit på ett synkront sätt kommer du inte längre att kunna använda dem i asynkrona tester. Om du behöver använda en PageObject-metod i både synkrona och asynkrona tester rekommenderar vi att du duplicerar metoden och erbjuder den för båda miljöerna, t.ex.:

```js
class MyPageObject extends Page {
    /**
     * definiera element
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // synkron kod
    }

    someMethodAsync () {
        // asynkron version av MyPageObject.someMethod()
    }
}
```

När du har slutfört migreringen kan du ta bort de synkrona PageObject-metoderna och städa upp namngivningen.

Om du inte vill underhålla två olika versioner av en PageObject-metod kan du också migrera hela PageObject till asynkron kod och använda [`browser.call`](https://webdriver.io/docs/api/browser/call) för att köra metoden i en synkron miljö, t.ex.:

```js
// före:
// MyPageObject.someMethod()
// efter:
browser.call(() => MyPageObject.someMethod())
```

Kommandot `call` ser till att den asynkrona `someMethod` har lösts upp innan nästa kommando körs.

## Slutsats

Som du kan se i den [resulterande omskrivnings-PR:en](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) är komplexiteten i denna omskrivning ganska låg. Kom ihåg att du kan skriva om en stegdefinition i taget. WebdriverIO kan utmärkt hantera synkron och asynkron körning i ett och samma ramverk.