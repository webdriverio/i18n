---
id: docker
title: داکر
---

داکر یک فناوری قدرتمند کانتینرسازی است که به شما امکان می‌دهد مجموعه آزمون‌های خود را در یک کانتینر قرار دهید که در هر سیستمی به یک شکل رفتار می‌کند. این می‌تواند از ناپایداری‌ها به دلیل نسخه‌های مختلف مرورگر یا پلتفرم جلوگیری کند. برای اجرای آزمون‌های خود در یک کانتینر، یک فایل `Dockerfile` در دایرکتوری پروژه خود ایجاد کنید، به عنوان مثال:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

اطمینان حاصل کنید که `node_modules` خود را در تصویر داکر قرار نداده‌اید و این موارد هنگام ساختن تصویر نصب شده‌اند. برای این کار یک فایل `.dockerignore` با محتوای زیر اضافه کنید:

```
node_modules
```

:::info
ما در اینجا از یک تصویر داکر استفاده می‌کنیم که با Selenium و Google Chrome از پیش نصب شده است. تصاویر مختلفی با تنظیمات مرورگر و نسخه‌های مرورگر مختلف در دسترس هستند. تصاویر نگهداری شده توسط پروژه Selenium را [در Docker Hub](https://hub.docker.com/u/selenium) بررسی کنید.
:::

از آنجا که ما فقط می‌توانیم Google Chrome را در حالت headless در کانتینر داکر خود اجرا کنیم، باید `wdio.conf.js` خود را برای اطمینان از این کار تغییر دهیم:

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

همانطور که در [پروتکل‌های اتوماسیون](/docs/automationProtocols) ذکر شد، می‌توانید WebdriverIO را با استفاده از پروتکل WebDriver یا پروتکل WebDriver BiDi اجرا کنید. اطمینان حاصل کنید که نسخه Chrome نصب شده روی تصویر شما با نسخه [Chromedriver](https://www.npmjs.com/package/chromedriver) که در `package.json` خود تعریف کرده‌اید، مطابقت دارد.

برای ساخت کانتینر داکر می‌توانید اجرا کنید:

```sh
docker build -t mytest -f Dockerfile .
```

سپس برای اجرای آزمون‌ها، این دستور را اجرا کنید:

```sh
docker run -it mytest
```

برای اطلاعات بیشتر در مورد نحوه پیکربندی تصویر داکر، به [مستندات داکر](https://docs.docker.com/) مراجعه کنید.