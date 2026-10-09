---
id: visual-testing
title: الاختبار المرئي
description: "قارن لقطات الشاشة للشاشات أو العناصر أو الصفحات الكاملة مع الصور المرجعية باستخدام @wdio/visual-service، بما في ذلك التثبيت والاستخدام."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## ماذا يمكنه أن يفعل؟

يوفر WebdriverIO مقارنات للصور على الشاشات أو العناصر أو الصفحة الكاملة لـ

-   🖥️ متصفحات سطح المكتب (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 متصفحات الأجهزة المحمولة / الأجهزة اللوحية (Chrome على محاكيات Android / Safari على محاكيات iOS / المحاكيات / الأجهزة الحقيقية) عبر Appium
-   📱 التطبيقات الأصلية (محاكيات Android / محاكيات iOS / الأجهزة الحقيقية) عبر Appium (🌟 **جديد** 🌟)
-   📳 التطبيقات الهجينة عبر Appium

من خلال [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) وهي خدمة WebdriverIO خفيفة الوزن.

يتيح لك هذا:

-   حفظ أو مقارنة **الشاشات/العناصر/الصفحة الكاملة** مع صورة مرجعية (baseline)
-   **إنشاء صورة مرجعية** تلقائيًا عند عدم وجود صورة مرجعية
-   **حجب مناطق مخصصة** وحتى **الاستبعاد التلقائي** لشريط الحالة و/أو أشرطة الأدوات (للأجهزة المحمولة فقط) أثناء المقارنة
-   زيادة أبعاد لقطات شاشة العناصر
-   **إخفاء النص** أثناء مقارنة مواقع الويب من أجل:
    -   **تحسين الاستقرار** ومنع عدم الثبات الناتج عن عرض الخطوط
    -   التركيز فقط على **تخطيط** الموقع
-   استخدام **طرق مقارنة مختلفة** ومجموعة من **المطابقات الإضافية** (matchers) لاختبارات أكثر قابلية للقراءة
-   التحقق من كيفية **دعم موقعك للتنقل باستخدام مفتاح Tab في لوحة المفاتيح)**، انظر أيضًا [التنقل عبر موقع ويب باستخدام Tab](#tabbing-through-a-website)
-   والمزيد، راجع خيارات [الخدمة](./visual-testing/service-options) و[الطريقة](./visual-testing/method-options)

الخدمة هي وحدة خفيفة الوزن لاسترداد البيانات ولقطات الشاشة اللازمة لجميع المتصفحات/الأجهزة. تأتي قوة المقارنة من [Pixelmatch](https://github.com/mapbox/pixelmatch)، وهي مكتبة سريعة ودقيقة لمقارنة الصور إدراكيًا باستخدام فضاء الألوان YIQ. تتم معالجة الصور باستخدام [fast-png](https://github.com/image-js/fast-png)، وهو برنامج ترميز PNG بدون أي اعتماديات أصلية.

:::info ملاحظة للتطبيقات الأصلية/الهجينة
يمكن استخدام الطرق `saveScreen` و`saveElement` و`checkScreen` و`checkElement` والمطابقات `toMatchScreenSnapshot` و`toMatchElementSnapshot` للتطبيقات الأصلية/السياق الأصلي.

يرجى استخدام الخاصية `isHybridApp:true` في إعدادات الخدمة عندما تريد استخدامها للتطبيقات الهجينة.
:::

:::caution هل تقوم بالترقية من v9 (أو أقل)؟

غيّر الإصدار **v10** من `@wdio/visual-service` محرك المقارنة من **ResembleJS** إلى **[Pixelmatch](https://github.com/mapbox/pixelmatch)**. يستخدم Pixelmatch نموذج ألوان إدراكي (YIQ) بدلاً من RGB الخام، لذا ستختلف نسب عدم التطابق عن v9. هذا يعني:

-   **لا يحتاج كود الاختبار الخاص بك إلى التغيير.** جميع أسماء الطرق وأسماء الخيارات والمطابقات متطابقة.
-   **قد تحتاج صورك المرجعية إلى التحديث.** بعد الترقية، شغّل مجموعة اختباراتك وراجع أي اختلافات مرئية. يمكنك تحديث الصور المرجعية الفاشلة بشكل فردي باستخدام `--update-visual-baseline`، أو حذف مجلد الصور المرجعية بالكامل والسماح لـ `autoSaveBaseline` بإعادة إنشائه من البداية. راجع [الأسئلة الشائعة](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) للحصول على التفاصيل.

:::

## التثبيت

أسهل طريقة هي إبقاء `@wdio/visual-service` كاعتمادية تطوير (dev-dependency) في ملف `package.json` الخاص بك، عبر:

```sh
npm install --save-dev @wdio/visual-service
```

## الاستخدام

يمكن استخدام `@wdio/visual-service` كخدمة عادية. يمكنك إعدادها في ملف التكوين الخاص بك كما يلي:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // بعض الخيارات، راجع الوثائق للمزيد
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... المزيد من الخيارات
            },
        ],
    ],
    // ...
};
```

يمكن العثور على المزيد من خيارات الخدمة [هنا](/docs/visual-testing/service-options).

بمجرد إعدادها في تكوين WebdriverIO الخاص بك، يمكنك المضي قدمًا وإضافة تأكيدات مرئية إلى [اختباراتك](/docs/visual-testing/writing-tests).

### القدرات (Capabilities)
لاستخدام وحدة الاختبار المرئي، **لا تحتاج إلى إضافة أي خيارات إضافية إلى القدرات الخاصة بك**. ومع ذلك، في بعض الحالات، قد ترغب في إضافة بيانات وصفية إضافية إلى اختباراتك المرئية، مثل `logName`.

يتيح لك `logName` تعيين اسم مخصص لكل قدرة، والذي يمكن بعد ذلك تضمينه في أسماء ملفات الصور. هذا مفيد بشكل خاص للتمييز بين لقطات الشاشة الملتقطة عبر متصفحات أو أجهزة أو تكوينات مختلفة.

لتمكين ذلك، يمكنك تعريف `logName` في قسم `capabilities` والتأكد من أن خيار `formatImageName` في خدمة الاختبار المرئي يشير إليه. إليك كيفية إعداده:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // اسم سجل مخصص لـ Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // اسم سجل مخصص لـ Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // بعض الخيارات، راجع الوثائق للمزيد
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // سيستخدم التنسيق أدناه `logName` من القدرات
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... المزيد من الخيارات
            },
        ],
    ],
    // ...
};
```

#### كيف يعمل
1. إعداد `logName`:

    - في قسم `capabilities`، عيّن `logName` فريدًا لكل متصفح أو جهاز. على سبيل المثال، يحدد `chrome-mac-15` الاختبارات التي تعمل على Chrome على نظام macOS الإصدار 15.

2. تسمية الصور المخصصة:

    - يدمج خيار `formatImageName` قيمة `logName` في أسماء ملفات لقطات الشاشة. على سبيل المثال، إذا كان `tag` هو homepage وكانت الدقة `1920x1080`، فقد يبدو اسم الملف الناتج كما يلي:

        `homepage-chrome-mac-15-1920x1080.png`

3. فوائد التسمية المخصصة:

    - يصبح التمييز بين لقطات الشاشة من متصفحات أو أجهزة مختلفة أسهل بكثير، خاصة عند إدارة الصور المرجعية وتصحيح الاختلافات.

4. ملاحظة حول القيم الافتراضية:

    -إذا لم يتم تعيين `logName` في القدرات، فسيعرضه خيار `formatImageName` كسلسلة فارغة في أسماء الملفات (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

ندعم أيضًا [multi-remote](https://webdriver.io/docs/multiremote/). لكي يعمل هذا بشكل صحيح، تأكد من إضافة `wdio-ics:options` إلى
القدرات الخاصة بك كما ترى أدناه. سيضمن هذا أن يكون لكل لقطة شاشة اسمها الفريد.

لن تختلف [كتابة اختباراتك](/docs/visual-testing/writing-tests) بأي شكل مقارنة باستخدام [مشغل الاختبارات](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // هذا!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // هذا!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### التشغيل برمجيًا

إليك مثال بسيط على كيفية استخدام `@wdio/visual-service` عبر خيارات `remote`:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "ابدأ" الخدمة لإضافة الأوامر المخصصة إلى `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// أو استخدم هذا لحفظ لقطة شاشة فقط
await browser.saveFullPageScreen("examplePaged", {});

// أو استخدم هذا للتحقق. لا حاجة للجمع بين الطريقتين، راجع الأسئلة الشائعة
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### التنقل عبر موقع ويب باستخدام Tab

يمكنك التحقق مما إذا كان موقع الويب قابلاً للوصول باستخدام مفتاح <kbd>TAB</kbd> في لوحة المفاتيح. لطالما كان اختبار هذا الجزء من إمكانية الوصول مهمة (يدوية) تستغرق وقتًا طويلاً ومن الصعب جدًا القيام بها عبر الأتمتة.
باستخدام الطريقتين `saveTabbablePage` و`checkTabbablePage`، يمكنك الآن رسم خطوط ونقاط على موقعك للتحقق من ترتيب التنقل بمفتاح Tab.

انتبه إلى أن هذا مفيد فقط لمتصفحات سطح المكتب و**ليس\*\*** للأجهزة المحمولة. تدعم جميع متصفحات سطح المكتب هذه الميزة.

:::note

هذا العمل مستوحى من منشور مدونة [Viv Richards](https://github.com/vivrichards600) حول ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

تعتمد طريقة اختيار العناصر القابلة للتنقل بمفتاح Tab على وحدة [tabbable](https://github.com/davidtheclark/tabbable). إذا كانت هناك أي مشكلات تتعلق بالتنقل بمفتاح Tab، يرجى مراجعة [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) وخاصة قسم [المزيد من ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)التفاصيل.

:::

#### كيف يعمل

ستنشئ كلتا الطريقتين عنصر `canvas` على موقعك وترسم خطوطًا ونقاطًا لتوضح لك إلى أين سينتقل مفتاح TAB إذا استخدمه المستخدم النهائي. بعد ذلك، ستنشئ لقطة شاشة للصفحة الكاملة لتعطيك نظرة عامة جيدة على التدفق.

:::important

**استخدم `saveTabbablePage` فقط عندما تحتاج إلى إنشاء لقطة شاشة و لا تريد مقارنتها **مع صورة **مرجعية**.\*\*\*\*

:::

عندما تريد مقارنة تدفق التنقل بمفتاح Tab مع صورة مرجعية، يمكنك استخدام طريقة `checkTabbablePage`. **لا** تحتاج إلى استخدام الطريقتين معًا. إذا كانت هناك صورة مرجعية تم إنشاؤها بالفعل، وهو ما يمكن القيام به تلقائيًا عن طريق تمرير `autoSaveBaseline: true` عند إنشاء الخدمة،
فستقوم `checkTabbablePage` أولاً بإنشاء الصورة _الفعلية_ ثم مقارنتها مع الصورة المرجعية.

##### الخيارات

تستخدم كلتا الطريقتين نفس خيارات `saveFullPageScreen` أو `compareFullPageScreen`.

#### مثال

هذا مثال على كيفية عمل التنقل بمفتاح Tab على [موقع الاختبار التجريبي](https://guinea-pig.webdriver.io/image-compare.html) الخاص بنا:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### التحديث التلقائي للقطات المرئية الفاشلة

حدّث الصور المرجعية من خلال سطر الأوامر عن طريق إضافة الوسيط `--update-visual-baseline`. سيؤدي هذا إلى

-   نسخ لقطة الشاشة الفعلية الملتقطة تلقائيًا ووضعها في مجلد الصور المرجعية
-   إذا كانت هناك اختلافات، فسيسمح للاختبار بالنجاح لأن الصورة المرجعية قد تم تحديثها

**الاستخدام:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

عند التشغيل في وضع السجلات info/debug سترى السجلات التالية مضافة

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## دعم Typescript

تتضمن هذه الوحدة دعم TypeScript، مما يتيح لك الاستفادة من الإكمال التلقائي وأمان الأنواع وتجربة مطور محسّنة عند استخدام خدمة الاختبار المرئي.

### الخطوة 1: إضافة تعريفات الأنواع
لضمان تعرّف TypeScript على أنواع الوحدة، أضف الإدخال التالي إلى حقل types في ملف tsconfig.json الخاص بك:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### الخطوة 2: تمكين أمان الأنواع لخيارات الخدمة
لفرض التحقق من الأنواع على خيارات الخدمة، حدّث تكوين WebdriverIO الخاص بك:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// استيراد تعريف النوع
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // خيارات الخدمة
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // يضمن أمان الأنواع
        ],
    ],
    // ...
};
```

## متطلبات النظام

### الإصدار 10 وما فوق (الحالي)

بالنسبة للإصدار 10 وما فوق، لا تحتوي هذه الوحدة على أي اعتماديات نظام إضافية تتجاوز [متطلبات المشروع](/docs/gettingstarted#system-requirements) العامة. تستخدم [Pixelmatch](https://github.com/mapbox/pixelmatch) لمقارنة الصور إدراكيًا و[fast-png](https://github.com/image-js/fast-png) لترميز/فك ترميز الصور. كلاهما مكتوب بلغة JavaScript بالكامل بدون أي اعتماديات أصلية.

### الإصدارات من 5 إلى 9 (القديمة)

استخدمت الإصدارات من 5 إلى 9 مكتبة [Jimp](https://github.com/jimp-dev/jimp)، وهي مكتبة لمعالجة الصور لـ Node مكتوبة بالكامل بلغة JavaScript، بدون أي اعتماديات أصلية. لم تكن هناك حاجة لأي اعتماديات نظام إضافية.

### الإصدار 4 وما دون

بالنسبة للإصدار 4 وما دون، تعتمد هذه الوحدة على [Canvas](https://github.com/Automattic/node-canvas)، وهو تطبيق لـ canvas في Node.js. يعتمد Canvas على [Cairo](https://cairographics.org/).

#### تفاصيل التثبيت

افتراضيًا، سيتم تنزيل الملفات الثنائية لأنظمة macOS وLinux وWindows أثناء تنفيذ `npm install` لمشروعك. إذا لم يكن لديك نظام تشغيل أو بنية معالج مدعومة، فسيتم تجميع الوحدة على نظامك. يتطلب هذا عدة اعتماديات، بما في ذلك Cairo وPango.

للحصول على معلومات تفصيلية حول التثبيت، راجع [ويكي node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). فيما يلي تعليمات التثبيت في سطر واحد لأنظمة التشغيل الشائعة. لاحظ أن `libgif/giflib` و`librsvg` و`libjpeg` اختيارية ومطلوبة فقط لدعم GIF وSVG وJPEG على التوالي. يلزم وجود Cairo v1.10.0 أو أحدث.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     باستخدام [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** إذا قمت مؤخرًا بالتحديث إلى Mac OS X v10.11+ وتواجه مشكلة عند التجميع، فقم بتشغيل الأمر التالي: `xcode-select --install`. اقرأ المزيد عن المشكلة [على Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    إذا كان لديك Xcode 10.0 أو أحدث مثبتًا، فللبناء من المصدر تحتاج إلى NPM 6.4.1 أو أحدث.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    راجع [الويكي](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    راجع [الويكي](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>