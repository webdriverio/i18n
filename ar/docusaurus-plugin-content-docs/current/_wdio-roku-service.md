---
id: wdio-roku-service
title: خدمة روكو
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service هي حزمة طرف ثالث، لمزيد من المعلومات يرجى زيارة [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
تقوم هذه الخدمة بتجاوز العديد من أجزاء WebdriverIO للسماح باستخدامها مع تطبيقات Roku وتوفر إمكانية الوصول إلى [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) للتحكم في جهاز Roku أثناء الاختبار.

## المتطلبات

### روكو
قناة اختبار/channel.zip وجهاز Roku (مع تمكين وضع المطور) على نفس الشبكة مثل جهاز Mac الخاص بك.

### WebdriverIO
هذا ليس منتجًا مستقلاً - يتم استخدامه كملحق إطار عمل WebdriverIO للاختبار (أو خدمة، بلغتهم). قبل استخدام هذا، يجب عليك المرور بإعداد WDIO عن طريق تشغيل `npm init wdio@latest`.

عند المرور بخطوات الإعداد، حتى لا تضطر إلى التنقل عبر جميع الأسئلة/الخيارات، يمكنك اختيار التحديدات التالية أثناء مرحلة التهيئة:
- Roku Testing (ملاحظة: استخدم هذا إذا كان المستودع الخاص بك سيستخدم فقط لاختبار Roku حيث سيصبح الخدمة الافتراضية والوحيدة المثبتة. خلاف ذلك، استخدم E2E Testing حتى تتمكن من تثبيت خدمات متعددة.)
- On my local machine (E2E فقط)
- Web (E2E فقط)
- Chrome (E2E فقط)
- Mocha
- Typescript [الوحدات تعمل مع TS و JS، لذا اختر أيهما]
- autogenerate some test files (Y)
-- الموقع الافتراضي
- page objects (Y)
-- الموقع الافتراضي
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### تكوين Typescript
إذا كنت ترغب في استخدام Typescript لكتابة الاختبارات، فستحتاج إلى التأكد من تعيين الخيارات التالية في ملف tsconfig.json الذي أنشأه Webdriverio.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
يمكنك بعد ذلك استخدام الخدمة عن طريق الاستيراد إلى اختباراتك كما هو موضح أدناه.

### تكوين WDIO
حاليًا، يتم دعم الاختبار فقط لجهاز Roku واحد. مطلوب تحديثات التكوين التالية:
* يجب أن يكون `maxInstances` و `maxInstancesPerCapability` بقيمة 1. لا يتم دعم الاختبار على أجهزة متعددة تلقائيًا وسيؤدي ذلك إلى تكرار الأوامر المرسلة إلى Roku. يجب أن تكون هناك قدرة واحدة فقط.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // أو إذا كنت تريد وضع headless:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* يوصى بزيادة `waitforInterval` و `waitforTimeout`، لأن كل فترة تتضمن تنزيل ملف xml من Roku. للاستفادة أكثر من ميزة `browser.debug()`، يمكنك أيضًا اختيار تمديد مهلة testrunner mocha إلى 5+ دقائق لغرفة التطوير.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //اختياري:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

أنت الآن جاهز لكتابة اختبارك الأول!

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

من المشجع أيضًا استخدام ميزة `browser.debug()` في wdio لإيقاف اختبارك مؤقتًا لأغراض التصحيح وتأليف الاختبار:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // يتوقف الاختبار، ويصبح REPL متاحًا للأوامر

```
إذا كان Chrome ليس في وضع headless، يمكنك رؤية آخر مرة تم فيها استدعاء `openRokuXML()` (على الأرجح من خلال `waitForX` أو `expect`). باستخدام REPL في المحطة الطرفية، يمكنك استخدام أي أوامر `$` صالحة، وبعض الأوامر المخصصة الرئيسية المضافة (`browser.openRokuXML()` و `browser.saveScreenshot('path/to/ss.jpg')`) -- فئة `controller` غير مرتبطة بكائن `browser`، لذلك لا يمكنك استخدامها حاليًا. لحسن الحظ، من المحتمل أنك جالس بجوار Roku ولديك جهاز تحكم عن بعد يمكنك استخدامه للتنقل والاتصال أحيانًا بـ `browser.openRokuXML()` لمعرفة ما حدث لحالة الصفحة! وتذكر أن XML يعمل بشكل أصلي مع xpathing في متصفح chrome نفسه، لذلك يمكنك تقييم/تطوير المحددات الخاصة بك مباشرة في وحدة تحكم chrome أثناء التصحيح.

### .env
انظر ملف `.env.example`. انسخه وأعد تسميته إلى `.env` داخل مشروع WebdriverIO الذي يستخدم هذه الخدمة. من المحتمل أنك ستضعه في .gitignore أيضًا.

* `ROKU_IP` يجب أن يكون عنوان IP لجهاز Roku الخاص بك. ستستخدم الأوامر هذا العنوان للتواصل معه. هذا مطلوب.
* `ROKU_USER` و `ROKU_PW`: بيانات اعتماد تسجيل الدخول مطلوبة لتثبيت الأرشيف، وكذلك لالتقاط لقطات الشاشة.
* `ROKU_APP_PATH` يجب أن يكون المسار المطلق لملف zip لقناة Roku.
* `ROKU_CHANNEL_ID` يجب أن يكون معرف قناة Roku الخاصة بك (عادة ما يكون "dev").
* `DEBUG=wdio-roku-service` سيمكّن رسائل التصحيح. قم بإزالة '#' في بداية السطر إذا كنت تريد تلك الرسائل.

## الوظائف المتغيرة
### المتصفح
* `waitUntil` سيجلب xml من Roku في كل تكرار للتحقق من التغييرات.
* `saveScreenshot` سيقوم بتنزيل لقطة شاشة للشاشة الحالية من Roku. من الجدير بالذكر أن لقطات الشاشة هذه بتنسيق .jpg، بدلاً من .png الذي يستخدمه WebdriverIO عادةً.
* `openRokuXML` سيجلب xml من Roku إذا كنت بحاجة إلى القيام بذلك يدويًا بدلاً من استخدام الانتظارات.

### العناصر
* يتم دعم جميع عمليات الانتظار بنفس طريقة المتصفح. يتم تعيين `waitForClickable` إلى `waitForDisplayed`، و `waitForStable` إلى `waitForExist`.
* لا يتم دعم `click` و `doubleClick` و `moveTo`. يجب عليك التنقل في التطبيق يدويًا.
* `isFocused` سيتحقق من وجود سمة `focused` على العنصر بقيمة صحيحة.
* `isDisplayed` سيتحقق من وجود سمة `bounds` على العنصر، وأن `visible` ليست معينة على false. إذا تم تعيين `withinViewport`، سيتم مقارنة الحدود مع حجم شاشة Roku.
* `getSize` و `getLocation` تأخذ القيم من سمة `bounds`، وترجع 0 للحجم و -Infinity للموضع إذا لم تكن موجودة.

لم يتم تغيير الوظائف الأخرى، لكن العديد منها لا يزال يعمل كما هو متوقع.

### المطابقات
تم تحديث معظم المطابقات لجلب xml أثناء الانتظار. بعضها له وظائف مختلفة قليلاً.
* `toBeDisplayed` و `toBeDisplayedInViewport` و `toBeFocused` و `toBeExisting` و `toBePresent` و `toExist` و `toHaveSize` و `toHaveWidth` و `toHaveHeight` و `toHaveAttribute` كلها تعمل كما هو متوقع، مع مراعاة التغييرات على العنصر.
* `toHaveElementProperty` يتم تعيينه إلى `toHaveAttribute`.
* `toHaveElementClass` يتحقق من سمة `name` للعنصر.
* `toHaveId` يتم تعيينه إلى `toHaveElementClass`.
* `toHaveText` يتحقق من سمة `text` للعنصر.
* `toHaveChildren` يتحقق من سمة `children` للعنصر.
* `toHaveHTML` سيتعامل مع xml كما لو كان HTML، على الرغم من أنه من المحتمل أن لا يكون مفيدًا جدًا.

ما يلي غير مدعوم حاليًا:
* `toBeSelected` - يمكن دعمه قريبًا بعد تحديد كيفية ظهور xml للأزرار المحددة، إذا كان هناك اختلاف.
* `toBeChecked` - يمكن دعمه قريبًا بعد تحديد كيفية ظهور xml لمربعات الاختيار المحددة، إذا كان هناك اختلاف.
* `toHaveComputedLabel` - إذا كان لديك ما يعادله على عناصر Roku الخاصة بك، فتحقق من السمة باستخدام `toHaveAttribute`.
* `toHaveComputedRole` - إذا كان لديك ما يعادله على عناصر Roku الخاصة بك، فتحقق من السمة باستخدام `toHaveAttribute`.
* `toHaveHref` - إذا كان لديك عناوين URL على عناصر Roku الخاصة بك، فتحقق من السمة باستخدام `toHaveAttribute`.
* `toHaveStyle` - عناصر xml ليس لها أنماط.
* `toHaveClipboardText` - هذا غير معروف.
* `toHaveTitle` - العنوان سيكون اسم الملف المؤقت المولد عشوائيًا لـ xml.
* `toHaveUrl` - سيكون عنوان URL هو المسار إلى ملف xml على جهاز الكمبيوتر الخاص بك.

## الاستخدام
### تثبيت القناة

هذا يتطلب أن يكون لقناتك معرف معين.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

تثبيت الأرشيف

يوصى بتخزين المسار في .env، خاصة إذا كان لديك عدة مطورين قد يكون لديهم مواقع و/أو أسماء ملفات مختلفة.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

قناة مثبتة مسبقًا

إذا كنت قد قمت بالفعل بتثبيت القناة بنفسك قبل الاختبار، فيمكنك ببساطة إطلاقها.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // أغلق القناة إذا كانت مفتوحة بالفعل. إذا كانت القناة تدعم الاستئناف الفوري، فهذا سيضعها في الخلفية فقط
    await exitChannel();
    // استخدام معرف القناة 'dev' سيطلق التطبيق الجانبي.
    await launchChannel('dev');
}
```

### الاختبار
يوفر `wdio-roku-service/controller` القدرة على إرسال ضغطات أزرار إلى Roku. `keySequence` هو الأساسي، حيث يرسل عدة ضغطات أزرار متتالية.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// التنقل خلال التطبيق
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// جلب واجهة التطبيق الحالية من Roku وتحميلها في المتصفح
await browser.openRokuXML();
// أو استخدام الانتظارات، التي ستقوم بتحميل XML بشكل متكرر حتى تنتهي المهلة أو تنجح الشرط
await browser.waitUntil(condition);
await element.waitForDisplayed();
// استخدم مطابقات WDIO على XML الخاص بـ roku كما لو كان صفحة ويب
await expect(element).toHaveAttr('focused');
```

يحتوي `wdio-roku-service/controller` أيضًا على وظائف لضغط أو تحرير الأزرار وكذلك كتابة النص في لوحة المفاتيح.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### الروابط العميقة
يوفر `wdio-roku-service/channel` وظائف متعلقة بالقناة. يسمح `inputChannel` بإرسال معلومات عشوائية إلى تطبيقك.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### وظائف أخرى
يوفر `wdio-roku-service/info` وظائف متنوعة، مثل الحصول على أيقونة التطبيق أو العقد اليتيمة.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` هو الواجهة المباشرة مع ECP إذا كنت بحاجة إلى القيام بأي شيء محدد للغاية.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## المشاكل الشائعة
* عناصر Roku لديها نصوصها في سمة 'text'، وليس بين العلامات. عند استخدام المحددات، لن يعمل `$('element=Text')` مع كل عنصر تقريبًا. بدلاً من ذلك، عليك استخدام `$('element[text=Text]')`.

## خارطة طريق الميزات
* سيكون هناك PR مقدم قريبًا يسمح بتثبيت هذه الخدمة أثناء استبيان `npm init wdio@latest`.
* حاليًا يتم تقييم اتصال Socket مع Roku بحيث يمكن إضافة المزيد من الميزات، مثل وسيلة لإيقاظ Roku النائم.
* ميزة (ميزات) وكيل الشبكة التي تسمح بالتفاعل مع نشاط الشبكة.

## الاستفادة من تقارير Allure مع لقطات الشاشة وملفات XML المرفقة

لا يحتوي Allure Reporting على تكوين جاهز لإنشاء لقطات شاشة للتطبيق أو نسخة من كود XML الذي يمثل الحالة الحالية لتطبيق Roku في أي نقطة من تنفيذ الاختبار. يشرح التوثيق التالي كيفية معالجة هذا حتى يتم إنشاء لقطة شاشة للحالة الحالية للتطبيق وإرفاقها بتقرير Allure في كل مرة يكمل فيها اختبار `it` تشغيله. كما يسمح بالحصول على لقطة مصدر من XML تمثل الحالة الحالية لتطبيق Roku في أي وقت يفشل فيه تشغيل اختبار `it`.

للحصول على الوثائق الكاملة حول Allure Reporter، يرجى زيارة وثائق @wdio/allure-reporter https://webdriver.io/docs/allure-reporter/

### اعتماد Utils.js
أضف الكود التالي إلى ملف يسمى `Utils.js`. قد يوجد هذا الملف في مجلد `/helpers` أو ما شابه.
```js
/**
 * يعيد تمثيلًا نصيًا للطابع الزمني 'الآن' بالمللي ثانية منذ عصر النظام.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * يعيد تمثيلًا نصيًا للطابع الزمني 'الآن' باتباع النمط: {YYYY}-{MM}-{DD}_{hour in 24H}-{Minute}-{Second}-{Milliseconds}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * كائن يحتوي على تمثيلات نصية لامتدادات الملفات المحتملة المستخدمة لأغراض إعداد التقارير.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * كائن يحتوي على تمثيلات نصية لأنواع MIME المحتملة المستخدمة لأغراض إعداد التقارير.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * وظيفة لإنشاء اسم ملف مع بادئة محتملة وطابع زمني وأحد الامتدادات المحتملة المقدمة.
 * @param {string} fileExtension استخدم إحدى القيم من كائن FILE_EXTENSIONS المحدد سابقًا.
 * @param {string} [fileNamePrefix] بادئة يتم إلحاقها في بداية اسم الملف إذا تم توفيرها. القيمة الافتراضية هي سلسلة فارغة.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### كود wdio.conf.js
أضف بيانات الاستيراد التالية في ملف `wdio.conf.js`:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // استبدل <Utils.js file path> بالمسار النسبي الفعلي لملف Utils.js

```

حدد الخطاف التالي `afterTest` في ملف `wdio.conf.js`. إذا كان لديك بالفعل كود يعمل في هذا الخطاف، أضف الكود المقدم أدناه إليه.
```js
afterTest: async function (test, context, result) {
        // منطق حفظ وإرفاق لقطة الشاشة بغض النظر عن نتيجة الاختبار.
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

        // منطق إرفاق XML عند فشل الاختبار.
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

### السلوك المتوقع
مع وجود هذا الكود في تكوين المشروع، فإن التوقع هو أنه في كل مرة يتم فيها تشغيل اختبار `it`، بغض النظر عن نتيجة الاختبار، سيتم التقاط لقطة شاشة في نهاية التشغيل وإرفاقها بقسمها ذي الصلة في تقرير Allure. في الحالة المحددة لفشل الاختبار، سيتم أيضًا إرفاق لقطة مصدر لحالة التطبيق بتنسيق XML بقسم الاختبار في تقرير Allure.

### ملاحظات
* تدعم تقارير Allure الجاهزة لقطات الشاشة بتنسيق `.png`. تدعم تجاوزات الطريقة في هذه الخدمة الصورة بتنسيق `.jpg` بدلاً من ذلك.
* يمكن تصفح مرفقات XML في تقرير Allure نفسه أو فتحها في علامة تبويب منفصلة في متصفح.