---
id: docker
title: داکر
description: "مجموعه تست WebdriverIO خود را درون یک کانتینر Docker با مرورگر از پیش نصب‌شده اجرا کنید تا نتایج یکسانی در همه سیستم‌ها به دست آورید."
---

Docker یک فناوری قدرتمند کانتینرسازی است که به شما امکان می‌دهد مجموعه تست خود را درون یک کانتینر قرار دهید که روی هر سیستمی رفتار یکسانی دارد. این کار می‌تواند از ناپایداری تست‌ها (flakiness) ناشی از تفاوت نسخه‌های مرورگر یا پلتفرم جلوگیری کند. برای اجرای تست‌های خود درون یک کانتینر، یک `Dockerfile` در پوشه پروژه خود ایجاد کنید، برای مثال:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # مرورگر و نسخه را بر اساس نیاز خود تغییر دهید
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

مطمئن شوید که پوشه `node_modules` را در ایمیج Docker خود قرار نمی‌دهید و این وابستگی‌ها هنگام ساخت ایمیج نصب می‌شوند. برای این منظور یک فایل `.dockerignore` با محتوای زیر اضافه کنید:

```
node_modules
```

:::info
در اینجا از یک ایمیج Docker استفاده می‌کنیم که Selenium و Google Chrome از پیش روی آن نصب شده‌اند. ایمیج‌های مختلفی با پیکربندی‌ها و نسخه‌های متفاوت مرورگر در دسترس هستند. ایمیج‌هایی را که توسط پروژه Selenium نگهداری می‌شوند [در Docker Hub](https://hub.docker.com/u/selenium) بررسی کنید.
:::

از آنجا که در کانتینر Docker خود فقط می‌توانیم Google Chrome را در حالت headless اجرا کنیم، باید فایل `wdio.conf.js` خود را تغییر دهیم تا از این موضوع اطمینان حاصل کنیم:

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