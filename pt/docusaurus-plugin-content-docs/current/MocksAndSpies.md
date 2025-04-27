---
id: mocksandspies
title: Mocks e Spies de Requisição
---

WebdriverIO vem com suporte integrado para modificar respostas de rede, o que permite que você se concentre em testar sua aplicação frontend sem precisar configurar seu backend ou um servidor de mock. Você pode definir respostas personalizadas para recursos da web, como solicitações de API REST em seu teste, e modificá-las dinamicamente.

:::info

Observe que o uso do comando `mock` requer suporte para o protocolo Chrome DevTools. Esse suporte é fornecido se você executar testes localmente em um navegador baseado em Chromium, via Selenium Grid v4 ou superior, ou através de um fornecedor de nuvem com suporte para o protocolo Chrome DevTools (por exemplo, SauceLabs, BrowserStack, LambdaTest). Suporte completo para todos os navegadores estará disponível quando as primitivas necessárias chegarem ao [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) e forem implementadas nos respectivos navegadores.

:::

## Criando um mock

Antes de poder modificar qualquer resposta, você precisa definir um mock primeiro. Este mock é descrito pela URL do recurso e pode ser filtrado pelo [método de requisição](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) ou [cabeçalhos](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). O recurso suporta expressões glob através do [minimatch](https://www.npmjs.com/package/minimatch):

```js
// mock para todos os recursos que terminam com "/users/list"
const userListMock = await browser.mock('**/users/list')

// ou você pode especificar o mock filtrando recursos por cabeçalhos ou
// código de status, mockando apenas requisições bem-sucedidas para recursos json
const strictMock = await browser.mock('**', {
    // mock para todas as respostas json
    requestHeaders: { 'Content-Type': 'application/json' },
    // que foram bem-sucedidas
    statusCode: 200
})
```

## Especificando respostas personalizadas

Depois de definir um mock, você pode definir respostas personalizadas para ele. Essas respostas personalizadas podem ser um objeto para responder com JSON, um arquivo local para responder com um fixture personalizado ou um recurso da web para substituir a resposta com um recurso da internet.

### Mockando requisições de API

Para mockar requisições de API onde você espera uma resposta JSON, tudo o que você precisa fazer é chamar `respond` no objeto de mock com um objeto arbitrário que você deseja retornar, por exemplo:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// saída: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Você também pode modificar os cabeçalhos de resposta, bem como o código de status, passando alguns parâmetros de resposta mock da seguinte forma:

```js
mock.respond({ ... }, {
    // responder com código de status 404
    statusCode: 404,
    // mesclar cabeçalhos de resposta com os seguintes cabeçalhos
    headers: { 'x-custom-header': 'foobar' }
})
```

Se você não quiser que o mock chame o backend, você pode passar `false` para a flag `fetchResponse`.

```js
mock.respond({ ... }, {
    // não chamar o backend real
    fetchResponse: false
})
```

É recomendável armazenar respostas personalizadas em arquivos de fixture para que você possa simplesmente importá-los em seu teste da seguinte forma:

```js
// requer Node.js v16.14.0 ou superior para suportar afirmações de importação JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Mockando recursos de texto

Se você quiser modificar recursos de texto como JavaScript, arquivos CSS ou outros recursos baseados em texto, você pode apenas passar um caminho de arquivo e o WebdriverIO substituirá o recurso original por ele, por exemplo:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// ou responder com seu JS personalizado
scriptMock.respond('alert("I am a mocked resource")')
```

### Redirecionando recursos da web

Você também pode simplesmente substituir um recurso da web por outro recurso da web se sua resposta desejada já estiver hospedada na web. Isso funciona com recursos de página individuais, bem como com uma página da web inteira, por exemplo:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // retorna "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Respostas dinâmicas

Se sua resposta de mock depende da resposta do recurso original, você também pode modificar dinamicamente o recurso passando uma função que recebe a resposta original como parâmetro e define o mock com base no valor de retorno, por exemplo:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // substituir o conteúdo do todo pelo seu número na lista
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// retorna
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Abortando mocks

Em vez de retornar uma resposta personalizada, você também pode simplesmente abortar a requisição com um dos seguintes erros HTTP:

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

Isso é muito útil se você quiser bloquear scripts de terceiros da sua página que têm uma influência negativa no seu teste funcional. Você pode abortar um mock simplesmente chamando `abort` ou `abortOnce`, por exemplo:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Spies

Cada mock é automaticamente um spy que conta a quantidade de requisições que o navegador fez para esse recurso. Se você não aplicar uma resposta personalizada ou motivo de aborto ao mock, ele continua com a resposta padrão que você normalmente receberia. Isso permite que você verifique quantas vezes o navegador fez a solicitação, por exemplo, para um determinado endpoint de API.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // retorna 0

// registrar usuário
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// verificar se a requisição de API foi feita
expect(mock.calls.length).toBe(1)

// verificar resposta
expect(mock.calls[0].body).toEqual({ success: true })
```