---
id: wdio-intercept-service
title: Service d'Interception
custom_edit_url: https://github.com/webdriverio-community/wdio-intercept-service/edit/main/README.md
---


> wdio-intercept-service est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/webdriverio-community/wdio-intercept-service) | [npm](https://www.npmjs.com/package/wdio-intercept-service)

🕸 Capturez et vérifiez les appels HTTP ajax dans [webdriver.io](http://webdriver.io/)

[![Tests](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml) [![Join the chat on Discord](https://img.shields.io/discord/1097401827202445382?logo=discord&logoColor=FFFFFF&color=5865F2)](https://discord.webdriver.io/)

Ceci est un plugin pour [webdriver.io](http://webdriver.io/). Si vous ne le connaissez pas encore, jetez-y un œil, c'est plutôt cool.

Bien que selenium et webdriver soient utilisés pour les tests e2e et particulièrement les tests UI, vous pourriez vouloir évaluer les requêtes HTTP effectuées par votre code client (par exemple, lorsque vous n'avez pas de retour UI immédiat, comme dans les métriques ou les appels de suivi). Avec wdio-intercept-service, vous pouvez intercepter les appels HTTP ajax initiés par une action utilisateur (par exemple, un appui sur un bouton, etc.) et faire des assertions sur la requête et les réponses correspondantes plus tard.

Il y a cependant une contrainte : vous ne pouvez pas intercepter les appels HTTP qui sont initiés au chargement de la page (comme dans la plupart des SPA), car cela nécessite un travail de configuration qui ne peut être effectué qu'après le chargement de la page (en raison des limitations de selenium). **Cela signifie que vous pouvez seulement capturer les requêtes qui ont été initiées à l'intérieur d'un test.** Si cela vous convient, ce plugin pourrait être pour vous, alors continuez la lecture.

## Prérequis

* webdriver.io **v5.x** ou plus récent.

**Attention ! Si vous utilisez encore webdriver.io v4, veuillez utiliser la branche v2.x de ce plugin !**

## Installation

```shell
npm install wdio-intercept-service -D
```

## Utilisation

### Utilisation avec WebDriver CLI

Il devrait être aussi simple que d'ajouter wdio-intercept-service à votre `wdio.conf.js` :

```javascript
exports.config = {
  // ...
  services: ['intercept']
  // ...
};
```

et tout est prêt.

### Utilisation avec WebDriver Standalone

Lorsque vous utilisez WebdriverIO Standalone, les fonctions `before` et `beforeTest` / `beforeScenario` doivent être appelées manuellement.

```javascript
import { remote } from 'webdriverio';
import WebdriverAjax from 'wdio-intercept-service'

const WDIO_OPTIONS = {
  port: 9515,
  path: '/',
  capabilities: {
    browserName: 'chrome'
  },
}

let browser;
const interceptServiceLauncher = WebdriverAjax();

beforeAll(async () => {
  browser = await remote(WDIO_OPTIONS)
  interceptServiceLauncher.before(null, null, browser)
})

beforeEach(async () => {
  interceptServiceLauncher.beforeTest()
})

afterAll(async () => {
  await client.deleteSession()
});

describe('', async () => {
  ... // See example usage
});
```

Une fois initialisées, certaines fonctions connexes sont ajoutées à votre chaîne de commandes de navigateur (voir [API](#api)).

## Démarrage rapide

Exemple d'utilisation :

```javascript
browser.url('http://foo.bar');
browser.setupInterceptor(); // capture ajax calls
browser.expectRequest('GET', '/api/foo', 200); // expect GET request to /api/foo with 200 statusCode
browser.expectRequest('POST', '/api/foo', 400); // expect POST request to /api/foo with 400 statusCode
browser.expectRequest('GET', /\/api\/foo/, 200); // can validate a URL with regex, too
browser.click('#button'); // button that initiates ajax request
browser.pause(1000); // maybe wait a bit until request is finished
browser.assertRequests(); // validate the requests
```

Obtenir des détails sur les requêtes :

```javascript
browser.url('http://foo.bar')
browser.setupInterceptor();
browser.click('#button')
browser.pause(1000);

var request = browser.getRequest(0);
assert.equal(request.method, 'GET');
assert.equal(request.response.headers['content-length'], '42');
```

## Navigateurs pris en charge

Il devrait fonctionner avec les versions relativement récentes de tous les navigateurs. Veuillez signaler un problème s'il ne semble pas fonctionner avec le vôtre.

## API

Consultez le fichier de déclaration TypeScript pour connaître la syntaxe complète des commandes personnalisées ajoutées à l'objet navigateur WebdriverIO. En général, toute méthode qui prend un objet "options" comme paramètre peut être appelée sans ce paramètre pour obtenir le comportement par défaut. Ces objets "options" optionnels sont suivis par `?: = {}` et les valeurs par défaut déduites sont décrites pour chaque méthode.

### Descriptions des options

Cette bibliothèque offre une petite quantité de configuration lors de l'émission de commandes. Les options de configuration utilisées par plusieurs méthodes sont décrites ici (voir la définition de chaque méthode pour déterminer le support spécifique).

* `orderBy` (`'START' | 'END'`) : Cette option contrôle l'ordre des requêtes capturées par l'intercepteur, lorsqu'elles sont renvoyées à votre test. Pour la compatibilité avec les versions existantes de cette bibliothèque, l'ordre par défaut est `'END'`, qui correspond au moment où la requête a été complétée. Si vous définissez l'option `orderBy` sur `'START'`, alors les requêtes seront ordonnées selon le moment où elles ont été démarrées.
* `includePending` (`boolean`) : Cette option contrôle si les requêtes non encore terminées seront renvoyées. Pour la compatibilité avec les versions existantes de cette bibliothèque, la valeur par défaut est `false`, et seules les requêtes terminées seront renvoyées.

### browser.setupInterceptor()

Capture les appels ajax dans le navigateur. Vous devez toujours appeler la fonction de configuration afin d'évaluer les requêtes ultérieurement.

### browser.disableInterceptor()

Empêche la capture supplémentaire d'appels ajax dans le navigateur. Toutes les informations de requête capturées sont supprimées. La plupart des utilisateurs n'auront pas besoin de désactiver l'intercepteur, mais si un test est particulièrement long ou dépasse la capacité de stockage de session, la désactivation de l'intercepteur peut être utile.

### `browser.excludeUrls(urlRegexes: (string | RegExp)[])`

Exclut les requêtes provenant de certaines URLs d'être enregistrées. Elle prend un tableau de chaînes ou d'expressions régulières. Avant d'écrire dans le stockage,
teste l'url de la requête par rapport à chaque chaîne ou regex. Si c'est le cas, la requête n'est pas écrite dans le stockage. Comme disableInterceptor, cela peut être utile
si vous rencontrez des problèmes de dépassement de capacité du stockage de session.

### browser.expectRequest(method: string, url: string, statusCode: number)

Définir des attentes concernant les requêtes ajax qui vont être initiées pendant le test. Peut (et devrait) être chaîné. L'ordre des attentes devrait correspondre à l'ordre des requêtes effectuées.

* `method` (`String`) : méthode http attendue. Peut être n'importe quoi que `xhr.open()` accepte comme premier argument.
* `url` (`String`|`RegExp`) : URL exacte qui est appelée dans la requête sous forme de chaîne ou RegExp à faire correspondre
* `statusCode` (`Number`) : code de statut attendu de la réponse

### browser.getExpectations()

Méthode auxiliaire. Renvoie toutes les attentes que vous avez définies jusqu'à ce point

### browser.resetExpectations()

Méthode auxiliaire. Réinitialise toutes les attentes que vous avez définies jusqu'à ce point

### `browser.assertRequests({ orderBy?: 'START' | 'END' }?: = {})`

Appelez cette méthode lorsque toutes les requêtes ajax attendues sont terminées. Elle compare les attentes aux requêtes réelles effectuées et affirme ce qui suit :

- Nombre de requêtes qui ont été effectuées
- L'ordre des requêtes
- La méthode, l'URL et le statusCode doivent correspondre pour chaque requête effectuée
- L'objet options a par défaut `{ orderBy: 'END' }`, c'est-à-dire quand les requêtes ont été complétées, pour être cohérent avec le comportement de la v4.1.10 et antérieures. Lorsque l'option `orderBy` est définie sur `'START'`, les requêtes seront ordonnées selon le moment où elles ont été initiées par la page.

### `browser.assertExpectedRequestsOnly({ inOrder?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Similaire à `browser.assertRequests`, mais valide uniquement les requêtes que vous spécifiez dans vos directives `expectRequest`, sans avoir à cartographier toutes les requêtes réseau qui pourraient se produire autour de cela. Si l'option `inOrder` est `true` (par défaut), les requêtes sont censées être trouvées dans le même ordre qu'elles ont été configurées avec `expectRequest`.

### `browser.getRequest(index: number, { includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Pour faire des assertions plus sophistiquées sur une requête spécifique, vous pouvez obtenir des détails pour une requête spécifique. Vous devez fournir l'index basé sur 0 de la requête à laquelle vous souhaitez accéder, dans l'ordre où les requêtes ont été complétées (par défaut), ou initiées (en passant l'option `orderBy: 'START'`).

* `index` (`number`) : numéro de la requête à laquelle vous souhaitez accéder
* `options` (`object`) : Options de configuration
* `options.includePending` (`boolean`) : Si les requêtes non encore terminées doivent être renvoyées. Par défaut, c'est false, pour correspondre au comportement de la bibliothèque en v4.1.10 et antérieures.
* `options.orderBy` (`'START' | 'END'`) : Comment les requêtes doivent être ordonnées. Par défaut, c'est `'END'`, pour correspondre au comportement de la bibliothèque en v4.1.10 et antérieures. Si `'START'`, les requêtes seront ordonnées par le moment de l'initiation, plutôt que par le moment de la fin de la requête. (Comme une requête en attente n'est pas encore terminée, lors de l'ordre par `'END'` toutes les requêtes en attente viendront après toutes les requêtes terminées.)

**Retourne** l'objet `request` :

* `request.url` : URL demandée
* `request.method` : méthode HTTP utilisée
* `request.body` : données de charge utile/corps utilisées dans la requête
* `request.headers` : en-têtes http de la requête sous forme d'objet JS
* `request.pending` : indicateur booléen indiquant si cette requête est terminée (c'est-à-dire a une propriété `response`), ou en cours.
* `request.response` : un objet JS qui n'est présent que si la requête est terminée (c'est-à-dire `request.pending === false`), contenant des données sur la réponse.
* `request.response?.headers` : en-têtes http de réponse sous forme d'objet JS
* `request.response?.body` : corps de la réponse (sera analysé comme JSON si possible)
* `request.response?.statusCode` : code d'état de la réponse

**Une note sur `request.body` :** wdio-intercept-service essaiera d'analyser le corps de la requête comme suit :

* chaîne : Renvoie simplement la chaîne (`'value'`)
* JSON : Analyse l'objet JSON en utilisant `JSON.parse()` (`({ key: value })`)
* FormData : Affichera les FormData au format `{ key: [value1, value2, ...] }`
* ArrayBuffer : Essaiera de convertir le tampon en chaîne (expérimental)
* Tout autre chose : Utilisera un brutal `JSON.stringify()` sur vos données. Bonne chance !

**Pour l'API `fetch`, nous ne prenons en charge que les données de type chaîne et JSON !**

### `browser.getRequests({ includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Obtenez toutes les requêtes capturées sous forme de tableau, en prenant en charge les mêmes options optionnelles que `getRequest`.

**Retourne** un tableau d'objets `request`.

### browser.hasPendingRequests()

Une méthode utilitaire qui vérifie si des requêtes HTTP sont encore en attente. Peut être utilisée par les tests pour s'assurer que toutes les requêtes sont terminées dans un délai raisonnable, ou pour vérifier qu'un appel à `getRequests()` ou `assertRequests()` inclura toutes les requêtes HTTP souhaitées.

**Retourne** booléen

## Support TypeScript

Ce plugin fournit ses propres types TS. Pointez simplement votre tsconfig vers les extensions de type comme mentionné [ici](https://webdriver.io/docs/typescript.html#framework-types) :

```
"compilerOptions": {
    // ..
    "types": ["node", "webdriverio", "wdio-intercept-service"]
},
```

## Exécution des tests

Des versions récentes de Chrome et Firefox sont nécessaires pour exécuter les tests localement. Vous devrez peut-être mettre à jour les dépendances `chromedriver` et `geckodriver` pour correspondre à la version installée sur votre système.

```shell
npm test
```

## Contribution

Je suis heureux pour chaque contribution. Ouvrez simplement un problème ou directement un PR.  
Veuillez noter que cette bibliothèque d'intercepteur est écrite pour fonctionner avec des navigateurs hérités tels qu'Internet Explorer. En tant que tel, tout code utilisé dans `lib/interceptor.js` doit au moins être analysable par le runtime JavaScript d'Internet Explorer.

## Licence

MIT