---
id: newWindow
title: نافذة جديدة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

فتح نافذة أو علامة تبويب جديدة في المتصفح (يفتح نافذة جديدة افتراضيًا إذا لم يتم تحديد نوع آخر).
هذا الأمر هو المعادل لوظيفة `window.open()`. هذا الأمر لا يعمل في بيئات الجوال.

__ملاحظة:__ عند استدعاء هذا الأمر، سيتم الانتقال تلقائيًا إلى النافذة أو علامة التبويب الجديدة.

##### الاستخدام

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>عنوان URL للموقع المراد فتحه</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`NewWindowOptions`</td>
      <td>خيارات أمر نافذة جديدة</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>نوع النافذة الجديدة: 'tab' أو 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>اسم النافذة الجديدة</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>ميزات النافذة المفتوحة (مثل الحجم، الموضع، أشرطة التمرير، إلخ)</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js title="newWindowSync.js"
it('should open a new window', async () => {
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // outputs: "Google"

    const result = await browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
    })
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    console.log(result.type) // outputs: "window"
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.closeWindow()
    await browser.switchToWindow(handles[0])
    console.log(await browser.getTitle()) // outputs: "Google"
});

```

```js title="newTabSync.js"
  it('should open a new tab', async () => {
      await browser.url('https://google.com')
      console.log(await browser.getTitle()) // outputs: "Google"

      await browser.newWindow('https://webdriver.io', {
          type:'tab',
          windowName: 'WebdriverIO window',
          windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
      })
      console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
      console.log(result.type) // outputs: "tab"
      const handles = await browser.getWindowHandles()
      await browser.switchToWindow(handles[1])
      await browser.closeWindow()
      await browser.switchToWindow(handles[0])
      console.log(await browser.getTitle()) // outputs: "Google"
 });
```

##### القيم المرجعة

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           كائن يحتوي على معرّف النافذة ونوع النافذة الجديدة `{handle: string, type: string}` handle - معرّف النافذة للعلامة التبويب أو النافذة الجديدة، type - نوع النافذة الجديدة، إما 'tab' أو 'window'
            
##### الاستثناءات

- **Error**: إذا كان `url` غير صالح، أو إذا تم استخدام الأمر على الجوال، أو كان `type` ليس 'tab' أو 'window'.
```