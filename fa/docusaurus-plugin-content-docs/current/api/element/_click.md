---
id: click
title: کلیک
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

کلیک روی یک المان.

این دستور یک فرمان WebDriver `click` را برای المان انتخاب شده صادر می‌کند، که معمولاً به سمت المان انتخاب شده اسکرول کرده و سپس روی آن کلیک می‌کند هنگامی که گزینه‌ای ارسال نشده باشد. وقتی شیء گزینه‌ها ارسال می‌شود، به جای کلیک وب‌درایور از کلاس اکشن استفاده می‌کند که قابلیت‌های اضافی مانند ارسال نوع دکمه، مختصات و غیره را به شما می‌دهد. به طور پیش‌فرض، هنگام استفاده از گزینه‌ها، یک دستور عمل رهاسازی پس از انجام عمل کلیک ارسال می‌شود، برای رد کردن این عمل `option.skipRelease=true` را ارسال کنید.

:::info

اگر المان‌هایی با موقعیت ثابت دارید (مانند هدر یا فوتر ثابت) که پس از اسکرول در محدوده دید، المان انتخاب شده را می‌پوشانند، کلیک در مختصات داده شده صادر می‌شود، اما توسط المان ثابت (پوشاننده) شما دریافت خواهد شد. در این موارد خطای زیر نمایش داده می‌شود:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

برای رفع این مشکل، سعی کنید المان پوشاننده را پیدا کرده و از طریق دستور `execute` آن را حذف کنید تا در کلیک تداخل ایجاد نکند. همچنین می‌توانید با استفاده از `scroll` با آفست مناسب برای سناریوی خود، به سمت المان اسکرول کنید.

:::

:::info

از دستور کلیک همچنین می‌توان برای شبیه‌سازی فشار طولانی (لانگ پرس) در دستگاه موبایل استفاده کرد. این کار با تنظیم `duration` انجام می‌شود.
برای اطلاعات بیشتر به مثال زیر مراجعه کنید.

:::

##### استفاده

```js
$(selector).click({ button, x, y, skipRelease, duration })
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`ClickOptions`</td>
      <td>گزینه‌های کلیک (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string, number`</td>
      <td>می‌تواند یکی از `[0, "left", 1, "middle", 2, "right"]` باشد <br /><strong>فقط-وب</strong> (دسکتاپ/موبایل)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>X پیکسل افقی دور از موقعیت المان کلیک می‌کند (از نقطه مرکزی المان)<br /><strong>وب و نیتیو</strong> (دسکتاپ/موبایل)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>Y پیکسل عمودی دور از موقعیت المان کلیک می‌کند (از نقطه مرکزی المان)<br /><strong>پشتیبانی وب و نیتیو</strong> (دسکتاپ/موبایل)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`boolean`</td>
      <td>بولین (اختیاری) <br /><strong>فقط-وب</strong> (دسکتاپ/موبایل)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مدت زمان کلیک، یا همان "فشار طولانی" <br /><strong>فقط-اپلیکیشن-نیتیو-موبایل</strong> (موبایل)</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

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