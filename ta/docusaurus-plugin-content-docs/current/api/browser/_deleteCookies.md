---
id: deleteCookies
title: குக்கீகளை நீக்கு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/deleteCookies.ts
---

தற்போதைய பக்கத்தில் காணக்கூடிய குக்கீகளை நீக்கு. ஒரு குக்கீ பெயரை வழங்குவதன் மூலம்
அது ஒரு குக்கீயை மட்டும் நீக்குகிறது அல்லது பல பெயர்கள் அனுப்பப்படும்போது அதிகமாக நீக்குகிறது.

##### பயன்பாடு

```js
browser.deleteCookies(filter)
```

##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filter</var></code></td>
      <td>`StorageCookieFilter[]`</td>
      <td>பொருந்தும் அளவுகோல்களின் அடிப்படையில் குறிப்பிட்ட குக்கீகளை அடையாளம் காணவும் நீக்கவும் வடிகட்டி பண்புகளைப் பயன்படுத்தவும்.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L9-L29
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L31-L35
```