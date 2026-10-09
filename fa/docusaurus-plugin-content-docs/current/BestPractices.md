---
id: bestpractices
title: بهترین روش‌ها
description: "با استفاده از انتخابگرهای پایدار، کوئری‌های کمتر برای یافتن عناصر، assertionهای داخلی و بدون توقف‌های دستی، تست‌های سریع و پایدار با WebdriverIO بنویسید."
---

# بهترین روش‌ها

هدف این راهنما به اشتراک گذاشتن بهترین روش‌های ما است که به شما کمک می‌کنند تست‌هایی کارآمد و پایدار بنویسید.

## از انتخابگرهای پایدار استفاده کنید

با استفاده از انتخابگرهایی که در برابر تغییرات DOM پایدار هستند، زمانی که برای مثال یک کلاس از یک عنصر حذف می‌شود، تست‌های کمتری شکست می‌خورند یا حتی هیچ تستی شکست نمی‌خورد.

کلاس‌ها می‌توانند به چندین عنصر اعمال شوند و در صورت امکان باید از آن‌ها اجتناب کرد، مگر اینکه عمداً بخواهید تمام عناصر دارای آن کلاس را دریافت کنید.

```js
// 👎
await $('.button')
```

تمام این انتخابگرها باید یک عنصر واحد را برگردانند.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__نکته:__ برای آشنایی با تمام انتخابگرهایی که WebdriverIO پشتیبانی می‌کند، صفحه [انتخابگرها](./Selectors.md) را ببینید.

## تعداد کوئری‌های عناصر را محدود کنید

هر بار که از دستور [`$`](https://webdriver.io/docs/api/browser/$) یا [`$$`](https://webdriver.io/docs/api/browser/$$) استفاده می‌کنید (از جمله زنجیره کردن آن‌ها)، WebdriverIO تلاش می‌کند عنصر را در DOM پیدا کند. این کوئری‌ها پرهزینه هستند، بنابراین باید تا حد امکان آن‌ها را محدود کنید.

سه عنصر را کوئری می‌کند.

```js
// 👎
await $('table').$('tr').$('td')
```

فقط یک عنصر را کوئری می‌کند.

``` js
// 👍
await $('table tr td')
```

تنها زمانی که باید از زنجیره‌سازی استفاده کنید، زمانی است که می‌خواهید [استراتژی‌های انتخابگر](https://webdriver.io/docs/selectors/#custom-selector-strategies) مختلف را با هم ترکیب کنید.
در این مثال از [انتخابگرهای عمیق](https://webdriver.io/docs/selectors#deep-selectors) استفاده می‌کنیم که استراتژی‌ای برای ورود به shadow DOM یک عنصر است.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### یافتن یک عنصر واحد را به انتخاب یکی از یک لیست ترجیح دهید

این کار همیشه امکان‌پذیر نیست، اما با استفاده از شبه‌کلاس‌های CSS مانند [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) می‌توانید عناصر را بر اساس اندیس آن‌ها در لیست فرزندان والدشان تطبیق دهید.

تمام ردیف‌های جدول را کوئری می‌کند.

```js
// 👎
await $$('table tr')[15]
```

یک ردیف واحد از جدول را کوئری می‌کند.

```js
// 👍
await $('table tr:nth-child(15)')
```

## از assertionهای داخلی استفاده کنید

از assertionهای دستی که به‌طور خودکار منتظر تطابق نتایج نمی‌مانند استفاده نکنید، زیرا این کار باعث ایجاد تست‌های ناپایدار (flaky) می‌شود.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

با استفاده از assertionهای داخلی، WebdriverIO به‌طور خودکار منتظر می‌ماند تا نتیجه واقعی با نتیجه مورد انتظار مطابقت پیدا کند و در نتیجه تست‌های پایداری خواهید داشت.
این کار با تکرار خودکار assertion تا زمانی که موفق شود یا زمان آن به پایان برسد انجام می‌شود.

```js
// 👍
await expect(button).toBeDisplayed()
```

## بارگذاری تنبل (Lazy loading) و زنجیره‌سازی promiseها

WebdriverIO ترفندهایی برای نوشتن کد تمیز در اختیار دارد، زیرا می‌تواند عنصر را به‌صورت تنبل بارگذاری کند که به شما امکان می‌دهد promiseهای خود را زنجیره کنید و تعداد `await`ها را کاهش دهید. این قابلیت همچنین به شما اجازه می‌دهد عنصر را به‌صورت ChainablePromiseElement به جای Element ارسال کنید و استفاده از page objectها را آسان‌تر می‌کند.

پس چه زمانی باید از `await` استفاده کنید؟
همیشه باید از `await` استفاده کنید، به جز برای دستورهای `$` و `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// یا
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// یا
await $('div').$('button').click()
```

## در استفاده از دستورات و assertionها زیاده‌روی نکنید

هنگام استفاده از expect.toBeDisplayed، به‌طور ضمنی منتظر وجود داشتن عنصر نیز می‌مانید. وقتی از قبل یک assertion دارید که همین کار را انجام می‌دهد، نیازی به استفاده از دستورات waitForXXX نیست.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

هنگام تعامل با یک عنصر یا بررسی چیزی مانند متن آن، نیازی نیست منتظر وجود داشتن یا نمایش داده شدن آن بمانید، مگر اینکه عنصر بتواند به‌صراحت نامرئی باشد (برای مثال opacity: 0) یا به‌صراحت غیرفعال باشد (برای مثال ویژگی disabled)؛ در این صورت منتظر ماندن برای نمایش داده شدن عنصر منطقی است.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## تست‌های پویا

از متغیرهای محیطی برای ذخیره داده‌های پویای تست، مانند اطلاعات اعتباری محرمانه، در محیط خود استفاده کنید، به جای اینکه آن‌ها را مستقیماً در تست بنویسید. برای اطلاعات بیشتر در این زمینه به صفحه [پارامتری کردن تست‌ها](parameterize-tests) مراجعه کنید.

## کد خود را lint کنید

با استفاده از eslint برای lint کردن کد، می‌توانید خطاها را زودتر شناسایی کنید. از [قوانین linting](https://www.npmjs.com/package/eslint-plugin-wdio) ما استفاده کنید تا مطمئن شوید برخی از بهترین روش‌ها همیشه اعمال می‌شوند.

## از pause استفاده نکنید

ممکن است استفاده از دستور pause وسوسه‌انگیز باشد، اما این کار ایده بدی است، زیرا پایدار نیست و در درازمدت فقط باعث ایجاد تست‌های ناپایدار می‌شود.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // منتظر فعال شدن دکمه ارسال بمان
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## حلقه‌های async

زمانی که کدی ناهمگام دارید که می‌خواهید آن را تکرار کنید، مهم است بدانید که همه حلقه‌ها قادر به انجام این کار نیستند.
برای مثال، تابع forEach آرایه‌ها از callbackهای ناهمگام پشتیبانی نمی‌کند، همان‌طور که در [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) می‌توانید بخوانید.

__نکته:__ زمانی که نیازی به ناهمگام بودن عملیات ندارید، همچنان می‌توانید از این‌ها استفاده کنید، مانند آنچه در این مثال نشان داده شده است: `console.log(await $$('h1').map((h1) => h1.getText()))`.

در ادامه چند مثال برای توضیح این موضوع آمده است.

کد زیر کار نخواهد کرد، زیرا callbackهای ناهمگام پشتیبانی نمی‌شوند.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

کد زیر کار خواهد کرد.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## ساده نگه دارید

گاهی می‌بینیم که کاربران ما داده‌هایی مانند متن یا مقادیر را map می‌کنند. این کار اغلب لازم نیست و معمولاً نشانه‌ای از کد بد (code smell) است. مثال‌های زیر را ببینید تا متوجه شوید چرا.

```js
// 👎 بیش از حد پیچیده، assertion همگام؛ برای جلوگیری از تست‌های ناپایدار از assertionهای داخلی استفاده کنید
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 بیش از حد پیچیده
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 عناصر را بر اساس متنشان پیدا می‌کند اما موقعیت عناصر را در نظر نمی‌گیرد
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 از شناسه‌های یکتا استفاده کنید (اغلب برای عناصر سفارشی استفاده می‌شود)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 نام‌های دسترس‌پذیری (اغلب برای عناصر بومی html استفاده می‌شود)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

مورد دیگری که گاهی می‌بینیم این است که برای کارهای ساده راه‌حل‌های بیش از حد پیچیده ارائه می‌شود.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## اجرای موازی کد

اگر ترتیب اجرای بخشی از کد برایتان اهمیتی ندارد، می‌توانید از [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) برای افزایش سرعت اجرا استفاده کنید.

__نکته:__ از آنجا که این کار خوانایی کد را دشوارتر می‌کند، می‌توانید آن را با استفاده از یک page object یا یک تابع انتزاعی کنید، هرچند باید این را نیز در نظر بگیرید که آیا مزیت عملکردی ارزش هزینه کاهش خوانایی را دارد یا خیر.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

در صورت انتزاعی‌سازی، می‌تواند چیزی شبیه به کد زیر باشد که در آن منطق در متدی به نام submitWithDataOf قرار داده شده و داده‌ها توسط کلاس Person بازیابی می‌شوند.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```