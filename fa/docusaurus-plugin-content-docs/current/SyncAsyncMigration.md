---
id: async-migration
title: از همگام به ناهمگام
description: "مهاجرت گام‌به‌گام تست‌های WebdriverIO از اجرای همگام دستورات به اجرای ناهمگام، شامل حلقه‌های forEach، اعتبارسنجی‌ها (assertions) و page objectهای همگام."
---

به دلیل تغییرات در V8، تیم WebdriverIO [اعلام کرد](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) که اجرای همگام دستورات را تا آوریل ۲۰۲۳ منسوخ خواهد کرد. این تیم سخت تلاش کرده است تا این انتقال را تا حد ممکن آسان کند. در این راهنما توضیح می‌دهیم که چگونه می‌توانید مجموعه تست خود را به‌تدریج از همگام به ناهمگام منتقل کنید. به عنوان پروژه نمونه از [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) استفاده می‌کنیم، اما این رویکرد برای سایر پروژه‌ها نیز یکسان است.

## Promiseها در JavaScript

دلیل محبوبیت اجرای همگام در WebdriverIO این است که پیچیدگی کار با promiseها را از بین می‌برد. به‌ویژه اگر از زبان‌های دیگری می‌آیید که این مفهوم به این شکل در آن‌ها وجود ندارد، ممکن است در ابتدا گیج‌کننده باشد. با این حال، Promiseها ابزاری بسیار قدرتمند برای کار با کد ناهمگام هستند و JavaScript امروزی کار با آن‌ها را در واقع آسان کرده است. اگر تاکنون با Promiseها کار نکرده‌اید، توصیه می‌کنیم [راهنمای مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) را مطالعه کنید، زیرا توضیح آن در اینجا خارج از حوصله این راهنما است.

## انتقال به ناهمگام

اجراکننده تست WebdriverIO می‌تواند اجرای ناهمگام و همگام را در یک مجموعه تست واحد مدیریت کند. این بدان معناست که می‌توانید تست‌ها و PageObjectهای خود را به‌تدریج و گام‌به‌گام با سرعت دلخواه خود منتقل کنید. برای مثال، Cucumber Boilerplate [مجموعه بزرگی از step definitionها](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) را تعریف کرده است تا آن‌ها را در پروژه خود کپی کنید. ما می‌توانیم در هر نوبت یک step definition یا یک فایل را منتقل کنیم.

:::tip

WebdriverIO یک [codemod](https://github.com/webdriverio/codemod) ارائه می‌دهد که امکان تبدیل تقریباً کاملاً خودکار کد همگام شما به کد ناهمگام را فراهم می‌کند. ابتدا codemod را طبق توضیحات مستندات اجرا کنید و در صورت نیاز از این راهنما برای مهاجرت دستی استفاده کنید.

:::

در بسیاری از موارد، تنها کاری که باید انجام دهید این است که تابعی را که در آن دستورات WebdriverIO را فراخوانی می‌کنید `async` کنید و قبل از هر دستور یک `await` اضافه کنید. با نگاهی به اولین فایل `clearInputField.ts` برای تبدیل در پروژه boilerplate، آن را از این:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

به این تبدیل می‌کنیم:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

همین. می‌توانید commit کامل با تمام نمونه‌های بازنویسی را در اینجا ببینید:

#### Commitها:

- _تبدیل تمام step definitionها_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
این انتقال مستقل از این است که از TypeScript استفاده می‌کنید یا خیر. اگر از TypeScript استفاده می‌کنید، فقط مطمئن شوید که در نهایت ویژگی `types` را در `tsconfig.json` خود از `webdriverio/sync` به `@wdio/globals/types` تغییر دهید. همچنین مطمئن شوید که هدف کامپایل (compile target) شما حداقل روی `ES2018` تنظیم شده باشد.
:::

## موارد خاص

البته همیشه موارد خاصی وجود دارد که باید کمی بیشتر به آن‌ها توجه کنید.

### حلقه‌های ForEach

اگر یک حلقه `forEach` دارید، مثلاً برای پیمایش روی عناصر، باید مطمئن شوید که callback تکرارکننده به‌درستی و به شیوه ناهمگام مدیریت می‌شود، برای مثال:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

تابعی که به `forEach` پاس می‌دهیم یک تابع تکرارکننده (iterator) است. در دنیای همگام، این تابع قبل از ادامه روی همه عناصر کلیک می‌کند. اگر این کد را به کد ناهمگام تبدیل کنیم، باید اطمینان حاصل کنیم که منتظر پایان اجرای هر تابع تکرارکننده می‌مانیم. با افزودن `async`/`await` این توابع تکرارکننده یک promise برمی‌گردانند که باید آن را resolve کنیم. در این حالت، `forEach` دیگر برای پیمایش روی عناصر ایده‌آل نیست، زیرا نتیجه تابع تکرارکننده، یعنی promiseای که باید منتظرش بمانیم، را برنمی‌گرداند. بنابراین باید `forEach` را با `map` جایگزین کنیم که آن promise را برمی‌گرداند. `map` و همچنین سایر متدهای تکرارکننده آرایه‌ها مانند `find`، `every`، `reduce` و غیره به گونه‌ای پیاده‌سازی شده‌اند که promiseهای درون توابع تکرارکننده را رعایت کنند و بنابراین استفاده از آن‌ها در یک زمینه ناهمگام ساده شده است. مثال بالا پس از تبدیل به این شکل است:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

برای مثال، برای دریافت تمام عناصر `<h3 />` و گرفتن محتوای متنی آن‌ها، می‌توانید این کد را اجرا کنید:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * برمی‌گرداند:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

اگر این کار بیش از حد پیچیده به نظر می‌رسد، می‌توانید استفاده از حلقه‌های for ساده را در نظر بگیرید، برای مثال:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` یک [`ElementArray`](/docs/api/browser/$$) برمی‌گرداند. همچنین می‌توانید قبل از await کردن لیست، روی آن پیمایش کنید:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` تا زمانی که لیست resolve نشده باشد خطا می‌دهد، زیرا یک حلقه همگام نمی‌تواند منتظر کوئری بماند. ابتدا لیست را await کنید، مانند مثال بالا، یا از `for await` استفاده کنید.

### اعتبارسنجی‌های WebdriverIO

اگر از ابزار کمکی اعتبارسنجی WebdriverIO یعنی [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio) استفاده می‌کنید، مطمئن شوید که قبل از هر فراخوانی `expect` یک `await` قرار دهید، برای مثال:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

باید به این شکل تبدیل شود:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### متدهای PageObject همگام و تست‌های ناهمگام

اگر PageObjectهای مجموعه تست خود را به شیوه همگام نوشته‌اید، دیگر نمی‌توانید از آن‌ها در تست‌های ناهمگام استفاده کنید. اگر نیاز دارید از یک متد PageObject هم در تست‌های همگام و هم ناهمگام استفاده کنید، توصیه می‌کنیم متد را تکثیر کرده و آن را برای هر دو محیط ارائه دهید، برای مثال:

```js
class MyPageObject extends Page {
    /**
     * تعریف عناصر
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // کد همگام
    }

    someMethodAsync () {
        // نسخه ناهمگام MyPageObject.someMethod()
    }
}
```

پس از اتمام مهاجرت، می‌توانید متدهای همگام PageObject را حذف کرده و نام‌گذاری را مرتب کنید.

اگر دوست ندارید دو نسخه متفاوت از یک متد PageObject را نگهداری کنید، می‌توانید کل PageObject را به ناهمگام منتقل کرده و از [`browser.call`](https://webdriver.io/docs/api/browser/call) برای اجرای متد در یک محیط همگام استفاده کنید، برای مثال:

```js
// قبل:
// MyPageObject.someMethod()
// بعد:
browser.call(() => MyPageObject.someMethod())
```

دستور `call` اطمینان حاصل می‌کند که `someMethod` ناهمگام قبل از رفتن به دستور بعدی resolve شده باشد.

## نتیجه‌گیری

همان‌طور که در [PR بازنویسی حاصل](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) می‌بینید، پیچیدگی این بازنویسی نسبتاً کم است. به یاد داشته باشید که می‌توانید در هر نوبت یک step-definition را بازنویسی کنید. WebdriverIO کاملاً قادر است اجرای همگام و ناهمگام را در یک فریم‌ورک واحد مدیریت کند.