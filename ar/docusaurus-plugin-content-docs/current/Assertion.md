---
id: assertion
title: التأكيد
---

يأتي [WDIO testrunner](https://webdriver.io/docs/clioptions) مع مكتبة تأكيد مدمجة تسمح لك بإجراء تأكيدات قوية على جوانب مختلفة من المتصفح أو العناصر داخل تطبيقك (الويب). إنها تمتد وظائف [Jests Matchers](https://jestjs.io/docs/en/using-matchers) مع وظائف إضافية، محسنة لاختبار e2e، على سبيل المثال:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

أو

```js
const selectOptions = await $$('form select>option')

// تأكد من وجود خيار واحد على الأقل في القائمة المنسدلة
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

للحصول على القائمة الكاملة، راجع [وثائق API expect](/docs/api/expect-webdriverio).

## التأكيدات المرنة

يتضمن WebdriverIO التأكيدات المرنة بشكل افتراضي من expect-webdriver(5.2.0). تسمح التأكيدات المرنة لاختباراتك بمواصلة التنفيذ حتى عندما يفشل تأكيد. يتم جمع كل الإخفاقات والإبلاغ عنها في نهاية الاختبار.

### الاستخدام

```js
// هذه لن ترمي استثناءات فورًا إذا فشلت
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// التأكيدات العادية لا تزال ترمي استثناءات فورًا
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## الانتقال من Chai

يمكن أن يتعايش [Chai](https://www.chaijs.com/) و [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) معًا، ومع بعض التعديلات الطفيفة يمكن تحقيق انتقال سلس إلى expect-webdriverio. إذا قمت بالترقية إلى WebdriverIO v6 فبشكل افتراضي سيكون لديك وصول إلى جميع التأكيدات من `expect-webdriverio` بشكل جاهز. هذا يعني أنه عالميًا أينما تستخدم `expect` ستستدعي تأكيد `expect-webdriverio`. هذا، ما لم تقم بتعيين [`injectGlobals`](/docs/configuration#injectglobals) إلى `false` أو قمت صراحةً بتجاوز `expect` العالمي لاستخدام Chai. في هذه الحالة لن يكون لديك وصول إلى أي من تأكيدات expect-webdriverio دون استيراد حزمة expect-webdriverio صراحةً حيث تحتاجها.

سيوضح هذا الدليل أمثلة على كيفية الانتقال من Chai إذا تم تجاوزه محليًا وكيفية الانتقال من Chai إذا تم تجاوزه عالميًا.

### محلي

افترض أنه تم استيراد Chai بشكل صريح في ملف، على سبيل المثال:

```js
// myfile.js - الكود الأصلي
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

للانتقال بهذا الكود، قم بإزالة استيراد Chai واستخدم طريقة التأكيد الجديدة expect-webdriverio `toHaveUrl` بدلاً من ذلك:

```js
// myfile.js - الكود بعد الانتقال
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // طريقة API الجديدة من expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

إذا كنت ترغب في استخدام كل من Chai و expect-webdriverio في نفس الملف، فستحتفظ باستيراد Chai وسيكون `expect` افتراضيًا لتأكيد expect-webdriverio، على سبيل المثال:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // تأكيد Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // تأكيد expect-webdriverio
    })
})
```

### عالمي

افترض أنه تم تجاوز `expect` عالميًا لاستخدام Chai. من أجل استخدام تأكيدات expect-webdriverio، نحتاج إلى تعيين متغير عالمي في الخطاف "before"، على سبيل المثال:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

الآن يمكن استخدام Chai و expect-webdriverio جنبًا إلى جنب. في كودك، ستستخدم تأكيدات Chai و expect-webdriverio على النحو التالي، على سبيل المثال:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // تأكيد Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // تأكيد expect-webdriverio
    });
});
```

للانتقال، ستنقل ببطء كل تأكيد Chai إلى expect-webdriverio. بمجرد استبدال جميع تأكيدات Chai في جميع أنحاء قاعدة الكود، يمكن حذف خطاف "before". سيؤدي البحث العالمي والاستبدال لاستبدال جميع حالات `wdioExpect` بـ `expect` بعد ذلك إلى إنهاء عملية الانتقال.