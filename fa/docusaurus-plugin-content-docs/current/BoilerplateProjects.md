---
id: boilerplates
title: پروژه‌های الگو
---

به مرور زمان، جامعه ما چندین پروژه را توسعه داده است که می‌توانید از آنها به عنوان الهام برای راه‌اندازی مجموعه آزمون خود استفاده کنید.

# پروژه‌های الگوی v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

الگوی اختصاصی ما برای مجموعه آزمون‌های Cucumber. ما بیش از 150 تعریف مرحله از پیش تعریف شده برای شما ایجاد کردیم، بنابراین می‌توانید بلافاصله شروع به نوشتن فایل‌های ویژگی در پروژه خود کنید.

- فریم‌ورک:
    - Cucumber
    - WebdriverIO
- ویژگی‌ها:
    - بیش از 150 مرحله از پیش تعریف شده که تقریباً همه چیزهایی که نیاز دارید را پوشش می‌دهد
    - عملکرد Multiremote از WebdriverIO را ادغام می‌کند
    - برنامه نمایشی خاص خود

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
پروژه الگو برای اجرای آزمون‌های WebdriverIO با Jasmine با استفاده از ویژگی‌های Babel و الگوی اشیاء صفحه.

- فریم‌ورک‌ها
    - WebdriverIO
    - Jasmine
- ویژگی‌ها
    - الگوی شیء صفحه
    - ادغام با Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
پروژه الگو برای اجرای آزمون‌های WebdriverIO روی یک برنامه حداقلی Electron.

- فریم‌ورک‌ها
    - WebdriverIO
    - Mocha
- ویژگی‌ها
    - شبیه‌سازی API الکترون

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
به طور خودکار کلاس‌های Page Object و مشخصات آزمون Mocha از فایل‌های .feature گرکین را تولید کنید - کاهش تلاش دستی، بهبود سازگاری و تسریع اتوماسیون QA. این پروژه نه تنها کدهای سازگار با webdriver.io تولید می‌کند، بلکه تمام عملکردهای webdriver.io را بهبود می‌بخشد. ما دو نسخه ایجاد کرده‌ایم، یکی برای کاربران JavaScript و دیگری برای کاربران TypeScript. اما هر دو پروژه به همان روش کار می‌کنند.

***چگونه کار می‌کند؟***
- این فرآیند از یک اتوماسیون دو مرحله‌ای پیروی می‌کند:
- مرحله 1: تبدیل Gherkin به stepMap (تولید فایل‌های stepMap.json)
  - تولید فایل‌های stepMap.json:
    - فایل‌های .feature نوشته شده با نحو Gherkin را تجزیه می‌کند.
    - سناریوها و مراحل را استخراج می‌کند.
    - یک فایل .stepMap.json ساختاریافته تولید می‌کند که شامل موارد زیر است:
      - عملی که باید انجام شود (مثلاً click، setText، assertVisible)
      - selectorName برای نگاشت منطقی
      - selector برای عنصر DOM
      - یادداشت برای مقادیر یا تأیید
- مرحله 2: تبدیل stepMap به کد (تولید کد WebdriverIO).
  از stepMap.json برای تولید موارد زیر استفاده می‌کند:
  - یک کلاس page.js پایه با روش‌های مشترک و تنظیم browser.url() ایجاد می‌کند.
  - کلاس‌های Page Object Model (POM) سازگار با WebdriverIO برای هر ویژگی در test/pageobjects/ تولید می‌کند.
  - مشخصات آزمون مبتنی بر Mocha تولید می‌کند.
- مثالی از ساختار دایرکتوری برای JavaScript / TypeScript. زیر برای نسخه JS است، نسخه TS نیز ساختار مشابهی دارد.
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
# پروژه‌های الگوی v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- فریم‌ورک: WDIO-V8 با Cucumber (V8x).
- ویژگی‌ها:
    - الگوی شیء صفحه با استفاده از رویکرد مبتنی بر کلاس ES6/ES7 و پشتیبانی TypeScript
    - مثال‌هایی از گزینه انتخابگر چندگانه برای پرس‌وجوی عناصر با بیش از یک انتخابگر در یک زمان
    - مثال‌هایی از اجرای چند مرورگر و مرورگر بدون سر با استفاده از Chrome و Firefox
    - ادغام با تست ابری با BrowserStack، Sauce Labs، LambdaTest
    - مثال‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    - پشتیبانی پایگاه داده برای هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر نوع پرس‌وجو / دریافت مجموعه نتایج و غیره با مثال‌هایی برای آزمون E2E
    - گزارش‌دهی متعدد (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش Allure و Xunit/Junit روی WebServer
    - مثال‌هایی با برنامه نمایشی https://search.yahoo.com/ و http://the-internet.herokuapp.com
    - فایل `.config` مخصوص BrowserStack، Sauce Labs، LambdaTest و Appium (برای پخش روی دستگاه موبایل). برای راه‌اندازی یک کلیکی Appium روی ماشین محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- فریم‌ورک: WDIO-V8 با Mocha (V10x).
- ویژگی‌ها:
    - الگوی شیء صفحه با استفاده از رویکرد مبتنی بر کلاس ES6/ES7 و پشتیبانی TypeScript
    - مثال‌هایی با برنامه نمایشی https://search.yahoo.com و http://the-internet.herokuapp.com
    - مثال‌هایی از اجرای چند مرورگر و مرورگر بدون سر با استفاده از Chrome و Firefox
    - ادغام با تست ابری با BrowserStack، Sauce Labs، LambdaTest
    - گزارش‌دهی متعدد (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش Allure و Xunit/Junit روی WebServer
    - مثال‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    - مثال‌هایی از اتصال به پایگاه داده به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر نوع پرس‌وجو / دریافت مجموعه نتایج و غیره با مثال‌هایی برای آزمون E2E
    - فایل `.config` مخصوص BrowserStack، Sauce Labs، LambdaTest و Appium (برای پخش روی دستگاه موبایل). برای راه‌اندازی یک کلیکی Appium روی ماشین محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- فریم‌ورک: WDIO-V8 با Jasmine (V4x).
- ویژگی‌ها:
    - الگوی شیء صفحه با استفاده از رویکرد مبتنی بر کلاس ES6/ES7 و پشتیبانی TypeScript
    - مثال‌هایی با برنامه نمایشی https://search.yahoo.com و http://the-internet.herokuapp.com
    - مثال‌هایی از اجرای چند مرورگر و مرورگر بدون سر با استفاده از Chrome و Firefox
    - ادغام با تست ابری با BrowserStack، Sauce Labs، LambdaTest
    - گزارش‌دهی متعدد (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش Allure و Xunit/Junit روی WebServer
    - مثال‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    - مثال‌هایی از اتصال به پایگاه داده به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر نوع پرس‌وجو / دریافت مجموعه نتایج و غیره با مثال‌هایی برای آزمون E2E
    - فایل `.config` مخصوص BrowserStack، Sauce Labs، LambdaTest و Appium (برای پخش روی دستگاه موبایل). برای راه‌اندازی یک کلیکی Appium روی ماشین محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

این پروژه الگو دارای آزمون‌های WebdriverIO 8 با cucumber و typescript است که از الگوی اشیاء صفحه پیروی می‌کند.

- فریم‌ورک‌ها:
    - WebdriverIO v8
    - Cucumber v8

- ویژگی‌ها:
    - Typescript v5
    - الگوی شیء صفحه
    - Prettier
    - پشتیبانی از چند مرورگر
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - اجرای موازی در مرورگرهای مختلف
    - Appium
    - ادغام تست ابری با BrowserStack و Sauce Labs
    - سرویس Docker
    - سرویس اشتراک‌گذاری داده
    - فایل‌های پیکربندی جداگانه برای هر سرویس
    - مدیریت داده‌های آزمون و خواندن بر اساس نوع کاربر
    - گزارش‌دهی
      - Dot
      - Spec
      - گزارش HTML چندگانه cucumber با اسکرین‌شات شکست
    - خط لوله‌های Gitlab برای مخزن Gitlab
    - اقدامات Github برای مخزن Github
    - Docker compose برای راه‌اندازی هاب Docker
    - آزمون دسترسی‌پذیری با استفاده از AXE
    - آزمون بصری با استفاده از Applitools
    - مکانیزم ثبت گزارش


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - شامل سناریوی نمونه آزمون در cucumber
    - گزارش‌های HTML ادغام شده cucumber با ویدیوهای جاسازی شده در صورت شکست
    - خدمات ادغام شده Lambdatest و CircleCI
    - آزمون یکپارچه بصری، دسترسی‌پذیری و API
    - عملکرد ایمیل یکپارچه
    - سطل s3 یکپارچه برای ذخیره‌سازی و بازیابی گزارش‌های آزمون

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

پروژه الگوی [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شما در شروع آزمون پذیرش برنامه‌های وب خود با استفاده از جدیدترین WebdriverIO، Mocha و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - گزارش‌دهی Serenity BDD

- ویژگی‌ها
    - [الگوی Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - اسکرین‌شات خودکار در صورت شکست آزمون، جاسازی شده در گزارش‌ها
    - راه‌اندازی یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های نمونه Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشر شده در GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

پروژه الگوی [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شما در شروع آزمون پذیرش برنامه‌های وب خود با استفاده از جدیدترین WebdriverIO، Cucumber و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - گزارش‌دهی Serenity BDD

- ویژگی‌ها
    - [الگوی Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - اسکرین‌شات خودکار در صورت شکست آزمون، جاسازی شده در گزارش‌ها
    - راه‌اندازی یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های نمونه Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشر شده در GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
پروژه الگو برای اجرای آزمون‌های WebdriverIO در ابر Headspin (https://www.headspin.io/) با استفاده از ویژگی‌های Cucumber و الگوی اشیاء صفحه.
- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - ادغام ابری با [Headspin](https://www.headspin.io/)
    - از الگوی شیء صفحه پشتیبانی می‌کند
    - شامل سناریوهای نمونه نوشته شده در سبک اظهاری BDD
    - گزارش‌های HTML ادغام شده cucumber

# پروژه‌های الگوی v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

پروژه الگو برای اجرای آزمون‌های Appium با WebdriverIO برای:

- برنامه‌های بومی iOS/Android
- برنامه‌های هیبریدی iOS/Android
- مرورگر Android Chrome و iOS Safari

این الگو شامل موارد زیر است:

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
     - نمونه‌های آزمون برای:
        - WebView
        - ورود به سیستم
        - فرم‌ها
        - کشیدن
        - مرورگرها

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
آزمون‌های ATDD WEB با Mocha، WebdriverIO v6 با PageObject

- فریم‌ورک‌ها
  - WebdriverIO (v7)
  - Mocha
- ویژگی‌ها
  - مدل [Page Object](pageobjects)
  - ادغام Sauce Labs با [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - گزارش Allure
  - تهیه خودکار اسکرین‌شات برای آزمون‌های ناموفق
  - مثال CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

پروژه الگو برای اجرای آزمون‌های E2E با Mocha.

- فریم‌ورک‌ها:
    - WebdriverIO (v7)
    - Mocha
- ویژگی‌ها:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [آزمون‌های رگرسیون بصری](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   الگوی شیء صفحه
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) و [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   مثال GitHub Actions
    -   گزارش Allure (اسکرین‌شات در صورت شکست)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

پروژه الگو برای اجرای آزمون‌های **WebdriverIO v7** برای موارد زیر:

[اسکریپت‌های WDIO 7 با TypeScript در فریم‌ورک Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[اسکریپت‌های WDIO 7 با TypeScript در فریم‌ورک Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[اجرای اسکریپت WDIO 7 در Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[گزارش‌های شبکه](https://github.com/17thSep/MonitorNetworkLogs/)

پروژه الگو برای:

- ثبت گزارش‌های شبکه
- ثبت تمام تماس‌های GET/POST یا یک REST API خاص
- تأیید پارامترهای درخواست
- تأیید پارامترهای پاسخ
- ذخیره تمام پاسخ‌ها در یک فایل جداگانه

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

پروژه الگو برای اجرای آزمون‌های appium برای برنامه‌های بومی و مرورگر موبایل با استفاده از cucumber v7 و wdio v7 با الگوی شیء صفحه.

- فریم‌ورک‌ها
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- ویژگی‌ها
    - برنامه‌های بومی Android و iOS
    - مرورگر Android Chrome
    - مرورگر iOS Safari
    - مدل شیء صفحه
    - شامل سناریوهای آزمون نمونه در cucumber
    - ادغام شده با گزارش‌های HTML چندگانه cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

این یک پروژه الگو است که به شما نشان می‌دهد چگونه می‌توانید آزمون webdriverio را از برنامه‌های وب با استفاده از جدیدترین WebdriverIO و فریم‌ورک Cucumber اجرا کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO در docker استفاده کنید.

این پروژه شامل:

- DockerFile
- پروژه cucumber

بیشتر بخوانید در: [وبلاگ Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

این یک پروژه الگو است که به شما نشان می‌دهد چگونه می‌توانید آزمون‌های electronJS را با استفاده از WebdriverIO اجرا کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO electronJS استفاده کنید.

این پروژه شامل:

- برنامه نمونه electronjs
- اسکریپت‌های آزمون نمونه cucumber

بیشتر بخوانید در: [وبلاگ Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

این یک پروژه الگو است که به شما نشان می‌دهد چگونه می‌توانید برنامه‌های ویندوز را با استفاده از winappdriver و WebdriverIO خودکار کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های windappdriver و WebdriverIO استفاده کنید.

بیشتر بخوانید در: [وبلاگ Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


این یک پروژه الگو است که به شما نشان می‌دهد چگونه می‌توانید قابلیت multiremote webdriverio را با جدیدترین WebdriverIO و فریم‌ورک Jasmine اجرا کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO در docker استفاده کنید.

این پروژه از موارد زیر استفاده می‌کند:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

پروژه الگو برای اجرای آزمون‌های appium روی دستگاه‌های واقعی Roku با استفاده از mocha با الگوی شیء صفحه.

- فریم‌ورک‌ها
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - گزارش‌دهی Allure

- ویژگی‌ها
    - مدل شیء صفحه
    - Typescript
    - اسکرین‌شات در صورت شکست
    - آزمون‌های نمونه با استفاده از یک کانال نمونه Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

پروژه PoC برای آزمون‌های Multiremote Cucumber E2E و همچنین آزمون‌های Mocha مبتنی بر داده

- فریم‌ورک:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- ویژگی‌ها:
    - آزمون‌های E2E مبتنی بر Cucumber
    - آزمون‌های مبتنی بر داده Mocha
    - آزمون‌های فقط وب - در پلتفرم‌های محلی و ابری
    - آزمون‌های فقط موبایل - شبیه‌سازهای محلی و ابری از راه دور (یا دستگاه‌ها)
    - آزمون‌های وب + موبایل - Multiremote - پلتفرم‌های محلی و ابری
    - گزارش‌های متعدد ادغام شده از جمله Allure
    - داده‌های آزمون (JSON / XLSX) به صورت جهانی مدیریت می‌شوند تا داده‌های ایجاد شده در زمان اجرا را پس از اجرای آزمون در یک فایل بنویسند
    - گردش کار GitHub برای اجرای آزمون و آپلود گزارش allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

این یک پروژه الگو است که به شما کمک می‌کند تا نشان دهد چگونه می‌توان webdriverio multi-remote را با استفاده از سرویس appium و chromedriver با جدیدترین WebdriverIO اجرا کرد.

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
  - نمونه‌های آزمون برای ورود به سیستم در http://the-internet.herokuapp.com و [برنامه نمایشی بومی WebdriverIO](https://github.com/webdriverio/native-demo-app)