---
id: v7-migration
title: De v6 a v7
---

Este tutorial es para personas que todavía están usando `v6` de WebdriverIO y quieren migrar a `v7`. Como se mencionó en nuestra [publicación del blog de lanzamiento](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), los cambios son principalmente internos y la actualización debería ser un proceso sencillo.

:::info

Si estás usando WebdriverIO `v5` o inferior, por favor actualiza primero a `v6`. Consulta nuestra [guía de migración a v6](v6-migration).

:::

Aunque nos encantaría tener un proceso completamente automatizado para esto, la realidad es diferente. Cada uno tiene una configuración diferente. Cada paso debe verse como una guía y menos como una instrucción paso a paso. Si tienes problemas con la migración, no dudes en [contactarnos](https://github.com/webdriverio/codemod/discussions/new).

## Configuración

Similar a otras migraciones, podemos usar el [codemod](https://github.com/webdriverio/codemod) de WebdriverIO. Para este tutorial usamos un [proyecto de plantilla](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) enviado por un miembro de la comunidad y lo migramos completamente de `v6` a `v7`.

Para instalar el codemod, ejecuta:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commits:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Actualizar Dependencias de WebdriverIO

Dado que todas las versiones de WebdriverIO están vinculadas entre sí, es mejor actualizar siempre a una etiqueta específica, por ejemplo, `latest`. Para hacerlo, copiamos todas las dependencias relacionadas con WebdriverIO de nuestro `package.json` y las reinstalamos mediante:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Normalmente, las dependencias de WebdriverIO son parte de las dependencias de desarrollo, aunque esto puede variar según tu proyecto. Después de esto, tu `package.json` y `package-lock.json` deberían estar actualizados. __Nota:__ estas son las dependencias utilizadas por el [proyecto de ejemplo](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), las tuyas pueden ser diferentes.

#### Commits:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Transformar Archivo de Configuración

Un buen primer paso es comenzar con el archivo de configuración. En WebdriverIO `v7` ya no necesitamos registrar manualmente ninguno de los compiladores. De hecho, deben eliminarse. Esto se puede hacer con el codemod de forma completamente automática:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

El codemod aún no admite proyectos TypeScript. Ver [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Estamos trabajando para implementar soporte pronto. Si estás usando TypeScript, ¡por favor involúcrate!

:::

#### Commits:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Actualizar Definiciones de Pasos

Si estás usando Jasmine o Mocha, has terminado aquí. El último paso es actualizar las importaciones de Cucumber.js de `cucumber` a `@cucumber/cucumber`. Esto también se puede hacer a través del codemod automáticamente:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

¡Eso es todo! No se necesitan más cambios 🎉

#### Commits:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Conclusión

Esperamos que este tutorial te guíe un poco a través del proceso de migración a WebdriverIO `v7`. La comunidad continúa mejorando el codemod mientras lo prueba con varios equipos en diversas organizaciones. No dudes en [crear un issue](https://github.com/webdriverio/codemod/issues/new) si tienes comentarios o [iniciar una discusión](https://github.com/webdriverio/codemod/discussions/new) si tienes dificultades durante el proceso de migración.