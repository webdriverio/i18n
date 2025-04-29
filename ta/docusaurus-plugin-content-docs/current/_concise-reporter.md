---
id: concise-reporter
title: சுருக்கமான ரிப்போர்ட்டர்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> சுருக்கமான பாணியில் அறிக்கை செய்ய ஒரு WebdriverIO செருகுநிரல்.

## நிறுவல்

எளிதான வழி `@wdio/concise-reporter` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பது, இதன் மூலம்:

```sh
npm install @wdio/concise-reporter --save-dev
```

`WebdriverIO` ஐ எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகள் [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு

பின்வரும் குறியீடு இயல்புநிலை wdio சோதனை இயக்கி கட்டமைப்பைக் காட்டுகிறது. வெறுமனே `'concise'` ஐ ஒரு ரிப்போர்ட்டராக அணிக்கு சேர்க்கவும்.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```