---
id: expect-webdriverio
title: انتظار
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


هنگام نوشتن تست‌ها، اغلب نیاز دارید که مقادیر را با شرایط خاصی بررسی کنید. `expect` به شما امکان دسترسی به تعدادی "matcher" را می‌دهد که به شما امکان می‌دهد چیزهای مختلف را روی `browser`، یک `element` یا شیء `mock` اعتبارسنجی کنید.

## گزینه‌های پیش‌فرض

این گزینه‌های پیش‌فرض در زیر به گزینه‌های [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) و [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) که در تنظیمات قرار داده شده‌اند متصل هستند.

فقط در صورتی که می‌خواهید برای تاییدات خود زمان انتظار خاصی را تنظیم کنید، گزینه‌های زیر را تنظیم کنید.

```js
{
    wait: 2000, // ms to wait for expectation to succeed
    interval: 100, // interval between attempts
}
```

اگر می‌خواهید زمان‌های انتظار و فواصل متفاوتی را انتخاب کنید، این گزینه‌ها را به این شکل تنظیم کنید:

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### گزینه‌های Matcher

هر matcher می‌تواند چندین گزینه داشته باشد که به شما امکان می‌دهد تایید را تغییر دهید:

##### گزینه‌های دستور

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | زمان به میلی‌ثانیه برای انتظار برای موفقیت انتظار. پیش‌فرض: `3000` |
| <code><var>interval</var></code> | number | فاصله بین تلاش‌ها. پیش‌فرض: `100` |
| <code><var>beforeAssertion</var></code> | function | تابعی که قبل از انجام تایید فراخوانی می‌شود |
| <code><var>afterAssertion</var></code> | function | تابعی که پس از انجام تایید فراخوانی می‌شود و شامل نتایج تایید است |
| <code><var>message</var></code> | string | پیام کاربر برای اضافه کردن قبل از خطای تایید |

##### گزینه‌های رشته

این گزینه علاوه بر گزینه‌های دستور هنگامی که رشته‌ها تایید می‌شوند می‌تواند استفاده شود.

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | اعمال `toLowerCase` به هر دو مقدار واقعی و مورد انتظار |
| <code><var>trim</var></code> | boolean | اعمال `trim` به مقدار واقعی |
| <code><var>replace</var></code> | Replacer \| Replacer[] | جایگزینی بخش‌هایی از مقدار واقعی که با رشته/RegExp مطابقت می‌کنند. جایگزین می‌تواند یک رشته یا یک تابع باشد.
| <code><var>containing</var></code> | boolean | انتظار می‌رود مقدار واقعی شامل مقدار مورد انتظار باشد، در غیر این صورت برابری دقیق. |
| <code><var>asString</var></code> | boolean | ممکن است برای اجبار به تبدیل مقدار خاصیت به رشته مفید باشد |
| <code><var>atStart</var></code> | boolean | انتظار می‌رود مقدار واقعی با مقدار مورد انتظار شروع شود |
| <code><var>atEnd</var></code> | boolean | انتظار می‌رود مقدار واقعی با مقدار مورد انتظار پایان یابد |
| <code><var>atIndex</var></code> | number | انتظار می‌رود مقدار واقعی در شاخص معین دارای مقدار مورد انتظار باشد |

##### گزینه‌های عددی

این گزینه می‌تواند علاوه بر گزینه‌های دستور هنگامی که اعداد تایید می‌شوند اعمال شود.

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | برابر |
| <code><var>lte</var></code> | number | کمتر یا مساوی |
| <code><var>gte</var></code> | number | بزرگتر یا مساوی |

### مدیریت موجودیت‌های HTML

یک موجودیت HTML یک قطعه متن ("رشته") است که با یک علامت و (&) شروع می‌شود و با نقطه ویرگول (;) پایان می‌یابد. موجودیت‌ها اغلب برای نمایش کاراکترهای رزرو شده (که در غیر این صورت به عنوان کد HTML تفسیر می‌شوند) و کاراکترهای نامرئی (مانند فضاهای بدون شکست، مانند `&nbsp;`) استفاده می‌شوند.

برای یافتن یا تعامل با چنین عنصری از معادل یونیکد موجودیت استفاده کنید. به عنوان مثال:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

می‌توانید تمام مراجع یونیکد را در [مشخصات HTML](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references) پیدا کنید.

**نکته:** یونیکد به حروف بزرگ و کوچک حساس نیست، بنابراین هر دو `\u00a0` و `\u00A0` کار می‌کنند. برای یافتن عنصر در بازرسی مرورگر، `u` را از یونیکد حذف کنید، مثلاً: `div[data="Some\00a0Value"]`

## Matchers مرورگر

### toHaveUrl

بررسی می‌کند که آیا مرورگر در یک صفحه خاص است.

##### استفاده

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### استفاده

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

بررسی می‌کند که آیا وب‌سایت دارای عنوان خاصی است.

##### استفاده

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

بررسی می‌کند که آیا مرورگر متن خاصی در کلیپ‌بورد خود ذخیره کرده است.

##### استفاده

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Matchers عنصر

### toBeDisplayed

تابع [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) را روی عنصر داده شده فراخوانی می‌کند.

##### استفاده

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

تابع [`isExisting`](https://webdriver.io/docs/api/element/isExisting) را روی عنصر داده شده فراخوانی می‌کند.

##### استفاده

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

مشابه با `toExist`.

##### استفاده

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

مشابه با `toExist`.

##### استفاده

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

بررسی می‌کند که آیا عنصر فوکوس دارد. این تایید فقط در بستر وب کار می‌کند.

##### استفاده

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

بررسی می‌کند که آیا یک عنصر دارای یک صفت خاص با مقدار مشخص است.

##### استفاده

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

مشابه با `toHaveAttribute`.

##### استفاده

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

بررسی می‌کند که آیا یک عنصر دارای یک نام کلاس واحد است. می‌تواند همچنین با یک آرایه به عنوان پارامتر فراخوانی شود وقتی عنصر می‌تواند چندین نام کلاس داشته باشد.

##### استفاده

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

بررسی می‌کند که آیا یک عنصر دارای یک خاصیت خاص است.

##### استفاده

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

بررسی می‌کند که آیا یک عنصر ورودی دارای یک مقدار خاص است.

##### استفاده

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

با فراخوانی [`isClickable`](https://webdriver.io/docs/api/element/isClickable) روی عنصر بررسی می‌کند که آیا یک عنصر قابل کلیک است.

##### استفاده

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

با فراخوانی [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) روی عنصر بررسی می‌کند که آیا یک عنصر غیرفعال است.

##### استفاده

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// same as
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

با فراخوانی [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) روی عنصر بررسی می‌کند که آیا یک عنصر فعال است.

##### استفاده

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// same as
await expect(elem).not.toBeDisabled()
```

### toBeSelected

با فراخوانی [`isSelected`](https://webdriver.io/docs/api/element/isSelected) روی عنصر بررسی می‌کند که آیا یک عنصر انتخاب شده است.

##### استفاده

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

مشابه با `toBeSelected`.

##### استفاده

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

بررسی می‌کند که آیا عنصر دارای یک برچسب WAI-ARIA محاسبه شده خاص است. می‌تواند همچنین با یک آرایه به عنوان پارامتر فراخوانی شود در موردی که عنصر می‌تواند برچسب‌های مختلفی داشته باشد.

##### استفاده

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### استفاده

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

بررسی می‌کند که آیا عنصر دارای یک نقش WAI-ARIA محاسبه شده خاص است. می‌تواند همچنین با یک آرایه به عنوان پارامتر فراخوانی شود در موردی که عنصر می‌تواند نقش‌های مختلفی داشته باشد.

##### استفاده

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### استفاده

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

بررسی می‌کند که آیا عنصر لینک دارای یک هدف لینک خاص است.

##### استفاده

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

مشابه با `toHaveHref`.

##### استفاده

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

بررسی می‌کند که آیا عنصر دارای یک صفت `id` خاص است.

##### استفاده

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

بررسی می‌کند که آیا عنصر دارای یک متن خاص است. می‌تواند همچنین با یک آرایه به عنوان پارامتر فراخوانی شود در موردی که عنصر می‌تواند متن‌های مختلفی داشته باشد.

##### استفاده

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

در صورتی که لیستی از عناصر در div زیر وجود داشته باشد:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

می‌توانید آنها را با استفاده از یک آرایه تایید کنید:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

بررسی می‌کند که آیا عنصر دارای یک متن خاص است. می‌تواند همچنین با یک آرایه به عنوان پارامتر فراخوانی شود در موردی که عنصر می‌تواند متن‌های مختلفی داشته باشد.

##### استفاده

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### استفاده

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

با فراخوانی [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) روی عنصر بررسی می‌کند که آیا یک عنصر در ناحیه قابل مشاهده است.

##### استفاده

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

تعداد فرزندان عنصر را با فراخوانی دستور `element.$('./*')` بررسی می‌کند.

##### استفاده

```js
const list = await $('ul')
await expect(list).toHaveChildren() // the list has at least one item
// same as
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // the list has 3 items
// same as 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

بررسی می‌کند که آیا عنصر دارای عرض خاصی است.

##### استفاده

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

بررسی می‌کند که آیا عنصر دارای ارتفاع خاصی است.

##### استفاده

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

بررسی می‌کند که آیا عنصر دارای اندازه خاصی است.

##### استفاده

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

تعداد عناصر دریافتی با استفاده از دستور [`$$`](https://webdriver.io/docs/api/element/$) را بررسی می‌کند.

**نکته:** این matcher آرایه عبور داده شده را با آخرین عناصر به‌روز می‌کند اگر تاییدیه موفق باشد. با این حال، اگر متغیر را مجدداً تخصیص داده‌اید، باید عناصر را دوباره دریافت کنید.

##### استفاده

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 items in the list

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// same as
assert.ok(listItems.length <= 10)
```

## Matchers شبکه

### toBeRequested

بررسی می‌کند که mock فراخوانی شده است

##### استفاده

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

بررسی می‌کند که mock برای تعداد مورد انتظار فراخوانی شده است

##### استفاده

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // request called at least 5 times but less than 11
```

### toBeRequestedWith

بررسی می‌کند که mock مطابق با گزینه‌های مورد انتظار فراخوانی شده است.

بیشتر گزینه‌ها از matcher‌های جزئی expect/jasmine مانند [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject) پشتیبانی می‌کنند

##### استفاده

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [optional] string | function | custom matcher
    method: 'POST',                                 // [optional] string | array
    statusCode: 200,                                // [optional] number | array
    requestHeaders: { Authorization: 'foo' },       // [optional] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [optional] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [optional] object | function | custom matcher
    response: { success: true },                    // [optional] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // either POST or PUT
    statusCode: [401, 403],  // either 401 or 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Matcher اسنپ‌شات

WebdriverIO از تست‌های اسنپ‌شات پایه و همچنین تست اسنپ‌شات DOM پشتیبانی می‌کند.

### toMatchSnapshot

بررسی می‌کند که آیا هر شیء دلخواه با یک مقدار خاص مطابقت دارد. اگر یک [`WebdriverIO.Element`](https://webdriver.io/docs/api/element) را عبور دهید، به طور خودکار وضعیت [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) آن را اسنپ‌شات می‌گیرد.

##### استفاده

```js
// snapshot arbitrary objects (no "await" needed here)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot `outerHTML` of WebdriverIO.Element (DOM snapshot, requires "await")
await expect($('elem')).toMatchSnapshot()
// snapshot result of element command
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

به طور مشابه، می‌توانید از `toMatchInlineSnapshot()` برای ذخیره اسنپ‌شات به صورت درون‌خطی در فایل تست استفاده کنید. برای مثال، با:

```js
await expect($('img')).toMatchInlineSnapshot()
```

به جای ایجاد یک فایل اسنپ‌شات، WebdriverIO مستقیماً فایل تست را برای به‌روزرسانی اسنپ‌شات به عنوان یک رشته تغییر می‌دهد:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Matchers اسنپ‌شات تصویری

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

matcher‌های زیر به عنوان بخشی از افزونه `@wdio/visual-service` پیاده‌سازی شده‌اند و فقط زمانی که سرویس راه‌اندازی شده باشد در دسترس هستند. مطمئن شوید که [دستورالعمل‌های راه‌اندازی](https://webdriver.io/docs/visual-testing) را به درستی دنبال می‌کنید.

### toMatchElementSnapshot

بررسی می‌کند که آیا عنصر داده شده با اسنپ‌شات خط پایه مطابقت دارد.

##### استفاده

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // options
})
```

نتیجه مورد انتظار به طور پیش‌فرض `0` است، بنابراین می‌توانید همان تاییدیه را به صورت زیر بنویسید:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // options
})
```

یا اصلاً هیچ گزینه‌ای ارسال نکنید:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

بررسی می‌کند که آیا صفحه نمایش فعلی با اسنپ‌شات خط پایه مطابقت دارد.

##### استفاده

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // options
})
```

نتیجه مورد انتظار به طور پیش‌فرض `0` است، بنابراین می‌توانید همان تاییدیه را به صورت زیر بنویسید:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // options
})
```

یا اصلاً هیچ گزینه‌ای ارسال نکنید:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

بررسی می‌کند که آیا اسکرین‌شات صفحه کامل با اسنپ‌شات خط پایه مطابقت دارد.

##### استفاده

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // options
})
```

نتیجه مورد انتظار به طور پیش‌فرض `0` است، بنابراین می‌توانید همان تاییدیه را به صورت زیر بنویسید:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // options
})
```

یا اصلاً هیچ گزینه‌ای ارسال نکنید:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

بررسی می‌کند که آیا اسکرین‌شات صفحه کامل شامل نشانه‌های tab با اسنپ‌شات خط پایه مطابقت دارد.

##### استفاده

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // options
})
```

نتیجه مورد انتظار به طور پیش‌فرض `0` است، بنابراین می‌توانید همان تاییدیه را به صورت زیر بنویسید:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // options
})
```

یا اصلاً هیچ گزینه‌ای ارسال نکنید:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## استفاده از عبارات منظم

همچنین می‌توانید مستقیماً از عبارات منظم برای تمام matcher‌هایی که مقایسه متنی انجام می‌دهند استفاده کنید.

##### استفاده

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Matchers پیش‌فرض

علاوه بر matcher‌های `expect-webdriverio`، می‌توانید از تاییدیه‌های داخلی Jest's [expect](https://jestjs.io/docs/en/expect) یا [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) برای Jasmine استفاده کنید.

## Asymmetric Matchers

WebdriverIO از استفاده از matcher‌های نامتقارن در هر جایی که مقادیر متنی را مقایسه می‌کنید پشتیبانی می‌کند، به عنوان مثال:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

یا

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

اگر از [WDIO Testrunner](https://webdriver.io/docs/clioptions) استفاده می‌کنید، همه چیز به طور خودکار تنظیم خواهد شد. فقط [راهنمای راه‌اندازی](https://webdriver.io/docs/typescript#framework-setup) را از مستندات دنبال کنید. با این حال، اگر WebdriverIO را با یک testrunner دیگر یا در یک اسکریپت ساده Node.js اجرا می‌کنید، باید `expect-webdriverio` را به `types` در `tsconfig.json` اضافه کنید.

- `"expect-webdriverio"` برای همه به‌جز کاربران Jasmine/Jest.
- `"expect-webdriverio/jasmine"` برای Jasmine
- `"expect-webdriverio/jest"` برای Jest

## JavaScript (VSCode)

برای کار کردن تکمیل خودکار در vanilla js، لازم است که `jsconfig.json` را در ریشه پروژه ایجاد کنید و به تعریف‌های نوع اشاره کنید.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## افزودن matcher‌های خودتان

مشابه با نحوه گسترش `expect-webdriverio` matcher‌های Jasmine/Jest، افزودن matcher‌های سفارشی نیز امکان‌پذیر است.

- برای Jasmine به مستندات [custom matchers](https://jasmine.github.io/2.5/custom_matcher.html) مراجعه کنید
- برای بقیه به [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) Jest مراجعه کنید

matcher‌های سفارشی باید در فایل `before` wdio اضافه شوند

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - Jest example
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Temporary workaround. See https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```