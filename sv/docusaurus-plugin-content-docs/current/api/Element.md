---
id: element
title: Elementobjektet
---

Ett elementobjekt är ett objekt som representerar ett element i fjärranvändarens agent, t.ex. en [DOM-nod](https://developer.mozilla.org/en-US/docs/Web/API/Element) när en session körs i en webbläsare eller [ett mobilt element](https://developer.apple.com/documentation/swift/sequence/element) för mobil. Det kan hämtas med hjälp av en av de många elementfrågekommandona, t.ex. [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) eller [`shadow$`](/docs/api/element/shadow$).

## Egenskaper

Ett elementobjekt har följande egenskaper:

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| `sessionId` | `String` | Sessions-id tilldelat från fjärrservern. |
| `elementId` | `String` | Associerad [webbelementreferens](https://w3c.github.io/webdriver/#elements) som kan användas för att interagera med elementet på protokollnivå |
| `selector` | `String` | [Väljare](/docs/selectors) som används för att söka efter elementet. |
| `parent` | `Object` | Antingen [webbläsarobjektet](/docs/api/browser) när elementet hämtades från det (t.ex. `const elem = browser.$('selector')`) eller ett [elementobjekt](/docs/api/element) om det hämtades från ett elementomfång (t.ex. `elem.$('selector')`) |
| `options` | `Object` | WebdriverIO [alternativ](/docs/configuration) beroende på hur webbläsarobjektet skapades. Se mer om [uppsättningstyper](/docs/setuptypes). |

## Metoder
Ett elementobjekt tillhandahåller alla metoder från protokollavsnittet, t.ex. [WebDriver](/docs/api/webdriver)-protokollet samt kommandon som listas inom elementavsnittet. Tillgängliga protokollkommandon beror på typen av session. Om du kör en automatiserad webbläsarsession kommer inga av Appiums [kommandon](/docs/api/appium) att vara tillgängliga och vice versa.

Utöver det är följande kommandon tillgängliga:

| Namn | Parametrar | Detaljer |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Gör det möjligt att definiera anpassade kommandon som kan anropas från webbläsarobjektet för kompositionsändamål. Läs mer i guiden [Anpassade kommandon](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Gör det möjligt att skriva över valfritt webbläsarkommando med anpassad funktionalitet. Använd försiktigt eftersom det kan förvirra ramverksanvändare. Läs mer i guiden [Anpassade kommandon](/docs/customcommands#overwriting-native-commands). |

## Anmärkningar

### Elementkedja

När man arbetar med element tillhandahåller WebdriverIO särskild syntax för att förenkla sökning efter dem och skapa komplexa kapslade elementuppslag. Eftersom elementobjekt låter dig hitta element inom deras trädgren med hjälp av vanliga sökmetoder, kan användare hämta kapslade element enligt följande:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // skriver ut "I am a headline"
```

Med djupt kapslade strukturer kan det vara ganska utförligt att tilldela kapslade element till en array för att sedan använda dem. Därför har WebdriverIO konceptet med kedjade elementfrågor som gör det möjligt att hämta kapslade element så här:

```js
console.log(await $('#header').$('#headline').getText())
```

Detta fungerar också när man hämtar en uppsättning element, t.ex.:

```js
// hämta texten från den 3:e rubriken inom den 2:a headern
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

När man arbetar med en uppsättning element kan detta vara särskilt användbart vid interaktion med dem, så istället för att göra:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

Du kan direkt anropa Array-metoder på elementkedjan, t.ex.:

```js
const location = await $$('div').map((el) => el.getLocation())
```

samma som:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO använder en anpassad implementering som stödjer asynkrona iteratorer under huven så alla kommandon från deras API stöds också för dessa användningsfall.

__Obs:__ alla asynkrona iteratorer returnerar ett löfte även om din callback inte returnerar ett, t.ex.:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ returnerar "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ returnerar "string[]"
```

### Anpassade kommandon

Du kan ställa in anpassade kommandon i webbläsarens omfattning för att abstrahera arbetsflöden som används ofta. Kolla in vår guide om [Anpassade kommandon](/docs/customcommands#adding-custom-commands) för mer information.