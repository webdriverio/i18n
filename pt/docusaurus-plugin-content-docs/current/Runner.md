---
id: runner
title: Runner
description: "Escolha entre o local runner e o browser runner, e configure as opções do browser runner, como presets, configuração do Vite e cobertura."
---

import CodeBlock from '@theme/CodeBlock';

Um runner no WebdriverIO orquestra como e onde os testes são executados ao usar o testrunner. Atualmente, o WebdriverIO suporta dois tipos diferentes de runner: local runner e browser runner.

## Local Runner

O [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) inicia seu framework (por exemplo, Mocha, Jasmine ou Cucumber) dentro de um processo worker e executa todos os seus arquivos de teste no seu ambiente Node.js. Cada arquivo de teste é executado em um processo worker separado por capability, permitindo a máxima concorrência. Cada processo worker usa uma única instância de navegador e, portanto, executa sua própria sessão de navegador, permitindo o máximo isolamento.

Como cada teste é executado em seu próprio processo isolado, não é possível compartilhar dados entre arquivos de teste. Há duas maneiras de contornar isso:

- use o [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) para compartilhar dados entre todos os workers
- agrupe arquivos spec (leia mais em [Organizando a Suíte de Testes](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Se nada mais for definido no `wdio.conf.js`, o Local Runner é o runner padrão no WebdriverIO.

### Instalação

Para usar o Local Runner, você pode instalá-lo via:

```sh
npm install --save-dev @wdio/local-runner
```

### Configuração

O Local Runner é o runner padrão no WebdriverIO, portanto não há necessidade de defini-lo no seu `wdio.conf.js`. Se você quiser defini-lo explicitamente, pode fazê-lo da seguinte forma:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

Ao contrário do [Local Runner](https://www.npmjs.com/package/@wdio/local-runner), o [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) inicia e executa o framework dentro do navegador. Isso permite que você execute testes unitários ou testes de componentes em um navegador real, em vez de em um JSDOM como muitos outros frameworks de teste. O bundle de testes é executado no Chrome 90, Edge 90, Firefox 90 e Safari 14.1 ou mais recentes. Consulte [Suporte a navegadores](/docs/component-testing#browser-support).

Embora o [JSDOM](https://www.npmjs.com/package/jsdom) seja amplamente usado para fins de teste, no final das contas ele não é um navegador real, nem é possível emular ambientes móveis com ele. Com este runner, o WebdriverIO permite que você execute facilmente seus testes no navegador e use comandos WebDriver para interagir com elementos renderizados na página.

Aqui está uma visão geral da execução de testes no JSDOM vs. o Browser Runner do WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Executa seus testes no Node.js usando uma reimplementação de padrões web, notadamente os padrões WHATWG DOM e HTML | Executa seu teste em um navegador real e roda o código em um ambiente que seus usuários usam |
|2.| Interações com componentes só podem ser imitadas via JavaScript | Você pode usar a [API do WebdriverIO](api) para interagir com elementos por meio do protocolo WebDriver |
|3.| O suporte a Canvas requer [dependências adicionais](https://www.npmjs.com/package/canvas) e [tem limitações](https://github.com/Automattic/node-canvas/issues) | Você tem acesso à [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) real |
|4.| O JSDOM tem algumas [ressalvas](https://github.com/jsdom/jsdom#caveats) e Web APIs não suportadas | Todas as Web APIs são suportadas, pois os testes são executados em um navegador real |
|5.| Impossível detectar erros entre navegadores | Suporte a todos os navegadores, incluindo navegadores móveis |
|6.| __Não__ consegue testar pseudo-estados de elementos | Suporte a pseudo-estados como `:hover` ou `:active` |

Este runner usa o [Vite](https://vitejs.dev/) para compilar seu código de teste e carregá-lo no navegador. Ele vem com presets para os seguintes frameworks de componentes:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Cada arquivo de teste / grupo de arquivos de teste é executado em uma única página, o que significa que entre cada teste a página é recarregada para garantir o isolamento entre os testes.

### Instalação

Para usar o Browser Runner, você pode instalá-lo via:

```sh
npm install --save-dev @wdio/browser-runner
```

### Configuração

Para usar o Browser runner, você precisa definir uma propriedade `runner` no seu arquivo `wdio.conf.js`, por exemplo:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Opções do Runner

O Browser runner permite as seguintes configurações:

#### `preset`

Se você testa componentes usando um dos frameworks mencionados acima, pode definir um preset que garante que tudo esteja configurado de imediato. Esta opção não pode ser usada junto com `viteConfig`.

__Tipo:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Exemplo:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Defina sua própria [configuração do Vite](https://vitejs.dev/config/). Você pode passar um objeto personalizado ou importar um arquivo `vite.conf.ts` existente se usar o Vite.js para desenvolvimento. Observe que o WebdriverIO mantém configurações personalizadas do Vite para montar o ambiente de teste.

__Tipo:__ `string` ou [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) ou `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Exemplo:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // ou apenas:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // ou use uma função se sua configuração do vite contiver muitos plugins
    // que você só deseja resolver quando o valor for lido
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Se definido como `true`, o runner atualizará as capabilities para executar os testes em modo headless. Por padrão, isso é habilitado em ambientes de CI onde uma variável de ambiente `CI` está definida como `'1'` ou `'true'`.

__Tipo:__ `boolean`<br />
__Padrão:__ `false`, definido como `true` se a variável de ambiente `CI` estiver definida

#### `rootDir`

Diretório raiz do projeto.

__Tipo:__ `string`<br />
__Padrão:__ `process.cwd()`

#### `coverage`

O WebdriverIO suporta relatórios de cobertura de testes através do [`istanbul`](https://istanbul.js.org/). Consulte [Opções de Cobertura](#coverage-options) para mais detalhes.

__Tipo:__ `object`<br />
__Padrão:__ `undefined`

### Opções de Cobertura

As seguintes opções permitem configurar os relatórios de cobertura.

#### `enabled`

Habilita a coleta de cobertura.

__Tipo:__ `boolean`<br />
__Padrão:__ `false`

#### `include`

Lista de arquivos incluídos na cobertura como padrões glob.

__Tipo:__ `string[]`<br />
__Padrão:__ `[**]`

#### `exclude`

Lista de arquivos excluídos da cobertura como padrões glob.

__Tipo:__ `string[]`<br />
__Padrão:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Lista de extensões de arquivo que o relatório deve incluir.

__Tipo:__ `string | string[]`<br />
__Padrão:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Diretório onde o relatório de cobertura será gravado.

__Tipo:__ `string`<br />
__Padrão:__ `./coverage`

#### `reporter`

Reporters de cobertura a serem usados. Consulte a [documentação do istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) para uma lista detalhada de todos os reporters.

__Tipo:__ `string[]`<br />
__Padrão:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Verifica os limites por arquivo. Consulte `lines`, `functions`, `branches` e `statements` para os limites propriamente ditos.

__Tipo:__ `boolean`<br />
__Padrão:__ `false`

#### `clean`

Limpa os resultados de cobertura antes de executar os testes.

__Tipo:__ `boolean`<br />
__Padrão:__ `true`

#### `lines`

Limite para linhas.

__Tipo:__ `number`<br />
__Padrão:__ `undefined`

#### `functions`

Limite para funções.

__Tipo:__ `number`<br />
__Padrão:__ `undefined`

#### `branches`

Limite para branches.

__Tipo:__ `number`<br />
__Padrão:__ `undefined`

#### `statements`

Limite para statements.

__Tipo:__ `number`<br />
__Padrão:__ `undefined`

### Limitações

Ao usar o browser runner do WebdriverIO, é importante observar que diálogos que bloqueiam a thread, como `alert` ou `confirm`, não podem ser usados nativamente. Isso ocorre porque eles bloqueiam a página web, o que significa que o WebdriverIO não consegue continuar se comunicando com a página, fazendo com que a execução trave.

Nessas situações, o WebdriverIO fornece mocks padrão com valores de retorno padrão para essas APIs. Isso garante que, se o usuário usar acidentalmente web APIs de popup síncronas, a execução não trave. No entanto, ainda é recomendado que o usuário faça mock dessas web APIs para uma melhor experiência. Leia mais em [Mocking](/docs/component-testing/mocking).

### Exemplos

Não deixe de conferir a documentação sobre [testes de componentes](https://webdriver.io/docs/component-testing) e dê uma olhada no [repositório de exemplos](https://github.com/webdriverio/component-testing-examples) para ver exemplos usando esses e vários outros frameworks.