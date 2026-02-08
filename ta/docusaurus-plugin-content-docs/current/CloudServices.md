---
id: cloudservices
title: கிளவுட் சேவைகளைப் பயன்படுத்துதல்
---

WebdriverIO-வுடன் Sauce Labs, Browserstack, TestingBot, TestMu AI (முன்னர் LambdaTest) அல்லது Perfecto போன்ற தேவைக்கேற்ப சேவைகளைப் பயன்படுத்துவது மிகவும் எளிதானது. நீங்கள் செய்ய வேண்டியது உங்கள் விருப்பங்களில் உங்கள் சேவையின் `user` மற்றும் `key` அமைப்பதுதான்.

விருப்பமாக, நீங்கள் `build` போன்ற கிளவுட்-குறிப்பிட்ட திறன்களை அமைப்பதன் மூலம் உங்கள் சோதனையை அளவுருக்களுடன் செய்யலாம். நீங்கள் Travis-இல் மட்டும் கிளவுட் சேவைகளை இயக்க விரும்பினால், Travis-இல் இருக்கிறீர்களா என்பதை சரிபார்க்க `CI` சூழல் மாறியைப் பயன்படுத்தி அதற்கேற்ப கட்டமைப்பை மாற்றலாம்.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

உங்கள் சோதனைகளை [Sauce Labs](https://saucelabs.com)-இல் தொலைநிலையில் இயக்க அமைக்கலாம்.

ஒரே தேவை உங்கள் கட்டமைப்பில் (ஏற்றுமதி செய்யப்பட்ட `wdio.conf.js` அல்லது `webdriverio.remote(...)`-க்கு அனுப்பப்பட்ட) `user` மற்றும் `key`-ஐ உங்கள் Sauce Labs பயனர்பெயர் மற்றும் அணுகல் விசையாக அமைக்க வேண்டும்.

எந்த உலாவிக்கும் திறன்களில் விசை/மதிப்பாக ஏதேனும் விருப்ப [சோதனை கட்டமைப்பு விருப்பத்தை](https://docs.saucelabs.com/dev/test-configuration-options/) நீங்கள் அனுப்பலாம்.

### Sauce Connect

இணையத்திற்கு அணுகமுடியாத சர்வரை எதிராக சோதனைகளை இயக்க விரும்பினால் (எ.கா., `localhost` போன்றவற்றில்), நீங்கள் [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) ஐப் பயன்படுத்த வேண்டும்.

இதை ஆதரிப்பது WebdriverIO-வின் நோக்கத்திற்கு அப்பாற்பட்டது, எனவே நீங்கள் அதை உங்கள் சொந்தமாகத் தொடங்க வேண்டும்.

நீங்கள் WDIO சோதனை இயக்கியைப் பயன்படுத்தினால், உங்கள் `wdio.conf.js`-இல் [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) பதிவிறக்கம் செய்து கட்டமைக்கவும். இது Sauce Connect ஐ இயக்க உதவுகிறது மற்றும் உங்கள் சோதனைகளை Sauce சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

### Travis CI உடன்

இருப்பினும், Travis CI ஒவ்வொரு சோதனைக்கும் முன் Sauce Connect ஐத் தொடங்குவதற்கான [ஆதரவை](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) கொண்டுள்ளது, எனவே அதற்கான வழிமுறைகளைப் பின்பற்றுவது ஒரு விருப்பமாகும்.

அவ்வாறு செய்தால், ஒவ்வொரு உலாவியின் `capabilities`-இலும் `tunnel-identifier` சோதனை கட்டமைப்பு விருப்பத்தை அமைக்க வேண்டும். Travis இயல்பாக இதை `TRAVIS_JOB_NUMBER` சுற்றுச்சூழல் மாறிக்கு அமைக்கிறது.

மேலும், Sauce Labs உங்கள் சோதனைகளை உருவாக்க எண்ணால் குழுவாக்க விரும்பினால், `build`-ஐ `TRAVIS_BUILD_NUMBER`-க்கு அமைக்கலாம்.

இறுதியாக, நீங்கள் `name` அமைத்தால், இது இந்த உருவாக்கத்திற்கான Sauce Labs-இல் இந்த சோதனையின் பெயரை மாற்றுகிறது. நீங்கள் WDIO சோதனை இயக்கியை [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) உடன் பயன்படுத்தினால், WebdriverIO தானாகவே சோதனைக்கு சரியான பெயரை அமைக்கும்.

`capabilities` எடுத்துக்காட்டு:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### நேர முடிவுகள்

நீங்கள் உங்கள் சோதனைகளை தொலைநிலையில் இயக்குவதால், சில நேர முடிவுகளை அதிகரிக்க வேண்டியிருக்கலாம்.

நீங்கள் `idle-timeout` ஐ சோதனை கட்டமைப்பு விருப்பமாக அனுப்புவதன் மூலம் [idle timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) மாற்றலாம். இது இணைப்பை மூடும் முன் கட்டளைகளுக்கு இடையில் Sauce எவ்வளவு நேரம் காத்திருக்கும் என்பதைக் கட்டுப்படுத்துகிறது.

## BrowserStack

WebdriverIO ஒரு [Browserstack](https://www.browserstack.com) ஒருங்கிணைப்பைக் கொண்டுள்ளது.

ஒரே தேவை உங்கள் கட்டமைப்பில் (ஏற்றுமதி செய்யப்பட்ட `wdio.conf.js` அல்லது `webdriverio.remote(...)`-க்கு அனுப்பப்பட்ட) `user` மற்றும் `key`-ஐ உங்கள் Browserstack தானியக்க பயனர்பெயர் மற்றும் அணுகல் விசையாக அமைக்க வேண்டும்.

எந்த உலாவிக்கும் திறன்களில் விசை/மதிப்பாக ஏதேனும் விருப்ப [ஆதரிக்கப்படும் திறன்களை](https://www.browserstack.com/automate/capabilities) நீங்கள் அனுப்பலாம். நீங்கள் `browserstack.debug`-ஐ `true` என அமைத்தால், அது அமர்வின் திரைப்பதிவை பதிவு செய்யும், இது உதவியாக இருக்கலாம்.

### உள்ளூர் சோதனை

இணையத்திற்கு அணுகமுடியாத சர்வரை எதிராக சோதனைகளை இயக்க விரும்பினால் (எ.கா., `localhost` போன்றவற்றில்), நீங்கள் [உள்ளூர் சோதனை](https://www.browserstack.com/local-testing#command-line) ஐப் பயன்படுத்த வேண்டும்.

இதை ஆதரிப்பது WebdriverIO-வின் நோக்கத்திற்கு அப்பாற்பட்டது, எனவே நீங்கள் அதை உங்கள் சொந்தமாகத் தொடங்க வேண்டும்.

நீங்கள் உள்ளூர் சோதனையைப் பயன்படுத்தினால், உங்கள் திறன்களில் `browserstack.local`-ஐ `true` என அமைக்க வேண்டும்.

நீங்கள் WDIO சோதனை இயக்கியைப் பயன்படுத்தினால், உங்கள் `wdio.conf.js`-இல் [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) பதிவிறக்கம் செய்து கட்டமைக்கவும். இது BrowserStack ஐ இயக்க உதவுகிறது, மற்றும் உங்கள் சோதனைகளை BrowserStack சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

### Travis CI உடன்

Travis-இல் உள்ளூர் சோதனையைச் சேர்க்க விரும்பினால், நீங்கள் அதை உங்கள் சொந்தமாகத் தொடங்க வேண்டும்.

பின்வரும் ஸ்கிரிப்ட் அதைப் பதிவிறக்கம் செய்து பின்னணியில் தொடங்கும். நீங்கள் சோதனைகளைத் தொடங்குவதற்கு முன் Travis-இல் இதை இயக்க வேண்டும்.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

மேலும், நீங்கள் `build`-ஐ Travis உருவாக்க எண்ணாக அமைக்க விரும்பலாம்.

`capabilities` எடுத்துக்காட்டு:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

ஒரே தேவை உங்கள் கட்டமைப்பில் (ஏற்றுமதி செய்யப்பட்ட `wdio.conf.js` அல்லது `webdriverio.remote(...)`-க்கு அனுப்பப்பட்ட) `user` மற்றும் `key`-ஐ உங்கள் [TestingBot](https://testingbot.com) பயனர்பெயர் மற்றும் ரகசிய விசையாக அமைக்க வேண்டும்.

எந்த உலாவிக்கும் திறன்களில் விசை/மதிப்பாக ஏதேனும் விருப்ப [ஆதரிக்கப்படும் திறன்களை](https://testingbot.com/support/other/test-options) நீங்கள் அனுப்பலாம்.

### உள்ளூர் சோதனை

இணையத்திற்கு அணுகமுடியாத சர்வரை எதிராக சோதனைகளை இயக்க விரும்பினால் (எ.கா., `localhost` போன்றவற்றில்), நீங்கள் [உள்ளூர் சோதனை](https://testingbot.com/support/other/tunnel) ஐப் பயன்படுத்த வேண்டும். TestingBot இணையத்திலிருந்து அணுக முடியாத வலைத்தளங்களை சோதிக்க அனுமதிக்க ஜாவா அடிப்படையிலான டன்னலை வழங்குகிறது.

இதை இயக்கத் தேவையான தகவல்களை அவர்களின் டன்னல் ஆதரவுப் பக்கம் கொண்டுள்ளது.

நீங்கள் WDIO சோதனை இயக்கியைப் பயன்படுத்தினால், உங்கள் `wdio.conf.js`-இல் [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) பதிவிறக்கம் செய்து கட்டமைக்கவும். இது TestingBot ஐ இயக்க உதவுகிறது, மற்றும் உங்கள் சோதனைகளை TestingBot சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

## TestMu AI (முன்னர் LambdaTest)

[TestMu AI](https://www.testmuai.com/) ஒருங்கிணைப்பும் உள்ளமைக்கப்பட்டுள்ளது.

ஒரே தேவை உங்கள் கட்டமைப்பில் (ஏற்றுமதி செய்யப்பட்ட `wdio.conf.js` அல்லது `webdriverio.remote(...)`-க்கு அனுப்பப்பட்ட) `user` மற்றும் `key`-ஐ உங்கள் TestMu AI கணக்கு பயனர்பெயர் மற்றும் அணுகல் விசையாக அமைக்க வேண்டும்.

எந்த உலாவிக்கும் திறன்களில் விசை/மதிப்பாக ஏதேனும் விருப்ப [ஆதரிக்கப்படும் திறன்களை](https://www.testmuai.com/capabilities-generator/) நீங்கள் அனுப்பலாம். நீங்கள் `visual`-ஐ `true` என அமைத்தால், அது அமர்வின் திரைப்பதிவை பதிவு செய்யும், இது உதவியாக இருக்கலாம்.

### உள்ளூர் சோதனைக்கான டன்னல்

இணையத்திற்கு அணுகமுடியாத சர்வரை எதிராக சோதனைகளை இயக்க விரும்பினால் (எ.கா., `localhost` போன்றவற்றில்), நீங்கள் [உள்ளூர் சோதனை](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/) ஐப் பயன்படுத்த வேண்டும்.

இதை ஆதரிப்பது WebdriverIO-வின் நோக்கத்திற்கு அப்பாற்பட்டது, எனவே நீங்கள் அதை உங்கள் சொந்தமாகத் தொடங்க வேண்டும்.

நீங்கள் உள்ளூர் சோதனையைப் பயன்படுத்தினால், உங்கள் திறன்களில் `tunnel`-ஐ `true` என அமைக்க வேண்டும்.

நீங்கள் WDIO சோதனை இயக்கியைப் பயன்படுத்தினால், உங்கள் `wdio.conf.js`-இல் [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) பதிவிறக்கம் செய்து கட்டமைக்கவும். இது TestMu AI ஐ இயக்க உதவுகிறது, மற்றும் உங்கள் சோதனைகளை TestMu AI சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

### Travis CI உடன்

Travis-இல் உள்ளூர் சோதனையைச் சேர்க்க விரும்பினால், நீங்கள் அதை உங்கள் சொந்தமாகத் தொடங்க வேண்டும்.

பின்வரும் ஸ்கிரிப்ட் அதைப் பதிவிறக்கம் செய்து பின்னணியில் தொடங்கும். நீங்கள் சோதனைகளைத் தொடங்குவதற்கு முன் Travis-இல் இதை இயக்க வேண்டும்.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

மேலும், நீங்கள் `build`-ஐ Travis உருவாக்க எண்ணாக அமைக்க விரும்பலாம்.

`capabilities` எடுத்துக்காட்டு:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

wdio-வை [`Perfecto`](https://www.perfecto.io) உடன் பயன்படுத்தும்போது, ஒவ்வொரு பயனருக்கும் பாதுகாப்பு டோக்கனை உருவாக்கி அதை திறன்கள் கட்டமைப்பில் (மற்ற திறன்களுடன் சேர்த்து) சேர்க்க வேண்டும், பின்வருமாறு:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

மேலும், கிளவுட் கட்டமைப்பை சேர்க்க வேண்டும், பின்வருமாறு:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```