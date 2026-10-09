---
id: cloudservices
title: Uso de servicios en la nube
description: "Ejecuta pruebas de WebdriverIO en Sauce Labs, BrowserStack, TestingBot, TestMu AI (anteriormente LambdaTest), Perfecto y otros proveedores en la nube."
---

Usar servicios bajo demanda como Sauce Labs, Browserstack, TestingBot, TestMu AI (anteriormente LambdaTest) o Perfecto con WebdriverIO es bastante sencillo. Todo lo que necesitas hacer es establecer el `user` y la `key` de tu servicio en tus opciones.

Opcionalmente, también puedes parametrizar tu prueba estableciendo capacidades específicas de la nube como `build`. Si solo quieres ejecutar servicios en la nube en Travis, puedes usar la variable de entorno `CI` para comprobar si estás en Travis y modificar la configuración en consecuencia.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Puedes configurar tus pruebas para que se ejecuten de forma remota en [Sauce Labs](https://saucelabs.com).

El único requisito es establecer el `user` y la `key` en tu configuración (ya sea exportada por `wdio.conf.js` o pasada a `webdriverio.remote(...)`) con tu nombre de usuario y clave de acceso de Sauce Labs.

También puedes pasar cualquier [opción de configuración de prueba](https://docs.saucelabs.com/dev/test-configuration-options/) opcional como clave/valor en las capacidades de cualquier navegador.

### Sauce Connect

Si quieres ejecutar pruebas contra un servidor que no es accesible desde Internet (como en `localhost`), entonces necesitas usar [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Dar soporte a esto está fuera del alcance de WebdriverIO, así que tendrás que iniciarlo por tu cuenta.

Si estás usando el testrunner de WDIO, descarga y configura el [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) en tu `wdio.conf.js`. Ayuda a poner en marcha Sauce Connect e incluye funciones adicionales que integran mejor tus pruebas en el servicio de Sauce.

### Con Travis CI

Sin embargo, Travis CI [sí tiene soporte](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) para iniciar Sauce Connect antes de cada prueba, por lo que seguir sus instrucciones para ello es una opción.

Si lo haces, debes establecer la opción de configuración de prueba `tunnel-identifier` en las `capabilities` de cada navegador. Travis la establece por defecto en la variable de entorno `TRAVIS_JOB_NUMBER`.

Además, si quieres que Sauce Labs agrupe tus pruebas por número de build, puedes establecer `build` en `TRAVIS_BUILD_NUMBER`.

Por último, si estableces `name`, esto cambia el nombre de esta prueba en Sauce Labs para este build. Si estás usando el testrunner de WDIO combinado con el [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO establece automáticamente un nombre adecuado para la prueba.

Ejemplo de `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Tiempos de espera

Dado que estás ejecutando tus pruebas de forma remota, podría ser necesario aumentar algunos tiempos de espera.

Puedes cambiar el [tiempo de inactividad](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) pasando `idle-timeout` como opción de configuración de prueba. Esto controla cuánto tiempo esperará Sauce entre comandos antes de cerrar la conexión.

## BrowserStack

WebdriverIO también tiene una integración con [Browserstack](https://www.browserstack.com) incorporada.

El único requisito es establecer el `user` y la `key` en tu configuración (ya sea exportada por `wdio.conf.js` o pasada a `webdriverio.remote(...)`) con tu nombre de usuario y clave de acceso de Browserstack Automate.

También puedes pasar cualquier [capacidad soportada](https://www.browserstack.com/automate/capabilities) opcional como clave/valor en las capacidades de cualquier navegador. Si estableces `browserstack.debug` en `true`, grabará un screencast de la sesión, lo cual podría ser útil.

### Pruebas locales

Si quieres ejecutar pruebas contra un servidor que no es accesible desde Internet (como en `localhost`), entonces necesitas usar [Local Testing](https://www.browserstack.com/local-testing#command-line).

Dar soporte a esto está fuera del alcance de WebdriverIO, así que debes iniciarlo por tu cuenta.

Si usas local, debes establecer `browserstack.local` en `true` en tus capacidades.

Si estás usando el testrunner de WDIO, descarga y configura el [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) en tu `wdio.conf.js`. Ayuda a poner en marcha BrowserStack e incluye funciones adicionales que integran mejor tus pruebas en el servicio de BrowserStack.

### Con Travis CI

Si quieres añadir Local Testing en Travis, tienes que iniciarlo por tu cuenta.

El siguiente script lo descargará y lo iniciará en segundo plano. Deberías ejecutarlo en Travis antes de iniciar las pruebas.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Además, quizás quieras establecer `build` con el número de build de Travis.

Ejemplo de `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

El único requisito es establecer el `user` y la `key` en tu configuración (ya sea exportada por `wdio.conf.js` o pasada a `webdriverio.remote(...)`) con tu nombre de usuario y clave secreta de [TestingBot](https://testingbot.com).

También puedes pasar cualquier [capacidad soportada](https://testingbot.com/support/other/test-options) opcional como clave/valor en las capacidades de cualquier navegador.

### Pruebas locales

Si quieres ejecutar pruebas contra un servidor que no es accesible desde Internet (como en `localhost`), entonces necesitas usar [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot proporciona un túnel basado en Java que te permite probar sitios web no accesibles desde Internet.

Su página de soporte del túnel contiene la información necesaria para ponerlo en marcha.

Si estás usando el testrunner de WDIO, descarga y configura el [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) en tu `wdio.conf.js`. Ayuda a poner en marcha TestingBot e incluye funciones adicionales que integran mejor tus pruebas en el servicio de TestingBot.

## TestMu AI (anteriormente LambdaTest)

La integración con [TestMu AI](https://www.testmuai.com/) también está incorporada.

El único requisito es establecer el `user` y la `key` en tu configuración (ya sea exportada por `wdio.conf.js` o pasada a `webdriverio.remote(...)`) con el nombre de usuario y la clave de acceso de tu cuenta de TestMu AI.

También puedes pasar cualquier [capacidad soportada](https://www.testmuai.com/capabilities-generator/) opcional como clave/valor en las capacidades de cualquier navegador. Si estableces `visual` en `true`, grabará un screencast de la sesión, lo cual podría ser útil.

### Túnel para pruebas locales

Si quieres ejecutar pruebas contra un servidor que no es accesible desde Internet (como en `localhost`), entonces necesitas usar [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Dar soporte a esto está fuera del alcance de WebdriverIO, así que debes iniciarlo por tu cuenta.

Si usas local, debes establecer `tunnel` en `true` en tus capacidades.

Si estás usando el testrunner de WDIO, descarga y configura el [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) en tu `wdio.conf.js`. Ayuda a poner en marcha TestMu AI e incluye funciones adicionales que integran mejor tus pruebas en el servicio de TestMu AI.

### Con Travis CI

Si quieres añadir Local Testing en Travis, tienes que iniciarlo por tu cuenta.

El siguiente script lo descargará y lo iniciará en segundo plano. Deberías ejecutarlo en Travis antes de iniciar las pruebas.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Además, quizás quieras establecer `build` con el número de build de Travis.

Ejemplo de `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Al usar wdio con [`Perfecto`](https://www.perfecto.io), necesitas crear un token de seguridad para cada usuario y añadirlo en la estructura de capacidades (además de otras capacidades), de la siguiente manera:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Además, necesitas añadir la configuración de la nube, de la siguiente manera:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) proporciona dispositivos Android e iOS reales junto con nodos de navegador detrás de un único endpoint. Se autentica con un token de API en lugar de un par de `user` y `key`. Envía el token como una cabecera bearer:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

Alternativamente, pasa el token como prefijo de la ruta, que el grid elimina antes de reenviar la solicitud:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

El grid también acepta credenciales incrustadas en la URL (`https://user:token@host`) para otros clientes WebDriver, pero esa forma no se puede usar desde WebdriverIO: está basado en fetch, y Node.js rechaza las credenciales incrustadas en la URL.

Para ejecutar en un dispositivo real, pasa el navegador como una capacidad de Appium junto con cualquiera de los estilos de conexión anteriores:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```