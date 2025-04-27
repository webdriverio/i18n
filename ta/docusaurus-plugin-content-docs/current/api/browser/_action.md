---
id: action
title: செயல்பாடு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

செயல் கட்டளை என்பது வலை உலாவிக்கு மெய்நிகர் சாதன உள்ளீடு செயல்களை வழங்குவதற்கான ஒரு குறைந்த நிலை இடைமுகமாகும்.

`scrollIntoView`, `doubleClick` போன்ற உயர் நிலை கட்டளைகளுடன் கூடுதலாக, செயல்கள் API குறிப்பிட்ட உள்ளீடு சாதனங்கள் செய்யக்கூடியவற்றை துல்லியமாக கட்டுப்படுத்த உதவுகிறது. WebdriverIO மூன்று வகையான உள்ளீடு மூலங்களுக்கான இடைமுகத்தை வழங்குகிறது:

- விசைப்பலகை சாதனங்களுக்கான விசை உள்ளீடு
- சுட்டி, பேனா அல்லது தொடு சாதனங்களுக்கான சுட்டி உள்ளீடு
- மற்றும் சுழல் சக்கரச் சாதனங்களுக்கான சக்கர உள்ளீடுகள்

ஒவ்வொரு செயல் கட்டளைகளின் தொடரும் செயல்களின் தொகுப்பைத் தூண்டுவதற்காக `perform` ஐ அழைத்து முடிக்கப்பட வேண்டும். இது செயல்கள் [விடுவிக்கப்படுவதற்கும்](https://w3c.github.io/webdriver/#release-actions) நிகழ்வுகள் எழுப்பப்படுவதற்கும் காரணமாகிறது. `true` ஐ பயன்படுத்தி இதை தவிர்க்கலாம் (எ.கா. `browser.actions(...).perform(true)`).

:::info

இந்த கட்டளைக்கான ஆதரவு மற்றும் குறிப்பிட்ட செயல்கள் சூழலைப் பொறுத்து வேறுபடலாம். மேம்பாட்டின் முன்னேற்றத்தை [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned) இல் பின்பற்றலாம்.
மொபைலுக்கு, [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch) மற்றும் [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands) இல் Appium குறிப்பிட்ட கைசைகை கட்டளைகளைப் பயன்படுத்த வேண்டியிருக்கலாம்.

:::

### விசை உள்ளீட்டு மூலம்

விசை உள்ளீட்டு மூலம் என்பது விசைப்பலகை வகை சாதனத்துடன் தொடர்புடைய உள்ளீட்டு மூலமாகும். இதை `key` வகை அளவுருக்களைப் பயன்படுத்தி தூண்டலாம். எ.கா.:

```ts
browser.action('key')
```

இது பின்வரும் செயல்களை ஆதரிக்கும் `KeyAction` பொருளை வழங்குகிறது:

- `down(value: string)`: விசை அழுத்தப்படும் செயலை உருவாக்குகிறது
- `up(value: string)`: விசை விடுவிக்கும் செயலை உருவாக்குகிறது
- `pause(ms: number)`: ஒரு குறிப்பிட்ட நேரத்தில் உள்ளீட்டு மூலம் எதுவும் செய்யாததைக் குறிக்கிறது

#### சிறப்பு எழுத்துகள்

`Control`, `Page Up` அல்லது `Shift` போன்ற சிறப்பு எழுத்துக்களைப் பயன்படுத்த விரும்பினால், `webdriverio` தொகுப்பிலிருந்து
[`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417) பொருளை இறக்குமதி செய்யவும்:

```ts
import { Key } from 'webdriverio'
```

இந்த பொருள் விரும்பிய சிறப்பு எழுத்தின் யூனிகோட் பிரதிநிதித்துவத்தை அணுக அனுமதிக்கிறது.

### சுட்டி உள்ளீட்டு மூலம்

சுட்டி உள்ளீட்டு மூலம் என்பது சுட்டி-வகை உள்ளீட்டு சாதனத்துடன் தொடர்புடைய உள்ளீட்டு மூலமாகும். `action` கட்டளையை அழைக்கும்போது வகையைக் குறிப்பிடலாம், எ.கா.:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" is default value, also possible: "pen" or "touch"
})
```

இது பின்வரும் செயல்களை ஆதரிக்கும் `PointerAction` பொருளை வழங்குகிறது:

- `down (button: 'left' | 'middle' | 'right')`: ஒரு விசையை அழுத்துவதற்கான செயலை உருவாக்குகிறது
- `down (params: PointerActionParams)`: விரிவான அளவுருக்களுடன் ஒரு விசையை அழுத்துவதற்கான செயலை உருவாக்குகிறது
- `move (x: number, y: number)`: சுட்டியை வியூபோர்ட்டிலிருந்து `x` மற்றும் `y` பிக்ஸல்கள் நகர்த்துவதற்கான செயலை உருவாக்குகிறது
- `move (params: PointerActionMoveParams)`: குறிப்பிட்ட `origin` இலிருந்து சுட்டியை `x` மற்றும் `y` பிக்ஸல்கள் நகர்த்துவதற்கான செயலை உருவாக்குகிறது. `origin` சுட்டியின் தற்போதைய நிலையாக (எ.கா. "pointer"), வியூபோர்ட் (எ.கா. "viewport") அல்லது குறிப்பிட்ட உறுப்பின் மையமாக வரையறுக்கப்படலாம்.
- `up (button: 'left' | 'middle' | 'right')`: ஒரு விசையை விடுவிப்பதற்கான செயலை உருவாக்குகிறது
- `up (params: PointerActionUpParams)`: விரிவான அளவுருக்களுடன் ஒரு விசையை விடுவிப்பதற்கான செயலை உருவாக்குகிறது
- `cancel()`: இந்த சுட்டியின் தற்போதைய உள்ளீட்டை ரத்துசெய்யும் செயல்.
- `pause(ms: number)`: ஒரு குறிப்பிட்ட நேரத்தில் உள்ளீட்டு மூலம் எதுவும் செய்யாததைக் குறிக்கிறது

[`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) மற்றும் [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19) அளவுரு வகைகள் பற்றிய விரிவான தகவல்களை திட்ட வகை வரையறையில் காணலாம்.

### சக்கர உள்ளீட்டு மூலம்

சக்கர உள்ளீட்டு மூலம் என்பது சக்கர-வகை உள்ளீட்டு சாதனத்துடன் தொடர்புடைய உள்ளீட்டு மூலமாகும்.

```ts
browser.action('wheel')
```

இது பின்வரும் செயல்களை ஆதரிக்கும் `WheelAction` பொருளை வழங்குகிறது:

- `scroll (params: ScrollParams)`: பக்கத்தை குறிப்பிட்ட ஆயத்தொலைவுகள் அல்லது தோற்றத்திற்கு உருட்டுகிறது
- `pause(ms: number)`: ஒரு குறிப்பிட்ட நேரத்தில் உள்ளீட்டு மூலம் எதுவும் செய்யாததைக் குறிக்கிறது

[`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) அளவுரு வகை பற்றிய விரிவான தகவல்களை திட்ட வகை வரையறையில் காணலாம்.

##### பயன்பாடு

```js
browser.action()
```

##### எடுத்துக்காட்டுகள்

```js title="pointer-action.js"
it('drag and drop using pointer action command', async () => {
    const origin = await $('#source')
    const targetOrigin = await $('#target')

    return browser.action('pointer')
        .move({ duration: 0, origin, x: 0, y: 0 })
        .down({ button: 0 }) // left button
        .pause(10)
        .move({ duration: 0, origin: targetOrigin })
        .up({ button: 0 })
        .perform()
});
```

```js title="key-action.js"
import { Key } from 'webdriverio'

it('should emit key events using key action commands', async () => {
    const elem = await $('input')
    await elem.click() // make element active

    await browser.action('key')
        .down('f')
        .down('o')
        .down('o')
        .up('f')
        .up('o')
        .up('o')
        .perform()

    console.log(await elem.getValue()) // returns "foo"

    // copy value out of input element
    await browser.action('key')
        .down(Key.Ctrl).down('c')
        .pause(10)
        .up(Key.Ctrl).up('c')
        .perform()
})
```

```js title="wheel-action.js"
it('should scroll using wheel action commands', async () => {
    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform()
    console.log(await browser.execute(() => window.scrollY)) // returns 500
})
```