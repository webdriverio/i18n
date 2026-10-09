---
id: pageobjects
title: الگوی Page Object
description: "تست‌های خود را با الگوی Page Object ساختاردهی کنید؛ به این صورت که انتخاب‌گرها و اقدامات مختص هر صفحه را به کلاس‌های صفحه‌ی قابل استفاده‌ی مجدد منتقل کنید."
---

نسخه‌ی ۵ WebdriverIO با در نظر گرفتن پشتیبانی از الگوی Page Object طراحی شده است. با معرفی اصل «المان‌ها به‌عنوان شهروندان درجه‌یک»، اکنون می‌توان مجموعه‌های تست بزرگی را با استفاده از این الگو ساخت.

برای ایجاد page objectها به هیچ پکیج اضافه‌ای نیاز نیست. معلوم می‌شود که کلاس‌های تمیز و مدرن تمام ویژگی‌های لازمی را که نیاز داریم فراهم می‌کنند:

- ارث‌بری بین page objectها
- بارگذاری تنبل (lazy loading) المان‌ها
- کپسوله‌سازی متدها و اقدامات

هدف از استفاده از page objectها، جدا کردن هرگونه اطلاعات صفحه از تست‌های واقعی است. در حالت ایده‌آل، باید تمام انتخاب‌گرها یا دستورالعمل‌های خاصی را که منحصر به یک صفحه‌ی مشخص هستند در یک page object ذخیره کنید، تا حتی پس از بازطراحی کامل صفحه‌تان همچنان بتوانید تست خود را اجرا کنید.

## ساختن یک Page Object

ابتدا به یک page object اصلی نیاز داریم که آن را `Page.js` می‌نامیم. این فایل شامل انتخاب‌گرها یا متدهای عمومی خواهد بود که همه‌ی page objectها از آن ارث‌بری می‌کنند.

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

ما همیشه یک نمونه (instance) از page object را `export` می‌کنیم و هرگز آن نمونه را در تست ایجاد نمی‌کنیم. از آنجایی که در حال نوشتن تست‌های end-to-end هستیم، همیشه صفحه را یک ساختار بدون حالت (stateless) در نظر می‌گیریم&mdash;درست همان‌طور که هر درخواست HTTP یک ساختار بدون حالت است.

البته، مرورگر می‌تواند اطلاعات نشست (session) را حمل کند و بنابراین می‌تواند بر اساس نشست‌های مختلف، صفحات متفاوتی را نمایش دهد، اما این موضوع نباید در page object منعکس شود. این نوع تغییرات حالت باید در تست‌های واقعی شما قرار بگیرند.

بیایید تست کردن اولین صفحه را شروع کنیم. برای اهداف نمایشی، از وب‌سایت [The Internet](http://the-internet.herokuapp.com) ساخته‌ی [Elemental Selenium](http://elementalselenium.com) به‌عنوان نمونه‌ی آزمایشی استفاده می‌کنیم. بیایید سعی کنیم یک نمونه page object برای [صفحه‌ی ورود](http://the-internet.herokuapp.com/login) بسازیم.

## `Get` کردن انتخاب‌گرها

اولین قدم این است که تمام انتخاب‌گرهای مهمی را که در شیء `login.page` ما لازم هستند، به‌صورت توابع getter بنویسیم:

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

تعریف انتخاب‌گرها در توابع getter ممکن است کمی عجیب به نظر برسد، اما واقعاً مفید است. این توابع _هنگامی که به property دسترسی پیدا می‌کنید_ ارزیابی می‌شوند، نه هنگامی که شیء را ایجاد می‌کنید. به این ترتیب، همیشه پیش از انجام هر اقدامی روی المان، آن را درخواست می‌کنید.

## زنجیره‌سازی دستورات

WebdriverIO به‌صورت داخلی آخرین نتیجه‌ی یک دستور را به خاطر می‌سپارد. اگر یک دستور المان را با یک دستور اقدام زنجیره کنید، المان را از دستور قبلی پیدا کرده و از نتیجه برای اجرای اقدام استفاده می‌کند. با این کار می‌توانید انتخاب‌گر (پارامتر اول) را حذف کنید و دستور به همین سادگی به نظر می‌رسد:

```js
await LoginPage.username.setValue('Max Mustermann')
```

که اساساً همان کار زیر است:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

یا

```js
await $('#username').setValue('Max Mustermann')
```

## استفاده از Page Objectها در تست‌ها

پس از اینکه المان‌ها و متدهای لازم برای صفحه را تعریف کردید، می‌توانید نوشتن تست برای آن را شروع کنید. تنها کاری که برای استفاده از page object باید انجام دهید این است که آن را `import` (یا `require`) کنید. همین!

از آنجایی که یک نمونه‌ی از پیش ایجادشده از page object را export کرده‌اید، import کردن آن به شما امکان می‌دهد بلافاصله شروع به استفاده از آن کنید.

اگر از یک فریم‌ورک assertion استفاده کنید، تست‌های شما می‌توانند حتی گویاتر هم باشند:

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

از نظر ساختاری، منطقی است که فایل‌های spec و page objectها را در دایرکتوری‌های مختلف از هم جدا کنید. علاوه بر این، می‌توانید به هر page object پسوند `.page.js` بدهید. این کار مشخص‌تر می‌کند که در حال import کردن یک page object هستید.

## فراتر رفتن

این اصل پایه‌ای نحوه‌ی نوشتن page objectها با WebdriverIO است. اما می‌توانید ساختارهای page object بسیار پیچیده‌تری از این بسازید! برای مثال، ممکن است page objectهای مخصوصی برای modalها داشته باشید، یا یک page object بزرگ را به کلاس‌های مختلفی تقسیم کنید (که هر کدام بخش متفاوتی از کل صفحه‌ی وب را نشان می‌دهند) که از page object اصلی ارث‌بری می‌کنند. این الگو واقعاً فرصت‌های زیادی برای جدا کردن اطلاعات صفحه از تست‌ها فراهم می‌کند، که برای ساختارمند و شفاف نگه داشتن مجموعه‌ی تست‌ها در زمانی که پروژه و تعداد تست‌ها رشد می‌کند، اهمیت دارد.

می‌توانید این مثال (و حتی مثال‌های بیشتری از page object) را در [پوشه‌ی `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) در GitHub پیدا کنید.