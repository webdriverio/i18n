---
id: wdio-video-reporter
title: வீடியோ ரிப்போர்ட்டர்
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

இது [Webdriver IO v6 and highr](https://webdriver.io/) க்கான ஒரு ரிப்போர்ட்டர் ஆகும், இது உங்கள் wdio சோதனை செயலாக்கங்களின் வீடியோக்களை உருவாக்குகிறது. நீங்கள் allure பயன்படுத்தினால், சோதனை வழக்குகள் தானாகவே வீடியோக்களுடன் அலங்கரிக்கப்படும். (Webdriver IO v5 க்கு, தயவுசெய்து wdio-video-reporter பதிப்பு ^2.0.0 ஐப் பயன்படுத்தவும்.)

வீடியோக்கள் `wdio.config.outputDir` இல் முடிகின்றன

தோல்வியடைந்த சோதனைகளில் சேர்க்கப்பட்ட வீடியோக்களுடன் எடுத்துக்காட்டு Allure அறிக்கையை இங்கே காணலாம்:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

நன்மைகள்:
- உங்கள் allure அறிக்கைகளில் அருமையான வீடியோக்கள்
- சோதனைகள் வேகமாக இருந்தாலும், அருமையான மனித வேகத்தில் வீடியோக்கள்
- Selenium கிரிட் உடன் வேலை செய்கிறது
- `saveScreenshot` ஐ ஆதரிக்கும் அனைத்து webdrivers உடனும் வேலை செய்கிறது
- Selenium 3.141.59 ஐப் பயன்படுத்தி பின்வரும் டெஸ்க்டாப் உலாவிகளில் சரிபார்க்கப்பட்டது:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3 உடன் பின்வரும் ios மற்றும் android சாதனங்களில் சரிபார்க்கப்பட்டது:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

தீமைகள்:
- "செயல்களுக்குப்" பிறகு திரைப்பிடிப்புகளை எடுப்பதன் மூலம் இது வேலை செய்கிறது, இது சோதனைகளை சற்று மெதுவாக்குகிறது. எந்த [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) செய்திகள் திரைப்பிடிப்பில் முடிவடைய வேண்டும் என்பதைக் கவனமாகத் தேர்ந்தெடுப்பதன் மூலம் இது தணிக்கப்படுகிறது
- Selenium இயக்கிகள் திரைப்பிடிப்புகளில் விழிப்பூட்டல் பெட்டிகள் மற்றும் பாப்அப்களைச் சேர்க்காததால், அவை வீடியோக்களில் காணப்படுவதில்லை


விரைவான தொடக்கம்
===========

விரைவாகப் புரிந்துகொள்ள [wdio-template](https://github.com/presidenten/wdio-template) இல் எளிய டெம்ப்ளேட்டைப் பாருங்கள்.

களஞ்சியங்களில் ஒன்றை clone செய்து `yarn` அல்லது `npm install` உடன் சார்புகளை நிறுவவும். பின்னர் டெமோ டைரக்டரியில் `yarn e2e` அல்லது `npm run e2e` ஐ இயக்கவும், இறுதியாக `yarn report` அல்லது `npm run report` ஐ இயக்கி allure அறிக்கையைப் பார்க்கவும்.


நிறுவல்
============

ரிப்போர்ட்டரை நிறுவவும்
--------------------

`yarn add wdio-video-reporter`
அல்லது
`npm install wdio-video-reporter`


கான்ஃபிக்கில் ரிப்போர்ட்டரைச் சேர்க்கவும்
--------------------------

`wdio.conf.js`-கோப்பின் மேல் பகுதியில், லைப்ரரியை require செய்யுங்கள்:
```
const video = require('wdio-video-reporter');
```

பின்னர் reporters பண்பில் கட்டமைப்பில் வீடியோ ரிப்போர்ட்டரைச் சேர்க்கவும்:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
  ],
```


Allure உடன் பயன்படுத்துதல்
-----------------

Allure ரிப்போர்ட்டரையும் சேர்ப்பது, எந்த கட்டமைப்பும் இல்லாமல் தானாகவே அறிக்கைகளை வீடியோக்களுடன் புதுப்பிக்கிறது :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


கட்டமைப்பு
=============

சாதாரண கட்டமைப்பு அளவுருக்கள்
-------------------------------

பெரும்பாலான பயனர்கள் இவற்றை அமைக்க விரும்பலாம்

- `saveAllVideos` தேர்ச்சி பெற்ற சோதனைகளுக்கான வீடியோக்களைச் சேமிக்க true என அமைக்கவும். `Default: false`
- `videoSlowdownMultiplier` [1-100] க்கு இடையில் முழு எண். வீடியோக்கள் மிக விரைவாக இயங்கினால் அதிகரிக்கவும். `Default: 3`
- `videoRenderTimeout` வீடியோ ரெண்டர் செய்ய காத்திருக்க அதிகபட்ச நொடிகள். `Default: 5`
- `outputDir` அமைக்கப்படவில்லை எனில், wdio.config.outputDir ஐப் பயன்படுத்துகிறது. `Default: undefined`
- `outputDir` அமைக்கப்படவில்லை எனில், wdio.config.outputDir ஐப் பயன்படுத்துகிறது. `Default: undefined`
- `maxTestNameCharacters` சோதனை பெயரின் அதிகபட்ச நீளம். `Default: 250`

மேம்பட்ட கட்டமைப்பு அளவுருக்கள்
---------------------------------

என்ஜின் எப்போது திரைப்பிடிப்பு எடுக்கிறது என்பதை மாற்ற விரும்பும் மேம்பட்ட பயனர்கள் இவற்றைத் திருத்தலாம். இந்த அரேக்களில் [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) செய்தியின் கடைசி வார்த்தையைக் கொண்டு நிரப்பலாம், அதாவது /session/:sessionId/`buttondown`.

- `addExcludedActions` திரைப்பிடிப்புகள் தேவையற்ற செயல்களைச் சேர்க்கவும். `Default: []`
- `addJsonWireActions` திரைப்பிடிப்புகள் காணாமல் போன செயல்களைச் சேர்க்கவும். `Default: []`
- `recordAllActions` வடிகட்டுதலைத் தவிர்த்து எல்லாவற்றையும் திரைப்பிடிப்பு செய்யவும். (பரிந்துரைக்கப்படவில்லை) `Default: false`

செயலாக்கப்பட்ட செய்திகளைப் பார்க்க, `wdio.config.logLevel: 'debug'` என அமைத்து `outputDir/wdio-X-Y-Video-reporter.log` ஐச் சரிபார்க்கவும். இது மதிப்பாய்வுக்காக திரைப்பிடிப்புகள் வெளியீட்டு அடைவையும் அப்படியே விட்டுவிடும்

கூடுதல் பதிவுகளைத் தவிர்த்து வீடியோ கோப்புகளை மட்டும் பெற, `wdio.config.logLevel: 'silent'` என அமைக்கவும்.

Cucumber ஆதரவு
----------------

நீங்கள் Allure ரிப்போர்ட்டரைப் பயன்படுத்தினால், பின்வருவனவற்றை உறுதிசெய்ய வேண்டும்:

- உள்ளமைக்கப்பட்ட node உறுதிப்படுத்தல்களுக்குப் பதிலாக `chai` ஐப் பயன்படுத்தவும், இல்லையெனில் தோல்வியடைந்த சோதனைகள் உங்கள் படிகள் வரையறைகளில் உடைந்ததாக அறிக்கையிடப்படும்
- `wdio.conf.js` கோப்பில் Allure விருப்பத்திற்கு `useCucumberStepReporter: true` ஐச் சேர்க்கவும், ஒரு வழக்கமான கட்டமைப்பு இப்படி இருக்கும்:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
முழுமையான எடுத்துக்காட்டுக்கு, [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber) இல் cucumber கிளையைப் பாருங்கள்


Appium அமைப்பு
------------

`wdio-video-reporter` v1.2.4 முதல், டெஸ்க்டாப் மற்றும் சாதனங்களில் safari மற்றும் chrome உலாவிகளை Allure வேறுபடுத்தி அறிய உதவும் ஆதரவு உள்ளது.
ரிப்போர்ட்டர் வெவ்வேறு சாதனங்களை அடையாளம் காண `deviceType` என்ற தனிப்பயன் பண்பைப் பயன்படுத்துகிறது.
பரிந்துரைக்கப்பட்ட மதிப்புகள் `phone` மற்றும் `tablet`.
டெஸ்க்டாப் Chrome உலாவிகளுடன் ஒரே Selenium கிரிட்டில் சாதனங்களைப் பயன்படுத்தும்போது Chrome webdriver இல் பிழையைத் தவிர்க்க _அனைத்து_ உலாவிகளுக்கும் `browserVersion` ஐச் சேர்க்க பரிந்துரைக்கப்படுகிறது.

உருவாக்கப்பட்ட வீடியோ கோப்புகளும் உலாவியின் பெயருடன் `deviceType` ஐச் சேர்க்கும்.

appium கட்டமைப்பு எடுத்துக்காட்டு:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

மற்றும் `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


பங்களிப்பு
============

Fork செய்து, மாற்றங்களைச் செய்து, சில சோதனைகளை எழுதி, லின்ட் செய்து, சோதனைகளை இயக்கி, உருவாக்கி, மாற்றங்கள் செயல்படும் விதத்தை டெமோவில் சரிபார்த்து, பின்னர் PR செய்யவும்.

டெமோ ஃபோல்டர் நூலகத்தின் உருவாக்கப்பட்ட பதிப்புடன் வேலை செய்கிறது, எனவே நீங்கள் புதிய அம்சங்களைச் சேர்த்து அவற்றை முயற்சிக்க விரும்பினால் கட்டாயம் உருவாக்கவும்.


நன்றி
======

Cucumber ஆதரவை சரிசெய்ததற்கு [Johnson E](https://github.com/jonn-set) க்கு நன்றி, இதை பல பயனர்கள் கேட்டுள்ளனர்.