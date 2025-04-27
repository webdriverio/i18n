---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Uso

```js
driver.getAppiumContext()
```


##### Retorna

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** uma string representando o contexto atual ou null representando 'sem contexto'


---

## switchAppiumContext
Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Uso

```js
driver.switchAppiumContext(name)
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
      <td>string</td>
      <td>uma string representando um contexto disponível</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Uso

```js
driver.getAppiumContexts()
```


##### Retorna

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** um array de strings representando contextos disponíveis, por exemplo 'WEBVIEW', ou 'NATIVE'


---

## shake
Executa uma ação de agitar no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Uso

```js
driver.shake()
```




##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Bloqueia o dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### Uso

```js
driver.lock(seconds)
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
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>por quanto tempo bloquear a tela (apenas iOS)</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
Desbloqueia o dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Uso

```js
driver.unlock()
```




##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Verifica se o dispositivo está bloqueado ou não.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Uso

```js
driver.isLocked()
```


##### Retorna

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** Verdadeiro se o dispositivo estiver bloqueado, falso se não estiver

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Inicia a gravação da tela.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### Uso

```js
driver.startRecordingScreen(options)
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>parâmetros de comando que podem conter chaves como: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (veja mais descrições nos documentos do Appium)</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Para a gravação da tela<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### Uso

```js
driver.stopRecordingScreen(remotePath, username, password, method)
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
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>O caminho para o local remoto, onde o vídeo resultante deve ser enviado. Os seguintes protocolos são suportados http/https, ftp. Esta opção só tem efeito se houver processo de gravação de tela em andamento e o parâmetro forceRestart não estiver definido como true. Valor de string nula ou vazia (configuração padrão) significa que o conteúdo do arquivo resultante deve ser codificado como Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>O nome do usuário para a autenticação remota.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>A senha para a autenticação remota.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>O nome do método de upload multipart http. O 'PUT' é usado por padrão.</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;string&gt;**
            **<code><var>response</var></code>:** String codificada em Base64. Se remote_path estiver definido, a resposta é uma string vazia

##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Retorna os tipos de informação do estado do sistema que são suportados para leitura, como cpu, memória, tráfego de rede e bateria.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Uso

```js
driver.getPerformanceDataTypes()
```


##### Retorna

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** Os tipos de dados de desempenho disponíveis (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Retorna as informações do estado do sistema que são suportadas para leitura, como cpu, memória, tráfego de rede e bateria.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### Uso

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
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
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>o nome do pacote da aplicação</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>o tipo de estado do sistema que deseja ler. Deve ser um dos tipos de dados de desempenho suportados</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>o número de tentativas de leitura</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** O tipo de informação do estado do sistema que é suportado para leitura, como cpu, memória, tráfego de rede e bateria

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Pressiona uma tecla específica no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### Uso

```js
driver.pressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>código da tecla a ser pressionada</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>estado meta para pressionar o código da tecla</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>flags para o pressionamento de tecla</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Pressiona e segura um código de tecla específico no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### Uso

```js
driver.longPressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>código da tecla a ser pressionada no dispositivo</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>metastate para o pressionamento de tecla</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>flags para o pressionamento de tecla</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Envia um código de tecla para o dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Uso

```js
driver.sendKeyEvent(keycode, metastate)
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
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>código da tecla a ser pressionada</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>estado meta para pressionar o código da tecla</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Gira o dispositivo em três dimensões.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### Uso

```js
driver.rotateDevice(x, y, z)
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
      <td>number</td>
      <td>offset x a ser usado para o centro do gesto de rotação</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>offset y a ser usado para o centro do gesto de rotação</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>offset z a ser usado para o centro do gesto de rotação</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Obtém o nome da atividade atual do Android.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Uso

```js
driver.getCurrentActivity()
```


##### Retorna

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Nome da atividade atual

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Obtém o nome do pacote atual do Android.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Uso

```js
driver.getCurrentPackage()
```


##### Retorna

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Nome do pacote atual

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Instala o aplicativo fornecido no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### Uso

```js
driver.installApp(appPath)
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
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>caminho para o arquivo .apk da aplicação</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Ativa o aplicativo fornecido no dispositivo<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### Uso

```js
driver.activateApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID do aplicativo (ID do pacote para Android, ID do pacote para iOS)</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Remove um aplicativo do dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### Uso

```js
driver.removeApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID do aplicativo (ID do pacote para Android, ID do pacote para iOS)</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Encerra o aplicativo fornecido no dispositivo<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### Uso

```js
driver.terminateApp(appId, options)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID do aplicativo (ID do pacote para Android, ID do pacote para iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>Opções de comando. Por exemplo, "timeout": (Apenas Android) Tempo limite para tentar encerrar o aplicativo novamente (veja mais nos documentos do Appium)</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Verifica se o aplicativo especificado está instalado no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### Uso

```js
driver.isAppInstalled(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID do aplicativo (ID do pacote para Android, ID do pacote para iOS)</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Retorna verdadeiro se instalado, falso se não

##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Obtém o status do aplicativo fornecido no dispositivo<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### Uso

```js
driver.queryAppState(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID do aplicativo (ID do pacote para Android, ID do pacote para iOS)</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 não está instalado. 1 não está em execução. 2 está em execução em segundo plano ou suspenso. 3 está em execução em segundo plano. 4 está em execução em primeiro plano

##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Oculta o teclado virtual.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### Uso

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
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
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>estratégia para ocultar o teclado (apenas UIAutomation), estratégias disponíveis - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>valor da tecla se a estratégia for 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>código da tecla se a estratégia for 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>nome da tecla se a estratégia for 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Verifica se o teclado virtual está visível ou não.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Uso

```js
driver.isKeyboardShown()
```


##### Retorna

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** Verdadeiro se o teclado estiver visível

##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Coloca um arquivo no dispositivo em um local específico.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### Uso

```js
driver.pushFile(path, data)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>caminho para instalar os dados</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>conteúdo do arquivo em base64</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Recupera um arquivo do sistema de arquivos do dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### Uso

```js
driver.pullFile(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>caminho no dispositivo para extrair o arquivo</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Conteúdo do arquivo em base64

##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Recupera uma pasta do sistema de arquivos do dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### Uso

```js
driver.pullFolder(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>caminho para uma pasta inteira no dispositivo</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Ativa/desativa o modo avião no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Uso

```js
driver.toggleAirplaneMode()
```




##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Muda o estado do serviço de dados.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Uso

```js
driver.toggleData()
```




##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Muda o estado do serviço de wifi.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Uso

```js
driver.toggleWiFi()
```




##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Muda o estado do serviço de localização.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Uso

```js
driver.toggleLocationServices()
```




##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Define a velocidade da rede (apenas Emulador)<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### Uso

```js
driver.toggleNetworkSpeed(netspeed)
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
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Tipo de rede - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Abre as notificações do Android (apenas Emulador).<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Uso

```js
driver.openNotifications()
```




##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Inicia uma atividade do Android fornecendo o nome do pacote e o nome da atividade.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### Uso

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
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
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>nome do aplicativo</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>nome da atividade</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>nome do aplicativo a aguardar</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>nome da atividade a aguardar</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>ação de intent que será usada para iniciar a atividade</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>categoria de intent que será usada para iniciar a atividade</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>flags que serão usados para iniciar a atividade</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>argumentos adicionais de intent que serão usados para iniciar a atividade</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>não para o processo do aplicativo em teste, antes de iniciar o aplicativo usando adb</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Recupera informações de visibilidade e limites das barras de status e navegação.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Uso

```js
driver.getSystemBars()
```


##### Retorna

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Informações sobre visibilidade e limites das barras de status e navegação

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Obtém a hora no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Uso

```js
driver.getDeviceTime()
```


##### Retorna

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Hora no dispositivo

##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Obtém a densidade de exibição do dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Uso

```js
driver.getDisplayDensity()
```


##### Retorna

- **&lt;*&gt;**


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Simula um evento de [touch id](https://support.apple.com/en-ca/ht201371) (apenas Simulador iOS). Para habilitar este recurso, a capacidade desejada `allowTouchIdEnroll` deve ser definida como true e o Simulador deve estar [registrado](https://support.apple.com/en-ca/ht201371). Quando você define allowTouchIdEnroll como true, ele configurará o Simulador para ser registrado por padrão. O estado de registro pode ser [alternado](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). Esta chamada só funcionará se o processo Appium ou seu aplicativo pai (por exemplo, Terminal.app ou Appium.app) tiver acesso à acessibilidade do Mac OS na lista Preferências do Sistema > Segurança e Privacidade > Privacidade > Acessibilidade.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### Uso

```js
driver.touchId(match)
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
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>estamos simulando um toque bem-sucedido (true) ou um toque com falha (false)</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Alterna o simulador sendo [registrado](https://support.apple.com/en-ca/ht201371) para aceitar touchId (apenas Simulador iOS). Para habilitar este recurso, a capacidade desejada `allowTouchIdEnroll` deve ser definida como true. Quando `allowTouchIdEnroll` é definido como true, o Simulador será registrado por padrão, e o 'Toggle Touch ID Enrollment' muda o estado de registro. Esta chamada só funcionará se o processo Appium ou seu aplicativo pai (por exemplo, Terminal.app ou Appium.app) tiver acesso à acessibilidade do Mac OS na lista Preferências do Sistema > Segurança e Privacidade > Privacidade > Acessibilidade.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### Uso

```js
driver.toggleEnrollTouchId(enabled)
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
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>igual a true se o registro TouchID deve ser habilitado</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Inicia um aplicativo no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Este comando de protocolo está obsoleto<br />Para iOS, utilize `driver.execute('mobile: launchApp', { ... })`, e para Android, utilize `driver.execute('mobile: activateApp', { ... })`.
:::

##### Uso

```js
driver.launchApp()
```




##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Fecha um aplicativo no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Este comando de protocolo está obsoleto<br />Use `driver.execute('mobile: terminateApp', { ... })` em vez disso
:::

##### Uso

```js
driver.closeApp()
```




##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Envia o aplicativo em execução atual para esta sessão para o segundo plano.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

Este comando de protocolo está obsoleto<br />Use `driver.execute('mobile: backgroundApp', { ... })` em vez disso
:::

##### Uso

```js
driver.background(seconds)
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
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>tempo limite para restaurar o aplicativo, se 'null' o aplicativo não será restaurado</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Obtém dados de cobertura de teste.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### Uso

```js
driver.endCoverage(intent, path)
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
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>intent para transmitir</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>caminho para o arquivo .ec</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Obtém as strings do aplicativo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### Uso

```js
driver.getStrings(language, stringFile)
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
      <td><code><var>language</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>código de idioma</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>caminho para o arquivo de strings</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** todas as Strings definidas de um aplicativo para o idioma especificado e nome de arquivo de strings

##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Uso

```js
driver.setValueImmediate(elementId, text)
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
      <td>texto para definir em um elemento</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Substitui o valor do elemento diretamente.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Uso

```js
driver.replaceValue(elementId, value)
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
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>valor para substituir no elemento</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Recupera as configurações atuais no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Uso

```js
driver.getSettings()
```


##### Retorna

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** Hash JSON de todas as configurações atualmente especificadas, veja a API de Configurações

##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Atualiza a configuração atual no dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### Uso

```js
driver.updateSettings(settings)
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
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>objeto chave/valor com configurações para atualizar</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
URL de retorno de chamada para execução assíncrona de JavaScript.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Uso

```js
driver.receiveAsyncResponse(response)
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
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>resposta para receber no dispositivo</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Faz chamada GSM (apenas Emulador).<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### Uso

```js
driver.gsmCall(phoneNumber, action)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>o número de telefone para chamar</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>A ação - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Define a força do sinal GSM (apenas Emulador).<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### Uso

```js
driver.gsmSignal(signalStrength, signalStrengh)
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
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>força do sinal no intervalo [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>força do sinal no intervalo [0, 4]. Por favor, defina também este parâmetro com o mesmo valor se você usar o Appium v1.11.0 ou inferior (veja https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Define a porcentagem da bateria (apenas Emulador).<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### Uso

```js
driver.powerCapacity(percent)
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
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>valor percentual no intervalo [0, 100]</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Define o estado do carregador de bateria como conectado ou não (apenas Emulador).<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### Uso

```js
driver.powerAC(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>define o estado. on ou off</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Define o estado da voz GSM (apenas Emulador).<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### Uso

```js
driver.gsmVoice(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>estado da voz GSM - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Simula uma mensagem SMS (apenas Emulador).<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### Uso

```js
driver.sendSms(phoneNumber, message)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>o número de telefone para enviar o SMS</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>a mensagem SMS</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Autentica usuários usando suas digitais em emuladores compatíveis.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### Uso

```js
driver.fingerPrint(fingerprintId)
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
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>impressões digitais armazenadas no sistema Android Keystore (de 1 a 10)</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Define o conteúdo da área de transferência do sistema<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### Uso

```js
driver.setClipboard(content, contentType, label)
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
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>O conteúdo da área de transferência codificado em base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>O tipo de conteúdo a ser obtido. Plaintext, Image, URL. Android suporta apenas plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>Rótulo de dados da área de transferência para Android</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Resposta do servidor Appium

##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Obtém o conteúdo da área de transferência do sistema<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### Uso

```js
driver.getClipboard(contentType)
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
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>O tipo de conteúdo a ser obtido. Plaintext, Image, URL. Android suporta apenas plaintext</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Conteúdo da área de transferência como string codificada em base64 ou uma string vazia se a área de transferência estiver vazia

##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
Esta funcionalidade está disponível apenas dentro de um contexto nativo. 'Touch Perform' funciona de forma semelhante às outras interações de toque singular, exceto que isso permite que você encadeie mais de uma ação de toque como um comando. Isso é útil porque os comandos Appium são enviados pela rede e há latência entre os comandos. Esta latência pode tornar certas interações de toque impossíveis porque algumas interações precisam ser realizadas em uma sequência. Vertical, por exemplo, requer pressionar, mover para uma coordenada y diferente e depois soltar. Para funcionar, não pode haver um atraso entre as interações.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### Uso

```js
driver.touchPerform(actions)
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
      <td>O tipo de ação a ser executada (por exemplo, moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Exemplo


```js
// do a horizontal swipe by percentage
const startPercentage = 10;
const endPercentage = 90;
const anchorPercentage = 50;

const { width, height } = driver.getWindowSize();
const anchor = height * anchorPercentage / 100;
const startPoint = width * startPercentage / 100;
const endPoint = width * endPercentage / 100;
driver.touchPerform([
  {
    action: 'press',
    options: {
      x: startPoint,
      y: anchor,
    },
  },
  {
    action: 'wait',
    options: {
      ms: 100,
    },
  },
  {
    action: 'moveTo',
    options: {
      x: endPoint,
      y: anchor,
    },
  },
  {
    action: 'release',
    options: {},
  },
]);
```


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
Esta funcionalidade está disponível apenas dentro de um contexto nativo. Executa uma sequência de ação multi-toque.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### Uso

```js
driver.multiTouchPerform(actions)
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
      <td>O tipo de ação a ser executada (por exemplo, moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
Este comando permite que você especifique um script WebdriverIO como uma string e o transmita para o servidor Appium para execução local no próprio servidor. Esta abordagem ajuda a minimizar a latência potencial associada a cada comando. ***Para utilizar este comando com o Appium 2.0, você deve ter o plugin [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) instalado.***<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### Uso

```js
driver.executeDriverScript(script, type, timeout)
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
      <td>O script a ser executado. Ele tem acesso a um objeto 'driver' que representa uma sessão WebdriverIO anexada ao servidor atual.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>A linguagem/framework usado no script. Atualmente, apenas 'webdriverio' é suportado e é o padrão.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>O número de milissegundos que o script deve ser permitido para executar antes de ser encerrado pelo servidor Appium. O padrão é o equivalente a 1 hora.</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Um objeto contendo dois campos: 'result', que é o valor de retorno do próprio script, e 'logs', que contém 3 campos internos, 'log', 'warn' e 'error', que contêm um array de strings registradas por console.log, console.warn e console.error na execução do script.


---

## getEvents
Obtém eventos armazenados no servidor appium.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### Uso

```js
driver.getEvents(type)
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
      <td>string[]</td>
      <td>Obtém eventos filtrados pelo tipo se o tipo for fornecido.</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Um hash JSON de eventos como `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Armazena um evento personalizado.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### Uso

```js
driver.logEvent(vendor, event)
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
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>O nome do fornecedor. Será `vendor` em `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>O nome do evento. Será `event` em `vendor:event`.</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
Este recurso conduz comparações de imagens utilizando as capacidades do framework OpenCV. Por favor, note que para que essa funcionalidade funcione, tanto o framework OpenCV quanto o módulo opencv4nodejs devem estar instalados na máquina onde o servidor Appium está operacional. ***Além disso, você precisará ter o plugin [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) instalado para usar esse recurso com o Appium 2.0.***<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### Uso

```js
driver.compareImages(mode, firstImage, secondImage, options)
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
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>Um dos modos de comparação possíveis: 'matchFeatures', 'getSimilarity', 'matchTemplate'. 'matchFeatures' é o padrão.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>Dados de imagem. Todos os formatos de imagem que a própria biblioteca OpenCV aceita são suportados.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>Dados de imagem. Todos os formatos de imagem que a própria biblioteca OpenCV aceita são suportados.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>O conteúdo deste dicionário depende do valor real de `mode`. Veja a documentação no módulo `appium-support` para mais detalhes. </td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;object&gt;**
            **<code><var>result</var></code>:** O conteúdo do dicionário resultante depende dos valores reais de `mode` e `options`. Veja a documentação no módulo `appium-support` para mais detalhes.


---

## implicitWait
Define o tempo que o driver deve esperar ao procurar elementos. Ao procurar um único elemento, o driver deve sondar a página até que um elemento seja encontrado ou o tempo limite expire, o que ocorrer primeiro. Ao procurar vários elementos, o driver deve sondar a página até que pelo menos um elemento seja encontrado ou o tempo limite expire, momento em que deve retornar uma lista vazia. Se este comando nunca for enviado, o driver deve usar como padrão uma espera implícita de 0ms.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.implicitWait(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>O tempo, em milissegundos, para esperar por um elemento.</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Determina a localização de um elemento na tela depois de ter sido rolado para a visualização.<br /><br />__Nota:__ Isso é considerado um comando interno e deve ser usado apenas para determinar a localização de um elemento para gerar corretamente eventos nativos.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.getLocationInView(elementId)
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
      <td>ID do elemento para o qual direcionar o comando</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** As coordenadas X e Y do elemento na página.

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Envia uma sequência de pressionamentos de teclas para o elemento ativo<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.sendKeys(value)
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
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>A sequência de teclas a digitar. Um array deve ser fornecido.</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
Lista todos os mecanismos disponíveis na máquina. Para usar um mecanismo, ele deve estar presente nesta lista.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.availableIMEEngines()
```


##### Retorna

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** Uma lista de mecanismos disponíveis

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Obtém o nome do mecanismo IME ativo. A string do nome é específica da plataforma.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.getActiveIMEEngine()
```


##### Retorna

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** O nome do mecanismo IME ativo

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Indica se a entrada IME está ativa no momento<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.isIMEActivated()
```


##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** Verdadeiro se a entrada IME estiver disponível e atualmente ativa, falso caso contrário

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
Desativa o mecanismo IME atualmente ativo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.deactivateIMEEngine()
```




##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Ativa um mecanismo que está disponível<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.activateIMEEngine(engine)
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
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>nome do mecanismo a ser ativado</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Define o tempo, em milissegundos, que scripts assíncronos executados por `/session/:sessionId/execute_async` são permitidos a executar antes de serem abortados e um erro `Timeout` é retornado ao cliente.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.asyncScriptTimeout(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>O tempo, em milissegundos, que comandos com limite de tempo são permitidos a executar</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Envia um elemento de formulário.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.submit(elementId)
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
      <td>ID do elemento de formulário a ser enviado</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Determina o tamanho de um elemento em pixels. O tamanho será retornado como um objeto JSON com propriedades `width` e `height`.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.getElementSize(elementId)
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
      <td>ID do elemento para o qual direcionar o comando</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** A largura e altura do elemento, em pixels.

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Determina a localização de um elemento na página. O ponto `(0, 0)` refere-se ao canto superior esquerdo da página. As coordenadas do elemento são retornadas como um objeto JSON com propriedades `x` e `y`.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.getElementLocation(elementId)
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
      <td>ID do elemento para o qual direcionar o comando</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** As coordenadas X e Y do elemento na página.

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Toque único no dispositivo habilitado para toque.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.touchClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID do elemento para tocar uma vez.</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Dedo para baixo na tela.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.touchDown(x, y)
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
      <td>number</td>
      <td>coordenada x na tela</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordenada y na tela</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Dedo para cima na tela.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.touchUp(x, y)
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
      <td>number</td>
      <td>coordenada x na tela</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordenada y na tela</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Movimento do dedo na tela.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.touchMove(x, y)
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
      <td>number</td>
      <td>coordenada x na tela</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordenada y na tela</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Pressionar longamente na tela sensível ao toque usando eventos de movimento do dedo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.touchLongClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID do elemento para pressionar longamente</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Movimento rápido na tela sensível ao toque usando eventos de movimento do dedo. Este comando de movimento rápido começa em um local específico da tela.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
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
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>o deslocamento x em pixels para mover rapidamente</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>o deslocamento y em pixels para mover rapidamente</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>ID do elemento onde o movimento rápido começa</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>a velocidade em pixels por segundos</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>a velocidade x em pixels por segundo</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>a velocidade y em pixels por segundo</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Obtém a orientação atual do dispositivo.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.getOrientation()
```


##### Retorna

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** A orientação atual correspondente a um valor definido em ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Define a orientação do dispositivo<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.setOrientation(orientation)
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
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>a nova orientação do navegador conforme definido em ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Obtém o log para um determinado tipo de log. O buffer de log é redefinido após cada solicitação.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.getLogs(type)
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
      <td>o tipo de log</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** A lista de entradas de log.

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Obtém os tipos de log disponíveis.<br /><br />Comando Appium. Mais detalhes podem ser encontrados nos [documentos oficiais do protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Uso

```js
driver.getLogTypes()
```


##### Retorna

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** A lista de tipos de log disponíveis.

##### Suporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
