---
id: writing-tests
title: كتابة الاختبارات
description: "اكتب اختبارات مرئية باستخدام Mocha أو Jasmine أو Cucumber تحفظ لقطات الشاشة أو تطابقها مع الصور المرجعية باستخدام أدوات مطابقة مخصصة وطرق التحقق."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## دعم أطر عمل مشغلات الاختبار

`@wdio/visual-service` لا يرتبط بإطار عمل مشغل اختبار معين، مما يعني أنه يمكنك استخدامه مع جميع أطر العمل التي يدعمها WebdriverIO مثل:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

داخل اختباراتك، يمكنك _حفظ_ لقطات الشاشة أو مطابقة الحالة المرئية الحالية للتطبيق قيد الاختبار مع صورة مرجعية. لهذا الغرض، توفر الخدمة [أداة مطابقة مخصصة](/docs/api/expect-webdriverio#visual-matcher)، بالإضافة إلى طرق _التحقق_:

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
        // تحقق من أن الشاشة تطابق الصورة المرجعية تمامًا
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // تحقق من أن نسبة عدم التطابق مع الصورة المرجعية هي 5%
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // تحقق مع خيارات لأمر `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* بعض الخيارات */
        })

        // تحقق من أن العنصر يطابق الصورة المرجعية تمامًا
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // تحقق من أن نسبة عدم تطابق العنصر مع الصورة المرجعية هي 5%
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // تحقق من عنصر مع خيارات لأمر `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* بعض الخيارات */
        })

        // تحقق من تطابق لقطة شاشة الصفحة الكاملة مع الصورة المرجعية
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // تحقق من أن نسبة عدم تطابق لقطة شاشة الصفحة الكاملة مع الصورة المرجعية هي 5%
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // تحقق من لقطة شاشة الصفحة الكاملة مع خيارات لأمر `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* بعض الخيارات */
        })

        // تحقق من لقطة شاشة الصفحة الكاملة مع جميع عمليات التنقل بمفتاح Tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // تحقق من أن نسبة عدم تطابق لقطة شاشة الصفحة الكاملة مع الصورة المرجعية هي 5%
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // تحقق من لقطة شاشة الصفحة الكاملة مع خيارات لأمر `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* بعض الخيارات */
        })
    })

    it('should save some screenshots', async () => {
        // احفظ شاشة
        await browser.saveScreen('examplePage', {
            /* بعض الخيارات */
        })

        // احفظ عنصرًا
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* بعض الخيارات */
            }
        )

        // احفظ لقطة شاشة للصفحة الكاملة
        await browser.saveFullPageScreen('fullPage', {
            /* بعض الخيارات */
        })

        // احفظ لقطة شاشة للصفحة الكاملة مع جميع عمليات التنقل بمفتاح Tab
        await browser.saveTabbablePage('save-tabbable', {
            /* بعض الخيارات، استخدم نفس الخيارات المستخدمة في saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // تحقق من شاشة
        await expect(
            await browser.checkScreen('examplePage', {
                /* بعض الخيارات */
            })
        ).toEqual(0)

        // تحقق من عنصر
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* بعض الخيارات */
                }
            )
        ).toEqual(0)

        // تحقق من لقطة شاشة للصفحة الكاملة
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* بعض الخيارات */
            })
        ).toEqual(0)

        // تحقق من لقطة شاشة للصفحة الكاملة مع جميع عمليات التنقل بمفتاح Tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* بعض الخيارات، استخدم نفس الخيارات المستخدمة في checkFullPageScreen */
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
        // تحقق من أن الشاشة تطابق الصورة المرجعية تمامًا
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // تحقق من أن نسبة عدم التطابق مع الصورة المرجعية هي 5%
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // تحقق مع خيارات لأمر `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* بعض الخيارات */
        })

        // تحقق من أن العنصر يطابق الصورة المرجعية تمامًا
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // تحقق من أن نسبة عدم تطابق العنصر مع الصورة المرجعية هي 5%
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // تحقق من عنصر مع خيارات لأمر `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* بعض الخيارات */
        })

        // تحقق من تطابق لقطة شاشة الصفحة الكاملة مع الصورة المرجعية
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // تحقق من أن نسبة عدم تطابق لقطة شاشة الصفحة الكاملة مع الصورة المرجعية هي 5%
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // تحقق من لقطة شاشة الصفحة الكاملة مع خيارات لأمر `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* بعض الخيارات */
        })

        // تحقق من لقطة شاشة الصفحة الكاملة مع جميع عمليات التنقل بمفتاح Tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // تحقق من أن نسبة عدم تطابق لقطة شاشة الصفحة الكاملة مع الصورة المرجعية هي 5%
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // تحقق من لقطة شاشة الصفحة الكاملة مع خيارات لأمر `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* بعض الخيارات */
        })
    })

    it('should save some screenshots', async () => {
        // احفظ شاشة
        await browser.saveScreen('examplePage', {
            /* بعض الخيارات */
        })

        // احفظ عنصرًا
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* بعض الخيارات */
            }
        )

        // احفظ لقطة شاشة للصفحة الكاملة
        await browser.saveFullPageScreen('fullPage', {
            /* بعض الخيارات */
        })

        // احفظ لقطة شاشة للصفحة الكاملة مع جميع عمليات التنقل بمفتاح Tab
        await browser.saveTabbablePage('save-tabbable', {
            /* بعض الخيارات، استخدم نفس الخيارات المستخدمة في saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // تحقق من شاشة
        await expect(
            await browser.checkScreen('examplePage', {
                /* بعض الخيارات */
            })
        ).toEqual(0)

        // تحقق من عنصر
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* بعض الخيارات */
                }
            )
        ).toEqual(0)

        // تحقق من لقطة شاشة للصفحة الكاملة
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* بعض الخيارات */
            })
        ).toEqual(0)

        // تحقق من لقطة شاشة للصفحة الكاملة مع جميع عمليات التنقل بمفتاح Tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* بعض الخيارات، استخدم نفس الخيارات المستخدمة في checkFullPageScreen */
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
    // احفظ شاشة
    await browser.saveScreen('examplePage', {
        /* بعض الخيارات */
    })

    // احفظ عنصرًا
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* بعض الخيارات */
    })

    // احفظ لقطة شاشة للصفحة الكاملة
    await browser.saveFullPageScreen('fullPage', {
        /* بعض الخيارات */
    })

    // احفظ لقطة شاشة للصفحة الكاملة مع جميع عمليات التنقل بمفتاح Tab
    await browser.saveTabbablePage('save-tabbable', {
        /* بعض الخيارات، استخدم نفس الخيارات المستخدمة في saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // تحقق من أن الشاشة تطابق الصورة المرجعية تمامًا
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // تحقق من أن نسبة عدم التطابق مع الصورة المرجعية هي 5%
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // تحقق مع خيارات لأمر `saveScreen`
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* بعض الخيارات */
    })

    // تحقق من أن العنصر يطابق الصورة المرجعية تمامًا
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // تحقق من أن نسبة عدم تطابق العنصر مع الصورة المرجعية هي 5%
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // تحقق من عنصر مع خيارات لأمر `saveElement`
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* بعض الخيارات */
    })

    // تحقق من تطابق لقطة شاشة الصفحة الكاملة مع الصورة المرجعية
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // تحقق من أن نسبة عدم تطابق لقطة شاشة الصفحة الكاملة مع الصورة المرجعية هي 5%
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // تحقق من لقطة شاشة الصفحة الكاملة مع خيارات لأمر `checkFullPageScreen`
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* بعض الخيارات */
    })

    // تحقق من لقطة شاشة الصفحة الكاملة مع جميع عمليات التنقل بمفتاح Tab
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // تحقق من أن نسبة عدم تطابق لقطة شاشة الصفحة الكاملة مع الصورة المرجعية هي 5%
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // تحقق من لقطة شاشة الصفحة الكاملة مع خيارات لأمر `checkTabbablePage`
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* بعض الخيارات */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // تحقق من شاشة
    await expect(
        await browser.checkScreen('examplePage', {
            /* بعض الخيارات */
        })
    ).toEqual(0)

    // تحقق من عنصر
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* بعض الخيارات */
            }
        )
    ).toEqual(0)

    // تحقق من لقطة شاشة للصفحة الكاملة
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* بعض الخيارات */
        })
    ).toEqual(0)

    // تحقق من لقطة شاشة للصفحة الكاملة مع جميع عمليات التنقل بمفتاح Tab
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* بعض الخيارات، استخدم نفس الخيارات المستخدمة في checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note مهم

توفر هذه الخدمة طرق `save` و`check`. إذا كنت تشغّل اختباراتك لأول مرة، **فلا يجب** أن تجمع بين طرق `save` و`compare`، إذ ستُنشئ طرق `check` صورة مرجعية لك تلقائيًا

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


عندما تكون قد [عطّلت الحفظ التلقائي للصور المرجعية](service-options#autosavebaseline)، سيتم رفض الـ Promise مع التحذير التالي.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

هذا يعني أن لقطة الشاشة الحالية محفوظة في مجلد actual، وأنك **تحتاج إلى نسخها يدويًا إلى مجلد الصور المرجعية**. إذا قمت بتهيئة `@wdio/visual-service` باستخدام [`autoSaveBaseline: true`](./service-options#autosavebaseline)، فسيتم حفظ الصورة تلقائيًا في مجلد الصور المرجعية.

:::