---
id: wdio-light-reporter
title: லைட் ரிப்போர்ட்டர் ரிப்போர்ட்டர்
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Inspired by HTML and Mochawesome reporter

!Philosphy:

> This reporter does not support cucumber Report regeneration and is developed keeping in mind the bdd an mocha framework.
> Here,`describe()` section is considered as test scenario and `it()` as testcase inside the test scenarios.

## அம்சங்கள்

1. எளிதான அமைப்பு
2. மேம்படுத்தப்பட்ட UI
3. HTML அறிக்கையில் திரைப்பிடிப்பு இணைக்கப்பட்டுள்ளது
4. படிகள் சூழல் அல்லது பெயரை சேர்க்க addLabel() பயன்படுத்தலாம்


## வெளியீடுகள்
V 0.1.9 - ஆரம்ப வெளியீடு
V 0.2.6 - (சமீபத்தியது)
  1. பல சூழல் இயக்கங்களை உள்ளடக்கி, சூழலின் அடிப்படையில் பிரிக்கவும்.
  2. பிழைகளை சரிசெய்தல்
  3. செயல்திறன் மேம்படுத்தப்பட்டது.


## எடுத்துக்காட்டுகள்

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## நிறுவல்

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## கட்டமைப்பு

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## திரைப்பிடிப்புகள்

இந்த ரிப்போர்ட்டருக்கு திரைப்பிடிப்புகளை தானாகவே உள்ளமைக்கும் திறன் இல்லை, ஆனால் கைமுறையாக உள்ளமைக்கப்பட்டால், அது நிகழ்வைக் கேட்டு HTML அறிக்கையில் திரைப்பிடிப்புகளை இணைக்கும்.
**அறிக்கையில் திரைப்பிடிப்புகளைச் சேர்க்க, wdio conf கோப்பில் afterTest() hook இல் கீழே உள்ள குறியீட்டைச் சேர்க்கவும்.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## முடிவு கோப்புகள்

ஒவ்வொரு இயக்கமும் ஒவ்வொரு spec கோப்புகளுக்கும் json அறிக்கையை மீண்டும் உருவாக்குகிறது, இணைக்கப்பட்ட json மற்றும் HTML அறிக்கையை உருவாக்க, wdio conf கோப்பில் **onComplete()** hook இல் கீழே உள்ள குறியீட்டைச் சேர்க்கவும்

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> நீங்கள் உங்கள் சோதனையை எந்த --suite விருப்பமும் இல்லாமல் இயக்கினால், அது இயல்பாக suite ஆக கருதப்படும்
> நீங்கள் ஓட்டத்தின் போது பல அளவுருக்களை suite ஆக வழங்கினால் ரிப்போர்ட்டர் வேலை செய்யாது.
> wdio run `wdio.conf.js --suite firstSuite` - **(நன்றாக செயல்படுகிறது)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(செயல்படாது)** :(

## சூழலைச் சேர்த்தல்

> எந்த படிகளுக்கும் சூழலைச் சேர்க்க `useLabel()` ஐப் பயன்படுத்தலாம் அல்லது படிகளாக சேர்க்க பயன்படுத்தலாம்.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## புதுப்பிப்புகள்
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## உரிமம்

MIT
**இலவசம், நிச்சயமாக!**