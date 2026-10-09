---
id: nightwatch
title: Nightwatch DevTools
description: "Adicione a interface de depuração do DevTools a uma suíte de testes Nightwatch sem alterar os testes e configure screencasts, captura BiDi e o modo trace."
---

Adaptador Nightwatch para o [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - traz a mesma interface visual de depuração para a sua suíte de testes Nightwatch, sem nenhuma alteração no código dos testes.

## Instalação

```bash
npm install @wdio/nightwatch-devtools
```

## Configuração

### Nightwatch padrão (estilo mocha)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Necessário para a captura de requisições de rede
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Execute seus testes normalmente - a interface do DevTools é aberta automaticamente em uma nova janela do navegador:

```bash
nightwatch
```

> Nenhuma alteração nos seus arquivos de teste é necessária.

### Cucumber / BDD

Importe `cucumberHooksPath` junto com a exportação principal e passe-o para a opção `require` do Cucumber. Isso registra hooks de cenário `Before` / `After` que espelham o comportamento de `beforeScenario` / `afterScenario` do serviço do WebdriverIO.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- registra os hooks do DevTools para o Cucumber
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## Opções de configuração

| Opção | Tipo | Padrão | Descrição |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Porta do servidor backend do DevTools. Incrementada automaticamente se já estiver em uso. |
| `hostname` | `string` | `'localhost'` | Hostname ao qual o servidor backend se vincula. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Gravação de vídeo `.webm` por sessão. Veja [Screencast](#screencast) abaixo. |
| `bidi` | `boolean` | `false` | Ativa a captura via WebDriver BiDi para console do navegador + exceções JS + rede. Requer `webSocketUrl: true` nas suas capabilities e um chromedriver com suporte a BiDi. Quando conectado, o caminho de rede via perf-log do Chrome por comando é desativado para que as requisições não se dupliquem. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` abre a interface do DevTools; `trace` a ignora e grava um artefato portátil. Veja [Modo Trace](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Layout do artefato de trace. Aplica-se apenas quando `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Um trace por sessão / arquivo de spec / teste. `'test'` grava cada um em `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Aplica-se apenas quando `mode: 'trace'`. Veja [Modo Trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Ressalva:** a interface BDD `describe/it` se reduz a uma única fatia com escopo de sessão (veja [Fatiamento por teste](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quais traces manter. Combina com `traceGranularity: 'test'`. Aplica-se apenas quando `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Grava no trace um filmstrip de screencast denso e contínuo para reprodução navegável no trace player — não apenas um quadro por ação. Executa o gravador de screencast (modo polling no Nightwatch) durante a sessão. Aplica-se apenas quando `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot por teste. Apenas modo trace + `traceGranularity: 'test'`. **Somente produção** — o PNG é gravado no diretório de saída do trace (e no manifesto quando `emitArtifactsManifest: true`); não é anexado inline ao Allure (veja a nota abaixo). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Fatia de vídeo por teste, mantida conforme a política informada (ex.: `'retain-on-failure'`). Apenas modo trace + `traceGranularity: 'test'`. Um valor diferente de `off` inicia o próprio gravador de screencast — você **não** precisa também de `filmstrip` ou `screencast.enabled`. **Somente produção** — o `.webm` é gravado no diretório de saída do trace (e no manifesto quando `emitArtifactsManifest: true`); não é anexado inline ao Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Grava o manifesto `devtools-artifacts-<sessionId>.json` (o índice genérico que reporters/CI consomem para descobrir os artefatos produzidos) ao lado do trace. **Opcional (opt-in) no Nightwatch** — não há sinal ativo do Allure para detecção automática, então, diferente do WDIO/Selenium, ele nunca é ativado automaticamente. Aplica-se apenas quando `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Captura asserções como linhas de ação do trace — `node:assert` além dos nativos `browser.assert`/`browser.verify`, incluindo matchers negados `.not.*`. Defina `false` para desativar. |

> **O anexo inline ao Allure não é suportado no Nightwatch.** Seu reporter oficial `nightwatch-allure` é post-hoc (sem API de anexo em tempo real), e o `attachment()` do `allure-js-commons` não faz nada em uma execução do Nightwatch. Assim, os artefatos de `screenshot` / `video` são *produzidos* (arquivos, além do manifesto de artefatos quando `emitArtifactsManifest: true`) no diretório de saída do trace, mas não são anexados a um teste do Allure. O fatiamento por teste — e, portanto, esses artefatos — faz sentido para as interfaces Cucumber e exports-object; a interface BDD `describe/it` se reduz à granularidade de sessão, então o controle por teste não tem efeito nela.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Grave um vídeo `.webm` contínuo da sessão do navegador. A gravação começa na primeira sessão detectada pelo plugin e é finalizada no hook `after()` do Nightwatch.

**Somente modo polling.** O Nightwatch não expõe uma porta de acesso estável ao CDP como o WebdriverIO (`browser.getPuppeteer()`) e o Selenium (`driver.createCDPConnection`), então o screencast captura quadros chamando `browser.takeScreenshot()` em um intervalo fixo. Funciona em todos os navegadores suportados pelo Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Opção | Tipo | Padrão | Observações |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Chave principal. |
| `pollIntervalMs` | `number` | `200` | Intervalo entre screenshots (ms). Menor = vídeo mais suave, mais round-trips do WebDriver. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Formato de pixel por quadro entregue ao codificador ffmpeg antes do mux final do `.webm`. No modo polling, as screenshots de origem são sempre capturadas como PNG, então isso **não** altera a captura - apenas o formato que o codificador recebe por quadro. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Opções exclusivas do CDP, ignoradas no modo polling. Listadas para compatibilidade de formato com os adaptadores WDIO/Selenium. |

**Pré-requisitos:** `fluent-ffmpeg` (já é uma dependência de runtime do pacote) e o binário `ffmpeg` no PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Sem o ffmpeg, o gravador ainda é executado, mas a etapa de codificação registra um aviso e não grava o arquivo.

**Saída:** o arquivo de vídeo é gravado ao lado do arquivo de teste que acabou de ser executado (com o diretório do `nightwatch.conf.*` como alternativa e, em último caso, `process.cwd()`). O caminho completo aparece na linha de log do Nightwatch `📹 Screencast video: <path>` e o vídeo também é transmitido para a aba Screencast do painel.

Para a referência completa do recurso de screencast (suporte a navegadores, caminhos de saída nos três adaptadores), veja a [página de Screencast](/docs/devtools/wdio/screencast).

## Captura BiDi (opt-in)

Ative a captura via WebDriver BiDi para mensagens do console do navegador, exceções JS e requisições de rede. Equivalente ao caminho usado pelo selenium-devtools - ambos os adaptadores compartilham a mesma lógica de conexão em `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Você também precisa de `webSocketUrl: true` nas suas capabilities para que o chromedriver realmente exponha o canal BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← habilita o BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Quando o BiDi está conectado, o caminho de captura de rede via performance-log do Chrome por comando é desativado para que as requisições não apareçam duas vezes no painel. Se `webSocketUrl` estiver ausente ou a versão do chromedriver não expuser o BiDi, a conexão falha silenciosamente e o fallback via perf-log continua funcionando.

## Modo trace

Caminho de captura headless — nenhuma janela da interface do DevTools é aberta. Ao final da sessão, o adaptador grava um `trace-<sessionId>.zip` (ou diretório) portátil em uma pasta `test-results/` (ao lado do diretório de teste / configuração resolvido), com o mesmo formato do artefato de trace do WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opcional; padrão 'zip'
})
```

### Granularidade e Cucumber

`traceGranularity` define o que um artefato abrange — `'session'` (padrão), `'spec'` ou `'test'`.

O Nightwatch encerra o navegador após cada cenário do Cucumber. Um trace `'session'` abrange tudo isso: um zip para toda a execução, com cada cenário aninhado sob sua feature. `'test'` grava um zip por cenário em sua própria pasta, o que é a recomendação para Cucumber — artefatos menores e a granularidade na qual a retenção do `tracePolicy` se baseia.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // um trace por cenário do Cucumber
})
```

Na interface BDD `describe/it`, `'test'` se reduz a uma única fatia com escopo de sessão: o Nightwatch executa cada `it()` internamente e dispara o hook por teste do plugin apenas uma vez por módulo. A árvore de ações ainda mostra cada `it` como seu próprio grupo.

O bind de porta do backend, a janela da interface e a opção `screencast` são ignorados no modo trace. Para a referência completa do recurso (conteúdo do artefato, visualizador, testes mobile, quando escolher `zip` ou `ndjson-directory`), veja a [página do Modo Trace](/docs/devtools/wdio/trace-mode).

O Nightwatch compartilha o mesmo pipeline de trace dos adaptadores WebdriverIO e Selenium, então o formato do artefato é idêntico independentemente de qual adaptador o produziu. Um trace do Nightwatch contém a captura completa por ação — uma screenshot, o snapshot da árvore de acessibilidade com indentação por profundidade, a lista de elementos interagíveis e a transcrição em Markdown — então ele abre no player `show-trace` com viagem no tempo de DOM/snapshot, as abas **A11y** e **Transcript**, a sobreposição de elementos do pick-locator e (para Cucumber) o aninhamento **Feature → Scenario → Step**.

Abra um trace com o binário `show-trace`, distribuído com `@wdio/nightwatch-devtools` (sem dependência extra):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # em um projeto que instala o adaptador
pnpm show-trace test-results/trace-<sessionId>.zip  # a partir do monorepo do devtools
```

Veja a página do [Trace Player](/docs/devtools/trace-player) para o passo a passo completo e os atalhos de teclado.

### Fatiamento por teste e a ressalva do BDD `describe/it`

As opções por teste — `traceGranularity: 'test'` e as opções `tracePolicy`, `screenshot` e `video` que a acompanham — precisam de um hook por teste para recortar a fatia de cada teste. As interfaces **exports-object (estilo mocha)** e **Cucumber** (hooks por cenário) expõem esse hook, portanto têm fatiamento real por teste. A interface **BDD `describe/it`** é a exceção: o Nightwatch executa cada `it()` internamente e dispara o hook por teste do plugin apenas uma vez por módulo, então `traceGranularity: 'test'` se reduz a uma única fatia **com escopo de sessão** associada ao primeiro teste. O manifesto de artefatos ainda lista cada caso de teste com seu estado correto; apenas a associação de fatias/artefatos por teste é reduzida. Traces com granularidade de sessão e de spec não são afetados.

## Exemplos

Exemplos funcionais estão no diretório `examples/` na raiz do repositório. Faça o build do workspace uma vez (`pnpm install && pnpm build`) e então execute a partir da raiz do repositório:

| Diretório | Runner | Comando |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch estilo mocha | `pnpm demo:nightwatch` |

## Recursos

O adaptador Nightwatch oferece a mesma experiência de interface do DevTools que o WebdriverIO. Todos os recursos abaixo são capturados automaticamente com a configuração básica `globals: nightwatchDevtools({ port: 3000 })` — sem configuração por recurso (os logs de rede também precisam de `'goog:loggingPrefs': { performance: 'ALL' }`, mostrado em [Configuração](#setup)). Os links levam à referência completa de cada recurso.

- **[Reexecução e visualização interativa de testes](/docs/devtools/wdio/interactive-test-rerunning)** - Pré-visualizações do navegador em tempo real, screenshots por comando e reexecução de testes/suítes com um clique
- **[Preservar e reexecutar (Comparar)](/docs/devtools/wdio/preserve-and-rerun)** - Faça um snapshot de um teste com falha, reexecute-o e compare as duas execuções lado a lado
- **[Suporte a múltiplos frameworks](/docs/devtools/wdio/multi-framework-support)** - Runners padrão (estilo mocha) e Cucumber/BDD
- **[Logs do console](/docs/devtools/wdio/console-logs)** - Capture e inspecione a saída do console do navegador (em tempo real com `bidi: true`)
- **[Logs de rede](/docs/devtools/wdio/network-logs)** - Monitore chamadas de API e atividade de rede
- **[Metadados](/docs/devtools/wdio/metadata)** - Capabilities da sessão, ambiente e tempos por sessão do navegador
- **[TestLens](/docs/devtools/wdio/testlens)** - Vá de qualquer comando para a linha de código que o disparou
- **[Screencast da sessão](/docs/devtools/wdio/screencast)** - Gravação contínua em `.webm` da sessão do navegador
- **[Modo Trace](/docs/devtools/wdio/trace-mode)** - Captura headless que produz um `trace.zip` portátil (sem janela de interface)

O screencast é o único recurso com opções próprias (lista completa em [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Limitações

O Nightwatch não oferece a mesma profundidade de hooks de framework que o WebdriverIO, então há algumas diferenças em relação ao serviço WDIO DevTools:

| Limitação | Detalhe |
|-----------|--------|
| Sem hooks nativos de comando | O Nightwatch não tem hook `beforeCommand` / `afterCommand`. Em vez disso, os comandos são interceptados por meio de um wrapper de proxy do browser. |
| Contexto de teste limitado | `browser.currentTest` fornece menos metadados do que o contexto do runner do WDIO; nomes de testes e caminhos de arquivos exigem heurísticas adicionais. |
| Aninhamento de suítes plano | O Nightwatch não suporta nativamente blocos `describe` com múltiplos níveis de aninhamento; o plugin reporta no máximo dois níveis. |
| Disponibilidade tardia dos resultados | Os resultados dos testes só são finalizados no `afterEach`, não estando disponíveis durante o teste. |
| Screencast apenas em modo polling | Diferente do WDIO (push via CDP com `browser.getPuppeteer()`) e do Selenium (push via CDP com `driver.createCDPConnection`), o Nightwatch não tem uma porta de acesso estável ao CDP, então os quadros são capturados por polling de `browser.takeScreenshot()`. Funciona em todos os navegadores suportados pelo Nightwatch; pequeno custo por quadro proporcional ao intervalo de polling. |
| Fatiamento de trace por teste (BDD `describe/it`) | A interface BDD dispara o hook por teste do plugin uma vez por módulo, então `traceGranularity: 'test'` se reduz a uma fatia com escopo de sessão. As interfaces exports-object (estilo mocha) e Cucumber têm fatiamento real por teste. Veja [Fatiamento por teste](#per-test-slicing--the-bdd-describeit-caveat). |
| Artefatos de trace somente produzidos | Os arquivos de `screenshot` / `video` por teste são gravados no diretório de saída do trace (e no manifesto quando `emitArtifactsManifest: true`), mas não são anexados inline ao Allure — o Nightwatch não tem API de anexo em tempo real do Allure. |

A paridade geral de recursos com o serviço WebdriverIO DevTools é de aproximadamente **80-90%**.