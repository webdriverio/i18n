---
id: touchAction
title: தொடுசெயல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Deprecation Warning

`touchAction` கட்டளை __மதிப்பிழக்கப்பட்டது__ மற்றும் எதிர்கால பதிப்பில் நீக்கப்படும்.
நாங்கள் [`action`](/docs/api/browser/action) கட்டளையை `touch` சுட்டிக்காட்டி வகையுடன் பயன்படுத்த பரிந்துரைக்கிறோம், 
எ.கா.:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

Touch Action API என்பது Appium-இல் தானியக்கமாக்கக்கூடிய அனைத்து சைகைகளுக்கும் அடிப்படை ஆகும்.
இது தற்போது உள்ளூர் பயன்பாடுகளுக்கு மட்டுமே கிடைக்கிறது மற்றும் வெப் பயன்பாடுகளுடன் தொடர்புகொள்ள பயன்படுத்த முடியாது.
இதன் மையமானது _ad hoc_ தனிப்பட்ட செயல்களை ஒன்றாக இணைக்கும் திறன் ஆகும், இது பின்னர்
சாதனத்தில் உள்ள பயன்பாட்டில் ஒரு கூறுக்கு செயல்படுத்தப்படும். பயன்படுத்தக்கூடிய அடிப்படை செயல்கள்:

- press (கூறு அல்லது (x,y) அல்லது இரண்டையும் அனுப்புக)
- longPress (கூறு அல்லது (x,y) அல்லது இரண்டையும் அனுப்புக)
- tap (கூறு அல்லது (x,y) அல்லது இரண்டையும் அனுப்புக)
- moveTo (முழுமையான x,y ஆயத்தொலைவுகளை அனுப்புக)
- wait (ms ஐ (மில்லிவினாடிகளாக) அனுப்புக)
- release (எந்த மதிப்புகளும் இல்லை)

##### பயன்பாடு

```js
$(selector).touchAction(action)
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
      <td>செயல்படுத்தப்படும் செயல்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await screen.touchAction('tap');

    // simple touch action using selector and x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await screen.touchAction({
        action: 'tap', x: 30, y:20
    })

    // multi action on an element (drag&drop)
    await screen.touchAction([
        'press',
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])

    // drag&drop to element
    const otherElement = await $('//UIAApplication[1]/UIAElement[2]')
    await screen.touchAction([
        'press',
        { action: 'moveTo', element: otherElement },
        'release'
    ])
});
```