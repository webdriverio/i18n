---
id: writing-tests
title: Escribiendo Pruebas
---


## Soporte de Frameworks para Testrunner

`@wdio/visual-service` es agnóstico respecto al framework de pruebas, lo que significa que puedes usarlo con todos los frameworks que WebdriverIO soporta como:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

Dentro de tus pruebas, puedes _guardar_ capturas de pantalla o comparar el estado visual actual de tu aplicación bajo prueba con una línea base. Para ello, el servicio proporciona [comparadores personalizados](/docs/api/expect-webdriverio#visual-matcher), así como métodos de _verificación_:

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
        // Check screen to exactly match with baseline
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // check an element to have a mismatch percentage of 5% with the baseline
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // check an element with options for `saveScreen` command
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* some options */
        })

        // Check an element to exactly match with baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // check an element to have a mismatch percentage of 5% with the baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // check an element with options for `saveElement` command
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* some options */
        })

        // Check a full page screenshot match with baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Check a full page screenshot to have a mismatch percentage of 5% with the baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Check a full page screenshot with options for `checkFullPageScreen` command
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* some options */
        })

        // Check a full page screenshot with all tab executions
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Check a full page screenshot to have a mismatch percentage of 5% with the baseline
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Check a full page screenshot with options for `checkTabbablePage` command
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* some options */
        })
    })

    it('should save some screenshots', async () => {
        // Save a screen
        await browser.saveScreen('examplePage', {
            /* some options */
        })

        // Save an element
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* some options */
            }
        )

        // Save a full page screenshot
        await browser.saveFullPageScreen('fullPage', {
            /* some options */
        })

        // Save a full page screenshot with all tab executions
        await browser.saveTabbablePage('save-tabbable', {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Check a screen
        await expect(
            await browser.checkScreen('examplePage', {
                /* some options */
            })
        ).toEqual(0)

        // Check an element
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* some options */
                }
            )
        ).toEqual(0)

        // Check a full page screenshot
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* some options */
            })
        ).toEqual(0)

        // Check a full page screenshot with all tab executions
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* some options, use the same options as for checkFullPageScreen */
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
        // Check screen to exactly match with baseline
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // check an element to have a mismatch percentage of 5% with the baseline
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // check an element with options for `saveScreen` command
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* some options */
        })

        // Check an element to exactly match with baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // check an element to have a mismatch percentage of 5% with the baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // check an element with options for `saveElement` command
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* some options */
        })

        // Check a full page screenshot match with baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Check a full page screenshot to have a mismatch percentage of 5% with the baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Check a full page screenshot with options for `checkFullPageScreen` command
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* some options */
        })

        // Check a full page screenshot with all tab executions
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Check a full page screenshot to have a mismatch percentage of 5% with the baseline
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Check a full page screenshot with options for `checkTabbablePage` command
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* some options */
        })
    })

    it('should save some screenshots', async () => {
        // Save a screen
        await browser.saveScreen('examplePage', {
            /* some options */
        })

        // Save an element
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* some options */
            }
        )

        // Save a full page screenshot
        await browser.saveFullPageScreen('fullPage', {
            /* some options */
        })

        // Save a full page screenshot with all tab executions
        await browser.saveTabbablePage('save-tabbable', {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Check a screen
        await expect(
            await browser.checkScreen('examplePage', {
                /* some options */
            })
        ).toEqual(0)

        // Check an element
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* some options */
                }
            )
        ).toEqual(0)

        // Check a full page screenshot
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* some options */
            })
        ).toEqual(0)

        // Check a full page screenshot with all tab executions
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* some options, use the same options as for checkFullPageScreen */
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
    // Save a screen
    await browser.saveScreen('examplePage', {
        /* some options */
    })

    // Save an element
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* some options */
    })

    // Save a full page screenshot
    await browser.saveFullPageScreen('fullPage', {
        /* some options */
    })

    // Save a full page screenshot with all tab executions
    await browser.saveTabbablePage('save-tabbable', {
        /* some options, use the same options as for saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // Check screen to exactly match with baseline
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // check an element to have a mismatch percentage of 5% with the baseline
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // check an element with options for `saveScreen` command
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* some options */
    })

    // Check an element to exactly match with baseline
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // check an element to have a mismatch percentage of 5% with the baseline
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // check an element with options for `saveElement` command
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* some options */
    })

    // Check a full page screenshot match with baseline
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // Check a full page screenshot to have a mismatch percentage of 5% with the baseline
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // Check a full page screenshot with options for `checkFullPageScreen` command
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* some options */
    })

    // Check a full page screenshot with all tab executions
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // Check a full page screenshot to have a mismatch percentage of 5% with the baseline
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // Check a full page screenshot with options for `checkTabbablePage` command
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* some options */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // Check a screen
    await expect(
        await browser.checkScreen('examplePage', {
            /* some options */
        })
    ).toEqual(0)

    // Check an element
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* some options */
            }
        )
    ).toEqual(0)

    // Check a full page screenshot
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* some options */
        })
    ).toEqual(0)

    // Check a full page screenshot with all tab executions
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* some options, use the same options as for checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note IMPORTANTE

Este servicio proporciona métodos `save` y `check`. Si ejecutas tus pruebas por primera vez **NO DEBES** combinar métodos `save` y `compare`, los métodos `check` crearán automáticamente una imagen de referencia para ti

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


Cuando has [desactivado el guardado automático de imágenes de referencia](service-options#autosavebaseline), la Promesa será rechazada con la siguiente advertencia.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Esto significa que la captura de pantalla actual se guarda en la carpeta actual y **necesitas copiarla manualmente a tu línea base**. Si inicias `@wdio/visual-service` con [`autoSaveBaseline: true`](./service-options#autosavebaseline), la imagen se guardará automáticamente en la carpeta de línea base.

:::