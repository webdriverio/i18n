---
id: v6-migration
title: De v5 a v6
---

Este tutorial es para personas que todavía están usando `v5` de WebdriverIO y quieren migrar a `v6` o a la última versión de WebdriverIO. Como se mencionó en nuestra [publicación del blog de lanzamiento](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), los cambios para esta actualización de versión se pueden resumir de la siguiente manera:

- consolidamos los parámetros para algunos comandos (por ejemplo, `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) y movimos todos los parámetros opcionales a un solo objeto, por ejemplo:

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

- las configuraciones para servicios se movieron a la lista de servicios, por ejemplo:

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

- algunas opciones de servicio fueron renombradas por motivos de simplificación
- renombramos el comando `launchApp` a `launchChromeApp` para sesiones de Chrome WebDriver

:::info

Si estás usando WebdriverIO `v4` o inferior, por favor actualiza primero a `v5`.

:::

Aunque nos encantaría tener un proceso completamente automatizado para esto, la realidad es diferente. Cada uno tiene una configuración diferente. Cada paso debe verse como una guía y menos como una instrucción paso a paso. Si tienes problemas con la migración, no dudes en [contactarnos](https://github.com/webdriverio/codemod/discussions/new).

## Configuración

Similar a otras migraciones, podemos usar el [codemod](https://github.com/webdriverio/codemod) de WebdriverIO. Para instalar el codemod, ejecuta:

```sh
npm install jscodeshift @wdio/codemod
```

## Actualizar Dependencias de WebdriverIO

Dado que todas las versiones de WebdriverIO están vinculadas entre sí, lo mejor es siempre actualizar a una etiqueta específica, por ejemplo, `6.12.0`. Si decides actualizar directamente de `v5` a `v7`, puedes omitir la etiqueta e instalar las últimas versiones de todos los paquetes. Para hacerlo, copiamos todas las dependencias relacionadas con WebdriverIO de nuestro `package.json` y las reinstalamos mediante:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Normalmente, las dependencias de WebdriverIO son parte de las dependencias de desarrollo, aunque esto puede variar según tu proyecto. Después de esto, tu `package.json` y `package-lock.json` deberían estar actualizados. __Nota:__ estas son dependencias de ejemplo, las tuyas pueden ser diferentes. Asegúrate de encontrar la última versión v6 disponible llamando, por ejemplo:

```sh
npm show webdriverio versions
```

Intenta instalar la última versión 6 disponible para todos los paquetes principales de WebdriverIO. Para paquetes de la comunidad, esto puede diferir de un paquete a otro. Aquí recomendamos verificar el registro de cambios para obtener información sobre qué versión sigue siendo compatible con v6.

## Transformar Archivo de Configuración

Un buen primer paso es comenzar con el archivo de configuración. Todos los cambios importantes se pueden resolver utilizando el codemod de forma completamente automática:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

El codemod aún no admite proyectos TypeScript. Ver [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Estamos trabajando para implementar soporte pronto. Si estás usando TypeScript, ¡por favor involúcrate!

:::

## Actualizar Archivos de Especificación y Objetos de Página

Para actualizar todos los cambios de comandos, ejecuta el codemod en todos tus archivos e2e que contengan comandos de WebdriverIO, por ejemplo:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

¡Eso es todo! No se necesitan más cambios 🎉

## Conclusión

Esperamos que este tutorial te guíe un poco a través del proceso de migración a WebdriverIO `v6`. Recomendamos encarecidamente continuar actualizando a la última versión, dado que la actualización a `v7` es trivial debido a casi ningún cambio importante. Por favor, consulta la guía de migración [para actualizar a v7](v7-migration).

La comunidad continúa mejorando el codemod mientras lo prueba con varios equipos en diversas organizaciones. No dudes en [reportar un problema](https://github.com/webdriverio/codemod/issues/new) si tienes comentarios o [iniciar una discusión](https://github.com/webdriverio/codemod/discussions/new) si tienes dificultades durante el proceso de migración.