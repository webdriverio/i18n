---
id: wdio-docker-service
title: டாக்கர் சேவை
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service) பார்க்கவும்

இந்த சேவை [WebdriverIO](http://webdriver.io/) உடன் பயன்படுத்துவதற்காக உருவாக்கப்பட்டுள்ளது மற்றும் கன்டெய்னராக்கப்பட்ட பயன்பாடுகளுக்கு எதிராக/பயன்படுத்தி செயல்பாட்டு/ஒருங்கிணைப்பு சோதனைகளை இயக்க உதவுகிறது. இது பிரபலமான [Docker](https://www.docker.com/) சேவையை (தனியாக நிறுவப்பட்டது) கன்டெய்னர்களை இயக்க பயன்படுத்துகிறது.

## ஏன் இதை பயன்படுத்த வேண்டும்?
உங்கள் சோதனைகள் CI/CD பைப்லைன்களில் ஏதேனும் வகையில் இயங்க வேண்டும், அங்கு பெரும்பாலும் "உண்மையான" உலாவிகள் மற்றும் உங்கள் பயன்பாடு சார்ந்துள்ள பிற வளங்கள் இல்லை. Docker-ன் வருகையுடன், அனைத்து தேவையான பயன்பாட்டு சார்புகளையும் கன்டெய்னராக்கலாம்.
இந்த சேவையுடன் நீங்கள் உங்கள் பயன்பாட்டு கன்டெய்னர் அல்லது [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) ஐ உங்கள் CI-யில் மற்றும் முழுமையான தனிமைப்படுத்தலில் இயக்கலாம் 
(CI-யில் Docker ஒரு சார்பாக நிறுவப்பட்டிருக்கும் என்று கருதுவோம்). உங்கள் பயன்பாடு உங்கள் முக்கிய OS-இலிருந்து தனிமைப்படுத்தல் அளவை கொண்டிருக்க வேண்டுமென்றால் உள்ளூர் மேம்பாட்டிற்கும் இது பொருந்தும்.

## இது எவ்வாறு செயல்படுகிறது
சேவை ஏற்கனவே உள்ள docker இமேஜை இயக்கும், அது தயாரானதும், உங்கள் கன்டெய்னராக்கப்பட்ட பயன்பாட்டிற்கு எதிராக இயங்க வேண்டிய WebdriverIO சோதனைகளைத் தொடங்கும்.

## நிறுவல்

இயக்கவும்:

```bash
npm install wdio-docker-service --save-dev
```

WebdriverIO-வை எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகள் [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு
இயல்பாக, Google Chrome, Firefox மற்றும் PhantomJS ஆகியவை ஹோஸ்ட் சிஸ்டத்தில் நிறுவப்பட்டிருக்கும்போது கிடைக்கும். 
சேவையைப் பயன்படுத்த, உங்கள் சேவை வரிசையில் `docker` ஐச் சேர்க்க வேண்டும்:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## விருப்பங்கள்

### dockerOptions
Docker கன்டெய்னரை இயக்கத் தேவையான பல்வேறு விருப்பங்கள்

வகை: `Object`

இயல்பு: `{ 
    options: {
        rm: true
    }
}`

உதாரணம்:

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
Docker கன்டெய்னர் பெயர் டேக். உள்ளூர் அல்லது Docker HUB இலிருந்து இருக்கலாம்.

வகை: `String`

தேவை: `true`

### dockerOptions.healthCheck
சோதனைகளைத் தொடங்குவதற்கு முன் உங்கள் கன்டெய்னர்களின் தயார்நிலையைச் சரிபார்க்கும் கட்டமைப்பு. பொதுவாக இது localhost url ஆக இருக்கும்.
healthCheck கட்டமைக்கப்படவில்லை என்றால், Docker கன்டெய்னர் தொடங்கியவுடன் Webdriver சோதனைகளை இயக்கத் தொடங்கும், இது
Docker கன்டெய்னருக்குள் வலை சேவை தொடங்க நேரம் எடுக்கும் என்பதைக் கருத்தில் கொண்டு இது மிக விரைவாக இருக்கலாம்.

வகை: `String|Object`

Object பயன்பாட்டிற்கான விருப்பங்கள்:
- *url* - உங்கள் கன்டெய்னருக்குள் இயங்கும் பயன்பாட்டிற்கான url
- *maxRetries* - healthcheck தோல்வியடையும் வரை முயற்சிகளின் எண்ணிக்கை. இயல்பு: 10
- *inspectInterval* - ms இல் ஒவ்வொரு முயற்சிக்கும் இடையேயான இடைவெளி. இயல்பு: 500
- *startDelay* - ms இல் healthcheck தொடங்குவதற்கான ஆரம்ப தாமதம். இயல்பு: 0

உதாரணம் 1 (String): `healthCheck: 'http://localhost:4444'`

உதாரணம் 2 (Object):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
`docker run` கட்டளையால் பயன்படுத்தப்படும் விருப்பங்களின் வரைபடம். `run` கட்டளையைப் பற்றிய மேலும் விவரங்களுக்கு [இங்கே](https://docs.docker.com/edge/engine/reference/commandline/run/) கிளிக் செய்யவும்.

ஒற்றை எழுத்து விருப்பம் `-[option]` ஆக மாற்றப்படும் (i.e. `d: true` -> `-d`). 

இரண்டு அல்லது அதற்கு மேற்பட்ட எழுத்துக்களைக் கொண்ட எந்த விருப்பமும்
`--[option]` ஆக மாற்றப்படும் (i.e. `rm: true` -> `--rm`). 

ஒன்றுக்கு மேற்பட்ட முறை பயன்படுத்தக்கூடிய விருப்பங்களுக்கு
(i.e. `-e`,`-add-host`, `--expose`, போன்றவை), அணி குறியீட்டைப் பயன்படுத்தவும் (i.e. `e: ["NODE_ENV=development", "FOO=bar"]`).

வகை: `Object`

உதாரணம்:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
நீங்கள் கன்டெய்னருக்கு அனுப்ப விரும்பும் எந்த அளவுருக்களும். Docker run CLI இல் `[ARG...]` க்கு பொருந்தும்.

வகை: `String`

### dockerOptions.command
நீங்கள் கன்டெய்னருக்கு அனுப்ப விரும்பும் எந்த கட்டளையும். Docker run CLI இல் `[COMMAND]` க்கு பொருந்தும்.

வகை: `String`

### onDockerReady
Docker பயன்பாடு தயாராக இருக்கும்போது அழைக்கப்படும் ஒரு கால்பேக் முறை. `healthCheck` url ஐ பிங் செய்யும் திறனால் தயார்நிலை தீர்மானிக்கப்படுகிறது.

வகை: `Function`

### dockerLogs
Docker கன்டெய்னரிலிருந்து பதிவுகள் சேமிக்கப்பட வேண்டிய பாதை

வகை: `String`

## சோதனை பயன்பாட்டு வழக்குகள் / செய்முறைகள்
மேலும் விவரங்களுக்கு எங்கள் [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) ஐப் பார்வையிடவும்.