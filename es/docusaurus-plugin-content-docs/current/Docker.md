---
id: docker
title: Docker
description: "Ejecuta tu suite de pruebas de WebdriverIO dentro de un contenedor Docker con un navegador preinstalado para obtener resultados consistentes en todas las máquinas."
---

Docker es una potente tecnología de contenedorización que permite encapsular tu suite de pruebas en un contenedor que se comporta igual en todos los sistemas. Esto puede evitar inestabilidad debido a diferentes versiones de navegador o plataforma. Para ejecutar tus pruebas dentro de un contenedor, crea un `Dockerfile` en el directorio de tu proyecto, por ejemplo:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Cambia el navegador y la versión según tus necesidades
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Asegúrate de no incluir tus `node_modules` en tu imagen de Docker y de que estos se instalen al construir la imagen. Para ello, añade un archivo `.dockerignore` con el siguiente contenido:

```
node_modules
```

:::info
Aquí estamos usando una imagen de Docker que viene con Selenium y Google Chrome preinstalados. Hay varias imágenes disponibles con diferentes configuraciones y versiones de navegador. Consulta las imágenes mantenidas por el proyecto Selenium [en Docker Hub](https://hub.docker.com/u/selenium).
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

Como se menciona en [Protocolos de automatización](/docs/automationProtocols), puedes ejecutar WebdriverIO usando el protocolo WebDriver o el protocolo WebDriver BiDi. Asegúrate de que la versión de Chrome instalada en tu imagen coincida con la versión de [Chromedriver](https://www.npmjs.com/package/chromedriver) que has definido en tu `package.json`.

Para construir el contenedor Docker puedes ejecutar:

```sh
docker build -t mytest -f Dockerfile .
```

Luego, para ejecutar las pruebas, ejecuta:

```sh
docker run -it mytest
```

Para obtener más información sobre cómo configurar la imagen de Docker, consulta la [documentación de Docker](https://docs.docker.com/).