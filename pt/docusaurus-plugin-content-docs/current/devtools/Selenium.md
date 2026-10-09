---
id: selenium
title: Selenium DevTools
description: "Adicione a interface de depuração do DevTools a testes Selenium WebDriver em Node.js ou Python com qualquer test runner e ative o modo trace."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adaptador Selenium WebDriver para o [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - traz a mesma interface visual de depuração para qualquer teste Selenium, em **Node.js** ou **Python**, independentemente do test runner.

O Node.js funciona com **Mocha**, **Jest**, **Cucumber** ou um script simples - o plugin detecta automaticamente o runner e conecta os limites dos testes de acordo. O Python funciona com **pytest** ou um script simples e, no pytest, não exige nenhuma alteração nos seus arquivos de teste.

Escolha sua linguagem nas abas abaixo; a escolha acompanha você pelo resto da página.

## Instalação

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Requer Python 3.10+ e `selenium>=4.44`.** Ambos estão declarados nos metadados do pacote, então o pip os impõe em vez de deixar você descobrir uma aba Network vazia em tempo de execução. A captura de rede se inscreve por meio da API pública de eventos BiDi que o selenium regenerou na 4.44; a conexão privada que ela substituiu foi removida na mesma versão, e é a 4.44 que define o requisito mínimo do Python.

</TabItem>
</Tabs>

## Configuração inicial

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Cada bloco abaixo é um **exemplo completo, pronto para copiar e colar**, incluindo a chamada `DevTools.configure(...)`. Escolha o runner que você usa, coloque o trecho no seu projeto e execute.

### Mocha

```js
// tests/example.test.js
import { strict as assert } from 'node:assert'
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com and reads the heading', async function () {
    await driver.get('https://example.com')
    const heading = await driver.wait(until.elementLocated(By.css('h1')), 10000)
    assert.equal(await heading.getText(), 'Example Domain')
  })
})
```

Execute:

```bash
mocha --timeout 60000 tests/example.test.js
```

> Alternativa: dispense o import em cada arquivo e use `mocha --require @wdio/selenium-devtools` para carregar o plugin uma única vez para toda a execução.

### Jest

```js
// test/example.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('login flow', () => {
  let driver

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  }, 60000)

  afterEach(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  test('logs in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login')
    await driver.findElement(By.id('username')).sendKeys('tomsmith')
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!')
    await driver.findElement(By.css('button[type="submit"]')).click()

    await driver.wait(until.urlContains('/secure'), 10000)
    const flash = await driver.findElement(By.id('flash'))
    expect(await flash.getText()).toMatch(/You logged into a secure area/i)
  }, 60000)
})
```

`jest.config.json`:

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

Execute (ESM requer a flag experimental):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

A estrutura dividida do Cucumber significa três arquivos pequenos - um para carregar o plugin, um para World/hooks e um para as definições de steps.

`features/support/setup.js` - carregue o plugin e configure uma vez:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - ciclo de vida do driver:

```js
import {
  setWorldConstructor,
  World,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'

setDefaultTimeout(60000)

class CustomWorld extends World {
  constructor (options) {
    super(options)
    this.driver = null
  }
}

setWorldConstructor(CustomWorld)

Before(async function () {
  this.driver = await new Builder().forBrowser('chrome').build()
})

After(async function () {
  if (this.driver) {
    await this.driver.quit()
    this.driver = null
  }
})
```

`cucumber.json` - conecte o arquivo de setup **primeiro**, para que o plugin modifique o Selenium antes que qualquer step seja executado:

```json
{
  "default": {
    "import": [
      "features/support/setup.js",
      "features/support/world.js",
      "features/support/steps.js"
    ],
    "paths": ["features/*.feature"],
    "format": ["progress"]
  }
}
```

Execute:

```bash
cucumber-js --config cucumber.json
```

### Script Node simples (sem test runner)

Se você executa `node tests/google.test.js` diretamente, não há runner no qual o plugin possa se conectar automaticamente. Por padrão, você obtém uma única linha "Selenium Session" no dashboard. Para obter um limite de teste nomeado, chame `DevTools.startTest` / `endTest` em torno do seu código:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // opcional - dá nome à linha do teste

  const driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.google.com')
    const searchBox = await driver.findElement(By.name('q'))
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.ENTER)
    await driver.wait(until.titleContains('Selenium'), 10000)
    DevTools.endTest('passed')
  } catch (err) {
    DevTools.endTest('failed')
    throw err
  } finally {
    await driver.quit()
  }
}

run()
```

```bash
node tests/google.test.js
```

> Use `startTest` / `endTest` apenas em scripts Node simples. No Mocha / Jest / Cucumber, o plugin já sabe quando cada teste começa e termina - chamá-los manualmente criaria linhas duplicadas.

</TabItem>
<TabItem value="python" label="Python">

### pytest

Nada precisa ir nos seus arquivos de teste - o plugin é descoberto automaticamente, e uma flag o ativa para a execução:

```bash
pytest --devtools tests/              # dashboard ao vivo
pytest --devtools-trace tests/        # grava um arquivo de trace em vez disso (implica --devtools)
```

Ou faça commit da escolha, para que ninguém precise se lembrar da flag:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # arquivo de trace em vez de um dashboard
# devtools_trace_granularity = "test"            # ... um arquivo por teste
# devtools_trace_policy = "retain-on-failure"    # ... mantendo apenas o que falhou
```

Um `pytest.ini` com uma seção `[pytest]` aceita as mesmas chaves. As duas configurações de trace são abordadas em [Quantos arquivos e quais manter](#how-many-archives-and-which-ones-to-keep).

A captura é sempre opcional (opt-in) - instalar o pacote nunca deve alterar o comportamento de uma suíte existente. O que muda é apenas *como* você diz sim:

| Como você ativa | Escopo |
|---|---|
| `--devtools` / `--devtools-trace` | esta execução |
| `devtools` / `devtools_trace` em `[tool.pytest.ini_options]` | este projeto |
| `DEVTOOLS_ENABLE=1` (ou `DEVTOOLS_PORT=<n>`, que também se conecta a um dashboard já em execução) | este shell - para CI |

O de maior precedência vence: CLI, depois ini, depois ambiente. `pytest -o devtools=false` desativa um padrão do projeto para uma única execução, e é por isso que não existe `--no-devtools`. `DEVTOOLS_TRACE=1` escolhe o modo trace, mas **não** ativa a captura por si só, então exportá-lo para seus próprios scripts nunca captura uma execução do pytest que você não pediu.

No modo ao vivo, o dashboard abre em uma janela de navegador dedicada e **permanece aberto após a execução** para que você possa inspecionar o que aconteceu; feche-o (ou use `Ctrl-C`) para finalizar. Dois tipos de execução ficam sem captura mesmo quando você ativa: `--collect-only`, em que nada é executado, e uma execução que não coletou nenhum teste - caso contrário, um caminho digitado errado deixaria seu terminal parado em um dashboard vazio.

### Script Python simples (sem test runner)

Duas linhas em torno do seu código Selenium existente:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # abre o dashboard, captura todos os comandos
# devtools.enable(trace=True)         # ou: grava um trace.zip e não abre nenhuma janela

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # mantém a UI aberta para inspeção (não faz nada quando nenhuma janela está aberta)
devtools.disable()
```

Se o backend não puder ser iniciado ou alcançado, `enable()` registra um aviso e retorna `None`. A captura é ignorada e seus testes continuam rodando - a ausência do dashboard nunca faz uma suíte falhar.

### Execuções paralelas (`pytest -n`)

**O pytest-xdist funciona sem configuração extra.** Todo processo que reporta para uma mesma execução precisa concordar sobre um run id, caso contrário o backend trata cada conexão como uma nova execução e apaga o que a anterior capturou. Com o xdist eles concordam: o plugin também é carregado no **controller**, e ativar a captura ali resolve o id antes que o xdist crie qualquer worker - os workers são processos filhos, então o herdam.

O que de fato aparece como execuções separadas: duas invocações independentes de `pytest`, ou um worker iniciado sem o ambiente. Exporte `DEVTOOLS_RUN_ID` você mesmo para unir esses processos em uma única execução.

</TabItem>
</Tabs>

## Opções de configuração {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Opção | Tipo | Padrão | Descrição |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Porta do servidor backend do DevTools. Incrementada automaticamente se já estiver em uso. |
| `hostname` | `string` | `'localhost'` | Hostname ao qual o servidor backend se vincula. |
| `openUi` | `boolean` | `true` | Abre automaticamente a UI do DevTools em uma nova janela do Chrome. Defina `false` para CI. |
| `captureScreenshots` | `boolean` | `true` | Captura um screenshot após cada comando WebDriver. |
| `headless` | `boolean` | `false` | Executa o navegador de **teste** em modo headless (injeta `--headless=old`). A janela da UI do DevTools não é afetada. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Gravação de vídeo `.webm` por sessão. As opções correspondem às da página [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Template de comando para reexecutar cada teste. `{{testName}}` é substituído. Derivado automaticamente do argv do runner se omitido. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` abre a UI do DevTools; `trace` a ignora e grava um artefato portátil em vez disso. Veja [Trace Mode](/docs/devtools/wdio/trace-mode). Sobrescreve `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Formato do artefato de trace. Aplica-se apenas quando `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Um trace por sessão / arquivo de spec / teste. `'test'` grava cada um em `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Aplica-se apenas quando `mode: 'trace'`. Veja [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quais traces manter. Combina com `traceGranularity: 'test'`. Aplica-se apenas quando `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Grava um screencast denso e contínuo no trace para navegação quadro a quadro no player. Aplica-se apenas quando `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Modo trace + `traceGranularity: 'test'`. Screenshot por teste, anexado inline ao Allure (`image/png`) via `allure-js-commons` quando um adaptador de runner do Allure está ativo. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Modo trace + `traceGranularity: 'test'`. Vídeo de screencast por teste, mantido conforme a política informada, anexado inline ao Allure (`video/webm`) via `allure-js-commons` quando um adaptador de runner do Allure está ativo. |
| `emitArtifactsManifest` | `boolean` | auto | Grava o manifesto `devtools-artifacts-<sessionId>.json` — o índice genérico que reporters/CI consomem para descobrir os artefatos produzidos — ao lado do trace. Desativado por padrão; **ativa-se automaticamente** quando um runtime `allure-js-commons` está ativo. Somente modo trace. |
| `captureAssertions` | `boolean` | `true` | Captura asserções de `node:assert` (tanto as que passam quanto as que falham) como linhas de ação do trace. Defina `false` para desativar. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **Para CI**, defina tanto `headless: true` (oculta o navegador de teste) quanto `openUi: false` (não tenta abrir a janela do dashboard - ambientes de CI não têm display). O backend continua rodando na porta configurada, para que você ainda possa abrir a UI depois, se necessário.

</TabItem>
<TabItem value="python" label="Python">

Não há objeto de opções - nada específico do devtools precisa aparecer no seu código de teste. No pytest, você configura o adaptador do mesmo jeito que configura o pytest; um script passa argumentos nomeados para `enable()`; tudo o que não tem flag é uma variável de ambiente.

| Flag do pytest | `[tool.pytest.ini_options]` | Efeito |
|---|---|---|
| `--devtools` | `devtools = true` | Captura esta execução e abre o dashboard. |
| `--devtools-trace` | `devtools_trace = true` | Captura esta execução e grava um arquivo de trace em vez de abrir um dashboard. Implica `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Um arquivo para toda a execução (`session`, o padrão) ou um por teste. Implica `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Quais arquivos vale a pena manter. Implica `--devtools-trace`. Veja [Quantos arquivos e quais manter](#how-many-archives-and-which-ones-to-keep). |

O de maior precedência vence: CLI, depois ini, depois o ambiente abaixo. `pytest -o devtools=false` desativa um padrão do projeto para uma execução, e `pytest -o devtools_trace_policy=on` faz o mesmo para qualquer uma das outras.

| Variável | Efeito |
|---|---|
| `DEVTOOLS_ENABLE=1` | Ativa a captura, quando nenhuma flag ou opção ini já o fez. |
| `DEVTOOLS_PORT=<n>` | Conecta-se a um dashboard que já está escutando nesta porta; também ativa a captura. |
| `DEVTOOLS_HOST=<host>` | Host pelo qual o dashboard é acessado (padrão `localhost`). |
| `DEVTOOLS_TRACE=1` | Grava um arquivo de trace em vez de abrir um dashboard. Seleciona o modo para um script simples; no pytest, não ativa a execução por si só. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Modo trace: um arquivo para toda a execução ou um por teste. É ambiente, então nunca seleciona o modo trace por si só - combine com `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Modo trace: quais arquivos vale a pena manter. É ambiente, então nunca seleciona o modo trace por si só - combine com `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Modo trace: deixa o filmstrip denso fora do arquivo. |
| `DEVTOOLS_A11Y=0` | Modo trace: ignora a árvore de A11y e os retângulos de elementos por ação. |
| `DEVTOOLS_OPEN=0` | Não abre a janela do dashboard (CI). |
| `DEVTOOLS_BIDI=0` | Desativa o BiDi e, com ele, a captura de console e rede. |
| `DEVTOOLS_RUN_ID=<id>` | Une vários processos em uma única execução. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Inicia o backend com um comando explícito em vez do resolvido. |

O backend é uma aplicação Node, então **o Node.js 22.19 ou posterior precisa estar disponível em todos os modos** - inclusive no modo trace, em que nenhuma janela de dashboard é aberta. Não se trata apenas da UI: o coletor da página é servido pelo backend, todo o fluxo de eventos trafega pelo seu WebSocket e, no modo trace, é ele também que constrói o arquivo. `enable()` verifica o Node logo de início e indica o que está faltando, em vez de falhar depois com um timeout de spawn. O adaptador encontra ou inicia o backend para você - veja [executando o backend separadamente](/docs/devtools/dashboard#running-the-backend-on-its-own) se preferir gerenciá-lo você mesmo, ou aponte `DEVTOOLS_PORT` para um que você já esteja executando; nesse caso, nenhum Node local é necessário.

### Asserções

Instruções `assert` que passam e que falham aparecem como linhas contendo **expected** e **actual**, e as falhas chegam à aba Errors. O `assert` do Python é uma instrução e não uma chamada, então, diferentemente do patch de `node:assert` do adaptador Node, não há nada para envolver - o resultado vem do runner.

**No pytest**, os valores vêm do assertion rewriter, então toda linha traz operandos reais. Capturar asserções *que passam* exige o `enable_assertion_pass_hook` do pytest, que o plugin ativa por conta própria. Uma ressalva: o pytest decide por módulo, *enquanto o reescreve*, se deve emitir esse hook, então um módulo cujo bytecode reescrito foi armazenado em cache antes da instalação do plugin continua reportando apenas falhas. O adaptador avisa isso uma vez durante a coleta e indica o cache a ser excluído - que **nem sempre** é o `__pycache__` ao lado dos seus testes, já que `sys.pycache_prefix` (definido por padrão no Python do sistema do macOS) envia todos os módulos reescritos para uma árvore central.

**Em um script simples** não há rewriter, então os resultados vêm dos eventos de linha do interpretador e os valores são lidos do frame prestes a executar o assert. Apenas leituras que não podem executar seu código são resolvidas: um literal ou uma variável local é resolvido, um atributo ou uma chamada não, porque avaliar `driver.current_url` uma segunda vez emitiria outro comando WebDriver.

</TabItem>
</Tabs>

## Modo trace {#trace-mode}

Caminho de captura headless, nas **duas linguagens** - nenhuma janela da UI do DevTools é aberta, e a execução grava um arquivo de trace portátil em uma pasta `test-results/`, com o mesmo formato do artefato de trace do WebdriverIO. As duas diferem apenas em quanto do artefato você pode ajustar e em quem o constrói.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Ao final da sessão, o próprio adaptador grava `trace-<sessionId>.zip` (ou um diretório) em `test-results/`, ao lado do diretório de teste / configuração resolvido.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opcional; padrão 'zip'
})
```

O bind de porta do backend, a janela da UI e a opção `screencast` são todos ignorados no modo trace. Para a referência completa de funcionalidades (conteúdo do artefato, visualizador, testes mobile, quando escolher `zip` vs `ndjson-directory`), veja a [página Trace Mode](/docs/devtools/wdio/trace-mode).

### Artefatos por teste e retenção

Com `traceGranularity: 'test'`, cada teste ganha sua própria pasta de artefatos, e `tracePolicy` decide quais são mantidos (por exemplo, `retain-on-failure`). Nesse modo você também pode capturar um `screenshot` (PNG) e um `video` (`.webm`) por teste, e ativar um `filmstrip` denso gravado no trace para navegação quadro a quadro. Quando um adaptador de runner `allure-js-commons` está ativo, os traces / screenshots / vídeos por teste são anexados inline ao relatório do Allure (e `emitArtifactsManifest` é ativado automaticamente); caso contrário, eles são gravados em `test-results/` e registrados no manifesto.

```js
DevTools.configure({
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure',
  filmstrip: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
})
```

</TabItem>
<TabItem value="python" label="Python">

Não há objeto de opções para definir - uma flag no pytest, um argumento nomeado em um script:

```bash
pytest --devtools-trace tests/        # implica --devtools
DEVTOOLS_TRACE=1 python3 login.py     # script simples; o mesmo que devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # grava um trace.zip em vez de abrir um dashboard
```

O arquivo vai para `test-results/` ao lado do arquivo de teste de onde veio o primeiro comando capturado - o mesmo diretório em que os vídeos de screencast já são gravados - com o nome `trace-<sessionId>.zip`, ou com o nome de cada teste quando você pede [um arquivo por teste](#how-many-archives-and-which-ones-to-keep). Quando nenhum comando trouxe uma localização de código-fonte sua, ele recorre a `test-results/` no diretório atual.

**Nenhuma janela de dashboard é aberta.** O artefato é a saída, e uma execução ao vivo fica bloqueada na janela até você fechá-la - uma janela transformaria a gravação de um arquivo em uma sessão interativa. O backend ainda é iniciado, porque é ele que *constrói* o arquivo: as transformações de trace são em TypeScript, então uma execução Python pede ao backend que as faça em vez de distribuir uma segunda cópia delas. Essa é a única diferença em relação ao modo trace sem backend do adaptador Node.js, e o motivo pelo qual [o Node.js 22.19 ou posterior é necessário em todos os modos](#configuration-options).

Além das linhas de comando, screenshots e seletores por comando, console e rede que ambos os modos capturam, o arquivo contém:

| No arquivo | Padrão | Desativar |
|---|---|---|
| DOM time-travel - o fluxo de mutações que o player reproduz passo a passo | ativado | - |
| Filmstrip denso - os quadros do screencast, incluídos no trace em vez de um `.webm` | ativado | `DEVTOOLS_FILMSTRIP=0` |
| Árvore de A11y e overlay de elementos - lidos junto a cada ação, ao custo de duas viagens extras por comando | ativado | `DEVTOOLS_A11Y=0` |

O modo trace não codifica nenhum `.webm`, então não precisa de `ffmpeg` - os quadros *são* o filmstrip.

**A exportação é solicitada quando a execução termina, não quando o processo encerra** - o pytest a solicita em `sessionfinish` e o `disable()` de um script exporta antes de fechar o transporte, então o CI recebe o artefato independentemente de alguma janela ter estado envolvida.

### Quantos arquivos e quais manter {#how-many-archives-and-which-ones-to-keep}

Duas configurações decidem isso, e nenhuma delas tem significado fora do modo trace.

**Granularidade** - quantos arquivos a execução grava:

| `--devtools-trace-granularity` | Resultado |
|---|---|
| `session` (padrão) | Um arquivo para toda a execução. |
| `test` | Um arquivo por teste, cada um contendo apenas os comandos, console, rede, mutações de DOM, árvores de a11y e quadros de screencast daquele teste. |

Propositalmente não há um valor `spec` aqui. A spec deste adaptador *é* o seu arquivo de teste, então um terceiro nome só poderia significar, silenciosamente, um dos dois acima.

**Política** - quais desses arquivos são mantidos:

| `--devtools-trace-policy` | Resultado |
|---|---|
| `on` (padrão) | Mantém tudo. |
| `retain-on-failure` | Mantém apenas o que falhou. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Aceitos, mas hoje se comportam **exatamente como `retain-on-failure`**. |

Esses quatro últimos ainda não consideram retentativas, e vale dizer isso claramente em vez de você descobrir a partir de um arquivo que esperava: nada do que este adaptador envia carrega um número de tentativa, então um teste reexecutado sobrescreve seu próprio resultado anterior e a questão das retentativas simplesmente não pode ser avaliada. O backend registra essa degradação em vez de fingir o contrário. Escolha um deles apenas se quiser `retain-on-failure` sob um nome que terá mais significado no futuro.

Os dois se combinam:

| Granularidade | Política | O que você obtém |
|---|---|---|
| `test` | `retain-on-failure` | Apenas os testes que falharam. |
| `session` | `retain-on-failure` | O arquivo da execução inteira, se algo nela falhou. |
| qualquer | `on` | Tudo. |

Cada arquivo mantido na granularidade `test` recebe o nome do seu teste (`trace-<test>-<hash>.zip`, com o hash obtido do nodeid do teste, para que dois casos parametrizados com o mesmo título não se sobrescrevam). Uma execução que não mantém nada não grava nada, e esse é justamente o objetivo - os arquivos que sobram são os que valem a pena abrir, e uma exportação recusada é a política funcionando, não uma falha.

Defina-as para uma execução:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

Ou faça commit delas, para que um colaborador que clonar o projeto capture da mesma forma sem precisar ser avisado:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` no `pyproject.toml` aceita as mesmas chaves, e `pytest -o devtools_trace_policy=on tests/` sobrescreve uma delas para uma única execução sem editar o arquivo. Uma versão totalmente comentada - todas as configurações e todas as variáveis de ambiente, com a finalidade de cada uma - está no repositório em [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

Um script simples passa as mesmas duas como argumentos nomeados:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Informar qualquer uma delas explicitamente seleciona o modo trace.** A flag da CLI, a opção ini e o argumento de `enable()` implicam esse modo, já que uma política ou uma granularidade não significa nada no modo ao vivo, e respeitá-las sem o modo descartaria silenciosamente o que você pediu. `DEVTOOLS_TRACE_POLICY` e `DEVTOOLS_TRACE_GRANULARITY` propositalmente **não** o fazem: uma variável exportada é ambiente e pode ter sido definida para outro script no mesmo shell, então mudar uma execução ao vivo para o modo trace com base nisso tiraria o dashboard que ninguém pediu para perder - combine-as com `DEVTOOLS_TRACE=1`. Uma execução que acaba ignorando uma configuração de trace exportada registra um aviso, em vez de deixar você perceber um arquivo que nunca apareceu.

</TabItem>
</Tabs>

### Visualizando o trace

Abra qualquer trace `.zip` no player oficial — a mesma UI do DevTools em um modo **player** dedicado:

```bash
npx show-trace path/to/trace.zip      # em um projeto que instala o adaptador
pnpm show-trace path/to/trace.zip     # a partir do monorepo do devtools
```

O binário `show-trace` vem com `@wdio/selenium-devtools`, então está disponível em qualquer projeto que o instale — sem dependência extra. Um projeto Python não instala nenhum adaptador Node.js, mas o mesmo player vem com o backend que o adaptador já busca para você: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Como o adaptador Selenium captura o **fluxo de mutações do DOM** da página e um snapshot de elemento / acessibilidade por comando junto a cada screenshot, um trace Selenium aproveita todo o conjunto de funcionalidades do player — DOM time-travel, a aba A11y e o overlay de seleção de locator, a aba Transcript com Copy-for-LLM, o aninhamento Feature → Scenario → Step do Cucumber e a linha do tempo navegável. Um trace Python contém o mesmo fluxo de mutações e snapshot por ação (a leitura de elemento / a11y existe apenas no modo trace nesse caso, e é ativada por padrão); o aninhamento Gherkin é o único item sem equivalente no pytest.

O trace usa um esquema NDJSON portátil, então o mesmo `.zip` (ou diretório) também abre em outros visualizadores de trace compatíveis. Veja a página **[Trace Player](/docs/devtools/trace-player)** para o passo a passo completo.

## API pública

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // define as opções de runtime (veja acima)
DevTools.startTest(name, meta?)      // marca um limite de teste nomeado (apenas scripts Node simples)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

No Mocha / Jest / Cucumber, o plugin se conecta automaticamente ao ciclo de vida do runner, então você não precisa chamar `startTest` / `endTest` manualmente - chamá-los criaria linhas duplicadas.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # conecta e instrumenta; idempotente
devtools.disable()                    # encerra; seguro chamar duas vezes
devtools.wait_for_dashboard_close()   # bloqueia até a janela ser fechada
devtools.get_capturer()               # o SessionCapturer ativo, ou None
devtools.dashboard_url()              # a URL em que o dashboard é servido
```

`enable()` aceita `host` e `port` opcionais, além de argumentos nomeados:

```python
devtools.enable(trace=True)                            # grava um trace.zip; não abre janela
devtools.enable(trace=True, filmstrip=False)           # ... sem o filmstrip denso
devtools.enable(trace=True, a11y=False)                # ... sem a leitura de elemento / a11y por ação
devtools.enable(trace_granularity='test')              # ... um arquivo por teste (implica trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... mantém apenas o que falhou (implica trace=True)
```

`filmstrip` e `a11y` se aplicam apenas ao modo trace, e cada um é ativado por padrão (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` definem o mesmo a partir do ambiente). `trace` recorre a `DEVTOOLS_TRACE`. `trace_granularity` e `trace_policy` recorrem a `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`, e passar qualquer um deles ativa o modo trace por si só - veja [Quantos arquivos e quais manter](#how-many-archives-and-which-ones-to-keep). Um valor fora do conjunto aceito gera um aviso e recorre ao padrão, em vez de ser descoberto depois como um arquivo ausente.

No pytest, o plugin controla tudo isso a partir de `--devtools` / `--devtools-trace` (ou da opção ini correspondente, ou de `DEVTOOLS_ENABLE=1`), e os limites dos testes vêm dos próprios hooks do pytest - não há equivalente de `startTest` / `endTest` para chamar.

</TabItem>
</Tabs>

## Exemplos

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Exemplos funcionais ficam no diretório `examples/` na raiz do repositório. Faça o build do workspace uma vez (`pnpm install && pnpm build`) e então execute a partir da raiz do repositório. `pnpm demo:selenium` executa o exemplo padrão (Cucumber); as variantes por runner são:

| Diretório | Runner | Comando |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Os exemplos em Python ficam em [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Instale o adaptador e faça o build do workspace uma vez (`pnpm install && pnpm build`, para que o backend exista), e então execute a partir da raiz do repositório:

| Exemplo | O que mostra | Comando |
|---|---|---|
| `web_form.py` | A configuração de script simples em três linhas | `pnpm demo:python` |
| `login.py` | Um script mais longo: navegação, preenchimento de formulário, asserções | `pnpm demo:python:login` |
| `trace-py-test/` | pytest com uma classe e um teste em nível de módulo, além de um `pytest.ini` que fixa modo trace, granularidade e retenção - cada configuração nele é comentada com o que faz | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Funcionalidades

O adaptador Selenium oferece a mesma experiência de UI do DevTools que o WebdriverIO, nas duas linguagens. Todas as funcionalidades abaixo são capturadas automaticamente, sem configuração por funcionalidade — o `DevTools.configure({})` básico no Node.js, ou `pytest --devtools` no Python. Console e rede são transmitidos pelos handlers BiDi do Selenium, com um fallback de coletor injetado no Node.js. Os links levam à referência completa de cada funcionalidade.

- **[Reexecução e visualização interativa de testes](/docs/devtools/wdio/interactive-test-rerunning)** - Pré-visualizações do navegador ao vivo, screenshots por comando e reexecução de testes/suítes com um clique
- **[Preservar e reexecutar (Comparar)](/docs/devtools/wdio/preserve-and-rerun)** - Faça um snapshot de um teste com falha, reexecute-o e compare as duas execuções lado a lado
- **[Suporte a múltiplos frameworks](/docs/devtools/wdio/multi-framework-support)** - Detecta automaticamente Mocha, Jest, Cucumber ou um script simples no Node.js; pytest ou um script simples no Python
- **[Logs do console](/docs/devtools/wdio/console-logs)** - Capture e inspecione a saída do console do navegador
- **[Logs de rede](/docs/devtools/wdio/network-logs)** - Monitore chamadas de API e a atividade de rede
- **[Metadados](/docs/devtools/wdio/metadata)** - Capabilities da sessão, ambiente e tempos por sessão do navegador
- **[TestLens](/docs/devtools/wdio/testlens)** - Vá de qualquer comando até a linha do código-fonte que o disparou
- **[Screencast da sessão](/docs/devtools/wdio/screencast)** - Gravação automática de vídeo das sessões do navegador
- **[Modo trace](/docs/devtools/wdio/trace-mode)** - Captura headless que produz um `trace.zip` portátil (sem janela de UI), nas duas linguagens, com divisão por teste e retenção em ambas (`traceGranularity` / `tracePolicy` no Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` no Python). `screenshot` / `video` por teste e o anexo inline no Allure continuam exclusivos do Node.js; veja [Modo trace](#trace-mode)

No Node.js, o screencast é a única funcionalidade com opções próprias (veja [Opções de configuração](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

No Python, ele não precisa de configuração: o Chrome transmite quadros via CDP, outros navegadores recorrem a um screenshot por comando, e a codificação do `.webm` exige `ffmpeg` no `PATH`. No modo trace, os mesmos quadros se tornam o filmstrip denso do arquivo em vez de um `.webm`, então nada é codificado e o `ffmpeg` não é necessário.

## Como funciona

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

O plugin modifica os prototypes `Builder`, `WebDriver` e `WebElement` do `selenium-webdriver` no momento do import:

- **`Builder.build()`** - após a construção, o driver é registrado no capturador de sessão e o backend do DevTools é iniciado em um processo filho desacoplado.
- **Todo método público de `WebDriver` / `WebElement`** - envolvido com captura de comandos (argumentos + resultado + screenshot + origem da chamada).
- **`WebDriver.quit()`** - um hook de limpeza aguardado finaliza a codificação do screencast, o buffer do WebSocket e os metadados finais antes que o quit original seja executado.

Quando o BiDi está disponível (Chrome ≥114), logs do console, exceções JavaScript e eventos de rede são transmitidos diretamente pelos handlers BiDi do Selenium. Caso contrário, o plugin recorre a um script coletor injetado no navegador.

O mesmo coletor injetado também registra o **fluxo de mutações do DOM** da página e um snapshot de elemento / acessibilidade por comando, de modo que um trace contém o suficiente para reconstruir o DOM ao vivo em cada passo (mapeamento por navegação) — é isso que alimenta o DOM time-travel e a aba A11y do player, em vez de uma reprodução baseada apenas em screenshots.

</TabItem>
<TabItem value="python" label="Python">

Não há prototypes para modificar, então o adaptador Python envolve um único método:

- **`WebDriver.execute()`** - o ponto único por onde todo comando passa. Os métodos de elemento também delegam a ele (`self._parent.execute`), então `click`, `send_keys` e `text` são capturados pelo mesmo wrapper sem tocar nas classes de elemento.
- **Inicialização da sessão** - no primeiro comando real, o driver é registrado, os metadados são enviados, e o BiDi, o coletor e o screencast são preparados.
- **`quit()`** - interceptado antes que a sessão seja encerrada, para que o screencast seja codificado e os quadros finais sejam enviados enquanto o driver ainda existe.

Console, exceções JavaScript e rede são transmitidos pela camada BiDi do selenium (4.44+), que o adaptador ativa para você injetando a capability `webSocketUrl` na requisição `newSession`.

O **fluxo de mutações do DOM** vem do mesmo coletor no navegador usado no Node.js, registrado no início do documento via BiDi, para que a página se instrumente antes que qualquer script próprio seja executado. No Chrome, o screencast é enviado pelo navegador por um websocket CDP próprio — separado do canal de comandos da sessão, o que torna seguro um fluxo real de quadros, já que uma sessão Selenium não é thread-safe.

</TabItem>
</Tabs>

## Limitações

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Limitação | Detalhe |
|-----------|--------|
| Reexecução de steps individuais no Cucumber | O filtro `--name` do Cucumber seleciona cenários, não steps Gherkin individuais. A reexecução por step do dashboard fica desativada no Cucumber. |
| Ressalva do modo headless | `headless: true` injeta `--headless=old`; `--headless=new` produz quadros CDP totalmente pretos no screencast. |
| Viewport inicial | O iframe de snapshot do dashboard usa 1280×800 até que a primeira navegação seja concluída e o coletor no navegador informe o viewport real. |

</TabItem>
<TabItem value="python" label="Python">

| Limitação | Detalhe |
|-----------|--------|
| Sem screenshot, vídeo ou anexo no Allure por teste | **Arquivos de trace** por teste são suportados (`--devtools-trace-granularity test`), mas as opções `screenshot` e `video` por teste do adaptador Node.js e seu anexo inline via `allure-js-commons` não têm equivalente em Python - os arquivos são os artefatos. |
| Retenção baseada em retentativas é degradada | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` e `retain-on-failure-and-retries` são aceitos, mas se comportam exatamente como `retain-on-failure`: nada do que é enviado carrega um número de tentativa, então um teste reexecutado sobrescreve seu próprio resultado anterior. O backend registra essa degradação. |
| Node é necessário em todos os modos | O backend é uma aplicação Node - ele serve o coletor da página, transporta o fluxo de eventos e constrói o arquivo de trace - então o Node.js 22.19 ou posterior precisa estar presente mesmo no modo trace, em que nenhuma janela é aberta. O adaptador o encontra ou inicia para você. |
| As opções do navegador são suas | Não há opção `headless`; configure o Chrome pelo próprio objeto `Options` do selenium, como você faria normalmente. |
| Vídeo no modo ao vivo precisa de ffmpeg | Sem `ffmpeg` no `PATH`, a codificação do `.webm` é ignorada com um aviso em vez de um erro. O modo trace não codifica nada - seus quadros vão para o filmstrip - então nunca precisa de ffmpeg. |

</TabItem>
</Tabs>