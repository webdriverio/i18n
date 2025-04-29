---
id: wdio-performancetotal-service
title: Serviço PerformanceTotal
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service é um pacote de terceiros, para mais informações veja [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Nota:<br/>
Para WebdriverIO v9 use a versão 4.x.x.<br/>
Para WebdriverIO v8 use a versão 3.x.x.<br/>
Para WebdriverIO v7 use a versão 2.x.x.<br/>
Para WebdriverIO v6 use a versão 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

Com este plugin para [webdriver.io](https://webdriver.io/) você pode facilmente adicionar análise de desempenho a qualquer fluxo em seus testes, seja ele UI puro, API ou uma combinação de ambos. Este plugin fornece uma maneira simples e eficiente de medir os tempos de resposta de vários procedimentos e identificar possíveis gargalos em sua aplicação. Com essas informações, você pode tomar decisões informadas sobre otimizações e melhorias para aprimorar o desempenho geral da sua aplicação.

## Instalação

A maneira mais fácil de instalar este módulo como dependência de desenvolvimento é usando o seguinte comando:

```
npm install wdio-performancetotal-service --save-dev
```

## Uso

Adicione wdio-performancetotal-service ao seu `wdio.conf.js`:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...ou com as opções de serviço:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // As opções (com valores padrão)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### Opções

#### __disableAppendToExistingFile__

Quando definido como `true`, novas execuções de teste começarão do zero e substituirão quaisquer dados de desempenho existentes.
Quando definido como `false` (padrão), os dados de desempenho serão adicionados aos dados existentes.

> **⚠️ Cuidado:**
>
> Esta ação excluirá permanentemente todos os seus dados de desempenho. Certifique-se de ter um backup antes de prosseguir.

#### __performanceResultsFileName__

Você pode substituir o nome padrão do arquivo de resultados (`performance-results`).
Um arquivo de resultados recém-criado normalmente substitui o arquivo antigo. Se você quiser manter arquivos antigos, é recomendável adicionar um carimbo de data/hora ao nome do arquivo. Por exemplo:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

O padrão é `false`. Quando o valor é definido como `true`, a análise de desempenho de testes com falha seria excluída.

#### __recentDays__

O padrão é `0` (sem limite). Para definir o número de dias a considerar para análise de desempenho, defina o número de dias. Dias parciais também são suportados (por exemplo, `recentDays: 0.5`)

#### __performanceResultsDirectory__

Você pode substituir o caminho padrão para o diretório de resultados no diretório raiz do projeto.
Por exemplo:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

O padrão é `false`. Se `true`, os dados de desempenho também seriam analisados pelo tipo de navegador.


### Uso no teste

Basta importar __performancetotal__ onde você precisar, seja no seu arquivo de teste ou em qualquer outra classe. Este objeto fornece métodos para medir dados de desempenho em seus testes, incluindo sampleStart e sampleEnd para iniciar e finalizar medições de desempenho.
Aqui está um exemplo de como você pode usar o objeto performancetotal para medir o desempenho de inicialização de dois sites:

```typescript
// Este caso de teste mede o desempenho de inicialização do Github e SourceForge usando o objeto performancetotal.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Inicia uma nova medição de desempenho para o Github
    performancetotal.sampleStart("GH-Startup");

    // Navega para o Github
    browser.url("https://github.com/");

    // Encerra a medição do Github e salva os resultados
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Inicia uma nova medição de desempenho para o SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Navega para o SourceForge
    await browser.url("https://sourceforge.net/");

    // Encerra a medição do SourceForge e salva os resultados
    performancetotal.sampleEnd("SF-Startup");
});

```

Você pode recuperar o tempo gasto para uma única amostra de desempenho chamando performancetotal.getSampleTime(sampleName) em seu teste. Isso permite verificar o desempenho de uma seção específica do código e garantir que atenda às suas expectativas.

```typescript
// Obtenha o tempo gasto para uma única amostra
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Obtendo os resultados

Quando todos os testes são concluídos, um novo diretório de resultados é criado na pasta raiz do seu projeto (o nome do diretório padrão é performance-results). Dentro deste diretório, dois arquivos são criados: performance-results.json e performance-results.csv. Esses arquivos contêm dados analisados para cada amostra, incluindo o tempo médio, erro padrão da média (SEM), número de amostras, valor mínimo, valor máximo, tempo mais antigo e tempo mais recente. Você pode usar esses dados para identificar quaisquer regressões ou melhorias de desempenho ao longo do tempo.

### Analisando dados de desempenho em massa

Para analisar dados de desempenho existentes em massa sem gerar novos testes, é recomendado usar a [ferramenta __performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli).

## Suporte a Typescript

Typescript é suportado para este plugin.

## Suporte

Para suporte e sugestões, sinta-se à vontade para entrar em contato comigo em [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).