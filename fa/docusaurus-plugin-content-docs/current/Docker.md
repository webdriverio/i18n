---
id: docker
title: Docker
description: "مجموعه تست WebdriverIO خود را درون یک کانتینر Docker با مرورگر از پیش نصب‌شده اجرا کنید تا نتایج یکسانی در ماشین‌های مختلف داشته باشید."
---

Docker یک فناوری قدرتمند کانتینرسازی است که به شما امکان می‌دهد مجموعه تست خود را درون یک کانتینر بسته‌بندی کنید که روی هر سیستمی رفتار یکسانی دارد. این کار می‌تواند از ناپایداری ناشی از نسخه‌های مختلف مرورگر یا پلتفرم جلوگیری کند. برای اجرای تست‌های خود درون یک کانتینر، یک فایل `Dockerfile` در پوشه پروژه خود ایجاد کنید، به عنوان مثال:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # مرورگر و نسخه را بر اساس نیاز خود تغییر دهید
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

مطمئن شوید که پوشه `node_modules` را در ایمیج Docker خود قرار نمی‌دهید و این وابستگی‌ها هنگام ساخت ایمیج نصب می‌شوند. برای این کار یک فایل `.dockerignore` با محتوای زیر اضافه کنید:

```
node_modules
```

:::info
در اینجا از یک ایمیج Docker استفاده می‌کنیم که Selenium و Google Chrome به صورت پیش‌فرض روی آن نصب شده‌اند. ایمیج‌های مختلفی با تنظیمات و نسخه‌های متفاوت مرورگر در دسترس هستند. ایمیج‌هایی را که توسط پروژه Selenium نگهداری می‌شوند [در Docker Hub](https://hub.docker.com/u/selenium) بررسی کنید.
:::

از آنجا که در کانتینر Docker فقط می‌توانیم Google Chrome را در حالت headless اجرا کنیم، باید فایل `wdio.conf.js` خود را تغییر دهیم تا از این موضوع اطمینان حاصل کنیم:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

همان‌طور که در [پروتکل‌های اتوماسیون](/docs/automationProtocols) اشاره شد، می‌توانید WebdriverIO را با استفاده از پروتکل WebDriver یا پروتکل WebDriver BiDi اجرا کنید. مطمئن شوید که نسخه Chrome نصب‌شده روی ایمیج شما با نسخه [Chromedriver](https://www.npmjs.com/package/chromedriver) که در `package.json` خود تعریف کرده‌اید مطابقت دارد.

برای ساخت کانتینر Docker می‌توانید دستور زیر را اجرا کنید:

```sh
docker build -t mytest -f Dockerfile .
```

سپس برای اجرای تست‌ها، دستور زیر را اجرا کنید:

```sh
docker run -it mytest
```

برای اطلاعات بیشتر درباره نحوه پیکربندی ایمیج Docker، [مستندات Docker](https://docs.docker.com/) را بررسی کنید.

## ایمیج‌هایی که WebdriverIO مرورگر را در آن‌ها دانلود می‌کند

وقتی ایمیج هیچ مرورگری ندارد، WebdriverIO خودش Chrome، Chromium، Firefox و Chromedriver را دانلود می‌کند. Chrome، Chromium و Chromedriver به صورت فایل‌های zip ارائه می‌شوند و WebdriverIO آن‌ها را با دستور `unzip` در Linux و macOS (و `tar.exe` یا PowerShell در Windows) استخراج می‌کند. ایمیج‌های سبک مانند `node:24-slim` و ایمیج‌های حداقلی Alpine دستور `unzip` را ندارند، بنابراین آن را در `Dockerfile` خود نصب کنید:

```Dockerfile
FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/*
```

در Alpine از `RUN apk add --no-cache unzip` استفاده کنید. بدون آن، دانلود با خطای `Extraction failed: no zip archiver is available` شکست می‌خورد.