---
id: customservices
title: தனிப்பயன் சேவைகள்
description: "டெஸ்ட்ரன்னர் ஹூக்குகளைப் பயன்படுத்தி WDIO டெஸ்ட்ரன்னருக்கான தனிப்பயன் launcher அல்லது worker சேவையை எழுதுங்கள், சேவைப் பிழைகளைக் கையாளுங்கள் மற்றும் அதை NPM-இல் வெளியிடுங்கள்."
---

உங்கள் தேவைகளுக்கு ஏற்ப WDIO டெஸ்ட் ரன்னருக்கான உங்கள் சொந்த தனிப்பயன் சேவையை நீங்கள் எழுதலாம்.

சேவைகள் என்பவை சோதனைகளை எளிமைப்படுத்தவும், உங்கள் டெஸ்ட் தொகுப்பை நிர்வகிக்கவும், முடிவுகளை ஒருங்கிணைக்கவும் மீண்டும் பயன்படுத்தக்கூடிய லாஜிக்கிற்காக உருவாக்கப்பட்ட கூடுதல் இணைப்புகள் (add-ons) ஆகும். `wdio.conf.js`-இல் கிடைக்கும் அதே அனைத்து [ஹூக்குகளையும்](/docs/configurationfile) சேவைகள் அணுக முடியும்.

இரண்டு வகையான சேவைகளை வரையறுக்கலாம்: ஒரு டெஸ்ட் ஓட்டத்திற்கு ஒருமுறை மட்டுமே இயக்கப்படும் `onPrepare`, `onWorkerStart`, `onWorkerEnd` மற்றும் `onComplete` ஹூக்குகளை மட்டுமே அணுகக்கூடிய launcher சேவை, மற்றும் மற்ற அனைத்து ஹூக்குகளையும் அணுகக்கூடிய, ஒவ்வொரு worker-க்கும் இயக்கப்படும் worker சேவை. worker சேவைகள் வேறொரு (worker) செயல்முறையில் இயங்குவதால், இரண்டு வகையான சேவைகளுக்கு இடையே (global) மாறிகளைப் பகிர முடியாது என்பதைக் கவனத்தில் கொள்ளவும்.

ஒரு launcher சேவையைப் பின்வருமாறு வரையறுக்கலாம்:

```js
export default class CustomLauncherService {
    // ஒரு ஹூக் promise-ஐத் திருப்பி அனுப்பினால், தொடர்வதற்கு முன் அந்த promise தீர்க்கப்படும் வரை WebdriverIO காத்திருக்கும்.
    async onPrepare(config, capabilities) {
        // TODO: அனைத்து workers தொடங்குவதற்கு முன் ஏதாவது
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: workers நிறுத்தப்பட்ட பிறகு ஏதாவது
    }

    // தனிப்பயன் சேவை முறைகள் ...
}
```

அதேசமயம் ஒரு worker சேவை இவ்வாறு இருக்க வேண்டும்:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` சேவைக்குரிய அனைத்து விருப்பங்களையும் கொண்டுள்ளது
     * எ.கா. பின்வருமாறு வரையறுக்கப்பட்டால்:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * `serviceOptions` அளவுரு இவ்வாறு இருக்கும்: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * இந்த browser பொருள் முதல் முறையாக இங்கே அனுப்பப்படுகிறது
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: அனைத்து சோதனைகளும் இயக்கப்படுவதற்கு முன் ஏதாவது, எ.கா.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: அனைத்து சோதனைகளும் இயக்கப்பட்ட பிறகு ஏதாவது
    }

    beforeTest(test, context) {
        // TODO: ஒவ்வொரு Mocha/Jasmine சோதனை இயக்கத்திற்கும் முன் ஏதாவது
    }

    beforeScenario(test, context) {
        // TODO: ஒவ்வொரு Cucumber காட்சி (scenario) இயக்கத்திற்கும் முன் ஏதாவது
    }

    // பிற ஹூக்குகள் அல்லது தனிப்பயன் சேவை முறைகள் ...
}
```

constructor-இல் அனுப்பப்படும் அளவுருவின் மூலம் browser பொருளைச் சேமிப்பது பரிந்துரைக்கப்படுகிறது. இறுதியாக இரண்டு வகையான workers-ஐயும் பின்வருமாறு வெளிப்படுத்தவும் (expose):

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

நீங்கள் TypeScript பயன்படுத்துகிறீர்கள் மற்றும் ஹூக் முறைகளின் அளவுருக்கள் type safe ஆக இருப்பதை உறுதிசெய்ய விரும்பினால், உங்கள் சேவை வகுப்பை (class) பின்வருமாறு வரையறுக்கலாம்:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## நிபந்தனை Worker சேவைகள்

ஒரு டெஸ்ட் ஓட்டத்திற்கோ அல்லது ஒரு குறிப்பிட்ட worker-க்கோ அதன் worker குறியீடு தேவையா என்பதை ஒரு சேவை தீர்மானிக்கலாம். இரண்டு விருப்பச் சோதனைகள் உள்ளன:

| சோதனை | எங்கே இயங்குகிறது | அளவுருக்கள் | `false` திருப்பி அனுப்புவதன் விளைவு |
| --- | --- | --- | --- |
| பெயரிடப்பட்ட module export `shouldLoad` | Launcher செயல்முறை, சேவை module-ஐ இறக்குமதி செய்த பிறகு | உள்ளமைவு (configuration), உள்ளமைக்கப்பட்ட அனைத்து capabilities | சேவை module எந்த worker-இலும் இறக்குமதி செய்யப்படாது. அதன் launcher சேவை இன்னும் இயங்கும். |
| நிலையான (static) worker சேவை முறை `shouldRun` | Worker செயல்முறை, சேவையை உருவாக்குவதற்கு முன் | சேவை விருப்பங்கள், அந்த worker-இன் capabilities, உள்ளமைவு | worker சேவை உருவாக்கப்படாது, எனவே அதன் எந்த ஹூக்கும் அந்த worker-இல் இயங்காது. |

பெயர் அல்லது பாதை மூலம் உள்ளமைக்கப்பட்ட சேவை modules-க்கு `shouldLoad(config, capabilities)` ஐப் பயன்படுத்தவும். இது தொகுப்பு முழுவதற்குமான (package-wide) முடிவாகும்: ஒரே சேவை வெவ்வேறு விருப்பங்களுடன் ஒன்றுக்கு மேற்பட்ட முறை தோன்றினால், அதன் முடிவு அந்த அனைத்து உள்ளீடுகளுக்கும் பொருந்தும். எடுத்துக்காட்டாக, remote நற்சான்றுகள் (credentials) தேவைப்படும் ஒரு தனிப்பயன் சேவை இவ்வாறு export செய்யலாம்:

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

ஒவ்வொரு சேவை உள்ளீட்டிற்கும் worker-க்கும் தனித்தனியாகத் தீர்மானிக்க `static shouldRun(options, capabilities, config)` ஐப் பயன்படுத்தவும். `services`-இல் நேரடியாக அனுப்பப்படும் தனிப்பயன் சேவை வகுப்புகளுடனும் இது செயல்படும். எடுத்துக்காட்டாக, இந்தச் சேவை அதன் ஹூக்குகளை உள்ளமைக்கப்பட்ட ஒரு browser-க்கு மட்டுப்படுத்தலாம்:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // shouldRun-இல் தேர்ச்சி பெற்ற workers-இல் மட்டுமே இயங்கும்.
    }
}
```

`services: [['custom', { browserName: 'chrome' }]]` உடன், தொகுப்பின் `shouldLoad` சோதனையும் அனுமதித்தால், இந்த worker சேவை Chrome capabilities-க்கு மட்டுமே உருவாக்கப்படும். `shouldRun` ஐ அழைக்க worker சேவை module-ஐ இறக்குமதி செய்ய வேண்டும்; இந்த முறையிலிருந்து `false` திருப்பி அனுப்புவது அந்த இறக்குமதியைத் தடுக்காது அல்லது launcher சேவையைப் பாதிக்காது.

இரண்டு சோதனைகளும் ஒரு boolean அல்லது boolean-இன் promise-ஐத் திருப்பி அனுப்பலாம். WebdriverIO ஒவ்வொரு முடிவுக்கும் காத்திருக்கும், மேலும் `false` மட்டுமே ஏற்றுதல் அல்லது உருவாக்குதலை முடக்கும். இந்தச் சோதனைகள் இல்லாத சேவைகள் அவற்றின் தற்போதைய நடத்தையைத் தக்கவைத்துக் கொள்ளும். ஹூக்குகளைக் கொண்ட ஏற்கனவே உருவாக்கப்பட்ட சேவைப் பொருள்கள் மாற்றமின்றி இருக்கும்.

ஏதேனும் ஒரு சோதனை பிழையை எறிந்தால் (throw) அல்லது நிராகரித்தால் (reject), சேவையை அடையாளம் காட்டும் பிழையுடன் சேவை துவக்கம் தோல்வியடையும். இது கீழே விவரிக்கப்பட்டுள்ள, சேவை ஹூக்குகளால் எறியப்படும் பிழைகளிலிருந்து வேறுபட்டது.

## சேவைப் பிழை கையாளுதல்

ஒரு சேவை ஹூக்கின் போது எறியப்படும் Error பதிவு செய்யப்படும், ஆனால் runner தொடர்ந்து இயங்கும். உங்கள் சேவையில் உள்ள ஒரு ஹூக் டெஸ்ட் ரன்னரின் அமைப்பு (setup) அல்லது முடிப்பிற்கு (teardown) முக்கியமானதாக இருந்தால், runner-ஐ நிறுத்த `webdriverio` தொகுப்பிலிருந்து வெளிப்படுத்தப்படும் `SevereServiceError` ஐப் பயன்படுத்தலாம்.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: அனைத்து workers தொடங்குவதற்கு முன் அமைப்பிற்கு முக்கியமான ஏதாவது

        throw new SevereServiceError('Something went wrong.')
    }

    // தனிப்பயன் சேவை முறைகள் ...
}
```

## Module-இலிருந்து சேவையை இறக்குமதி செய்தல்

இந்தச் சேவையைப் பயன்படுத்த இப்போது செய்ய வேண்டிய ஒரே விஷயம், அதை `services` பண்பிற்கு ஒதுக்குவதுதான்.

உங்கள் `wdio.conf.js` கோப்பை இவ்வாறு மாற்றவும்:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * இறக்குமதி செய்யப்பட்ட சேவை வகுப்பைப் பயன்படுத்தவும்
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * சேவைக்கான முழுமையான (absolute) பாதையைப் பயன்படுத்தவும்
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## NPM-இல் சேவையை வெளியிடுதல்

WebdriverIO சமூகம் சேவைகளை எளிதாகப் பயன்படுத்தவும் கண்டறியவும், தயவுசெய்து இந்தப் பரிந்துரைகளைப் பின்பற்றவும்:

* சேவைகள் இந்தப் பெயரிடல் மரபைப் பயன்படுத்த வேண்டும்: `wdio-*-service`
* NPM முக்கியச் சொற்களைப் பயன்படுத்தவும்: `wdio-plugin`, `wdio-service`
* `main` நுழைவு சேவையின் ஒரு நிகழ்வை (instance) `export` செய்ய வேண்டும்
* எடுத்துக்காட்டு சேவைகள்: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

பரிந்துரைக்கப்பட்ட பெயரிடல் முறையைப் பின்பற்றுவது சேவைகளைப் பெயர் மூலம் சேர்க்க அனுமதிக்கிறது:

```js
// wdio-custom-service ஐச் சேர்க்கவும்
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### வெளியிடப்பட்ட சேவையை WDIO CLI மற்றும் ஆவணங்களில் சேர்த்தல்

மற்றவர்கள் சிறந்த சோதனைகளை இயக்க உதவக்கூடிய ஒவ்வொரு புதிய plugin-ஐயும் நாங்கள் மிகவும் பாராட்டுகிறோம்! நீங்கள் அத்தகைய plugin-ஐ உருவாக்கியிருந்தால், அதை எளிதாகக் கண்டறிய எங்கள் CLI மற்றும் ஆவணங்களில் சேர்ப்பதைக் கருத்தில் கொள்ளவும்.

பின்வரும் மாற்றங்களுடன் ஒரு pull request-ஐ உருவாக்கவும்:

- CLI module-இல் உள்ள [ஆதரிக்கப்படும் சேவைகள்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) பட்டியலில் உங்கள் சேவையைச் சேர்க்கவும்
- அதிகாரப்பூர்வ Webdriver.io பக்கத்தில் உங்கள் ஆவணங்களைச் சேர்க்க [சேவைப் பட்டியலை](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json) மேம்படுத்தவும்