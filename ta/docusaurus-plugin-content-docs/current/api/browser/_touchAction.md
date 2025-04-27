---
id: touchAction
title: தொடுதல் செயல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
---

:::caution Deprecation Warning

`touchAction` கட்டளை __காலாவதியானது__ மற்றும் எதிர்கால பதிப்பில் நீக்கப்படும்.
நாங்கள் `touch` குறிப்பான வகையுடன் [`action`](/docs/api/browser/action) கட்டளையைப் பயன்படுத்த பரிந்துரைக்கிறோம், எ.கா.:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

Touch Action API என்பது Appium-இல் தானியங்குபடுத்தக்கூடிய எல்லா சைகைகளுக்கும் அடிப்படையாக உள்ளது.
இது தற்போது நேட்டிவ் பயன்பாடுகளுக்கு மட்டுமே கிடைக்கிறது மற்றும் வெப் பயன்பாடுகளுடன் தொடர்புகொள்ள பயன்படுத்த முடியாது.
அதன் மையத்தில், _ad hoc_ தனிப்பட்ட செயல்களை ஒன்றாக இணைக்கும் திறன் உள்ளது, அவை பின்னர்
சாதனத்தில் உள்ள பயன்பாட்டில் ஒரு கூறுக்கு பயன்படுத்தப்படும். பயன்படுத்தக்கூடிய அடிப்படை செயல்கள்:

- press (கூறு அல்லது (`x`, `y`) அல்லது இரண்டையும் அனுப்பவும்)
- longPress (கூறு அல்லது (`x`, `y`) அல்லது இரண்டையும் அனுப்பவும்)
- tap (கூறு அல்லது (`x`, `y`) அல்லது இரண்டையும் அனுப்பவும்)
- moveTo (முழுமையான `x`, `y` ஆயத்தொலைவுகளை அனுப்பவும்)
- wait (`ms` (மில்லி வினாடிகளாக) அனுப்பவும்)
- release (விவாதங்கள் இல்லை)

##### பயன்பாடு

```js
browser.touchAction(action)
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
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>செயல்படுத்த வேண்டிய செயல்</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await browser.touchAction({
        action: 'tap',
        element: screen
    });

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the viewport
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20
    })

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20,
        element: screen
    })

    // multi action on an element
    // drag&drop from position 200x200 down 100px on the screen
    await browser.touchAction([
        { action: 'press', x: 200, y: 200 },
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])
});
```