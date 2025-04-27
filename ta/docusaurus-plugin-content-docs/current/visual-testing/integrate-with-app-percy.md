---
id: integrate-with-app-percy
title: மொபைல் பயன்பாட்டிற்கு
---

## உங்கள் WebdriverIO சோதனைகளை App Percy உடன் ஒருங்கிணைக்கவும்

ஒருங்கிணைப்பிற்கு முன், நீங்கள் [WebdriverIO க்கான App Percy மாதிரி உருவாக்க பயிற்சியை](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) ஆராயலாம்.
உங்கள் சோதனை தொகுப்பை BrowserStack App Percy உடன் ஒருங்கிணைக்கவும், இங்கே ஒருங்கிணைப்பு படிகளின் கண்ணோட்டம்:

### படி 1: percy டாஷ்போர்டில் புதிய ஆப் திட்டத்தை உருவாக்கவும்

Percy இல் [உள்நுழையவும்](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) மற்றும் [புதிய ஆப் வகை திட்டத்தை உருவாக்கவும்](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). திட்டத்தை உருவாக்கிய பிறகு, உங்களுக்கு `PERCY_TOKEN` சுற்றுச்சூழல் மாறி காட்டப்படும். ஸ்கிரீன்ஷாட்களை எந்த நிறுவனம் மற்றும் திட்டத்திற்கு பதிவேற்றுவது என்பதை அறிய Percy `PERCY_TOKEN` ஐப் பயன்படுத்தும். அடுத்த படிகளில் இந்த `PERCY_TOKEN` உங்களுக்கு தேவைப்படும்.

### படி 2: திட்டத்தின் டோக்கனை சுற்றுச்சூழல் மாறியாக அமைக்கவும்

PERCY_TOKEN ஐ சுற்றுச்சூழல் மாறியாக அமைக்க கொடுக்கப்பட்ட கட்டளையை இயக்கவும்:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### படி 3: Percy பாக்கேஜ்களை நிறுவவும்

உங்கள் சோதனை தொகுப்பிற்கான ஒருங்கிணைப்பு சூழலை நிறுவுவதற்கு தேவையான கூறுகளை நிறுவவும்.
சார்புகளை நிறுவ, பின்வரும் கட்டளையை இயக்கவும்:

```sh
npm install --save-dev @percy/cli
```

### படி 4: சார்புகளை நிறுவவும்

Percy Appium பயன்பாட்டை நிறுவவும்

```sh
npm install --save-dev @percy/appium-app
```

### படி 5: சோதனை ஸ்கிரிப்டை புதுப்பிக்கவும்
உங்கள் குறியீட்டில் @percy/appium-app ஐ இறக்குமதி செய்வதை உறுதிசெய்யவும்.

percyScreenshot செயல்பாட்டைப் பயன்படுத்தி ஒரு மாதிரி சோதனை கீழே உள்ளது. ஸ்கிரீன்ஷாட் எடுக்க வேண்டிய இடங்களில் எல்லாம் இந்த செயல்பாட்டைப் பயன்படுத்தவும்.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
நாங்கள் தேவையான அளவுருக்களை கடத்துகிறோம்.percyScreenshot முறை.

ஸ்கிரீன்ஷாட் முறை அளவுருக்கள்:

```sh
percyScreenshot(driver, name[, options])
```
### படி 6: உங்கள் சோதனை ஸ்கிரிப்டை இயக்கவும்

`percy app:exec` பயன்படுத்தி உங்கள் சோதனைகளை இயக்கவும்.

நீங்கள் percy app:exec கட்டளையைப் பயன்படுத்த முடியவில்லை அல்லது IDE இயக்க விருப்பங்களைப் பயன்படுத்தி உங்கள் சோதனைகளை இயக்க விரும்பினால், நீங்கள் percy app:exec:start மற்றும் percy app:exec:stop கட்டளைகளைப் பயன்படுத்தலாம். மேலும் அறிய, [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) ஐப் பார்வையிடவும்.

```sh
$ percy app:exec -- appium test command
```
இந்த கட்டளை Percy ஐ தொடங்குகிறது, ஒரு புதிய Percy உருவாக்கத்தை உருவாக்குகிறது, ஸ்னாப்ஷாட்களை எடுத்து அவற்றை உங்கள் திட்டத்திற்கு பதிவேற்றுகிறது, மற்றும் Percy ஐ நிறுத்துகிறது:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## மேலும் விவரங்களுக்கு பின்வரும் பக்கங்களைப் பார்வையிடவும்:
- [உங்கள் WebdriverIO சோதனைகளை Percy உடன் ஒருங்கிணைக்கவும்](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [சுற்றுச்சூழல் மாறி பக்கம்](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- நீங்கள் BrowserStack Automate பயன்படுத்தினால் [BrowserStack SDK பயன்படுத்தி ஒருங்கிணைக்கவும்](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).


| வளங்கள்                                                                                                                                                            | விளக்கம்                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [அதிகாரப்பூர்வ ஆவணங்கள்](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | App Percy இன் WebdriverIO ஆவணங்கள் |
| [மாதிரி உருவாக்கம் - பயிற்சி](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | App Percy இன் WebdriverIO பயிற்சி      |
| [அதிகாரப்பூர்வ வீடியோ](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | App Percy உடன் விஷுவல் டெஸ்டிங்         |
| [வலைப்பதிவு](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | App Percy அறிமுகம்: நேட்டிவ் ஆப்களுக்கான AI ஆல் இயக்கப்படும் தானியங்கி விஷுவல் டெஸ்டிங் தளம்    |