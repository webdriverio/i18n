---
id: typescript
title: Configuração do TypeScript
---

Você pode escrever testes usando [TypeScript](http://www.typescriptlang.org) para obter autocompletar e segurança de tipos.

Você precisará do [`tsx`](https://github.com/privatenumber/tsx) instalado em `devDependencies`, via:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO detectará automaticamente se essas dependências estão instaladas e compilará sua configuração e testes para você. Certifique-se de ter um `tsconfig.json` no mesmo diretório que sua configuração WDIO.

#### TSConfig Personalizado

Se você precisar definir um caminho diferente para o `tsconfig.json`, por favor, defina a variável de ambiente TSCONFIG_PATH com o caminho desejado, ou use a [configuração tsConfigPath](/docs/configurationfile) do wdio config.

Alternativamente, você pode usar a [variável de ambiente](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) para `tsx`.


#### Verificação de Tipos

Observe que o `tsx` não suporta verificação de tipos - se você deseja verificar seus tipos, precisará fazer isso em uma etapa separada com `tsc`.

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
Os tipos `WebdriverIO` e `WebDriver` são acessíveis de qualquer lugar uma vez adicionados a `types` em `tsconfig.json`. Se você usar serviços adicionais do WebdriverIO, plugins ou o pacote de automação `devtools`, adicione-os também à lista `types`, pois muitos fornecem tipagens adicionais.

## Tipos de Framework

Dependendo do framework que você usa, você precisará adicionar os tipos desse framework à propriedade `types` do seu `tsconfig.json`, além de instalar suas definições de tipo. Isso é especialmente importante se você quiser ter suporte de tipos para a biblioteca de asserção integrada [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Por exemplo, se você decidir usar o framework Mocha, você precisa instalar `@types/mocha` e adicioná-lo assim para ter todos os tipos disponíveis globalmente:

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

## Serviços

Se você usar serviços que adicionam comandos ao escopo do navegador, também precisará incluí-los em seu `tsconfig.json`. Por exemplo, se você usar o `@wdio/lighthouse-service`, certifique-se de adicioná-lo também aos `types`, por exemplo:

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

Adicionar serviços e repórteres à sua configuração TypeScript também fortalece a segurança de tipos do seu arquivo de configuração WebdriverIO.

## Definições de Tipo

Ao executar comandos WebdriverIO, todas as propriedades geralmente são tipadas para que você não precise lidar com a importação de tipos adicionais. No entanto, há casos em que você deseja definir variáveis antecipadamente. Para garantir que essas sejam seguras quanto ao tipo, você pode usar todos os tipos definidos no pacote [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Por exemplo, se você quiser definir a opção remota para `webdriverio`, pode fazer:

```ts
import type { Options } from '@wdio/types'

// Aqui está um exemplo onde você pode querer importar os tipos diretamente
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Erro: Type 'string' is not assignable to type 'number'.ts(2322)
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

### Compilação e Lint

Para ser totalmente seguro, você pode considerar seguir as melhores práticas: compile seu código com o compilador TypeScript (execute `tsc` ou `npx tsc`) e tenha o [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) rodando em um [hook de pré-commit](https://github.com/typicode/husky).