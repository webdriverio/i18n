---
id: wdio-docker-service
title: Service Docker
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---


> wdio-docker-service est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

Ce service est destiné à être utilisé avec [WebdriverIO](http://webdriver.io/) et aide à exécuter des tests fonctionnels/d'intégration 
contre/en utilisant des applications conteneurisées. Il utilise le populaire service [Docker](https://www.docker.com/) (installé séparément) pour exécuter des conteneurs.

## Pourquoi l'utiliser ?
Idéalement, vos tests s'exécuteraient dans une variété de pipeline CI/CD où souvent il n'y a pas de "vrais" navigateurs et autres ressources
dont dépend votre application. Avec l'avènement de Docker, pratiquement toutes les dépendances d'application nécessaires peuvent être conteneurisées.
Avec ce service, vous pouvez exécuter votre conteneur d'application ou un [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) dans votre CI et en isolation complète 
(en supposant que CI puisse avoir Docker installé comme dépendance). La même chose peut s'appliquer au développement local si votre application a besoin d'avoir un niveau
d'isolation par rapport à votre système d'exploitation principal.

## Comment ça fonctionne
Le service exécutera une image docker existante et une fois qu'elle est prête, lancera les tests WebdriverIO qui doivent s'exécuter contre votre application conteneurisée.

## Installation

Exécutez :

```bash
npm install wdio-docker-service --save-dev
```

Les instructions sur l'installation de WebdriverIO peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted).

## Configuration
Par défaut, Google Chrome, Firefox et PhantomJS sont disponibles lorsqu'ils sont installés sur le système hôte. 
Pour utiliser le service, vous devez ajouter `docker` à votre tableau de services :

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## Options

### dockerOptions
Diverses options requises pour exécuter le conteneur docker

Type : `Object`

Par défaut : `{ 
    options: {
        rm: true
    }
}`

Exemple :

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
Tag de nom de conteneur Docker. Peut être local ou provenir de Docker HUB.

Type : `String`

Obligatoire : `true`

### dockerOptions.healthCheck
Configuration qui vérifie l'état de vos conteneurs avant de lancer les tests. Normalement, ce serait une URL localhost.
Si healthCheck n'est pas configuré, Webdriver commencera à exécuter les tests immédiatement après le démarrage du conteneur Docker, ce qui
peut être trop tôt étant donné qu'il faut du temps pour que le service web démarre à l'intérieur d'un conteneur Docker.

Type : `String|Object`

Options pour l'utilisation d'Object :
- *url* - url vers une application s'exécutant dans votre conteneur
- *maxRetries* - nombre de tentatives jusqu'à l'échec de la vérification de santé. Par défaut : 10
- *inspectInterval* - intervalle entre chaque tentative en ms. Par défaut : 500
- *startDelay* - délai initial pour commencer la vérification de santé en ms. Par défaut : 0

Exemple 1 (String) : `healthCheck: 'http://localhost:4444'`

Exemple 2 (Object) :

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
Carte des options utilisées par la commande `docker run`. Pour plus de détails sur la commande `run`, cliquez [ici](https://docs.docker.com/edge/engine/reference/commandline/run/).

Toute option à lettre unique sera convertie en `-[option]` (c'est-à-dire `d: true` -> `-d`). 

Toute option de deux caractères ou plus sera
convertie en `--[option]` (c'est-à-dire `rm: true` -> `--rm`). 

Pour les options qui peuvent être utilisées plus d'une fois 
(par exemple `-e`,`-add-host`, `--expose`, etc.), veuillez utiliser la notation de tableau (par exemple `e: ["NODE_ENV=development", "FOO=bar"]`).

Type : `Object`

Exemple :

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
Tous les arguments que vous souhaitez passer dans le conteneur. Correspond à `[ARG...]` dans Docker run CLI.

Type : `String`

### dockerOptions.command
Toute commande que vous souhaitez passer dans le conteneur. Correspond à `[COMMAND]` dans Docker run CLI.

Type : `String`

### onDockerReady
Une méthode de rappel qui est appelée lorsque l'application Docker est prête. L'état de préparation est déterminé par la capacité à envoyer un ping à l'URL `healthCheck`.

Type : `Function`

### dockerLogs
Chemin où les journaux du conteneur docker doivent être stockés

Type : `String`

## Cas d'utilisation de test / Recettes
Veuillez visiter notre [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) pour plus de détails.