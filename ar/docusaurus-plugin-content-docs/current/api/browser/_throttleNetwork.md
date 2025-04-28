---
id: throttleNetwork
title: تقييد سرعة الشبكة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

تقييد قدرات الشبكة للمتصفح. يمكن أن يساعد ذلك في محاكاة سيناريوهات معينة حيث يفقد المستخدم اتصاله بالإنترنت ويحتاج تطبيقك إلى معالجة ذلك.

هناك العديد من الإعدادات المسبقة المتاحة مع تكوينات افتراضية لسهولة الاستخدام. هذه الإعدادات هي `offline`، `GPRS`، `Regular2G`، `Good2G`، `Regular3G`، `Good3G`، `Regular4G`، `DSL`، `WiFi`، `online`.

يمكنك رؤية قيم هذه الإعدادات المسبقة [في الكود المصدري](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

لاحظ أن استخدام أمر `throttleNetwork` يتطلب دعمًا لبروتوكول Chrome DevTools ولا يمكن استخدامه على سبيل المثال عند تشغيل اختبارات آلية في السحابة. لا يتم تثبيت بروتوكول Chrome DevTools افتراضيًا، استخدم `npm install puppeteer-core` لتثبيته.
اعرف المزيد في قسم [بروتوكولات الأتمتة](/docs/automationProtocols).

:::

##### الاستخدام

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>معلمات لتقييد السرعة</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>صحيح لمحاكاة انقطاع الإنترنت.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>الحد الأدنى للتأخير من إرسال الطلب إلى استلام رؤوس الاستجابة (مللي ثانية).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>الحد الأقصى لسرعة التنزيل المجمعة (بايت/ثانية). -1 يعطل تقييد التنزيل.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>الحد الأقصى لسرعة الرفع المجمعة (بايت/ثانية). -1 يعطل تقييد الرفع.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // via static string preset
    await browser.throttleNetwork('Regular3G')

    // via custom values
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```