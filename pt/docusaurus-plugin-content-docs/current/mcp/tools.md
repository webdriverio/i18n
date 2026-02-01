---
id: tools
title: Ferramentas
---

As seguintes ferramentas estão disponíveis através do servidor WebdriverIO MCP. Essas ferramentas permitem que assistentes de IA automatizem navegadores e aplicativos móveis.

## Gerenciamento de Sessão

### `start_browser`

Inicia uma sessão de navegador Chrome.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|---------|-------------|
| `headless` | boolean | Não | `false` | Executar Chrome em modo headless |
| `windowWidth` | number | Não | `1920` | Largura da janela do navegador (400-3840) |
| `windowHeight` | number | Não | `1080` | Altura da janela do navegador (400-2160) |
| `navigationUrl` | string | Não | - | URL para navegar após iniciar o navegador |

#### Exemplo

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### Suporte

- Navegadores Desktop

---

### `start_app_session`

Inicia uma sessão de aplicativo móvel no iOS ou Android via Appium.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|---------|-------------|
| `platform` | string | Sim | - | Plataforma para automatizar: `iOS` ou `Android` |
| `deviceName` | string | Sim | - | Nome do dispositivo ou simulador/emulador |
| `appPath` | string | Não* | - | Caminho para o arquivo do aplicativo (.app, .ipa, ou .apk) |
| `platformVersion` | string | Não | - | Versão do SO (ex., `17.0`, `14`) |
| `automationName` | string | Não | Auto | `XCUITest` (iOS), `UiAutomator2` ou `Espresso` (Android) |
| `udid` | string | Não | - | Identificador único do dispositivo (necessário para dispositivos iOS reais) |
| `noReset` | boolean | Não | `false` | Preservar estado do aplicativo entre sessões |
| `fullReset` | boolean | Não | `true` | Desinstalar e reinstalar o aplicativo antes da sessão |
| `autoGrantPermissions` | boolean | Não | `true` | Conceder permissões do aplicativo automaticamente |
| `autoAcceptAlerts` | boolean | Não | `true` | Aceitar alertas do sistema automaticamente |
| `autoDismissAlerts` | boolean | Não | `false` | Dispensar (em vez de aceitar) alertas |
| `appWaitActivity` | string | Não | - | Activity para aguardar na inicialização (somente Android) |
| `newCommandTimeout` | number | Não | `60` | Segundos antes da sessão expirar devido a inatividade |
| `appiumHost` | string | Não | `127.0.0.1` | Hostname do servidor Appium |
| `appiumPort` | number | Não | `4723` | Porta do servidor Appium |
| `appiumPath` | string | Não | `/` | Caminho do servidor Appium |

*Ou `appPath` deve ser fornecido, ou `noReset: true` para conectar a um aplicativo já em execução.

#### Exemplo

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### Suporte

- Simuladores iOS
- Dispositivos iOS reais
- Emuladores Android
- Dispositivos Android reais

---

### `close_session`

Fecha a sessão atual do navegador ou aplicativo.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|---------|-------------|
| `detach` | boolean | Não | `false` | Desanexar da sessão em vez de fechar (mantém o navegador/aplicativo em execução) |

#### Notas

Sessões com `noReset: true` ou sem `appPath` são automaticamente desanexadas ao fechar para preservar o estado.

#### Suporte

- Navegadores Desktop
- Aplicativos Móveis

---

## Navegação

### `navigate`

Navega para uma URL.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `url` | string | Sim | A URL para navegar |

#### Exemplo

```
Navigate to https://webdriver.io
```

#### Suporte

- Navegadores Desktop

---

## Interação com Elementos

### `click_element`

Clica em um elemento identificado por um seletor.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Sim | - | Seletor CSS, XPath ou seletor móvel |
| `scrollToView` | boolean | Não | `true` | Rolar o elemento para a visualização antes de clicar |
| `timeout` | number | Não | `3000` | Tempo máximo para aguardar o elemento (ms) |

#### Notas

- Suporta seletores de texto WebdriverIO: `button=Texto exato` ou `a*=Contém texto`
- Usa alinhamento central para posicionamento de rolagem

#### Exemplo

```
Click the element with selector "#submit-button"
```

#### Suporte

- Navegadores Desktop
- Aplicativos Nativos Móveis

---

### `set_value`

Digita texto em um campo de entrada.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Sim | - | Seletor para o elemento de entrada |
| `value` | string | Sim | - | Texto para digitar |
| `scrollToView` | boolean | Não | `true` | Rolar o elemento para a visualização antes de digitar |
| `timeout` | number | Não | `3000` | Tempo máximo para aguardar o elemento (ms) |

#### Notas

Limpa o valor existente antes de digitar o novo texto.

#### Exemplo

```
Set the value "john@example.com" in the element with selector "#email"
```

#### Suporte

- Navegadores Desktop
- Aplicativos Nativos Móveis

---

## Análise de Página

### `get_visible_elements`

Obtém elementos visíveis e interativos na página ou tela atual. Esta é a principal ferramenta para descobrir quais elementos estão disponíveis para interação.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-----------|---------|-------------|
| `elementType` | string | Não | `interactable` | Tipo de elementos: `interactable` (botões/links/entradas), `visual` (imagens/SVGs), ou `all` |
| `inViewportOnly` | boolean | Não | `true` | Retornar apenas elementos visíveis na viewport |
| `includeContainers` | boolean | Não | `false` | Incluir contêineres de layout (ViewGroup, ScrollView, etc.) |
| `includeBounds` | boolean | Não | `false` | Incluir coordenadas dos elementos (x, y, width, height) |
| `limit` | number | Não | `0` | Máximo de elementos a retornar (0 = ilimitado) |
| `offset` | number | Não | `0` | Número de elementos a pular (para paginação) |

#### Retorna

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Elementos web incluem:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**Elementos móveis incluem:** Múltiplas estratégias de localização (accessibility ID, resource ID, XPath, UiAutomator/predicates), tipo de elemento, texto e, opcionalmente, limites

#### Notas

- **Web**: Usa um script otimizado para detecção rápida de elementos
- **Mobile**: Usa análise eficiente da fonte XML da página (2 chamadas HTTP vs 600+ para consultas de elementos)
- Use paginação (`limit` e `offset`) para páginas grandes para reduzir o uso de tokens

#### Exemplo

```
Get all visible elements on the page with their coordinates
```

#### Suporte

- Navegadores Desktop
- Aplicativos Móveis

---

### `get_accessibility`

Obtém a árvore de acessibilidade da página atual com informações semânticas sobre funções, nomes e estados.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-----------|---------|-------------|
| `limit` | number | Não | `100` | Máximo de nós a retornar (0 = ilimitado) |
| `offset` | number | Não | `0` | Número de nós a pular (para paginação) |
| `roles` | string[] | Não | Todos | Filtrar para funções específicas (ex., `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | Não | `true` | Retornar apenas nós com um nome/rótulo |

#### Retorna

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### Notas

- Apenas navegadores. Para aplicativos móveis, use `get_visible_elements` em vez disso
- Útil quando `get_visible_elements` não retorna os elementos esperados
- `namedOnly: true` filtra contêineres anônimos e reduz ruído

#### Suporte

- Navegadores Desktop

---

## Capturas de Tela

### `take_screenshot`

Captura uma screenshot da viewport atual.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `outputPath` | string | Não | Caminho para salvar o arquivo de screenshot. Se omitido, retorna dados base64 |

#### Retorna

Dados de imagem codificados em base64 (PNG ou JPEG) com informações de tamanho.

#### Notas

As screenshots são automaticamente otimizadas:
- Dimensão máxima: 2000px (reduzida se maior)
- Tamanho máximo do arquivo: 1MB
- Formato: PNG com compressão máxima, ou JPEG se necessário para atender ao limite de tamanho

#### Suporte

- Navegadores Desktop
- Aplicativos Móveis

---

## Rolagem

### `scroll`

Rola a página para cima ou para baixo por um número especificado de pixels.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Sim | - | Direção da rolagem: `up` ou `down` |
| `pixels` | number | Não | `500` | Número de pixels para rolar |

#### Notas

Apenas navegadores. Para rolagem em dispositivos móveis, use a ferramenta `swipe` em vez disso.

#### Suporte

- Navegadores Desktop

---

## Gerenciamento de Cookies

### `get_cookies`

Obtém cookies da sessão atual.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `name` | string | Não | Nome específico do cookie para recuperar (omita para todos os cookies) |

#### Retorna

Objetos de cookie com propriedades name, value, domain, path, expiry, secure e httpOnly.

#### Suporte

- Navegadores Desktop

---

### `set_cookie`

Define um cookie na sessão atual.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-----------|---------|-------------|
| `name` | string | Sim | - | Nome do cookie |
| `value` | string | Sim | - | Valor do cookie |
| `domain` | string | Não | Atual | Domínio do cookie |
| `path` | string | Não | `/` | Caminho do cookie |
| `expiry` | number | Não | - | Expiração como timestamp Unix (segundos) |
| `secure` | boolean | Não | - | Flag de segurança |
| `httpOnly` | boolean | Não | - | Flag HttpOnly |
| `sameSite` | string | Não | - | Atributo SameSite: `strict`, `lax`, ou `none` |

#### Suporte

- Navegadores Desktop

---

### `delete_cookies`

Exclui cookies da sessão atual.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `name` | string | Não | Nome específico do cookie para excluir (omita para excluir todos) |

#### Suporte

- Navegadores Desktop

---

## Gestos de Toque (Mobile)

### `tap_element`

Toca em um elemento ou coordenadas da tela.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `selector` | string | Não* | Seletor para o elemento a tocar |
| `x` | number | Não* | Coordenada X para toque |
| `y` | number | Não* | Coordenada Y para toque |

*Ou `selector` ou ambos `x` e `y` são necessários.

#### Suporte

- Aplicativos Móveis

---

### `swipe`

Realiza um gesto de deslize na direção especificada.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Sim | - | Direção do deslize: `up`, `down`, `left`, `right` |
| `duration` | number | Não | `500` | Duração do deslize em milissegundos (100-5000) |
| `percent` | number | Não | 0.5/0.95 | Percentual da tela para deslizar (0-1) |

#### Notas

- Percentual padrão: 0.5 para deslizes verticais, 0.95 para deslizes horizontais
- A direção indica o movimento do conteúdo: "deslizar para cima" rola o conteúdo para cima

#### Exemplo

```
Swipe up to scroll down the screen
```

#### Suporte

- Aplicativos Móveis

---

### `drag_and_drop`

Arrasta um elemento para outro elemento ou coordenadas.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | Sim | Seletor do elemento de origem para arrastar |
| `targetSelector` | string | Não* | Seletor do elemento de destino para soltar |
| `x` | number | Não* | Deslocamento X de destino (se não houver targetSelector) |
| `y` | number | Não* | Deslocamento Y de destino (se não houver targetSelector) |
| `duration` | number | Não | Padrão | Duração do arrasto em milissegundos (100-5000) |

*Ou `targetSelector` ou ambos `x` e `y` são necessários.

#### Suporte

- Aplicativos Móveis

---

## Ciclo de Vida do Aplicativo (Mobile)

### `get_app_state`

Obtém o estado atual de um aplicativo.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `bundleId` | string | Sim | Identificador do aplicativo (bundle ID para iOS, nome do pacote para Android) |

#### Retorna

Estado do aplicativo: `not installed`, `not running`, `running in background (suspended)`, `running in background`, ou `running in foreground`.

#### Suporte

- Aplicativos Móveis

---

## Alternância de Contexto (Aplicativos Híbridos)

### `get_contexts`

Lista todos os contextos disponíveis (nativos e webviews).

#### Parâmetros

Nenhum

#### Retorna

Array de nomes de contexto (ex., `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### Suporte

- Aplicativos Híbridos Móveis

---

### `get_current_context`

Obtém o contexto atualmente ativo.

#### Parâmetros

Nenhum

#### Retorna

Nome do contexto atual (ex., `NATIVE_APP` ou `WEBVIEW_*`).

#### Suporte

- Aplicativos Híbridos Móveis

---

### `switch_context`

Alterna entre contextos nativos e webview.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `context` | string | Sim | Nome do contexto ou índice (base 1) de `get_contexts` |

#### Exemplo

```
Switch to the WEBVIEW_com.example.app context
```

#### Suporte

- Aplicativos Híbridos Móveis

---

## Controle de Dispositivo (Mobile)

### `rotate_device`

Gira o dispositivo para uma orientação específica.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `orientation` | string | Sim | `PORTRAIT` ou `LANDSCAPE` |

#### Suporte

- Aplicativos Móveis

---

### `hide_keyboard`

Oculta o teclado na tela.

#### Parâmetros

Nenhum

#### Suporte

- Aplicativos Móveis

---

### `get_geolocation`

Obtém as coordenadas GPS atuais.

#### Parâmetros

Nenhum

#### Retorna

Objeto com `latitude`, `longitude` e `altitude`.

#### Suporte

- Aplicativos Móveis

---

### `set_geolocation`

Define as coordenadas GPS do dispositivo.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `latitude` | number | Sim | Coordenada de latitude (-90 a 90) |
| `longitude` | number | Sim | Coordenada de longitude (-180 a 180) |
| `altitude` | number | Não | Altitude em metros |

#### Exemplo

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### Suporte

- Aplicativos Móveis

---

## Execução de Script

### `execute_script`

Executa JavaScript no navegador ou comandos móveis via Appium.

#### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-------------|
| `script` | string | Sim | Código JavaScript (navegador) ou comando móvel (ex., `mobile: pressKey`) |
| `args` | array | Não | Argumentos para o script |

#### Exemplos de Navegador

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### Exemplos para Mobile (Appium)

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### Códigos de Tecla Comuns do Android

| Tecla | Código |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### Mais Comandos Móveis

Para uma lista completa dos comandos móveis Appium disponíveis, consulte:
- [Comandos Móveis XCUITest](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [Comandos Móveis UiAutomator2](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### Suporte

- Navegadores Desktop
- Aplicativos Móveis (via comandos móveis Appium)