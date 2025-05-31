---
id: security
title: பாதுகாப்பு
---

WebdriverIO தீர்வுகளை வழங்கும்போது பாதுகாப்பு அம்சத்தை கருத்தில் கொண்டுள்ளது. உங்கள் சோதனையை சிறப்பாக பாதுகாப்பதற்கான சில வழிகள் கீழே உள்ளன.

# உணர்திறன் தரவை மறைத்தல்

உங்கள் சோதனையின் போது உணர்திறன் தரவைப் பயன்படுத்துகிறீர்கள் என்றால், அவை பதிவுகளில் உள்ளிட்ட அனைவருக்கும் தெரியாமல் இருப்பதை உறுதிசெய்வது அவசியம். மேலும், கிளவுட் சேவை வழங்குநரைப் பயன்படுத்தும்போது, தனிப்பட்ட விசைகள் அடிக்கடி சம்பந்தப்படுகின்றன. இந்த தகவல்கள் பதிவுகள், அறிக்கையாளர்கள் மற்றும் பிற தொடர்புப்புள்ளிகளில் இருந்து மறைக்கப்பட வேண்டும். பின்வரும் விளக்கங்கள் அந்த மதிப்புகளை வெளிப்படுத்தாமல் சோதனைகளை இயக்குவதற்கான சில மறைப்பு தீர்வுகளை வழங்குகின்றன.

## WebDriverIO

### கட்டளைகளின் உரை மதிப்பை மறைத்தல்

`addValue` மற்றும் `setValue` கட்டளைகள் WDIO மற்றும் Appium பதிவுகளில், அத்துடன் அறிக்கையாளர்களிலும் மறைப்பதற்கான பூலியன் மறைப்பு மதிப்பை ஆதரிக்கின்றன. மேலும், செயல்திறன் கருவிகள் மற்றும் மூன்றாம் தரப்பு கருவிகள் போன்ற பிற கருவிகளும் மறைப்பு பதிப்பைப் பெறும், இது பாதுகாப்பை மேம்படுத்துகிறது.

எடுத்துக்காட்டாக, நீங்கள் உண்மையான உற்பத்தி பயனரைப் பயன்படுத்தி, நீங்கள் மறைக்க விரும்பும் கடவுச்சொல்லை உள்ளிட வேண்டுமென்றால், அதை பின்வருமாறு செய்யலாம்:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

மேலே உள்ளது WDIO பதிவுகளிலிருந்தும் Appium பதிவுகளிலிருந்தும் உரை மதிப்பை மறைக்கும்.

பதிவுகள் உதாரணம்:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

வரம்புகள்:
  - Appium-இல், நாம் தகவலை மறைக்க கேட்டாலும் கூட கூடுதல் செருகுநிரல்கள் கசியலாம்.
  - கிளவுட் வழங்குநர்கள் HTTP பதிவுக்காக ப்ராக்ஸி பயன்படுத்தலாம், இது அமைக்கப்பட்ட மறைப்பு முறையை மீறுகிறது.

:::info

குறைந்தபட்ச தேவையான பதிப்பு:
 - WDIO v9.15.0
 - Appium v2.19.0

### WDIO பதிவுகளில் மறைத்தல்

`maskingPatterns` உள்ளமைவைப் பயன்படுத்தி, WDIO பதிவுகளிலிருந்து உணர்திறன் தகவலை மறைக்கலாம். இருப்பினும், Appium பதிவுகள் உள்ளடக்கப்படவில்லை.

எடுத்துக்காட்டாக, நீங்கள் ஒரு கிளவுட் வழங்குநரைப் பயன்படுத்தி தகவல் நிலையைப் பயன்படுத்தினால், கீழே காட்டியுள்ளபடி பயனரின் விசையை "கசிய" செய்வீர்கள்:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

இதை எதிர்கொள்ள `'--key=([^ ]*)'` வழக்கமான வெளிப்பாட்டை அனுப்பலாம், இப்போது பதிவுகளில் நீங்கள் காண்பது 

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

உள்ளமைவின் `maskingPatterns` புலத்திற்கு வழக்கமான வெளிப்பாட்டை வழங்குவதன் மூலம் மேலே உள்ளதை அடையலாம்.
  - பல வழக்கமான வெளிப்பாடுகளுக்கு, காற்புள்ளியால் பிரிக்கப்பட்ட ஒற்றை சரத்தைப் பயன்படுத்தவும்.
  - மறைப்பு முறைகள் பற்றிய கூடுதல் விவரங்களுக்கு, [WDIO லாகர் README-இல் மறைப்பு முறைகள் பிரிவைப் பார்க்கவும்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

### WDIO லாகர்களை முடக்கு

உணர்திறன் தரவுகளின் பதிவை தடுப்பதற்கான மற்றொரு வழி பதிவு நிலையை குறைப்பது அல்லது அமைதியாக்குவது அல்லது லாகரை முடக்குவது.
அதை பின்வருமாறு அடையலாம்:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
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
Appium அதன் சொந்த மறைப்பு தீர்வை வழங்குகிறது; [Log filter](https://appium.io/docs/en/2.0/guides/log-filters/) ஐப் பார்க்கவும்
 - அவர்களின் தீர்வைப் பயன்படுத்துவது சிக்கலாக இருக்கலாம். ஒரு வழி, சாத்தியமாக இருந்தால், உங்கள் சரத்தில் `@mask@` போன்ற டோக்கனைப் பயன்படுத்தி அதை வழக்கமான வெளிப்பாடாகப் பயன்படுத்துவது
 - சில Appium பதிப்புகளில், மதிப்புகளும் ஒவ்வொரு எழுத்தும் காற்புள்ளியால் பிரிக்கப்பட்டு பதிவு செய்யப்படுகின்றன, எனவே நாம் கவனமாக இருக்க வேண்டும்
 - துரதிருஷ்டவசமாக, BrowserStack இந்த தீர்வை ஆதரிக்கவில்லை, ஆனால் இது உள்ளூரில் இன்னும் பயனுள்ளதாக உள்ளது
 
முன்பு குறிப்பிடப்பட்ட `@mask@` உதாரணத்தைப் பயன்படுத்தி, நாம் பின்வரும் JSON கோப்பைப் பயன்படுத்தலாம், இது `appiumMaskLogFilters.json` என பெயரிடப்பட்டுள்ளது
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

பின்னர் JSON கோப்பு பெயரை appium சேவை உள்ளமைவில் `logFilters` புலத்திற்கு அனுப்பவும்:
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

BrowserStack சில தரவுகளை மறைப்பதற்கான சில அளவு மறைப்பை வழங்குகிறது; [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data) ஐப் பார்க்கவும்
 - துரதிருஷ்டவசமாக, இந்த தீர்வு அனைத்து-அல்லது-எதுவும் இல்லை, எனவே வழங்கப்பட்ட கட்டளைகளின் அனைத்து உரை மதிப்புகளும் மறைக்கப்படும்.