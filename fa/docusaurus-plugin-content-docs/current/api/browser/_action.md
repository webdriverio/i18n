---
id: action
title: اکشن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

دستور اکشن یک رابط سطح پایین برای ارائه اقدامات ورودی دستگاه مجازی به مرورگر وب است.

علاوه بر دستورات سطح بالایی مانند `scrollIntoView`، `doubleClick`، API اکشن‌ها کنترل دقیقی بر روی دقیقاً آنچه دستگاه‌های ورودی تعیین شده می‌توانند انجام دهند، فراهم می‌کند. WebdriverIO رابطی برای ۳ نوع منبع ورودی ارائه می‌دهد:

- ورودی کلید برای دستگاه‌های صفحه کلید
- ورودی اشاره‌گر برای موس، قلم یا دستگاه‌های لمسی
- و ورودی چرخ برای دستگاه‌های چرخ اسکرول

هر زنجیره‌ای از دستورات اکشن باید با فراخوانی `perform` تکمیل شود تا مجموعه اکشن‌ها اجرا شود. این باعث می‌شود اکشن‌ها [آزاد شوند](https://w3c.github.io/webdriver/#release-actions) و رویدادها فعال شوند. می‌توانید با ارسال `true` (به عنوان مثال `browser.actions(...).perform(true)`) از این مرحله صرف نظر کنید.

:::info

پشتیبانی از این دستور و اکشن‌های خاص ممکن است بر اساس محیط متفاوت باشد. پیشرفت توسعه را می‌توان در [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned) دنبال کرد.
برای موبایل ممکن است بخواهید از دستورات حرکتی مخصوص Appium در [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch)
و [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands) استفاده کنید.

:::

### منبع ورودی کلید

منبع ورودی کلید، منبع ورودی است که با دستگاه نوع صفحه‌کلید مرتبط است. می‌توان آن را با استفاده از پارامترهای نوع `key` فعال کرد. مثال:

```ts
browser.action('key')
```

این یک شیء `KeyAction` را برمی‌گرداند که از اکشن‌های زیر پشتیبانی می‌کند:

- `down(value: string)`: یک اکشن فشردن کلید ایجاد می‌کند
- `up(value: string)`: یک اکشن رها کردن کلید ایجاد می‌کند
- `pause(ms: number)`: نشان می‌دهد که یک منبع ورودی در یک زمان خاص هیچ کاری انجام نمی‌دهد

#### کاراکترهای خاص

اگر می‌خواهید از کاراکترهای خاص مانند `Control`، `Page Up` یا `Shift` استفاده کنید، مطمئن شوید که شیء 
[`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417) 
را از بسته `webdriverio` به این صورت وارد می‌کنید:

```ts
import { Key } from 'webdriverio'
```

این شیء به شما امکان دسترسی به نمایش یونیکد کاراکتر خاص مورد نظر را می‌دهد.

### منبع ورودی اشاره‌گر

منبع ورودی اشاره‌گر، منبع ورودی است که با دستگاه ورودی نوع اشاره‌گر مرتبط است. نوع آن می‌تواند هنگام فراخوانی دستور `action` مشخص شود، مثال:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" مقدار پیش‌فرض است، همچنین ممکن است: "pen" یا "touch"
})
```

این یک شیء `PointerAction` را برمی‌گرداند که از اکشن‌های زیر پشتیبانی می‌کند:

- `down (button: 'left' | 'middle' | 'right')`: یک اکشن برای فشردن یک کلید ایجاد می‌کند
- `down (params: PointerActionParams)`: یک اکشن برای فشردن یک کلید با پارامترهای دقیق ایجاد می‌کند
- `move (x: number, y: number)`: یک اکشن برای حرکت اشاره‌گر به اندازه `x` و `y` پیکسل از نمای قابل مشاهده ایجاد می‌کند
- `move (params: PointerActionMoveParams)`: یک اکشن برای حرکت اشاره‌گر به اندازه `x` و `y` پیکسل از
  `origin` مشخص شده ایجاد می‌کند. `origin` می‌تواند به عنوان موقعیت فعلی اشاره‌گر (مثلاً "pointer")، نمای قابل مشاهده
  (مثلاً "viewport") یا مرکز یک عنصر خاص تعریف شود.
- `up (button: 'left' | 'middle' | 'right')`: یک اکشن برای رها کردن یک کلید ایجاد می‌کند
- `up (params: PointerActionUpParams)`: یک اکشن برای رها کردن یک کلید با پارامترهای دقیق ایجاد می‌کند
- `cancel()`: اکشنی که ورودی فعلی این اشاره‌گر را لغو می‌کند.
- `pause(ms: number)`: نشان می‌دهد که یک منبع ورودی در یک زمان خاص هیچ کاری انجام نمی‌دهد

می‌توانید اطلاعات دقیق در مورد انواع پارامتر [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35)، [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) و [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19) را در تعریف نوع پروژه پیدا کنید.

### منبع ورودی چرخ

منبع ورودی چرخ، منبع ورودی است که با دستگاه ورودی نوع چرخ مرتبط است.

```ts
browser.action('wheel')
```

این یک شیء `WheelAction` را برمی‌گرداند که از اکشن‌های زیر پشتیبانی می‌کند:

- `scroll (params: ScrollParams)`: صفحه را به مختصات یا مبدأ معینی اسکرول می‌کند
- `pause(ms: number)`: نشان می‌دهد که یک منبع ورودی در یک زمان خاص هیچ کاری انجام نمی‌دهد

می‌توانید اطلاعات دقیق در مورد نوع پارامتر [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) را در تعریف نوع پروژه پیدا کنید.

##### استفاده

```js
browser.action()
```

##### مثال‌ها

```js title="pointer-action.js"
it('drag and drop using pointer action command', async () => {
    const origin = await $('#source')
    const targetOrigin = await $('#target')

    return browser.action('pointer')
        .move({ duration: 0, origin, x: 0, y: 0 })
        .down({ button: 0 }) // left button
        .pause(10)
        .move({ duration: 0, origin: targetOrigin })
        .up({ button: 0 })
        .perform()
});
```

```js title="key-action.js"
import { Key } from 'webdriverio'

it('should emit key events using key action commands', async () => {
    const elem = await $('input')
    await elem.click() // make element active

    await browser.action('key')
        .down('f')
        .down('o')
        .down('o')
        .up('f')
        .up('o')
        .up('o')
        .perform()

    console.log(await elem.getValue()) // returns "foo"

    // copy value out of input element
    await browser.action('key')
        .down(Key.Ctrl).down('c')
        .pause(10)
        .up(Key.Ctrl).up('c')
        .perform()
})
```

```js title="wheel-action.js"
it('should scroll using wheel action commands', async () => {
    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform()
    console.log(await browser.execute(() => window.scrollY)) // returns 500
})
```