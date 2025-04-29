---
id: wdio-teamcity-reporter
title: டீம்சிட்டி ரிப்போர்ட்டர்
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு தயவுசெய்து [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter) பார்க்கவும்

WebdriverIO டீம்சிட்டி ரிப்போர்ட்டர் சோதனை முடிவுகளை நிகழ்நேரத்தில் காட்ட உதவுகிறது, சோதனை தகவல்களை பில்ட் ரிசல்ட்ஸ் பக்கத்தின் டெஸ்ட்ஸ் டேப்பில் காண உதவுகிறது.


## நிறுவல்

```bash
npm install wdio-teamcity-reporter --save-dev
```

WebdriverIO ஐ எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகள் இங்கே காணலாம்: https://webdriver.io/docs/gettingstarted


## கட்டமைப்பு

உங்கள் [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html) கோப்பில் ரிப்போர்ட்டரை சேர்க்கவும்:

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optional
        flowId: true, // optional
        message: '[title]', // optional
      }
    ]
  ],
  // ...
}
```

### விருப்பத்தேர்வுகள்

- `captureStandardOutput (boolean)` — `true` என்றால், `testStarted` மற்றும் `testFinished` செய்திகளுக்கு இடையில் பெறப்பட்ட அனைத்து நிலையான வெளியீடு (மற்றும் நிலையான பிழை) செய்திகளும் சோதனை வெளியீடாக கருதப்படும். இயல்புநிலை மதிப்பு `false` மற்றும் சோதனை வெளியீட்டை அறிக்கை செய்ய testStdOut மற்றும் testStdErr சேவை செய்திகளின் பயன்பாட்டை அனுமானிக்கிறது. இயல்புநிலை `false`.
- `flowId (boolean)` — `true` என்றால், `flowId` பண்பு அனைத்து செய்திகளுக்கும் சேர்க்கப்படும். இணையாக இயங்கும் தனித்தனி செயல்முறைகளை வேறுபடுத்த ஓட்ட கண்காணிப்பு அவசியம். இயல்புநிலை `true`.
- `message (string)` — பெயர் பண்புக்கு குறிப்பிட்ட வடிவத்தை வழங்க வாய்ப்பு. சாத்தியமான விசைகள்: `[browser]`, `[title]`. எடுத்துக்காட்டு, `[browser] / [title]`. இயல்புநிலை `[title]`.


## இணைப்புகள்

- அறிக்கை செய்திகள் பற்றிய டீம்சிட்டி ஆவணத்திற்கான குறிப்பு: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- டீம்சிட்டி டெஸ்ட்டிரைவ்: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## உரிமம்

> The MIT License