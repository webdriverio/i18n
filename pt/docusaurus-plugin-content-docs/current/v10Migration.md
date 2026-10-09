---
id: v10-migration
title: Da v9 para a v10
description: Atualize um projeto WebdriverIO v9 para a v10, incluindo todas as mudanças incompatíveis e uma skill para agentes de programação que aplica este guia.
---

Este guia reúne as mudanças incompatíveis do WebdriverIO `v10` e o que você precisa fazer a respeito delas.

Diferentemente das versões principais anteriores, a maioria dessas mudanças não pode ser aplicada pelo [codemod](https://github.com/webdriverio/codemod) do WebdriverIO, porque elas dependem do que seus testes realmente significam. As [assinaturas de comandos legadas](#legacy-command-signatures) abaixo são substituições mecânicas. Cada uma das outras seções descreve como encontrar os pontos afetados na sua suíte.

## Migrar com um agente de programação

Forneça ao seu agente a skill de migração para a v10 e peça que ele migre a suíte para o WebdriverIO v10, seguindo esta página. A skill é o procedimento: o que procurar, qual codemod executar e quando parar. Esta página é a fonte de verdade para cada mudança incompatível.

Instale-a a partir do projeto que você está atualizando. A [CLI de skills](https://skills.sh) lê [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) deste repositório e a grava no diretório de skills dos agentes que você escolher:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` instala esta skill. As skills para trabalhar no repositório do WebdriverIO são marcadas como internas e não são oferecidas. A CLI pergunta para quais agentes instalar e grava a skill no diretório de projeto de cada agente. Você também pode anexar esse arquivo ao chat.

Seletores estritos e listas simples de `specs` / `exclude` em capabilities só aparecem quando a suíte é executada. A skill não consegue decidir esses casos apenas a partir do código-fonte.

## Node.js

O WebdriverIO v10 requer Node.js 22.19.0 ou posterior. Node.js 18 e 20 não são mais suportados. A CI cobre Node.js 22, 24 e 26.

## Testes de componentes

O browser runner continua sendo executado no Chrome 90, Edge 90, Firefox 90 e Safari 14.1 ou mais recentes. Veja [Suporte a navegadores](/docs/component-testing#browser-support).

O código passado para `browser.execute` permanece em ES2021, para que possa ser executado em navegadores mais antigos sob teste. Esse piso não mudou.

## Mocha

`@wdio/mocha-framework` e `@wdio/browser-runner` dependem do [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). O Mocha 12 precisa de Node.js `^20.19.0 || >=22.12.0`, o que é coberto pelo piso da v10 de 22.19.0.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` deixou de existir. O Mocha removeu a flag `--compilers`, obsoleta há muito tempo, então mapeamentos de compiladores remanescentes são ignorados. Carregue transpiladores ou outros arquivos de configuração com `mochaOpts.require`.

`failHookAffectedTests` tem como padrão `true`. Um hook `before` ou `beforeEach` que falha faz falhar os testes que esse hook ignorou. Defina `mochaOpts.failHookAffectedTests` como `false` para reportar apenas o hook.

Use o `expect-webdriverio` 8, veja [expect-webdriverio 8](#expect-webdriverio-8). O Mocha pode carregar esse pacote duas vezes em um mesmo processo; ele compartilha o estado das asserções entre essas cópias ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Mudanças do Mocha 12 que podem vazar por meio de `mochaOpts`:

- `grep` aceita flags modernas de RegExp.
- `ui` continua sendo `bdd`, `tdd`, `qunit` ou `exports`. Interfaces personalizadas devem manter o sufixo `*-bdd`, `*-tdd` ou `*-qunit`.
- `parallel` continua sem suporte. O WDIO controla o paralelismo das specs; o pool de workers do Mocha gerará um erro se você o habilitar.

O Mocha 12 é ESM-first (`"type": "module"`). O `require('mocha')` programático ainda funciona no Node 22 via `require(esm)`. A CLI do Mocha no WDIO (`wdio run … --mochaOpts.*`) não mudou; a própria CLI do Mocha agora usa `util.parseArgs` em vez de yargs.

## Cucumber

`@wdio/cucumber-framework` depende do [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

O Cucumber 13 requer Node.js 22, 24 ou 26 ou posterior. Ele não roda no Node.js 20, 23 ou 25. O pacote do framework declara esse mesmo intervalo, começando no piso da v10 de 22.19.0.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` não tem alias. Defini-lo lança um erro, para que um filtro remanescente não possa executar silenciosamente todos os cenários.

O Cucumber 13 não exporta mais `Cli`. Execuções programáticas passam por `runCucumber` de `@cucumber/cucumber/api`, que é o que o adaptador já usa.

Outras mudanças incompatíveis do Cucumber 13 (caminhos de formatadores ambíguos, workers paralelos, `BeforeAll` / `AfterAll`) estão descritas no [guia de atualização do Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

## Jasmine

`@wdio/jasmine-framework` depende do [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). O Jasmine 6 é testado no Node.js 20, 22 e 24. O piso da v10 de 22.19.0 já cobre esse intervalo.

`jasmineNodeOpts` foi removido. Configure o Jasmine com `jasmineOpts`. Definir `jasmineNodeOpts` lança um erro:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` não é mais lido. Use `jasmineOpts.stopOnSpecFailure`. Um `failFast` remanescente não interrompe a suíte. O `failFast` do Cucumber é uma opção diferente e continua funcionando.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` foi removido. Use `jasmineOpts.oneFailurePerSpec`. Definir a chave antiga lança um erro:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Os matchers síncronos do Jasmine voltaram a ser síncronos. Na v9, o `expect` global era o `expectAsync` do Jasmine, então `expect(1).toBe(1)` retornava uma promise. Na v10, os matchers nativos do Jasmine e os matchers que você adiciona com `jasmine.addMatchers` retornam `undefined`. Os matchers do WebdriverIO, os matchers assíncronos do Jasmine e os matchers de `jasmine.addAsyncMatchers` ainda retornam uma promise, então continue usando `await` neles. Você não precisa mudar `await expect($('#logo')).toBeDisplayed()` para `expectAsync()`: o `expect` global encaminha os matchers do WebdriverIO para `expectAsync` por você. `await expect(1).toBe(1)` continua funcionando.

Uma asserção síncrona que falha sem `await` agora faz a spec falhar. Na v9, era uma promise rejeitada: se nada a aguardasse, a spec podia passar, com apenas uma rejeição não tratada no log. Após a atualização, observe as specs que começarem a falhar. Elas tinham uma falha oculta na v9, e a correção está no teste ou na aplicação, não na chamada `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: passava mesmo quando `onSave` não era chamado
    // v10: falha quando `onSave` não é chamado
    expect(onSave).toHaveBeenCalled()
})
```

O resultado de um matcher síncrono agora é `undefined`, então `.then()` ou `.catch()` sobre ele lança um `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

Outros efeitos dessa mudança:

- `oneFailurePerSpec` agora interrompe a spec na sua primeira asserção que falha: imediatamente para um matcher síncrono, e quando a promise é resolvida para um matcher assíncrono aguardado.
- Os matchers de spy do Jasmine funcionam sem `await`. Na v9, `toHaveBeenCalled`, `toHaveSpyInteractions` e `toHaveNoOtherSpyInteractions` falhavam com "Does not take arguments", e um spy não chamado passava sem `await`.
- `jasmine.addMatchers` não é mais substituído, então o Jasmine não exibe mais o seu aviso "Monkey patching detected".

`toHaveSize` tem dois significados. Em um valor do WebdriverIO, é o matcher do WebdriverIO e verifica o tamanho do elemento: um elemento, um array de elementos (incluindo o resultado de `$$().filter()`), um `Element[]`, um elemento multi-remote, um browser, um browsing context, um mock, o wrapper `some()` ou uma promise como um `$()` encadeável. Em qualquer outro valor, é o matcher do Jasmine e verifica o comprimento. Na v9, o matcher do Jasmine era sempre executado.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, síncrono
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, assíncrono
```

Os tipos seguem as mesmas regras. `@wdio/jasmine-framework` agora tipa o `expect` global com os matchers do Jasmine, mais os matchers do WebdriverIO e os matchers assíncronos do Jasmine, que retornam uma promise. Remova `expect-webdriverio/jasmine-wdio-expect-async` de `types` no seu `tsconfig.json`, porque ele tipa todos os matchers como assíncronos. Adicione `jasmine` se ainda não estiver lá:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` e `expect.multiRemote()` agora também funcionam em specs do Jasmine. Antes, eles não estavam no `expect` do Jasmine em tempo de execução.

## expect-webdriverio 8

`@wdio/globals`, `@wdio/runner` e `@wdio/browser-runner` exigem o `expect-webdriverio` 8 como peer dependency. Na v9, era o `expect-webdriverio` 7. Se o seu `package.json` lista `expect-webdriverio`, atualize-o para a versão 8 na mesma mudança que os pacotes `@wdio/*`.

O `expect-webdriverio` 8 tem suas próprias mudanças incompatíveis. Seu [guia de migração da v7 para a v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) lista cada mudança e sua substituição. Estas são as mudanças com maior probabilidade de afetar uma suíte de testes:

- `toHaveText` em `$$()` compara os elementos índice por índice. Um array esperado em uma ordem diferente da página falha. Use a ordem da página, `expect.oneOf()` ou `expect.arrayContaining()`.
- Um array de valores esperados em um único elemento faz falhar `toHaveText`, `toHaveHTML`, `toHaveComputedLabel` e `toHaveComputedRole`. Use `expect.oneOf()`.
- `setFeatureFlags()` e a opção `featureFlags` foram removidos.
- Estas APIs obsoletas foram removidas: `setOptions` (use `setDefaultOptions`), `getConfig` (use `getDefaultOptions`), `matchers` (use `wdioCustomMatchers`), `toHaveAttr` (use `toHaveAttribute`), `toHaveClass` (use `toHaveElementClass`), `toBeRequestedWithResponse()` (use `toBeRequestedWith({ response })`) e `expect-webdriverio/types` (use `expect-webdriverio/expect-global`).
- Os hooks `beforeAssertion` e `afterAssertion` recebem o nome do alias que o teste chamou, para `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` e `toBeRequested`. Na v9, eles recebiam o nome do matcher por trás do alias, por exemplo `toExist` para `toBeExisting`.
- Em um browser multi-remote, passe o resultado de `$$()` para `expect`. Um array simples como `[...elements]` ou `Array.from(elements)` não é reconhecido como elementos, e a asserção falha.

Em um browser multi-remote, uma asserção verifica todas as instâncias, e `expect.multiRemote()` fornece um valor esperado por instância. Veja [Asserções em multiremote](/docs/multiremote#assertions).

## Global de multi-remote

O global em minúsculas `multiremotebrowser` foi removido, tanto de `@wdio/globals` quanto dos globais do `eslint-plugin-wdio`. Use `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

`specs` e `exclude` em capabilities não são mais lidos. Use `wdio:specs` e `wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

As chaves de configuração de nível superior continuam sendo `specs` e `exclude`. Uma lista simples remanescente em uma capability não seleciona arquivos para essa capability. A capability então usa os `specs` e `exclude` de nível superior.

Os aliases `tunnelIdentifier` e `parentTunnel` foram removidos dos tipos de opções do Sauce Labs. Use `tunnelName` e `tunnelOwner`.

## TypeScript

Os tipos `Element`, `MultiRemoteBrowser` e `MultiRemoteElement` exportados por `webdriverio` foram removidos. Use o namespace global `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` agora declara `then`, e `ChainablePromiseArray` declara `then`, `catch` e `finally`. Os tipos encadeáveis descrevem o valor antes do `await`. Eles não correspondem mais ao valor aguardado:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Tipe o valor aguardado como `WebdriverIO.Element` ou `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Ambos os tipos encadeáveis agora correspondem a `T extends PromiseLike<unknown>`. Um tipo condicional que verifica `PromiseLike` segue um ramo diferente para `$()` e `$$()` do que na v9. Por exemplo, `Awaited<ChainablePromiseElement>` agora é `WebdriverIO.Element`, e `Awaited<ChainablePromiseArray>` é `WebdriverIO.ElementArray`.

As propriedades de um `$$()` não aguardado mudaram de tipo. Elas estão disponíveis imediatamente, antes de a consulta ser resolvida, então leia-as sem `await` ou `.then()`:

| Propriedade | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | o pai, não uma promise (veja abaixo) |
| `foundWith` | nenhum | o comando que encontrou a lista, por exemplo `$$` ou `custom$$` |
| `props` | nenhum | os argumentos extras desse comando |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

Em uma consulta encadeada como `$('form').$$('input')`, `parent` é o encadeável `$('form')` até a lista ser resolvida, e o elemento resolvido depois disso. Aguarde a lista antes de usar `parent` como um elemento.

Em tempo de execução, `filter()`, `filterSeries()` e `slice()` em uma lista `$$()` retornam uma lista de elementos, não um array simples. O resultado mantém `selector`, `foundWith`, `parent` e `props` da lista de origem. Na v9, `filter()` retornava um array simples sem essas propriedades. Os tipos ainda não refletem isso: `filter()` e `filterSeries()` são declarados como retornando `Promise<WebdriverIO.Element[]>`, e `slice()` retorna `WebdriverIO.Element[]`, então o TypeScript reporta um erro quando você lê essas propriedades no resultado.

O WebdriverIO não executa a consulta novamente para a própria lista derivada: um índice além do seu fim não espera por mais correspondências, e nunca retorna um elemento que o filtro excluiu. Seus membros continuam sendo os elementos da consulta de origem, com seus `selector` e `index` originais. Se um membro se tornar obsoleto (stale), o WebdriverIO o busca novamente a partir da consulta de origem naquele índice, o que pode ser outro elemento se a página tiver mudado. Código que reexecuta a consulta de uma lista a partir das propriedades da lista, por exemplo `parent[foundWith](selector, ...props)`, obtém a lista completa, não a filtrada.

Os pacotes publicados definem `typeScriptVersion` como 6.0.3, correspondendo à versão do TypeScript com a qual este repositório é compilado.

`browser.mock()` aceita o `URLPattern` do `urlpattern-polyfill` e o `URLPattern` nativo (global no Node.js 24 e tipado pela biblioteca `dom` do TypeScript 6).

O TypeScript 6 torna obsoletos `"moduleResolution": "node"` e `"baseUrl"`, e torna `strict` o padrão. O `create-wdio` agora gera `"moduleResolution": "bundler"` para projetos ESM e `"NodeNext"` para projetos CommonJS. Se você atualizar o TypeScript em um projeto existente, altere essas opções no seu `tsconfig.json`.

Para um projeto ESM:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

Para um projeto CommonJS, use `NodeNext` para ambas as opções, como o `create-wdio` faz:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

O TypeScript 6 também muda o padrão de `types` para `[]`, então ele não carrega mais todos os pacotes `@types/*` instalados. Se o seu `tsconfig.json` não tem uma lista `types`, globais como `describe` e `it` do Mocha falham com `Cannot find name`. Liste os pacotes de tipos que seus testes usam, como o `create-wdio` faz. Por exemplo, com Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` grava `compilerOptions.target` e `compilerOptions.lib` como `es2024`. A verificação de tipos desse arquivo precisa do TypeScript 5.7 ou mais recente. O `tsx`, que executa a configuração e os testes, não faz verificação de tipos, então um compilador mais antigo só importa quando você mesmo executa o `tsc`.

Um `tsconfig.json` existente não é reescrito. Uma configuração gerada que estende outra configuração mantém o `target` e o `lib` da configuração pai.

No hook `afterAssertion`, o tipo de `params.result` agora é `{ pass, message }`, como os matchers o fornecem. Na v9, o tipo era `{ result, message }`, mas `params.result.result` era sempre `undefined` em tempo de execução. Leia `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` é `true` quando o valor corresponde ao valor esperado, também com `.not`. Assim, com `.not`, a asserção passa quando `pass` é `false`. O hook não informa se o teste usou `.not`.

## Reporters

O evento `result` do browser é encaminhado aos reporters como `client:afterCommand`. Esse payload e o tipo `AfterCommandArgs` não têm mais uma propriedade `name`. Leia `command` em vez disso. Comandos personalizados já enviavam `command`.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`addEnvironment(name, value)` em `@wdio/allure-reporter` foi removido. Ele não tinha efeito. Defina as linhas de ambiente com [`reportedEnvironmentVars`](/docs/allure-reporter) nas opções do reporter Allure.

## `$` é estrito

`$` agora representa __exatamente um__ elemento. Se o seletor for resolvido para mais de um elemento, o comando lança um `StrictSelectorError` em vez de usar silenciosamente a primeira correspondência:

```js
// v9 — clica no primeiro botão, mesmo que existam 12
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

Isso corresponde aos [locators do Playwright](https://playwright.dev/docs/locators#strictness). O Cypress é diferente: suas consultas podem ser resolvidas para vários elementos, e são os comandos de ação, como [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn), que rejeitam por padrão um subject com vários elementos. Um seletor que silenciosamente é resolvido para vários elementos é quase sempre um bug latente: ele passa hoje e interage com o elemento errado assim que alguém adiciona um segundo botão à página.

A regra se aplica a cada etapa de uma cadeia (`$('form').$('input')`) e a todo tipo de seletor que `$` aceita — seletores em string (incluindo os que atravessam o shadow DOM), funções JS, seletores mobile e referências de estratégias personalizadas.

### O que não mudou

- `$$` ainda retorna zero ou mais elementos. Desde a v10, essa lista é um [`ElementArray`](/docs/api/browser/$$): um array real que você pode aguardar com `await`, com `for await` e `map` / `filter` assíncronos disponíveis antes de ser resolvido. `await $$('button').length` é a contagem. `$$('button').length > 0` não é, porque `length` é uma promise até a lista ser resolvida. `for (const el of $$('button'))` lança um erro até você aguardar a lista; use `for await`, ou `for...of` após o `await`.
- Os comandos auxiliares dedicados `custom$`, `shadow$` e `react$` não são estritos — eles ainda retornam sua primeira correspondência, assim como seus equivalentes `$$`.
- Um seletor que não corresponde a nada ainda retorna um elemento resolvido de forma preguiçosa, então `waitForExist` e a [espera automática](/docs/autowait) se comportam como antes.
- Passar uma referência de elemento, por exemplo `$(await browser.getActiveElement())`, sempre se refere a um único nó e nunca é verificado.

### Como auditar sua suíte

Não há codemod para isso: só você pode dizer se uma segunda correspondência é um bug ou intencional. Duas abordagens práticas:

1. __Execute sua suíte.__ Cada violação lança um erro com o seletor e o número de correspondências, o que geralmente é suficiente para corrigi-la na hora.
2. __Verifique os seletores amplos antecipadamente.__ Para cada `$(...)` genérico nos seus page objects, imprima com quantos elementos ele realmente corresponde:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` é amplo demais
   ```

Então, restrinja o seletor — de preferência para uma consulta voltada ao usuário, como `$('button=Submit')` ou `$('aria/Submit')`, veja [Seletores](/docs/selectors) — ou declare explicitamente que você quer a primeira correspondência:

```js
await $('button[type="submit"]').click()
// ...ou, se o primeiro realmente for o que você quer
await $$('button')[0].click()
```

### Desativando

Para uma única consulta:

```js
await $('button', { strict: false }).click()
```

Para um projeto inteiro, restaurando o comportamento da v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

Um elemento lembra como foi consultado, então buscá-lo novamente — após uma referência de elemento obsoleta, ou por meio de `waitForExist` — mantém o modo estrito da chamada original.

:::info

Internamente, um `$` estrito emite uma requisição `findElements` em vez de `findElement`, já que contar as correspondências é a única maneira de aplicar a regra. Isso é uma única ida e volta em ambos os casos, mas é visível para serviços personalizados e mocks de WebDriver que se baseiam no comando `findElement`.

:::

## Assinaturas de comandos legadas

A v9 ainda aceitava formas posicionais mais antigas e emitia avisos. A v10 aceita apenas o objeto de opções.

O [codemod](https://github.com/webdriverio/codemod) da v10 reescreve `addCommand` e `overwriteCommand` quando o terceiro argumento é um booleano, `getHTML(true)` e `getHTML(false)`, e `getCookies` quando o filtro é uma string ou um array de um elemento. Uma chamada `getCookies` com mais de um nome é deixada inalterada, porque um filtro corresponde a um nome.

Instale o codemod primeiro. O WebdriverIO não depende dele.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

Use `--parser=tsx` para arquivos TypeScript.

### `addCommand` e `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

Um terceiro argumento booleano é um erro de TypeScript. Em tempo de execução, ele lança:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` e `instances` pertencem a esse mesmo objeto de opções. Omita o terceiro argumento para anexar um comando ao browser.

### `getCookies`

Filtros de string e de array de strings são rejeitados. Passe um [objeto de filtro de cookie](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Uma chamada filtra um nome; chame novamente para outro nome.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` sem argumentos ainda retorna todos os cookies visíveis para a página.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` sem argumentos ainda inclui a própria tag do elemento.

### `newWindow`

`windowName` e `windowFeatures` deixaram de existir. Eles só se aplicavam ao WebDriver Classic. O comando ainda aceita `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Use `type: 'tab'` para abrir uma aba.

### `startActivity`

Apenas o objeto de opções é aceito. `appWaitPackage`, `appWaitActivity` e `optionalIntentArguments` deixaram de existir. Eles só se aplicavam ao endpoint HTTP do Appium que foi removido. `mobile: startActivity` não os aceita, e passá-los lança um erro.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## Comandos removidos

`browser.throttle` e os comandos obsoletos `touchAction` foram removidos.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | A [Actions API](/docs/api/browser/action) com um ponteiro de toque, ou os comandos mobile [`tap`](/docs/api/mobile/tap) e [`swipe`](/docs/api/mobile/swipe) |

Um gesto de toque com a Actions API:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` foi removido. Ele compactava um arquivo local e o enviava para o endpoint `file` do Selenium, que não faz parte do WebDriver nem do WebDriver BiDi. Defina um input de arquivo com [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` precisa de uma sessão BiDi. Os caminhos são abertos pelo navegador. Um caminho relativo é resolvido em relação a `process.cwd()`. A preparação de arquivos do Selenium Grid não faz parte da v10. Uma suíte que dependia de `uploadFile` para enviar bytes a um nó precisa colocar o arquivo onde o navegador possa lê-lo e depois chamar `setFiles`.

Em uma sessão clássica local, `element.setValue('/local/path')` ainda digita um caminho que o navegador local já consegue ver. O endpoint bruto do Selenium continua sendo `browser.file()` para usuários do Grid que o chamam diretamente.

## `executeAsync`

`browser.executeAsync` e `element.executeAsync` foram removidos. Passe uma função `async` para [`execute`](/docs/api/browser/execute). O valor de retorno da função, incluindo uma promise retornada, é o resultado do comando. O timeout `script` ainda se aplica.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Remova o callback `done` do WebDriver. Um script em string que esperava esse callback como último argumento precisa retornar uma promise em vez disso. Em tempo de execução, `executeAsync` não é uma função.

## `switchToFrame`

`browser.switchToFrame` não é mais um comando público.

Em uma sessão WebDriver BiDi, `switchFrame` e `switchWindow` lançam um erro. Uma aba, uma janela e um frame são um `WebdriverIO.BrowsingContext` que você mantém. `browser.url()` navega no contexto de nível superior inicial da sessão e o retorna. `browser.newWindow()` retorna o novo contexto e não alterna para ele. `context.frame()` retorna um frame filho. `context.parent` é o frame a partir do qual você o abriu.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` é a string da URL do documento. Navegue em um contexto mantido com `context.navigate(url)`. Os metadados de carregamento de `browser.url()` estão em `context.request`.

Em uma sessão Classic, continue chamando `switchFrame` com um elemento, ou `null` para o frame superior. Uma string ou uma função é rejeitada nesse caso.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

A chave `page load` do JSON Wire Protocol é rejeitada. Use `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` e `script` não mudaram.

## Acesso a instâncias multi-remote

Um browser multi-remote não armazena mais cada sessão como uma propriedade própria. O mesmo vale para um elemento multi-remote. `getInstance` e `select` são a forma de endereçar uma sessão.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

Uma augmentation de TypeScript que adiciona `myChromeBrowser: WebdriverIO.Browser` a `WebdriverIO.MultiRemoteBrowser` não corresponde mais a uma propriedade em tempo de execução. Exclua essa augmentation e chame `getInstance`.

Com o testrunner e `injectGlobals` ativados, o nome da instância ainda é um global (`myChromeBrowser.url(...)`). Esse global é a sessão individual. Ele não é `browser.myChromeBrowser`.

Os resultados dos comandos permanecem na ordem das capabilities: a primeira entrada pertence à primeira chave do objeto de capabilities.

`browser.$$()` em um browser multi-remote retorna um `WebdriverIO.MultiRemoteElementArray`, não um `MultiRemoteElement[]` simples. Ele ainda é um array, então uma leitura por índice como `elements[0]` continua funcionando.

Seus métodos `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` e `reduce` são assíncronos, como em um `WebdriverIO.ElementArray`, e retornam uma promise, também após o `await`. O mesmo vale para as listas que `custom$$()`, `react$$()` e `shadow$$()` retornam. Na v9, esses eram os métodos síncronos de um array simples:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` e, em um elemento, `shadow$()`, `nextElement()`, `previousElement()` e `parentElement()` retornam um único `WebdriverIO.MultiRemoteElement`, como `$()` faz. Na v9, eles retornavam um elemento por instância em um array simples. Leia o elemento de um browser com `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` e, em um elemento, `shadow$$()` retornam um único `WebdriverIO.MultiRemoteElementArray`, como `$$()` faz. Na v9, eles retornavam uma lista por instância em um array simples. Cada entrada endereça todas as instâncias. Uma instância que encontra menos elementos não tem elemento naquele índice:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` tem o tipo `Selector`, assim como `WebdriverIO.Element['selector']`. Na v9, ele tinha o tipo `string`, mas o valor também podia ser uma função ou uma referência de estratégia personalizada. Código TypeScript que o usa como string, por exemplo `element.selector.includes('…')`, precisa verificar o tipo primeiro.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` e `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` foram removidas. `select()` está sempre disponível, e `$$()` sempre retorna o array de elementos acima. Exclua ambas as variáveis.

## Respostas binárias de mock

`mock.respond()` e `mock.respondOnce()` aceitam payloads `Uint8Array` e `ArrayBuffer`, incluindo um `Buffer` com polyfill em testes de componentes sem um `Buffer` global.

`mock.getBinaryResponse()` agora é tipado como `Uint8Array | null`. Ele ainda retorna um `Buffer` no Node.js, mas retorna um `Uint8Array` no navegador. Para usar métodos específicos de Buffer no Node.js, converta primeiro um resultado não nulo:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Mocks de rede em multi-remote

`browser.mock()` em um browser multi-remote retorna um `WebdriverIO.MultiRemoteMock`, não um array de mocks. `respond`, `restore` e os outros métodos de mock são executados em todas as instâncias. Leia as requisições capturadas a partir do mock de um browser. Use o tipo `WebdriverIO.MultiRemoteMock` do namespace global `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` lança `Multi-remote object has no instance named "<name>"` quando o nome não é um dos `instances`. Um mock de `browser.select('myFirefoxBrowser', 'myChromeBrowser')` lista essas instâncias nessa ordem, que pode ser diferente de `browser.instances`. Não presuma que `mocks[0]` seja um browser específico.

## Respostas de mock que ignoram o backend

`mock.respond(..., { fetchResponse: false })` não chama o backend. Na v9, um mock que também filtrava por `statusCode` ou `responseHeaders` ignorava esse filtro e ainda respondia a todas as requisições correspondentes. Na v10, `respond()` e `respondOnce()` lançam um erro, porque esses filtros só podem ser decididos a partir da resposta do backend.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Para manter o filtro, omita `fetchResponse` para que o mock busque a resposta, verifique o status ou os headers e então substitua o corpo.

## Referências de elementos

Os ids de elementos usam a chave W3C WebDriver `element-6066-11e4-a52e-4f735466cecf` e a propriedade `elementId`. O campo `ELEMENT` do JSON Wire Protocol não faz mais parte do contrato de elementos.

`WebdriverIO.Element` não declara mais `ELEMENT`. Leia `element.elementId`, que as instâncias de elementos já expõem.

`browser.execute` e os scripts nativos que enviam um elemento para a página (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView` e os demais) passam apenas a referência W3C:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

Um corpo de find-element que contém apenas `{ ELEMENT: '...' }` não é um elemento. Inclua a chave W3C. Se ambas as chaves estiverem presentes, o WebdriverIO usa o id W3C.

O Jasmine imprime um resultado encadeado de `$()` por meio de `toJSON`. Esse valor é a mesma referência W3C, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

Com WebDriver BiDi, um script que retorna uma `NodeList` (por exemplo, de `querySelectorAll`) ou uma `HTMLCollection` (por exemplo, `element.children`) agora fornece uma lista de referências de elementos, como o WebDriver Classic faz. Na v9, ele fornecia valores BiDi brutos, então `browser.execute` retornava objetos que não eram elementos, e uma estratégia `custom$` ou `custom$$` que retornava `querySelectorAll(...)` não encontrava nenhum elemento. Uma solução alternativa como `Array.from(document.querySelectorAll(...))` ainda funciona, e você pode removê-la:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## Seletores React

`react$` e `react$$` agora funcionam com React 16 a 19, para um app que inicia com `createRoot` ou com `ReactDOM.render`. Antes, `browser.react$` e `browser.react$$` falhavam com React 18 e posteriores (`Could not find the root element of your application`), e em todas as versões um resultado podia vir da renderização anterior à última atualização, então um componente adicionado por uma mudança de estado não era encontrado.

Em uma página onde o React ainda não renderizou uma raiz, os comandos agora esperam até 5 segundos por ela antes de falhar. Antes, eles falhavam imediatamente, então um app que iniciava tarde não era encontrado.

Os comandos não usam mais a biblioteca [resq](https://github.com/baruchvlz/resq), e o WebdriverIO não a instala mais. As regras dos seletores não mudam (veja [Seletores React](/docs/selectors#react-selectors)), com estas exceções:

- `react$` com `props` e `state` encontra um componente que corresponde a ambos. Antes, ele ignorava `props` quando `state` também era fornecido.
- `react$$` fornece cada nó do DOM uma única vez. Antes, um higher-order component e seu filho forneciam o mesmo elemento duas vezes em alguns navegadores.
- Um fragment que contém um fragment fornece uma lista plana de nós. Antes, `react$` podia retornar uma lista.
- Um filtro com valor `null` funciona. Antes, ele falhava com `Cannot convert undefined or null to object`.
- Sem um escopo de elemento, os comandos pesquisam todas as raízes React da página, na ordem do documento, incluindo raízes dentro de outras raízes e raízes em shadow roots abertos. `react$` fornece a primeira correspondência. Antes, eles pesquisavam apenas a primeira raiz, mesmo uma que o React ainda não tivesse renderizado ou tivesse desmontado, e não pesquisavam shadow roots. Em uma página com mais de uma raiz, `react$$` agora pode fornecer mais elementos: para pesquisar apenas uma raiz, chame o comando no seu container, por exemplo `$('#root').react$$('MyComponent')`.
- No container de uma raiz dentro de outra raiz, os comandos pesquisam a raiz interna. Antes, eles pesquisavam a raiz externa.
- No browsing context de um frame, e em um elemento de um frame, os comandos funcionam. Antes, o comando de contexto falhava com `this.executeScript is not a function`, e o comando de elemento falhava com `Could not find instance of React in given element`.

O script interno `webdriverio/scripts/resq` foi removido.

## Testes de componentes

`@wdio/browser-runner` reexporta `fn`, `spyOn` e os tipos de mock de `@vitest/spy` 5 (anteriormente 3). Um mock que seu código chama com `new` precisa de uma implementação `function` ou `class`. Uma arrow function lança `is not a constructor`, e `mockReturnValue` lança um erro quando o mock é chamado com `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

Para outras mudanças em spies, veja o [guia de migração do Vitest](https://vitest.dev/guide/migration).

## Puppeteer

`webdriverio` aceita `puppeteer-core` `>=24 <26`, incluindo o Puppeteer 25. `getPuppeteer()` e `@wdio/lighthouse-service` são testados com essa linha de versões.

## ESLint

`eslint-plugin-wdio` requer ESLint 10. O ESLint 9 chegou ao [fim de vida](https://eslint.org/version-support/) em 2026-08-06 e não é mais suportado. Com TypeScript, use `typescript-eslint` 8.56.0 ou posterior.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` exporta apenas a flat config `flat/recommended`. O nome eslintrc `plugin:wdio/recommended` foi removido.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

A configuração recomendada passa a usar a regra com reconhecimento de tipos `wdio/no-floating-promise`, no lugar de `wdio/await-expect`, quando o pacote `typescript-eslint` está instalado. Instalar apenas `@typescript-eslint/eslint-plugin` não é suficiente.

```sh
npm install --save-dev typescript typescript-eslint
```

Nesse modo, a configuração analisa cada arquivo correspondente com o project service do TypeScript. Limite-a a arquivos TypeScript e certifique-se de que eles façam parte de um `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

Um arquivo JavaScript correspondente que não está no projeto TypeScript, como `wdio.conf.js`, falha com "was not found by the project service". Para fazer lint também de arquivos JavaScript, defina `"allowJs": true`, adicione-os a `include` no `tsconfig.json` e amplie o padrão para `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Frameworks personalizados

`setupExpect` em um adaptador de framework personalizado não aceita mais um `Map` de matchers, e o runner não adiciona mais um método `entries` ao objeto de matchers. Itere com `Object.entries(wdioMatchers)`.

## Perfil do Firefox

`@wdio/firefox-profile-service` não trata mais `legacy` como uma opção do serviço. Essa flag só se aplicava ao Firefox 55 e anteriores. Exclua-a. Um `legacy: true` remanescente é gravado no perfil como uma preferência chamada `legacy`.

## Protocolo WebDriver

Toda sessão é uma sessão [W3C WebDriver](https://w3c.github.io/webdriver/). O WebdriverIO não fala o JSON Wire Protocol nem o Mobile JSON Wire Protocol. A v9 removeu esses comandos. A v10 também remove o envelope de resposta que esses protocolos usavam, então um servidor que ainda o retorna não consegue iniciar uma sessão.

`browser.isW3C` foi removido, incluindo o valor anteriormente encaminhado na mensagem `sessionStarted` do worker. Passar `isW3C` para `attach` é ignorado. O conjunto de comandos BiDi permanece no cliente. Uma conexão BiDi ativa ainda depende de `webSocketUrl`.

### `browser.back()` e `browser.forward()` no BiDi

As chamadas continuam sendo `await browser.back()` e `await browser.forward()`. Nenhum dos comandos recebe argumento ou retorna valor.

Em uma sessão BiDi, esses comandos chamam `browsingContext.traverseHistory` com `delta` `-1` ou `1` no browsing context de nível superior e então esperam pelo estado de prontidão do documento para o qual `pageLoadStrategy` aponta. `none` retorna quando o comando de navegação é aceito. `eager` espera por `browsingContext.domContentLoaded`. `normal`, o padrão, espera por `browsingContext.load`. Uma restauração do back-forward cache não emite esses eventos; o comando retorna quando o `readyState` do documento confirmado já corresponde à estratégia. A espera usa o timeout de carregamento de página da sessão (`timeouts.pageLoad`, 300000 ms quando não definido). Sessões Classic ainda fazem POST em `POST /session/:sessionId/back` e `POST /session/:sessionId/forward`.

Uma entrada de histórico ausente ainda gera rejeição. No BiDi, a mensagem vem de `browsingContext.traverseHistory` e contém `no such history entry`, em vez do texto de erro clássico do WebDriver. Uma navegação que nunca atinge o estado de prontidão esperado é rejeitada com `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` ou `browsingContext.load`.

### Resposta de nova sessão

Create Session precisa retornar o corpo W3C. O WebdriverIO lê `value.sessionId` e `value.capabilities`:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

Um corpo do JSON Wire Protocol é rejeitado. Esse corpo coloca `sessionId` e `status` ao lado de `value`, e coloca as capabilities no próprio `value`:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

A criação da sessão então lança `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` O mesmo erro é gerado quando `value.capabilities` está ausente, mesmo que `value.sessionId` esteja presente.

Um objeto de capabilities plano na sua configuração ainda é válido. O WebdriverIO envolve `{ browserName: 'chrome' }` em `alwaysMatch` antes de enviar a requisição. Chaves com prefixo de fornecedor misturadas com chaves fora do conjunto de capabilities W3C ainda são rejeitadas. Coloque as configurações de fornecedor em `sauce:options`, `bstack:options`, `appium:options` ou outra chave com prefixo.

### Respostas de comandos

O resultado de um comando é `{ "value": … }`. HTTP 200 sem `error` em `value` é sucesso. Um elemento ausente é HTTP 404 com `value.error` definido como `"no such element"`, o que ainda permite uma busca preguiçosa de elemento. Um `status` numérico no corpo é ignorado, incluindo `status: 0` e o antigo código `status: 7` ("no such element"). Envie o objeto de erro W3C em vez disso.

O tipo de erro exportado `JSONWPCommandError` agora é `SessionRequestError`.

### Servidores

Os drivers com os quais o WebdriverIO é executado já falam W3C na conexão do cliente:

- O ChromeDriver é W3C por padrão desde o Chrome 75. O Edge baseado em Chromium segue o mesmo comportamento. O ChromeDriver atual ainda aceita `goog:chromeOptions.w3c: false`, que faz aquela sessão voltar ao protocolo legado. O WebdriverIO não suporta essa opção.
- O geckodriver e o safaridriver da Apple são apenas W3C. Uma resposta do Safari que omite `platformName` ou `browserVersion` ainda é W3C.
- O Selenium 4 e o Grid 4 falam W3C. O Grid parou de traduzir o JSON Wire Protocol na versão 4.9.
- O Appium 2 abandonou o JSON Wire Protocol e o Mobile JSON Wire Protocol. O Appium 3 também abandonou os formatos de parâmetros remanescentes. A v10 requer o Appium 3, abordado abaixo. Uma sessão mobile que omite `setWindowRect` ainda é W3C; essa capability significa que o dispositivo não pode redimensionar uma janela.

Estes servidores ainda falam o JSON Wire Protocol e não são suportados: Selenium 3, PhantomJS, EdgeHTML (`--jwp`) e WinAppDriver conectado diretamente. O driver Windows do Appium continua suportado como cliente W3C. Ele traduz os comandos para o WinAppDriver, incluindo Get Element Property para o endpoint de atributo. Aponte o WebdriverIO para o Appium, não para a porta do WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) não faz esses servidores funcionarem com a v10. A inicialização da sessão ainda exige o corpo W3C acima, e os resultados dos comandos ainda ignoram um `status` numérico. Permaneça no WebdriverIO 9 se esse servidor ainda for necessário.

`webdriver.remote.sessionid` não identifica mais uma sessão Selenium standalone. O Selenium Grid 4 ainda é detectado a partir de `se:cdp`.

A chave de timeout `page load` é abordada em [`setTimeout`](#settimeout). Os ids de elementos são abordados em [Referências de elementos](#element-references). No desktop, `[name="..."]` é um seletor CSS. A estratégia de localização `name` permanece para sessões mobile.

## Appium

O WebdriverIO 10 requer o **Appium 3** e os drivers oficiais atuais (UiAutomator2, XCUITest, Espresso, Windows, Mac2 e assim por diante). Appium 1.x e 2.x não são suportados. Permaneça no WebdriverIO 9 se você não puder atualizar o servidor.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` declara uma peer `appium` opcional de `>=3` e se recusa a iniciar um servidor mais antigo. O `create-wdio` instala `appium@^3` quando o Appium está ausente ou é anterior à versão 3.

Fornecedores de nuvem que ainda expõem o Appium 2 precisam de uma imagem do Appium 3, ou você precisa permanecer no WebdriverIO 9.

### Comandos mobile não recorrem mais ao HTTP

Na v9, muitos auxiliares mobile tentavam `browser.execute('mobile: …')` e, em caso de erro de método desconhecido, recorriam a um endpoint HTTP do Appium removido. Na v10, esse fallback não existe mais: o mesmo erro indica que você deve atualizar para o Appium 3. Prefira os comandos mobile do WebdriverIO (`browser.lock()`, `browser.shake()`, …) ou `browser.execute('mobile: …')` diretamente.

### Comandos de protocolo removidos

O Appium 3 [removeu muitos endpoints obsoletos do base driver](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). O WebdriverIO não expõe mais métodos de cliente para a maioria dessas rotas (por exemplo, `appiumLock`, `touchPerform` e o mapa do Mobile JSON Wire Protocol). Use W3C Actions, o comando mobile correspondente ou um método execute `mobile:` do driver em vez disso.

### Escopo de `--allow-insecure` do Appium

O Appium 3 exige um prefixo de escopo de driver ou `*` nas funcionalidades de `--allow-insecure`, por exemplo `uiautomator2:adb_shell` ou `*:adb_shell`.

### Capabilities do Appium sem prefixo não selecionam mais uma sessão Appium

`automationName`, `deviceName` e `appiumVersion` sem o prefixo `appium:` não fazem mais o WebdriverIO pular o driver do navegador e anexar o serviço Appium. Use a capability com prefixo, ou aninhe-a em `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` agora emite essas chaves com prefixo, incluindo `appium:app`, `appium:platformVersion` e `appium:udid`.

### `getValue` no mobile lê a propriedade do elemento

`element.getValue()` chama Get Element Property em todas as sessões, incluindo o Appium 3. Em uma sessão mobile, ele chamava anteriormente Get Element Attribute.

### Assinatura de `stopRecordingScreen` alinhada com `startRecordingScreen`

`driver.stopRecordingScreen` agora aceita apenas um único argumento `options`, em vez dos 4 argumentos anteriores, alinhando-se com `driver.startRecordingScreen`. Mova os argumentos individuais para dentro de um objeto:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Nomenclatura de multi-remote

As APIs escritas como `multiremote` ou `Multiremote` agora estão em camelCase / PascalCase como `multiRemote` / `MultiRemote`. Os nomes antigos não têm alias.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` no browser e nos resultados de `$` e `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reporters) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` em `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) e `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Pesquise por `multiremote` e `Multiremote` (diferenciando maiúsculas de minúsculas) e substitua todas as correspondências. Os relatórios do Allure também rotulam testes multi-remote com `isMultiRemote` em vez de `isMultiremote`.

## Displays virtuais no Linux

`@wdio/xvfb` foi substituído por `@wdio/display-server`. Em vez de envolver cada worker em `xvfb-run`, o testrunner inicia um único servidor de display para toda a execução, antes do hook `onPrepare` de qualquer serviço. Ele prefere o Weston em modo headless e recorre ao Xvfb. Veja [Headless e servidores de display](/docs/headless-and-display-servers) para mais detalhes.

As opções foram renomeadas. Os nomes antigos ainda funcionam na v10, mas registram um aviso de obsolescência e serão removidos na v11. Se você definir ambos os nomes, o novo prevalece:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` e `xvfbRetryDelay` não têm efeito e também serão removidos na v11. A inicialização não é mais repetida: se o Weston falhar ao iniciar, o testrunner tenta o Xvfb, e se nenhum dos dois iniciar, a execução continua sem display.

Uma configuração que define uma das quatro opções renomeadas sem sua substituta, e não define `displayServer`, continua usando o Xvfb como na v9. A menos que desative o servidor de display, ela também registra `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. Depois de renomear as opções, adicione `displayServer: 'xvfb'` para manter o Xvfb, ou omita-o para preferir o Weston. No modo automático, um comando de instalação personalizado é executado primeiro para o Weston, e novamente para o Xvfb apenas se o Weston ainda não estiver disponível ou falhar ao iniciar e o Xvfb ainda estiver ausente; portanto, defina `displayServer` como o servidor que ele instala para pular a tentativa do outro servidor.

A instalação automática não suporta mais `yum`, que a v9 usava em hosts sem `dnf`. A v10 detecta apenas `apt-get`, `dnf`, `zypper`, `pacman`, `apk` e `xbps-install`, então instale o Xvfb você mesmo em um host que tenha apenas `yum`.

Um array em `xvfbAutoInstallCommand` era executado por meio de um shell na v9, então elementos como `&&` ou `VAR=value` funcionavam. Arrays agora são executados sem shell em qualquer um dos nomes de opção, então use uma string para sintaxe de shell.

Outras mudanças que você pode notar:

- Todos os workers compartilham um display. Na v9, cada worker tinha um display próprio. Páginas do Chrome e do Edge agora podem ficar sem foco, veja [Foco da janela](/docs/headless-and-display-servers#window-focus).
- O número do display do Xvfb não é fixo. Leia-o de `DISPLAY` em vez de presumir `:99`.
- Um host com apenas `WAYLAND_DISPLAY` definido agora conta como tendo um display. A v9 executava workers sob Xvfb nesse caso, já que `DISPLAY` não estava definido. A v10 não inicia nada, abre as janelas do navegador no seu compositor e define `XDG_SESSION_TYPE`, `GDK_BACKEND` e `ELECTRON_OZONE_PLATFORM_HINT` como `wayland` para a execução. Para executá-los sob Xvfb como antes, remova a definição de `WAYLAND_DISPLAY` e defina `displayServer: 'xvfb'`.
- A tela padrão é 1920x1080. A v9 usava o padrão do `xvfb-run`, que é 1280x1024 no Debian e no Ubuntu e 640x480 no Fedora, RHEL e Arch. Para manter o tamanho que suas baselines usam, defina `displayServerWidth` e `displayServerHeight` com ele.
- Os navegadores escolhem Wayland ou X11 a partir do `XDG_SESSION_TYPE` que o servidor de display define. Sob o Weston, o WebdriverIO também adiciona `--ozone-platform=wayland` ao Chrome e ao Edge que ele inicia, já que o Chrome e o Edge anteriores à 140 (Chrome for Testing anterior à 135) ignoram `XDG_SESSION_TYPE`. O Weston não fornece `DISPLAY`, então, se seus testes ou ferramentas precisam de X11, defina `displayServer: 'xvfb'`.
- Se você usava `XvfbManager` ou a instância `xvfb` de `@wdio/xvfb` diretamente, use `DisplayServerManager` de `@wdio/display-server` em vez disso. Onde você executava `xvfb.init()` e envolvia comandos em `xvfb-run`, ou criava processos por meio de `ProcessFactory`, inicie um display e passe seu ambiente para os processos que precisam dele. O exemplo usa o Xvfb em 1280x1024, como a v9 fazia no Debian e no Ubuntu. Em um host onde apenas `WAYLAND_DISPLAY` está definido, remova essa definição primeiro, ou `startDaemon()` não iniciará nada:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() também retorna null quando já existe um display
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Emulação

`browser.emulate()` utiliza o módulo de emulação do WebDriver BiDi para o browsing context de nível superior atual. A v9 injetava um preload script que modificava `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` e `navigator.onLine`. Esses scripts não existem mais. `browser.emulate('clock', …)` ainda instala timers falsos na página atual e nas páginas abertas posteriormente.

Um recarregamento não é mais necessário para os escopos BiDi.

```diff
  await browser.emulate('onLine', false)
- // apenas `navigator.onLine` mudava; o tráfego continuava fluindo
+ // o browsing context fica offline, incluindo fetch, WebSocket e WebTransport
```

- `onLine: false` chama `emulation.setNetworkConditions` com `{ type: 'offline' }`. `true` e a restauração do escopo removem essa condição. Taxa de transferência e latência continuam em `browser.throttleNetwork()`.
- `colorScheme` define a media feature `prefers-color-scheme`, então o CSS `@media (prefers-color-scheme)` acompanha `matchMedia`.
- `userAgent` é a substituição do user agent do navegador, não uma propriedade `navigator.userAgent` modificada.
- `geolocation` usa a pilha de geolocalização do navegador. Uma página ainda pode precisar de `browser.setPermissions({ name: 'geolocation' }, 'granted')`. `{ error: 'positionUnavailable' }` reporta esse erro em vez de coordenadas.
- `colorScheme` e `media` compartilham um único mapa de media features. A chamada posterior substitui o mapa inteiro, e restaurar qualquer um dos escopos o limpa.
- `device` define o user agent, o viewport, o toque, o layout de texto mobile e o viewport meta a partir do descritor do dispositivo. Ele não altera `screen` nem `orientation`.

Os novos escopos são `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` e `forcedColors`. Um navegador que não implementa um comando rejeita a chamada com seu próprio erro (`unknown command` ou `unsupported operation`). O WebdriverIO não recorre a um preload script nem ao CDP. Se `device` for rejeitado no meio do processo, o user agent, o viewport, o toque, o layout de texto e o viewport meta anteriores são restaurados.

`wdio session emulate` aceita os mesmos escopos. Ele não pede mais que você recarregue para uma substituição que se aplica imediatamente. Os presets de `emulate network` e `emulate cpu` não mudaram e continuam exclusivos do Chromium. Veja [Emulação](/docs/emulation).

## Próximos passos

- Copie a [skill de migração](#migrate-with-a-coding-agent) para o projeto e peça a um agente que a aplique.
- [WebdriverIO para agentes de programação](/docs/ai-agents) para escrever novos testes na v10.
- [Headless e servidores de display](/docs/headless-and-display-servers) quando a suíte for executada no Linux.