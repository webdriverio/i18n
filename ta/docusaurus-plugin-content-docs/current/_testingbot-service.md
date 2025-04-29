---
id: testingbot-service
title: Testingbot சேவை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> TestingBot-உடன் சிறந்த ஒருங்கிணைப்பை வழங்கும் WebdriverIO சேவை. இது பணி மெட்டாடேட்டாவை ('name', 'passed', 'tags', 'public', 'build', 'extra') புதுப்பிக்கிறது மற்றும் தேவைப்பட்டால் TestingBot Tunnel-ஐ இயக்குகிறது.

## நிறுவல்

எளிதான வழி `@wdio/testingbot-service`-ஐ உங்கள் `package.json`-இல் devDependency-ஆக வைத்திருப்பது:

```sh
npm install @wdio/testingbot-service --save-dev
```

`WebdriverIO`-ஐ எவ்வாறு நிறுவுவது என்பது குறித்த வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு

இந்த சேவையைப் பயன்படுத்த, உங்கள் `wdio.conf.js` கோப்பில் `user` மற்றும் `key`-ஐ அமைக்க வேண்டும், மேலும் `hostname` விருப்பத்தை `hub.testingbot.com` என அமைக்க வேண்டும். நீங்கள் [TestingBot Tunnel](https://testingbot.com/support/other/tunnel)-ஐப் பயன்படுத்த விரும்பினால், `tbTunnel: true` என அமைக்க வேண்டும்.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## விருப்பங்கள்

TestingBot சேவையை அங்கீகரிக்க, உங்கள் கட்டமைப்பில் [`user`](https://webdriver.io/docs/options#user) மற்றும் [`key`](https://webdriver.io/docs/options#key) விருப்பங்கள் இருக்க வேண்டும்.

### tbTunnel
true எனில், இது TestingBot Tunnel-ஐ இயக்கி, உங்கள் உலாவி சோதனைகளை இயக்கும் TestingBot மெய்நிகர் இயந்திரத்திற்கும் இடையே பாதுகாப்பான இணைப்பைத் திறக்கிறது.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### tbTunnelOpts
TestingBot Tunnel விருப்பங்களைப் பயன்படுத்தவும் (எ.கா. போர்ட் எண் அல்லது logFile அமைப்புகளை மாற்ற). மேலும் தகவலுக்கு [இந்த பட்டியலைப்](https://github.com/testingbot/testingbot-tunnel-launcher) பார்க்கவும்.

வகை: `Object`<br />
இயல்புநிலை: `{}`