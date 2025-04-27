---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

Cria uma nova sessão Selenium com suas capacidades atuais. Isso é útil se você
testa aplicações altamente dependentes de estado onde você precisa limpar a sessão do navegador entre
os testes em seu arquivo de especificação para evitar a criação de centenas de arquivos de teste individuais com WDIO.
No entanto, tenha cuidado, este comando afeta seu tempo de teste tremendamente, já que criar
novas sessões Selenium consome muito tempo, especialmente ao usar serviços em nuvem.

Parâmetros de conexão como hostname, porta, protocolo, etc. podem ser adicionados junto com
browserName quando você deseja conectar-se a um serviço remoto diferente. Isso é útil
em uma situação, por exemplo, onde você inicia um teste em um aplicativo nativo e precisa verificar
dados em um aplicativo web.

Se você começar a partir de um serviço remoto, pode passar 0.0.0.0 como hostname se quiser
mudar para drivers locais.

##### Uso

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>novas capacidades para criar uma sessão</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```