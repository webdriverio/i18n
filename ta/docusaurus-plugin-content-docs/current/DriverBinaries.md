---
id: driverbinaries
title: டிரைவர் பைனரிகள்
---

WebDriver ப்ரோட்டோகாலை அடிப்படையாகக் கொண்ட ஆட்டோமேஷனை இயக்க, ஆட்டோமேஷன் கட்டளைகளை மொழிபெயர்க்கும் மற்றும் அவற்றை உலாவியில் செயல்படுத்தக்கூடிய பிரவுசர் டிரைவர்களை அமைக்க வேண்டும்.

## தானியங்கி அமைப்பு

WebdriverIO `v8.14` மற்றும் அதற்கு மேல் உள்ள பதிப்புகளில், பிரவுசர் டிரைவர்களை கைமுறையாக பதிவிறக்கம் செய்து அமைக்க வேண்டிய அவசியம் இல்லை, ஏனெனில் இது WebdriverIO ஆல் கையாளப்படுகிறது. நீங்கள் சோதிக்க விரும்பும் பிரவுசரைக் குறிப்பிட வேண்டும், மற்ற அனைத்தையும் WebdriverIO செய்துகொள்ளும்.

### தானியங்கி அளவை தனிப்பயனாக்குதல்

WebdriverIO மூன்று நிலைகளில் தானியங்குகிறது:

**1. [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers) பயன்படுத்தி உலாவியைப் பதிவிறக்கம் செய்து நிறுவுதல்.**

உங்கள் [capabilities](configuration#capabilities-1) கட்டமைப்பில் `browserName`/`browserVersion` சேர்மானத்தைக் குறிப்பிட்டால், கணினியில் ஏற்கனவே நிறுவப்பட்டிருந்தாலும், WebdriverIO கோரப்பட்ட சேர்மானத்தைப் பதிவிறக்கம் செய்து நிறுவும். `browserVersion` ஐ விட்டுவிட்டால், WebdriverIO முதலில் [locate-app](https://www.npmjs.com/package/locate-app) மூலம் ஏற்கனவே உள்ள நிறுவலைக் கண்டறிந்து பயன்படுத்த முயற்சிக்கும், இல்லையெனில் தற்போதைய நிலையான உலாவி வெளியீட்டைப் பதிவிறக்கம் செய்து நிறுவும். `browserVersion` பற்றிய கூடுதல் விவரங்களுக்கு, [இங்கே](capabilities#automate-different-browser-channels) பார்க்கவும்.

:::caution

தானியங்கி உலாவி அமைப்பு Microsoft Edge ஐ ஆதரிக்காது. தற்போது, Chrome, Chromium மற்றும் Firefox மட்டுமே ஆதரிக்கப்படுகின்றன.

:::

WebdriverIO ஆல் தானாக கண்டறிய முடியாத இடத்தில் உலாவி நிறுவல் இருந்தால், நீங்கள் உலாவி பைனரியைக் குறிப்பிடலாம், இது தானியங்கி பதிவிறக்கம் மற்றும் நிறுவலை முடக்கும்.

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

**2. [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) அல்லது [Geckodriver](https://www.npmjs.com/package/geckodriver) பயன்படுத்தி டிரைவரைப் பதிவிறக்கம் செய்து நிறுவுதல்.**

உள்ளமைவில் டிரைவர் [binary](capabilities#binary) குறிப்பிடப்படாவிட்டால், WebdriverIO எப்போதும் இதைச் செய்யும்:

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

:::info

WebdriverIO தானாகவே Safari டிரைவரைப் பதிவிறக்கம் செய்யாது, ஏனெனில் அது ஏற்கனவே macOS இல் நிறுவப்பட்டுள்ளது.

:::

:::caution

உலாவிக்கான `binary` ஐக் குறிப்பிட்டு, அதற்குரிய டிரைவர் `binary` ஐ விடுவதைத் தவிர்க்கவும் அல்லது எதிர்மாறாகவும். `binary` மதிப்புகளில் ஒன்று மட்டுமே குறிப்பிடப்பட்டிருந்தால், WebdriverIO அதனுடன் இணக்கமான உலாவி/டிரைவரைப் பயன்படுத்த அல்லது பதிவிறக்க முயற்சிக்கும். இருப்பினும், சில சூழல்களில் இது இணக்கமற்ற சேர்மானத்தை ஏற்படுத்தலாம். எனவே, பதிப்பு இணக்கமின்மை காரணமாக ஏற்படும் எந்தப் பிரச்சினைகளையும் தவிர்க்க எப்போதும் இரண்டையும் குறிப்பிடுவது பரிந்துரைக்கப்படுகிறது.

:::

**3. டிரைவரைத் தொடங்குதல்/நிறுத்துதல்.**

இயல்பாக, WebdriverIO தானாகவே பயன்படுத்தப்படாத போர்ட்டைப் பயன்படுத்தி டிரைவரைத் தொடங்கி நிறுத்தும். பின்வரும் கட்டமைப்புகளில் ஏதேனும் ஒன்றைக் குறிப்பிடுவது இந்த அம்சத்தை முடக்கும், இதன் பொருள் நீங்கள் கைமுறையாக டிரைவரைத் தொடங்கி நிறுத்த வேண்டும்:

- [port](configuration#port) க்கு ஏதேனும் மதிப்பு.
- [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path) ஆகியவற்றிற்கு இயல்புநிலை மதிப்பிலிருந்து வேறுபட்ட ஏதேனும் மதிப்பு.
- [user](configuration#user) மற்றும் [key](configuration#key) இரண்டிற்கும் ஏதேனும் மதிப்பு.

## கைமுறை அமைப்பு

பின்வரும் விளக்கம் ஒவ்வொரு டிரைவரையும் தனித்தனியாக எவ்வாறு அமைக்கலாம் என்பதை விவரிக்கிறது. அனைத்து டிரைவர்களின் பட்டியலை [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver) README இல் காணலாம்.

:::tip

நீங்கள் மொபைல் மற்றும் பிற UI தளங்களை அமைக்க விரும்பினால், எங்கள் [Appium அமைப்பு](appium) வழிகாட்டியைப் பார்க்கவும்.

:::

### Chromedriver

Chrome ஐ தானியக்கமாக்க, நீங்கள் Chromedriver ஐ நேரடியாக [திட்ட இணையதளத்தில்](http://chromedriver.chromium.org/downloads) பதிவிறக்கம் செய்யலாம் அல்லது NPM தொகுப்பின் மூலம் பதிவிறக்கம் செய்யலாம்:

```bash npm2yarn
npm install -g chromedriver
```

பின்னர் இதை இவ்வாறு தொடங்கலாம்:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Firefox ஐ தானியக்கமாக்க, உங்கள் சூழலுக்கான சமீபத்திய பதிப்பு `geckodriver` ஐப் பதிவிறக்கம் செய்து உங்கள் திட்ட கோப்பகத்தில் அதை விரிக்கவும்:

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

**குறிப்பு:** மற்ற `geckodriver` வெளியீடுகள் [இங்கே](https://github.com/mozilla/geckodriver/releases) கிடைக்கின்றன. பதிவிறக்கம் செய்த பிறகு, நீங்கள் டிரைவரை இவ்வாறு தொடங்கலாம்:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Microsoft Edge க்கான டிரைவரை [திட்ட இணையதளத்தில்](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) அல்லது NPM தொகுப்பாக பதிவிறக்கம் செய்யலாம்:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver உங்கள் MacOS இல் முன்கூட்டியே நிறுவப்பட்டுள்ளது மற்றும் நேரடியாக தொடங்கப்படலாம்:

```sh
safaridriver -p 4444
```