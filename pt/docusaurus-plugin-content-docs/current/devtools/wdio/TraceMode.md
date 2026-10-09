---
id: trace-mode
title: Modo Trace
description: "Capture artefatos de trace em modo headless com o modo trace do DevTools e configure formato, granularidade, retenção, capturas de tela, vídeo e asserções."
---

Caminho de captura headless — nenhuma janela da UI do DevTools é aberta. Ao final da sessão, o adaptador grava os artefatos de trace em uma pasta `test-results/` ao lado do diretório da sua spec / config. Para as granularidades `session` / `spec`, isso é um `trace-<sessionId>.zip` (ou um diretório `trace-<sessionId>/`); para a granularidade `test`, cada teste recebe sua própria subpasta (veja [Granularidade do trace](#trace-granularity--tracegranularity)). O artefato é portátil e inclui tudo o que é necessário para replay offline, comparação por agentes de IA ou qualquer consumidor que prefira um arquivo a uma UI ao vivo.

O modo trace é **mutuamente exclusivo com o modo live**. Escolha um por sessão: humanos depurando interativamente querem o live; agentes comparando execuções ou bots de CI coletando artefatos querem o trace.

## Habilitar

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

Uma config de referência completa, pronta para copiar e colar, está disponível em [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts).

Selenium e Nightwatch incluem o mesmo pipeline de trace — veja as páginas de seus adaptadores para a sintaxe de habilitação específica de cada framework: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## O que há dentro do artefato

| Arquivo | Conteúdo |
|---|---|
| `trace.trace` | NDJSON `context-options` + eventos de ação `before` / `after`; uma linha por registro |
| `trace.network` | Entradas de rede no estilo HAR, uma por linha |
| `transcript.md` | Resumo em Markdown legível por humanos/LLMs com tempos, seletores e anotações de valores |
| `resources/page@<id>-<ts>.jpeg` | Captura de tela tirada a cada ação voltada ao usuário |
| `resources/page@<id>-<ts>-elements.json` | Lista plana de elementos interativos naquela ação |
| `resources/page@<id>-<ts>-snapshot.txt` | Snapshot da árvore de acessibilidade indentado por profundidade (amigável para IA) |

### O que conta como uma "ação"

Os comandos são filtrados por uma allow-list antes de produzirem entradas no trace. Exemplos que aparecem no trace:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

Comandos internos como `findElement`, `waitUntil`, `executeScript` são deliberadamente excluídos — eles não representam intenção voltada ao usuário e poluiriam a linha do tempo. A allow-list completa está em [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts).

## Formato de saída — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (padrão) — um único arquivo compactado em `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — os mesmos arquivos descompactados em `test-results/trace-<sessionId>/`. Uma etapa de descompactação a menos para consumidores automatizados ou agênticos que queiram fazer grep / stream do NDJSON diretamente.

Ambos os formatos abrem no [player `show-trace`](/docs/devtools/trace-player) oficial e em outros visualizadores de trace compatíveis.

## Granularidade do trace — `traceGranularity`

Quantos artefatos de trace uma execução produz:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| Valor | Saída |
|---|---|
| `session` (padrão) | Um trace por worker/sessão — `test-results/trace-<sessionId>.zip`. |
| `spec` | Um trace por arquivo de spec. Menor e mais fácil de navegar. |
| `test` | Um trace **por teste**, cada um em sua própria pasta: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Para a granularidade `test`, o nome da pasta é formado pelo nome base da spec, um slug do título do teste, o navegador e um sufixo `-retry<N>` nas tentativas repetidas — por exemplo, `test-results/login_e2e-logs-in-chrome/trace.zip`, com uma primeira repetição em `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Traces por teste são os mais navegáveis e combinam melhor com uma política de retenção, para que apenas os traces que importam sejam gravados.

## Retenção — `tracePolicy`

Por padrão, todo trace é mantido (`'on'`). Para manter apenas os interessantes — ideal com `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Política | Mantém o trace quando… |
|---|---|
| `'on'` (padrão) | Sempre — todo trace é gravado. |
| `'retain-on-failure'` | A tentativa **final** do teste falhou. Uma sequência de repetição falha-depois-passa termina como `passed`, então *não* é mantida — você não retém em excesso um teste instável que acabou ficando verde. |
| `'retain-on-first-failure'` | A **tentativa 0** falhou, independentemente de uma repetição posterior ter passado. |
| `'on-first-retry'` | O teste foi repetido pelo menos uma vez (existe uma tentativa 1). |
| `'on-all-retries'` | Existe qualquer tentativa repetida (tentativa ≥ 1). |
| `'retain-on-failure-and-retries'` | A tentativa final falhou **ou** o teste foi repetido. |

Uma fatia não retida é descartada e nunca gravada em disco. As políticas sensíveis a repetições se baseiam em um **registro de resultados** por tentativa que o adaptador mantém para cada id de teste estável entre repetições, de modo que `retain-on-failure` e `retain-on-first-failure` avaliam a tentativa correta. Quando um runner não expõe informações de repetição por tentativa, todas as políticas, exceto `retain-on-failure`, degradam para `retain-on-failure`; uma execução sem resultados observados (por exemplo, um script standalone simples) falha de forma **aberta** e mantém o trace, em vez de arriscar descartar um de que você precise.

> A retenção sensível a repetições é verificada de ponta a ponta para **WebdriverIO** (mocha / cucumber) e **Selenium** (mocha). Para **Nightwatch**, `retain-on-failure` funciona, mas as outras políticas sensíveis a repetições degradam para ela, porque o `--retries` do Nightwatch reexecuta um testcase internamente sem disparar novamente os hooks por teste. O `specFileRetries` entre processos do WDIO também fica fora do registro (por worker). Veja a [página do adaptador Nightwatch](/docs/devtools/nightwatch#trace-mode) para os detalhes.

## Filmstrip denso — `filmstrip`

**Por padrão**, o trace grava um screencast **denso e contínuo** para que o player ofereça uma reprodução suave ao navegar, em vez de pular de quadro em quadro. Os quadros densos ficam ao lado dos quadros por ação (que carregam os snapshots do DOM). Defina `filmstrip: false` para gravar apenas um quadro por ação — um trace menor, sem gravador contínuo:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- Os quadros densos são adicionados **ao lado** dos quadros por ação (que carregam os snapshots do DOM), então nenhum dado do DOM é perdido — quando há quadros densos, eles substituem o filmstrip esparso por ação para navegação.
- Os quadros são reduzidos na exportação (≥100 ms de intervalo) e endereçados por conteúdo, de modo que quadros idênticos (uma espera estática) são colapsados em um único recurso. O buffer da sessão ao vivo é limitado por `screencast.maxBufferFrames` (padrão 2000).
- A gravação usa o gravador de screencast — push via CDP no Chrome/Chromium, polling de capturas de tela nos demais. Em navegadores que não são Chrome, o polling emite muitos comandos `takeScreenshot`; combine com a opção de silenciamento de etapas do seu reporter (veja [Integração com Allure](/docs/devtools/allure)).

`filmstrip` está disponível nos três adaptadores (WebdriverIO / Selenium / Nightwatch).

## Captura de tela e vídeo por teste — `screenshot` / `video`

Com `traceGranularity: 'test'`, cada teste também pode produzir uma captura de tela independente e/ou uma fatia de vídeo por teste, espelhando a ergonomia familiar de captura de tela/vídeo em caso de falha:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| Opção | Valores | Comportamento |
|---|---|---|
| `screenshot` | `'off'` (padrão) · `'on'` · `'only-on-failure'` | `'on'` captura após cada teste; `'only-on-failure'` apenas após um teste com falha. PNG. |
| `video` | `'off'` (padrão) · qualquer valor de `tracePolicy` | Grava o screencast continuamente e mantém a fatia de cada teste conforme a mesma semântica de retenção de `tracePolicy`. WebM. Definir um valor diferente de `off` inicia o gravador por conta própria — você não precisa também de `filmstrip` ou `screencast.enabled`. |

Ambas são restritas ao modo trace + `traceGranularity: 'test'` (o escopo por teste ao qual se vinculam). Em granularidades mais amplas, elas não têm efeito.

- **WebdriverIO** — `screenshot` / `video` são opções do service; anexadas inline ao Allure quando `@wdio/allure-reporter` está presente.
- **Selenium** — as mesmas opções em seu `DevToolsOptions`; anexadas inline ao Allure via `allure-js-commons` quando um adaptador de runner do Allure está ativo.
- **Nightwatch** — **apenas produção**: os arquivos são gravados no diretório de saída do trace (e listados no manifesto), mas não são anexados inline ao Allure — o Nightwatch não tem uma API de anexação ao vivo do Allure. Veja [Limitações do Modo Trace](/docs/devtools/limitations).

> `screencast.enabled` é a gravação `.webm` contínua separada do **modo live** e é ignorada no modo trace. No modo trace, use `filmstrip` (quadros densos no trace) ou `video` por teste; os campos de ajuste do screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) continuam se aplicando a qualquer gravador que esteja em execução.

## Manifesto de artefatos — `emitArtifactsManifest`

Grava um `devtools-artifacts-<sessionId>.json` ao lado do trace — um índice genérico que reporters e CI consomem para descobrir os artefatos produzidos (todo trace / captura de tela / vídeo, além do estado de cada teste):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Desativado por padrão.** Ele é **ativado automaticamente** quando um reporter do Allure é detectado — o `@wdio/allure-reporter` do WebdriverIO na config, ou um runtime `allure-js-commons` ativo do Selenium.
- **No Nightwatch é opt-in**: ele não tem um sinal ao vivo do Allure para detecção automática (`nightwatch-allure` é post-hoc), então nunca é ativado automaticamente — defina-o explicitamente se quiser o manifesto.

## Asserções — `captureAssertions`

As asserções aparecem como linhas de ação de primeira classe no trace (ativado por padrão; defina `captureAssertions: false` para desativar):

- **`node:assert`** — capturado nos três adaptadores como linhas `assert.<method>`.
- **`expect` do WebdriverIO** — matchers `expect(...)` que passam *e* que falham (`expect($el).toHaveText(...)`, `toBeExisting()`, …) aparecem como linhas `expect.<matcher>` contendo o valor esperado, a localização no código-fonte do elemento e um snapshot; os comandos internos de polling do matcher são suprimidos para que apenas a asserção apareça.
- **`browser.assert.*` / `browser.verify.*` do Nightwatch** — asserções nativas aparecem como linhas `assert.<m>` / `verify.<m>`.

Asserções que passam são exibidas em verde; as que falham são exibidas em vermelho com a mensagem de erro.

## Testes mobile

O modo trace detecta sessões mobile via `platformName: 'android' | 'ios'` (sem diferenciar maiúsculas de minúsculas) e se ajusta:

- **Web mobile** (Chrome no Android, Safari no iOS): o mesmo pipeline de snapshot baseado em DOM do desktop.
- **Mobile nativo**: os scripts de DOM injetados na página são desativados; `getPageSource()` é usado para obter a árvore XML do Appium, que alimenta o serializador de snapshot no lugar.

O `context-options` do trace registra `title: 'android — <deviceName>'` / `'ios — <deviceName>'` para que o visualizador rotule os quadros corretamente. Uma config WDIO de referência para Chrome no Android via Appium está disponível em [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts).

## Visualizando o artefato

Abra um trace no **[Trace Player](/docs/devtools/trace-player)** oficial — a UI do WebdriverIO DevTools em um modo de player dedicado e somente leitura:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

O player oferece viagem no tempo pelo DOM, a aba A11y e o overlay de seleção de localizador, a aba Transcript com Copy-for-LLM, as abas Errors / Console / Network / Source do painel e uma linha do tempo navegável. O mesmo `.zip` portátil também abre em outros visualizadores de trace independentes e dentro do visualizador embutido de um relatório Allure. Veja a página do **[Trace Player](/docs/devtools/trace-player)** para o passo a passo completo, recursos e atalhos de teclado.

## Saiba mais
O bin `show-trace` incluído em cada adaptador abre o mesmo arquivo no player do DevTools, que adicionalmente expõe uma **aba A11y**: a árvore de acessibilidade capturada por ação, onde clicar em uma linha copia o localizador daquele elemento.

Esses localizadores são escritos no dialeto do próprio runner que fez a gravação, então podem ser colados diretamente no framework que produziu o trace. Um elemento identificado apenas pelo seu texto é `a*=Logout` no WebdriverIO e `//a[contains(., "Logout")]` no Selenium — com a legenda da chamada que o resolve, `By.xpath()`. O Nightwatch prefere um localizador CSS nativo como `button[type="submit"]`, porque é o único runner que lê uma string de seletor simples sob uma estratégia CSS padrão, e recorre ao XPath (com a legenda `useXpath()` / `locateStrategy: 'xpath'`) apenas quando não existe um localizador CSS único. Todos os outros localizadores são CSS portátil.

Para consumo por LLMs / agentes, leia `transcript.md` diretamente — é uma renderização em Markdown concisa das ações com seletores e valores.

- **[Trace Player](/docs/devtools/trace-player)** — o passo a passo completo do player `show-trace`, recursos e atalhos de teclado.
- **[Integração com Allure](/docs/devtools/allure)** — como os artefatos de trace / captura de tela / vídeo são anexados a um relatório Allure.
- **[Suporte Multi-Framework](/docs/devtools/cross-framework)** — a matriz de capacidades por adaptador (WebdriverIO / Selenium / Nightwatch).
- **[Limitações do Modo Trace](/docs/devtools/limitations)** — o que o modo trace ignora e as lacunas conhecidas por adaptador.
- **[Referência de Configuração](/docs/devtools/reference)** — todas as opções em um só lugar.