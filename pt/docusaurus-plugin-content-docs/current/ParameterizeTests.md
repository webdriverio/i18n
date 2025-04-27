---
id: parameterize-tests
title: Parametrizar Testes
---

Você pode simplesmente parametrizar testes em nível de teste, através de simples loops `for`, por exemplo:

```ts title=example.spec.js
const people = ['Alice', 'Bob']
describe('my tests', () => {
    for (const name of people) {
        it(`testing with ${name}`, async () => {
            // ...
        })
    }
})
```

ou extraindo testes para funções dinâmicas, por exemplo:

```js title=dynamic.spec.js
import { browser } from '@wdio/globals'

function testComponent(componentName, options) {
  it(`should test my ${componentName}`, async () => {
    await browser.url(`/${componentName}`)
    await expect($('input')).toHaveValue(options.expectedValue)
  })
}

describe('page components', () => {
    testComponent('component-a', { expectedValue: 'some expected value' })
    testComponent('component-b', { expectedValue: 'some other expected value' })
})
```

## Passando Variáveis de Ambiente

Você pode usar variáveis de ambiente para configurar testes a partir da linha de comando.

Por exemplo, considere o seguinte arquivo de teste que precisa de um nome de usuário e uma senha. Geralmente é uma boa ideia não armazenar seus segredos no código-fonte, então precisaremos de uma maneira de passar segredos de fora.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Você pode executar este teste com seu nome de usuário e senha secretos definidos na linha de comando.

<Tabs
  defaultValue="bash"
  values={[
    {label: 'Bash', value: 'bash'},
    {label: 'Powershell', value: 'powershell'},
    {label: 'Batch', value: 'batch'},
  ]
}>
<TabItem value="bash">

```sh
USERNAME=me PASSWORD=secret npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="powershell">

```sh
$env:USERNAME=me
$env:PASSWORD=secret
npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="batch">

```sh
set USERNAME=me
set PASSWORD=secret
npx wdio run wdio.conf.js
```

</TabItem>
</Tabs>

Da mesma forma, o arquivo de configuração também pode ler variáveis de ambiente passadas através da linha de comando.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Agora, você pode executar testes em um ambiente de staging ou de produção:

<Tabs
  defaultValue="bash"
  values={[
    {label: 'Bash', value: 'bash'},
    {label: 'Powershell', value: 'powershell'},
    {label: 'Batch', value: 'batch'},
  ]
}>
<TabItem value="bash">

```sh
STAGING=1 npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="powershell">

```sh
$env:STAGING=1
npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="batch">

```sh
set STAGING=1
npx wdio run wdio.conf.js
```

</TabItem>
</Tabs>

## Arquivos `.env`

Para facilitar o gerenciamento das variáveis de ambiente, considere algo como arquivos `.env`. O WebdriverIO carrega arquivos `.env` automaticamente em seu ambiente. Em vez de definir a variável de ambiente como parte da chamada de comando, você pode definir o seguinte `.env`:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

Execute os testes como de costume, suas variáveis de ambiente devem ser detectadas.

```sh
npx wdio run wdio.conf.js
```

## Criar testes através de um arquivo CSV

O test-runner do WebdriverIO é executado no Node.js, isso significa que você pode ler arquivos diretamente do sistema de arquivos e analisá-los com sua biblioteca CSV preferida.

Veja, por exemplo, este arquivo CSV, em nosso exemplo input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

Com base nisso, vamos gerar alguns testes usando a biblioteca csv-parse do NPM:

```js title=test.spec.ts
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'csv-parse/sync'

const records = parse(fs.readFileSync(path.join(__dirname, 'input.csv')), {
  columns: true,
  skip_empty_lines: true
})

describe('my test suite', () => {
    for (const record of records) {
        it(`foo: ${record.test_case}`, async () => {
            console.log(record.test_case, record.some_value, record.some_other_value)
        })
    }
})
```