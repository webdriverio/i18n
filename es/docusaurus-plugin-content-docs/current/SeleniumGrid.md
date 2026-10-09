---
id: seleniumgrid
title: Selenium Grid
description: "Conecta las pruebas de WebdriverIO a un Selenium Grid existente configurando el protocolo, el hostname, el puerto y la ruta en tu configuración."
---

Puedes usar WebdriverIO con tu instancia existente de Selenium Grid. Para conectar tus pruebas a Selenium Grid, solo necesitas actualizar las opciones en la configuración de tu test runner.

Aquí tienes un fragmento de código de un archivo wdio.conf.ts de ejemplo.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Debes proporcionar los valores adecuados para el protocolo, el hostname, el puerto y la ruta según la configuración de tu Selenium Grid.
Si ejecutas Selenium Grid en la misma máquina que tus scripts de prueba, estas son algunas opciones típicas:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### Autenticación básica con un Selenium Grid protegido

Se recomienda encarecidamente proteger tu Selenium Grid. Si tienes un Selenium Grid protegido que requiere autenticación, puedes pasar encabezados de autenticación mediante las opciones.
Consulta la sección [headers](https://webdriver.io/docs/configuration/#headers) de la documentación para obtener más información.

### Configuración de tiempos de espera con un Selenium Grid dinámico

Al usar un Selenium Grid dinámico en el que los pods de navegador se levantan bajo demanda, la creación de sesiones puede sufrir un arranque en frío. En estos casos, se aconseja aumentar los tiempos de espera para la creación de sesiones. El valor predeterminado en las opciones es de 120 segundos, pero puedes aumentarlo si tu grid tarda más en crear una nueva sesión.

```ts
connectionRetryTimeout: 180000,
```

### Configuraciones avanzadas

Para configuraciones avanzadas, consulta el [archivo de configuración](https://webdriver.io/docs/configurationfile) del Testrunner.

### Operaciones con archivos en Selenium Grid

Al ejecutar casos de prueba con un Selenium Grid remoto, el navegador se ejecuta en una máquina remota, por lo que debes tener especial cuidado con los casos de prueba que implican subir y descargar archivos.

### Descargas de archivos

Para navegadores basados en Chromium, puedes consultar la documentación de [Download file](https://webdriver.io/docs/api/browser/downloadFile). Si tus scripts de prueba necesitan leer el contenido de un archivo descargado, debes descargarlo desde el nodo remoto de Selenium a la máquina del test runner. Aquí tienes un fragmento de código de ejemplo de la configuración `wdio.conf.ts` para el navegador Chrome:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### Subida de archivos con un Selenium Grid remoto

[`element.setFiles()`](/docs/api/element/setFiles) establece un input de archivo a través de WebDriver BiDi. Las rutas que pasas las abre el navegador, por lo que deben existir en la máquina que ejecuta el navegador. WebdriverIO no transfiere un archivo local a un nodo de Selenium.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

Una suite que usaba `browser.uploadFile()` para enviar bytes al nodo debe colocar el archivo donde el navegador pueda leerlo y luego llamar a `setFiles`. El endpoint [`file`](/docs/api/selenium#file) de Selenium sigue disponible como `browser.file()` para Chromedriver, Edgedriver y Selenium Grid. No es un comando de WebDriver ni de WebDriver BiDi.

### Otras operaciones de archivos/grid

Hay algunas operaciones más que puedes realizar con Selenium Grid. Las instrucciones para Selenium Standalone también deberían funcionar correctamente con Selenium Grid. Consulta la documentación de [Selenium Standalone](https://webdriver.io/docs/api/selenium/) para ver las opciones disponibles.


### Documentación oficial de Selenium Grid

Para obtener más información sobre Selenium Grid, puedes consultar la [documentación](https://www.selenium.dev/documentation/grid/) oficial de Selenium Grid.

Si deseas ejecutar Selenium Grid en Docker, Docker Compose o Kubernetes, consulta el [repositorio de GitHub](https://github.com/SeleniumHQ/docker-selenium) de Selenium-Docker.