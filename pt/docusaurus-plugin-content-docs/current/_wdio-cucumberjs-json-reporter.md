---
id: wdio-cucumberjs-json-reporter
title: Reporter JSON CucumberJS
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

Um reporter WDIO que cria arquivos JSON do CucumberJS para WebdriverIO v8 e superior.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## O que ele faz
Este reporter irá gerar um **arquivo JSON do Cucumber** para cada feature que está sendo testada. O arquivo JSON pode ser usado com qualquer relatório que você queira usar, como por exemplo [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

Ele também adicionará metadados sobre a instância em execução ao arquivo de feature e, por último, mas não menos importante, ele lhe dará a oportunidade de adicionar anexos à saída JSON.

## Instalação
A maneira mais fácil é manter o `wdio-cucumberjs-json-reporter` como uma devDependency no seu `package.json`.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

Você pode simplesmente fazer isso com:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

assim ele será automaticamente adicionado ao seu `package.json`

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted).

## Configuração
Configure o diretório de saída e o idioma no seu arquivo wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [
        // Assim com as opções padrão, veja as opções abaixo
        'cucumberjs-json',

        // OU assim se você quiser definir a pasta e o idioma
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> NÃO USE AMBAS AS FORMAS DE ADICIONAR O REPORTER, ISTO É APENAS UM EXEMPLO!

## Opções
### `jsonFolder`
- **Tipo:** `String`
- **Obrigatório:** Não
- **Padrão:** `.tmp/json/`

O diretório onde os arquivos JSON, gerados por este relatório, serão armazenados, relativo ao local de onde o script é iniciado.

**N.B.:** Se você usar um script npm pela linha de comando, como por exemplo `npm run test`, o `jsonFolder` será relativo ao caminho
de onde o script é executado. Executá-lo a partir da raiz do seu projeto também criará o `jsonFolder` na raiz do seu projeto.

### `language`
- **Tipo:** `String`
- **Obrigatório:** Não
- **Padrão:** `en`

O idioma no qual os cenários Gherkin são escritos (o padrão é inglês). A lista de códigos de idioma e suas palavras-chave pode ser encontrada [aqui](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **Tipo:** `boolean`
- **Obrigatório:** Não
- **Padrão:** `false`

Os detalhes do hook não serão parte da geração se esta propriedade for definida como `true`.

### `reportFilePerRetry`
- **Tipo:** `boolean`
- **Obrigatório:** Não
- **Padrão:** `true`

Quando uma especificação é repetida, o relatório será anexado ao arquivo de relatório existente das tentativas anteriores se esta propriedade for definida como `false`.

**Exemplo**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## Metadados

> **Nota:**\
> Atualmente, isso não é suportado se você estiver usando o WebdriverIO V6, o WebdriverIO V5 ainda suporta isso e o WebdriverIO V7 também suporta novamente

Como dito, este relatório pode armazenar automaticamente os metadados da máquina/dispositivo atual em que a feature foi executada.

Para personalizar isso, você pode adicioná-lo adicionando o seguinte objeto às suas `capabilities`

```js
// Exemplo wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Adicione isso
            'cjson:metadata': {
                // Para um navegador
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // para um aplicativo
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> O objeto de metadados precisa ter o prefixo `cjson`, caso contrário, não funcionará!

### Valores de metadados
#### `metadata.app.name`
- **Tipo:** `string`

**ex.:** O nome do aplicativo.

#### `metadata.app.version`
- **Tipo:** `string`

**ex.:** A versão do aplicativo.

#### `metadata.browser.name`
- **Tipo:** `string`
- **Valores possíveis:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **Tipo:** `string`

**ex.:** A versão do navegador, isso pode ser adicionado manualmente ou recuperado durante a execução dos testes para obter o número exato da versão.

#### `metadata.device`
- **Tipo:** `string`

**ex.:** Um nome que representa o tipo de dispositivo. Por exemplo, se você executá-lo em uma máquina virtual, pode colocar aqui `Virtual Machine`,
ou o nome do celular, como por exemplo `iPhone 7 Plus`.

#### `metadata.platform.name`
- **Tipo:** `string`
- **Valores possíveis:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **Tipo:** `string`

**ex.:** A versão da plataforma

> Se você não fornecer o objeto `browser` nos metadados, este módulo irá determiná-lo automaticamente para você. **Ele sempre o substituirá pelo valor mais recente que puder determinar.**

> Se você não fornecer o `device` e/ou o objeto `platform`, ele será padronizado para `not known`

> Se você não fornecer um `browser.name` ou um `browser.version`, o módulo tentará determinar isso automaticamente.

## Anexo
Você tem a opção de anexar dados ao arquivo JSON em todos esses hooks/etapas:

- Before(All)
- After(All)
- Given
- When
- Then
- And

A única coisa que você precisa fornecer é o seguinte código em seus arquivos de etapas.

Para ES Modules (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Anexar uma string (se nenhum tipo for fornecido, ele será automaticamente padrão para `text/plain`)
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// Anexar JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// Anexar uma captura de tela em um hook before
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
Para CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Anexar uma string (se nenhum tipo for fornecido, ele será automaticamente padrão para `text/plain`)
attach('just a string');
attach('just a second string', 'text/plain');

// Anexar JSON
attach({"json-string": true}, 'application/json');

// Anexar uma captura de tela em um hook before
attach(await browser.takeScreenshot(), 'image/png');
```

## Use-o com multiple-cucumber-html-reporter
O módulo anterior para WebdriverIO V4, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
tinha uma conexão incorporada com o módulo [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter). **Este não é o caso para este
reporter** porque a nova configuração do WebdriverIO V5 é baseada em uma instância que não me permite usar os hooks `onPrepare` e `onComplete`.

Se você ainda quiser usar o módulo [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter), pode adicionar o seguinte ao seu arquivo de configuração.

- Instale o módulo com

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- Adicione isso ao seu arquivo de configuração

    ```js
    import fs from 'node:fs/promises'
    // Importe o módulo
    import { generate } from 'multiple-cucumber-html-reporter'

    // Exemplo wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * É executado uma vez antes de todos os workers serem lançados.
       */
      onPrepare: () => {
        // Remova a pasta `.tmp/` que contém os arquivos json e de relatório
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * É executado depois que todos os workers foram desligados e o processo está prestes a sair.
       */
      onComplete: () => {
        // Gere o relatório quando todos os testes estiverem concluídos
        generate({
          // Obrigatório
          // Esta parte precisa ser o mesmo caminho onde você armazena os arquivos JSON
          // padrão = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // para mais opções, veja https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## Versões Mais Antigas do WebdriverIO

> **ESTE MÓDULO SÓ PODE FUNCIONAR COM WebdriverIO V8+!**\
> **Para V6, verifique a documentação [aqui](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) e use a versão 2.0.4**\
> **Para V5, verifique a documentação [aqui](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) e use a versão 1.3.0**

> **ESTE MÓDULO NÃO É UM SUBSTITUTO DO [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). ESSE MÓDULO SUPORTA APENAS WEBDRIVERIO V4 E TAMBÉM CRIA UM RELATÓRIO. ESTE MÓDULO APENAS CRIA UM JSON, NÃO UM RELATÓRIO!!**