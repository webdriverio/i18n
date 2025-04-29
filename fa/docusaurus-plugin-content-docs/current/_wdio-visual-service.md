---
id: wdio-visual-service
title: سرویس مقایسه تصویر (تست رگرسیون بصری)
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---


> @wdio/visual-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/visual-service) مراجعه کنید

برای مستندات تست بصری با WebdriverIO، لطفاً به [مستندات](https://webdriver.io/docs/visual-testing) مراجعه کنید. این پروژه شامل تمام ماژول‌های مرتبط برای اجرای تست‌های بصری با WebdriverIO است. در دایرکتوری `./packages` موارد زیر را خواهید یافت:

-   `@wdio/visual-testing`: سرویس WebdriverIO برای یکپارچه‌سازی تست‌های بصری
-   `webdriver-image-comparison`: یک ماژول مقایسه تصویر که می‌تواند برای چارچوب‌های مختلف تست خودکار NodeJS که از پروتکل WebDriver پشتیبانی می‌کنند، استفاده شود

## اجراکننده Storybook (بتا)

<details>
  <summary>برای اطلاعات بیشتر درباره اجراکننده Storybook بتا کلیک کنید</summary>

> اجراکننده Storybook همچنان در مرحله بتا است، مستندات بعداً به صفحات مستندات [WebdriverIO](https://webdriver.io/docs/visual-testing) منتقل خواهد شد.

این ماژول اکنون از Storybook با یک اجراکننده بصری جدید پشتیبانی می‌کند. این اجراکننده به طور خودکار یک نمونه storybook محلی/راه دور را اسکن می‌کند و اسکرین‌شات عنصر از هر کامپوننت ایجاد می‌کند. این کار با اضافه کردن

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

به `services` و اجرای `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` از طریق خط فرمان انجام می‌شود.
به صورت پیش‌فرض از Chrome در حالت headless استفاده خواهد کرد.

> [!NOTE]
>
> -   بیشتر گزینه‌های تست بصری برای اجراکننده Storybook نیز کار می‌کنند، به مستندات [WebdriverIO](https://webdriver.io/docs/visual-testing) مراجعه کنید.
> -   اجراکننده Storybook تمام قابلیت‌های شما را بازنویسی می‌کند و فقط می‌تواند روی مرورگرهایی که پشتیبانی می‌کند اجرا شود، به [`--browsers`](#browsers) مراجعه کنید.
> -   اجراکننده Storybook از یک پیکربندی موجود که از قابلیت‌های Multiremote استفاده می‌کند پشتیبانی نمی‌کند و خطا خواهد داد.
> -   اجراکننده Storybook فقط از Desktop Web پشتیبانی می‌کند، نه Mobile Web.

### گزینه‌های سرویس اجراکننده Storybook

گزینه‌های سرویس می‌توانند به این صورت ارائه شوند

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // برخی گزینه‌های پیش‌فرض
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // گزینه‌های storybook، به گزینه‌های cli برای توضیحات مراجعه کنید
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` می‌تواند یک رشته ('example-button--secondary')،
                // یک آرایه (['example-button--secondary', 'example-button--small'])
                // یا یک regex باشد که باید به صورت رشته ارائه شود ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // اختیاری - امکان اورراید کردن مسیر خط مبنا را فراهم می‌کند. به صورت پیش‌فرض خطوط مبنا را بر اساس دسته و کامپوننت گروه‌بندی می‌کند (مثلاً forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### گزینه‌های CLI اجراکننده Storybook

#### `--additionalSearchParams`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** ''
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

پارامترهای جستجوی اضافی را به URL استوری‌بوک اضافه می‌کند.
برای اطلاعات بیشتر به مستندات [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) مراجعه کنید. رشته باید یک رشته URLSearchParams معتبر باشد.

> [!NOTE]
> علامت‌های نقل قول دوگانه برای جلوگیری از تفسیر `&` به عنوان جداکننده دستور مورد نیاز است.
> به عنوان مثال با `--additionalSearchParams="foo=bar&abc=def"` URL استوری‌بوک زیر برای تست داستان‌ها ایجاد می‌شود: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `chrome`، می‌توانید از `chrome|firefox|edge|safari` انتخاب کنید
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **نکته:** فقط از طریق CLI در دسترس است

از مرورگرهای ارائه شده برای گرفتن اسکرین‌شات کامپوننت استفاده می‌کند

> [!NOTE]
> اطمینان حاصل کنید که مرورگرهایی که می‌خواهید روی آن‌ها اجرا کنید روی دستگاه محلی شما نصب شده‌اند

#### `--clip`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

وقتی غیرفعال است، یک اسکرین‌شات ویوپورت ایجاد می‌کند. وقتی فعال است، اسکرین‌شات‌های عنصر بر اساس [`--clipSelector`](#clipselector) ایجاد می‌کند که فضای سفید اطراف اسکرین‌شات کامپوننت را کاهش داده و اندازه اسکرین‌شات را کم می‌کند.

#### `--clipSelector`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `#storybook-root > :first-child` برای Storybook V7 و `#root > :first-child:not(script):not(style)` برای Storybook V6، همچنین به [`--version`](#version) مراجعه کنید
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

این انتخابگر برای موارد زیر استفاده می‌شود:

-   انتخاب عنصر برای گرفتن اسکرین‌شات
-   برای عنصری که قبل از گرفتن اسکرین‌شات باید قابل مشاهده باشد

#### `--devices`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** می‌توانید از [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) انتخاب کنید
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **نکته:** فقط از طریق CLI در دسترس است

از دستگاه‌های ارائه شده که با [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) مطابقت دارند برای گرفتن اسکرین‌شات کامپوننت استفاده می‌کند

> [!NOTE]
>
> -   اگر پیکربندی دستگاهی را از دست داده‌اید، لطفاً یک [درخواست ویژگی](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md) ارسال کنید
> -   این فقط با Chrome کار می‌کند:
>     -   اگر `--devices` را ارائه دهید، تمام نمونه‌های Chrome در حالت **شبیه‌سازی موبایل** اجرا می‌شوند
>     -   اگر مرورگرهای دیگری مانند `--devices --browsers=firefox,safari,edge` نیز ارائه دهید، به طور خودکار Chrome را در حالت شبیه‌سازی موبایل اضافه می‌کند
> -   اجراکننده Storybook به طور پیش‌فرض اسنپ‌شات‌های عنصر ایجاد می‌کند، اگر می‌خواهید اسکرین‌شات کامل شبیه‌سازی شده موبایل را ببینید، `--clip=false` را از طریق خط فرمان ارائه دهید
> -   نام فایل به عنوان مثال به شکل `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png` خواهد بود
> -   **[منبع:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** تست یک وب‌سایت موبایل روی یک دسکتاپ با استفاده از شبیه‌سازی موبایل می‌تواند مفید باشد، اما تست‌کنندگان باید از تفاوت‌های ظریف متعددی آگاه باشند مانند:
>     -   GPU کاملاً متفاوت، که ممکن است منجر به تغییرات عملکردی بزرگی شود؛
>     -   رابط کاربری موبایل شبیه‌سازی نمی‌شود (به ویژه، مخفی کردن نوار url بر ارتفاع صفحه تأثیر می‌گذارد)؛
>     -   پاپ‌آپ رفع ابهام (جایی که یکی از چند هدف لمسی را انتخاب می‌کنید) پشتیبانی نمی‌شود؛
>     -   بسیاری از API‌های سخت‌افزاری (به عنوان مثال، رویداد orientationchange) در دسترس نیستند.

#### `--headless`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **نکته:** فقط از طریق CLI در دسترس است

این تست‌ها را به طور پیش‌فرض در حالت headless اجرا می‌کند (وقتی مرورگر از آن پشتیبانی می‌کند) یا می‌تواند غیرفعال شود

#### `--numShards`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

این تعداد نمونه‌های موازی خواهد بود که برای اجرای داستان‌ها استفاده می‌شود. این توسط `maxInstances` در فایل `wdio.conf` شما محدود خواهد شد.

> [!IMPORTANT]
> هنگام اجرا در حالت `headless`، برای جلوگیری از ناپایداری به دلیل محدودیت‌های منابع، تعداد را بیش از 20 افزایش ندهید

#### `--skipStories`

-   **نوع:** `string|regex`
-   **اجباری:** خیر
-   **پیش‌فرض:** null
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

این می‌تواند:

-   یک رشته (`example-button--secondary,example-button--small`)
-   یا یک regex (`"/.*button.*/gm"`)

باشد تا داستان‌های خاصی را رد کند. از `id` داستان که در URL داستان قابل یافتن است استفاده کنید. به عنوان مثال، `id` در این URL `http://localhost:6006/?path=/story/example-page--logged-out` برابر است با `example-page--logged-out`

#### `--url`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `http://127.0.0.1:6006`
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

URL جایی که نمونه Storybook شما میزبانی می‌شود.

#### `--version`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 7
-   **مثال:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

این نسخه Storybook است، به طور پیش‌فرض `7` است. این برای دانستن اینکه آیا انتخابگر [`clipSelector`](#clipselector) نسخه V6 باید استفاده شود، ضروری است.

### تست تعاملی Storybook

تست تعاملی Storybook به شما اجازه می‌دهد با کامپوننت خود از طریق ایجاد اسکریپت‌های سفارشی با دستورات WDIO برای قرار دادن یک کامپوننت در یک وضعیت خاص تعامل داشته باشید. به عنوان مثال، به قطعه کد زیر نگاه کنید:

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

دو تست روی دو کامپوننت مختلف اجرا می‌شوند. هر تست ابتدا یک وضعیت را تنظیم کرده و سپس یک اسکرین‌شات می‌گیرد. همچنین متوجه خواهید شد که یک دستور سفارشی جدید معرفی شده است که می‌توانید آن را [اینجا](#new-custom-command) پیدا کنید.

فایل مشخصات بالا را می‌توان در یک پوشه ذخیره کرد و با دستور زیر به خط فرمان اضافه کرد:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

اجراکننده Storybook ابتدا به طور خودکار نمونه Storybook شما را اسکن می‌کند و سپس تست‌های شما را به داستان‌هایی که باید مقایسه شوند اضافه می‌کند. اگر نمی‌خواهید کامپوننت‌هایی که برای تست تعاملی استفاده می‌کنید دو بار مقایسه شوند، می‌توانید یک فیلتر اضافه کنید تا داستان‌های "پیش‌فرض" را از اسکن با ارائه فیلتر [`--skipStories`](#--skipstories) حذف کنید. این به شکل زیر خواهد بود:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### دستور سفارشی جدید

یک دستور سفارشی جدید به نام `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` به شیء `browser/driver` اضافه خواهد شد که به طور خودکار کامپوننت را بارگذاری کرده و منتظر می‌ماند تا کار انجام شود، بنابراین نیازی به استفاده از روش `browser.url('url.com')` ندارید. می‌توان از آن به این شکل استفاده کرد

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

گزینه‌ها عبارتند از:

#### `additionalSearchParams`

-   **نوع:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **اجباری:** خیر
-   **پیش‌فرض:** `new URLSearchParams()`
-   **مثال:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

این پارامترهای جستجوی اضافی را به URL استوری‌بوک اضافه می‌کند، در مثال بالا URL به صورت `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def` خواهد بود.
برای اطلاعات بیشتر به مستندات [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) مراجعه کنید.

#### `clipSelector`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `#storybook-root > :first-child` برای Storybook V7 و `#root > :first-child:not(script):not(style)` برای Storybook V6
-   **مثال:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

این انتخابگر برای موارد زیر استفاده می‌شود:

-   انتخاب عنصر برای گرفتن اسکرین‌شات
-   برای عنصری که قبل از گرفتن اسکرین‌شات باید قابل مشاهده باشد

#### `id`

-   **نوع:** `string`
-   **اجباری:** بله
-   **مثال:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

از `id` داستان که در URL داستان قابل یافتن است استفاده کنید. به عنوان مثال، `id` در این URL `http://localhost:6006/?path=/story/example-page--logged-out` برابر است با `example-page--logged-out`

#### `timeout`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 1100 میلی‌ثانیه
-   **مثال:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

حداکثر زمان انتظار برای قابل مشاهده شدن یک کامپوننت پس از بارگذاری در صفحه

#### `url`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `http://127.0.0.1:6006`
-   **مثال:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

URL جایی که نمونه Storybook شما میزبانی می‌شود.

</details>

## مشارکت

### به‌روزرسانی پکیج‌ها

شما می‌توانید پکیج‌ها را با یک ابزار ساده CLI به‌روزرسانی کنید. مطمئن شوید که تمام وابستگی‌ها را نصب کرده‌اید، سپس می‌توانید اجرا کنید

```sh
pnpm update.packages
```

این یک CLI را راه‌اندازی می‌کند که از شما سؤالات زیر را می‌پرسد

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

### سؤالات

لطفاً به سرور [Discord](https://discord.webdriver.io) ما بپیوندید اگر سؤال یا مشکلی در مشارکت در این پروژه دارید. مشارکت‌کنندگان را در کانال `🙏-contributing` پیدا کنید.

### مشکلات

اگر سؤال، باگ یا درخواست ویژگی دارید، لطفاً یک issue ثبت کنید. قبل از ارسال یک issue، لطفاً آرشیو issue را جستجو کنید تا موارد تکراری را کاهش دهید و [FAQ](https://webdriver.io/docs/visual-testing/faq/) را بخوانید.

اگر نمی‌توانید آن را در آنجا پیدا کنید، می‌توانید یک issue ارسال کنید که در آن می‌توانید موارد زیر را ارسال کنید:

-   🐛**گزارش باگ**: یک گزارش ایجاد کنید تا به ما در بهبود کمک کنید
-   📖**مستندات**: پیشنهاداتی برای بهبود ارائه دهید یا مستندات گم شده/مبهم را گزارش دهید.
-   💡**درخواست ویژگی**: یک ایده برای این ماژول پیشنهاد دهید.
-   💬**سؤال**: سؤالات خود را بپرسید.

### گردش کار توسعه

برای ایجاد یک PR برای این پروژه و شروع مشارکت، این راهنمای گام به گام را دنبال کنید:

-   پروژه را fork کنید.
-   پروژه را در جایی در کامپیوتر خود clone کنید

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   به دایرکتوری بروید و پروژه را راه‌اندازی کنید

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   حالت watch را اجرا کنید که به طور خودکار کد را ترانسپایل می‌کند

    ```sh
    $ pnpm watch
    ```

    برای ساخت پروژه، اجرا کنید:

    ```sh
    $ pnpm build
    ```

-   اطمینان حاصل کنید که تغییرات شما هیچ تستی را خراب نمی‌کند، اجرا کنید:

    ```sh
    $ pnpm test
    ```

این پروژه از [changesets](https://github.com/changesets/changesets) برای ایجاد خودکار تغییرات و انتشارها استفاده می‌کند.

### تست‌کردن

چندین تست باید اجرا شود تا بتوان ماژول را آزمایش کرد. هنگام افزودن یک PR، تمام تست‌ها باید حداقل تست‌های محلی را پاس کنند. هر PR به طور خودکار در Sauce Labs تست می‌شود، به [خط لوله GitHub Actions ما](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml) مراجعه کنید. قبل از تأیید یک PR، مشارکت‌کنندگان اصلی PR را در برابر شبیه‌سازها/شبیه‌سازهای دستگاه واقعی آزمایش خواهند کرد.

#### تست محلی

ابتدا، یک خط مبنای محلی باید ایجاد شود. این کار می‌تواند با موارد زیر انجام شود:

```sh
// With the webdriver protocol
$ pnpm run test.local.init
```

این دستور یک پوشه به نام `localBaseline` ایجاد می‌کند که تمام تصاویر خط مبنا را نگه می‌دارد.

سپس اجرا کنید:

```sh
// With the webdriver protocol
pnpm run test.local.desktop
```

این تمام تست‌ها را روی یک دستگاه محلی روی Chrome اجرا می‌کند.

#### تست اجراکننده Storybook محلی (بتا)

ابتدا، یک خط مبنای محلی باید ایجاد شود. این کار می‌تواند با موارد زیر انجام شود:

```sh
pnpm run test.local.desktop.storybook
```

این تست‌های Storybook را با Chrome در حالت headless در برابر یک مخزن Demo Storybook واقع در https://govuk-react.github.io/govuk-react/ اجرا می‌کند.

برای اجرای تست‌ها با مرورگرهای بیشتر می‌توانید موارد زیر را اجرا کنید

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> اطمینان حاصل کنید که مرورگرهایی که می‌خواهید روی آن‌ها اجرا کنید روی دستگاه محلی شما نصب شده‌اند

#### تست CI با Sauce Labs (برای یک PR ضروری نیست)

دستور زیر برای تست build در GitHub Actions استفاده می‌شود، فقط می‌تواند در آنجا استفاده شود و نه برای توسعه محلی.

```
$ pnpm run test.saucelabs
```

این روی تعداد زیادی پیکربندی تست می‌کند که می‌توان آنها را [اینجا](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts) یافت.
تمام PRها به طور خودکار در برابر Sauce Labs بررسی می‌شوند.

## انتشار

برای انتشار یک نسخه از هر یک از پکیج‌های ذکر شده در بالا، کارهای زیر را انجام دهید:

-   [خط لوله انتشار](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml) را راه‌اندازی کنید
-   یک PR انتشار ایجاد می‌شود، آن را توسط یکی دیگر از اعضای WebdriverIO بررسی و تأیید کنید
-   PR را ادغام کنید
-   [خط لوله انتشار](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml) را دوباره راه‌اندازی کنید
-   یک نسخه جدید باید منتشر شود 🎉

## اعتبارات

`@wdio/visual-testing` از یک مجوز منبع باز از [LambdaTest](https://www.lambdatest.com/) و [Sauce Labs](https://saucelabs.com/) استفاده می‌کند.