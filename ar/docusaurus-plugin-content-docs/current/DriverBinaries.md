---
id: driverbinaries
title: ثنائيات برامج التشغيل
---

لتشغيل الأتمتة بناءً على بروتوكول WebDriver، تحتاج إلى إعداد برامج تشغيل المتصفح التي تترجم أوامر الأتمتة وتكون قادرة على تنفيذها في المتصفح.

## الإعداد التلقائي

مع WebdriverIO `v8.14` والإصدارات الأحدث، لم تعد هناك حاجة لتنزيل وإعداد أي برامج تشغيل للمتصفح يدويًا حيث يتم التعامل معها بواسطة WebdriverIO. كل ما عليك فعله هو تحديد المتصفح الذي تريد اختباره وسيقوم WebdriverIO بالباقي.

### تخصيص مستوى الأتمتة

تمتلك WebdriverIO ثلاثة مستويات من الأتمتة:

**1. تنزيل وتثبيت المتصفح باستخدام [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

إذا قمت بتحديد مجموعة `browserName`/`browserVersion` في تكوين [capabilities](configuration#capabilities-1)، سيقوم WebdriverIO بتنزيل وتثبيت المجموعة المطلوبة، بغض النظر عن وجود تثبيت سابق على الجهاز. إذا أغفلت `browserVersion`، سيحاول WebdriverIO أولاً تحديد واستخدام تثبيت موجود بواسطة [locate-app](https://www.npmjs.com/package/locate-app)، وإلا سيقوم بتنزيل وتثبيت إصدار المتصفح المستقر الحالي. لمزيد من التفاصيل حول `browserVersion`، انظر [هنا](capabilities#automate-different-browser-channels).

:::caution

الإعداد التلقائي للمتصفح لا يدعم Microsoft Edge. حاليًا، يتم دعم Chrome و Chromium و Firefox فقط.

:::

إذا كان لديك تثبيت للمتصفح في موقع لا يمكن اكتشافه تلقائيًا بواسطة WebdriverIO، يمكنك تحديد الملف الثنائي للمتصفح الذي سيعطل التنزيل والتثبيت التلقائي.

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

**2. تنزيل وتثبيت برنامج التشغيل باستخدام [Chromedriver](https://www.npmjs.com/package/chromedriver) أو [Edgedriver](https://www.npmjs.com/package/edgedriver) أو [Geckodriver](https://www.npmjs.com/package/geckodriver).**

سيقوم WebdriverIO دائمًا بذلك، ما لم يتم تحديد [binary](capabilities#binary) لبرنامج التشغيل في التكوين:

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

:::info

لن يقوم WebdriverIO بتنزيل برنامج تشغيل Safari تلقائيًا لأنه مثبت بالفعل على macOS.

:::

:::caution

تجنب تحديد `binary` للمتصفح وإغفال `binary` لبرنامج التشغيل المقابل أو العكس. إذا تم تحديد واحد فقط من قيم `binary`، سيحاول WebdriverIO استخدام أو تنزيل متصفح/برنامج تشغيل متوافق معه. ومع ذلك، في بعض السيناريوهات قد يؤدي ذلك إلى مجموعة غير متوافقة. لذلك، يُنصح بتحديد كليهما دائمًا لتجنب أي مشكلات ناتجة عن عدم توافق الإصدارات.

:::

**3. بدء/إيقاف برنامج التشغيل.**

بشكل افتراضي، سيقوم WebdriverIO تلقائيًا ببدء وإيقاف برنامج التشغيل باستخدام منفذ غير مستخدم عشوائي. تحديد أي من التكوينات التالية سيعطل هذه الميزة مما يعني أنك ستحتاج إلى بدء وإيقاف برنامج التشغيل يدويًا:

- أي قيمة لـ [port](configuration#port).
- أي قيمة مختلفة عن الافتراضي لـ [protocol](configuration#protocol) أو [hostname](configuration#hostname) أو [path](configuration#path).
- أي قيمة لكل من [user](configuration#user) و [key](configuration#key).

## الإعداد اليدوي

فيما يلي وصف لكيفية إعداد كل برنامج تشغيل بشكل فردي. يمكنك العثور على قائمة بجميع برامج التشغيل في ملف README الخاص بـ [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

إذا كنت تبحث عن إعداد الأجهزة المحمولة ومنصات واجهة المستخدم الأخرى، فألق نظرة على [دليل إعداد Appium](appium) الخاص بنا.

:::

### Chromedriver

لأتمتة Chrome يمكنك تنزيل Chromedriver مباشرة من [موقع المشروع](http://chromedriver.chromium.org/downloads) أو من خلال حزمة NPM:

```bash npm2yarn
npm install -g chromedriver
```

يمكنك بعد ذلك بدء تشغيله عبر:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

لأتمتة Firefox قم بتنزيل أحدث إصدار من `geckodriver` لبيئتك وفك ضغطه في دليل المشروع الخاص بك:

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

**ملاحظة:** إصدارات `geckodriver` الأخرى متاحة [هنا](https://github.com/mozilla/geckodriver/releases). بعد التنزيل يمكنك بدء تشغيل برنامج التشغيل عبر:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

يمكنك تنزيل برنامج التشغيل لـ Microsoft Edge من [موقع المشروع](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) أو كحزمة NPM عبر:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

يأتي Safaridriver مثبتًا مسبقًا على نظام MacOS الخاص بك ويمكن بدء تشغيله مباشرة عبر:

```sh
safaridriver -p 4444
```