---
id: sumologic-reporter
title: Reportero Sumologic
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---


> Un reportero de WebdriverIO que envía resultados de pruebas a [Sumologic](https://www.sumologic.com/) para análisis de datos

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## Instalación

La forma más sencilla es mantener `@wdio/sumologic-reporter` como una devDependency en tu `package.json`, mediante:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted).

## Configuración

Primero debemos crear un nuevo colector que recopile todos los registros de tus pruebas. Para hacerlo, haz clic en __Manage__ en la barra de navegación y ve a __Collection__. Allí necesitas añadir un nuevo "Hosted Collector". Aplica un nombre adecuado, por ejemplo, "test integration logs", una descripción y una categoría, por ejemplo, "wdio". Haz clic en Guardar para crear el colector.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

El siguiente paso es añadir una fuente. Tiene sentido tener una fuente propia para cada uno de tus entornos (por ejemplo, compilación de rama, integración). Haz clic en el enlace "Add Source" junto a tu colector y añade un __HTTP Source__. Aplica nuevamente un nombre y descripción adecuados y establece una "Source Category" que refleje el entorno. Deja las otras opciones en estado predeterminado y haz clic en guardar.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

Aparecerá un modal con el punto de conexión de la fuente. Copia esa URL y pégala en tu wdio.conf.js para que el reportero sepa a dónde enviar los datos.

El siguiente código muestra la configuración predeterminada del ejecutor de pruebas wdio. Solo añade `'sumologic'` como reportero al arreglo y añade tu punto de conexión de origen:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

Después de ejecutar las primeras pruebas con el reportero, deberías poder verificar los registros de pruebas con la siguiente consulta:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Pronto proporcionaré algunas plantillas de panel útiles para Sumologic.

----

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).