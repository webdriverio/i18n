---
id: async-migration
title: از همگام به ناهمگام
---

به دلیل تغییرات در V8، تیم WebdriverIO [اعلام کرد](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) که اجرای دستورات همگام را تا آوریل 2023 منسوخ خواهد کرد. تیم سخت تلاش کرده تا انتقال را تا حد ممکن آسان کند. در این راهنما توضیح می‌دهیم که چگونه می‌توانید به آرامی مجموعه آزمایش‌های خود را از حالت همگام به ناهمگام منتقل کنید. به عنوان یک پروژه نمونه، ما از [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) استفاده می‌کنیم، اما رویکرد برای تمام پروژه‌های دیگر نیز یکسان است.

## Promise‌ها در جاوااسکریپت

دلیل محبوبیت اجرای همگام در WebdriverIO این است که پیچیدگی کار با promise‌ها را از بین می‌برد. به ویژه اگر شما از زبان‌های دیگری می‌آیید که این مفهوم به این شکل وجود ندارد، ممکن است در ابتدا گیج‌کننده باشد. با این حال، Promise‌ها ابزاری بسیار قدرتمند برای برخورد با کد ناهمگام هستند و جاوااسکریپت امروزی در واقع کار با آن‌ها را آسان می‌کند. اگر تاکنون با Promise‌ها کار نکرده‌اید، توصیه می‌کنیم [راهنمای مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) را بررسی کنید، زیرا توضیح آن در اینجا خارج از حوزه بحث ما خواهد بود.

## انتقال به ناهمگام

تست‌رانر WebdriverIO می‌تواند اجرای ناهمگام و همگام را در یک مجموعه آزمایش مدیریت کند. این بدان معناست که می‌توانید آزمایش‌ها و PageObject‌ها را به تدریج و با سرعت خود مهاجرت دهید. به عنوان مثال، Cucumber Boilerplate [مجموعه بزرگی از تعاریف مراحل](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) را برای کپی کردن در پروژه شما تعریف کرده است. می‌توانیم پیش برویم و یک تعریف مرحله یا یک فایل را در هر زمان مهاجرت دهیم.

:::tip

WebdriverIO یک [codemod](https://github.com/webdriverio/codemod) ارائه می‌دهد که به شما امکان می‌دهد کد همگام خود را تقریباً به طور کامل خودکار به کد ناهمگام تبدیل کنید. ابتدا codemod را همانطور که در مستندات توضیح داده شده است اجرا کنید و در صورت نیاز از این راهنما برای مهاجرت دستی استفاده کنید.

:::

در بسیاری از موارد، تمام کاری که لازم است انجام دهید این است که تابعی را که در آن دستورات WebdriverIO را فراخوانی می‌کنید، `async` کنید و یک `await` در مقابل هر دستور اضافه کنید. با نگاهی به اولین فایل `clearInputField.ts` برای تبدیل در پروژه بویلرپلیت، از:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

به:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

همین. شما می‌توانید کامیت کامل با تمام نمونه‌های بازنویسی را اینجا ببینید:

#### کامیت‌ها:

- _تبدیل تمام تعاریف مراحل_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
این انتقال مستقل از این است که آیا از TypeScript استفاده می‌کنید یا خیر. اگر از TypeScript استفاده می‌کنید، مطمئن شوید که در نهایت خاصیت `types` در `tsconfig.json` خود را از `webdriverio/sync` به `@wdio/globals/types` تغییر دهید. همچنین مطمئن شوید که هدف کامپایل شما حداقل روی `ES2018` تنظیم شده باشد.
:::

## موارد خاص

البته همیشه موارد خاصی وجود دارد که باید کمی بیشتر توجه کنید.

### حلقه‌های ForEach

اگر یک حلقه‌ی `forEach` دارید، مثلاً برای تکرار بر روی عناصر، باید مطمئن شوید که تابع بازگشتی تکرارکننده به درستی به صورت ناهمگام مدیریت می‌شود، مثلاً:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

تابعی که به `forEach` می‌دهیم یک تابع تکرارکننده است. در یک دنیای همگام، قبل از ادامه کار، روی همه عناصر کلیک می‌کرد. اگر ما این را به کد ناهمگام تبدیل کنیم، باید اطمینان حاصل کنیم که برای هر تابع تکرارکننده منتظر پایان اجرا می‌مانیم. با افزودن `async`/`await`، این توابع تکرارکننده promise‌ای را برمی‌گردانند که باید حل شود. اکنون، `forEach` دیگر برای تکرار بر روی عناصر ایده‌آل نیست، زیرا نتیجه تابع تکرارکننده، promise‌ای که باید منتظر آن بمانیم، را برنمی‌گرداند. بنابراین ما باید `forEach` را با `map` جایگزین کنیم که آن promise را برمی‌گرداند. `map` و همچنین تمام روش‌های تکرارکننده دیگر آرایه‌ها مانند `find`، `every`، `reduce` و بیشتر به گونه‌ای پیاده‌سازی شده‌اند که promise‌ها را در توابع تکرارکننده در نظر می‌گیرند و بنابراین استفاده از آن‌ها در یک زمینه ناهمگام ساده‌تر است. مثال بالا به این شکل تبدیل می‌شود:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

به عنوان مثال، برای دریافت تمام عناصر `<h3 />` و محتوای متنی آن‌ها، می‌توانید اجرا کنید:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
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

اگر این به نظر خیلی پیچیده می‌رسد، ممکن است بخواهید استفاده از حلقه‌های ساده for را در نظر بگیرید، مثلاً:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### بررسی‌های WebdriverIO

اگر از کمک‌کننده بررسی WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio) استفاده می‌کنید، مطمئن شوید که یک `await` در مقابل هر فراخوانی `expect` قرار دهید، مثلاً:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

باید به این شکل تبدیل شود:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### متدهای همگام PageObject و تست‌های ناهمگام

اگر PageObject‌ها را در مجموعه آزمایش خود به صورت همگام نوشته‌اید، دیگر نمی‌توانید از آن‌ها در تست‌های ناهمگام استفاده کنید. اگر نیاز دارید از یک متد PageObject در هر دو محیط همگام و ناهمگام استفاده کنید، توصیه می‌کنیم متد را تکرار کنید و آن‌ها را برای هر دو محیط ارائه دهید، مثلاً:

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

پس از اتمام مهاجرت، می‌توانید متدهای همگام PageObject را حذف کنید و نام‌گذاری را تمیز کنید.

اگر نمی‌خواهید دو نسخه متفاوت از یک متد PageObject را نگهداری کنید، می‌توانید کل PageObject را به ناهمگام مهاجرت دهید و از [`browser.call`](https://webdriver.io/docs/api/browser/call) برای اجرای متد در یک محیط همگام استفاده کنید، مثلاً:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

دستور `call` اطمینان حاصل می‌کند که `someMethod` ناهمگام قبل از ادامه به دستور بعدی حل می‌شود.

## نتیجه‌گیری

همانطور که در [PR بازنویسی نتیجه](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) می‌بینید، پیچیدگی این بازنویسی نسبتاً آسان است. به یاد داشته باشید که می‌توانید هر بار یک تعریف مرحله را بازنویسی کنید. WebdriverIO به طور کامل قادر به مدیریت اجرای همگام و ناهمگام در یک چارچوب واحد است.
```