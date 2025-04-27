---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Recupera o contexto da sessão atual.

Este método aprimora o comando padrão `context` do Appium/`getContext` do WebdriverIO fornecendo uma opção para
retornar informações detalhadas do contexto, facilitando o trabalho com aplicativos híbridos que usam webviews.

### Como os Contextos Funcionam
Consulte a [documentação de Aplicativos Híbridos](/docs/api/mobile#hybrid-apps) para mais informações. Abaixo está uma explicação dos desafios associados ao comando `getContext`:

#### Para Android:
- Webviews podem conter múltiplas páginas (como abas de navegador), e identificar a página correta requer metadados adicionais
  como `title` ou `url`.
- Os métodos padrão do Appium fornecem apenas nomes básicos de contexto (ex: `WEBVIEW_{packageName}`) sem informações detalhadas
  sobre as páginas dentro do webview.

#### Para iOS:
- Cada webview é identificado por uma string genérica `WEBVIEW_{id}`, que não indica seu conteúdo ou a tela do aplicativo
  a que pertence.

### Por Que Usar Este Método?
- **Comportamento Padrão**:
  - Retorna o contexto atual como uma string (ex: `NATIVE_APP` ou `WEBVIEW_{id}`).
- **Contexto Detalhado**:
  - Quando `returnDetailedContext` está ativado, recupera metadados como:
    - **Android**: `packageName`, `title`, `url` e `webviewPageId`.
    - **iOS**: `bundleId`, `title` e `url`.
- **Opções Específicas para Android**:
  - Intervalos de tentativas e timeouts podem ser personalizados para lidar com atrasos na inicialização do webview.

:::info Notas e Limitações

- Se `returnDetailedContext` não estiver ativado, o método se comporta como o método `getContext` padrão do Appium.
- Se você quiser usar o método `context` "padrão" do Appium, você pode usar o método `driver.getAppiumContext()`, veja
também o comando [Appium Contexts](/docs/api/appium#getappiumcontext).
- **Android:** Opções específicas para Android (`androidWebviewConnectionRetryTime` e `androidWebviewConnectTimeout`) não têm efeito no iOS.
- Registra avisos se múltiplos ou nenhum contexto detalhado for encontrado:
  - `We found more than 1 detailed context for the current context '{context}'. We will return the first context.`
  - `We did not get back any detailed context for the current context '{context}'. We will return the current context as a string.`

:::

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`GetContextsOptions`</td>
      <td>As opções de `getContext` (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por padrão, retornamos apenas o nome do contexto baseado na API `context` padrão do Appium, que é apenas uma string. Se você quiser obter informações detalhadas do contexto, defina isto como `true`. O padrão é `false` (opcional).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>O tempo em milissegundos para esperar entre cada tentativa de conexão com o webview. O padrão é `500` ms (opcional). <br /><strong>APENAS PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>O tempo máximo em milissegundos para esperar que uma página de webview seja detectada. O padrão é `5000` ms (opcional). <br /><strong>APENAS PARA ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Exemplos

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```