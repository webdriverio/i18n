---
id: repl
title: واجهة REPL
---

مع الإصدار `v4.5.0`، قدم WebdriverIO واجهة [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) التي تساعدك ليس فقط على تعلم واجهة برمجة التطبيقات الخاصة بالإطار، ولكن أيضًا على تصحيح واستكشاف اختباراتك. يمكن استخدامها بطرق متعددة.

أولاً يمكنك استخدامها كأمر CLI عن طريق تثبيت `npm install -g @wdio/cli` وإطلاق جلسة WebDriver من سطر الأوامر، على سبيل المثال:

```sh
wdio repl chrome
```

هذا سيفتح متصفح Chrome يمكنك التحكم به باستخدام واجهة REPL. تأكد من تشغيل برنامج تشغيل المتصفح على المنفذ `4444` لبدء الجلسة. إذا كان لديك حساب [Sauce Labs](https://saucelabs.com) (أو مزود سحابي آخر)، يمكنك أيضًا تشغيل المتصفح مباشرة على سطر الأوامر في السحابة عبر:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

إذا كان برنامج التشغيل يعمل على منفذ مختلف مثل: 9515، يمكن تمريره مع وسيطة سطر الأوامر --port أو اختصارها -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

يمكن أيضًا تشغيل Repl باستخدام إمكانيات من ملف تكوين webdriverIO. Wdio يدعم كائن الإمكانيات؛ أو قائمة إمكانيات multiremote أو كائن.

إذا كان ملف التكوين يستخدم كائن إمكانيات، فقط قم بتمرير المسار إلى ملف التكوين، وإلا إذا كانت إمكانية multiremote، فحدد أي إمكانية للاستخدام من القائمة أو multiremote باستخدام وسيطة موضعية. ملاحظة: بالنسبة للقائمة نستخدم الفهرس الذي يبدأ من الصفر.

### مثال

WebdriverIO مع مصفوفة إمكانيات:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO مع كائن إمكانية [multiremote](https://webdriver.io/docs/multiremote/):

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

أو إذا كنت ترغب في تشغيل اختبارات الجوال المحلية باستخدام Appium:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

هذا سيفتح جلسة Chrome/Safari على الجهاز/المحاكي المتصل. تأكد من تشغيل Appium على المنفذ `4444` لبدء الجلسة.

```sh
wdio repl './path/to/your_app.apk'
```

هذا سيفتح جلسة التطبيق على الجهاز/المحاكي المتصل. تأكد من تشغيل Appium على المنفذ `4444` لبدء الجلسة.

يمكن تمرير إمكانيات لجهاز iOS مع الوسائط:

* `-v`      - `platformVersion`: إصدار منصة Android/iOS
* `-d`      - `deviceName`: اسم الجهاز المحمول
* `-u`      - `udid`: udid للأجهزة الحقيقية

الاستخدام:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

يمكنك تطبيق أي خيارات (انظر `wdio repl --help`) متاحة لجلسة REPL الخاصة بك.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

طريقة أخرى لاستخدام REPL هي داخل اختباراتك عبر أمر [`debug`](/docs/api/browser/debug). هذا سيوقف المتصفح عند استدعائه، ويمكّنك من الانتقال إلى التطبيق (مثل أدوات المطور) أو التحكم في المتصفح من سطر الأوامر. هذا مفيد عندما لا تؤدي بعض الأوامر إلى إجراء معين كما هو متوقع. باستخدام REPL، يمكنك بعد ذلك تجربة الأوامر لمعرفة أيها يعمل بشكل أكثر موثوقية.