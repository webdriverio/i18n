---
id: json-reporter
title: Json ரிப்போர்ட்டர்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## நிறுவல்

```bash
npm install @wdio/json-reporter --save-dev
```

## கட்டமைப்பு

### முடிவுகளை `stdout` இல் காட்ட

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### முடிவுகளை கோப்பில் சேமிக்க

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### முடிவுகளை தனிப்பயன் கோப்பு பெயருடன் சேமிக்க

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## முடிவு கோப்புகள்

WDIO v5 முதல், அறிக்கையிடல் மையப்படுத்தப்பட்ட செயல்முறையிலிருந்து இணை சோதனை செயல்பாட்டிற்காக உருவாக்கப்பட்ட ஒவ்வொரு "அமர்வுகளாலும்" கையாளப்படும் ஒன்றாக மாறியுள்ளது. இந்த மாற்றம் WDIO சோதனை செயல்பாட்டின் போது உரையாடல் அளவைக் குறைக்க உதவியது, இதனால் செயல்திறன் மேம்பட்டது. பின்னடைவு என்னவென்றால், அனைத்து சோதனை செயல்பாட்டிற்கும் ஒரே அறிக்கையைப் பெற முடியாது.

`@wdio/json-reporter` பல json கோப்புகளை ஒரு கோப்பாக இணைக்க ஒரு பயன்பாட்டு செயல்பாட்டை வழங்குகிறது. பயன்பாட்டைப் பயன்படுத்த கீழேயுள்ள படிகளைப் பின்பற்றவும்.

உங்கள் `wdio.conf.js` இன் [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) இல் இதை செயல்படுத்தலாம்:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_குறிப்பு:_ `wdio-custom-filename.json` விருப்பமானது, அளவுரு வழங்கப்படவில்லை என்றால் இயல்புநிலை மதிப்பு `wdio-merged.json` ஆகும்.

## பங்களிப்பு

இந்த ரிப்போர்ட்டரின் மூல குறியீடு [Jim Davis](https://github.com/fijijavis) ஆல் உருவாக்கப்பட்ட [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) சமூக ரிப்போர்ட்டரால் பெரிதும் ஈர்க்கப்பட்டது. திட்டத்தை பராமரிப்பதற்கான அனைத்து பணிகளுக்கும் நன்றி!

---

WebdriverIO பற்றிய கூடுதல் தகவலுக்கு [முகப்புப்பக்கத்தைப்](http://webdriver.io) பார்க்கவும்.