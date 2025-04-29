---
id: shared-store-service
title: Service de Stockage Partagé
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---


> Échange de données entre le processus principal et les workers (specs).

## Installation

La façon la plus simple est de conserver `@wdio/shared-store-service` comme dépendance de développement dans votre `package.json`, via :

```sh
npm install @wdio/shared-store-service --save-dev
```

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted)

## Utilisation

Obtenir/définir une valeur (un objet simple) vers/depuis le stockage par clé (chaîne). La clé peut être n'importe quelle chaîne arbitraire sauf `*` qui est réservée car elle vous permet de récupérer l'ensemble du stockage.

### Définir des valeurs

Pour définir des valeurs dans le stockage, appelez :

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Obtenir des valeurs

Pour obtenir des valeurs du stockage, appelez :

```js
const value = await browser.sharedStore.get('key')
console.log(value) // renvoie "foobar123"
```

Vous pouvez également récupérer toutes les valeurs clés en utilisant la clé `*` :

```js
const store = await browser.sharedStore.get('*')
console.log(value) // renvoie `{ key: "foobar" }`
```

### Accéder au stockage dans les hooks WDIO

Vous pouvez également accéder directement aux gestionnaires asynchrones `setValue` et `getValue`.
Assurez-vous de les appeler correctement avec le mot-clé `await`.

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

IMPORTANT ! Chaque fichier de spécification doit être atomique et isolé des spécifications des autres.
L'idée du service est de traiter des problèmes très spécifiques de configuration d'environnement.
Veuillez éviter de partager des données d'exécution de test !

### Pools de ressources

Si les threads des workers sont en compétition pour des ressources qui doivent être attribuées à chaque worker, vous pouvez utiliser l'API Resource Pool :

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // worker returns the used resource for next workers to use
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

Cet exemple garantit que les deux workers n'utilisent jamais le même `baseUrl`. Une URL unique n'est attribuée qu'à un seul worker jusqu'à ce qu'elle soit libérée par celui-ci.

## Configuration

Ajoutez `shared-store` à la liste des services et l'objet `sharedStore` sera accessible sur le [scope `browser`](https://webdriver.io/docs/api/browser) dans votre test.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Si vous utilisez typescript, assurez-vous d'ajouter `@wdio/shared-store-service` à vos `compilerOptions.types` :

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```