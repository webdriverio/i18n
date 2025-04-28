---
id: snapshot
title: لقطة
---

يمكن أن تكون اختبارات اللقطات مفيدة جدًا لتأكيد مجموعة واسعة من جوانب المكون أو المنطق في نفس الوقت. في WebdriverIO يمكنك أخذ لقطات لأي كائن عشوائي وكذلك لبنية DOM لعنصر الويب أو نتائج أوامر WebdriverIO.

على غرار أطر الاختبار الأخرى، سيأخذ WebdriverIO لقطة للقيمة المعطاة، ثم يقارنها بملف لقطة مرجعية مخزنة إلى جانب الاختبار. سيفشل الاختبار إذا لم تتطابق اللقطتان: إما أن التغيير غير متوقع، أو يحتاج ملف اللقطة المرجعية إلى التحديث إلى الإصدار الجديد من النتيجة.

:::info دعم عبر المنصات

هذه القدرات للقطات متاحة لتشغيل اختبارات end-to-end في بيئة Node.js وكذلك لتشغيل [اختبارات الوحدة والمكونات](/docs/component-testing) في المتصفح أو على الأجهزة المحمولة.

:::

## استخدام اللقطات
لأخذ لقطة لقيمة، يمكنك استخدام `toMatchSnapshot()` من واجهة برمجة التطبيقات [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

في المرة الأولى التي يتم فيها تشغيل هذا الاختبار، ينشئ WebdriverIO ملف لقطة يبدو كما يلي:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

يجب الالتزام بالتزامات اللقطة جنبًا إلى جنب مع تغييرات الكود، ومراجعتها كجزء من عملية مراجعة الكود الخاصة بك. في عمليات تشغيل الاختبار اللاحقة، سيقارن WebdriverIO الناتج المعروض باللقطة السابقة. إذا تطابقوا، سينجح الاختبار. إذا لم يتطابقوا، إما أن مشغل الاختبار وجد خطأ في الكود الخاص بك يجب إصلاحه، أو تغير التنفيذ وتحتاج اللقطة إلى تحديث.

لتحديث اللقطة، قم بتمرير علامة `-s` (أو `--updateSnapshot`) إلى أمر `wdio`، على سبيل المثال:

```sh
npx wdio run wdio.conf.js -s
```

__ملاحظة:__ إذا قمت بتشغيل اختبارات مع متصفحات متعددة بالتوازي، فسيتم إنشاء لقطة واحدة فقط والمقارنة معها. إذا كنت ترغب في الحصول على لقطة منفصلة لكل قدرة، فيرجى [إثارة مشكلة](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) وإخبارنا عن حالة الاستخدام الخاصة بك.

## اللقطات المضمنة

وبالمثل، يمكنك استخدام `toMatchInlineSnapshot()` لتخزين اللقطة مضمنة داخل ملف الاختبار.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

بدلاً من إنشاء ملف لقطة، سيقوم Vitest بتعديل ملف الاختبار مباشرة لتحديث اللقطة كسلسلة نصية:

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

هذا يتيح لك رؤية المخرجات المتوقعة مباشرة دون الانتقال بين ملفات مختلفة.

## اللقطات المرئية

قد لا يكون أخذ لقطة DOM لعنصر هو الفكرة الأفضل، خاصة إذا كان هيكل DOM كبيرًا جدًا ويحتوي على خصائص عنصر ديناميكية. في هذه الحالات، يوصى بالاعتماد على اللقطات المرئية للعناصر.

لتمكين اللقطات المرئية، أضف `@wdio/visual-service` إلى الإعداد الخاص بك. يمكنك اتباع تعليمات الإعداد في [الوثائق](/docs/visual-testing#installation) للاختبار المرئي.

يمكنك بعد ذلك أخذ لقطة مرئية عبر `toMatchElementSnapshot()`، على سبيل المثال:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

يتم بعد ذلك تخزين صورة في دليل الخط الأساسي. تحقق من [الاختبار المرئي](/docs/visual-testing) لمزيد من المعلومات.