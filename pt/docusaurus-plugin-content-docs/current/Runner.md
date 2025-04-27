---
id: runner
title: Runner
---

import CodeBlock from '@theme/CodeBlock';

Um runner no WebdriverIO organiza como e onde os testes são executados ao usar o testrunner. Atualmente, o WebdriverIO suporta dois tipos diferentes de runner: runner local e runner de navegador.

## Runner Local

O [Runner Local](https://www.npmjs.com/package/@wdio/local-runner) inicia seu framework (por exemplo, Mocha, Jasmine ou Cucumber) dentro de um processo worker e executa todos os seus arquivos de teste dentro do seu ambiente Node.js. Cada arquivo de teste é executado em um processo worker separado por capacidade, permitindo máxima concorrência. Cada processo worker usa uma única instância de navegador e, portanto, executa sua própria sessão de navegador, permitindo o máximo de isolamento.

Como cada teste é executado em seu próprio processo isolado, não é possível compartilhar dados entre arquivos de teste. Existem duas maneiras de contornar isso:

- usar o [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) para compartilhar dados entre todos os workers
- agrupar arquivos de especificação (leia mais em [Organizing Test Suite](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Se nada mais for definido no `wdio.conf.js`, o Runner Local é o runner padrão no WebdriverIO.

### Instalação

Para usar o Runner Local, você pode instalá-lo via:

```sh
npm install --save-dev @wdio/local-runner
```

### Configuração

O Runner Local é o runner padrão no WebdriverIO, então não há necessidade de defini-lo dentro do seu `wdio.conf.js`. Se você quiser configurá-lo explicitamente, pode defini-lo da seguinte forma:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Runner de Navegador

Ao contrário do [Runner Local](https://www.npmjs.com/package/@wdio/local-runner), o [Runner de Navegador](https://www.npmjs.com/package/@wdio/browser-runner) inicia e executa o framework dentro do navegador. Isso permite que você execute testes unitários ou de componentes em um navegador real, em vez de em um JSDOM, como muitos outros frameworks de teste.

Embora o [JSDOM](https://www.npmjs.com/package/jsdom) seja amplamente utilizado para fins de teste, no final das contas, não é um navegador real nem permite emular ambientes móveis. Com este runner, o WebdriverIO permite que você execute facilmente seus testes no navegador e use comandos WebDriver para interagir com elementos renderizados na página.

Aqui está uma visão geral da execução de testes no JSDOM versus o Runner de Navegador do WebdriverIO:

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Executa seus testes dentro do Node.js usando uma reimplementação dos padrões da web, notadamente os padrões WHATWG DOM e HTML | Executa seu teste em um navegador real e roda o código em um ambiente que seus usuários utilizam |
|2.| Interações com componentes só podem ser imitadas via JavaScript | Você pode usar a [API WebdriverIO](api) para interagir com elementos através do protocolo WebDriver |
|3.| O suporte ao Canvas requer [dependências adicionais](https://www.npmjs.com/package/canvas) e [tem limitações](https://github.com/Automattic/node-canvas/issues) | Você tem acesso à verdadeira [API Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM tem algumas [ressalvas](https://github.com/jsdom/jsdom#caveats) e APIs Web não suportadas | Todas as APIs Web são suportadas, pois os testes são executados em um navegador real |
|5.| Impossível detectar erros entre navegadores | Suporte para todos os navegadores, incluindo navegadores móveis |
|6.| __Não__ pode testar estados de pseudo-elementos | Suporte para estados de pseudo-elementos como `:hover` ou `:active` |

Este runner usa o [Vite](https://vitejs.dev/) para compilar seu código de teste e carregá-lo no navegador. Ele vem com presets para os seguintes frameworks de componentes:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Cada arquivo de teste / grupo de arquivos de teste é executado dentro de uma única página, o que significa que entre cada teste a página é recarregada para garantir o isolamento entre os testes.

### Instalação

Para usar o Runner de Navegador, você pode instalá-lo via:

```sh
npm install --save-dev @wdio/browser-runner
```

### Configuração

Para usar o Runner de Navegador, você deve definir uma propriedade `runner` dentro do seu arquivo `wdio.conf.js`, por exemplo:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Opções do Runner

O Runner de Navegador permite as seguintes configurações:

#### `preset`

Se você testa componentes usando um dos frameworks mencionados acima, pode definir um preset que garante que tudo seja configurado automaticamente. Esta opção não pode ser usada junto com `viteConfig`.

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

Defina sua própria [configuração Vite](https://vitejs.dev/config/). Você pode passar um objeto personalizado ou importar um arquivo `vite.conf.ts` existente se usar o Vite.js para desenvolvimento. Observe que o WebdriverIO mantém configurações Vite personalizadas para configurar o ambiente de teste.

__Tipo:__ `string` ou [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) ou `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Exemplo:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // ou simplesmente:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // ou use uma função se sua configuração vite contiver muitos plugins
    // que você só quer resolver quando o valor for lido
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Se definido como `true`, o runner atualizará as capacidades para executar testes sem interface gráfica. Por padrão, isso é habilitado em ambientes CI onde uma variável de ambiente `CI` é definida como `'1'` ou `'true'`.

__Tipo:__ `boolean`<br />
__Padrão:__ `false`, definido como `true` se a variável de ambiente `CI` estiver definida

#### `rootDir`

Diretório raiz do projeto.

__Tipo:__ `string`<br />
__Padrão:__ `process.cwd()`

#### `coverage`

O WebdriverIO suporta relatórios de cobertura de teste através do [`istanbul`](https://istanbul.js.org/). Veja [Opções de Cobertura](#coverage-options) para mais detalhes.

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

Diretório para onde escrever o relatório de cobertura.

__Tipo:__ `string`<br />
__Padrão:__ `./coverage`

#### `reporter`

Relatores de cobertura a serem usados. Veja a [documentação do istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) para uma lista detalhada de todos os relatores.

__Tipo:__ `string[]`<br />
__Padrão:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Verifica os limiares por arquivo. Veja `lines`, `functions`, `branches` e `statements` para os limiares reais.

__Tipo:__ `boolean`<br />
__Padrão:__ `false`

#### `clean`

Limpa os resultados de cobertura antes de executar os testes.

__Tipo:__ `boolean`<br />
__Padrão:__ `true`

#### `lines`

Limiar para linhas.

__Tipo:__ `number`<br />
__Padrão:__ `undefined`

#### `functions`

Limiar para funções.

__Tipo:__ `number`<br />
__Padrão:__ `undefined`

#### `branches`

Limiar para ramos.

__Tipo:__ `number`<br />
__Padrão:__ `undefined`

#### `statements`

Limiar para declarações.

__Tipo:__ `number`<br />
__Padrão:__ `undefined`

### Limitações

Ao usar o runner de navegador do WebdriverIO, é importante observar que diálogos de bloqueio de thread como `alert` ou `confirm` não podem ser usados nativamente. Isso ocorre porque eles bloqueiam a página da web, o que significa que o WebdriverIO não pode continuar se comunicando com a página, fazendo com que a execução fique travada.

Nessas situações, o WebdriverIO fornece mocks padrão com valores de retorno padrão para essas APIs. Isso garante que, se o usuário acidentalmente usar APIs de popup web síncronas, a execução não ficará travada. No entanto, ainda é recomendável que o usuário faça mock dessas APIs web para uma melhor experiência. Leia mais em [Mocking](/docs/component-testing/mocking).

### Exemplos

Certifique-se de verificar a documentação sobre [testes de componentes](https://webdriver.io/docs/component-testing) e dê uma olhada no [repositório de exemplos](https://github.com/webdriverio/component-testing-examples) para exemplos usando esses e vários outros frameworks.