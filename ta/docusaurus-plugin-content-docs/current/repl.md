---
id: repl
title: REPL இடைமுகப்பு
---

WebdriverIO `v4.5.0` அறிமுகப்படுத்திய [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) இடைமுகப்பு கட்டமைப்பின் API-யை கற்றுக்கொள்ள மட்டுமல்லாமல், உங்கள் சோதனைகளை பிழைதிருத்தவும் ஆய்வு செய்யவும் உதவுகிறது. இதை பல வழிகளில் பயன்படுத்தலாம்.

முதலில் நீங்கள் `npm install -g @wdio/cli` நிறுவி, CLI கட்டளையாக பயன்படுத்தி கட்டளை வரியிலிருந்து WebDriver அமர்வை துவக்கலாம், எ.கா.

```sh
wdio repl chrome
```

இது Chrome உலாவியை திறக்கும், அதை REPL இடைமுகப்பு மூலம் கட்டுப்படுத்தலாம். அமர்வை துவக்க துறைமுகம் `4444` இல் இயங்கும் உலாவி இயக்கி இருப்பதை உறுதிசெய்யவும். உங்களிடம் [Sauce Labs](https://saucelabs.com) (அல்லது வேறு கிளவுட் விற்பனையாளர்) கணக்கு இருந்தால், நீங்கள் நேரடியாக உங்கள் கட்டளை வரியில் கிளவுடில் உலாவியை இயக்கலாம்:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

இயக்கி வேறு துறைமுகத்தில் இயங்கினால் எ.கா: 9515, அதை கட்டளை வரி மூலம் --port அல்லது -p சுருக்கப்பெயர் மூலம் அனுப்பலாம்

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

webdriverIO கான்ஃபிக் கோப்பிலிருந்து திறன்களைப் பயன்படுத்தியும் Repl இயக்கலாம். Wdio திறன் பொருள்; அல்லது; பல தொலைநிலை திறன் பட்டியல் அல்லது பொருளை ஆதரிக்கிறது.

கான்ஃபிக் கோப்பு திறன் பொருளைப் பயன்படுத்தினால், கான்ஃபிக் கோப்பிற்கான பாதையை மட்டும் அனுப்பவும், இல்லையெனில் பல தொலைநிலை திறனாக இருந்தால், பட்டியல் அல்லது பல தொலைநிலையிலிருந்து எந்த திறனைப் பயன்படுத்த வேண்டும் என்பதை நிலை மதிப்புருவைப் பயன்படுத்தி குறிப்பிடவும். குறிப்பு: பட்டியலுக்கு நாங்கள் பூஜ்ஜிய அடிப்படையிலான குறியீட்டைக் கருதுகிறோம்.

### உதாரணம்

திறன் அணி கொண்ட WebdriverIO:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

[பல தொலைநிலை](https://webdriver.io/docs/multiremote/) திறன் பொருள் கொண்ட WebdriverIO:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

அல்லது Appium பயன்படுத்தி உள்ளூர் மொபைல் சோதனைகளை இயக்க விரும்பினால்:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

இது இணைக்கப்பட்ட சாதனம்/எமுலேட்டர்/சிமுலேட்டரில் Chrome/Safari அமர்வைத் திறக்கும். அமர்வைத் தொடங்க துறைமுகம் `4444` இல் Appium இயங்குவதை உறுதிசெய்யவும்.

```sh
wdio repl './path/to/your_app.apk'
```

இது இணைக்கப்பட்ட சாதனம்/எமுலேட்டர்/சிமுலேட்டரில் ஆப் அமர்வைத் திறக்கும். அமர்வைத் தொடங்க துறைமுகம் `4444` இல் Appium இயங்குவதை உறுதிசெய்யவும்.

iOS சாதனத்திற்கான திறன்களை மதிப்புருக்களுடன் அனுப்பலாம்:

* `-v`      - `platformVersion`: Android/iOS தளத்தின் பதிப்பு
* `-d`      - `deviceName`: மொபைல் சாதனத்தின் பெயர்
* `-u`      - `udid`: உண்மையான சாதனங்களுக்கான udid

பயன்பாடு:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

உங்கள் REPL அமர்விற்கு கிடைக்கும் எந்த விருப்பங்களையும் (காண்க `wdio repl --help`) நீங்கள் பயன்படுத்தலாம்.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

REPL-ஐப் பயன்படுத்தும் மற்றொரு வழி [`debug`](/docs/api/browser/debug) கட்டளை மூலம் உங்கள் சோதனைகளில் பயன்படுத்துவது. இது அழைக்கப்படும்போது உலாவியை நிறுத்தும், மேலும் பயன்பாட்டிற்குள் (எ.கா. டெவலப்பர் கருவிகளுக்கு) செல்ல அல்லது கட்டளை வரியிலிருந்து உலாவியைக் கட்டுப்படுத்த உங்களை அனுமதிக்கிறது. சில கட்டளைகள் எதிர்பார்த்தபடி ஒரு குறிப்பிட்ட செயலைத் தூண்டாதபோது இது உதவியாக இருக்கும். REPL உடன், எந்த கட்டளைகள் மிகவும் நம்பகமாக வேலை செய்கின்றன என்பதைக் காண நீங்கள் கட்டளைகளை முயற்சி செய்யலாம்.