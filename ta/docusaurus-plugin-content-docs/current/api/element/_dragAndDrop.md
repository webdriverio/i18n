---
id: dragAndDrop
title: இழுத்து விடுதல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

ஒரு உருப்படியை இலக்கு உறுப்பு அல்லது நிலைக்கு இழுக்கவும்.

:::info

இந்த கட்டளையின் செயல்பாடு உங்கள் பயன்பாட்டில் இழு மற்றும் விடு எவ்வாறு 
செயல்படுத்தப்பட்டுள்ளது என்பதைப் பெரிதும் சார்ந்துள்ளது. சிக்கல்கள் ஏற்பட்டால் உங்கள் எடுத்துக்காட்டை 
[#4134](https://github.com/webdriverio/webdriverio/issues/4134) இல் பதிவிடவும்.

:::

##### பயன்பாடு

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>இலக்கு உறுப்பு அல்லது x மற்றும் y பண்புகளைக் கொண்ட பொருள்</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`DragAndDropOptions`</td>
      <td>இழுத்து விடுதல் கட்டளை விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number`</td>
      <td>இழுத்தல் எவ்வளவு நேரம் நடைபெற வேண்டும்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```