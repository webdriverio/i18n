---
id: getHTML
title: دریافت HTML
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getHTML.ts
---

دریافت کد منبع المان DOM مشخص شده توسط انتخابگر. به صورت پیش‌فرض، به طور خودکار
از همه shadow root‌های المان‌های موجود در المان عبور می‌کند.

##### استفاده

```js
$(selector).getHTML({ includeSelectorTag, pierceShadowRoot, removeCommentNodes, prettify })
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
      <td><code><var>options</var></code></td>
      <td>`GetHTMLOptions`</td>
      <td>گزینه‌های دستور</td>
    </tr>
    <tr>
      <td><code><var>options.includeSelectorTag</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>اگر درست باشد، تگ المان انتخابگر را هم شامل می‌شود (پیش‌فرض: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.pierceShadowRoot</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>اگر درست باشد، محتوای shadow root‌های تمام کامپوننت‌های وب در DOM را شامل می‌شود (پیش‌فرض: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.removeCommentNodes</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>اگر درست باشد، تمام گره‌های توضیح را از HTML حذف می‌کند، مثلاً `<!--?lit$206212805$--><!--?lit$206212805$-->` (پیش‌فرض: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.prettify</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>اگر درست باشد، خروجی HTML به صورت خوانا و منظم خواهد بود (پیش‌فرض: `true`)</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```html title="index.html"
<div id="test">
    <span>Lorem ipsum dolor amet</span>
</div>
```

```js title="getHTML.js"
it('should get html for certain elements', async () => {
    var outerHTML = await $('#test').getHTML();
    console.log(outerHTML);
    // outputs:
    // "<div id="test"><span>Lorem ipsum dolor amet</span></div>"

    var innerHTML = await $('#test').getHTML({ includeSelectorTag: false });
    console.log(innerHTML);
    // outputs:
    // "<span>Lorem ipsum dolor amet</span>"
});
```

```js title="getHTMLShadow.js"
it('allows to snapshot shadow dom', async () => {
    await browser.url('https://ionicframework.com/docs/usage/v8/button/basic/demo.html?ionic:mode=md')

    // get snapshot of web component without its styles
    const snapshot = await $('ion-button').getHTML({ excludeElements: ['style'] })

    // assert snapshot
    await expect(snapshot).toMatchInlineSnapshot(`
        <ion-button class="md button button-solid ion-activatable ion-focusable hydrated">Default
            <template shadowrootmode="open">
                <button type="button" class="button-native" part="native">
                <span class="button-inner">
                    <slot name="icon-only"></slot>
                    <slot name="start"></slot>
                    <slot></slot>
                    <slot name="end"></slot>
                </span>
                <ion-ripple-effect role="presentation" class="md hydrated">
                    <template shadowrootmode="open"></template>
                </ion-ripple-effect>
                </button>
            </template>
        </ion-button>
    `)
});
```

##### مقادیر بازگشتی

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   HTML المان مشخص شده