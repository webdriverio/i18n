---
id: cloudservices
title: கிளவுட் சேவைகளைப் பயன்படுத்துதல்
---

WebdriverIO உடன் Sauce Labs, Browserstack, TestingBot, LambdaTest அல்லது Perfecto போன்ற தேவை அடிப்படையிலான சேவைகளைப் பயன்படுத்துவது மிகவும் எளிதானது. நீங்கள் செய்ய வேண்டியதெல்லாம் உங்கள் விருப்பங்களில் உங்கள் சேவையின் `user` மற்றும் `key` ஐ அமைப்பது தான்.

விருப்பமாக, `build` போன்ற கிளவுட் குறிப்பிட்ட திறன்களை அமைப்பதன் மூலம் உங்கள் சோதனையை பரிமாணப்படுத்தலாம். நீங்கள் Travis இல் மட்டுமே கிளவுட் சேவைகளை இயக்க விரும்பினால், Travis இல் இருக்கிறீர்களா என்பதை சரிபார்க்க `CI` சுற்றுச்சூழல் மாறியைப் பயன்படுத்தலாம் மற்றும் கட்டமைப்பை அதற்கேற்ப மாற்றலாம்.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

உங்கள் சோதனைகளை [Sauce Labs](https://saucelabs.com) இல் தொலைநிலையில் இயக்குவதற்கு அமைக்கலாம்.

ஒரே தேவையென்னவென்றால் உங்கள் கட்டமைப்பில் `user` மற்றும் `key` ஐ (`wdio.conf.js` மூலம் ஏற்றுமதி செய்யப்பட்டது அல்லது `webdriverio.remote(...)` க்கு அனுப்பப்பட்டது) உங்கள் Sauce Labs பயனர்பெயர் மற்றும் அணுகல் விசைக்கு அமைக்க வேண்டும்.

நீங்கள் எந்த உலாவியின் திறன்களிலும் விசை/மதிப்பாக விருப்ப [சோதனை கட்டமைப்பு விருப்பத்தையும்](https://docs.saucelabs.com/dev/test-configuration-options/) அனுப்பலாம்.

### Sauce Connect

இணையத்தால் அணுக முடியாத சர்வரை எதிராக சோதனைகளை இயக்க விரும்பினால் (எ.கா `localhost` போன்றவற்றில்), நீங்கள் [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) ஐப் பயன்படுத்த வேண்டும்.

இதை ஆதரிப்பது WebdriverIO இன் நோக்கத்திற்கு அப்பாற்பட்டது, எனவே நீங்கள் அதை உங்களாகவே தொடங்க வேண்டும்.

WDIO சோதனை இயக்கியைப் பயன்படுத்துகிறீர்கள் என்றால், உங்கள் `wdio.conf.js` இல் [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) ஐப் பதிவிறக்கி கட்டமைக்கவும். இது Sauce Connect ஐ இயக்க உதவுகிறது மற்றும் உங்கள் சோதனைகளை Sauce சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

### Travis CI உடன்

எனினும், Travis CI ஒவ்வொரு சோதனைக்கும் முன் Sauce Connect ஐத் தொடங்குவதற்கு [ஆதரவைக் கொண்டுள்ளது](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect), எனவே அதற்கான வழிமுறைகளைப் பின்பற்றுவது ஒரு விருப்பமாகும்.

அவ்வாறு செய்தால், ஒவ்வொரு உலாவியின் `capabilities` இலும் `tunnel-identifier` சோதனை கட்டமைப்பு விருப்பத்தை அமைக்க வேண்டும். Travis இயல்பாக இதை `TRAVIS_JOB_NUMBER` சுற்றுச்சூழல் மாறிக்கு அமைக்கிறது.

மேலும், Sauce Labs உங்கள் சோதனைகளை உருவாக்க எண்ணால் குழுவாக்க விரும்பினால், `build` ஐ `TRAVIS_BUILD_NUMBER` க்கு அமைக்கலாம்.

இறுதியாக, நீங்கள் `name` ஐ அமைத்தால், இது Sauce Labs இல் இந்த உருவாக்கத்திற்கான சோதனையின் பெயரை மாற்றுகிறது. நீங்கள் WDIO சோதனை இயக்கியை [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) உடன் இணைந்து பயன்படுத்தினால், WebdriverIO தானாகவே சோதனைக்கு சரியான பெயரை அமைக்கும்.

`capabilities` உதாரணம்:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### காலநேரங்கள்

உங்கள் சோதனைகளை தொலைதூரத்தில் இயக்குவதால், சில காலநேரங்களை அதிகரிக்க வேண்டியிருக்கலாம்.

[செயலற்ற காலநேரத்தை](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) சோதனை கட்டமைப்பு விருப்பமாக `idle-timeout` ஐப் அனுப்புவதன் மூலம் மாற்றலாம். இது இணைப்பை மூடுவதற்கு முன் கட்டளைகளுக்கு இடையில் Sauce எவ்வளவு நேரம் காத்திருக்கும் என்பதைக் கட்டுப்படுத்துகிறது.

## BrowserStack

WebdriverIO க்கு [Browserstack](https://www.browserstack.com) ஒருங்கிணைப்பும் உள்ளிணைக்கப்பட்டுள்ளது.

ஒரே தேவையென்னவென்றால் உங்கள் கட்டமைப்பில் `user` மற்றும் `key` ஐ (`wdio.conf.js` மூலம் ஏற்றுமதி செய்யப்பட்டது அல்லது `webdriverio.remote(...)` க்கு அனுப்பப்பட்டது) உங்கள் Browserstack தானியங்கி பயனர்பெயர் மற்றும் அணுகல் விசைக்கு அமைக்க வேண்டும்.

நீங்கள் எந்த உலாவியின் திறன்களிலும் விசை/மதிப்பாக விருப்ப [ஆதரிக்கப்படும் திறன்களையும்](https://www.browserstack.com/automate/capabilities) அனுப்பலாம். நீங்கள் `browserstack.debug` ஐ `true` என அமைத்தால், அது அமர்வின் திரைக்காட்சியைப் பதிவுசெய்யும், இது உதவியாக இருக்கலாம்.

### உள்ளூர் சோதனை

இணையத்தால் அணுக முடியாத சர்வரை எதிராக சோதனைகளை இயக்க விரும்பினால் (எ.கா `localhost` போன்றவற்றில்), நீங்கள் [உள்ளூர் சோதனையைப்](https://www.browserstack.com/local-testing#command-line) பயன்படுத்த வேண்டும்.

இதை ஆதரிப்பது WebdriverIO இன் நோக்கத்திற்கு அப்பாற்பட்டது, எனவே நீங்கள் அதை உங்களாகவே தொடங்க வேண்டும்.

நீங்கள் உள்ளூரைப் பயன்படுத்தினால், உங்கள் திறன்களில் `browserstack.local` ஐ `true` என அமைக்க வேண்டும்.

WDIO சோதனை இயக்கியைப் பயன்படுத்துகிறீர்கள் என்றால், உங்கள் `wdio.conf.js` இல் [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) ஐப் பதிவிறக்கி கட்டமைக்கவும். இது BrowserStack ஐ இயக்க உதவுகிறது, மற்றும் உங்கள் சோதனைகளை BrowserStack சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

### Travis CI உடன்

Travis இல் உள்ளூர் சோதனையைச் சேர்க்க விரும்பினால், நீங்கள் அதை உங்களாகவே தொடங்க வேண்டும்.

பின்வரும் ஸ்கிரிப்ட் அதைப் பதிவிறக்கி பின்னணியில் தொடங்கும். சோதனைகளைத் தொடங்குவதற்கு முன் Travis இல் இதை இயக்க வேண்டும்.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

மேலும், `build` ஐ Travis உருவாக்க எண்ணிற்கு அமைக்க விரும்பலாம்.

`capabilities` உதாரணம்:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

ஒரே தேவையென்னவென்றால் உங்கள் கட்டமைப்பில் `user` மற்றும் `key` ஐ (`wdio.conf.js` மூலம் ஏற்றுமதி செய்யப்பட்டது அல்லது `webdriverio.remote(...)` க்கு அனுப்பப்பட்டது) உங்கள் [TestingBot](https://testingbot.com) பயனர்பெயர் மற்றும் ரகசிய விசைக்கு அமைக்க வேண்டும்.

நீங்கள் எந்த உலாவியின் திறன்களிலும் விசை/மதிப்பாக விருப்ப [ஆதரிக்கப்படும் திறன்களையும்](https://testingbot.com/support/other/test-options) அனுப்பலாம்.

### உள்ளூர் சோதனை

இணையத்தால் அணுக முடியாத சர்வரை எதிராக சோதனைகளை இயக்க விரும்பினால் (எ.கா `localhost` போன்றவற்றில்), நீங்கள் [உள்ளூர் சோதனையைப்](https://testingbot.com/support/other/tunnel) பயன்படுத்த வேண்டும். TestingBot இணையத்தில் இருந்து அணுக முடியாத இணையதளங்களை சோதிக்க உங்களை அனுமதிக்க ஜாவா அடிப்படையிலான டன்னலை வழங்குகிறது.

அவர்களின் டன்னல் ஆதரவு பக்கம் இதை இயக்குவதற்குத் தேவையான தகவல்களைக் கொண்டுள்ளது.

WDIO சோதனை இயக்கியைப் பயன்படுத்துகிறீர்கள் என்றால், உங்கள் `wdio.conf.js` இல் [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) ஐப் பதிவிறக்கி கட்டமைக்கவும். இது TestingBot ஐ இயக்க உதவுகிறது, மற்றும் உங்கள் சோதனைகளை TestingBot சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

## LambdaTest

[LambdaTest](https://www.lambdatest.com) ஒருங்கிணைப்பும் உள்ளிணைக்கப்பட்டுள்ளது.

ஒரே தேவையென்னவென்றால் உங்கள் கட்டமைப்பில் `user` மற்றும் `key` ஐ (`wdio.conf.js` மூலம் ஏற்றுமதி செய்யப்பட்டது அல்லது `webdriverio.remote(...)` க்கு அனுப்பப்பட்டது) உங்கள் LambdaTest கணக்கு பயனர்பெயர் மற்றும் அணுகல் விசைக்கு அமைக்க வேண்டும்.

நீங்கள் எந்த உலாவியின் திறன்களிலும் விசை/மதிப்பாக விருப்ப [ஆதரிக்கப்படும் திறன்களையும்](https://www.lambdatest.com/capabilities-generator/) அனுப்பலாம். நீங்கள் `visual` ஐ `true` என அமைத்தால், அது அமர்வின் திரைக்காட்சியைப் பதிவுசெய்யும், இது உதவியாக இருக்கலாம்.

### உள்ளூர் சோதனைக்கான டன்னல்

இணையத்தால் அணுக முடியாத சர்வரை எதிராக சோதனைகளை இயக்க விரும்பினால் (எ.கா `localhost` போன்றவற்றில்), நீங்கள் [உள்ளூர் சோதனையைப்](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/) பயன்படுத்த வேண்டும்.

இதை ஆதரிப்பது WebdriverIO இன் நோக்கத்திற்கு அப்பாற்பட்டது, எனவே நீங்கள் அதை உங்களாகவே தொடங்க வேண்டும்.

நீங்கள் உள்ளூரைப் பயன்படுத்தினால், உங்கள் திறன்களில் `tunnel` ஐ `true` என அமைக்க வேண்டும்.

WDIO சோதனை இயக்கியைப் பயன்படுத்துகிறீர்கள் என்றால், உங்கள் `wdio.conf.js` இல் [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) ஐப் பதிவிறக்கி கட்டமைக்கவும். இது LambdaTest ஐ இயக்க உதவுகிறது, மற்றும் உங்கள் சோதனைகளை LambdaTest சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

### Travis CI உடன்

Travis இல் உள்ளூர் சோதனையைச் சேர்க்க விரும்பினால், நீங்கள் அதை உங்களாகவே தொடங்க வேண்டும்.

பின்வரும் ஸ்கிரிப்ட் அதைப் பதிவிறக்கி பின்னணியில் தொடங்கும். சோதனைகளைத் தொடங்குவதற்கு முன் Travis இல் இதை இயக்க வேண்டும்.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

மேலும், `build` ஐ Travis உருவாக்க எண்ணிற்கு அமைக்க விரும்பலாம்.

`capabilities` உதாரணம்:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

wdio ஐ [`Perfecto`](https://www.perfecto.io) உடன் பயன்படுத்தும் போது, ஒவ்வொரு பயனருக்கும் பாதுகாப்பு டோக்கனை உருவாக்கி, இதை திறன்கள் கட்டமைப்பில் (பிற திறன்களுடன் சேர்த்து) சேர்க்க வேண்டும், பின்வருமாறு:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

இதற்கு கூடுதலாக, நீங்கள் கிளவுட் கட்டமைப்பைச் சேர்க்க வேண்டும், பின்வருமாறு:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```