---
id: snapshot
title: لقطة
---

يمكن أن تكون اختبارات اللقطات مفيدة جدًا للتحقق من مجموعة واسعة من جوانب المكون أو المنطق الخاص بك في نفس الوقت. في WebdriverIO يمكنك التقاط لقطات لأي كائن عشوائي وكذلك لبنية DOM عنصر الويب أو نتائج أوامر WebdriverIO.

مشابهًا لأطر الاختبار الأخرى، سيقوم WebdriverIO بأخذ لقطة للقيمة المعطاة، ثم مقارنتها بملف لقطة مرجعي مخزن جنبًا إلى جنب مع الاختبار. سيفشل الاختبار إذا لم تتطابق اللقطتان: إما أن التغيير غير متوقع، أو أن اللقطة المرجعية تحتاج إلى تحديث للإصدار الجديد من النتيجة.

:::info دعم عبر المنصات

هذه القدرات الخاصة باللقطات متاحة لتشغيل اختبارات النهاية إلى النهاية ضمن بيئة Node.js وكذلك لتشغيل [اختبارات الوحدة والمكونات](/docs/component-testing) في المتصفح أو على الأجهزة المحمولة.

:::

## استخدام اللقطات
لأخذ لقطة لقيمة ما، يمكنك استخدام `toMatchSnapshot()` من واجهة برمجة تطبيقات [`expect()`](/docs/api/expect-webdriverio):

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

يجب الالتزام بتقديم اللقطة جنبًا إلى جنب مع تغييرات الكود، ومراجعتها كجزء من عملية مراجعة الكود الخاصة بك. في عمليات تشغيل الاختبار اللاحقة، سيقارن WebdriverIO الإخراج المقدم مع اللقطة السابقة. إذا تطابقت، سينجح الاختبار. إذا لم تتطابق، فإما أن منفذ الاختبار وجد خطأ في الكود الخاص بك يجب إصلاحه، أو أن التنفيذ قد تغير وتحتاج اللقطة إلى التحديث.

لتحديث اللقطة، مرر العلم `-s` (أو `--updateSnapshot`) إلى أمر `wdio`، مثال:

```sh
npx wdio run wdio.conf.js -s
```

__ملاحظة:__ إذا قمت بتشغيل اختبارات باستخدام متصفحات متعددة بالتوازي، فسيتم إنشاء لقطة واحدة فقط ومقارنتها. إذا كنت ترغب في الحصول على لقطة منفصلة لكل قدرة، يرجى [فتح مشكلة](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) وإخبارنا عن حالة الاستخدام الخاصة بك.

## اللقطات المضمنة

وبالمثل، يمكنك استخدام `toMatchInlineSnapshot()` لتخزين اللقطة مضمنة داخل ملف الاختبار.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

بدلاً من إنشاء ملف لقطة، سيقوم Vitest بتعديل ملف الاختبار مباشرة لتحديث اللقطة كسلسلة:

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

هذا يتيح لك رؤية الإخراج المتوقع مباشرة دون التنقل بين ملفات مختلفة.

## اللقطات المرئية

قد لا يكون أخذ لقطة DOM لعنصر هو أفضل فكرة، خاصة إذا كانت بنية DOM كبيرة جدًا وتحتوي على خصائص عنصر ديناميكية. في هذه الحالات، يوصى بالاعتماد على اللقطات المرئية للعناصر.

لتمكين اللقطات المرئية، أضف `@wdio/visual-service` إلى الإعداد الخاص بك. يمكنك اتباع تعليمات الإعداد في [الوثائق](/docs/visual-testing#installation) للاختبار المرئي.

يمكنك بعد ذلك أخذ لقطة مرئية عبر `toMatchElementSnapshot()`، على سبيل المثال:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

يتم بعد ذلك تخزين الصورة في دليل الأساس. راجع [الاختبار المرئي](/docs/visual-testing) لمزيد من المعلومات.