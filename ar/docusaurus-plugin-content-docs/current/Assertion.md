---
id: assertion
title: التحقق
---

يأتي [مشغل اختبار WDIO](https://webdriver.io/docs/clioptions) مع مكتبة تحقق مدمجة تسمح لك بإجراء تحققات قوية على جوانب مختلفة من المتصفح أو العناصر داخل تطبيقك (الويب). وهي تمدد وظائف [Jests Matchers](https://jestjs.io/docs/en/using-matchers) بمطابقات إضافية، محسّنة لاختبار e2e، على سبيل المثال:

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

للحصول على القائمة الكاملة، راجع [توثيق واجهة برمجة التطبيقات expect](/docs/api/expect-webdriverio).

## الترحيل من Chai

يمكن أن تتعايش [Chai](https://www.chaijs.com/) و [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) معًا، ومع بعض التعديلات البسيطة يمكن تحقيق انتقال سلس إلى expect-webdriverio. إذا قمت بالترقية إلى WebdriverIO v6، فسيكون لديك بشكل افتراضي إمكانية الوصول إلى جميع تأكيدات `expect-webdriverio` مباشرة. هذا يعني أنه في أي مكان تستخدم فيه `expect` عالميًا، فإنك ستستدعي تأكيد `expect-webdriverio`. هذا، ما لم تقم بتعيين [`injectGlobals`](/docs/configuration#injectglobals) إلى `false` أو قمت صراحة بتجاوز `expect` العالمي لاستخدام Chai. في هذه الحالة، لن يكون لديك وصول إلى أي من تأكيدات expect-webdriverio دون استيراد حزمة expect-webdriverio صراحة حيث تحتاجها.

سيوضح هذا الدليل أمثلة على كيفية الترحيل من Chai إذا تم تجاوزه محليًا وكيفية الترحيل من Chai إذا تم تجاوزه عالميًا.

### محلي

افترض أن Chai تم استيراده بشكل صريح في ملف، على سبيل المثال:

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

لترحيل هذا الكود، قم بإزالة استيراد Chai واستخدم طريقة تأكيد expect-webdriverio الجديدة `toHaveUrl` بدلاً من ذلك:

```js
// myfile.js - الكود المُرحّل
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // طريقة واجهة برمجة تطبيقات expect-webdriverio الجديدة https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

إذا كنت ترغب في استخدام كل من Chai و expect-webdriverio في نفس الملف، فستحتفظ باستيراد Chai و `expect` سيكون افتراضيًا لتأكيد expect-webdriverio، على سبيل المثال:

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

افترض أن `expect` تم تجاوزه عالميًا لاستخدام Chai. من أجل استخدام تأكيدات expect-webdriverio، نحتاج إلى تعيين متغير عالمي في رابط "قبل"، على سبيل المثال:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

الآن يمكن استخدام Chai و expect-webdriverio جنبًا إلى جنب. في الكود الخاص بك، ستستخدم تأكيدات Chai و expect-webdriverio على النحو التالي، على سبيل المثال:

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

للترحيل، ستقوم تدريجيًا بنقل كل تأكيد Chai إلى expect-webdriverio. بمجرد استبدال جميع تأكيدات Chai في جميع أنحاء قاعدة الكود، يمكن حذف رابط "قبل". سيؤدي البحث والاستبدال العالمي لاستبدال جميع حالات `wdioExpect` بـ `expect` إلى إنهاء عملية الترحيل.