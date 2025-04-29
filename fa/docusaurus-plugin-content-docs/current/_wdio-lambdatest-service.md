---
id: wdio-lambdatest-service
title: سرویس لمبداتست
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---


> wdio-lambdatest-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service) مراجعه کنید

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> یک سرویس WebdriverIO که تونل و متادیتای کار را برای کاربران LambdaTest مدیریت می‌کند.

## نصب

```bash
npm i wdio-lambdatest-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted.html) پیدا کنید.


## پیکربندی

WebdriverIO به طور پیش‌فرض از LambdaTest پشتیبانی می‌کند. شما باید به سادگی `user` و `key` را در فایل `wdio.conf.js` خود تنظیم کنید. برای فعال‌سازی این ویژگی برای خودکارسازی برنامه، `product: 'appAutomation'` را در فایل `wdio.conf.js` خود تنظیم کنید. این پلاگین سرویس از [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/) پشتیبانی می‌کند. همچنین `tunnel: true` را تنظیم کنید تا این ویژگی فعال شود.

```js
// wdio.conf.js
exports.config = {
    // ...
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    logFile : './logDir/api.log',
    product : 'appAutomation',
    services: [
        ['lambdatest', {
            tunnel: true
        }]
    ],
    // ...
};
```

### برای دریافت توضیحات خطای تست در داشبورد خودکارسازی
برای دریافت توضیحات خطای تست در داشبورد خودکارسازی، به سادگی `ltErrorRemark: true` را به `wdio.conf.js` خود اضافه کنید.


### برای آپلود برنامه از منبع محلی یا URL
آپلود برنامه‌های `android` یا `ios` از منبع محلی یا URL برنامه میزبانی شده با اضافه کردن این پیکربندی مورد نیاز در `wdio.conf.js` خود انجام دهید. برای استفاده از برنامه آپلود شده برای تست در همان اجرا، `enableCapability = true` را تنظیم کنید، این کار مقدار URL برنامه را در قابلیت‌ها تنظیم می‌کند.

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //provide your desired app name
            app_path : "/path/to/your/app/file", //provide the local app location
            // or
            app_url : "https://example.test_android.apk", //provide the url where your app is horsted or stored
            custom_id : "12345", //provide your desired custom id
            enableCapability : true
        }
    }
    ]
]
```

## گزینه‌ها

برای احراز هویت در سرویس LambdaTest، پیکربندی شما باید شامل گزینه‌های [`user`](https://webdriver.io/docs/options.html#user) و [`key`](https://webdriver.io/docs/options.html#key) باشد.

### tunnel
برای فعال کردن مسیریابی اتصالات از ابر LambdaTest از طریق کامپیوتر شما، این گزینه را روی true تنظیم کنید. همچنین باید `tunnel` را در قابلیت‌های مرورگر روی true تنظیم کنید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### lambdatestOpts
گزینه‌های اختیاری مشخص شده به LambdaTest Tunnel منتقل خواهند شد.

نوع: `Object`<br />
پیش‌فرض: `{}`

در زیر فهرست جامعی از تمام گزینه‌های موجود آمده است:

#### tunnelName
نام سفارشی LambdaTest Tunnel که باید استفاده شود را مشخص می‌کند.

**مثال:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
پورتی که LambdaTest Tunnel روی آن فعال می‌شود.

**مثال:**
```json
{"port": 33000}
```
#### user
نام کاربری LambdaTest.

**مثال:**
```json
{"user": "your_username"}
```

#### key
کلید دسترسی LambdaTest.

**مثال:**
```json
{"key": "your_access_key"}
```

#### verbose
آیا هر درخواست پروکسی باید در stdout ثبت شود.

**مثال:**
```json
{"verbose": true}
```

#### logFile
محل فایل لاگ LambdaTest Tunnel.

**مثال:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

مسیر فایل پیکربندی که باید استفاده شود.
**مثال:**
```json
{"config": "/path/to/config/file"}
```

#### dir
دایرکتوری محلی که توسط یک فایل سرور روی پورت Tunnel ارائه خواهد شد را مشخص کنید.

**مثال:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
نام میزبان پورت پروکسی Tunnel را مشخص می‌کند.

**مثال:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
نام کاربری پورت پروکسی Tunnel را مشخص می‌کند.

**مثال:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
کلمه عبور پورت پروکسی Tunnel را مشخص می‌کند.

**مثال:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
شماره پورتی که پروکسی Tunnel روی آن فعال خواهد شد را مشخص می‌کند.

**مثال:**
```json
{"proxyPort": 8080}
```

#### egressOnly
تنظیمات پروکسی را فقط برای درخواست‌های خروجی استفاده می‌کند.

**مثال:**
```json
{"egressOnly": true}
```


#### ingressOnly
فقط ترافیک ورودی را از طریق پروکسی مشخص شده مسیریابی می‌کند.

**مثال:**
```json
{"ingressOnly": true}
```


#### pacfile
برای استفاده از PAC (پیکربندی خودکار پروکسی) در تست محلی، مسیر فایل PAC را ارائه دهید.

**مثال:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
[توزیع بار](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) را برای LambdaTest Tunnel فعال می‌کند.

**مثال:**
```json
{"loadBalanced": true}
```

#### mode
مشخص می‌کند که تونل در چه حالتی اجرا شود "ssh" یا "ws". (پیش‌فرض "ssh").

**مثال:**
```json
{"mode": "ssh"}
```

#### sshConnType
نوع اتصال ssh را مشخص کنید (over_22، over_443، over_ws). برای استفاده از –sshConnType، ابتدا پرچم ––mode ssh را مشخص کنید.

**مثال:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
اتصال SSH از Tunnel Client به Tunnel Server را افزایش دهید. حداکثر مقدار مجاز 30 است.

**مثال:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
اشتراک‌گذاری Tunnel بین اعضای تیم.

**مثال:**
```json
{"sharedTunnel": true}
```

#### env
محیطی که LambdaTest Tunnel در آن اجرا خواهد شد.

**مثال:**
```json
{"env": "production"}
```


#### infoAPIPort
[Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) را در پورت مشخص شده نمایان می‌کند.

**مثال:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
URL بازخورد برای وضعیت تونل.

**مثال:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
لیست میزبان‌هایی که باید از طریق تونل مسیریابی شوند، با کاما جدا شده. همه چیز دیگر از طریق اینترنت مسیریابی خواهد شد.

**مثال:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
لیست میزبان‌هایی که باید از تونل دور زده شوند، با کاما جدا شده. این‌ها از طریق اینترنت مسیریابی خواهند شد.

**مثال:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
مسیر فایل گواهینامه Client mTLS.

**مثال:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
مسیر فایل کلید Client mTLS.

**مثال:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
لیست میزبان‌های mTLS، با کاما جدا شده.

**مثال:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
لیست سرورهای DNS، با کاما جدا شده.

**مثال:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
حالت [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) را برای LambdaTest Tunnel فعال کنید.

**مثال:**
```json
{"mitm": true}
```

#### ntlm
برای استفاده از احراز هویت Microsoft NTLM (Windows NT LAN Manager) برای ارتباط یا اهداف انتقال.

**مثال:**
```json
{"ntlm": true}
```

#### pidfile
مسیر فایل pid، جایی که ID فرآیند نوشته خواهد شد.

**مثال:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
آدرس راه دور را به IP داخلی ماشین کلاینت تنظیم می‌کند.

**مثال:**
```json
{"usePrivateIp": true}
```

شما می‌توانید اطلاعات بیشتر درباره این گزینه‌ها را [اینجا](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/) پیدا کنید.

### preferScenarioName
فقط برای Cucumber. اگر فقط یک سناریو اجرا شده باشد، نام جلسه را به نام سناریو تنظیم کنید.
هنگام اجرای موازی با [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution) مفید است.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### sessionNameFormat
فرمت نام جلسه را سفارشی کنید.

نوع: `Function`<br />
پیش‌فرض (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
پیش‌فرض (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
فقط برای Mocha. عنوان تست را به نام جلسه اضافه نکنید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### sessionNamePrependTopLevelSuiteTitle
فقط برای Mocha. عنوان سوئیت سطح بالا را در ابتدای نام جلسه قرار دهید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### setSessionName
به طور خودکار نام جلسه را تنظیم کنید.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### setSessionStatus
به طور خودکار وضعیت جلسه (موفق/ناموفق) را تنظیم کنید.

نوع: `Boolean`<br />
پیش‌فرض: `true`


### ignoreTestCountInName
تعداد تلاش‌های مجدد یک تست را در نام نادیده بگیرید

نوع: `Boolean`<br />
پیش‌فرض: `false`


### useScenarioName
برای دریافت نام‌های تست به عنوان نام‌های سناریو برای تست‌های خاص خیار، به سادگی `useScenarioName: true` را در `wdio.conf.js` خود اضافه کنید.

## مراحل کامپایل و انتشار
1. این مخزن را clone کنید.
2. دستور "npm install" را اجرا کنید
3. دستور "npm run build" را اجرا کنید
4. مراحل انتشار: دستور "npm login" را اجرا کنید
5. دستور "npm publish --access public" را اجرا کنید

----

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.