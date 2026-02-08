---
id: testmuai
title: TestMu AI (முன்னர் LambdaTest) அணுகல்தன்மை சோதனை
---

# TestMu AI அணுகல்தன்மை சோதனை

நீங்கள் உங்கள் WebdriverIO சோதனை தொகுப்புகளில் [TestMu AI அணுகல்தன்மை சோதனை](https://www.testmuai.com/support/docs/accessibility-automation-settings/) ஐ எளிதாக ஒருங்கிணைக்கலாம்.

## TestMu AI அணுகல்தன்மை சோதனையின் நன்மைகள்

TestMu AI அணுகல்தன்மை சோதனை உங்கள் வலை பயன்பாடுகளில் அணுகல்தன்மை சிக்கல்களைக் கண்டறிந்து சரிசெய்ய உதவுகிறது. பின்வருவன முக்கிய நன்மைகள்:

* உங்கள் தற்போதைய WebdriverIO தானியக்க சோதனையுடன் தடையற்று ஒருங்கிணைகிறது.
* சோதனை செயல்பாட்டின் போது தானியங்கு அணுகல்தன்மை ஸ்கேனிங்.
* விரிவான WCAG இணக்க அறிக்கை.
* சரிசெய்வதற்கான வழிகாட்டுதலுடன் விரிவான சிக்கல் கண்காணிப்பு.
* பல WCAG தரநிலைகளுக்கான ஆதரவு (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* TestMu AI டாஷ்போர்டில் நிகழ்நேர அணுகல்தன்மை அறிவுகள்.

## TestMu AI அணுகல்தன்மை சோதனையுடன் தொடங்குங்கள்

உங்கள் WebdriverIO சோதனை தொகுப்புகளை TestMu AI இன் அணுகல்தன்மை சோதனையுடன் ஒருங்கிணைக்க இந்த படிகளைப் பின்பற்றவும்:

1. TestMu AI WebdriverIO சேவை தொகுப்பை நிறுவவும்.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. உங்கள் `wdio.conf.js` கட்டமைப்பு கோப்பைப் புதுப்பிக்கவும்.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',

    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],

    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. உங்கள் சோதனைகளை வழக்கம்போல் இயக்கவும். TestMu AI சோதனை செயல்பாட்டின் போது அணுகல்தன்மை சிக்கல்களை தானாகவே ஸ்கேன் செய்யும்.

```bash
npx wdio run wdio.conf.js
```

## கட்டமைப்பு விருப்பங்கள்

`accessibilityOptions` பொருள் பின்வரும் அளவுருக்களை ஆதரிக்கிறது:

* **wcagVersion**: சோதிக்க வேண்டிய WCAG தர பதிப்பைக் குறிப்பிடவும்
  - `wcag20` - WCAG 2.0 நிலை A
  - `wcag21a` - WCAG 2.1 நிலை A
  - `wcag21aa` - WCAG 2.1 நிலை AA (இயல்புநிலை)
  - `wcag22aa` - WCAG 2.2 நிலை AA

* **bestPractice**: சிறந்த நடைமுறை பரிந்துரைகளைச் சேர்க்கவும் (இயல்புநிலை: `false`)

* **needsReview**: கையேடு மதிப்பாய்வு தேவைப்படும் சிக்கல்களைச் சேர்க்கவும் (இயல்புநிலை: `true`)

## அணுகல்தன்மை அறிக்கைகளைப் பார்த்தல்

உங்கள் சோதனைகள் முடிந்த பிறகு, [TestMu AI டாஷ்போர்டில்](https://automation.lambdatest.com/) விரிவான அணுகல்தன்மை அறிக்கைகளைப் பார்க்கலாம்:

1. உங்கள் சோதனை செயலாக்கத்திற்குச் செல்லவும்
2. "Accessibility" தாவலைக் கிளிக் செய்யவும்
3. தீவிர நிலைகளுடன் அடையாளம் காணப்பட்ட சிக்கல்களை மதிப்பாய்வு செய்யவும்
4. ஒவ்வொரு சிக்கலுக்கும் சரிசெய்யும் வழிகாட்டுதல்களைப் பெறவும்

மேலும் விரிவான தகவலுக்கு, [TestMu AI அணுகல்தன்மை தானியக்கம் ஆவணங்களைப்](https://www.testmuai.com/support/docs/accessibility-automation-settings/) பார்வையிடவும்.