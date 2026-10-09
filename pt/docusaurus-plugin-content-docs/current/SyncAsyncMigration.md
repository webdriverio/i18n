---
id: async-migration
title: De Síncrono para Assíncrono
description: "Migre testes do WebdriverIO da execução de comandos síncrona para assíncrona passo a passo, incluindo loops forEach, asserções e page objects síncronos."
---

Devido a mudanças no V8, a equipe do WebdriverIO [anunciou](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) a descontinuação da execução síncrona de comandos até abril de 2023. A equipe tem trabalhado duro para tornar a transição o mais fácil possível. Neste guia, explicamos como você pode migrar gradualmente sua suíte de testes de síncrona para assíncrona. Como projeto de exemplo, usamos o [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), mas a abordagem é a mesma para todos os outros projetos.

## Promises em JavaScript

O motivo pelo qual a execução síncrona era popular no WebdriverIO é que ela elimina a complexidade de lidar com promises. Especialmente se você vem de outras linguagens onde esse conceito não existe dessa forma, isso pode ser confuso no início. No entanto, Promises são uma ferramenta muito poderosa para lidar com código assíncrono, e o JavaScript atual torna realmente fácil trabalhar com elas. Se você nunca trabalhou com Promises, recomendamos consultar o [guia de referência da MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) sobre o assunto, pois explicá-lo aqui estaria fora do escopo.

## Transição para Assíncrono

O testrunner do WebdriverIO pode lidar com execução assíncrona e síncrona dentro da mesma suíte de testes. Isso significa que você pode migrar gradualmente seus testes e PageObjects passo a passo, no seu ritmo. Por exemplo, o Cucumber Boilerplate definiu [um grande conjunto de definições de passos](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) para você copiar para o seu projeto. Podemos migrar uma definição de passo ou um arquivo de cada vez.

:::tip

O WebdriverIO oferece um [codemod](https://github.com/webdriverio/codemod) que permite transformar seu código síncrono em código assíncrono de forma quase totalmente automática. Execute o codemod conforme descrito na documentação primeiro e use este guia para migração manual, se necessário.

:::

Em muitos casos, tudo o que é necessário fazer é tornar `async` a função na qual você chama comandos do WebdriverIO e adicionar um `await` na frente de cada comando. Observando o primeiro arquivo `clearInputField.ts` a ser transformado no projeto boilerplate, transformamos de:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

para:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

É isso. Você pode ver o commit completo com todos os exemplos de reescrita aqui:

#### Commits:

- _transformar todas as definições de passos_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Esta transição é independente de você usar TypeScript ou não. Se você usa TypeScript, apenas certifique-se de eventualmente alterar a propriedade `types` no seu `tsconfig.json` de `webdriverio/sync` para `@wdio/globals/types`. Certifique-se também de que seu alvo de compilação esteja definido para pelo menos `ES2018`.
:::

## Casos Especiais

Há, claro, sempre casos especiais em que você precisa prestar um pouco mais de atenção.

### Loops ForEach

Se você tem um loop `forEach`, por exemplo, para iterar sobre elementos, precisa garantir que o callback do iterador seja tratado corretamente de forma assíncrona, por exemplo:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

A função que passamos para `forEach` é uma função iteradora. Em um mundo síncrono, ela clicaria em todos os elementos antes de prosseguir. Se transformarmos isso em código assíncrono, precisamos garantir que esperamos cada função iteradora terminar sua execução. Ao adicionar `async`/`await`, essas funções iteradoras retornarão uma promise que precisamos resolver. Assim, `forEach` deixa de ser ideal para iterar sobre os elementos, porque não retorna o resultado da função iteradora, a promise pela qual precisamos esperar. Portanto, precisamos substituir `forEach` por `map`, que retorna essa promise. O `map`, assim como todos os outros métodos iteradores de Arrays como `find`, `every`, `reduce` e outros, são implementados de forma a respeitar promises dentro das funções iteradoras e, portanto, são simplificados para uso em um contexto assíncrono. O exemplo acima, transformado, fica assim:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Por exemplo, para buscar todos os elementos `<h3 />` e obter seu conteúdo de texto, você pode executar:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * retorna:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

Se isso parecer muito complicado, você pode considerar usar loops for simples, por exemplo:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` retorna um [`ElementArray`](/docs/api/browser/$$). Você também pode iterá-lo antes de aguardar a lista:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` lança um erro até que a lista seja resolvida, porque um loop síncrono não pode esperar pela consulta. Aguarde a lista primeiro, como no exemplo acima, ou use `for await`.

### Asserções do WebdriverIO

Se você usa o auxiliar de asserções do WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), certifique-se de colocar um `await` na frente de cada chamada `expect`, por exemplo:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

precisa ser transformado em:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### Métodos de PageObject Síncronos e Testes Assíncronos

Se você tem escrito PageObjects em sua suíte de testes de forma síncrona, não poderá mais usá-los em testes assíncronos. Se precisar usar um método de PageObject tanto em testes síncronos quanto assíncronos, recomendamos duplicar o método e oferecê-lo para ambos os ambientes, por exemplo:

```js
class MyPageObject extends Page {
    /**
     * define os elementos
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // código síncrono
    }

    someMethodAsync () {
        // versão assíncrona de MyPageObject.someMethod()
    }
}
```

Depois de concluir a migração, você pode remover os métodos síncronos do PageObject e organizar a nomenclatura.

Se você não quiser manter duas versões diferentes de um método de PageObject, também pode migrar todo o PageObject para assíncrono e usar [`browser.call`](https://webdriver.io/docs/api/browser/call) para executar o método em um ambiente síncrono, por exemplo:

```js
// antes:
// MyPageObject.someMethod()
// depois:
browser.call(() => MyPageObject.someMethod())
```

O comando `call` garantirá que o `someMethod` assíncrono seja resolvido antes de prosseguir para o próximo comando.

## Conclusão

Como você pode ver no [PR de reescrita resultante](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), a complexidade dessa reescrita é bastante baixa. Lembre-se de que você pode reescrever uma definição de passo de cada vez. O WebdriverIO é perfeitamente capaz de lidar com execução síncrona e assíncrona em um único framework.