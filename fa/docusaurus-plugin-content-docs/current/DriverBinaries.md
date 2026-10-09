---
id: driverbinaries
title: باینری‌های درایور
description: "اجازه دهید WebdriverIO درایورهای مرورگر را به‌طور خودکار دانلود و مدیریت کند، یا Chromedriver، Geckodriver، Edgedriver و Safaridriver را به‌صورت دستی راه‌اندازی کنید."
---

برای اجرای اتوماسیون مبتنی بر پروتکل WebDriver، باید درایورهای مرورگر را راه‌اندازی کرده باشید که دستورات اتوماسیون را ترجمه کرده و قادر به اجرای آن‌ها در مرورگر باشند.

## راه‌اندازی خودکار

با WebdriverIO نسخه `v8.14` و بالاتر، دیگر نیازی به دانلود و راه‌اندازی دستی هیچ درایور مرورگری نیست، زیرا این کار توسط WebdriverIO انجام می‌شود. تنها کاری که باید انجام دهید این است که مرورگری را که می‌خواهید تست کنید مشخص کنید و WebdriverIO بقیه کارها را انجام خواهد داد.

در ARM64، برای اطلاع از نحوه راه‌اندازی درایور در macOS، Windows و Linux و اینکه وقتی امکان راه‌اندازی خودکار وجود ندارد چه باید کرد، به [Chromedriver در ARM64](arm64-chromedriver) مراجعه کنید.

### سفارشی‌سازی سطح اتوماسیون

WebdriverIO سه سطح اتوماسیون دارد:

**۱. دانلود و نصب مرورگر با استفاده از [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

اگر ترکیب `browserName`/`browserVersion` را در پیکربندی [capabilities](configuration#capabilities-1) مشخص کنید، WebdriverIO ترکیب درخواستی را دانلود و نصب خواهد کرد، صرف‌نظر از اینکه آیا نصب موجودی روی دستگاه وجود دارد یا خیر. اگر `browserVersion` را حذف کنید، WebdriverIO ابتدا سعی می‌کند یک نصب موجود را با [locate-app](https://www.npmjs.com/package/locate-app) پیدا کرده و از آن استفاده کند، در غیر این صورت نسخه پایدار فعلی مرورگر را دانلود و نصب خواهد کرد. برای جزئیات بیشتر درباره `browserVersion`، [اینجا](capabilities#automate-different-browser-channels) را ببینید.

:::caution

راه‌اندازی خودکار مرورگر از Microsoft Edge پشتیبانی نمی‌کند. در حال حاضر، فقط Chrome، Chromium و Firefox پشتیبانی می‌شوند.

:::

اگر مرورگری را در مکانی نصب کرده‌اید که توسط WebdriverIO به‌طور خودکار قابل تشخیص نیست، می‌توانید باینری مرورگر را مشخص کنید که این کار دانلود و نصب خودکار را غیرفعال خواهد کرد.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // or 'firefox' or 'chromium'
            'goog:chromeOptions': { // or 'moz:firefoxOptions' or 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**۲. دانلود و نصب درایور: Chromedriver از [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/)، و Edgedriver و Geckodriver با پکیج‌های [edgedriver](https://www.npmjs.com/package/edgedriver) و [geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO همیشه این کار را انجام می‌دهد، مگر اینکه [binary](capabilities#binary) درایور در پیکربندی مشخص شده باشد:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // or 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // or 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // or 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

WebdriverIO به‌طور پیش‌فرض Chromedriver را از Chrome for Testing دانلود می‌کند، اما در موارد خاصی از یک [نسخه انتشار Electron](https://github.com/electron/electron/releases) استفاده خواهد کرد:

- [`wdio:electronVersion`](capabilities#wdioelectronversion) برای یک برنامه Electron تنظیم شده باشد. در این حالت از همان نسخه انتشار استفاده می‌کند، مگر اینکه `browserVersion` و `CHROMEDRIVER_CDNURL` هر دو تنظیم شده باشند.
- نسخه Chrome در Linux ARM64 قدیمی‌تر از `153.0.8001.0` باشد، جایی که Chrome for Testing هیچ بیلدی از Chromedriver ندارد (به [Chromedriver در ARM64](arm64-chromedriver) مراجعه کنید). در این حالت از آخرین نسخه انتشار با همان نسخه اصلی (major) Chromium استفاده می‌کند.
- دانلود از Chrome for Testing با شکست مواجه شود، برای مثال هنگام قطعی سرویس، و `CHROMEDRIVER_CDNURL` تنظیم نشده باشد. در این حالت از آخرین نسخه انتشار با همان نسخه اصلی (major) Chromium استفاده می‌کند.

:::info

WebdriverIO درایور Safari را به‌طور خودکار دانلود نمی‌کند، زیرا از قبل روی macOS نصب شده است.

:::

:::info Firefox / Geckodriver

Firefox برای مرورگر از طرح نسخه‌گذاری متفاوتی (مثلاً `stable_151.0.1`) نسبت به [Geckodriver](https://github.com/mozilla/geckodriver/releases) (مثلاً `0.36.0`) استفاده می‌کند، بنابراین از `browserVersion` برای انتخاب نسخه درایور استفاده **نمی‌شود**. WebdriverIO به‌طور پیش‌فرض آخرین نسخه Geckodriver را دانلود می‌کند. برای تثبیت یک نسخه خاص از درایور، `geckoDriverVersion` را در `wdio:geckodriverOptions` تنظیم کنید:

```ts
{
    capabilities: [
        {
            browserName: 'firefox',
            browserVersion: 'stable_151.0.1',
            'wdio:geckodriverOptions': {
                geckoDriverVersion: '0.36.0'
            }
        }
    ]
}
```

:::

:::caution

از مشخص کردن `binary` برای مرورگر و حذف `binary` درایور مربوطه یا برعکس خودداری کنید. اگر فقط یکی از مقادیر `binary` مشخص شود، WebdriverIO سعی می‌کند از مرورگر/درایوری سازگار با آن استفاده کند یا آن را دانلود کند. با این حال، در برخی سناریوها ممکن است منجر به ترکیبی ناسازگار شود. بنابراین، توصیه می‌شود همیشه هر دو را مشخص کنید تا از هرگونه مشکل ناشی از ناسازگاری نسخه‌ها جلوگیری شود.

:::

**۳. شروع/توقف درایور.**

به‌طور پیش‌فرض، WebdriverIO درایور را با استفاده از یک پورت دلخواه و استفاده‌نشده به‌طور خودکار شروع و متوقف می‌کند. مشخص کردن هر یک از پیکربندی‌های زیر این ویژگی را غیرفعال می‌کند، به این معنی که باید درایور را به‌صورت دستی شروع و متوقف کنید:

- هر مقداری برای [port](configuration#port).
- هر مقداری متفاوت از مقدار پیش‌فرض برای [protocol](configuration#protocol)، [hostname](configuration#hostname)، [path](configuration#path).
- هر مقداری برای هر دو [user](configuration#user) و [key](configuration#key).

## راه‌اندازی دستی

در ادامه توضیح داده می‌شود که چگونه همچنان می‌توانید هر درایور را به‌صورت جداگانه راه‌اندازی کنید. می‌توانید فهرستی از همه درایورها را در README پروژه [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver) پیدا کنید.

:::tip

اگر به دنبال راه‌اندازی پلتفرم‌های موبایل و سایر پلتفرم‌های UI هستید، نگاهی به راهنمای [راه‌اندازی Appium](appium) ما بیندازید.

:::

### Chromedriver

برای خودکارسازی Chrome می‌توانید Chromedriver را مستقیماً از [وب‌سایت پروژه](http://chromedriver.chromium.org/downloads) یا از طریق پکیج NPM دانلود کنید:

```bash npm2yarn
npm install -g chromedriver
```

سپس می‌توانید آن را از طریق دستور زیر اجرا کنید:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

برای خودکارسازی Firefox، آخرین نسخه `geckodriver` را برای محیط خود دانلود کرده و آن را در دایرکتوری پروژه خود از حالت فشرده خارج کنید:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Curl', value: 'curl'},
    {label: 'Brew', value: 'brew'},
    {label: 'Windows (64 bit / Chocolatey)', value: 'chocolatey'},
    {label: 'Windows (64 bit / Powershell) DevTools', value: 'powershell'},
  ]
}>
<TabItem value="npm">

```bash npm2yarn
npm install geckodriver
```

</TabItem>
<TabItem value="curl">

Linux:

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | tar xz
```

MacOS (۶۴ بیتی):

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-macos.tar.gz | tar xz
```

</TabItem>
<TabItem value="brew">

```sh
brew install geckodriver
```

</TabItem>
<TabItem value="chocolatey">

```sh
choco install selenium-gecko-driver
```

</TabItem>
<TabItem value="powershell">

```sh
# به‌عنوان نشست دارای دسترسی ویژه اجرا کنید. راست‌کلیک کرده و 'Run as Administrator' را انتخاب کنید
# برای Windows ۳۲ بیتی از geckodriver-v0.24.0-win32.zip استفاده کنید
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # در دایرکتوری فعلی ذخیره می‌شود مگر اینکه طور دیگری تعریف شود
$unzipped_file = "geckodriver" # در پوشه‌ای با این نام از حالت فشرده خارج می‌شود

# به‌طور پیش‌فرض، Powershell از TLS 1.0 استفاده می‌کند، اما امنیت سایت به TLS 1.2 نیاز دارد
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# دانلود Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# خارج کردن Geckodriver از حالت فشرده
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# افزودن سراسری Geckodriver به PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**نکته:** سایر نسخه‌های انتشار `geckodriver` در [اینجا](https://github.com/mozilla/geckodriver/releases) در دسترس هستند. پس از دانلود می‌توانید درایور را از طریق دستور زیر اجرا کنید:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

می‌توانید درایور Microsoft Edge را از [وب‌سایت پروژه](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) یا به‌صورت پکیج NPM از طریق دستور زیر دانلود کنید:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver به‌صورت پیش‌نصب روی MacOS شما وجود دارد و می‌توان آن را مستقیماً از طریق دستور زیر اجرا کرد:

```sh
safaridriver -p 4444
```