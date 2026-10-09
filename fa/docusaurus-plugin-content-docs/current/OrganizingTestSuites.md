---
id: organizingsuites
title: سازماندهی مجموعه تست
description: "یک مجموعه تست در حال رشد را با اشتراک‌گذاری فایل‌های پیکربندی، گروه‌بندی spec‌ها در suite‌ها، اجرای ترتیبی spec‌ها و گنجاندن یا حذف تست‌ها سازماندهی کنید."
---

با رشد پروژه‌ها، به‌طور اجتناب‌ناپذیری تست‌های یکپارچه‌سازی بیشتر و بیشتری اضافه می‌شوند. این امر زمان build را افزایش داده و بهره‌وری را کاهش می‌دهد.

برای جلوگیری از این مشکل، باید تست‌های خود را به‌صورت موازی اجرا کنید. WebdriverIO از قبل هر spec (یا _feature file_ در Cucumber) را به‌صورت موازی در یک session واحد تست می‌کند. به‌طور کلی، سعی کنید در هر فایل spec فقط یک ویژگی را تست کنید. سعی کنید تعداد تست‌ها در یک فایل نه خیلی زیاد و نه خیلی کم باشد. (البته در این مورد قانون طلایی وجود ندارد.)

هنگامی که تست‌های شما چندین فایل spec داشته باشند، باید اجرای همزمان تست‌ها را آغاز کنید. برای این کار، ویژگی `maxInstances` را در فایل پیکربندی خود تنظیم کنید. WebdriverIO به شما اجازه می‌دهد تست‌های خود را با حداکثر همزمانی اجرا کنید—به این معنی که صرف‌نظر از تعداد فایل‌ها و تست‌هایی که دارید، همه آن‌ها می‌توانند به‌صورت موازی اجرا شوند. (این همچنان تابع محدودیت‌های خاصی است، مانند CPU کامپیوتر شما، محدودیت‌های همزمانی و غیره.)

> فرض کنید ۳ capability مختلف دارید (Chrome، Firefox و Safari) و `maxInstances` را روی `1` تنظیم کرده‌اید. اجراکننده تست WDIO سه فرآیند ایجاد خواهد کرد. بنابراین، اگر ۱۰ فایل spec داشته باشید و `maxInstances` را روی `10` تنظیم کنید، _همه_ فایل‌های spec به‌طور همزمان تست می‌شوند و ۳۰ فرآیند ایجاد خواهد شد.

می‌توانید ویژگی `maxInstances` را به‌صورت سراسری تعریف کنید تا این ویژگی برای همه مرورگرها تنظیم شود.

اگر WebDriver grid خودتان را اجرا می‌کنید، ممکن است (به‌عنوان مثال) برای یک مرورگر ظرفیت بیشتری نسبت به مرورگر دیگر داشته باشید. در این صورت، می‌توانید `maxInstances` را در شیء capability خود _محدود_ کنید:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## ارث‌بری از فایل پیکربندی اصلی

اگر مجموعه تست خود را در چندین محیط (مثلاً dev و integration) اجرا می‌کنید، استفاده از چندین فایل پیکربندی می‌تواند به مدیریت‌پذیری کمک کند.

مشابه [مفهوم page object](pageobjects)، اولین چیزی که نیاز دارید یک فایل پیکربندی اصلی است. این فایل شامل تمام پیکربندی‌هایی است که بین محیط‌ها به اشتراک می‌گذارید.

سپس برای هر محیط یک فایل پیکربندی دیگر ایجاد کنید و پیکربندی اصلی را با پیکربندی‌های مخصوص هر محیط تکمیل کنید:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## گروه‌بندی spec‌های تست در suite‌ها

می‌توانید spec‌های تست را در suite‌ها گروه‌بندی کنید و به‌جای اجرای همه آن‌ها، فقط suite‌های خاصی را اجرا کنید.

ابتدا suite‌های خود را در پیکربندی WDIO تعریف کنید:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

اکنون، اگر می‌خواهید فقط یک suite را اجرا کنید، می‌توانید نام suite را به‌عنوان آرگومان CLI ارسال کنید:

```sh
wdio wdio.conf.js --suite login
```

یا چندین suite را به‌طور همزمان اجرا کنید:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## گروه‌بندی spec‌های تست برای اجرای ترتیبی

همان‌طور که در بالا توضیح داده شد، اجرای همزمان تست‌ها مزایایی دارد. با این حال، مواردی وجود دارد که گروه‌بندی تست‌ها برای اجرای ترتیبی در یک instance واحد مفید خواهد بود. نمونه‌های این موضوع عمدتاً مواردی هستند که هزینه راه‌اندازی بالایی وجود دارد، مثلاً transpile کردن کد یا آماده‌سازی instance‌های ابری، اما مدل‌های استفاده پیشرفته‌ای نیز وجود دارند که از این قابلیت بهره می‌برند.

برای گروه‌بندی تست‌ها جهت اجرا در یک instance واحد، آن‌ها را به‌صورت یک آرایه در تعریف specs تعریف کنید.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
در مثال بالا، تست‌های 'test_login.js'، 'test_product_order.js' و 'test_checkout.js' به‌صورت ترتیبی در یک instance واحد اجرا می‌شوند و هر یک از تست‌های "test_b*" به‌صورت همزمان در instance‌های جداگانه اجرا خواهند شد.

همچنین امکان گروه‌بندی spec‌های تعریف‌شده در suite‌ها وجود دارد، بنابراین اکنون می‌توانید suite‌ها را نیز به این شکل تعریف کنید:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
و در این حالت تمام تست‌های suite "end2end" در یک instance واحد اجرا خواهند شد.

هنگام اجرای ترتیبی تست‌ها با استفاده از یک الگو، فایل‌های spec به ترتیب الفبایی اجرا می‌شوند

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

این کار فایل‌های منطبق با الگوی بالا را به ترتیب زیر اجرا می‌کند:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## اجرای تست‌های انتخاب‌شده

در برخی موارد، ممکن است بخواهید فقط یک تست واحد (یا زیرمجموعه‌ای از تست‌ها) از suite‌های خود را اجرا کنید.

با پارامتر `--spec`، می‌توانید مشخص کنید کدام _suite_ (Mocha، Jasmine) یا _feature_ (Cucumber) باید اجرا شود. مسیر نسبت به دایرکتوری کاری فعلی شما resolve می‌شود.

به‌عنوان مثال، برای اجرای فقط تست login:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

یا چندین spec را به‌طور همزمان اجرا کنید:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

اگر مقدار `--spec` به یک فایل spec خاص اشاره نکند، به‌جای آن برای فیلتر کردن نام فایل‌های spec تعریف‌شده در پیکربندی شما استفاده می‌شود.

برای اجرای همه spec‌هایی که کلمه "dialog" در نام فایل آن‌ها وجود دارد، می‌توانید از دستور زیر استفاده کنید:

```sh
wdio wdio.conf.js --spec dialog
```

توجه داشته باشید که هر فایل تست در یک فرآیند اجراکننده تست جداگانه اجرا می‌شود. از آنجا که ما فایل‌ها را از قبل اسکن نمی‌کنیم (برای اطلاعات درباره pipe کردن نام فایل‌ها به `wdio` بخش بعدی را ببینید)، شما _نمی‌توانید_ (به‌عنوان مثال) از `describe.only` در بالای فایل spec خود استفاده کنید تا به Mocha دستور دهید فقط همان suite را اجرا کند.

این ویژگی به شما کمک می‌کند تا به همان هدف دست یابید.

هنگامی که گزینه `--spec` ارائه شود، هر الگویی که توسط `specs` در پیکربندی یا `wdio:specs` در یک capability تعریف شده باشد را نادیده می‌گیرد.

## حذف تست‌های انتخاب‌شده

در صورت نیاز، اگر لازم است فایل(های) spec خاصی را از اجرا حذف کنید، می‌توانید از پارامتر `--exclude` (Mocha، Jasmine) یا feature (Cucumber) استفاده کنید.

به‌عنوان مثال، برای حذف تست login از اجرای تست:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

یا چندین فایل spec را حذف کنید:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

یا هنگام فیلتر کردن با استفاده از یک suite، یک فایل spec را حذف کنید:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

اگر مقدار `--exclude` به یک فایل spec خاص اشاره نکند، به‌جای آن برای فیلتر کردن نام فایل‌های spec تعریف‌شده در پیکربندی شما استفاده می‌شود.

برای حذف همه spec‌هایی که کلمه "dialog" در نام فایل آن‌ها وجود دارد، می‌توانید از دستور زیر استفاده کنید:

```sh
wdio wdio.conf.js --exclude dialog
```

### حذف کامل یک suite

همچنین می‌توانید یک suite کامل را با نام آن حذف کنید. اگر مقدار حذف با نام یک suite تعریف‌شده در پیکربندی شما مطابقت داشته باشد و شبیه مسیر فایل نباشد، کل suite نادیده گرفته می‌شود:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

این دستور فقط suite `checkout` را اجرا می‌کند و suite `login` را به‌طور کامل نادیده می‌گیرد.

حذف‌های ترکیبی (suite‌ها و الگوهای spec) همان‌طور که انتظار می‌رود کار می‌کنند:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

در این مثال، اگر `signup` نام یک suite تعریف‌شده باشد، آن suite حذف خواهد شد. الگوی `dialog` هر فایل spec که "dialog" در نام فایل آن وجود داشته باشد را فیلتر می‌کند.

:::note
اگر هم `--suite X` و هم `--exclude X` را مشخص کنید، حذف اولویت دارد و suite `X` اجرا نخواهد شد.
:::

هنگامی که گزینه `--exclude` ارائه شود، هر الگویی که توسط `exclude` در پیکربندی یا `wdio:exclude` در یک capability تعریف شده باشد را نادیده می‌گیرد.

## اجرای suite‌ها و spec‌های تست

یک suite کامل را همراه با spec‌های جداگانه اجرا کنید.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## اجرای چندین spec تست مشخص

گاهی اوقات—در زمینه یکپارچه‌سازی مداوم و موارد دیگر—لازم است چندین مجموعه از spec‌ها را برای اجرا مشخص کنید. ابزار خط فرمان `wdio` در WebdriverIO نام فایل‌های pipe شده (از `find`، `grep` یا ابزارهای دیگر) را می‌پذیرد.

نام فایل‌های pipe شده، لیست glob‌ها یا نام فایل‌های مشخص‌شده در لیست `spec` پیکربندی را نادیده می‌گیرند.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**نکته:** این کار فلگ `--spec` برای اجرای یک spec واحد را_ نادیده نمی‌گیرد_._

## اجرای تست‌های خاص با MochaOpts

همچنین می‌توانید با ارسال یک آرگومان مخصوص mocha یعنی `--mochaOpts.grep` به CLI ابزار wdio، مشخص کنید کدام `suite|describe` و/یا `it|test` خاص اجرا شود.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**نکته:** Mocha تست‌ها را پس از ایجاد instance‌ها توسط اجراکننده تست WDIO فیلتر می‌کند، بنابراین ممکن است ببینید چندین instance ایجاد می‌شوند اما در واقع اجرا نمی‌شوند._

## حذف تست‌های خاص با MochaOpts

همچنین می‌توانید با ارسال یک آرگومان مخصوص mocha یعنی `--mochaOpts.invert` به CLI ابزار wdio، مشخص کنید کدام `suite|describe` و/یا `it|test` خاص حذف شود. `--mochaOpts.invert` عملکردی برعکس `--mochaOpts.grep` دارد

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**نکته:** Mocha تست‌ها را پس از ایجاد instance‌ها توسط اجراکننده تست WDIO فیلتر می‌کند، بنابراین ممکن است ببینید چندین instance ایجاد می‌شوند اما در واقع اجرا نمی‌شوند._

## توقف تست پس از شکست

با گزینه `bail`، می‌توانید به WebdriverIO بگویید که پس از شکست هر تست، اجرای تست‌ها را متوقف کند.

این ویژگی در مجموعه تست‌های بزرگ مفید است، زمانی که از قبل می‌دانید build شما شکست خواهد خورد، اما می‌خواهید از انتظار طولانی یک اجرای کامل تست جلوگیری کنید.

گزینه `bail` یک عدد دریافت می‌کند که مشخص می‌کند قبل از اینکه WebDriver کل اجرای تست را متوقف کند، چند شکست تست می‌تواند رخ دهد. مقدار پیش‌فرض `0` است، به این معنی که همیشه تمام spec‌های تستی که پیدا کند را اجرا می‌کند.

لطفاً برای اطلاعات بیشتر درباره پیکربندی bail به [صفحه گزینه‌ها](configuration) مراجعه کنید.
## سلسله‌مراتب گزینه‌های اجرا

هنگام تعیین spec‌هایی که باید اجرا شوند، سلسله‌مراتب مشخصی وجود دارد که تعیین می‌کند کدام الگو اولویت دارد. در حال حاضر، نحوه عملکرد آن از بالاترین اولویت به پایین‌ترین به این صورت است:

> آرگومان CLI `--spec` > capability `wdio:specs` > پیکربندی `specs`
> آرگومان CLI `--exclude` > پیکربندی `exclude` > capability `wdio:exclude`

اگر فقط پارامتر پیکربندی داده شود، برای همه capability‌ها استفاده خواهد شد. با این حال، اگر الگو در سطح capability تعریف شود، به‌جای الگوی پیکربندی استفاده خواهد شد. در نهایت، هر الگوی spec تعریف‌شده در خط فرمان، همه الگوهای دیگر را نادیده می‌گیرد.

### استفاده از الگوهای spec تعریف‌شده در capability

هنگامی که یک الگوی spec را در سطح capability تعریف می‌کنید، هر الگویی که در سطح پیکربندی تعریف شده باشد را نادیده می‌گیرد. این ویژگی زمانی مفید است که نیاز به جداسازی تست‌ها بر اساس capability‌های متمایز دستگاه‌ها دارید. در چنین مواردی، استفاده از یک الگوی spec عمومی در سطح پیکربندی و الگوهای خاص‌تر در سطح capability مفیدتر است.

به‌عنوان مثال، فرض کنید دو دایرکتوری دارید، یکی برای تست‌های Android و یکی برای تست‌های iOS.

فایل پیکربندی شما ممکن است الگو را برای تست‌های غیر وابسته به دستگاه خاص به این شکل تعریف کند:

```js
{
    specs: ['tests/general/**/*.js']
}
```

اما سپس، capability‌های متفاوتی برای دستگاه‌های Android و iOS خود خواهید داشت که الگوها می‌توانند به این شکل باشند:

```json
{
  "platformName": "Android",
  "wdio:specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "wdio:specs": [
    "tests/ios/**/*.js"
  ]
}
```

اگر به هر دوی این capability‌ها در فایل پیکربندی خود نیاز داشته باشید، دستگاه Android فقط تست‌های زیر فضای نام "android" را اجرا می‌کند و تست‌های iOS فقط تست‌های زیر فضای نام "ios" را اجرا خواهند کرد!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            "wdio:specs": ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            "wdio:specs": ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```