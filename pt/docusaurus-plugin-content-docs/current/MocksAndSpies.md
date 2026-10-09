---
id: mocksandspies
title: Mocks e Spies de Requisições
description: "Simule requisições e respostas de rede nos seus testes com browser.mock, aborte requisições e inspecione chamadas com spies."
---

O WebdriverIO vem com suporte integrado para modificar respostas de rede, o que permite que você se concentre em testar sua aplicação frontend sem precisar configurar seu backend ou um servidor de mock. Você pode definir respostas personalizadas para recursos web, como requisições de API REST, no seu teste e modificá-las dinamicamente.

:::info

Observe que usar o comando `mock` requer suporte ao WebDriver Bidi. Isso geralmente ocorre ao executar testes localmente em um navegador baseado em Chromium ou no Firefox, bem como se você usar um Selenium Grid v4 ou superior. Se você executa testes na nuvem, certifique-se de que seu provedor de nuvem suporta WebDriver Bidi.

:::

## Criando um mock

Antes de poder modificar quaisquer respostas, você precisa definir um mock primeiro. Esse mock é descrito pela url do recurso e pode ser filtrado pelo [método da requisição](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) ou pelos [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). O recurso é correspondido usando um [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern), onde `*` corresponde a qualquer sequência de caracteres. Uma url sem protocolo é comparada apenas com o caminho da requisição, então `*/users/list` corresponde a esse caminho em qualquer origem:

```js
// faz mock de todos os recursos que terminam com "/users/list"
const userListMock = await browser.mock('*/users/list')

// ou você pode especificar o mock filtrando recursos por headers ou
// status code, fazendo mock apenas de requisições bem-sucedidas a recursos json
const strictMock = await browser.mock('*', {
    // faz mock de todas as respostas json
    requestHeaders: { 'Content-Type': 'application/json' },
    // que foram bem-sucedidas
    statusCode: 200
})

// em vez de uma string, você também pode passar um `URLPattern`; o polyfill
// também funciona em runtimes sem suporte nativo a URLPattern
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

Use um único `*` para curingas de URL; ele também corresponde a `/`. Curingas consecutivos antes de texto fixo, como `**/api/**` ou `**/data.json`, podem causar backtracking excessivo de regex em URLs não relacionadas e travar um teste. Veja a [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548). Em testes de componentes, use também um protocolo e hostname fixos para manter o tráfego do runner fora da interceptação; veja [mocks de requisições em testes de componentes](/docs/component-testing/mocking#requests).

:::

## Especificando respostas personalizadas

Depois de definir um mock, você pode definir respostas personalizadas para ele. Essas respostas personalizadas podem ser um objeto para responder com um JSON, um arquivo local para responder com uma fixture personalizada ou um recurso web para substituir a resposta por um recurso da internet.

### Fazendo mock de requisições de API

Para fazer mock de requisições de API nas quais você espera uma resposta JSON, tudo o que você precisa fazer é chamar `respond` no objeto mock com um objeto arbitrário que você deseja retornar, por exemplo:

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

Você também pode modificar os headers da resposta, bem como o status code, passando alguns parâmetros de resposta do mock da seguinte forma:

```js
mock.respond({ ... }, {
    // responde com status code 404
    statusCode: 404,
    // mescla os headers da resposta com os seguintes headers
    headers: { 'x-custom-header': 'foobar' }
})
```

Se você quiser que o mock não chame o backend de forma alguma, pode passar `false` para a flag `fetchResponse`.

```js
mock.respond({ ... }, {
    // não chama o backend real
    fetchResponse: false
})
```

`fetchResponse: false` nunca chama o backend. Um mock criado com um filtro `statusCode` ou `responseHeaders` precisa dessa resposta para decidir se corresponde, então `respond()` e `respondOnce()` lançam um erro se você combiná-los. Remova o filtro de resposta, ou deixe `fetchResponse` sem definir para que o mock possa ler a resposta do backend e então substituí-la.

É recomendado armazenar respostas personalizadas em arquivos de fixture para que você possa simplesmente importá-los no seu teste da seguinte forma:

```js
// requer Node.js v16.14.0 ou superior para suportar JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Fazendo mock de recursos de texto

Se você quiser modificar recursos de texto como JavaScript, arquivos CSS ou outros recursos baseados em texto, basta passar um caminho de arquivo e o WebdriverIO substituirá o recurso original por ele, por exemplo:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// ou responda com seu JS personalizado
scriptMock.respond('alert("I am a mocked resource")')
```

### Redirecionando recursos web

Você também pode simplesmente substituir um recurso web por outro recurso web se a resposta desejada já estiver hospedada na web. Isso funciona tanto com recursos individuais da página quanto com a própria página web, por exemplo:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // retorna "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Respostas dinâmicas

Se a resposta do seu mock depende da resposta original do recurso, você também pode modificar o recurso dinamicamente passando uma função que recebe a resposta original como parâmetro e define o mock com base no valor de retorno, por exemplo:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // substitui o conteúdo dos todos pelo seu número na lista
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

Isso é muito útil se você quiser bloquear scripts de terceiros da sua página que tenham uma influência negativa no seu teste funcional. Você pode abortar um mock simplesmente chamando `abort` ou `abortOnce`, por exemplo:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## Spies

Todo mock é automaticamente um spy que conta a quantidade de requisições que o navegador fez para aquele recurso. Se você não aplicar uma resposta personalizada ou um motivo de aborto ao mock, ele continua com a resposta padrão que você normalmente receberia. Isso permite verificar quantas vezes o navegador fez a requisição, por exemplo, para um determinado endpoint de API.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // retorna 0

// registra o usuário
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// verifica se a requisição à API foi feita
expect(mock.calls.length).toBe(1)

// verifica a resposta
expect(mock.calls[0].body).toEqual({ success: true })
```

Se você precisar esperar até que uma requisição correspondente tenha respondido, use `mock.waitForResponse(options)`. Veja a referência da API: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

Em um navegador [multi-remote](/docs/multiremote), `mock()` retorna um `MultiRemoteMock` em vez de um único `Mock`. Métodos como `respond()` e `restore()` são executados em todas as instâncias. `waitForResponse()` espera até que todas as instâncias tenham uma resposta correspondente. As requisições capturadas ficam no mock daquele navegador:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// registra um usuário em cada navegador para que cada sessão envie a requisição
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` lista esses nomes na ordem em que os mocks foram criados. `getInstance` lança `Multi-remote object has no instance named "<name>"` quando o nome não está nessa lista. Um mock criado a partir de `browser.select('myFirefoxBrowser', 'myChromeBrowser')` lista o Firefox primeiro, o que pode diferir de `browser.instances`.

Para fazer stub de apenas um navegador, chame `mock()` nessa instância:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```