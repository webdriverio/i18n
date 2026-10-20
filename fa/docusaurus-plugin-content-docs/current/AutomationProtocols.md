---
id: automationProtocols
title: پروتکل‌های اتوماسیون
description: "با پروتکل‌های اتوماسیون WebDriver Bidi و WebDriver آشنا شوید و انتخاب کنید WebdriverIO از کدام‌یک برای خودکارسازی مرورگرها و دستگاه‌ها استفاده کند."
---

با WebdriverIO، می‌توانید هنگام اجرای تست‌های E2E خود به‌صورت محلی یا در فضای ابری، از میان چندین فناوری اتوماسیون یکی را انتخاب کنید. به‌طور پیش‌فرض، WebdriverIO تلاش می‌کند یک جلسه اتوماسیون محلی را با استفاده از پروتکل [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) راه‌اندازی کند.

## پروتکل WebDriver Bidi

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) یک پروتکل اتوماسیون برای خودکارسازی مرورگرها با استفاده از ارتباط دوطرفه است. این پروتکل جانشین پروتکل [WebDriver](https://w3c.github.io/webdriver/) است و قابلیت‌های بررسی و نظارت بسیار بیشتری را برای موارد استفاده مختلف در تست‌نویسی فراهم می‌کند.

این پروتکل در حال حاضر در دست توسعه است و ممکن است در آینده primitiveهای جدیدی به آن اضافه شوند. همه سازندگان مرورگرها متعهد به پیاده‌سازی این استاندارد وب شده‌اند و بسیاری از [primitiveها](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned) هم‌اکنون در مرورگرها پیاده‌سازی شده‌اند.

## پروتکل WebDriver

> [WebDriver](https://w3c.github.io/webdriver/) یک رابط کنترل از راه دور است که امکان بررسی و کنترل عامل‌های کاربر (user agents) را فراهم می‌کند. این رابط یک پروتکل ارتباطی مستقل از پلتفرم و زبان ارائه می‌دهد تا برنامه‌های خارج از فرایند بتوانند رفتار مرورگرهای وب را از راه دور هدایت کنند.

پروتکل WebDriver برای خودکارسازی مرورگر از دیدگاه کاربر طراحی شده است، به این معنا که هر کاری که کاربر بتواند انجام دهد، شما نیز می‌توانید با مرورگر انجام دهید. این پروتکل مجموعه‌ای از دستورات را فراهم می‌کند که تعاملات رایج با یک برنامه (مانند پیمایش، کلیک کردن یا خواندن وضعیت یک عنصر) را انتزاعی می‌کنند. از آنجا که این پروتکل یک استاندارد وب است، به‌خوبی توسط همه سازندگان اصلی مرورگرها پشتیبانی می‌شود و همچنین به‌عنوان پروتکل زیربنایی برای اتوماسیون موبایل با استفاده از [Appium](http://appium.io) به کار می‌رود.

برای استفاده از این پروتکل اتوماسیون، به یک سرور پروکسی نیاز دارید که همه دستورات را ترجمه کرده و آن‌ها را در محیط هدف (یعنی مرورگر یا اپلیکیشن موبایل) اجرا کند.

برای اتوماسیون مرورگر، سرور پروکسی معمولاً درایور مرورگر است. برای همه مرورگرها درایورهایی در دسترس است:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

برای هر نوع اتوماسیون موبایل، باید [Appium](http://appium.io) را نصب و راه‌اندازی کنید. Appium به شما امکان می‌دهد اپلیکیشن‌های موبایل (iOS/Android) یا حتی دسکتاپ (macOS/Windows) را با استفاده از همان پیکربندی WebdriverIO خودکارسازی کنید.

همچنین سرویس‌های زیادی وجود دارند که به شما اجازه می‌دهند تست‌های اتوماسیون خود را در مقیاس بالا در فضای ابری اجرا کنید. به‌جای اینکه همه این درایورها را به‌صورت محلی راه‌اندازی کنید، می‌توانید به‌سادگی با این سرویس‌ها (مثلاً [Sauce Labs](https://saucelabs.com)) در فضای ابری ارتباط برقرار کنید و نتایج را در پلتفرم آن‌ها بررسی کنید. ارتباط بین اسکریپت تست و محیط اتوماسیون به این شکل است:

```mermaid
flowchart LR
    Script["Test script"] <--> Driver["Browser driver or Appium"]
    Driver <--> Network["Local network or Internet"]
    Network <--> Target["Browser or device"]
```