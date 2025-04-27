---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Ao escrever testes, geralmente é necessário verificar se os valores atendem a determinadas condições. `expect` fornece acesso a vários "matchers" que permitem validar diferentes coisas no objeto `browser`, `element` ou `mock`.

## Opções Padrão

Essas opções padrão abaixo estão conectadas às opções [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) e [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) definidas na configuração.

Defina as opções abaixo apenas se quiser esperar por tempos específicos para suas asserções.

```js
{
    wait: 2000, // ms para esperar que a expectativa seja bem-sucedida
    interval: 100, // intervalo entre tentativas
}
```

Se você quiser escolher diferentes tempos limite e intervalos, defina essas opções assim:

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### Opções de Matcher

Cada matcher pode receber várias opções que permitem modificar a asserção:

##### Opções de Comando

| Nome | Tipo | Detalhes |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | tempo em ms para esperar que a expectativa seja bem-sucedida. Padrão: `3000` |
| <code><var>interval</var></code> | number | intervalo entre tentativas. Padrão: `100` |
| <code><var>beforeAssertion</var></code> | function | função a ser chamada antes que a asserção seja feita |
| <code><var>afterAssertion</var></code> | function | função a ser chamada após a asserção ser feita contendo os resultados da asserção |
| <code><var>message</var></code> | string | mensagem do usuário para prepend antes do erro de asserção |

##### Opções de String

Esta opção pode ser aplicada além das opções de comando quando strings estão sendo afirmadas.

| Nome | Tipo | Detalhes |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | aplicar `toLowerCase` para os valores real e esperado |
| <code><var>trim</var></code> | boolean | aplicar `trim` ao valor real |
| <code><var>replace</var></code> | Replacer \| Replacer[] | substituir partes do valor real que correspondem à string/RegExp. O replacer pode ser uma string ou uma função.
| <code><var>containing</var></code> | boolean | esperar que o valor real contenha o valor esperado, caso contrário, estritamente igual. |
| <code><var>asString</var></code> | boolean | pode ser útil para forçar a conversão do valor da propriedade para string |
| <code><var>atStart</var></code> | boolean | esperar que o valor real comece com o valor esperado |
| <code><var>atEnd</var></code> | boolean | esperar que o valor real termine com o valor esperado |
| <code><var>atIndex</var></code> | number | esperar que o valor real tenha o valor esperado no índice fornecido |

##### Opções de Número

Esta opção pode ser aplicada além das opções de comando quando números estão sendo afirmados.

| Nome | Tipo | Detalhes |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | igual |
| <code><var>lte</var></code> | number | menor ou igual a |
| <code><var>gte</var></code> | number | maior ou igual a |

### Lidando com Entidades HTML

Uma entidade HTML é um pedaço de texto ("string") que começa com um e comercial (`&`) e termina com um ponto e vírgula (`;`). As entidades são frequentemente usadas para exibir caracteres reservados (que de outra forma seriam interpretados como código HTML) e caracteres invisíveis (como espaços sem quebra, por exemplo, `&nbsp;`).

Para encontrar ou interagir com tal elemento, use o equivalente unicode da entidade. por exemplo:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

Você pode encontrar todas as referências unicode na [especificação HTML](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**Nota:** unicode não diferencia maiúsculas de minúsculas, portanto, tanto `\u00a0` quanto `\u00A0` funcionam. Para encontrar um elemento na inspeção do navegador, remova `u` do unicode, por exemplo: `div[data="Some\00a0Value"]`

## Matchers de Navegador

### toHaveUrl

Verifica se o navegador está em uma página específica.

##### Uso

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### Uso

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

Verifica se o site tem um título específico.

##### Uso

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

Verifica se o navegador tem um texto específico armazenado na área de transferência.

##### Uso

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Matchers de Elemento

### toBeDisplayed

Chama [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) no elemento fornecido.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

Chama [`isExisting`](https://webdriver.io/docs/api/element/isExisting) no elemento fornecido.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

O mesmo que `toExist`.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

O mesmo que `toExist`.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

Verifica se o elemento tem foco. Esta asserção só funciona em um contexto da web.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

Verifica se um elemento tem um determinado atributo com um valor específico.

##### Uso

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

O mesmo que `toHaveAttribute`.

##### Uso

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

Verifica se um elemento tem um único nome de classe. Também pode ser chamado com um array como parâmetro quando o elemento pode ter vários nomes de classe.

##### Uso

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

Verifica se um elemento tem uma determinada propriedade.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

Verifica se um elemento de entrada tem um determinado valor.

##### Uso

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

Verifica se um elemento pode ser clicado chamando [`isClickable`](https://webdriver.io/docs/api/element/isClickable) no elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

Verifica se um elemento está desativado chamando [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) no elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// mesmo que
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

Verifica se um elemento está ativado chamando [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) no elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// mesmo que
await expect(elem).not.toBeDisabled()
```

### toBeSelected

Verifica se um elemento está ativado chamando [`isSelected`](https://webdriver.io/docs/api/element/isSelected) no elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

O mesmo que `toBeSelected`.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

Verifica se o elemento tem um rótulo WAI-ARIA computado específico. Também pode ser chamado com um array como parâmetro no caso em que o elemento pode ter diferentes rótulos.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

Verifica se o elemento tem uma função WAI-ARIA computada específica. Também pode ser chamado com um array como parâmetro no caso em que o elemento pode ter diferentes rótulos.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

Verifica se o elemento de link tem um destino de link específico.

##### Uso

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

O mesmo que `toHaveHref`.

##### Uso

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

Verifica se o elemento tem um atributo `id` específico.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

Verifica se o elemento tem um texto específico. Também pode ser chamado com um array como parâmetro no caso em que o elemento pode ter diferentes textos.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

No caso de haver uma lista de elementos na div abaixo:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

Você pode afirmá-los usando um array:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

Verifica se o elemento tem um texto específico. Também pode ser chamado com um array como parâmetro no caso em que o elemento pode ter diferentes textos.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

Verifica se um elemento está dentro da viewport chamando [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) no elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

Verifica a quantidade de filhos do elemento buscado chamando o comando `element.$('./*')`.

##### Uso

```js
const list = await $('ul')
await expect(list).toHaveChildren() // a lista tem pelo menos um item
// mesmo que
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // a lista tem 3 itens
// mesmo que 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

Verifica se o elemento tem uma largura específica.

##### Uso

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

Verifica se o elemento tem uma altura específica.

##### Uso

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

Verifica se o elemento tem um tamanho específico.

##### Uso

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

Verifica a quantidade de elementos buscados usando o comando [`$$`](https://webdriver.io/docs/api/element/$).

**Nota:** Este matcher atualizará o array passado com os elementos mais recentes se a asserção passar. No entanto, se você reatribuiu a variável, precisará buscar os elementos novamente.

##### Uso

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 itens na lista

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// mesmo que
assert.ok(listItems.length <= 10)
```

## Matchers de Rede

### toBeRequested

Verifica se o mock foi chamado

##### Uso

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

Verifica se o mock foi chamado pela quantidade esperada de vezes

##### Uso

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // solicitação chamada pelo menos 5 vezes, mas menos de 11
```

### toBeRequestedWith

Verifica se o mock foi chamado de acordo com as opções esperadas.

A maioria das opções suporta matchers parciais expect/jasmine como [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### Uso

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [opcional] string | function | custom matcher
    method: 'POST',                                 // [opcional] string | array
    statusCode: 200,                                // [opcional] number | array
    requestHeaders: { Authorization: 'foo' },       // [opcional] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [opcional] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [opcional] object | function | custom matcher
    response: { success: true },                    // [opcional] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // ou POST ou PUT
    statusCode: [401, 403],  // ou 401 ou 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Matcher de Snapshot

WebdriverIO suporta testes de snapshot básicos, bem como testes de snapshot DOM.

### toMatchSnapshot

Verifica se qualquer objeto arbitrário corresponde a um determinado valor. Se você passar um [`WebdriverIO.Element`](https://webdriver.io/docs/api/element), ele fará automaticamente um snapshot do estado [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) dele.

##### Uso

```js
// snapshot de objetos arbitrários (não é necessário "await" aqui)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot do `outerHTML` de WebdriverIO.Element (snapshot DOM, requer "await")
await expect($('elem')).toMatchSnapshot()
// snapshot do resultado do comando do elemento
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

Da mesma forma, você pode usar o `toMatchInlineSnapshot()` para armazenar o snapshot inline dentro do arquivo de teste. Por exemplo, dado:

```js
await expect($('img')).toMatchInlineSnapshot()
```

Em vez de criar um arquivo de snapshot, o WebdriverIO modificará o arquivo de teste diretamente para atualizar o snapshot como uma string:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Matchers de Snapshot Visual

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

Os seguintes matchers são implementados como parte do plugin `@wdio/visual-service` e estão disponíveis apenas quando o serviço está configurado. Certifique-se de seguir as [instruções de configuração](https://webdriver.io/docs/visual-testing) adequadamente.

### toMatchElementSnapshot

Verifica se o elemento fornecido corresponde ao snapshot da linha de base.

##### Uso

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // opções
})
```

O resultado esperado é por padrão `0`, então você pode escrever a mesma asserção como:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // opções
})
```

ou não passar nenhuma opção:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

Verifica se a tela atual corresponde ao snapshot da linha de base.

##### Uso

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // opções
})
```

O resultado esperado é por padrão `0`, então você pode escrever a mesma asserção como:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // opções
})
```

ou não passar nenhuma opção:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

Verifica se o screenshot da página inteira corresponde ao snapshot da linha de base.

##### Uso

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // opções
})
```

O resultado esperado é por padrão `0`, então você pode escrever a mesma asserção como:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // opções
})
```

ou não passar nenhuma opção:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

Verifica se o screenshot da página inteira, incluindo marcas de tabulação, corresponde ao snapshot da linha de base.

##### Uso

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // opções
})
```

O resultado esperado é por padrão `0`, então você pode escrever a mesma asserção como:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // opções
})
```

ou não passar nenhuma opção:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## Usando expressões regulares

Você também pode usar diretamente expressões regulares para todos os matchers que fazem comparação de texto.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Matchers Padrão

Além dos matchers `expect-webdriverio`, você pode usar as asserções integradas do [expect](https://jestjs.io/docs/en/expect) do Jest ou [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) para Jasmine.

## Matchers Assimétricos

WebdriverIO suporta o uso de matchers assimétricos onde quer que você compare valores de texto, por exemplo:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

ou

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

Se você estiver usando o [WDIO Testrunner](https://webdriver.io/docs/clioptions), tudo será configurado automaticamente. Basta seguir o [guia de configuração](https://webdriver.io/docs/typescript#framework-setup) da documentação. No entanto, se você executar o WebdriverIO com um testrunner diferente ou em um script Node.js simples, precisará adicionar `expect-webdriverio` a `types` no `tsconfig.json`.

- `"expect-webdriverio"` para todos, exceto usuários de Jasmine/Jest.
- `"expect-webdriverio/jasmine"` para Jasmine
- `"expect-webdriverio/jest"` para Jest

## JavaScript (VSCode)

É necessário criar o arquivo `jsconfig.json` na raiz do projeto e fazer referência às definições de tipo para que o autocompletion funcione em JavaScript puro.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## Adicionando seus próprios matchers

Assim como o `expect-webdriverio` estende os matchers do Jasmine/Jest, é possível adicionar matchers personalizados.

- Para Jasmine, consulte a documentação [custom matchers](https://jasmine.github.io/2.5/custom_matcher.html)
- Para todos os outros, consulte [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) do Jest

Matchers personalizados devem ser adicionados no hook `before` do wdio

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - Exemplo Jest
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Solução temporária. Veja https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```