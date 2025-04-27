---
id: webdriver
title: Protocolo WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
O comando New Session cria uma nova sessão WebDriver com o nó de endpoint. Se a criação falhar, um erro de sessão não criada é retornado.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-new-sessions).

##### Uso

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>um objeto JSON, o conjunto de capacidades que foi mesclado e correspondido no algoritmo de processamento de capacidades</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** Objeto contendo sessionId e capabilities da sessão WebDriver criada.


---

## deleteSession
O comando Delete Session fecha quaisquer contextos de navegação de nível superior associados à sessão atual, encerra a conexão e finalmente fecha a sessão atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-delete-session).

##### Uso

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>Objeto contendo opções para o comando deleteSession, por exemplo `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>



---

## status
O comando Status retorna informações sobre se um endpoint remoto está em um estado em que pode criar novas sessões e pode adicionalmente incluir meta informações arbitrárias específicas da implementação.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-status).

##### Uso

```js
browser.status()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** Objeto contendo o status do driver.


---

## getTimeouts
O comando Get Timeouts obtém as durações de timeout associadas à sessão atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-timeouts).

##### Uso

```js
browser.getTimeouts()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** Objeto contendo durações de timeout para `script`, `pageLoad` e `implicit`.


---

## setTimeouts
O comando Set Timeouts define as durações de timeout associadas à sessão atual. Os timeouts que podem ser controlados estão listados na tabela de timeouts de sessão abaixo.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-set-timeouts).

##### Uso

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>inteiro em ms para o timeout de espera implícita da sessão</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>inteiro em ms para o timeout de carregamento de página da sessão</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>inteiro em ms para o timeout de script da sessão</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
O comando Get Current URL retorna a URL do contexto de navegação de nível superior atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-current-url).

##### Uso

```js
browser.getUrl()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>url</var></code>:** URL do documento ativo do contexto de navegação de nível superior atual


---

## navigateTo
O comando navigateTo (go) é usado para fazer com que o agente do usuário navegue no contexto de navegação de nível superior atual para uma nova localização.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [url](/docs/api/browser/url). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>string representando uma URL absoluta (começando com http(s)), possivelmente incluindo um fragmento (#...), também poderia ser um esquema local (about: etc)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
O comando Back faz com que o navegador percorra um passo para trás no histórico de sessão conjunto do contexto de navegação de nível superior atual. Isso é equivalente a pressionar o botão voltar no chrome do navegador ou chamar `window.history.back`.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-back).

##### Uso

```js
browser.back()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```




---

## forward
O comando Forward faz com que o navegador percorra um passo à frente no histórico de sessão conjunto do contexto de navegação de nível superior atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-forward).

##### Uso

```js
browser.forward()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```




---

## refresh
O comando Refresh faz com que o navegador recarregue a página no contexto de navegação de nível superior atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-refresh).

##### Uso

```js
browser.refresh()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```




---

## getTitle
O comando Get Title retorna o título do documento do contexto de navegação de nível superior atual, equivalente a chamar `document.title`.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-title).

##### Uso

```js
browser.getTitle()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>title</var></code>:** Retorna uma string que é a mesma que `document.title` do contexto de navegação de nível superior atual.


---

## getWindowHandle
O comando Get Window Handle retorna o identificador da janela para o contexto de navegação de nível superior atual. Pode ser usado como um argumento para Switch To Window.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-window-handle).

##### Uso

```js
browser.getWindowHandle()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** Retorna uma string que é o identificador da janela para o contexto de navegação de nível superior atual.


---

## closeWindow
O comando Close Window fecha o contexto de navegação de nível superior atual. Uma vez concluído, se não houver mais contextos de navegação de nível superior abertos, a sessão WebDriver em si é fechada.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-close-window).

##### Uso

```js
browser.closeWindow()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```




---

## switchToWindow
O comando Switch To Window é usado para selecionar o contexto de navegação de nível superior atual para a sessão atual, ou seja, aquele que será usado para processar comandos.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [switchWindow](/docs/api/browser/switchWindow). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>uma string representando um identificador de janela, deve ser uma das strings que foi retornada em uma chamada para getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
Cria um novo contexto de navegação de nível superior.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#new-window).

##### Uso

```js
browser.createWindow(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>Defina como 'tab' se a janela recém-criada compartilha uma janela em nível de SO com o contexto de navegação atual, ou 'window' caso contrário.</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** Novo objeto de janela contendo 'handle' com o valor do identificador e 'type' com o valor do tipo de janela criada


---

## getWindowHandles
O comando Get Window Handles retorna uma lista de identificadores de janelas para cada contexto de navegação de nível superior aberto. A ordem em que os identificadores de janela são retornados é arbitrária.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-window-handles).

##### Uso

```js
browser.getWindowHandles()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### Retorna

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** Uma matriz que é uma lista de identificadores de janela.


---

## printPage
O comando Print Page renderiza o documento para um documento PDF paginado. __Nota:__ O Chrome atualmente só suporta isso no [modo headless](https://webdriver.io/docs/capabilities/#run-browser-headless), veja [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#print-page).

##### Uso

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>orientação da página. Padrão: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>escala da página. Padrão: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>fundo da página. Padrão: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>largura da página em cm. Padrão: `21.59` da página</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>altura da página em cm. Padrão: `27.94` da página</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>margem da página em cm a partir da margem superior. Padrão: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>margem da página em cm a partir da margem inferior. Padrão: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>margem da página em cm a partir da margem esquerda. Padrão: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>margem da página em cm a partir da margem direita. Padrão: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>reduzir o pdf para caber na página. Padrão: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object[]</td>
      <td>intervalos de páginas. Padrão `[]`</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** A representação PDF codificada em base64 do documento paginado.


---

## switchToFrame
O comando Switch To Frame é usado para selecionar o contexto de navegação de nível superior atual ou um contexto de navegação filho do contexto de navegação atual para usar como o contexto de navegação atual para comandos subsequentes.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

Este comando de protocolo está obsoleto<br />Este comando está obsoleto e incentivamos todos a usar `switchFrame` em vez disso para alternar para frames. Leia mais sobre este comando em https://webdriver.io/docs/api/browser/switchFrame.
:::

##### Uso

```js
browser.switchToFrame(id)
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
      <td><code><var>id</var></code></td>
      <td>number, object, null</td>
      <td>um de três tipos possíveis: null: isso representa o contexto de navegação de nível superior (ou seja, não um iframe), um Number, representando o índice do objeto de janela correspondente a um frame, um objeto Element recebido usando `findElement`.</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
O comando Switch to Parent Frame define o contexto de navegação atual para comandos futuros para o pai do contexto de navegação atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).

##### Uso

```js
browser.switchToParentFrame()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```




---

## getWindowRect
O comando Get Window Rect retorna o tamanho e a posição na tela da janela do sistema operacional correspondente ao contexto de navegação de nível superior atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [getWindowSize](/docs/api/browser/getWindowSize). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.getWindowRect()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Uma representação JSON de um objeto "window rect". Isso tem 4 propriedades: `x`, `y`, `width` e `height`.


---

## setWindowRect
O comando Set Window Rect altera o tamanho e a posição da janela do sistema operacional correspondente ao contexto de navegação de nível superior atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [setWindowSize](/docs/api/browser/setWindowSize). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.setWindowRect(x, y, width, height)
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
      <td><code><var>x</var></code></td>
      <td>number, null</td>
      <td>o atributo screenX do objeto window</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>o atributo screenY do objeto window</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>a largura das dimensões externas do contexto de navegação de nível superior, incluindo chrome do navegador etc...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>a altura das dimensões externas do contexto de navegação de nível superior, incluindo chrome do navegador etc...</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Uma representação JSON de um objeto "window rect" baseado no novo estado da janela.


---

## maximizeWindow
O comando Maximize Window invoca a operação específica do gerenciador de janelas "maximize", se houver, na janela que contém o contexto de navegação de nível superior atual. Isso normalmente aumenta a janela para o tamanho máximo disponível sem entrar em tela cheia.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-maximize-window).

##### Uso

```js
browser.maximizeWindow()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Uma representação JSON de um objeto "window rect" baseado no novo estado da janela.


---

## minimizeWindow
O comando Minimize Window invoca a operação específica do gerenciador de janelas "minimize", se houver, na janela que contém o contexto de navegação de nível superior atual. Isso normalmente oculta a janela na bandeja do sistema.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-minimize-window).

##### Uso

```js
browser.minimizeWindow()
```


##### Retorna

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Uma representação JSON de um objeto "window rect" do (novo) contexto de navegação de nível superior atual.


---

## fullscreenWindow
O comando Fullscreen Window invoca a operação específica do gerenciador de janelas "full screen", se houver, na janela que contém o contexto de navegação de nível superior atual. Isso normalmente aumenta a janela para o tamanho da tela física e pode ocultar elementos do chrome do navegador, como barras de ferramentas.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-fullscreen-window).

##### Uso

```js
browser.fullscreenWindow()
```


##### Retorna

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Uma representação JSON de um objeto "window rect" do (novo) contexto de navegação de nível superior atual.


---

## findElement
O comando Find Element é usado para encontrar um elemento no contexto de navegação atual que pode ser usado para comandos futuros. Este comando retorna a representação JSON do elemento que pode ser passada para o comando $ para transformar a referência em um elemento WebdriverIO estendido.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [$](/docs/api/browser/$). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>uma estratégia de localização de elemento válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>o seletor real que será usado para encontrar um elemento</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### Retorna

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Uma representação JSON de um objeto de elemento, por exemplo `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromShadowRoot
O comando Find Element From Shadow Root é usado para encontrar um elemento dentro da raiz da sombra de um elemento que pode ser usado para comandos futuros. Este comando retorna a representação JSON do elemento que pode ser passada para o comando $ para transformar a referência em um elemento WebdriverIO estendido.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [shadow$](/docs/api/element/shadow$). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>ID do elemento de um elemento raiz de sombra</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>uma estratégia de localização de elemento válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>o seletor real que será usado para encontrar um elemento</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### Retorna

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Uma representação JSON de um objeto de sombra de elemento, por exemplo `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElements
O comando Find Elements é usado para encontrar elementos no contexto de navegação atual que podem ser usados para comandos futuros. Este comando retorna uma matriz de representação JSON dos elementos que pode ser passada para o comando $ para transformar a referência em um elemento WebdriverIO estendido (Veja findElement).<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [$$](/docs/api/browser/$$). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>uma estratégia de localização de elemento válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>o seletor real que será usado para encontrar um elemento</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### Retorna

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Uma lista JSON (possivelmente vazia) de representações de um objeto de elemento, por exemplo `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## findElementsFromShadowRoot
O comando Find Elements é usado para encontrar elementos dentro da raiz da sombra de um elemento que podem ser usados para comandos futuros. Este comando retorna uma matriz de representação JSON dos elementos que pode ser passada para o comando $ para transformar a referência em um elemento WebdriverIO estendido (Veja findElement).<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [shadow$$](/docs/api/element/shadow$$). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>ID do elemento de um elemento raiz de sombra</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>uma estratégia de localização de elemento válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>o seletor real que será usado para encontrar um elemento</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### Retorna

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Uma lista JSON (possivelmente vazia) de representações de um objeto de elemento, por exemplo `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromElement
O comando Find Element From Element é usado para encontrar um elemento a partir de um elemento web no contexto de navegação atual que pode ser usado para comandos futuros. Este comando retorna a representação JSON do elemento que pode ser passada para o comando $ para transformar a referência em um elemento WebdriverIO estendido (Veja findElement).<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [$](/docs/api/element/$). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>uma estratégia de localização de elemento válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>o seletor real que será usado para encontrar um elemento</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### Retorna

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Uma representação JSON de um objeto de elemento, por exemplo `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementsFromElement
O comando Find Elements From Element é usado para encontrar elementos a partir de um elemento web no contexto de navegação atual que podem ser usados para comandos futuros. Este comando retorna uma matriz de representação JSON dos elementos que pode ser passada para o comando $ para transformar a referência em um elemento WebdriverIO estendido (Veja findElement).<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [$$](/docs/api/element/$$). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>uma estratégia de localização de elemento válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>o seletor real que será usado para encontrar um elemento</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### Retorna

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Uma lista JSON (possivelmente vazia) de representações de um objeto de elemento, por exemplo `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## getElementShadowRoot
Obtém o objeto de raiz de sombra de um elemento. O objeto de resultado pode ser usado para buscar elementos dentro desta raiz de sombra usando, por exemplo, findElementFromShadowRoots ou findElementsFromShadowRoots.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [shadow$](/docs/api/element/shadow$). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.getElementShadowRoot(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** Uma representação JSON de uma raiz de sombra de elemento, por exemplo `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## getActiveElement
Get Active Element retorna o elemento ativo do elemento de documento do contexto de navegação atual. Este comando retorna a representação JSON do elemento que pode ser passada para o comando $ para transformar a referência em um elemento WebdriverIO estendido (Veja findElement).<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-active-element).

##### Uso

```js
browser.getActiveElement()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>element</var></code>:** Uma representação JSON de um objeto de elemento, por exemplo `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## isElementSelected
Is Element Selected determina se o elemento referenciado está selecionado ou não. Esta operação só faz sentido em elementos de entrada dos estados de Checkbox e Radio Button, ou elementos de opção.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [isSelected](/docs/api/element/isSelected). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.isElementSelected(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` ou `false` com base no estado selecionado.


---

## isElementDisplayed
Is Element Displayed determina a visibilidade de um elemento, guiada pelo que é perceptualmente visível para o olho humano. Neste contexto, a exibição de um elemento não está relacionada às propriedades de estilo `visibility` ou `display`.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#element-displayedness).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [isDisplayed](/docs/api/element/isDisplayed). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.isElementDisplayed(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` ou `false` com base no estado visível.


---

## getElementAttribute
O comando Get Element Attribute retornará o atributo de um elemento web.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [getAttribute](/docs/api/element/getAttribute). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nome do valor do atributo a ser recuperado</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** O atributo nomeado do elemento.


---

## getElementProperty
O comando Get Element Property retornará o resultado da obtenção de uma propriedade de um elemento.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [getProperty](/docs/api/element/getProperty). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nome da propriedade do atributo a ser recuperada</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>property</var></code>:** A propriedade nomeada do elemento, acessada chamando GetOwnProperty no objeto do elemento.


---

## getElementCSSValue
O comando Get Element CSS Value recupera o valor computado da propriedade CSS fornecida do elemento web fornecido.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [getCSSProperty](/docs/api/element/getCSSProperty). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>nome da propriedade CSS a ser recuperada</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** O valor computado do parâmetro correspondente ao nome da propriedade das declarações de estilo do elemento (a menos que o tipo de documento seja xml, caso em que o valor de retorno é simplesmente a string vazia).


---

## getElementText
O comando Get Element Text pretende retornar o texto "como renderizado" de um elemento. O texto renderizado de um elemento também é usado para localizar elementos pelo texto do link e texto parcial do link.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-element-text).

##### Uso

```js
browser.getElementText(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>text</var></code>:** O texto visível do elemento (incluindo elementos filhos), seguindo o algoritmo definido nos Selenium Atoms para [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).


---

## getElementTagName
O comando Get Element Tag Name retorna o nome do elemento qualificado do elemento web fornecido.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [getTagName](/docs/api/element/getTagName). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.getElementTagName(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>text</var></code>:** O atributo tagName do elemento.


---

## getElementRect
O comando Get Element Rect retorna as dimensões e coordenadas do elemento web fornecido.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

Este comando de protocolo está incorporado nos seguintes métodos convenientes: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). É recomendado usar estes comandos em vez do protocolo.

:::


##### Uso

```js
browser.getElementRect(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** Um objeto JSON representando a posição e o retângulo delimitador do elemento.


---

## isElementEnabled
Is Element Enabled determina se o elemento referenciado está habilitado ou não. Esta operação só faz sentido em controles de formulário.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [isEnabled](/docs/api/element/isEnabled). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.isElementEnabled(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** Se o elemento estiver em um documento xml, ou for um controle de formulário desativado: `false`, caso contrário, `true`.


---

## elementClick
O comando Element Click rola para a exibição do elemento se ele ainda não estiver interagível por ponteiro, e clica em seu ponto central visível. Se o ponto central do elemento estiver obscurecido por outro elemento, um erro de clique de elemento interceptado é retornado. Se o elemento estiver fora da viewport, um erro de elemento não interagível é retornado.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [click](/docs/api/element/click). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.elementClick(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
O comando Element Clear rola para a exibição de um elemento editável ou resetável e então tenta limpar seus arquivos selecionados ou conteúdo de texto.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [clearValue](/docs/api/element/clearValue). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.elementClear(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
O comando Element Send Keys rola para a exibição do elemento de controle de formulário e então envia as teclas fornecidas para o elemento. No caso de o elemento não ser interagível por teclado, um erro de elemento não interagível é retornado.<br /><br />O estado de entrada de tecla usado para a entrada pode ser limpo no meio da "digitação" enviando a tecla nula, que é U+E000 (NULL).<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

Este comando de protocolo está incorporado nos seguintes métodos convenientes: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). É recomendado usar estes comandos em vez do protocolo.

:::


##### Uso

```js
browser.elementSendKeys(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>string para enviar como toques de tecla para o elemento</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
O comando Get Page Source retorna uma serialização em string do DOM do documento ativo do contexto de navegação atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-page-source).

##### Uso

```js
browser.getPageSource()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** o DOM do documento ativo do contexto de navegação atual


---

## executeScript
O comando Execute Script executa uma função JavaScript no contexto do contexto de navegação atual e retorna o valor de retorno da função.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [execute](/docs/api/browser/execute). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>uma string, o corpo da função Javascript que você deseja executar</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>um array de valores JSON que serão desserializados e passados como argumentos para sua função</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### Retorna

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Ou o valor de retorno do seu script, o cumprimento da Promessa retornada pelo seu script, ou o erro que foi o motivo da rejeição da Promessa retornada pelo seu script.


---

## executeAsyncScript
O comando Execute Async Script faz com que o JavaScript seja executado como uma função anônima. Ao contrário do comando Execute Script, o resultado da função é ignorado. Em vez disso, um argumento adicional é fornecido como o argumento final para a função. Esta é uma função que, quando chamada, retorna seu primeiro argumento como a resposta.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

Este comando de protocolo está incorporado no seguinte método conveniente: [executeAsync](/docs/api/browser/executeAsync). É recomendado usar este comando em vez do protocolo.

:::


##### Uso

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>uma string, o corpo da função Javascript que você deseja executar</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>um array de valores JSON que serão desserializados e passados como argumentos para sua função</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### Retorna

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Ou o valor de retorno do seu script, o cumprimento da Promessa retornada pelo seu script, ou o erro que foi o motivo da rejeição da Promessa retornada pelo seu script.


---

## getAllCookies
O comando Get All Cookies retorna todos os cookies associados ao endereço do documento ativo do contexto de navegação atual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-all-cookies).

##### Uso

```js
browser.getAllCookies()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### Retorna

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** Uma lista de cookies serializados. Cada cookie serializado tem vários campos opcionais que podem ou não ser retornados além de `name` e `value`.


---

## addCookie
O comando Add Cookie adiciona um único cookie ao armazenamento de cookies associado ao endereço do documento ativo.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).

##### Uso

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>Um objeto JSON representando um cookie. Deve ter pelo menos os campos name e value e pode ter mais, incluindo expiry-time e assim por diante</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
O comando Delete All Cookies permite a exclusão de todos os cookies associados ao endereço do documento ativo.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).

##### Uso

```js
browser.deleteAllCookies()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```




---

## getNamedCookie
O comando Get Named Cookie retorna o cookie com o nome solicitado dos cookies associados no armazenamento de cookies do documento ativo do contexto de navegação atual. Se nenhum cookie for encontrado, um erro de cookie inexistente é retornado.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-named-cookie).

##### Uso

```js
browser.getNamedCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nome do cookie a ser recuperado</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** Um cookie serializado, com campos name e value. Há vários campos opcionais como `path`, `domain` e `expiry-time` que também podem estar presentes.


---

## deleteCookie
O comando Delete Cookie permite que você exclua um único cookie pelo nome do parâmetro, ou todos os cookies associados ao endereço do documento ativo se o nome não for definido.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-delete-cookie).

##### Uso

```js
browser.deleteCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nome do cookie a ser excluído</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```




---

## performActions
O comando Perform Actions é usado para executar ações complexas do usuário. Veja [spec](https://github.com/jlipps/simple-wd-spec#perform-actions) para mais detalhes.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-perform-actions).

##### Uso

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>uma lista de objetos, cada um dos quais representa uma fonte de entrada e suas ações associadas</td>
    </tr>
  </tbody>
</table>



---

## releaseActions
O comando Release Actions é usado para liberar todas as teclas e botões do ponteiro que estão atualmente pressionados. Isso faz com que eventos sejam disparados como se o estado fosse liberado por uma série explícita de ações. Também limpa todo o estado interno dos dispositivos virtuais.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-release-actions).

##### Uso

```js
browser.releaseActions()
```



---

## dismissAlert
O comando Dismiss Alert descarta uma caixa de diálogo simples se presente, caso contrário, erro. Uma solicitação para descartar um prompt de usuário, que pode não necessariamente ter um botão de descarte, tem o mesmo efeito que aceitá-lo.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-dismiss-alert).

##### Uso

```js
browser.dismissAlert()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```




---

## acceptAlert
O comando Accept Alert aceita uma caixa de diálogo simples se presente, caso contrário, erro.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-accept-alert).

##### Uso

```js
browser.acceptAlert()
```



---

## getAlertText
O comando Get Alert Text retorna a mensagem do prompt de usuário atual. Se não houver prompt de usuário atual, ele retorna um erro.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-get-alert-text).

##### Uso

```js
browser.getAlertText()
```

##### Exemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** A mensagem do prompt de usuário.


---

## sendAlertText
O comando Send Alert Text define o campo de texto de um prompt de usuário window.prompt para o valor fornecido.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-send-alert-text).

##### Uso

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>string para definir o prompt</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
O comando Take Screenshot tira uma captura de tela da viewport do contexto de navegação de nível superior.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-take-screenshot).

##### Uso

```js
browser.takeScreenshot()
```


##### Retorna

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Os dados de imagem PNG codificados em base64 que compõem a captura de tela da viewport inicial.


---

## takeElementScreenshot
O comando Take Element Screenshot tira uma captura de tela da região visível abrangida pelo retângulo delimitador de um elemento.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

##### Uso

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>rolar para visualizar o elemento. Padrão: true</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Os dados de imagem PNG codificados em base64 que compõem a captura de tela da região visível do retângulo delimitador de um elemento após ele ter sido rolado para a visualização.


---

## getElementComputedRole
Obter o papel WAI-ARIA computado de um elemento.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#get-computed-role).

##### Uso

```js
browser.getElementComputedRole(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;string&gt;**
            **<code><var>role</var></code>:** O resultado do cálculo do papel WAI-ARIA do elemento.


---

## getElementComputedLabel
Obter o nome acessível do elemento.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/webdriver/#get-computed-label).

##### Uso

```js
browser.getElementComputedLabel(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;string&gt;**
            **<code><var>label</var></code>:** O resultado de um Cálculo de Nome e Descrição Acessível para o Nome Acessível do elemento.


---

## setPermissions
Simula a modificação pelo usuário do estado de permissão de um PermissionDescriptor. __Nota:__ esse recurso ainda não foi implementado em todos os navegadores.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/permissions/#set-permission-command).

##### Uso

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>Cada recurso poderoso tem um ou mais aspectos que os sites podem solicitar permissão para acessar. Para descrever esses aspectos, cada recurso define um subtipo de PermissionDescriptor para ser seu tipo de descritor de permissão. __Nota:__ esse recurso ainda não foi implementado em todos os navegadores.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Determina se a permissão é concedida, negada ou solicitada.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Se deve ou não aplicar permissões a todos os contextos de execução.</td>
    </tr>
  </tbody>
</table>

##### Exemplos


```js
// definir permissões de midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // pode ser também "denied" ou "prompt"
);
```


```js
// definir permissões de clipboard
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// agora você pode ler a área de transferência via, por exemplo
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```



---

## generateTestReport
Gera um relatório para testes. Extensão para [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __Nota:__ esse recurso ainda não foi implementado em todos os navegadores.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/reporting/#automation).

##### Uso

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>Mensagem a ser exibida no relatório.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>Especifica o grupo de endpoint para entregar o relatório.</td>
    </tr>
  </tbody>
</table>



---

## createMockSensor
Cria um sensor simulado para emular sensores como o Sensor de Luz Ambiente. __Nota:__ esse recurso ainda não foi implementado em todos os navegadores.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Uso

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Tipo de API de sensor para simular, por exemplo 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>Um double representando a frequência em Hz que é usado para definir a frequência máxima de amostragem suportada para o sensor simulado associado.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>Um double representando a frequência em Hz que é usado para definir a frequência mínima de amostragem suportada para o sensor simulado associado.</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
Recupera informações sobre um determinado tipo de sensor simulado. __Nota:__ esse recurso ainda não foi implementado em todos os navegadores.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/sensors/#get-mock-sensor-command).

##### Uso

```js
browser.getMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Tipo de sensor simulado para recuperar informações.</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** Valores da leitura do sensor simulado.


---

## updateMockSensor
Atualiza o tipo de sensor simulado. __Nota:__ esse recurso ainda não foi implementado em todos os navegadores.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).

##### Uso

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Tipo de sensor simulado para atualizar informações.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Tipo de API de sensor para simular, por exemplo 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>Um double representando a frequência em Hz que é usado para definir a frequência máxima de amostragem suportada para o sensor simulado associado.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>Um double representando a frequência em Hz que é usado para definir a frequência mínima de amostragem suportada para o sensor simulado associado.</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
O comando Delete Session fecha quaisquer contextos de navegação de nível superior associados à sessão atual, encerra a conexão e finalmente fecha a sessão atual. __Nota:__ esse recurso ainda não foi implementado em todos os navegadores.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/sensors/#delete-mock-sensor-command).

##### Uso

```js
browser.deleteMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Tipo de sensor simulado para excluir.</td>
    </tr>
  </tbody>
</table>



---

## setTimeZone
Simula a mudança de um fuso horário para fins de teste. __Nota:__ esse recurso ainda não foi implementado em todos os navegadores.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Uso

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>Nome do fuso horário, por exemplo Asia/Tokyo</td>
    </tr>
  </tbody>
</table>



---

## addVirtualAuthenticator
Cria um [Autenticador Virtual](https://www.w3.org/TR/webauthn-2/#virtual-authenticators) de software.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator).

##### Uso

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>Valores válidos: 'ctap1/u2f', 'ctap2', 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>Valores válidos: 'usb', 'nfc', 'ble' ou 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Valores válidos: true, false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Valores válidos: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Valores válidos: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Valores válidos: Um array contendo identificadores de extensão.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string[]</td>
      <td>Valores válidos: Até 3 entradas de Método de Verificação de Usuário.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** Retorna o ID de string do autenticador.


---

## removeVirtualAuthenticator
Remove um Autenticador Virtual criado anteriormente.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).

##### Uso

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id do autenticador</td>
    </tr>
  </tbody>
</table>



---

## addCredential
Injeta uma Fonte de Credencial de Chave Pública em um Autenticador Virtual existente.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).

##### Uso

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ID do autenticador</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>O ID da Credencial codificado usando Codificação Base64url.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>Se definido como true, uma credencial detectável do lado do cliente é criada. Se definido como false, uma credencial do lado do servidor é criada em vez disso.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>O ID da Parte Confiável ao qual a credencial está limitada.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>Um pacote de chave assimétrica contendo uma única chave privada por [RFC5958], codificado usando Codificação Base64url.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>O userHandle associado à credencial codificado usando Codificação Base64url. Esta propriedade pode não estar definida.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>O valor inicial para um contador de assinatura associado à fonte de credencial de chave pública.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>O blob grande, por credencial, associado à fonte de credencial de chave pública, codificado usando Codificação Base64url. Esta propriedade pode não estar definida.</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
Retorna um objeto de Parâmetros de Credencial para cada Fonte de Credencial de Chave Pública armazenada em um Autenticador Virtual, independentemente de terem sido armazenadas usando Add Credential ou `navigator.credentials.create()`.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).

##### Uso

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id do autenticador</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** Retorna uma matriz de credenciais.


---

## removeAllCredentials
Remove todas as Fontes de Credencial de Chave Pública armazenadas em um Autenticador Virtual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).

##### Uso

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id do autenticador</td>
    </tr>
  </tbody>
</table>



---

## removeCredential
Remove uma Fonte de Credencial de Chave Pública armazenada em um Autenticador Virtual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).

##### Uso

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id do autenticador</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>id da credencial</td>
    </tr>
  </tbody>
</table>



---

## setUserVerified
O comando de extensão Set User Verified define a propriedade isUserVerified no Autenticador Virtual.<br /><br />Comando do Protocolo WebDriver. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).

##### Uso

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id do autenticador</td>
    </tr>
  </tbody>
</table>


