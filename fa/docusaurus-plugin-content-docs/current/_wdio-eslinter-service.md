---
id: wdio-eslinter-service
title: شناسایی خودکار واردات‌های گم شده با سرویس eslint
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---


> wdio-eslinter-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service) مراجعه کنید

آیا تا به حال تست‌های e2e خود را اجرا کرده‌اید، فقط برای اینکه ۱۰، ۱۵ یا ۳۰ دقیقه بعد متوجه شوید که یک واردات گم شده/اشتباه نوشته شده وجود داشته که تا میانه اجرای تست ظاهر نشده است؟ وقتی این اتفاق می‌افتد، اجراکننده تست این تست‌ها را به عنوان خراب گزارش می‌کند.

eslint ابزار بسیار خوبی برای گرفتن خطاهای مختلف قبل از زمان اجرا است، و این سرویس ابزار eslint را قبل از اجرای تست‌های WebdriverIO، به عنوان یک مرحله خودکار به جای یک مرحله دستی اجرا می‌کند.

اغلب بهتر است سریع‌تر شکست بخوریم تا بتوانیم مشکلات را زودتر به جای دیرتر برطرف کنیم.

پیکربندی توصیه شده استفاده از اجراکننده unresolved برای بررسی واردات‌های گم شده است، اما در صورت تمایل، می‌توانید سرویس را طوری پیکربندی کنید که اجراکننده eslint را در پروژه خود با استفاده از اجراکننده npm یا yarn اجرا کند، یا با ارسال یک پرچم که به سیستم می‌گوید از پیکربندی .eslintrc شما نیز استفاده کند.

## نصب

نصب wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### شروع سریع - فقط بررسی واردات‌های گم شده یا حل‌نشده

به طور پیش‌فرض، این پیکربندی حداقلی، اجراکننده "unresolved"، واردات‌های require حل‌نشده را بررسی می‌کند و در صورت وجود واردات‌های حل‌نشده خطا می‌دهد. سپس سرویس اجرا را متوقف می‌کند. در صورت تمایل، می‌توانید .eslintrc.js را برای انجام بررسی‌های بیشتر با استفاده از اجراکننده‌های "npm" یا "yarn" سفارشی کنید. برای جزئیات بیشتر به [eslint](https://www.npmjs.com/package/eslint) مراجعه کنید.

اگر پیکربندی `.eslintrc.js` در پروژه خود ندارید، wdio-eslinter-service می‌تواند برای استفاده از یک مورد پیش‌فرض پیکربندی شود که فقط واردات‌های گم شده را قبل از اجرای تست‌ها بررسی می‌کند. این کار مفید است تا شما زودتر از واردات‌های نادرست مطلع شوید نه دیرتر. برای پیکربندی این مورد، پیکربندی eslinter زیر را به آرایه services خود اضافه کنید (با فرض اینکه شما از قبل از سرویس chromedriver استفاده می‌کنید؛ در غیر این صورت، آن قسمت را حذف کنید):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

در این مرحله، شروع به اجرای تست‌ها کنید، و اگر واردات گم شده یا نادرستی وجود داشته باشد، WebdriverIO آن را ثبت می‌کند و بلافاصله اجرای تست را خاتمه می‌دهد:

```
$ npx wdio
```


#### اختیاری - اگر از module-alias استفاده می‌کنید

اگر از ماژول [module-alias](https://www.npmjs.com/package/module-alias) استفاده می‌کنید، که به شما امکان پیکربندی نام‌های مستعار برای جایگزینی مسیرهای نسبی را می‌دهد، باید آن را با استفاده از پلاگین eslint-import-resolver-custom-alias به پیکربندی eslinter منتقل کنید. در زیر یک مثال آمده است:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

پلاگین را در پروژه خود نصب کنید:

```
$ npm i eslint-import-resolver-custom-alias
```

تست‌ها را اجرا کنید و تأیید کنید که سیستم واردات‌های نادرستی را که از نام‌های مستعار ماژول استفاده می‌کنند پیدا می‌کند:

```
$ npx wdio
```

#### آزمایشی - استفاده همراه با پیکربندی eslintrc موجود در پروژه شما

برای اینکه سرویس eslinter از پیکربندی eslintrc موجود در پروژه شما نیز استفاده کند، `includeProjectEslintrc` را در آرایه services پیکربندی wdio.conf.js به true تنظیم کنید.

من با پلاگین‌های متناقض مشکلاتی را تجربه کرده‌ام. اگر تنظیمات eslint پروژه شما نیز به دنبال واردات‌های حل‌نشده است، ممکن است این کار عمل نکند و ممکن است نیاز به تنظیمات .eslintrc.js شما داشته باشد. این کار در حال حاضر توصیه نمی‌شود.


### گزینه‌های پیشرفته جایگزین - استفاده از اجراکننده‌های npm و yarn

اجراکننده‌های npm و yarn به شما کنترل بیشتری برای اجرای یک تنظیم eslinter موجود در پروژه خود می‌دهند. با این پیکربندی، می‌توانید دستورات اضافی را در بخش run-scripts در package.json خود تعریف کنید:

داخل `package.json` خود، این ورودی را به اسکریپت‌های اجرایی خود اضافه کنید:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**نکته: اضافه کردن eslint به package.json برای عملکرد سرویس هنگام استفاده از اجراکننده‌های npm یا yarn ضروری است.**

اگر هنوز eslint را نصب و پیکربندی نکرده‌اید، باید آن را نصب کنید و در پروژه خود پیکربندی کنید، همچنین هر پلاگینی که از آن استفاده می‌کنید، مانند eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

اگر از پلاگین eslint-import-resolver-custom-alias برای نگاشت نام‌های مستعار ماژول به مسیرهای واقعی آنها استفاده می‌کنید، باید آن را نیز نصب کنید:

```
$ npm i eslint-import-resolver-custom-alias
```

همچنین اگر هنوز یکی از فایل‌های پیکربندی eslintrc را در پروژه خود ندارید، باید یک فایل `.eslintrc.js` ایجاد کنید. در اینجا یک تنظیم اولیه برای جستجوی واردات‌های حل‌نشده آمده است، و می‌توانید این پیکربندی را برای اعتبارسنجی سایر بررسی‌های کیفیت کد قبل از اجرای تست‌ها گسترش دهید:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

در آخر، سرویس `eslinter` را به آرایه services در `wdio.conf.js` اضافه کنید:

```javascript
    services: ['eslinter']
```

`npm run eslint` را اجرا کنید تا تأیید و بررسی خطاها را انجام دهید.

اگر از `yarn` استفاده می‌کنید، می‌توانید گزینه سرویس `runnerType` را پیکربندی کنید:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

اگر قبلاً یک اسکریپت linter دارید که می‌خواهید از آن استفاده مجدد کنید (به جای `eslint`)، می‌توانید گزینه سرویس `scriptName` را پیکربندی کنید:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## استفاده در WebdriverIO

اجراکننده تست WebdriverIO را به طور معمول شروع کنید. eslint کد را بررسی می‌کند. اگر خطاهایی یافت شود، اجرا بلافاصله متوقف می‌شود.

```bash
$ npx wdio
```


**مثال:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```