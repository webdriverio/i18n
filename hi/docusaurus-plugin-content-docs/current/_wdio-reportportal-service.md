---
id: wdio-reportportal-service
title: रिपोर्ट पोर्टल सेवा
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## इंस्टालेशन
सबसे आसान तरीका है `wdio-reportportal-service` को अपने `package.json` में devDependency के रूप में रखना।
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
आप इसे इस प्रकार कर सकते हैं:

```bash
npm install wdio-reportportal-reporter --save-dev
```

`WebdriverIO` को इंस्टॉल करने के निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## कॉन्फिगरेशन
अपनी wdio.conf.js फाइल में आउटपुट डायरेक्टरी को कॉन्फिगर करें:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## लाइसेंस

यह प्रोजेक्ट MIT लाइसेंस के अंतर्गत लाइसेंस प्राप्त है - विवरण के लिए [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) फाइल देखें