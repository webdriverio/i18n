---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

Se considera que un elemento es clickable cuando se cumplen las siguientes condiciones:

- el elemento existe
- el elemento está mostrado
- el elemento no está deshabilitado
- el elemento está dentro del viewport
- el elemento puede ser desplazado al viewport
- el centro del elemento no está superpuesto con otro elemento

de lo contrario, devuelve false.

:::info

Tenga en cuenta que `isClickable` funciona solo en navegadores web y en webviews móviles,
no funciona en el contexto nativo de aplicaciones móviles. Además, a diferencia de otros comandos
de elementos, WebdriverIO no esperará a que el elemento exista para ejecutar este comando.

:::

##### Uso

```js
$(selector).isClickable()
```

##### Ejemplo

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true si el elemento es clickable