---
id: throttleCPU
title: إبطاء وحدة المعالجة المركزية
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

يقوم بإبطاء وحدة المعالجة المركزية لمحاكاة معالج أبطأ.

:::info

لاحظ أن استخدام أمر `throttleCPU` يتطلب دعم بروتوكول Chrome DevTools ولا يمكن استخدامه مثلاً
عند تشغيل الاختبارات الآلية في السحابة. لا يتم تثبيت بروتوكول Chrome DevTools افتراضيًا،
استخدم `npm install puppeteer-core` لتثبيته.
اكتشف المزيد في قسم [بروتوكولات الأتمتة](/docs/automationProtocols).

:::

##### الاستخدام

```js
browser.throttleCPU(factor)
```

##### المعاملات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>عامل الإبطاء (1 يعني عدم وجود إبطاء، 2 يعني إبطاء بمقدار 2x، وهكذا)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```