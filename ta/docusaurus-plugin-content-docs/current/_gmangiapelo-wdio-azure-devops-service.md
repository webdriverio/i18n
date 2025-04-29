---
id: gmangiapelo-wdio-azure-devops-service
title: Azure DevOps டெஸ்ட் பிளான்ஸ் சேவை
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service) ஐப் பார்க்கவும்

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[WebdriverIO](https://webdriver.io/) முடிவுகளை Azure DevOps டெஸ்ட் பிளான்ஸில் வெளியிடுகிறது.

முக்கிய அம்சங்கள்:

* Jasmine/Jest/Mocha மற்றும் Cucumber இயக்க கட்டமைப்புகளுக்கான ஆதரவு
* நீங்கள் அதிக spec(test) கோப்புகளை இயக்கி, அவை ஒரே suite-ஐச் சேர்ந்தவையாக இருந்தால், சோதனை முடிவுகள் ஒரே சோதனை ஓட்டத்தின் கீழ் திரட்டப்படுகின்றன
* ஒற்றை சோதனை செயல்பாட்டிற்குப் பிறகு முடிவுகள் உடனடியாக அறிக்கையிடப்படுகின்றன (நிகழ்நேர அறிக்கை)
* கடைசி spec(test) கோப்பு முடிந்தவுடன் சோதனை ஓட்டம் மூடப்படும்
* பல suite ஆதரவு


## நிறுவல்

(dev-)சார்புநிலையாகப் பயன்படுத்த பின்வரும் கட்டளையுடன் இந்த தொகுதியை உள்ளூரில் நிறுவவும்:

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே.](https://webdriver.io/docs/gettingstarted) காணலாம்.

## பயன்பாடு

> _wdio-azure-devops-service_ **NodeJS 8 அல்லது அதற்கு மேற்பட்டதை** ஆதரிக்கிறது

> _wdio-azure-devops-service_ **commonjs** மற்றும் **esm** ஆகியவற்றை ஆதரிக்கிறது

### கட்டமைப்பு

`@gmangiapelo/wdio-azure-devops-service` ஒரு சேவையாக இருப்பதால், உங்கள் `wdio.conf.js` கோப்பில் பின்வருமாறு அமைக்கலாம்

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### சோதனை வழக்கு அமைப்பு

உங்கள் WDIO சோதனைகள் உங்கள் Azure சோதனை வழக்கின் ID-ஐ உள்ளடக்க வேண்டும். உங்கள் சோதனை வழக்கு ID-கள் உங்கள் சோதனை தலைப்புகளிலிருந்து வேறுபட்டதாக இருப்பதை உறுதிப்படுத்தவும்:

**Mocha style:**
```Javascript
// Good:
it("C123 Can authenticate a valid user", ...

// Bad:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Cucumber style:**
```Gherkin
## Good:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Bad:
@c123stringTest
Scenario Can authenticate a valid user
```

### Azure DevOps அறிக்கை உதாரணம்

இது ஒரு சோதனை இயக்கத்தின் போது AZ Test Plans இல் தள்ளப்பட்ட முடிவுகளுக்கான உதாரணம்
![AzureDevops Test Plans example](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## சேவை விருப்பங்கள்

### pat

API அனுமதியுடன் Azure DevOps இல் உருவாக்கப்பட்ட தனிப்பட்ட அணுகல் டோக்கன்.

உதாரணம்: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

வகை: `string`

தேவை: `true`

### organizationUrl

உங்கள் Azure DevOps நிறுவனத்தின் அடிப்படை url.

உதாரணம்: `"https://dev.azure.com/gianlucamangiapelo"`

வகை: `string`

தேவை: `true`

### projectId

Azure DevOps இல் உள்ள திட்டத்தின் அடையாளம்.

projectId-ஐக் கண்டறிய `GET {organizationUrl}/_apis/projects?api-version=6.0` பயன்படுத்தி பொருத்தமான `id`-ஐ நகலெடுக்கவும்.

உதாரணம்: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

வகை: `string`

தேவை: `true`

### planId

Azure DevOps Test Plan பிரிவில் நீங்கள் பெறக்கூடிய சோதனை plainId.

உதாரணம்: `124`

வகை: `integer`

தேவை: `true`

### suiteId

Azure DevOps Test Plan பிரிவில் நீங்கள் பெறக்கூடிய suiteId, இணைக்கப்பட்ட suite-களின் சந்தர்ப்பத்தில், root suiteId-ஐப் பெறவும், சேவை அனைத்து குழந்தை suite-களின் மீதும் செயல்படுகிறது.

உதாரணம்: `21`

வகை: `integer`

தேவை: `true`

### runName

சோதனை ஓட்டத்திற்கான விளக்கமான பெயர்.

உதாரணம்: `"FE regression tests run"`

வகை: `string`

தேவை: `true`

### caseIdRegex

டேக் அல்லது தலைப்பு சோதனை வழக்கிலிருந்து testCaseId-ஐப் பொருத்துவதற்கான தனிப்பயன் வழக்கமான வெளிப்பாடு.

வகை: `string`

இயல்புநிலை: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

தேவை: `false`

## ஆசிரியர்
ஜியான்லுகா மாங்கியாபெலோ - [github](https://github.com/gianlucamangiapelo)