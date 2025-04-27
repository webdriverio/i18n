---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

உங்கள் தற்போதைய திறன்களுடன் ஒரு புதிய செலீனியம் அமர்வை உருவாக்குகிறது. இது நீங்கள் 
அதிக நிலையான பயன்பாட்டை சோதிக்கும் போது பயனுள்ளதாக இருக்கும், அங்கு உங்கள் spec கோப்பில் உள்ள சோதனைகளுக்கு 
இடையில் உலாவி அமர்வை சுத்தம் செய்ய வேண்டும், இதனால் WDIO உடன் நூற்றுக்கணக்கான தனி சோதனை கோப்புகளை 
உருவாக்குவதைத் தவிர்க்கலாம். ஆனால் எச்சரிக்கையாக இருங்கள், இந்த கட்டளை உங்கள் சோதனை நேரத்தை 
கணிசமாக பாதிக்கிறது, ஏனெனில் புதிய செலீனியம் அமர்வுகளை உருவாக்குவது, குறிப்பாக கிளவுட் சேவைகளைப் 
பயன்படுத்தும்போது, மிகவும் நேரம் எடுக்கும் செயலாகும்.

ஹோஸ்ட்நேம், போர்ட், ப்ரோட்டோகால் போன்ற இணைப்பு அளவுருக்களை browserName உடன் சேர்க்க முடியும், 
இது வேறு ரிமோட் சேவையுடன் இணைய விரும்பும்போது. இது ஒரு சூழ்நிலையில் பயனுள்ளதாக இருக்கும், 
எடுத்துக்காட்டாக, நீங்கள் நேட்டிவ் ஆப்பில் சோதனையைத் தொடங்கி வெப் ஆப்பில் தரவை சரிபார்க்க வேண்டியிருக்கும்.

நீங்கள் தொலைநிலை சேவையிலிருந்து தொடங்கினால், உள்ளூர் இயக்கிகளுக்கு மாற விரும்பினால் 
hostname-க்கு 0.0.0.0 ஐ பாஸ் செய்யலாம்.

##### பயன்பாடு

```js
browser.reloadSession(newCapabilities)
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>அமர்வை உருவாக்க புதிய திறன்கள்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```