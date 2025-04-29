---
id: docker
title: டாக்கர்
---

டாக்கர் என்பது ஒரு சக்திவாய்ந்த கன்டெய்னரைசேஷன் டெக்னாலஜி ஆகும், இது உங்கள் சோதனை தொகுப்பை ஒரு கன்டெய்னரில் உள்ளடக்க அனுமதிக்கிறது, இது எல்லா சிஸ்டம்களிலும் ஒரே மாதிரியாக செயல்படும். இது வெவ்வேறு பிரௌசர் அல்லது பிளாட்ஃபார்ம் பதிப்புகள் காரணமாக ஏற்படும் நிலையற்ற தன்மையை தவிர்க்க உதவும். உங்கள் சோதனைகளை ஒரு கன்டெய்னரில் இயக்க, உங்கள் திட்ட டைரக்டரியில் ஒரு `Dockerfile` உருவாக்கவும், எ.கா:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

உங்கள் `node_modules` உங்கள் டாக்கர் இமேஜில் சேர்க்கப்படவில்லை என்பதை உறுதிப்படுத்திக் கொண்டு, இமேஜை உருவாக்கும்போது அவற்றை நிறுவுங்கள். அதற்காக பின்வரும் உள்ளடக்கத்துடன் ஒரு `.dockerignore` கோப்பை சேர்க்கவும்:

```
node_modules
```

:::info
நாம் இங்கே Selenium மற்றும் Google Chrome முன்கூட்டியே நிறுவப்பட்ட ஒரு டாக்கர் இமேஜை பயன்படுத்துகிறோம். பல்வேறு பிரௌசர் அமைப்புகள் மற்றும் பிரௌசர் பதிப்புகளுடன் பல்வேறு இமேஜ்கள் உள்ளன. Selenium திட்டத்தால் பராமரிக்கப்படும் இமேஜ்களை [Docker Hub இல்](https://hub.docker.com/u/selenium) பார்க்கவும்.
:::

நமது டாக்கர் கன்டெய்னரில் Google Chrome ஐ ஹெட்லெஸ் மோடில் மட்டுமே இயக்க முடியும் என்பதால், அதை உறுதிப்படுத்த நமது `wdio.conf.js` ஐ மாற்றியமைக்க வேண்டும்:

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

[Automation Protocols](/docs/automationProtocols) இல் குறிப்பிட்டுள்ளபடி, WebDriver protocol அல்லது WebDriver BiDi protocol பயன்படுத்தி WebdriverIO ஐ இயக்கலாம். உங்கள் இமேஜில் நிறுவப்பட்ட Chrome பதிப்பு, உங்கள் `package.json` இல் வரையறுக்கப்பட்டுள்ள [Chromedriver](https://www.npmjs.com/package/chromedriver) பதிப்புடன் பொருந்துகிறதா என்பதை உறுதிசெய்துகொள்ளுங்கள்.

டாக்கர் கன்டெய்னரை உருவாக்க, நீங்கள் பின்வருமாறு இயக்கலாம்:

```sh
docker build -t mytest -f Dockerfile .
```

பின்னர் சோதனைகளை இயக்க, பின்வருமாறு செயல்படுத்தவும்:

```sh
docker run -it mytest
```

டாக்கர் இமேஜை எவ்வாறு கான்ஃபிகர் செய்வது என்பது பற்றிய மேலும் தகவலுக்கு, [Docker docs](https://docs.docker.com/) ஐப் பார்க்கவும்.