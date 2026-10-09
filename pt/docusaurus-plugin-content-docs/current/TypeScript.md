---
id: typescript
title: Configuração do TypeScript
description: "Escreva testes WebdriverIO em TypeScript com tsx, configure o tsconfig.json e adicione definições de tipos para frameworks, serviços e comandos personalizados."
---

Você pode escrever testes usando [TypeScript](http://www.typescriptlang.org) para obter preenchimento automático e segurança de tipos.

Você precisará ter o [`tsx`](https://github.com/privatenumber/tsx) instalado em `devDependencies`, via:

```bash npm2yarn
$ npm install tsx --save-dev
```

O WebdriverIO detectará automaticamente se essas dependências estão instaladas e compilará sua configuração e seus testes para você. Certifique-se de ter um `tsconfig.json` no mesmo diretório que sua configuração do WDIO.

#### TSConfig Personalizado

Se você precisar definir um caminho diferente para o `tsconfig.json`, defina a variável de ambiente TSCONFIG_PATH com o caminho desejado ou use a [configuração tsConfigPath](/docs/configurationfile) da configuração do wdio.

Alternativamente, você pode usar a [variável de ambiente](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) do `tsx`.


#### Verificação de Tipos

Observe que o `tsx` não oferece suporte à verificação de tipos - se você quiser verificar seus tipos, precisará fazer isso em uma etapa separada com o `tsc`.

## Configuração do Framework

Seu `tsconfig.json` precisa do seguinte:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Evite importar `webdriverio` ou `@wdio/sync` explicitamente.
Os tipos `WebdriverIO` e `WebDriver` ficam acessíveis de qualquer lugar depois de adicionados a `types` no `tsconfig.json`. Se você usar serviços, plugins adicionais do WebdriverIO ou o pacote de automação `devtools`, adicione-os também à lista `types`, pois muitos fornecem tipagens adicionais.

## Tipos do Framework

Dependendo do framework que você usa, será necessário adicionar os tipos desse framework à propriedade types do seu `tsconfig.json`, além de instalar suas definições de tipos. Isso é especialmente importante se você quiser ter suporte de tipos para a biblioteca de asserções integrada [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Por exemplo, se você decidir usar o framework Mocha, precisará instalar `@types/mocha` e adicioná-lo desta forma para ter todos os tipos disponíveis globalmente:

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

`jasmine` carrega `@types/jasmine`, que fornece `jasmine`, `spyOn` e `expectAsync`. Com `@wdio/jasmine-framework`, o `expect` global retorna `void` para os matchers síncronos do Jasmine e uma `Promise` para os matchers do WebdriverIO e os matchers assíncronos do Jasmine. O `expectAsync` também possui os matchers do WebdriverIO. A exportação `expect` do `expect-webdriverio` mantém seus matchers do Jest.

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

## Serviços

Se você usa serviços que adicionam comandos ao escopo do navegador, também precisa incluí-los no seu `tsconfig.json`. Por exemplo, se você usa o `@wdio/lighthouse-service`, certifique-se de adicioná-lo também a `types`, por exemplo:

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

Adicionar serviços e reporters à sua configuração do TypeScript também reforça a segurança de tipos do seu arquivo de configuração do WebdriverIO.

## Definições de Tipos

Ao executar comandos do WebdriverIO, todas as propriedades geralmente são tipadas, de modo que você não precisa lidar com a importação de tipos adicionais. No entanto, há casos em que você deseja definir variáveis antecipadamente. Para garantir que elas tenham segurança de tipos, você pode usar todos os tipos definidos no pacote [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Por exemplo, se você quiser definir a opção remota para o `webdriverio`, pode fazer:

```ts
import type { Options } from '@wdio/types'

// Aqui está um exemplo em que você pode querer importar os tipos diretamente
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// Para outros casos, você pode usar o namespace `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Outras opções de configuração
}
```

## Dicas e Sugestões

### Compilar e Lint

Para ficar totalmente seguro, você pode considerar seguir as boas práticas: compile seu código com o compilador TypeScript (execute `tsc` ou `npx tsc`) e tenha o [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) sendo executado em um [hook de pre-commit](https://github.com/typicode/husky).