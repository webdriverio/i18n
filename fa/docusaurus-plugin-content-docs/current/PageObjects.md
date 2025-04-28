---
id: pageobjects
title: الگوی شیء صفحه
---

نسخه ۵ WebdriverIO با پشتیبانی از الگوی شیء صفحه (Page Object Pattern) طراحی شده است. با معرفی اصل "عناصر به عنوان شهروندان درجه یک"، اکنون امکان ایجاد مجموعه آزمون‌های بزرگ با استفاده از این الگو فراهم شده است.

برای ایجاد اشیاء صفحه به هیچ پکیج اضافی نیاز نیست. مشخص شده که کلاس‌های تمیز و مدرن تمام ویژگی‌های مورد نیاز ما را فراهم می‌کنند:

- وراثت بین اشیاء صفحه
- بارگذاری تنبل (lazy loading) عناصر
- کپسوله‌سازی متدها و اقدامات

هدف از استفاده از اشیاء صفحه، جدا کردن اطلاعات مربوط به هر صفحه از آزمون‌های واقعی است. در حالت ایده‌آل، شما باید تمام انتخابگرها یا دستورالعمل‌های خاصی را که منحصر به یک صفحه خاص هستند در یک شیء صفحه ذخیره کنید، به طوری که همچنان بتوانید آزمون خود را پس از طراحی مجدد کامل صفحه اجرا کنید.

## ایجاد یک شیء صفحه

ابتدا، ما به یک شیء صفحه اصلی نیاز داریم که آن را `Page.js` می‌نامیم. این شامل انتخابگرها یا متدهای عمومی خواهد بود که همه اشیاء صفحه از آن ارث می‌برند.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

ما همیشه یک نمونه از شیء صفحه را `export` می‌کنیم و هرگز آن نمونه را در آزمون ایجاد نمی‌کنیم. از آنجا که ما آزمون‌های end-to-end می‌نویسیم، همیشه صفحه را به عنوان یک ساختار بدون وضعیت در نظر می‌گیریم - درست مانند هر درخواست HTTP که یک ساختار بدون وضعیت است.

البته، مرورگر می‌تواند اطلاعات جلسه را حمل کند و بنابراین می‌تواند صفحات مختلفی را بر اساس جلسات مختلف نمایش دهد، اما این نباید در شیء صفحه منعکس شود. این نوع تغییرات وضعیت باید در آزمون‌های واقعی شما باشد.

بیایید آزمون اولین صفحه را شروع کنیم. برای اهداف نمایشی، ما از وب‌سایت [The Internet](http://the-internet.herokuapp.com) توسط [Elemental Selenium](http://elementalselenium.com) به عنوان خوکچه هندی استفاده می‌کنیم. بیایید سعی کنیم یک نمونه شیء صفحه برای [صفحه ورود](http://the-internet.herokuapp.com/login) بسازیم.

## دریافت انتخابگرهای خود با `Get`

اولین قدم نوشتن تمام انتخابگرهای مهمی است که در شیء `login.page` ما به عنوان توابع getter مورد نیاز هستند:

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

تعریف انتخابگرها در توابع getter ممکن است کمی عجیب به نظر برسد، اما واقعاً مفید است. این توابع _زمانی که به خاصیت دسترسی پیدا می‌کنید_ ارزیابی می‌شوند، نه زمانی که شیء را ایجاد می‌کنید. با این کار، شما همیشه قبل از انجام یک عمل روی آن، عنصر را درخواست می‌کنید.

## زنجیره کردن دستورات

WebdriverIO به صورت داخلی آخرین نتیجه یک دستور را به خاطر می‌سپارد. اگر یک دستور عنصر را با یک دستور اقدام زنجیر کنید، عنصر را از دستور قبلی پیدا می‌کند و از نتیجه برای اجرای اقدام استفاده می‌کند. با این کار می‌توانید انتخابگر (پارامتر اول) را حذف کنید و دستور به سادگی به این شکل خواهد بود:

```js
await LoginPage.username.setValue('Max Mustermann')
```

که اساساً همان چیزی است که:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

یا

```js
await $('#username').setValue('Max Mustermann')
```

## استفاده از اشیاء صفحه در آزمون‌های خود

پس از تعریف عناصر و متدهای لازم برای صفحه، می‌توانید شروع به نوشتن آزمون برای آن کنید. تمام کاری که باید برای استفاده از شیء صفحه انجام دهید `import` (یا `require`) کردن آن است. همین!

از آنجا که شما یک نمونه از قبل ایجاد شده از شیء صفحه را صادر (export) کرده‌اید، وارد کردن (import) آن به شما امکان می‌دهد بلافاصله از آن استفاده کنید.

اگر از یک چارچوب ادعا (assertion framework) استفاده می‌کنید، آزمون‌های شما می‌توانند حتی بیانگرتر باشند:

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

از نظر ساختاری، منطقی است که فایل‌های آزمون (spec) و اشیاء صفحه را در دایرکتوری‌های مختلف جدا کنید. علاوه بر این، می‌توانید به هر شیء صفحه پایان `.page.js` را بدهید. این باعث می‌شود که واضح‌تر شود که شما یک شیء صفحه را وارد می‌کنید.

## پیشرفت بیشتر

این اصل اساسی نحوه نوشتن اشیاء صفحه با WebdriverIO است. اما شما می‌توانید ساختارهای شیء صفحه بسیار پیچیده‌تری از این ایجاد کنید! به عنوان مثال، ممکن است اشیاء صفحه خاصی برای مودال‌ها داشته باشید، یا یک شیء صفحه بزرگ را به کلاس‌های مختلف تقسیم کنید (هر کدام نشان‌دهنده بخش متفاوتی از صفحه وب کلی هستند) که از شیء صفحه اصلی ارث می‌برند. این الگو واقعاً فرصت‌های زیادی برای جدا کردن اطلاعات صفحه از آزمون‌های شما فراهم می‌کند، که برای حفظ ساختار و وضوح مجموعه آزمون شما در زمان‌هایی که پروژه و تعداد آزمون‌ها افزایش می‌یابد، مهم است.

شما می‌توانید این مثال (و حتی مثال‌های شیء صفحه بیشتر) را در [پوشه `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) در GitHub پیدا کنید.