---
id: repl
title: واجهة REPL
description: "استخدم واجهة REPL في WebdriverIO لتجربة الأوامر وتصحيح أخطاء الاختبارات بشكل تفاعلي من سطر الأوامر أو من داخل اختبار قيد التشغيل."
---

مع الإصدار `v4.5.0`، قدّمت WebdriverIO واجهة [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) لا تساعدك على تعلّم واجهة برمجة التطبيقات (API) الخاصة بإطار العمل فحسب، بل تساعدك أيضًا على تصحيح أخطاء اختباراتك وفحصها. ويمكن استخدامها بعدة طرق.

أولًا، يمكنك استخدامها كأمر CLI عن طريق تثبيت `npm install -g @wdio/cli` وبدء جلسة WebDriver من سطر الأوامر، على سبيل المثال:

```sh
wdio repl chrome
```

سيؤدي هذا إلى فتح متصفح Chrome يمكنك التحكم فيه عبر واجهة REPL. تأكد من وجود برنامج تشغيل متصفح (browser driver) يعمل على المنفذ `4444` لبدء الجلسة. إذا كان لديك حساب على [Sauce Labs](https://saucelabs.com) (أو أي مزوّد سحابي آخر)، يمكنك أيضًا تشغيل المتصفح مباشرةً في السحابة من سطر الأوامر عبر:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

إذا كان برنامج التشغيل يعمل على منفذ مختلف، مثل: 9515، فيمكن تمريره باستخدام وسيط سطر الأوامر ‎--port أو الاسم المستعار ‎-p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

يمكن أيضًا تشغيل REPL باستخدام الإمكانيات (capabilities) من ملف إعدادات WebdriverIO. يدعم Wdio كائن الإمكانيات؛ أو؛ قائمة أو كائن إمكانيات multi-remote.

إذا كان ملف الإعدادات يستخدم كائن الإمكانيات، فما عليك سوى تمرير مسار ملف الإعدادات، أما إذا كانت إمكانيات multi-remote، فحدّد الإمكانية التي تريد استخدامها من القائمة أو من multi-remote باستخدام الوسيط الموضعي. ملاحظة: بالنسبة للقائمة، نعتمد فهرسًا يبدأ من الصفر.

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

WebdriverIO مع كائن إمكانيات [multi-remote](https://webdriver.io/docs/multiremote/):

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

أو إذا كنت تريد تشغيل اختبارات الهاتف المحمول محليًا باستخدام Appium:

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

سيؤدي هذا إلى فتح جلسة Chrome/Safari على الجهاز/المحاكي (emulator/simulator) المتصل. تأكد من أن Appium يعمل على المنفذ `4444` لبدء الجلسة.

```sh
wdio repl './path/to/your_app.apk'
```

سيؤدي هذا إلى فتح جلسة تطبيق على الجهاز/المحاكي (emulator/simulator) المتصل. تأكد من أن Appium يعمل على المنفذ `4444` لبدء الجلسة.

يمكن تمرير الإمكانيات الخاصة بجهاز iOS باستخدام الوسائط التالية:

* `-v`      - `platformVersion`: إصدار منصة Android/iOS
* `-d`      - `deviceName`: اسم جهاز الهاتف المحمول
* `-u`      - `udid`: المعرّف udid للأجهزة الحقيقية

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

يمكنك تطبيق أي خيارات متاحة (راجع `wdio repl --help`) على جلسة REPL الخاصة بك.

### الارتباط بجلسة `wdio session`

لا يقوم الأمر `wdio repl --session <name>` (الاسم المستعار `-s`) بتشغيل متصفح، بل يربط REPL بجلسة فتحها [`wdio session`](/docs/session) مسبقًا، وعند فصل الارتباط تظل تلك الجلسة قيد التشغيل. أما إيقاف تشغيل الاختبار مؤقتًا فيتم شرحه في [تصحيح أخطاء اختبار باستخدام جلسة](/docs/session/debug):

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

في REPL، يُنفَّذ كل سطر كأمر `wdio session exec`. ويطبع الأمر `.exit` الرسالة `Detached from "default" (still running)`.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

هناك طريقة أخرى لاستخدام REPL وهي داخل اختباراتك عبر الأمر [`debug`](/docs/api/browser/debug). سيؤدي هذا إلى إيقاف المتصفح عند استدعائه، ويتيح لك الانتقال إلى التطبيق (مثلًا إلى أدوات المطوّر) أو التحكم في المتصفح من سطر الأوامر. يكون هذا مفيدًا عندما لا تؤدي بعض الأوامر إلى تنفيذ إجراء معيّن كما هو متوقع. باستخدام REPL، يمكنك حينها تجربة الأوامر لمعرفة أيها يعمل بأكبر قدر من الموثوقية.