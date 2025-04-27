---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

செயலில் உள்ள சூழலை ஒரு பிரேமிற்கு மாற்றுகிறது, எ.கா. பக்கத்தில் உள்ள ஒரு iframe. பக்கத்தில் ஒரு பிரேமை பல வழிகளில் நீங்கள் வினவலாம்:

  - ஒரு ஸ்ட்ரிங் கொடுக்கப்பட்டால், அது பொருந்தும் சூழல் ஐடி, url அல்லது அந்த ஸ்ட்ரிங்கைக் கொண்ட url உடன் பிரேமிற்கு மாறுகிறது
    ```ts
    // switch to a frame that has a specific url or contains a string in the url
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Note: this frame is located in a nested iframe, however you only need to provide
    // the frame url of your desired frame
    await browser.switchFrame('https://www.w3schools.com')
    // check the title of the page
    console.log(await browser.execute(() => [document.title, document.URL]))
    // outputs: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - பிரேமின் சூழல் ஐடி உங்களிடம் இருந்தால் அதை நேரடியாகப் பயன்படுத்தலாம்
    ```ts
    // switch to a frame that has a certain context id
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - ஒரு `iframe` எலிமென்ட்டைக் குறிக்கும் WebdriverIO எலிமென்ட் கொடுக்கப்பட்டால், அது அந்த பிரேமிற்கு மாறும்
    ```ts
    // switch to a frame element queried from current context
    await browser.switchFrame($('iframe'))
    ```

  - ஒரு பங்கியம் கொடுக்கப்பட்டால், அது பக்கத்தில் உள்ள அனைத்து iframe களிலும் சுழன்று சூழல் பொருளுக்குள் அந்த பங்கியத்தை அழைக்கும். பிரேம் தேர்ந்தெடுக்கப்பட வேண்டுமா என்பதைக் குறிக்கும் வகையில் பங்கியம் ஒரு பூலியன் மதிப்பை திரும்ப அனுப்ப வேண்டும். பங்கியம் உலாவிக்குள் இயக்கப்படும் மற்றும் அனைத்து வலை API களுக்கும் அணுகலை அனுமதிக்கிறது, எ.கா.:
    ```ts
    // switch to first frame that contains an element with id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // switch to first frame that contains "webdriver" in the URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - `null` கொடுக்கப்பட்டால், அது உச்ச நிலை பிரேமிற்கு மாறும்
    ```ts
    // first switch into a frame
    await browser.switchFrame($('iframe'))
    // do more automation within that frame, then ...

    // switch to the top level frame
    await browser.switchFrame(null)
    ```

நீங்கள் ஒரு பிரேமிற்கு மாறிய பிறகு, வெவ்வேறு பக்கங்களுக்கு செல்வது உட்பட, அடுத்த அனைத்து கட்டளைகளும் அந்த பிரேமின் சூழலில் இயக்கப்படும்.

##### பயன்பாடு

```js
browser.switchFrame(context)
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
      <td><code><var>context</var></code></td>
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### திரும்ப அனுப்புகிறது

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  தற்போதைய செயலில் உள்ள சூழல் ஐடி