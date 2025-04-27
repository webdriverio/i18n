---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Cambia el contexto activo a un marco, por ejemplo, un iframe en la página. Hay múltiples formas de consultar un marco
en la página:

  - Si se proporciona una cadena, cambia al marco con un id de contexto coincidente, url o url que contenga esa cadena
    ```ts
    // cambiar a un marco que tiene una url específica o contiene una cadena en la url
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Nota: este marco se encuentra en un iframe anidado, sin embargo solo necesitas proporcionar
    // la url del marco que deseas
    await browser.switchFrame('https://www.w3schools.com')
    // verifica el título de la página
    console.log(await browser.execute(() => [document.title, document.URL]))
    // muestra: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Si tienes el id de contexto del marco, puedes usarlo directamente
    ```ts
    // cambiar a un marco que tiene un determinado id de contexto
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Si se proporciona un elemento WebdriverIO que hace referencia a un elemento `iframe`, cambiará a ese marco
    ```ts
    // cambiar a un elemento de marco consultado desde el contexto actual
    await browser.switchFrame($('iframe'))
    ```

  - Si se proporciona una función, recorrerá todos los iframes en la página y llamará a la función dentro del objeto
    de contexto. La función debe devolver un booleano que indique si se debe seleccionar el marco. La función
    se ejecutará dentro del navegador y permite acceso a todas las API Web, por ejemplo:
    ```ts
    // cambiar al primer marco que contiene un elemento con id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // cambiar al primer marco que contiene "webdriver" en la URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Si se proporciona `null`, cambiará al marco de nivel superior
    ```ts
    // primero cambiar a un marco
    await browser.switchFrame($('iframe'))
    // hacer más automatización dentro de ese marco, luego...

    // cambiar al marco de nivel superior
    await browser.switchFrame(null)
    ```

Una vez que cambiaste a un marco, todos los comandos posteriores se ejecutarán en el contexto de ese marco,
incluida la navegación a diferentes páginas.

##### Usage

```js
browser.switchFrame(context)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>context</var></code></td>
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  el id de contexto activo actual