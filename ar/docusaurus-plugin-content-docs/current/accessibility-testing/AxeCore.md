---
id: axe-core
title: Axe Core
description: "قم بتشغيل فحوصات إمكانية الوصول التلقائية في اختباراتك باستخدام محوّل Axe مفتوح المصدر من Deque، في الوضع المستقل أو وضع مشغّل الاختبارات."
---

يمكنك تضمين اختبارات إمكانية الوصول ضمن مجموعة اختبارات WebdriverIO الخاصة بك باستخدام أدوات إمكانية الوصول مفتوحة المصدر [من Deque المسماة Axe](https://www.deque.com/axe/). الإعداد سهل للغاية، كل ما عليك فعله هو تثبيت محوّل WebdriverIO Axe عبر:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

يمكن استخدام محوّل Axe إما في الوضع [المستقل أو وضع مشغّل الاختبارات](/docs/setuptypes) ببساطة عن طريق استيراده وتهيئته باستخدام [كائن المتصفح](/docs/api/browser)، على سبيل المثال:

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

يمكنك العثور على مزيد من الوثائق حول محوّل Axe الخاص بـ WebdriverIO [على GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).