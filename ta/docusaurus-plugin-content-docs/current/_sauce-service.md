---
id: sauce-service
title: சாஸ் சேவை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO சேவை Sauce Labs உடன் சிறந்த ஒருங்கிணைப்பை வழங்குகிறது. இந்த சேவையை பின்வருவனவற்றிற்கு பயன்படுத்தலாம்:

- Sauce Labs மெய்நிகர் இயந்திர கிளவுட் (டெஸ்க்டாப் வெப்/எமுலேட்டர்/சிமுலேட்டர்)
- Sauce Labs உண்மை சாதன கிளவுட் (iOS மற்றும் ஆண்ட்ராய்டு)

இது வேலை மெட்டாடேட்டாவை ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') புதுப்பிக்க முடியும் மற்றும் தேவைப்பட்டால் Sauce Connect ஐ இயக்குகிறது.

இந்த சேவை உங்களுக்கு என்ன செய்யும்:

- இயல்பாக, Sauce சேவை வேலை தொடங்கும்போது வேலையின் 'name' ஐ புதுப்பிக்கும். இது உங்களுக்கு எந்த நேரத்திலும் பெயரை புதுப்பிக்க விருப்பத்தை வழங்கும்.
- நீங்கள் `setJobName` அளவுருவை வரையறுத்து உங்கள் திறன்கள், விருப்பங்கள் மற்றும் டெஸ்ட் சூட் தலைப்பின்படி வேலை பெயரை தனிப்பயனாக்கலாம்
- Sauce சேவை தோல்வியடைந்த சோதனையின் பிழை ஸ்டேக்கை Sauce Labs கட்டளைகளின் தாவலுக்கு அனுப்பும்
- இது [Sauce Connect](https://docs.saucelabs.com/secure-connections/) ஐ தானாகவே உள்ளமைக்கவும் இயக்கவும் அனுமதிக்கும்
- மேலும் இது உங்கள் கட்டளை பட்டியலில் சூழல் புள்ளிகளை அமைக்கும், இது எந்த சோதனையில் எந்த கட்டளைகள் செயல்படுத்தப்பட்டன என்பதை அடையாளம் காண உதவும்

## நிறுவல்

எளிதான வழி `@wdio/sauce-service` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பது:

```sh
npm install @wdio/sauce-service --save-dev
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகள் [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## உள்ளமைவு

மெய்நிகர் டெஸ்க்டாப்/எமுலேட்டர்/சிமுலேட்டர் இயந்திரம் மற்றும் உண்மை சாதன கிளவுட்டிற்கான சேவையைப் பயன்படுத்த, உங்கள் `wdio.conf.js` கோப்பில் `user` மற்றும் `key` ஐ அமைக்க வேண்டும். இது தானாகவே Sauce Labs ஐப் பயன்படுத்தி உங்கள் ஒருங்கிணைப்பு சோதனைகளை இயக்கும். நீங்கள் உங்கள் சோதனைகளை Sauce Labs இல் இயக்கினால், `region` பண்பு மூலம் நீங்கள் சோதனைகளை இயக்க விரும்பும் பிராந்தியத்தைக் குறிப்பிடலாம். பிராந்தியங்களுக்கான கிடைக்கக்கூடிய குறுகிய கையாளுதல்கள் `us` (இயல்பு) மற்றும் `eu`. இந்த பிராந்தியங்கள் Sauce Labs VM கிளவுட் மற்றும் Sauce Labs உண்மை சாதன கிளவுட்டிற்குப் பயன்படுத்தப்படுகின்றன. நீங்கள் பிராந்தியத்தை வழங்கவில்லை என்றால், இது இயல்பாக `us` ஆக அமைக்கப்படும்.

WebdriverIO தானாகவே [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) டன்னலை இயக்க வேண்டுமென்றால், `sauceConnect: true` என அமைக்க வேண்டும். நீங்கள் டேட்டா சென்டரை EU க்கு மாற்ற விரும்பினால், `region:'eu'` சேர்க்கவும், US டேட்டா சென்டர் இயல்பாக அமைக்கப்பட்டுள்ளது.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // அல்லது 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

நீங்கள் ஏற்கனவே உள்ள Sauce Connect டன்னலைப் பயன்படுத்த விரும்பினால், `tunnelName` மட்டுமே வழங்க வேண்டும். நீங்கள் பகிரப்பட்ட டன்னலைப் பயன்படுத்துகிறீர்கள், மற்றும் நீங்கள் டன்னலை உருவாக்கிய பயனர் அல்ல என்றால், உங்கள் சோதனைக்கு அதைப் பயன்படுத்த டன்னலை உருவாக்கிய Sauce Labs பயனரை அடையாளம் காண வேண்டும். திறன்களில் `tunnelOwner` ஐ இவ்வாறு சேர்க்கவும்:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## சாஸ் சேவை விருப்பங்கள்

Sauce Labs சேவையை அங்கீகரிக்க உங்கள் உள்ளமைவில் [`user`](https://webdriver.io/docs/options#user) மற்றும் [`key`](https://webdriver.io/docs/options#key) விருப்பம் இருக்க வேண்டும்.

### maxErrorStackLength

இந்த சேவை சோதனை தோல்வியடையும்போது பிழை ஸ்டாக்கை Sauce Labs க்கு தானாகவே அனுப்பும். இயல்பாக, இது முதல் 5 வரிகளை மட்டுமே அனுப்பும், ஆனால் தேவைப்பட்டால் இதை மாற்றலாம். அதிக வரிகள் அதிக WebDriver அழைப்புகளை ஏற்படுத்தி செயல்பாட்டை மெதுவாக்கலாம் என்பதை கவனிக்கவும்.

வகை: `number`<br />
இயல்பு: `5`

### sauceConnect

`true` என்றால், இது Sauce Connect ஐ இயக்கி உங்கள் உலாவி சோதனைகளை இயக்கும் Sauce Labs மெய்நிகர் இயந்திரத்திற்கும் இடையே பாதுகாப்பான இணைப்பைத் திறக்கும்.

வகை: `Boolean`<br />
இயல்பு: `false`

### sauceConnectOpts

Sauce Connect விருப்பங்களைப் பயன்படுத்துங்கள் (உதாரணமாக, போர்ட் எண் அல்லது logFile அமைப்புகளை மாற்ற). மேலும் தகவலுக்கு [இந்த பட்டியலைப்](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) பார்க்கவும்.

குறிப்பு: விருப்பங்களைக் குறிப்பிடும்போது `--` விடப்பட வேண்டும். இதை camelCase (எ.கா. `shared-tunnel` அல்லது `sharedTunnel`) ஆகவும் மாற்றலாம்.

வகை: `Object`<br />
இயல்பு: `{ }`

### uploadLogs

`true` என்றால், இந்த விருப்பம் அனைத்து WebdriverIO பதிவு கோப்புகளையும் மேலும் ஆய்வுக்காக Sauce Labs தளத்திற்கு பதிவேற்றுகிறது. உங்கள் wdio உள்ளமைவில் கோப்புகளில் பதிவுகளை எழுத [`outputDir`](https://webdriver.io/docs/options#outputdir) அமைக்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள், இல்லையெனில் தரவு stdout க்கு ஸ்ட்ரீம் செய்யப்பட்டு பதிவேற்ற முடியாது.

வகை: `Boolean`<br />
இயல்பு: `true`

### setJobName

பயனர்கள் WebdriverIO உள்ளமைவு, பயன்படுத்தப்பட்ட திறன்கள் மற்றும் அசல் சூட் தலைப்பு போன்ற பணியாளர் அளவுருக்களின் அடிப்படையில் வேலை பெயரை இயக்கமாக அமைக்க அனுமதிக்கிறது.

வகை: `Function`<br />
இயல்பு: `(config, capabilities, suiteTitle) => suiteTitle`

----

## உருவாக்கப்பட்ட பெயர் மெட்டாடேட்டாவை மேலெழுதுதல்

இந்த சேவை ஒவ்வொரு சோதனைக்கும் சூட் பெயர், உலாவி பெயர் மற்றும் பிற தகவல்களிலிருந்து ஒரு பெயரை தானாகவே உருவாக்குகிறது.

விரும்பிய திறன் `name` க்கு ஒரு மதிப்பை வழங்குவதன் மூலம் நீங்கள் இதை மாற்றலாம், ஆனால் இது அனைத்து சோதனைகளுக்கும் ஒரே பெயரைக் கொடுக்கும் என்பதை கவனிக்கவும்.

----

WebdriverIO பற்றிய மேலும் தகவலுக்கு [முகப்புப் பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.