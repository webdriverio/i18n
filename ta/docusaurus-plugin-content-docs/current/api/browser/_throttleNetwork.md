---
id: throttleNetwork
title: வலையமைப்பு பரிமாற்றத்தை கட்டுப்படுத்தல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

உலாவியின் வலையமைப்பு திறன்களை கட்டுப்படுத்தலாம். இது பயனர் தங்கள் இணைய இணைப்பை இழக்கும் சில சூழ்நிலைகளை உருவகப்படுத்த உதவும், மேலும் உங்கள் பயன்பாடு அதை எவ்வாறு கையாள வேண்டும் என்பதை சோதிக்கலாம்.

எளிதாக பயன்படுத்துவதற்காக முன்னமைவு கட்டமைப்புகளுடன் பல முன்னமைப்புகள் உள்ளன.
அவை `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

இந்த முன்னமைப்புகளுக்கான மதிப்புகளை [மூல குறியீட்டில்](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29) காணலாம்.

:::info

`throttleNetwork` கட்டளையைப் பயன்படுத்துவது Chrome DevTools நெறிமுறைக்கான ஆதரவை தேவைப்படுத்துகிறது, எ.கா.
மேகத்தில் தானியங்கி சோதனைகளை இயக்கும்போது பயன்படுத்த முடியாது. Chrome DevTools நெறிமுறை இயல்பாகவே நிறுவப்படவில்லை,
அதை நிறுவ `npm install puppeteer-core` ஐப் பயன்படுத்தவும்.
[தானியங்கு நெறிமுறைகள்](/docs/automationProtocols) பிரிவில் மேலும் தெரிந்துகொள்ளுங்கள்.

:::

##### பயன்பாடு

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>கட்டுப்படுத்துதலுக்கான அளவுருக்கள்</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>இணைய துண்டிப்பை உருவகப்படுத்த True.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>கோரிக்கை அனுப்பப்பட்டதிலிருந்து பதில் தலைப்புகள் பெறப்படும் வரை குறைந்தபட்ச தாமதம் (மில்லி வினாடிகள்).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>அதிகபட்ச ஒருங்கிணைந்த பதிவிறக்க ஊடுருவல் (பைட்டுகள்/வினாடி). -1 பதிவிறக்க கட்டுப்பாட்டை முடக்குகிறது.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>அதிகபட்ச ஒருங்கிணைந்த பதிவேற்ற ஊடுருவல் (பைட்டுகள்/வினாடி). -1 பதிவேற்ற கட்டுப்பாட்டை முடக்குகிறது.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // via static string preset
    await browser.throttleNetwork('Regular3G')

    // via custom values
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```