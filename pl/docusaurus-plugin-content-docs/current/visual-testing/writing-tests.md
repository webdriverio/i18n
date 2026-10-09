---
id: writing-tests
title: Pisanie testów
description: "Pisz testy wizualne z Mocha, Jasmine lub Cucumber, które zapisują zrzuty ekranu lub porównują je z obrazami bazowymi za pomocą niestandardowych matcherów i metod check."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Obsługa frameworków testowych

`@wdio/visual-service` jest niezależny od frameworka testowego, co oznacza, że możesz go używać ze wszystkimi frameworkami obsługiwanymi przez WebdriverIO, takimi jak:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

W swoich testach możesz _zapisywać_ zrzuty ekranu lub porównywać bieżący stan wizualny testowanej aplikacji z obrazem bazowym. W tym celu serwis udostępnia [niestandardowy matcher](/docs/api/expect-webdriverio#visual-matcher), a także metody _check_:

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
        // Sprawdź, czy ekran dokładnie odpowiada obrazowi bazowemu
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // sprawdź, czy element ma procent niezgodności 5% względem obrazu bazowego
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // sprawdź element z opcjami dla polecenia `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* jakieś opcje */
        })

        // Sprawdź, czy element dokładnie odpowiada obrazowi bazowemu
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // sprawdź, czy element ma procent niezgodności 5% względem obrazu bazowego
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // sprawdź element z opcjami dla polecenia `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* jakieś opcje */
        })

        // Sprawdź, czy zrzut ekranu całej strony odpowiada obrazowi bazowemu
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Sprawdź, czy zrzut ekranu całej strony ma procent niezgodności 5% względem obrazu bazowego
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Sprawdź zrzut ekranu całej strony z opcjami dla polecenia `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* jakieś opcje */
        })

        // Sprawdź zrzut ekranu całej strony ze wszystkimi wykonaniami klawisza Tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Sprawdź, czy zrzut ekranu całej strony ma procent niezgodności 5% względem obrazu bazowego
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Sprawdź zrzut ekranu całej strony z opcjami dla polecenia `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* jakieś opcje */
        })
    })

    it('should save some screenshots', async () => {
        // Zapisz ekran
        await browser.saveScreen('examplePage', {
            /* jakieś opcje */
        })

        // Zapisz element
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* jakieś opcje */
            }
        )

        // Zapisz zrzut ekranu całej strony
        await browser.saveFullPageScreen('fullPage', {
            /* jakieś opcje */
        })

        // Zapisz zrzut ekranu całej strony ze wszystkimi wykonaniami klawisza Tab
        await browser.saveTabbablePage('save-tabbable', {
            /* jakieś opcje, użyj tych samych opcji co dla saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Sprawdź ekran
        await expect(
            await browser.checkScreen('examplePage', {
                /* jakieś opcje */
            })
        ).toEqual(0)

        // Sprawdź element
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* jakieś opcje */
                }
            )
        ).toEqual(0)

        // Sprawdź zrzut ekranu całej strony
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* jakieś opcje */
            })
        ).toEqual(0)

        // Sprawdź zrzut ekranu całej strony ze wszystkimi wykonaniami klawisza Tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* jakieś opcje, użyj tych samych opcji co dla checkFullPageScreen */
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
        // Sprawdź, czy ekran dokładnie odpowiada obrazowi bazowemu
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // sprawdź, czy element ma procent niezgodności 5% względem obrazu bazowego
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // sprawdź element z opcjami dla polecenia `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* jakieś opcje */
        })

        // Sprawdź, czy element dokładnie odpowiada obrazowi bazowemu
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // sprawdź, czy element ma procent niezgodności 5% względem obrazu bazowego
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // sprawdź element z opcjami dla polecenia `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* jakieś opcje */
        })

        // Sprawdź, czy zrzut ekranu całej strony odpowiada obrazowi bazowemu
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Sprawdź, czy zrzut ekranu całej strony ma procent niezgodności 5% względem obrazu bazowego
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Sprawdź zrzut ekranu całej strony z opcjami dla polecenia `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* jakieś opcje */
        })

        // Sprawdź zrzut ekranu całej strony ze wszystkimi wykonaniami klawisza Tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Sprawdź, czy zrzut ekranu całej strony ma procent niezgodności 5% względem obrazu bazowego
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Sprawdź zrzut ekranu całej strony z opcjami dla polecenia `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* jakieś opcje */
        })
    })

    it('should save some screenshots', async () => {
        // Zapisz ekran
        await browser.saveScreen('examplePage', {
            /* jakieś opcje */
        })

        // Zapisz element
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* jakieś opcje */
            }
        )

        // Zapisz zrzut ekranu całej strony
        await browser.saveFullPageScreen('fullPage', {
            /* jakieś opcje */
        })

        // Zapisz zrzut ekranu całej strony ze wszystkimi wykonaniami klawisza Tab
        await browser.saveTabbablePage('save-tabbable', {
            /* jakieś opcje, użyj tych samych opcji co dla saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Sprawdź ekran
        await expect(
            await browser.checkScreen('examplePage', {
                /* jakieś opcje */
            })
        ).toEqual(0)

        // Sprawdź element
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* jakieś opcje */
                }
            )
        ).toEqual(0)

        // Sprawdź zrzut ekranu całej strony
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* jakieś opcje */
            })
        ).toEqual(0)

        // Sprawdź zrzut ekranu całej strony ze wszystkimi wykonaniami klawisza Tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* jakieś opcje, użyj tych samych opcji co dla checkFullPageScreen */
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
    // Zapisz ekran
    await browser.saveScreen('examplePage', {
        /* jakieś opcje */
    })

    // Zapisz element
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* jakieś opcje */
    })

    // Zapisz zrzut ekranu całej strony
    await browser.saveFullPageScreen('fullPage', {
        /* jakieś opcje */
    })

    // Zapisz zrzut ekranu całej strony ze wszystkimi wykonaniami klawisza Tab
    await browser.saveTabbablePage('save-tabbable', {
        /* jakieś opcje, użyj tych samych opcji co dla saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // Sprawdź, czy ekran dokładnie odpowiada obrazowi bazowemu
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // sprawdź, czy element ma procent niezgodności 5% względem obrazu bazowego
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // sprawdź element z opcjami dla polecenia `saveScreen`
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* jakieś opcje */
    })

    // Sprawdź, czy element dokładnie odpowiada obrazowi bazowemu
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // sprawdź, czy element ma procent niezgodności 5% względem obrazu bazowego
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // sprawdź element z opcjami dla polecenia `saveElement`
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* jakieś opcje */
    })

    // Sprawdź, czy zrzut ekranu całej strony odpowiada obrazowi bazowemu
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // Sprawdź, czy zrzut ekranu całej strony ma procent niezgodności 5% względem obrazu bazowego
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // Sprawdź zrzut ekranu całej strony z opcjami dla polecenia `checkFullPageScreen`
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* jakieś opcje */
    })

    // Sprawdź zrzut ekranu całej strony ze wszystkimi wykonaniami klawisza Tab
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // Sprawdź, czy zrzut ekranu całej strony ma procent niezgodności 5% względem obrazu bazowego
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // Sprawdź zrzut ekranu całej strony z opcjami dla polecenia `checkTabbablePage`
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* jakieś opcje */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // Sprawdź ekran
    await expect(
        await browser.checkScreen('examplePage', {
            /* jakieś opcje */
        })
    ).toEqual(0)

    // Sprawdź element
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* jakieś opcje */
            }
        )
    ).toEqual(0)

    // Sprawdź zrzut ekranu całej strony
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* jakieś opcje */
        })
    ).toEqual(0)

    // Sprawdź zrzut ekranu całej strony ze wszystkimi wykonaniami klawisza Tab
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* jakieś opcje, użyj tych samych opcji co dla checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note WAŻNE

Ten serwis udostępnia metody `save` i `check`. Jeśli uruchamiasz testy po raz pierwszy, **NIE POWINIENEŚ** łączyć metod `save` i `compare` – metody `check` automatycznie utworzą dla Ciebie obraz bazowy

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


Jeśli [wyłączyłeś automatyczne zapisywanie obrazów bazowych](service-options#autosavebaseline), Promise zostanie odrzucony z następującym ostrzeżeniem.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Oznacza to, że bieżący zrzut ekranu został zapisany w folderze actual i **musisz ręcznie skopiować go do folderu z obrazami bazowymi**. Jeśli zainicjujesz `@wdio/visual-service` z opcją [`autoSaveBaseline: true`](./service-options#autosavebaseline), obraz zostanie automatycznie zapisany w folderze z obrazami bazowymi.

:::