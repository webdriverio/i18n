---
id: v6-migration
title: De v5 a v6
description: "Actualiza un proyecto de WebdriverIO de v5 a v6 actualizando las dependencias, transformando el archivo de configuración y actualizando los specs y page objects."
---

Este tutorial es para personas que todavía están usando la `v5` de WebdriverIO y quieren migrar a la `v6` o a la última versión de WebdriverIO. Como se mencionó en nuestra [publicación del blog sobre el lanzamiento](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), los cambios de esta actualización de versión se pueden resumir de la siguiente manera:

- consolidamos los parámetros de algunos comandos (p. ej. `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) y movimos todos los parámetros opcionales a un único objeto, p. ej.

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- las configuraciones de los servicios se movieron a la lista de servicios, p. ej.

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- algunas opciones de servicios se renombraron para simplificarlas
- renombramos el comando `launchApp` a `launchChromeApp` para las sesiones de Chrome WebDriver

:::info

Si estás usando WebdriverIO `v4` o anterior, por favor actualiza primero a `v5`.

:::

Aunque nos encantaría tener un proceso completamente automatizado para esto, la realidad es diferente. Cada uno tiene una configuración distinta. Cada paso debe considerarse una orientación y no tanto una instrucción paso a paso. Si tienes problemas con la migración, no dudes en [contactarnos](https://github.com/webdriverio/codemod/discussions/new).

## Configuración

Al igual que en otras migraciones, podemos usar el [codemod](https://github.com/webdriverio/codemod) de WebdriverIO. Para instalar el codemod, ejecuta:

```sh
npm install jscodeshift @wdio/codemod
```

## Actualizar las dependencias de WebdriverIO

Dado que todas las versiones de WebdriverIO están estrechamente ligadas entre sí, lo mejor es actualizar siempre a una etiqueta específica, p. ej. `6.12.0`. Si decides actualizar directamente de `v5` a `v7`, puedes omitir la etiqueta e instalar las últimas versiones de todos los paquetes. Para ello, copiamos todas las dependencias relacionadas con WebdriverIO de nuestro `package.json` y las reinstalamos mediante:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Normalmente, las dependencias de WebdriverIO forman parte de las dependencias de desarrollo, aunque esto puede variar según tu proyecto. Después de esto, tu `package.json` y `package-lock.json` deberían estar actualizados. __Nota:__ estas son dependencias de ejemplo, las tuyas pueden ser diferentes. Asegúrate de encontrar la última versión v6 ejecutando, p. ej.:

```sh
npm show webdriverio versions
```

Intenta instalar la última versión 6 disponible para todos los paquetes principales de WebdriverIO. Para los paquetes de la comunidad, esto puede variar de un paquete a otro. En este caso, recomendamos consultar el changelog para obtener información sobre qué versión sigue siendo compatible con v6.

## Transformar el archivo de configuración

Un buen primer paso es empezar por el archivo de configuración. Todos los cambios incompatibles se pueden resolver de forma totalmente automática usando el codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

El codemod todavía no es compatible con proyectos de TypeScript. Consulta [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Estamos trabajando para implementar el soporte pronto. Si estás usando TypeScript, ¡participa!

:::

## Actualizar los archivos de specs y los page objects

Para actualizar todos los cambios de comandos, ejecuta el codemod en todos tus archivos e2e que contengan comandos de WebdriverIO, p. ej.:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

¡Eso es todo! No se necesitan más cambios 🎉

## Conclusión

Esperamos que este tutorial te guíe un poco a lo largo del proceso de migración a WebdriverIO `v6`. Recomendamos encarecidamente seguir actualizando a la última versión, dado que actualizar a `v7` es trivial porque casi no tiene cambios incompatibles. Consulta la guía de migración [para actualizar a v7](v7-migration).

La comunidad sigue mejorando el codemod mientras lo prueba con diversos equipos en diversas organizaciones. No dudes en [abrir un issue](https://github.com/webdriverio/codemod/issues/new) si tienes comentarios o [iniciar una discusión](https://github.com/webdriverio/codemod/discussions/new) si tienes dificultades durante el proceso de migración.