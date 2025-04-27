---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
`executeAsync` கட்டளை காலாவதியானது மற்றும் எதிர்கால பதிப்பில் அகற்றப்படும்.
`async`/`await` மூலம் சிறந்த பிழை கையாளுதல் ஆதரவை வழங்குவதால் தயவுசெய்து `execute` கட்டளையைப் பயன்படுத்தவும்.
:::

தற்போது தேர்ந்தெடுக்கப்பட்ட பிரேமின் சூழலில் இயக்குவதற்காக பக்கத்தில் ஜாவாஸ்கிரிப்ட் துண்டை ஊக்குவிக்கிறது,
தற்போதைய கூறை நோக்காகப் பயன்படுத்துகிறது, இது கூறு நோக்கில் இருப்பதால் WebdriverIO ஸ்கிரிப்டை இயக்குவதற்கு முன் 
கூறு இருப்பதை தானாகவே காத்திருக்கும்.
இயக்கப்படும் ஸ்கிரிப்ட் ஒத்திசைவற்றதாக கருதப்படுகிறது மற்றும் வழங்கப்பட்ட கால்பேக்கை அழைப்பதன் மூலம் முடிந்தது என்பதைக் குறிக்க வேண்டும், 
இது எப்போதும் செயல்பாட்டின் இறுதி அளவுருவாக வழங்கப்படுகிறது. இந்த கால்பேக்கிற்கான மதிப்பு 
கிளையன்டுக்குத் திரும்ப அனுப்பப்படும்.

ஒத்திசைவற்ற ஸ்கிரிப்ட் கட்டளைகள் பக்கம் ஏற்றுதல்களை கடக்காது. ஸ்கிரிப்ட் முடிவுக்காக காத்திருக்கும்போது அன்லோட் நிகழ்வு தீயிடப்பட்டால், 
கிளையன்டுக்கு பிழை திருப்பி அனுப்பப்படும்.

ஸ்கிரிப்ட் அளவுரு செயல்பாட்டு உடலம் வடிவத்தில் இயக்க ஸ்கிரிப்டை வரையறுக்கிறது. செயல்பாடு வழங்கப்பட்ட 
args அணியுடன் அழைக்கப்படும் மற்றும் மதிப்புகள் குறிப்பிடப்பட்ட வரிசையில் உள்ள arguments பொருள் மூலம் அணுகப்படலாம். 
இறுதி அளவுரு எப்போதும் ஸ்கிரிப்ட் முடிந்ததைக் குறிக்க அழைக்கப்பட வேண்டிய கால்பேக் செயல்பாடாக இருக்கும்.

அளவுருக்கள் ஏதேனும் JSON-அடிப்படை, அணி அல்லது JSON பொருளாக இருக்கலாம். WebElement குறிப்பை வரையறுக்கும் JSON பொருள்கள் 
அதற்கு இணையான DOM கூறுகளாக மாற்றப்படும். அதேபோல், ஸ்கிரிப்ட் முடிவில் உள்ள எந்த WebElements கிளையன்டுக்கு WebElement JSON பொருள்களாக 
திரும்ப அனுப்பப்படும்.

:::caution

தயவுசெய்து இதற்கு பதிலாக `execute` ஐப் பயன்படுத்தவும்
:::

##### பயன்பாடு

```js
$(selector).executeAsync(script, arguments)
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
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`*`</td>
      <td>ஸ்கிரிப்ட் அளவுருக்கள்</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="executeAsync.js"
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### திரும்பப் பெறுகிறது

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              ஸ்கிரிப்ட் முடிவு.