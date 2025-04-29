---
id: wdio-performancetotal-service
title: செயல்திறன் மொத்த சேவை
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service) ஐப் பார்க்கவும்
குறிப்பு:<br/>
WebdriverIO v9 க்கு பதிப்பு 4.x.x ஐப் பயன்படுத்தவும்.<br/>
WebdriverIO v8 க்கு பதிப்பு 3.x.x ஐப் பயன்படுத்தவும்.<br/>
WebdriverIO v7 க்கு பதிப்பு 2.x.x ஐப் பயன்படுத்தவும்.<br/>
WebdriverIO v6 க்கு பதிப்பு 1.x.x ஐப் பயன்படுத்தவும்.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

[webdriver.io](https://webdriver.io/) க்கான இந்த செருகுநிரலுடன், உங்கள் சோதனைகளில் எந்த பாய்வுக்கும் செயல்திறன் பகுப்பாய்வை எளிதாக சேர்க்கலாம், அது தூய UI, API அல்லது இரண்டின் கலவையாக இருந்தாலும். இந்த செருகுநிரல் பல்வேறு செயல்முறைகளின் பதில் நேரங்களை அளவிடுவதற்கும், உங்கள் பயன்பாட்டில் சாத்தியமான தடைகளை அடையாளம் காண்பதற்கும் ஒரு எளிய மற்றும் திறமையான வழியை வழங்குகிறது. இந்த தகவலுடன், உங்கள் பயன்பாட்டின் ஒட்டுமொத்த செயல்திறனை மேம்படுத்த உகந்ததாக்குதல் மற்றும் மேம்பாடுகள் பற்றிய தகவலறிந்த முடிவுகளை எடுக்கலாம்.

## நிறுவல்

இந்த தொகுதியை ஒரு dev சார்பாக எளிதாக நிறுவ பின்வரும் கட்டளையைப் பயன்படுத்துவதே எளிதான வழி:

```
npm install wdio-performancetotal-service --save-dev
```

## பயன்பாடு

உங்கள் `wdio.conf.js` இல் wdio-performancetotal-service சேர்க்கவும்:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...அல்லது சேவை விருப்பங்களுடன்:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // The options (with default values)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### விருப்பங்கள்

#### __disableAppendToExistingFile__

`true` என அமைக்கப்பட்டால், புதிய சோதனை ஓட்டங்கள் புதிதாகத் தொடங்கி ஏற்கனவே உள்ள செயல்திறன் தரவை மேலெழுதும்.
`false` (இயல்புநிலை) என அமைக்கப்பட்டால், செயல்திறன் தரவு ஏற்கனவே உள்ள தரவுடன் சேர்க்கப்படும்.

> **⚠️ எச்சரிக்கை:**
>
> இந்த செயல் உங்கள் செயல்திறன் தரவை நிரந்தரமாக நீக்கும். தொடர்வதற்கு முன் உங்களிடம் காப்புப்பிரதி உள்ளதா என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்.

#### __performanceResultsFileName__

இயல்புநிலை முடிவுகள் கோப்பு பெயரை (`performance-results`) நீங்கள் மாற்றலாம்.
புதிதாக உருவாக்கப்பட்ட முடிவுகள் கோப்பு பொதுவாக பழைய கோப்பை மேலெழுதும். நீங்கள் பழைய கோப்புகளை வைத்திருக்க விரும்பினால், கோப்பு பெயருடன் ஒரு நேர முத்திரையைச் சேர்ப்பது பரிந்துரைக்கப்படுகிறது. எடுத்துக்காட்டு:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

இயல்புநிலை `false`. மதிப்பு `true` என அமைக்கப்பட்டிருந்தால், தோல்வியடைந்த சோதனைகளிலிருந்து செயல்திறன் பகுப்பாய்வு விலக்கப்படும்.

#### __recentDays__

இயல்புநிலை `0` (வரம்பு இல்லை). செயல்திறன் பகுப்பாய்வுக்கு கருத்தில் கொள்ள வேண்டிய நாட்களின் எண்ணிக்கையை அமைக்க, நாட்களின் எண்ணிக்கையை அமைக்கவும். பகுதி நாட்களும் ஆதரிக்கப்படுகின்றன (எ.கா. `recentDays: 0.5`)

#### __performanceResultsDirectory__

திட்டத்தின் ரூட் கோப்புறையில் உள்ள முடிவுகள் கோப்புறைக்கான இயல்புநிலை பாதையை நீங்கள் மாற்றலாம்.
எடுத்துக்காட்டு:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

இயல்புநிலை `false`. `true` எனில், செயல்திறன் தரவு உலாவி வகையால் கூட பகுப்பாய்வு செய்யப்படும்.


### சோதனையில் பயன்பாடு

உங்களுக்கு தேவையான இடத்தில், அது உங்கள் சோதனை கோப்பாக இருந்தாலும் அல்லது வேறு எந்த வகுப்பாக இருந்தாலும் __performancetotal__ ஐ இறக்குமதி செய்யுங்கள். இந்த பொருள் உங்கள் சோதனைகளில் செயல்திறன் தரவை அளவிடுவதற்கான முறைகளை வழங்குகிறது, செயல்திறன் அளவீடுகளைத் தொடங்குவதற்கும் முடிப்பதற்கும் sampleStart மற்றும் sampleEnd ஆகியவை அடங்கும்.
இரண்டு வலைத்தளங்களின் தொடக்க செயல்திறனை அளவிட performancetotal பொருளைப் பயன்படுத்தும் ஒரு எடுத்துக்காட்டு இங்கே:

```typescript
// This test case measures the startup performance of Github and SourceForge using the performancetotal object.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Start a new performance measurement for Github
    performancetotal.sampleStart("GH-Startup");

    // Navigate to Github
    browser.url("https://github.com/");

    // End the Github measurement and save the results
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Start a new performance measurement for SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Navigate to SourceForge
    await browser.url("https://sourceforge.net/");

    // End the SourceForge measurement and save the results
    performancetotal.sampleEnd("SF-Startup");
});

```

உங்கள் சோதனையில் performancetotal.getSampleTime(sampleName) ஐ அழைப்பதன் மூலம் ஒரு செயல்திறன் மாதிரிக்கு எடுத்துக்கொண்ட நேரத்தைப் பெறலாம். இது குறிப்பிட்ட குறியீட்டுப் பகுதியின் செயல்திறனைச் சரிபார்க்கவும், அது உங்கள் எதிர்பார்ப்புகளை பூர்த்தி செய்கிறதா என்பதை உறுதிப்படுத்தவும் அனுமதிக்கிறது.

```typescript
// Get the time taken for a single sample
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## முடிவுகளைப் பெறுதல்

அனைத்து சோதனைகளும் முடிந்ததும், உங்கள் திட்டத்தின் ரூட் ஃபோல்டரில் ஒரு புதிய முடிவுகள் கோப்புறை உருவாக்கப்படுகிறது (இயல்புநிலை கோப்பகப் பெயர் performance-results). இந்த கோப்புறைக்குள், performance-results.json மற்றும் performance-results.csv என இரண்டு கோப்புகள் உருவாக்கப்படுகின்றன. இந்த கோப்புகள் ஒவ்வொரு மாதிரிக்கும் பகுப்பாய்வு செய்யப்பட்ட தரவைக் கொண்டுள்ளன, அதில் சராசரி நேரம், சராசரியின் நிலையான பிழை (SEM), மாதிரிகளின் எண்ணிக்கை, குறைந்தபட்ச மதிப்பு, அதிகபட்ச மதிப்பு, முந்தைய நேரம் மற்றும் சமீபத்திய நேரம் ஆகியவை அடங்கும். காலப்போக்கில் செயல்திறன் பின்னடைவு அல்லது மேம்பாடுகளை அடையாளம் காண இந்த தரவைப் பயன்படுத்தலாம்.

### மொத்தமாக செயல்திறன் தரவை பகுப்பாய்வு செய்தல்

புதிய சோதனைகளை உருவாக்காமல் ஏற்கனவே உள்ள செயல்திறன் தரவை மொத்தமாகப் பகுப்பாய்வு செய்ய, [__performancetotal-cli__ கருவி](https://www.npmjs.com/package/performancetotal-cli) ஐப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

## டைப்ஸ்கிரிப்ட் ஆதரவு

இந்த செருகுநிரலுக்கு டைப்ஸ்கிரிப்ட் ஆதரிக்கப்படுகிறது.

## ஆதரவு

ஆதரவு மற்றும் பரிந்துரைகளுக்கு, [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com) இல் என்னைத் தொடர்பு கொள்ளவும்.