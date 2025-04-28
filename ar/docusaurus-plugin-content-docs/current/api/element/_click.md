---
id: click
title: النقر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

النقر على عنصر.

يصدر هذا أمر WebDriver `click` للعنصر المحدد، والذي عادة ما يقوم بالتمرير إلى العنصر المحدد ثم النقر عليه عندما لا يتم تمرير خيارات. عند تمرير كائن الخيارات، يستخدم فئة الإجراءات بدلاً من نقرة webdriver مما يوفر قدرات إضافية مثل تمرير نوع الزر والإحداثيات وما إلى ذلك. بشكل افتراضي، عند استخدام الخيارات يتم إرسال أمر إجراء التحرير بعد تنفيذ إجراء النقر، مرر `option.skipRelease=true` لتخطي هذا الإجراء.

:::info

إذا كان لديك عناصر ذات موضع ثابت (مثل رأس أو تذييل ثابت) تغطي العنصر المحدد بعد تمريره داخل منفذ العرض، فسيتم إصدار النقرة في الإحداثيات المحددة، ولكن سيتلقاها العنصر الثابت (المتداخل). في هذه الحالات يتم إلقاء الخطأ التالي:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

للتغلب على ذلك، حاول العثور على العنصر المتداخل وإزالته عبر أمر `execute` حتى لا يتداخل مع النقرة. يمكنك أيضًا محاولة التمرير إلى العنصر بنفسك باستخدام `scroll` مع إزاحة مناسبة لسيناريو الخاص بك.

:::

:::info

يمكن استخدام أمر النقر أيضًا لمحاكاة الضغط المطول على جهاز محمول. يتم ذلك عن طريق ضبط `duration`. انظر المثال أدناه لمزيد من المعلومات.

:::

##### الاستخدام

```js
$(selector).click({ button, x, y, skipRelease, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`ClickOptions`</td>
      <td>خيارات النقر (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string, number`</td>
      <td>يمكن أن يكون واحدًا من `[0, "left", 1, "middle", 2, "right"]` <br /><strong>للويب فقط</strong> (سطح المكتب/الجوال)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>ينقر على بعد X بكسل أفقيًا من موقع العنصر (من نقطة مركز العنصر)<br /><strong>الويب والتطبيقات الأصلية</strong> (سطح المكتب/الجوال)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>ينقر على بعد Y بكسل عموديًا من موقع العنصر (من نقطة مركز العنصر)<br /><strong>دعم الويب والتطبيقات الأصلية</strong> (سطح المكتب/الجوال)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`boolean`</td>
      <td>قيمة منطقية (اختياري) <br /><strong>للويب فقط</strong> (سطح المكتب/الجوال)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>مدة النقر، أي "الضغط المطول" <br /><strong>للتطبيقات الأصلية المحمولة فقط</strong> (الجوال)</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```html title="example.html"
<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="click.js"
it('should demonstrate the click command', async () => {
    const myButton = await $('#myButton')
    await myButton.click()
    const myText = await $('#someText')
    const text = await myText.getText()
    assert(text === 'I was clicked') // true
})
```

```js title="example.js"
it('should fetch menu links and visit each page', async () => {
    const links = await $$('#menu a')
    await links.forEach(async (link) => {
        await link.click()
    })
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a click using an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ x: 30 }) // clicks 30 horizontal pixels away from location of the button (from center point of element)
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a right click passed as string', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 'right' }) // opens the contextmenu at the location of the button
})
it('should demonstrate a right click passed as number while adding an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40 }) // opens the contextmenu 30 horizontal and 40 vertical pixels away from location of the button (from the center of element)
})
it('should skip sending releaseAction command that cause unexpected alert closure', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40, skipRelease:true }) // skips sending releaseActions
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress', async () => {
    const contacts = await $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.click({ duration: 2000 })
})
```