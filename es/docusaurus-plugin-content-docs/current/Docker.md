---
id: docker
title: Docker
---

Docker es una potente tecnología de contenedorización que permite encapsular tu suite de pruebas en un contenedor que se comporta igual en todos los sistemas. Esto puede evitar inestabilidades debido a diferentes versiones de navegadores o plataformas. Para ejecutar tus pruebas dentro de un contenedor, crea un archivo `Dockerfile` en el directorio de tu proyecto, por ejemplo:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Asegúrate de no incluir tu carpeta `node_modules` en tu imagen Docker y de tenerla instalada al construir la imagen. Para ello, añade un archivo `.dockerignore` con el siguiente contenido:

```
node_modules
```

:::info
Aquí estamos utilizando una imagen Docker que viene con Selenium y Google Chrome preinstalados. Hay varias imágenes disponibles con diferentes configuraciones de navegadores y versiones. Consulta las imágenes mantenidas por el proyecto Selenium [en Docker Hub](https://hub.docker.com/u/selenium).
:::

Como solo podemos ejecutar Google Chrome en modo headless en nuestro contenedor Docker, tenemos que modificar nuestro `wdio.conf.js` para asegurarnos de hacerlo:

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

Como se mencionó en [Protocolos de Automatización](/docs/automationProtocols), puedes ejecutar WebdriverIO usando el protocolo WebDriver o el protocolo WebDriver BiDi. Asegúrate de que la versión de Chrome instalada en tu imagen coincida con la versión de [Chromedriver](https://www.npmjs.com/package/chromedriver) que has definido en tu `package.json`.

Para construir el contenedor Docker puedes ejecutar:

```sh
docker build -t mytest -f Dockerfile .
```

Luego, para ejecutar las pruebas, ejecuta:

```sh
docker run -it mytest
```

Para más información sobre cómo configurar la imagen Docker, consulta la [documentación de Docker](https://docs.docker.com/).