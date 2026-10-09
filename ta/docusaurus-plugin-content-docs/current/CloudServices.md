---
id: cloudservices
title: கிளவுட் சேவைகளைப் பயன்படுத்துதல்
description: "Sauce Labs, BrowserStack, TestingBot, TestMu AI (முன்பு LambdaTest), Perfecto மற்றும் பிற கிளவுட் வழங்குநர்களில் WebdriverIO சோதனைகளை இயக்குங்கள்."
---

Sauce Labs, Browserstack, TestingBot, TestMu AI (முன்பு LambdaTest) அல்லது Perfecto போன்ற தேவைக்கேற்ற சேவைகளை WebdriverIO உடன் பயன்படுத்துவது மிகவும் எளிது. உங்கள் விருப்பங்களில் (options) உங்கள் சேவையின் `user` மற்றும் `key` ஐ அமைப்பது மட்டுமே நீங்கள் செய்ய வேண்டியது.

விருப்பமாக, `build` போன்ற கிளவுட்-சார்ந்த capabilities ஐ அமைப்பதன் மூலம் உங்கள் சோதனையை அளவுருப்படுத்தலாம். Travis இல் மட்டும் கிளவுட் சேவைகளை இயக்க விரும்பினால், நீங்கள் Travis இல் இருக்கிறீர்களா என்பதைச் சரிபார்க்க `CI` சூழல் மாறியைப் பயன்படுத்தி, அதற்கேற்ப config ஐ மாற்றலாம்.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

உங்கள் சோதனைகளை [Sauce Labs](https://saucelabs.com) இல் தொலைநிலையாக இயங்கும்படி அமைக்கலாம்.

உங்கள் config இல் (`wdio.conf.js` மூலம் ஏற்றுமதி செய்யப்பட்டது அல்லது `webdriverio.remote(...)` க்குள் அனுப்பப்பட்டது) `user` மற்றும் `key` ஐ உங்கள் Sauce Labs பயனர்பெயர் மற்றும் அணுகல் விசைக்கு அமைப்பது மட்டுமே ஒரே தேவை.

எந்த உலாவிக்கும் capabilities இல் key/value ஆக விருப்பமான எந்த [சோதனை உள்ளமைவு விருப்பத்தையும்](https://docs.saucelabs.com/dev/test-configuration-options/) நீங்கள் அனுப்பலாம்.

### Sauce Connect

இணையத்தால் அணுக முடியாத ஒரு சர்வருக்கு எதிராக (`localhost` போன்றவை) சோதனைகளை இயக்க விரும்பினால், நீங்கள் [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) ஐப் பயன்படுத்த வேண்டும்.

இதை ஆதரிப்பது WebdriverIO இன் வரம்பிற்கு அப்பாற்பட்டது, எனவே நீங்களே இதைத் தொடங்க வேண்டும்.

நீங்கள் WDIO testrunner ஐப் பயன்படுத்துகிறீர்கள் என்றால், உங்கள் `wdio.conf.js` இல் [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) ஐப் பதிவிறக்கி உள்ளமைக்கவும். இது Sauce Connect ஐ இயக்க உதவுகிறது, மேலும் உங்கள் சோதனைகளை Sauce சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

### Travis CI உடன்

இருப்பினும், Travis CI ஒவ்வொரு சோதனைக்கும் முன் Sauce Connect ஐத் தொடங்குவதற்கு [ஆதரவைக் கொண்டுள்ளது](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect), எனவே அதற்கான அவர்களின் வழிமுறைகளைப் பின்பற்றுவது ஒரு தேர்வாகும்.

அவ்வாறு செய்தால், ஒவ்வொரு உலாவியின் `capabilities` இலும் `tunnel-identifier` சோதனை உள்ளமைவு விருப்பத்தை அமைக்க வேண்டும். Travis இயல்பாக இதை `TRAVIS_JOB_NUMBER` சூழல் மாறிக்கு அமைக்கிறது.

மேலும், Sauce Labs உங்கள் சோதனைகளை build எண்ணின்படி குழுவாக்க விரும்பினால், `build` ஐ `TRAVIS_BUILD_NUMBER` க்கு அமைக்கலாம்.

இறுதியாக, நீங்கள் `name` ஐ அமைத்தால், இந்த build க்கான Sauce Labs இல் இந்தச் சோதனையின் பெயர் மாறும். நீங்கள் WDIO testrunner ஐ [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) உடன் இணைத்துப் பயன்படுத்தினால், WebdriverIO தானாகவே சோதனைக்குப் பொருத்தமான பெயரை அமைக்கிறது.

எடுத்துக்காட்டு `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Timeouts

நீங்கள் உங்கள் சோதனைகளைத் தொலைநிலையாக இயக்குவதால், சில timeouts ஐ அதிகரிக்க வேண்டியிருக்கலாம்.

`idle-timeout` ஐ ஒரு சோதனை உள்ளமைவு விருப்பமாக அனுப்புவதன் மூலம் [idle timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) ஐ மாற்றலாம். இணைப்பை மூடுவதற்கு முன் கட்டளைகளுக்கு இடையே Sauce எவ்வளவு நேரம் காத்திருக்கும் என்பதை இது கட்டுப்படுத்துகிறது.

## BrowserStack

WebdriverIO இல் [Browserstack](https://www.browserstack.com) ஒருங்கிணைப்பும் உள்ளமைக்கப்பட்டுள்ளது.

உங்கள் config இல் (`wdio.conf.js` மூலம் ஏற்றுமதி செய்யப்பட்டது அல்லது `webdriverio.remote(...)` க்குள் அனுப்பப்பட்டது) `user` மற்றும் `key` ஐ உங்கள் Browserstack automate பயனர்பெயர் மற்றும் அணுகல் விசைக்கு அமைப்பது மட்டுமே ஒரே தேவை.

எந்த உலாவிக்கும் capabilities இல் key/value ஆக விருப்பமான எந்த [ஆதரிக்கப்படும் capabilities](https://www.browserstack.com/automate/capabilities) ஐயும் நீங்கள் அனுப்பலாம். `browserstack.debug` ஐ `true` என அமைத்தால், அது அமர்வின் screencast ஐப் பதிவு செய்யும், இது உதவியாக இருக்கலாம்.

### Local Testing

இணையத்தால் அணுக முடியாத ஒரு சர்வருக்கு எதிராக (`localhost` போன்றவை) சோதனைகளை இயக்க விரும்பினால், நீங்கள் [Local Testing](https://www.browserstack.com/local-testing#command-line) ஐப் பயன்படுத்த வேண்டும்.

இதை ஆதரிப்பது WebdriverIO இன் வரம்பிற்கு அப்பாற்பட்டது, எனவே நீங்களே இதைத் தொடங்க வேண்டும்.

நீங்கள் local ஐப் பயன்படுத்தினால், உங்கள் capabilities இல் `browserstack.local` ஐ `true` என அமைக்க வேண்டும்.

நீங்கள் WDIO testrunner ஐப் பயன்படுத்துகிறீர்கள் என்றால், உங்கள் `wdio.conf.js` இல் [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) ஐப் பதிவிறக்கி உள்ளமைக்கவும். இது BrowserStack ஐ இயக்க உதவுகிறது, மேலும் உங்கள் சோதனைகளை BrowserStack சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

### Travis CI உடன்

Travis இல் Local Testing ஐச் சேர்க்க விரும்பினால், நீங்களே அதைத் தொடங்க வேண்டும்.

பின்வரும் ஸ்கிரிப்ட் அதைப் பதிவிறக்கி பின்னணியில் தொடங்கும். சோதனைகளைத் தொடங்குவதற்கு முன் இதை Travis இல் இயக்க வேண்டும்.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

மேலும், `build` ஐ Travis build எண்ணுக்கு அமைக்க நீங்கள் விரும்பலாம்.

எடுத்துக்காட்டு `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

உங்கள் config இல் (`wdio.conf.js` மூலம் ஏற்றுமதி செய்யப்பட்டது அல்லது `webdriverio.remote(...)` க்குள் அனுப்பப்பட்டது) `user` மற்றும் `key` ஐ உங்கள் [TestingBot](https://testingbot.com) பயனர்பெயர் மற்றும் ரகசிய விசைக்கு அமைப்பது மட்டுமே ஒரே தேவை.

எந்த உலாவிக்கும் capabilities இல் key/value ஆக விருப்பமான எந்த [ஆதரிக்கப்படும் capabilities](https://testingbot.com/support/other/test-options) ஐயும் நீங்கள் அனுப்பலாம்.

### Local Testing

இணையத்தால் அணுக முடியாத ஒரு சர்வருக்கு எதிராக (`localhost` போன்றவை) சோதனைகளை இயக்க விரும்பினால், நீங்கள் [Local Testing](https://testingbot.com/support/other/tunnel) ஐப் பயன்படுத்த வேண்டும். இணையத்திலிருந்து அணுக முடியாத வலைத்தளங்களைச் சோதிக்க உங்களை அனுமதிக்க TestingBot ஒரு Java-அடிப்படையிலான tunnel ஐ வழங்குகிறது.

இதை அமைத்து இயக்குவதற்குத் தேவையான தகவல்கள் அவர்களின் tunnel ஆதரவுப் பக்கத்தில் உள்ளன.

நீங்கள் WDIO testrunner ஐப் பயன்படுத்துகிறீர்கள் என்றால், உங்கள் `wdio.conf.js` இல் [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) ஐப் பதிவிறக்கி உள்ளமைக்கவும். இது TestingBot ஐ இயக்க உதவுகிறது, மேலும் உங்கள் சோதனைகளை TestingBot சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

## TestMu AI (முன்பு LambdaTest)

[TestMu AI](https://www.testmuai.com/) ஒருங்கிணைப்பும் உள்ளமைக்கப்பட்டுள்ளது.

உங்கள் config இல் (`wdio.conf.js` மூலம் ஏற்றுமதி செய்யப்பட்டது அல்லது `webdriverio.remote(...)` க்குள் அனுப்பப்பட்டது) `user` மற்றும் `key` ஐ உங்கள் TestMu AI கணக்கின் பயனர்பெயர் மற்றும் அணுகல் விசைக்கு அமைப்பது மட்டுமே ஒரே தேவை.

எந்த உலாவிக்கும் capabilities இல் key/value ஆக விருப்பமான எந்த [ஆதரிக்கப்படும் capabilities](https://www.testmuai.com/capabilities-generator/) ஐயும் நீங்கள் அனுப்பலாம். `visual` ஐ `true` என அமைத்தால், அது அமர்வின் screencast ஐப் பதிவு செய்யும், இது உதவியாக இருக்கலாம்.

### Local testing க்கான Tunnel

இணையத்தால் அணுக முடியாத ஒரு சர்வருக்கு எதிராக (`localhost` போன்றவை) சோதனைகளை இயக்க விரும்பினால், நீங்கள் [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/) ஐப் பயன்படுத்த வேண்டும்.

இதை ஆதரிப்பது WebdriverIO இன் வரம்பிற்கு அப்பாற்பட்டது, எனவே நீங்களே இதைத் தொடங்க வேண்டும்.

நீங்கள் local ஐப் பயன்படுத்தினால், உங்கள் capabilities இல் `tunnel` ஐ `true` என அமைக்க வேண்டும்.

நீங்கள் WDIO testrunner ஐப் பயன்படுத்துகிறீர்கள் என்றால், உங்கள் `wdio.conf.js` இல் [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) ஐப் பதிவிறக்கி உள்ளமைக்கவும். இது TestMu AI ஐ இயக்க உதவுகிறது, மேலும் உங்கள் சோதனைகளை TestMu AI சேவையுடன் சிறப்பாக ஒருங்கிணைக்கும் கூடுதல் அம்சங்களுடன் வருகிறது.

### Travis CI உடன்

Travis இல் Local Testing ஐச் சேர்க்க விரும்பினால், நீங்களே அதைத் தொடங்க வேண்டும்.

பின்வரும் ஸ்கிரிப்ட் அதைப் பதிவிறக்கி பின்னணியில் தொடங்கும். சோதனைகளைத் தொடங்குவதற்கு முன் இதை Travis இல் இயக்க வேண்டும்.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

மேலும், `build` ஐ Travis build எண்ணுக்கு அமைக்க நீங்கள் விரும்பலாம்.

எடுத்துக்காட்டு `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

[`Perfecto`](https://www.perfecto.io) உடன் wdio ஐப் பயன்படுத்தும்போது, ஒவ்வொரு பயனருக்கும் ஒரு security token ஐ உருவாக்கி, அதை capabilities கட்டமைப்பில் (பிற capabilities உடன் கூடுதலாக) பின்வருமாறு சேர்க்க வேண்டும்:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

கூடுதலாக, நீங்கள் கிளவுட் உள்ளமைவைப் பின்வருமாறு சேர்க்க வேண்டும்:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) ஒரே endpoint க்குப் பின்னால் உலாவி nodes உடன் உண்மையான Android மற்றும் iOS சாதனங்களை வழங்குகிறது. இது `user` மற்றும் `key` ஜோடிக்குப் பதிலாக ஒரு API token மூலம் அங்கீகரிக்கிறது. token ஐ ஒரு bearer header ஆக அனுப்பவும்:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

மாற்றாக, token ஐ ஒரு path prefix ஆக அனுப்பலாம், கோரிக்கையை முன்னனுப்புவதற்கு முன் grid அதை நீக்கிவிடும்:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

பிற WebDriver clients க்காக URL இல் உட்பொதிக்கப்பட்ட credentials ஐயும் (`https://user:token@host`) grid ஏற்றுக்கொள்கிறது, ஆனால் அந்த வடிவத்தை WebdriverIO இலிருந்து பயன்படுத்த முடியாது: இது fetch-அடிப்படையிலானது, மேலும் Node.js URL இல் உட்பொதிக்கப்பட்ட credentials ஐ நிராகரிக்கிறது.

ஒரு உண்மையான சாதனத்திற்கு எதிராக இயக்க, மேலே உள்ள ஏதேனும் ஒரு இணைப்பு முறையுடன் உலாவியை ஒரு Appium capability ஆக அனுப்பவும்:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```