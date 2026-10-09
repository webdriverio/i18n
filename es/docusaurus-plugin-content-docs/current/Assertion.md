---
id: assertion
title: Aserciones
description: "Escribe aserciones sobre el estado del navegador y de los elementos con la biblioteca integrada expect-webdriverio, usa aserciones suaves y migra desde Chai."
---

El [testrunner de WDIO](https://webdriver.io/docs/clioptions) incluye una biblioteca de aserciones integrada que te permite realizar aserciones potentes sobre diversos aspectos del navegador o de los elementos dentro de tu aplicación (web). Amplía la funcionalidad de los [Matchers de Jest](https://jestjs.io/docs/en/using-matchers) con matchers adicionales optimizados para pruebas e2e, por ejemplo:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

o

```js
const selectOptions = await $$('form select>option')

// asegúrate de que haya al menos una opción en el select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Para ver la lista completa, consulta la [documentación de la API de expect](/docs/api/expect-webdriverio).

:::info Jasmine

Con el framework Jasmine, `expect` combina los matchers de Jasmine y los matchers de WebdriverIO. Los matchers síncronos de Jasmine no necesitan `await`, y las partes de Jest de `expect`, como `expect.soft()`, no están disponibles. Consulta [Uso de Jasmine](/docs/frameworks#assertions).

:::

## Aserciones suaves

WebdriverIO incluye aserciones suaves (soft assertions) por defecto desde `expect-webdriverio` (desde la versión 5.2.0). Las aserciones suaves permiten que tus pruebas continúen ejecutándose incluso cuando una aserción falla. Todos los fallos se recopilan y se informan al final de la prueba.

### Uso

```js
// Estas no lanzarán un error inmediatamente si fallan
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Las aserciones regulares siguen lanzando un error inmediatamente
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migración desde Chai

[Chai](https://www.chaijs.com/) y [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) pueden coexistir, y con algunos ajustes menores se puede lograr una transición fluida a expect-webdriverio. Si has actualizado a WebdriverIO v6, por defecto tendrás acceso a todas las aserciones de `expect-webdriverio` desde el primer momento. Esto significa que, globalmente, siempre que uses `expect` estarás llamando a una aserción de `expect-webdriverio`. Esto es así a menos que hayas establecido [`injectGlobals`](/docs/configuration#injectglobals) en `false` o hayas sobrescrito explícitamente el `expect` global para usar Chai. En ese caso, no tendrías acceso a ninguna de las aserciones de expect-webdriverio sin importar explícitamente el paquete expect-webdriverio donde lo necesites.

Esta guía mostrará ejemplos de cómo migrar desde Chai si ha sido sobrescrito localmente y cómo migrar desde Chai si ha sido sobrescrito globalmente.

### Local

Supongamos que Chai se importó explícitamente en un archivo, por ejemplo:

```js
// myfile.js - código original
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Para migrar este código, elimina la importación de Chai y usa en su lugar el nuevo método de aserción de expect-webdriverio `toHaveUrl`:

```js
// myfile.js - código migrado
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // nuevo método de la API de expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Si quisieras usar tanto Chai como expect-webdriverio en el mismo archivo, mantendrías la importación de Chai y `expect` usaría por defecto la aserción de expect-webdriverio, por ejemplo:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // aserción de Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // aserción de expect-webdriverio
    })
})
```

### Global

Supongamos que `expect` se sobrescribió globalmente para usar Chai. Para poder usar las aserciones de expect-webdriverio, necesitamos establecer globalmente una variable en el hook "before", por ejemplo:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Ahora Chai y expect-webdriverio pueden usarse conjuntamente. En tu código usarías las aserciones de Chai y de expect-webdriverio de la siguiente manera, por ejemplo:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // aserción de Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // aserción de expect-webdriverio
    });
});
```

Para migrar, irías trasladando poco a poco cada aserción de Chai a expect-webdriverio. Una vez que todas las aserciones de Chai hayan sido reemplazadas en todo el código base, se puede eliminar el hook "before". Una búsqueda y reemplazo global de todas las instancias de `wdioExpect` por `expect` completará entonces la migración.