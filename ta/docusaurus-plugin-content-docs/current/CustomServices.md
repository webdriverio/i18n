---
id: customservices
title: தனிப்பயன் சேவைகள்
---

WDIO சோதனை இயக்கியின் தேவைகளுக்கு ஏற்ப உங்கள் சொந்த தனிப்பயன் சேவையை நீங்கள் எழுதலாம்.

சேவைகள் என்பவை சோதனைகளை எளிமைப்படுத்த, உங்கள் சோதனை தொகுப்பை நிர்வகிக்க மற்றும் முடிவுகளை ஒருங்கிணைக்க உருவாக்கப்பட்ட மீண்டும் பயன்படுத்தக்கூடிய தர்க்கத்திற்கான கூடுதல் உள்ளீடுகள் ஆகும். `wdio.conf.js` இல் கிடைக்கும் அனைத்து [hooks](/docs/configurationfile) களையும் சேவைகள் அணுக முடியும்.

இரண்டு வகையான சேவைகளை வரையறுக்கலாம்: ஒரு சோதனை ஓட்டத்திற்கு ஒரு முறை மட்டுமே இயக்கப்படும் `onPrepare`, `onWorkerStart`, `onWorkerEnd` மற்றும் `onComplete` hook-களை மட்டுமே அணுகக்கூடிய ஒரு launcher சேவை, மற்றும் மற்ற அனைத்து hook-களையும் அணுகக்கூடிய ஒரு worker சேவை ஆகும். இது ஒவ்வொரு worker-க்கும் இயக்கப்படுகிறது. worker சேவைகள் வேறுபட்ட (worker) செயல்முறையில் இயங்குவதால், இரண்டு வகையான சேவைகளுக்கும் இடையே (உலகளாவிய) மாறிகளை பகிர முடியாது என்பதை கவனிக்கவும்.

ஒரு launcher சேவையை பின்வருமாறு வரையறுக்கலாம்:

```js
export default class CustomLauncherService {
    // If a hook returns a promise, WebdriverIO will wait until that promise is resolved to continue.
    async onPrepare(config, capabilities) {
        // TODO: something before all workers launch
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: something after the workers shutdown
    }

    // custom service methods ...
}
```

ஒரு worker சேவை பின்வருமாறு இருக்க வேண்டும்:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contains all options specific to the service
     * e.g. if defined as follows:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * this browser object is passed in here for the first time
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: something before all tests are run, e.g.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: something after all tests are run
    }

    beforeTest(test, context) {
        // TODO: something before each Mocha/Jasmine test run
    }

    beforeScenario(test, context) {
        // TODO: something before each Cucumber scenario run
    }

    // other hooks or custom service methods ...
}
```

constructor இல் அனுப்பப்பட்ட parameter மூலம் browser பொருளை சேமிப்பது பரிந்துரைக்கப்படுகிறது. இறுதியாக இரண்டு வகையான worker-களையும் பின்வருமாறு வெளிப்படுத்தவும்:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

நீங்கள் TypeScript ஐப் பயன்படுத்துகிறீர்கள் மற்றும் hook முறைகளின் அளவுருக்கள் type பாதுகாப்பானவை என்பதை உறுதிப்படுத்த விரும்பினால், உங்கள் சேவை வகுப்பை பின்வருமாறு வரையறுக்கலாம்:

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

## சேவை பிழை கையாளுதல்

ஒரு சேவை hook இன் போது ஏற்படும் பிழை பதிவுசெய்யப்படும், அதே நேரத்தில் இயக்கி தொடரும். உங்கள் சேவையில் உள்ள ஒரு hook சோதனை இயக்கியின் அமைப்பு அல்லது அகற்றலுக்கு முக்கியமானதாக இருந்தால், `webdriverio` தொகுப்பிலிருந்து வெளிப்படுத்தப்பட்ட `SevereServiceError` ஐப் பயன்படுத்தி இயக்கியை நிறுத்தலாம்.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: something critical for setup before all workers launch

        throw new SevereServiceError('Something went wrong.')
    }

    // custom service methods ...
}
```

## தொகுதியிலிருந்து சேவையை இறக்குமதி செய்தல்

இந்த சேவையைப் பயன்படுத்த இப்போது செய்ய வேண்டிய ஒரே விஷயம், அதை `services` பண்புக்கு ஒதுக்குவதாகும்.

உங்கள் `wdio.conf.js` கோப்பை இப்படி தோற்றமளிக்க மாற்றவும்:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * use imported service class
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * use absolute path to service
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## NPM இல் சேவையை வெளியிடுங்கள்

WebdriverIO சமூகத்தால் சேவைகளை எளிதாக பயன்படுத்தவும் கண்டுபிடிக்கவும், இந்த பரிந்துரைகளைப் பின்பற்றவும்:

* சேவைகள் இந்த பெயரிடும் மரபைப் பயன்படுத்த வேண்டும்: `wdio-*-service`
* NPM keywords பயன்படுத்தவும்: `wdio-plugin`, `wdio-service`
* `main` உள்ளீடு சேவையின் நிகழ்வை `export` செய்ய வேண்டும்
* உதாரண சேவைகள்: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

பரிந்துரைக்கப்பட்ட பெயரிடும் முறையைப் பின்பற்றுவது சேவைகளை பெயரால் சேர்க்க அனுமதிக்கிறது:

```js
// Add wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### வெளியிடப்பட்ட சேவையை WDIO CLI மற்றும் ஆவணங்களில் சேர்க்கவும்

மற்றவர்கள் சிறந்த சோதனைகளை இயக்க உதவக்கூடிய ஒவ்வொரு புதிய செருகுநிரலையும் நாங்கள் மிகவும் பாராட்டுகிறோம்! நீங்கள் அத்தகைய செருகுநிரலை உருவாக்கியிருந்தால், அதை எளிதில் கண்டுபிடிக்க எங்கள் CLI மற்றும் ஆவணங்களில் சேர்க்க பரிசீலிக்கவும்.

பின்வரும் மாற்றங்களுடன் ஒரு pull request ஐ உருவாக்கவும்:

- CLI தொகுதியில் உங்கள் சேவையை [ஆதரிக்கப்படும் சேவைகள்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) பட்டியலில் சேர்க்கவும்
- அதிகாரப்பூர்வ Webdriver.io பக்கத்தில் உங்கள் ஆவணங்களைச் சேர்ப்பதற்கு [சேவை பட்டியலை](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) மேம்படுத்தவும்