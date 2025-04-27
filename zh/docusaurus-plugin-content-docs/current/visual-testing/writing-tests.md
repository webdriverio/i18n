---
id: writing-tests
title: 编写测试
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 测试运行框架支持

`@wdio/visual-service` 与测试运行框架无关，这意味着您可以将其与 WebdriverIO 支持的所有框架一起使用，如：

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

在测试中，您可以_保存_屏幕截图或将您的被测应用程序的当前视觉状态与基准进行匹配。为此，该服务提供了[自定义匹配器](/docs/api/expect-webdriverio#visual-matcher)，以及_检查_方法：

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

:::note 重要

此服务提供 `save` 和 `check` 方法。如果您是第一次运行测试，**不应该**同时使用 `save` 和 `compare` 方法，`check` 方法会自动为您创建基准图像

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


当您[禁用自动保存基准图像](service-options#autosavebaseline)时，Promise 将被拒绝并显示以下警告。

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

这意味着当前截图已保存在实际文件夹中，您**需要手动将其复制到基准文件夹**。如果您使用 [`autoSaveBaseline: true`](./service-options#autosavebaseline) 实例化 `@wdio/visual-service`，则图像将自动保存到基准文件夹中。

:::