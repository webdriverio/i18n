---
id: wdio-json-html-reporter
title: JSON HTML அறிக்கை உருவாக்கி
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பாகும், மேலும் தகவலுக்கு [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter) ஐப் பார்க்கவும்

இது ஒரு தனிப்பயன் WebDriverIO அறிக்கை உருவாக்கி ஆகும், இது சோதனை செயல்பாட்டின் போது விரிவான JSON அறிக்கைகளை உருவாக்குகிறது மற்றும் உங்கள் சோதனை முடிவுகளை காட்சிப்படுத்த எடுத்துச் செல்லக்கூடிய HTML அறிக்கை உருவாக்கியை வழங்குகிறது. இது நேர முத்திரைகள், செயல்பாட்டு மெட்டாடேட்டா மற்றும் தேவைப்படும்போது திரைப்பிடிப்புகளை பதிவுசெய்யும். இந்த தொகுப்பு அறிக்கை உருவாக்கிகளுக்கான WebDriverIO மரபைப் பின்பற்றுகிறது மற்றும் `wdio-json-html-reporter` என்ற பெயரில் npm தொகுப்பாக வெளியிடப்படுகிறது.

## பொருளடக்க அட்டவணை

- [மேலோட்டம்](#overview)
- [அம்சங்கள்](#features)
- [நிறுவல்](#installation)
  - [1. தொகுப்பை நிறுவவும்](#1-install-the-package)
  - [2. நிறுவலை சரிபார்க்கவும்](#2-verify-installation)
  - [3. WebDriverIO கட்டமைப்பைப் புதுப்பிக்கவும்](#3-update-webdriverio-configuration)
  - [4. உங்கள் சோதனைகளை இயக்கவும்](#4-run-your-tests)
- [CLI பயன்பாடு](#cli-usage)
- [வரலாற்று விருப்பம் மற்றும் ஒருங்கிணைந்த வரலாற்று உருவாக்கம்](#history-option-and-aggregated-history-generation)
- [திரைப்பிடிப்புகள்](#screenshots)

## மேலோட்டம்

WDIO JSON HTML REPORTER இரண்டு முக்கிய கூறுகளை வழங்குகிறது:

- **JSONReporter**: சோதனை நிகழ்வுகளை சேகரிக்க மற்றும் மெட்டாடேட்டா, சோதனை முடிவுகள், மற்றும் (விருப்பமாக) திரைப்பிடிப்புகளுடன் ஒரு JSON கோப்பை உருவாக்க WebDriverIO அறிக்கை இடைமுகத்தை நீட்டிக்கும் ஒரு தனிப்பயன் அறிக்கை உருவாக்கி.
- **HTMLReportGenerator**: பல JSON அறிக்கை கோப்புகளை ஊடாடும் விளக்கப்படங்கள், வடிகட்டுதல், மற்றும் ஏற்றுமதி செயல்பாடுகளுடன் விரிவான HTML அறிக்கையாக மாற்றுவதற்கான கருவி. கூடுதலாக, அறிக்கை உருவாக்கி இப்போது கிடைக்கும் என்றால் வரலாற்று செயல்பாட்டு தரவைக் காட்ட விருப்ப வரலாற்று கோப்பை ஆதரிக்கிறது. வரலாற்று தரவுகள் வழங்கப்படவில்லை என்றால், அறிக்கை வரலாற்று பிரிவை விட்டுவிட்டு தனித்துவமான பிழைகளை மட்டுமே காட்டுகிறது.

இந்த கருவிகள் உங்கள் சோதனை ஓட்டங்களைப் பற்றிய தெளிவான அறிவை பெற உதவுகின்றன, இது பிழைத்திருத்தம் மற்றும் தொடர்ச்சியான ஒருங்கிணைப்புக்கு அவசியமானது.

## அம்சங்கள்

- **JSON அறிக்கையிடல்**: நேர முத்திரைகள், சூட்சுடி பெயர்கள், சோதனை முடிவுகள், பிழைகள், மற்றும் விருப்ப திரைப்பிடிப்புகளுடன் விரிவான அறிக்கை.
- **HTML அறிக்கையிடல்**: JSON அறிக்கைகளை டாஷ்போர்டு, விளக்கப்படங்கள், விரிவான சோதனை அறிக்கை, மற்றும் வடிகட்டும் திறன்களுடன் எடுத்துச் செல்லக்கூடிய HTML அறிக்கையாக மாற்றுகிறது.
- **Excel-க்கு ஏற்றுமதி**: விரிவான சோதனை அறிக்கையை Excel கோப்பாக ஏற்றுமதி செய்யலாம்.
- **திரைப்பிடிப்பு ஆதரவு**: உங்கள் உள்ளமைவின் அடிப்படையில் தோல்வியுற்ற சோதனைகளுக்கு (அல்லது அனைத்து சோதனைகளுக்கும்) திரைப்பிடிப்புகளைப் பிடிக்கவும்.
- **செயல்பாட்டு மெட்டாடேட்டா**: உலாவி தகவல், செயல்பாடு தொடக்க/முடிவு நேரங்கள், மற்றும் ஒட்டுமொத்த காலஅளவை பதிவு செய்கிறது.
- **வரலாற்று செயல்பாடு (விருப்பமானது)**: சூட்சுடி வாரியான வரலாற்று செயல்பாட்டு தரவை சேர்க்க ஒரு வரலாற்று JSON கோப்பை வழங்கவும். வரலாற்று தரவுகள் வழங்கப்படவில்லை என்றால், அறிக்கை தானாகவே இந்தப் பிரிவை மறைத்து தனித்துவமான பிழைகளை மட்டுமே காட்டும்.
- **ஒருங்கிணைந்த வரலாற்று உருவாக்கம்**: JSON அறிக்கை உருவாக்கி இப்போது ஒருங்கிணைந்த வரலாற்று உருவாக்க அம்சத்தை உள்ளடக்கியது. `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` என்ற நிலையான முறையைப் பயன்படுத்தி, உங்கள் அறிக்கை அடைவில் உள்ள அனைத்து JSON அறிக்கை கோப்புகளையும் (`test-report-*.json` வடிவத்துடன் பொருந்துபவை) தானாகவே ஸ்கேன் செய்து, சோதனை முடிவுகளை ஒருங்கிணைத்து, வரலாற்று தரவின் அடிப்படையில் குறைபாட்டு ஒப்பீடுகளைக் கணக்கிடலாம். ஒருங்கிணைக்கப்பட்ட வரலாற்று பதிவு உங்கள் வரலாற்று கோப்புடன் இணைக்கப்பட்டு, HTML அறிக்கை உருவாக்கி காலப்போக்கில் போக்குகளை காட்சிப்படுத்த பயன்படுத்தலாம்.

## நிறுவல்

`wdio-json-html-reporter` தொகுப்பை நிறுவ, இந்த படிகளைப் பின்பற்றவும்:

### 1. தொகுப்பை நிறுவவும்

தொகுப்பை ஒரு மேம்பாட்டு சார்புநிலையாக நிறுவ பின்வரும் கட்டளையை இயக்கவும்:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. நிறுவலை சரிபார்க்கவும்

தொகுப்பு சரியாக நிறுவப்பட்டுள்ளதா என்பதை உறுதிப்படுத்த இதை இயக்கவும்:

```bash
npm list wdio-json-html-reporter
```

சரியாக நிறுவப்பட்டிருந்தால், நீங்கள் இது போன்ற வெளியீட்டைக் காணலாம்:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. WebDriverIO கட்டமைப்பைப் புதுப்பிக்கவும்

தனிப்பயன் அறிக்கை உருவாக்கியைச் சேர்க்க உங்கள் `wdio.conf.js` அல்லது `wdio.conf.ts` கோப்பை மாற்றவும்:

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. உங்கள் சோதனைகளை இயக்கவும்

உங்கள் WebDriverIO சோதனை தொகுப்பை இயக்கவும்:

```bash
npx wdio run wdio.conf.js
```

## CLI பயன்பாடு

WebDriverIO உடன் ஒருங்கிணைப்பதற்கு கூடுதலாக, உள்ளமைக்கப்பட்ட CLI ஐப் பயன்படுத்தி நேரடியாக HTML அறிக்கை உருவாக்கியை இயக்கலாம்.

**பயன்பாடு:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

எடுத்துக்காட்டாக, `test/reports/json-reports` என்ற கோப்புறையில் JSON கோப்புகள் இருந்து, `test/reports/report.html` என்ற பெயரில் HTML அறிக்கையை உருவாக்க விரும்பினால், நீங்கள் இயக்கலாம்:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

உங்களிடம் ஒரு வரலாற்று கோப்பும் (எ.கா., `test/reports/history.json`) இருந்தால், அதை விருப்ப நான்காவது அளவுருவாக சேர்க்கவும்:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**குறிப்பு:**  
CLI செயல்பாடு முதல் அளவுருவாக `generate-html` கட்டளையை அனுப்பும்போது மட்டுமே தூண்டப்படுகிறது. WebDriverIO (எ.கா., `wdio run wdio.conf.js` உடன்) மூலம் இயக்கும்போது, CLI தர்க்கம் புறக்கணிக்கப்படுகிறது.

## வரலாற்று விருப்பம் மற்றும் ஒருங்கிணைந்த வரலாற்று உருவாக்கம்

HTML அறிக்கை உருவாக்கி இப்போது **வரலாற்று விருப்பத்தை** ஆதரிக்கிறது. இது வரலாற்று செயல்பாட்டு தரவைக் கொண்ட JSON கோப்பை வழங்க அனுமதிக்கிறது, இது "சூட்சுடி வாரியான வரலாற்று செயல்பாடு" பிரிவில் அறிக்கையுடன் இணைக்கப்படுகிறது. வரலாற்று கோப்பு வழங்கப்பட்டு, செல்லுபடியாகும் தரவைக் கொண்டிருந்தால், அறிக்கை ஊடாடும் விளக்கப்படங்கள் மற்றும் ஒவ்வொரு சூட்சுடிக்கும் ஒரு அகார்டியன் உடன் வரலாற்று போக்குகளைக் காட்டும். வரலாற்று கோப்பு அனுப்பப்படவில்லை அல்லது கோப்பில் சூட்சுடி தரவு எதுவும் இல்லை என்றால், அறிக்கை தானாகவே வரலாற்று பிரிவை மறைத்து தனித்துவமான பிழைகளின் மேலோட்டத்தை மட்டுமே காட்டும்.

கூடுதலாக, JSON அறிக்கை உருவாக்கி இப்போது **ஒருங்கிணைந்த வரலாற்று உருவாக்க** அம்சத்தைக் கொண்டுள்ளது. `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` என்ற நிலையான முறையுடன், உங்கள் அறிக்கை அடைவில் உள்ள (`test-report-*.json` வடிவத்துடன் பொருந்தும்) அனைத்து JSON அறிக்கை கோப்புகளையும் தானாகவே ஸ்கேன் செய்து, சோதனை முடிவுகளை ஒருங்கிணைக்கலாம் (சோதனை எண்ணிக்கைகளைக் கூட்டி, சூட்சுடி தரவை இணைத்தல்), மற்றும் கடைசியாக ஒருங்கிணைக்கப்பட்ட பதிவுடன் ஒப்பிட்டு குறைபாட்டு ஒப்பீடுகளைக் கணக்கிடலாம். புதிதாக உருவாக்கப்பட்ட வரலாற்று பதிவு குறிப்பிட்ட வரலாற்று கோப்புடன் இணைக்கப்படுகிறது. இந்த ஒருங்கிணைக்கப்பட்ட வரலாற்று தரவு பின்னர் பல சோதனை ஓட்டங்களில் வரலாற்று செயல்பாட்டு உள்ளறிவுகளை வழங்க HTML அறிக்கை உருவாக்கியால் பயன்படுத்தப்படலாம்.

## திரைப்பிடிப்புகள்

### டாஷ்போர்டு  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### சோதனை முடிவுகள்  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### திரைப்பிடிப்புகள்  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### வடிகட்டிகள்  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel ஏற்றுமதி  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)