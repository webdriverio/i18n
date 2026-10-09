---
id: writing-tests
title: Skriva tester
description: "Skriv visuella tester med Mocha, Jasmine eller Cucumber som sparar skärmdumpar eller jämför dem mot baslinjer med anpassade matchers och check-metoder."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Stöd för testrunner-ramverk

`@wdio/visual-service` är oberoende av testrunner-ramverk, vilket innebär att du kan använda den med alla ramverk som WebdriverIO stöder, till exempel:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

I dina tester kan du _spara_ skärmdumpar eller jämföra det aktuella visuella tillståndet för applikationen som testas med en baslinje. För detta tillhandahåller tjänsten [anpassade matchers](/docs/api/expect-webdriverio#visual-matcher) samt _check_-metoder:

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
        // Kontrollera att skärmen exakt matchar baslinjen
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // kontrollera att ett element har en avvikelseprocent på 5 % jämfört med baslinjen
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // kontrollera ett element med alternativ för kommandot `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* några alternativ */
        })

        // Kontrollera att ett element exakt matchar baslinjen
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // kontrollera att ett element har en avvikelseprocent på 5 % jämfört med baslinjen
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // kontrollera ett element med alternativ för kommandot `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* några alternativ */
        })

        // Kontrollera att en helsidesskärmdump matchar baslinjen
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Kontrollera att en helsidesskärmdump har en avvikelseprocent på 5 % jämfört med baslinjen
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Kontrollera en helsidesskärmdump med alternativ för kommandot `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* några alternativ */
        })

        // Kontrollera en helsidesskärmdump med alla tabbkörningar
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Kontrollera att en helsidesskärmdump har en avvikelseprocent på 5 % jämfört med baslinjen
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Kontrollera en helsidesskärmdump med alternativ för kommandot `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* några alternativ */
        })
    })

    it('should save some screenshots', async () => {
        // Spara en skärm
        await browser.saveScreen('examplePage', {
            /* några alternativ */
        })

        // Spara ett element
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* några alternativ */
            }
        )

        // Spara en helsidesskärmdump
        await browser.saveFullPageScreen('fullPage', {
            /* några alternativ */
        })

        // Spara en helsidesskärmdump med alla tabbkörningar
        await browser.saveTabbablePage('save-tabbable', {
            /* några alternativ, använd samma alternativ som för saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Kontrollera en skärm
        await expect(
            await browser.checkScreen('examplePage', {
                /* några alternativ */
            })
        ).toEqual(0)

        // Kontrollera ett element
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* några alternativ */
                }
            )
        ).toEqual(0)

        // Kontrollera en helsidesskärmdump
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* några alternativ */
            })
        ).toEqual(0)

        // Kontrollera en helsidesskärmdump med alla tabbkörningar
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* några alternativ, använd samma alternativ som för checkFullPageScreen */
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
        // Kontrollera att skärmen exakt matchar baslinjen
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // kontrollera att ett element har en avvikelseprocent på 5 % jämfört med baslinjen
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // kontrollera ett element med alternativ för kommandot `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* några alternativ */
        })

        // Kontrollera att ett element exakt matchar baslinjen
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // kontrollera att ett element har en avvikelseprocent på 5 % jämfört med baslinjen
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // kontrollera ett element med alternativ för kommandot `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* några alternativ */
        })

        // Kontrollera att en helsidesskärmdump matchar baslinjen
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Kontrollera att en helsidesskärmdump har en avvikelseprocent på 5 % jämfört med baslinjen
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Kontrollera en helsidesskärmdump med alternativ för kommandot `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* några alternativ */
        })

        // Kontrollera en helsidesskärmdump med alla tabbkörningar
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Kontrollera att en helsidesskärmdump har en avvikelseprocent på 5 % jämfört med baslinjen
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Kontrollera en helsidesskärmdump med alternativ för kommandot `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* några alternativ */
        })
    })

    it('should save some screenshots', async () => {
        // Spara en skärm
        await browser.saveScreen('examplePage', {
            /* några alternativ */
        })

        // Spara ett element
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* några alternativ */
            }
        )

        // Spara en helsidesskärmdump
        await browser.saveFullPageScreen('fullPage', {
            /* några alternativ */
        })

        // Spara en helsidesskärmdump med alla tabbkörningar
        await browser.saveTabbablePage('save-tabbable', {
            /* några alternativ, använd samma alternativ som för saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Kontrollera en skärm
        await expect(
            await browser.checkScreen('examplePage', {
                /* några alternativ */
            })
        ).toEqual(0)

        // Kontrollera ett element
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* några alternativ */
                }
            )
        ).toEqual(0)

        // Kontrollera en helsidesskärmdump
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* några alternativ */
            })
        ).toEqual(0)

        // Kontrollera en helsidesskärmdump med alla tabbkörningar
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* några alternativ, använd samma alternativ som för checkFullPageScreen */
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
    // Spara en skärm
    await browser.saveScreen('examplePage', {
        /* några alternativ */
    })

    // Spara ett element
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* några alternativ */
    })

    // Spara en helsidesskärmdump
    await browser.saveFullPageScreen('fullPage', {
        /* några alternativ */
    })

    // Spara en helsidesskärmdump med alla tabbkörningar
    await browser.saveTabbablePage('save-tabbable', {
        /* några alternativ, använd samma alternativ som för saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // Kontrollera att skärmen exakt matchar baslinjen
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // kontrollera att ett element har en avvikelseprocent på 5 % jämfört med baslinjen
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // kontrollera ett element med alternativ för kommandot `saveScreen`
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* några alternativ */
    })

    // Kontrollera att ett element exakt matchar baslinjen
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // kontrollera att ett element har en avvikelseprocent på 5 % jämfört med baslinjen
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // kontrollera ett element med alternativ för kommandot `saveElement`
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* några alternativ */
    })

    // Kontrollera att en helsidesskärmdump matchar baslinjen
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // Kontrollera att en helsidesskärmdump har en avvikelseprocent på 5 % jämfört med baslinjen
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // Kontrollera en helsidesskärmdump med alternativ för kommandot `checkFullPageScreen`
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* några alternativ */
    })

    // Kontrollera en helsidesskärmdump med alla tabbkörningar
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // Kontrollera att en helsidesskärmdump har en avvikelseprocent på 5 % jämfört med baslinjen
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // Kontrollera en helsidesskärmdump med alternativ för kommandot `checkTabbablePage`
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* några alternativ */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // Kontrollera en skärm
    await expect(
        await browser.checkScreen('examplePage', {
            /* några alternativ */
        })
    ).toEqual(0)

    // Kontrollera ett element
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* några alternativ */
            }
        )
    ).toEqual(0)

    // Kontrollera en helsidesskärmdump
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* några alternativ */
        })
    ).toEqual(0)

    // Kontrollera en helsidesskärmdump med alla tabbkörningar
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* några alternativ, använd samma alternativ som för checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note VIKTIGT

Den här tjänsten tillhandahåller `save`- och `check`-metoder. Om du kör dina tester för första gången **BÖR DU INTE** kombinera `save`- och `compare`-metoder, eftersom `check`-metoderna automatiskt skapar en baslinjebild åt dig

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


När du har [inaktiverat automatisk sparning av baslinjebilder](service-options#autosavebaseline) kommer Promise att avvisas med följande varning.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Det innebär att den aktuella skärmdumpen sparas i actual-mappen och att du **manuellt måste kopiera den till din baslinje**. Om du instansierar `@wdio/visual-service` med [`autoSaveBaseline: true`](./service-options#autosavebaseline) sparas bilden automatiskt i baslinjemappen.

:::