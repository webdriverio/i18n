---
id: lambdatest
title: லாம்டாடெஸ்ட் அணுகல்தன்மை சோதனை
---

# லாம்டாடெஸ்ட் அணுகல்தன்மை சோதனை

உங்கள் WebdriverIO சோதனை தொகுப்புகளில் [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/) பயன்படுத்தி அணுகல்தன்மை சோதனைகளை எளிதாக ஒருங்கிணைக்கலாம்.

## லாம்டாடெஸ்ட் அணுகல்தன்மை சோதனையின் நன்மைகள்

லாம்டாடெஸ்ட் அணுகல்தன்மை சோதனை உங்கள் வலை பயன்பாடுகளில் அணுகல்தன்மை சிக்கல்களை கண்டறிந்து சரிசெய்ய உதவுகிறது. பின்வருவன முக்கிய நன்மைகள்:

* உங்கள் தற்போதைய WebdriverIO சோதனை தானியக்கத்துடன் சிறப்பாக ஒருங்கிணைக்கப்படுகிறது.
* சோதனை செயல்பாட்டின் போது தானியங்கி அணுகல்தன்மை ஸ்கேனிங்.
* விரிவான WCAG இணக்க அறிக்கைகள்.
* விரிவான சிக்கல் கண்காணிப்பு மற்றும் தீர்வு வழிகாட்டல்.
* பல WCAG தரநிலைகளுக்கான ஆதரவு (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* லாம்டாடெஸ்ட் டாஷ்போர்டில் நேரலை அணுகல்தன்மை உள்ளறிவுகள்.

## லாம்டாடெஸ்ட் அணுகல்தன்மை சோதனையை தொடங்குவது

உங்கள் WebdriverIO சோதனை தொகுப்புகளை லாம்டாடெஸ்ட்-ன் அணுகல்தன்மை சோதனையுடன் ஒருங்கிணைக்க பின்வரும் படிகளைப் பின்பற்றவும்:

1. லாம்டாடெஸ்ட் WebdriverIO சேவை தொகுப்பை நிறுவவும்.

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

3. உங்கள் சோதனைகளை வழக்கம் போல இயக்கவும். லாம்டாடெஸ்ட் சோதனை செயல்பாட்டின் போது அணுகல்தன்மை சிக்கல்களை தானாகவே ஸ்கேன் செய்யும்.

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

* **bestPractice**: சிறந்த நடைமுறை பரிந்துரைகளை சேர்க்கவும் (இயல்புநிலை: `false`)

* **needsReview**: கைமுறை மதிப்பாய்வு தேவைப்படும் சிக்கல்களை சேர்க்கவும் (இயல்புநிலை: `true`)

## அணுகல்தன்மை அறிக்கைகளைக் காண்பது

உங்கள் சோதனைகள் முடிந்த பிறகு, [லாம்டாடெஸ்ட் டாஷ்போர்டில்](https://automation.lambdatest.com/) விரிவான அணுகல்தன்மை அறிக்கைகளைக் காணலாம்:

1. உங்கள் சோதனை செயல்பாட்டிற்குச் செல்லவும்
2. "அணுகல்தன்மை" தாவலைக் கிளிக் செய்யவும்
3. தீவிரத்தின் அடிப்படையில் கண்டறியப்பட்ட சிக்கல்களை மதிப்பாய்வு செய்யவும்
4. ஒவ்வொரு சிக்கலுக்கும் தீர்வு வழிகாட்டுதல்களைப் பெறவும்

மேலும் விரிவான தகவலுக்கு, [லாம்டாடெஸ்ட் அணுகல்தன்மை தானியக்க ஆவணங்களைப்](https://www.lambdatest.com/support/docs/accessibility-automation-settings/) பார்வையிடவும்.