---
id: boilerplates
title: پروژه‌های آماده
---

با گذشت زمان، جامعه ما چندین پروژه را توسعه داده است که می‌توانید از آن‌ها به عنوان الهام برای راه‌اندازی مجموعه آزمون خود استفاده کنید.

# پروژه‌های آماده نسخه ۹

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

پروژه آماده اختصاصی ما برای مجموعه آزمون‌های Cucumber. ما بیش از ۱۵۰ تعریف گام از پیش تعریف شده برای شما ایجاد کرده‌ایم، بنابراین می‌توانید بلافاصله شروع به نوشتن فایل‌های ویژگی در پروژه خود کنید.

- فریم‌ورک:
    - Cucumber
    - WebdriverIO
- ویژگی‌ها:
    - بیش از ۱۵۰ گام از پیش تعریف شده که تقریباً همه چیزهایی که نیاز دارید را پوشش می‌دهد
    - یکپارچه‌سازی با قابلیت Multiremote وب‌درایور آی‌او
    - اپلیکیشن نمایشی اختصاصی

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
پروژه آماده برای اجرای آزمون‌های WebdriverIO با Jasmine با استفاده از ویژگی‌های Babel و الگوی اشیاء صفحه.

- فریم‌ورک‌ها
    - WebdriverIO
    - Jasmine
- ویژگی‌ها
    - الگوی اشیاء صفحه
    - یکپارچه‌سازی با Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
پروژه آماده برای اجرای آزمون‌های WebdriverIO روی یک اپلیکیشن Electron حداقلی.

- فریم‌ورک‌ها
    - WebdriverIO
    - Mocha
- ویژگی‌ها
    - شبیه‌سازی API الکترون

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

این پروژه آماده دارای آزمون‌های موبایلی WebdriverIO 9 با Cucumber، TypeScript و Appium برای پلتفرم‌های Android و iOS است که از الگوی Page Object Model پیروی می‌کند. ویژگی‌ها شامل گزارش‌دهی جامع، ثبت وقایع، حرکات موبایل، پیمایش از برنامه به وب و یکپارچه‌سازی CI/CD است.

- فریم‌ورک‌ها:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- ویژگی‌ها:
    - پشتیبانی از چندین پلتفرم
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - حرکات موبایلی
      - اسکرول
      - سوایپ
      - فشار طولانی
      - مخفی کردن کیبورد
    - پیمایش از برنامه به وب
      - تغییر زمینه
      - پشتیبانی از WebView
      - اتوماسیون مرورگر (Chrome/Safari)
    - وضعیت تازه برنامه
      - بازنشانی خودکار برنامه بین سناریوها
      - رفتار بازنشانی قابل پیکربندی (noReset, fullReset)
    - پیکربندی دستگاه
      - مدیریت متمرکز دستگاه
      - تغییر آسان پلتفرم
    - نمونه ساختار دایرکتوری برای JavaScript / TypeScript. زیر برای نسخه JS است، نسخه TS نیز دارای همان ساختار است.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
تولید خودکار کلاس‌های Page Object WebdriverIO و مشخصات آزمون Mocha از فایل‌های Gherkin .feature — کاهش تلاش دستی، بهبود سازگاری و تسریع اتوماسیون QA. این پروژه نه تنها کدهای سازگار با webdriver.io تولید می‌کند، بلکه تمام عملکردهای webdriver.io را بهبود می‌بخشد. ما دو نسخه ایجاد کرده‌ایم، یکی برای کاربران JavaScript و دیگری برای کاربران TypeScript. اما هر دو پروژه به همان روش کار می‌کنند.

***نحوه کارکرد؟***
- این فرآیند از یک اتوماسیون دو مرحله‌ای پیروی می‌کند:
- مرحله ۱: Gherkin به stepMap (تولید فایل‌های stepMap.json)
  - تولید فایل‌های stepMap.json:
    - تجزیه فایل‌های .feature نوشته شده به سینتکس Gherkin.
    - استخراج سناریوها و گام‌ها.
    - تولید یک فایل .stepMap.json ساختاریافته شامل:
      - اقدام برای انجام (مثلاً click، setText، assertVisible)
      - selectorName برای نگاشت منطقی
      - selector برای عنصر DOM
      - یادداشت برای مقادیر یا تأیید
- مرحله ۲: stepMap به کد (تولید کد WebdriverIO).
  از stepMap.json استفاده می‌کند برای تولید:
  - ایجاد یک کلاس base page.js با متدهای مشترک و تنظیمات browser.url().
  - ایجاد کلاس‌های الگوی شی صفحه (POM) سازگار با WebdriverIO برای هر ویژگی در test/pageobjects/.
  - ایجاد مشخصات آزمون مبتنی بر Mocha.
- نمونه ساختار دایرکتوری برای JavaScript / TypeScript. زیر برای نسخه JS است، نسخه TS نیز دارای همان ساختار است.
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# پروژه‌های آماده نسخه ۸

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- فریم‌ورک: WDIO-V8 با Cucumber (V8x).
- ویژگی‌ها:
    - الگوی اشیاء صفحه با رویکرد مبتنی بر کلاس ES6/ES7 و پشتیبانی از TypeScript
    - نمونه‌هایی از گزینه انتخابگر چندگانه برای پرس‌وجوی عنصر با بیش از یک انتخابگر در یک زمان
    - نمونه‌هایی از اجرای چند مرورگر و مرورگر بدون سر با استفاده از Chrome و Firefox
    - یکپارچه‌سازی با خدمات ابری BrowserStack، Sauce Labs، TestMu AI (سابقاً LambdaTest)
    - نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    - پشتیبانی از پایگاه داده برای هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر پرس‌وجو / دریافت مجموعه نتایج و غیره با نمونه‌هایی برای آزمایش E2E
    - گزارش‌دهی متعدد (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit روی WebServer.
    - نمونه‌هایی با اپلیکیشن نمونه https://search.yahoo.com/ و http://the-internet.herokuapp.com.
    - فایل‌های `.config` خاص BrowserStack، Sauce Labs، TestMu AI (سابقاً LambdaTest) و Appium (برای پخش روی دستگاه موبایل). برای تنظیم یک کلیکی Appium روی ماشین محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- فریم‌ورک: WDIO-V8 با Mocha (V10x).
- ویژگی‌ها:
    -  الگوی اشیاء صفحه با رویکرد مبتنی بر کلاس ES6/ES7 و پشتیبانی از TypeScript
    -  نمونه‌هایی با اپلیکیشن نمونه https://search.yahoo.com و http://the-internet.herokuapp.com
    -  نمونه‌هایی از اجرای چند مرورگر و مرورگر بدون سر با استفاده از Chrome و Firefox
    -  یکپارچه‌سازی با خدمات ابری BrowserStack، Sauce Labs، TestMu AI (سابقاً LambdaTest)
    -  گزارش‌دهی متعدد (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit روی WebServer.
    -  نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    -  نمونه‌هایی از اتصال به پایگاه داده به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر پرس‌وجو / دریافت مجموعه نتایج و غیره با نمونه‌هایی برای آزمایش E2E
    -  فایل‌های `.config` خاص BrowserStack، Sauce Labs، TestMu AI (سابقاً LambdaTest) و Appium (برای پخش روی دستگاه موبایل). برای تنظیم یک کلیکی Appium روی ماشین محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- فریم‌ورک: WDIO-V8 با Jasmine (V4x).
- ویژگی‌ها:
    -  الگوی اشیاء صفحه با رویکرد مبتنی بر کلاس ES6/ES7 و پشتیبانی از TypeScript
    -  نمونه‌هایی با اپلیکیشن نمونه https://search.yahoo.com و http://the-internet.herokuapp.com
    -  نمونه‌هایی از اجرای چند مرورگر و مرورگر بدون سر با استفاده از Chrome و Firefox
    -  یکپارچه‌سازی با خدمات ابری BrowserStack، Sauce Labs، TestMu AI (سابقاً LambdaTest)
    -  گزارش‌دهی متعدد (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit روی WebServer.
    -  نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    -  نمونه‌هایی از اتصال به پایگاه داده به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر پرس‌وجو / دریافت مجموعه نتایج و غیره با نمونه‌هایی برای آزمایش E2E
    -  فایل‌های `.config` خاص BrowserStack، Sauce Labs، TestMu AI (سابقاً LambdaTest) و Appium (برای پخش روی دستگاه موبایل). برای تنظیم یک کلیکی Appium روی ماشین محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

این پروژه آماده دارای آزمون‌های WebdriverIO 8 با cucumber و typescript است که از الگوی اشیاء صفحه پیروی می‌کند.

- فریم‌ورک‌ها:
    - WebdriverIO v8
    - Cucumber v8

- ویژگی‌ها:
    - Typescript v5
    - الگوی اشیاء صفحه
    - Prettier
    - پشتیبانی از چند مرورگر
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - اجرای موازی بین مرورگرها
    - Appium
    - یکپارچه‌سازی با خدمات ابری BrowserStack و Sauce Labs
    - سرویس داکر
    - سرویس اشتراک‌گذاری داده
    - فایل‌های پیکربندی جداگانه برای هر سرویس
    - مدیریت داده‌های آزمایشی و خواندن بر اساس نوع کاربر
    - گزارش‌دهی
      - Dot
      - Spec
      - گزارش HTML چندگانه cucumber با اسکرین‌شات خطا
    - خطوط لوله Gitlab برای مخزن Gitlab
    - اقدامات Github برای مخزن Github
    - Docker compose برای راه‌اندازی هاب داکر
    - آزمایش دسترسی‌پذیری با استفاده از AXE
    - آزمایش بصری با استفاده از Applitools
    - مکانیزم ثبت وقایع


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - شامل سناریوی آزمایشی نمونه در cucumber
    - گزارش‌های HTML cucumber یکپارچه با ویدیوهای جاسازی شده در موارد شکست
    - سرویس‌های یکپارچه Lambdatest و CircleCI
    - آزمایش یکپارچه بصری، دسترسی‌پذیری و API
    - قابلیت ایمیل یکپارچه
    - باکت s3 یکپارچه برای ذخیره‌سازی و بازیابی گزارش‌های آزمون

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

پروژه قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شروع آزمون پذیرش برنامه‌های وب شما با استفاده از آخرین WebdriverIO، Mocha و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - گزارش‌دهی Serenity BDD

- ویژگی‌ها
    - [الگوی فیلمنامه](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - اسکرین‌شات خودکار در هنگام شکست آزمون، جاسازی شده در گزارش‌ها
    - تنظیم یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های نمایشی Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشر شده در GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

پروژه قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شروع آزمون پذیرش برنامه‌های وب شما با استفاده از آخرین WebdriverIO، Cucumber و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - گزارش‌دهی Serenity BDD

- ویژگی‌ها
    - [الگوی فیلمنامه](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - اسکرین‌شات خودکار در هنگام شکست آزمون، جاسازی شده در گزارش‌ها
    - تنظیم یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های نمایشی Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشر شده در GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
پروژه آماده برای اجرای آزمون‌های WebdriverIO در Headspin Cloud (https://www.headspin.io/) با استفاده از ویژگی‌های Cucumber و الگوی اشیاء صفحه.
- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - یکپارچه‌سازی ابری با [Headspin](https://www.headspin.io/)
    - پشتیبانی از الگوی شی صفحه
    - شامل سناریوهای نمونه نوشته شده به سبک اعلامی BDD
    - گزارش‌های HTML cucumber یکپارچه

# پروژه‌های آماده نسخه ۷
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

پروژه آماده برای اجرای آزمون‌های Appium با WebdriverIO برای:

- برنامه‌های بومی iOS/Android
- برنامه‌های هیبریدی iOS/Android
- مرورگر Chrome در Android و Safari در iOS

این پروژه آماده شامل موارد زیر است:

- فریم‌ورک: Mocha
- ویژگی‌ها:
    - پیکربندی‌ها برای:
        - برنامه iOS و Android
        - مرورگرهای iOS و Android
    - کمک‌کننده‌ها برای:
        - WebView
        - حرکات
        - هشدارهای بومی
        - انتخاب‌کننده‌ها
     - نمونه آزمون‌ها برای:
        - WebView
        - ورود
        - فرم‌ها
        - سوایپ
        - مرورگرها

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
آزمون‌های وب ATDD با Mocha، WebdriverIO v6 با PageObject

- فریم‌ورک‌ها
  - WebdriverIO (v7)
  - Mocha
- ویژگی‌ها
  - مدل [Page Object](pageobjects)
  - یکپارچه‌سازی Sauce Labs با [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - گزارش Allure
  - کپچر خودکار اسکرین‌شات برای آزمون‌های ناموفق
  - نمونه CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

پروژه آماده برای اجرای آزمون‌های E2E با Mocha.

- فریم‌ورک‌ها:
    - WebdriverIO (v7)
    - Mocha
- ویژگی‌ها:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [آزمون‌های رگرسیون بصری](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   الگوی اشیاء صفحه
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) و [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   نمونه GitHub Actions
    -   گزارش Allure (اسکرین‌شات در هنگام شکست)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

پروژه آماده برای اجرای آزمون‌های **WebdriverIO v7** برای موارد زیر:

[اسکریپت‌های WDIO 7 با TypeScript در فریم‌ورک Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[اسکریپت‌های WDIO 7 با TypeScript در فریم‌ورک Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[اجرای اسکریپت WDIO 7 در Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[گزارش‌های شبکه](https://github.com/17thSep/MonitorNetworkLogs/)

پروژه آماده برای:

- ضبط گزارش‌های شبکه
- ضبط تمام فراخوانی‌های GET/POST یا یک API REST خاص
- تأیید پارامترهای درخواست
- تأیید پارامترهای پاسخ
- ذخیره تمام پاسخ‌ها در یک فایل جداگانه

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

پروژه آماده برای اجرای آزمون‌های appium برای برنامه‌های بومی و مرورگر موبایل با استفاده از cucumber v7 و wdio v7 با الگوی شی صفحه.

- فریم‌ورک‌ها
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- ویژگی‌ها
    - برنامه‌های بومی Android و iOS
    - مرورگر Chrome در Android
    - مرورگر Safari در iOS
    - الگوی شی صفحه
    - شامل سناریوهای آزمون نمونه در cucumber
    - یکپارچه با چندین گزارش HTML cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

این یک پروژه قالب برای کمک به شما در نمایش نحوه اجرای آزمون‌های webdriverio از برنامه‌های وب با استفاده از آخرین WebdriverIO و فریم‌ورک Cucumber است. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO در docker استفاده کنید.

این پروژه شامل:

- DockerFile
- پروژه cucumber

بیشتر بخوانید در: [وبلاگ Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

این یک پروژه قالب برای کمک به شما در نمایش نحوه اجرای آزمون‌های electronJS با استفاده از WebdriverIO است. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO electronJS استفاده کنید.

این پروژه شامل:

- برنامه نمونه electronjs
- اسکریپت‌های آزمون cucumber نمونه

بیشتر بخوانید در: [وبلاگ Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

این یک پروژه قالب برای کمک به شما در نمایش نحوه اتوماسیون برنامه‌های ویندوز با استفاده از winappdriver و WebdriverIO است. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های windappdriver و WebdriverIO استفاده کنید.

بیشتر بخوانید در: [وبلاگ Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


این یک پروژه قالب برای کمک به شما در نمایش نحوه اجرای قابلیت چند راه دور webdriverio با آخرین WebdriverIO و فریم‌ورک Jasmine است. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO در docker استفاده کنید.

این پروژه استفاده می‌کند از:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

پروژه قالب برای اجرای آزمون‌های appium روی دستگاه‌های واقعی Roku با استفاده از mocha با الگوی شی صفحه.

- فریم‌ورک‌ها
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - گزارش‌دهی Allure

- ویژگی‌ها
    - الگوی شی صفحه
    - Typescript
    - اسکرین‌شات در صورت شکست
    - آزمون‌های نمونه با استفاده از یک کانال نمونه Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

پروژه PoC برای آزمون‌های Cucumber چند راه دور E2E و همچنین آزمون‌های Mocha مبتنی بر داده

- فریم‌ورک:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- ویژگی‌ها:
    - آزمون‌های E2E مبتنی بر Cucumber
    - آزمون‌های مبتنی بر داده Mocha
    - آزمون‌های فقط وب - در پلتفرم‌های محلی و ابری
    - آزمون‌های فقط موبایل - شبیه‌سازهای محلی و ابری از راه دور (یا دستگاه‌ها)
    - آزمون‌های وب + موبایل - چند راه دور - پلتفرم‌های محلی و ابری
    - گزارش‌های متعدد یکپارچه از جمله Allure
    - داده‌های آزمون (JSON / XLSX) به صورت جهانی مدیریت می‌شوند تا داده‌ها (ایجاد شده در لحظه) پس از اجرای آزمون به فایل نوشته شوند
    - گردش کار Github برای اجرای آزمون و آپلود گزارش allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

این یک پروژه قالب برای کمک به نمایش چگونگی اجرای چند راه دور webdriverio با استفاده از سرویس appium و chromedriver با آخرین WebdriverIO است.

- فریم‌ورک‌ها
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- ویژگی‌ها
  - مدل [Page Object](pageobjects)
  - Typescript
  - آزمون‌های وب + موبایل - Multiremote
  - برنامه‌های بومی Android و iOS
  - Appium
  - Chromedriver
  - ESLint
  - نمونه‌های آزمون برای ورود به http://the-internet.herokuapp.com و [برنامه بومی نمونه WebdriverIO](https://github.com/webdriverio/native-demo-app)