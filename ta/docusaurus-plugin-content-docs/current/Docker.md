---
id: docker
title: டாக்கர்
---

டாக்கர் (Docker) என்பது ஒரு சக்திவாய்ந்த கொள்கலனாக்க தொழில்நுட்பமாகும், இது உங்கள் சோதனைத் தொகுப்பை ஒரு கொள்கலனில் உள்ளடக்க அனுமதிக்கிறது, இது ஒவ்வொரு கணினியிலும் ஒரே மாதிரியாக செயல்படும். இது வெவ்வேறு உலாவி அல்லது தளப் பதிப்புகள் காரணமாக ஏற்படும் நிலையற்ற தன்மையைத் தவிர்க்க முடியும். உங்கள் சோதனைகளை ஒரு கொள்கலனுக்குள் இயக்க, உங்கள் திட்ட அடைவில் ஒரு `Dockerfile` உருவாக்கவும், எ.கா:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

உங்கள் `node_modules` உங்கள் டாக்கர் படத்தில் சேர்க்கப்படவில்லை என்பதை உறுதிசெய்து, படத்தை உருவாக்கும்போது இவை நிறுவப்பட்டிருக்க வேண்டும். அதற்காக பின்வரும் உள்ளடக்கத்துடன் ஒரு `.dockerignore` கோப்பைச் சேர்க்கவும்:

```
node_modules
```

:::info
நாங்கள் இங்கே Selenium மற்றும் Google Chrome முன்கூட்டியே நிறுவப்பட்ட ஒரு Docker படத்தைப் பயன்படுத்துகிறோம். வெவ்வேறு உலாவி அமைப்புகள் மற்றும் உலாவி பதிப்புகளுடன் பல்வேறு படங்கள் உள்ளன. Selenium திட்டத்தால் பராமரிக்கப்படும் படங்களை [Docker Hub இல்](https://hub.docker.com/u/selenium) பார்க்கவும்.
:::

நமது டாக்கர் கொள்கலனில் Google Chrome ஐ headless முறையில் மட்டுமே இயக்க முடியும் என்பதால், நாம் அதை உறுதிசெய்ய நமது `wdio.conf.js` ஐ மாற்ற வேண்டும்:

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

[Automation Protocols](/docs/automationProtocols) இல் குறிப்பிடப்பட்டுள்ளபடி, WebdriverIO ஐ WebDriver நெறிமுறை அல்லது WebDriver BiDi நெறிமுறையைப் பயன்படுத்தி இயக்கலாம். உங்கள் படத்தில் நிறுவப்பட்ட Chrome பதிப்பு, உங்கள் `package.json` இல் நீங்கள் வரையறுத்த [Chromedriver](https://www.npmjs.com/package/chromedriver) பதிப்புடன் பொருந்துகிறதா என்பதை உறுதிசெய்யவும்.

டாக்கர் கொள்கலனை உருவாக்க, நீங்கள் இயக்கலாம்:

```sh
docker build -t mytest -f Dockerfile .
```

பின்னர் சோதனைகளை இயக்க, இதை இயக்கவும்:

```sh
docker run -it mytest
```

டாக்கர் படத்தை எவ்வாறு கட்டமைப்பது என்பது குறித்த மேலும் தகவலுக்கு, [Docker docs](https://docs.docker.com/) ஐப் பார்க்கவும்.