---
id: keys
title: விசைகள்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

"செயலில் உள்ள" உறுப்புக்கு விசை அழுத்தங்களின் வரிசையை அனுப்பவும். ஒரு உள்ளீட்டு உறுப்பை அதன் மீது கிளிக் செய்வதன் மூலம் செயலில் வைக்கலாம். "இடது அம்புக்குறி" அல்லது "பின் இடைவெளி" போன்ற எழுத்துக்களைப் பயன்படுத்த, WebdriverIO பேக்கேஜிலிருந்து `Key` பொருளை இறக்குமதி செய்யவும்.

`Control`, `Shift`, `Alt` மற்றும் `Command` போன்ற மாற்றிகள் அழுத்தப்பட்ட நிலையில் இருக்கும், எனவே அவற்றை விடுவிக்க நீங்கள் மீண்டும் அவற்றை தூண்ட வேண்டும். இருப்பினும் ஒரு கிளிக்கை மாற்றுவது [performActions](https://webdriver.io/docs/api/webdriver#performactions) முறை மூலம் WebDriver Actions API ஐப் பயன்படுத்த வேண்டியிருக்கும்.

:::info

கட்டுப்பாட்டு விசைகள் உலாவி இயங்கும் இயக்க முறைமையைப் பொறுத்து வேறுபடுகின்றன, எ.கா. MacOS: `Command` மற்றும் Windows: `Control`.
WebdriverIO `Ctrl` என்ற குறுக்கு உலாவி மாற்றி கட்டுப்பாட்டு விசையை வழங்குகிறது (கீழே உள்ள உதாரணத்தைப் பார்க்கவும்).

:::

##### பயன்பாடு

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>தட்டச்சு செய்ய வேண்டிய விசைகளின் வரிசை. ஒரு அரே அல்லது சரம் வழங்கப்பட வேண்டும்.</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```