---
id: assertion
title: التأكيدات
description: "اكتب تأكيدات على حالة المتصفح والعناصر باستخدام مكتبة expect-webdriverio المدمجة، واستخدم التأكيدات المرنة، وانتقل من Chai."
---

يأتي [مُشغّل اختبارات WDIO](https://webdriver.io/docs/clioptions) مع مكتبة تأكيدات مدمجة تتيح لك إجراء تأكيدات قوية على جوانب مختلفة من المتصفح أو العناصر داخل تطبيق (الويب) الخاص بك. وهي توسّع وظائف [مطابقات Jest](https://jestjs.io/docs/en/using-matchers) بمطابقات إضافية مُحسّنة لاختبارات e2e، على سبيل المثال:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

أو

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

للاطلاع على القائمة الكاملة، راجع [توثيق واجهة expect البرمجية](/docs/api/expect-webdriverio).

:::info Jasmine

مع إطار عمل Jasmine، يجمع `expect` بين مطابقات Jasmine ومطابقات WebdriverIO. لا تحتاج مطابقات Jasmine المتزامنة إلى `await`، كما أن أجزاء Jest من `expect`، مثل `expect.soft()`، غير متاحة. راجع [استخدام Jasmine](/docs/frameworks#assertions).

:::

## التأكيدات المرنة

يتضمن WebdriverIO التأكيدات المرنة افتراضيًا من `expect-webdriverio` (منذ الإصدار 5.2.0). تتيح التأكيدات المرنة لاختباراتك مواصلة التنفيذ حتى عند فشل أحد التأكيدات. يتم جمع جميع حالات الفشل والإبلاغ عنها في نهاية الاختبار.

### الاستخدام

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## الانتقال من Chai

يمكن لـ [Chai](https://www.chaijs.com/) و[expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) أن يتعايشا معًا، ومع بعض التعديلات البسيطة يمكن تحقيق انتقال سلس إلى expect-webdriverio. إذا قمت بالترقية إلى WebdriverIO v6، فسيكون لديك افتراضيًا إمكانية الوصول إلى جميع التأكيدات من `expect-webdriverio` مباشرةً. هذا يعني أنه أينما استخدمت `expect` على المستوى العام، فإنك ستستدعي تأكيدًا من `expect-webdriverio`. وذلك ما لم تقم بتعيين [`injectGlobals`](/docs/configuration#injectglobals) إلى `false` أو قمت صراحةً بتجاوز `expect` العام لاستخدام Chai. في هذه الحالة، لن تتمكن من الوصول إلى أي من تأكيدات expect-webdriverio دون استيراد حزمة expect-webdriverio صراحةً حيث تحتاجها.

سيعرض هذا الدليل أمثلة على كيفية الانتقال من Chai إذا تم تجاوزه محليًا، وكيفية الانتقال من Chai إذا تم تجاوزه عالميًا.

### محليًا

لنفترض أنه تم استيراد Chai صراحةً في ملف، على سبيل المثال:

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

لنقل هذه الشيفرة، أزِل استيراد Chai واستخدم بدلًا من ذلك تابع التأكيد الجديد من expect-webdriverio وهو `toHaveUrl`:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

إذا أردت استخدام كل من Chai وexpect-webdriverio في الملف نفسه، فستحتفظ باستيراد Chai وسيكون `expect` افتراضيًا هو تأكيد expect-webdriverio، على سبيل المثال:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### عالميًا

لنفترض أنه تم تجاوز `expect` عالميًا لاستخدام Chai. لكي نستخدم تأكيدات expect-webdriverio، نحتاج إلى تعيين متغير عام في خطاف "before"، على سبيل المثال:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

الآن يمكن استخدام Chai وexpect-webdriverio جنبًا إلى جنب. في شيفرتك، ستستخدم تأكيدات Chai وexpect-webdriverio على النحو التالي، على سبيل المثال:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

للانتقال، ستقوم تدريجيًا بنقل كل تأكيد من Chai إلى expect-webdriverio. بمجرد استبدال جميع تأكيدات Chai في كامل قاعدة الشيفرة، يمكن حذف خطاف "before". بعد ذلك، ستُكمل عملية بحث واستبدال شاملة لجميع مثيلات `wdioExpect` إلى `expect` عملية الانتقال.