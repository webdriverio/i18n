---
id: sauce-service
title: Servicio de Sauce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Servicio de WebdriverIO que proporciona una mejor integración con Sauce Labs. Este servicio puede utilizarse para:

- la Nube de Máquinas Virtuales de Sauce Labs (Desktop Web/Emulador/Simulador)
- la nube de Dispositivos Reales de Sauce Labs (iOS y Android)

Puede actualizar los metadatos del trabajo ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') y ejecutar Sauce Connect si se desea.

Qué más hará este servicio por ti:

- Por defecto, el Servicio de Sauce actualizará el 'name' del trabajo cuando éste comienza. Esto te dará la opción de actualizar el nombre en cualquier momento.
- Puedes definir un parámetro `setJobName` y personalizar el nombre del trabajo según tus capacidades, opciones y título de suite
- El Servicio de Sauce también enviará la pila de errores de una prueba fallida a la pestaña de comandos de Sauce Labs
- Te permitirá configurar y lanzar automáticamente [Sauce Connect](https://docs.saucelabs.com/secure-connections/)
- Y establecerá puntos de contexto en tu lista de comandos para identificar qué comandos se ejecutaron en qué prueba

## Instalación

La forma más sencilla es mantener `@wdio/sauce-service` como una devDependency en tu `package.json`, a través de:

```sh
npm install @wdio/sauce-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted)

## Configuración

Para usar el servicio para la Máquina Virtual Desktop/Emulador/Simulador y la nube de Dispositivos Reales, necesitas establecer `user` y `key` en tu archivo `wdio.conf.js`. Automáticamente utilizará Sauce Labs para ejecutar tus pruebas de integración. Si ejecutas tus pruebas en Sauce Labs, puedes especificar la región en la que quieres ejecutar tus pruebas mediante la propiedad `region`. Los identificadores disponibles para las regiones son `us` (por defecto) y `eu`. Estas regiones se utilizan para la nube VM de Sauce Labs y la nube de Dispositivos Reales de Sauce Labs. Si no proporcionas la región, será por defecto `us`.

Si quieres que WebdriverIO lance automáticamente un túnel [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy), necesitas establecer `sauceConnect: true`. Si deseas cambiar el centro de datos a EU, añade `region:'eu'` ya que el centro de datos de US está establecido por defecto.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // o 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

Si quieres usar un túnel Sauce Connect existente, solo necesitas proporcionar un `tunnelName`. Si estás usando un túnel compartido, y no eres el usuario que creó el túnel, debes identificar al usuario de Sauce Labs que creó el túnel para poder usarlo para tu prueba. Incluye el `tunnelOwner` en las capacidades de esta manera:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Opciones del Servicio de Sauce

Para autorizar el servicio de Sauce Labs, tu configuración debe contener las opciones [`user`](https://webdriver.io/docs/options#user) y [`key`](https://webdriver.io/docs/options#key).

### maxErrorStackLength

Este servicio enviará automáticamente la pila de errores a Sauce Labs cuando una prueba falle. Por defecto, solo enviará las primeras 5 líneas, pero si es necesario, esto puede cambiarse. Ten en cuenta que más líneas resultarán en más llamadas WebDriver, lo que podría ralentizar la ejecución.

Tipo: `number`<br />
Por defecto: `5`

### sauceConnect

Si es `true`, ejecuta Sauce Connect y abre una conexión segura entre una máquina virtual de Sauce Labs que ejecuta tus pruebas de navegador.

Tipo: `Boolean`<br />
Por defecto: `false`

### sauceConnectOpts

Aplica opciones de Sauce Connect (por ejemplo, para cambiar la configuración del número de puerto o archivo de registro). Consulta [esta lista](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) para más información.

NOTA: Al especificar las opciones, el `--` debe omitirse. También puede convertirse en camelCase (por ejemplo, `shared-tunnel` o `sharedTunnel`).

Tipo: `Object`<br />
Por defecto: `{ }`

### uploadLogs

Si es `true`, esta opción carga todos los archivos de registro de WebdriverIO a la plataforma de Sauce Labs para su posterior inspección. Asegúrate de tener configurado [`outputDir`](https://webdriver.io/docs/options#outputdir) en tu configuración wdio para escribir registros en archivos; de lo contrario, los datos se transmitirán a stdout y no se podrán cargar.

Tipo: `Boolean`<br />
Por defecto: `true`

### setJobName

Permite a los usuarios establecer dinámicamente el nombre del trabajo basado en parámetros del trabajador como la configuración de WebdriverIO, las capacidades utilizadas y el título original de la suite.

Tipo: `Function`<br />
Por defecto: `(config, capabilities, suiteTitle) => suiteTitle`

----

## Sobrescribir los metadatos de nombre generados

El servicio genera automáticamente un nombre para cada prueba a partir del nombre de la suite, el nombre del navegador y otra información.

Puedes sobrescribir esto proporcionando un valor para la capacidad deseada `name`, pero esto tendrá el efecto secundario de dar a todas las pruebas el mismo nombre.

----

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).