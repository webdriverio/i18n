---
id: wdio-ui5-service
title: UI5 सेवा
custom_edit_url: https://github.com/js-soft/wdi5/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ui5-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/js-soft/wdi5) | [npm](https://www.npmjs.com/package/wdio-ui5-service)

`wdi5` (/vdif5/) एक [`Webdriver.IO`](https://webdriver.io) सेवा (मानो: विस्तार) है, जो [`UI5 की टेस्ट API`](https://ui5.sap.com/#/api/sap.ui.test) का उपयोग करती है।
यह UI5 वेब-एप्लिकेशन के एंड-टू-एंड टेस्ट के लिए उपयोग किया जाता है।

:notebook: दस्तावेज़ीकरण [https://ui5-community.github.io/wdi5/](https://ui5-community.github.io/wdi5/) पर है  
:bicyclist: [रोडमैप](https://github.com/orgs/ui5-community/projects/2/views/1)  
:raising_hand: कृपया समुदाय समर्थन और प्रश्नों के लिए GitHub के [Issues](https://github.com/ui5-community/wdi5/issues) का उपयोग करें  
:raised_hand: [wdi5 विशेषज्ञों से वाणिज्यिक समर्थन प्राप्त करें](https://github.com/ui5-community/wdi5/blob/main/SUPPORT.md#commercial-support)      
:speech_balloon: [#wdi5 स्लैक चैनल](https://openui5.slack.com/) `wdi5` के बारे में मित्रतापूर्ण जिज्ञासा-प्रेरित बातचीत के लिए एक स्थान है ([साइन-अप लिंक](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/))  
:mega: घोषणाओं के लिए [Discussions](https://github.com/ui5-community/wdi5/discussions), [@\_wdi5\_ ट्विटर अकाउंट](https://twitter.com/_wdi5_) और [@\_wdi5\_ FOSStodon अकाउंट](https://fosstodon.org/@_wdi5_) देखें  

## स्टीयरिंग कमेटी

`wdi5` का संचालन उत्कृष्ट लोगों के एक समूह द्वारा किया जाता है जो टूल के लिए रणनीति और अगले कदमों पर निर्णय लेते हैं (अंतिम नाम के वर्णानुक्रम में):

- Simon Coen [@Siolto](https://github.com/Siolto)
- Dominik Feininger [@dominikfeininger](https://github.com/dominikfeininger)
- Constantin Lebrecht [@monavari-lebrecht](https://github.com/monavari-lebrecht)
- Hristo Manchev [@hmanchev](https://github.com/hmanchev)
- Nicolai Schoenteich [@nicoschoenteich](https://github.com/nicoschoenteich)
- Sebastian Wolf [@SebastianWolf-SAP](https://github.com/SebastianWolf-SAP)
- Marian Zeis [@marianfoo](https://github.com/marianfoo)

### पूर्व समिति सदस्य

हमारी यात्रा में साथ देने के लिए धन्यवाद! 🏅

- Arnaud Buchholz [@ArnaudBuchholz](https://github.com/ArnaudBuchholz) - जुलाई 2022..अगस्त 2024
- Peder Hveem Alsvik [@ph-alsvik](https://github.com/ph-alsvik) - जुलाई 2022..अक्टूबर 2022
- Nicholas O'Malley [@aiopa](https://github.com/aiopa) - अक्टूबर 2022..अक्टूबर 2023

## आभार

:raised_hands: हमें इन्फ्रास्ट्रक्चर प्रदान करने के लिए धन्यवाद:

[![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780)](https://browserstack.com)   
[![Testing Powered By SauceLabs](https://opensource.saucelabs.com/images/opensauce/powered-by-saucelabs-badge-white.png?sanitize=true "Testing Powered By SauceLabs")](https://saucelabs.com)

(ping back to <a rel="me" href="https://fosstodon.org/@_wdi5_">Mastodon</a>)

## लाइसेंस

यह कार्य Apache 2.0 और Derived Beer-ware 🍺 लाइसेंस के अंतर्गत दोहरे-लाइसेंस प्राप्त है। आधिकारिक लाइसेंस Apache 2.0 होगा लेकिन अंततः आप इस कार्य का उपयोग करते समय उनमें से किसी एक को चुन सकते हैं।

इसलिए, जब आपको यह सामग्री पसंद आए, तो [किसी भी (या सभी 😆) योगदानकर्ताओं](https://github.com/ui5-community/wdi5/graphs/contributors) को एक बीयर खरीदें जब आप उन्हें देखें।