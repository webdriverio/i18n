---
id: wdio-ui5-service
title: UI5 சேவை
custom_edit_url: https://github.com/js-soft/wdi5/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ui5-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/js-soft/wdi5) | [npm](https://www.npmjs.com/package/wdio-ui5-service) பார்க்கவும்

`wdi5` (/vdif5/) என்பது [`Webdriver.IO`](https://webdriver.io) சேவை (நீட்டிப்பு போல நினைக்கவும்), [`UI5`'ன் சோதனை API](https://ui5.sap.com/#/api/sap.ui.test) ஐப் பயன்படுத்துகிறது.
இது UI5 வலை-பயன்பாட்டின் முடிவிலிருந்து-முடிவு வரை சோதனைகளுக்குப் பயன்படுத்தப்படுகிறது.

:notebook: ஆவணங்கள் [https://ui5-community.github.io/wdi5/](https://ui5-community.github.io/wdi5/) இல் உள்ளன  
:bicyclist: [வழித்திட்டம்](https://github.com/orgs/ui5-community/projects/2/views/1)  
:raising_hand: சமூக ஆதரவு மற்றும் கேள்விகளுக்கு GitHub இன் [Issues](https://github.com/ui5-community/wdi5/issues) ஐப் பயன்படுத்தவும்  
:raised_hand: wdi5 நிபுணர்களிடமிருந்து [வணிக ஆதரவைப் பெறுங்கள்](https://github.com/ui5-community/wdi5/blob/main/SUPPORT.md#commercial-support)      
:speech_balloon: [#wdi5 slack சேனல்](https://openui5.slack.com/) என்பது `wdi5` பற்றிய நட்பு ஆர்வத்தால் இயக்கப்படும் உரையாடலுக்கான இடமாகும் ([பதிவு இணைப்பு](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/))  
:mega: அறிவிப்புகளுக்கு [Discussions](https://github.com/ui5-community/wdi5/discussions), [@\_wdi5\_ twitter கணக்கு](https://twitter.com/_wdi5_) மற்றும் [@\_wdi5\_ FOSStodon கணக்கு](https://fosstodon.org/@_wdi5_) ஆகியவற்றைப் பார்க்கவும்  

## இயக்குனர் குழு

`wdi5` ஆனது கருவிக்கான மூலோபாயம் மற்றும் அடுத்த படிகளை முடிவு செய்யும் சிறந்த நபர்களால் நிர்வகிக்கப்படுகிறது (கடைசி பெயரின் அகர வரிசையில்):

- Simon Coen [@Siolto](https://github.com/Siolto)
- Dominik Feininger [@dominikfeininger](https://github.com/dominikfeininger)
- Constantin Lebrecht [@monavari-lebrecht](https://github.com/monavari-lebrecht)
- Hristo Manchev [@hmanchev](https://github.com/hmanchev)
- Nicolai Schoenteich [@nicoschoenteich](https://github.com/nicoschoenteich)
- Sebastian Wolf [@SebastianWolf-SAP](https://github.com/SebastianWolf-SAP)
- Marian Zeis [@marianfoo](https://github.com/marianfoo)

### முன்னாள் குழு உறுப்பினர்கள்

எங்கள் பயணத்தில் உடனிருந்ததற்கு நன்றி! 🏅

- Arnaud Buchholz [@ArnaudBuchholz](https://github.com/ArnaudBuchholz) - ஜூலை 2022..ஆகஸ்ட் 2024
- Peder Hveem Alsvik [@ph-alsvik](https://github.com/ph-alsvik) - ஜூலை 2022..அக்டோபர் 2022
- Nicholas O'Malley [@aiopa](https://github.com/aiopa) - அக்டோபர் 2022..அக்டோபர் 2023

## நன்றி

உள்கட்டமைப்பை எங்களுக்கு வழங்கியதற்கு :raised_hands::

[![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780)](https://browserstack.com)   
[![Testing Powered By SauceLabs](https://opensource.saucelabs.com/images/opensauce/powered-by-saucelabs-badge-white.png?sanitize=true "Testing Powered By SauceLabs")](https://saucelabs.com)

(<a rel="me" href="https://fosstodon.org/@_wdi5_">Mastodon</a>க்கு திரும்ப அனுப்புதல்)

## உரிமம்

இந்த வேலை Apache 2.0 மற்றும் Derived Beer-ware 🍺 உரிமம் ஆகிய இரண்டின் கீழ் உரிமம் பெற்றது. அதிகாரப்பூர்வ உரிமம் Apache 2.0 ஆக இருக்கும், ஆனால் இறுதியில் நீங்கள் இந்த வேலையைப் பயன்படுத்தினால் அவற்றில் ஒன்றைத் தேர்ந்தெடுக்கலாம்.

எனவே, இந்த விஷயங்களை உங்களுக்குப் பிடித்திருந்தால், நீங்கள் அவர்களைப் பார்க்கும்போது [எந்த (அல்லது அனைத்து 😆) பங்களிப்பாளர்களுக்கும்](https://github.com/ui5-community/wdi5/graphs/contributors) ஒரு பீர் வாங்குங்கள்.