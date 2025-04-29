---
id: wdio-lambdatest-service
title: लैम्बडाटेस्ट सर्विस
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> एक WebdriverIO सेवा जो LambdaTest उपयोगकर्ताओं के लिए टनल और जॉब मेटाडेटा का प्रबंधन करती है।

## इंस्टालेशन

```bash
npm i wdio-lambdatest-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करना है, इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted.html) पाए जा सकते हैं।


## कॉन्फिगरेशन

WebdriverIO में LambdaTest समर्थन पहले से ही शामिल है। आपको बस अपनी `wdio.conf.js` फ़ाइल में `user` और `key` सेट करनी चाहिए। ऐप ऑटोमेशन के लिए इस सुविधा को सक्षम करने के लिए, अपनी `wdio.conf.js` फ़ाइल में `product: 'appAutomation'` सेट करें। यह सेवा प्लगइन [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/) के लिए समर्थन प्रदान करता है। इस सुविधा को सक्रिय करने के लिए `tunnel: true` भी सेट करें।

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

### ऑटोमेशन डैशबोर्ड पर टेस्ट एरर टिप्पणियां प्राप्त करने के लिए
ऑटोमेशन डैशबोर्ड पर टेस्ट एरर टिप्पणियां प्राप्त करने के लिए, बस अपने `wdio.conf.js` में `ltErrorRemark: true` जोड़ें।


### स्थानीय या URL से ऐप अपलोड करने के लिए
अपने `wdio.conf.js` में आवश्यक कॉन्फ़िगरेशन जोड़कर स्थानीय या होस्टेड ऐप URL से `android` या `ios` ऐप्स अपलोड करें। एक ही रन में टेस्टिंग के लिए अपलोड किए गए ऐप का उपयोग करने के लिए `enableCapability = true` सेट करें, यह capabilities में ऐप URL मान सेट करेगा।

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

## विकल्प

LambdaTest सेवा के लिए प्रमाणित करने के लिए आपके कॉन्फिग में [`user`](https://webdriver.io/docs/options.html#user) और [`key`](https://webdriver.io/docs/options.html#key) विकल्प होने चाहिए।

### tunnel
LambdaTest क्लाउड से कनेक्शन को आपके कंप्यूटर के माध्यम से रूट करने के लिए इसे true पर सेट करें। आपको ब्राउज़र capabilities में भी `tunnel` को true पर सेट करना होगा।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### lambdatestOpts
निर्दिष्ट वैकल्पिक LambdaTest Tunnel को पास कर दिया जाएगा।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `{}`

नीचे सभी उपलब्ध विकल्पों की व्यापक सूची दी गई है:

#### tunnelName
उपयोग किए जाने वाले कस्टम LambdaTest Tunnel नाम को निर्दिष्ट करता है।

**उदाहरण:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
LambdaTest Tunnel को सक्रिय करने के लिए पोर्ट।

**उदाहरण:**
```json
{"port": 33000}
```
#### user
LambdaTest उपयोगकर्ता नाम।

**उदाहरण:**
```json
{"user": "your_username"}
```

#### key
LambdaTest एक्सेस की।

**उदाहरण:**
```json
{"key": "your_access_key"}
```

#### verbose
क्या हर प्रॉक्सी अनुरोध को stdout पर लॉग किया जाना चाहिए।

**उदाहरण:**
```json
{"verbose": true}
```

#### logFile
LambdaTest Tunnel लॉग फ़ाइल का स्थान।

**उदाहरण:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

उपयोग करने के लिए कॉन्फिग फ़ाइल का पथ।
**उदाहरण:**
```json
{"config": "/path/to/config/file"}
```

#### dir
स्थानीय डायरेक्टरी निर्दिष्ट करें जो Tunnel पोर्ट पर फ़ाइल सर्वर द्वारा सेवित की जाएगी।

**उदाहरण:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
Tunnel प्रॉक्सी पोर्ट होस्टनाम निर्दिष्ट करता है।

**उदाहरण:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
Tunnel प्रॉक्सी पोर्ट उपयोगकर्ता नाम निर्दिष्ट करता है।

**उदाहरण:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
Tunnel प्रॉक्सी पोर्ट पासवर्ड निर्दिष्ट करता है।

**उदाहरण:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
पोर्ट संख्या निर्दिष्ट करता है जहां Tunnel प्रॉक्सी सक्रिय होगा।

**उदाहरण:**
```json
{"proxyPort": 8080}
```

#### egressOnly
केवल आउटबाउंड अनुरोधों के लिए प्रॉक्सी सेटिंग्स का उपयोग करता है।

**उदाहरण:**
```json
{"egressOnly": true}
```


#### ingressOnly
केवल इनकमिंग ट्रैफिक को निर्दिष्ट प्रॉक्सी के माध्यम से रूट करता है।

**उदाहरण:**
```json
{"ingressOnly": true}
```


#### pacfile
स्थानीय परीक्षण में PAC (प्रॉक्सी ऑटो-कॉन्फिगरेशन) का उपयोग करने के लिए,
PAC फ़ाइल का पथ प्रदान करें।

**उदाहरण:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
LambdaTest Tunnel के लिए [लोड बैलेंसिंग](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) सक्रिय करता है।

**उदाहरण:**
```json
{"loadBalanced": true}
```

#### mode
निर्दिष्ट करता है कि टनल किस मोड में चलना चाहिए "ssh" या "ws"। (डिफ़ॉल्ट "ssh")।

**उदाहरण:**
```json
{"mode": "ssh"}
```

#### sshConnType
ssh कनेक्शन का प्रकार निर्दिष्ट करें (over_22, over_443, over_ws)। –sshConnType का उपयोग करने के लिए, पहले ––mode ssh फ्लैग निर्दिष्ट करें।

**उदाहरण:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
Tunnel Client से Tunnel Server तक SSH कनेक्शन बढ़ाएं। अधिकतम अनुमत मान 30 है।

**उदाहरण:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
टीम सदस्यों के बीच Tunnel साझा करना।

**उदाहरण:**
```json
{"sharedTunnel": true}
```

#### env
वह पर्यावरण जिस पर LambdaTest Tunnel चलेगा।

**उदाहरण:**
```json
{"env": "production"}
```


#### infoAPIPort
निर्दिष्ट पोर्ट पर [Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) को एक्सपोज़ करता है।

**उदाहरण:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
टनल स्थिति के लिए कॉलबैक URL।

**उदाहरण:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
टनल के माध्यम से रूट करने के लिए होस्ट्स की अल्पविराम से अलग की गई सूची। बाकी सब इंटरनेट के माध्यम से रूट किया जाएगा।

**उदाहरण:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
टनल से बायपास करने के लिए होस्ट्स की अल्पविराम से अलग की गई सूची। ये इंटरनेट के माध्यम से रूट किए जाएंगे।

**उदाहरण:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
mTLS क्लाइंट सर्टिफिकेट फाइलपथ।

**उदाहरण:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
mTLS क्लाइंट की फाइलपथ।

**उदाहरण:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
mTLS होस्ट्स की अल्पविराम से अलग की गई सूची।

**उदाहरण:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
DNS सर्वरों की अल्पविराम से अलग की गई सूची।

**उदाहरण:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
LambdaTest Tunnel के लिए [MITM (मैन-इन-द-मिडिल)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) मोड सक्षम करें।

**उदाहरण:**
```json
{"mitm": true}
```

#### ntlm
संचार या परिवहन उद्देश्यों के लिए Microsoft NTLM (Windows NT LAN Manager) प्रमाणीकरण का उपयोग करने के लिए।

**उदाहरण:**
```json
{"ntlm": true}
```

#### pidfile
pidfile का पथ, जहां प्रोसेस आईडी लिखी जाएगी।

**उदाहरण:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
दूरस्थ पते को क्लाइंट मशीन के आंतरिक IP पर सेट करता है।

**उदाहरण:**
```json
{"usePrivateIp": true}
```

आप इन विकल्पों के बारे में अधिक जानकारी [यहां](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/) पा सकते हैं।

### preferScenarioName
केवल Cucumber। यदि केवल एक सिंगल सिनारियो चला है तो सेशन नाम को सिनारियो नाम पर सेट करें।
[wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution) के साथ समानांतर में चलाते समय उपयोगी।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### sessionNameFormat
सत्र नाम प्रारूप को अनुकूलित करें।

प्रकार: `Function`<br />
डिफ़ॉल्ट (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
डिफ़ॉल्ट (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
केवल Mocha। सत्र नाम में परीक्षण शीर्षक को अपेंड न करें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### sessionNamePrependTopLevelSuiteTitle
केवल Mocha। सत्र नाम के सामने शीर्ष स्तर के सूट शीर्षक को जोड़ें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### setSessionName
स्वचालित रूप से सत्र नाम सेट करें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### setSessionStatus
स्वचालित रूप से सत्र स्थिति (पास/फेल) सेट करें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`


### ignoreTestCountInName
नाम में परीक्षण के पुनः प्रयासों की गिनती को नज़रअंदाज़ करें

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`


### useScenarioName
किकुम्बर विशिष्ट परीक्षणों के लिए परीक्षण नामों को परिदृश्य नामों के रूप में प्राप्त करने के लिए, बस अपने `wdio.conf.js` में `useScenarioName: true` जोड़ें।

## कंपाइल और प्रकाशित करने के चरण
1. इस रिपॉज़िटरी को क्लोन करें।
2. "npm install" चलाएं
3. "npm run build" चलाएं
4. प्रकाशित करने के चरण: "npm login" चलाएं
5. "npm publish --access public" चलाएं

----

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।