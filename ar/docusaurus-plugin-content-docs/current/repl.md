---
id: repl
title: واجهة REPL
---

مع `v4.5.0`، قدم WebdriverIO واجهة [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) التي تساعدك ليس فقط على تعلم واجهة برمجة التطبيقات للإطار، ولكن أيضًا على تصحيح واختبار اختباراتك. يمكن استخدامها بعدة طرق.

أولًا، يمكنك استخدامها كأمر CLI من خلال تثبيت `npm install -g @wdio/cli` وإطلاق جلسة WebDriver من سطر الأوامر، على سبيل المثال:

```sh
wdio repl chrome
```

هذا سيفتح متصفح Chrome يمكنك التحكم فيه من خلال واجهة REPL. تأكد من تشغيل سائق المتصفح على المنفذ `4444` من أجل بدء الجلسة. إذا كان لديك حساب [Sauce Labs](https://saucelabs.com) (أو مزود سحابي آخر)، يمكنك أيضًا تشغيل المتصفح مباشرة على سطر الأوامر في السحابة عبر:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

إذا كان السائق يعمل على منفذ مختلف مثل: 9515، يمكن تمريره مع وسيطة سطر الأوامر --port أو الاختصار -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

يمكن أيضًا تشغيل Repl باستخدام الإمكانيات من ملف تكوين webdriverIO. يدعم Wdio كائن الإمكانيات؛ أو قائمة إمكانيات multiremote أو الكائن.

إذا كان ملف التكوين يستخدم كائن الإمكانيات، فقط مرر المسار إلى ملف التكوين، وإلا إذا كانت إمكانية multiremote، فحدد أي إمكانية لاستخدامها من القائمة أو multiremote باستخدام وسيطة الموضع. ملاحظة: بالنسبة للقائمة نعتبر الفهرس المستند إلى الصفر.

### مثال

WebdriverIO مع مصفوفة الإمكانيات:

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

WebdriverIO مع كائن إمكانيات [multiremote](https://webdriver.io/docs/multiremote/):

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

هذا سيفتح جلسة Chrome/Safari على الجهاز/المحاكي/محاكي iOS المتصل. تأكد من تشغيل Appium على المنفذ `4444` من أجل بدء الجلسة.

```sh
wdio repl './path/to/your_app.apk'
```

هذا سيفتح جلسة تطبيق على الجهاز/المحاكي/محاكي iOS المتصل. تأكد من تشغيل Appium على المنفذ `4444` من أجل بدء الجلسة.

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

طريقة أخرى لاستخدام REPL هي داخل اختباراتك عبر أمر [`debug`](/docs/api/browser/debug). هذا سيوقف المتصفح عند استدعائه، ويمكنك من الانتقال إلى التطبيق (مثل أدوات المطور) أو التحكم في المتصفح من سطر الأوامر. هذا مفيد عندما لا تؤدي بعض الأوامر إلى إجراء معين كما هو متوقع. مع REPL، يمكنك بعد ذلك تجربة الأوامر لمعرفة أيها يعمل بشكل أكثر موثوقية.