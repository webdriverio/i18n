---
id: element
title: Elementobjektet
---

Ett elementobjekt är ett objekt som representerar ett element i fjärranvändarens webbläsare, t.ex. en [DOM-nod](https://developer.mozilla.org/en-US/docs/Web/API/Element) när du kör en session i en webbläsare eller [ett mobilt element](https://developer.apple.com/documentation/swift/sequence/element) för mobil. Det kan tas emot med hjälp av någon av de många elementförfrågningskommandona, t.ex. [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) eller [`shadow$`](/docs/api/element/shadow$).

## Egenskaper

Ett elementobjekt har följande egenskaper:

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| `sessionId` | `String` | Sessions-id tilldelat från fjärrservern. |
| `elementId` | `String` | Associerad [webbelementreferens](https://w3c.github.io/webdriver/#elements) som kan användas för att interagera med elementet på protokollnivå |
| `selector` | `String` | [Väljare](/docs/selectors) som används för att söka efter elementet. |
| `parent` | `Object` | Antingen [Webbläsarobjektet](/docs/api/browser) när elementet hämtades från det (t.ex. `const elem = browser.$('selector')`) eller ett [Elementobjekt](/docs/api/element) om det hämtades från ett elements omfång (t.ex. `elem.$('selector')`) |
| `options` | `Object` | WebdriverIO [alternativ](/docs/configuration) beroende på hur webbläsarobjektet skapades. Se mer om [inställningstyper](/docs/setuptypes). |

## Metoder
Ett elementobjekt tillhandahåller alla metoder från protokollavsnittet, t.ex. [WebDriver](/docs/api/webdriver)-protokollet samt kommandon som listas i elementavsnittet. Tillgängliga protokollkommandon beror på vilken typ av session du kör. Om du kör en automatiserad webbläsarsession kommer inga av Appiums [kommandon](/docs/api/appium) att vara tillgängliga och vice versa.

Utöver detta är följande kommandon tillgängliga:

| Namn | Parametrar | Detaljer |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Tillåter att definiera anpassade kommandon som kan anropas från webbläsarobjektet för kompositionsändamål. Läs mer i guiden [Anpassade kommandon](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Tillåter att skriva över vilket webbläsarkommando som helst med anpassad funktionalitet. Använd med försiktighet eftersom det kan förvirra ramverksanvändare. Läs mer i guiden [Anpassade kommandon](/docs/customcommands#overwriting-native-commands). |

## Anmärkningar

### Elementkedja

När du arbetar med element tillhandahåller WebdriverIO särskild syntax för att förenkla sökning efter dem och sammanställa komplexa nästlade elementuppslag. Eftersom elementobjekt låter dig hitta element inom deras trädgren med hjälp av vanliga sökmetoder, kan användare hämta nästlade element enligt följande:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // skriver ut "I am a headline"
```

Med djupt nästlade strukturer kan det bli ganska omständligt att tilldela några nästlade element till en array för att sedan använda dem. Därför har WebdriverIO konceptet med kedjade elementförfrågningar som tillåter att hämta nästlade element så här:

```js
console.log(await $('#header').$('#headline').getText())
```

Detta fungerar också när du hämtar en uppsättning element, t.ex.:

```js
// hämta texten från den tredje rubriken i den andra headern
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

När du arbetar med en uppsättning element kan detta vara särskilt användbart när du försöker interagera med dem, istället för att göra:

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

WebdriverIO använder en anpassad implementation som stöder asynkrona iteratorer under huven så alla kommandon från deras API stöds också för dessa användningsfall.

__Obs:__ alla asynkrona iteratorer returnerar ett löfte även om din callback inte returnerar ett, t.ex.:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ returnerar "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ returnerar "string[]"
```

### Anpassade kommandon

Du kan ställa in anpassade kommandon på webbläsaromfånget för att abstrahera bort arbetsflöden som vanligtvis används. Kolla in vår guide om [Anpassade kommandon](/docs/customcommands#adding-custom-commands) för mer information.