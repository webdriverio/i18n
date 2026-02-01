---
id: boilerplates
title: پروژه‌های آماده
---

در طول زمان، جامعه ما چندین پروژه را توسعه داده که می‌توانید از آن‌ها به عنوان الهام برای راه‌اندازی مجموعه آزمون خود استفاده کنید.

# پروژه‌های آماده نسخه ۹

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

پروژه آماده اختصاصی ما برای مجموعه آزمون Cucumber. بیش از ۱۵۰ تعریف مرحله از پیش تعریف شده برای شما ایجاد کرده‌ایم، تا بتوانید بلافاصله شروع به نوشتن فایل‌های ویژگی در پروژه خود کنید.

- فریم‌ورک:
    - Cucumber
    - WebdriverIO
- ویژگی‌ها:
    - بیش از ۱۵۰ مرحله از پیش تعریف شده که تقریباً همه چیزهایی که نیاز دارید را پوشش می‌دهد
    - ادغام عملکرد Multiremote در WebdriverIO
    - برنامه نمایشی اختصاصی

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
پروژه آماده برای اجرای آزمون‌های WebdriverIO با Jasmine با استفاده از ویژگی‌های Babel و الگوی page objects.

- فریم‌ورک‌ها
    - WebdriverIO
    - Jasmine
- ویژگی‌ها
    - الگوی Page Object
    - ادغام با Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
پروژه آماده برای اجرای آزمون‌های WebdriverIO روی یک برنامه حداقلی Electron.

- فریم‌ورک‌ها
    - WebdriverIO
    - Mocha
- ویژگی‌ها
    - شبیه‌سازی API الکترون
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

این پروژه آماده دارای آزمون‌های موبایل WebdriverIO 9 با Cucumber، TypeScript و Appium برای پلتفرم‌های اندروید و iOS است که از الگوی Page Object Model پیروی می‌کند. دارای گزارش‌گیری جامع، ثبت رویدادها، حرکات لمسی موبایل، ناوبری از برنامه به وب و ادغام CI/CD است.

- فریم‌ورک‌ها:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- ویژگی‌ها:
    - پشتیبانی از چند پلتفرم
      - اندروید (UiAutomator2)
      - iOS (XCUITest)
    - حرکات لمسی موبایل
      - اسکرول
      - سوایپ
      - لمس طولانی
      - مخفی کردن صفحه کلید
    - ناوبری از برنامه به وب
      - تغییر زمینه
      - پشتیبانی از WebView
      - اتوماسیون مرورگر (Chrome/Safari)
    - وضعیت تازه برنامه
      - ریست خودکار برنامه بین سناریوها
      - رفتار ریست قابل پیکربندی (noReset, fullReset)
    - پیکربندی دستگاه
      - مدیریت متمرکز دستگاه
      - تغییر آسان پلتفرم
    - نمونه ساختار دایرکتوری برای JavaScript / TypeScript. زیر برای نسخه JS است، نسخه TS نیز همین ساختار را دارد.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
تولید خودکار کلاس‌های Page Object و مشخصات آزمون Mocha در WebdriverIO از فایل‌های .feature Gherkin - کاهش تلاش دستی، بهبود سازگاری و تسریع اتوماسیون QA. این پروژه نه تنها کدهای سازگار با webdriver.io تولید می‌کند، بلکه تمام عملکردهای webdriver.io را بهبود می‌بخشد. ما دو نسخه ایجاد کرده‌ایم، یکی برای کاربران JavaScript و دیگری برای کاربران TypeScript. اما هر دو پروژه به یک شیوه کار می‌کنند.

***روش کار؟***
- فرآیند از یک اتوماسیون دو مرحله‌ای پیروی می‌کند:
- مرحله ۱: Gherkin به stepMap (تولید فایل‌های stepMap.json)
  - تولید فایل‌های stepMap.json:
    - تجزیه فایل‌های .feature نوشته شده به زبان Gherkin.
    - استخراج سناریوها و مراحل.
    - تولید یک فایل .stepMap.json ساختار یافته شامل:
      - عملی که باید انجام شود (مثلاً click، setText، assertVisible)
      - selectorName برای نگاشت منطقی
      - selector برای عنصر DOM
      - یادداشت برای مقادیر یا تأیید
- مرحله ۲: stepMap به کد (تولید کد WebdriverIO).
  از stepMap.json برای تولید استفاده می‌کند:
  - تولید یک کلاس base page.js با متدهای مشترک و راه‌اندازی browser.url().
  - تولید کلاس‌های Page Object Model (POM) سازگار با WebdriverIO برای هر ویژگی در test/pageobjects/.
  - تولید مشخصات آزمون مبتنی بر Mocha.
- نمونه ساختار دایرکتوری برای JavaScript / TypeScript. زیر برای نسخه JS است، نسخه TS نیز همین ساختار را دارد.
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
    - Page Objects Model با استفاده از رویکرد کلاس مبتنی بر ES6/ES7 و پشتیبانی TypeScript
    - نمونه‌هایی از گزینه selector چندگانه برای پرس و جوی عنصر با بیش از یک selector در یک زمان
    - نمونه‌هایی از اجرای چند مرورگر و مرورگر بدون سر با استفاده از Chrome و Firefox
    - ادغام با تست در فضای ابری با BrowserStack، Sauce Labs، LambdaTest
    - نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    - پشتیبانی پایگاه داده برای هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هرگونه پرس و جو / بازیابی مجموعه نتایج و غیره با مثال‌هایی برای آزمون E2E
    - گزارش‌دهی متعدد (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit در وب سرور
    - نمونه‌هایی با برنامه نمایشی https://search.yahoo.com/ و http://the-internet.herokuapp.com.
    - فایل‌های `.config` مخصوص BrowserStack، Sauce Labs، LambdaTest و Appium (برای پخش در دستگاه موبایل). برای راه‌اندازی Appium با یک کلیک در ماشین محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- فریم‌ورک: WDIO-V8 با Mocha (V10x).
- ویژگی‌ها:
    -  Page Objects Model با استفاده از رویکرد کلاس مبتنی بر ES6/ES7 و پشتیبانی TypeScript
    -  نمونه‌هایی با برنامه نمایشی https://search.yahoo.com و http://the-internet.herokuapp.com
    -  نمونه‌هایی از اجرای چند مرورگر و مرورگر بدون سر با استفاده از Chrome و Firefox
    -  ادغام با تست در فضای ابری با BrowserStack، Sauce Labs، LambdaTest
    -  گزارش‌دهی متعدد (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit در وب سرور
    -  نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    -  نمونه‌هایی از اتصال به پایگاه داده به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هرگونه پرس و جو / بازیابی مجموعه نتایج و غیره با مثال‌هایی برای آزمون E2E
    -  فایل‌های `.config` مخصوص BrowserStack، Sauce Labs، LambdaTest و Appium (برای پخش در دستگاه موبایل). برای راه‌اندازی Appium با یک کلیک در ماشین محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- فریم‌ورک: WDIO-V8 با Jasmine (V4x).
- ویژگی‌ها:
    -  Page Objects Model با استفاده از رویکرد کلاس مبتنی بر ES6/ES7 و پشتیبانی TypeScript
    -  نمونه‌هایی با برنامه نمایشی https://search.yahoo.com و http://the-internet.herokuapp.com
    -  نمونه‌هایی از اجرای چند مرورگر و مرورگر بدون سر با استفاده از Chrome و Firefox
    -  ادغام با تست در فضای ابری با BrowserStack، Sauce Labs، LambdaTest
    -  گزارش‌دهی متعدد (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit در وب سرور
    -  نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    -  نمونه‌هایی از اتصال به پایگاه داده به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هرگونه پرس و جو / بازیابی مجموعه نتایج و غیره با مثال‌هایی برای آزمون E2E
    -  فایل‌های `.config` مخصوص BrowserStack، Sauce Labs، LambdaTest و Appium (برای پخش در دستگاه موبایل). برای راه‌اندازی Appium با یک کلیک در ماشین محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

این پروژه آماده دارای آزمون‌های WebdriverIO 8 با cucumber و typescript است که از الگوی page objects پیروی می‌کند.

- فریم‌ورک‌ها:
    - WebdriverIO v8
    - Cucumber v8

- ویژگی‌ها:
    - Typescript v5
    - الگوی Page Object
    - Prettier
    - پشتیبانی از چندین مرورگر
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - اجرای موازی بین مرورگری
    - Appium
    - ادغام تست در فضای ابری با BrowserStack و Sauce Labs
    - سرویس داکر
    - سرویس اشتراک داده
    - فایل‌های پیکربندی جداگانه برای هر سرویس
    - مدیریت داده‌های آزمون و خواندن بر اساس نوع کاربر
    - گزارش‌دهی
      - Dot
      - Spec
      - گزارش HTML چندگانه cucumber با عکس‌های شکست
    - خط لوله‌های Gitlab برای مخزن Gitlab
    - اقدامات Github برای مخزن Github
    - Docker compose برای راه‌اندازی Docker hub
    - تست دسترسی‌پذیری با استفاده از AXE
    - تست بصری با استفاده از Applitools
    - مکانیزم ثبت وقایع


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - شامل سناریو آزمون نمونه در cucumber
    - گزارش‌های HTML cucumber ادغام شده با ویدیوهای تعبیه شده در هنگام شکست
    - سرویس‌های Lambdatest و CircleCI ادغام شده
    - تست‌های بصری، دسترسی‌پذیری و API ادغام شده
    - عملکرد ایمیل ادغام شده
    - باکت s3 ادغام شده برای ذخیره‌سازی و بازیابی گزارش‌های آزمون

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

پروژه قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شروع آزمون پذیرش برنامه‌های وب خود با استفاده از جدیدترین WebdriverIO، Mocha و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - گزارش‌دهی Serenity BDD

- ویژگی‌ها
    - [الگوی نمایشنامه (Screenplay Pattern)](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - عکس‌برداری خودکار در هنگام شکست آزمون، تعبیه شده در گزارش‌ها
    - راه‌اندازی یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های نمایشی Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشر شده در GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

پروژه قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شروع آزمون پذیرش برنامه‌های وب خود با استفاده از جدیدترین WebdriverIO، Cucumber و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - گزارش‌دهی Serenity BDD

- ویژگی‌ها
    - [الگوی نمایشنامه (Screenplay Pattern)](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - عکس‌برداری خودکار در هنگام شکست آزمون، تعبیه شده در گزارش‌ها
    - راه‌اندازی یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های نمایشی Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشر شده در GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
پروژه آماده برای اجرای آزمون‌های WebdriverIO در ابر Headspin (https://www.headspin.io/) با استفاده از ویژگی‌های Cucumber و الگوی page objects.
- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - ادغام ابری با [Headspin](https://www.headspin.io/)
    - از الگوی Page Object پشتیبانی می‌کند
    - شامل سناریوهای نمونه نوشته شده در سبک اعلانی BDD
    - گزارش‌های HTML cucumber ادغام شده

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
        - حرکات لمسی
        - هشدارهای بومی
        - انتخاب‌کننده‌ها
     - نمونه‌های آزمون برای:
        - WebView
        - ورود
        - فرم‌ها
        - سوایپ
        - مرورگرها

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
آزمون‌های ATDD WEB با Mocha، WebdriverIO v6 با PageObject

- فریم‌ورک‌ها
  - WebdriverIO (v7)
  - Mocha
- ویژگی‌ها
  - مدل [Page Object](pageobjects)
  - ادغام با Sauce Labs با استفاده از [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - گزارش Allure
  - تهیه خودکار عکس برای آزمون‌های شکست خورده
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
    -   [تست‌های رگرسیون تصویری](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   الگوی Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) و [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   نمونه GitHub Actions
    -   گزارش Allure (عکس‌ها هنگام شکست)

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

پروژه آماده برای اجرای آزمون‌های appium برای برنامه‌های بومی و مرورگر موبایل با استفاده از cucumber v7 و wdio v7 با الگوی page object.

- فریم‌ورک‌ها
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- ویژگی‌ها
    - برنامه‌های بومی Android و iOS
    - مرورگر Chrome در Android
    - مرورگر Safari در iOS
    - الگوی Page Object
    - شامل سناریوهای آزمون نمونه در cucumber
    - ادغام شده با گزارش‌های HTML چندگانه cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

این یک پروژه قالب است که به شما کمک می‌کند نشان دهد چگونه می‌توانید آزمون webdriverio را از برنامه‌های وب با استفاده از جدیدترین WebdriverIO و فریم‌ورک Cucumber اجرا کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO در docker استفاده کنید.

این پروژه شامل:

- DockerFile
- پروژه cucumber

بیشتر بخوانید در: [وبلاگ Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

این یک پروژه قالب است که به شما کمک می‌کند نشان دهد چگونه می‌توانید آزمون‌های electronJS را با استفاده از WebdriverIO اجرا کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO electronJS استفاده کنید.

این پروژه شامل:

- برنامه نمونه electronjs
- اسکریپت‌های آزمون cucumber نمونه

بیشتر بخوانید در: [وبلاگ Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

این یک پروژه قالب است که به شما کمک می‌کند نشان دهد چگونه می‌توانید برنامه‌های ویندوز را با استفاده از winappdriver و WebdriverIO خودکار کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های windappdriver و WebdriverIO استفاده کنید.

بیشتر بخوانید در: [وبلاگ Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


این یک پروژه قالب است که به شما کمک می‌کند نشان دهد چگونه می‌توانید قابلیت multiremote webdriverio را با جدیدترین WebdriverIO و فریم‌ورک Jasmine اجرا کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO در docker استفاده کنید.

این پروژه از موارد زیر استفاده می‌کند:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

پروژه قالب برای اجرای آزمون‌های appium روی دستگاه‌های واقعی Roku با استفاده از mocha با الگوی page object.

- فریم‌ورک‌ها
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - گزارش‌دهی Allure

- ویژگی‌ها
    - الگوی Page Object
    - Typescript
    - عکس‌برداری هنگام شکست
    - آزمون‌های نمونه با استفاده از یک کانال نمونه Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

پروژه PoC برای آزمون‌های Multiremote Cucumber E2E و همچنین آزمون‌های Mocha داده محور

- فریم‌ورک:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- ویژگی‌ها:
    - آزمون‌های E2E مبتنی بر Cucumber
    - آزمون‌های داده محور مبتنی بر Mocha
    - آزمون‌های فقط وب - در پلتفرم‌های محلی و همچنین پلتفرم‌های ابری
    - آزمون‌های فقط موبایل - شبیه‌سازهای محلی و همچنین راه دور در ابر (یا دستگاه‌ها)
    - آزمون‌های وب + موبایل - Multiremote - پلتفرم‌های محلی و همچنین ابری
    - گزارش‌های متعدد ادغام شده از جمله Allure
    - داده‌های آزمون (JSON / XLSX) به صورت جهانی مدیریت می‌شوند تا داده‌ها (که در لحظه ایجاد می‌شوند) پس از اجرای آزمون در یک فایل نوشته شوند
    - جریان کار Github برای اجرای آزمون و بارگذاری گزارش allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

این یک پروژه آماده است که به نشان دادن چگونگی اجرای چند دستگاه راه دور webdriverio با استفاده از سرویس appium و chromedriver با آخرین WebdriverIO کمک می‌کند.

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
  - نمونه‌های آزمون برای ورود به http://the-internet.herokuapp.com و [برنامه بومی نمایشی WebdriverIO](https://github.com/webdriverio/native-demo-app)