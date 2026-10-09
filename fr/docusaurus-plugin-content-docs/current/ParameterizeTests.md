---
id: parameterize-tests
title: Paramétrer les tests
description: "Paramétrez les tests avec des boucles et des fonctions dynamiques, des variables d'environnement, des fichiers .env ou des données provenant d'un fichier CSV."
---

Vous pouvez simplement paramétrer les tests au niveau du test, via de simples boucles `for`, par exemple :

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

ou en extrayant les tests dans des fonctions dynamiques, par exemple :

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

## Transmettre des variables d'environnement

Vous pouvez utiliser des variables d'environnement pour configurer les tests depuis la ligne de commande.

Par exemple, considérez le fichier de test suivant qui nécessite un nom d'utilisateur et un mot de passe. C'est généralement une bonne idée de ne pas stocker vos secrets dans le code source, nous aurons donc besoin d'un moyen de transmettre les secrets depuis l'extérieur.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Vous pouvez exécuter ce test avec votre nom d'utilisateur et votre mot de passe secrets définis dans la ligne de commande.

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

De même, le fichier de configuration peut également lire les variables d'environnement transmises via la ligne de commande.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Vous pouvez maintenant exécuter les tests sur un environnement de préproduction (staging) ou de production :

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

## Fichiers `.env`

Pour faciliter la gestion des variables d'environnement, envisagez d'utiliser quelque chose comme les fichiers `.env`. WebdriverIO charge automatiquement les fichiers `.env` dans votre environnement. Au lieu de définir la variable d'environnement dans l'appel de la commande, vous pouvez définir le fichier `.env` suivant :

```bash title=".env"
# fichier .env
STAGING=0
USERNAME=me
PASSWORD=secret
```

Exécutez les tests comme d'habitude, vos variables d'environnement devraient être prises en compte.

```sh
npx wdio run wdio.conf.js
```

## Créer des tests à partir d'un fichier CSV

Le test-runner de WebdriverIO s'exécute dans Node.js, ce qui signifie que vous pouvez lire directement des fichiers depuis le système de fichiers et les analyser avec votre bibliothèque CSV préférée.

Prenons par exemple ce fichier CSV, dans notre exemple input.csv :

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

À partir de celui-ci, nous allons générer des tests en utilisant la bibliothèque csv-parse de NPM :

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