---
id: debugging
title: Depuração
---

A depuração é significativamente mais difícil quando vários processos geram dezenas de testes em múltiplos navegadores.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Para começar, é extremamente útil limitar o paralelismo definindo `maxInstances` como `1`, e direcionando apenas as especificações e navegadores que precisam ser depurados.

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

Sua interface de linha de comando também mudará para o modo REPL. Este modo permite que você experimente comandos e elementos na página. No modo REPL, você pode acessar o objeto `browser`&mdash;ou as funções `$` e `$$`&mdash;como você pode em seus testes.

Ao usar `browser.debug()`, você provavelmente precisará aumentar o timeout do test runner para evitar que ele falhe o teste por demorar muito. Por exemplo:

Em `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Veja [timeouts](timeouts) para mais informações sobre como fazer isso usando outros frameworks.

Para prosseguir com os testes após a depuração, no shell use o atalho `^C` ou o comando `.exit`.
## Configuração dinâmica

Observe que o `wdio.conf.js` pode conter Javascript. Como você provavelmente não quer alterar permanentemente seu valor de timeout para 1 dia, muitas vezes pode ser útil alterar essas configurações a partir da linha de comando usando uma variável de ambiente.

Usando esta técnica, você pode alterar dinamicamente a configuração:

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

...e depurar seu arquivo de especificação com o DevTools!

## Depurando com Visual Studio Code (VSCode)

Se você quiser depurar seus testes com pontos de interrupção no VSCode mais recente, você tem duas opções para iniciar o depurador, das quais a opção 1 é o método mais fácil:
 1. anexar automaticamente o depurador
 2. anexar o depurador usando um arquivo de configuração

### VSCode Toggle Auto Attach

Você pode anexar automaticamente o depurador seguindo estas etapas no VSCode:
 - Pressione CMD + Shift + P (Linux e Macos) ou CTRL + Shift + P (Windows)
 - Digite "attach" no campo de entrada
 - Selecione "Debug: Toggle Auto Attach"
 - Selecione "Only With Flag"

 É isso! Agora, quando você executar seus testes (lembre-se de que precisará da flag --inspect definida em sua configuração, como mostrado anteriormente), ele iniciará automaticamente o depurador e parará no primeiro ponto de interrupção que encontrar.

### Arquivo de configuração do VSCode

É possível executar todos ou arquivos de especificação selecionados. As configurações de depuração devem ser adicionadas ao `.vscode/launch.json`, para depurar a especificação selecionada, adicione a seguinte configuração:
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

Para executar todos os arquivos de especificação, remova `"--spec", "${file}"` de `"args"`

Exemplo: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Informações adicionais: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl Dinâmico com Atom

Se você é um desenvolvedor do [Atom](https://atom.io/), você pode experimentar o [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) de [@kurtharriger](https://github.com/kurtharriger), que é um repl dinâmico que permite executar linhas de código individuais no Atom. Assista a [este](https://www.youtube.com/watch?v=kdM05ChhLQE) vídeo do YouTube para ver uma demonstração.

## Depurando com WebStorm / Intellij
Você pode criar uma configuração de depuração node.js assim:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Assista a este [vídeo do YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) para obter mais informações sobre como fazer uma configuração.

## Depurando testes instáveis

Testes instáveis podem ser realmente difíceis de depurar, então aqui estão algumas dicas sobre como você pode tentar reproduzir localmente aquele resultado instável que obteve em seu CI.

### Rede
Para depurar instabilidades relacionadas à rede, use o comando [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Velocidade de renderização
Para depurar instabilidades relacionadas à velocidade do dispositivo, use o comando [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Isso fará com que suas páginas sejam renderizadas mais lentamente, o que pode ser causado por muitas coisas, como a execução de vários processos em seu CI que podem estar desacelerando seus testes.
```js
await browser.throttleCPU(4)
```

### Velocidade de execução do teste

Se seus testes não parecem ser afetados, é possível que o WebdriverIO seja mais rápido que a atualização do framework frontend / navegador. Isso acontece ao usar asserções síncronas, pois o WebdriverIO não tem chance de repetir essas asserções. Alguns exemplos de código que podem quebrar por causa disso:
```js
expect(elementList.length).toEqual(7) // a lista pode não estar populada no momento da asserção
expect(await elem.getText()).toEqual('this button was clicked 3 times') // o texto pode ainda não estar atualizado no momento da asserção, resultando em um erro ("this button was clicked 2 times" não corresponde ao esperado "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // pode ainda não estar exibido
```
Para resolver este problema, devem ser utilizadas asserções assíncronas. Os exemplos acima ficariam assim:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Usando essas asserções, o WebdriverIO aguardará automaticamente até que a condição corresponda. Ao afirmar texto, isso significa que o elemento precisa existir e o texto precisa ser igual ao valor esperado.
Falamos mais sobre isso em nosso [Guia de Melhores Práticas](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).