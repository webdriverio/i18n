---
id: jenkins
title: Jenkins
description: "Jenkins-இல் WebdriverIO சோதனைகளை இயக்கி, தோல்விகளை பிழைத்திருத்தவும் சோதனை வரலாற்றைக் கண்காணிக்கவும் JUnit reporter முடிவுகளை வெளியிடுங்கள்."
---

WebdriverIO, [Jenkins](https://jenkins-ci.org) போன்ற CI அமைப்புகளுடன் நெருக்கமான ஒருங்கிணைப்பை வழங்குகிறது. `junit` reporter மூலம், உங்கள் சோதனைகளை எளிதாகப் பிழைத்திருத்தம் செய்யலாம், அத்துடன் உங்கள் சோதனை முடிவுகளைக் கண்காணிக்கவும் முடியும். இந்த ஒருங்கிணைப்பு மிகவும் எளிதானது.

1. `junit` test reporter-ஐ நிறுவவும்: `$ npm install @wdio/junit-reporter --save-dev`)
1. Jenkins கண்டறியக்கூடிய இடத்தில் உங்கள் XUnit முடிவுகளைச் சேமிக்கும்படி உங்கள் config-ஐப் புதுப்பிக்கவும்,
    (மேலும் `junit` reporter-ஐக் குறிப்பிடவும்):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

எந்த framework-ஐத் தேர்ந்தெடுப்பது என்பது உங்கள் விருப்பம். அறிக்கைகள் ஒரே மாதிரியாக இருக்கும்.
இந்தப் பயிற்சிக்கு, நாம் Jasmine-ஐப் பயன்படுத்துவோம்.

சில சோதனைகளை எழுதிய பிறகு, நீங்கள் ஒரு புதிய Jenkins job-ஐ அமைக்கலாம். அதற்கு ஒரு பெயரையும் விளக்கத்தையும் கொடுங்கள்:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

பின்னர் அது எப்போதும் உங்கள் repository-இன் புதிய பதிப்பைப் பெறுவதை உறுதிசெய்யவும்:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**இப்போது முக்கியமான பகுதி:** shell கட்டளைகளை இயக்க ஒரு `build` படியை உருவாக்கவும். `build` படி உங்கள் project-ஐ build செய்ய வேண்டும். இந்த demo project ஒரு வெளிப்புற app-ஐ மட்டுமே சோதிப்பதால், நீங்கள் எதையும் build செய்ய வேண்டியதில்லை. node dependencies-ஐ நிறுவி, `npm test` கட்டளையை இயக்கினால் போதும் (இது `node_modules/.bin/wdio test/wdio.conf.js`-க்கான ஒரு alias ஆகும்).

நீங்கள் AnsiColor போன்ற ஒரு plugin-ஐ நிறுவியிருந்தும் logs இன்னும் வண்ணத்தில் காட்டப்படவில்லை என்றால், `FORCE_COLOR=1` என்ற environment variable உடன் சோதனைகளை இயக்கவும் (எ.கா., `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

உங்கள் சோதனைக்குப் பிறகு, Jenkins உங்கள் XUnit அறிக்கையைக் கண்காணிக்க வேண்டும் என்று நீங்கள் விரும்புவீர்கள். அதற்கு, _"Publish JUnit test result report"_ என்ற post-build action-ஐ நீங்கள் சேர்க்க வேண்டும்.

உங்கள் அறிக்கைகளைக் கண்காணிக்க ஒரு வெளிப்புற XUnit plugin-ஐயும் நீங்கள் நிறுவலாம். JUnit plugin அடிப்படை Jenkins நிறுவலுடனேயே வருகிறது, தற்போதைக்கு அதுவே போதுமானது.

config கோப்பின்படி, XUnit அறிக்கைகள் project-இன் root directory-இல் சேமிக்கப்படும். இந்த அறிக்கைகள் XML கோப்புகள் ஆகும். எனவே, அறிக்கைகளைக் கண்காணிக்க நீங்கள் செய்ய வேண்டியது எல்லாம், உங்கள் root directory-இல் உள்ள அனைத்து XML கோப்புகளையும் Jenkins-க்குச் சுட்டிக்காட்டுவதுதான்:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

அவ்வளவுதான்! உங்கள் WebdriverIO jobs-ஐ இயக்க நீங்கள் இப்போது Jenkins-ஐ அமைத்துவிட்டீர்கள். உங்கள் job இப்போது வரலாற்று வரைபடங்களுடன் கூடிய விரிவான சோதனை முடிவுகள், தோல்வியடைந்த jobs-இன் stacktrace தகவல்கள், மற்றும் ஒவ்வொரு சோதனையிலும் பயன்படுத்தப்பட்ட payload உடன் கூடிய கட்டளைகளின் பட்டியல் ஆகியவற்றை வழங்கும்.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")