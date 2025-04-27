---
id: getLocation
title: இருப்பிடத்தைப் பெறுதல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

பக்கத்தில் ஒரு கூறுப்பொருளின் இருப்பிடத்தைக் கண்டறியவும். (0, 0) என்ற புள்ளி பக்கத்தின் மேல்-இடது மூலையைக் குறிக்கிறது.

##### பயன்பாடு

```js
$(selector).getLocation(prop)
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
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>எளிதான உறுதிப்படுத்தல்களுக்கு நேரடியாக முடிவு மதிப்பைப் பெற "x" அல்லது "y" ஆக இருக்கலாம்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="getLocation.js"
it('should demonstrate the getLocation function', async () => {
    await browser.url('http://github.com');
    const logo = await $('.octicon-mark-github')
    const location = await logo.getLocation();
    console.log(location); // outputs: { x: 150, y: 20 }

    const xLocation = await logo.getLocation('x')
    console.log(xLocation); // outputs: 150

    const yLocation = await logo.getLocation('y')
    console.log(yLocation); // outputs: 20
});
```

##### திரும்பப் பெறுகிறது

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   பக்கத்தில் கூறுப்பொருளுக்கான X மற்றும் Y ஆயத்தொலைவுகள் `{x:number, y:number}`