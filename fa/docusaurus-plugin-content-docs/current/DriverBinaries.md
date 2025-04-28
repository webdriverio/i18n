---
id: driverbinaries
title: راه اندازهای مرورگر
---

برای اجرای اتوماسیون بر اساس پروتکل WebDriver شما نیاز به راه‌اندازهای مرورگر دارید که دستورات اتوماسیون را ترجمه می‌کنند و قادر به اجرای آنها در مرورگر هستند.

## راه‌اندازی خودکار

با WebdriverIO نسخه `v8.14` و بالاتر دیگر نیازی به دانلود و راه‌اندازی دستی راه‌اندازهای مرورگر نیست زیرا این کار توسط WebdriverIO انجام می‌شود. تنها کاری که باید انجام دهید این است که مرورگری که می‌خواهید آزمایش کنید را مشخص کنید و WebdriverIO بقیه کارها را انجام می‌دهد.

### سفارشی کردن سطح اتوماسیون

WebdriverIO سه سطح اتوماسیون دارد:

**1. دانلود و نصب مرورگر با استفاده از [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

اگر ترکیب `browserName`/`browserVersion` را در پیکربندی [capabilities](configuration#capabilities-1) مشخص کنید، WebdriverIO ترکیب درخواستی را دانلود و نصب می‌کند، صرف نظر از اینکه آیا نصب موجود روی دستگاه وجود دارد یا خیر. اگر `browserVersion` را حذف کنید، WebdriverIO ابتدا سعی می‌کند یک نصب موجود را با [locate-app](https://www.npmjs.com/package/locate-app) پیدا و استفاده کند، در غیر این صورت آخرین نسخه پایدار مرورگر را دانلود و نصب می‌کند. برای جزئیات بیشتر در مورد `browserVersion`، [اینجا](capabilities#automate-different-browser-channels) را ببینید.

:::caution

راه‌اندازی خودکار مرورگر از Microsoft Edge پشتیبانی نمی‌کند. در حال حاضر، فقط Chrome، Chromium و Firefox پشتیبانی می‌شوند.

:::

اگر نصب مرورگر در مکانی دارید که توسط WebdriverIO به صورت خودکار قابل تشخیص نیست، می‌توانید باینری مرورگر را مشخص کنید که این کار دانلود و نصب خودکار را غیرفعال می‌کند.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // یا 'firefox' یا 'chromium'
            'goog:chromeOptions': { // یا 'moz:firefoxOptions' یا 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. دانلود و نصب راه‌انداز با استفاده از [Chromedriver](https://www.npmjs.com/package/chromedriver)، [Edgedriver](https://www.npmjs.com/package/edgedriver) یا [Geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO همیشه این کار را انجام می‌دهد، مگر اینکه [binary](capabilities#binary) راه‌انداز در پیکربندی مشخص شده باشد:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // یا 'firefox'، 'msedge'، 'safari'، 'chromium'
            'wdio:chromedriverOptions': { // یا 'wdio:geckodriverOptions'، 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // یا 'geckodriver'، 'msedgedriver'
            }
        }
    ]
}
```

:::info

WebdriverIO به طور خودکار راه‌انداز Safari را دانلود نمی‌کند زیرا از قبل روی macOS نصب شده است.

:::

:::caution

از مشخص کردن `binary` برای مرورگر و حذف `binary` راه‌انداز مربوطه یا برعکس خودداری کنید. اگر فقط یکی از مقادیر `binary` مشخص شود، WebdriverIO سعی می‌کند از مرورگر/راه‌انداز سازگار با آن استفاده کند یا آن را دانلود کند. با این حال، در بعضی سناریوها ممکن است منجر به ترکیب ناسازگار شود. بنابراین، توصیه می‌شود که همیشه هر دو را مشخص کنید تا از هرگونه مشکل ناشی از ناسازگاری نسخه‌ها جلوگیری شود.

:::

**3. شروع/توقف راه‌انداز.**

به طور پیش‌فرض، WebdriverIO به طور خودکار راه‌انداز را با استفاده از یک پورت بلااستفاده دلخواه شروع و متوقف می‌کند. مشخص کردن هر یک از پیکربندی‌های زیر این ویژگی را غیرفعال می‌کند که به این معنی است که شما باید به صورت دستی راه‌انداز را شروع و متوقف کنید:

- هر مقداری برای [port](configuration#port).
- هر مقدار متفاوت از پیش‌فرض برای [protocol](configuration#protocol)، [hostname](configuration#hostname)، [path](configuration#path).
- هر مقداری برای هر دو [user](configuration#user) و [key](configuration#key).

## راه‌اندازی دستی

موارد زیر شرح می‌دهد که چگونه می‌توانید هر راه‌انداز را به صورت جداگانه راه‌اندازی کنید. می‌توانید لیستی از تمام راه‌اندازها را در README [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver) پیدا کنید.

:::tip

اگر به دنبال راه‌اندازی پلتفرم‌های موبایل و سایر رابط‌های کاربری هستید، به راهنمای [Appium Setup](appium) ما نگاهی بیندازید.

:::

### Chromedriver

برای اتوماسیون Chrome می‌توانید Chromedriver را مستقیماً از [وب‌سایت پروژه](http://chromedriver.chromium.org/downloads) یا از طریق بسته NPM دانلود کنید:

```bash npm2yarn
npm install -g chromedriver
```

سپس می‌توانید آن را از طریق زیر شروع کنید:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

برای اتوماسیون Firefox آخرین نسخه `geckodriver` را برای محیط خود دانلود کنید و آن را در دایرکتوری پروژه خود باز کنید:

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

MacOS (64 bit):

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
# Run as privileged session. Right-click and set 'Run as Administrator'
# Use geckodriver-v0.24.0-win32.zip for 32 bit Windows
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # will drop into current directory unless defined otherwise
$unzipped_file = "geckodriver" # will unzip to this folder name

# By default, Powershell uses TLS 1.0 the site security requires TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Downloads Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Unzip Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Globally Set Geckodriver to PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**نکته:** سایر نسخه‌های `geckodriver` در [اینجا](https://github.com/mozilla/geckodriver/releases) موجود است. پس از دانلود می‌توانید راه‌انداز را از طریق زیر شروع کنید:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

می‌توانید راه‌انداز Microsoft Edge را از [وب‌سایت پروژه](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) یا به عنوان بسته NPM از طریق زیر دانلود کنید:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver از قبل روی MacOS شما نصب شده است و می‌تواند مستقیماً از طریق زیر شروع شود:

```sh
safaridriver -p 4444
```
```