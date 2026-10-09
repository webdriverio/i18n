---
id: boilerplates
title: پروژه‌های پایه (Boilerplate)
description: "پروژه‌های پایه جامعه کاربری WebdriverIO را با پیکربندی‌های Mocha، Jasmine، Cucumber، Electron و موبایل مرور کنید تا مجموعه تست خود را راه‌اندازی کنید."
---

در طول زمان، جامعه کاربری ما چندین پروژه توسعه داده است که می‌توانید از آن‌ها به عنوان الهام برای راه‌اندازی مجموعه تست خود استفاده کنید.

# پروژه‌های پایه نسخه v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

پروژه پایه اختصاصی خودمان برای مجموعه‌های تست Cucumber. ما بیش از ۱۵۰ تعریف گام (step definition) از پیش تعریف‌شده برای شما ایجاد کرده‌ایم، بنابراین می‌توانید بلافاصله نوشتن فایل‌های feature را در پروژه خود آغاز کنید.

- فریم‌ورک:
    - Cucumber
    - WebdriverIO
- ویژگی‌ها:
    - بیش از ۱۵۰ گام از پیش تعریف‌شده که تقریباً هر چیزی را که نیاز دارید پوشش می‌دهند
    - یکپارچه‌سازی قابلیت multi-remote در WebdriverIO
    - اپلیکیشن دمو اختصاصی

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
پروژه پایه برای اجرای تست‌های WebdriverIO با Jasmine با استفاده از قابلیت‌های Babel و الگوی page objects.

- فریم‌ورک‌ها
    - WebdriverIO
    - Jasmine
- ویژگی‌ها
    - الگوی Page Object
    - یکپارچه‌سازی با Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
پروژه پایه برای اجرای تست‌های WebdriverIO روی یک اپلیکیشن حداقلی Electron.

- فریم‌ورک‌ها
    - WebdriverIO
    - Mocha
- ویژگی‌ها
    - شبیه‌سازی (mocking) API الکترون

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

این پروژه پایه شامل تست‌های موبایل WebdriverIO 9 با Cucumber، TypeScript و Appium برای پلتفرم‌های Android و iOS است و از الگوی Page Object Model پیروی می‌کند. دارای لاگ‌گیری جامع، گزارش‌دهی، حرکات لمسی موبایل، پیمایش از اپلیکیشن به وب و یکپارچه‌سازی CI/CD است.

- فریم‌ورک‌ها:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- ویژگی‌ها:
    - پشتیبانی از چند پلتفرم
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - حرکات لمسی موبایل
      - پیمایش (Scroll)
      - کشیدن (Swipe)
      - لمس طولانی (Long press)
      - پنهان کردن صفحه‌کلید
    - پیمایش از اپلیکیشن به وب
      - تغییر context
      - پشتیبانی از WebView
      - خودکارسازی مرورگر (Chrome/Safari)
    - وضعیت تازه اپلیکیشن
      - بازنشانی خودکار اپلیکیشن بین سناریوها
      - رفتار بازنشانی قابل پیکربندی (noReset، fullReset)
    - پیکربندی دستگاه
      - مدیریت متمرکز دستگاه‌ها
      - تغییر آسان پلتفرم
    - نمونه‌ای از ساختار دایرکتوری برای JavaScript / TypeScript. مورد زیر برای نسخه JS است، نسخه TS نیز همین ساختار را دارد.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
تولید خودکار کلاس‌های Page Object در WebdriverIO و مشخصات تست Mocha از فایل‌های .feature نوشته‌شده با Gherkin — کاهش تلاش دستی، بهبود یکپارچگی و تسریع خودکارسازی QA. این پروژه نه تنها کدهای سازگار با webdriver.io تولید می‌کند، بلکه تمامی قابلیت‌های webdriver.io را نیز ارتقا می‌دهد. ما دو نسخه ایجاد کرده‌ایم، یکی برای کاربران JavaScript و دیگری برای کاربران TypeScript. اما هر دو پروژه به یک شکل کار می‌کنند.

***چگونه کار می‌کند؟***
- این فرآیند از یک خودکارسازی دو مرحله‌ای پیروی می‌کند:
- مرحله ۱: Gherkin به stepMap (تولید فایل‌های stepMap.json)
  - تولید فایل‌های stepMap.json:
    - فایل‌های .feature نوشته‌شده با سینتکس Gherkin را تجزیه می‌کند.
    - سناریوها و گام‌ها را استخراج می‌کند.
    - یک فایل ساختاریافته .stepMap.json تولید می‌کند که شامل موارد زیر است:
      - action برای اجرا (مثلاً click، setText، assertVisible)
      - selectorName برای نگاشت منطقی
      - selector برای عنصر DOM
      - note برای مقادیر یا assertion
- مرحله ۲: stepMap به کد (تولید کد WebdriverIO).
  از stepMap.json برای تولید موارد زیر استفاده می‌کند:
  - تولید یک کلاس پایه page.js با متدهای مشترک و تنظیم browser.url().
  - تولید کلاس‌های Page Object Model (POM) سازگار با WebdriverIO برای هر feature در مسیر test/pageobjects/.
  - تولید مشخصات تست مبتنی بر Mocha.
- نمونه‌ای از ساختار دایرکتوری برای JavaScript / TypeScript. مورد زیر برای نسخه JS است، نسخه TS نیز همین ساختار را دارد.
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
# پروژه‌های پایه نسخه v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- فریم‌ورک: WDIO-V8 با Cucumber (V8x).
- ویژگی‌ها:
    - استفاده از Page Objects Model با رویکرد مبتنی بر کلاس به سبک ES6 /ES7 و پشتیبانی از TypeScript
    - نمونه‌هایی از گزینه چند انتخابگر برای جستجوی عنصر با بیش از یک انتخابگر به طور همزمان
    - نمونه‌هایی از اجرای چند مرورگری و مرورگر headless با استفاده از - Chrome و Firefox
    - یکپارچه‌سازی تست ابری با BrowserStack، Sauce Labs، TestMu AI (که قبلاً LambdaTest نام داشت)
    - نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های تست از منابع داده خارجی همراه با مثال
    - پشتیبانی از پایگاه داده برای هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر نوع کوئری / دریافت مجموعه نتایج و غیره همراه با مثال‌هایی برای تست E2E
    - گزارش‌دهی چندگانه (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit روی وب‌سرور.
    - نمونه‌هایی با اپلیکیشن دمو https://search.yahoo.com/  و http://the-internet.herokuapp.com.
    - فایل `.config` مخصوص BrowserStack، Sauce Labs، TestMu AI (که قبلاً LambdaTest نام داشت) و Appium (برای اجرا روی دستگاه موبایل). برای راه‌اندازی Appium با یک کلیک روی سیستم محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- فریم‌ورک: WDIO-V8 با Mocha (V10x).
- ویژگی‌ها:
    -  استفاده از Page Objects Model با رویکرد مبتنی بر کلاس به سبک ES6 /ES7 و پشتیبانی از TypeScript
    -  نمونه‌هایی با اپلیکیشن دمو https://search.yahoo.com  و http://the-internet.herokuapp.com
    -  نمونه‌هایی از اجرای چند مرورگری و مرورگر headless با استفاده از - Chrome و Firefox
    -  یکپارچه‌سازی تست ابری با BrowserStack، Sauce Labs، TestMu AI (که قبلاً LambdaTest نام داشت)
    -  گزارش‌دهی چندگانه (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit روی وب‌سرور.
    -  نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های تست از منابع داده خارجی همراه با مثال
    -  نمونه‌هایی از اتصال پایگاه داده به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر کوئری / دریافت مجموعه نتایج و غیره همراه با مثال‌هایی برای تست E2E
    -  فایل `.config` مخصوص BrowserStack، Sauce Labs، TestMu AI (که قبلاً LambdaTest نام داشت) و Appium (برای اجرا روی دستگاه موبایل). برای راه‌اندازی Appium با یک کلیک روی سیستم محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- فریم‌ورک: WDIO-V8 با Jasmine (V4x).
- ویژگی‌ها:
    -  استفاده از Page Objects Model با رویکرد مبتنی بر کلاس به سبک ES6 /ES7 و پشتیبانی از TypeScript
    -  نمونه‌هایی با اپلیکیشن دمو https://search.yahoo.com  و http://the-internet.herokuapp.com
    -  نمونه‌هایی از اجرای چند مرورگری و مرورگر headless با استفاده از - Chrome و Firefox
    -  یکپارچه‌سازی تست ابری با BrowserStack، Sauce Labs، TestMu AI (که قبلاً LambdaTest نام داشت)
    -  گزارش‌دهی چندگانه (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit روی وب‌سرور.
    -  نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های تست از منابع داده خارجی همراه با مثال
    -  نمونه‌هایی از اتصال پایگاه داده به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر کوئری / دریافت مجموعه نتایج و غیره همراه با مثال‌هایی برای تست E2E
    -  فایل `.config` مخصوص BrowserStack، Sauce Labs، TestMu AI (که قبلاً LambdaTest نام داشت) و Appium (برای اجرا روی دستگاه موبایل). برای راه‌اندازی Appium با یک کلیک روی سیستم محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

این پروژه پایه شامل تست‌های WebdriverIO 8 با cucumber و typescript است و از الگوی page objects پیروی می‌کند.

- فریم‌ورک‌ها:
    - WebdriverIO v8
    - Cucumber v8

- ویژگی‌ها:
    - Typescript v5
    - الگوی Page Object
    - Prettier
    - پشتیبانی از چند مرورگر
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - اجرای موازی بین مرورگرها
    - Appium
    - یکپارچه‌سازی تست ابری با BrowserStack و Sauce Labs
    - سرویس Docker
    - سرویس اشتراک داده
    - فایل‌های پیکربندی جداگانه برای هر سرویس
    - مدیریت داده‌های تست و خواندن بر اساس نوع کاربر
    - گزارش‌دهی
      - Dot
      - Spec
      - گزارش html چندگانه cucumber همراه با اسکرین‌شات خطاها
    - پایپ‌لاین‌های Gitlab برای مخزن Gitlab
    - Github actions برای مخزن Github
    - Docker compose برای راه‌اندازی docker hub
    - تست دسترس‌پذیری با استفاده از AXE
    - تست بصری با استفاده از Applitools
    - سازوکار لاگ‌گیری


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - شامل سناریوی تست نمونه در cucumber
    - گزارش‌های html یکپارچه cucumber همراه با ویدیوهای جاسازی‌شده در صورت خطا
    - سرویس‌های یکپارچه Lambdatest و CircleCI
    - تست‌های یکپارچه بصری، دسترس‌پذیری و API
    - قابلیت یکپارچه ایمیل
    - باکت s3 یکپارچه برای ذخیره و بازیابی گزارش‌های تست

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

پروژه قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شما در شروع تست پذیرش (acceptance testing) اپلیکیشن‌های وب خود با استفاده از آخرین نسخه WebdriverIO، Mocha و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - گزارش‌دهی Serenity BDD

- ویژگی‌ها
    - [الگوی Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - اسکرین‌شات خودکار هنگام شکست تست، جاسازی‌شده در گزارش‌ها
    - راه‌اندازی یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های دمو Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشرشده در GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

پروژه قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شما در شروع تست پذیرش (acceptance testing) اپلیکیشن‌های وب خود با استفاده از آخرین نسخه WebdriverIO، Cucumber و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - گزارش‌دهی Serenity BDD

- ویژگی‌ها
    - [الگوی Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - اسکرین‌شات خودکار هنگام شکست تست، جاسازی‌شده در گزارش‌ها
    - راه‌اندازی یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های دمو Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشرشده در GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
پروژه پایه برای اجرای تست‌های WebdriverIO در Headspin Cloud (https://www.headspin.io/) با استفاده از قابلیت‌های Cucumber و الگوی page objects.
- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - یکپارچه‌سازی ابری با [Headspin](https://www.headspin.io/)
    - پشتیبانی از Page Object Model
    - شامل سناریوهای نمونه نوشته‌شده به سبک اعلانی (Declarative) در BDD
    - گزارش‌های html یکپارچه cucumber

# پروژه‌های پایه نسخه v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

پروژه پایه برای اجرای تست‌های Appium با WebdriverIO برای:

- اپلیکیشن‌های بومی (Native) iOS/Android
- اپلیکیشن‌های ترکیبی (Hybrid) iOS/Android
- مرورگر Chrome در Android و Safari در iOS

این پروژه پایه شامل موارد زیر است:

- فریم‌ورک: Mocha
- ویژگی‌ها:
    - پیکربندی‌ها برای:
        - اپلیکیشن iOS و Android
        - مرورگرهای iOS و Android
    - ابزارهای کمکی برای:
        - WebView
        - حرکات لمسی (Gestures)
        - هشدارهای بومی (Native alerts)
        - انتخابگرها (Pickers)
     - نمونه تست‌ها برای:
        - WebView
        - ورود (Login)
        - فرم‌ها
        - کشیدن (Swipe)
        - مرورگرها

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
تست‌های وب ATDD با Mocha و WebdriverIO v6 همراه با PageObject

- فریم‌ورک‌ها
  - WebdriverIO (v7)
  - Mocha
- ویژگی‌ها
  - مدل [Page Object](pageobjects)
  - یکپارچه‌سازی با Sauce Labs از طریق [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - گزارش Allure
  - ثبت خودکار اسکرین‌شات برای تست‌های ناموفق
  - نمونه CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

پروژه پایه برای اجرای تست‌های E2E با Mocha.

- فریم‌ورک‌ها:
    - WebdriverIO (v7)
    - Mocha
- ویژگی‌ها:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [تست‌های رگرسیون بصری](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   الگوی Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) و [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   نمونه Github Actions
    -   گزارش Allure (اسکرین‌شات در صورت خطا)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

پروژه پایه برای اجرای تست‌های **WebdriverIO v7** برای موارد زیر:

[اسکریپت‌های WDIO 7 با TypeScript در فریم‌ورک Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[اسکریپت‌های WDIO 7 با TypeScript در فریم‌ورک Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[اجرای اسکریپت WDIO 7 در Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[لاگ‌های شبکه](https://github.com/17thSep/MonitorNetworkLogs/)

پروژه پایه برای:

- ثبت لاگ‌های شبکه
- ثبت تمام فراخوانی‌های GET/POST یا یک REST API خاص
- بررسی (Assert) پارامترهای درخواست
- بررسی (Assert) پارامترهای پاسخ
- ذخیره تمام پاسخ‌ها در یک فایل جداگانه

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

پروژه پایه برای اجرای تست‌های appium برای اپلیکیشن‌های بومی و مرورگر موبایل با استفاده از cucumber v7 و wdio v7 همراه با الگوی page object.

- فریم‌ورک‌ها
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- ویژگی‌ها
    - اپلیکیشن‌های بومی Android و iOS
    - مرورگر Chrome در Android
    - مرورگر Safari در iOS
    - Page Object Model
    - شامل سناریوهای تست نمونه در cucumber
    - یکپارچه با گزارش‌های html چندگانه cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

این یک پروژه قالب است که به شما نشان می‌دهد چگونه می‌توانید تست webdriverio را برای اپلیکیشن‌های وب با استفاده از آخرین نسخه WebdriverIO و فریم‌ورک Cucumber اجرا کنید. این پروژه قرار است به عنوان یک ایمیج پایه عمل کند که می‌توانید از آن برای درک نحوه اجرای تست‌های WebdriverIO در docker استفاده کنید

این پروژه شامل موارد زیر است:

- DockerFile
- پروژه cucumber

بیشتر بخوانید در: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

این یک پروژه قالب است که به شما نشان می‌دهد چگونه می‌توانید تست‌های electronJS را با استفاده از WebdriverIO اجرا کنید. این پروژه قرار است به عنوان یک ایمیج پایه عمل کند که می‌توانید از آن برای درک نحوه اجرای تست‌های electronJS با WebdriverIO استفاده کنید.

این پروژه شامل موارد زیر است:

- اپلیکیشن نمونه electronjs
- اسکریپت‌های تست نمونه cucumber

بیشتر بخوانید در: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

این یک پروژه قالب است که به شما نشان می‌دهد چگونه می‌توانید اپلیکیشن‌های ویندوز را با استفاده از winappdriver و WebdriverIO خودکارسازی کنید. این پروژه قرار است به عنوان یک ایمیج پایه عمل کند که می‌توانید از آن برای درک نحوه اجرای تست‌های windappdriver و WebdriverIO استفاده کنید.

بیشتر بخوانید در: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


این یک پروژه قالب است که به شما نشان می‌دهد چگونه می‌توانید قابلیت multi-remote در webdriverio را با آخرین نسخه WebdriverIO و فریم‌ورک Jasmine اجرا کنید. این پروژه قرار است به عنوان یک ایمیج پایه عمل کند که می‌توانید از آن برای درک نحوه اجرای تست‌های WebdriverIO در docker استفاده کنید

این پروژه از موارد زیر استفاده می‌کند:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

پروژه قالب برای اجرای تست‌های appium روی دستگاه‌های واقعی Roku با استفاده از mocha همراه با الگوی page object.

- فریم‌ورک‌ها
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - گزارش‌دهی Allure

- ویژگی‌ها
    - Page Object Model
    - Typescript
    - اسکرین‌شات در صورت خطا
    - نمونه تست‌ها با استفاده از یک کانال نمونه Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

پروژه اثبات مفهوم (PoC) برای تست‌های E2E چند-راه‌دور (multi-remote) با Cucumber و همچنین تست‌های داده‌محور با Mocha

- فریم‌ورک:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- ویژگی‌ها:
    - تست‌های E2E مبتنی بر Cucumber
    - تست‌های داده‌محور مبتنی بر Mocha
    - تست‌های فقط وب - در پلتفرم‌های محلی و همچنین ابری
    - تست‌های فقط موبایل - شبیه‌سازها (یا دستگاه‌های) محلی و همچنین ابری راه‌دور
    - تست‌های وب + موبایل - multi-remote - در پلتفرم‌های محلی و همچنین ابری
    - چندین گزارش یکپارچه از جمله Allure
    - داده‌های تست (JSON / XLSX) به صورت سراسری مدیریت می‌شوند تا داده‌ها (که در حین اجرا ایجاد می‌شوند) پس از اجرای تست در یک فایل نوشته شوند
    - گردش‌کار Github برای اجرای تست و بارگذاری گزارش allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

این یک پروژه پایه است که به نشان دادن نحوه اجرای multi-remote در webdriverio با استفاده از سرویس appium و chromedriver با آخرین نسخه WebdriverIO کمک می‌کند.

- فریم‌ورک‌ها
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- ویژگی‌ها
  - مدل [Page Object](pageobjects)
  - Typescript
  - تست‌های وب + موبایل - multi-remote
  - اپلیکیشن‌های بومی Android و iOS
  - Appium
  - Chromedriver
  - ESLint
  - نمونه تست‌ها برای ورود (Login) در http://the-internet.herokuapp.com و [اپلیکیشن دمو بومی WebdriverIO](https://github.com/webdriverio/native-demo-app)