---
id: configuration
title: Configuração
description: "Configure o servidor MCP do WebdriverIO, incluindo opções de sessão, navegador, dispositivos móveis, provedores de nuvem, detecção de elementos e Appium."
---

Esta página documenta todas as opções de configuração do servidor MCP do WebdriverIO.

## Configuração do Servidor MCP

O servidor MCP é configurado por meio de arquivos de configuração ou comandos.

### Configuração Básica

Edite seu arquivo de configuração MCP (por exemplo, `./.mcp.json`) e adicione o seguinte:

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

## Opções de Sessão

Todas as opções de sessão são passadas para a ferramenta `start_session`. Existe uma única ferramenta unificada para sessões de navegador e de dispositivos móveis; o parâmetro `platform` determina o tipo de sessão.

### Opções Comuns

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

A plataforma a ser automatizada.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

Onde a sessão é executada. Use o nome de um provedor de nuvem para dispositivos remotos; cada um requer suas próprias variáveis de ambiente. Consulte [Provedores de Nuvem](./cloud-providers) para mais detalhes.

</Option>
## Opções de Sessão de Navegador

Opções para sessões com `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

Navegador a ser iniciado.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

Versão do navegador. Somente para provedores de nuvem (padrão: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

Sistema operacional para sessões de navegador em provedores de nuvem. Exemplos: `os: "Windows"`, `osVersion: "11"` ou `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

Executa o navegador em modo headless (sem janela visível). Defina como `false` para ver o navegador.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **Intervalo:** `400` - `3840`

Largura inicial da janela do navegador em pixels.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **Intervalo:** `400` - `2160`

Altura inicial da janela do navegador em pixels.

</Option>
### `navigationUrl`

<Option type="string" required="No">

URL para a qual navegar imediatamente após iniciar o navegador. Mais eficiente do que chamar `start_session` seguido de `navigate` separadamente.

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

Conecta-se a uma instância existente do Chrome em vez de iniciar uma nova. Use após `launch_chrome` para conectar via CDP.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

Configuração de conexão de depuração remota do Chrome. Aplica-se somente quando `attach: true`.

</Option>
## Opções de Sessão Móvel

Opções para sessões com `platform: "ios"` ou `platform: "android"`.

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

Nome do dispositivo, simulador ou emulador.

**Exemplos:**
-   Simulador iOS: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Emulador Android: `"Pixel 7"`, `"Nexus 5X"`
-   Dispositivo Real: O nome do dispositivo conforme exibido no seu sistema

</Option>
### `platformVersion`

<Option type="string" required="No">

Versão do sistema operacional do dispositivo/simulador/emulador (por exemplo, `"18.0"` para iOS, `"14"` para Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

Driver de automação. O padrão é `XCUITest` para iOS e `UiAutomator2` para Android.

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

Identificador Único do Dispositivo (Unique Device Identifier). Obrigatório para dispositivos iOS reais (identificador de 40 caracteres).

**Encontrando o UDID:**
-   **iOS:** Conecte o dispositivo, abra o Finder, clique no dispositivo → Número de Série (clique para revelar o UDID)
-   **Android:** Execute `adb devices` no terminal

</Option>
### `appPath`

<Option type="string" required="No">

Caminho para o arquivo do aplicativo a ser instalado e iniciado.

**Formatos suportados:**
-   Simulador iOS: diretório `.app`
-   Dispositivo iOS Real: arquivo `.ipa`
-   Android: arquivo `.apk`

É necessário fornecer `appPath` ou `noReset: true` para conectar a um aplicativo já em execução.

</Option>
### `app`

<Option type="string" required="No">

URL do aplicativo no provedor de nuvem (`bs://...` para BrowserStack, `storage:filename=` para Sauce Labs, `lt://...` para TestMu, app_url do TestingBot) ou `customId`. Usado no lugar de `appPath` para sessões móveis na nuvem.

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

Activity a ser aguardada na inicialização do aplicativo. Se não for especificada, a activity principal/de inicialização do aplicativo é usada.

**Exemplo:** `"com.example.app.MainActivity"`

</Option>
### Opções de Estado da Sessão

#### `noReset`

<Option type="boolean" required="No">

Preserva o estado do aplicativo entre sessões. Quando `true`:
-   Os dados do aplicativo são preservados (estado de login, preferências, etc.)
-   A sessão será **desanexada** (detach) em vez de fechada (mantém o aplicativo em execução)
-   Pode ser usado sem `appPath` para conectar a um aplicativo já em execução

</Option>
#### `fullReset`

<Option type="boolean" required="No">

Redefine completamente o aplicativo antes da sessão:
-   iOS: Desinstala e reinstala o aplicativo
-   Android: Limpa os dados e o cache do aplicativo

Defina `fullReset: false` com `noReset: true` para preservar completamente o estado do aplicativo.

</Option>
### Tempo Limite da Sessão

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

Quanto tempo (em segundos) o Appium aguardará por um novo comando antes de encerrar a sessão. Aumente para sessões de depuração mais longas.

</Option>
### Tratamento Automático

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

Concede automaticamente permissões ao aplicativo na instalação/inicialização (câmera, microfone, localização, etc.).

:::note Somente Android
Esta opção afeta principalmente o Android. As permissões do iOS devem ser tratadas de forma diferente devido a restrições do sistema.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

Aceita automaticamente alertas do sistema (diálogos) durante a automação ("Permitir notificações?", etc.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

Dispensa alertas do sistema em vez de aceitá-los. Tem precedência sobre `autoAcceptAlerts` quando `true`.

</Option>
### Conexão com o Servidor Appium

Substitua a conexão com o servidor Appium por sessão usando `appiumConfig`:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

Conexão com o servidor Appium. O padrão é `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Opções de Provedores de Nuvem

### Credenciais

Cada provedor de nuvem requer suas próprias variáveis de ambiente:

| Provedor     | Variável de Usuário     | Variável de Chave de Acesso |
| ------------ | ----------------------- | --------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY`   |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`          |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`         |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`         |

Defina-as antes de iniciar o servidor MCP.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

Região do data center do Sauce Labs. Ignorado para outros provedores.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

Habilita o roteamento por túnel local para sessões em provedores de nuvem (acesso a localhost, ambientes de staging, serviços internos).

-   `true` — Inicia automaticamente o túnel antes da sessão e o encerra ao fechar
-   `"external"` — O túnel já está em execução externamente; apenas define as flags apropriadas para o provedor

Antes de usar `true`, leia o recurso local-binary do provedor (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` ou `wdio://testingbot/local-binary`) para instruções de configuração específicas para seu sistema operacional e arquitetura.

</Option>
### `tunnelName`

<Option type="string" required="No">

Nome identificador do túnel. Obrigatório quando `tunnel: "external"` para corresponder ao túnel em execução. Quando `tunnel: true`, um nome único é gerado automaticamente se não for fornecido.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

Rótulos de sessão do provedor de nuvem visíveis no painel do provedor. Funciona de forma idêntica no BrowserStack, Sauce Labs, TestMu e TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

Habilita a gravação de trace. Produz um arquivo zip `.trace` compatível com Playwright, salvo em `.trace/` ao chamar `close_session`. Visualize os traces em [player.vibium.dev](https://player.vibium.dev).

</Option>
## Opções de Detecção de Elementos

Opções para a ferramenta `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

Retorna apenas elementos visíveis na viewport atual. Defina como `true` para reduzir os resultados em páginas longas.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

Inclui elementos de contêiner/layout nos resultados:

**Contêineres Android:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**Contêineres iOS:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

Inclui as coordenadas da caixa delimitadora do elemento (x, y, largura, altura) na resposta.

</Option>
### Paginação

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Número máximo de elementos a serem retornados.

</Option>
#### `offset`

<Option type="number" default="0" required="No">

Número de elementos a serem ignorados antes de retornar os resultados.

**Exemplo:** Obter os elementos 21–40:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Opções da Árvore de Acessibilidade

Opções para a ferramenta `get_accessibility_tree` (somente navegador).

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Número máximo de nós a serem retornados.

</Option>
### `offset`

<Option type="number" default="0" required="No">

Número de nós a serem ignorados para paginação.

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

Filtra por papéis (roles) de acessibilidade específicos.

**Papéis comuns:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Exemplo:** Obter apenas botões e links:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Captura de Tela

A ferramenta `get_screenshot` não recebe parâmetros. As capturas de tela são processadas automaticamente:

| Otimização          | Valor    | Descrição                                                    |
| ------------------- | -------- | ------------------------------------------------------------ |
| Dimensão máxima     | 2000px   | Imagens maiores que 2000px são reduzidas                     |
| Tamanho máximo      | 1MB      | Imagens são comprimidas para ficar abaixo de 1MB             |
| Formato             | PNG/JPEG | PNG com compressão máxima; JPEG se necessário pelo tamanho   |

## Comportamento da Sessão

### Tipos de Sessão

| Tipo      | Descrição                     | Desanexação Automática                    |
| --------- | ----------------------------- | ----------------------------------------- |
| `browser` | Sessão de navegador           | Não                                       |
| `ios`     | Sessão de aplicativo iOS      | Sim (se `noReset: true` ou sem `appPath`) |
| `android` | Sessão de aplicativo Android  | Sim (se `noReset: true` ou sem `appPath`) |

### Modelo de Sessão Única

O servidor MCP opera com um **modelo de sessão única**:

-   Apenas uma sessão de navegador OU de aplicativo pode estar ativa por vez
-   Iniciar uma nova sessão fechará/desanexará a sessão atual
-   O estado da sessão é mantido globalmente entre chamadas de ferramentas

### Desanexar vs Fechar

| Ação                | `detach: false` (Fechar)              | `detach: true` (Desanexar)                            |
| ------------------- | ------------------------------------- | ----------------------------------------------------- |
| Navegador           | Fecha o navegador completamente       | Mantém o navegador em execução, desconecta o WebDriver |
| Aplicativo Móvel    | Encerra o aplicativo                  | Mantém o aplicativo em execução no estado atual       |
| Caso de Uso         | Ambiente limpo para a próxima sessão  | Preservar estado, inspeção manual                     |

## Considerações de Desempenho

### Automação de Navegador

-   O **modo headless** é mais rápido, mas não renderiza elementos visuais
-   **Tamanhos de janela menores** reduzem o tempo de captura de tela
-   A **detecção de elementos** é otimizada com uma única execução de script
-   A **otimização de capturas de tela** mantém as imagens abaixo de 1MB para um processamento eficiente

### Automação Móvel

-   A **análise do código-fonte XML da página** usa apenas 2 chamadas HTTP (contra mais de 600 para consultas de elementos tradicionais)
-   **Seletores de Accessibility ID** são os mais rápidos e confiáveis
-   **Seletores XPath** são os mais lentos; use-os apenas como último recurso
-   A **paginação** (`limit` e `offset`) reduz o uso de tokens em telas com muitos elementos

### Dicas de Uso de Tokens

| Configuração               | Impacto                                                     |
| -------------------------- | ----------------------------------------------------------- |
| `inViewportOnly: true`     | Filtra elementos fora da tela, reduzindo o tamanho da resposta |
| `includeContainers: false` | Exclui elementos de layout (ViewGroup, etc.)                |
| `includeBounds: false`     | Omite dados de x/y/largura/altura                           |
| `limit` com paginação      | Processa elementos em lotes em vez de todos de uma vez      |

## Configuração do Servidor Appium

Antes de usar a automação móvel, certifique-se de que o Appium esteja configurado corretamente.

### Configuração Básica

```sh
# Instalar o Appium globalmente
npm install -g appium

# Instalar drivers
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Iniciar o servidor
appium
```

### Configuração Personalizada do Servidor

```sh
# Iniciar com host e porta personalizados
appium --address 0.0.0.0 --port 4724

# Iniciar com logs
appium --log-level debug

# Iniciar com um caminho base específico
appium --base-path /wd/hub
```

### Verificar a Instalação

```sh
# Verificar os drivers instalados
appium driver list --installed

# Verificar a versão do Appium
appium --version

# Testar a conexão
curl http://localhost:4723/status
```

## Solução de Problemas de Configuração

### O Servidor MCP Não Inicia

1. Verifique se o npm/npx está instalado: `npm --version`
2. Tente executar manualmente: `npx @wdio/mcp`
3. Verifique os logs do seu harness em busca de erros

### Problemas de Conexão com o Appium

1. Verifique se o Appium está em execução: `curl http://localhost:4723/status`
2. Verifique se o `appiumConfig` em `start_session` corresponde às configurações do servidor Appium
3. Certifique-se de que o firewall permite conexões na porta do Appium

### A Sessão Não Inicia

1. **Navegador:** Certifique-se de que o navegador de destino está instalado
2. **iOS:** Verifique se o Xcode e os simuladores estão disponíveis
3. **Android:** Verifique o `ANDROID_HOME` e se o emulador está em execução
4. Revise os logs do servidor Appium para mensagens de erro detalhadas

### Tempo Limite da Sessão

Se as sessões estiverem expirando durante a depuração:
1. Aumente o `newCommandTimeout` ao iniciar a sessão
2. Use `noReset: true` para preservar o estado entre sessões
3. Use `detach: true` ao fechar para manter o aplicativo em execução