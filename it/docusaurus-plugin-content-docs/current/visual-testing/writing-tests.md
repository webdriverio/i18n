---
id: writing-tests
title: Scrivere Test
description: "Scrivi test visivi con Mocha, Jasmine o Cucumber che salvano screenshot o li confrontano con le baseline tramite matcher personalizzati e metodi di verifica."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Supporto dei Framework di Test Runner

`@wdio/visual-service` è indipendente dal framework di test runner, il che significa che puoi utilizzarlo con tutti i framework supportati da WebdriverIO, come:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

All'interno dei tuoi test, puoi _salvare_ screenshot o confrontare lo stato visivo attuale della tua applicazione sotto test con una baseline. A tale scopo, il servizio fornisce [matcher personalizzati](/docs/api/expect-webdriverio#visual-matcher), oltre a metodi di _check_:

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
        // Verifica che lo schermo corrisponda esattamente alla baseline
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // verifica che un elemento abbia una percentuale di discrepanza del 5% rispetto alla baseline
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // verifica un elemento con le opzioni per il comando `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* alcune opzioni */
        })

        // Verifica che un elemento corrisponda esattamente alla baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // verifica che un elemento abbia una percentuale di discrepanza del 5% rispetto alla baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // verifica un elemento con le opzioni per il comando `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* alcune opzioni */
        })

        // Verifica che uno screenshot a pagina intera corrisponda alla baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Verifica che uno screenshot a pagina intera abbia una percentuale di discrepanza del 5% rispetto alla baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Verifica uno screenshot a pagina intera con le opzioni per il comando `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* alcune opzioni */
        })

        // Verifica uno screenshot a pagina intera con tutte le esecuzioni dei tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Verifica che uno screenshot a pagina intera abbia una percentuale di discrepanza del 5% rispetto alla baseline
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Verifica uno screenshot a pagina intera con le opzioni per il comando `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* alcune opzioni */
        })
    })

    it('should save some screenshots', async () => {
        // Salva uno schermo
        await browser.saveScreen('examplePage', {
            /* alcune opzioni */
        })

        // Salva un elemento
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* alcune opzioni */
            }
        )

        // Salva uno screenshot a pagina intera
        await browser.saveFullPageScreen('fullPage', {
            /* alcune opzioni */
        })

        // Salva uno screenshot a pagina intera con tutte le esecuzioni dei tab
        await browser.saveTabbablePage('save-tabbable', {
            /* alcune opzioni, usa le stesse opzioni di saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Verifica uno schermo
        await expect(
            await browser.checkScreen('examplePage', {
                /* alcune opzioni */
            })
        ).toEqual(0)

        // Verifica un elemento
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* alcune opzioni */
                }
            )
        ).toEqual(0)

        // Verifica uno screenshot a pagina intera
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* alcune opzioni */
            })
        ).toEqual(0)

        // Verifica uno screenshot a pagina intera con tutte le esecuzioni dei tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* alcune opzioni, usa le stesse opzioni di checkFullPageScreen */
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
        // Verifica che lo schermo corrisponda esattamente alla baseline
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // verifica che un elemento abbia una percentuale di discrepanza del 5% rispetto alla baseline
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // verifica un elemento con le opzioni per il comando `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* alcune opzioni */
        })

        // Verifica che un elemento corrisponda esattamente alla baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // verifica che un elemento abbia una percentuale di discrepanza del 5% rispetto alla baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // verifica un elemento con le opzioni per il comando `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* alcune opzioni */
        })

        // Verifica che uno screenshot a pagina intera corrisponda alla baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Verifica che uno screenshot a pagina intera abbia una percentuale di discrepanza del 5% rispetto alla baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Verifica uno screenshot a pagina intera con le opzioni per il comando `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* alcune opzioni */
        })

        // Verifica uno screenshot a pagina intera con tutte le esecuzioni dei tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Verifica che uno screenshot a pagina intera abbia una percentuale di discrepanza del 5% rispetto alla baseline
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Verifica uno screenshot a pagina intera con le opzioni per il comando `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* alcune opzioni */
        })
    })

    it('should save some screenshots', async () => {
        // Salva uno schermo
        await browser.saveScreen('examplePage', {
            /* alcune opzioni */
        })

        // Salva un elemento
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* alcune opzioni */
            }
        )

        // Salva uno screenshot a pagina intera
        await browser.saveFullPageScreen('fullPage', {
            /* alcune opzioni */
        })

        // Salva uno screenshot a pagina intera con tutte le esecuzioni dei tab
        await browser.saveTabbablePage('save-tabbable', {
            /* alcune opzioni, usa le stesse opzioni di saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Verifica uno schermo
        await expect(
            await browser.checkScreen('examplePage', {
                /* alcune opzioni */
            })
        ).toEqual(0)

        // Verifica un elemento
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* alcune opzioni */
                }
            )
        ).toEqual(0)

        // Verifica uno screenshot a pagina intera
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* alcune opzioni */
            })
        ).toEqual(0)

        // Verifica uno screenshot a pagina intera con tutte le esecuzioni dei tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* alcune opzioni, usa le stesse opzioni di checkFullPageScreen */
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
    // Salva uno schermo
    await browser.saveScreen('examplePage', {
        /* alcune opzioni */
    })

    // Salva un elemento
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* alcune opzioni */
    })

    // Salva uno screenshot a pagina intera
    await browser.saveFullPageScreen('fullPage', {
        /* alcune opzioni */
    })

    // Salva uno screenshot a pagina intera con tutte le esecuzioni dei tab
    await browser.saveTabbablePage('save-tabbable', {
        /* alcune opzioni, usa le stesse opzioni di saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // Verifica che lo schermo corrisponda esattamente alla baseline
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // verifica che un elemento abbia una percentuale di discrepanza del 5% rispetto alla baseline
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // verifica un elemento con le opzioni per il comando `saveScreen`
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* alcune opzioni */
    })

    // Verifica che un elemento corrisponda esattamente alla baseline
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // verifica che un elemento abbia una percentuale di discrepanza del 5% rispetto alla baseline
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // verifica un elemento con le opzioni per il comando `saveElement`
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* alcune opzioni */
    })

    // Verifica che uno screenshot a pagina intera corrisponda alla baseline
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // Verifica che uno screenshot a pagina intera abbia una percentuale di discrepanza del 5% rispetto alla baseline
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // Verifica uno screenshot a pagina intera con le opzioni per il comando `checkFullPageScreen`
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* alcune opzioni */
    })

    // Verifica uno screenshot a pagina intera con tutte le esecuzioni dei tab
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // Verifica che uno screenshot a pagina intera abbia una percentuale di discrepanza del 5% rispetto alla baseline
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // Verifica uno screenshot a pagina intera con le opzioni per il comando `checkTabbablePage`
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* alcune opzioni */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // Verifica uno schermo
    await expect(
        await browser.checkScreen('examplePage', {
            /* alcune opzioni */
        })
    ).toEqual(0)

    // Verifica un elemento
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* alcune opzioni */
            }
        )
    ).toEqual(0)

    // Verifica uno screenshot a pagina intera
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* alcune opzioni */
        })
    ).toEqual(0)

    // Verifica uno screenshot a pagina intera con tutte le esecuzioni dei tab
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* alcune opzioni, usa le stesse opzioni di checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note IMPORTANTE

Questo servizio fornisce metodi `save` e `check`. Se esegui i tuoi test per la prima volta **NON DEVI** combinare i metodi `save` e `compare`: i metodi `check` creeranno automaticamente un'immagine baseline per te

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


Se hai [disabilitato il salvataggio automatico delle immagini baseline](service-options#autosavebaseline), la Promise verrà rifiutata con il seguente avviso.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Ciò significa che lo screenshot corrente viene salvato nella cartella actual e **devi copiarlo manualmente nella tua baseline**. Se istanzi `@wdio/visual-service` con [`autoSaveBaseline: true`](./service-options#autosavebaseline) l'immagine verrà salvata automaticamente nella cartella baseline.

:::