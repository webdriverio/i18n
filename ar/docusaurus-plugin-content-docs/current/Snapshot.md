---
id: snapshot
title: لقطة
---

يمكن أن تكون اختبارات اللقطات مفيدة جدًا للتأكد من مجموعة واسعة من جوانب المكون أو المنطق الخاص بك في نفس الوقت. في WebdriverIO يمكنك أخذ لقطات لأي كائن عشوائي وكذلك بنية DOM لعنصر الويب أو نتائج أوامر WebdriverIO.

على غرار أطر الاختبار الأخرى، سيقوم WebdriverIO بأخذ لقطة للقيمة المعطاة، ثم مقارنتها بملف لقطة مرجعية مخزن جنبًا إلى جنب مع الاختبار. سيفشل الاختبار إذا لم تتطابق اللقطتان: إما أن التغيير غير متوقع، أو أن لقطة المرجع تحتاج إلى تحديث إلى الإصدار الجديد من النتيجة.

:::info دعم متعدد المنصات

تتوفر قدرات اللقطات هذه لتشغيل اختبارات من طرف إلى طرف ضمن بيئة Node.js وكذلك لتشغيل [اختبارات الوحدة والمكونات](/docs/component-testing) في المتصفح أو على الأجهزة المحمولة.

:::

## استخدام اللقطات
لأخذ لقطة للقيمة، يمكنك استخدام `toMatchSnapshot()` من واجهة برمجة التطبيقات [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

في المرة الأولى التي يتم فيها تشغيل هذا الاختبار، يقوم WebdriverIO بإنشاء ملف لقطة يبدو كما يلي:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

يجب الالتزام بعناصر اللقطة إلى جانب تغييرات الكود، ومراجعتها كجزء من عملية مراجعة الكود الخاصة بك. في عمليات الاختبار اللاحقة، سيقارن WebdriverIO الناتج المقدم باللقطة السابقة. إذا تطابقوا، سيتم اجتياز الاختبار. إذا لم يتطابقوا، فإما أن مشغل الاختبار وجد خطأ في التعليمات البرمجية الخاصة بك يجب إصلاحه، أو أن التنفيذ قد تغير وتحتاج اللقطة إلى التحديث.

لتحديث اللقطة، قم بتمرير علامة `-s` (أو `--updateSnapshot`) إلى أمر `wdio`، على سبيل المثال:

```sh
npx wdio run wdio.conf.js -s
```

__ملاحظة:__ إذا قمت بتشغيل اختبارات باستخدام متصفحات متعددة بالتوازي، فسيتم إنشاء لقطة واحدة فقط ومقارنتها. إذا كنت ترغب في الحصول على لقطة منفصلة لكل قدرة، يرجى [رفع مشكلة](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) وإخبارنا عن حالة الاستخدام الخاصة بك.

## اللقطات المضمنة

وبالمثل، يمكنك استخدام `toMatchInlineSnapshot()` لتخزين اللقطة المضمنة داخل ملف الاختبار.

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

يتيح لك ذلك رؤية الناتج المتوقع مباشرة دون الانتقال بين ملفات مختلفة.

## اللقطات المرئية

قد لا يكون أخذ لقطة DOM لعنصر ما هو الفكرة الأفضل، خاصة إذا كانت بنية DOM كبيرة جدًا وتحتوي على خصائص عنصر ديناميكية. في هذه الحالات، يوصى بالاعتماد على اللقطات المرئية للعناصر.

لتمكين اللقطات المرئية، أضف `@wdio/visual-service` إلى الإعداد الخاص بك. يمكنك اتباع تعليمات الإعداد في [الوثائق](/docs/visual-testing#installation) للاختبار المرئي.

يمكنك بعد ذلك أخذ لقطة مرئية عبر `toMatchElementSnapshot()`، على سبيل المثال:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

يتم بعد ذلك تخزين صورة في دليل خط الأساس. راجع [الاختبار المرئي](/docs/visual-testing) لمزيد من المعلومات.