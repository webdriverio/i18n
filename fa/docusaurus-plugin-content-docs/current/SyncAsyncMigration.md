---
id: async-migration
title: از همگام به ناهمگام
---

به دلیل تغییرات در V8، تیم WebdriverIO [اعلام کرد](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) که اجرای دستورات همگام (sync) تا آوریل ۲۰۲۳ منسوخ خواهد شد. تیم سخت کار کرده است تا انتقال را تا حد ممکن آسان کند. در این راهنما توضیح می‌دهیم که چگونه می‌توانید مجموعه آزمون خود را به تدریج از حالت همگام به ناهمگام انتقال دهید. به عنوان یک پروژه نمونه، ما از [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) استفاده می‌کنیم، اما رویکرد برای همه پروژه‌های دیگر نیز یکسان است.

## وعده‌ها (Promises) در جاوااسکریپت

دلیل محبوبیت اجرای همگام در WebdriverIO این است که پیچیدگی کار با وعده‌ها را حذف می‌کند. به ویژه اگر از زبان‌های دیگری آمده باشید که این مفهوم به این شکل وجود ندارد، ممکن است در ابتدا گیج‌کننده باشد. با این حال، وعده‌ها ابزاری قدرتمند برای مدیریت کد ناهمگام هستند و جاوااسکریپت امروزی کار با آن‌ها را واقعاً ساده می‌کند. اگر تاکنون با وعده‌ها کار نکرده‌اید، توصیه می‌کنیم [راهنمای مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) را بررسی کنید، زیرا توضیح آن در اینجا خارج از محدوده این راهنما است.

## انتقال به ناهمگام

تست‌رانر WebdriverIO می‌تواند اجرای ناهمگام و همگام را در یک مجموعه آزمون مدیریت کند. این بدان معناست که می‌توانید به تدریج آزمون‌ها و PageObject های خود را قدم به قدم و با سرعت خودتان انتقال دهید. به عنوان مثال، Cucumber Boilerplate [مجموعه‌ای بزرگ از تعاریف قدم](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) را برای کپی در پروژه شما تعریف کرده است. می‌توانیم یک تعریف قدم یا یک فایل را در هر زمان انتقال دهیم.

:::tip

WebdriverIO یک [codemod](https://github.com/webdriverio/codemod) ارائه می‌دهد که به شما اجازه می‌دهد کد همگام خود را تقریباً به طور کامل خودکار به کد ناهمگام تبدیل کنید. ابتدا codemod را همانطور که در مستندات توضیح داده شده اجرا کنید و از این راهنما برای انتقال دستی در صورت نیاز استفاده کنید.

:::

در بسیاری از موارد، تنها کاری که لازم است انجام دهید این است که تابعی را که در آن دستورات WebdriverIO را فراخوانی می‌کنید، `async` کنید و قبل از هر دستور یک `await` اضافه کنید. با نگاهی به اولین فایل `clearInputField.ts` برای تبدیل در پروژه boilerplate، تبدیل از:

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

همین. شما می‌توانید تمام تغییرات را با تمام نمونه‌های بازنویسی در اینجا ببینید:

#### کامیت‌ها:

- _تبدیل همه تعاریف قدم_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
این انتقال مستقل از این است که از TypeScript استفاده می‌کنید یا خیر. اگر از TypeScript استفاده می‌کنید، مطمئن شوید که در نهایت خاصیت `types` در فایل `tsconfig.json` خود را از `webdriverio/sync` به `@wdio/globals/types` تغییر دهید. همچنین مطمئن شوید که هدف کامپایل شما حداقل روی `ES2018` تنظیم شده است.
:::

## موارد خاص

البته همیشه موارد خاصی وجود دارند که باید کمی بیشتر توجه کنید.

### حلقه‌های ForEach

اگر یک حلقه `forEach` دارید، مثلاً برای تکرار روی عناصر، باید مطمئن شوید که تابع بازگشتی (callback) به درستی در حالت ناهمگام مدیریت می‌شود، مثلاً:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

تابعی که به `forEach` می‌دهیم یک تابع تکرارکننده است. در دنیای همگام، قبل از ادامه، روی تمام عناصر کلیک می‌کرد. اگر این را به کد ناهمگام تبدیل کنیم، باید اطمینان حاصل کنیم که برای هر تابع تکرارکننده منتظر اتمام اجرا باشیم. با افزودن `async`/`await` این توابع تکرارکننده یک وعده برمی‌گردانند که باید حل شود. حالا، `forEach` برای تکرار روی عناصر دیگر ایده‌آل نیست زیرا نتیجه تابع تکرارکننده، وعده‌ای که باید منتظر آن باشیم، را برنمی‌گرداند. بنابراین باید `forEach` را با `map` جایگزین کنیم که آن وعده را برمی‌گرداند. `map` و همه متدهای تکرارکننده دیگر آرایه‌ها مانند `find`، `every`، `reduce` و بیشتر، به گونه‌ای پیاده‌سازی شده‌اند که وعده‌ها را در توابع تکرارکننده رعایت می‌کنند و بنابراین استفاده از آن‌ها در یک محیط ناهمگام ساده‌تر می‌شود. مثال بالا پس از تبدیل به این شکل است:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

به عنوان مثال، برای دریافت تمام عناصر `<h3 />` و دریافت محتوای متنی آن‌ها، می‌توانید اجرا کنید:

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

اگر این به نظر خیلی پیچیده می‌آید، ممکن است بخواهید از حلقه‌های for ساده استفاده کنید، مثلاً:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### اظهارات WebdriverIO

اگر از کمک‌کننده اظهارات WebdriverIO به نام [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio) استفاده می‌کنید، مطمئن شوید که قبل از هر فراخوانی `expect` یک `await` قرار دهید، مثلاً:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

باید به این تبدیل شود:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### متدهای همگام PageObject و آزمون‌های ناهمگام

اگر PageObject ها را در مجموعه آزمون خود به صورت همگام نوشته‌اید، دیگر نمی‌توانید از آن‌ها در آزمون‌های ناهمگام استفاده کنید. اگر نیاز دارید از یک متد PageObject هم در آزمون‌های همگام و هم ناهمگام استفاده کنید، توصیه می‌کنیم متد را تکثیر کنید و برای هر دو محیط ارائه دهید، مثلاً:

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

پس از اتمام انتقال، می‌توانید متدهای همگام PageObject را حذف کنید و نام‌گذاری را تمیز کنید.

اگر نمی‌خواهید دو نسخه مختلف از یک متد PageObject را نگهداری کنید، می‌توانید کل PageObject را به ناهمگام منتقل کنید و از [`browser.call`](https://webdriver.io/docs/api/browser/call) برای اجرای متد در محیط همگام استفاده کنید، مثلاً:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

دستور `call` اطمینان حاصل می‌کند که متد ناهمگام `someMethod` قبل از ادامه به دستور بعدی حل شود.

## نتیجه‌گیری

همانطور که در [PR بازنویسی نهایی](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) می‌بینید، پیچیدگی این بازنویسی نسبتاً ساده است. به یاد داشته باشید که می‌توانید یک تعریف قدم را در هر زمان بازنویسی کنید. WebdriverIO کاملاً قادر به مدیریت اجرای همگام و ناهمگام در یک فریم‌ورک واحد است.