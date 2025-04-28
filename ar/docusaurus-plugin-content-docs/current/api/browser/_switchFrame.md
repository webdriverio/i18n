---
id: switchFrame
title: تبديل الإطار
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

يقوم بتبديل السياق النشط إلى إطار، مثل iframe في الصفحة. هناك عدة طرق يمكنك من خلالها الاستعلام عن إطار
في الصفحة:

  - إذا تم إعطاء سلسلة نصية، فإنه ينتقل إلى الإطار الذي له معرف سياق مطابق، أو عنوان URL، أو عنوان URL يحتوي على تلك السلسلة
    ```ts
    // الانتقال إلى إطار له عنوان URL محدد أو يحتوي على سلسلة في عنوان URL
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // ملاحظة: يقع هذا الإطار في iframe متداخل، ومع ذلك تحتاج فقط إلى توفير
    // عنوان URL للإطار المرغوب
    await browser.switchFrame('https://www.w3schools.com')
    // تحقق من عنوان الصفحة
    console.log(await browser.execute(() => [document.title, document.URL]))
    // المخرجات: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - إذا كان لديك معرف سياق للإطار، يمكنك استخدامه مباشرة
    ```ts
    // الانتقال إلى إطار له معرف سياق معين
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - إذا تم إعطاء عنصر WebdriverIO يشير إلى عنصر `iframe`، فسيتم التبديل إلى ذلك الإطار
    ```ts
    // الانتقال إلى عنصر إطار تم الاستعلام عنه من السياق الحالي
    await browser.switchFrame($('iframe'))
    ```

  - إذا تم إعطاء دالة، فسيتم التكرار عبر جميع عناصر iframe في الصفحة واستدعاء الدالة داخل كائن السياق.
    يجب أن تعيد الدالة قيمة منطقية تشير إلى ما إذا كان يجب تحديد الإطار. سيتم تنفيذ الدالة
    داخل المتصفح وتسمح بالوصول إلى جميع واجهات برمجة تطبيقات الويب، على سبيل المثال:
    ```ts
    // الانتقال إلى أول إطار يحتوي على عنصر بمعرف "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // الانتقال إلى أول إطار يحتوي على "webdriver" في عنوان URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - إذا تم إعطاء `null`، فسيتم التبديل إلى الإطار الرئيسي
    ```ts
    // أولاً قم بالتبديل إلى إطار
    await browser.switchFrame($('iframe'))
    // قم بمزيد من الأتمتة داخل هذا الإطار، ثم...

    // انتقل إلى الإطار الرئيسي
    await browser.switchFrame(null)
    ```

بمجرد التبديل إلى إطار، سيتم تنفيذ جميع الأوامر اللاحقة في سياق ذلك الإطار،
بما في ذلك التنقل إلى صفحات مختلفة.

##### الاستخدام

```js
browser.switchFrame(context)
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
      <td><code><var>context</var></code></td>
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### القيمة المرجعة

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  معرف السياق النشط الحالي