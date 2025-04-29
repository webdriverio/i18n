---
id: dot-reporter
title: புள்ளி அறிக்கையாளர்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> புள்ளி பாணியில் அறிக்கையிட WebdriverIO செருகுநிரல்.

![Dot Reporter](/img/dot.png "Dot Reporter")

## நிறுவல்

எளிதான வழி `@wdio/dot-reporter` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பது:

```sh
npm install @wdio/dot-reporter --save-dev
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகள் [இங்கே](/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு

பின்வரும் குறியீடு இயல்புநிலை wdio சோதனை இயக்கி கட்டமைப்பைக் காட்டுகிறது. அணியில் அறிக்கையாளராக `'dot'` ஐ சேர்க்கவும்.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

WebdriverIO பற்றிய கூடுதல் தகவலுக்கு [முகப்புப்பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.