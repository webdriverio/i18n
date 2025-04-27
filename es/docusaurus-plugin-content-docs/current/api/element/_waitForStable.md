---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

Espera a que un elemento esté estable (sin animación) durante la cantidad 
de milisegundos proporcionada. Devuelve true si el selector
coincide con al menos un elemento que está estable en el DOM, de lo contrario lanza un
error. Si la bandera reverse es true, el comando devolverá true
si el selector no coincide con ningún elemento estable.

__Nota:__ es mejor desactivar las animaciones en lugar de usar este comando

##### Uso

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`WaitForOptions`</td>
      <td>opciones de waitForStable (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>tiempo en ms (valor predeterminado basado en la configuración [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>si es true espera lo contrario (predeterminado: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>si existe, reemplaza el mensaje de error predeterminado</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>intervalo entre comprobaciones (predeterminado: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```html title="index.html"
<head>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: red;
        }
        #has-animation {
            animation: 3s 0s alternate slidein;
        }
        @keyframes slidein {
            from {
                margin-left: 100%;
                width: 300%;
            }

            to {
                margin-left: 0%;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div #has-animation></div>
    <div #has-no-animation></div>
</body>

```

```js title="waitForStable.js"
it('should detect that element is instable and will wait for the element to become stable', async () => {
    const elem = await $('#has-animation')
    await elem.waitForStable({ timeout: 3000 });
});
it('should detect that element is stable and will not wait', async () => {
    const elem = await $('#has-no-animation')
    await elem.waitForStable();
});
```

##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true si el elemento está estable