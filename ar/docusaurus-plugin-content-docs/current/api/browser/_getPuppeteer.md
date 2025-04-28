---
id: getPuppeteer
title: احصل على Puppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

احصل على [واجهة متصفح Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
لتشغيل الأوامر باستخدام Puppeteer. لاحظ أن جميع أوامر Puppeteer هي 
غير متزامنة افتراضيًا، لذلك من أجل التبديل بين التنفيذ المتزامن وغير المتزامن
تأكد من تغليف استدعاءات Puppeteer داخل أمر `browser.call`
كما هو موضح في المثال.

:::info

لاحظ أن استخدام Puppeteer يتطلب دعمًا لبروتوكول Chrome DevTools ولا يمكن
استخدامه على سبيل المثال عند تشغيل الاختبارات الآلية في السحابة. بروتوكول Chrome DevTools لا يتم تثبيته افتراضيًا،
استخدم `npm install puppeteer-core` لتثبيته.
اكتشف المزيد في قسم [بروتوكولات الأتمتة](/docs/automationProtocols).

:::

:::info

ملاحظة: Puppeteer حاليًا __غير__ مدعوم عند تشغيل [اختبارات المكونات](/docs/component-testing).

:::

##### الاستخدام

```js
browser.getPuppeteer()
```

##### مثال

```js title="getPuppeteer.test.js"
it('should allow me to use Puppeteer', async () => {
    // WebDriver command
    await browser.url('https://webdriver.io')

    const puppeteerBrowser = await browser.getPuppeteer()
    // switch to Puppeteer
    const metrics = await browser.call(async () => {
        const pages = await puppeteerBrowser.pages()
        pages[0].setGeolocation({ latitude: 59.95, longitude: 30.31667 })
        return pages[0].metrics()
    })

    console.log(metrics.LayoutCount) // returns LayoutCount value
})
```

##### الإرجاع

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   نسخة puppeteer مبدأة متصلة بالمتصفح