---
id: debugging
title: Depuración
---

La depuración es significativamente más difícil cuando varios procesos generan docenas de pruebas en múltiples navegadores.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Para empezar, es extremadamente útil limitar el paralelismo estableciendo `maxInstances` a `1`, y apuntando solo a aquellas especificaciones y navegadores que necesitan ser depurados.

En `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## El Comando Debug

En muchos casos, puedes usar [`browser.debug()`](/docs/api/browser/debug) para pausar tu prueba e inspeccionar el navegador.

Tu interfaz de línea de comandos también cambiará al modo REPL. Este modo te permite experimentar con comandos y elementos en la página. En el modo REPL, puedes acceder al objeto `browser`&mdash;o a las funciones `$` y `$$`&mdash;como lo haces en tus pruebas.

Cuando uses `browser.debug()`, probablemente necesitarás aumentar el tiempo de espera del ejecutor de pruebas para evitar que el ejecutor falle la prueba por tardar demasiado. Por ejemplo:

En `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Consulta [timeouts](timeouts) para obtener más información sobre cómo hacer esto usando otros frameworks.

Para continuar con las pruebas después de la depuración, en la terminal usa el atajo `^C` o el comando `.exit`.
## Configuración dinámica

Ten en cuenta que `wdio.conf.js` puede contener Javascript. Como probablemente no quieras cambiar permanentemente tu valor de tiempo de espera a 1 día, a menudo puede ser útil cambiar estas configuraciones desde la línea de comandos usando una variable de entorno.

Usando esta técnica, puedes cambiar dinámicamente la configuración:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Luego puedes prefijar el comando `wdio` con la bandera `debug`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...¡y depurar tu archivo de especificación con DevTools!

## Depuración con Visual Studio Code (VSCode)

Si quieres depurar tus pruebas con puntos de interrupción en la última versión de VSCode, tienes dos opciones para iniciar el depurador, de las cuales la opción 1 es el método más fácil:
 1. adjuntar automáticamente el depurador
 2. adjuntar el depurador usando un archivo de configuración

### VSCode Toggle Auto Attach

Puedes adjuntar automáticamente el depurador siguiendo estos pasos en VSCode:
 - Presiona CMD + Shift + P (Linux y MacOS) o CTRL + Shift + P (Windows)
 - Escribe "attach" en el campo de entrada
 - Selecciona "Debug: Toggle Auto Attach"
 - Selecciona "Only With Flag"

 ¡Eso es todo! Ahora cuando ejecutes tus pruebas (recuerda que necesitarás la bandera --inspect establecida en tu configuración como se mostró anteriormente) automáticamente iniciará el depurador y se detendrá en el primer punto de interrupción que encuentre.

### Archivo de configuración de VSCode

Es posible ejecutar todos o archivos de especificación seleccionados. Las configuraciones de depuración deben agregarse a `.vscode/launch.json`, para depurar una especificación seleccionada agrega la siguiente configuración:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Para ejecutar todos los archivos de especificación, elimina `"--spec", "${file}"` de `"args"`

Ejemplo: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Información adicional: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl dinámico con Atom

Si eres un hacker de [Atom](https://atom.io/), puedes probar [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) de [@kurtharriger](https://github.com/kurtharriger), que es un repl dinámico que te permite ejecutar líneas de código individuales en Atom. Mira [este](https://www.youtube.com/watch?v=kdM05ChhLQE) video de YouTube para ver una demostración.

## Depuración con WebStorm / Intellij
Puedes crear una configuración de depuración de node.js así:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Mira este [Video de YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) para más información sobre cómo hacer una configuración.

## Depuración de pruebas inestables

Las pruebas inestables pueden ser realmente difíciles de depurar, así que aquí hay algunos consejos sobre cómo puedes intentar reproducir localmente ese resultado inestable que obtuviste en tu CI.

### Red
Para depurar la inestabilidad relacionada con la red, usa el comando [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Velocidad de renderizado
Para depurar la inestabilidad relacionada con la velocidad del dispositivo, usa el comando [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Esto hará que tus páginas se rendericen más lentamente, lo que puede ser causado por muchas cosas, como ejecutar múltiples procesos en tu CI que podrían estar ralentizando tus pruebas.
```js
await browser.throttleCPU(4)
```

### Velocidad de ejecución de pruebas

Si tus pruebas no parecen verse afectadas, es posible que WebdriverIO sea más rápido que la actualización del framework frontend / navegador. Esto sucede cuando se utilizan aserciones sincrónicas, ya que WebdriverIO no tiene oportunidad de reintentar estas aserciones. Algunos ejemplos de código que pueden fallar debido a esto:
```js
expect(elementList.length).toEqual(7) // la lista podría no estar poblada en el momento de la aserción
expect(await elem.getText()).toEqual('this button was clicked 3 times') // el texto podría no estar actualizado aún en el momento de la aserción, resultando en un error ("this button was clicked 2 times" no coincide con el esperado "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // podría no estar mostrado aún
```
Para resolver este problema, se deben usar aserciones asíncronas. Los ejemplos anteriores se verían así:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Usando estas aserciones, WebdriverIO esperará automáticamente hasta que la condición coincida. Al afirmar texto, esto significa que el elemento debe existir y el texto debe ser igual al valor esperado.
Hablamos más sobre esto en nuestra [Guía de Mejores Prácticas](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).