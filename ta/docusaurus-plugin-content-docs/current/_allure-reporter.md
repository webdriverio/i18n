---
id: allure-reporter
title: அல்லூர் அறிக்கையாளர்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> A WebdriverIO reporter plugin to create [Allure Test Reports](https://allurereport.org/docs/webdriverio/).

![Allure Reporter Example](/img/allure.png)

## நிறுவல்

`@wdio/allure-reporter` ஐ உங்கள் `package.json` இல் devDependency ஆக சேர்ப்பதே எளிதான வழி.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

நீங்கள் இதனை எளிதாக செய்யலாம்:

```sh
npm install @wdio/allure-reporter --save-dev
```

## கட்டமைப்பு

உங்கள் wdio.conf.js கோப்பில் வெளியீட்டு அடைவை கட்டமைக்கவும்:

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir` இயல்பாக `./allure-results` என அமைக்கப்பட்டுள்ளது. சோதனை ஓட்டம் முடிந்த பிறகு, இந்த அடைவில் ஒவ்வொரு ஸ்பெக்கிற்கும் `.xml` கோப்பு மற்றும் பல `.txt` மற்றும் `.png` கோப்புகள் மற்றும் இணைப்புகள் உருவாக்கப்பட்டிருப்பதைக் காணலாம்.
- `disableWebdriverStepsReporting` - விருப்ப அளவுருவாகும் (இயல்பாக `false`), அறிக்கையாளருக்கு தனிப்பயன் படிகளை மட்டும் பதிவுசெய்ய.
- `issueLinkTemplate` - விருப்ப அளவுரு, சிக்கல் இணைப்பு முறையை குறிப்பிட. அறிக்கையாளர் `addIssue(value)` அழைப்பு அளவுருவில் குறிப்பிடப்பட்ட மதிப்புடன் `{}` இடத்தை மாற்றுவார். Cucumber பயன்படுத்தப்பட்டு, `issue` குறிச்சொல் எந்த நிலையிலும் அமைக்கப்பட்டிருந்தால் அதே தர்க்கம் பயன்படுத்தப்படும், அது அறிக்கையில் இணைப்பாக மாற்றப்படும். அளவுரு மதிப்பு உதாரணம்:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - விருப்ப அளவுரு, TMS (சோதனை மேலாண்மை அமைப்பு) இணைப்பு முறையை குறிப்பிட. அறிக்கையாளர் `addTestId(value)` அழைப்பு அளவுருவில் குறிப்பிடப்பட்ட மதிப்புடன் `{}` இடத்தை மாற்றுவார். Cucumber பயன்படுத்தப்பட்டு, `testId` குறிச்சொல் எந்த நிலையிலும் அமைக்கப்பட்டிருந்தால் அதே தர்க்கம் பயன்படுத்தப்படும், அது அறிக்கையில் இணைப்பாக மாற்றப்படும். அளவுரு மதிப்பு உதாரணம்:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - விருப்ப அளவுரு (இயல்பாக `false`), திரைப்பிடிப்புகளை அறிக்கையாளருக்கு இணைக்காமல் இருக்க.
- `useCucumberStepReporter` - விருப்ப அளவுரு (இயல்பாக `false`), cucumber பயன்படுத்தும்போது அறிக்கை படிநிலை அமைப்பை மாற்ற true என அமைக்கவும். உங்களுக்காக முயற்சித்து பாருங்கள்.
- `disableMochaHooks` - விருப்ப அளவுரு (இயல்பாக `false`), `before/after` ஸ்டாக்ட்ரேஸ்/திரைப்பிடிப்பு/முடிவு கொக்குகளை அல்லூர் அறிக்கையாளரில் பெறாமல் இருக்க true என அமைக்கவும்.
- `addConsoleLogs` - விருப்ப அளவுரு (இயல்பாக `false`), கன்சோல் பதிவுகளை படியிலிருந்து அறிக்கையாளருக்கு இணைக்க true என அமைக்கவும்.
- `reportedEnvironmentVars` (**வகை:** `Record<string, string>`) - அறிக்கையில் சூழல் மாறிகளைக் காட்ட இந்த விருப்பத்தை அமைக்கவும். இதை அமைப்பது உண்மையான சூழல் மாறிகளை மாற்றாது என்பதை கவனிக்கவும்.

## ஆதரிக்கப்படும் அல்லூர் API
* `addLabel(name, value)` - சோதனைக்கு தனிப்பயன் லேபிளை ஒதுக்கு
* `addFeature(featureName)` – சோதனைக்கு அம்சங்களை ஒதுக்கு
* `addStory(storyName)` – சோதனைக்கு பயனர் கதையை ஒதுக்கு
* `addSeverity(value)` – சோதனைக்கு தீவிரத்தை ஒதுக்கு, இந்த மதிப்புகளில் ஒன்றை ஏற்றுக்கொள்கிறது: blocker, critical, normal, minor, trivial
* `addTag(value)` – சோதனைக்கு டேக் லேபிளை ஒதுக்கு
* `addEpic(value)` – சோதனைக்கு எபிக் லேபிளை ஒதுக்கு
* `addOwner(value)` – சோதனைக்கு உரிமையாளர் லேபிளை ஒதுக்கு
* `addSuite(value)` – சோதனைக்கு ஒரு சூட் லேபிளை ஒதுக்கு
* `addSubSuite(value)` – சோதனைக்கு துணை சூட் லேபிளை ஒதுக்கு
* `addParentSuite(value)` – சோதனைக்கு பெற்றோர் சூட் லேபிளை ஒதுக்கு
* `addIssue(value)` – சோதனைக்கு சிக்கல் ஐடியை ஒதுக்கு
* `addAllureId(value)` – சோதனைக்கு அல்லூர் சோதனை ஆப்ஸ் ஐடி லேபிளை ஒதுக்கு
* `addTestId(value)` – சோதனைக்கு TMS சோதனை ஐடியை ஒதுக்கு
* ~~`addEnvironment(name, value)` ~~ – இனி வேலை செய்யாத ஒரு காலாவதியான செயல்பாடு. அதற்கு பதிலாக `reportedEnvironmentVars` பயன்படுத்தவும்
* `addAttachment(name, content, [type])` – சோதனைக்கு இணைப்பை சேமி.
    * `name` (*String*) - இணைப்பு பெயர்.
    * `content` – இணைப்பு உள்ளடக்கம்.
    * `type` (*String*, விருப்பமானது) – இணைப்பு MIME-வகை, இயல்பாக `text/plain` 
* `addArgument(name, value)` - சோதனைக்கு கூடுதல் வாதத்தை சேர்
* `addDescription(description, [type])` – சோதனைக்கு விளக்கத்தை சேர்.
    * `description` (*String*) - சோதனையின் விளக்கம்.
    * `type` (*String*, விருப்பமானது) – விளக்க வகை, இயல்பாக `text`. மதிப்புகள் ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - சோதனைக்கு படியை சேர்.
    * `title` (*String*) - படியின் பெயர்.
    * `content` (*String*, விருப்பமானது) - படி இணைப்பு
    * `name` (*String*, விருப்பமானது) - படி இணைப்பு பெயர், இயல்பாக `attachment`.
    * `status` (*String*, விருப்பமானது) - படி நிலை, இயல்பாக `passed`. "failed", "passed" அல்லது "broken" என இருக்க வேண்டும்
* `startStep(title)` - ஒரு படியுடன் தொடங்கு
    * `title` (*String*) - படியின் பெயர்.
* `endStep(status)` - ஒரு படியுடன் முடிவு
    * `status` (*String*, விருப்பமானது) - படி நிலை, இயல்பாக `passed`. "failed", "passed" அல்லது "broken" என இருக்க வேண்டும்
* `step(name, body)` - உள்ளே உள்ளடக்க செயல்பாட்டுடன் படி தொடங்குகிறது. முடிவற்ற படிநிலையுடன் படிகளை உருவாக்க அனுமதிக்கிறது
    * `body` (*Function*) - படி உடல் async செயல்பாடு

### பயன்பாடு
Allure Api ஐ பின்வருமாறு அணுகலாம்:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Mocha உதாரணம்

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

அடிப்படை Cucumber உதாரணம்:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### தனிப்பயன் படிகள்

`step` முறை படிகளை கையாள்வதை எளிதாக்குகிறது ஏனெனில் ஒவ்வொரு படியும் உள்ளே எந்த உள்ளடக்கத்துடனும் ஒரு async செயல்பாடாக வழங்கப்படுகிறது.
செயல்பாட்டின் முதல் அளவுரு தற்போதைய படி, அதில் அல்லூர் API முறைகளில் பெரும்பாலானவை உள்ளன (அதாவது `label`, `epic`, `attach` போன்றவை):

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### Cucumber குறிச்சொற்கள்

சிறப்பு பெயர்களுடன் (`issue` மற்றும் `testId`) Cucumber குறிச்சொற்கள் இணைப்புகளாக மாற்றப்படுகின்றன (அதற்கான இணைப்பு வார்ப்புருக்கள் முன்னரே கட்டமைக்கப்பட வேண்டும்):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

சிறப்பு பெயர்களுடன் (`feature`) Cucumber குறிச்சொற்கள் அல்லூர் லேபிள்களுக்கு வரைபடமாக்கப்படுகின்றன:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## அறிக்கையை காட்டுதல்

முடிவுகள் அல்லூர் வழங்கும் [அறிக்கை கருவிகள்](https://allurereport.org/) ஏதேனும் ஒன்றால் பயன்படுத்தப்படலாம். உதாரணமாக:

### கட்டளை-வரி

[Allure கட்டளை-வரி கருவியை](https://www.npmjs.com/package/allure-commandline) நிறுவி, முடிவுகள் அடைவை செயலாக்கவும்:

```sh
allure generate [allure_output_dir] && allure open
```

இது ஒரு அறிக்கையை உருவாக்கும் (இயல்பாக `./allure-report` இல்), மற்றும் அதை உங்கள் உலாவியில் திறக்கும்.

### தானியங்கி அறிக்கை உருவாக்கம்

Allure கட்டளை வரி கருவியை நிரலாக்க முறையில் பயன்படுத்தி அறிக்கையை தானாகவே உருவாக்கலாம். அதற்கு உங்கள் திட்டத்தில் தொகுப்பை நிறுவவும்:

```sh
npm i allure-commandline
```

பின்னர் உங்கள் `onComplete` கொக்கை சேர்க்கவும் அல்லது விரிவுபடுத்தவும் அல்லது இதற்காக [தனிப்பயன் சேவை](/docs/customservices) உருவாக்கவும்:

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

[Allure Jenkins plugin](https://allurereport.org/docs/integrations-jenkins/) ஐ நிறுவி கட்டமைக்கவும்

## திரைப்பிடிப்புகளை சேர்த்தல்

திரைப்பிடிப்புகளை Mocha மற்றும் Jasmine க்கான `afterTest` கொக்கில் அல்லது Cucumber க்கான `afterStep` கொக்கில் WebDriverIO இன் `takeScreenshot` செயல்பாட்டைப் பயன்படுத்தி அறிக்கையில் இணைக்கலாம்.
முதலில் அறிக்கையாளர் விருப்பங்களில் `disableWebdriverScreenshotsReporting: false` என அமைக்கவும், பின் afterStep கொக்கில் சேர்க்கவும்:

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

மேலே காட்டியுள்ளபடி, இந்த செயல்பாடு அழைக்கப்படும்போது, ஒரு திரைப்பிடிப்பு படம் அல்லூர் அறிக்கையில் இணைக்கப்படும்.