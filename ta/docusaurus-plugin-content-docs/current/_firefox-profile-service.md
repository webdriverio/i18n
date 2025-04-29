---
id: firefox-profile-service
title: Firefox Profile சேவை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

நீங்கள் உங்கள் Firefox உலாவியை ஒரு குறிப்பிட்ட நீட்டிப்புடன் இயக்க விரும்புகிறீர்களா அல்லது சில விருப்பங்களை அமைக்க வேண்டுமா? Selenium உங்கள் விரும்பிய திறன்களில் `moz:firefoxOptions.profile` பண்புக்கு `base64` சரமாக இந்த சுயவிவரத்தை அனுப்புவதன் மூலம் Firefox உலாவிக்கான சுயவிவரத்தைப் பயன்படுத்த அனுமதிக்கிறது. இது சுயவிவரத்தை உருவாக்கி அதை `base64` ஆக மாற்ற வேண்டும். [wdio testrunner](https://webdriver.io/docs/clioptions)க்கான இந்த சேவை, சுயவிவரத்தை தொகுக்கும் வேலையை உங்கள் கைகளிலிருந்து எடுத்து, `wdio.conf.js` கோப்பிலிருந்து உங்கள் விரும்பிய விருப்பங்களை வசதியாக வரையறுக்க உதவுகிறது.

அனைத்து சாத்தியமான விருப்பங்களையும் காண உங்கள் Firefox உலாவியில் [about:config](about:config) ஐத் திறக்கவும் அல்லது ஒவ்வொரு அமைப்பு பற்றிய முழு ஆவணங்களையும் காண [mozillaZine](http://kb.mozillazine.org/About:config_entries) வலைத்தளத்திற்குச் செல்லவும். அதற்கு கூடுதலாக, சோதனை தொடங்கும் முன் நிறுவப்பட வேண்டிய தொகுக்கப்பட்ட (`.xpi` போன்ற) Firefox நீட்டிப்புகளை நீங்கள் வரையறுக்கலாம்.

## நிறுவல்

எளிதான வழி `@wdio/firefox-profile-service` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பது:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு

உங்கள் சேவை பட்டியலில் `firefox-profile` சேவையைச் சேர்ப்பதன் மூலம் உங்கள் சுயவிவரத்தை அமைக்கவும். பின்னர் இதைப் போல் `firefoxProfile` பண்பில் உங்கள் அமைப்புகளை வரையறுக்கவும்:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // .xpi கோப்புக்கான பாதை
                '/path/to/extensionB' // அல்லது பிரிக்கப்படாத Firefox நீட்டிப்புக்கான பாதை
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // Firefox <= 55 க்கு மட்டுமே பயன்படுத்தவும்
        }]
    ],
    // ...
};
```

உலாவியில் நிறுவ விரும்பும் ஒரு தனிப்பயன் Firefox நீட்டிப்பை நீங்கள் உருவாக்கியிருந்தால், Firefox நீட்டிப்புகள் [Mozilla ஆல் கையொப்பமிடப்பட்டிருக்க வேண்டும்](https://wiki.mozilla.org/Add-ons/Extension_Signing) என்பதால் சுயவிவர கொடியாக `'xpinstall.signatures.required': false` அமைக்க உறுதிசெய்யவும்.

தனிப்பயன் கையொப்பமிடப்படாத நீட்டிப்புகளைப் பயன்படுத்த, வழக்கமான Firefox 48 மற்றும் புதிய பதிப்புகள் [இதை அனுமதிக்காததால்](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline) [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/) ஐயும் பயன்படுத்த வேண்டும்.

## விருப்பங்கள்

முக்கிய-மதிப்பு ஜோடியாக அனைத்து அமைப்புகளையும் கொண்டுள்ளது. `about:config` பக்கத்தில் கிடைக்கக்கூடிய அனைத்து அமைப்புகளையும் நீங்கள் காணலாம்.

### extensions

உலாவி அமர்வுக்கு ஒன்று அல்லது பல நீட்டிப்புகளைச் சேர்க்கவும். அனைத்து உள்ளீடுகளும் `.xpi` கோப்புக்கான முழு பாதையாகவோ அல்லது பிரிக்கப்படாத Firefox நீட்டிப்பு அடைவுக்கான பாதையாகவோ இருக்கலாம்.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### profileDirectory

ஏற்கனவே உள்ள ஒன்றின் அடிப்படையில் Firefox சுயவிவரத்தை உருவாக்க அந்த சுயவிவரத்திற்கான முழு பாதையை அமைப்பதன் மூலம்.

வகை: `String`<br />
இயல்புநிலை: `null`

### proxy

நெட்வொர்க் ப்ராக்ஸி அமைப்புகளை அமைக்கவும். `proxy` அளவுரு ஒரு ஹாஷ் ஆகும், அதன் அமைப்பு கட்டாயமான `proxyType` விசையின் மதிப்பைப் பொறுத்தது, இது பின்வரும் string மதிப்புகளில் ஒன்றை எடுக்கிறது:

 * `direct` - நேரடி இணைப்பு (ப்ராக்ஸி இல்லை)
 * `system` - இயக்க முறைமை ப்ராக்ஸி அமைப்புகளைப் பயன்படுத்தவும்
 * `pac` - `autoconfigUrl` விசையின் மதிப்பின் அடிப்படையில் அமைக்கப்பட்ட தானியங்கி ப்ராக்ஸி கட்டமைப்பைப் பயன்படுத்தவும்
 * `manual` - பின்வரும் விசைகளிலிருந்து மதிப்புகளைப் பயன்படுத்தி வெவ்வேறு நெறிமுறைகளுக்கு தனித்தனியாக வரையறுக்கப்பட்ட கைமுறை ப்ராக்ஸி அமைப்புகள்: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

வகை: `Object`<br />
இயல்புநிலை: `null`<br />
எடுத்துக்காட்டு:

- தானியங்கி ப்ராக்ஸி:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- கைமுறை HTTP ப்ராக்ஸி:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- கைமுறை HTTP மற்றும் HTTPS ப்ராக்ஸி:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

Firefox v55 அல்லது குறைவான பதிப்பை நீங்கள் பயன்படுத்தினால் இந்த கொடியை `true` என அமைக்கவும்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

----

WebdriverIO பற்றிய கூடுதல் தகவல்களுக்கு [முகப்புப்பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.