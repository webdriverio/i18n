---
id: writing-tests
title: نوشتن تست‌ها
description: "با Mocha، Jasmine یا Cucumber تست‌های بصری بنویسید که اسکرین‌شات‌ها را ذخیره کرده یا آن‌ها را با استفاده از matcherهای سفارشی و متدهای check با تصاویر پایه مقایسه می‌کنند."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## پشتیبانی از فریم‌ورک‌های اجراکننده تست

`@wdio/visual-service` مستقل از فریم‌ورک اجراکننده تست است، به این معنی که می‌توانید آن را با تمام فریم‌ورک‌هایی که WebdriverIO پشتیبانی می‌کند استفاده کنید، مانند:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

در تست‌های خود، می‌توانید اسکرین‌شات‌ها را _ذخیره_ کنید یا وضعیت بصری فعلی برنامه تحت تست را با یک تصویر پایه (baseline) مقایسه کنید. برای این منظور، این سرویس [matcher سفارشی](/docs/api/expect-webdriverio#visual-matcher) و همچنین متدهای _check_ را ارائه می‌دهد:

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
        // بررسی صفحه برای تطابق دقیق با تصویر پایه
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // بررسی یک المان برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // بررسی یک المان با گزینه‌هایی برای دستور `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* برخی گزینه‌ها */
        })

        // بررسی یک المان برای تطابق دقیق با تصویر پایه
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // بررسی یک المان برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // بررسی یک المان با گزینه‌هایی برای دستور `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* برخی گزینه‌ها */
        })

        // بررسی تطابق اسکرین‌شات تمام صفحه با تصویر پایه
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // بررسی اسکرین‌شات تمام صفحه برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // بررسی اسکرین‌شات تمام صفحه با گزینه‌هایی برای دستور `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* برخی گزینه‌ها */
        })

        // بررسی اسکرین‌شات تمام صفحه همراه با تمام اجراهای tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // بررسی اسکرین‌شات تمام صفحه برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // بررسی اسکرین‌شات تمام صفحه با گزینه‌هایی برای دستور `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* برخی گزینه‌ها */
        })
    })

    it('should save some screenshots', async () => {
        // ذخیره یک صفحه
        await browser.saveScreen('examplePage', {
            /* برخی گزینه‌ها */
        })

        // ذخیره یک المان
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* برخی گزینه‌ها */
            }
        )

        // ذخیره اسکرین‌شات تمام صفحه
        await browser.saveFullPageScreen('fullPage', {
            /* برخی گزینه‌ها */
        })

        // ذخیره اسکرین‌شات تمام صفحه همراه با تمام اجراهای tab
        await browser.saveTabbablePage('save-tabbable', {
            /* برخی گزینه‌ها، از همان گزینه‌های saveFullPageScreen استفاده کنید */
        })
    })

    it('should compare successful with a baseline', async () => {
        // بررسی یک صفحه
        await expect(
            await browser.checkScreen('examplePage', {
                /* برخی گزینه‌ها */
            })
        ).toEqual(0)

        // بررسی یک المان
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* برخی گزینه‌ها */
                }
            )
        ).toEqual(0)

        // بررسی اسکرین‌شات تمام صفحه
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* برخی گزینه‌ها */
            })
        ).toEqual(0)

        // بررسی اسکرین‌شات تمام صفحه همراه با تمام اجراهای tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* برخی گزینه‌ها، از همان گزینه‌های checkFullPageScreen استفاده کنید */
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
        // بررسی صفحه برای تطابق دقیق با تصویر پایه
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // بررسی یک المان برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // بررسی یک المان با گزینه‌هایی برای دستور `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* برخی گزینه‌ها */
        })

        // بررسی یک المان برای تطابق دقیق با تصویر پایه
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // بررسی یک المان برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // بررسی یک المان با گزینه‌هایی برای دستور `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* برخی گزینه‌ها */
        })

        // بررسی تطابق اسکرین‌شات تمام صفحه با تصویر پایه
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // بررسی اسکرین‌شات تمام صفحه برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // بررسی اسکرین‌شات تمام صفحه با گزینه‌هایی برای دستور `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* برخی گزینه‌ها */
        })

        // بررسی اسکرین‌شات تمام صفحه همراه با تمام اجراهای tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // بررسی اسکرین‌شات تمام صفحه برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // بررسی اسکرین‌شات تمام صفحه با گزینه‌هایی برای دستور `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* برخی گزینه‌ها */
        })
    })

    it('should save some screenshots', async () => {
        // ذخیره یک صفحه
        await browser.saveScreen('examplePage', {
            /* برخی گزینه‌ها */
        })

        // ذخیره یک المان
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* برخی گزینه‌ها */
            }
        )

        // ذخیره اسکرین‌شات تمام صفحه
        await browser.saveFullPageScreen('fullPage', {
            /* برخی گزینه‌ها */
        })

        // ذخیره اسکرین‌شات تمام صفحه همراه با تمام اجراهای tab
        await browser.saveTabbablePage('save-tabbable', {
            /* برخی گزینه‌ها، از همان گزینه‌های saveFullPageScreen استفاده کنید */
        })
    })

    it('should compare successful with a baseline', async () => {
        // بررسی یک صفحه
        await expect(
            await browser.checkScreen('examplePage', {
                /* برخی گزینه‌ها */
            })
        ).toEqual(0)

        // بررسی یک المان
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* برخی گزینه‌ها */
                }
            )
        ).toEqual(0)

        // بررسی اسکرین‌شات تمام صفحه
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* برخی گزینه‌ها */
            })
        ).toEqual(0)

        // بررسی اسکرین‌شات تمام صفحه همراه با تمام اجراهای tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* برخی گزینه‌ها، از همان گزینه‌های checkFullPageScreen استفاده کنید */
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
    // ذخیره یک صفحه
    await browser.saveScreen('examplePage', {
        /* برخی گزینه‌ها */
    })

    // ذخیره یک المان
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* برخی گزینه‌ها */
    })

    // ذخیره اسکرین‌شات تمام صفحه
    await browser.saveFullPageScreen('fullPage', {
        /* برخی گزینه‌ها */
    })

    // ذخیره اسکرین‌شات تمام صفحه همراه با تمام اجراهای tab
    await browser.saveTabbablePage('save-tabbable', {
        /* برخی گزینه‌ها، از همان گزینه‌های saveFullPageScreen استفاده کنید */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // بررسی صفحه برای تطابق دقیق با تصویر پایه
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // بررسی یک المان برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // بررسی یک المان با گزینه‌هایی برای دستور `saveScreen`
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* برخی گزینه‌ها */
    })

    // بررسی یک المان برای تطابق دقیق با تصویر پایه
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // بررسی یک المان برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // بررسی یک المان با گزینه‌هایی برای دستور `saveElement`
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* برخی گزینه‌ها */
    })

    // بررسی تطابق اسکرین‌شات تمام صفحه با تصویر پایه
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // بررسی اسکرین‌شات تمام صفحه برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // بررسی اسکرین‌شات تمام صفحه با گزینه‌هایی برای دستور `checkFullPageScreen`
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* برخی گزینه‌ها */
    })

    // بررسی اسکرین‌شات تمام صفحه همراه با تمام اجراهای tab
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // بررسی اسکرین‌شات تمام صفحه برای داشتن درصد عدم تطابق ۵٪ با تصویر پایه
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // بررسی اسکرین‌شات تمام صفحه با گزینه‌هایی برای دستور `checkTabbablePage`
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* برخی گزینه‌ها */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // بررسی یک صفحه
    await expect(
        await browser.checkScreen('examplePage', {
            /* برخی گزینه‌ها */
        })
    ).toEqual(0)

    // بررسی یک المان
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* برخی گزینه‌ها */
            }
        )
    ).toEqual(0)

    // بررسی اسکرین‌شات تمام صفحه
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* برخی گزینه‌ها */
        })
    ).toEqual(0)

    // بررسی اسکرین‌شات تمام صفحه همراه با تمام اجراهای tab
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* برخی گزینه‌ها، از همان گزینه‌های checkFullPageScreen استفاده کنید */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note مهم

این سرویس متدهای `save` و `check` را ارائه می‌دهد. اگر تست‌های خود را برای اولین بار اجرا می‌کنید، **نباید** متدهای `save` و `compare` را با هم ترکیب کنید، زیرا متدهای `check` به‌طور خودکار یک تصویر پایه برای شما ایجاد می‌کنند

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


هنگامی که [ذخیره خودکار تصاویر پایه را غیرفعال کرده باشید](service-options#autosavebaseline)، Promise با هشدار زیر رد (reject) می‌شود.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

این بدان معناست که اسکرین‌شات فعلی در پوشه actual ذخیره شده است و شما **باید آن را به‌صورت دستی در پوشه baseline کپی کنید**. اگر `@wdio/visual-service` را با [`autoSaveBaseline: true`](./service-options#autosavebaseline) راه‌اندازی کنید، تصویر به‌طور خودکار در پوشه baseline ذخیره خواهد شد.

:::