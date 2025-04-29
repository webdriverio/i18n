---
id: sauce-service
title: خدمة Sauce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---


خدمة WebdriverIO التي توفر تكاملاً أفضل مع Sauce Labs. يمكن استخدام هذه الخدمة لـ:

- سحابة Sauce Labs للأجهزة الافتراضية (سطح المكتب/المحاكي/محاكي الجهاز)
- سحابة Sauce Labs للأجهزة الحقيقية (iOS و Android)

يمكنها تحديث بيانات الوظيفة التعريفية ('name'* و 'passed' و 'tags' و 'public' و 'build' و 'custom-data') وتشغيل Sauce Connect إذا كان مطلوبًا.

ماذا ستفعل هذه الخدمة أيضًا من أجلك:

- بشكل افتراضي، ستقوم خدمة Sauce بتحديث 'name' الوظيفة عند بدء الوظيفة. هذا سيعطيك خيار تحديث الاسم في أي وقت.
- يمكنك تحديد معلمة `setJobName` وتخصيص اسم الوظيفة وفقًا لقدراتك وخياراتك وعنوان المجموعة
- ستقوم خدمة Sauce أيضًا بدفع مكدس الخطأ للاختبار الفاشل إلى علامة تبويب أوامر Sauce Labs
- ستسمح لك بتكوين وتشغيل [Sauce Connect](https://docs.saucelabs.com/secure-connections/) تلقائيًا
- وستضع نقاط سياق في قائمة الأوامر الخاصة بك لتحديد الأوامر التي تم تنفيذها في أي اختبار

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@wdio/sauce-service` كتبعية تطوير في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/sauce-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted)

## التكوين

لاستخدام الخدمة لسحابة الأجهزة الافتراضية/المحاكي/محاكي الجهاز وسحابة الأجهزة الحقيقية ، تحتاج إلى تعيين `user` و `key` في ملف `wdio.conf.js` الخاص بك. سيستخدم تلقائيًا Sauce Labs لتشغيل اختبارات التكامل الخاصة بك. إذا كنت تقوم بتشغيل اختباراتك على Sauce Labs ، يمكنك تحديد المنطقة التي تريد تشغيل اختباراتك فيها عبر خاصية `region`. العناوين المختصرة المتاحة للمناطق هي `us` (افتراضي) و `eu`. يتم استخدام هذه المناطق لسحابة Sauce Labs VM وسحابة الأجهزة الحقيقية Sauce Labs. إذا لم تقم بتوفير المنطقة، فإن القيمة الافتراضية هي `us`.

إذا كنت تريد أن يقوم WebdriverIO تلقائيًا بإنشاء نفق [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)، فأنت بحاجة إلى تعيين `sauceConnect: true`. إذا كنت ترغب في تغيير مركز البيانات إلى الاتحاد الأوروبي، أضف `region:'eu'` حيث يتم تعيين مركز بيانات الولايات المتحدة كإعداد افتراضي.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // or 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

إذا كنت تريد استخدام نفق Sauce Connect موجود بالفعل، فأنت بحاجة فقط إلى توفير `tunnelName`. إذا كنت تستخدم نفقًا مشتركًا، ولست المستخدم الذي أنشأ النفق، فيجب عليك تحديد مستخدم Sauce Labs الذي أنشأ النفق لاستخدامه في اختبارك. قم بتضمين `tunnelOwner` في القدرات مثل هذا:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## خيارات خدمة Sauce

لترخيص خدمة Sauce Labs، يجب أن يحتوي التكوين الخاص بك على خيار [`user`](https://webdriver.io/docs/options#user) و [`key`](https://webdriver.io/docs/options#key).

### maxErrorStackLength

ستقوم هذه الخدمة تلقائيًا بدفع مكدس الخطأ إلى Sauce Labs عند فشل الاختبار. بشكل افتراضي، سيتم دفع الخطوط الخمسة الأولى فقط، ولكن يمكن تغيير ذلك إذا لزم الأمر. كن على علم بأن المزيد من الخطوط سيؤدي إلى المزيد من استدعاءات WebDriver مما قد يبطئ التنفيذ.

النوع: `number`<br />
القيمة الافتراضية: `5`

### sauceConnect

إذا كانت `true`، فإنها تقوم بتشغيل Sauce Connect وتفتح اتصالاً آمنًا بين جهاز Sauce Labs الافتراضي الذي يقوم بتشغيل اختبارات المتصفح الخاصة بك.

النوع: `Boolean`<br />
القيمة الافتراضية: `false`

### sauceConnectOpts

تطبيق خيارات Sauce Connect (مثل تغيير إعدادات رقم المنفذ أو ملف السجل). انظر [هذه القائمة](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) لمزيد من المعلومات.

ملاحظة: عند تحديد الخيارات يجب إغفال `--`. يمكن أيضًا تحويلها إلى camelCase (مثل `shared-tunnel` أو `sharedTunnel`).

النوع: `Object`<br />
القيمة الافتراضية: `{ }`

### uploadLogs

إذا كانت `true`، فسيقوم هذا الخيار بتحميل جميع ملفات سجل WebdriverIO إلى منصة Sauce Labs لمزيد من الفحص. تأكد من تعيين [`outputDir`](https://webdriver.io/docs/options#outputdir) في تكوين wdio الخاص بك لكتابة السجلات في الملفات، وإلا سيتم توجيه البيانات إلى stdout ولا يمكن تحميلها.

النوع: `Boolean`<br />
القيمة الافتراضية: `true`

### setJobName

يسمح للمستخدمين بتعيين اسم الوظيفة ديناميكيًا بناءً على معلمات العامل مثل تكوين WebdriverIO والقدرات المستخدمة وعنوان المجموعة الأصلي.

النوع: `Function`<br />
القيمة الافتراضية: `(config, capabilities, suiteTitle) => suiteTitle`

----

## تجاوز البيانات الوصفية للاسم المُنشأ

تقوم الخدمة تلقائيًا بإنشاء اسم لكل اختبار من اسم المجموعة واسم المتصفح ومعلومات أخرى.

يمكنك تجاوز هذا عن طريق توفير قيمة لقدرة `name` المطلوبة، ولكن هذا سيكون له تأثير جانبي وهو إعطاء جميع الاختبارات نفس الاسم.

----

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).