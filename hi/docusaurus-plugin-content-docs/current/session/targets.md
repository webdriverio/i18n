---
id: targets
title: सेशन टारगेट
description: wdio session के साथ ब्राउज़र, मोबाइल ऐप, डेस्कटॉप ऐप, Electron ऐप या क्लाउड डिवाइस खोलें।
---

`wdio session open` सेशन शुरू करता है। पहला आर्गुमेंट टारगेट होता है। `default` सेशन को दोबारा इस्तेमाल करें। `-s <name>` केवल तभी पास करें जब आपको एक साथ दो सेशन चाहिए हों। जब टारगेट को Appium, डेस्कटॉप ड्राइवर या क्लाउड क्रेडेंशियल्स की ज़रूरत हो, तो पहले `npx wdio session doctor <target>` चलाएँ।

Chrome, Android और Electron प्लेयर एक ही [WebdriverIO demo app](https://github.com/webdriverio/native-demo-app) (Expo guinea pig, टैग `v2.2.0`) को चलाते हैं। Chrome और Electron एक सामान्य डेस्कटॉप विंडो में लोकल Expo वेब सर्वर का उपयोग करते हैं। Android [v2.2.0 release apk](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`) इंस्टॉल करता है। iOS v2.2.0 सिम्युलेटर ऐप (`org.wdiodemoapp`) इंस्टॉल करता है और `touchId` का उपयोग करता है। हर प्लेयर कमांड टाइप करता है, फिर विंडो परिणाम दिखाती है। विंडो बदलने वाली लाइन पढ़ने के लिए पॉज़ करें, या पिछली या अगली कमांड पर जाएँ।

साझा पथ यह है: ऐप खोलें, `alice@webdriver.io` / `supersecret` के रूप में लॉग इन करें, रोबोट लोगो ("You found me!!!") तक पहुँचें, फिर 9-टुकड़ों वाली पहेली पूरी करें। Chrome और Electron, Weather व्यू पर एक लोकेशन और रात की घड़ी भी सेट करते हैं, WebdriverIO फ्रंटपेज का इन-ऐप WebView खोलते हैं, और कैरोसेल को ड्रैग करते हैं। Android प्लेयर नेटिव स्वाइप स्क्रीन को उस रोबोट तक स्क्रॉल करता है। `export` उस सेशन का Mocha spec लिखता है जिसे आपने अभी चलाया है।

<a id="postcard"></a>

## ब्राउज़र

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome headless मोड में खुलता है। विंडो दिखाने के लिए `--headed` जोड़ें। Chrome, Firefox और Edge इंस्टॉल न होने पर पहली बार उपयोग के समय डाउनलोड हो जाते हैं। Safari के लिए macOS आवश्यक है।

### Headless मोड में यूज़र एजेंट

Headless Chrome और Edge यूज़र एजेंट में खुद को `HeadlessChrome/<version>` के रूप में पहचानते हैं। उसी ब्राउज़र की दिखाई देने वाली विंडो `Chrome/<version>` भेजती है। कई साइटें headless टोकन वाले अनुरोधों को अस्वीकार कर देती हैं: Akamai "Access Denied" जवाब देता है और Cloudflare "Just a moment..." दिखाता है। वे किसी भी पेज स्क्रिप्ट के चलने से पहले, अनुरोध से ही निर्णय लेती हैं। तब एक एजेंट को ऐसा ब्लॉक पेज दिखेगा जो उसी साइट को खोलने वाले किसी व्यक्ति को कभी नहीं दिखता।

इसलिए एक headless Chrome या Edge सेशन वही यूज़र एजेंट भेजता है जो उसी ब्राउज़र की दिखाई देने वाली विंडो भेजती। यह केवल टोकन बदलता है। यह ऑटोमेशन को नहीं छिपाता:

- `navigator.webdriver` `true` ही रहता है।
- chromedriver के अपने मार्कर अब भी पेज पर रहते हैं।
- ऑटोमेशन की जाँच करने वाली साइटें इसे अब भी देख लेती हैं।

जब यूज़र एजेंट ओवरराइड होता है, तब Chrome कोई user agent client hints नहीं भेजता, इसलिए `navigator.userAgentData.brands` खाली रहता है। ओवरराइड के लिए WebDriver BiDi की ज़रूरत होती है, इसलिए `--no-bidi` के साथ खोला गया सेशन headless यूज़र एजेंट ही रखता है।

कोई विशिष्ट यूज़र एजेंट भेजने के लिए, उसे ब्राउज़र आर्गुमेंट के रूप में पास करें। तब सेशन यूज़र एजेंट को नहीं बदलता:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

यदि कोई साइट फिर भी बॉट जाँच दिखाती है, तो `--headed` के साथ दिखाई देने वाली विंडो आज़माएँ। यदि वह भी ब्लॉक हो जाए, तो साइट ऑटोमेटेड ब्राउज़रों को अंदर नहीं आने देती। जाँच को पार करने की कोशिश करने के बजाय इसकी रिपोर्ट करें।

एक headed Chrome विंडो अपनी टैब स्ट्रिप और एड्रेस बार बनाए रखती है, इसी से आप उसे Electron विंडो से अलग पहचानते हैं। `--viewport 1280x800` एक सामान्य ब्राउज़र पेज है। वेब पर ऐप बाएँ साइडबार का उपयोग करता है। WebdriverIO लोगो उस साइडबार के शीर्ष पर है। आइटम हैं Home, Weather, Web, Login, Forms, Swipe, Drag, Perms और Data। होम स्क्रीन iOS और Android के साथ ब्राउज़र और डेस्कटॉप को सूचीबद्ध करती है।

Weather `navigator.geolocation` और `Date` पढ़ता है। `geolocation 35.6762 139.6503` टोक्यो है। यह अगले लोड पर लागू होता है, इसलिए `click "aria/Weather"` से पहले `reload` चलाएँ। तब विजेट टोक्यो, 21° और बारिश दिखाता है। `emulate clock 2026-06-21T23:30:00Z` उसी कार्ड को दिन के आकाश से रात के आकाश में बदल देता है और घड़ी को 11:30 PM पर सेट करता है। दूसरा `emulate clock` पहले वाले को बदल देता है।

WebView टैब ऐप के अंदर `https://webdriver.io/` लोड करता है। Login लगभग 1.5 सेकंड प्रतीक्षा करता है, फिर एक डायलॉग खोलता है जिसका टेक्स्ट `Success` और `You are logged in!` है। जब तक वह प्रतीक्षा स्क्रीन पर रहती है, LOGIN बटन 200×50 का नारंगी कंट्रोल बना रहता है। `dialog accept` डायलॉग बंद करता है। `swipe` केवल मोबाइल के लिए है। कैरोसेल को पेज करने के लिए `[data-testid=Carousel]` को `aria/Next card` पर दो बार ड्रैग करें। रिकॉर्ड किया गया वेब बिल्ड `document` पर `pointerup` सुनता है, इसलिए ड्रैग कैरोसेल पर शुरू हो सकता है और पॉइंटर `Next card` पर छोड़ा जा सकता है, जो कैरोसेल के बाहर स्थित है। `scroll down --px 560` WebdriverIO रोबोट को दृश्य में लाता है। उसके नीचे का कैप्शन "You found me!!!" है। पहेली के टुकड़े `aria/drag-l2` से `aria/drag-l3` तक हैं, जिन्हें मेल खाते `aria/drop-…` टारगेट पर छोड़ा जाता है। ट्रे का क्रम `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3` है।

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

`r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` और `l3` के लिए `drag` दोहराएँ।

<SessionTarget id="browser" />

`--viewport 1280x720` प्रारंभिक आकार सेट करता है। `--arg` एक ब्राउज़र आर्गुमेंट जोड़ता है और इसे दोहराया जा सकता है। `--profile <dir>` एक प्रोफ़ाइल को अलग-अलग बार खोलने के बीच बनाए रखता है।

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android और iOS

Android और iOS, Appium 3 के माध्यम से चलते हैं। `doctor android` किसी गायब सर्वर या ड्राइवर की रिपोर्ट इंस्टॉल कमांड के साथ करता है।

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`। इंस्टॉल किया गया Android पैकेज `--package` और `--activity` का उपयोग करता है। मोबाइल वेब किसी ऐप के बजाय `--browser chrome` या `--browser safari` का उपयोग करता है। `--appium-url http://127.0.0.1:4723/` पहले से चल रहे सर्वर से जुड़ता है। `bs://…` जैसा क्लाउड ऐप URL `--app` के रूप में आगे भेज दिया जाता है और इसे लोकल फ़ाइल नहीं माना जाता।

<a id="native-boarding-pass"></a>

### नेटिव डेमो ऐप

एमुलेटर या डिवाइस पर वही guinea pig v2.2.0 apk है:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` आठ मिनट तक प्रतीक्षा करता है। ऐप उपयोग योग्य होने से पहले UiAutomator2 एक सर्वर इंस्टॉल करता है और instrumentation शुरू करता है, और यह ब्राउज़र लॉन्च करने से धीमा है। पहले अनुरोध को दोबारा नहीं भेजा जाता: दोबारा भेजने से उसी डिवाइस पर दूसरा Appium सेशन शुरू हो जाता है जबकि पहला अभी इंस्टॉल हो रहा होता है। `tap "~Login"`, `fill`, फिर `tap "~button-LOGIN"` उसी ईमेल और पासवर्ड से लॉग इन करता है। छोटी स्क्रीन पर LOGIN बटन फ़ोल्ड के नीचे होता है, इसलिए उस टैप से पहले `~Login-screen` को स्क्रॉल करें। `dialog accept` सफलता अलर्ट को बंद करता है, और इसे उस अलर्ट के स्क्रीन पर आने के बाद ही चलाना होगा। अलर्ट टेक्स्ट `Success` / `You are logged in!` है।

फ़िंगरप्रिंट बटन `~button-biometric` है। यह लॉगिन फ़ॉर्म पर केवल तभी होता है जब कोई फ़िंगरप्रिंट एनरोल किया गया हो, इसलिए यह प्लेयर इसे टैप नहीं करता। `exec -e "await browser.fingerPrint(1)"` सिस्टम प्रॉम्प्ट का जवाब देता है (`fingerPrint` केवल Android के लिए है; इसके लिए कोई `wdio session` सबकमांड नहीं है)।

`tap "~Webview"` `https://webdriver.io/` का इन-ऐप WebView है। एक-CPU वाले सॉफ़्टवेयर एमुलेटर पर WebView रेंडरर LOADING लेबल के बाद `libmonochrome` में `SIGTRAP` के साथ बंद हो जाता है, और पेज कभी पेंट नहीं होता। प्लेयर उस टैब को नहीं छूता।

`tap "~Swipe"` कैरोसेल खोलता है। `swipe left` इसे पेज नहीं करता: कैरोसेल `react-native-reanimated-carousel` है, और UIAutomator स्वाइप पहले कार्ड पर वापस उछल जाता है। स्क्रॉल व्यू पर `mobile: swipeGesture` का `exec`, बार-बार चलाने पर, रोबोट और कैप्शन "You found me!!!" को सामने लाता है। निचले किनारे से पूर्ण-स्क्रीन `swipe up` इसके बजाय Android का स्क्रीनशॉट UI खोल देता है। `drag "~drag-l2" "~drop-l2"` (और अन्य आठ जोड़े, ट्रे क्रम में) पहेली पूरी करता है। अंतिम फ़्रेम जोड़ा गया रोबोट और retry कंट्रोल है।

`-s android` इस सेशन को ब्राउज़र वाले सेशन के साथ बनाए रखता है। जब यह एकमात्र सेशन हो तो `-s android` हटा दें। `open` apk द्वारा पहले से इंस्टॉल किए गए पैकेज और activity का उपयोग करता है, `--no-reset` के साथ ताकि एनरोल किया गया फ़िंगरप्रिंट बना रहे। `"~Login"` टैब का accessibility लेबल है। `wait` नेटिव सेशन पर लागू नहीं होता।

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

`r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` और `l3` के लिए `drag` दोहराएँ।

<SessionTarget id="android" />

### iOS सिम्युलेटर

वही स्क्रीन v2.2.0 सिम्युलेटर बिल्ड, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip) में हैं। इसे अनज़िप करें और `wdiodemoapp.app` को एक बूट किए गए सिम्युलेटर पर इंस्टॉल करें (`xcrun simctl install booted`)। बंडल id `org.wdiodemoapp` है। वह बाइनरी एक iPhone Simulator ऐप है (arm64, iOS 15.1 या नया)। इसके लिए macOS और Xcode की आवश्यकता है। इस पेज पर कोई iOS प्लेयर नहीं है।

Login, swipe और drag, Android जैसे ही accessibility लेबल का उपयोग करते हैं। `swipe left` सिम्युलेटर पर नहीं चलाया गया था। Android apk पर यह इस कैरोसेल को पेज नहीं करता। बायोमेट्रिक कॉल `browser.touchId(true)` है, `fingerPrint` नहीं। `touchId` के लिए capability `appium:allowTouchIdEnroll` को `true` पर सेट करना आवश्यक है (इसे `--capabilities` के साथ पास करें)। लॉगिन फ़ॉर्म खोलने से पहले सिम्युलेटर पर Touch ID एनरोल करें, अन्यथा बायोमेट्रिक बटन छिपा रहता है।

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

अन्य आठ टुकड़ों के लिए, Android जैसे ही ट्रे क्रम में, `drag` दोहराएँ।

## डेस्कटॉप ऐप्स

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` के लिए macOS आवश्यक है। `windows` के लिए Windows आवश्यक है। `--app Root` डेस्कटॉप से जुड़ता है। इंस्टॉल किए गए Windows ऐप का नाम उसके application id से दिया जाता है, उदाहरण के लिए `--app Microsoft.WindowsCalculator`। किसी पथ या `.exe` को फ़ाइल के रूप में resolve किया जाता है।

<a id="launch-console"></a>

## Electron, Tauri और Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` और `open dioxus ./my-app` को अपने ड्राइवर का `PATH` पर होना आवश्यक है, जब तक कि सर्विस पैकेज स्वयं सेशन शुरू न करे। `DISPLAY` या `WAYLAND_DISPLAY` के बिना Linux पर, Xvfb या weston इंस्टॉल करें। Electron क्लासिक WebDriver प्रोटोकॉल पर ही रहता है। ऐप को कोई फ़्लैग आगे भेजने के लिए `--app-arg` पास करें, जिसमें वातावरण की आवश्यकता होने पर `--app-arg=--no-sandbox` भी शामिल है। `-` से शुरू होने वाले मान को `=` का उपयोग करना होगा, क्योंकि अन्यथा strict parser उसे अपना अलग विकल्प मान लेता है।

जिस डायरेक्टरी को आप खोलते हैं उसमें `electron` और `@wdio/electron-service` इंस्टॉल करें। `main.js` `import` का उपयोग करता है, इसलिए उस डायरेक्टरी के `package.json` में `"type": "module"` होना चाहिए (या फ़ाइल का नाम `main.mjs` रखें)। विंडो को work area के आकार का बनाएँ ताकि छोटा डिस्प्ले टाइटल बार को स्क्रीन से बाहर न रखे:

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

नीचे दी गई open कमांड रेंडरर sandbox को अक्षम नहीं करती। `--app-arg=--no-sandbox` केवल तभी जोड़ें जब वातावरण sandbox के साथ Electron शुरू नहीं कर सकता, जैसे कुछ Linux कंटेनर। Electron प्लेयर वही Expo URL बिना एड्रेस बार वाली 1280×800 विंडो में लोड करता है। लोगो, साइडबार, weather कार्ड, login कार्ड, कैरोसेल और पहेली ब्राउज़र से मेल खाते हैं। `-s electron` ब्राउज़र डेमो के साथ उपयोग किया जाने वाला सेशन नाम है। Electron क्लासिक प्रोटोकॉल पर रहता है, इसलिए `geolocation` और `emulate clock` BiDi के बजाय Chromedriver के माध्यम से जाते हैं। सफलता डायलॉग को छोड़कर, कमांड Chrome से मेल खाती हैं, जिसमें Weather से पहले `reload` भी शामिल है। Linux पर, `dialog accept` नेटिव अलर्ट को स्वीकार करता है और बबल पेंट हुआ रहता है। वह बबल पेज का हिस्सा नहीं है, इसलिए बाद का क्लिक उस तक नहीं पहुँच सकता। रिकॉर्डिंग `window.alert` को इन-पेज डायलॉग से बदल देती है और `click "aria/OK"` चलाती है। प्रतीक्षा के दौरान LOGIN बटन 200×50 का नारंगी कंट्रोल बना रहता है। कैरोसेल, स्क्रॉल और पहेली Chrome जैसी ही कमांड का उपयोग करते हैं।

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

`r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` और `l3` के लिए `drag` दोहराएँ।

<SessionTarget id="electron" />

## क्लाउड डिवाइस

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` `browserstack`, `saucelabs`, `testingbot` या `testmu` होता है। प्रोवाइडर का यूज़रनेम और access key export करें। `doctor <provider>` जाँचता है कि वे सेट हैं और उनके मान प्रिंट नहीं करता। जब परीक्षण किया जा रहा ऐप आपकी मशीन पर हो, तो `--tunnel` प्रोवाइडर का tunnel शुरू करता है।

## एक WebdriverIO कॉन्फ़िग

`open` टारगेट नाम के बजाय एक कॉन्फ़िग फ़ाइल और capability index ले सकता है:

```sh
npx wdio session open ./wdio.conf.ts 0
```

यदि आपके प्रोजेक्ट में `tsx` है, तो TypeScript कॉन्फ़िग उसके साथ लोड होता है। `tsx` वैकल्पिक है: इसके बिना कॉन्फ़िग Node type stripping या jiti के माध्यम से लोड होता है, और लोड न हो पाने वाला कॉन्फ़िग एक इंस्टॉल लाइन के साथ `MISSING_DEPENDENCY` रिपोर्ट करता है।

`--hostname`, `--port`, `--path` और `--protocol` सेशन को पहले से चल रहे WebDriver endpoint की ओर इंगित करते हैं। सेशन बंद करने से वह endpoint बंद नहीं होता।

## समस्या निवारण

| संदेश | क्या करें |
| --- | --- |
| `MISSING_DEPENDENCY` | त्रुटि में नामित पैकेज इंस्टॉल करें। `doctor <target>` वही इंस्टॉल लाइन प्रिंट करता है। Electron को उस डायरेक्टरी में `@wdio/electron-service` और `electron` की आवश्यकता होती है जिसे आप खोलते हैं। |
| `MISSING_APPIUM_DRIVER` | त्रुटि से `npx appium driver install …` लाइन चलाएँ। |
| `MISSING_BINARY` | नामित ड्राइवर (`tauri-driver` या `wdio-dioxus-driver`) को `PATH` पर रखें। |
| `MISSING_CREDENTIALS` | त्रुटि में नामित वेरिएबल्स export करें। |
| `NOT_SUPPORTED` | `macos` केवल macOS के लिए है और `windows` केवल Windows के लिए। `swipe` केवल मोबाइल के लिए है। Chrome और Electron पर, `[data-testid=Carousel]` को `aria/Next card` पर ड्रैग करें। |
| `No dialog open.` | अलर्ट खुला नहीं है। Android पर, `dialog accept` से पहले सफलता अलर्ट दिखने तक प्रतीक्षा करें। Linux Electron पर नेटिव बबल `acceptAlert` के बाद भी पेंट हुआ रह सकता है और फिर भी कोई डायलॉग न होने की रिपोर्ट कर सकता है। प्लेयर इसके बजाय इन-पेज डायलॉग और `click "aria/OK"` का उपयोग करता है। |
| `The instrumentation process cannot be initialized` | UiAutomator2 समय पर सुनना शुरू नहीं कर पाया। सर्वर इंस्टॉल करने के लिए अधिकतम 180s के बाद, सेशन उस लॉन्च के लिए 240s देता है। सॉफ़्टवेयर एमुलेटर पर, एक CPU और 720×1280 स्किन v2.2.0 apk को होम स्क्रीन तक पहुँचा देती है। दो CPU वाली 1080×2400 इमेज `system_server` को ANR कर देती है और सर्वर कभी नहीं सुनता। |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | जब Appium अभी सेशन बना रहा था, तब क्लाइंट ने हार मान ली। Android और iOS उस पहले अनुरोध के लिए 480s प्रतीक्षा करते हैं और उसे दोबारा नहीं भेजते। |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` ब्राउज़र सेशन के लिए है। |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` Android कॉल है। iOS `browser.touchId` का उपयोग करता है। |
| `App not found:` | मौजूद apk पथ पास करें, या पहले से इंस्टॉल ऐप के लिए `--package` और `--activity` का उपयोग करें। |
| `Pass --package <id>.` | Android पर `deeplink` को `--package` की आवश्यकता होती है। |

## अगले कदम

- [Snapshots and refs](/docs/session/snapshots) — `open` के बाद स्क्रीन पढ़ें
- [Commands](/docs/session-commands) — हर `open` फ़्लैग
- [wdio session](/docs/session) — डिफ़ॉल्ट लूप