---
id: sharding
title: शार्डिंग
description: "टेस्ट को तेज़ी से चलाने के लिए --shard विकल्प के साथ अपने टेस्ट सूट को कई मशीनों में विभाजित करें, उदाहरण के लिए GitHub Actions पर।"
---

डिफ़ॉल्ट रूप से, WebdriverIO टेस्ट को समानांतर (parallel) में चलाता है और आपकी मशीन पर CPU कोर का अधिकतम उपयोग करने का प्रयास करता है। और भी अधिक समानांतरता प्राप्त करने के लिए, आप एक साथ कई मशीनों पर टेस्ट चलाकर WebdriverIO टेस्ट निष्पादन को और अधिक स्केल कर सकते हैं। हम संचालन के इस मोड को "शार्डिंग" कहते हैं।

## कई मशीनों के बीच टेस्ट की शार्डिंग

टेस्ट सूट को शार्ड करने के लिए, कमांड लाइन में `--shard=x/y` पास करें। उदाहरण के लिए, सूट को चार शार्ड में विभाजित करने के लिए, जिनमें से प्रत्येक एक चौथाई टेस्ट चलाता है:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

अब, यदि आप इन शार्ड को अलग-अलग कंप्यूटरों पर समानांतर में चलाते हैं, तो आपका टेस्ट सूट चार गुना तेज़ी से पूरा होता है।

## GitHub Actions उदाहरण

GitHub Actions [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) विकल्प का उपयोग करके [कई जॉब्स के बीच टेस्ट की शार्डिंग](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) का समर्थन करता है। मैट्रिक्स विकल्प दिए गए विकल्पों के हर संभावित संयोजन के लिए एक अलग जॉब चलाएगा।

निम्नलिखित उदाहरण आपको दिखाता है कि चार मशीनों पर समानांतर में अपने टेस्ट चलाने के लिए एक जॉब को कैसे कॉन्फ़िगर करें। आप पूरा पाइपलाइन सेटअप [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml) प्रोजेक्ट में पा सकते हैं।

-   सबसे पहले हम अपने जॉब कॉन्फ़िगरेशन में एक मैट्रिक्स विकल्प जोड़ते हैं, जिसमें shard विकल्प होता है जिसमें उन शार्ड की संख्या होती है जिन्हें हम बनाना चाहते हैं। `shard: [1, 2, 3, 4]` चार शार्ड बनाएगा, जिनमें से प्रत्येक का एक अलग शार्ड नंबर होगा।
-   फिर हम अपने WebdriverIO टेस्ट को `--shard ${{ matrix.shard }}/${{ strategy.job-total }}` विकल्प के साथ चलाते हैं। यह प्रत्येक शार्ड के लिए हमारा टेस्ट कमांड होगा।
-   अंत में हम अपनी wdio लॉग रिपोर्ट को GitHub Actions Artifacts पर अपलोड करते हैं। इससे शार्ड विफल होने की स्थिति में लॉग उपलब्ध रहेंगे।

टेस्ट पाइपलाइन को निम्नानुसार परिभाषित किया गया है:

```yaml title=.github/workflows/test.yaml
name: Test

on: [push, pull_request]

jobs:
    lint:
        # ...
    unit:
        # ...
    e2e:
        name: 🧪 Test (${{ matrix.shard }}/${{ strategy.job-total }})
        runs-on: ubuntu-latest
        needs: [lint, unit]
        strategy:
            matrix:
                shard: [1, 2, 3, 4]
        steps:
            - uses: actions/checkout@v4
            - uses: ./.github/workflows/actions/setup
            - name: E2E Test
              run: npm run test:features -- --shard ${{ matrix.shard }}/${{ strategy.job-total }}
            - uses: actions/upload-artifact@v1
              if: failure()
              with:
                  name: logs-${{ matrix.shard }}
                  path: logs
```

यह सभी शार्ड को समानांतर में चलाएगा, जिससे टेस्ट का निष्पादन समय 4 गुना कम हो जाएगा:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

[Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) प्रोजेक्ट का कमिट [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) देखें, जिसने इसकी टेस्ट पाइपलाइन में शार्डिंग की शुरुआत की, जिससे कुल निष्पादन समय `2:23 min` से घटकर `1:30 min` हो गया, यानी __37%__ की कमी 🎉।