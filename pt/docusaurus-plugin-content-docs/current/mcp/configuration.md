---
id: configuration
title: Configuração
---

Esta página documenta todas as opções de configuração para o servidor WebdriverIO MCP.

## Configuração do Servidor MCP

O servidor MCP é configurado através dos arquivos de configuração do Claude Desktop ou Claude Code.

### Configuração Básica

#### macOS

Edite `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

#### Windows

Edite `%APPDATA%\Claude\claude_desktop_config.json`:

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

#### Claude Code

Edite o arquivo `.claude/settings.json` do seu projeto:

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

---

## Variáveis de Ambiente

Configure a conexão do servidor Appium e outras configurações via variáveis de ambiente.

### Conexão com Appium

| Variável | Tipo | Padrão | Descrição |
|----------|------|---------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Nome do host do servidor Appium |
| `APPIUM_URL_PORT` | number | `4723` | Porta do servidor Appium |
| `APPIUM_PATH` | string | `/` | Caminho do servidor Appium |

### Exemplo com Variáveis de Ambiente

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724",
                "APPIUM_PATH": "/wd/hub"
            }
        }
    }
}
```

---

## Opções de Sessão do Navegador

Opções disponíveis ao iniciar uma sessão de navegador via ferramenta `start_browser`.

### `headless`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`

Executar o Chrome em modo headless (sem janela visível do navegador). Útil para ambientes CI/CD ou quando você não precisa ver o navegador.

### `windowWidth`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `1920`
-   **Intervalo:** `400` - `3840`

Largura inicial da janela do navegador em pixels.

### `windowHeight`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `1080`
-   **Intervalo:** `400` - `2160`

Altura inicial da janela do navegador em pixels.

### `navigationUrl`

-   **Tipo:** `string`
-   **Obrigatório:** Não

URL para navegar imediatamente após iniciar o navegador. Isso é mais eficiente do que chamar `start_browser` seguido por `navigate` separadamente.

**Exemplo:** Iniciar navegador e navegar em uma chamada:
```
Start Chrome and navigate to https://webdriver.io
```

---

## Opções de Sessão Mobile

Opções disponíveis ao iniciar uma sessão de aplicativo móvel via ferramenta `start_app_session`.

### Opções de Plataforma

#### `platform`

-   **Tipo:** `string`
-   **Obrigatório:** Sim
-   **Valores:** `iOS` | `Android`

A plataforma móvel a ser automatizada.

#### `platformVersion`

-   **Tipo:** `string`
-   **Obrigatório:** Não

A versão do sistema operacional do dispositivo/simulador/emulador (por exemplo, `17.0` para iOS, `14` para Android).

#### `automationName`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Valores:** `XCUITest` (iOS), `UiAutomator2` | `Espresso` (Android)

O driver de automação a ser usado. O padrão é `XCUITest` para iOS e `UiAutomator2` para Android.

### Opções de Dispositivo

#### `deviceName`

-   **Tipo:** `string`
-   **Obrigatório:** Sim

Nome do dispositivo, simulador ou emulador a ser usado.

**Exemplos:**
-   Simulador iOS: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Emulador Android: `Pixel 7`, `Nexus 5X`
-   Dispositivo Real: O nome do dispositivo como mostrado no seu sistema

#### `udid`

-   **Tipo:** `string`
-   **Obrigatório:** Não (Obrigatório para dispositivos iOS reais)

Identificador Único de Dispositivo. Obrigatório para dispositivos iOS reais (identificador de 40 caracteres) e recomendado para dispositivos reais Android.

**Como encontrar o UDID:**
-   **iOS:** Conecte o dispositivo, abra o Finder/iTunes, clique no dispositivo → Número de Série (clique para revelar o UDID)
-   **Android:** Execute `adb devices` no terminal

### Opções de Aplicativo

#### `appPath`

-   **Tipo:** `string`
-   **Obrigatório:** Não*

Caminho para o arquivo do aplicativo a ser instalado e iniciado.

**Formatos suportados:**
-   Simulador iOS: diretório `.app`
-   Dispositivo iOS real: arquivo `.ipa`
-   Android: arquivo `.apk`

*Ou o `appPath` deve ser fornecido, ou `noReset: true` para conectar a um aplicativo já em execução.

#### `appWaitActivity`

-   **Tipo:** `string`
-   **Obrigatório:** Não (Apenas Android)

Activity para aguardar na inicialização do app. Se não for especificado, a activity principal/inicial do app é usada.

**Exemplo:** `com.example.app.MainActivity`

### Opções de Estado da Sessão

#### `noReset`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`

Preservar o estado do aplicativo entre sessões. Quando `true`:
-   Os dados do aplicativo são preservados (estado de login, preferências, etc.)
-   A sessão irá **desanexar** em vez de fechar (mantém o aplicativo em execução)
-   Útil para testar jornadas de usuário em múltiplas sessões
-   Pode ser usado sem `appPath` para conectar a um aplicativo já em execução

#### `fullReset`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`

Redefinir completamente o aplicativo antes da sessão. Quando `true`:
-   iOS: Desinstala e reinstala o aplicativo
-   Android: Limpa os dados e cache do aplicativo
-   Útil para começar com um estado limpo

Defina `fullReset: false` com `noReset: true` para preservar completamente o estado do aplicativo.

### Timeout da Sessão

#### `newCommandTimeout`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `60`

Quanto tempo (em segundos) o Appium aguardará por um novo comando antes de assumir que o cliente saiu e encerrar a sessão. Aumente esse valor para sessões de depuração mais longas.

**Exemplos:**
-   `60` - Padrão, adequado para a maioria das automações
-   `300` - 5 minutos, para depuração ou operações mais lentas
-   `600` - 10 minutos, para testes de longa duração

### Opções de Tratamento Automático

#### `autoGrantPermissions`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`

Conceder automaticamente permissões ao aplicativo na instalação/inicialização. Quando `true`:
-   Permissões de câmera, microfone, localização, etc. são concedidas automaticamente
-   Não é necessário tratamento manual de diálogos de permissão
-   Simplifica a automação evitando pop-ups de permissão

:::note Apenas Android
Esta opção afeta principalmente o Android. As permissões do iOS devem ser tratadas de forma diferente devido às restrições do sistema.
:::

#### `autoAcceptAlerts`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`

Aceitar automaticamente alertas do sistema (diálogos) que aparecem durante a automação.

**Exemplos de alertas aceitos automaticamente:**
-   "Permitir notificações?"
-   "O aplicativo gostaria de acessar sua localização"
-   "Permitir que o aplicativo acesse fotos?"

#### `autoDismissAlerts`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`

Dispensar (cancelar) alertas do sistema em vez de aceitá-los. Tem precedência sobre `autoAcceptAlerts` quando definido como `true`.

### Substituição do Servidor Appium

Você pode substituir a conexão do servidor Appium em uma sessão específica:

#### `appiumHost`

-   **Tipo:** `string`
-   **Obrigatório:** Não

Nome do host do servidor Appium. Substitui a variável de ambiente `APPIUM_URL`.

#### `appiumPort`

-   **Tipo:** `number`
-   **Obrigatório:** Não

Porta do servidor Appium. Substitui a variável de ambiente `APPIUM_URL_PORT`.

#### `appiumPath`

-   **Tipo:** `string`
-   **Obrigatório:** Não

Caminho do servidor Appium. Substitui a variável de ambiente `APPIUM_PATH`.

---

## Opções de Detecção de Elementos

Opções para a ferramenta `get_visible_elements`.

### `elementType`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `interactable`
-   **Valores:** `interactable` | `visual` | `all`

Tipo de elementos a retornar:
-   `interactable`: Botões, links, entradas e outros elementos clicáveis
-   `visual`: Imagens, SVGs e elementos visuais
-   `all`: Elementos interativos e visuais

### `inViewportOnly`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`

Retorna apenas elementos visíveis na viewport atual. Quando `false`, retorna todos os elementos na hierarquia de visualização (útil para encontrar elementos fora da tela).

### `includeContainers`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`

Incluir elementos de contêiner/layout nos resultados. Quando `true`:

**Contêineres Android incluídos:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**Contêineres iOS incluídos:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

Útil para depurar problemas de layout ou entender a hierarquia de visualização.

### `includeBounds`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`

Incluir limites/coordenadas do elemento (x, y, largura, altura) na resposta. Defina como `true` para:
-   Interações baseadas em coordenadas
-   Depuração de layout
-   Posicionamento de elementos visuais

### Opções de Paginação

Para páginas grandes com muitos elementos, use a paginação para reduzir o uso de tokens:

#### `limit`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `0` (ilimitado)

Número máximo de elementos a retornar.

#### `offset`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `0`

Número de elementos a pular antes de retornar resultados.

**Exemplo:** Obter elementos 21-40:
```
Get visible elements with limit 20 and offset 20
```

---

## Opções da Árvore de Acessibilidade

Opções para a ferramenta `get_accessibility` (apenas navegador).

### `limit`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `100`

Número máximo de nós a retornar. Use `0` para ilimitado (não recomendado para páginas grandes).

### `offset`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `0`

Número de nós a pular para paginação.

### `roles`

-   **Tipo:** `string[]`
-   **Obrigatório:** Não
-   **Padrão:** Todas as funções

Filtrar para funções de acessibilidade específicas.

**Funções comuns:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Exemplo:** Obter apenas botões e links:
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`

Retornar apenas nós que têm um nome/rótulo. Filtra contêineres anônimos e reduz o ruído nos resultados.

---

## Opções de Screenshot

Opções para a ferramenta `take_screenshot`.

### `outputPath`

-   **Tipo:** `string`
-   **Obrigatório:** Não

Caminho onde salvar o arquivo de screenshot. Se não for fornecido, retorna os dados da imagem codificados em base64.

### Otimização Automática

Os screenshots são automaticamente processados para otimizar o consumo pelo LLM:

| Otimização | Valor | Descrição |
|--------------|-------|-------------|
| Dimensão máxima | 2000px | Imagens maiores que 2000px são redimensionadas |
| Tamanho máximo do arquivo | 1MB | As imagens são comprimidas para ficar abaixo de 1MB |
| Formato | PNG/JPEG | PNG com compressão máxima; JPEG se necessário para tamanho |

Essa otimização garante que os screenshots possam ser processados eficientemente sem exceder os limites de token.

---

## Comportamento da Sessão

### Tipos de Sessão

O servidor MCP rastreia tipos de sessão para fornecer ferramentas e comportamento apropriados:

| Tipo | Descrição | Auto-Detach |
|------|-------------|-------------|
| `browser` | Sessão do navegador Chrome | Não |
| `ios` | Sessão de aplicativo iOS | Sim (se `noReset: true` ou sem `appPath`) |
| `android` | Sessão de aplicativo Android | Sim (se `noReset: true` ou sem `appPath`) |

### Modelo de Sessão Única

O servidor MCP opera com um **modelo de sessão única**:

-   Apenas uma sessão de navegador OU aplicativo pode estar ativa por vez
-   Iniciar uma nova sessão fechará/desanexará a sessão atual
-   O estado da sessão é mantido globalmente em todas as chamadas de ferramenta

### Detach vs Close

| Ação | `detach: false` (Close) | `detach: true` (Detach) |
|--------|-------------------------|-------------------------|
| Navegador | Fecha o Chrome completamente | Mantém o Chrome em execução, desconecta o WebDriver |
| Aplicativo Móvel | Termina o aplicativo | Mantém o aplicativo em execução no estado atual |
| Caso de Uso | Começar do zero na próxima sessão | Preservar o estado, inspeção manual |

---

## Considerações de Desempenho

O servidor MCP é otimizado para comunicação eficiente com LLM usando o formato **TOON (Token-Oriented Object Notation)**, que minimiza o uso de tokens ao enviar dados para o Claude.

### Automação de Navegador

-   O **modo headless** é mais rápido, mas não renderiza elementos visuais
-   **Tamanhos de janela menores** reduzem o tempo de captura de screenshot
-   A **detecção de elementos** é otimizada com uma única execução de script
-   A **otimização de screenshot** mantém as imagens abaixo de 1MB para processamento eficiente
-   **`inViewportOnly: true`** (padrão) filtra apenas para elementos visíveis

### Automação Mobile

-   O **parsing do código fonte XML** usa apenas 2 chamadas HTTP (vs 600+ para consultas tradicionais de elementos)
-   Os **seletores de ID de acessibilidade** são os mais rápidos e confiáveis
-   Os **seletores XPath** são os mais lentos - use apenas como último recurso
-   **`inViewportOnly: true`** (padrão) reduz significativamente a contagem de elementos
-   A **paginação** (`limit` e `offset`) reduz o uso de tokens para telas com muitos elementos
-   **`includeBounds: false`** (padrão) omite dados de coordenadas, a menos que seja necessário

### Dicas de Uso de Token

| Configuração | Impacto |
|---------|--------|
| `inViewportOnly: true` | Filtra elementos fora da tela, reduzindo o tamanho da resposta |
| `includeContainers: false` | Exclui elementos de layout (ViewGroup, etc.) |
| `includeBounds: false` | Omite dados de x/y/largura/altura |
| `limit` com paginação | Processa elementos em lotes em vez de todos de uma vez |
| `namedOnly: true` (acessibilidade) | Filtra nós anônimos |

---

## Configuração do Servidor Appium

Antes de usar a automação móvel, certifique-se de que o Appium esteja configurado corretamente.

### Configuração Básica

```sh
# Instalar Appium globalmente
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

# Iniciar com caminho base específico
appium --base-path /wd/hub
```

### Verificar Instalação

```sh
# Verificar drivers instalados
appium driver list --installed

# Verificar versão do Appium
appium --version

# Testar conexão
curl http://localhost:4723/status
```

---

## Solução de Problemas de Configuração

### Servidor MCP Não Inicia

1. Verifique se npm/npx está instalado: `npm --version`
2. Tente executar manualmente: `npx @wdio/mcp`
3. Verifique os logs do Claude Desktop para erros

### Problemas de Conexão com Appium

1. Verifique se o Appium está em execução: `curl http://localhost:4723/status`
2. Verifique se as variáveis de ambiente correspondem às configurações do servidor Appium
3. Certifique-se de que o firewall permite conexões na porta do Appium

### Sessão Não Inicia

1. **Navegador:** Certifique-se de que o Chrome está instalado
2. **iOS:** Verifique se o Xcode e os simuladores estão disponíveis
3. **Android:** Verifique `ANDROID_HOME` e se o emulador está em execução
4. Revise os logs do servidor Appium para mensagens de erro detalhadas

### Timeouts de Sessão

Se as sessões estiverem expirando durante a depuração:
1. Aumente `newCommandTimeout` ao iniciar a sessão
2. Use `noReset: true` para preservar o estado entre as sessões
3. Use `detach: true` ao fechar para manter o aplicativo em execução