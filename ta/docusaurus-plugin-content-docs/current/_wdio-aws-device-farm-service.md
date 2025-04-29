---
id: wdio-aws-device-farm-service
title: AWS சாதன ஃபார்ம் சேவை
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service) ஐப் பார்க்கவும்
## WebdriverIO க்கான AWS சாதன ஃபார்ம் சேவை

[AWS சாதன ஃபார்ம்](https://aws.amazon.com/device-farm/) WebdriverIO க்கான சேவை.

இந்த சேவை டெஸ்க்டாப் உலாவி சோதனையை மட்டுமே ஆதரிக்கிறது.

## WebDriverIO v8 க்கு மேம்படுத்துதல்

v8.0.0 பதிப்பில் இருந்து இப்பொழுது இந்த தொகுப்பு [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) ஆதரவை வழங்குகிறது. இருப்பினும், WebDriverIO v7 அக்டோபர் 2023 இல் [LTS ஆதரவு](https://webdriver.io/versions/) முடிவடையும் வரை தொடர்ந்து ஆதரிக்கப்படும் என்பதை கவனத்தில் கொள்ளவும்.

v8 க்கான பெரிய பதிப்பு மேம்படுத்தலுடன், இந்த தொகுப்பு ES தொகுதி அமைப்புக்கு மாறியுள்ளது. மேலும் இது CommonJS (CJS-) மற்றும் ECMAScript தொகுதிகள் (ESM-) இணக்கமான தொகுதிகள் இரண்டையும் வெளியிடுகிறது.

## நிறுவல்

```
npm install --save-dev wdio-aws-device-farm-service
```

## உதாரணம்

நீங்கள் வழங்கப்பட்ட உதாரணத்தை `npm run example` கொண்டு இயக்கலாம். இதற்கு தேவையானவை:

1. சுற்றுச்சூழல் மாறி `PROJECT_ARN` ஆக ஒரு AWS சாதன ஃபார்ம் திட்டத்தின் ARN
2. AWS சான்றுகள் ([ஆவணங்களைப் பார்க்கவும்](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). AWS சாதன ஃபார்ம் `us-west-2` ஐ மட்டுமே ஆதரிக்கிறது என்பதை கவனிக்கவும். `AWS_REGION` சுற்றுச்சூழல் மாறியுடன் நீங்கள் AWS பிராந்தியத்தை கட்டாயப்படுத்தலாம்.

எடுத்துக்காட்டாக, AWS தற்காலிக சான்றுகளைப் பயன்படுத்தி இது எப்படி இருக்கும்:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## பாதுகாப்பு

மேலும் தகவலுக்கு [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) ஐப் பார்க்கவும்.

## உதவி பெறுதல்

எங்கள் குழுவுடன் தொடர்பு கொள்ள சிறந்த வழி GitHub மூலம். உதவி பெற அல்லது நீங்கள் அனுபவிக்கும் எந்தப் பிரச்சினைகளையும் புகாரளிக்க நீங்கள் [புதிய சிக்கலைத் திறக்கலாம்](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new).

## உரிமம்

இந்த திட்டம் Apache-2.0 உரிமத்தின் கீழ் உரிமம் பெற்றுள்ளது.