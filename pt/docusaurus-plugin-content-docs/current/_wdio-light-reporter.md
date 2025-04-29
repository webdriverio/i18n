---
id: wdio-light-reporter
title: Reporter Light Reporter
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporter é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Inspirado pelos reporters HTML e Mochawesome

!Filosofia:

> Este reporter não suporta regeneração de relatórios do Cucumber e foi desenvolvido tendo em mente os frameworks bdd e mocha.
> Aqui, a seção `describe()` é considerada como cenário de teste e `it()` como caso de teste dentro dos cenários de teste.

## CARACTERÍSTICAS

1. Configuração fácil
2. Interface aprimorada
3. Capturas de tela incorporadas no relatório HTML
4. addLabel() para incluir contexto ou nome dos passos


## Versões
V 0.1.9 - Lançamento inicial
V 0.2.6 - (mais recente)
  1. Inclui execuções em múltiplos ambientes e segregação com base no ambiente.
  2. Correção de bugs
  3. Desempenho melhorado.


## EXEMPLOS

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## Instalação

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## Configuração

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## Capturas de tela

O Reporter não tem capacidade de configurar automaticamente para tirar capturas de tela, mas, no entanto, se configurado manualmente, ele escuta o evento e anexa as capturas de tela no relatório HTML.
**Para incluir capturas de tela no relatório, adicione o código abaixo no hook afterTest() no arquivo wdio conf.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## Arquivos de Resultado

Cada execução regenera relatório json para cada arquivo de especificação. Para gerar json combinado e relatório HTML, adicione o código abaixo no hook **onComplete()** no arquivo wdio conf

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> Se você executar seu teste sem nenhuma opção --suite, ele considera o padrão como a suíte
> O Reporter não funciona se você der vários parâmetros como suítes durante a execução.
> wdio run `wdio.conf.js --suite firstSuite` - **(FUNCIONA BEM)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(NÃO FUNCIONA)** :(

## Adicionando Contexto

> Você pode usar `useLabel()` para adicionar contexto a qualquer passo ou adicionado para incluí-lo como passos.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## Atualizações
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## Licença

MIT
**Grátis, com certeza!**