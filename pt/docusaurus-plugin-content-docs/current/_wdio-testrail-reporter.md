---
id: wdio-testrail-reporter
title: Relatório do Testrail Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

Este reporter cria relatórios do TestRail. A primeira coisa que você precisa fazer é habilitar a API do TestRail para que o relatório possa se comunicar com o TestRail e enviar os resultados dos testes. Para isso, faça login na sua conta do TestRail e vá para Administration > Site Settings > API e certifique-se de marcar a caixa perto de Enable API.

Adicione o ID do caso de teste do TestRail à descrição do teste. Por exemplo:
```javascript
it("C123456 Page loads correctly", async () => {
```
Isso também suporta múltiplos IDs de casos. Por exemplo:
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## Instalação

Para usar o reporter, adicione-o ao seu `package.json`:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## Uso

Adicione o reporter ao seu arquivo de configuração WDIO.

Exemplo para quando você deseja criar uma nova execução de teste:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

Exemplo para quando você deseja atualizar uma execução de teste existente:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

Exemplo para quando você precisa de diferentes IDs de projeto e/ou suíte com base na suíte de teste a ser executada:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## Opções

### `projectId`

ID do projeto testrail.

Tipo: `string`

### `suiteId`

ID da suíte, suíte 1 é o padrão.

Tipo: `string`

### `domain`

Domínio da sua instância testrail, por exemplo `your-domain.testrail.io`.

Tipo: `string`

### `username`

Nome de usuário da sua instância testrail.

Tipo: `string`

### `apiToken`

Token da API da sua instância testrail.

Tipo: `string`

### `runName`

Nome personalizado para a execução do teste.

Tipo: `string`

### `existingRunId`

ID de uma execução de teste existente para atualizar.

Tipo: `string`

### `oneReport`

Criar uma única execução de teste.

Tipo: `boolean`

### `includeAll`

Incluir todos os testes da suíte na execução do teste.

Tipo: `boolean`

### `caseIdTagPrefix`

Prefixo usado para localizar o ID do caso nas tags do Cucumber, útil para execuções de Cenários Cucumber multi-plataforma

Tipo: `string`

### `useCucumber`

Indica se os testes são escritos usando o framework Cucumber. Por padrão, é definido como `false`.

Tipo: `boolean`

---

Para mais informações sobre WebdriverIO, consulte a [página inicial](https://webdriver.io).