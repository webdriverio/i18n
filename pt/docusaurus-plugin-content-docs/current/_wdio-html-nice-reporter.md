---
id: wdio-html-nice-reporter
title: Relatório HTML
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

Um relator para webdriver.io que gera um bom relatório HTML.  
O nome é bobo, mas fornece integração com webdriverio

### Novo: não está mais em beta.

### Novo: limpeza e mudança de logging para wdio-logging. As amostras estão atualizadas.
    Você precisa remover a inicialização do log4Js logger do seu config

### Novo: reescrito como um módulo ES para compatibilidade com webdriverio 8.
    Você pode precisar fazer alterações em seu aplicativo de teste

### Correção de bug: webdriverio estava desligando no meio da escrita assíncrona do json.

### Correção de bug: a escrita json não estava sendo aguardada corretamente

### Ótima nova melhoria: sem mais erros de falta de memória devido ao json.stringify

### Ótimo novo recurso: grave vídeos de cada teste


## [Changelog](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## Informação

Este projeto é uma reescrita de [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
É escrito em typescript com muitas melhorias.



## Configuração

### WDIO.config.ts

O código a seguir mostra a configuração padrão do executor de teste wdio. Basta adicionar um objeto HtmlReporter como outro relator ao array de reporters:

### Um wdio.config.ts funcional é fornecido em [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)

abaixo estão trechos desse arquivo.

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## Opções de Configuração:
  
### Para gerar um relatório mestre para todas as suítes

webdriver.io chamará o relator para cada suíte de teste. Ele não agrega os relatórios. Para fazer isso, adicione os seguintes manipuladores de eventos ao seu wdio.config.js

Adicione ao arquivo de configuração do navegador:
```
let reportAggregator : ReportAggregator;
```
Adicione ao objeto de configuração do navegador:
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### Para gerar um arquivo PDF a partir deste relatório

Requer um plugin adicional para manter o suporte leve para aqueles que não o desejam.
veja [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## Exemplo de Saída:

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

Isso deve ser definido manualmente. Não está disponível no momento da configuração, já que o objeto do navegador não existe até que você inicie uma sessão.