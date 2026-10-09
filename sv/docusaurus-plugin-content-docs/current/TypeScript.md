---
id: typescript
title: TypeScript-konfiguration
description: "Skriv WebdriverIO-tester i TypeScript med tsx, konfigurera tsconfig.json och lägg till typdefinitioner för ramverk, tjänster och anpassade kommandon."
---

Du kan skriva tester med [TypeScript](http://www.typescriptlang.org) för att få automatisk komplettering och typsäkerhet.

Du behöver ha [`tsx`](https://github.com/privatenumber/tsx) installerat i `devDependencies`, via:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO upptäcker automatiskt om dessa beroenden är installerade och kompilerar din konfiguration och dina tester åt dig. Se till att ha en `tsconfig.json` i samma katalog som din WDIO-konfiguration.

#### Anpassad TSConfig

Om du behöver ange en annan sökväg för `tsconfig.json`, ställ in miljövariabeln TSCONFIG_PATH med din önskade sökväg, eller använd wdio-konfigurationens [inställning tsConfigPath](/docs/configurationfile).

Alternativt kan du använda [miljövariabeln](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) för `tsx`.


#### Typkontroll

Observera att `tsx` inte stöder typkontroll – om du vill kontrollera dina typer behöver du göra detta i ett separat steg med `tsc`.

## Ramverkskonfiguration

Din `tsconfig.json` behöver följande:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Undvik att importera `webdriverio` eller `@wdio/sync` explicit.
Typerna `WebdriverIO` och `WebDriver` är tillgängliga överallt när de har lagts till i `types` i `tsconfig.json`. Om du använder ytterligare WebdriverIO-tjänster, plugins eller automatiseringspaketet `devtools`, lägg även till dem i listan `types` eftersom många tillhandahåller ytterligare typningar.

## Ramverkstyper

Beroende på vilket ramverk du använder behöver du lägga till typerna för det ramverket i egenskapen types i din `tsconfig.json`, samt installera dess typdefinitioner. Detta är särskilt viktigt om du vill ha typstöd för det inbyggda assertion-biblioteket [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Om du till exempel väljer att använda ramverket Mocha behöver du installera `@types/mocha` och lägga till det så här för att alla typer ska vara globalt tillgängliga:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

`jasmine` laddar `@types/jasmine`, vilket ger `jasmine`, `spyOn` och `expectAsync`. Med `@wdio/jasmine-framework` returnerar den globala `expect` `void` för Jasmines synkrona matchers och ett `Promise` för WebdriverIO-matchers och Jasmines asynkrona matchers. `expectAsync` har också WebdriverIO-matchers. `expect`-exporten från `expect-webdriverio` behåller sina Jest-matchers.

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## Tjänster

Om du använder tjänster som lägger till kommandon i browser-scopet behöver du även inkludera dessa i din `tsconfig.json`. Om du till exempel använder `@wdio/lighthouse-service`, se till att du lägger till den i `types` också, t.ex.:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

Att lägga till tjänster och reportrar i din TypeScript-konfiguration stärker även typsäkerheten i din WebdriverIO-konfigurationsfil.

## Typdefinitioner

När du kör WebdriverIO-kommandon är alla egenskaper vanligtvis typade så att du inte behöver importera ytterligare typer. Det finns dock fall där du vill definiera variabler i förväg. För att säkerställa att dessa är typsäkra kan du använda alla typer som definieras i paketet [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Om du till exempel vill definiera remote-alternativet för `webdriverio` kan du göra:

```ts
import type { Options } from '@wdio/types'

// Här är ett exempel där du kanske vill importera typerna direkt
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// I andra fall kan du använda namnrymden `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Andra konfigurationsalternativ
}
```

## Tips och råd

### Kompilera & linta

För att vara helt säker kan du överväga att följa bästa praxis: kompilera din kod med TypeScript-kompilatorn (kör `tsc` eller `npx tsc`) och låt [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) köras i en [pre-commit hook](https://github.com/typicode/husky).