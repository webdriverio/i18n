---
id: reloadSession
title: إعادة تحميل الجلسة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

ينشئ جلسة سيلينيوم جديدة بقدراتك الحالية. هذا مفيد إذا كنت
تختبر تطبيقًا شديد الحالة حيث تحتاج إلى تنظيف جلسة المتصفح بين
الاختبارات في ملف المواصفات الخاص بك لتجنب إنشاء مئات من ملفات الاختبار الفردية مع WDIO.
ولكن كن حذرًا، هذا الأمر يؤثر على وقت الاختبار بشكل كبير لأن إنشاء
جلسات سيلينيوم جديدة يستغرق وقتًا طويلاً خاصة عند استخدام خدمات السحابة.

يمكن إضافة معلمات الاتصال مثل اسم المضيف والمنفذ والبروتوكول وما إلى ذلك بجانب
browserName عندما تريد الاتصال بخدمة بعيدة مختلفة. هذا مفيد
في وضع، على سبيل المثال، حيث تبدأ اختبارًا في تطبيق محلي وتحتاج إلى التحقق
من البيانات في تطبيق الويب.

إذا بدأت من الخدمة البعيدة، يمكنك تمرير 0.0.0.0 كاسم المضيف إذا كنت تريد
التبديل إلى برامج التشغيل المحلية.

##### الاستخدام

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>القدرات الجديدة لإنشاء جلسة بها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```