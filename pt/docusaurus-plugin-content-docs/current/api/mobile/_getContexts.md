---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

O método `getContexts` do WebdriverIO é uma versão aprimorada do comando padrão do Appium `contexts`
(e do anterior WebdriverIO `getContexts`). Ele fornece informações detalhadas e acionáveis
sobre os contextos disponíveis em uma sessão de aplicativo móvel, abordando as limitações dos métodos padrão do Appium.

### Como os Webviews Funcionam e Por Que Este Método Ajuda
Para mais detalhes, consulte a [documentação de Aplicativos Híbridos](/docs/api/mobile#hybrid-apps). Abaixo está um resumo dos desafios abordados pelo comando `getContexts`:

#### Desafios no Android
- Um único webview (por exemplo, `WEBVIEW_{packageName}`) pode conter várias páginas (semelhante às abas do navegador).
- Os métodos padrão do Appium não incluem detalhes sobre essas páginas, como `title`, `url` ou visibilidade,
  tornando difícil identificar a página correta e levando a possíveis instabilidades.

#### Desafios no iOS
- O método padrão do Appium retorna apenas IDs genéricos de webview (por exemplo, `WEBVIEW_{id}`) sem nenhum metadado adicional.
- Isso torna difícil determinar qual webview corresponde à tela do aplicativo alvo.

O método aprimorado `getContexts` resolve esses problemas retornando objetos de contexto detalhados, que incluem:
- **Para Android:** `title`, `url`, `packageName`, `webviewPageId` e detalhes de layout (`screenX`, `screenY`, `width` e `height`).
- **Para iOS:** `bundleId`, `title` e `url`.

Essas melhorias tornam a depuração e a interação com aplicativos híbridos mais confiáveis.

### Por Que Usar Este Método?
Por padrão, o método `contexts` do Appium retorna apenas uma matriz de strings representando os contextos disponíveis:
- **Para Android:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **Para iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

Embora suficientes para cenários simples, essas respostas padrão não possuem metadados críticos para testes de aplicativos híbridos:
- **Para Android:** A falta de metadados específicos da página torna desafiador interagir com o webview correto.
- **Para iOS:** IDs genéricos de webview não fornecem nenhuma informação sobre o conteúdo ou tela do aplicativo que representam.

O método aprimorado `getContexts` fornece:
- Metadados detalhados para Android e iOS.
- Opções para filtrar e personalizar os contextos retornados para melhor direcionamento e interação.

:::info Notas e Limitações

- O método aprimorado `getContexts` funciona em plataformas Android e iOS. No entanto, os dados retornados podem variar dependendo da plataforma e do aplicativo em teste.
- Se você não especificar a opção `returnDetailedContexts`, o método se comporta como o método padrão `contexts` do Appium, retornando uma matriz simples de contextos.
- Para usar o método "padrão" `contexts` do Appium, use `driver.getAppiumContexts()`. Para mais informações, consulte a [documentação de Contextos do Appium](/docs/api/appium#getappiumcontexts).

#### Webviews Android:
- Metadados como `androidWebviewData` estão disponíveis apenas quando `returnAndroidDescriptionData` é `true`.
- Usar o método `getContexts` em um navegador Chrome pode ocasionalmente retornar dados incompletos devido a versões incompatíveis de navegador/Webview/ChromeDriver. Nesses casos, valores padrão ou um `webviewPageId` incorreto (por exemplo, `0`) podem ser retornados.

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
      <td>As opções de `getContexts` (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por padrão, retornamos apenas os nomes de contexto baseados na API padrão `contexts` do Appium. Se você quiser obter todos os dados, pode definir isso como `true`. O padrão é `false` (opcional).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>O tempo em milissegundos para aguardar entre cada tentativa de conexão ao webview. O padrão é `500` ms (opcional). <br /><strong>APENAS PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A quantidade máxima de tempo em milissegundos para aguardar que uma página de webview seja detectada. O padrão é `5000` ms (opcional). <br /><strong>APENAS PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por padrão, retornamos todos os webviews. Se você quiser filtrar os webviews pelo aplicativo Android atual que está aberto, pode definir isso como `true`. O padrão é `false` (opcional). <br /><strong>NOTA:</strong> Esteja ciente de que você também pode NÃO encontrar nenhum Webview com base nesta "restrição". <br /><strong>APENAS PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por padrão, retornamos apenas os webviews que estão anexados e visíveis. Se você quiser obter todos os webviews, pode definir isso como `false` (opcional). O padrão é `true`. <br /><strong>APENAS PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por padrão, não há dados de descrição do Webview Android (Chrome). Se você quiser obter todos os dados, pode definir isso como `true`. O padrão é `false` (opcional). <br />Ao habilitar esta opção, você receberá dados extras na resposta, consulte o arquivo `description.data.test.js` para mais informações. <br /><strong>APENAS PARA ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Exemplos

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```