---
id: newWindow
title: புதிய சாளரம்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

உலாவியில் புதிய சாளரம் அல்லது தாவலைத் திறக்கவும் (குறிப்பிடப்படாவிட்டால் இயல்பாக ஒரு புதிய சாளரமாக இருக்கும்).
இந்த கட்டளை `window.open()` செயல்பாட்டிற்கு சமமானது. இந்த கட்டளை மொபைல் சூழல்களில் வேலை செய்யாது.

__குறிப்பு:__ இந்த கட்டளையை அழைக்கும்போது, நீங்கள் தானாகவே புதிய சாளரம் அல்லது தாவலுக்கு மாறுகிறீர்கள்.

##### பயன்பாடு

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>திறக்க வேண்டிய வலைத்தள URL</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`NewWindowOptions`</td>
      <td>newWindow கட்டளை விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`string`</td>
      <td>புதிய சாளரத்தின் வகை: 'tab' அல்லது 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>புதிய சாளரத்தின் பெயர்</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>திறக்கப்பட்ட சாளரத்தின் அம்சங்கள் (எ.கா. அளவு, நிலை, ஸ்க்ரோல்பார்கள் போன்றவை)</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```js title="newWindowSync.js"
it('should open a new window', async () => {
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // outputs: "Google"

    const result = await browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
    })
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    console.log(result.type) // outputs: "window"
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.closeWindow()
    await browser.switchToWindow(handles[0])
    console.log(await browser.getTitle()) // outputs: "Google"
});

```

```js title="newTabSync.js"
  it('should open a new tab', async () => {
      await browser.url('https://google.com')
      console.log(await browser.getTitle()) // outputs: "Google"

      await browser.newWindow('https://webdriver.io', {
          type:'tab',
          windowName: 'WebdriverIO window',
          windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
      })
      console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
      console.log(result.type) // outputs: "tab"
      const handles = await browser.getWindowHandles()
      await browser.switchToWindow(handles[1])
      await browser.closeWindow()
      await browser.switchToWindow(handles[0])
      console.log(await browser.getTitle()) // outputs: "Google"
 });
```

##### திரும்பப் பெறுவது

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           சாளர கைப்பிடி மற்றும் புதிய சாளரத்தின் வகையைக் கொண்ட பொருள் `{handle: string, type: string}` handle - புதிய தாவல் அல்லது சாளரத்தின் சாளர கைப்பிடியின் ID, type - புதிய சாளரத்தின் வகை, 'tab' அல்லது 'window'    
##### எறியப்படுபவை

- **Error**:  `url` தவறானதாக இருந்தால், கட்டளை மொபைலில் பயன்படுத்தப்பட்டால், அல்லது `type` 'tab' அல்லது 'window' இல்லை என்றால்.