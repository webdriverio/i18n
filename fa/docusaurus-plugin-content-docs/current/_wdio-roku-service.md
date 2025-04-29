---
id: wdio-roku-service
title: سرویس روکو
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---


> wdio-roku-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service) مراجعه کنید
این سرویس بسیاری از بخش‌های WebdriverIO را تغییر می‌دهد تا با برنامه‌های روکو قابل استفاده باشند و دسترسی به [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) را برای کنترل روکو در حین تست فراهم می‌کند.

## پیش‌نیازها

### روکو
یک کانال آزمایشی/channel.zip و یک دستگاه روکو (با حالت توسعه‌دهنده فعال) در همان شبکه‌ای که مک شما قرار دارد.

### WebdriverIO
این یک محصول مستقل نیست -- به عنوان یک پلاگین چارچوب تست WebdriverIO (یا سرویس، در اصطلاح آنها) استفاده می‌شود. قبل از استفاده از آن، باید مراحل راه‌اندازی WDIO را با اجرای `npm init wdio@latest` انجام دهید.

هنگام گذراندن مراحل راه‌اندازی، برای اینکه مجبور نباشید از میان همه سوالات/گزینه‌ها عبور کنید، می‌توانید فقط انتخاب‌های زیر را در مرحله راه‌اندازی انتخاب کنید:
- Roku Testing (توجه: اگر مخزن شما فقط برای تست روکو استفاده می‌شود از این گزینه استفاده کنید زیرا به صورت پیش‌فرض و تنها سرویس نصب شده تبدیل می‌شود. در غیر این صورت، از E2E Testing استفاده کنید تا بتوانید چندین سرویس نصب کنید.) 
- On my local machine (فقط E2E)
- Web (فقط E2E)
- Chrome (فقط E2E)
- Mocha
- Typescript [ماژول‌ها هم برای TS و هم برای JS کار می‌کنند، پس هر کدام را انتخاب کنید]
- autogenerate some test files (Y)
-- مکان پیش‌فرض
- page objects (Y)
-- مکان پیش‌فرض
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### پیکربندی Typescript
اگر می‌خواهید از Typescript برای نوشتن تست‌ها استفاده کنید، باید اطمینان حاصل کنید که گزینه‌های زیر در فایل tsconfig.json که توسط Webdriverio ایجاد شده است، تنظیم شده‌اند.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
سپس می‌توانید از سرویس با وارد کردن آن در تست‌های خود همانطور که در زیر توضیح داده شده است، استفاده کنید.

### پیکربندی WDIO
در حال حاضر، تست فقط برای یک دستگاه روکو پشتیبانی می‌شود. به‌روزرسانی‌های پیکربندی زیر مورد نیاز است:
* مقادیر `maxInstances` و `maxInstancesPerCapability` باید 1 باشند. تست بر روی چندین دستگاه به طور خودکار پشتیبانی نمی‌شود و منجر به ارسال فرمان‌های تکراری به روکو می‌شود. باید فقط یک قابلیت وجود داشته باشد. 
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // or if you want headless mode:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* توصیه می‌شود `waitforInterval` و `waitforTimeout` را افزایش دهید، زیرا هر فاصله شامل دانلود xml از روکو است. برای بهره‌برداری بیشتر از ویژگی `browser.debug()`، ممکن است بخواهید زمان اجرای تست mocha را به ۵+ دقیقه برای فضای توسعه افزایش دهید.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //optional:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

شما آماده نوشتن اولین تست خود هستید!

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

همچنین توصیه می‌شود که از ویژگی `browser.debug()` در wdio برای توقف تست خود برای اشکال‌زدایی و نوشتن تست استفاده کنید:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // the test halts, a REPL becomes available for commands

```
اگر کروم در حالت headless نباشد، می‌توانید آخرین باری که `openRokuXML()` فراخوانی شده است (احتمالاً از طریق `waitForX` یا `expect`) را ببینید. با استفاده از REPL در ترمینال خود، می‌توانید از هر فرمان معتبر `$` و چند فرمان سفارشی کلیدی اضافه شده (`browser.openRokuXML()` و `browser.saveScreenshot('path/to/ss.jpg')`) استفاده کنید -- کلاس `controller` به شیء `browser` متصل نیست، بنابراین در حال حاضر نمی‌توانید از آنها استفاده کنید. خوشبختانه، احتمالاً شما کنار روکو نشسته‌اید و کنترل از راه دوری دارید که می‌توانید از آن برای هدایت و گاهی اوقات فراخوانی `browser.openRokuXML()` استفاده کنید تا ببینید چه اتفاقی برای وضعیت صفحه افتاده است! و به یاد داشته باشید که XML به طور ذاتی با xpathing در خود مرورگر کروم کار می‌کند، بنابراین می‌توانید انتخابگرهای خود را مستقیماً در کنسول کروم در حین اشکال‌زدایی ارزیابی/توسعه دهید.

### .env
به فایل `.env.example` نگاه کنید. آن را کپی کرده و در پروژه WebdriverIO خود که از این سرویس استفاده می‌کند به `.env` تغییر نام دهید. احتمالاً می‌خواهید آن را در .gitignore خود نیز قرار دهید.

* `ROKU_IP` باید IP روکوی شما باشد. دستورات از این IP برای ارتباط با آن استفاده می‌کنند. این مورد نیاز است.
* `ROKU_USER` و `ROKU_PW`: اطلاعات ورود به سیستم برای نصب یک آرشیو و همچنین برای گرفتن عکس از صفحه نمایش مورد نیاز است.
* `ROKU_APP_PATH` باید مسیر مطلق فایل zip کانال روکو باشد.
* `ROKU_CHANNEL_ID` باید شناسه کانال روکوی شما باشد (این معمولاً "dev" است).
* `DEBUG=wdio-roku-service` پیام‌های اشکال‌زدایی را فعال می‌کند. اگر آنها را می‌خواهید، علامت '#' را از ابتدای خط حذف کنید.

## توابع تغییر یافته
### مرورگر
* `waitUntil` در هر تکرار xml را از روکو دریافت می‌کند تا تغییرات را بررسی کند.
* `saveScreenshot` یک عکس از صفحه فعلی از روکو دانلود می‌کند. قابل توجه است که این عکس‌ها در قالب .jpg هستند، نه .png که WebdriverIO معمولاً استفاده می‌کند.
* `openRokuXML` xml را از روکو دریافت می‌کند اگر نیاز دارید آن را به صورت دستی به جای استفاده از انتظارها انجام دهید.

### عناصر
* تمام انتظارها به همان روش مرورگر پشتیبانی می‌شوند. `waitForClickable` به `waitForDisplayed` نگاشت می‌شود، و `waitForStable` به `waitForExist` نگاشت می‌شود.
* `click`، `doubleClick`، و `moveTo` پشتیبانی نمی‌شوند. باید به صورت دستی در برنامه حرکت کنید.
* `isFocused` یک ویژگی `focused` را در عنصر بررسی می‌کند که باید درست باشد.
* `isDisplayed` یک ویژگی `bounds` را در عنصر بررسی می‌کند، و اینکه `visible` به false تنظیم نشده باشد. اگر `withinViewport` تنظیم شده باشد، مرزها با اندازه صفحه روکو مقایسه می‌شوند.
* `getSize` و `getLocation` مقادیر را از ویژگی `bounds` می‌گیرند، در صورت عدم وجود برای اندازه 0 و برای موقعیت -Infinity را برمی‌گردانند.

توابع دیگر تغییر نکرده‌اند، اما بسیاری از آنها همچنان طبق انتظار کار می‌کنند.

### تطبیق‌دهنده‌ها
اکثر تطبیق‌دهنده‌ها به‌روزرسانی شده‌اند تا هنگام انتظار، xml را دریافت کنند. برخی از آنها عملکرد کمی متفاوت دارند.
* `toBeDisplayed`، `toBeDisplayedInViewport`، `toBeFocused`، `toBeExisting`، `toBePresent`، `toExist`، `toHaveSize`، `toHaveWidth`، `toHaveHeight`، و `toHaveAttribute` همه طبق انتظار کار می‌کنند، با تغییرات به عنصر در نظر گرفته شده.
* `toHaveElementProperty` به `toHaveAttribute` نگاشت می‌شود.
* `toHaveElementClass` ویژگی `name` عنصر را بررسی می‌کند.
* `toHaveId` به `toHaveElementClass` نگاشت می‌شود.
* `toHaveText` ویژگی `text` عنصر را بررسی می‌کند.
* `toHaveChildren` ویژگی `children` عنصر را بررسی می‌کند.
* `toHaveHTML` با xml مانند HTML رفتار می‌کند، اگرچه احتمالاً خیلی مفید نیست.

موارد زیر در حال حاضر پشتیبانی نمی‌شوند:
* `toBeSelected` - ممکن است به زودی پس از تعیین اینکه xml برای دکمه‌های انتخاب شده چگونه به نظر می‌رسد، اگر تفاوتی وجود داشته باشد، پشتیبانی شود.
* `toBeChecked` - ممکن است به زودی پس از تعیین اینکه xml برای چک باکس‌های انتخاب شده چگونه به نظر می‌رسد، اگر تفاوتی وجود داشته باشد، پشتیبانی شود.
* `toHaveComputedLabel` - اگر معادلی از این را در عناصر روکوی خود دارید، ویژگی را با `toHaveAttribute` بررسی کنید.
* `toHaveComputedRole` - اگر معادلی از این را در عناصر روکوی خود دارید، ویژگی را با `toHaveAttribute` بررسی کنید.
* `toHaveHref` - اگر URLهایی در عناصر روکوی خود دارید، ویژگی را با `toHaveAttribute` بررسی کنید.
* `toHaveStyle` - عناصر xml سبک ندارند.
* `toHaveClipboardText` - این معلوم نیست.
* `toHaveTitle` - عنوان نام فایل موقت تولید شده تصادفی xml خواهد بود.
* `toHaveUrl` - URL مسیر به فایل xml در کامپیوتر شما خواهد بود.

## استفاده
### نصب کانال

این نیاز به کانال شما دارد که یک شناسه اختصاص داده شده باشد.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

نصب آرشیو

توصیه می‌شود مسیر را در .env ذخیره کنید، به خصوص اگر توسعه‌دهندگان متعددی دارید که ممکن است مکان‌ها و/یا نام‌های فایل متفاوتی داشته باشند.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

کانال از پیش نصب شده

اگر کانال را قبل از تست خودتان نصب کرده‌اید، می‌توانید به سادگی آن را اجرا کنید.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Close the channel if it's already open. If the channel supports instant resume, this will merely background it
    await exitChannel();
    // Using the channel ID of 'dev' will launch the sideloaded application.
    await launchChannel('dev');
}
```

### تست
`wdio-roku-service/controller` توانایی ارسال فشار دکمه به روکو را فراهم می‌کند. `keySequence` اصلی است، ارسال چندین فشار دکمه به ترتیب.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Navigate through the app
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Fetch the current app UI from the Roku and load it into the browser
await browser.openRokuXML();
// Or, use waits, which will repeatedly load the XML until it times out or the condition passes
await browser.waitUntil(condition);
await element.waitForDisplayed();
// use WDIO matchers on the roku XML as if it was a webpage
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` همچنین توابعی برای نگه داشتن یا رها کردن دکمه‌ها و همچنین تایپ متن در صفحه کلید دارد.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### پیوند عمیق
`wdio-roku-service/channel` عملکرد مرتبط با کانال را فراهم می‌کند. `inputChannel` به شما اجازه می‌دهد اطلاعات دلخواه را به برنامه خود ارسال کنید.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### توابع دیگر
`wdio-roku-service/info` عملکرد متفرقه را فراهم می‌کند، مانند دریافت آیکون برنامه یا گره‌های یتیم.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` رابط مستقیم با ECP است اگر به انجام کار بسیار خاصی نیاز دارید.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## مشکلات رایج
* عناصر روکو متن خود را در یک ویژگی 'text' دارند، نه بین تگ‌های خود. هنگام انجام انتخابگرها، انجام `$('element=Text')` برای تقریباً هر عنصر کار نمی‌کند. در عوض، باید `$('element[text=Text]')` را انجام دهید.

## نقشه راه ویژگی
* به زودی یک PR ارسال می‌شود که اجازه می‌دهد این سرویس در طول پرسشنامه `npm init wdio@latest` نصب شود.
* در حال حاضر در حال ارزیابی ارتباط Socket با روکو هستیم به گونه‌ای که ویژگی‌های بیشتری می‌توانند ابزارسازی شوند، مانند وسیله‌ای برای بیدار کردن یک روکوی خواب.
* ویژگی(های) پروکسی شبکه که اجازه می‌دهد از فعالیت شبکه استفاده شود.

## استفاده از گزارش‌دهی Allure با پیوست‌های عکس و فایل‌های XML

به طور پیش‌فرض، گزارش‌دهی Allure پیکربندی‌ای برای تولید عکس‌های برنامه یا یک کپی از کد XML نماینده وضعیت فعلی برنامه روکو در هر نقطه از اجرای تست ندارد. مستنداتی که در ادامه می‌آید توضیح می‌دهد که چگونه این مشکل را برطرف کنیم به طوری که یک عکس از وضعیت فعلی برنامه تولید شود و به گزارش Allure پیوست شود هر بار که یک تست `it` اجرای خود را به پایان می‌رساند. همچنین به شما امکان می‌دهد یک نسخه از منبع XML نماینده وضعیت فعلی برنامه روکو را هر زمان که اجرای یک تست `it` شکست می‌خورد، به دست آورید.

برای مستندات کامل در مورد گزارشگر Allure، لطفاً به مستندات @wdio/allure-reporter در https://webdriver.io/docs/allure-reporter/ مراجعه کنید

### وابستگی Utils.js
کد زیر را به فایلی به نام `Utils.js` اضافه کنید. این فایل ممکن است در پوشه `/helpers` شما یا مشابه آن قرار گیرد.
```js
/**
 * Returns a string representation of the 'now' timestamp in milliseconds for the epoch.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Returns a string representation of the 'now' timestamp following the pattern: {YYYY}-{MM}-{DD}_{hour in 24H}-{Minute}-{Second}-{Milliseconds}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * An object containing the string representations of possible file extensions used for reporting purposes.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * An object containing the string representations of possible MIME types used for reporting purposes.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * A function to generate a filename with a possible prefix, a timestamp and one of the possible extensions provided.
 * @param {string} fileExtension Use one of the values from the FILE_EXTENSIONS object defined previously.
 * @param {string} [fileNamePrefix] A prefix to be appended at the beginning of the filename if provided.  Defaults to an empty string.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### کد wdio.conf.js
عبارت‌های import زیر را به فایل `wdio.conf.js` اضافه کنید:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Replace <Utils.js file path> with actual relative path to file Utils.js

```

قلاب `afterTest` زیر را در فایل `wdio.conf.js` تعریف کنید. اگر قبلاً کدی در این قلاب دارید، کد زیر را به آن اضافه کنید.
```js
afterTest: async function (test, context, result) {
        // Screenshot saving and attaching logic regardless of test outcome.
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // XML attaching logic on test failure.
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### رفتار مورد انتظار
با این کد در پیکربندی پروژه، انتظار می‌رود که هر بار که یک تست `it` اجرا می‌شود، صرف نظر از نتیجه تست، در پایان اجرا یک عکس گرفته شود و به بخش مربوطه در گزارش Allure پیوست شود. در صورت شکست خاص تست، یک نسخه از منبع وضعیت برنامه در قالب XML نیز به بخش تست در گزارش Allure پیوست می‌شود.

### نکات
* به طور پیش‌فرض گزارش‌های Allure از عکس‌ها در قالب `.png` پشتیبانی می‌کنند. لغو روش‌ها در این سرویس از تصویر در قالب `.jpg` پشتیبانی می‌کنند.
* پیوست‌های XML ممکن است در خود گزارش Allure مرور شوند یا در یک تب جداگانه در مرورگر باز شوند.