---
id: sumologic-reporter
title: சுமோலாஜிக் ரிப்போர்டர்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> தரவு பகுப்பாய்வுக்காக சோதனை முடிவுகளை [Sumologic](https://www.sumologic.com/)-க்கு அனுப்பும் WebdriverIO ரிப்போர்டர்

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## நிறுவல்

`@wdio/sumologic-reporter`-ஐ உங்கள் `package.json`-இல் ஒரு devDependency-ஆக வைத்திருப்பதே எளிதான வழி:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

`WebdriverIO`-ஐ எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு

முதலில் நாம் உங்கள் சோதனைகளின் அனைத்து பதிவுகளையும் சேகரிக்கும் ஒரு புதிய சேகரிப்பாளரை உருவாக்க வேண்டும். அதைச் செய்ய வழிசெலுத்தல் பட்டியில் உள்ள __Manage__ என்பதைக் கிளிக் செய்து, __Collection__-க்குச் செல்லவும். அங்கே நீங்கள் "Hosted Collector" ஒன்றைச் சேர்க்க வேண்டும். ஒரு பொருத்தமான பெயரை பயன்படுத்தவும், எ.கா. "test integration logs", விளக்கம் மற்றும் ஒரு வகை, எ.கா. "wdio". சேகரிப்பாளரை உருவாக்க சேமி என்பதைக் கிளிக் செய்யவும்.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

அடுத்த படி ஒரு மூலத்தைச் சேர்ப்பதாகும். உங்கள் ஒவ்வொரு சூழலுக்கும் (எ.கா. கிளை கட்டமைப்பு, ஒருங்கிணைப்பு) ஒரு சொந்த மூலம் வைத்திருப்பது அர்த்தமுள்ளதாக இருக்கும். உங்கள் சேகரிப்பாளருக்கு அடுத்துள்ள "Add Source" இணைப்பைக் கிளிக் செய்து ஒரு __HTTP Source__ சேர்க்கவும். மீண்டும் ஒரு பொருத்தமான பெயர் மற்றும் விளக்கத்தைப் பயன்படுத்தி, சூழலைப் பிரதிபலிக்கும் "Source Category" அமைக்கவும். மற்ற விருப்பங்களை இயல்புநிலையில் விட்டுவிட்டு சேமி என்பதைக் கிளிக் செய்யவும்.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

மூல முனைப்புடன் ஒரு மோடல் தோன்றும். அந்த url-ஐ நகலெடுத்து உங்கள் wdio.conf.js இல் ஒட்டவும், இதனால் ரிப்போர்டர் தரவை எங்கே அனுப்ப வேண்டும் என்பதை அறிந்து கொள்ளும்.

பின்வரும் குறியீடு இயல்புநிலை wdio சோதனை இயக்கி கட்டமைப்பைக் காட்டுகிறது. வெறுமனே ரிப்போர்டர்களின் அணிக்கு `'sumologic'` சேர்த்து உங்கள் மூல முனைப்பைச் சேர்க்கவும்:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

ரிப்போர்டருடன் முதல் சோதனைகளை இயக்கிய பிறகு, நீங்கள் பின்வரும் வினவலுடன் சோதனை பதிவுகளைப் பார்க்க முடியும்:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

நான் விரைவில் Sumologic-க்கான சில பயனுள்ள டாஷ்போர்டு டெம்ப்ளேட்களை வழங்குவேன்.

----

WebdriverIO பற்றிய கூடுதல் தகவலுக்கு [முகப்புப்பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.