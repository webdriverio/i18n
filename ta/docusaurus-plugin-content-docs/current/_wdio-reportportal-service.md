---
id: wdio-reportportal-service
title: அறிக்கை போர்டல் சேவை
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பாகும், மேலும் தகவலுக்கு [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service) ஐப் பார்க்கவும்

## நிறுவல்
எளிதான வழி `wdio-reportportal-service` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பதாகும்.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
நீங்கள் இதை செய்யலாம்:

```bash
npm install wdio-reportportal-reporter --save-dev
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகள் [இங்கே](https://webdriver.io/docs/gettingstarted) காணப்படுகின்றன.

## கட்டமைப்பு
உங்கள் wdio.conf.js கோப்பில் வெளியீட்டு அடைவை கட்டமைக்கவும்:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## உரிமம்

இந்த திட்டம் MIT உரிமத்தின் கீழ் உரிமம் பெற்றுள்ளது - விவரங்களுக்கு [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) கோப்பைப் பார்க்கவும்