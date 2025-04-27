---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$$.ts
---

`react$$` கட்டளை என்பது பல React கூறுகளை அவற்றின் உண்மையான பெயரால் குறிப்பிட்டு props மற்றும் state மூலம் வடிகட்டுவதற்கு பயனுள்ள கட்டளையாகும்.

:::info

இந்த கட்டளை React v16.x பயன்படுத்தும் பயன்பாடுகளுடன் மட்டுமே செயல்படும். React தேர்வுகளைப் பற்றி [Selectors](/docs/selectors#react-selectors) வழிகாட்டியில் மேலும் படிக்கவும்.

:::

##### பயன்பாடு

```js
browser.react$$(selector, { props, state })
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
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>React கூறின்</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்ப</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>React தேர்வி விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">விருப்ப</span></td>
      <td>`Object`</td>
      <td>உறுப்பு கொண்டிருக்க வேண்டிய React props</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">விருப்ப</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>உறுப்பு இருக்க வேண்டிய React நிலை</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');

    const orangeButtons = await browser.react$$('t', {
        props: { orange: true }
    })
    console.log(await orangeButtons.map((btn) => btn.getText()));
    // prints "[ '÷', 'x', '-', '+', '=' ]"
});
```

##### திரும்பும் மதிப்பு

- **&lt;WebdriverIO.ElementArray&gt;**