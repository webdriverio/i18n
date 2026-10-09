---
id: targets
title: اهداف نشست
description: با wdio session یک مرورگر، اپلیکیشن موبایل، اپلیکیشن دسکتاپ، اپلیکیشن Electron یا یک دستگاه ابری را باز کنید.
---

`wdio session open` نشست را آغاز می‌کند. آرگومان اول، هدف است. از نشست `default` دوباره استفاده کنید. فقط زمانی `-s <name>` را بدهید که هم‌زمان به دو نشست نیاز دارید. وقتی هدف به Appium، یک درایور دسکتاپ یا اعتبارنامه‌های ابری نیاز دارد، ابتدا `npx wdio session doctor <target>` را اجرا کنید.

پخش‌کننده‌های Chrome، Android و Electron همگی همان [اپلیکیشن نمایشی WebdriverIO](https://github.com/webdriverio/native-demo-app) را کنترل می‌کنند (اپلیکیشن آزمایشی Expo، تگ `v2.2.0`). Chrome و Electron از یک سرور وب محلی Expo در یک پنجرهٔ دسکتاپ معمولی استفاده می‌کنند. Android [فایل apk نسخهٔ v2.2.0](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`) را نصب می‌کند. iOS اپلیکیشن شبیه‌ساز نسخهٔ v2.2.0 (`org.wdiodemoapp`) را نصب می‌کند و از `touchId` استفاده می‌کند. هر پخش‌کننده فرمان را تایپ می‌کند و سپس پنجره نتیجه را نشان می‌دهد. پخش را متوقف کنید، یا به فرمان قبلی یا بعدی بروید تا خطی را که پنجره را تغییر داده بخوانید.

مسیر مشترک این است: اپلیکیشن را باز کنید، با `alice@webdriver.io` / `supersecret` وارد شوید، به لوگوی ربات ("You found me!!!") برسید و سپس پازل ۹ تکه را کامل کنید. Chrome و Electron همچنین یک موقعیت مکانی و یک ساعت شبانه را در نمای Weather تنظیم می‌کنند، WebView درون‌برنامه‌ای صفحهٔ اصلی WebdriverIO را باز می‌کنند و کاروسل را می‌کشند. پخش‌کنندهٔ Android صفحهٔ swipe بومی را تا آن ربات اسکرول می‌کند. `export` یک spec از نوع Mocha از هر نشستی که همین حالا کنترل کرده‌اید می‌نویسد.

<a id="postcard"></a>

## مرورگرها

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome به‌صورت headless باز می‌شود. برای نمایش پنجره `--headed` را اضافه کنید. Chrome، Firefox و Edge اگر نصب نباشند، در اولین استفاده دانلود می‌شوند. Safari به macOS نیاز دارد.

### User agent در حالت headless

Chrome و Edge در حالت headless خود را در user agent با `HeadlessChrome/<version>` معرفی می‌کنند. یک پنجرهٔ قابل‌مشاهده از همان مرورگر `Chrome/<version>` را ارسال می‌کند. بسیاری از سایت‌ها درخواست‌های دارای توکن headless را رد می‌کنند: Akamai پاسخ "Access Denied" می‌دهد و Cloudflare پیام "Just a moment..." را نشان می‌دهد. آن‌ها بر اساس خود درخواست و پیش از اجرای هر اسکریپتی در صفحه تصمیم می‌گیرند. در این صورت یک agent صفحهٔ مسدودسازی‌ای را می‌بیند که شخصی که همان سایت را باز می‌کند هرگز با آن مواجه نمی‌شود.

بنابراین یک نشست headless در Chrome یا Edge همان user agent را ارسال می‌کند که یک پنجرهٔ قابل‌مشاهده از همان مرورگر ارسال می‌کرد. این کار فقط توکن را تغییر می‌دهد. خودکارسازی را پنهان نمی‌کند:

- `navigator.webdriver` همچنان `true` می‌ماند.
- نشانگرهای خود chromedriver همچنان روی صفحه هستند.
- سایت‌هایی که خودکارسازی را بررسی می‌کنند همچنان آن را می‌بینند.

تا زمانی که user agent بازنویسی شده است، Chrome هیچ user agent client hint ارسال نمی‌کند، بنابراین `navigator.userAgentData.brands` خالی است. این بازنویسی به WebDriver BiDi نیاز دارد، پس نشستی که با `--no-bidi` باز شود user agent حالت headless را حفظ می‌کند.

برای ارسال یک user agent مشخص، آن را به‌عنوان آرگومان مرورگر بدهید. در این صورت نشست به user agent دست نمی‌زند:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

اگر یک سایت همچنان بررسی ربات را نشان می‌دهد، یک پنجرهٔ قابل‌مشاهده با `--headed` را امتحان کنید. اگر آن هم مسدود شد، سایت اجازهٔ ورود مرورگرهای خودکار را نمی‌دهد. به‌جای تلاش برای عبور از بررسی، این موضوع را گزارش دهید.

پنجرهٔ headed در Chrome نوار زبانه‌ها و نوار آدرس خود را حفظ می‌کند و همین راه تشخیص آن از یک پنجرهٔ Electron است. `--viewport 1280x800` یک صفحهٔ مرورگر معمولی است. در وب، اپلیکیشن از یک نوار کناری سمت چپ استفاده می‌کند. لوگوی WebdriverIO در بالای آن نوار کناری قرار دارد. آیتم‌ها عبارت‌اند از Home، Weather، Web، Login، Forms، Swipe، Drag، Perms و Data. صفحهٔ اصلی، مرورگر و دسکتاپ را در کنار iOS و Android فهرست می‌کند.

Weather مقادیر `navigator.geolocation` و `Date` را می‌خواند. `geolocation 35.6762 139.6503` توکیو است. این تنظیم در بارگذاری بعدی اعمال می‌شود، پس پیش از `click "aria/Weather"` فرمان `reload` را اجرا کنید. سپس ویجت، توکیو، ۲۱ درجه و باران را نشان می‌دهد. `emulate clock 2026-06-21T23:30:00Z` همان کارت را از آسمان روز به آسمان شب تغییر می‌دهد و ساعت را روی 11:30 PM تنظیم می‌کند. دومین `emulate clock` جایگزین اولی می‌شود.

زبانهٔ WebView نشانی `https://webdriver.io/` را درون اپلیکیشن بارگذاری می‌کند. Login حدود ۱٫۵ ثانیه منتظر می‌ماند، سپس یک دیالوگ با متن `Success` و `You are logged in!` باز می‌کند. دکمهٔ LOGIN در طول این انتظار یک کنترل نارنجی ۲۰۰×۵۰ باقی می‌ماند. `dialog accept` دیالوگ را می‌بندد. `swipe` فقط مخصوص موبایل است. برای ورق زدن کاروسل، `[data-testid=Carousel]` را دو بار روی `aria/Next card` بکشید. نسخهٔ وب ضبط‌شده به `pointerup` روی `document` گوش می‌دهد، بنابراین کشیدن می‌تواند روی کاروسل شروع شود و اشاره‌گر روی `Next card` که بیرون از کاروسل قرار دارد رها شود. `scroll down --px 560` ربات WebdriverIO را به دید می‌آورد. زیرنویس زیر آن "You found me!!!" است. تکه‌های پازل `aria/drag-l2` تا `aria/drag-l3` هستند که روی هدف متناظر `aria/drop-…` رها می‌شوند. ترتیب سینی عبارت است از `l2`، `r3`، `r1`، `c1`، `c3`، `r2`، `c2`، `l1`، `l3`.

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

`drag` را برای `r3`، `r1`، `c1`، `c3`، `r2`، `c2`، `l1` و `l3` تکرار کنید.

<SessionTarget id="browser" />

`--viewport 1280x720` اندازهٔ اولیه را تنظیم می‌کند. `--arg` یک آرگومان مرورگر اضافه می‌کند و می‌تواند تکرار شود. `--profile <dir>` یک پروفایل را بین دفعات باز کردن حفظ می‌کند.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android و iOS

Android و iOS از طریق Appium 3 اجرا می‌شوند. `doctor android` نبود سرور یا درایور را همراه با فرمان نصب گزارش می‌دهد.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. یک بستهٔ Android نصب‌شده از `--package` و `--activity` استفاده می‌کند. وب موبایل به‌جای اپلیکیشن از `--browser chrome` یا `--browser safari` استفاده می‌کند. `--appium-url http://127.0.0.1:4723/` به سروری که از قبل در حال اجراست متصل می‌شود. یک URL اپلیکیشن ابری مانند `bs://…` به‌صورت `--app` عبور داده می‌شود و به‌عنوان فایل محلی در نظر گرفته نمی‌شود.

<a id="native-boarding-pass"></a>

### اپلیکیشن نمایشی بومی

روی یک شبیه‌ساز یا دستگاه، همان اپلیکیشن آزمایشی، فایل apk نسخهٔ v2.2.0 است:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` تا هشت دقیقه منتظر می‌ماند. UiAutomator2 پیش از قابل‌استفاده شدن اپلیکیشن یک سرور نصب می‌کند و instrumentation را آغاز می‌کند و این کندتر از اجرای یک مرورگر است. اولین درخواست دوباره تلاش نمی‌شود: تلاش مجدد یک نشست Appium دوم را روی همان دستگاه آغاز می‌کند، در حالی که اولی هنوز در حال نصب است. `tap "~Login"`، سپس `fill` و بعد `tap "~button-LOGIN"` با همان ایمیل و رمز عبور وارد می‌شود. در صفحه‌های کوتاه، دکمهٔ LOGIN پایین‌تر از ناحیهٔ قابل‌مشاهده قرار دارد، پس پیش از آن tap، `~Login-screen` را اسکرول کنید. `dialog accept` هشدار موفقیت را می‌بندد و باید پس از نمایش آن هشدار روی صفحه اجرا شود. متن هشدار `Success` / `You are logged in!` است.

دکمهٔ اثر انگشت `~button-biometric` است. این دکمه فقط پس از ثبت یک اثر انگشت روی فرم ورود ظاهر می‌شود، بنابراین این پخش‌کننده روی آن tap نمی‌کند. `exec -e "await browser.fingerPrint(1)"` به درخواست سیستم پاسخ می‌دهد (`fingerPrint` فقط مخصوص Android است؛ هیچ زیرفرمان `wdio session` برای آن وجود ندارد).

`tap "~Webview"` همان WebView درون‌برنامه‌ای `https://webdriver.io/` است. روی یک شبیه‌ساز نرم‌افزاری تک‌پردازنده‌ای، رندرکنندهٔ WebView پس از برچسب LOADING با `SIGTRAP` در `libmonochrome` از کار می‌افتد و صفحه هرگز نمایش داده نمی‌شود. پخش‌کننده به آن زبانه کاری ندارد.

`tap "~Swipe"` کاروسل را باز می‌کند. `swipe left` آن را ورق نمی‌زند: کاروسل از نوع `react-native-reanimated-carousel` است و یک swipe با UIAutomator به کارت اول بازمی‌گردد. یک `exec` از `mobile: swipeGesture` روی scroll view، به‌صورت تکراری، چیزی است که ربات و زیرنویس "You found me!!!" را نمایان می‌کند. یک `swipe up` تمام‌صفحه از لبهٔ پایین، به‌جای آن رابط عکس‌برداری از صفحهٔ Android را باز می‌کند. `drag "~drag-l2" "~drop-l2"` (و هشت جفت دیگر، به ترتیب سینی) پازل را کامل می‌کند. فریم آخر ربات مونتاژشده و کنترل تلاش مجدد است.

`-s android` این نشست را در کنار نشست مرورگر نگه می‌دارد. وقتی تنها نشست است، `-s android` را حذف کنید. `open` از بسته و activity که از قبل با apk نصب شده استفاده می‌کند، همراه با `--no-reset` تا اثر انگشت ثبت‌شده باقی بماند. `"~Login"` برچسب دسترس‌پذیری زبانه است. `wait` برای نشست بومی کاربرد ندارد.

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

`drag` را برای `r3`، `r1`، `c1`، `c3`، `r2`، `c2`، `l1` و `l3` تکرار کنید.

<SessionTarget id="android" />

### شبیه‌ساز iOS

همین صفحه‌ها در نسخهٔ شبیه‌ساز v2.2.0 وجود دارند، [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). آن را از حالت فشرده خارج کنید و `wdiodemoapp.app` را روی یک شبیه‌ساز روشن نصب کنید (`xcrun simctl install booted`). شناسهٔ bundle برابر `org.wdiodemoapp` است. آن فایل اجرایی یک اپلیکیشن iPhone Simulator است (arm64، iOS 15.1 یا جدیدتر). به macOS و Xcode نیاز دارد. در این صفحه پخش‌کننده‌ای برای iOS وجود ندارد.

Login، swipe و drag از همان برچسب‌های دسترس‌پذیری Android استفاده می‌کنند. `swipe left` روی شبیه‌ساز اجرا نشد. روی apk اندروید، این فرمان این کاروسل را ورق نمی‌زند. فراخوانی بیومتریک `browser.touchId(true)` است، نه `fingerPrint`. `touchId` نیاز دارد که capability با نام `appium:allowTouchIdEnroll` روی `true` تنظیم شده باشد (آن را با `--capabilities` بدهید). پیش از باز کردن فرم ورود، Touch ID را روی شبیه‌ساز ثبت کنید، وگرنه دکمهٔ بیومتریک پنهان می‌ماند.

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

`drag` را برای هشت تکهٔ دیگر، به همان ترتیب سینی Android، تکرار کنید.

## اپلیکیشن‌های دسکتاپ

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` به macOS نیاز دارد. `windows` به Windows نیاز دارد. `--app Root` به دسکتاپ متصل می‌شود. یک اپلیکیشن نصب‌شدهٔ Windows با شناسهٔ اپلیکیشن خود نام‌گذاری می‌شود، برای مثال `--app Microsoft.WindowsCalculator`. یک مسیر یا یک `.exe` به‌عنوان فایل تفسیر می‌شود.

<a id="launch-console"></a>

## Electron، Tauri و Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` و `open dioxus ./my-app` نیاز دارند درایورشان روی `PATH` باشد، مگر آنکه بستهٔ سرویس خودش نشست را آغاز کند. روی Linux بدون `DISPLAY` یا `WAYLAND_DISPLAY`، Xvfb یا weston را نصب کنید. Electron روی پروتکل کلاسیک WebDriver باقی می‌ماند. برای ارسال یک فلگ به اپلیکیشن از `--app-arg` استفاده کنید، از جمله `--app-arg=--no-sandbox` وقتی محیط آن را لازم دارد. مقداری که با `-` شروع می‌شود باید از `=` استفاده کند، زیرا در غیر این صورت parser سخت‌گیر آن را به‌عنوان یک گزینهٔ مستقل در نظر می‌گیرد.

`electron` و `@wdio/electron-service` را در پوشه‌ای که باز می‌کنید نصب کنید. `main.js` از `import` استفاده می‌کند، پس `package.json` آن پوشه به `"type": "module"` نیاز دارد (یا فایل را `main.mjs` نام‌گذاری کنید). اندازهٔ پنجره را با ناحیهٔ کاری تنظیم کنید تا یک نمایشگر کوچک‌تر نوار عنوان را بیرون از صفحه قرار ندهد:

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

فرمان open زیر sandbox رندرکننده را غیرفعال نمی‌کند. فقط زمانی `--app-arg=--no-sandbox` را اضافه کنید که محیط نمی‌تواند Electron را با sandbox اجرا کند، مانند برخی کانتینرهای Linux. پخش‌کنندهٔ Electron همان URL مربوط به Expo را در یک پنجرهٔ ۱۲۸۰×۸۰۰ بدون نوار آدرس بارگذاری می‌کند. لوگو، نوار کناری، کارت آب‌وهوا، کارت ورود، کاروسل و پازل با مرورگر یکسان هستند. `-s electron` نام نشستی است که در کنار دموی مرورگر استفاده می‌شود. Electron روی پروتکل کلاسیک باقی می‌ماند، بنابراین `geolocation` و `emulate clock` به‌جای BiDi از طریق Chromedriver انجام می‌شوند. فرمان‌ها با Chrome یکسان هستند، از جمله `reload` پیش از Weather، به‌جز دیالوگ موفقیت. روی Linux، `dialog accept` هشدار بومی را می‌پذیرد ولی حباب آن روی صفحه نقش‌بسته باقی می‌ماند. آن حباب بخشی از صفحه نیست، پس یک کلیک بعدی نمی‌تواند به آن برسد. ضبط، `window.alert` را با یک دیالوگ درون‌صفحه‌ای جایگزین می‌کند و `click "aria/OK"` را اجرا می‌کند. دکمهٔ LOGIN در حین انتظار یک کنترل نارنجی ۲۰۰×۵۰ باقی می‌ماند. کاروسل، اسکرول و پازل از همان فرمان‌های Chrome استفاده می‌کنند.

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

`drag` را برای `r3`، `r1`، `c1`، `c3`، `r2`، `c2`، `l1` و `l3` تکرار کنید.

<SessionTarget id="electron" />

## دستگاه‌های ابری

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

مقدار `--provider` یکی از `browserstack`، `saucelabs`، `testingbot` یا `testmu` است. نام کاربری و کلید دسترسی ارائه‌دهنده را export کنید. `doctor <provider>` بررسی می‌کند که آن‌ها تنظیم شده باشند و مقادیرشان را چاپ نمی‌کند. وقتی اپلیکیشن تحت آزمون روی دستگاه شماست، `--tunnel` تونل ارائه‌دهنده را راه‌اندازی می‌کند.

## یک پیکربندی WebdriverIO

`open` می‌تواند به‌جای نام هدف، یک فایل پیکربندی و یک اندیس capability دریافت کند:

```sh
npx wdio session open ./wdio.conf.ts 0
```

یک پیکربندی TypeScript، اگر پروژهٔ شما `tsx` داشته باشد، با آن بارگذاری می‌شود. `tsx` اختیاری است: بدون آن، پیکربندی از طریق type stripping در Node یا jiti بارگذاری می‌شود و پیکربندی‌ای که بارگذاری نشود، `MISSING_DEPENDENCY` را همراه با یک خط نصب گزارش می‌دهد.

`--hostname`، `--port`، `--path` و `--protocol` نشست را به یک endpoint از WebDriver که از قبل در حال اجراست هدایت می‌کنند. بستن نشست آن endpoint را متوقف نمی‌کند.

## عیب‌یابی

| پیام | چه کاری انجام دهید |
| --- | --- |
| `MISSING_DEPENDENCY` | بسته‌ای را که در خطا نام برده شده نصب کنید. `doctor <target>` همان خط نصب را چاپ می‌کند. Electron به `@wdio/electron-service` و `electron` در پوشه‌ای که باز می‌کنید نیاز دارد. |
| `MISSING_APPIUM_DRIVER` | خط `npx appium driver install …` را از خطا اجرا کنید. |
| `MISSING_BINARY` | درایور نام‌برده (`tauri-driver` یا `wdio-dioxus-driver`) را روی `PATH` قرار دهید. |
| `MISSING_CREDENTIALS` | متغیرهایی را که در خطا نام برده شده‌اند export کنید. |
| `NOT_SUPPORTED` | `macos` فقط مخصوص macOS و `windows` فقط مخصوص Windows است. `swipe` فقط مخصوص موبایل است. در Chrome و Electron، `[data-testid=Carousel]` را روی `aria/Next card` بکشید. |
| `No dialog open.` | هشدار باز نیست. در Android، صبر کنید تا هشدار موفقیت نمایان شود و سپس `dialog accept` را اجرا کنید. در Electron روی Linux، حباب بومی ممکن است پس از `acceptAlert` روی صفحه بماند و همچنان گزارش دهد که دیالوگی وجود ندارد. پخش‌کننده به‌جای آن از یک دیالوگ درون‌صفحه‌ای و `click "aria/OK"` استفاده می‌کند. |
| `The instrumentation process cannot be initialized` | UiAutomator2 به‌موقع شروع به گوش دادن نکرد. نشست پس از حداکثر ۱۸۰ ثانیه برای نصب سرور، ۲۴۰ ثانیه برای آن راه‌اندازی در نظر می‌گیرد. روی یک شبیه‌ساز نرم‌افزاری، یک CPU و یک skin با ابعاد ۷۲۰×۱۲۸۰ باعث می‌شود apk نسخهٔ v2.2.0 به صفحهٔ اصلی برسد. یک image با ابعاد ۱۰۸۰×۲۴۰۰ و دو CPU باعث ANR در `system_server` می‌شود و سرور هرگز گوش نمی‌دهد. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | کلاینت در حالی منصرف شد که Appium هنوز در حال ایجاد نشست بود. Android و iOS برای آن درخواست اول ۴۸۰ ثانیه صبر می‌کنند و آن را دوباره ارسال نمی‌کنند. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` برای نشست‌های مرورگر است. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` فراخوانی مخصوص Android است. iOS از `browser.touchId` استفاده می‌کند. |
| `App not found:` | مسیر یک apk موجود را بدهید، یا برای اپلیکیشنی که از قبل نصب شده از `--package` و `--activity` استفاده کنید. |
| `Pass --package <id>.` | `deeplink` در Android به `--package` نیاز دارد. |

## گام‌های بعدی

- [Snapshotها و refها](/docs/session/snapshots) — خواندن صفحه پس از `open`
- [فرمان‌ها](/docs/session-commands) — تمام فلگ‌های `open`
- [wdio session](/docs/session) — حلقهٔ پیش‌فرض