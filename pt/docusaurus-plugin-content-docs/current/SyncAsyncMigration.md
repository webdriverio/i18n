---
id: async-migration
title: De Síncrono para Assíncrono
---

Devido a mudanças no V8, a equipe do WebdriverIO [anunciou](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) a descontinuação da execução síncrona de comandos até abril de 2023. A equipe tem trabalhado arduamente para tornar a transição o mais fácil possível. Neste guia, explicamos como você pode migrar gradualmente sua suíte de testes de síncrono para assíncrono. Como projeto de exemplo, usamos o [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), mas a abordagem é a mesma com todos os outros projetos.

## Promises em JavaScript

O motivo pelo qual a execução síncrona era popular no WebdriverIO é porque ela remove a complexidade de lidar com promises. Particularmente, se você vem de outras linguagens onde esse conceito não existe dessa forma, pode ser confuso no início. No entanto, Promises são uma ferramenta muito poderosa para lidar com código assíncrono, e o JavaScript atual torna isso realmente fácil. Se você nunca trabalhou com Promises, recomendamos verificar o [guia de referência da MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), pois estaria fora do escopo explicá-lo aqui.

## Transição Assíncrona

O testrunner do WebdriverIO pode lidar com execução assíncrona e síncrona na mesma suíte de testes. Isso significa que você pode migrar seus testes e PageObjects passo a passo, no seu próprio ritmo. Por exemplo, o Cucumber Boilerplate definiu [um grande conjunto de definições de passos](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) para você copiar em seu projeto. Podemos prosseguir e migrar uma definição de passo ou um arquivo por vez.

:::tip

O WebdriverIO oferece um [codemod](https://github.com/webdriverio/codemod) que permite transformar seu código síncrono em código assíncrono quase que automaticamente. Execute o codemod conforme descrito na documentação primeiro e use este guia para migração manual, se necessário.

:::

Em muitos casos, tudo o que é necessário fazer é tornar a função na qual você chama comandos WebdriverIO `async` e adicionar um `await` na frente de cada comando. Olhando para o primeiro arquivo `clearInputField.ts` a ser transformado no projeto boilerplate, transformamos de:

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

- _transform all step definitions_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Esta transição é independente de você usar TypeScript ou não. Se você usa TypeScript, certifique-se de eventualmente alterar a propriedade `types` em seu `tsconfig.json` de `webdriverio/sync` para `@wdio/globals/types`. Certifique-se também de que seu alvo de compilação esteja definido para pelo menos `ES2018`.
:::

## Casos Especiais

Naturalmente, sempre existem casos especiais onde você precisa prestar um pouco mais de atenção.

### Loops ForEach

Se você tiver um loop `forEach`, por exemplo, para iterar sobre elementos, precisa garantir que o callback do iterador seja tratado adequadamente de maneira assíncrona, por exemplo:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

A função que passamos para `forEach` é uma função iteradora. Em um mundo síncrono, ele clicaria em todos os elementos antes de continuar. Se transformarmos isso em código assíncrono, precisamos garantir que esperamos cada função iteradora terminar a execução. Ao adicionar `async`/`await`, essas funções iteradoras retornarão uma promise que precisamos resolver. Agora, `forEach` não é mais ideal para iterar sobre os elementos porque não retorna o resultado da função iteradora, a promise que precisamos aguardar. Portanto, precisamos substituir `forEach` por `map`, que retorna essa promise. O `map`, assim como todos os outros métodos iteradores de Arrays como `find`, `every`, `reduce` e outros são implementados para que respeitem promises dentro das funções iteradoras e são, portanto, simplificados para uso em um contexto assíncrono. O exemplo acima transformado fica assim:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Por exemplo, para buscar todos os elementos `<h3 />` e obter o conteúdo de texto deles, você pode executar:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
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

### Asserções WebdriverIO

Se você usar o auxiliar de asserção do WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), certifique-se de colocar um `await` na frente de cada chamada `expect`, por exemplo:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

precisa ser transformado em:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### Métodos PageObject Síncronos e Testes Assíncronos

Se você tem escrito PageObjects em sua suíte de testes de forma síncrona, não será mais possível usá-los em testes assíncronos. Se você precisar usar um método PageObject tanto em testes síncronos quanto assíncronos, recomendamos duplicar o método e oferecê-los para ambos os ambientes, por exemplo:

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

Depois de concluir a migração, você pode remover os métodos PageObject síncronos e limpar a nomenclatura.

Se você não quiser manter duas versões diferentes de um método PageObject, também pode migrar todo o PageObject para assíncrono e usar [`browser.call`](https://webdriver.io/docs/api/browser/call) para executar o método em um ambiente síncrono, por exemplo:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

O comando `call` garantirá que o `someMethod` assíncrono seja resolvido antes de prosseguir para o próximo comando.

## Conclusão

Como você pode ver no [PR resultante da reescrita](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), a complexidade desta reescrita é relativamente simples. Lembre-se de que você pode reescrever uma definição de passo por vez. O WebdriverIO é perfeitamente capaz de lidar com execução síncrona e assíncrona em um único framework.