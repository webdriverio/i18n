---
id: writing-tests
title: Écrire des tests
description: "Écrivez des tests visuels avec Mocha, Jasmine ou Cucumber qui enregistrent des captures d'écran ou les comparent à des références grâce à des matchers personnalisés et des méthodes de vérification."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prise en charge des frameworks de test

`@wdio/visual-service` est indépendant du framework de test, ce qui signifie que vous pouvez l'utiliser avec tous les frameworks pris en charge par WebdriverIO, comme :

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

Dans vos tests, vous pouvez _enregistrer_ des captures d'écran ou comparer l'état visuel actuel de votre application testée à une référence (baseline). Pour cela, le service fournit des [matchers personnalisés](/docs/api/expect-webdriverio#visual-matcher), ainsi que des méthodes de _vérification_ (check) :

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
        // Vérifier que l'écran correspond exactement à la référence
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // vérifier qu'un élément a un pourcentage de différence de 5 % avec la référence
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // vérifier un élément avec des options pour la commande `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* quelques options */
        })

        // Vérifier qu'un élément correspond exactement à la référence
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // vérifier qu'un élément a un pourcentage de différence de 5 % avec la référence
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // vérifier un élément avec des options pour la commande `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* quelques options */
        })

        // Vérifier qu'une capture d'écran de page complète correspond à la référence
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Vérifier qu'une capture d'écran de page complète a un pourcentage de différence de 5 % avec la référence
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Vérifier une capture d'écran de page complète avec des options pour la commande `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* quelques options */
        })

        // Vérifier une capture d'écran de page complète avec toutes les exécutions de tabulation
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Vérifier qu'une capture d'écran de page complète a un pourcentage de différence de 5 % avec la référence
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Vérifier une capture d'écran de page complète avec des options pour la commande `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* quelques options */
        })
    })

    it('should save some screenshots', async () => {
        // Enregistrer un écran
        await browser.saveScreen('examplePage', {
            /* quelques options */
        })

        // Enregistrer un élément
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* quelques options */
            }
        )

        // Enregistrer une capture d'écran de page complète
        await browser.saveFullPageScreen('fullPage', {
            /* quelques options */
        })

        // Enregistrer une capture d'écran de page complète avec toutes les exécutions de tabulation
        await browser.saveTabbablePage('save-tabbable', {
            /* quelques options, utilisez les mêmes options que pour saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Vérifier un écran
        await expect(
            await browser.checkScreen('examplePage', {
                /* quelques options */
            })
        ).toEqual(0)

        // Vérifier un élément
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* quelques options */
                }
            )
        ).toEqual(0)

        // Vérifier une capture d'écran de page complète
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* quelques options */
            })
        ).toEqual(0)

        // Vérifier une capture d'écran de page complète avec toutes les exécutions de tabulation
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* quelques options, utilisez les mêmes options que pour checkFullPageScreen */
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
        // Vérifier que l'écran correspond exactement à la référence
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // vérifier qu'un élément a un pourcentage de différence de 5 % avec la référence
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // vérifier un élément avec des options pour la commande `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* quelques options */
        })

        // Vérifier qu'un élément correspond exactement à la référence
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // vérifier qu'un élément a un pourcentage de différence de 5 % avec la référence
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // vérifier un élément avec des options pour la commande `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* quelques options */
        })

        // Vérifier qu'une capture d'écran de page complète correspond à la référence
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Vérifier qu'une capture d'écran de page complète a un pourcentage de différence de 5 % avec la référence
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Vérifier une capture d'écran de page complète avec des options pour la commande `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* quelques options */
        })

        // Vérifier une capture d'écran de page complète avec toutes les exécutions de tabulation
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Vérifier qu'une capture d'écran de page complète a un pourcentage de différence de 5 % avec la référence
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Vérifier une capture d'écran de page complète avec des options pour la commande `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* quelques options */
        })
    })

    it('should save some screenshots', async () => {
        // Enregistrer un écran
        await browser.saveScreen('examplePage', {
            /* quelques options */
        })

        // Enregistrer un élément
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* quelques options */
            }
        )

        // Enregistrer une capture d'écran de page complète
        await browser.saveFullPageScreen('fullPage', {
            /* quelques options */
        })

        // Enregistrer une capture d'écran de page complète avec toutes les exécutions de tabulation
        await browser.saveTabbablePage('save-tabbable', {
            /* quelques options, utilisez les mêmes options que pour saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Vérifier un écran
        await expect(
            await browser.checkScreen('examplePage', {
                /* quelques options */
            })
        ).toEqual(0)

        // Vérifier un élément
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* quelques options */
                }
            )
        ).toEqual(0)

        // Vérifier une capture d'écran de page complète
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* quelques options */
            })
        ).toEqual(0)

        // Vérifier une capture d'écran de page complète avec toutes les exécutions de tabulation
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* quelques options, utilisez les mêmes options que pour checkFullPageScreen */
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
    // Enregistrer un écran
    await browser.saveScreen('examplePage', {
        /* quelques options */
    })

    // Enregistrer un élément
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* quelques options */
    })

    // Enregistrer une capture d'écran de page complète
    await browser.saveFullPageScreen('fullPage', {
        /* quelques options */
    })

    // Enregistrer une capture d'écran de page complète avec toutes les exécutions de tabulation
    await browser.saveTabbablePage('save-tabbable', {
        /* quelques options, utilisez les mêmes options que pour saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // Vérifier que l'écran correspond exactement à la référence
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // vérifier qu'un élément a un pourcentage de différence de 5 % avec la référence
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // vérifier un élément avec des options pour la commande `saveScreen`
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* quelques options */
    })

    // Vérifier qu'un élément correspond exactement à la référence
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // vérifier qu'un élément a un pourcentage de différence de 5 % avec la référence
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // vérifier un élément avec des options pour la commande `saveElement`
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* quelques options */
    })

    // Vérifier qu'une capture d'écran de page complète correspond à la référence
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // Vérifier qu'une capture d'écran de page complète a un pourcentage de différence de 5 % avec la référence
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // Vérifier une capture d'écran de page complète avec des options pour la commande `checkFullPageScreen`
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* quelques options */
    })

    // Vérifier une capture d'écran de page complète avec toutes les exécutions de tabulation
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // Vérifier qu'une capture d'écran de page complète a un pourcentage de différence de 5 % avec la référence
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // Vérifier une capture d'écran de page complète avec des options pour la commande `checkTabbablePage`
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* quelques options */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // Vérifier un écran
    await expect(
        await browser.checkScreen('examplePage', {
            /* quelques options */
        })
    ).toEqual(0)

    // Vérifier un élément
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* quelques options */
            }
        )
    ).toEqual(0)

    // Vérifier une capture d'écran de page complète
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* quelques options */
        })
    ).toEqual(0)

    // Vérifier une capture d'écran de page complète avec toutes les exécutions de tabulation
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* quelques options, utilisez les mêmes options que pour checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note IMPORTANT

Ce service fournit des méthodes `save` et `check`. Si vous exécutez vos tests pour la première fois, vous **NE DEVEZ PAS** combiner les méthodes `save` et `compare` : les méthodes `check` créeront automatiquement une image de référence pour vous

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


Lorsque vous avez [désactivé l'enregistrement automatique des images de référence](service-options#autosavebaseline), la Promise sera rejetée avec l'avertissement suivant.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Cela signifie que la capture d'écran actuelle est enregistrée dans le dossier actual et que vous **devez la copier manuellement dans votre dossier de référence**. Si vous instanciez `@wdio/visual-service` avec [`autoSaveBaseline: true`](./service-options#autosavebaseline), l'image sera automatiquement enregistrée dans le dossier de référence.

:::