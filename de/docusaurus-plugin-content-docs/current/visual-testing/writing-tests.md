---
id: writing-tests
title: Tests schreiben
description: "Schreiben Sie visuelle Tests mit Mocha, Jasmine oder Cucumber, die Screenshots speichern oder sie mit benutzerdefinierten Matchern und Check-Methoden mit Baselines abgleichen."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Unterstützung von Testrunner-Frameworks

`@wdio/visual-service` ist unabhängig vom Testrunner-Framework, was bedeutet, dass Sie es mit allen Frameworks verwenden können, die WebdriverIO unterstützt, wie z. B.:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

In Ihren Tests können Sie Screenshots _speichern_ oder den aktuellen visuellen Zustand Ihrer zu testenden Anwendung mit einer Baseline abgleichen. Dafür stellt der Service [benutzerdefinierte Matcher](/docs/api/expect-webdriverio#visual-matcher) sowie _check_-Methoden bereit:

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
        // Prüfen, ob der Bildschirm exakt mit der Baseline übereinstimmt
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // Prüfen, ob ein Element eine Abweichung von 5 % gegenüber der Baseline hat
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // Ein Element mit Optionen für den `saveScreen`-Befehl prüfen
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* einige Optionen */
        })

        // Prüfen, ob ein Element exakt mit der Baseline übereinstimmt
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // Prüfen, ob ein Element eine Abweichung von 5 % gegenüber der Baseline hat
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // Ein Element mit Optionen für den `saveElement`-Befehl prüfen
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* einige Optionen */
        })

        // Prüfen, ob ein ganzseitiger Screenshot mit der Baseline übereinstimmt
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Prüfen, ob ein ganzseitiger Screenshot eine Abweichung von 5 % gegenüber der Baseline hat
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Einen ganzseitigen Screenshot mit Optionen für den `checkFullPageScreen`-Befehl prüfen
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* einige Optionen */
        })

        // Einen ganzseitigen Screenshot mit allen Tab-Ausführungen prüfen
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Prüfen, ob ein ganzseitiger Screenshot eine Abweichung von 5 % gegenüber der Baseline hat
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Einen ganzseitigen Screenshot mit Optionen für den `checkTabbablePage`-Befehl prüfen
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* einige Optionen */
        })
    })

    it('should save some screenshots', async () => {
        // Einen Bildschirm speichern
        await browser.saveScreen('examplePage', {
            /* einige Optionen */
        })

        // Ein Element speichern
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* einige Optionen */
            }
        )

        // Einen ganzseitigen Screenshot speichern
        await browser.saveFullPageScreen('fullPage', {
            /* einige Optionen */
        })

        // Einen ganzseitigen Screenshot mit allen Tab-Ausführungen speichern
        await browser.saveTabbablePage('save-tabbable', {
            /* einige Optionen, verwenden Sie dieselben Optionen wie für saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Einen Bildschirm prüfen
        await expect(
            await browser.checkScreen('examplePage', {
                /* einige Optionen */
            })
        ).toEqual(0)

        // Ein Element prüfen
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* einige Optionen */
                }
            )
        ).toEqual(0)

        // Einen ganzseitigen Screenshot prüfen
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* einige Optionen */
            })
        ).toEqual(0)

        // Einen ganzseitigen Screenshot mit allen Tab-Ausführungen prüfen
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* einige Optionen, verwenden Sie dieselben Optionen wie für checkFullPageScreen */
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
        // Prüfen, ob der Bildschirm exakt mit der Baseline übereinstimmt
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // Prüfen, ob ein Element eine Abweichung von 5 % gegenüber der Baseline hat
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // Ein Element mit Optionen für den `saveScreen`-Befehl prüfen
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* einige Optionen */
        })

        // Prüfen, ob ein Element exakt mit der Baseline übereinstimmt
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // Prüfen, ob ein Element eine Abweichung von 5 % gegenüber der Baseline hat
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // Ein Element mit Optionen für den `saveElement`-Befehl prüfen
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* einige Optionen */
        })

        // Prüfen, ob ein ganzseitiger Screenshot mit der Baseline übereinstimmt
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Prüfen, ob ein ganzseitiger Screenshot eine Abweichung von 5 % gegenüber der Baseline hat
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Einen ganzseitigen Screenshot mit Optionen für den `checkFullPageScreen`-Befehl prüfen
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* einige Optionen */
        })

        // Einen ganzseitigen Screenshot mit allen Tab-Ausführungen prüfen
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Prüfen, ob ein ganzseitiger Screenshot eine Abweichung von 5 % gegenüber der Baseline hat
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Einen ganzseitigen Screenshot mit Optionen für den `checkTabbablePage`-Befehl prüfen
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* einige Optionen */
        })
    })

    it('should save some screenshots', async () => {
        // Einen Bildschirm speichern
        await browser.saveScreen('examplePage', {
            /* einige Optionen */
        })

        // Ein Element speichern
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* einige Optionen */
            }
        )

        // Einen ganzseitigen Screenshot speichern
        await browser.saveFullPageScreen('fullPage', {
            /* einige Optionen */
        })

        // Einen ganzseitigen Screenshot mit allen Tab-Ausführungen speichern
        await browser.saveTabbablePage('save-tabbable', {
            /* einige Optionen, verwenden Sie dieselben Optionen wie für saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Einen Bildschirm prüfen
        await expect(
            await browser.checkScreen('examplePage', {
                /* einige Optionen */
            })
        ).toEqual(0)

        // Ein Element prüfen
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* einige Optionen */
                }
            )
        ).toEqual(0)

        // Einen ganzseitigen Screenshot prüfen
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* einige Optionen */
            })
        ).toEqual(0)

        // Einen ganzseitigen Screenshot mit allen Tab-Ausführungen prüfen
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* einige Optionen, verwenden Sie dieselben Optionen wie für checkFullPageScreen */
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
    // Einen Bildschirm speichern
    await browser.saveScreen('examplePage', {
        /* einige Optionen */
    })

    // Ein Element speichern
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* einige Optionen */
    })

    // Einen ganzseitigen Screenshot speichern
    await browser.saveFullPageScreen('fullPage', {
        /* einige Optionen */
    })

    // Einen ganzseitigen Screenshot mit allen Tab-Ausführungen speichern
    await browser.saveTabbablePage('save-tabbable', {
        /* einige Optionen, verwenden Sie dieselben Optionen wie für saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // Prüfen, ob der Bildschirm exakt mit der Baseline übereinstimmt
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // Prüfen, ob ein Element eine Abweichung von 5 % gegenüber der Baseline hat
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // Ein Element mit Optionen für den `saveScreen`-Befehl prüfen
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* einige Optionen */
    })

    // Prüfen, ob ein Element exakt mit der Baseline übereinstimmt
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // Prüfen, ob ein Element eine Abweichung von 5 % gegenüber der Baseline hat
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // Ein Element mit Optionen für den `saveElement`-Befehl prüfen
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* einige Optionen */
    })

    // Prüfen, ob ein ganzseitiger Screenshot mit der Baseline übereinstimmt
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // Prüfen, ob ein ganzseitiger Screenshot eine Abweichung von 5 % gegenüber der Baseline hat
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // Einen ganzseitigen Screenshot mit Optionen für den `checkFullPageScreen`-Befehl prüfen
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* einige Optionen */
    })

    // Einen ganzseitigen Screenshot mit allen Tab-Ausführungen prüfen
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // Prüfen, ob ein ganzseitiger Screenshot eine Abweichung von 5 % gegenüber der Baseline hat
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // Einen ganzseitigen Screenshot mit Optionen für den `checkTabbablePage`-Befehl prüfen
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* einige Optionen */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // Einen Bildschirm prüfen
    await expect(
        await browser.checkScreen('examplePage', {
            /* einige Optionen */
        })
    ).toEqual(0)

    // Ein Element prüfen
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* einige Optionen */
            }
        )
    ).toEqual(0)

    // Einen ganzseitigen Screenshot prüfen
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* einige Optionen */
        })
    ).toEqual(0)

    // Einen ganzseitigen Screenshot mit allen Tab-Ausführungen prüfen
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* einige Optionen, verwenden Sie dieselben Optionen wie für checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note WICHTIG

Dieser Service stellt `save`- und `check`-Methoden bereit. Wenn Sie Ihre Tests zum ersten Mal ausführen, **SOLLTEN SIE** `save`- und `compare`-Methoden **NICHT** kombinieren, da die `check`-Methoden automatisch ein Baseline-Bild für Sie erstellen

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


Wenn Sie das [automatische Speichern von Baseline-Bildern deaktiviert haben](service-options#autosavebaseline), wird das Promise mit der folgenden Warnung abgelehnt.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Das bedeutet, dass der aktuelle Screenshot im Ordner „actual“ gespeichert wird und Sie ihn **manuell in Ihren Baseline-Ordner kopieren müssen**. Wenn Sie `@wdio/visual-service` mit [`autoSaveBaseline: true`](./service-options#autosavebaseline) instanziieren, wird das Bild automatisch im Baseline-Ordner gespeichert.

:::