---
id: typescript
title: Configuration TypeScript
---

Vous pouvez écrire des tests en utilisant [TypeScript](http://www.typescriptlang.org) pour bénéficier de l'auto-complétion et de la sécurité des types.

Vous aurez besoin de [`tsx`](https://github.com/privatenumber/tsx) installé dans les `devDependencies`, via :

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO détectera automatiquement si ces dépendances sont installées et compilera votre configuration et vos tests pour vous. Assurez-vous d'avoir un fichier `tsconfig.json` dans le même répertoire que votre configuration WDIO.

#### TSConfig personnalisé

Si vous devez définir un chemin différent pour `tsconfig.json`, veuillez définir la variable d'environnement TSCONFIG_PATH avec votre chemin souhaité, ou utiliser le [paramètre tsConfigPath](/docs/configurationfile) de la configuration wdio.

Alternativement, vous pouvez utiliser la [variable d'environnement](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) pour `tsx`.


#### Vérification des types

Notez que `tsx` ne prend pas en charge la vérification des types - si vous souhaitez vérifier vos types, vous devrez le faire dans une étape séparée avec `tsc`.

## Configuration du framework

Votre `tsconfig.json` doit contenir les éléments suivants :

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Veuillez éviter d'importer explicitement `webdriverio` ou `@wdio/sync`.
Les types `WebdriverIO` et `WebDriver` sont accessibles de n'importe où une fois ajoutés à `types` dans `tsconfig.json`. Si vous utilisez des services WebdriverIO supplémentaires, des plugins ou le package d'automatisation `devtools`, veuillez également les ajouter à la liste `types` car beaucoup fournissent des typages supplémentaires.

## Types de framework

Selon le framework que vous utilisez, vous devrez ajouter les types de ce framework à la propriété `types` de votre `tsconfig.json`, ainsi qu'installer ses définitions de types. C'est particulièrement important si vous souhaitez avoir une prise en charge des types pour la bibliothèque d'assertions intégrée [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Par exemple, si vous décidez d'utiliser le framework Mocha, vous devez installer `@types/mocha` et l'ajouter comme ceci pour avoir tous les types disponibles globalement :

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## Services

Si vous utilisez des services qui ajoutent des commandes à la portée du navigateur, vous devez également les inclure dans votre `tsconfig.json`. Par exemple, si vous utilisez le `@wdio/lighthouse-service`, assurez-vous de l'ajouter également aux `types`, par exemple :

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

L'ajout de services et de rapporteurs à votre configuration TypeScript renforce également la sécurité des types de votre fichier de configuration WebdriverIO.

## Définitions de types

Lors de l'exécution des commandes WebdriverIO, toutes les propriétés sont généralement typées afin que vous n'ayez pas à vous soucier d'importer des types supplémentaires. Cependant, il existe des cas où vous souhaitez définir des variables à l'avance. Pour garantir que celles-ci sont typées en toute sécurité, vous pouvez utiliser tous les types définis dans le package [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Par exemple, si vous souhaitez définir l'option remote pour `webdriverio`, vous pouvez faire :

```ts
import type { Options } from '@wdio/types'

// Voici un exemple où vous pourriez vouloir importer les types directement
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Erreur : Le type 'string' n'est pas assignable au type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// Pour d'autres cas, vous pouvez utiliser l'espace de noms `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Autres options de configuration
}
```

## Conseils et astuces

### Compilation et Lint

Pour être entièrement sûr, vous pouvez envisager de suivre les meilleures pratiques : compilez votre code avec le compilateur TypeScript (exécutez `tsc` ou `npx tsc`) et utilisez [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) sur un [hook pre-commit](https://github.com/typicode/husky).