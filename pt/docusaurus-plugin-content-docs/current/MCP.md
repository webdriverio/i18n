---
id: mcp
title: MCP (Protocolo de Contexto de Modelo)
---

## O que ele pode fazer?

WebdriverIO MCP é um **servidor de Protocolo de Contexto de Modelo (MCP)** que permite assistentes de IA como Claude Desktop e Claude Code automatizar e interagir com navegadores web e aplicativos móveis.

### Por que WebdriverIO MCP?

-   **Mobile-First**: Diferente dos servidores MCP apenas para navegador, o WebdriverIO MCP suporta automação de aplicativos nativos iOS e Android via Appium
-   **Seletores Multiplataforma**: A detecção inteligente de elementos gera múltiplas estratégias de localização (ID de acessibilidade, XPath, UiAutomator, predicados iOS) automaticamente
-   **Ecossistema WebdriverIO**: Construído sobre o framework WebdriverIO testado em batalha com seu rico ecossistema de serviços e relatores

Ele fornece uma interface unificada para:

-   🖥️ **Navegadores Desktop** (Chrome - modo com cabeçalho ou sem cabeçalho)
-   📱 **Aplicativos Móveis Nativos** (Simuladores iOS / Emuladores Android / Dispositivos Reais via Appium)
-   📳 **Aplicativos Móveis Híbridos** (Alternância de contexto Nativo + WebView via Appium)

através do pacote [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Isso permite que assistentes de IA:

-   **Iniciem e controlem navegadores** com dimensões configuráveis, modo sem cabeçalho e navegação inicial opcional
-   **Naveguem por sites** e interajam com elementos (clicar, digitar, rolar)
-   **Analisem o conteúdo da página** via árvore de acessibilidade e detecção de elementos visíveis com suporte à paginação
-   **Capturem capturas de tela** automaticamente otimizadas (redimensionadas, comprimidas para máximo 1MB)
-   **Gerenciem cookies** para tratamento de sessão
-   **Controlem dispositivos móveis** incluindo gestos (tocar, deslizar, arrastar e soltar)
-   **Alternem contextos** em aplicativos híbridos entre nativo e webview
-   **Executem scripts** - JavaScript em navegadores, comandos móveis Appium em dispositivos
-   **Gerenciem recursos do dispositivo** como rotação, teclado, geolocalização
-   e muito mais, veja as opções de [Ferramentas](./mcp/tools) e [Configuração](./mcp/configuration)

:::info

NOTA Para Aplicativos Móveis
A automação móvel requer um servidor Appium em execução com os drivers apropriados instalados. Veja [Pré-requisitos](#prerequisites) para instruções de configuração.

:::

## Instalação

A maneira mais fácil de usar `@wdio/mcp` é via npx sem nenhuma instalação local:

```sh
npx @wdio/mcp
```

Ou instale globalmente:

```sh
npm install -g @wdio/mcp
```

## Uso com Claude

Para usar WebdriverIO MCP com Claude, modifique o arquivo de configuração:

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

Após adicionar a configuração, reinicie o Claude. As ferramentas WebdriverIO MCP estarão disponíveis para tarefas de automação de navegador e móvel.

### Uso com Claude Code

Claude Code detecta automaticamente servidores MCP. Você pode configurá-lo no arquivo `.claude/settings.json` do seu projeto, ou `.mcp.json`.

Ou adicione-o ao .claude.json globalmente executando:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Valide executando o comando `/mcp` dentro do claude code.

## Exemplos Rápidos

### Automação de Navegador

Peça ao Claude para automatizar tarefas de navegador:

```
"Abra o Chrome e navegue até https://webdriver.io"
"Clique no botão 'Get Started'"
"Tire uma captura de tela da página"
"Encontre todos os links visíveis na página"
```

### Automação de Aplicativo Móvel

Peça ao Claude para automatizar aplicativos móveis:

```
"Inicie meu aplicativo iOS no simulador do iPhone 15"
"Toque no botão de login"
"Deslize para cima para rolar para baixo"
"Tire uma captura de tela da tela atual"
```

## Capacidades

### Automação de Navegador (Chrome)

| Recurso | Descrição |
|---------|-------------|
| **Gerenciamento de Sessão** | Inicia o Chrome em modo com/sem cabeçalho com dimensões personalizadas e URL de navegação opcional |
| **Navegação** | Navega para URLs |
| **Interação com Elementos** | Clica em elementos, digita texto, encontra elementos por vários seletores |
| **Análise de Página** | Obtém elementos visíveis (com paginação), árvore de acessibilidade (com filtragem) |
| **Capturas de Tela** | Captura screenshots (auto-otimizados para máx. 1MB) |
| **Rolagem** | Rola para cima/baixo em quantidades configuráveis de pixels |
| **Gerenciamento de Cookies** | Obtém, define e exclui cookies |
| **Execução de Script** | Executa JavaScript personalizado no contexto do navegador |

### Automação de Aplicativo Móvel (iOS/Android)

| Recurso | Descrição |
|---------|-------------|
| **Gerenciamento de Sessão** | Inicia aplicativos em simuladores, emuladores ou dispositivos reais |
| **Gestos de Toque** | Toque, deslize, arrastar e soltar |
| **Detecção de Elementos** | Detecção inteligente de elementos com múltiplas estratégias de localização e paginação |
| **Ciclo de Vida do Aplicativo** | Obtém o estado do aplicativo (via `execute_script` para ativar/encerrar) |
| **Alternância de Contexto** | Alterna entre contextos nativos e webview em aplicativos híbridos |
| **Controle de Dispositivo** | Rotaciona dispositivo, controle de teclado |
| **Geolocalização** | Obtém e define coordenadas GPS do dispositivo |
| **Permissões** | Tratamento automático de permissões e alertas |
| **Execução de Script** | Executa comandos móveis Appium (pressKey, deepLink, shell, etc.) |

## Pré-requisitos

### Automação de Navegador

-   **Chrome** deve estar instalado no seu sistema
-   WebdriverIO gerencia automaticamente o ChromeDriver

### Automação Móvel

#### iOS

1. **Instale Xcode** pela Mac App Store
2. **Instale as Ferramentas de Linha de Comando do Xcode**:
   ```sh
   xcode-select --install
   ```
3. **Instale Appium**:
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

1. **Instale Android Studio** e configure o Android SDK
2. **Configure variáveis de ambiente**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Instale Appium**:
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
7. **Inicie o emulador** antes de executar testes

## Arquitetura

### Como Funciona

WebdriverIO MCP atua como uma ponte entre assistentes de IA e automação de navegador/móvel:

```
┌─────────────────┐     Protocolo MCP      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  ou Claude Code │      (stdio)          │     Servidor     │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             API WebDriverIO
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Chrome     │             │    Appium     │             │    Appium     │
            │  (Navegador)  │             │     (iOS)     │             │   (Android)   │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Gerenciamento de Sessão

-   **Modelo de sessão única**: Apenas uma sessão de navegador OU aplicativo pode estar ativa de cada vez
-   **Estado da sessão** é mantido globalmente em todas as chamadas de ferramentas
-   **Auto-desanexação**: Sessões com estado preservado (`noReset: true`) automaticamente se desanexam ao fechar

### Detecção de Elementos

#### Navegador (Web)

-   Usa um script de navegador otimizado para encontrar todos os elementos visíveis e interativos
-   Retorna elementos com seletores CSS, IDs, classes e informações ARIA
-   Filtra para elementos visíveis na viewport por padrão

#### Móvel (Aplicativos Nativos)

-   Usa análise eficiente de fonte de página XML (2 chamadas HTTP vs 600+ para consultas tradicionais)
-   Classificação de elementos específica da plataforma para Android e iOS
-   Gera múltiplas estratégias de localização por elemento:
    -   ID de Acessibilidade (multiplataforma, mais estável)
    -   ID de Recurso / atributo Name
    -   Correspondência de Texto / Rótulo
    -   XPath (completo e simplificado)
    -   UiAutomator (Android) / Predicados (iOS)

## Sintaxe de Seletor

O servidor MCP suporta múltiplas estratégias de seletor. Veja [Seletores](./mcp/selectors) para documentação detalhada.

### Web (CSS/XPath)

```
# Seletores CSS
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Seletores de Texto (específico do WebdriverIO)
button=Texto Exato do Botão
a*=Texto Parcial do Link
```

### Móvel (Multiplataforma)

```
# ID de Acessibilidade (recomendado - funciona em iOS e Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (funciona em ambas plataformas)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## Ferramentas Disponíveis

O servidor MCP fornece 25 ferramentas para automação de navegador e móvel. Veja [Ferramentas](./mcp/tools) para a referência completa.

### Ferramentas de Navegador

| Ferramenta | Descrição |
|------|-------------|
| `start_browser` | Inicia navegador Chrome (com URL inicial opcional) |
| `close_session` | Fecha ou desanexa da sessão |
| `navigate` | Navega para uma URL |
| `click_element` | Clica em um elemento |
| `set_value` | Digita texto em um campo |
| `get_visible_elements` | Obtém elementos visíveis/interativos (com paginação) |
| `get_accessibility` | Obtém árvore de acessibilidade (com filtragem) |
| `take_screenshot` | Captura screenshot (auto-otimizado) |
| `scroll` | Rola a página para cima ou para baixo |
| `get_cookies` / `set_cookie` / `delete_cookies` | Gerenciamento de cookies |
| `execute_script` | Executa JavaScript no contexto do navegador |

### Ferramentas Móveis

| Ferramenta | Descrição |
|------|-------------|
| `start_app_session` | Inicia aplicativo iOS/Android |
| `tap_element` | Toca em elemento ou coordenadas |
| `swipe` | Desliza em uma direção |
| `drag_and_drop` | Arrasta entre localizações |
| `get_app_state` | Verifica se o aplicativo está em execução |
| `get_contexts` / `switch_context` | Alternância de contexto em aplicativos híbridos |
| `rotate_device` | Rotaciona para modo retrato/paisagem |
| `get_geolocation` / `set_geolocation` | Obtém ou define coordenadas GPS |
| `hide_keyboard` | Oculta o teclado na tela |
| `execute_script` | Executa comandos móveis Appium |

## Tratamento Automático

### Permissões

Por padrão, o servidor MCP concede automaticamente permissões de aplicativo (`autoGrantPermissions: true`), eliminando a necessidade de lidar manualmente com diálogos de permissão durante a automação.

### Alertas do Sistema

Alertas do sistema (como "Permitir notificações?") são automaticamente aceitos por padrão (`autoAcceptAlerts: true`). Isso pode ser configurado para dispensar em vez disso com `autoDismissAlerts: true`.

## Configuração

### Variáveis de Ambiente

Configure a conexão do servidor Appium:

| Variável | Padrão | Descrição |
|----------|---------|-------------|
| `APPIUM_URL` | `127.0.0.1` | Nome do host do servidor Appium |
| `APPIUM_URL_PORT` | `4723` | Porta do servidor Appium |
| `APPIUM_PATH` | `/` | Caminho do servidor Appium |

### Exemplo com Servidor Appium Personalizado

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724"
            }
        }
    }
}
```

## Otimização de Desempenho

O servidor MCP é otimizado para comunicação eficiente com assistentes de IA:

-   **Formato TOON**: Usa Token-Oriented Object Notation para uso mínimo de tokens
-   **Análise XML**: A detecção de elementos móveis usa 2 chamadas HTTP (vs 600+ tradicionalmente)
-   **Compressão de Screenshot**: Imagens auto-comprimidas para máximo 1MB usando Sharp
-   **Filtragem de Viewport**: Apenas elementos visíveis são retornados por padrão
-   **Paginação**: Grandes listas de elementos podem ser paginadas para reduzir o tamanho da resposta

## Suporte a TypeScript

O servidor MCP é escrito em TypeScript e inclui definições de tipo completas. Se você estiver estendendo ou integrando com o servidor programaticamente, você se beneficiará de auto-completação e segurança de tipos.

## Tratamento de Erros

Todas as ferramentas são projetadas com tratamento robusto de erros:

-   Erros são retornados como conteúdo de texto (nunca lançados), mantendo a estabilidade do protocolo MCP
-   Mensagens de erro descritivas ajudam a diagnosticar problemas
-   O estado da sessão é preservado mesmo quando operações individuais falham

## Casos de Uso

### Garantia de Qualidade

-   Execução de casos de teste com IA
-   Testes de regressão visual com capturas de tela
-   Auditoria de acessibilidade via análise de árvore de acessibilidade

### Web Scraping e Extração de Dados

-   Navegar por fluxos complexos de múltiplas páginas
-   Extrair dados estruturados de conteúdo dinâmico
-   Lidar com autenticação e gerenciamento de sessão

### Teste de Aplicativo Móvel

-   Automação de testes multiplataforma (iOS + Android)
-   Validação de fluxo de integração
-   Teste de deep linking e navegação

### Testes de Integração

-   Teste de fluxo de trabalho de ponta a ponta
-   Verificação de integração API + UI
-   Verificações de consistência multiplataforma

## Solução de Problemas

### Navegador não inicia

-   Certifique-se de que o Chrome está instalado
-   Verifique se nenhum outro processo está usando a porta de depuração padrão (9222)
-   Tente o modo sem cabeçalho se ocorrerem problemas de exibição

### Falha na conexão Appium

-   Verifique se o servidor Appium está em execução (`appium`)
-   Verifique a configuração de URL e porta do Appium
-   Certifique-se de que o driver apropriado está instalado (`appium driver list`)

### Problemas com Simulador iOS

-   Certifique-se de que o Xcode está instalado e atualizado
-   Verifique se os simuladores estão disponíveis (`xcrun simctl list devices`)
-   Para dispositivos reais, verifique se o UDID está correto

### Problemas com Emulador Android

-   Certifique-se de que o Android SDK está configurado corretamente
-   Verifique se o emulador está em execução (`adb devices`)
-   Verifique se a variável de ambiente `ANDROID_HOME` está definida

## Recursos

-   [Referência de Ferramentas](./mcp/tools) - Lista completa de ferramentas disponíveis
-   [Guia de Seletores](./mcp/selectors) - Documentação de sintaxe de seletor
-   [Configuração](./mcp/configuration) - Opções de configuração
-   [FAQ](./mcp/faq) - Perguntas frequentes
-   [Repositório GitHub](https://github.com/webdriverio/mcp) - Código fonte e issues
-   [Pacote NPM](https://www.npmjs.com/package/@wdio/mcp) - Pacote no npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - Especificação MCP