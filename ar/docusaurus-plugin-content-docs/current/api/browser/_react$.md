---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$.ts
---

يعتبر أمر `react$` أمرًا مفيدًا للاستعلام عن مكونات React باستخدام أسمائها الفعلية وتصفيتها بواسطة الخصائص (props) والحالة (state).

:::info

يعمل هذا الأمر فقط مع التطبيقات التي تستخدم React v16.x. اقرأ المزيد عن محددات React في دليل [المحددات](/docs/selectors#react-selectors).

:::

##### الاستخدام

```js
browser.react$(selector, { props, state })
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
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>مكون React</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>خيارات محدد React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Object`</td>
      <td>خصائص React التي يجب أن يحتوي عليها العنصر</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>حالة React التي يجب أن يكون فيها العنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');
    const appWrapper = await $('div#root')

    await browser.react$('t', {
        props: { name: '7' }
    }).click()
    await browser.react$('t', {
        props: { name: 'x' }
    }).click()
    await browser.react$('t', {
        props: { name: '6' }
    }).click()
    await browser.react$('t', {
        props: { name: '=' }
    }).click()

    console.log(await $('.component-display').getText()); // prints "42"
});
```

##### العائد

- **&lt;WebdriverIO.Element&gt;**