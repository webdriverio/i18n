---
id: resources
title: Recursos
description: "Leia o estado da sessão ao vivo, o histórico de sessões e os detalhes de configuração de provedores de nuvem por meio dos recursos somente leitura wdio:// do servidor MCP do WebdriverIO."
---

Os recursos MCP fornecem acesso somente leitura ao estado da sessão ao vivo. Diferentemente das ferramentas, os recursos são obtidos pelo modelo de IA quando ele quiser; eles não executam ações. Todos os recursos usam o esquema de URI `wdio://`.

## Quando usar recursos vs ferramentas

- **Recursos** — estado ambiente que muda conforme você interage: elementos atuais, captura de tela, cookies, árvore de acessibilidade. Leia-os antes de agir para entender o que está na tela.
- **Ferramentas** — ações que alteram o estado: clicar, navegar, definir valor.

Prefira `wdio://session/current/elements` em vez de `get_screenshot` para descobrir elementos; ele retorna seletores prontos para uso e consome muito menos tokens.

## Histórico de Sessões

### `wdio://sessions`

Índice de todas as sessões de navegador e de aplicativo com metadados e contagem de etapas.

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

Log de etapas em JSON da sessão atualmente ativa. Contém todas as etapas de automação registradas com nomes de ferramentas, parâmetros e carimbos de data/hora.

---

### `wdio://session/current/code`

JavaScript do WebdriverIO gerado para a sessão atualmente ativa. Gerado automaticamente a partir das etapas registradas. Cole em um arquivo de teste do WebdriverIO para reproduzir a sessão.

---

### `wdio://session/{sessionId}/steps`

Log de etapas de uma sessão específica por ID. Template de URI — substitua `{sessionId}` pelo ID obtido em `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

JavaScript do WebdriverIO gerado para uma sessão específica por ID. Template de URI — substitua `{sessionId}` pelo ID obtido em `wdio://sessions`.

## Estado da Página ao Vivo (Sessão Atual)

### `wdio://session/current/elements`

Elementos interagíveis na página atual. Retorna seletores prontos para uso, texto dos elementos e informações de visibilidade.

**Este é o principal recurso para entender o que está na tela.** Leia-o antes de clicar ou digitar. É muito mais rápido e barato do que uma captura de tela.

Para filtragem avançada (somente viewport, contêineres, caixas delimitadoras, paginação), use a ferramenta `get_elements`.

---

### `wdio://session/current/accessibility`

Árvore de acessibilidade da página atual. Por padrão, retorna todos os nós com atributos de papel (role), nome, seletor e estado. Somente navegador. Em dispositivos móveis, use `wdio://session/current/elements`.

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

Para resultados filtrados (por papel, paginados), use a ferramenta `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

Captura de tela da página ou tela atual como imagem codificada em base64. Redimensionada automaticamente (máx. 2000px) e comprimida (máx. 1 MB).

Use para verificação visual ou depuração de layout. Para descobrir elementos, prefira `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

Todos os cookies da sessão atual do navegador.

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

Todas as abas do navegador abertas na sessão atual. Somente navegador.

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

Use antes de `switch_tab` para encontrar o handle ou índice de destino.

---

### `wdio://session/current/contexts`

Contextos de automação disponíveis (NATIVE_APP, WEBVIEW). Somente dispositivos móveis.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

Contexto de automação atualmente ativo. Somente dispositivos móveis.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

Estado do ciclo de vida do aplicativo para um determinado bundle ID. Somente dispositivos móveis. Template de URI — substitua `{bundleId}` por um bundle ID do iOS ou nome de pacote do Android.

Retorna um dos seguintes:
- `0` — não instalado
- `1` — não está em execução
- `2` — em execução em segundo plano (suspenso)
- `3` — em execução em segundo plano
- `4` — em execução em primeiro plano

Para uma saída nomeada, use a ferramenta `get_app_state`.

---

### `wdio://session/current/geolocation`

Substituição atual da geolocalização do dispositivo definida por `set_geolocation`.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

Logs da sessão atual. Retorna mensagens do console do navegador e exceções JavaScript (sessões Chromium), saída do logcat (Android) ou crash/syslog (iOS).

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

Capabilities brutas retornadas pelo servidor WebDriver ou Appium para a sessão atual. Use para depuração; mostra os valores reais que o driver aceitou, incluindo os padrões aplicados pelo provedor de nuvem ou pelo Appium.

## Provedores de Nuvem

### `wdio://browserstack/local-binary`

URL de download específica da plataforma e instruções de configuração do daemon para o binário BrowserStack Local. Leia isto antes de usar `tunnel: true` ou `tunnel: "external"` com `provider: "browserstack"`; contém os comandos exatos para seu sistema operacional e arquitetura.

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

URL de download específica da plataforma e instruções de configuração do daemon para o Sauce Connect Proxy. Leia isto antes de usar `tunnel: "external"` com `provider: "saucelabs"`; para `tunnel: true`, o SDK gerencia o Sauce Connect automaticamente.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

URL de download específica da plataforma e instruções de configuração do daemon para o TestMu Tunnel. Necessário apenas para `tunnel: "external"` com `provider: "testmu"` — para `tunnel: true`, o SDK gerencia o túnel automaticamente via `@lambdatest/node-tunnel`.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

URL de download e instruções de configuração do daemon para o TestingBot Tunnel. O túnel é um JAR Java multiplataforma (requer Java 11+). Necessário apenas para `tunnel: "external"` com `provider: "testingbot"` — para `tunnel: true`, o SDK gerencia o túnel automaticamente via `testingbot-tunnel-launcher`.

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```