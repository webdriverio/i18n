---
id: wdio-timeline-reporter
title: கால அட்டவணை அறிக்கையாளர்
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter ஒரு மூன்றாம் தரப்பு தொகுப்பாகும், மேலும் தகவல்களுக்கு [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter) பார்க்கவும்


> உங்கள் சோதனை முடிவுகளை ஒருங்கிணைந்த காட்சிப்படுத்தலுக்கான ஒரு முழுமையான WebdriverIO அறிக்கையாளர் ஏனென்றால் "பார்ப்பதே நம்புவது"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## ஏன்

ஏனென்றால் நாங்கள் தோல்வியடைந்த சோதனைகளை டெர்மினல் வெளியீட்டிலிருந்து பிழை ஸ்கிரீன்ஷாட்களைப் பார்ப்பதற்கு மாறுவதில் அதிக நேரம் செலவழிக்கிறோம். இந்த அறிக்கையாளர் உங்களுக்குத் தேவைப்படும் அனைத்து பொதுவான தகவல்களையும் ஒரே அறிக்கையில் ஒருங்கிணைக்கிறது. சோதனைகளை இயக்கி எல்லாம் சரியாக உள்ளதா என்பதை மேலும் சரிபார்க்க நீங்கள் திரும்பிப் பார்க்கக்கூடிய நிகழ்வுகளின் அழகான கால அட்டவணையைப் பெறுங்கள்.

#### அம்சங்களில் அடங்குபவை:

- Mocha மற்றும் Jasmine கட்டமைப்புகளுடன் சிறப்பாக செயல்படுகிறது. Cucumber உடனும் செயல்படுகிறது ஆனால் ஒவ்வொரு படியும் ஒரு சோதனையாக அறிக்கை செய்யப்படும்
- சோதனை முடிவுகளின் பெரிய சுருக்கம்.
- சோதனை செயல்பாட்டின் போது எடுக்கப்பட்ட அனைத்து ஸ்கிரீன்ஷாட்களும் உட்பட ஒவ்வொரு சோதனை இயக்கத்தின் விவரம்.
- சோதனை முடிவுகள் வடிகட்டுதல். தோல்வியடைந்த சோதனைகளில் கவனம் செலுத்த சிறந்தது
- சோதனையுடன் இணைக்கப்பட்ட பிழை ஸ்டாக் ட்ரேஸ்.
- ரன்டைம் நேரத்தில் சோதனைக்கு கூடுதல் தகவல்களைச் சேர்க்கும் திறன்.
- பிந்தைய செயலாக்கம் தேவையில்லை. wdio சோதனை செயல்முறை முடிவடைந்ததும், ஒரு நிலையான html அறிக்கை கோப்பு உருவாக்கப்படும்.
- படங்களின் அளவை மாற்றுதல் உட்பட ஸ்கிரீன்ஷாட்களை எடுப்பதை நிர்வகிக்க கால அட்டவணை சேவை.

ஒரு உதாரண html அறிக்கையை [இங்கே](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html) காணலாம்

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே](http://webdriver.io/guide/getstarted/install.html) காணலாம்.

## நிறுவல்

**WEBDRIVERIO V4 உடன் பொருந்தக்கூடிய பதிப்பிற்கு [இங்கே](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4) பார்க்கவும்**

```shell
npm install --save wdio-timeline-reporter
```

உங்கள் `package.json`-க்கு ஒரு சார்பு சேர்க்கப்படும்

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### பயன்பாடு

உங்கள் wdio கட்டமைப்பு கோப்பில் அறிக்கையாளர்கள் வரிசையில் `timeline` சேர்க்கவும்.

மேலும் wdio-timeline-reporter இலிருந்து `TimelineService` ஐ இறக்குமதி செய்து சேர்க்கவும்.

அறிக்கைகளை ஒருங்கிணைத்து html உருவாக்க சேவை கட்டாயமாகும், ஏனெனில் அறிக்கையாளர்கள் இப்போது webdriverio 5 இல் ஓட்டுனர் நிகழ்வு ஒன்றுக்கு ஒன்று துவக்கப்படுகின்றன. [webdriverio இல் திறந்த விவாதத்தைப் பார்க்கவும்](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineService சோதனைகள் செயல்படுத்தும் போது ஸ்கிரீன்ஷாட்களை எடுப்பதை நிர்வகிக்கலாம். படங்களின் அளவு மற்றும் தரத்தைக் குறைக்கவும், base64 ஆக படங்களை அறிக்கையில் உட்பொதிக்கவும் உங்களுக்கு விருப்பம் உள்ளது. இவை [அறிக்கையாளர் விருப்பங்கள்](#reporter-options) பயன்படுத்தி கட்டமைக்கக்கூடியவை.

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### அறிக்கையாளர் விருப்பங்கள்

இயல்புநிலை அறிக்கையாளர் கட்டமைப்பை மாற்ற விரும்பினால், கீழே காட்டியபடி அறிக்கையாளர்கள் கீழ் timeline வரிசைக்கு ஒரு reporterOptions பொருள் லிட்டரலை சேர்க்கவும்.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| index | description                                                                                                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.    | html கோப்பு மற்றும் ஸ்கிரீன்ஷாட்கள் உருவாக்கப்படும் டைரக்டரி. கட்டாய விருப்பம்                                                                                                                      |
| 2.    | அறிக்கை html கோப்பின் பெயர். இயல்புநிலை மதிப்பு `timeline-report.html`                                                                                                                              |
| 3.    | html கோப்பில் படங்களை base64 ஆக உட்பொதிக்கவும். இயல்புநிலை மதிப்பு `false`                                                                                                                         |
| 4.    | பட கையாளுதலுக்கான பொருள் விருப்பங்கள்                                                                                                                                                               |
| 5.    | JPEG தரத்தை அமைக்கவும். `resize` விருப்பம் `true` என்றால் மட்டுமே பொருத்தமானது. மதிப்பு சிறியதாக இருந்தால், படத்தின் அளவு மற்றும் தரம் குறைவாக இருக்கும். இயல்புநிலை மதிப்பு `70`. அதிகபட்ச அனுமதிக்கப்பட்ட மதிப்பு `100` |
| 6.    | படத்தை மறுஅளவிடு. இயல்புநிலை மதிப்பு `false`                                                                                                                                                        |
| 7.    | பிக்சல்களின் மொத்த எண்ணிக்கையை குறைக்க மதிப்பு. `resize` விருப்பம் true என்றால் மட்டுமே பொருத்தமானது. இயல்புநிலை `1` செல்லுபடியாகும் மதிப்புகள் `1 - 5`                                       |
| 8.    | எத்தனை முறை ஸ்கிரீன்ஷாட்கள் எடுக்க வேண்டும். ஆதரிக்கப்படும் மதிப்புகள் `on:error`, `before:click`, `none`. இயல்புநிலையாக `none`. `before:click` சோதனையில் உள்ள பயன்பாட்டின் ஸ்கிரீன்ஷாட்களின் கால அட்டவணையை உருவாக்க ஒரு சிறந்த விருப்பமாகும். |

### சோதனை சூழலுக்கு கூடுதல் தகவலைச் சேர்க்கவும்

`addContext` நிலையான முறையைப் பயன்படுத்தி சோதனைக்கு கூடுதல் தகவல்களைச் சேர்ப்பது சாத்தியமாகும். இது தோல்வியடைந்த சோதனைகளை பிழைத்திருத்துவதற்கு உதவும் முக்கியமான தகவல்களைச் சேர்ப்பதற்கு பயனுள்ளதாக இருக்கும், எடுத்துக்காட்டாக, சோதனை இயக்கத்தின் போது மாறுபடும் பயனர்பெயருடன் உருவாக்கப்பட்ட பயனர்

#### அடிப்படை பயன்பாடு

`TimelineReporter.addContext` நிலையான முறை ஒரு சரம் அளவுருவை அல்லது இரண்டு பண்புகளுடன் கூடிய ஒரு பொருள் லிட்டரலை ஏற்றுக்கொள்கிறது `title` மற்றும் `value` எ.கா

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

மதிப்பு ஒரு இணைப்பாகவும் இருக்கலாம்

##### Mocha உதாரணம்

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // object literal parameter
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // value as anchor tag
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // string parameter
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## நன்றி

[wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter) ஆசிரியர்கள் மற்றும் பராமரிப்பாளர்களுக்கு நன்றி தெரிவிக்க விரும்புகிறேன். அவர்களின் v5 தீர்வை பார்ப்பது என் வேலையை விரைவுபடுத்த உதவியது