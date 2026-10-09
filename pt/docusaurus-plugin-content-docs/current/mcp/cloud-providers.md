---
id: cloud-providers
title: Provedores de Nuvem
description: "Execute sessões de navegador e mobile do WebdriverIO MCP em farms de dispositivos na nuvem, incluindo credenciais, upload de apps, túneis e relatórios."
---

O servidor WebdriverIO MCP tem suporte nativo para executar sessões de automação de navegador e mobile em farms de dispositivos na nuvem. Nenhum driver local, emulador ou simulador é necessário. Quatro provedores são suportados:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (navegadores) e [App Automate](https://www.browserstack.com/app-automate) (aplicativos mobile)
- **Sauce Labs** — nuvem de dispositivos reais e navegadores virtuais da [Sauce Labs](https://saucelabs.com)
- **TestMu (anteriormente LambdaTest)** — nuvem de dispositivos reais e navegadores da [TestMu](https://www.lambdatest.com)
- **TestingBot** — nuvem de dispositivos reais e grid de navegadores da [TestingBot](https://testingbot.com)

Todos os quatro provedores compartilham o mesmo fluxo de trabalho: definir as credenciais, opcionalmente fazer upload de um aplicativo mobile e, em seguida, chamar `start_session` com o nome do provedor. Rótulos de relatório, configuração de túnel e ciclo de vida do aplicativo mobile são idênticos entre os provedores.

## Pré-requisitos

Defina suas credenciais como variáveis de ambiente antes de iniciar o servidor MCP:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| Provedor     | Variável de Usuário     | Variável de Chave de Acesso | Onde encontrar                                                          |
| ------------ | ----------------------- | --------------------------- | ----------------------------------------------------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY`   | [Configurações da conta](https://www.browserstack.com/accounts/settings) |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`          | [Configurações do usuário](https://app.saucelabs.com/user-settings)      |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`         | [Configurações da conta](https://accounts.lambdatest.com/detail/profile) |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`         | [Configurações da conta](https://testingbot.com/membership)              |

## Automação de Navegador

Execute uma sessão de navegador em qualquer provedor de nuvem definindo `provider` em `start_session`:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

Todos os provedores suportam `browser`: `"chrome"`, `"firefox"`, `"edge"`, `"safari"`. Se você omitir `os` / `osVersion`, o provedor usa padrões sensatos (normalmente o Linux mais recente para sessões de navegador).

### Regiões da Sauce Labs

A Sauce Labs suporta múltiplas regiões de data center. Defina o parâmetro `region` em `start_session`:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

Valores suportados: `"us-west-1"`, `"eu-central-1"` (padrão), `"apac-southeast-1"`.

## Automação de Aplicativos Mobile

O fluxo de trabalho mobile tem três etapas, idênticas em todos os provedores:

### Etapa 1: Faça upload do seu aplicativo

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

Cada um retorna uma referência do aplicativo que você usará em `start_session`:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

Opcionalmente, você pode definir um `customId` para ter referências estáveis entre uploads:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

Para a Sauce Labs, adicione `region` correspondente à sua região de armazenamento (padrão `"eu-central-1"`).

### Etapa 2: Liste os aplicativos disponíveis

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

Parâmetros opcionais para todos os provedores:
- `sortBy`: `"app_name"` ou `"uploaded_at"` (padrão)
- `limit`: número máximo de resultados (padrão 20)

A BrowserStack também suporta `organizationWide: true` para listar todos os uploads da organização. A Sauce Labs aceita `region`.

### Etapa 3: Inicie a sessão

Use a referência do aplicativo retornada por `upload_app`, ou um `customId`:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## Túnel Local

Todos os três provedores suportam um túnel local para que as sessões na nuvem possam acessar servidores na sua máquina (localhost, ambientes de staging, serviços internos).

O servidor MCP usa um **parâmetro `tunnel` unificado** que funciona de forma idêntica entre os provedores:

### Túnel gerenciado automaticamente (recomendado)

O servidor MCP inicia e encerra o túnel automaticamente:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

Antes da sua primeira sessão com `tunnel: true`, o servidor MCP cuida do download e da inicialização do binário do túnel. Se quiser verificar a configuração manualmente, leia o recurso local-binary do provedor:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

O túnel é encerrado automaticamente quando você fecha a sessão.

### Túnel externo

Se você já estiver executando o túnel em um processo separado:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` informa ao servidor MCP que um túnel já está em execução; ele define as flags de capability apropriadas, mas não inicia nem encerra nenhum processo. Defina `tunnelName` correspondente ao túnel em execução.

### Configuração manual do túnel

Se preferir executar o túnel manualmente, leia as instruções de configuração no recurso MCP do seu provedor e plataforma. Por exemplo:

```text
// Leia as instruções de configuração (a partir do seu cliente de IA)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

Cada recurso retorna a URL de download, comandos específicos da plataforma e instruções para execução como daemon.

## Relatórios

Marque as sessões com rótulos de projeto, build e sessão para o dashboard do provedor. Isso funciona de forma idêntica em todos os três provedores:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

As sessões aparecem no dashboard do provedor sob o projeto e o build especificados:
- BrowserStack: [Dashboard do Automate](https://automate.browserstack.com)
- Sauce Labs: [Resultados de testes](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Dashboard de automação](https://automation.lambdatest.com)
- TestingBot: [Resultados de testes](https://testingbot.com/members)

## Observações Específicas de Cada Provedor

### BrowserStack

- Sessões de navegador: `os` aceita `"Windows"` ou `"OS X"`. Versões do Windows: `"10"`, `"11"`. Versões do macOS: `"Ventura"`, `"Sonoma"`, `"Sequoia"`.
- API de gerenciamento de aplicativos: `organizationWide: true` em `list_apps` lista todos os uploads da equipe.

### Sauce Labs

- **As regiões importam.** A região padrão é `eu-central-1`. Se sua conta estiver em uma região diferente, defina `region` em `start_session`, `list_apps` e `upload_app` de forma correspondente.
- Sessões mobile suportam `automationName` (`"XCUITest"` ou `"UiAutomator2"`); os padrões são sensatos para cada plataforma.
- O túnel Sauce Connect é gerenciado automaticamente por meio do pacote npm `saucelabs`. Nenhum binário externo é necessário para `tunnel: true`.

### TestMu

- O nome do provedor é `"testmu"` em `start_session`, `list_apps` e `upload_app`.
- Sessões de navegador se conectam a `hub.lambdatest.com`; sessões mobile se conectam a `mobile-hub.lambdatest.com`; isso é tratado automaticamente.
- O túnel é gerenciado automaticamente por meio do pacote npm `@lambdatest/node-tunnel`.
- O gerenciamento de aplicativos mobile busca aplicativos Android e iOS por meio de chamadas de API separadas e, em seguida, mescla os resultados.

### TestingBot

- O nome do provedor é `"testingbot"` em `start_session`, `list_apps` e `upload_app`.
- Sessões de navegador e mobile se conectam a `hub.testingbot.com` na porta 443 (tratado automaticamente).
- As credenciais usam `TESTINGBOT_KEY` e `TESTINGBOT_SECRET` (e não um par usuário/chave de acesso como nos outros provedores).
- O túnel é gerenciado automaticamente por meio do pacote npm `testingbot-tunnel-launcher` (requer Java 11+).
- Não há parâmetro de região — o hub da TestingBot é global.
- O modo de navegador/emulador mobile é suportado: defina `platform: "android"` ou `"ios"` com um nome de `browser` (por exemplo, `"chrome"`) em vez de `app`.