---
id: setWindowSize
title: சாளர அளவை அமைக்க
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

வழங்கப்பட்ட அகலம் மற்றும் உயரத்தின்படி உலாவி சாளரத்தின் வெளிப்புற அளவை மாற்றியமைக்கிறது. உங்கள் இயக்க முறைமையைப் பொறுத்து, சில உலாவி சாளரங்கள் `500px` விட குறைவான அகலத்தை அனுமதிக்காது. நீங்கள் ஒரு iPhone போன்ற சாதனத்தின் பார்வை பகுதியை போல செய்ய விரும்பினால், `setViewport` கட்டளையைப் பயன்படுத்துவதை கருத்தில் கொள்ள வேண்டும்.

##### பயன்பாடு

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>உலாவி வழங்கப்பட்ட அகலத்திற்கு மாற்றியமைக்கப்படும்</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>உலாவி வழங்கப்பட்ட உயரத்திற்கு மாற்றியமைக்கப்படும்</td>
    </tr>
  </tbody>
</table>

##### திருப்பி அனுப்புவது

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  *NO*W3C உலாவிக்கு Null மற்றும் W3C உலாவிக்கு `{x, y, width, height}` பொருள்