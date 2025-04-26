---
id: repl
title: Interfaz REPL
---

Con `v4.5.0`, WebdriverIO introdujo una interfaz [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) que te ayuda no solo a aprender la API del framework, sino también a depurar e inspeccionar tus pruebas. Se puede utilizar de múltiples formas.

Primero, puedes usarlo como comando CLI instalando `npm install -g @wdio/cli` y crear una sesión WebDriver desde la línea de comandos, por ejemplo:

```sh
wdio repl chrome
```

Esto abriría un navegador Chrome que puedes controlar con la interfaz REPL. Asegúrate de tener un controlador de navegador ejecutándose en el puerto `4444` para iniciar la sesión. Si tienes una cuenta de [Sauce Labs](https://saucelabs.com) (u otro proveedor en la nube), también puedes ejecutar directamente el navegador en tu línea de comandos en la nube mediante:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Si el controlador se ejecuta en un puerto diferente, por ejemplo: 9515, se puede pasar con el argumento de línea de comandos --port o el alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl también se puede ejecutar utilizando las capacidades del archivo de configuración de webdriverIO. Wdio admite objetos de capacidades; o; lista de capacidades multiremote u objeto.

Si el archivo de configuración utiliza un objeto de capacidades, simplemente pasa la ruta al archivo de configuración, de lo contrario, si es una capacidad multiremote, especifica qué capacidad usar de la lista o multiremote usando el argumento posicional. Nota: para la lista consideramos el índice basado en cero.

### Ejemplo

WebdriverIO con array de capacidades:

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

WebdriverIO con objeto de capacidad [multiremote](https://webdriver.io/docs/multiremote/):

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

Esto abriría una sesión de Chrome/Safari en el dispositivo/emulador/simulador conectado. Asegúrate de que Appium se ejecute en el puerto `4444` para iniciar la sesión.

```sh
wdio repl './path/to/your_app.apk'
```

Esto abriría una sesión de la aplicación en el dispositivo/emulador/simulador conectado. Asegúrate de que Appium se ejecute en el puerto `4444` para iniciar la sesión.

Las capacidades para dispositivos iOS se pueden pasar con argumentos:

* `-v`      - `platformVersion`: versión de la plataforma Android/iOS
* `-d`      - `deviceName`: nombre del dispositivo móvil
* `-u`      - `udid`: udid para dispositivos reales

Uso:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
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

Puedes aplicar cualquier opción (ver `wdio repl --help`) disponible para tu sesión REPL.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Otra forma de usar el REPL es dentro de tus pruebas a través del comando [`debug`](/docs/api/browser/debug). Esto detendrá el navegador cuando se llame, y te permite saltar a la aplicación (por ejemplo, a las herramientas de desarrollo) o controlar el navegador desde la línea de comandos. Esto es útil cuando algunos comandos no desencadenan una determinada acción como se esperaba. Con el REPL, puedes probar los comandos para ver cuáles funcionan de manera más confiable.