---
id: spec-reporter
title: குறிப்பிட்ட அறிக்கையாளர்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> குறிப்பிட்ட பாணியில் அறிக்கையிட WebdriverIO செருகுநிரல்.

![Spec Reporter](/img/spec.png "Spec Reporter")

## நிறுவல்

எளிதான வழி `@wdio/spec-reporter` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பதுதான்:

```sh
npm install @wdio/spec-reporter --save-dev
```

`WebdriverIO` ஐ எப்படி நிறுவுவது என்பது பற்றிய விவரங்கள் [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு

பின்வரும் குறியீடு இயல்புநிலை wdio சோதனை இயக்கி கட்டமைப்பைக் காட்டுகிறது. வெறுமனே `'spec'` ஐ அறிக்கையாளராக வரிசைக்கு சேர்க்கவும்.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## குறிப்பிட்ட அறிக்கையாளர் விருப்பங்கள்
### குறியீடுகள்
`தேர்ச்சி`, `தோல்வி` மற்றும் அல்லது `தவிர்க்கப்பட்ட` சோதனைகளுக்கு தனிப்பயன் குறியீடுகளை வழங்கவும்

வகை: `object`
இயல்புநிலை: `{passed: '✓', skipped: '-', failed: '✖'}`

#### எடுத்துக்காட்டு
```js
[
  "spec",
  {
    symbols: {
      passed: '[PASS]',
      failed: '[FAIL]',
    },
  },
]
```

### sauceLabsSharableLinks
இயல்பாக, Sauce Labs இல் உள்ள சோதனை முடிவுகளை அதே குழுவைச் சேர்ந்த குழு உறுப்பினரால் மட்டுமே பார்க்க முடியும், வேறு குழுவைச் சேர்ந்த குழு உறுப்பினரால் பார்க்க முடியாது. இந்த விருப்பங்கள் [பகிரக்கூடிய இணைப்புகளை](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links) இயல்பாகவே இயக்கும், அதாவது Sauce Labs இல் இயக்கப்படும் அனைத்து சோதனைகளையும் அனைவரும் பார்க்கலாம். இந்த அம்சத்தை முடக்க, கீழே காட்டப்பட்டுள்ளபடி, அறிக்கையாளர் விருப்பங்களில் `sauceLabsSharableLinks: false` ஐச் சேர்க்கவும்.

வகை: `boolean`
இயல்புநிலை: `true`

#### எடுத்துக்காட்டு
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
தோல்வியடைந்த குறிப்பு முடிவுகளை மட்டும் அச்சிடுக.

வகை: `boolean`
இயல்புநிலை: `false`

#### எடுத்துக்காட்டு
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
இறுதி அறிக்கையில் படிகளிலிருந்து கன்சோல் பதிவுகளைக் காட்ட `true` என அமைக்கவும்

வகை: `boolean`
இயல்புநிலை: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
இயக்கத்தின் முடிவில் மட்டுமல்லாமல் உண்மை நேரத்தில் சோதனை நிலையைக் காட்ட `true` என அமைக்கவும்

வகை: `boolean`
இயல்புநிலை: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
அறிக்கைகளில் `[ MutliRemoteBrowser ... ]` முன்னுரையை முடக்க `false` என அமைக்கவும்.

வகை: `boolean`
இயல்புநிலை: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

அதை `false` என அமைத்தால் நீங்கள் வெளியீட்டைப் பின்வருமாறு காண்பீர்கள்:
```
Running: loremipsum (v50) on Windows 10
Session ID: foobar

» /foo/bar/loo.e2e.js
Foo test
   green ✓ foo
   green ✓ bar

» /bar/foo/loo.e2e.js
Bar test
   green ✓ some test
   red ✖ a failed test
   red ✖ a failed test with no stack
```

மற்றும் `true` (இயல்புநிலை) உடன் ஒவ்வொரு வரியும் முன்னுரையுடன் முன்னொட்டாக இருக்கும்:
```
[loremipsum 50 Windows 10 #0-0] Running: loremipsum (v50) on Windows 10
[loremipsum 50 Windows 10 #0-0] Session ID: foobar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /foo/bar/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Foo test
[loremipsum 50 Windows 10 #0-0]    green ✓ foo
[loremipsum 50 Windows 10 #0-0]    green ✓ bar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /bar/foo/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Bar test
[loremipsum 50 Windows 10 #0-0]    green ✓ some test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test with no stack
[loremipsum 50 Windows 10 #0-0]
```

### color
டெர்மினலில் வண்ண வெளியீட்டைக் காட்ட `true` என அமைக்கவும்

வகை: `boolean`
இயல்புநிலை: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## சூழல் விருப்பங்கள்

சூழல் மாறிகள் மூலம் அமைக்கக்கூடிய சில விருப்பங்கள் உள்ளன:

### `FORCE_COLOR`

உண்மை என அமைக்கப்பட்டால், எ.கா. `FORCE_COLOR=0 npx wdio run wdio.conf.js` வழியாக, அனைத்து டெர்மினல் வண்ணமும் முடக்கப்படும்.