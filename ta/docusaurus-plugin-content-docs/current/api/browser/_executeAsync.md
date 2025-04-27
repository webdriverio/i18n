---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
`executeAsync` கட்டளை காலாவதியாகிவிட்டது மற்றும் எதிர்கால பதிப்பில் நீக்கப்படும்.
தயவுசெய்து `execute` கட்டளையைப் பயன்படுத்தவும், ஏனெனில் இது `async`/`await` வழியாக 
சிறப்பான பிழை கையாளுதலை வழங்குகிறது.
:::

தற்போதைய தேர்ந்தெடுக்கப்பட்ட பிரேமின் சூழலில் இயக்கத்திற்காக பக்கத்தில் ஜாவாஸ்கிரிப்ட் துண்டைச் செலுத்துகிறது. இயக்கப்படும் ஸ்கிரிப்ட் ஒத்திசைவற்றதாக கருதப்படுகிறது மற்றும் வழங்கப்பட்ட கால்பேக்கை அழைப்பதன் மூலம் முடிந்துவிட்டது என்பதைக் குறிக்க வேண்டும், இது எப்போதும் செயல்பாட்டின் இறுதி அளவுருவாக வழங்கப்படுகிறது. இந்த கால்பேக்கிற்கான மதிப்பு கிளையன்ட்க்கு திருப்பி அனுப்பப்படும்.

ஒத்திசைவற்ற ஸ்கிரிப்ட் கட்டளைகள் பக்க ஏற்றங்களைக் கொண்டிருக்கக்கூடாது. ஸ்கிரிப்ட் முடிவுக்காக காத்திருக்கும்போது அன்லோட் நிகழ்வு தீயிடப்பட்டால், கிளையன்ட்க்கு பிழை திருப்பி அனுப்பப்பட வேண்டும்.

ஸ்கிரிப்ட் அளவுரு ஒரு செயல்பாட்டு உடலின் வடிவத்தில் இயக்க வேண்டிய ஸ்கிரிப்டை வரையறுக்கிறது. வழங்கப்பட்ட args வரிசையுடன் செயல்பாடு அழைக்கப்படும் மற்றும் குறிப்பிட்ட வரிசையில் arguments பொருள் மூலம் மதிப்புகளை அணுகலாம். இறுதி அளவுரு எப்போதும் ஸ்கிரிப்ட் முடிந்துவிட்டது என்பதைக் குறிக்க அழைக்கப்பட வேண்டிய கால்பேக் செயல்பாடாக இருக்கும்.

அளவுருக்கள் எந்த JSON-primitive, array, அல்லது JSON object ஆக இருக்கலாம். WebElement குறிப்பை வரையறுக்கும் JSON பொருள்கள் தொடர்புடைய DOM கூறுக்கு மாற்றப்படும். அதேபோல், ஸ்கிரிப்ட் முடிவில் உள்ள எந்தவொரு WebElements உம் கிளையன்ட்க்கு WebElement JSON பொருள்களாக திருப்பி அனுப்பப்படும்.

:::caution

தயவுசெய்து `execute` ஐப் பயன்படுத்தவும்
:::

##### பயன்பாடு

```js
browser.executeAsync(script, arguments)
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
      <td>இயக்க வேண்டிய ஸ்கிரிப்ட்.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">விருப்பமான</span></td>
      <td>`*`</td>
      <td>ஸ்கிரிப்ட் அளவுருக்கள்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### திருப்பி அனுப்புகிறது

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              ஸ்கிரிப்ட் முடிவு.