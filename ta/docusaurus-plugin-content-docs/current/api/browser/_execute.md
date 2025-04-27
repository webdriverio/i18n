---
id: execute
title: செயல்படுத்து
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

தற்போது தேர்ந்தெடுக்கப்பட்ட ஃப்ரேமின் சூழலில் இயக்குவதற்காக ஒரு JavaScript துண்டை பக்கத்தில் செலுத்துகிறது.
செயல்படுத்தப்படும் ஸ்கிரிப்ட் ஒத்திசைவானது என்று கருதப்படுகிறது, மேலும் ஸ்கிரிப்டை மதிப்பீடு செய்வதன் முடிவு
வாடிக்கையாளருக்கு திருப்பப்படுகிறது.

script பாரமீட்டர் ஒரு செயல்பாட்டு உடலின் வடிவத்தில் செயல்படுத்த வேண்டிய ஸ்கிரிப்டை வரையறுக்கிறது. அந்த
செயல்பாட்டால் திருப்பி அனுப்பப்படும் மதிப்பு வாடிக்கையாளருக்கு திருப்பி அனுப்பப்படும். வழங்கப்பட்ட args
அரேயுடன் செயல்பாடு அழைக்கப்படும், மேலும் குறிப்பிடப்பட்ட வரிசையில் arguments அாப்ஜெக்ட் மூலம் மதிப்புகளை
அணுகலாம்.

Arguments எந்த JSON-அடிப்படை, அரே அல்லது JSON ஆப்ஜெக்ட்டாக இருக்கலாம். ஒரு WebElement குறிப்பை வரையறுக்கும் JSON
ஆப்ஜெக்ட்கள் அதற்குரிய DOM எலிமென்ட்டாக மாற்றப்படும். அதேபோல், ஸ்கிரிப்ட் முடிவில் உள்ள எந்த WebElements உம்
வாடிக்கையாளருக்கு WebElement JSON ஆப்ஜெக்ட்களாக திருப்பி அனுப்பப்படும்.

##### பயன்பாடு

```js
browser.execute(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>செயல்படுத்த வேண்டிய ஸ்கிரிப்ட்.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">விருப்பமானது</span></td>
      <td>`*`</td>
      <td>ஸ்கிரிப்ட் அளவுருக்கள்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### திரும்ப அளிப்பவை

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              ஸ்கிரிப்ட் முடிவு.