---
id: addInitScript
title: إضافة نص برمجي لبدء التشغيل
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

يضيف نصاً برمجياً يتم تقييمه في إحدى السيناريوهات التالية:

- عندما يتم التنقل في الصفحة.
- عندما يتم إرفاق إطار فرعي أو التنقل فيه. في هذه الحالة، يتم تقييم النص البرمجي في
  سياق الإطار المرفق حديثاً.

يتم تقييم النص البرمجي بعد إنشاء المستند ولكن قبل تشغيل أي من النصوص البرمجية الخاصة به.
لإزالة نص بدء التشغيل من الصفحة مرة أخرى، قم باستدعاء الدالة التي تم إرجاعها
بواسطة هذه الوظيفة.

هذا مفيد لتعديل بيئة جافا سكريبت، على سبيل المثال لتعيين قيمة Math.random.

##### الاستخدام

```js
browser.addInitScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>دالة يتم حقنها كنص برمجي لبدء التشغيل</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>معلمات للنص البرمجي</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js title="addInitScript.js"
const script = await browser.addInitScript((seed) => {
    Math.random = () => seed
}, 42)

await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns 42

await reset()
await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns a random number

hermore you can also use the `emit` function to send data back to the Node.js environment.
 is useful if you want to observe certain events in the browser environment, e.g.:

```

```js title="addInitScriptWithEmit.js"
const script = await browser.addInitScript((emit) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      emit(mutation.target.nodeName)
    }
  })
  observer.observe(document, { childList: true, subtree: true })
})

script.on('data', (data) => {
  console.log(data) // prints: BODY, DIV, P, ...
})
```