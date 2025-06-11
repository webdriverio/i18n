---
id: writing-tests
title: Γράφοντας Δοκιμές
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Testrunner Framework Support

`@wdio/visual-service` είναι ανεξάρτητο από το πλαίσιο δοκιμών (test-runner framework), που σημαίνει ότι μπορείτε να το χρησιμοποιήσετε με όλα τα πλαίσια που υποστηρίζει το WebdriverIO όπως:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

Μέσα στις δοκιμές σας, μπορείτε να _αποθηκεύσετε_ στιγμιότυπα οθόνης ή να συγκρίνετε την τρέχουσα οπτική κατάσταση της εφαρμογής σας υπό δοκιμή με μια βασική γραμμή αναφοράς. Για αυτό, η υπηρεσία παρέχει [προσαρμοσμένους ελεγκτές](/docs/api/expect-webdriverio#visual-matcher), καθώς και μεθόδους _ελέγχου_:

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

:::note ΣΗΜΑΝΤΙΚΟ

Αυτή η υπηρεσία παρέχει μεθόδους `save` και `check`. Αν εκτελείτε τις δοκιμές σας για πρώτη φορά **ΔΕΝ ΠΡΕΠΕΙ** να συνδυάζετε τις μεθόδους `save` και `compare`, οι μέθοδοι `check` θα δημιουργήσουν αυτόματα μια εικόνα βασικής γραμμής για εσάς

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


Όταν έχετε [απενεργοποιήσει την αυτόματη αποθήκευση εικόνων βασικής γραμμής](service-options#autosavebaseline), η υπόσχεση (Promise) θα απορριφθεί με την ακόλουθη προειδοποίηση.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Αυτό σημαίνει ότι το τρέχον στιγμιότυπο οθόνης αποθηκεύεται στον φάκελο actual και **πρέπει να το αντιγράψετε χειροκίνητα στη βασική σας γραμμή αναφοράς**. Αν αρχικοποιήσετε το `@wdio/visual-service` με την επιλογή [`autoSaveBaseline: true`](./service-options#autosavebaseline), η εικόνα θα αποθηκευτεί αυτόματα στον φάκελο βασικής γραμμής.

:::