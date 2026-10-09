---
id: debugging
title: Depuração
description: "Depure testes do WebdriverIO com browser.debug, breakpoints no VS Code ou WebStorm, estratégias para testes instáveis e profiling de CPU e heap."
---

A depuração é significativamente mais difícil quando vários processos geram dezenas de testes em vários navegadores.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Para começar, é extremamente útil limitar o paralelismo definindo `maxInstances` como `1` e direcionando apenas as specs e os navegadores que precisam ser depurados.

Em `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## O Comando Debug

Em muitos casos, você pode usar [`browser.debug()`](/docs/api/browser/debug) para pausar seu teste e inspecionar o navegador.

Sua interface de linha de comando também mudará para o modo REPL. Esse modo permite que você experimente comandos e elementos na página. No modo REPL, você pode acessar o objeto `browser`&mdash;ou as funções `$` e `$$`&mdash;assim como faz em seus testes.

Ao usar `browser.debug()`, provavelmente você precisará aumentar o timeout do test runner para evitar que ele falhe o teste por demorar demais. Por exemplo:

Em `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Veja [timeouts](timeouts) para mais informações sobre como fazer isso usando outros frameworks.

Para continuar com os testes após a depuração, no shell use o atalho `^C` ou o comando `.exit`.

### Pausar para um agente de codificação (`--debug=agent`)

`wdio run --debug=agent` aumenta o timeout do framework para 24 horas e pausa o worker quando uma spec chama `await browser.debug()` ou quando um teste falha. A execução imprime uma linha como:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

Inspecione o navegador pausado com [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …) e depois use `wdio session -s debug-0-0 resume` para continuar. `wdio session -s debug-0-0 close` faz o teste pausado falhar com `Session closed from wdio session`. O nome da sessão é `debug-<cid>` (`debug-0-0` para o primeiro worker). O restante desse fluxo de trabalho está na seção [WebdriverIO Session](/docs/session).
## Configuração dinâmica

Observe que o `wdio.conf.js` pode conter Javascript. Como você provavelmente não quer alterar permanentemente o valor do seu timeout para 1 dia, muitas vezes pode ser útil alterar essas configurações a partir da linha de comando usando uma variável de ambiente.

Usando essa técnica, você pode alterar a configuração dinamicamente:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Você pode então prefixar o comando `wdio` com a flag `debug`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...e depurar seu arquivo de spec com o DevTools!

## Depurando com o Visual Studio Code (VSCode)

Se você quiser depurar seus testes com breakpoints na versão mais recente do VSCode, você tem duas opções para iniciar o depurador, das quais a opção 1 é o método mais fácil:
 1. anexar o depurador automaticamente
 2. anexar o depurador usando um arquivo de configuração

### VSCode Toggle Auto Attach

Você pode anexar o depurador automaticamente seguindo estes passos no VSCode:
 - Pressione CMD + Shift + P (Linux e Macos) ou CTRL + Shift + P (Windows)
 - Digite "attach" no campo de entrada
 - Selecione "Debug: Toggle Auto Attach"
 - Selecione "Only With Flag"

 É isso! Agora, quando você executar seus testes (lembre-se de que você precisará da flag --inspect definida na sua configuração, como mostrado anteriormente), o depurador será iniciado automaticamente e parará no primeiro breakpoint que encontrar.

### Arquivo de configuração do VSCode

É possível executar todos ou apenas os arquivos de spec selecionados. As configurações de depuração precisam ser adicionadas ao `.vscode/launch.json`; para depurar a spec selecionada, adicione a seguinte configuração:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Para executar todos os arquivos de spec, remova `"--spec", "${file}"` de `"args"`

Exemplo: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Informações adicionais: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl Dinâmico com Atom

Se você é um hacker do [Atom](https://atom.io/), pode experimentar o [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) de [@kurtharriger](https://github.com/kurtharriger), que é um repl dinâmico que permite executar linhas de código individuais no Atom. Assista a [este](https://www.youtube.com/watch?v=kdM05ChhLQE) vídeo no YouTube para ver uma demonstração.

## Depurando com WebStorm / Intellij
Você pode criar uma configuração de depuração do node.js assim:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Assista a este [vídeo no YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) para mais informações sobre como criar uma configuração.

## Depurando testes instáveis (flaky)

Testes instáveis podem ser muito difíceis de depurar, então aqui estão algumas dicas de como você pode tentar reproduzir localmente aquele resultado instável que obteve no seu CI.

### Rede
Para depurar instabilidades relacionadas à rede, use o comando [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Velocidade de renderização
Para depurar instabilidades relacionadas à velocidade do dispositivo, use o comando [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Isso fará com que suas páginas sejam renderizadas mais lentamente, o que pode ser causado por muitas coisas, como a execução de vários processos no seu CI que podem estar deixando seus testes mais lentos.
```js
await browser.throttleCPU(4)
```

### Velocidade de execução dos testes

Se seus testes não parecerem ser afetados, é possível que o WebdriverIO seja mais rápido do que a atualização do framework frontend / navegador. Isso acontece ao usar asserções síncronas, já que o WebdriverIO não tem mais a chance de tentar novamente essas asserções. Alguns exemplos de código que podem quebrar por causa disso:
```js
expect(elementList.length).toEqual(7) // a lista pode não estar preenchida no momento da asserção
expect(await elem.getText()).toEqual('this button was clicked 3 times') // o texto pode ainda não estar atualizado no momento da asserção, resultando em um erro ("this button was clicked 2 times" não corresponde ao esperado "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // pode ainda não estar exibido
```
Para resolver esse problema, devem ser usadas asserções assíncronas. Os exemplos acima ficariam assim:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Usando essas asserções, o WebdriverIO aguardará automaticamente até que a condição seja satisfeita. Ao verificar texto, isso significa que o elemento precisa existir e o texto precisa ser igual ao valor esperado.
Falamos mais sobre isso no nosso [Guia de Boas Práticas](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).

## Profiling de Desempenho

O WebdriverIO permite capturar perfis de desempenho dos seus testes para identificar gargalos na execução dos testes ou vazamentos de memória. Isso usa os recursos nativos de profiling do Node.js.

### Profiling de CPU

Para capturar um perfil de CPU, você pode usar a flag de CLI `--cpu-prof` ou definir `cpuProf: true` na sua configuração.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

Isso gerará um arquivo `.cpuprofile` no diretório `./profiles` (padrão) para cada processo worker. Você pode carregar esse arquivo em **Chrome DevTools > Performance > Load Profile** para analisar a execução.

### Profiling de Heap

Para capturar um perfil de Heap, use a flag de CLI `--heap-prof` ou defina `heapProf: true` na sua configuração.

```bash
npx wdio run wdio.conf.js --heap-prof
```

Isso gera um arquivo `.heapprofile` no diretório `./profiles` (usa o sampling heap profiler). Você pode carregá-lo em **Chrome DevTools > Memory > Load** para analisar o uso de memória.

### Métricas de Tempo

Quando o profiling está ativado, o WebdriverIO também registra automaticamente métricas de tempo para as fases de setup, execução e teardown do seu teste, ajudando você a entender onde o tempo está sendo gasto.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```