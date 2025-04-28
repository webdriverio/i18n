---
id: typescript
title: TypeScript-inställning
---

Du kan skriva tester med [TypeScript](http://www.typescriptlang.org) för att få automatisk komplettering och typsäkerhet.

Du behöver ha [`tsx`](https://github.com/privatenumber/tsx) installerat i `devDependencies`, via:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO kommer automatiskt att upptäcka om dessa beroenden är installerade och kommer att kompilera din konfiguration och tester åt dig. Se till att ha en `tsconfig.json` i samma katalog som din WDIO-konfiguration.

#### Anpassad TSConfig

Om du behöver ange en annan sökväg för `tsconfig.json`, ställ in miljövariabeln TSCONFIG_PATH med din önskade sökväg, eller använd wdio-konfigurationens [tsConfigPath-inställning](/docs/configurationfile).

Alternativt kan du använda [miljövariabeln](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) för `tsx`.


#### Typkontroll

Observera att `tsx` inte stöder typkontroll - om du vill kontrollera dina typer måste du göra detta i ett separat steg med `tsc`.

## Ramverksinställning

Din `tsconfig.json` behöver följande:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Undvik att importera `webdriverio` eller `@wdio/sync` explicit.
`WebdriverIO` och `WebDriver`-typer är tillgängliga överallt när de läggs till i `types` i `tsconfig.json`. Om du använder ytterligare WebdriverIO-tjänster, plugins eller `devtools`-automatiseringspaket, lägg också till dem i `types`-listan eftersom många tillhandahåller ytterligare typningar.

## Ramverkstyper

Beroende på vilket ramverk du använder behöver du lägga till typerna för det ramverket i din `tsconfig.json` types-egenskap, samt installera dess typdefinitioner. Detta är särskilt viktigt om du vill ha typstöd för det inbyggda påståendebiblioteket [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Om du till exempel bestämmer dig för att använda Mocha-ramverket behöver du installera `@types/mocha` och lägga till det så här för att ha alla typer globalt tillgängliga:

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
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

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

Om du använder tjänster som lägger till kommandon i webbläsarens omfattning behöver du också inkludera dessa i din `tsconfig.json`. Om du till exempel använder `@wdio/lighthouse-service`, se till att du lägger till det i `types` också, t.ex.:

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

Att lägga till tjänster och rapporterare i din TypeScript-konfiguration förstärker också typsäkerheten i din WebdriverIO-konfigurationsfil.

## Typdefinitioner

När du kör WebdriverIO-kommandon är alla egenskaper vanligtvis typade så att du inte behöver hantera att importera ytterligare typer. Det finns dock fall där du vill definiera variabler i förväg. För att säkerställa att dessa är typsäkra kan du använda alla typer som definieras i paketet [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Om du till exempel vill definiera fjärralternativet för `webdriverio` kan du göra:

```ts
import type { Options } from '@wdio/types'

// Here is an example where you might want to import the types directly
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// For other cases, you can use the `WebdriverIO` namespace
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Other configs options
}
```

## Tips och råd

### Kompilera och lint

För att vara helt säker kan du överväga att följa bästa praxis: kompilera din kod med TypeScript-kompilatorn (kör `tsc` eller `npx tsc`) och ha [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) körandes på [pre-commit hook](https://github.com/typicode/husky).