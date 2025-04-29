---
id: wdio-intercept-service
title: Serviço de Interceptação
custom_edit_url: https://github.com/webdriverio-community/wdio-intercept-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-intercept-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/webdriverio-community/wdio-intercept-service) | [npm](https://www.npmjs.com/package/wdio-intercept-service)

🕸 Capture e verifique chamadas HTTP ajax em [webdriver.io](http://webdriver.io/)

[![Tests](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml) [![Join the chat on Discord](https://img.shields.io/discord/1097401827202445382?logo=discord&logoColor=FFFFFF&color=5865F2)](https://discord.webdriver.io/)

Este é um plugin para [webdriver.io](http://webdriver.io/). Se você ainda não o conhece, confira, é muito legal.

Embora o selenium e o webdriver sejam usados para testes e2e e especialmente testes de UI, você pode querer avaliar as requisições HTTP feitas pelo seu código cliente (por exemplo, quando você não tem feedback imediato da UI, como em métricas ou chamadas de rastreamento). Com wdio-intercept-service, você pode interceptar chamadas HTTP ajax iniciadas por alguma ação do usuário (por exemplo, um pressionamento de botão, etc.) e fazer afirmações sobre a requisição e respostas correspondentes mais tarde.

Há um problema, no entanto: você não pode interceptar chamadas HTTP que são iniciadas no carregamento da página (como na maioria dos SPAs), pois requer algum trabalho de configuração que só pode ser feito após o carregamento da página (devido a limitações no selenium). **Isso significa que você só pode capturar requisições que foram iniciadas dentro de um teste.** Se você estiver bem com isso, este plugin pode ser para você, então continue lendo.

## Pré-requisitos

* webdriver.io **v5.x** ou mais recente.

**Atenção! Se você ainda estiver usando webdriver.io v4, use a branch v2.x deste plugin!**

## Instalação

```shell
npm install wdio-intercept-service -D
```

## Uso

### Uso com WebDriver CLI

Deve ser tão fácil quanto adicionar wdio-intercept-service ao seu `wdio.conf.js`:

```javascript
exports.config = {
  // ...
  services: ['intercept']
  // ...
};
```

e você está pronto.

### Uso com WebDriver Standalone

Ao usar o WebdriverIO Standalone, as funções `before` e `beforeTest` / `beforeScenario` precisam ser chamadas manualmente.

```javascript
import { remote } from 'webdriverio';
import WebdriverAjax from 'wdio-intercept-service'

const WDIO_OPTIONS = {
  port: 9515,
  path: '/',
  capabilities: {
    browserName: 'chrome'
  },
}

let browser;
const interceptServiceLauncher = WebdriverAjax();

beforeAll(async () => {
  browser = await remote(WDIO_OPTIONS)
  interceptServiceLauncher.before(null, null, browser)
})

beforeEach(async () => {
  interceptServiceLauncher.beforeTest()
})

afterAll(async () => {
  await client.deleteSession()
});

describe('', async () => {
  ... // See example usage
});
```

Uma vez inicializado, algumas funções relacionadas são adicionadas à sua cadeia de comandos do navegador (veja [API](#api)).

## Início Rápido

Exemplo de uso:

```javascript
browser.url('http://foo.bar');
browser.setupInterceptor(); // capture ajax calls
browser.expectRequest('GET', '/api/foo', 200); // expect GET request to /api/foo with 200 statusCode
browser.expectRequest('POST', '/api/foo', 400); // expect POST request to /api/foo with 400 statusCode
browser.expectRequest('GET', /\/api\/foo/, 200); // can validate a URL with regex, too
browser.click('#button'); // button that initiates ajax request
browser.pause(1000); // maybe wait a bit until request is finished
browser.assertRequests(); // validate the requests
```

Obtenha detalhes sobre as requisições:

```javascript
browser.url('http://foo.bar')
browser.setupInterceptor();
browser.click('#button')
browser.pause(1000);

var request = browser.getRequest(0);
assert.equal(request.method, 'GET');
assert.equal(request.response.headers['content-length'], '42');
```

## Navegadores suportados

Deve funcionar com versões mais recentes de todos os navegadores. Por favor, reporte um problema se não parecer funcionar com o seu.

## API

Consulte o arquivo de declaração TypeScript para obter a sintaxe completa dos comandos personalizados adicionados ao objeto de navegador WebdriverIO. Em geral, qualquer método que aceita um objeto "options" como parâmetro pode ser chamado sem esse parâmetro para obter o comportamento padrão. Esses objetos "options opcionais" são seguidos por `?: = {}` e os valores padrão inferidos são descritos para cada método.

### Descrições das Opções

Esta biblioteca oferece uma pequena quantidade de configuração ao emitir comandos. As opções de configuração que são usadas por vários métodos são descritas aqui (veja a definição de cada método para determinar o suporte específico).

* `orderBy` (`'START' | 'END'`): Esta opção controla a ordenação das requisições capturadas pelo interceptor, quando retornadas para o seu teste. Para compatibilidade com versões existentes desta biblioteca, a ordenação padrão é `'END'`, que corresponde a quando a requisição foi concluída. Se você definir a opção `orderBy` como `'START'`, então as requisições serão ordenadas de acordo com o horário em que foram iniciadas.
* `includePending` (`boolean`): Esta opção controla se requisições ainda não concluídas serão retornadas. Para compatibilidade com versões existentes desta biblioteca, o valor padrão é `false`, e apenas requisições concluídas serão retornadas.

### browser.setupInterceptor()

Captura chamadas ajax no navegador. Você sempre precisa chamar a função de configuração para avaliar requisições posteriormente.

### browser.disableInterceptor()

Impede a captura adicional de chamadas ajax no navegador. Todas as informações de requisição capturadas são removidas. A maioria dos usuários não precisará desativar o interceptor, mas se um teste for particularmente longo ou exceder a capacidade de armazenamento da sessão, desativar o interceptor pode ser útil.

### `browser.excludeUrls(urlRegexes: (string | RegExp)[])`

Exclui requisições de determinadas urls de serem registradas. Ele recebe uma matriz de strings ou expressões regulares. Antes de escrever no armazenamento, testa a url da requisição contra cada string ou regex. Se corresponder, a requisição não é escrita no armazenamento. Como disableInterceptor, isso pode ser útil se estiver encontrando problemas com o armazenamento da sessão excedendo a capacidade.

### browser.expectRequest(method: string, url: string, statusCode: number)

Faça expectativas sobre as requisições ajax que serão iniciadas durante o teste. Pode (e deve) ser encadeado. A ordem das expectativas deve mapear para a ordem das requisições sendo feitas.

* `method` (`String`): método http que é esperado. Pode ser qualquer coisa que `xhr.open()` aceite como primeiro argumento.
* `url` (`String`|`RegExp`): URL exata que é chamada na requisição como uma string ou RegExp para correspondência
* `statusCode` (`Number`): código de status esperado da resposta

### browser.getExpectations()

Método auxiliar. Retorna todas as expectativas que você criou até aquele ponto

### browser.resetExpectations()

Método auxiliar. Redefine todas as expectativas que você criou até aquele ponto

### `browser.assertRequests({ orderBy?: 'START' | 'END' }?: = {})`

Chame este método quando todas as requisições ajax esperadas estiverem concluídas. Ele compara as expectativas com as requisições reais feitas e afirma o seguinte:

- Contagem das requisições que foram feitas
- A ordem das requisições
- O método, a URL e o statusCode devem corresponder para cada requisição feita
- O objeto de opções tem como padrão `{ orderBy: 'END' }`, ou seja, quando as requisições foram concluídas, para ser consistente com o comportamento da v4.1.10 e anteriores. Quando a opção `orderBy` é definida como `'START'`, as requisições serão ordenadas por quando foram iniciadas pela página.

### `browser.assertExpectedRequestsOnly({ inOrder?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Semelhante a `browser.assertRequests`, mas valida apenas as requisições que você especifica em suas diretivas `expectRequest`, sem ter que mapear todas as requisições de rede que podem acontecer por perto. Se a opção `inOrder` for `true` (padrão), as requisições são esperadas para serem encontradas na mesma ordem em que foram configuradas com `expectRequest`.

### `browser.getRequest(index: number, { includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Para fazer afirmações mais sofisticadas sobre uma requisição específica, você pode obter detalhes para uma requisição específica. Você deve fornecer o índice baseado em 0 da requisição que deseja acessar, na ordem em que as requisições foram concluídas (padrão), ou iniciadas (passando a opção `orderBy: 'START'`).

* `index` (`number`): número da requisição que você deseja acessar
* `options` (`object`): Opções de configuração
* `options.includePending` (`boolean`): Se requisições ainda não concluídas devem ser retornadas. Por padrão, isso é falso, para corresponder ao comportamento da biblioteca na v4.1.10 e anteriores.
* `options.orderBy` (`'START' | 'END'`): Como as requisições devem ser ordenadas. Por padrão, isso é `'END'`, para corresponder ao comportamento da biblioteca na v4.1.10 e anteriores. Se `'START'`, as requisições serão ordenadas pelo horário de iniciação, em vez do horário de conclusão da requisição. (Uma vez que uma requisição pendente ainda não foi concluída, ao ordenar por `'END'` todas as requisições pendentes virão após todas as requisições concluídas.)

**Retorna** objeto `request`:

* `request.url`: URL requisitada
* `request.method`: método HTTP usado
* `request.body`: dados de carga útil/corpo usados na requisição
* `request.headers`: cabeçalhos http da requisição como objeto JS
* `request.pending`: flag booleana para indicar se esta requisição está completa (ou seja, tem uma propriedade `response`), ou em andamento.
* `request.response`: um objeto JS que só está presente se a requisição estiver concluída (ou seja, `request.pending === false`), contendo dados sobre a resposta.
* `request.response?.headers`: cabeçalhos http da resposta como objeto JS
* `request.response?.body`: corpo da resposta (será analisado como JSON, se possível)
* `request.response?.statusCode`: código de status da resposta

**Uma nota sobre `request.body`:** wdio-intercept-service tentará analisar o corpo da requisição da seguinte forma:

* string: Apenas retorna a string (`'value'`)
* JSON: Analisa o objeto JSON usando `JSON.parse()` (`({ key: value })`)
* FormData: Exibirá o FormData no formato `{ key: [value1, value2, ...] }`
* ArrayBuffer: Tentará converter o buffer em uma string (experimental)
* Qualquer outra coisa: Usará um `JSON.stringify()` brutal em seus dados. Boa sorte!

**Para a API `fetch`, nós só suportamos dados de string e JSON!**

### `browser.getRequests({ includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Obtenha todas as requisições capturadas como uma matriz, suportando as mesmas opções opcionais que `getRequest`.

**Retorna** matriz de objetos `request`.

### browser.hasPendingRequests()

Um método utilitário que verifica se alguma requisição HTTP ainda está pendente. Pode ser usado por testes para garantir que todas as requisições tenham sido concluídas dentro de um tempo razoável, ou para verificar se uma chamada para `getRequests()` ou `assertRequests()` incluirá todas as requisições HTTP desejadas.

**Retorna** boolean

## Suporte a TypeScript

Este plugin fornece seus próprios tipos TS. Basta apontar seu tsconfig para as extensões de tipo, como mencionado [aqui](https://webdriver.io/docs/typescript.html#framework-types):

```
"compilerOptions": {
    // ..
    "types": ["node", "webdriverio", "wdio-intercept-service"]
},
```

## Executando os testes

Versões recentes do Chrome e Firefox são necessárias para executar os testes localmente. Você pode precisar atualizar as dependências `chromedriver` e `geckodriver` para corresponder à versão instalada em seu sistema.

```shell
npm test
```

## Contribuindo

Estou feliz com qualquer contribuição. Basta abrir um problema ou enviar um PR diretamente.  
Observe que esta biblioteca de interceptação é escrita para funcionar com navegadores legados, como o Internet Explorer. Como tal, qualquer código usado em `lib/interceptor.js` deve ser pelo menos analisável pelo tempo de execução JavaScript do Internet Explorer.

## Licença

MIT