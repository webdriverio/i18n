---
id: docker
title: Docker
description: "இயந்திரங்கள் முழுவதும் சீரான முடிவுகளுக்காக, முன்பே நிறுவப்பட்ட உலாவியுடன் கூடிய Docker கன்டெய்னருக்குள் உங்கள் WebdriverIO சோதனைத் தொகுப்பை இயக்கவும்."
---

Docker என்பது ஒரு சக்திவாய்ந்த கன்டெய்னரைசேஷன் தொழில்நுட்பமாகும். இது உங்கள் சோதனைத் தொகுப்பை ஒவ்வொரு கணினியிலும் ஒரே மாதிரியாக செயல்படும் ஒரு கன்டெய்னருக்குள் அடக்க அனுமதிக்கிறது. இது வெவ்வேறு உலாவி அல்லது தளப் பதிப்புகளால் ஏற்படும் நிலையற்ற தன்மையைத் தவிர்க்க உதவும். உங்கள் சோதனைகளை ஒரு கன்டெய்னருக்குள் இயக்க, உங்கள் திட்டக் கோப்பகத்தில் ஒரு `Dockerfile` ஐ உருவாக்கவும், எ.கா.:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # உங்கள் தேவைகளுக்கு ஏற்ப உலாவி மற்றும் பதிப்பை மாற்றவும்
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

உங்கள் Docker image இல் உங்கள் `node_modules` ஐ சேர்க்கவில்லை என்பதை உறுதிசெய்து, image ஐ உருவாக்கும்போது அவற்றை நிறுவவும். அதற்காக பின்வரும் உள்ளடக்கத்துடன் ஒரு `.dockerignore` கோப்பைச் சேர்க்கவும்:

```
node_modules
```

:::info
Selenium மற்றும் Google Chrome முன்பே நிறுவப்பட்ட ஒரு Docker image ஐ இங்கே பயன்படுத்துகிறோம். வெவ்வேறு உலாவி அமைப்புகள் மற்றும் உலாவிப் பதிப்புகளுடன் பல்வேறு images கிடைக்கின்றன. Selenium திட்டத்தால் பராமரிக்கப்படும் images ஐ [Docker Hub இல்](https://hub.docker.com/u/selenium) பார்க்கவும்.
:::

எங்கள் Docker கன்டெய்னரில் Google Chrome ஐ headless பயன்முறையில் மட்டுமே இயக்க முடியும் என்பதால், அதை உறுதிசெய்ய எங்கள் `wdio.conf.js` ஐ மாற்ற வேண்டும்:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

[Automation Protocols](/docs/automationProtocols) இல் குறிப்பிட்டுள்ளபடி, WebDriver protocol அல்லது WebDriver BiDi protocol ஐப் பயன்படுத்தி WebdriverIO ஐ இயக்கலாம். உங்கள் image இல் நிறுவப்பட்ட Chrome பதிப்பு, உங்கள் `package.json` இல் நீங்கள் வரையறுத்துள்ள [Chromedriver](https://www.npmjs.com/package/chromedriver) பதிப்புடன் பொருந்துகிறதா என்பதை உறுதிசெய்யவும்.

Docker கன்டெய்னரை உருவாக்க நீங்கள் இயக்கலாம்:

```sh
docker build -t mytest -f Dockerfile .
```

பின்னர் சோதனைகளை இயக்க, செயல்படுத்தவும்:

```sh
docker run -it mytest
```

Docker image ஐ எவ்வாறு கட்டமைப்பது என்பது பற்றிய மேலும் தகவலுக்கு, [Docker docs](https://docs.docker.com/) ஐப் பார்க்கவும்.