---
id: wdio-json-html-reporter
title: Gerador de Relatórios JSON HTML
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

Este é um reporter personalizado para WebDriverIO que gera relatórios JSON detalhados durante a execução de testes e fornece um gerador de relatórios HTML portátil para visualizar seus resultados de teste. Ele registra timestamps, metadados de execução e pode capturar screenshots sob demanda. O pacote segue a convenção do WebDriverIO para reporters e é publicado como um pacote npm com o nome `wdio-json-html-reporter`.

## Índice

- [Visão Geral](#overview)
- [Recursos](#features)
- [Instalação](#installation)
  - [1. Instalar o pacote](#1-install-the-package)
  - [2. Verificar instalação](#2-verify-installation)
  - [3. Atualizar a Configuração do WebDriverIO](#3-update-webdriverio-configuration)
  - [4. Execute Seus Testes](#4-run-your-tests)
- [Uso via CLI](#cli-usage)
- [Opção de Histórico e Geração de Histórico Agregado](#history-option-and-aggregated-history-generation)
- [Screenshots](#screenshots)

## Overview

WDIO JSON HTML REPORTER fornece dois componentes principais:

- **JSONReporter**: Um reporter personalizado que estende a interface de reporter do WebDriverIO para coletar eventos de teste e gerar um arquivo JSON com metadados, resultados de teste e (opcionalmente) screenshots.
- **HTMLReportGenerator**: Uma utilidade para converter múltiplos arquivos de relatório JSON em um relatório HTML abrangente com gráficos interativos, filtragem e funcionalidade de exportação. Além disso, o gerador de relatórios agora suporta um arquivo de histórico opcional para exibir dados históricos de execução, quando disponíveis. Quando nenhum dado histórico é fornecido, o relatório omite a seção histórica e mostra apenas os Erros Únicos.

Essas ferramentas ajudam você a obter insights claros sobre suas execuções de teste, o que é essencial para depuração e integração contínua.

## Features

- **Relatórios JSON**: Relatório detalhado com timestamps, nomes de suítes, resultados de testes, erros e screenshots opcionais.
- **Relatórios HTML**: Converte relatórios JSON em um relatório HTML portátil com dashboard, gráficos, relatório de teste detalhado e recursos de filtragem.
- **Exportação para Excel**: O relatório de teste detalhado pode ser exportado para um arquivo Excel.
- **Suporte a Screenshots**: Captura screenshots para testes com falha (ou todos os testes) com base na sua configuração.
- **Metadados de Execução**: Registra informações do navegador, tempos de início/fim da execução e duração total.
- **Execução Histórica (Opcional)**: Forneça um arquivo JSON de histórico para incluir dados históricos de execução por suíte. Se nenhum dado histórico for fornecido, o relatório ocultará automaticamente esta seção e exibirá apenas os Erros Únicos.
- **Geração de Histórico Agregado**: O JSONReporter agora inclui um recurso de geração de histórico agregado. Usando o método estático `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, você pode escanear automaticamente todos os arquivos de relatório JSON (correspondentes ao padrão `test-report-*.json`) em seu diretório de relatórios, agregar resultados de teste e calcular comparações de defeitos com base em dados históricos. O registro de histórico agregado é então anexado ao seu arquivo de histórico e pode ser usado pelo gerador de relatório HTML para visualizar tendências ao longo do tempo.

## Installation

Para instalar o pacote `wdio-json-html-reporter`, siga estes passos:

### 1. Install the package

Execute o seguinte comando para instalar o pacote como uma dependência de desenvolvimento:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

Certifique-se de que o pacote foi instalado corretamente executando:

```bash
npm list wdio-json-html-reporter
```

Se instalado corretamente, você deverá ver uma saída semelhante a:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

Modifique seu arquivo `wdio.conf.js` ou `wdio.conf.ts` para incluir o reporter personalizado:

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. Run Your Tests

Execute sua suíte de testes WebDriverIO:

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

Além de integrar com o WebDriverIO, você pode executar o gerador de relatórios HTML diretamente da linha de comando usando a CLI integrada.

**Uso:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

Por exemplo, se você tem seus arquivos JSON em uma pasta chamada `test/reports/json-reports` e deseja gerar um relatório HTML chamado `test/reports/report.html`, você pode executar:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

Se você também tiver um arquivo de histórico (por exemplo, `test/reports/history.json`), inclua-o como um quarto parâmetro opcional:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**Nota:**  
A funcionalidade CLI é acionada apenas quando você passa o comando `generate-html` como o primeiro parâmetro. Ao executar via WebDriverIO (por exemplo, com `wdio run wdio.conf.js`), a lógica CLI é ignorada.

## History Option and Aggregated History Generation

O gerador de relatório HTML agora suporta uma **opção de histórico**. Isso permite que você forneça um arquivo JSON contendo dados históricos de execução que são mesclados no relatório na seção "Execução Histórica por Suíte". Se o arquivo de histórico for fornecido e contiver dados válidos, o relatório exibirá tendências históricas junto com gráficos interativos e um acordeão para cada suíte. Se nenhum arquivo de histórico for passado ou se o arquivo não contiver dados de suíte, o relatório ocultará automaticamente a seção histórica e exibirá apenas a visão geral de Erros Únicos.

Além disso, o JSONReporter agora inclui um recurso de **geração de histórico agregado**. Com o método estático `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, você pode escanear automaticamente todos os arquivos de relatório JSON (correspondentes ao padrão `test-report-*.json`) em seu diretório de relatórios, agregar resultados de teste (somando contagens de teste e mesclando dados de suíte), e calcular comparações de defeitos comparando com o último registro agregado. O registro de histórico recém-gerado é então anexado ao arquivo de histórico especificado. Esses dados de histórico agregados podem posteriormente ser usados pelo gerador de relatório HTML para fornecer insights históricos de execução ao longo de várias execuções de teste.

## Screenshots

### Dashboard  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### Test Results  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### Screenshots  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### Filters  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel Export  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)