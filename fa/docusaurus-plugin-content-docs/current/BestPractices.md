---
id: bestpractices
title: بهترین شیوه‌ها
---

# بهترین شیوه‌ها

این راهنما با هدف به اشتراک گذاشتن بهترین شیوه‌های ما است که به شما کمک می‌کند آزمون‌های کارآمد و مقاوم بنویسید.

## از انتخاب‌گرهای مقاوم استفاده کنید

با استفاده از انتخاب‌گرهایی که نسبت به تغییرات در DOM مقاوم هستند، آزمون‌های کمتری یا حتی هیچ آزمونی نخواهید داشت که هنگام حذف یک کلاس از یک عنصر شکست بخورد.

کلاس‌ها می‌توانند به چندین عنصر اعمال شوند و در صورت امکان باید از آن‌ها اجتناب کنید، مگر اینکه عمداً بخواهید تمام عناصر با آن کلاس را دریافت کنید.

```js
// 👎
await $('.button')
```

تمام این انتخاب‌گرها باید یک عنصر منفرد را برگردانند.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__نکته:__ برای اطلاع از تمام انتخاب‌گرهای ممکنی که WebdriverIO پشتیبانی می‌کند، صفحه [انتخاب‌گرها](./Selectors.md) را بررسی کنید.

## تعداد پرس‌وجوهای عنصر را محدود کنید

هر بار که از دستور [`$`](https://webdriver.io/docs/api/browser/$) یا [`$$`](https://webdriver.io/docs/api/browser/$$) استفاده می‌کنید (این شامل زنجیره کردن آن‌ها نیز می‌شود)، WebdriverIO سعی می‌کند عنصر را در DOM پیدا کند. این پرس‌وجوها پرهزینه هستند، بنابراین باید تلاش کنید تا حد امکان آن‌ها را محدود کنید.

سه عنصر را پرس‌وجو می‌کند.

```js
// 👎
await $('table').$('tr').$('td')
```

فقط یک عنصر را پرس‌وجو می‌کند.

``` js
// 👍
await $('table tr td')
```

تنها زمانی که باید از زنجیره‌سازی استفاده کنید، زمانی است که می‌خواهید [استراتژی‌های انتخاب‌گر](https://webdriver.io/docs/selectors/#custom-selector-strategies) مختلفی را ترکیب کنید.
در این مثال، ما از [انتخاب‌گرهای عمیق](https://webdriver.io/docs/selectors#deep-selectors) استفاده می‌کنیم، که یک استراتژی برای ورود به shadow DOM یک عنصر است.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### ترجیح دهید یک عنصر را به جای انتخاب از لیست پیدا کنید

همیشه این کار امکان‌پذیر نیست، اما با استفاده از کلاس‌های شبه CSS مانند [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) می‌توانید عناصر را بر اساس شاخص‌های آن‌ها در لیست فرزند والدینشان مطابقت دهید.

تمام ردیف‌های جدول را پرس‌وجو می‌کند.

```js
// 👎
await $$('table tr')[15]
```

یک ردیف جدول منفرد را پرس‌وجو می‌کند.

```js
// 👍
await $('table tr:nth-child(15)')
```

## از تأییدیه‌های داخلی استفاده کنید

از تأییدیه‌های دستی که به طور خودکار منتظر مطابقت نتایج نمی‌مانند استفاده نکنید، زیرا این باعث آزمون‌های ناپایدار می‌شود.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

با استفاده از تأییدیه‌های داخلی، WebdriverIO به طور خودکار منتظر می‌ماند تا نتیجه واقعی با نتیجه مورد انتظار مطابقت داشته باشد، که منجر به آزمون‌های مقاوم می‌شود.
این کار را با تلاش مجدد خودکار تأییدیه تا زمانی که موفق شود یا زمان آن به پایان برسد، انجام می‌دهد.

```js
// 👍
await expect(button).toBeDisplayed()
```

## بارگذاری تنبل و زنجیره‌سازی پرامیس

WebdriverIO ترفندهایی برای نوشتن کد تمیز دارد، زیرا می‌تواند عنصر را به صورت تنبل بارگذاری کند که به شما اجازه می‌دهد پرامیس‌های خود را زنجیره کنید و میزان `await` را کاهش دهید. این همچنین به شما اجازه می‌دهد عنصر را به عنوان یک ChainablePromiseElement به جای یک Element منتقل کنید و برای استفاده آسان‌تر با اشیاء صفحه.

پس چه زمانی باید از `await` استفاده کنید؟
شما همیشه باید از `await` استفاده کنید، با استثنای دستور `$` و `$$`.

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

## از دستورات و تأییدیه‌ها بیش از حد استفاده نکنید

هنگام استفاده از expect.toBeDisplayed، شما به طور ضمنی همچنین منتظر می‌مانید تا عنصر وجود داشته باشد. نیازی به استفاده از دستورات waitForXXX نیست وقتی که یک تأییدیه دارید که همان کار را انجام می‌دهد.

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

نیازی به انتظار برای وجود یا نمایش یک عنصر هنگام تعامل یا هنگام تأیید چیزی مانند متن آن نیست، مگر اینکه عنصر به طور صریح نامرئی باشد (برای مثال opacity: 0) یا به طور صریح غیرفعال باشد (مثلاً ویژگی disabled)، که در این موارد انتظار برای نمایش عنصر منطقی است.

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

## آزمون‌های پویا

از متغیرهای محیطی برای ذخیره داده‌های آزمونی پویا مانند اعتبارنامه‌های محرمانه در محیط خود استفاده کنید، به جای اینکه آن‌ها را در آزمون کدگذاری سخت کنید. برای اطلاعات بیشتر در این موضوع به صفحه [پارامتری کردن آزمون‌ها](parameterize-tests) مراجعه کنید.

## کد خود را lint کنید

با استفاده از eslint برای lint کردن کد خود، می‌توانید احتمالاً خطاها را زودتر تشخیص دهید. از [قوانین linting](https://www.npmjs.com/package/eslint-plugin-wdio) ما استفاده کنید تا اطمینان حاصل کنید که برخی از بهترین شیوه‌ها همیشه اعمال می‌شوند.

## توقف نکنید

ممکن است استفاده از دستور pause وسوسه‌انگیز باشد، اما استفاده از آن ایده بدی است زیرا مقاوم نیست و در بلندمدت فقط باعث آزمون‌های ناپایدار می‌شود.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // منتظر فعال شدن دکمه ارسال باشید
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## حلقه‌های ناهمگام

وقتی کدی ناهمگام دارید که می‌خواهید تکرار کنید، مهم است بدانید که همه حلقه‌ها نمی‌توانند این کار را انجام دهند.
برای مثال، تابع forEach آرایه اجازه استفاده از callback های ناهمگام را نمی‌دهد، همانطور که در [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) خوانده می‌شود.

__نکته:__ شما همچنان می‌توانید از این‌ها استفاده کنید زمانی که نیازی به عملیات ناهمگام ندارید، مانند این مثال `console.log(await $$('h1').map((h1) => h1.getText()))`.

در زیر چند مثال از معنای این امر آمده است.

موارد زیر کار نخواهد کرد زیرا callback های ناهمگام پشتیبانی نمی‌شوند.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

موارد زیر کار خواهد کرد.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## ساده نگه دارید

گاهی اوقات می‌بینیم که کاربران ما داده‌هایی مانند متن یا مقادیر را نقشه‌برداری می‌کنند. این اغلب ضروری نیست و اغلب نشانه‌ای از کد نامناسب است. مثال‌های زیر را بررسی کنید تا متوجه شوید چرا این موضوع صادق است.

```js
// 👎 بیش از حد پیچیده، تأیید همگام، از تأییدیه‌های داخلی برای جلوگیری از آزمون‌های ناپایدار استفاده کنید
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

// 👎 عناصر را بر اساس متن آن‌ها پیدا می‌کند اما موقعیت عناصر را در نظر نمی‌گیرد
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 از شناسه‌های منحصر به فرد استفاده کنید (اغلب برای عناصر سفارشی استفاده می‌شود)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 نام‌های دسترسی پذیری (اغلب برای عناصر html بومی استفاده می‌شود)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

چیز دیگری که گاهی اوقات می‌بینیم این است که چیزهای ساده راه حل‌های بیش از حد پیچیده‌ای دارند.

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

## اجرای کد به صورت موازی

اگر به ترتیب اجرای برخی کدها اهمیت نمی‌دهید، می‌توانید از [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) برای سرعت بخشیدن به اجرا استفاده کنید.

__نکته:__ از آنجا که این کار باعث می‌شود خواندن کد سخت‌تر شود، می‌توانید با استفاده از یک شیء صفحه یا یک تابع، این را انتزاعی کنید، اگرچه همچنین باید بپرسید آیا مزیت عملکرد ارزش هزینه خوانایی را دارد یا خیر.

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

اگر به صورت انتزاعی ارائه شود، می‌تواند شبیه به زیر باشد که در آن منطق در یک متد به نام submitWithDataOf قرار داده شده و داده‌ها توسط کلاس Person بازیابی می‌شوند.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```
```