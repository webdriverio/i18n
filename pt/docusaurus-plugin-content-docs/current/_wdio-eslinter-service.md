---
id: wdio-eslinter-service
title: Auto-detecção de importações ausentes c/serviço eslint
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

Você já executou seus testes e2e, apenas para descobrir 10, 15 ou 30 minutos depois que havia uma importação ausente/com erro ortográfico, que não apareceu até o meio da execução do teste? Quando isso acontece, o executor de teste relata esses testes como quebrados.

eslint é uma ótima ferramenta para capturar diferentes erros antes da execução, e este serviço executa a ferramenta eslint, antes de executar os testes WebdriverIO, como uma etapa automatizada em vez de manual.

Muitas vezes é melhor falhar mais rápido para que possamos corrigir problemas mais cedo em vez de mais tarde.

A configuração recomendada é usar o executor "unresolved" para verificar apenas importações ausentes, mas, se desejar, você também pode configurar o serviço para executar o eslinter em seu projeto usando o executor npm ou yarn, ou passando uma flag que diz ao sistema para usar sua configuração .eslintrc também.

## Installation

Instale o wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### Quick Start - Check for missing or unresolved imports only

Por padrão, nesta configuração mínima, o executor "unresolved" verifica importações require não resolvidas e lança um erro se forem encontradas importações não resolvidas. O serviço então interrompe a execução. Você pode personalizar o .eslintrc.js para realizar mais verificações usando os executores "npm" ou "yarn", se desejar. Veja [eslint](https://www.npmjs.com/package/eslint) para mais detalhes.

Se você não tiver uma configuração `.eslintrc.js` em seu projeto, o wdio-eslinter-service pode ser configurado para usar uma padrão que apenas verifica importações ausentes antes de executar os testes. Isso é útil para que você descubra sobre importações incorretas mais cedo em vez de mais tarde. Para configurar isso, adicione a seguinte configuração eslinter ao seu array de serviços (assumindo que você já esteja usando o serviço chromedriver; caso contrário, deixe essa parte de fora):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

Neste ponto, comece a executar os testes e, se houver uma importação ausente ou incorreta, o WebdriverIO irá registrá-la e encerrar imediatamente a execução do teste:

```
$ npx wdio
```


#### Optional - if using module-alias

Se você estiver usando o módulo [module-alias](https://www.npmjs.com/package/module-alias), que permite configurar aliases para substituir caminhos relativos, você precisará passá-lo para a configuração eslinter usando o plugin eslint-import-resolver-custom-alias. Abaixo está um exemplo:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

Instale o plugin em seu projeto:

```
$ npm i eslint-import-resolver-custom-alias
```

Execute os testes e verifique se o sistema encontrará importações incorretas que usam aliases de módulo:

```
$ npx wdio
```

#### Experimental - Use along with an existing eslintrc configuration in your project

Para que o serviço eslinter também use uma configuração eslintrc existente em seu projeto, defina `includeProjectEslintrc` como true na matriz de serviços de configuração wdio.conf.js.

Tenho experimentado problemas com plugins conflitantes. Se a configuração eslint do seu projeto também estiver procurando por importações não resolvidas, isso pode não funcionar e pode exigir ajustes no seu .eslintrc.js. Isso não é recomendado no momento.


### Advanced Alternatives - Using the npm and yarn runners

Os executores npm e yarn ajudam a dar controle adicional sobre a execução de uma configuração eslinter existente em seu projeto. Com esta configuração, você pode definir comandos extras para executar na seção run-scripts no seu package.json:

Dentro do seu `package.json`, adicione esta entrada aos seus scripts de execução:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**NOTA: Adicionar eslint ao package.json é necessário para que o serviço funcione ao usar os executores npm ou yarn.**

Se você ainda não tem o eslint instalado e configurado, precisará instalá-lo e configurá-lo em seu projeto, bem como quaisquer plugins que esteja usando, como eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

Se você estiver usando o plugin eslint-import-resolver-custom-alias para mapear aliases de módulo para seus caminhos reais, você também precisará instalá-lo:

```
$ npm i eslint-import-resolver-custom-alias
```

Você também precisará criar um arquivo `.eslintrc.js`, se ainda não tiver um dos arquivos de configuração eslintrc em seu projeto. Aqui está uma configuração básica para apenas procurar importações não resolvidas, e você pode expandir esta configuração para validar outras verificações de qualidade de código antes de executar testes:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

Por fim, adicione o serviço `eslinter` ao array de serviços em `wdio.conf.js`:

```javascript
    services: ['eslinter']
```

Execute `npm run eslint` para verificar e procurar erros.

Se você usa `yarn`, pode configurar a opção de serviço `runnerType`:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

Se você já tem um script linter que gostaria de reutilizar (em vez de `eslint`), pode configurar a opção de serviço `scriptName`:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## Using in WebdriverIO

Inicie o executor de teste do WebdriverIO normalmente. eslint verificará o código. Se forem encontrados erros, a execução cessa imediatamente.

```bash
$ npx wdio
```


**Example:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```