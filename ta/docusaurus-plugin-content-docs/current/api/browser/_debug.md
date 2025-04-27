---
id: debug
title: பிழைத்திருத்தம்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

இந்த கட்டளை உங்கள் ஒருங்கிணைப்பு சோதனைகளை பிழைத்திருத்த உதவுகிறது. இது இயங்கும் உலாவியை நிறுத்தி, 
உங்கள் பயன்பாட்டின் நிலையை சரிபார்க்க (எ.கா. டெவலப்பர் கருவிகளைப் பயன்படுத்தி) அதில் நுழைய உங்களுக்கு நேரம் தருகிறது.
உங்கள் முனையம் ஒரு [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) 
இடைமுகமாக மாறுகிறது, இது சில கட்டளைகளை முயற்சிக்கவும், உறுப்புகளைக் கண்டறியவும், அவற்றின் மீது செயல்களை சோதிக்கவும் உங்களை அனுமதிக்கும்.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

நீங்கள் WDIO டெஸ்ட்ரன்னரை இயக்கினால், சோதனை நேர முடிவால் சோதனை முடிவடைவதைத் தடுக்க, நீங்கள் பயன்படுத்தும் சோதனை கட்டமைப்பின் (எ.கா. Mocha அல்லது Jasmine) காலநேர பண்புகளை அதிகரிக்க உறுதிசெய்யவும்.
அதே நேரத்தில் பல திறன்களுடன் கட்டளையை இயக்குவதைத் தவிர்க்கவும்.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### பயன்பாடு

```js
browser.debug()
```

##### எடுத்துக்காட்டு

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```