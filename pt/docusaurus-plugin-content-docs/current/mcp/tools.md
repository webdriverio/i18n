---
id: tools
title: Ferramentas
description: "Consulte as ferramentas expostas pelo servidor MCP do WebdriverIO para sessões, navegação, interação com elementos, capturas de tela, gestos e ciclo de vida do app."
---

O servidor MCP do WebdriverIO expõe 29 ferramentas organizadas por função. Ferramentas marcadas como **apenas navegador** exigem uma sessão com `platform: "browser"`. Ferramentas marcadas como **apenas mobile** exigem `platform: "ios"` ou `platform: "android"`.

## Gerenciamento de Sessão

### `start_session`

Inicia uma nova sessão de automação de navegador ou mobile. Apenas uma sessão ativa por vez; iniciar uma nova encerra a existente.

| Parâmetro              | Tipo                                                                   | Obrigatório     | Padrão           | Descrição                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------- | --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `platform`             | `"browser" \| "ios" \| "android"`                                      | ✓               | —                | Plataforma da sessão                                                                                                                       |
| `provider`             | `"local" \| "browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | —               | `"local"`        | Provedor da sessão                                                                                                                         |
| `browser`              | `"chrome" \| "firefox" \| "edge" \| "safari"`                          | apenas navegador | —               | Navegador a ser iniciado                                                                                                                   |
| `browserVersion`       | string                                                                 | —               | latest           | Versão do navegador (apenas provedores em nuvem, padrão: latest)                                                                           |
| `os`                   | string                                                                 | —               | —                | Sistema operacional (apenas provedores em nuvem, ex.: `"Windows"`, `"OS X"`)                                                               |
| `osVersion`            | string                                                                 | —               | —                | Versão do SO (apenas provedores em nuvem, ex.: `"11"`, `"Sequoia"`)                                                                        |
| `headless`             | boolean                                                                | —               | `true`           | Executar o navegador em modo headless                                                                                                      |
| `windowWidth`          | number                                                                 | —               | `1920`           | Largura da janela do navegador (400–3840)                                                                                                  |
| `windowHeight`         | number                                                                 | —               | `1080`           | Altura da janela do navegador (400–2160)                                                                                                   |
| `navigationUrl`        | string                                                                 | —               | —                | URL para navegar após a inicialização                                                                                                      |
| `deviceName`           | string                                                                 | apenas mobile   | —                | Nome do dispositivo/emulador/simulador                                                                                                     |
| `platformVersion`      | string                                                                 | —               | —                | Versão do SO (ex.: `"17.0"`, `"14"`)                                                                                                       |
| `appPath`              | string                                                                 | —               | —                | Caminho para `.app` / `.apk` / `.ipa`                                                                                                      |
| `app`                  | string                                                                 | —               | —                | URL do app (`bs://...` para BrowserStack, `storage:filename=` para Sauce Labs, `lt://...` para TestMu, app_url do TestingBot) ou custom_id |
| `automationName`       | `"XCUITest" \| "UiAutomator2"`                                         | —               | auto             | Driver de automação                                                                                                                        |
| `autoGrantPermissions` | boolean                                                                | —               | `true`           | Conceder automaticamente as permissões do app                                                                                              |
| `autoAcceptAlerts`     | boolean                                                                | —               | `true`           | Aceitar alertas automaticamente                                                                                                            |
| `autoDismissAlerts`    | boolean                                                                | —               | `false`          | Dispensar alertas automaticamente                                                                                                          |
| `appWaitActivity`      | string                                                                 | —               | —                | Activity do Android a aguardar na inicialização                                                                                            |
| `udid`                 | string                                                                 | —               | —                | UDID do dispositivo iOS real                                                                                                               |
| `noReset`              | boolean                                                                | —               | —                | Preservar os dados do app entre sessões                                                                                                    |
| `fullReset`            | boolean                                                                | —               | —                | Desinstalar o app antes/depois da sessão                                                                                                   |
| `newCommandTimeout`    | number                                                                 | —               | `300`            | Timeout de comando do Appium (segundos)                                                                                                    |
| `attach`               | boolean                                                                | —               | `false`          | Conectar a um Chrome existente via CDP                                                                                                     |
| `attachConfig`         | object                                                                 | —               | —                | Conexão CDP: `{ port: 9222, host: "localhost" }`                                                                                           |
| `appiumConfig`         | object                                                                 | —               | —                | Servidor Appium: `{ host, port, path }`                                                                                                    |
| `tunnel`               | `boolean \| "external"`                                                | —               | `false`          | Roteamento por túnel local (provedores em nuvem). `true` = início automático, `"external"` = túnel já em execução externamente             |
| `reporting`            | object                                                                 | —               | —                | Rótulos de relatório do provedor em nuvem: `{ project, build, session }`                                                                   |
| `trace`                | boolean                                                                | —               | `false`          | Ativar gravação de trace — produz um zip `.trace` compatível com o Playwright                                                              |
| `region`               | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`                  | —               | `"eu-central-1"` | Região do data center da Sauce Labs                                                                                                        |
| `tunnelName`           | string                                                                 | —               | —                | Nome identificador do túnel (obrigatório para `tunnel: "external"`)                                                                        |
| `capabilities`         | object                                                                 | —               | —                | Capabilities brutas adicionais a serem mescladas                                                                                           |

```js
// Navegador Chrome local
start_session({ platform: "browser", browser: "chrome" })

// Simulador iOS
start_session({ platform: "ios", deviceName: "iPhone 16", platformVersion: "18.0", appPath: "/path/to/app.app" })

// Android no BrowserStack
start_session({ platform: "android", provider: "browserstack", deviceName: "Samsung Galaxy S24", app: "bs://abc123" })

// iOS na Sauce Labs
start_session({ platform: "ios", provider: "saucelabs", deviceName: "iPhone 15", platformVersion: "17.0", app: "storage:filename=MyApp.ipa" })

// Navegador no TestMu
start_session({ platform: "browser", provider: "testmu", browser: "chrome", os: "Windows", osVersion: "11" })

// Navegador no TestingBot
start_session({ platform: "browser", provider: "testingbot", browser: "chrome", os: "Windows", osVersion: "11" })

// Provedor em nuvem com túnel
start_session({ platform: "browser", provider: "browserstack", browser: "chrome", tunnel: true })

// Conectar a um Chrome existente (após launch_chrome)
start_session({ platform: "browser", browser: "chrome", attach: true })
```

---

### `close_session`

Encerra ou desconecta-se da sessão atual.

| Parâmetro | Tipo    | Obrigatório | Padrão  | Descrição                                                         |
| --------- | ------- | ----------- | ------- | ----------------------------------------------------------------- |
| `detach`  | boolean | —           | `false` | Desconectar sem encerrar (preserva o estado do app no Appium)     |

Sessões iniciadas com `noReset: true` são desconectadas automaticamente por padrão.

---

### `launch_chrome`

Prepara uma instância do Chrome com depuração remota habilitada para que `start_session({ attach: true })` possa se conectar. Dois modos:

- `newInstance` (padrão): abre o Chrome junto ao seu Chrome existente usando um diretório de perfil separado; sua sessão atual não é afetada.
- `freshSession`: inicia o Chrome com um perfil vazio (sem cookies, sem logins). Use `copyProfileFiles: true` para levar cookies e logins.

| Parâmetro          | Tipo                              | Obrigatório | Padrão          | Descrição                                                                 |
| ------------------ | --------------------------------- | ----------- | --------------- | ------------------------------------------------------------------------- |
| `port`             | number                            | —           | `9222`          | Porta de depuração remota                                                 |
| `mode`             | `"newInstance" \| "freshSession"` | —           | `"newInstance"` | Modo de inicialização                                                     |
| `copyProfileFiles` | boolean                           | —           | `false`         | Copiar o perfil Default do Chrome (cookies, logins) para a sessão de debug |

Depois que esta ferramenta for bem-sucedida, chame `start_session({ platform: "browser", browser: "chrome", attach: true })`.

## Navegação e Abas

### `navigate`

Carrega uma URL na aba atual e aguarda o evento de carregamento da página. Redefine o estado da página (DOM, runtime JS). **Apenas navegador.**

| Parâmetro | Tipo   | Obrigatório | Descrição               |
| --------- | ------ | ----------- | ----------------------- |
| `url`     | string | ✓           | URL para onde navegar   |

---

### `get_tabs`

Lista todas as abas do navegador com handle, título, URL e qual está ativa. Use antes de `switch_tab` para encontrar o handle de destino. **Apenas navegador.**

Sem parâmetros.

---

### `switch_tab`

Foca uma aba do navegador pelo window handle ou pelo índice (começando em 0). Todas as chamadas de ferramentas subsequentes operam na nova aba ativa. **Apenas navegador.**

| Parâmetro | Tipo   | Obrigatório | Descrição                          |
| --------- | ------ | ----------- | ---------------------------------- |
| `handle`  | string | —           | Window handle para o qual alternar |
| `index`   | number | —           | Índice da aba começando em 0 (≥ 0) |

Forneça `handle` ou `index`. Obtenha os handles com `get_tabs` ou `wdio://session/current/tabs`.

---

### `switch_frame`

Alterna o contexto de frame do WebDriver para um iframe por seletor CSS/XPath, ou de volta ao nível superior se o seletor for omitido. As alterações persistem; todas as chamadas subsequentes de `click_element`, `set_value` e `get_elements` operam dentro do frame selecionado até que você volte. Aguarda até 5s pelo iframe. **Apenas navegador.**

| Parâmetro  | Tipo   | Obrigatório | Descrição                                                                                    |
| ---------- | ------ | ----------- | -------------------------------------------------------------------------------------------- |
| `selector` | string | —           | Seletor CSS/XPath do elemento iframe. Omita para voltar ao frame de nível superior.          |

```js
// Alternar para um iframe
switch_frame({ selector: "#my-iframe" })

// Interagir com elementos dentro do iframe
click_element({ selector: "button.submit" })

// Voltar ao nível superior
switch_frame()
```

## Interação com Elementos

### `click_element`

Aguarda um elemento existir, rola até ele ficar visível e clica nele. Funciona em navegador e mobile. No iOS, prefira `tap_element`; `click_element` às vezes é ignorado pela camada nativa.

| Parâmetro      | Tipo    | Obrigatório | Padrão | Descrição                                       |
| -------------- | ------- | ----------- | ------ | ----------------------------------------------- |
| `selector`     | string  | ✓           | —      | Seletor CSS, XPath ou de texto                  |
| `scrollToView` | boolean | —           | `true` | Rolar o elemento até ficar visível antes de clicar |
| `timeout`      | number  | —           | —      | Tempo máximo de espera (ms)                     |

---

### `set_value`

Limpa um input ou textarea e digita o texto informado. Sempre substitui o conteúdo existente.

| Parâmetro      | Tipo    | Obrigatório | Padrão | Descrição                                          |
| -------------- | ------- | ----------- | ------ | -------------------------------------------------- |
| `selector`     | string  | ✓           | —      | Seletor CSS, XPath ou de texto                     |
| `value`        | string  | ✓           | —      | Texto a digitar                                    |
| `scrollToView` | boolean | —           | `true` | Rolar o elemento até ficar visível antes de digitar |
| `timeout`      | number  | —           | —      | Tempo máximo de espera (ms)                        |

---

### `scroll`

Rola a página por um número de pixels. **Apenas navegador.** Para mobile, use `swipe`.

| Parâmetro   | Tipo             | Obrigatório | Padrão | Descrição           |
| ----------- | ---------------- | ----------- | ------ | ------------------- |
| `direction` | `"up" \| "down"` | ✓           | —      | Direção da rolagem  |
| `pixels`    | number           | —           | `500`  | Pixels a rolar      |

## Análise de Elementos

### `get_elements`

Retorna os elementos interagíveis da página atual com seletores prontos para uso. Prefira o recurso `wdio://session/current/elements` para percepção contínua do contexto; use esta ferramenta quando precisar de filtragem ou paginação.

| Parâmetro           | Tipo    | Obrigatório | Padrão  | Descrição                                          |
| ------------------- | ------- | ----------- | ------- | -------------------------------------------------- |
| `inViewportOnly`    | boolean | —           | `false` | Retornar apenas elementos visíveis no viewport     |
| `includeContainers` | boolean | —           | `false` | Incluir elementos contêineres (divs, sections)     |
| `includeBounds`     | boolean | —           | `false` | Incluir coordenadas da bounding box                |
| `limit`             | number  | —           | `0`     | Máximo de elementos a retornar (0 = ilimitado)     |
| `offset`            | number  | —           | `0`     | Elementos a pular (paginação)                      |

---

### `get_accessibility_tree`

Retorna a árvore de acessibilidade da página com roles, nomes e seletores. Suporta filtragem e paginação. **Apenas navegador.**

| Parâmetro | Tipo     | Obrigatório | Padrão | Descrição                                                        |
| --------- | -------- | ----------- | ------ | ---------------------------------------------------------------- |
| `limit`   | number   | —           | `0`    | Máximo de nós a retornar (0 = ilimitado)                         |
| `offset`  | number   | —           | `0`    | Nós a pular (paginação)                                          |
| `roles`   | string[] | —           | —      | Filtrar por roles ARIA, ex.: `["button", "link", "heading"]`     |

## Capturas de Tela

### `get_screenshot`

Faz uma captura de tela da página ou tela atual. Retorna uma imagem codificada em base64, redimensionada e comprimida automaticamente para ficar dentro dos limites de contexto do modelo (máx. 1 MB, máx. 2000px).

Sem parâmetros. Prefira `wdio://session/current/elements` em vez de capturas de tela para descoberta de elementos; é mais rápido e usa muito menos tokens. Use capturas de tela para verificação visual ou depuração de layout.

## Gerenciamento de Cookies

### `get_cookies`

Retorna todos os cookies da sessão atual, ou um único cookie pelo nome. **Apenas navegador.**

| Parâmetro | Tipo   | Obrigatório | Descrição                                          |
| --------- | ------ | ----------- | -------------------------------------------------- |
| `name`    | string | —           | Nome do cookie. Omita para retornar todos os cookies. |

---

### `set_cookie`

Define um cookie no navegador. O navegador já deve estar no domínio de destino — cookies não podem ser definidos entre domínios. Use para injetar tokens de sessão ou feature flags sem passar por fluxos de login. **Apenas navegador.**

| Parâmetro  | Tipo                          | Obrigatório | Descrição                                        |
| ---------- | ----------------------------- | ----------- | ------------------------------------------------ |
| `name`     | string                        | ✓           | Nome do cookie                                   |
| `value`    | string                        | ✓           | Valor do cookie                                  |
| `domain`   | string                        | —           | Domínio do cookie (padrão: domínio atual)        |
| `path`     | string                        | —           | Caminho do cookie (padrão: `/`)                  |
| `expiry`   | number                        | —           | Expiração como timestamp Unix (segundos)         |
| `httpOnly` | boolean                       | —           | Flag HttpOnly                                    |
| `secure`   | boolean                       | —           | Flag Secure                                      |
| `sameSite` | `"strict" \| "lax" \| "none"` | —           | Atributo SameSite                                |

---

### `delete_cookies`

Exclui todos os cookies ou um cookie específico pelo nome. **Apenas navegador.**

| Parâmetro | Tipo   | Obrigatório | Descrição                                                      |
| --------- | ------ | ----------- | -------------------------------------------------------------- |
| `name`    | string | —           | Nome do cookie a excluir. Omita para excluir todos os cookies. |

## Gestos de Toque (Mobile)

### `tap_element`

Chama `element.tap()` em um elemento correspondente ou toca em coordenadas absolutas da tela. Use no iOS quando `click_element` for ignorado; o toque é o gesto nativo ao qual o iOS responde. **Apenas mobile.**

| Parâmetro  | Tipo   | Obrigatório | Descrição                                              |
| ---------- | ------ | ----------- | ------------------------------------------------------ |
| `selector` | string | —           | Seletor do elemento                                    |
| `x`        | number | —           | Coordenada X para toque na tela (se não houver seletor) |
| `y`        | number | —           | Coordenada Y para toque na tela (se não houver seletor) |

Forneça `selector` ou as coordenadas `x`/`y`.

---

### `swipe`

Executa um gesto de deslizar em tela cheia. A direção é a direção de movimento do conteúdo (ex.: `"up"` rola uma lista para cima). Use para rolar além dos limites visíveis. Para mover um elemento específico, use `drag_and_drop`. **Apenas mobile.** Para navegadores, use `scroll`.

| Parâmetro   | Tipo                                  | Obrigatório | Padrão         | Descrição                                  |
| ----------- | ------------------------------------- | ----------- | -------------- | ------------------------------------------ |
| `direction` | `"up" \| "down" \| "left" \| "right"` | ✓           | —              | Direção do deslize                         |
| `duration`  | number                                | —           | `500`          | Duração do deslize (ms, 100–5000)          |
| `percent`   | number                                | —           | `0.5` / `0.95` | Fração da tela a deslizar (0–1)            |

---

### `drag_and_drop`

Arrasta um elemento até outro elemento ou coordenadas. **Apenas mobile.**

| Parâmetro        | Tipo   | Obrigatório | Padrão | Descrição                                         |
| ---------------- | ------ | ----------- | ------ | ------------------------------------------------- |
| `sourceSelector` | string | ✓           | —      | Elemento de origem a arrastar                     |
| `targetSelector` | string | —           | —      | Elemento de destino onde soltar                   |
| `x`              | number | —           | —      | Deslocamento X de destino (se não houver targetSelector) |
| `y`              | number | —           | —      | Deslocamento Y de destino (se não houver targetSelector) |
| `duration`       | number | —           | —      | Duração do arraste (ms, 100–5000)                 |

## Alternância de Contexto (Mobile)

### `get_contexts`

Retorna os contextos de automação disponíveis e o que está ativo no momento. Use antes de `switch_context` para descobrir os alvos `NATIVE_APP` e `WEBVIEW_*`. **Apenas mobile.**

Sem parâmetros.

---

### `switch_context`

Alterna entre os contextos de automação nativo e webview em um app mobile híbrido. Necessário antes de usar seletores CSS/XPath dentro de uma webview incorporada. **Apenas mobile.**

| Parâmetro | Tipo   | Obrigatório | Descrição                                                          |
| --------- | ------ | ----------- | ------------------------------------------------------------------ |
| `context` | string | ✓           | Nome do contexto, ex.: `"NATIVE_APP"`, `"WEBVIEW_com.example.app"` |

Obtenha os nomes de contexto disponíveis com `get_contexts` ou `wdio://session/current/contexts`.

```js
// 1. Verificar o que está disponível
get_contexts()
// → { contexts: ["NATIVE_APP", "WEBVIEW_com.example.app"], currentContext: "NATIVE_APP" }

// 2. Alternar para a webview para usar CSS/XPath
switch_context({ context: "WEBVIEW_com.example.app" })

// 3. Interagir com elementos da webview usando seletores CSS
click_element({ selector: "#login-button" })

// 4. Voltar ao nativo para a UI nativa
switch_context({ context: "NATIVE_APP" })
```

## Controle do Dispositivo (Mobile)

### `rotate_device`

Gira o dispositivo para retrato ou paisagem e aguarda a rotação do SO ser concluída. Use para testar layouts dependentes de orientação. **Apenas mobile.**

| Parâmetro     | Tipo                        | Obrigatório | Descrição              |
| ------------- | --------------------------- | ----------- | ---------------------- |
| `orientation` | `"PORTRAIT" \| "LANDSCAPE"` | ✓           | Orientação de destino  |

---

### `hide_keyboard`

Fecha o teclado virtual. Chame após a entrada de texto quando o teclado encobrir elementos de que você precisa em seguida. Não faz nada se já estiver oculto. **Apenas mobile.**

Sem parâmetros.

---

### `set_geolocation`

Substitui as coordenadas de GPS do dispositivo para a sessão. Afeta `navigator.geolocation` na web e os serviços de localização no mobile. As permissões de localização devem ter sido concedidas ao app previamente.

| Parâmetro   | Tipo   | Obrigatório | Descrição                  |
| ----------- | ------ | ----------- | -------------------------- |
| `latitude`  | number | ✓           | Latitude (−90 a 90)        |
| `longitude` | number | ✓           | Longitude (−180 a 180)     |
| `altitude`  | number | —           | Altitude em metros         |

## Ciclo de Vida do App (Mobile)

### `get_app_state`

Retorna o estado atual do ciclo de vida de um app mobile. **Apenas mobile.**

| Parâmetro  | Tipo   | Obrigatório | Descrição                                                                |
| ---------- | ------ | ----------- | ------------------------------------------------------------------------ |
| `bundleId` | string | ✓           | Bundle ID do iOS ou nome do pacote Android, ex.: `"com.example.app"`     |

Retorna um dos seguintes: `not installed`, `not running`, `background (suspended)`, `background`, `foreground`.

## Utilitários do Navegador

### `emulate_device`

Emula um dispositivo mobile ou tablet na sessão de navegador atual (define viewport, DPR, user-agent, eventos de toque). Requer uma sessão com BiDi habilitado: `start_session({ capabilities: { webSocketUrl: true } })`. **Apenas navegador.**

| Parâmetro | Tipo   | Obrigatório | Descrição                                                                                                                                  |
| --------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `device`  | string | —           | Nome do preset de dispositivo (ex.: `"iPhone 15"`, `"Pixel 7"`). Omita para listar os presets. Passe `"reset"` para restaurar os padrões de desktop. |

---

### `execute_script`

Executa JavaScript no navegador ou comandos mobile via Appium.

| Parâmetro | Tipo   | Obrigatório | Descrição                                                          |
| --------- | ------ | ----------- | ------------------------------------------------------------------ |
| `script`  | string | ✓           | Código JS (navegador) ou comando Appium como `"mobile: pressKey"`  |
| `args`    | any[]  | —           | Argumentos passados ao script ou comando                           |

**Navegador:** use `return` para obter valores de volta.

```javascript
// Obter o título da página
execute_script({ script: "return document.title" })

// Rolar o elemento até ficar visível
execute_script({ script: "arguments[0].scrollIntoView()", args: ["#my-element"] })
```

**Mobile (Appium):** usa a sintaxe `mobile: <command>`.

```javascript
// Pressionar a tecla voltar do Android
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Ativar o app (iOS/Android)
execute_script({ script: "mobile: activateApp", args: [{ bundleId: "com.example.app" }] })

// Deep link (iOS)
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://route", bundleId: "com.example.app" }] })
```

## Provedores em Nuvem

### `list_apps`

Lista os apps enviados para um provedor em nuvem (BrowserStack App Automate, Sauce Labs App Storage, TestMu ou TestingBot Storage). Lê as credenciais específicas do provedor a partir do ambiente.

| Parâmetro          | Tipo                                                        | Obrigatório | Padrão           | Descrição                                                 |
| ------------------ | ----------------------------------------------------------- | ----------- | ---------------- | --------------------------------------------------------- |
| `provider`         | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓           | —                | Provedor em nuvem                                         |
| `sortBy`           | `"app_name" \| "uploaded_at"`                               | —           | `"uploaded_at"`  | Ordem de classificação                                    |
| `organizationWide` | boolean                                                     | —           | `false`          | (Apenas BrowserStack) Listar todos os uploads da organização |
| `limit`            | number                                                      | —           | `20`             | Máximo de resultados                                      |
| `region`           | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —           | `"eu-central-1"` | Região da Sauce Labs                                      |

```js
// Listar nos quatro provedores
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs", region: "us-west-1" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

---

### `upload_app`

Envia um `.apk` ou `.ipa` local para um provedor em nuvem (BrowserStack, Sauce Labs, TestMu ou TestingBot). Retorna a URL do app para uso em `start_session`.

| Parâmetro  | Tipo                                                        | Obrigatório | Padrão           | Descrição                                                      |
| ---------- | ----------------------------------------------------------- | ----------- | ---------------- | -------------------------------------------------------------- |
| `provider` | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓           | —                | Provedor em nuvem                                              |
| `path`     | string                                                      | ✓           | —                | Caminho absoluto para o arquivo `.apk` ou `.ipa`               |
| `customId` | string                                                      | —           | —                | ID personalizado opcional para referenciar o app posteriormente |
| `region`   | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —           | `"eu-central-1"` | Região da Sauce Labs                                           |

```js
// Enviar para cada provedor
upload_app({ provider: "browserstack", path: "/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", region: "us-west-1" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```