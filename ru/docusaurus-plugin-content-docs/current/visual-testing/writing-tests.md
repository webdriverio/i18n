---
id: writing-tests
title: Написание тестов
description: "Пишите визуальные тесты с Mocha, Jasmine или Cucumber, которые сохраняют скриншоты или сравнивают их с эталонами с помощью пользовательских матчеров и методов проверки."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Поддержка фреймворков для запуска тестов

`@wdio/visual-service` не зависит от фреймворка для запуска тестов, что означает, что вы можете использовать его со всеми фреймворками, которые поддерживает WebdriverIO, такими как:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

В своих тестах вы можете _сохранять_ скриншоты или сравнивать текущее визуальное состояние тестируемого приложения с эталоном. Для этого сервис предоставляет [пользовательские матчеры](/docs/api/expect-webdriverio#visual-matcher), а также методы _проверки_ (_check_):

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
        // Проверить, что экран точно совпадает с эталоном
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // проверить, что процент несовпадения элемента с эталоном составляет 5%
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // проверить элемент с опциями для команды `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* некоторые опции */
        })

        // Проверить, что элемент точно совпадает с эталоном
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // проверить, что процент несовпадения элемента с эталоном составляет 5%
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // проверить элемент с опциями для команды `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* некоторые опции */
        })

        // Проверить совпадение скриншота всей страницы с эталоном
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Проверить, что процент несовпадения скриншота всей страницы с эталоном составляет 5%
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Проверить скриншот всей страницы с опциями для команды `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* некоторые опции */
        })

        // Проверить скриншот всей страницы со всеми переходами по Tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Проверить, что процент несовпадения скриншота всей страницы с эталоном составляет 5%
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Проверить скриншот всей страницы с опциями для команды `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* некоторые опции */
        })
    })

    it('should save some screenshots', async () => {
        // Сохранить экран
        await browser.saveScreen('examplePage', {
            /* некоторые опции */
        })

        // Сохранить элемент
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* некоторые опции */
            }
        )

        // Сохранить скриншот всей страницы
        await browser.saveFullPageScreen('fullPage', {
            /* некоторые опции */
        })

        // Сохранить скриншот всей страницы со всеми переходами по Tab
        await browser.saveTabbablePage('save-tabbable', {
            /* некоторые опции, используйте те же опции, что и для saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Проверить экран
        await expect(
            await browser.checkScreen('examplePage', {
                /* некоторые опции */
            })
        ).toEqual(0)

        // Проверить элемент
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* некоторые опции */
                }
            )
        ).toEqual(0)

        // Проверить скриншот всей страницы
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* некоторые опции */
            })
        ).toEqual(0)

        // Проверить скриншот всей страницы со всеми переходами по Tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* некоторые опции, используйте те же опции, что и для checkFullPageScreen */
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
        // Проверить, что экран точно совпадает с эталоном
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // проверить, что процент несовпадения элемента с эталоном составляет 5%
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // проверить элемент с опциями для команды `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* некоторые опции */
        })

        // Проверить, что элемент точно совпадает с эталоном
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // проверить, что процент несовпадения элемента с эталоном составляет 5%
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // проверить элемент с опциями для команды `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* некоторые опции */
        })

        // Проверить совпадение скриншота всей страницы с эталоном
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Проверить, что процент несовпадения скриншота всей страницы с эталоном составляет 5%
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Проверить скриншот всей страницы с опциями для команды `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* некоторые опции */
        })

        // Проверить скриншот всей страницы со всеми переходами по Tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Проверить, что процент несовпадения скриншота всей страницы с эталоном составляет 5%
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Проверить скриншот всей страницы с опциями для команды `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* некоторые опции */
        })
    })

    it('should save some screenshots', async () => {
        // Сохранить экран
        await browser.saveScreen('examplePage', {
            /* некоторые опции */
        })

        // Сохранить элемент
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* некоторые опции */
            }
        )

        // Сохранить скриншот всей страницы
        await browser.saveFullPageScreen('fullPage', {
            /* некоторые опции */
        })

        // Сохранить скриншот всей страницы со всеми переходами по Tab
        await browser.saveTabbablePage('save-tabbable', {
            /* некоторые опции, используйте те же опции, что и для saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Проверить экран
        await expect(
            await browser.checkScreen('examplePage', {
                /* некоторые опции */
            })
        ).toEqual(0)

        // Проверить элемент
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* некоторые опции */
                }
            )
        ).toEqual(0)

        // Проверить скриншот всей страницы
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* некоторые опции */
            })
        ).toEqual(0)

        // Проверить скриншот всей страницы со всеми переходами по Tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* некоторые опции, используйте те же опции, что и для checkFullPageScreen */
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
    // Сохранить экран
    await browser.saveScreen('examplePage', {
        /* некоторые опции */
    })

    // Сохранить элемент
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* некоторые опции */
    })

    // Сохранить скриншот всей страницы
    await browser.saveFullPageScreen('fullPage', {
        /* некоторые опции */
    })

    // Сохранить скриншот всей страницы со всеми переходами по Tab
    await browser.saveTabbablePage('save-tabbable', {
        /* некоторые опции, используйте те же опции, что и для saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // Проверить, что экран точно совпадает с эталоном
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // проверить, что процент несовпадения элемента с эталоном составляет 5%
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // проверить элемент с опциями для команды `saveScreen`
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* некоторые опции */
    })

    // Проверить, что элемент точно совпадает с эталоном
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // проверить, что процент несовпадения элемента с эталоном составляет 5%
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // проверить элемент с опциями для команды `saveElement`
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* некоторые опции */
    })

    // Проверить совпадение скриншота всей страницы с эталоном
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // Проверить, что процент несовпадения скриншота всей страницы с эталоном составляет 5%
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // Проверить скриншот всей страницы с опциями для команды `checkFullPageScreen`
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* некоторые опции */
    })

    // Проверить скриншот всей страницы со всеми переходами по Tab
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // Проверить, что процент несовпадения скриншота всей страницы с эталоном составляет 5%
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // Проверить скриншот всей страницы с опциями для команды `checkTabbablePage`
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* некоторые опции */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // Проверить экран
    await expect(
        await browser.checkScreen('examplePage', {
            /* некоторые опции */
        })
    ).toEqual(0)

    // Проверить элемент
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* некоторые опции */
            }
        )
    ).toEqual(0)

    // Проверить скриншот всей страницы
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* некоторые опции */
        })
    ).toEqual(0)

    // Проверить скриншот всей страницы со всеми переходами по Tab
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* некоторые опции, используйте те же опции, что и для checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note ВАЖНО

Этот сервис предоставляет методы `save` и `check`. Если вы запускаете тесты впервые, вам **НЕ СЛЕДУЕТ** комбинировать методы `save` и `compare`: методы `check` автоматически создадут для вас эталонное изображение

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


Если вы [отключили автоматическое сохранение эталонных изображений](service-options#autosavebaseline), Promise будет отклонён со следующим предупреждением.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Это означает, что текущий скриншот сохранён в папку actual, и вам **нужно вручную скопировать его в папку с эталонами**. Если вы инициализируете `@wdio/visual-service` с параметром [`autoSaveBaseline: true`](./service-options#autosavebaseline), изображение будет автоматически сохранено в папку с эталонами.

:::