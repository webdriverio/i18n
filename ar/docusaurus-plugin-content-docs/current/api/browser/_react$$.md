---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$$.ts
---

يعتبر الأمر `react$$` أمرًا مفيدًا للاستعلام عن مكونات React المتعددة باستخدام اسمها الفعلي وتصفيتها حسب الخصائص والحالة.

:::info

يعمل هذا الأمر فقط مع التطبيقات التي تستخدم React v16.x. اقرأ المزيد حول محددات React في دليل [المحددات](/docs/selectors#react-selectors).

:::

##### الاستخدام

```js
browser.react$$(selector, { props, state })
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
      <td>خصائص React التي يجب أن يحتويها العنصر</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>حالة React التي يجب أن يكون عليها العنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');

    const orangeButtons = await browser.react$$('t', {
        props: { orange: true }
    })
    console.log(await orangeButtons.map((btn) => btn.getText()));
    // prints "[ '÷', 'x', '-', '+', '=' ]"
});
```

##### العائد

- **&lt;WebdriverIO.ElementArray&gt;**