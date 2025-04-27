---
id: record
title: சோதனைகளைப் பதிவு செய்தல்
---

Chrome DevTools-ல் ஒரு _Recorder_ பேனல் உள்ளது, இது பயனர்கள் Chrome-ல் தானியங்கி படிகளைப் பதிவு செய்து மீண்டும் இயக்க அனுமதிக்கிறது. இந்த படிகளை [ஒரு நீட்டிப்பு மூலம் WebdriverIO சோதனைகளாக ஏற்றுமதி செய்யலாம்](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), இது சோதனை எழுதுவதை மிகவும் எளிதாக்குகிறது.

## Chrome DevTools Recorder என்றால் என்ன

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) என்பது நேரடியாக உலாவியில் சோதனை செயல்களைப் பதிவு செய்து மீண்டும் இயக்க அனுமதிக்கும் ஒரு கருவியாகும், மேலும் அவற்றை JSON-ஆக ஏற்றுமதி செய்யலாம் (அல்லது e2e சோதனைகளில் ஏற்றுமதி செய்யலாம்), மேலும் சோதனை செயல்திறனை அளவிடலாம்.

இந்த கருவி எளிமையானது, மேலும் இது உலாவியில் இணைக்கப்பட்டிருப்பதால், சூழலை மாற்றாமல் அல்லது எந்த மூன்றாம் தரப்பு கருவியுடனும் செயல்படாமல் இருப்பதன் வசதி நமக்கு உள்ளது.

## Chrome DevTools Recorder மூலம் ஒரு சோதனையை எப்படி பதிவு செய்வது

உங்களிடம் சமீபத்திய Chrome இருந்தால், Recorder ஏற்கனவே நிறுவப்பட்டு உங்களுக்காக கிடைக்கும். எந்த இணையதளத்தையும் திறந்து, வலது-கிளிக் செய்து _"Inspect"_ தேர்வு செய்யவும். DevTools-ல் `CMD/Control` + `Shift` + `p` அழுத்தி _"Show Recorder"_ என உள்ளிடுவதன் மூலம் Recorder-ஐ திறக்கலாம்.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

பயனர் பயணத்தைப் பதிவு செய்யத் தொடங்க, _"Start new recording"_ மீது கிளிக் செய்யவும், உங்கள் சோதனைக்கு ஒரு பெயரைக் கொடுத்து, பின்னர் உங்கள் சோதனையைப் பதிவு செய்ய உலாவியைப் பயன்படுத்தவும்:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

அடுத்த படி, பதிவு வெற்றிகரமாக இருந்ததா மற்றும் நீங்கள் செய்ய விரும்பியதைச் செய்கிறதா என்பதைச் சரிபார்க்க _"Replay"_ மீது கிளிக் செய்யவும். எல்லாம் சரியாக இருந்தால், [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) ஐகான் மீது கிளிக் செய்து _"Export as a WebdriverIO Test Script"_ தேர்வு செய்யவும்:

_"Export as a WebdriverIO Test Script"_ விருப்பம் [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) நீட்டிப்பை நிறுவினால் மட்டுமே கிடைக்கும்.

![Chrome DevTools Recorder](/img/recorder/export.gif)

அவ்வளவுதான்!

## பதிவை ஏற்றுமதி செய்தல்

நீங்கள் பாய்வை WebdriverIO சோதனை ஸ்கிரிப்ட்டாக ஏற்றுமதி செய்திருந்தால், அது உங்கள் சோதனை தொகுப்பில் நகலெடுத்து ஒட்டக்கூடிய ஸ்கிரிப்ட்டை பதிவிறக்க வேண்டும். உதாரணமாக, மேலே உள்ள பதிவு பின்வருமாறு தோன்றும்:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

தேவைப்பட்டால் சில இட அமைப்புகளை மீண்டும் பார்வையிட்டு, அவற்றை மேலும் நெகிழ்வான [தேர்வான் வகைகள்](/docs/selectors) கொண்டு மாற்றவும். மேலும் நீங்கள் பாய்வை JSON கோப்பாக ஏற்றுமதி செய்து, [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) தொகுப்பைப் பயன்படுத்தி அதை உண்மையான சோதனை ஸ்கிரிப்ட்டாக மாற்றலாம்.

## அடுத்த படிகள்

உங்கள் பயன்பாடுகளுக்கான சோதனைகளை எளிதாக உருவாக்க இந்த பாய்வைப் பயன்படுத்தலாம். Chrome DevTools Recorder-ல் பல கூடுதல் அம்சங்கள் உள்ளன, எ.கா:

- [மெதுவான நெட்வொர்க்கை உருவகப்படுத்துதல்](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) அல்லது
- [உங்கள் சோதனைகளின் செயல்திறனை அளவிடுதல்](https://developer.chrome.com/docs/devtools/recorder/#measure)

அவர்களின் [ஆவணங்களை](https://developer.chrome.com/docs/devtools/recorder) கண்டிப்பாக பார்க்கவும்.