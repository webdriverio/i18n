---
id: mcp
title: MCP (Model Context Protocol)
description: "Permita que assistentes de IA automatizem navegadores e aplicativos móveis por meio do servidor MCP do WebdriverIO, incluindo instalação, uso com o Claude e ferramentas disponíveis."
---

## O que ele pode fazer?

O WebdriverIO MCP é um **servidor Model Context Protocol (MCP)** que permite que assistentes de IA automatizem e interajam com navegadores web e aplicativos móveis.

### Por que o WebdriverIO MCP?

-   **Mobile-First**: Diferentemente de servidores MCP exclusivos para navegadores, o WebdriverIO MCP oferece suporte à automação de aplicativos nativos iOS e Android via Appium
-   **Seletores Multiplataforma**: A detecção inteligente de elementos gera automaticamente múltiplas estratégias de localização (accessibility ID, XPath, UiAutomator, iOS predicates)
-   **Ecossistema WebdriverIO**: Construído sobre o consolidado framework WebdriverIO, com seu rico ecossistema de serviços e reporters

Ele fornece uma interface unificada para:

-   🖥️ **Navegadores Desktop** (Chrome, Firefox, Edge, Safari, com interface gráfica ou headless)
-   📱 **Aplicativos Móveis Nativos** (Simuladores iOS / Emuladores Android / Dispositivos Reais via Appium)
-   📳 **Aplicativos Móveis Híbridos** (alternância de contexto entre Nativo + WebView via Appium)
-   ☁️ **Dispositivos na Nuvem** (nuvens de dispositivos reais e navegadores BrowserStack, Sauce Labs, TestMu)

por meio do pacote [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Isso permite que assistentes de IA:

-   **Iniciem e controlem navegadores** com dimensões configuráveis, modo headless e navegação inicial opcional
-   **Naveguem em sites** e interajam com elementos (clicar, digitar, rolar)
-   **Analisem o conteúdo da página** por meio da árvore de acessibilidade e da detecção de elementos visíveis, com suporte a paginação
-   **Capturem screenshots** otimizados automaticamente (redimensionados, comprimidos para no máximo 1MB)
-   **Gerenciem cookies** para manipulação de sessão
-   **Controlem dispositivos móveis**, incluindo gestos (tocar, deslizar, arrastar e soltar)
-   **Alternem contextos** em aplicativos híbridos entre nativo e webview
-   **Executem scripts** - JavaScript em navegadores, comandos móveis do Appium em dispositivos
-   **Manipulem recursos do dispositivo**, como rotação, teclado, geolocalização
-   e muito mais, veja as opções de [Ferramentas](./mcp/tools) e [Configuração](./mcp/configuration)

:::info

NOTA Para Aplicativos Móveis
A automação móvel requer um servidor Appium em execução com os drivers apropriados instalados. Veja [Pré-requisitos](#prerequisites) para instruções de configuração.

:::

## Instalação

A maneira mais fácil de usar o `@wdio/mcp` é via npx, sem nenhuma instalação local:

```sh
npx @wdio/mcp
```

Ou instale-o globalmente:

```sh
npm install -g @wdio/mcp
```

## Uso com o Claude

Para usar o WebdriverIO MCP com o Claude, modifique o arquivo de configuração:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

Após adicionar a configuração, reinicie seu harness. As ferramentas do WebdriverIO MCP estarão disponíveis para tarefas de automação de navegadores e dispositivos móveis.

### Uso com o Claude Code

O Claude Code detecta servidores MCP automaticamente. Você pode configurá-lo no `.claude/settings.json` ou `.mcp.json` do seu projeto.

Ou adicione-o globalmente ao .claude.json executando:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Valide executando o comando `/mcp` dentro do claude code.

## Exemplos de Início Rápido

### Automação de Navegador

Peça ao Claude para automatizar tarefas no navegador:

```
"Open Chrome and navigate to https://webdriver.io"
"Click the 'Get Started' button"
"Take a screenshot of the page"
"Find all visible links on the page"
```

### Automação de Aplicativos Móveis

Peça ao Claude para automatizar aplicativos móveis:

```
"Start my iOS app on the iPhone 15 simulator"
"Tap the login button"
"Swipe up to scroll down"
"Take a screenshot of the current screen"
```

## Capacidades

### Automação de Navegador

| Recurso | Descrição |
|---------|-------------|
| **Gerenciamento de Sessão** | Inicie Chrome, Firefox, Edge ou Safari no modo com interface/headless com dimensões personalizadas; conecte-se a uma instância existente do Chrome via CDP |
| **Navegação** | Navegue para URLs; gerencie múltiplas abas |
| **Interação com Elementos** | Clique em elementos, digite texto, encontre elementos por vários seletores |
| **Análise de Página** | Obtenha elementos interativos (com paginação), árvore de acessibilidade (com filtragem por role) |
| **Screenshots** | Capture screenshots (otimizados automaticamente para no máximo 1MB) |
| **Rolagem** | Role para cima/baixo por quantidades configuráveis de pixels |
| **Gerenciamento de Cookies** | Obtenha, defina e exclua cookies |
| **Emulação de Dispositivos** | Emule viewports de celular/tablet no navegador (requer BiDi) |
| **Execução de Scripts** | Execute JavaScript personalizado no contexto do navegador |

### Automação de Aplicativos Móveis (iOS/Android)

| Recurso | Descrição |
|---------|-------------|
| **Gerenciamento de Sessão** | Inicie aplicativos em simuladores, emuladores ou dispositivos reais |
| **Gestos de Toque** | Tocar (elemento ou coordenadas), deslizar, arrastar e soltar |
| **Detecção de Elementos** | Detecção inteligente de elementos com múltiplas estratégias de localização e paginação |
| **Ciclo de Vida do App** | Obtenha o estado do app (primeiro plano, segundo plano, não em execução, não instalado) |
| **Alternância de Contexto** | Alterne entre contextos nativo e webview em aplicativos híbridos |
| **Controle do Dispositivo** | Gire o dispositivo, controle o teclado, substitua o GPS |
| **Permissões** | Tratamento automático de permissões e alertas |
| **Execução de Scripts** | Execute comandos móveis do Appium (pressKey, deepLink, shell, etc.) |

### Provedores de Nuvem

| Recurso | Descrição |
|---------|-------------|
| **Sessões de Navegador** | Execute sessões de navegador no BrowserStack, Sauce Labs, TestMu ou TestingBot (Windows, macOS, Linux) |
| **Sessões Móveis** | Execute sessões de aplicativos em dispositivos reais via BrowserStack, Sauce Labs, TestMu ou TestingBot |
| **Gerenciamento de Apps** | Faça upload de arquivos `.apk`/`.ipa`; liste apps enviados anteriormente em todos os quatro provedores |
| **Túnel Local** | Gerencie automaticamente os binários de túnel específicos de cada provedor para acessar o localhost |
| **Relatórios** | Marque sessões com rótulos de projeto/build/sessão (funciona de forma idêntica em todos os provedores) |

## Pré-requisitos

### Automação de Navegador

-   **Chrome, Firefox, Edge ou Safari** deve estar instalado
-   O WebdriverIO cuida do gerenciamento automatizado de drivers

### Automação Móvel

#### iOS

1. **Instale o Xcode** pela Mac App Store
2. **Instale as Xcode Command Line Tools**:
   ```sh
   xcode-select --install
   ```
3. **Instale o Appium**:
   ```sh
   npm install -g appium
   ```
4. **Instale o driver XCUITest**:
   ```sh
   appium driver install xcuitest
   ```
5. **Inicie o servidor Appium**:
   ```sh
   appium
   ```
6. **Para Simuladores**: Abra Xcode → Window → Devices and Simulators para criar/gerenciar simuladores
7. **Para Dispositivos Reais**: Você precisará do UDID do dispositivo (identificador único de 40 caracteres)

#### Android

1. **Instale o Android Studio** e configure o Android SDK
2. **Defina as variáveis de ambiente**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Instale o Appium**:
   ```sh
   npm install -g appium
   ```
4. **Instale o driver UiAutomator2**:
   ```sh
   appium driver install uiautomator2
   ```
5. **Inicie o servidor Appium**:
   ```sh
   appium
   ```
6. **Crie um emulador** via Android Studio → Virtual Device Manager
7. **Inicie o emulador** antes de executar os testes

## Arquitetura

### Como Funciona

O WebdriverIO MCP atua como uma ponte entre assistentes de IA e a automação de navegadores/dispositivos móveis:

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │   (stdio or HTTP)     │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Browser    │             │    Appium     │             │   Cloud        │
            │ (local/CDP)   │             │  (iOS/Android)│             │   Providers    │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Gerenciamento de Sessão

-   **Modelo de sessão única**: Apenas uma sessão de navegador OU de aplicativo pode estar ativa por vez
-   **O estado da sessão** é mantido globalmente entre as chamadas de ferramentas
-   **Desconexão automática**: Sessões com estado preservado (`noReset: true`) são desconectadas automaticamente ao fechar

### Detecção de Elementos

#### Navegador (Web)

-   Usa um script de navegador otimizado para encontrar todos os elementos visíveis e interativos
-   Retorna elementos com seletores CSS, IDs, classes e informações ARIA
-   Suporta filtragem por viewport e paginação

#### Mobile (Aplicativos Nativos)

-   Usa análise eficiente do XML do page source (2 chamadas HTTP vs 600+ em consultas tradicionais)
-   Classificação de elementos específica da plataforma para Android e iOS
-   Gera múltiplas estratégias de localização por elemento:
    -   Accessibility ID (multiplataforma, mais estável)
    -   Resource ID / atributo Name
    -   Correspondência por Text / Label
    -   XPath (completo e simplificado)
    -   UiAutomator (Android) / Predicates (iOS)

## Sintaxe de Seletores

O servidor MCP suporta múltiplas estratégias de seletores. Veja [Seletores](./mcp/selectors) para a documentação detalhada.

### Web (CSS/XPath)

```
# Seletores CSS
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Seletores de Texto (específicos do WebdriverIO)
button=Exact Button Text
a*=Partial Link Text
```

### Mobile (Multiplataforma)

```
# Accessibility ID (recomendado - funciona no iOS e Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (funciona em ambas as plataformas)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## Ferramentas Disponíveis

O servidor MCP fornece 29 ferramentas para automação de navegadores e dispositivos móveis. Veja [Ferramentas](./mcp/tools) para a referência completa.

| Ferramenta | Plataforma | Descrição |
|------|----------|-------------|
| `start_session` | all | Inicia uma sessão de navegador ou móvel (local ou provedor de nuvem) |
| `close_session` | all | Fecha ou desconecta da sessão atual |
| `launch_chrome` | browser | Abre o Chrome com depuração remota para conexão via CDP |
| `navigate` | browser | Carrega uma URL na aba atual |
| `get_tabs` | browser | Lista todas as abas abertas |
| `switch_tab` | browser | Foca uma aba por handle ou índice |
| `switch_frame` | browser | Entra em um iframe por seletor, ou volta ao nível superior |
| `click_element` | browser | Clica em um elemento |
| `set_value` | all | Digita texto em um campo de entrada |
| `scroll` | browser | Rola a página para cima ou para baixo |
| `get_elements` | all | Obtém elementos interativos (com filtragem + paginação) |
| `get_accessibility_tree` | browser | Obtém a árvore de acessibilidade (com filtragem por role) |
| `get_screenshot` | all | Captura screenshot (otimizado automaticamente) |
| `get_cookies` | browser | Obtém todos os cookies ou um cookie específico |
| `set_cookie` | browser | Define um cookie do navegador |
| `delete_cookies` | browser | Exclui todos ou um cookie |
| `emulate_device` | browser | Emula o viewport de um dispositivo celular/tablet |
| `execute_script` | all | Executa JavaScript (navegador) ou comandos do Appium (mobile) |
| `tap_element` | mobile | Toca em um elemento ou em coordenadas da tela |
| `swipe` | mobile | Gesto de deslizar em uma direção |
| `drag_and_drop` | mobile | Arrasta entre elementos ou coordenadas |
| `get_contexts` | mobile | Lista os contextos nativo/webview disponíveis |
| `switch_context` | mobile | Alterna entre contextos nativo e webview |
| `rotate_device` | mobile | Gira para retrato ou paisagem |
| `hide_keyboard` | mobile | Oculta o teclado virtual |
| `set_geolocation` | all | Substitui as coordenadas GPS do dispositivo |
| `get_app_state` | mobile | Obtém o estado do ciclo de vida do app |
| `list_apps` | cloud | Lista apps enviados (BrowserStack, Sauce Labs, TestMu, TestingBot) |
| `upload_app` | cloud | Faz upload de um `.apk`/`.ipa` para um provedor de nuvem |

## Recursos MCP

Além das ferramentas, o servidor expõe o estado da sessão ao vivo como recursos MCP. Veja [Recursos](./mcp/resources) para a referência completa.

| URI do Recurso | Descrição |
|-------------|-------------|
| `wdio://sessions` | Índice de todas as sessões |
| `wdio://session/current/elements` | Elementos interativos (preferível ao screenshot) |
| `wdio://session/current/screenshot` | Screenshot em base64 |
| `wdio://session/current/accessibility` | Árvore de acessibilidade |
| `wdio://session/current/cookies` | Cookies do navegador |
| `wdio://session/current/tabs` | Abas abertas do navegador |
| `wdio://session/current/contexts` | Contextos móveis disponíveis |
| `wdio://session/current/context` | Contexto móvel ativo |
| `wdio://session/current/app-state/{bundleId}` | Estado do ciclo de vida do app móvel |
| `wdio://session/current/geolocation` | Substituição de GPS atual |
| `wdio://session/current/logs` | Logs da sessão (console do navegador, logcat, crashlog) |
| `wdio://session/current/capabilities` | Capabilities brutas do WebDriver |
| `wdio://session/current/code` | JS do WebdriverIO gerado |
| `wdio://session/current/steps` | Log de etapas da sessão |
| `wdio://session/{sessionId}/code` | JS gerado para uma sessão anterior |
| `wdio://session/{sessionId}/steps` | Etapas de uma sessão anterior |
| `wdio://browserstack/local-binary` | Instruções de configuração do BrowserStack Local |
| `wdio://saucelabs/local-binary` | Instruções de configuração do Sauce Connect Proxy |
| `wdio://testmu/local-binary` | Instruções de configuração do TestMu Tunnel |
| `wdio://testingbot/local-binary` | Instruções de configuração do TestingBot Tunnel |

## Tratamento Automático

### Permissões

Por padrão, o servidor MCP concede automaticamente as permissões do app (`autoGrantPermissions: true`), eliminando a necessidade de lidar manualmente com diálogos de permissão durante a automação.

### Alertas do Sistema

Alertas do sistema (como "Permitir notificações?") são aceitos automaticamente por padrão (`autoAcceptAlerts: true`). Isso pode ser configurado para dispensá-los com `autoDismissAlerts: true`.

## Transporte

Por padrão, o servidor é executado via **stdio** (iniciado como um subprocesso pelo cliente de IA). Para clientes que não suportam MCP baseado em subprocesso (llama.cpp, modo seguro do Codex), use o **transporte HTTP**:

```bash
npx @wdio/mcp --http --port 3000
```

Veja [Transporte](./mcp/transport) para todas as opções, incluindo `--allowedHosts` e `--allowedOrigins`.

## Otimização de Desempenho

O servidor MCP é otimizado para uma comunicação eficiente com assistentes de IA:

-   **Formato TOON**: Usa Token-Oriented Object Notation para uso mínimo de tokens
-   **Análise de XML**: A detecção de elementos móveis usa 2 chamadas HTTP (vs 600+ tradicionalmente)
-   **Compressão de Screenshots**: Imagens comprimidas automaticamente para no máximo 1MB
-   **Filtragem por Viewport**: Apenas elementos visíveis são retornados por padrão
-   **Paginação**: Listas grandes de elementos podem ser paginadas para reduzir o tamanho da resposta

## Tratamento de Erros

Todas as ferramentas são projetadas com tratamento robusto de erros:

-   Erros são retornados como conteúdo de texto (nunca lançados), mantendo a estabilidade do protocolo MCP
-   Mensagens de erro descritivas ajudam a diagnosticar problemas
-   O estado da sessão é preservado mesmo quando operações individuais falham

## Casos de Uso

### Garantia de Qualidade

-   Execução de casos de teste com IA
-   Testes de regressão visual com screenshots
-   Auditoria de acessibilidade por meio da análise da árvore de acessibilidade

### Web Scraping e Extração de Dados

-   Navegue por fluxos complexos de múltiplas páginas
-   Extraia dados estruturados de conteúdo dinâmico
-   Lide com autenticação e gerenciamento de sessão

### Testes de Aplicativos Móveis

-   Automação de testes multiplataforma (iOS + Android)
-   Validação de fluxos de onboarding
-   Testes de deep linking e navegação

### Testes de Integração

-   Testes de fluxos de trabalho de ponta a ponta
-   Verificação de integração API + UI
-   Verificações de consistência multiplataforma

## Solução de Problemas

### O navegador não inicia

-   Certifique-se de que o navegador de destino está instalado
-   Verifique se nenhum outro processo está usando a porta de depuração padrão (9222)
-   Tente o modo headless se ocorrerem problemas de exibição

### Falha na conexão com o Appium

-   Verifique se o servidor Appium está em execução (`appium`)
-   Verifique o host e a porta do Appium em `appiumConfig`
-   Certifique-se de que o driver apropriado está instalado (`appium driver list`)

### Problemas com o Simulador iOS

-   Certifique-se de que o Xcode está instalado e atualizado
-   Verifique se os simuladores estão disponíveis (`xcrun simctl list devices`)
-   Para dispositivos reais, verifique se o UDID está correto

### Problemas com o Emulador Android

-   Certifique-se de que o Android SDK está configurado corretamente
-   Verifique se o emulador está em execução (`adb devices`)
-   Verifique se a variável de ambiente `ANDROID_HOME` está definida

## Recursos

-   [Referência de Ferramentas](./mcp/tools) - Lista completa de ferramentas disponíveis
-   [Referência de Recursos](./mcp/resources) - Recursos MCP para o estado da sessão ao vivo
-   [Guia de Seletores](./mcp/selectors) - Documentação da sintaxe de seletores
-   [Configuração](./mcp/configuration) - Opções de configuração
-   [Transporte](./mcp/transport) - Configuração do transporte HTTP
-   [Provedores de Nuvem](./mcp/cloud-providers) - Integração com as nuvens BrowserStack, Sauce Labs, TestMu e TestingBot
-   [FAQ](./mcp/faq) - Perguntas frequentes
-   [Repositório no GitHub](https://github.com/webdriverio/mcp) - Código-fonte e issues
-   [Pacote NPM](https://www.npmjs.com/package/@wdio/mcp) - Pacote no npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - Especificação do MCP