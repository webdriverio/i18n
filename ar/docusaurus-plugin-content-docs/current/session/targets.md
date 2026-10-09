---
id: targets
title: أهداف الجلسة
description: افتح متصفحًا أو تطبيق هاتف محمول أو تطبيق سطح مكتب أو تطبيق Electron أو جهازًا سحابيًا باستخدام wdio session.
---

يبدأ الأمر `wdio session open` الجلسة، ووسيطته الأولى هي الهدف. أعد استخدام الجلسة `default`، ولا تمرّر `-s <name>` إلا إذا احتجت إلى جلستين في الوقت نفسه. شغّل `npx wdio session doctor <target>` أولًا إذا كان الهدف يحتاج إلى Appium أو برنامج تشغيل لسطح المكتب أو بيانات اعتماد سحابية.

تتحكم مشغّلات Chrome وAndroid وElectron في [تطبيق WebdriverIO التجريبي](https://github.com/webdriverio/native-demo-app) نفسه (تطبيق Expo التجريبي، الوسم `v2.2.0`). يستخدم Chrome وElectron خادم ويب Expo محليًا في نافذة سطح مكتب عادية. يثبّت Android [ملف apk للإصدار v2.2.0](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). ويثبّت iOS تطبيق المحاكي للإصدار v2.2.0 (`org.wdiodemoapp`) ويستخدم `touchId`. يكتب كل مشغّل الأمر، ثم تعرض النافذة النتيجة. أوقف التشغيل مؤقتًا، أو انتقل إلى الأمر السابق أو التالي، لتقرأ السطر الذي غيّر النافذة.

المسار المشترك هو: افتح التطبيق، وسجّل الدخول باسم `alice@webdriver.io` / `supersecret`، وصِل إلى شعار الروبوت ("You found me!!!")، ثم أكمل أحجية القطع التسع. يضبط Chrome وElectron أيضًا موقعًا وساعة ليلية في شاشة Weather، ويفتحان WebView داخل التطبيق للصفحة الرئيسية لـ WebdriverIO، ويسحبان الشريط الدوّار. أما مشغّل Android فيمرّر شاشة السحب الأصلية حتى يصل إلى ذلك الروبوت. يكتب `export` مواصفة Mocha للجلسة التي تحكمت فيها للتو أيًّا كانت.

<a id="postcard"></a>

## المتصفحات

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

يُفتح Chrome دون واجهة (headless). أضف `--headed` لإظهار النافذة. يُنزَّل Chrome وFirefox وEdge عند أول استخدام إذا لم تكن مثبّتة. يتطلب Safari نظام macOS.

### وكيل المستخدم في وضع التشغيل دون واجهة

يعرّف Chrome وEdge نفسيهما في وضع التشغيل دون واجهة بالرمز `HeadlessChrome/<version>` في وكيل المستخدم، بينما ترسل النافذة المرئية للمتصفح نفسه `Chrome/<version>`. ترفض مواقع كثيرة الطلبات التي تحمل رمز التشغيل دون واجهة: يردّ Akamai بـ "Access Denied" ويعرض Cloudflare "Just a moment...". وهي تقرر ذلك من الطلب نفسه، قبل تشغيل أي نص برمجي في الصفحة. وعندها سيرى الوكيل صفحة حظر لا يراها أبدًا الشخص الذي يفتح الموقع نفسه.

لذلك ترسل جلسة Chrome أو Edge دون واجهة وكيلَ المستخدم الذي كانت سترسله نافذة مرئية للمتصفح نفسه. هذا يغيّر الرمز فقط، ولا يُخفي الأتمتة:

- تبقى قيمة `navigator.webdriver` هي `true`.
- تظل العلامات الخاصة بـ chromedriver موجودة في الصفحة.
- لا تزال المواقع التي تتحقق من الأتمتة تكتشفها.

أثناء تجاوز وكيل المستخدم، لا يرسل Chrome أي تلميحات عميل لوكيل المستخدم، لذا تكون `navigator.userAgentData.brands` فارغة. يحتاج التجاوز إلى WebDriver BiDi، لذا تحتفظ الجلسة المفتوحة باستخدام `--no-bidi` بوكيل المستخدم الخاص بوضع التشغيل دون واجهة.

لإرسال وكيل مستخدم محدد، مرّره كوسيطة للمتصفح. وعندها لا تغيّر الجلسة وكيل المستخدم:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

إذا ظل الموقع يعرض فحصًا للروبوتات، فجرّب نافذة مرئية باستخدام `--headed`. وإذا حُظرت هي الأخرى، فالموقع لا يسمح بدخول المتصفحات المؤتمتة. أبلغ عن ذلك بدلًا من محاولة تجاوز الفحص.

تحتفظ نافذة Chrome المرئية بشريط علامات التبويب وشريط العنوان، وبهذا تميّزها عن نافذة Electron. يمثّل `--viewport 1280x800` صفحة متصفح عادية. على الويب يستخدم التطبيق شريطًا جانبيًا على اليسار، ويقع شعار WebdriverIO أعلى هذا الشريط. العناصر هي Home وWeather وWeb وLogin وForms وSwipe وDrag وPerms وData. تعرض الشاشة الرئيسية المتصفح وسطح المكتب إلى جانب iOS وAndroid.

تقرأ شاشة Weather القيمتين `navigator.geolocation` و`Date`. يمثّل `geolocation 35.6762 139.6503` مدينة طوكيو. يُطبَّق ذلك عند التحميل التالي، لذا شغّل `reload` قبل `click "aria/Weather"`. تعرض الأداة بعد ذلك طوكيو و21° ومطرًا. يحوّل `emulate clock 2026-06-21T23:30:00Z` البطاقة نفسها من سماء نهارية إلى سماء ليلية ويضبط الساعة على 11:30 PM. يحلّ أمر `emulate clock` ثانٍ محلّ الأول.

تحمّل علامة التبويب WebView الصفحة `https://webdriver.io/` داخل التطبيق. ينتظر Login نحو 1.5 ثانية، ثم يفتح مربع حوار نصه `Success` و`You are logged in!`. يبقى زر LOGIN عنصر تحكم برتقاليًا بحجم 200×50 طوال فترة الانتظار هذه على الشاشة. يغلق `dialog accept` مربع الحوار. الأمر `swipe` خاص بالهاتف المحمول فقط. اسحب `[data-testid=Carousel]` إلى `aria/Next card` مرتين للتنقل بين صفحات الشريط الدوّار. يستمع إصدار الويب المسجَّل إلى `pointerup` على `document`، لذا يمكن أن يبدأ السحب على الشريط الدوّار ويُحرَّر المؤشر على `Next card` الذي يقع خارج الشريط الدوّار. يُظهر `scroll down --px 560` روبوت WebdriverIO، والتسمية التوضيحية أسفله هي "You found me!!!". قطع الأحجية هي من `aria/drag-l2` إلى `aria/drag-l3`، وتُسقَط كل منها على الهدف `aria/drop-…` المطابق. ترتيب القطع في الدرج هو `l2` و`r3` و`r1` و`c1` و`c3` و`r2` و`c2` و`l1` و`l3`.

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

كرّر `drag` لكل من `r3` و`r1` و`c1` و`c3` و`r2` و`c2` و`l1` و`l3`.

<SessionTarget id="browser" />

يضبط `--viewport 1280x720` الحجم الأولي. يضيف `--arg` وسيطة للمتصفح ويمكن تكراره. يحتفظ `--profile <dir>` بملف تعريف بين مرات الفتح.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android وiOS

يعمل Android وiOS عبر Appium 3. يُبلغ `doctor android` عن الخادم أو برنامج التشغيل المفقود مع أمر التثبيت.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

بالنسبة إلى iOS: `open ios --bundle-id com.example.shop`. تستخدم حزمة Android المثبّتة `--package` و`--activity`. يستخدم الويب على الهاتف المحمول `--browser chrome` أو `--browser safari` بدلًا من تطبيق. يتصل `--appium-url http://127.0.0.1:4723/` بخادم قيد التشغيل بالفعل. يُمرَّر عنوان URL لتطبيق سحابي مثل `bs://…` كما هو بوصفه `--app` ولا يُعامَل كملف محلي.

<a id="native-boarding-pass"></a>

### التطبيق التجريبي الأصلي

على المحاكي أو الجهاز، يكون التطبيق التجريبي نفسه هو ملف apk للإصدار v2.2.0:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

ينتظر `open` مدة تصل إلى ثماني دقائق. يثبّت UiAutomator2 خادمًا ويبدأ عملية instrumentation قبل أن يصبح التطبيق قابلًا للاستخدام، وهذا أبطأ من تشغيل متصفح. لا يُعاد إرسال الطلب الأول: فإعادة المحاولة تبدأ جلسة Appium ثانية على الجهاز نفسه بينما لا تزال الأولى قيد التثبيت. يسجّل `tap "~Login"` ثم `fill` ثم `tap "~button-LOGIN"` الدخول بالبريد الإلكتروني وكلمة المرور نفسيهما. على الشاشات القصيرة يقع زر LOGIN أسفل الجزء المرئي، لذا مرّر `~Login-screen` قبل ذلك النقر. يغلق `dialog accept` تنبيه النجاح، ويجب تشغيله بعد ظهور ذلك التنبيه على الشاشة. نص التنبيه هو `Success` / `You are logged in!`.

زر البصمة هو `~button-biometric`. ولا يظهر في نموذج تسجيل الدخول إلا بعد تسجيل بصمة، لذا لا ينقر عليه هذا المشغّل. يجيب `exec -e "await browser.fingerPrint(1)"` على مطالبة النظام (`fingerPrint` خاص بـ Android فقط؛ ولا يوجد أمر فرعي في `wdio session` لذلك).

يمثّل `tap "~Webview"` عرض WebView داخل التطبيق للصفحة `https://webdriver.io/`. على محاكي برمجي بوحدة معالجة مركزية واحدة، يتعطل عارض WebView بالإشارة `SIGTRAP` في `libmonochrome` بعد ظهور تسمية LOADING، ولا تُرسَم الصفحة أبدًا. لذلك يترك المشغّل علامة التبويب هذه دون استخدام.

يفتح `tap "~Swipe"` الشريط الدوّار. لا ينقل `swipe left` صفحاته: فالشريط الدوّار هو `react-native-reanimated-carousel`، والسحب عبر UIAutomator يرتد إلى البطاقة الأولى. ما يُظهر الروبوت والتسمية التوضيحية "You found me!!!" هو تنفيذ `exec` لـ `mobile: swipeGesture` على عرض التمرير بشكل متكرر. أما `swipe up` على كامل الشاشة من الحافة السفلية فيفتح واجهة لقطة الشاشة في Android بدلًا من ذلك. يُكمل `drag "~drag-l2" "~drop-l2"` (والأزواج الثمانية الأخرى، بترتيب الدرج) الأحجية. الإطار الأخير هو الروبوت المكتمل وعنصر التحكم لإعادة المحاولة.

يُبقي `-s android` هذه الجلسة إلى جانب جلسة المتصفح. احذف `-s android` إذا كانت هي الجلسة الوحيدة. يستخدم `open` الحزمة والنشاط المثبّتين بالفعل من ملف apk، مع `--no-reset` كي تبقى البصمة المسجّلة. `"~Login"` هي تسمية إمكانية الوصول لعلامة التبويب. لا ينطبق `wait` على الجلسات الأصلية.

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

كرّر `drag` لكل من `r3` و`r1` و`c1` و`c3` و`r2` و`c2` و`l1` و`l3`.

<SessionTarget id="android" />

### محاكي iOS

الشاشات نفسها موجودة في إصدار المحاكي v2.2.0، [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). فك ضغطه وثبّت `wdiodemoapp.app` على محاكٍ قيد التشغيل (`xcrun simctl install booted`). معرّف الحزمة هو `org.wdiodemoapp`. هذا الملف الثنائي تطبيق لمحاكي iPhone (arm64، iOS 15.1 أو أحدث). ويحتاج إلى macOS وXcode. لا يوجد مشغّل iOS في هذه الصفحة.

تستخدم عمليات تسجيل الدخول والسحب والجر تسميات إمكانية الوصول نفسها المستخدمة في Android. لم يُشغَّل `swipe left` على المحاكي، وهو لا ينقل صفحات هذا الشريط الدوّار في ملف apk لـ Android. استدعاء المصادقة البيومترية هو `browser.touchId(true)` وليس `fingerPrint`. يحتاج `touchId` إلى ضبط الإمكانية `appium:allowTouchIdEnroll` على `true` (مرّرها باستخدام `--capabilities`). سجّل Touch ID على المحاكي قبل فتح نموذج تسجيل الدخول، وإلا يبقى زر المصادقة البيومترية مخفيًا.

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

كرّر `drag` للقطع الثماني الأخرى، بترتيب الدرج نفسه المستخدم في Android.

## تطبيقات سطح المكتب

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

يتطلب `macos` نظام macOS، ويتطلب `windows` نظام Windows. يتصل `--app Root` بسطح المكتب. يُشار إلى تطبيق Windows المثبّت بمعرّف التطبيق الخاص به، مثل `--app Microsoft.WindowsCalculator`. ويُحلَّل المسار أو ملف `.exe` بوصفه ملفًا.

<a id="launch-console"></a>

## Electron وTauri وDioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

يحتاج `open tauri ./my-app` و`open dioxus ./my-app` إلى وجود برنامج التشغيل الخاص بهما في `PATH` ما لم تبدأ حزمة الخدمة الجلسة بنفسها. على Linux دون `DISPLAY` أو `WAYLAND_DISPLAY`، ثبّت Xvfb أو weston. يبقى Electron على بروتوكول WebDriver الكلاسيكي. مرّر `--app-arg` لتمرير علامة إلى التطبيق، بما في ذلك `--app-arg=--no-sandbox` عندما تتطلب البيئة ذلك. يجب أن تستخدم القيمة التي تبدأ بـ `-` علامة `=`، لأن المحلّل الصارم سيعاملها خلاف ذلك كخيار مستقل.

ثبّت `electron` و`@wdio/electron-service` في المجلد الذي تفتحه. يستخدم `main.js` الكلمة `import`، لذا يحتاج ملف `package.json` في ذلك المجلد إلى `"type": "module"` (أو سمِّ الملف `main.mjs`). اضبط حجم النافذة على مساحة العمل حتى لا تضع الشاشة الأصغر شريط العنوان خارج الشاشة:

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

لا يعطّل أمر الفتح أدناه وضع الحماية (sandbox) للعارض. أضف `--app-arg=--no-sandbox` فقط عندما لا تستطيع البيئة تشغيل Electron مع وضع الحماية، مثل بعض حاويات Linux. يحمّل مشغّل Electron عنوان URL الخاص بـ Expo نفسه في نافذة بحجم 1280×800 دون شريط عنوان. يتطابق الشعار والشريط الجانبي وبطاقة الطقس وبطاقة تسجيل الدخول والشريط الدوّار والأحجية مع المتصفح. `-s electron` هو اسم الجلسة المستخدم إلى جانب العرض التجريبي للمتصفح. يبقى Electron على البروتوكول الكلاسيكي، لذا يمر `geolocation` و`emulate clock` عبر Chromedriver بدلًا من BiDi. تتطابق الأوامر مع Chrome، بما في ذلك `reload` قبل Weather، باستثناء مربع حوار النجاح. على Linux، يقبل `dialog accept` التنبيه الأصلي لكن الفقاعة تبقى مرسومة. هذه الفقاعة ليست جزءًا من الصفحة، لذا لا يمكن لنقرة لاحقة الوصول إليها. يستبدل التسجيل `window.alert` بمربع حوار داخل الصفحة ويشغّل `click "aria/OK"`. يبقى زر LOGIN عنصر تحكم برتقاليًا بحجم 200×50 أثناء الانتظار. يستخدم الشريط الدوّار والتمرير والأحجية الأوامر نفسها المستخدمة في Chrome.

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

كرّر `drag` لكل من `r3` و`r1` و`c1` و`c3` و`r2` و`c2` و`l1` و`l3`.

<SessionTarget id="electron" />

## الأجهزة السحابية

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

قيمة `--provider` هي `browserstack` أو `saucelabs` أو `testingbot` أو `testmu`. صدّر اسم المستخدم ومفتاح الوصول الخاصين بالمزوّد. يتحقق `doctor <provider>` من ضبطهما ولا يطبع القيم. يبدأ `--tunnel` النفق الخاص بالمزوّد عندما يكون التطبيق قيد الاختبار على جهازك.

## ملف إعدادات WebdriverIO

يمكن أن يأخذ `open` ملف إعدادات وفهرس إمكانية بدلًا من اسم الهدف:

```sh
npx wdio session open ./wdio.conf.ts 0
```

يُحمَّل ملف إعدادات TypeScript باستخدام `tsx` إذا كان موجودًا في مشروعك. `tsx` اختياري: فبدونه يُحمَّل ملف الإعدادات عبر إزالة الأنواع في Node أو عبر jiti، وأي ملف إعدادات يفشل تحميله يُبلغ عن `MISSING_DEPENDENCY` مع سطر التثبيت.

توجّه `--hostname` و`--port` و`--path` و`--protocol` الجلسة إلى نقطة نهاية WebDriver قيد التشغيل بالفعل. لا يؤدي إغلاق الجلسة إلى إيقاف نقطة النهاية تلك.

## استكشاف الأخطاء وإصلاحها

| الرسالة | ما يجب فعله |
| --- | --- |
| `MISSING_DEPENDENCY` | ثبّت الحزمة المذكورة في الخطأ. يطبع `doctor <target>` سطر التثبيت نفسه. يحتاج Electron إلى `@wdio/electron-service` و`electron` في المجلد الذي تفتحه. |
| `MISSING_APPIUM_DRIVER` | شغّل السطر `npx appium driver install …` الوارد في الخطأ. |
| `MISSING_BINARY` | ضع برنامج التشغيل المذكور (`tauri-driver` أو `wdio-dioxus-driver`) في `PATH`. |
| `MISSING_CREDENTIALS` | صدّر المتغيرات المذكورة في الخطأ. |
| `NOT_SUPPORTED` | `macos` خاص بـ macOS فقط و`windows` خاص بـ Windows فقط. `swipe` خاص بالهاتف المحمول فقط. على Chrome وElectron، اسحب `[data-testid=Carousel]` إلى `aria/Next card`. |
| `No dialog open.` | التنبيه غير مفتوح. على Android، انتظر حتى يظهر تنبيه النجاح قبل `dialog accept`. على Electron في Linux يمكن أن تبقى الفقاعة الأصلية مرسومة بعد `acceptAlert` مع الإبلاغ مع ذلك بعدم وجود مربع حوار. يستخدم المشغّل بدلًا من ذلك مربع حوار داخل الصفحة و`click "aria/OK"`. |
| `The instrumentation process cannot be initialized` | لم يبدأ UiAutomator2 الاستماع في الوقت المحدد. تسمح الجلسة بـ 240 ثانية لهذا التشغيل، بعد ما يصل إلى 180 ثانية لتثبيت الخادم. على المحاكي البرمجي، تُوصل وحدة معالجة مركزية واحدة مع مظهر 720×1280 ملف apk للإصدار v2.2.0 إلى الشاشة الرئيسية. أما الصورة بدقة 1080×2400 مع وحدتي معالجة مركزية فتتسبب في حالة ANR لـ `system_server` ولا يستمع الخادم أبدًا. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | استسلم العميل بينما كان Appium لا يزال ينشئ الجلسة. ينتظر Android وiOS مدة 480 ثانية لهذا الطلب الأول ولا يرسلانه مرة أخرى. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` مخصص لجلسات المتصفح. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` هو استدعاء Android. يستخدم iOS `browser.touchId`. |
| `App not found:` | مرّر مسار apk موجودًا، أو استخدم `--package` و`--activity` لتطبيق مثبّت بالفعل. |
| `Pass --package <id>.` | يحتاج `deeplink` إلى `--package` على Android. |

## الخطوات التالية

- [اللقطات والمراجع](/docs/session/snapshots) — اقرأ الشاشة بعد `open`
- [الأوامر](/docs/session-commands) — جميع علامات `open`
- [wdio session](/docs/session) — الحلقة الافتراضية