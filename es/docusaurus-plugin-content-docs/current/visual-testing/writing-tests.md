---
id: writing-tests
title: Escribir pruebas
description: "Escribe pruebas visuales con Mocha, Jasmine o Cucumber que guarden capturas de pantalla o las comparen con imágenes de referencia mediante matchers personalizados y métodos check."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Compatibilidad con frameworks de ejecución de pruebas

`@wdio/visual-service` es independiente del framework de ejecución de pruebas, lo que significa que puedes usarlo con todos los frameworks que WebdriverIO admite, como:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

Dentro de tus pruebas, puedes _guardar_ capturas de pantalla o comparar el estado visual actual de la aplicación bajo prueba con una imagen de referencia (baseline). Para ello, el servicio proporciona un [matcher personalizado](/docs/api/expect-webdriverio#visual-matcher), así como métodos _check_:

<Tabs
    defaultValue="mocha"
    values={[
        {label: 'Mocha', value: 'mocha'},
        {label: 'Jasmine', value: 'jasmine'},
        {label: 'CucumberJS', value: 'cucumberjs'},
    ]}
>
<TabItem value="mocha">

```ts
describe('Mocha Example', () => {
    beforeEach(async () => {
        await browser.url('https://webdriver.io')
    })

    it('using visual matchers to assert against baseline', async () => {
        // Comprobar que la pantalla coincide exactamente con la referencia
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // comprobar que un elemento tiene un porcentaje de diferencia del 5% con la referencia
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // comprobar un elemento con opciones para el comando `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* algunas opciones */
        })

        // Comprobar que un elemento coincide exactamente con la referencia
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // comprobar que un elemento tiene un porcentaje de diferencia del 5% con la referencia
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // comprobar un elemento con opciones para el comando `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* algunas opciones */
        })

        // Comprobar que una captura de página completa coincide con la referencia
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Comprobar que una captura de página completa tiene un porcentaje de diferencia del 5% con la referencia
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Comprobar una captura de página completa con opciones para el comando `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* algunas opciones */
        })

        // Comprobar una captura de página completa con todas las ejecuciones de tabulación
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Comprobar que una captura de página completa tiene un porcentaje de diferencia del 5% con la referencia
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Comprobar una captura de página completa con opciones para el comando `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* algunas opciones */
        })
    })

    it('should save some screenshots', async () => {
        // Guardar una pantalla
        await browser.saveScreen('examplePage', {
            /* algunas opciones */
        })

        // Guardar un elemento
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* algunas opciones */
            }
        )

        // Guardar una captura de página completa
        await browser.saveFullPageScreen('fullPage', {
            /* algunas opciones */
        })

        // Guardar una captura de página completa con todas las ejecuciones de tabulación
        await browser.saveTabbablePage('save-tabbable', {
            /* algunas opciones, usa las mismas opciones que para saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Comprobar una pantalla
        await expect(
            await browser.checkScreen('examplePage', {
                /* algunas opciones */
            })
        ).toEqual(0)

        // Comprobar un elemento
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* algunas opciones */
                }
            )
        ).toEqual(0)

        // Comprobar una captura de página completa
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* algunas opciones */
            })
        ).toEqual(0)

        // Comprobar una captura de página completa con todas las ejecuciones de tabulación
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* algunas opciones, usa las mismas opciones que para checkFullPageScreen */
            })
        ).toEqual(0)
    })
})
```

</TabItem>
<TabItem value="jasmine">

```ts
describe('Jasmine Example', () => {
    beforeEach(async () => {
        await browser.url('https://webdriver.io')
    })

    it('using visual matchers to assert against baseline', async () => {
        // Comprobar que la pantalla coincide exactamente con la referencia
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // comprobar que un elemento tiene un porcentaje de diferencia del 5% con la referencia
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // comprobar un elemento con opciones para el comando `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* algunas opciones */
        })

        // Comprobar que un elemento coincide exactamente con la referencia
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // comprobar que un elemento tiene un porcentaje de diferencia del 5% con la referencia
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // comprobar un elemento con opciones para el comando `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* algunas opciones */
        })

        // Comprobar que una captura de página completa coincide con la referencia
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Comprobar que una captura de página completa tiene un porcentaje de diferencia del 5% con la referencia
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Comprobar una captura de página completa con opciones para el comando `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* algunas opciones */
        })

        // Comprobar una captura de página completa con todas las ejecuciones de tabulación
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Comprobar que una captura de página completa tiene un porcentaje de diferencia del 5% con la referencia
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Comprobar una captura de página completa con opciones para el comando `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* algunas opciones */
        })
    })

    it('should save some screenshots', async () => {
        // Guardar una pantalla
        await browser.saveScreen('examplePage', {
            /* algunas opciones */
        })

        // Guardar un elemento
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* algunas opciones */
            }
        )

        // Guardar una captura de página completa
        await browser.saveFullPageScreen('fullPage', {
            /* algunas opciones */
        })

        // Guardar una captura de página completa con todas las ejecuciones de tabulación
        await browser.saveTabbablePage('save-tabbable', {
            /* algunas opciones, usa las mismas opciones que para saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Comprobar una pantalla
        await expect(
            await browser.checkScreen('examplePage', {
                /* algunas opciones */
            })
        ).toEqual(0)

        // Comprobar un elemento
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* algunas opciones */
                }
            )
        ).toEqual(0)

        // Comprobar una captura de página completa
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* algunas opciones */
            })
        ).toEqual(0)

        // Comprobar una captura de página completa con todas las ejecuciones de tabulación
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* algunas opciones, usa las mismas opciones que para checkFullPageScreen */
            })
        ).toEqual(0)
    })
})
```

</TabItem>
<TabItem value="cucumberjs">

```ts
import { When, Then } from '@wdio/cucumber-framework'

When('I save some screenshots', async function () {
    // Guardar una pantalla
    await browser.saveScreen('examplePage', {
        /* algunas opciones */
    })

    // Guardar un elemento
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* algunas opciones */
    })

    // Guardar una captura de página completa
    await browser.saveFullPageScreen('fullPage', {
        /* algunas opciones */
    })

    // Guardar una captura de página completa con todas las ejecuciones de tabulación
    await browser.saveTabbablePage('save-tabbable', {
        /* algunas opciones, usa las mismas opciones que para saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // Comprobar que la pantalla coincide exactamente con la referencia
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // comprobar que un elemento tiene un porcentaje de diferencia del 5% con la referencia
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // comprobar un elemento con opciones para el comando `saveScreen`
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* algunas opciones */
    })

    // Comprobar que un elemento coincide exactamente con la referencia
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // comprobar que un elemento tiene un porcentaje de diferencia del 5% con la referencia
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // comprobar un elemento con opciones para el comando `saveElement`
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* algunas opciones */
    })

    // Comprobar que una captura de página completa coincide con la referencia
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // Comprobar que una captura de página completa tiene un porcentaje de diferencia del 5% con la referencia
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // Comprobar una captura de página completa con opciones para el comando `checkFullPageScreen`
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* algunas opciones */
    })

    // Comprobar una captura de página completa con todas las ejecuciones de tabulación
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // Comprobar que una captura de página completa tiene un porcentaje de diferencia del 5% con la referencia
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // Comprobar una captura de página completa con opciones para el comando `checkTabbablePage`
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* algunas opciones */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // Comprobar una pantalla
    await expect(
        await browser.checkScreen('examplePage', {
            /* algunas opciones */
        })
    ).toEqual(0)

    // Comprobar un elemento
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* algunas opciones */
            }
        )
    ).toEqual(0)

    // Comprobar una captura de página completa
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* algunas opciones */
        })
    ).toEqual(0)

    // Comprobar una captura de página completa con todas las ejecuciones de tabulación
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* algunas opciones, usa las mismas opciones que para checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note IMPORTANTE

Este servicio proporciona métodos `save` y `check`. Si ejecutas tus pruebas por primera vez, **NO DEBES** combinar los métodos `save` y `compare`; los métodos `check` crearán automáticamente una imagen de referencia por ti

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


Si has [desactivado el guardado automático de imágenes de referencia](service-options#autosavebaseline), la Promise será rechazada con la siguiente advertencia.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Esto significa que la captura de pantalla actual se guarda en la carpeta actual y **debes copiarla manualmente a tu carpeta de referencia**. Si instancias `@wdio/visual-service` con [`autoSaveBaseline: true`](./service-options#autosavebaseline), la imagen se guardará automáticamente en la carpeta de referencia.

:::