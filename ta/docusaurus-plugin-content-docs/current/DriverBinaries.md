---
id: driverbinaries
title: டிரைவர் பைனரிகள்
description: "WebdriverIO உலாவி டிரைவர்களைத் தானாகப் பதிவிறக்கி நிர்வகிக்க அனுமதிக்கவும், அல்லது Chromedriver, Geckodriver, Edgedriver மற்றும் Safaridriver ஆகியவற்றைக் கைமுறையாக அமைக்கவும்."
---

WebDriver நெறிமுறையை அடிப்படையாகக் கொண்ட ஆட்டோமேஷனை இயக்க, ஆட்டோமேஷன் கட்டளைகளை மொழிபெயர்த்து அவற்றை உலாவியில் செயல்படுத்தக்கூடிய உலாவி டிரைவர்கள் அமைக்கப்பட்டிருக்க வேண்டும்.

## தானியங்கு அமைப்பு

WebdriverIO `v8.14` மற்றும் அதற்குப் பிந்தைய பதிப்புகளில், உலாவி டிரைவர்களைக் கைமுறையாகப் பதிவிறக்கி அமைக்க வேண்டிய அவசியம் இல்லை, ஏனெனில் இதை WebdriverIO கையாளுகிறது. நீங்கள் சோதிக்க விரும்பும் உலாவியைக் குறிப்பிட்டால் போதும், மீதமுள்ளவற்றை WebdriverIO பார்த்துக்கொள்ளும்.

ARM64-இல், macOS, Windows மற்றும் Linux-இல் டிரைவர் அமைப்பு எவ்வாறு செயல்படுகிறது என்பதையும், அதைத் தானாக அமைக்க முடியாதபோது என்ன செய்ய வேண்டும் என்பதையும் அறிய [ARM64-இல் Chromedriver](arm64-chromedriver) பார்க்கவும்.

### ஆட்டோமேஷன் அளவைத் தனிப்பயனாக்குதல்

WebdriverIO-வில் மூன்று நிலை ஆட்டோமேஷன் உள்ளது:

**1. [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers) பயன்படுத்தி உலாவியைப் பதிவிறக்கி நிறுவுதல்.**

[capabilities](configuration#capabilities-1) கட்டமைப்பில் `browserName`/`browserVersion` சேர்க்கையை நீங்கள் குறிப்பிட்டால், கணினியில் ஏற்கனவே நிறுவல் உள்ளதா இல்லையா என்பதைப் பொருட்படுத்தாமல், WebdriverIO கோரப்பட்ட சேர்க்கையைப் பதிவிறக்கி நிறுவும். நீங்கள் `browserVersion`-ஐத் தவிர்த்தால், WebdriverIO முதலில் [locate-app](https://www.npmjs.com/package/locate-app) மூலம் ஏற்கனவே உள்ள நிறுவலைக் கண்டறிந்து பயன்படுத்த முயற்சிக்கும், இல்லையெனில் தற்போதைய நிலையான உலாவி வெளியீட்டைப் பதிவிறக்கி நிறுவும். `browserVersion` பற்றிய கூடுதல் விவரங்களுக்கு, [இங்கே](capabilities#automate-different-browser-channels) பார்க்கவும்.

:::caution

தானியங்கு உலாவி அமைப்பு Microsoft Edge-ஐ ஆதரிக்காது. தற்போது, Chrome, Chromium மற்றும் Firefox மட்டுமே ஆதரிக்கப்படுகின்றன.

:::

WebdriverIO தானாகக் கண்டறிய முடியாத இடத்தில் உங்கள் உலாவி நிறுவப்பட்டிருந்தால், உலாவி பைனரியைக் குறிப்பிடலாம், இது தானியங்கு பதிவிறக்கம் மற்றும் நிறுவலை முடக்கும்.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // அல்லது 'firefox' அல்லது 'chromium'
            'goog:chromeOptions': { // அல்லது 'moz:firefoxOptions' அல்லது 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. டிரைவரைப் பதிவிறக்கி நிறுவுதல்: [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/)-இலிருந்து Chromedriver, [edgedriver](https://www.npmjs.com/package/edgedriver) மற்றும் [geckodriver](https://www.npmjs.com/package/geckodriver) தொகுப்புகள் மூலம் Edgedriver மற்றும் Geckodriver.**

கட்டமைப்பில் டிரைவர் [binary](capabilities#binary) குறிப்பிடப்படாவிட்டால், WebdriverIO எப்போதும் இதைச் செய்யும்:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // அல்லது 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // அல்லது 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // அல்லது 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

WebdriverIO இயல்பாக Chrome for Testing-இலிருந்து Chromedriver-ஐப் பதிவிறக்குகிறது, ஆனால் சில சந்தர்ப்பங்களில் அது ஒரு [Electron வெளியீட்டை](https://github.com/electron/electron/releases) பயன்படுத்தும்:

- ஒரு Electron பயன்பாட்டிற்காக [`wdio:electronVersion`](capabilities#wdioelectronversion) அமைக்கப்பட்டிருக்கும்போது. `browserVersion` மற்றும் `CHROMEDRIVER_CDNURL` இரண்டும் அமைக்கப்படாவிட்டால், அது அந்த வெளியீட்டைப் பயன்படுத்தும்.
- Linux ARM64-இல் Chrome பதிப்பு `153.0.8001.0`-ஐ விடப் பழையதாக இருக்கும்போது, அங்கு Chrome for Testing-இல் Chromedriver பில்டுகள் இல்லை ([ARM64-இல் Chromedriver](arm64-chromedriver) பார்க்கவும்). அது அதே Chromium முதன்மைப் பதிப்பைக் கொண்ட கடைசி வெளியீட்டைப் பயன்படுத்தும்.
- Chrome for Testing பதிவிறக்கம் தோல்வியடையும்போது, உதாரணமாக சேவைத் தடையின்போது, மற்றும் `CHROMEDRIVER_CDNURL` அமைக்கப்படாதபோது. அது அதே Chromium முதன்மைப் பதிப்பைக் கொண்ட கடைசி வெளியீட்டைப் பயன்படுத்தும்.

:::info

Safari டிரைவர் macOS-இல் ஏற்கனவே நிறுவப்பட்டிருப்பதால், WebdriverIO அதைத் தானாகப் பதிவிறக்காது.

:::

:::info Firefox / Geckodriver

Firefox உலாவிக்கு (எ.கா. `stable_151.0.1`) [Geckodriver](https://github.com/mozilla/geckodriver/releases)-ஐ (எ.கா. `0.36.0`) விட வேறுபட்ட பதிப்பு முறையைப் பயன்படுத்துகிறது, எனவே டிரைவர் பதிப்பைத் தேர்ந்தெடுக்க `browserVersion` பயன்படுத்தப்படுவது **இல்லை**. இயல்பாக WebdriverIO சமீபத்திய Geckodriver-ஐப் பதிவிறக்குகிறது. ஒரு குறிப்பிட்ட டிரைவர் பதிப்பை நிலைநிறுத்த, `wdio:geckodriverOptions`-இல் `geckoDriverVersion`-ஐ அமைக்கவும்:

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

உலாவிக்கு `binary`-ஐக் குறிப்பிட்டு அதற்குரிய டிரைவர் `binary`-ஐத் தவிர்ப்பதையோ, அல்லது நேர்மாறாகச் செய்வதையோ தவிர்க்கவும். `binary` மதிப்புகளில் ஒன்று மட்டுமே குறிப்பிடப்பட்டால், WebdriverIO அதனுடன் இணக்கமான உலாவி/டிரைவரைப் பயன்படுத்த அல்லது பதிவிறக்க முயற்சிக்கும். இருப்பினும், சில சூழ்நிலைகளில் இது இணக்கமற்ற சேர்க்கைக்கு வழிவகுக்கலாம். எனவே, பதிப்பு இணக்கமின்மையால் ஏற்படும் சிக்கல்களைத் தவிர்க்க, எப்போதும் இரண்டையும் குறிப்பிடுவது பரிந்துரைக்கப்படுகிறது.

:::

**3. டிரைவரைத் தொடங்குதல்/நிறுத்துதல்.**

இயல்பாக, WebdriverIO பயன்படுத்தப்படாத ஏதேனும் ஒரு போர்ட்டைப் பயன்படுத்தி டிரைவரைத் தானாகத் தொடங்கி நிறுத்தும். பின்வரும் கட்டமைப்புகளில் ஏதேனும் ஒன்றைக் குறிப்பிட்டால் இந்த அம்சம் முடக்கப்படும், அதாவது நீங்கள் டிரைவரைக் கைமுறையாகத் தொடங்கி நிறுத்த வேண்டும்:

- [port](configuration#port)-க்கான ஏதேனும் மதிப்பு.
- [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path) ஆகியவற்றுக்கு இயல்பு மதிப்பிலிருந்து வேறுபட்ட ஏதேனும் மதிப்பு.
- [user](configuration#user) மற்றும் [key](configuration#key) இரண்டுக்குமான ஏதேனும் மதிப்பு.

## கைமுறை அமைப்பு

ஒவ்வொரு டிரைவரையும் தனித்தனியாக நீங்கள் எவ்வாறு அமைக்கலாம் என்பதைப் பின்வருவது விவரிக்கிறது. அனைத்து டிரைவர்களின் பட்டியலை [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver) README-இல் காணலாம்.

:::tip

நீங்கள் மொபைல் மற்றும் பிற UI தளங்களை அமைக்க விரும்பினால், எங்கள் [Appium அமைப்பு](appium) வழிகாட்டியைப் பார்க்கவும்.

:::

### Chromedriver

Chrome-ஐ ஆட்டோமேட் செய்ய, Chromedriver-ஐ நேரடியாக [திட்ட இணையதளத்தில்](http://chromedriver.chromium.org/downloads) அல்லது NPM தொகுப்பு மூலம் பதிவிறக்கலாம்:

```bash npm2yarn
npm install -g chromedriver
```

பின்னர் இதன் மூலம் தொடங்கலாம்:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Firefox-ஐ ஆட்டோமேட் செய்ய, உங்கள் சூழலுக்கான `geckodriver`-இன் சமீபத்திய பதிப்பைப் பதிவிறக்கி, உங்கள் திட்டக் கோப்பகத்தில் பிரித்தெடுக்கவும்:

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
# சிறப்புரிமை அமர்வாக இயக்கவும். வலது-கிளிக் செய்து 'Run as Administrator' என அமைக்கவும்
# 32 bit Windows-க்கு geckodriver-v0.24.0-win32.zip-ஐப் பயன்படுத்தவும்
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # வேறுவிதமாக வரையறுக்கப்படாவிட்டால் தற்போதைய கோப்பகத்தில் சேமிக்கப்படும்
$unzipped_file = "geckodriver" # இந்தக் கோப்புறைப் பெயருக்குப் பிரித்தெடுக்கப்படும்

# இயல்பாக, Powershell TLS 1.0-ஐப் பயன்படுத்துகிறது, ஆனால் தளப் பாதுகாப்பிற்கு TLS 1.2 தேவை
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Geckodriver-ஐப் பதிவிறக்குகிறது
Invoke-WebRequest -Uri $url -OutFile $output

# Geckodriver-ஐப் பிரித்தெடுக்கவும்
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Geckodriver-ஐ உலகளாவிய PATH-இல் அமைக்கவும்
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**குறிப்பு:** பிற `geckodriver` வெளியீடுகள் [இங்கே](https://github.com/mozilla/geckodriver/releases) கிடைக்கின்றன. பதிவிறக்கிய பிறகு, இதன் மூலம் டிரைவரைத் தொடங்கலாம்:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Microsoft Edge-க்கான டிரைவரை [திட்ட இணையதளத்தில்](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) அல்லது NPM தொகுப்பாக இதன் மூலம் பதிவிறக்கலாம்:

```sh
npm install -g edgedriver
edgedriver --version # அச்சிடுவது: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver உங்கள் MacOS-இல் முன்பே நிறுவப்பட்டு வருகிறது, மேலும் இதை நேரடியாக இதன் மூலம் தொடங்கலாம்:

```sh
safaridriver -p 4444
```