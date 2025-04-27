---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$.ts
---

`react$` கட்டளை உண்மையான பெயர் மூலம் React கூறுகளைத் தேட உதவும் ஒரு பயனுள்ள கட்டளையாகும் மற்றும் அவற்றை props மற்றும் state மூலம் வடிகட்டலாம்.

:::info

இந்த கட்டளை React v16.x பயன்படுத்தும் பயன்பாடுகளுடன் மட்டுமே செயல்படும். React தேர்வாளர்கள் பற்றி மேலும் அறிய [Selectors](/docs/selectors#react-selectors) வழிகாட்டியைப் படிக்கவும்.

:::

##### பயன்பாடு

```js
browser.react$(selector, { props, state })
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
      <td>React கூறுகளின்</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>React தேர்வாளர் விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Object`</td>
      <td>உறுப்பில் இருக்க வேண்டிய React props</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>உறுப்பு இருக்க வேண்டிய React நிலை</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');
    const appWrapper = await $('div#root')

    await browser.react$('t', {
        props: { name: '7' }
    }).click()
    await browser.react$('t', {
        props: { name: 'x' }
    }).click()
    await browser.react$('t', {
        props: { name: '6' }
    }).click()
    await browser.react$('t', {
        props: { name: '=' }
    }).click()

    console.log(await $('.component-display').getText()); // prints "42"
});
```

##### பின்கொடுக்கும் மதிப்பு

- **&lt;WebdriverIO.Element&gt;**