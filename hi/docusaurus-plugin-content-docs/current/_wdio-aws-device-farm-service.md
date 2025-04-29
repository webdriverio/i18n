---
id: wdio-aws-device-farm-service
title: AWS डिवाइस फार्म सर्विस
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---


> wdio-aws-device-farm-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## WebdriverIO के लिए AWS डिवाइस फार्म सर्विस

[AWS Device Farm](https://aws.amazon.com/device-farm/) WebdriverIO के लिए सेवा।

यह सेवा केवल डेस्कटॉप ब्राउज़र टेस्टिंग का समर्थन करती है।

## WebDriverIO v8 में अपग्रेड करना

पैकेज अब v8.0.0 संस्करण से [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) के लिए समर्थन प्रदान करता है। हालांकि, कृपया ध्यान दें कि WebDriverIO v7 को अक्टूबर 2023 में उसके [LTS समर्थन](https://webdriver.io/versions/) के अंत तक समर्थित किया जाएगा।

v8 में प्रमुख संस्करण अपग्रेड के साथ, यह पैकेज ES मॉड्यूल सिस्टम में परिवर्तित हो गया है। और अब यह CommonJS (CJS-) और ECMAScript मॉड्यूल्स (ESM-) संगत मॉड्यूल दोनों को उत्सर्जित करता है।

## स्थापना

```
npm install --save-dev wdio-aws-device-farm-service
```

## उदाहरण

आप प्रदान किए गए उदाहरण को `npm run example` के साथ चला सकते हैं। इसके लिए आवश्यक है:

1. एक AWS डिवाइस फार्म प्रोजेक्ट ARN पर्यावरण चर के रूप में `PROJECT_ARN`
2. AWS क्रेडेंशियल्स ([दस्तावेज़ देखें](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html))। ध्यान दें कि AWS डिवाइस फार्म केवल `us-west-2` का समर्थन करता है। आप `AWS_REGION` पर्यावरण चर के साथ एक AWS क्षेत्र को बल दे सकते हैं।

उदाहरण के लिए, AWS अस्थायी क्रेडेंशियल्स का उपयोग करते हुए यह कैसा दिखेगा:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## सुरक्षा

अधिक जानकारी के लिए [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) देखें।

## सहायता प्राप्त करना

हमारी टीम के साथ बातचीत करने का सबसे अच्छा तरीका GitHub के माध्यम से है। आप सहायता प्राप्त करने या अपने द्वारा अनुभव की गई किसी भी समस्या की रिपोर्ट करने के लिए [एक समस्या खोल](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new) सकते हैं।

## लाइसेंस

यह प्रोजेक्ट Apache-2.0 लाइसेंस के तहत लाइसेंस प्राप्त है।