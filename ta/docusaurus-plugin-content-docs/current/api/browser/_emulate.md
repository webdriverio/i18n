---
id: emulate
title: அனுகரிக்க
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO உங்களை `emulate` கட்டளையைப் பயன்படுத்தி வலை API-களை அனுகரிக்க அனுமதிக்கிறது. இந்த வலை API-கள் நீங்கள் குறிப்பிடும் விதத்தில் சரியாக செயல்படும். பின்வரும் அளவுகள் ஆதரிக்கப்படுகின்றன:

- `geolocation`: புவியிருப்பிட API-ஐ அனுகரிக்க
- `userAgent`: பயனர் முகவரை அனுகரிக்க
- `colorScheme`: வண்ண திட்டத்தை அனுகரிக்க
- `onLine`: ஆன்லைன் நிலையை அனுகரிக்க
- `device`: குறிப்பிட்ட மொபைல் அல்லது டெஸ்க்டாப் சாதனத்தை அனுகரிக்க
- `clock`: கணினி கடிகாரத்தை அனுகரிக்க

`emulate` கட்டளை அனுகரிப்பை மீட்டமைக்க அழைக்கக்கூடிய ஒரு செயல்பாட்டை திருப்பித் தருகிறது. இது ஒரு சோதனைக்குப் பிறகு அல்லது சோதனைகளின் தொகுப்புக்குப் பிறகு அனுகரிப்பை மீட்டமைக்க விரும்பும்போது பயனுள்ளதாக இருக்கும்.

இதைப் பற்றி மேலும் [Emulation](/docs/emulation) வழிகாட்டுதல்களில் படிக்கவும்.

:::info

`clock` அளவைத் தவிர, பக்கத்தை மீண்டும் ஏற்றாமல் அனுகரிக்கப்பட்ட மதிப்பை மாற்ற முடியாது.

:::

:::info

இந்த அம்சத்திற்கு உலாவியில் WebDriver Bidi ஆதரவு தேவை. Chrome, Edge மற்றும் Firefox இன் சமீபத்திய பதிப்புகள் இத்தகைய ஆதரவைக் கொண்டிருந்தாலும், Safari __அவ்வாறு இல்லை__. புதுப்பிப்புகளுக்கு [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned) ஐப் பின்தொடரவும்.
மேலும் நீங்கள் உலாவிகளை இயக்க கிளவுட் விற்பனையாளரைப் பயன்படுத்தினால், உங்கள் விற்பனையாளர் WebDriver Bidi ஐ ஆதரிக்கிறதா என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்.

:::

`EmulationOptions` பொருள் அளவைப் பொறுத்து பின்வரும் பண்புகளைக் கொண்டிருக்கலாம்:

| அளவு         | விருப்பங்கள்                                    |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### பயன்பாடு

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>நீங்கள் அனுகரிக்க விரும்பும் உலாவியின் அம்சம், `clock`, `geolocation`, `userAgent`, `colorScheme` அல்லது `onLine` எனலாம்</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>குறிப்பிட்ட அளவுக்கான அனுகரிப்பு விருப்பம்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### திருப்பி அனுப்புகிறது

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   அனுகரிப்பை மீட்டமைக்க ஒரு செயல்பாடு