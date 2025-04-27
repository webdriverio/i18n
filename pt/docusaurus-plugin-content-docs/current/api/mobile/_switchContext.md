---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Mude para um contexto específico usando um determinado `name`, `title` ou `url` de Webview.

Este método aprimora o comando `context` padrão do Appium, oferecendo mais flexibilidade e precisão
para alternar entre contextos nativos e de webview em aplicativos móveis híbridos.

### Como os Contextos Funcionam
Para uma visão geral de Aplicativos Híbridos e webviews, consulte a [documentação de Aplicativos Híbridos](/docs/api/mobile#hybrid-apps).
Abaixo está um resumo de como o comando `switchContext` aborda desafios comuns:

#### Desafios no Android
- Webviews geralmente contêm várias páginas (semelhantes a abas do navegador). Identificar a página correta requer
  metadados adicionais como `title` ou `url`, que não são fornecidos pelos métodos padrão do Appium.
- Os métodos padrão do Appium retornam apenas nomes básicos de contexto (por exemplo, `WEBVIEW_{packageName}`) sem detalhes sobre
  o conteúdo ou páginas dentro do webview.
- A troca de contextos no Android envolve duas etapas, que são tratadas automaticamente por este método:
  1. Mudar para o contexto Webview usando `WEBVIEW_{packageName}`.
  2. Selecionar a página apropriada dentro do Webview usando o método `switchToWindow`.

#### Desafios no iOS
- Webviews são identificados por IDs genéricos (por exemplo, `WEBVIEW_{id}`), que não fornecem informações sobre o conteúdo
  ou a tela do aplicativo à qual eles correspondem.
- Determinar o webview correto para interação geralmente requer tentativa e erro.

O método `switchContext` simplifica este processo recuperando metadados detalhados (por exemplo, `title`, `url` e visibilidade)
para garantir uma troca de contexto precisa e confiável.

### Por Que Usar Este Método?
- **Troca Simplificada**: Se você conhece o `title` ou `url` do webview desejado, este método elimina a necessidade de
  chamadas adicionais para `getContexts` ou combinar múltiplos métodos como `switchContext({id})` e `getTitle()`.
- **Correspondência Automática de Contexto**: Encontra a melhor correspondência para um contexto com base em:
  - Identificadores específicos da plataforma (`bundleId` para iOS, `packageName` para Android).
  - Correspondências exatas ou parciais para `title` ou `url` (suporta strings e expressões regulares).
  - Verificações específicas do Android para garantir que os webviews estejam anexados e visíveis.
- **Controle Refinado**: Intervalos de repetição personalizados e timeouts (somente Android) permitem lidar com atrasos na inicialização do webview.
- **Acesso ao Método Padrão do Appium**: Se necessário, você pode usar o comando `switchContext` padrão do Appium via `driver.switchAppiumContext()`.

:::info Notas e Limitações

- Se o `title` ou `url` do webview desejado for conhecido, este método pode localizar automaticamente e alternar para o contexto correspondente sem chamadas adicionais `getContexts`.
- Opções específicas do Android como `androidWebviewConnectionRetryTime` e `androidWebviewConnectTimeout` não são aplicáveis ao iOS.
- Registra motivos para falhas de correspondência de contexto para auxiliar na depuração.
- Ao usar um objeto como entrada, `title` ou `url` é obrigatório.

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>O nome do contexto para o qual alternar. Um objeto com mais opções de contexto pode ser fornecido.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>Opções do comando switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string, RegExp`</td>
      <td>O título da página para a qual alternar. Este será o conteúdo da tag title de uma página de webview. Você pode usar uma string que precisa corresponder completamente ou uma expressão regular.<br /><strong>IMPORTANTE:</strong> Quando você usa opções, então ou a propriedade `title` ou a `url` é obrigatória.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string, RegExp`</td>
      <td>A url da página para a qual alternar. Esta será a `url` de uma página de webview. Você pode usar uma string que precisa corresponder completamente ou uma expressão regular.<br /><strong>IMPORTANTE:</strong> Quando você usa opções, então ou a propriedade `title` ou a `url` é obrigatória.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>O tempo em milissegundos para esperar entre cada tentativa de conexão ao webview. O padrão é `500` ms (opcional). <br /><strong>SOMENTE PARA ANDROID</strong> e será usado apenas quando um `title` ou `url` for fornecido.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>O tempo máximo em milissegundos para esperar até que uma página de webview seja detectada. O padrão é `5000` ms (opcional). <br /><strong>SOMENTE PARA ANDROID</strong> e será usado apenas quando um `title` ou `url` for fornecido.</td>
    </tr>
  </tbody>
</table>

##### Exemplos

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```