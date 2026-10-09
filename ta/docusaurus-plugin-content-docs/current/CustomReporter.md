---
id: customreporter
title: தனிப்பயன் ரிப்போர்ட்டர்
description: "@wdio/reporter அடிப்படையில் WDIO டெஸ்ட்ரன்னருக்கான தனிப்பயன் ரிப்போர்ட்டரை உருவாக்கி, ரன்னர் நிகழ்வுகளைக் கையாண்டு, அதை NPM-இல் வெளியிடுங்கள்."
---

உங்கள் தேவைகளுக்கு ஏற்ப WDIO டெஸ்ட் ரன்னருக்கான உங்கள் சொந்த தனிப்பயன் ரிப்போர்ட்டரை நீங்கள் எழுதலாம். அது எளிதானதும் கூட!

நீங்கள் செய்ய வேண்டியதெல்லாம், `@wdio/reporter` பேக்கேஜிலிருந்து இன்ஹெரிட் செய்யும் ஒரு node மாட்யூலை உருவாக்குவதுதான், அப்போதுதான் அது டெஸ்டிலிருந்து செய்திகளைப் பெற முடியும்.

அடிப்படை அமைப்பு இவ்வாறு இருக்க வேண்டும்:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * இயல்பாக ரிப்போர்ட்டரை அவுட்புட் ஸ்ட்ரீமில் எழுத வைக்கவும்
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

இந்த ரிப்போர்ட்டரைப் பயன்படுத்த, நீங்கள் செய்ய வேண்டியதெல்லாம் உங்கள் கட்டமைப்பில் உள்ள `reporter` பண்புக்கு அதை ஒதுக்குவதுதான்.


உங்கள் `wdio.conf.js` கோப்பு இவ்வாறு இருக்க வேண்டும்:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * இம்போர்ட் செய்யப்பட்ட ரிப்போர்ட்டர் கிளாஸைப் பயன்படுத்தவும்
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * ரிப்போர்ட்டருக்கான முழுமையான பாதையைப் பயன்படுத்தவும்
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

அனைவரும் பயன்படுத்தும் வகையில் ரிப்போர்ட்டரை NPM-இலும் வெளியிடலாம். மற்ற ரிப்போர்ட்டர்களைப் போலவே பேக்கேஜுக்கு `wdio-<reportername>-reporter` எனப் பெயரிட்டு, `wdio` அல்லது `wdio-reporter` போன்ற முக்கியச் சொற்களுடன் டேக் செய்யுங்கள்.

## நிகழ்வு கையாளி

டெஸ்டிங்கின் போது தூண்டப்படும் பல நிகழ்வுகளுக்கு நீங்கள் ஒரு நிகழ்வு கையாளியைப் பதிவு செய்யலாம். பின்வரும் அனைத்து கையாளிகளும் தற்போதைய நிலை மற்றும் முன்னேற்றம் பற்றிய பயனுள்ள தகவல்களுடன் கூடிய payload-களைப் பெறும்.

இந்த payload ஆப்ஜெக்ட்களின் கட்டமைப்பு நிகழ்வைப் பொறுத்தது, மேலும் அவை ஃப்ரேம்வொர்க்குகள் (Mocha, Jasmine, மற்றும் Cucumber) முழுவதும் ஒருங்கிணைக்கப்பட்டுள்ளன. நீங்கள் ஒரு தனிப்பயன் ரிப்போர்ட்டரைச் செயல்படுத்தியவுடன், அது அனைத்து ஃப்ரேம்வொர்க்குகளுக்கும் வேலை செய்ய வேண்டும்.

உங்கள் ரிப்போர்ட்டர் கிளாஸில் நீங்கள் சேர்க்கக்கூடிய அனைத்து மெத்தட்களும் பின்வரும் பட்டியலில் உள்ளன:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

மெத்தட் பெயர்களே அவற்றின் பொருளைத் தெளிவாக விளக்குகின்றன.

ஒரு குறிப்பிட்ட நிகழ்வில் எதையாவது அச்சிட, பேரன்ட் `WDIOReporter` கிளாஸ் வழங்கும் `this.write(...)` மெத்தடைப் பயன்படுத்தவும். இது உள்ளடக்கத்தை `stdout`-க்கோ அல்லது ஒரு லாக் கோப்புக்கோ (ரிப்போர்ட்டரின் விருப்பங்களைப் பொறுத்து) ஸ்ட்ரீம் செய்கிறது.

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

டெஸ்ட் செயல்பாட்டை நீங்கள் எந்த வகையிலும் தாமதப்படுத்த முடியாது என்பதைக் கவனிக்கவும்.

அனைத்து நிகழ்வு கையாளிகளும் synchronous ரொட்டீன்களை இயக்க வேண்டும் (இல்லையெனில் race conditions-ஐ எதிர்கொள்வீர்கள்).

ஒவ்வொரு நிகழ்விற்கும் நிகழ்வின் பெயரை அச்சிடும் ஒரு தனிப்பயன் ரிப்போர்ட்டர் உதாரணத்தைக் காணக்கூடிய [உதாரணப் பகுதியைப்](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) பார்க்க மறக்காதீர்கள்.

சமூகத்திற்குப் பயனுள்ளதாக இருக்கக்கூடிய ஒரு தனிப்பயன் ரிப்போர்ட்டரை நீங்கள் செயல்படுத்தியிருந்தால், அந்த ரிப்போர்ட்டரைப் பொதுமக்களுக்குக் கிடைக்கச் செய்ய ஒரு Pull Request செய்யத் தயங்காதீர்கள்!

மேலும், நீங்கள் WDIO டெஸ்ட்ரன்னரை `Launcher` இடைமுகம் வழியாக இயக்கினால், பின்வருமாறு ஒரு தனிப்பயன் ரிப்போர்ட்டரை ஃபங்ஷனாகப் பயன்படுத்த முடியாது:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // இது வேலை செய்யாது, ஏனெனில் CustomReporter serializable அல்ல
    reporters: ['dot', CustomReporter]
})
```

## `isSynchronised` ஆகும் வரை காத்திருத்தல்

தரவை அறிக்கையிட உங்கள் ரிப்போர்ட்டர் async செயல்பாடுகளை இயக்க வேண்டியிருந்தால் (எ.கா. லாக் கோப்புகள் அல்லது பிற assets பதிவேற்றம்), நீங்கள் அனைத்தையும் கணக்கிடும் வரை WebdriverIO ரன்னர் காத்திருக்கும்படி உங்கள் தனிப்பயன் ரிப்போர்ட்டரில் `isSynchronised` மெத்தடை ஓவர்ரைட் செய்யலாம். இதற்கான ஒரு உதாரணத்தை [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts)-இல் காணலாம்:

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * isSynchronised மெத்தடை ஓவர்ரைட் செய்யவும்
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * லாக் கோப்புகளை sync செய்யவும்
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * அனுப்பப்பட்ட லாக்குகளை லாக் பக்கெட்டிலிருந்து அகற்றவும்
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

இவ்வாறு, அனைத்து லாக் தகவல்களும் பதிவேற்றப்படும் வரை ரன்னர் காத்திருக்கும்.

## ரிப்போர்ட்டரை NPM-இல் வெளியிடுதல்

WebdriverIO சமூகம் ரிப்போர்ட்டரை எளிதாகப் பயன்படுத்தவும் கண்டறியவும், தயவுசெய்து இந்தப் பரிந்துரைகளைப் பின்பற்றவும்:

* சர்வீஸ்கள் இந்தப் பெயரிடல் மரபைப் பயன்படுத்த வேண்டும்: `wdio-*-reporter`
* NPM முக்கியச் சொற்களைப் பயன்படுத்தவும்: `wdio-plugin`, `wdio-reporter`
* `main` என்ட்ரி ரிப்போர்ட்டரின் ஒரு இன்ஸ்டன்ஸை `export` செய்ய வேண்டும்
* உதாரண ரிப்போர்ட்டர்: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

பரிந்துரைக்கப்பட்ட பெயரிடல் முறையைப் பின்பற்றுவது, சர்வீஸ்களைப் பெயரின் மூலம் சேர்க்க அனுமதிக்கிறது:

```js
// wdio-custom-reporter-ஐச் சேர்க்கவும்
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### வெளியிடப்பட்ட சர்வீஸை WDIO CLI மற்றும் ஆவணங்களில் சேர்த்தல்

மற்றவர்கள் சிறந்த டெஸ்ட்களை இயக்க உதவக்கூடிய ஒவ்வொரு புதிய பிளகினையும் நாங்கள் மிகவும் பாராட்டுகிறோம்! நீங்கள் அத்தகைய ஒரு பிளகினை உருவாக்கியிருந்தால், அதை எளிதாகக் கண்டறிய எங்கள் CLI மற்றும் ஆவணங்களில் சேர்ப்பதைக் கருத்தில் கொள்ளுங்கள்.

பின்வரும் மாற்றங்களுடன் ஒரு pull request-ஐ உருவாக்கவும்:

- CLI மாட்யூலில் உள்ள [ஆதரிக்கப்படும் ரிப்போர்ட்டர்களின்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) பட்டியலில் உங்கள் சர்வீஸைச் சேர்க்கவும்
- அதிகாரப்பூர்வ Webdriver.io பக்கத்தில் உங்கள் ஆவணங்களைச் சேர்க்க [ரிப்போர்ட்டர் பட்டியலை](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) மேம்படுத்தவும்