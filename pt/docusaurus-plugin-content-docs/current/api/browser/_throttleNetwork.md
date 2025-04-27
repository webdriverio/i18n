---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Limita as capacidades de rede do navegador. Isso pode ajudar a
emular certos cenários onde um usuário perde sua conexão com a internet
e seu aplicativo precisa lidar com isso.

Existem muitos presets disponíveis com configurações padrão para facilitar o uso.
Eles são `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

Você pode ver os valores para estes presets [no código fonte](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Observe que usar o comando `throttleNetwork` requer suporte para o protocolo Chrome DevTools e, por exemplo,
não pode ser usado ao executar testes automatizados na nuvem. O protocolo Chrome DevTools não é instalado por padrão,
use `npm install puppeteer-core` para instalá-lo.
Saiba mais na seção [Protocolos de Automação](/docs/automationProtocols).

:::

##### Uso

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>parâmetros para limitação</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>True para emular desconexão da internet.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Latência mínima desde o envio da solicitação até o recebimento dos cabeçalhos de resposta (ms).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Throughput máximo agregado de download (bytes/seg). -1 desativa a limitação de download.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Throughput máximo agregado de upload (bytes/seg). -1 desativa a limitação de upload.</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // via static string preset
    await browser.throttleNetwork('Regular3G')

    // via custom values
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```