---
id: docker
title: Docker
---

Docker est une puissante technologie de conteneurisation qui permet d'encapsuler votre suite de tests dans un conteneur qui se comporte de la même manière sur tous les systèmes. Cela peut éviter les instabilités dues aux différentes versions de navigateurs ou de plateformes. Pour exécuter vos tests dans un conteneur, créez un fichier `Dockerfile` dans votre répertoire de projet, par exemple:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Changez le navigateur et la version selon vos besoins
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Assurez-vous de ne pas inclure votre dossier `node_modules` dans votre image Docker et d'installer ces dépendances lors de la construction de l'image. Pour cela, ajoutez un fichier `.dockerignore` avec le contenu suivant:

```
node_modules
```

:::info
Nous utilisons ici une image Docker qui est livrée avec Selenium et Google Chrome préinstallés. Il existe différentes images disponibles avec différentes configurations de navigateurs et versions. Consultez les images maintenues par le projet Selenium [sur Docker Hub](https://hub.docker.com/u/selenium).
:::

Comme nous ne pouvons exécuter Google Chrome qu'en mode headless dans notre conteneur Docker, nous devons modifier notre `wdio.conf.js` pour nous assurer de le faire:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

Comme mentionné dans [Protocoles d'automatisation](/docs/automationProtocols), vous pouvez exécuter WebdriverIO en utilisant le protocole WebDriver ou le protocole WebDriver BiDi. Assurez-vous que la version de Chrome installée sur votre image correspond à la version de [Chromedriver](https://www.npmjs.com/package/chromedriver) que vous avez définie dans votre `package.json`.

Pour construire le conteneur Docker, vous pouvez exécuter:

```sh
docker build -t mytest -f Dockerfile .
```

Ensuite, pour exécuter les tests, lancez:

```sh
docker run -it mytest
```

Pour plus d'informations sur la configuration de l'image Docker, consultez la [documentation Docker](https://docs.docker.com/).