---
id: wdio-lambdatest-service
title: லாம்டாடெஸ்ட் சேவை
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service is a 3rd party package, for more information please see [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> லாம்டாடெஸ்ட் பயனர்களுக்கான டன்னல் மற்றும் வேலை மெட்டாடேட்டாவை நிர்வகிக்கும் ஒரு WebdriverIO சேவை.

## நிறுவல்

```bash
npm i wdio-lambdatest-service --save-dev
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted.html) காணலாம்.


## கட்டமைப்பு

WebdriverIO-க்கு லாம்டாடெஸ்ட் ஆதரவு உள்ளிணைந்ததாக உள்ளது. நீங்கள் உங்கள் `wdio.conf.js` கோப்பில் `user` மற்றும் `key` அமைக்க வேண்டும். பயன்பாட்டு தானியங்கிக்கான அம்சத்தை இயக்க, உங்கள் `wdio.conf.js` கோப்பில் `product: 'appAutomation'` என அமைக்கவும். இந்த சேவை செருகுநிரல் [லாம்டாடெஸ்ட் டன்னல்](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/) ஆதரவை வழங்குகிறது. இந்த அம்சத்தை செயல்படுத்த `tunnel: true` எனவும் அமைக்கவும்.

```js
// wdio.conf.js
exports.config = {
    // ...
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    logFile : './logDir/api.log',
    product : 'appAutomation',
    services: [
        ['lambdatest', {
            tunnel: true
        }]
    ],
    // ...
};
```

### தானியங்கி டாஷ்போர்டில் சோதனை பிழை குறிப்புகளைப் பெற
தானியங்கி டாஷ்போர்டில் சோதனை பிழை குறிப்புகளைப் பெற, உங்கள் `wdio.conf.js`-இல் `ltErrorRemark: true` என சேர்க்கவும்.


### உள்ளூரிலிருந்து அல்லது URL-இலிருந்து பயன்பாட்டைப் பதிவேற்ற
உங்கள் `wdio.conf.js`-இல் தேவையான கட்டமைப்பை சேர்ப்பதன் மூலம் உள்ளூர் அல்லது ஹோஸ்ட் செய்யப்பட்ட பயன்பாட்டு URL-இலிருந்து `android` அல்லது `ios` பயன்பாடுகளைப் பதிவேற்றவும். அதே ஓட்டத்தில் சோதனைக்காக பதிவேற்றப்பட்ட பயன்பாட்டைப் பயன்படுத்த `enableCapability = true` என அமைக்கவும், இது திறன்களில் பயன்பாட்டு URL மதிப்பை அமைக்கும்.

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //provide your desired app name
            app_path : "/path/to/your/app/file", //provide the local app location
            // or
            app_url : "https://example.test_android.apk", //provide the url where your app is horsted or stored
            custom_id : "12345", //provide your desired custom id
            enableCapability : true
        }
    }
    ]
]
```

## விருப்பங்கள்

லாம்டாடெஸ்ட் சேவையில் அங்கீகாரம் பெற உங்கள் கட்டமைப்பில் [`user`](https://webdriver.io/docs/options.html#user) மற்றும் [`key`](https://webdriver.io/docs/options.html#key) விருப்பங்கள் இருக்க வேண்டும்.

### tunnel
லாம்டாடெஸ்ட் கிளவுடிலிருந்து உங்கள் கணினி வழியாக இணைப்புகளை ரூட் செய்ய இதை true என அமைக்கவும். உலாவி திறன்களில் `tunnel` என்பதை true என்றும் அமைக்க வேண்டும்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### lambdatestOpts
குறிப்பிடப்பட்ட விருப்பத்தேர்வுகள் லாம்டாடெஸ்ட் டன்னலுக்கு அனுப்பப்படும்.

வகை: `Object`<br />
இயல்புநிலை: `{}`

கீழே கிடைக்கக்கூடிய அனைத்து விருப்பங்களின் விரிவான பட்டியல் உள்ளது:

#### tunnelName
பயன்படுத்த தனிப்பயன் லாம்டாடெஸ்ட் டன்னல் பெயரைக் குறிப்பிடுகிறது.

**உதாரணம்:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
லாம்டாடெஸ்ட் டன்னல் செயல்படுத்த வேண்டிய போர்ட்.

**உதாரணம்:**
```json
{"port": 33000}
```
#### user
லாம்டாடெஸ்ட் பயனர்பெயர்.

**உதாரணம்:**
```json
{"user": "your_username"}
```

#### key
லாம்டாடெஸ்ட் அணுகல் விசை.

**உதாரணம்:**
```json
{"key": "your_access_key"}
```

#### verbose
ஒவ்வொரு ப்ராக்ஸி கோரிக்கையும் stdout-க்கு பதிவு செய்யப்பட வேண்டுமா.

**உதாரணம்:**
```json
{"verbose": true}
```

#### logFile
லாம்டாடெஸ்ட் டன்னல் பதிவுக் கோப்பின் இருப்பிடம்.

**உதாரணம்:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

பயன்படுத்த கட்டமைப்புக் கோப்பின் பாதை.
**உதாரணம்:**
```json
{"config": "/path/to/config/file"}
```

#### dir
டன்னல் போர்ட்டில் கோப்பு சேவையகத்தால் வழங்கப்படும் உள்ளூர் கோப்பகத்தைக் குறிப்பிடவும்.

**உதாரணம்:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
டன்னல் ப்ராக்ஸி போர்ட் ஹோஸ்ட்நேம் குறிப்பிடுகிறது.

**உதாரணம்:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
டன்னல் ப்ராக்ஸி போர்ட் பயனர்பெயரைக் குறிப்பிடுகிறது.

**உதாரணம்:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
டன்னல் ப்ராக்ஸி போர்ட் கடவுச்சொல்லைக் குறிப்பிடுகிறது.

**உதாரணம்:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
டன்னல் ப்ராக்ஸி செயல்படுத்த வேண்டிய போர்ட் எண்ணைக் குறிப்பிடுகிறது.

**உதாரணம்:**
```json
{"proxyPort": 8080}
```

#### egressOnly
வெளிச்செல்லும் கோரிக்கைகளுக்கு மட்டுமே ப்ராக்ஸி அமைப்புகளைப் பயன்படுத்துகிறது.

**உதாரணம்:**
```json
{"egressOnly": true}
```


#### ingressOnly
உள்வரும் போக்குவரத்து மட்டுமே குறிப்பிடப்பட்ட ப்ராக்ஸி வழியாக செல்கிறது.

**உதாரணம்:**
```json
{"ingressOnly": true}
```


#### pacfile
உள்ளூர் சோதனையில் PAC (ப்ராக்ஸி ஆட்டோ-கான்ஃபிகரேஷன்) பயன்படுத்த,
PAC கோப்பின் பாதையை வழங்கவும்.

**உதாரணம்:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
லாம்டாடெஸ்ட் டன்னலுக்கான [லோட் பேலன்சிங்](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/)ஐ செயல்படுத்துகிறது.

**உதாரணம்:**
```json
{"loadBalanced": true}
```

#### mode
டன்னல் எந்த முறையில் இயங்க வேண்டும் "ssh" அல்லது "ws" என குறிப்பிடுகிறது. (இயல்புநிலை "ssh").

**உதாரணம்:**
```json
{"mode": "ssh"}
```

#### sshConnType
ssh இணைப்பின் வகையைக் குறிப்பிடவும் (over_22, over_443, over_ws). –sshConnType பயன்படுத்த, முதலில் ––mode ssh கொடியைக் குறிப்பிடவும்.

**உதாரணம்:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
டன்னல் கிளையன்டிலிருந்து டன்னல் சர்வருக்கு SSH இணைப்பை அதிகரிக்கவும். அனுமதிக்கப்பட்ட அதிகபட்ச மதிப்பு 30.

**உதாரணம்:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
குழு உறுப்பினர்களிடையே டன்னலை பகிர்வது.

**உதாரணம்:**
```json
{"sharedTunnel": true}
```

#### env
லாம்டாடெஸ்ட் டன்னல் இயங்கும் சூழல்.

**உதாரணம்:**
```json
{"env": "production"}
```


#### infoAPIPort
குறிப்பிட்ட போர்ட்டில் [டன்னல் தகவல் API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) வெளிப்படுத்துகிறது.

**உதாரணம்:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
டன்னல் நிலைக்கான கால்பேக் URL.

**உதாரணம்:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
டன்னல் வழியாக வழிசெலுத்த காற்புள்ளியால் பிரிக்கப்பட்ட ஹோஸ்ட்களின் பட்டியல். மற்ற எல்லாம் இன்டர்நெட் வழியாக வழிசெலுத்தப்படும்.

**உதாரணம்:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
டன்னலிலிருந்து தவிர்க்க காற்புள்ளியால் பிரிக்கப்பட்ட ஹோஸ்ட்களின் பட்டியல். இவை இன்டர்நெட் வழியாக வழிசெலுத்தப்படும்.

**உதாரணம்:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
mTLS கிளையன்ட் சான்றிதழ் கோப்புப்பாதை.

**உதாரணம்:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
mTLS கிளையன்ட் விசை கோப்புப்பாதை.

**உதாரணம்:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
காற்புள்ளியால் பிரிக்கப்பட்ட mTLS ஹோஸ்ட்களின் பட்டியல்.

**உதாரணம்:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
காற்புள்ளியால் பிரிக்கப்பட்ட DNS சேவையகங்களின் பட்டியல்.

**உதாரணம்:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
லாம்டாடெஸ்ட் டன்னலுக்கான [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) முறையை இயக்கவும்.

**உதாரணம்:**
```json
{"mitm": true}
```

#### ntlm
தொடர்பு அல்லது போக்குவரத்து நோக்கங்களுக்காக மைக்ரோசாஃப்ட் NTLM (விண்டோஸ் NT LAN மேனேஜர்) அங்கீகாரத்தைப் பயன்படுத்த.

**உதாரணம்:**
```json
{"ntlm": true}
```

#### pidfile
செயல்முறை ஐடி எழுதப்படும் pidfile இன் பாதை.

**உதாரணம்:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
தொலைதூர முகவரியை கிளையன்ட் கணினியின் உள் IP ஆக அமைக்கிறது.

**உதாரணம்:**
```json
{"usePrivateIp": true}
```

இந்த விருப்பங்களைப் பற்றி மேலும் அறிய [இங்கே](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/) காணலாம்.

### preferScenarioName
குக்கம்பர் மட்டும். ஒரே சூழ்நிலை மட்டுமே இயங்கினால் அமர்வின் பெயரை சூழ்நிலை பெயருக்கு அமைக்கவும்.
[wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution) உடன் இணையாக இயங்கும்போது பயனுள்ளதாக இருக்கும்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### sessionNameFormat
அமர்வு பெயர் வடிவமைப்பை தனிப்பயனாக்கவும்.

வகை: `Function`<br />
இயல்புநிலை (குக்கம்பர்/ஜாஸ்மின்): `(config, capabilities, suiteTitle) => suiteTitle`<br />
இயல்புநிலை (மோகா): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
மோகா மட்டும். அமர்வு பெயருடன் சோதனை தலைப்பைச் சேர்க்க வேண்டாம்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### sessionNamePrependTopLevelSuiteTitle
மோகா மட்டும். அமர்வின் பெயருக்கு முன் உயர்நிலை தொகுப்பின் தலைப்பைச் சேர்க்கவும்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### setSessionName
அமர்வு பெயரை தானாகவே அமைக்கவும்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### setSessionStatus
அமர்வு நிலையை (தேர்ச்சி/தோல்வி) தானாகவே அமைக்கவும்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`


### ignoreTestCountInName
பெயரில் சோதனை மறுமுயற்சிகளின் எண்ணிக்கையைப் புறக்கணிக்கவும்

வகை: `Boolean`<br />
இயல்புநிலை: `false`


### useScenarioName
குக்கம்பர் குறிப்பிட்ட சோதனைகளுக்கான சூழ்நிலை பெயர்களாக சோதனை பெயர்களைப் பெற, உங்கள் `wdio.conf.js`-இல் `useScenarioName: true` என சேர்க்கவும்.

## தொகுக்க மற்றும் வெளியிட படிகள்
1. இந்த களஞ்சியத்தை கிளோன் செய்யவும்.
2. "npm install" ஐ இயக்கவும்
3. "npm run build" ஐ இயக்கவும்
4. வெளியிடுவதற்கான படிகள்: "npm login" ஐ இயக்கவும்
5. "npm publish --access public" ஐ இயக்கவும்

----

WebdriverIO பற்றிய மேலும் தகவலுக்கு [முகப்புப்பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.