---
id: bamboo
title: Bamboo
description: "Atlassian Bamboo-வில் WebdriverIO சோதனைகளை இயக்கி, JUnit முடிவுகளை வெளியிடுங்கள், இதன்மூலம் ஒவ்வொரு build-க்கும் வெற்றிபெற்ற, தோல்வியடைந்த மற்றும் சரிசெய்யப்பட்ட சோதனைகளைக் கண்காணிக்கலாம்."
---

WebdriverIO, [Bamboo](https://www.atlassian.com/software/bamboo) போன்ற CI அமைப்புகளுடன் நெருக்கமான ஒருங்கிணைப்பை வழங்குகிறது. [JUnit](https://webdriver.io/docs/junit-reporter.html) அல்லது [Allure](https://webdriver.io/docs/allure-reporter.html) reporter மூலம், உங்கள் சோதனைகளை எளிதாக debug செய்யலாம், மேலும் உங்கள் சோதனை முடிவுகளைக் கண்காணிக்கலாம். இந்த ஒருங்கிணைப்பு மிகவும் எளிதானது.

1. JUnit test reporter-ஐ நிறுவவும்: `$ npm install @wdio/junit-reporter --save-dev`)
1. Bamboo கண்டுபிடிக்கக்கூடிய இடத்தில் உங்கள் JUnit முடிவுகளைச் சேமிக்கும்படி உங்கள் config-ஐப் புதுப்பிக்கவும் (மேலும் `junit` reporter-ஐக் குறிப்பிடவும்):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
குறிப்பு: *சோதனை முடிவுகளை root folder-இல் அல்லாமல் தனி folder-இல் வைத்திருப்பது எப்போதும் ஒரு நல்ல நடைமுறையாகும்.*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

அனைத்து frameworks-க்கும் அறிக்கைகள் ஒரே மாதிரியாக இருக்கும், நீங்கள் எதை வேண்டுமானாலும் பயன்படுத்தலாம்: Mocha, Jasmine அல்லது Cucumber.

இந்நேரத்தில், நீங்கள் சோதனைகளை எழுதி முடித்துவிட்டீர்கள், முடிவுகள் ```./testresults/``` folder-இல் உருவாக்கப்படுகின்றன, மேலும் உங்கள் Bamboo இயங்கிக்கொண்டிருக்கிறது என்று நாங்கள் நம்புகிறோம்.

## உங்கள் சோதனைகளை Bamboo-வில் ஒருங்கிணைக்கவும்

1. உங்கள் Bamboo project-ஐத் திறக்கவும்
    > ஒரு புதிய plan-ஐ உருவாக்கி, உங்கள் repository-ஐ இணைக்கவும் (அது எப்போதும் உங்கள் repository-இன் புதிய பதிப்பைச் சுட்டுவதை உறுதிசெய்யவும்) மற்றும் உங்கள் stages-ஐ உருவாக்கவும்

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    நான் default stage மற்றும் job-ஐப் பயன்படுத்துகிறேன். உங்கள் விஷயத்தில், நீங்கள் உங்கள் சொந்த stages மற்றும் jobs-ஐ உருவாக்கலாம்

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. உங்கள் testing job-ஐத் திறந்து, Bamboo-வில் உங்கள் சோதனைகளை இயக்க tasks-ஐ உருவாக்கவும்
    >**Task 1:** Source Code Checkout

    >**Task 2:** உங்கள் சோதனைகளை இயக்கவும் ```npm i && npm run test```. மேலே உள்ள commands-ஐ இயக்க நீங்கள் *Script* task மற்றும் *Shell Interpreter*-ஐப் பயன்படுத்தலாம் (இது சோதனை முடிவுகளை உருவாக்கி அவற்றை ```./testresults/``` folder-இல் சேமிக்கும்)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Task: 3** சேமிக்கப்பட்ட உங்கள் சோதனை முடிவுகளை parse செய்ய *jUnit Parser* task-ஐச் சேர்க்கவும். இங்கே சோதனை முடிவுகளின் directory-ஐக் குறிப்பிடவும் (நீங்கள் Ant style patterns-ஐயும் பயன்படுத்தலாம்)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    குறிப்பு: *உங்கள் test task தோல்வியடைந்தாலும் கூட, results parser task எப்போதும் இயக்கப்படுவதற்காக, அதை *Final* பிரிவில் வைத்திருப்பதை உறுதிசெய்யவும்*

    >**Task: 4** (விருப்பத்தேர்வு) உங்கள் சோதனை முடிவுகள் பழைய கோப்புகளுடன் கலக்காமல் இருப்பதை உறுதிசெய்ய, Bamboo-வில் வெற்றிகரமாக parse செய்த பிறகு ```./testresults/``` folder-ஐ நீக்க ஒரு task-ஐ உருவாக்கலாம். முடிவுகளை நீக்க ```rm -f ./testresults/*.xml``` போன்ற shell script-ஐயோ அல்லது முழு folder-ஐயும் நீக்க ```rm -r testresults```-ஐயோ சேர்க்கலாம்

மேலே உள்ள *rocket science* முடிந்ததும், plan-ஐ இயக்கத்திற்குக் கொண்டுவந்து (enable செய்து) அதை run செய்யவும். உங்கள் இறுதி வெளியீடு இப்படி இருக்கும்:

## வெற்றிகரமான சோதனை

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## தோல்வியடைந்த சோதனை

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## தோல்வியடைந்து சரிசெய்யப்பட்டது

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

ஆஹா!! அவ்வளவுதான். உங்கள் WebdriverIO சோதனைகளை Bamboo-வில் வெற்றிகரமாக ஒருங்கிணைத்துவிட்டீர்கள்.