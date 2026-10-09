---
id: typescript
title: Configuración de TypeScript
description: "Escribe pruebas de WebdriverIO en TypeScript con tsx, configura tsconfig.json y añade definiciones de tipos para frameworks, servicios y comandos personalizados."
---

Puedes escribir pruebas usando [TypeScript](http://www.typescriptlang.org) para obtener autocompletado y seguridad de tipos.

Necesitarás tener [`tsx`](https://github.com/privatenumber/tsx) instalado en `devDependencies`, mediante:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO detectará automáticamente si estas dependencias están instaladas y compilará tu configuración y tus pruebas por ti. Asegúrate de tener un `tsconfig.json` en el mismo directorio que tu configuración de WDIO.

#### TSConfig personalizado

Si necesitas establecer una ruta diferente para `tsconfig.json`, configura la variable de entorno TSCONFIG_PATH con la ruta deseada, o utiliza la [opción tsConfigPath](/docs/configurationfile) de la configuración de wdio.

Alternativamente, puedes usar la [variable de entorno](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) para `tsx`.


#### Comprobación de tipos

Ten en cuenta que `tsx` no admite la comprobación de tipos; si deseas comprobar tus tipos, tendrás que hacerlo en un paso separado con `tsc`.

## Configuración del framework

Tu `tsconfig.json` necesita lo siguiente:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Evita importar `webdriverio` o `@wdio/sync` explícitamente.
Los tipos `WebdriverIO` y `WebDriver` son accesibles desde cualquier lugar una vez añadidos a `types` en `tsconfig.json`. Si utilizas servicios adicionales de WebdriverIO, plugins o el paquete de automatización `devtools`, añádelos también a la lista `types`, ya que muchos proporcionan tipados adicionales.

## Tipos del framework

Dependiendo del framework que utilices, deberás añadir los tipos de ese framework a la propiedad types de tu `tsconfig.json`, así como instalar sus definiciones de tipos. Esto es especialmente importante si quieres tener soporte de tipos para la biblioteca de aserciones integrada [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Por ejemplo, si decides usar el framework Mocha, necesitas instalar `@types/mocha` y añadirlo de la siguiente manera para tener todos los tipos disponibles globalmente:

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

`jasmine` carga `@types/jasmine`, que proporciona `jasmine`, `spyOn` y `expectAsync`. Con `@wdio/jasmine-framework`, el `expect` global devuelve `void` para los matchers síncronos de Jasmine y una `Promise` para los matchers de WebdriverIO y los matchers asíncronos de Jasmine. `expectAsync` también incluye los matchers de WebdriverIO. La exportación `expect` de `expect-webdriverio` conserva sus matchers de Jest.

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

## Servicios

Si utilizas servicios que añaden comandos al ámbito del navegador, también debes incluirlos en tu `tsconfig.json`. Por ejemplo, si usas `@wdio/lighthouse-service`, asegúrate de añadirlo también a `types`, por ejemplo:

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

Añadir servicios y reporters a tu configuración de TypeScript también refuerza la seguridad de tipos de tu archivo de configuración de WebdriverIO.

## Definiciones de tipos

Al ejecutar comandos de WebdriverIO, todas las propiedades suelen estar tipadas, por lo que no tienes que preocuparte por importar tipos adicionales. Sin embargo, hay casos en los que quieres definir variables de antemano. Para asegurarte de que sean seguras en cuanto a tipos, puedes usar todos los tipos definidos en el paquete [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Por ejemplo, si quieres definir la opción remota para `webdriverio`, puedes hacer:

```ts
import type { Options } from '@wdio/types'

// Aquí hay un ejemplo en el que podrías querer importar los tipos directamente
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// Para otros casos, puedes usar el namespace `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Otras opciones de configuración
}
```

## Consejos y sugerencias

### Compilar y analizar con lint

Para estar completamente seguro, puedes considerar seguir las mejores prácticas: compila tu código con el compilador de TypeScript (ejecuta `tsc` o `npx tsc`) y ten [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) ejecutándose en un [hook de pre-commit](https://github.com/typicode/husky).