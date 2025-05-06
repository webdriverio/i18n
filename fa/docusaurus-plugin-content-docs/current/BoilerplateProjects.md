---
id: boilerplates
title: پروژه‌های آماده
---

در طول زمان، جامعه ما چندین پروژه توسعه داده است که می‌توانید از آنها برای الهام گرفتن در راه‌اندازی مجموعه آزمون خود استفاده کنید.

# پروژه‌های آماده نسخه ۹

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

پروژه آماده خودمان برای مجموعه آزمون‌های Cucumber. ما بیش از ۱۵۰ تعریف از پیش تعیین شده برای شما ایجاد کرده‌ایم، بنابراین می‌توانید فوراً شروع به نوشتن فایل‌های ویژگی در پروژه خود کنید.

- فریم‌ورک:
    - Cucumber
    - WebdriverIO
- ویژگی‌ها:
    - بیش از ۱۵۰ مرحله از پیش تعریف شده که تقریباً همه چیزهایی که نیاز دارید را پوشش می‌دهد
    - قابلیت Multiremote وب‌درایور آی‌او را یکپارچه می‌کند
    - برنامه نمایشی اختصاصی

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
پروژه آماده برای اجرای تست‌های WebdriverIO با Jasmine با استفاده از ویژگی‌های Babel و الگوی اشیاء صفحه.

- فریم‌ورک‌ها
    - WebdriverIO
    - Jasmine
- ویژگی‌ها
    - الگوی شیء صفحه
    - یکپارچه‌سازی با Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
پروژه آماده برای اجرای آزمون‌های WebdriverIO روی یک برنامه حداقلی Electron.

- فریم‌ورک‌ها
    - WebdriverIO
    - Mocha
- ویژگی‌ها
    - شبیه‌سازی API الکترون

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
به‌طور خودکار کلاس‌های Page Object و مشخصات آزمون Mocha را از فایل‌های .feature Gherkin ایجاد کنید - کاهش تلاش دستی، بهبود سازگاری و تسریع در اتوماسیون QA. این پروژه نه تنها کدهای سازگار با webdriver.io تولید می‌کند، بلکه تمام قابلیت‌های webdriver.io را نیز افزایش می‌دهد.

***چگونه کار می‌کند؟***
- فرآیند از یک اتوماسیون دو مرحله‌ای پیروی می‌کند:
- مرحله ۱: Gherkin به stepMap (تولید فایل‌های stepMap.json)
  - تولید فایل‌های stepMap.json:
    - فایل‌های .feature نوشته شده در نحو Gherkin را تجزیه می‌کند.
    - سناریوها و مراحل را استخراج می‌کند.
    - یک فایل .stepMap.json ساختاریافته تولید می‌کند که شامل:
      - عمل برای انجام (مثلاً click، setText، assertVisible)
      - selectorName برای نگاشت منطقی
      - selector برای عنصر DOM
      - یادداشت برای مقادیر یا تایید
- مرحله ۲: stepMap به کد (تولید کد WebdriverIO).
  از stepMap.json برای تولید استفاده می‌کند:
  - تولید یک کلاس page.js پایه با روش‌های مشترک و راه‌اندازی browser.url().
  - تولید کلاس‌های Page Object Model (POM) سازگار با WebdriverIO برای هر ویژگی در test/pageobjects/.
  - تولید مشخصات آزمون مبتنی بر Mocha.
- ساختار دایرکتوری
```
project-root/
├── features/               # Input Gherkin feature files
├── stepMaps/               # Generated step maps (JSON)
├── test/
│   ├── pageobjects/        # Generated base Page class, Page Object classes
│   └── specs/              # Generated test specs
├── generateStepMap.js      # StepMap generator script
├── generateTestsFromMap.js # PageObject + test spec generator script
├── package.json
├── README.md
└── wdio.conf.js
```
---
# پروژه‌های آماده نسخه ۸

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- فریم‌ورک: WDIO-V8 با Cucumber (V8x).
- ویژگی‌ها:
    - الگوی اشیاء صفحه با استفاده از روش مبتنی بر کلاس ES6/ES7 و پشتیبانی TypeScript
    - نمونه‌هایی از گزینه انتخابگر چندگانه برای استعلام عنصر با بیش از یک انتخابگر در یک زمان
    - نمونه‌هایی از اجرای چند مرورگر و مرورگر بدون سربرگ با استفاده از Chrome و Firefox
    - یکپارچه‌سازی آزمون ابری با BrowserStack، Sauce Labs، LambdaTest
    - نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    - پشتیبانی پایگاه داده برای هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر استعلام / بازیابی مجموعه نتایج و غیره با مثال‌هایی برای آزمون E2E
    - گزارش‌دهی چندگانه (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit روی WebServer.
    - نمونه‌هایی با برنامه نمایشی https://search.yahoo.com/ و http://the-internet.herokuapp.com.
    - فایل `.config` مخصوص BrowserStack، Sauce Labs، LambdaTest و Appium (برای پخش در دستگاه موبایل). برای راه‌اندازی یک کلیکی Appium روی دستگاه محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- فریم‌ورک: WDIO-V8 با Mocha (V10x).
- ویژگی‌ها:
    -  الگوی اشیاء صفحه با استفاده از روش مبتنی بر کلاس ES6/ES7 و پشتیبانی TypeScript
    -  نمونه‌هایی با برنامه نمایشی https://search.yahoo.com و http://the-internet.herokuapp.com
    -  نمونه‌هایی از اجرای چند مرورگر و مرورگر بدون سربرگ با استفاده از Chrome و Firefox
    -  یکپارچه‌سازی آزمون ابری با BrowserStack، Sauce Labs، LambdaTest
    -  گزارش‌دهی چندگانه (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit روی WebServer.
    -  نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    -  نمونه‌هایی از اتصال DB به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر استعلام / بازیابی مجموعه نتایج و غیره با مثال‌هایی برای آزمون E2E
    -  فایل `.config` مخصوص BrowserStack، Sauce Labs، LambdaTest و Appium (برای پخش در دستگاه موبایل). برای راه‌اندازی یک کلیکی Appium روی دستگاه محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- فریم‌ورک: WDIO-V8 با Jasmine (V4x).
- ویژگی‌ها:
    -  الگوی اشیاء صفحه با استفاده از روش مبتنی بر کلاس ES6/ES7 و پشتیبانی TypeScript
    -  نمونه‌هایی با برنامه نمایشی https://search.yahoo.com و http://the-internet.herokuapp.com
    -  نمونه‌هایی از اجرای چند مرورگر و مرورگر بدون سربرگ با استفاده از Chrome و Firefox
    -  یکپارچه‌سازی آزمون ابری با BrowserStack، Sauce Labs، LambdaTest
    -  گزارش‌دهی چندگانه (Spec، Xunit/Junit، Allure، JSON) و میزبانی گزارش‌های Allure و Xunit/Junit روی WebServer.
    -  نمونه‌هایی از خواندن/نوشتن داده از MS-Excel برای مدیریت آسان داده‌های آزمون از منابع داده خارجی با مثال‌ها
    -  نمونه‌هایی از اتصال DB به هر RDBMS (Oracle، MySql، TeraData، Vertica و غیره)، اجرای هر استعلام / بازیابی مجموعه نتایج و غیره با مثال‌هایی برای آزمون E2E
    -  فایل `.config` مخصوص BrowserStack، Sauce Labs، LambdaTest و Appium (برای پخش در دستگاه موبایل). برای راه‌اندازی یک کلیکی Appium روی دستگاه محلی برای iOS و Android به [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) مراجعه کنید.

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

این پروژه آماده دارای آزمون‌های WebdriverIO 8 با cucumber و typescript است که از الگوی اشیاء صفحه پیروی می‌کند.

- فریم‌ورک‌ها:
    - WebdriverIO v8
    - Cucumber v8

- ویژگی‌ها:
    - Typescript v5
    - الگوی شیء صفحه
    - Prettier
    - پشتیبانی چند مرورگر
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - اجرای موازی بین مرورگرها
    - Appium
    - یکپارچه‌سازی آزمون ابری با BrowserStack و Sauce Labs
    - سرویس Docker
    - سرویس به اشتراک‌گذاری داده
    - فایل‌های پیکربندی جداگانه برای هر سرویس
    - مدیریت داده‌های آزمون و خواندن بر اساس نوع کاربر
    - گزارش‌دهی
      - Dot
      - Spec
      - گزارش HTML چندگانه cucumber با تصاویر خطا
    - خط لوله‌های Gitlab برای مخزن Gitlab
    - اقدامات Github برای مخزن Github
    - Docker compose برای راه‌اندازی هاب داکر
    - آزمون دسترسی‌پذیری با استفاده از AXE
    - آزمون بصری با استفاده از Applitools
    - مکانیزم ثبت لاگ


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - شامل سناریوی آزمون نمونه در cucumber
    - گزارش‌های HTML یکپارچه cucumber با ویدئوهای جاسازی شده در موارد شکست
    - خدمات یکپارچه Lambdatest و CircleCI
    - آزمون یکپارچه بصری، دسترسی‌پذیری و API
    - قابلیت ایمیل یکپارچه
    - باکت s3 یکپارچه برای ذخیره‌سازی و بازیابی گزارش‌های آزمون

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

پروژه قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شما در شروع آزمون پذیرش برنامه‌های وب خود با استفاده از آخرین نسخه WebdriverIO، Mocha و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - گزارش Serenity BDD

- ویژگی‌ها
    - [الگوی فیلمنامه](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - تصاویر خودکار در هنگام شکست آزمون، جاسازی شده در گزارش‌ها
    - راه‌اندازی یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های نمایشی Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشر شده در صفحات GitHub
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

پروژه قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) برای کمک به شما در شروع آزمون پذیرش برنامه‌های وب خود با استفاده از آخرین نسخه WebdriverIO، Cucumber و Serenity/JS.

- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - گزارش Serenity BDD

- ویژگی‌ها
    - [الگوی فیلمنامه](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - تصاویر خودکار در هنگام شکست آزمون، جاسازی شده در گزارش‌ها
    - راه‌اندازی یکپارچه‌سازی مداوم (CI) با استفاده از [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [گزارش‌های نمایشی Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منتشر شده در صفحات GitHub
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
پروژه آماده برای اجرای آزمون‌های WebdriverIO در ابر Headspin (https://www.headspin.io/) با استفاده از ویژگی‌های Cucumber و الگوی اشیاء صفحه.
- فریم‌ورک‌ها
    - WebdriverIO (v8)
    - Cucumber (v8)

- ویژگی‌ها
    - یکپارچه‌سازی ابری با [Headspin](https://www.headspin.io/)
    - از الگوی شیء صفحه پشتیبانی می‌کند
    - شامل سناریوهای نمونه نوشته شده به سبک اعلانی BDD
    - گزارش‌های HTML یکپارچه cucumber

# پروژه‌های آماده نسخه ۷
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

پروژه آماده برای اجرای آزمون‌های Appium با WebdriverIO برای:

- برنامه‌های بومی iOS/Android
- برنامه‌های ترکیبی iOS/Android
- مرورگر Chrome اندروید و Safari iOS

این پروژه آماده شامل موارد زیر است:

- فریم‌ورک: Mocha
- ویژگی‌ها:
    - پیکربندی برای:
        - برنامه iOS و Android
        - مرورگرهای iOS و Android
    - کمک‌کننده‌ها برای:
        - WebView
        - حرکات
        - هشدارهای بومی
        - انتخابگرها
     - نمونه‌های آزمون برای:
        - WebView
        - ورود
        - فرم‌ها
        - حرکت سریع
        - مرورگرها

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
آزمون‌های ATDD WEB با Mocha، WebdriverIO v6 با PageObject

- فریم‌ورک‌ها
  - WebdriverIO (v7)
  - Mocha
- ویژگی‌ها
  - مدل [شیء صفحه](pageobjects)
  - یکپارچه‌سازی Sauce Labs با [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - گزارش Allure
  - ضبط خودکار تصویر برای آزمون‌های ناموفق
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
    -   الگوی شیء صفحه
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) و [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   نمونه GitHub Actions
    -   گزارش Allure (تصویر در هنگام خطا)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

پروژه آماده برای اجرای آزمون‌های **WebdriverIO v7** برای موارد زیر:

[اسکریپت‌های WDIO 7 با TypeScript در فریم‌ورک Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[اسکریپت‌های WDIO 7 با TypeScript در فریم‌ورک Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[اجرای اسکریپت WDIO 7 در Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[گزارش‌های شبکه](https://github.com/17thSep/MonitorNetworkLogs/)

پروژه آماده برای:

- ضبط گزارش‌های شبکه
- ضبط همه فراخوانی‌های GET/POST یا یک REST API خاص
- تأیید پارامترهای درخواست
- تأیید پارامترهای پاسخ
- ذخیره همه پاسخ‌ها در یک فایل جداگانه

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

پروژه آماده برای اجرای آزمون‌های appium برای برنامه‌های بومی و مرورگر موبایل با استفاده از cucumber v7 و wdio v7 با الگوی شیء صفحه.

- فریم‌ورک‌ها
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- ویژگی‌ها
    - برنامه‌های بومی Android و iOS
    - مرورگر Chrome اندروید
    - مرورگر Safari iOS
    - مدل شیء صفحه
    - شامل سناریوهای آزمون نمونه در cucumber
    - یکپارچه با گزارش‌های HTML چندگانه cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

این یک پروژه قالب است که به شما نشان می‌دهد چگونه می‌توانید آزمون webdriverio را از برنامه‌های وب با استفاده از آخرین WebdriverIO و فریم‌ورک Cucumber اجرا کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO در docker استفاده کنید.

این پروژه شامل:

- DockerFile
- پروژه cucumber

بیشتر بخوانید در: [وبلاگ مدیوم](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

این یک پروژه قالب است که به شما نشان می‌دهد چگونه می‌توانید آزمون‌های electronJS را با استفاده از WebdriverIO اجرا کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO electronJS استفاده کنید.

این پروژه شامل:

- برنامه نمونه electronjs
- اسکریپت‌های آزمون cucumber نمونه

بیشتر بخوانید در: [وبلاگ مدیوم](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

این یک پروژه قالب است که به شما نشان می‌دهد چگونه می‌توانید برنامه‌های ویندوز را با استفاده از winappdriver و WebdriverIO خودکار کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های windappdriver و WebdriverIO استفاده کنید.

بیشتر بخوانید در: [وبلاگ مدیوم](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


این یک پروژه قالب است که به شما نشان می‌دهد چگونه می‌توانید قابلیت multiremote webdriverio را با آخرین WebdriverIO و فریم‌ورک Jasmine اجرا کنید. این پروژه قصد دارد به عنوان یک تصویر پایه عمل کند که می‌توانید از آن برای درک چگونگی اجرای آزمون‌های WebdriverIO در docker استفاده کنید.

این پروژه از موارد زیر استفاده می‌کند:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

پروژه قالب برای اجرای آزمون‌های appium روی دستگاه‌های واقعی Roku با استفاده از mocha با الگوی شیء صفحه.

- فریم‌ورک‌ها
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - گزارش‌دهی Allure

- ویژگی‌ها
    - مدل شیء صفحه
    - Typescript
    - تصویر در هنگام خطا
    - آزمون‌های نمونه با استفاده از یک کانال نمونه Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

پروژه PoC برای آزمون‌های E2E Multiremote Cucumber و همچنین آزمون‌های داده‌محور Mocha

- فریم‌ورک:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- ویژگی‌ها:
    - آزمون‌های E2E مبتنی بر Cucumber
    - آزمون‌های داده‌محور مبتنی بر Mocha
    - آزمون‌های فقط وب - در پلتفرم‌های محلی و ابری
    - آزمون‌های فقط موبایل - شبیه‌سازهای محلی و از راه دور ابری (یا دستگاه‌ها)
    - آزمون‌های وب + موبایل - Multiremote - پلتفرم‌های محلی و ابری
    - گزارش‌های متعدد یکپارچه از جمله Allure
    - داده‌های آزمون (JSON / XLSX) به صورت جهانی مدیریت می‌شوند تا داده‌ها (ایجاد شده در لحظه) پس از اجرای آزمون به یک فایل نوشته شوند
    - گردش کار Github برای اجرای آزمون و آپلود گزارش allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

این یک پروژه آماده برای کمک به نشان دادن چگونگی اجرای چند راه دور webdriverio با استفاده از سرویس appium و chromedriver با آخرین WebdriverIO است.

- فریم‌ورک‌ها
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- ویژگی‌ها
  - مدل [شیء صفحه](pageobjects)
  - Typescript
  - آزمون‌های وب + موبایل - Multiremote
  - برنامه‌های بومی Android و iOS
  - Appium
  - Chromedriver
  - ESLint
  - نمونه‌های آزمون برای ورود در http://the-internet.herokuapp.com و [برنامه نمایشی بومی WebdriverIO](https://github.com/webdriverio/native-demo-app)