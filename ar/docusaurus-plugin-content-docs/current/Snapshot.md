---
id: snapshot
title: اللقطات
description: "تحقق من الكائنات وهياكل DOM ونتائج الأوامر باستخدام اختبارات اللقطات واللقطات المضمنة، وقارن اللقطات المرئية."
---

يمكن أن تكون اختبارات اللقطات مفيدة جدًا للتحقق من مجموعة واسعة من جوانب المكون أو المنطق الخاص بك في نفس الوقت. في WebdriverIO يمكنك التقاط لقطات لأي كائن عشوائي بالإضافة إلى هيكل DOM لعنصر WebElement أو نتائج أوامر WebdriverIO.

على غرار أطر الاختبار الأخرى، سيلتقط WebdriverIO لقطة للقيمة المعطاة، ثم يقارنها بملف لقطة مرجعي مخزن بجانب الاختبار. سيفشل الاختبار إذا لم تتطابق اللقطتان: إما أن التغيير غير متوقع، أو أن اللقطة المرجعية تحتاج إلى التحديث إلى الإصدار الجديد من النتيجة.

:::info الدعم عبر المنصات

تتوفر إمكانيات اللقطات هذه لتشغيل اختبارات من طرف إلى طرف داخل بيئة Node.js وكذلك لتشغيل اختبارات [الوحدات والمكونات](/docs/component-testing) في المتصفح أو على الأجهزة المحمولة.

:::

## استخدام اللقطات
لالتقاط لقطة لقيمة ما، يمكنك استخدام `toMatchSnapshot()` من واجهة برمجة التطبيقات [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

في المرة الأولى التي يتم فيها تشغيل هذا الاختبار، ينشئ WebdriverIO ملف لقطة يبدو كالتالي:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

يجب إيداع ملف اللقطة مع تغييرات الكود، ومراجعته كجزء من عملية مراجعة الكود الخاصة بك. في عمليات تشغيل الاختبار اللاحقة، سيقارن WebdriverIO المخرجات المعروضة مع اللقطة السابقة. إذا تطابقت، سينجح الاختبار. وإذا لم تتطابق، فإما أن مشغل الاختبار وجد خطأً في الكود الخاص بك يجب إصلاحه، أو أن التنفيذ قد تغير وتحتاج اللقطة إلى التحديث.

لتحديث اللقطة، مرر العلامة `-s` (أو `--updateSnapshot`) إلى أمر `wdio`، على سبيل المثال:

```sh
npx wdio run wdio.conf.js -s
```

__ملاحظة:__ إذا قمت بتشغيل الاختبارات باستخدام متصفحات متعددة بالتوازي، فسيتم إنشاء لقطة واحدة فقط والمقارنة بها. إذا كنت ترغب في الحصول على لقطة منفصلة لكل قدرة (capability)، يرجى [فتح مشكلة](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) وإخبارنا بحالة الاستخدام الخاصة بك.

## اللقطات المضمنة

وبالمثل، يمكنك استخدام `toMatchInlineSnapshot()` لتخزين اللقطة مضمنةً داخل ملف الاختبار.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

بدلاً من إنشاء ملف لقطة، سيعدّل Vitest ملف الاختبار مباشرةً لتحديث اللقطة كسلسلة نصية:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

يتيح لك هذا رؤية المخرجات المتوقعة مباشرةً دون التنقل بين ملفات مختلفة.

## اللقطات المرئية

قد لا يكون التقاط لقطة DOM لعنصر ما أفضل فكرة، خاصةً إذا كان هيكل DOM كبيرًا جدًا ويحتوي على خصائص عناصر ديناميكية. في هذه الحالات، يوصى بالاعتماد على اللقطات المرئية للعناصر.

لتمكين اللقطات المرئية، أضف `@wdio/visual-service` إلى إعداداتك. يمكنك اتباع تعليمات الإعداد في [التوثيق](/docs/visual-testing#installation) الخاص بالاختبار المرئي.

يمكنك بعد ذلك التقاط لقطة مرئية عبر `toMatchElementSnapshot()`، على سبيل المثال:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

يتم بعد ذلك تخزين صورة في دليل خط الأساس (baseline). راجع [الاختبار المرئي](/docs/visual-testing) لمزيد من المعلومات.