---
id: driverbinaries
title: الملفات التنفيذية للمشغلات
description: "دع WebdriverIO ينزّل مشغلات المتصفح ويديرها تلقائيًا، أو قم بإعداد Chromedriver وGeckodriver وEdgedriver وSafaridriver يدويًا."
---

لتشغيل الأتمتة المستندة إلى بروتوكول WebDriver، تحتاج إلى إعداد مشغلات المتصفح التي تترجم أوامر الأتمتة وتكون قادرة على تنفيذها في المتصفح.

## الإعداد التلقائي

مع WebdriverIO `v8.14` والإصدارات الأحدث، لم تعد هناك حاجة لتنزيل وإعداد أي مشغلات متصفح يدويًا، إذ يتولى WebdriverIO ذلك. كل ما عليك فعله هو تحديد المتصفح الذي تريد اختباره وسيتولى WebdriverIO الباقي.

على ARM64، راجع [Chromedriver على ARM64](arm64-chromedriver) لمعرفة كيفية إعداد المشغل على macOS وWindows وLinux، وما يجب فعله عندما يتعذر إعداده تلقائيًا.

### تخصيص مستوى الأتمتة

لدى WebdriverIO ثلاثة مستويات من الأتمتة:

**1. تنزيل المتصفح وتثبيته باستخدام [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

إذا حددت تركيبة `browserName`/`browserVersion` في إعدادات [capabilities](configuration#capabilities-1)، فسيقوم WebdriverIO بتنزيل التركيبة المطلوبة وتثبيتها، بغض النظر عن وجود تثبيت سابق على الجهاز. وإذا أغفلت `browserVersion`، فسيحاول WebdriverIO أولًا تحديد موقع تثبيت موجود واستخدامه عبر [locate-app](https://www.npmjs.com/package/locate-app)، وإلا فسيقوم بتنزيل الإصدار المستقر الحالي من المتصفح وتثبيته. لمزيد من التفاصيل حول `browserVersion`، راجع [هنا](capabilities#automate-different-browser-channels).

:::caution

لا يدعم الإعداد التلقائي للمتصفح Microsoft Edge. حاليًا، المتصفحات المدعومة هي Chrome وChromium وFirefox فقط.

:::

إذا كان لديك متصفح مثبت في موقع لا يستطيع WebdriverIO اكتشافه تلقائيًا، يمكنك تحديد الملف التنفيذي للمتصفح، مما سيعطّل التنزيل والتثبيت التلقائيين.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // أو 'firefox' أو 'chromium'
            'goog:chromeOptions': { // أو 'moz:firefoxOptions' أو 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. تنزيل المشغل وتثبيته: Chromedriver من [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/)، وEdgedriver وGeckodriver باستخدام حزمتي [edgedriver](https://www.npmjs.com/package/edgedriver) و[geckodriver](https://www.npmjs.com/package/geckodriver).**

سيقوم WebdriverIO بذلك دائمًا، ما لم يتم تحديد [الملف التنفيذي](capabilities#binary) للمشغل في الإعدادات:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // أو 'firefox' أو 'msedge' أو 'safari' أو 'chromium'
            'wdio:chromedriverOptions': { // أو 'wdio:geckodriverOptions' أو 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // أو 'geckodriver' أو 'msedgedriver'
            }
        }
    ]
}
```

يقوم WebdriverIO بتنزيل Chromedriver من Chrome for Testing افتراضيًا، لكنه في حالات معينة سيستخدم [إصدار Electron](https://github.com/electron/electron/releases):

- عند تعيين [`wdio:electronVersion`](capabilities#wdioelectronversion) لتطبيق Electron. يستخدم ذلك الإصدار، ما لم يتم تعيين كل من `browserVersion` و`CHROMEDRIVER_CDNURL`.
- عندما يكون Chrome أقدم من `153.0.8001.0` على Linux ARM64، حيث لا يوفر Chrome for Testing إصدارات من Chromedriver (راجع [Chromedriver على ARM64](arm64-chromedriver)). يستخدم آخر إصدار بنفس الإصدار الرئيسي من Chromium.
- عندما يفشل التنزيل من Chrome for Testing، على سبيل المثال أثناء انقطاع الخدمة، ولم يتم تعيين `CHROMEDRIVER_CDNURL`. يستخدم آخر إصدار بنفس الإصدار الرئيسي من Chromium.

:::info

لن يقوم WebdriverIO بتنزيل مشغل Safari تلقائيًا لأنه مثبت مسبقًا على macOS.

:::

:::info Firefox / Geckodriver

يستخدم Firefox نظام ترقيم إصدارات للمتصفح (مثل `stable_151.0.1`) يختلف عن نظام [Geckodriver](https://github.com/mozilla/geckodriver/releases) (مثل `0.36.0`)، لذلك **لا** يُستخدم `browserVersion` لاختيار إصدار المشغل. افتراضيًا، يقوم WebdriverIO بتنزيل أحدث إصدار من Geckodriver. لتثبيت إصدار محدد من المشغل، قم بتعيين `geckoDriverVersion` في `wdio:geckodriverOptions`:

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

تجنب تحديد `binary` للمتصفح مع إغفال `binary` المقابل للمشغل أو العكس. إذا تم تحديد قيمة واحدة فقط من قيم `binary`، فسيحاول WebdriverIO استخدام أو تنزيل متصفح/مشغل متوافق معها. ومع ذلك، قد يؤدي ذلك في بعض الحالات إلى تركيبة غير متوافقة. لذلك، يُوصى دائمًا بتحديد كليهما لتجنب أي مشاكل ناتجة عن عدم توافق الإصدارات.

:::

**3. تشغيل المشغل وإيقافه.**

افتراضيًا، سيقوم WebdriverIO تلقائيًا بتشغيل المشغل وإيقافه باستخدام منفذ عشوائي غير مستخدم. سيؤدي تحديد أي من الإعدادات التالية إلى تعطيل هذه الميزة، مما يعني أنك ستحتاج إلى تشغيل المشغل وإيقافه يدويًا:

- أي قيمة لـ [port](configuration#port).
- أي قيمة مختلفة عن القيمة الافتراضية لـ [protocol](configuration#protocol) و[hostname](configuration#hostname) و[path](configuration#path).
- أي قيمة لكل من [user](configuration#user) و[key](configuration#key).

## الإعداد اليدوي

يصف ما يلي كيف لا يزال بإمكانك إعداد كل مشغل على حدة. يمكنك العثور على قائمة بجميع المشغلات في ملف README الخاص بـ [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

إذا كنت تبحث عن إعداد منصات الهواتف المحمولة ومنصات واجهة المستخدم الأخرى، فألقِ نظرة على دليل [إعداد Appium](appium) الخاص بنا.

:::

### Chromedriver

لأتمتة Chrome، يمكنك تنزيل Chromedriver مباشرة من [موقع المشروع](http://chromedriver.chromium.org/downloads) أو من خلال حزمة NPM:

```bash npm2yarn
npm install -g chromedriver
```

يمكنك بعد ذلك تشغيله عبر:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

لأتمتة Firefox، قم بتنزيل أحدث إصدار من `geckodriver` المناسب لبيئتك وفك ضغطه في مجلد مشروعك:

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

MacOS (64 بت):

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
# التشغيل كجلسة ذات صلاحيات. انقر بزر الماوس الأيمن واختر 'Run as Administrator'
# استخدم geckodriver-v0.24.0-win32.zip لنظام Windows 32 بت
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # سيتم حفظه في المجلد الحالي ما لم يُحدد خلاف ذلك
$unzipped_file = "geckodriver" # سيتم فك الضغط إلى مجلد بهذا الاسم

# افتراضيًا، يستخدم Powershell بروتوكول TLS 1.0 بينما يتطلب أمان الموقع TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# تنزيل Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# فك ضغط Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# إضافة Geckodriver إلى PATH بشكل عام
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**ملاحظة:** إصدارات `geckodriver` الأخرى متاحة [هنا](https://github.com/mozilla/geckodriver/releases). بعد التنزيل يمكنك تشغيل المشغل عبر:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

يمكنك تنزيل مشغل Microsoft Edge من [موقع المشروع](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) أو كحزمة NPM عبر:

```sh
npm install -g edgedriver
edgedriver --version # يطبع: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

يأتي Safaridriver مثبتًا مسبقًا على نظام MacOS الخاص بك ويمكن تشغيله مباشرة عبر:

```sh
safaridriver -p 4444
```