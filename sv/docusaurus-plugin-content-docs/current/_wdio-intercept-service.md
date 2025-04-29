---
id: wdio-intercept-service
title: Intercept Tjänst
custom_edit_url: https://github.com/webdriverio-community/wdio-intercept-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-intercept-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/webdriverio-community/wdio-intercept-service) | [npm](https://www.npmjs.com/package/wdio-intercept-service)

🕸 Fånga och utvärdera HTTP ajax-anrop i [webdriver.io](http://webdriver.io/)

[![Tests](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml) [![Join the chat on Discord](https://img.shields.io/discord/1097401827202445382?logo=discord&logoColor=FFFFFF&color=5865F2)](https://discord.webdriver.io/)

Detta är ett plugin för [webdriver.io](http://webdriver.io/). Om du inte känner till det än, kolla in det, det är ganska coolt.

Även om selenium och webdriver används för e2e och särskilt UI-testning, kanske du vill utvärdera HTTP-förfrågningar som görs av din klientkod (t.ex. när du inte har omedelbar UI-feedback, som i mätvärden eller spårningsanrop). Med wdio-intercept-service kan du fånga ajax HTTP-anrop som initieras av vissa användaråtgärder (t.ex. ett knapptryck, etc.) och göra påståenden om förfrågan och motsvarande svar senare.

Det finns dock en hake: du kan inte fånga HTTP-anrop som initieras vid sidladdning (som i de flesta SPA:er), eftersom det kräver viss inställning som bara kan göras efter att sidan har laddats (på grund av begränsningar i selenium). **Det betyder att du bara kan fånga förfrågningar som initierades inuti ett test.** Om du är okej med det kan detta plugin vara något för dig, så läs vidare.

## Förutsättningar

* webdriver.io **v5.x** eller nyare.

**Observera! Om du fortfarande använder webdriver.io v4, använd v2.x-grenen av detta plugin!**

## Installation

```shell
npm install wdio-intercept-service -D
```

## Användning

### Användning med WebDriver CLI

Det bör vara så enkelt som att lägga till wdio-intercept-service till din `wdio.conf.js`:

```javascript
exports.config = {
  // ...
  services: ['intercept']
  // ...
};
```

och då är du klar.

### Användning med WebDriver Standalone

När du använder WebdriverIO Standalone måste funktionerna `before` och `beforeTest` / `beforeScenario` anropas manuellt.

```javascript
import { remote } from 'webdriverio';
import WebdriverAjax from 'wdio-intercept-service'

const WDIO_OPTIONS = {
  port: 9515,
  path: '/',
  capabilities: {
    browserName: 'chrome'
  },
}

let browser;
const interceptServiceLauncher = WebdriverAjax();

beforeAll(async () => {
  browser = await remote(WDIO_OPTIONS)
  interceptServiceLauncher.before(null, null, browser)
})

beforeEach(async () => {
  interceptServiceLauncher.beforeTest()
})

afterAll(async () => {
  await client.deleteSession()
});

describe('', async () => {
  ... // See example usage
});
```

När det är initierat läggs några relaterade funktioner till i din webbläsarkommandokedja (se [API](#api)).

## Snabbstart

Exempel på användning:

```javascript
browser.url('http://foo.bar');
browser.setupInterceptor(); // capture ajax calls
browser.expectRequest('GET', '/api/foo', 200); // expect GET request to /api/foo with 200 statusCode
browser.expectRequest('POST', '/api/foo', 400); // expect POST request to /api/foo with 400 statusCode
browser.expectRequest('GET', /\/api\/foo/, 200); // can validate a URL with regex, too
browser.click('#button'); // button that initiates ajax request
browser.pause(1000); // maybe wait a bit until request is finished
browser.assertRequests(); // validate the requests
```

Få detaljer om förfrågningar:

```javascript
browser.url('http://foo.bar')
browser.setupInterceptor();
browser.click('#button')
browser.pause(1000);

var request = browser.getRequest(0);
assert.equal(request.method, 'GET');
assert.equal(request.response.headers['content-length'], '42');
```

## Webbläsare som stöds

Det borde fungera med någorlunda nyare versioner av alla webbläsare. Rapportera gärna ett problem om det inte verkar fungera med din.

## API

Se TypeScript-deklarationsfilen för fullständig syntax för de anpassade kommandon som läggs till i WebdriverIO webbläsarobjektet. Generellt kan alla metoder som tar ett "options"-objekt som parameter anropas utan den parametern för att få standardbeteendet. Dessa "valfria options"-objekt följs av `?: = {}` och standardvärdena som antas beskrivs för varje metod.

### Alternativbeskrivningar

Detta bibliotek erbjuder en liten mängd konfiguration när du utfärdar kommandon. Konfigurationsalternativ som används av flera metoder beskrivs här (se varje metoddefinition för att bestämma specifikt stöd).

* `orderBy` (`'START' | 'END'`): Detta alternativ kontrollerar ordningen av förfrågningar som fångas av interceptorn, när de returneras till ditt test. För bakåtkompatibilitet med befintliga versioner av detta bibliotek är standardordningen `'END'`, vilket motsvarar när förfrågan slutfördes. Om du ställer in `orderBy`-alternativet till `'START'`, kommer förfrågningarna att ordnas enligt tiden då de startades.
* `includePending` (`boolean`): Detta alternativ kontrollerar om ännu-inte-slutförda förfrågningar ska returneras. För bakåtkompatibilitet med befintliga versioner av detta bibliotek är standardvärdet `false`, och endast slutförda förfrågningar kommer att returneras.

### browser.setupInterceptor()

Fångar ajax-anrop i webbläsaren. Du måste alltid anropa inställningsfunktionen för att kunna utvärdera förfrågningar senare.

### browser.disableInterceptor()

Förhindrar ytterligare fångst av ajax-anrop i webbläsaren. All fångad förfrågningsinformation tas bort. De flesta användare behöver inte inaktivera interceptorn, men om ett test är särskilt långkörande eller överskrider sessionlagringsutrymmet, kan det vara hjälpsamt att inaktivera interceptorn.

### `browser.excludeUrls(urlRegexes: (string | RegExp)[])`

Exkluderar förfrågningar från vissa webbadresser från att registreras. Den tar en array av strängar eller reguljära uttryck. Innan den skriver till lagring, testar den URL:en för förfrågan mot varje sträng eller regex. Om den matchar, skrivs förfrågan inte till lagringen. Precis som disableInterceptor kan detta vara hjälpsamt om du stöter på problem med att sessionlagringen överskrider kapaciteten.

### browser.expectRequest(method: string, url: string, statusCode: number)

Gör förväntningar om ajax-förfrågningar som kommer att initieras under testet. Kan (och bör) kedjas. Ordningen på förväntningarna bör motsvara ordningen på förfrågningarna som görs.

* `method` (`String`): http-metod som förväntas. Kan vara vad som helst som `xhr.open()` accepterar som första argument.
* `url` (`String`|`RegExp`): exakt URL som anropas i förfrågan som en sträng eller RegExp att matcha
* `statusCode` (`Number`): förväntad statuskod för svaret

### browser.getExpectations()

Hjälpmetod. Returnerar alla förväntningar du har gjort fram till den punkten

### browser.resetExpectations()

Hjälpmetod. Återställer alla förväntningar du har gjort fram till den punkten

### `browser.assertRequests({ orderBy?: 'START' | 'END' }?: = {})`

Anropa denna metod när alla förväntade ajax-förfrågningar är färdiga. Den jämför förväntningarna med de faktiska förfrågningarna som gjorts och hävdar följande:

- Antal förfrågningar som gjorts
- Ordningen på förfrågningarna
- Metoden, URL:en och statuskoden ska matcha för varje förfrågan som görs
- Alternativobjektet är som standard `{ orderBy: 'END' }`, dvs. när förfrågningarna slutfördes, för att vara konsekvent med beteendet för v4.1.10 och tidigare. När `orderBy`-alternativet är inställt på `'START'`, kommer förfrågningarna att ordnas efter när de initierades av sidan.

### `browser.assertExpectedRequestsOnly({ inOrder?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Liknande `browser.assertRequests`, men validerar endast de förfrågningar du anger i dina `expectRequest`-direktiv, utan att behöva kartlägga alla nätverksförfrågningar som kan ske runt det. Om `inOrder`-alternativet är `true` (standard), förväntas förfrågningarna hittas i samma ordning som de ställdes in med `expectRequest`.

### `browser.getRequest(index: number, { includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

För att göra mer sofistikerade påståenden om en specifik förfrågan kan du få detaljer för en specifik förfrågan. Du måste ange det 0-baserade indexet för förfrågan du vill komma åt, i den ordning förfrågningarna slutfördes (standard), eller initierades (genom att skicka `orderBy: 'START'`-alternativet).

* `index` (`number`): nummer på förfrågan du vill komma åt
* `options` (`object`): Konfigurationsalternativ
* `options.includePending` (`boolean`): Om ännu-inte-slutförda förfrågningar ska returneras. Som standard är detta false, för att matcha beteendet för biblioteket i v4.1.10 och tidigare.
* `options.orderBy` (`'START' | 'END'`): Hur förfrågningarna ska ordnas. Som standard är detta `'END'`, för att matcha beteendet för biblioteket i v4.1.10 och tidigare. Om `'START'`, kommer förfrågningarna att ordnas efter tidpunkten för initiering, snarare än tidpunkten för förfrågans slutförande. (Eftersom en väntande förfrågan inte har slutförts ännu, kommer alla väntande förfrågningar att komma efter alla slutförda förfrågningar när de ordnas efter `'END'`.)

**Returnerar** `request` objekt:

* `request.url`: begärd URL
* `request.method`: använd HTTP-metod
* `request.body`: payload/body-data som används i förfrågan
* `request.headers`: förfrågans http-headers som JS-objekt
* `request.pending`: boolesk flagga för om denna förfrågan är slutförd (dvs. har en `response`-egenskap), eller pågående.
* `request.response`: ett JS-objekt som endast finns om förfrågan är slutförd (dvs. `request.pending === false`), innehållande data om svaret.
* `request.response?.headers`: svars-http-headers som JS-objekt
* `request.response?.body`: svarskropp (kommer att parsas som JSON om möjligt)
* `request.response?.statusCode`: svarsstatuskod

**En anteckning om `request.body`:** wdio-intercept-service kommer att försöka parsa förfrågningskroppen enligt följande:

* sträng: Returnera bara strängen (`'value'`)
* JSON: Parsa JSON-objektet med `JSON.parse()` (`({ key: value })`)
* FormData: Kommer att visa FormData i formatet `{ key: [value1, value2, ...] }`
* ArrayBuffer: Kommer att försöka konvertera bufferten till en sträng (experimentell)
* Allt annat: Kommer att använda en brutal `JSON.stringify()` på din data. Lycka till!

**För `fetch` API stöder vi bara string och JSON-data!**

### `browser.getRequests({ includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Hämta alla fångade förfrågningar som en array, med stöd för samma valfria alternativ som `getRequest`.

**Returnerar** array av `request`-objekt.

### browser.hasPendingRequests()

En hjälpmetod som kontrollerar om några HTTP-förfrågningar fortfarande väntar. Kan användas av tester för att säkerställa att alla förfrågningar har slutförts inom en rimlig tid, eller för att verifiera att ett anrop till `getRequests()` eller `assertRequests()` kommer att inkludera alla önskade HTTP-förfrågningar.

**Returnerar** boolean

## TypeScript-stöd

Detta plugin tillhandahåller sina egna TS-typer. Peka bara din tsconfig till typförlängningarna som nämns [här](https://webdriver.io/docs/typescript.html#framework-types):

```
"compilerOptions": {
    // ..
    "types": ["node", "webdriverio", "wdio-intercept-service"]
},
```

## Köra testerna

Nyare versioner av Chrome och Firefox krävs för att köra testerna lokalt. Du kan behöva uppdatera `chromedriver` och `geckodriver`-beroenden för att matcha versionen installerad på ditt system.

```shell
npm test
```

## Bidra

Jag är glad för varje bidrag. Öppna bara ett ärende eller skicka en PR direkt.  
Observera att detta interceptorbibliotek är skrivet för att fungera med äldre webbläsare som Internet Explorer. Som sådan måste all kod som används i `lib/interceptor.js` åtminstone vara parsningsbar av Internet Explorers JavaScript-runtime.

## Licens

MIT