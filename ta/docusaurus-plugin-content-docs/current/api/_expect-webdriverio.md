---
id: expect-webdriverio
title: எதிர்பார்க்கவும்
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---



சோதனைகளை எழுதும்போது, குறிப்பிட்ட நிபந்தனைகளை மதிப்புகள் பூர்த்தி செய்கின்றனவா என்பதை அடிக்கடி சரிபார்க்க வேண்டியிருக்கும். `expect` உங்களுக்கு பல "பொருத்திகளை" அணுகுவதற்கு அனுமதிக்கிறது, இது `browser`, `element` அல்லது `mock` பொருள் மீது பல்வேறு விஷயங்களை சரிபார்க்க உதவுகிறது.

## இயல்புநிலை விருப்பங்கள்

கீழேயுள்ள இயல்புநிலை விருப்பங்கள் கட்டமைப்பில் அமைக்கப்பட்ட [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) மற்றும் [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) விருப்பங்களுடன் இணைக்கப்பட்டுள்ளன.

உங்கள் உறுதிப்படுத்தல்களுக்கு குறிப்பிட்ட நேர முடிவுகளுக்காக காத்திருக்க விரும்பினால் மட்டுமே கீழே உள்ள விருப்பங்களை அமைக்கவும்.

```js
{
    wait: 2000, // எதிர்பார்ப்பு வெற்றிபெற காத்திருக்க மில்லி செகண்டுகள்
    interval: 100, // முயற்சிகளுக்கு இடையே இடைவெளி
}
```

நீங்கள் வேறுபட்ட நேர முடிவுகள் மற்றும் இடைவெளிகளைத் தேர்ந்தெடுக்க விரும்பினால், இந்த விருப்பங்களை இவ்வாறு அமைக்கவும்:

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### பொருத்தி விருப்பங்கள்

ஒவ்வொரு பொருத்தியும் உறுதிப்படுத்தலை மாற்ற அனுமதிக்கும் பல விருப்பங்களை எடுக்க முடியும்:

##### கட்டளை விருப்பங்கள்

| பெயர் | வகை | விவரங்கள் |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | எதிர்பார்ப்பு வெற்றிபெற காத்திருக்க மில்லி செகண்டுகள். இயல்புநிலை: `3000` |
| <code><var>interval</var></code> | number | முயற்சிகளுக்கு இடையே இடைவெளி. இயல்புநிலை: `100` |
| <code><var>beforeAssertion</var></code> | function | உறுதிப்படுத்தல் செய்யப்படுவதற்கு முன் அழைக்கப்பட வேண்டிய செயல்பாடு |
| <code><var>afterAssertion</var></code> | function | உறுதிப்படுத்தல் முடிவுகளைக் கொண்ட உறுதிப்படுத்தல் செய்யப்பட்ட பிறகு அழைக்கப்பட வேண்டிய செயல்பாடு |
| <code><var>message</var></code> | string | உறுதிப்படுத்தல் பிழைக்கு முன் சேர்க்க பயனர் செய்தி |

##### சரம் விருப்பங்கள்

சரங்கள் உறுதிப்படுத்தப்படும்போது கட்டளை விருப்பங்களுடன் கூடுதலாக இந்த விருப்பத்தைப் பயன்படுத்தலாம்.

| பெயர் | வகை | விவரங்கள் |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | உண்மையான மற்றும் எதிர்பார்க்கப்படும் மதிப்புகள் இரண்டிற்கும் `toLowerCase` பயன்படுத்தவும் |
| <code><var>trim</var></code> | boolean | உண்மையான மதிப்பிற்கு `trim` பயன்படுத்தவும் |
| <code><var>replace</var></code> | Replacer \| Replacer[] | சரம்/RegExp பொருந்தும் உண்மையான மதிப்பின் பகுதிகளை மாற்றவும். மாற்றுபவர் ஒரு சரம் அல்லது ஒரு செயல்பாடாக இருக்கலாம்.
| <code><var>containing</var></code> | boolean | உண்மையான மதிப்பு எதிர்பார்க்கப்படும் மதிப்பைக் கொண்டிருக்க வேண்டும், இல்லையெனில் கண்டிப்பாக சமம். |
| <code><var>asString</var></code> | boolean | பண்பு மதிப்பை கட்டாயமாக சரமாக மாற்ற உதவலாம் |
| <code><var>atStart</var></code> | boolean | உண்மையான மதிப்பு எதிர்பார்க்கப்படும் மதிப்புடன் தொடங்குவதை எதிர்பார்க்கவும் |
| <code><var>atEnd</var></code> | boolean | உண்மையான மதிப்பு எதிர்பார்க்கப்படும் மதிப்புடன் முடிவடைவதை எதிர்பார்க்கவும் |
| <code><var>atIndex</var></code> | number | உண்மையான மதிப்பு கொடுக்கப்பட்ட குறியீட்டில் எதிர்பார்க்கப்படும் மதிப்பைக் கொண்டிருக்க வேண்டும் |

##### எண் விருப்பங்கள்

எண்கள் உறுதிப்படுத்தப்படும்போது கட்டளை விருப்பங்களுக்கு கூடுதலாக இந்த விருப்பத்தைப் பயன்படுத்தலாம்.

| பெயர் | வகை | விவரங்கள் |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | சமம் |
| <code><var>lte</var></code> | number | குறைவாக சமம் |
| <code><var>gte</var></code> | number | அதிகமாக அல்லது சமம் |

### HTML நிறுவனங்களைக் கையாளுதல்

ஒரு HTML நிறுவனம் என்பது ஆம்பர்சாண்ட் (`&`) உடன் தொடங்கி செமிகோலனுடன் (`;`) முடிவடையும் ஒரு உரைப் பகுதி ("சரம்") ஆகும். நிறுவனங்கள் பெரும்பாலும் ஒதுக்கப்பட்ட எழுத்துக்களைக் காட்ட பயன்படுத்தப்படுகின்றன (அவை HTML குறியீடாக விளக்கப்படும்) மற்றும் கண்ணுக்குத் தெரியாத எழுத்துக்கள் (உடைக்க முடியாத இடைவெளிகள் போன்றவை, எ.கா. `&nbsp;`).

இத்தகைய உறுப்பைக் கண்டறிய அல்லது தொடர்புகொள்ள, நிறுவனத்தின் யூனிகோட் சமானத்தைப் பயன்படுத்தவும். எ.கா.:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

அனைத்து யூனிகோட் குறிப்புகளையும் [HTML விவரக்குறிப்பில்](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references) காணலாம்.

**குறிப்பு:** யூனிகோட் பெரிய-சிறிய எழுத்துகளைப் பொருட்படுத்தாது, எனவே `\u00a0` மற்றும் `\u00A0` இரண்டும் செயல்படும். உலாவியில் ஆய்வு செய்வதற்கான உறுப்பைக் கண்டறிய, யூனிகோடிலிருந்து `u` ஐ அகற்றவும் உ.ம்: `div[data="Some\00a0Value"]`

## உலாவி பொருத்திகள்

### toHaveUrl

உலாவி ஒரு குறிப்பிட்ட பக்கத்தில் உள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

வலைத்தளம் ஒரு குறிப்பிட்ட தலைப்பைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

உலாவியில் அதன் கிளிப்போர்டில் ஒரு குறிப்பிட்ட உரை சேமிக்கப்பட்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## உறுப்பு பொருத்திகள்

### toBeDisplayed

கொடுக்கப்பட்ட உறுப்பில் [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) ஐ அழைக்கிறது.

##### பயன்பாடு

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

கொடுக்கப்பட்ட உறுப்பில் [`isExisting`](https://webdriver.io/docs/api/element/isExisting) ஐ அழைக்கிறது.

##### பயன்பாடு

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

`toExist` போன்றது.

##### பயன்பாடு

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

`toExist` போன்றது.

##### பயன்பாடு

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

உறுப்பு ஃபோகஸைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது. இந்த உறுதிப்படுத்தல் வலை சூழலில் மட்டுமே செயல்படும்.

##### பயன்பாடு

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

ஒரு உறுப்பு குறிப்பிட்ட மதிப்புடன் ஒரு குறிப்பிட்ட பண்பைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

`toHaveAttribute` போன்றது.

##### பயன்பாடு

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

ஒரு உறுப்பு ஒரு வகுப்பு பெயரைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது. உறுப்பு பல வகுப்பு பெயர்களைக் கொண்டிருக்கும் போது, அளவுருவாக ஒரு அணியுடன் அழைக்கலாம்.

##### பயன்பாடு

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

ஒரு உறுப்பு ஒரு குறிப்பிட்ட பண்பைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

உள்ளீட்டு உறுப்பு ஒரு குறிப்பிட்ட மதிப்பைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

உறுப்பில் [`isClickable`](https://webdriver.io/docs/api/element/isClickable) ஐ அழைப்பதன் மூலம் ஒரு உறுப்பை கிளிக் செய்ய முடியுமா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

உறுப்பில் [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) ஐ அழைப்பதன் மூலம் ஒரு உறுப்பு முடக்கப்பட்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// same as
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

உறுப்பில் [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) ஐ அழைப்பதன் மூலம் ஒரு உறுப்பு இயக்கப்பட்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// same as
await expect(elem).not.toBeDisabled()
```

### toBeSelected

உறுப்பில் [`isSelected`](https://webdriver.io/docs/api/element/isSelected) ஐ அழைப்பதன் மூலம் ஒரு உறுப்பு இயக்கப்பட்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

`toBeSelected` போன்றது.

##### பயன்பாடு

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

உறுப்பு ஒரு குறிப்பிட்ட கணக்கிடப்பட்ட WAI-ARIA லேபிளைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது. உறுப்பு வெவ்வேறு லேபிள்களைக் கொண்டிருக்கும் சந்தர்ப்பத்தில் அளவுருவாக ஒரு அணியுடன் அழைக்கலாம்.

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

உறுப்பு ஒரு குறிப்பிட்ட கணக்கிடப்பட்ட WAI-ARIA பங்கைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது. உறுப்பு வெவ்வேறு லேபிள்களைக் கொண்டிருக்கும் சந்தர்ப்பத்தில் அளவுருவாக ஒரு அணியுடன் அழைக்கலாம்.

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

இணைப்பு உறுப்பு ஒரு குறிப்பிட்ட இணைப்பு இலக்கைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

`toHaveHref` போன்றது.

##### பயன்பாடு

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

உறுப்பு ஒரு குறிப்பிட்ட `id` பண்பைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

உறுப்பு ஒரு குறிப்பிட்ட உரையைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது. உறுப்பு வெவ்வேறு உரைகளைக் கொண்டிருக்கும் சந்தர்ப்பத்தில் அளவுருவாக ஒரு அணியுடன் அழைக்கலாம்.

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

கீழேயுள்ள div இல் உறுப்புகளின் பட்டியல் இருந்தால்:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

அவற்றை ஒரு அணியைப் பயன்படுத்தி உறுதிப்படுத்தலாம்:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

உறுப்பு ஒரு குறிப்பிட்ட உரையைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது. உறுப்பு வெவ்வேறு உரைகளைக் கொண்டிருக்கும் சந்தர்ப்பத்தில் அளவுருவாக ஒரு அணியுடன் அழைக்கலாம்.

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

உறுப்பில் [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) ஐ அழைப்பதன் மூலம் ஒரு உறுப்பு பார்வைப் பகுதிக்குள் உள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

`element.$('./*')` கட்டளையை அழைப்பதன் மூலம் பெறப்பட்ட உறுப்பின் குழந்தைகளின் எண்ணிக்கையைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
const list = await $('ul')
await expect(list).toHaveChildren() // the list has at least one item
// same as
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // the list has 3 items
// same as 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

உறுப்பு ஒரு குறிப்பிட்ட அகலத்தைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

உறுப்பு ஒரு குறிப்பிட்ட உயரத்தைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

உறுப்பு ஒரு குறிப்பிட்ட அளவைக் கொண்டுள்ளதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

[`$$`](https://webdriver.io/docs/api/element/$) கட்டளையைப் பயன்படுத்தி பெறப்பட்ட உறுப்புகளின் எண்ணிக்கையைச் சரிபார்க்கிறது.

**குறிப்பு:** உறுதிப்படுத்தல் தேறினால், இந்த பொருத்தி சமீபத்திய உறுப்புகளுடன் அனுப்பப்பட்ட அணியை புதுப்பிக்கும். இருப்பினும், நீங்கள் மாறியை மீண்டும் ஒதுக்கியிருந்தால், உறுப்புகளை மீண்டும் பெற வேண்டும்.

##### பயன்பாடு

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 items in the list

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// same as
assert.ok(listItems.length <= 10)
```

## நெட்வொர்க் பொருத்திகள்

### toBeRequested

போலி அழைக்கப்பட்டதா என்பதைச் சரிபார்க்கிறது

##### பயன்பாடு

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

போலி எதிர்பார்க்கப்பட்ட முறைகள் அழைக்கப்பட்டதா என்பதைச் சரிபார்க்கிறது

##### பயன்பாடு

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // request called at least 5 times but less than 11
```

### toBeRequestedWith

எதிர்பார்க்கப்பட்ட விருப்பங்களின்படி போலி அழைக்கப்பட்டதா என்பதைச் சரிபார்க்கிறது.

பெரும்பாலான விருப்பங்கள் [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject) போன்ற எதிர்பார்க்க/ஜாஸ்மின் பகுதி பொருத்திகளை ஆதரிக்கின்றன

##### பயன்பாடு

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [optional] string | function | custom matcher
    method: 'POST',                                 // [optional] string | array
    statusCode: 200,                                // [optional] number | array
    requestHeaders: { Authorization: 'foo' },       // [optional] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [optional] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [optional] object | function | custom matcher
    response: { success: true },                    // [optional] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // either POST or PUT
    statusCode: [401, 403],  // either 401 or 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## ஸ்னாப்ஷாட் பொருத்தி

WebdriverIO அடிப்படை ஸ்னாப்ஷாட் சோதனைகள் மற்றும் DOM ஸ்னாப்ஷாட் சோதனைகளை ஆதரிக்கிறது.

### toMatchSnapshot

எந்த தன்னிச்சையான பொருளும் ஒரு குறிப்பிட்ட மதிப்புடன் பொருந்துகிறதா என்பதைச் சரிபார்க்கிறது. நீங்கள் ஒரு [`WebdriverIO.Element`](https://webdriver.io/docs/api/element) ஐ அனுப்பினால், அது தானாகவே அதன் [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) நிலையை ஸ்னாப்ஷாட் செய்யும்.

##### பயன்பாடு

```js
// snapshot arbitrary objects (no "await" needed here)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot `outerHTML` of WebdriverIO.Element (DOM snapshot, requires "await")
await expect($('elem')).toMatchSnapshot()
// snapshot result of element command
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

அதேபோல், ஸ்னாப்ஷாட்டை சோதனை கோப்பில் இன்லைனாக சேமிக்க `toMatchInlineSnapshot()` ஐப் பயன்படுத்தலாம். எடுத்துக்காட்டு:

```js
await expect($('img')).toMatchInlineSnapshot()
```

ஸ்னாப்ஷாட் கோப்பை உருவாக்குவதற்குப் பதிலாக, ஸ்னாப்ஷாட்டை ஒரு சரம் போல் புதுப்பிக்க WebdriverIO சோதனை கோப்பை நேரடியாக மாற்றும்:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## விஷுவல் ஸ்னாப்ஷாட் பொருத்திகள்

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

பின்வரும் பொருத்திகள் `@wdio/visual-service` செருகுநிரலின் ஒரு பகுதியாக செயல்படுத்தப்பட்டுள்ளன மற்றும் சேவை அமைக்கப்பட்டிருக்கும்போது மட்டுமே கிடைக்கும். [அமைப்பு வழிமுறைகளை](https://webdriver.io/docs/visual-testing) முறையாகப் பின்பற்றுவதை உறுதிசெய்க.

### toMatchElementSnapshot

கொடுக்கப்பட்ட உறுப்பு அடிப்படை ஸ்னாப்ஷாட்டுடன் பொருந்துகிறதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // options
})
```

எதிர்பார்க்கப்படும் முடிவு இயல்பாக `0`, எனவே நீங்கள் அதே உறுதிப்படுத்தலை இவ்வாறு எழுதலாம்:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // options
})
```

அல்லது எந்த விருப்பங்களையும் அனுப்பாமல் இருக்கலாம்:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

தற்போதைய திரை அடிப்படை ஸ்னாப்ஷாட்டுடன் பொருந்துகிறதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // options
})
```

எதிர்பார்க்கப்படும் முடிவு இயல்பாக `0`, எனவே நீங்கள் அதே உறுதிப்படுத்தலை இவ்வாறு எழுதலாம்:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // options
})
```

அல்லது எந்த விருப்பங்களையும் அனுப்பாமல் இருக்கலாம்:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

முழு பக்க ஸ்க்ரீன்ஷாட் அடிப்படை ஸ்னாப்ஷாட்டுடன் பொருந்துகிறதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // options
})
```

எதிர்பார்க்கப்படும் முடிவு இயல்பாக `0`, எனவே நீங்கள் அதே உறுதிப்படுத்தலை இவ்வாறு எழுதலாம்:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // options
})
```

அல்லது எந்த விருப்பங்களையும் அனுப்பாமல் இருக்கலாம்:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

டேப் குறிகள் உள்ளிட்ட முழு பக்க ஸ்க்ரீன்ஷாட் அடிப்படை ஸ்னாப்ஷாட்டுடன் பொருந்துகிறதா என்பதைச் சரிபார்க்கிறது.

##### பயன்பாடு

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // options
})
```

எதிர்பார்க்கப்படும் முடிவு இயல்பாக `0`, எனவே நீங்கள் அதே உறுதிப்படுத்தலை இவ்வாறு எழுதலாம்:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // options
})
```

அல்லது எந்த விருப்பங்களையும் அனுப்பாமல் இருக்கலாம்:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## வழக்கமான வெளிப்பாடுகளைப் பயன்படுத்துதல்

உரை ஒப்பீடு செய்யும் அனைத்து பொருத்திகளுக்கும் நீங்கள் நேரடியாக வழக்கமான வெளிப்பாடுகளைப் பயன்படுத்தலாம்.

##### பயன்பாடு

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## இயல்புநிலை பொருத்திகள்

`expect-webdriverio` பொருத்திகளுக்கு கூடுதலாக, Jest'ன் [எதிர்பார்](https://jestjs.io/docs/en/expect) உறுதிப்படுத்தல்கள் அல்லது ஜாஸ்மின் [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) ஐ நீங்கள் பயன்படுத்தலாம்.

## அசமச்சீர் பொருத்திகள்

WebdriverIO உரை மதிப்புகளை ஒப்பிடும் இடங்களில் அசமச்சீர் பொருத்திகளின் பயன்பாட்டை ஆதரிக்கிறது, எ.கா:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

அல்லது

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

நீங்கள் [WDIO டெஸ்ட்ரன்னரைப்](https://webdriver.io/docs/clioptions) பயன்படுத்தினால், அனைத்தும் தானாகவே அமைக்கப்படும். ஆவணங்களிலிருந்து [அமைப்பு வழிகாட்டியைப்](https://webdriver.io/docs/typescript#framework-setup) பின்பற்றவும். ஆனால் நீங்கள் WebdriverIO ஐ வேறு டெஸ்ட்ரன்னருடன் அல்லது எளிய Node.js ஸ்கிரிப்டில் இயக்கினால், `tsconfig.json` இல் `types` இல் `expect-webdriverio` ஐச் சேர்க்க வேண்டும்.

- ஜாஸ்மின்/ஜெஸ்ட் பயனர்களைத் தவிர அனைவருக்கும் `"expect-webdriverio"`.
- `"expect-webdriverio/jasmine"` ஜாஸ்மின்
- `"expect-webdriverio/jest"` ஜெஸ்ட்

## JavaScript (VSCode)

வெனிலா js இல் தானியங்கு நிறைவைச் செயல்படுத்த திட்ட ரூட்டில் `jsconfig.json` ஐ உருவாக்க வேண்டும் மற்றும் வகை வரையறைகளைக் குறிப்பிட வேண்டும்.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## உங்கள் சொந்த பொருத்திகளைச் சேர்த்தல்

`expect-webdriverio` ஜாஸ்மின்/ஜெஸ்ட் பொருத்திகளை விரிவுபடுத்துவதைப் போலவே, தனிப்பயன் பொருத்திகளைச் சேர்ப்பது சாத்தியமாகும்.

- ஜாஸ்மின் ஆவணத்தின் [தனிப்பயன் பொருத்திகளைப்](https://jasmine.github.io/2.5/custom_matcher.html) பார்க்கவும்
- மற்றவர்கள் ஜெஸ்ட்டின் [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) ஐப் பார்க்கவும்

தனிப்பயன் பொருத்திகள் wdio `before` ஹூக்கில் சேர்க்கப்பட வேண்டும்

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - Jest example
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Temporary workaround. See https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```