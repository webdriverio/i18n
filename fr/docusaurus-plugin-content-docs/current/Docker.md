---
id: docker
title: Docker
description: "Exécutez votre suite de tests WebdriverIO dans un conteneur Docker avec un navigateur préinstallé pour obtenir des résultats cohérents sur toutes les machines."
---

Docker est une technologie de conteneurisation puissante qui permet d'encapsuler votre suite de tests dans un conteneur qui se comporte de la même manière sur chaque système. Cela peut éviter l'instabilité due à des versions différentes de navigateurs ou de plateformes. Pour exécuter vos tests dans un conteneur, créez un `Dockerfile` dans le répertoire de votre projet, par exemple :

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Modifiez le navigateur et la version selon vos besoins
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Assurez-vous de ne pas inclure vos `node_modules` dans votre image Docker et de les faire installer lors de la construction de l'image. Pour cela, ajoutez un fichier `.dockerignore` avec le contenu suivant :

```
node_modules
```

:::info
Nous utilisons ici une image Docker fournie avec Selenium et Google Chrome préinstallés. Il existe diverses images disponibles avec différentes configurations et versions de navigateurs. Consultez les images maintenues par le projet Selenium [sur Docker Hub](https://hub.docker.com/u/selenium).
:::

Comme nous ne pouvons exécuter Google Chrome qu'en mode headless dans notre conteneur Docker, nous devons modifier notre `wdio.conf.js` pour nous en assurer :

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

Pour construire le conteneur Docker, vous pouvez exécuter :

```sh
docker build -t mytest -f Dockerfile .
```

Ensuite, pour exécuter les tests, lancez :

```sh
docker run -it mytest
```

Pour plus d'informations sur la configuration de l'image Docker, consultez la [documentation Docker](https://docs.docker.com/).

## Images où WebdriverIO télécharge le navigateur

Lorsque l'image ne contient aucun navigateur, WebdriverIO télécharge lui-même Chrome, Chromium, Firefox et Chromedriver. Chrome, Chromium et Chromedriver sont fournis sous forme de fichiers zip, et WebdriverIO les extrait avec la commande `unzip` sous Linux et macOS (`tar.exe` ou PowerShell sous Windows). Les images allégées, comme `node:24-slim`, et les images Alpine minimales ne disposent pas de `unzip`, installez-le donc dans votre `Dockerfile` :

```Dockerfile
FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/*
```

Sur Alpine, utilisez `RUN apk add --no-cache unzip`. Sans cela, le téléchargement échoue avec `Extraction failed: no zip archiver is available`.