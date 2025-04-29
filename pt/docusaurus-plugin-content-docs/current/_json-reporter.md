---
id: json-reporter
title: Repórter Json
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Instalação

```bash
npm install @wdio/json-reporter --save-dev
```

## Configuração

### Resultados para `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### Resultados para Arquivo

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### Resultados para Arquivo com nome de arquivo personalizado

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## Arquivos de Resultado

Com o WDIO v5 em diante, o relatório foi movido de um processo centralizado para um que é tratado por cada uma das "sessões" iniciadas para execução paralela de testes. Essa mudança ajudou a reduzir a quantidade de comunicação durante a execução de testes WDIO e, assim, melhorou o desempenho. A desvantagem é que não é mais possível obter um único relatório para toda a execução de testes.

`@wdio/json-reporter` fornece uma função utilitária para mesclar os múltiplos arquivos json em um único arquivo. Siga os passos abaixo para aproveitar esta utilidade.

Você pode executar isso no [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) do seu `wdio.conf.js`:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_Nota:_ `wdio-custom-filename.json` é opcional, se o parâmetro não for fornecido, o valor padrão é `wdio-merged.json`.

## Contribuição

O código-fonte deste repórter foi altamente inspirado pelo repórter da comunidade [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) de [Jim Davis](https://github.com/fijijavis). Obrigado por todo o trabalho mantendo o projeto!

---

Para mais informações sobre WebdriverIO, consulte a [página inicial](http://webdriver.io).