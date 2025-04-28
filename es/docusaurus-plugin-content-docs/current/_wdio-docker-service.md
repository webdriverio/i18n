---
id: wdio-docker-service
title: Servicio Docker
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-service es un paquete de terceros, para más información consulta [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

Este servicio está destinado a usarse con [WebdriverIO](http://webdriver.io/) y ayuda a ejecutar pruebas funcionales/de integración 
contra/usando aplicaciones en contenedores. Utiliza el popular servicio [Docker](https://www.docker.com/) (instalado por separado) para ejecutar contenedores.

## ¿Por qué usarlo?
Idealmente, tus pruebas se ejecutarían en alguna variedad de pipeline CI/CD donde a menudo no hay navegadores "reales" y otros recursos
de los que depende tu aplicación. Con la llegada de Docker, prácticamente todas las dependencias necesarias de la aplicación pueden ser containerizadas.
Con este servicio puedes ejecutar el contenedor de tu aplicación o un [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) en tu CI y en completo aislamiento 
(asumiendo que CI puede tener Docker instalado como dependencia). Lo mismo puede aplicarse al desarrollo local si tu aplicación necesita tener un nivel
de aislamiento de tu sistema operativo principal.

## Cómo funciona
El servicio ejecutará una imagen docker existente y una vez que esté lista, iniciará las pruebas de WebdriverIO que deberían ejecutarse contra tu aplicación en contenedor.

## Instalación

Ejecuta:

```bash
npm install wdio-docker-service --save-dev
```

Las instrucciones sobre cómo instalar WebdriverIO se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted).

## Configuración
Por defecto, Google Chrome, Firefox y PhantomJS están disponibles cuando se instalan en el sistema host. 
Para usar el servicio, necesitas agregar `docker` a tu array de servicios:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## Opciones

### dockerOptions
Varias opciones necesarias para ejecutar el contenedor docker

Tipo: `Object`

Predeterminado: `{ 
    options: {
        rm: true
    }
}`

Ejemplo:

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
Etiqueta de nombre del contenedor Docker. Puede ser local o de Docker HUB.

Tipo: `String`

Requerido: `true`

### dockerOptions.healthCheck
Configuración que verifica la disponibilidad de tus contenedores antes de iniciar las pruebas. Normalmente, esta sería una url de localhost.
Si healthCheck no está configurado, Webdriver comenzará a ejecutar pruebas inmediatamente después de que inicie el contenedor Docker, lo que
puede ser demasiado pronto considerando que el servicio web tarda en iniciarse dentro del contenedor Docker.

Tipo: `String|Object`

Opciones para uso de Object:
- *url* - url a una aplicación que se ejecuta dentro de tu contenedor
- *maxRetries* - número de reintentos hasta que falle el healthcheck. Predeterminado: 10
- *inspectInterval* - intervalo entre cada reintento en ms. Predeterminado: 500
- *startDelay* - retraso inicial para comenzar el healthcheck en ms. Predeterminado: 0

Ejemplo 1 (String): `healthCheck: 'http://localhost:4444'`

Ejemplo 2 (Object):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
Mapa de opciones utilizadas por el comando `docker run`. Para más detalles sobre el comando `run` haz clic [aquí](https://docs.docker.com/edge/engine/reference/commandline/run/).

Cualquier opción de una sola letra se convertirá a `-[option]` (por ejemplo, `d: true` -> `-d`). 

Cualquier opción de dos caracteres o más se
convertirá a `--[option]` (por ejemplo, `rm: true` -> `--rm`). 

Para opciones que pueden usarse más de una vez 
(por ejemplo, `-e`,`-add-host`, `--expose`, etc.), usa la notación de array (por ejemplo, `e: ["NODE_ENV=development", "FOO=bar"]`).

Tipo: `Object`

Ejemplo:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
Cualquier argumento que quieras pasar al contenedor. Corresponde a `[ARG...]` en Docker run CLI.

Tipo: `String`

### dockerOptions.command
Cualquier comando que quieras pasar al contenedor. Corresponde a `[COMMAND]` en Docker run CLI.

Tipo: `String`

### onDockerReady
Un método de callback que se llama cuando la aplicación Docker está lista. La disponibilidad se determina por la capacidad de hacer ping a la url de `healthCheck`.

Tipo: `Function`

### dockerLogs
Ruta donde se deben almacenar los logs del contenedor docker

Tipo: `String`

## Casos de uso de pruebas / Recetas
Por favor, visita nuestra [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) para más detalles.