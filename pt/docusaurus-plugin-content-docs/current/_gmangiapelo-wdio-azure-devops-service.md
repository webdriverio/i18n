---
id: gmangiapelo-wdio-azure-devops-service
title: Serviço de Planos de Teste do Azure DevOps
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

Publica resultados do [WebdriverIO](https://webdriver.io/) nos Planos de Teste do Azure DevOps.

Características principais:

* Suporte para frameworks de execução Jasmine/Jest/Mocha e Cucumber
* Os resultados dos testes são agregados na mesma execução de teste se você estiver executando mais arquivos de spec(teste) e eles pertencerem à mesma suíte
* Os resultados são relatados imediatamente após a execução de um único teste (relatório em tempo real)
* A execução do teste é fechada após o último arquivo de spec(teste) ser concluído
* Suporte a múltiplas suítes


## Instalação

Instale este módulo localmente com o seguinte comando para ser usado como uma dependência (de desenvolvimento):

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted)

## Uso

> _wdio-azure-devops-service_ suporta **NodeJS 8 ou superior**

> _wdio-azure-devops-service_ suporta **commonjs** e **esm**

### Configuração

Como o `@gmangiapelo/wdio-azure-devops-service` é um serviço, você pode configurá-lo em seu arquivo `wdio.conf.js` da seguinte forma

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### Configuração de caso de teste

Seus testes WDIO devem incluir o ID do seu caso de teste do Azure. Certifique-se de que os IDs dos seus casos de teste sejam distintos dos títulos dos seus testes:

**Estilo Mocha:**
```Javascript
// Bom:
it("C123 Can authenticate a valid user", ...

// Ruim:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Estilo Cucumber:**
```Gherkin
## Bom:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Ruim:
@c123stringTest
Scenario Can authenticate a valid user
```

### Exemplo de Relatório do Azure DevOps

Este é um exemplo dos resultados enviados para os Planos de Teste do AZ, durante uma execução de teste
![AzureDevops Test Plans example](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## Opções de Serviço

### pat

O token de acesso pessoal gerado no Azure DevOps com permissão de API definida.

Exemplo: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

Tipo: `string`

Obrigatório: `true`

### organizationUrl

A URL base da sua instância do Azure DevOps.

Exemplo: `"https://dev.azure.com/gianlucamangiapelo"`

Tipo: `string`

Obrigatório: `true`

### projectId

O id do projeto no Azure DevOps.

Para encontrar o projectId use `GET {organizationUrl}/_apis/projects?api-version=6.0` e copie o `id` apropriado.

Exemplo: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

Tipo: `string`

Obrigatório: `true`

### planId

O plainId do teste que você pode recuperar na seção Plano de Teste do Azure DevOps.

Exemplo: `124`

Tipo: `integer`

Obrigatório: `true`

### suiteId

O suiteId que você pode recuperar na seção Plano de Teste do Azure DevOps, no caso de suítes aninhadas, obtenha o suiteId raiz, o serviço itera por todas as suítes filhas.

Exemplo: `21`

Tipo: `integer`

Obrigatório: `true`

### runName

Um nome descritivo para a execução do teste.

Exemplo: `"FE regression tests run"`

Tipo: `string`

Obrigatório: `true`

### caseIdRegex

Expressão regular personalizada para corresponder ao testCaseId da tag ou título do caso de teste.

Tipo: `string`

Padrão: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

Obrigatório: `false`

## Autor
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)