---
id: security
title: பாதுகாப்பு
---

WebdriverIO தீர்வுகளை வழங்கும்போது பாதுகாப்பு அம்சத்தை கருத்தில் கொண்டுள்ளது. உங்கள் சோதனையை மேலும் பாதுகாப்பாக வைத்திருக்க சில வழிகள் கீழே உள்ளன.

# உணர்திறன் தரவை மறைத்தல்

உங்கள் சோதனையின் போது உணர்திறன் தரவைப் பயன்படுத்துகிறீர்கள் எனில், அவை பதிவுகளில் போன்ற இடங்களில் அனைவருக்கும் தெரியாமல் இருப்பதை உறுதி செய்வது அவசியம். மேலும், கிளவுட் வழங்குநரைப் பயன்படுத்தும் போது, தனிப்பட்ட திறவுகோல்கள் அடிக்கடி சம்பந்தப்படுகின்றன. இந்த தகவல்கள் பதிவுகள், அறிக்கையாளர்கள் மற்றும் பிற தொடர்புப் புள்ளிகளிலிருந்து மறைக்கப்பட வேண்டும். பின்வரும் மறைப்பு தீர்வுகள் அந்த மதிப்புகளை வெளிப்படுத்தாமல் சோதனைகளை இயக்க உதவுகின்றன.

## WebDriverIO

### கட்டளைகளின் உரை மதிப்பை மறைத்தல்

`addValue` மற்றும் `setValue` கட்டளைகள் WDIO மற்றும் Appium பதிவுகளில், மற்றும் அறிக்கையாளர்களில் மறைப்பதற்கான boolean mask மதிப்பை ஆதரிக்கின்றன. மேலும், செயல்திறன் கருவிகள் மற்றும் மூன்றாம் தரப்பு கருவிகள் போன்ற பிற கருவிகளும் மறைக்கப்பட்ட பதிப்பைப் பெறும், இது பாதுகாப்பை மேம்படுத்துகிறது.

எடுத்துக்காட்டாக, நீங்கள் உண்மையான உற்பத்தி பயனரைப் பயன்படுத்துகிறீர்கள் மற்றும் நீங்கள் மறைக்க விரும்பும் கடவுச்சொல்லை உள்ளிட வேண்டும் என்றால், அது இப்போது பின்வருமாறு சாத்தியமாகிறது:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

மேற்கண்டது WDIO பதிவுகளிலிருந்தும் Appium பதிவுகளிலிருந்தும் உரை மதிப்பை மறைக்கும்.

பதிவுகள் எடுத்துக்காட்டு:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

வரம்புகள்:
  - Appium-இல், நாம் தகவலை மறைக்கக் கோரினாலும் கூடுதல் செருகுநிரல்கள் கசிவை ஏற்படுத்தலாம்.
  - கிளவுட் வழங்குநர்கள் HTTP பதிவிடலுக்கு பிராக்ஸியைப் பயன்படுத்தக்கூடும், இது நிறுவப்பட்ட மறைப்பு முறையைத் தவிர்க்கிறது.

:::info

குறைந்தபட்ச தேவையான பதிப்பு:
 - WDIO v9.15.0
 - Appium v2.19.0

### WDIO பதிவுகளில் மறைத்தல்

`maskingPatterns` கட்டமைப்பைப் பயன்படுத்தி, WDIO பதிவுகளில் இருந்து உணர்திறன் தகவல்களை மறைக்கலாம். இருப்பினும், Appium பதிவுகள் உள்ளடக்கப்படவில்லை.

எடுத்துக்காட்டாக, நீங்கள் ஒரு கிளவுட் வழங்குநரைப் பயன்படுத்துகிறீர்கள் மற்றும் தகவல் நிலையைப் பயன்படுத்துகிறீர்கள் என்றால், கீழே காட்டியபடி பயனரின் திறவுகோலை "கசிய" வைப்பீர்கள்:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

இதை எதிர்கொள்ள `'--key=([^ ]*)'` என்ற வழக்கமான வெளிப்பாட்டை அனுப்பலாம், இப்போது பதிவுகளில் நீங்கள் பார்ப்பது

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

கட்டமைப்பின் `maskingPatterns` புலத்திற்கு வழக்கமான வெளிப்பாட்டை வழங்குவதன் மூலம் மேலே உள்ளதை அடையலாம்.
  - பல வழக்கமான வெளிப்பாடுகளுக்கு, காற்புள்ளியால் பிரிக்கப்பட்ட ஒற்றை சரத்தைப் பயன்படுத்தவும்.
  - மறைப்பு முறைகள் பற்றிய கூடுதல் விவரங்களுக்கு, [WDIO Logger README-இல் மறைப்பு முறைகள் பிரிவைப் பார்க்கவும்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

குறைந்தபட்ச தேவையான பதிப்பு:
 - WDIO v9.15.0

### WDIO லாகர்களை முடக்குதல்

உணர்திறன் தரவு பதிவிடுவதைத் தடுக்க மற்றொரு வழி பதிவு நிலையைக் குறைப்பது அல்லது அமைதியாக்குவது அல்லது லாகரை முடக்குவது.
இது பின்வருமாறு அடையலாம்:

```ts
import logger from '@wdio/logger';

/**
  * பதிவுகளில் உணர்திறன் தகவல்களை மறைக்க உதவும் வாக்குறுதியை இயக்குவதற்கு முன் WDIO லாகரின் லாகர் நிலையை 'silent' ஆக அமைக்கவும்.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

## மூன்றாம் தரப்பு தீர்வுகள்

### Appium
Appium அதன் சொந்த மறைப்பு தீர்வை வழங்குகிறது; [பதிவு வடிகட்டி](https://appium.io/docs/en/latest/guides/log-filters/) ஐப் பார்க்கவும்
 - அவர்களின் தீர்வைப் பயன்படுத்துவது சிக்கலாக இருக்கலாம். ஒரு வழி, சாத்தியமெனில், உங்கள் சரத்தில் `@mask@` போன்ற டோக்கனை அனுப்பி, அதை வழக்கமான வெளிப்பாடாகப் பயன்படுத்துவது
 - சில Appium பதிப்புகளில், மதிப்புகள் ஒவ்வொரு எழுத்தும் காற்புள்ளியால் பிரிக்கப்பட்டு பதிவிடப்படுகின்றன, எனவே நாம் கவனமாக இருக்க வேண்டும்.
 - துரதிருஷ்டவசமாக, BrowserStack இந்த தீர்வை ஆதரிக்காது, ஆனால் இது உள்ளூரில் இன்னும் பயனுள்ளதாக இருக்கும்
 
முன்பு குறிப்பிடப்பட்ட `@mask@` எடுத்துக்காட்டைப் பயன்படுத்தி, பின்வரும் JSON கோப்பினை `appiumMaskLogFilters.json` என்ற பெயரில் பயன்படுத்தலாம்
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

பின்னர் JSON கோப்பு பெயரை appium சேவை கட்டமைப்பில் `logFilters` புலத்திற்கு அனுப்பவும்:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

### BrowserStack

BrowserStack சில தரவுகளை மறைக்க சில மறைப்பு அளவை வழங்குகிறது; [உணர்திறன் தரவை மறைக்க](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data) ஐப் பார்க்கவும்
 - துரதிருஷ்டவசமாக, தீர்வு அனைத்தும்-அல்லது-ஒன்றுமில்லை, எனவே வழங்கப்பட்ட கட்டளைகளின் அனைத்து உரை மதிப்புகளும் மறைக்கப்படும்.