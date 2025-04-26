---
id: seleniumgrid
title: Selenium Grid
---

Puedes usar WebdriverIO con tu instancia existente de Selenium Grid. Para conectar tus pruebas a Selenium Grid, solo necesitas actualizar las opciones en las configuraciones de tu ejecutor de pruebas.

Aquí hay un fragmento de código de un ejemplo de wdio.conf.ts.

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
Necesitas proporcionar los valores apropiados para el protocolo, nombre de host, puerto y ruta según tu configuración de Selenium Grid.
Si estás ejecutando Selenium Grid en la misma máquina que tus scripts de prueba, aquí hay algunas opciones típicas:

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

### Autenticación básica con Selenium Grid protegido

Es altamente recomendable asegurar tu Selenium Grid. Si tienes un Selenium Grid protegido que requiere autenticación, puedes pasar encabezados de autenticación a través de opciones.
Por favor, consulta la sección [headers](https://webdriver.io/docs/configuration/#headers) en la documentación para más información.

### Configuraciones de tiempo de espera con Selenium Grid dinámico

Cuando se utiliza un Selenium Grid dinámico donde los pods de navegadores se inician bajo demanda, la creación de sesiones puede enfrentar un inicio en frío. En tales casos, se recomienda aumentar los tiempos de espera de creación de sesiones. El valor predeterminado en las opciones es de 120 segundos, pero puedes aumentarlo si tu grid tarda más tiempo en crear una nueva sesión.

```ts
connectionRetryTimeout: 180000,
```

### Configuraciones avanzadas

Para configuraciones avanzadas, consulta el [archivo de configuración](https://webdriver.io/docs/configurationfile) del Testrunner.

### Operaciones de archivos con Selenium Grid

Cuando ejecutas casos de prueba con un Selenium Grid remoto, el navegador se ejecuta en una máquina remota, y debes tener especial cuidado con los casos de prueba que involucran cargas y descargas de archivos.

### Descargas de archivos

Para navegadores basados en Chromium, puedes consultar la documentación de [Download file](https://webdriver.io/docs/api/browser/downloadFile). Si tus scripts de prueba necesitan leer el contenido de un archivo descargado, debes descargarlo desde el nodo Selenium remoto a la máquina del ejecutor de pruebas. Aquí hay un ejemplo de fragmento de código de la configuración de muestra `wdio.conf.ts` para el navegador Chrome:

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

### Carga de archivos con Selenium Grid remoto

Para cargar un archivo a una aplicación web en el navegador remoto, primero debes cargar el archivo al grid remoto. Puedes consultar la documentación de [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) para más detalles.

### Otras operaciones de archivos/grid

Hay algunas operaciones más que puedes realizar con Selenium Grid. Las instrucciones para Selenium Standalone deberían funcionar bien con Selenium Grid también. Consulta la documentación de [Selenium Standalone](https://webdriver.io/docs/api/selenium/) para conocer las opciones disponibles.

### Documentación oficial de Selenium Grid

Para más información sobre Selenium Grid, puedes consultar la [documentación](https://www.selenium.dev/documentation/grid/) oficial de Selenium Grid.

Si deseas ejecutar Selenium Grid en Docker, Docker compose o Kubernetes, consulta el [repositorio de GitHub](https://github.com/SeleniumHQ/docker-selenium) de Selenium-Docker.