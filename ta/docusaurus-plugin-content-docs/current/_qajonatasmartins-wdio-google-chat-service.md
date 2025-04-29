---
id: qajonatasmartins-wdio-google-chat-service
title: கூகுள் சாட் சேவை
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பாகும், மேலும் தகவலுக்கு [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service) ஐப் பார்க்கவும்

கூகுள் சாட் ஸ்பேஸ்களுக்கு சோதனை முடிவுகளை அறிவிப்பாக/செய்தியாக அனுப்ப உதவும் Webdriverio நூலகம்.

## நிறுவல்

`npm install wdio-google-chat-service --save-dev`

அல்லது

`yarn add wdio-google-chat-service`

## அமைப்புகள்

முதலில், wdio கட்டமைப்பு கோப்பில் `wdio.conf.js` சேவையை இறக்குமதி செய்யவும்

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

இந்த சேவையைப் பயன்படுத்த, அறிவிப்புகளை அனுப்ப கூகுள் சாட் webhook URL தேவைப்படும் மற்றும் 'webhook'இல் URL ஐச் சேர்க்க வேண்டும்

எடுத்துக்காட்டு:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //சோதனை தோல்வியின் போது மட்டுமே அறிவிப்பை அனுப்பவும்
        }]
],
```

## கூகுள் சாட் webhook பெறுதல்

குறிப்பு: கூகுள் சாட்டில் வணிக கணக்குகளுக்கு மட்டுமே webhook உள்ளது. நீங்கள் தனிப்பட்ட கணக்கைப் பயன்படுத்தினால், webhook விருப்பம் இருக்காது.

1. கூகுள் சாட்டில் ஒரு ஸ்பேஸை உருவாக்கவும்
2. சாட் ஸ்பேஸ் பெயரில் உள்ள அம்புக்குறியைக் கிளிக் செய்யவும்
3. [Manage Webhooks] ஐக் கிளிக் செய்யவும்
4. ஒன்றைச் சேர்க்கவும் அல்லது காட்டப்பட்ட webhook Url ஐ நகலெடுக்கவும்.
5. மேலே உள்ள எடுத்துக்காட்டில் உள்ளது போல 'webhookUrl' விருப்பத்திற்குள் சேவையில் webhook இன் URL ஐ ஒட்டவும்.

## அம்சங்கள்

- mocha ரன்னருக்கான ஆதரவு
- பிழை விவரங்கள்
- சோதனை தோல்வியின் போது மட்டுமே அறிவிப்பை அனுப்பவும்

## முடிவுகள்

![Test pass and fail](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)