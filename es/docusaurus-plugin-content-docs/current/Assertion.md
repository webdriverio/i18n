---
id: assertion
title: Afirmación
---

El [testrunner de WDIO](https://webdriver.io/docs/clioptions) viene con una biblioteca de afirmaciones incorporada que te permite hacer potentes afirmaciones sobre varios aspectos del navegador o elementos dentro de tu aplicación (web). Extiende la funcionalidad de [Jests Matchers](https://jestjs.io/docs/en/using-matchers) con comparadores adicionales optimizados para pruebas e2e, por ejemplo:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

o

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Para la lista completa, consulta la [documentación de la API expect](/docs/api/expect-webdriverio).

## Migración desde Chai

[Chai](https://www.chaijs.com/) y [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) pueden coexistir, y con algunos ajustes menores se puede lograr una transición suave a expect-webdriverio. Si has actualizado a WebdriverIO v6, entonces por defecto tendrás acceso a todas las afirmaciones de `expect-webdriverio` desde el principio. Esto significa que globalmente, dondequiera que uses `expect`, estarías llamando a una afirmación de `expect-webdriverio`. Esto es, a menos que hayas establecido [`injectGlobals`](/docs/configuration#injectglobals) en `false` o hayas anulado explícitamente el `expect` global para usar Chai. En este caso, no tendrías acceso a ninguna de las afirmaciones de expect-webdriverio sin importar explícitamente el paquete expect-webdriverio donde lo necesites.

Esta guía mostrará ejemplos de cómo migrar desde Chai si se ha anulado localmente y cómo migrar desde Chai si se ha anulado globalmente.

### Local

Supongamos que Chai se importó explícitamente en un archivo, por ejemplo:

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Para migrar este código, elimina la importación de Chai y usa el nuevo método de afirmación expect-webdriverio `toHaveUrl` en su lugar:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Si quisieras usar tanto Chai como expect-webdriverio en el mismo archivo, mantendrías la importación de Chai y `expect` se establecería por defecto en la afirmación expect-webdriverio, por ejemplo:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### Global

Supongamos que `expect` fue anulado globalmente para usar Chai. Para usar las afirmaciones de expect-webdriverio, necesitamos establecer globalmente una variable en el hook "before", por ejemplo:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Ahora Chai y expect-webdriverio pueden usarse uno al lado del otro. En tu código, usarías las afirmaciones de Chai y expect-webdriverio de la siguiente manera, por ejemplo:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

Para migrar, irías moviendo gradualmente cada afirmación de Chai a expect-webdriverio. Una vez que todas las afirmaciones de Chai hayan sido reemplazadas en toda la base de código, el hook "before" puede eliminarse. Una búsqueda y reemplazo global para reemplazar todas las instancias de `wdioExpect` por `expect` finalizará la migración.