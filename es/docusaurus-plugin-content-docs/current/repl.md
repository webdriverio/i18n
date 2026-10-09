---
id: repl
title: Interfaz REPL
description: "Usa el REPL de WebdriverIO para probar comandos y depurar pruebas de forma interactiva desde la línea de comandos o desde una prueba en ejecución."
---

Con la `v4.5.0`, WebdriverIO introdujo una interfaz [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) que te ayuda no solo a aprender la API del framework, sino también a depurar e inspeccionar tus pruebas. Se puede usar de múltiples maneras.

Primero, puedes usarla como comando CLI instalando `npm install -g @wdio/cli` e iniciar una sesión de WebDriver desde la línea de comandos, por ejemplo:

```sh
wdio repl chrome
```

Esto abriría un navegador Chrome que puedes controlar con la interfaz REPL. Asegúrate de tener un driver de navegador ejecutándose en el puerto `4444` para poder iniciar la sesión. Si tienes una cuenta de [Sauce Labs](https://saucelabs.com) (u otro proveedor en la nube), también puedes ejecutar directamente el navegador en la nube desde tu línea de comandos mediante:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Si el driver se está ejecutando en un puerto diferente, por ejemplo: 9515, se puede pasar con el argumento de línea de comandos --port o su alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

El REPL también se puede ejecutar usando las capacidades del archivo de configuración de WebdriverIO. Wdio admite un objeto de capacidades; o bien una lista u objeto de capacidades multi-remote.

Si el archivo de configuración usa un objeto de capacidades, simplemente pasa la ruta al archivo de configuración; de lo contrario, si es una capacidad multi-remote, especifica qué capacidad usar de la lista o del multi-remote mediante el argumento posicional. Nota: para las listas se considera un índice basado en cero.

### Ejemplo

WebdriverIO con un array de capacidades:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO con un objeto de capacidades [multi-remote](https://webdriver.io/docs/multiremote/):

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

O si quieres ejecutar pruebas móviles locales usando Appium:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

Esto abriría una sesión de Chrome/Safari en el dispositivo/emulador/simulador conectado. Asegúrate de que Appium se esté ejecutando en el puerto `4444` para poder iniciar la sesión.

```sh
wdio repl './path/to/your_app.apk'
```

Esto abriría una sesión de la App en el dispositivo/emulador/simulador conectado. Asegúrate de que Appium se esté ejecutando en el puerto `4444` para poder iniciar la sesión.

Las capacidades para dispositivos iOS se pueden pasar con argumentos:

* `-v`      - `platformVersion`: versión de la plataforma Android/iOS
* `-d`      - `deviceName`: nombre del dispositivo móvil
* `-u`      - `udid`: udid para dispositivos reales

Uso:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Nombres de parámetros largos', value: 'long'},
    {label: 'Nombres de parámetros cortos', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

Puedes aplicar cualquier opción (consulta `wdio repl --help`) disponible para tu sesión REPL.

### Conectarse a una `wdio session`

`wdio repl --session <name>` (alias `-s`) no inicia un navegador. Conecta el REPL a una sesión que [`wdio session`](/docs/session) ya abrió, y al desconectarse esa sesión sigue ejecutándose. Cómo pausar una ejecución de pruebas se explica en [Depurar una prueba con una sesión](/docs/session/debug):

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

En el REPL, cada línea se ejecuta como `wdio session exec`. `.exit` imprime `Detached from "default" (still running)`.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Otra forma de usar el REPL es dentro de tus pruebas mediante el comando [`debug`](/docs/api/browser/debug). Este detendrá el navegador cuando se invoque y te permitirá entrar en la aplicación (por ejemplo, en las herramientas de desarrollo) o controlar el navegador desde la línea de comandos. Esto es útil cuando algunos comandos no desencadenan una determinada acción como se esperaba. Con el REPL, puedes probar los comandos para ver cuáles funcionan de forma más fiable.