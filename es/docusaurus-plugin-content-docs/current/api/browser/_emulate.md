---
id: emulate
title: emular
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO te permite emular APIs Web utilizando el comando `emulate`. Estas APIs Web pueden entonces 
comportarse exactamente como tú lo especifiques. Los siguientes ámbitos son compatibles:

- `geolocation`: Emula la API de geolocalización
- `userAgent`: Emula el agente de usuario
- `colorScheme`: Emula el esquema de colores
- `onLine`: Emula el estado de conexión
- `device`: Emula un dispositivo móvil o de escritorio específico
- `clock`: Emula el reloj del sistema

El comando `emulate` devuelve una función que puede ser llamada para restablecer la emulación. Esto es útil
cuando quieres restablecer la emulación después de una prueba o un conjunto de pruebas.

Lee más sobre esto en las pautas de [Emulación](/docs/emulation).

:::info

Excepto para el ámbito `clock`, no es posible cambiar el valor emulado sin recargar la página.

:::

:::info

Esta característica requiere soporte de WebDriver Bidi para el navegador. Mientras que las versiones recientes de Chrome, Edge
y Firefox tienen dicho soporte, Safari __no lo tiene__. Para actualizaciones, sigue [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned).
Además, si utilizas un proveedor en la nube para crear navegadores, asegúrate de que tu proveedor también sea compatible con WebDriver Bidi.

:::

El objeto `EmulationOptions` puede tener las siguientes propiedades según el ámbito:

| Ámbito        | Opciones                                         |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### Uso

```js
browser.emulate(scope, options)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>característica del navegador que te gustaría emular, puede ser `clock`, `geolocation`, `userAgent`, `colorScheme` o `onLine`</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>opción de emulación para un ámbito específico</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### Devuelve

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   una función para restablecer la emulación