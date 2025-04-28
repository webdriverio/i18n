---
id: docker
title: داکر
---

داکر یک فناوری قدرتمند کانتینرسازی است که به شما امکان می‌دهد مجموعه تست خود را در یک کانتینر قرار دهید که در هر سیستمی رفتار یکسانی دارد. این می‌تواند از ناپایداری ناشی از نسخه‌های مختلف مرورگر یا پلتفرم جلوگیری کند. برای اجرای تست‌های خود در داخل یک کانتینر، یک فایل `Dockerfile` در دایرکتوری پروژه خود ایجاد کنید، به عنوان مثال:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

مطمئن شوید که `node_modules` خود را در تصویر داکر قرار نمی‌دهید و آن‌ها را هنگام ساخت تصویر نصب کرده‌اید. برای این کار یک فایل `.dockerignore` با محتوای زیر اضافه کنید:

```
node_modules
```

:::info
ما در اینجا از یک تصویر داکر استفاده می‌کنیم که با سلنیوم و گوگل کروم از پیش نصب شده است. تصاویر مختلفی با تنظیمات مختلف مرورگر و نسخه‌های مرورگر موجود است. تصاویر نگهداری شده توسط پروژه سلنیوم را در [Docker Hub](https://hub.docker.com/u/selenium) بررسی کنید.
:::

از آنجا که ما فقط می‌توانیم گوگل کروم را در حالت headless در کانتینر داکر خود اجرا کنیم، باید `wdio.conf.js` خود را تغییر دهیم تا مطمئن شویم این کار را انجام می‌دهیم:

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

همانطور که در [پروتکل‌های اتوماسیون](/docs/automationProtocols) ذکر شده، می‌توانید WebdriverIO را با استفاده از پروتکل WebDriver یا پروتکل WebDriver BiDi اجرا کنید. مطمئن شوید که نسخه کروم نصب شده روی تصویر شما با نسخه [Chromedriver](https://www.npmjs.com/package/chromedriver) که در `package.json` خود تعریف کرده‌اید، مطابقت دارد.

برای ساخت کانتینر داکر می‌توانید اجرا کنید:

```sh
docker build -t mytest -f Dockerfile .
```

سپس برای اجرای تست‌ها، دستور زیر را اجرا کنید:

```sh
docker run -it mytest
```

برای اطلاعات بیشتر در مورد نحوه پیکربندی تصویر داکر، [مستندات داکر](https://docs.docker.com/) را بررسی کنید.