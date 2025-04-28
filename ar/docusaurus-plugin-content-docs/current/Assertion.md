---
id: assertion
title: التأكيد
---

يأتي [متشغل اختبار WDIO](https://webdriver.io/docs/clioptions) مع مكتبة تأكيد مدمجة تسمح لك بإجراء تأكيدات قوية على جوانب مختلفة من المتصفح أو العناصر داخل تطبيقك (على الويب). وهي تمدد وظائف [Jests Matchers](https://jestjs.io/docs/en/using-matchers) بوظائف إضافية محسنة لاختبار e2e، على سبيل المثال:

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

للقائمة الكاملة، انظر [وثائق API expect](/docs/api/expect-webdriverio).

## الانتقال من Chai

يمكن أن يتعايش [Chai](https://www.chaijs.com/) و[expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme)، ومع بعض التعديلات البسيطة يمكن تحقيق انتقال سلس إلى expect-webdriverio. إذا كنت قد قمت بالترقية إلى WebdriverIO v6، فستتمكن افتراضيًا من الوصول إلى جميع التأكيدات من `expect-webdriverio` مباشرة. هذا يعني أنه في أي مكان تستخدم فيه `expect` فإنك ستستدعي تأكيد `expect-webdriverio`. وهذا ما لم تقم بتعيين [`injectGlobals`](/docs/configuration#injectglobals) إلى `false` أو قمت بتجاوز الدالة العامة `expect` لاستخدام Chai. في هذه الحالة، لن تتمكن من الوصول إلى أي من تأكيدات expect-webdriverio دون استيراد حزمة expect-webdriverio صراحة حيث تحتاجها.

سيعرض هذا الدليل أمثلة على كيفية الانتقال من Chai إذا تم تجاوزه محليًا وكيفية الانتقال من Chai إذا تم تجاوزه عالميًا.

### محلي

افترض أنه تم استيراد Chai بشكل صريح في ملف، على سبيل المثال:

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

للانتقال بهذا الكود، قم بإزالة استيراد Chai واستخدم طريقة تأكيد expect-webdriverio الجديدة `toHaveUrl` بدلاً من ذلك:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

إذا كنت ترغب في استخدام كل من Chai وexpect-webdriverio في نفس الملف، فستحتفظ باستيراد Chai وستكون `expect` افتراضية لتأكيد expect-webdriverio، على سبيل المثال:

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

الآن يمكن استخدام Chai وexpect-webdriverio جنبًا إلى جنب. في الكود الخاص بك، ستستخدم تأكيدات Chai وexpect-webdriverio على النحو التالي، على سبيل المثال:

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

للانتقال، ستقوم تدريجيًا بنقل كل تأكيد Chai إلى expect-webdriverio. بمجرد استبدال جميع تأكيدات Chai في جميع أنحاء قاعدة الكود، يمكن حذف خطاف "before". سيؤدي البحث والاستبدال العالمي لاستبدال جميع حالات `wdioExpect` بـ `expect` بعد ذلك إلى إنهاء عملية الانتقال.