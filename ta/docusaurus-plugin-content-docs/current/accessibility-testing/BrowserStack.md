---
id: browserstack
title: பிரவுசர்ஸ்டேக் அணுகல்தன்மை சோதனை
---

# பிரவுசர்ஸ்டேக் அணுகல்தன்மை சோதனை

உங்கள் WebdriverIO சோதனை தொகுப்புகளில் [பிரவுசர்ஸ்டேக் அணுகல்தன்மை சோதனையின் தானியங்கி சோதனைகள் அம்சத்தைப்](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) பயன்படுத்தி எளிதாக அணுகல்தன்மை சோதனைகளை ஒருங்கிணைக்கலாம்.

## பிரவுசர்ஸ்டேக் அணுகல்தன்மை சோதனையில் தானியங்கி சோதனைகளின் நன்மைகள்

பிரவுசர்ஸ்டேக் அணுகல்தன்மை சோதனையில் தானியங்கி சோதனைகளைப் பயன்படுத்த, உங்கள் சோதனைகள் BrowserStack Automate இல் இயங்க வேண்டும்.

தானியங்கி சோதனைகளின் நன்மைகள் பின்வருமாறு:

* உங்கள் ஏற்கனவே உள்ள தானியங்கி சோதனை தொகுப்பில் தடையின்றி ஒருங்கிணைக்கிறது.
* சோதனை வழக்குகளில் குறியீடு மாற்றங்கள் எதுவும் தேவையில்லை.
* அணுகல்தன்மை சோதனைக்கு கூடுதல் பராமரிப்பு எதுவும் தேவையில்லை.
* வரலாற்று போக்குகளைப் புரிந்துகொண்டு சோதனை-வழக்கு உள்ளறிவுகளைப் பெறுங்கள்.

## பிரவுசர்ஸ்டேக் அணுகல்தன்மை சோதனையுடன் தொடங்குங்கள்

உங்கள் WebdriverIO சோதனை தொகுப்புகளை பிரவுசர்ஸ்டேக்கின் அணுகல்தன்மை சோதனையுடன் ஒருங்கிணைக்க இந்த படிகளைப் பின்பற்றவும்:

1. `@wdio/browserstack-service` npm தொகுப்பை நிறுவவும்.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. `wdio.conf.js` கட்டமைப்பு கோப்பைப் புதுப்பிக்கவும்.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Optional configuration options
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

விரிவான வழிமுறைகளை [இங்கே](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) காணலாம்.