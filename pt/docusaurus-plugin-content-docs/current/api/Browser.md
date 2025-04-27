---
id: browser
title: O Objeto Browser
---

__Estende:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

O objeto browser é a instância de sessão que você usa para controlar o navegador ou dispositivo móvel. Se você usa o executor de teste WDIO, pode acessar a instância WebDriver através do objeto global `browser` ou `driver` ou importá-lo usando [`@wdio/globals`](/docs/api/globals). Se você usa o WebdriverIO em modo autônomo, o objeto browser é retornado pelo método [`remote`](/docs/api/modules#remoteoptions-modifier).

A sessão é inicializada pelo executor de teste. O mesmo vale para encerrar a sessão. Isso também é feito pelo processo do executor de teste.

## Propriedades

Um objeto browser tem as seguintes propriedades:

| Nome | Tipo | Detalhes |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Capacidades atribuídas pelo servidor remoto.<br /><b>Exemplo:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Capacidades solicitadas ao servidor remoto.<br /><b>Exemplo:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | ID de sessão atribuído pelo servidor remoto. |
| `options` | `Object` | [Opções](/docs/configuration) do WebdriverIO dependendo de como o objeto browser foi criado. Veja mais em [tipos de configuração](/docs/setuptypes). |
| `commandList` | `String[]` | Uma lista de comandos registrados na instância do navegador |
| `isW3C` | `Boolean` | Indica se esta é uma sessão W3C |
| `isChrome` | `Boolean` | Indica se esta é uma instância do Chrome |
| `isFirefox` | `Boolean` | Indica se esta é uma instância do Firefox |
| `isBidi` | `Boolean` | Indica se esta sessão usa Bidi |
| `isSauce` | `Boolean` | Indica se esta sessão está rodando no Sauce Labs |
| `isMacApp` | `Boolean` | Indica se esta sessão está rodando para um aplicativo nativo Mac |
| `isWindowsApp` | `Boolean` | Indica se esta sessão está rodando para um aplicativo nativo Windows |
| `isMobile` | `Boolean` | Indica uma sessão móvel. Veja mais em [Flags Móveis](#mobile-flags). |
| `isIOS` | `Boolean` | Indica uma sessão iOS. Veja mais em [Flags Móveis](#mobile-flags). |
| `isAndroid` | `Boolean` | Indica uma sessão Android. Veja mais em [Flags Móveis](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Indica se o dispositivo móvel está no contexto `NATIVE_APP`. Veja mais em [Flags Móveis](#mobile-flags). |
| `mobileContext` | `string`  | Fornecerá o contexto **atual** em que o driver está, por exemplo `NATIVE_APP`, `WEBVIEW_<packageName>` para Android ou `WEBVIEW_<pid>` para iOS. Isso economizará um WebDriver extra para `driver.getContext()`. Veja mais em [Flags Móveis](#mobile-flags). |


## Métodos

Com base no backend de automação usado para sua sessão, o WebdriverIO identifica quais [Comandos de Protocolo](/docs/api/protocols) serão anexados ao [objeto browser](/docs/api/browser). Por exemplo, se você executar uma sessão automatizada no Chrome, terá acesso a comandos específicos do Chromium como [`elementHover`](/docs/api/chromium#elementhover), mas não a nenhum dos [comandos do Appium](/docs/api/appium).

Além disso, o WebdriverIO fornece um conjunto de métodos convenientes que são recomendados para uso, para interagir com o [navegador](/docs/api/browser) ou [elementos](/docs/api/element) na página.

Além disso, os seguintes comandos estão disponíveis:

| Nome | Parâmetros | Detalhes |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Permite definir comandos personalizados que podem ser chamados a partir do objeto browser para fins de composição. Leia mais no guia [Comando Personalizado](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Permite sobrescrever qualquer comando do navegador com funcionalidade personalizada. Use com cuidado, pois pode confundir os usuários do framework. Leia mais no guia [Comando Personalizado](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Permite definir uma estratégia de seletor personalizada, leia mais no guia [Seletores](/docs/selectors#custom-selector-strategies). |

## Observações

### Flags Móveis

Se você precisa modificar seu teste com base no fato de sua sessão estar sendo executada em um dispositivo móvel ou não, você pode acessar as flags móveis para verificar.

Por exemplo, dada esta configuração:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

Você pode acessar essas flags em seu teste da seguinte forma:

```js
// Nota: `driver` é equivalente ao objeto `browser`, mas semanticamente mais correto
// você pode escolher qual variável global deseja usar
console.log(driver.isMobile) // saída: true
console.log(driver.isIOS) // saída: true
console.log(driver.isAndroid) // saída: false
```

Isso pode ser útil se, por exemplo, você quiser definir seletores em seus [objetos de página](../pageobjects) com base no tipo de dispositivo, assim:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

Você também pode usar essas flags para executar apenas certos testes para certos tipos de dispositivos:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // executar teste apenas com dispositivos Android
    if (driver.isAndroid) {
        it('testa algo apenas para Android', () => {
            // ...
        })
    }
    // ...
})
```

### Eventos
O objeto browser é um EventEmitter e vários eventos são emitidos para seus casos de uso.

Aqui está uma lista de eventos. Tenha em mente que esta não é a lista completa de eventos disponíveis ainda.
Sinta-se à vontade para contribuir atualizando o documento, adicionando descrições de mais eventos aqui.

#### `command`

Este evento é emitido sempre que o WebdriverIO envia um comando WebDriver Classic. Ele contém as seguintes informações:

- `command`: o nome do comando, por exemplo `navigateTo`
- `method`: o método HTTP usado para enviar a solicitação de comando, por exemplo `POST`
- `endpoint`: o endpoint do comando, por exemplo `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: a carga útil do comando, por exemplo `{ url: 'https://webdriver.io' }`

#### `result`

Este evento é emitido sempre que o WebdriverIO recebe um resultado de um comando WebDriver Classic. Ele contém as mesmas informações que o evento `command` com o acréscimo das seguintes informações:

- `result`: o resultado do comando

#### `bidiCommand`

Este evento é emitido sempre que o WebdriverIO envia um comando WebDriver Bidi para o driver do navegador. Ele contém informações sobre:

- `method`: método de comando WebDriver Bidi
- `params`: parâmetro de comando associado (veja [API](/docs/api/webdriverBidi))

#### `bidiResult`

Em caso de execução bem-sucedida do comando, a carga útil do evento será:

- `type`: `success`
- `id`: o id do comando
- `result`: o resultado do comando (veja [API](/docs/api/webdriverBidi))

Em caso de erro de comando, a carga útil do evento será:

- `type`: `error`
- `id`: o id do comando
- `error`: o código de erro, por exemplo `invalid argument`
- `message`: detalhes sobre o erro
- `stacktrace`: um rastreamento de pilha

#### `request.start`
Este evento é disparado antes que uma solicitação WebDriver seja enviada ao driver. Ele contém informações sobre a solicitação e sua carga útil.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Este evento é disparado quando a solicitação ao driver recebe uma resposta. O objeto de evento contém o corpo da resposta como resultado ou um erro se o comando WebDriver falhou.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
O evento de retry pode notificá-lo quando o WebdriverIO tenta repetir a execução do comando, por exemplo, devido a um problema de rede. Ele contém informações sobre o erro que causou a nova tentativa e a quantidade de tentativas já realizadas.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Este é um evento para medir operações de nível WebDriver. Sempre que o WebdriverIO envia uma solicitação ao backend WebDriver, este evento será emitido com algumas informações úteis:

- `durationMillisecond`: Duração de tempo da solicitação em milissegundos.
- `error`: Objeto de erro se a solicitação falhou.
- `request`: Objeto de solicitação. Você pode encontrar url, método, cabeçalhos, etc.
- `retryCount`: Se for `0`, a solicitação foi a primeira tentativa. Aumentará quando o WebDriverIO repetir internamente.
- `success`: Booleano para representar se a solicitação foi bem-sucedida ou não. Se for `false`, a propriedade `error` também será fornecida.

Um exemplo de evento:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Comandos Personalizados

Você pode definir comandos personalizados no escopo do navegador para abstrair fluxos de trabalho comumente usados. Confira nosso guia sobre [Comandos Personalizados](/docs/customcommands#adding-custom-commands) para mais informações.