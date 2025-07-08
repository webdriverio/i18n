---
id: bestpractices
title: சிறந்த நடைமுறைகள்
---

# சிறந்த நடைமுறைகள்

இந்த வழிகாட்டி உங்களுக்கு செயல்திறன் மிக்க மற்றும் நெகிழ்வான சோதனைகளை எழுத உதவும் எங்களின் சிறந்த நடைமுறைகளை பகிர்வதை நோக்கமாகக் கொண்டுள்ளது.

## நெகிழ்வான தேர்வுக்கூறுகளைப் பயன்படுத்துங்கள்

DOM இல் மாற்றங்களுக்கு நெகிழ்வான தேர்வுக்கூறுகளைப் பயன்படுத்துவதன் மூலம், உதாரணமாக ஒரு உறுப்பிலிருந்து ஒரு வகுப்பு நீக்கப்படும்போது குறைவான அல்லது சோதனைகள் தோல்வியடையாமல் இருக்கும்.

வகுப்புகள் பல உறுப்புகளுக்கு பயன்படுத்தப்படலாம், அந்த வகுப்பைக் கொண்ட அனைத்து உறுப்புகளையும் பெற வேண்டுமென்றால் தவிர, முடிந்தவரை தவிர்க்கப்பட வேண்டும்.

```js
// 👎
await $('.button')
```

இந்த அனைத்து தேர்வுக்கூறுகளும் ஒரு உறுப்பை மட்டுமே திருப்பி அனுப்ப வேண்டும்.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__குறிப்பு:__ WebdriverIO ஆதரிக்கும் அனைத்து சாத்தியமான தேர்வுக்கூறுகளையும் அறிய, எங்களின் [தேர்வுக்கூறுகள்](./Selectors.md) பக்கத்தைப் பார்க்கவும்.

## உறுப்பு வினவல்களின் எண்ணிக்கையை கட்டுப்படுத்துங்கள்

ஒவ்வொரு முறையும் நீங்கள் [`$`](https://webdriver.io/docs/api/browser/$) அல்லது [`$$`](https://webdriver.io/docs/api/browser/$$) கட்டளையைப் பயன்படுத்தும்போது (இதில் அவற்றை சங்கிலியாக்குவதும் அடங்கும்), WebdriverIO DOM இல் உறுப்பைக் கண்டறிய முயற்சிக்கிறது. இந்த வினவல்கள் அதிக செலவு கொண்டவை, எனவே நீங்கள் அவற்றை முடிந்தவரை கட்டுப்படுத்த முயற்சிக்க வேண்டும்.

மூன்று உறுப்புகளை வினவுகிறது.

```js
// 👎
await $('table').$('tr').$('td')
```

ஒரே ஒரு உறுப்பை மட்டுமே வினவுகிறது.

``` js
// 👍
await $('table tr td')
```

நீங்கள் வெவ்வேறு [தேர்வுக்கூறு உத்திகளை](https://webdriver.io/docs/selectors/#custom-selector-strategies) இணைக்க விரும்பும்போது மட்டுமே சங்கிலியாக்கலைப் பயன்படுத்த வேண்டும்.
இந்த உதாரணத்தில் நாங்கள் [ஆழமான தேர்வுக்கூறுகளை](https://webdriver.io/docs/selectors#deep-selectors) பயன்படுத்துகிறோம், இது ஒரு உறுப்பின் shadow DOM க்குள் செல்வதற்கான உத்தியாகும்.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### பட்டியலிலிருந்து ஒன்றை எடுப்பதற்குப் பதிலாக ஒரு உறுப்பைக் கண்டறிவதை விரும்புங்கள்

இதை எப்போதும் செய்ய முடியாது, ஆனால் [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) போன்ற CSS போலி-வகுப்புகளைப் பயன்படுத்தி, அவற்றின் பெற்றோர்களின் குழந்தைப் பட்டியலில் உள்ள உறுப்புகளின் குறியீடுகளின் அடிப்படையில் உறுப்புகளைப் பொருத்தலாம்.

அனைத்து அட்டவணை வரிசைகளையும் வினவுகிறது.

```js
// 👎
await $$('table tr')[15]
```

ஒரு அட்டவணை வரிசையை மட்டும் வினவுகிறது.

```js
// 👍
await $('table tr:nth-child(15)')
```

## உள்ளமைக்கப்பட்ட உறுதிப்பாடுகளைப் பயன்படுத்துங்கள்

முடிவுகள் பொருந்துவதற்காக தானாகவே காத்திருக்காத கைமுறை உறுதிப்பாடுகளைப் பயன்படுத்த வேண்டாம், இது நிலையற்ற சோதனைகளுக்கு காரணமாகும்.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

உள்ளமைக்கப்பட்ட உறுதிப்பாடுகளைப் பயன்படுத்துவதன் மூலம், WebdriverIO உண்மையான முடிவு எதிர்பார்க்கப்பட்ட முடிவுடன் பொருந்தும் வரை தானாகவே காத்திருக்கும், இது நெகிழ்வான சோதனைகளை உருவாக்கும்.
உறுதிப்பாடு வெற்றியடையும் வரை அல்லது நேரம் முடியும் வரை தானாகவே மீண்டும் முயற்சிப்பதன் மூலம் இதை அடைகிறது.

```js
// 👍
await expect(button).toBeDisplayed()
```

## சோம்பல் ஏற்றுதல் மற்றும் வாக்குறுதி சங்கிலியாக்கல்

WebdriverIO தூய்மையான குறியீட்டை எழுதுவதற்கு சில தந்திரங்களைக் கொண்டுள்ளது, இது உறுப்பை சோம்பேறித்தனமாக ஏற்றுவதன் மூலம் உங்கள் வாக்குறுதிகளை சங்கிலியாக்க அனுமதிக்கிறது மற்றும் `await` அளவைக் குறைக்கிறது. இது உறுப்பை Element க்குப் பதிலாக ChainablePromiseElement ஆக அனுப்ப அனுமதிக்கிறது மற்றும் பக்க பொருள்களுடன் எளிதாக பயன்படுத்த அனுமதிக்கிறது.

எனவே எப்போது `await` பயன்படுத்த வேண்டும்?
`$` மற்றும் `$$` கட்டளைகளைத் தவிர, நீங்கள் எப்போதும் `await` பயன்படுத்த வேண்டும்.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// or
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// or
await $('div').$('button').click()
```

## கட்டளைகள் மற்றும் உறுதிப்பாடுகளை அதிகமாகப் பயன்படுத்த வேண்டாம்

expect.toBeDisplayed பயன்படுத்தும்போது, உறுப்பு இருப்பதற்காகவும் மறைமுகமாகக் காத்திருக்கிறீர்கள். அதே விஷயத்தைச் செய்யும் உறுதிப்பாடு ஏற்கனவே இருக்கும்போது waitForXXX கட்டளைகளைப் பயன்படுத்த தேவையில்லை.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

ஊடாடும்போது அல்லது அதன் உரையை உறுதிப்படுத்தும்போது உறுப்பு இருக்க அல்லது காட்டப்பட காத்திருக்க தேவையில்லை, உறுப்பு வெளிப்படையாக மறைக்கப்படலாம் (உதாரணமாக ஒளிபுகுதிறன்: 0) அல்லது வெளிப்படையாக முடக்கப்படலாம் (உதாரணமாக முடக்கப்பட்ட பண்பு) என்ற நிலையில், உறுப்பு காட்டப்படுவதற்காக காத்திருப்பது அர்த்தமுள்ளதாக இருக்கும்.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## மாறும் சோதனைகள்

சோதனையில் கடினமாக குறியீடு செய்வதற்குப் பதிலாக, மாறும் சோதனைத் தரவு, எ.கா. இரகசிய சான்றுகளை சேமிக்க சூழல் மாறிகளைப் பயன்படுத்தவும். இந்த தலைப்பில் மேலும் தகவலுக்கு [அளவுருக்கள் சோதனைகள்](parameterize-tests) பக்கத்திற்குச் செல்லவும்.

## உங்கள் குறியீட்டை Lint செய்யுங்கள்

உங்கள் குறியீட்டை லிண்ட் செய்ய eslint ஐப் பயன்படுத்துவதன் மூலம் நீங்கள் முன்கூட்டியே பிழைகளைக் கண்டறியலாம், சில சிறந்த நடைமுறைகள் எப்போதும் பயன்படுத்தப்படுவதை உறுதிசெய்ய எங்களின் [லிண்டிங் விதிகளைப்](https://www.npmjs.com/package/eslint-plugin-wdio) பயன்படுத்தவும்.

## இடைநிறுத்த வேண்டாம்

இடைநிறுத்த கட்டளையைப் பயன்படுத்த தூண்டப்படலாம், ஆனால் இதைப் பயன்படுத்துவது ஒரு மோசமான யோசனை, ஏனெனில் இது நெகிழ்வானதல்ல மற்றும் நீண்ட காலத்தில் நிலையற்ற சோதனைகளுக்கு மட்டுமே காரணமாகும்.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## ஒத்திசைவற்ற சுழற்சிகள்

நீங்கள் மீண்டும் செய்ய விரும்பும் சில ஒத்திசைவற்ற குறியீடு இருக்கும்போது, எல்லா சுழற்சிகளும் இதைச் செய்ய முடியாது என்பதை அறிவது முக்கியம்.
உதாரணமாக, வரிசையின் forEach செயல்பாடு ஒத்திசைவற்ற கால்பேக்குகளை அனுமதிக்காது, இது [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) இல் படிக்கலாம்.

__குறிப்பு:__ இந்த உதாரணத்தில் காட்டப்பட்டுள்ளபடி `console.log(await $$('h1').map((h1) => h1.getText()))` போன்ற செயல்பாடு ஒத்திசைவாக இருக்க வேண்டியதில்லை என்றால் நீங்கள் இவற்றைப் பயன்படுத்தலாம்.

இதன் பொருள் என்னவென்பதற்கான சில உதாரணங்கள் கீழே உள்ளன.

ஒத்திசைவற்ற கால்பேக்குகள் ஆதரிக்கப்படாததால் பின்வரும் செயல்படாது.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

பின்வருவன செயல்படும்.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## எளிமையாக வைத்திருங்கள்

சில நேரங்களில் எங்கள் பயனர்கள் உரை அல்லது மதிப்புகள் போன்ற தரவை வரைபடமிடுவதைக் காண்கிறோம். இது பெரும்பாலும் தேவையில்லை மற்றும் பெரும்பாலும் ஒரு குறியீட்டு நாற்றமாகும், இது ஏன் என்பதை கீழே உள்ள உதாரணங்களைப் பார்க்கவும்.

```js
// 👎 மிகவும் சிக்கலானது, ஒத்திசைவான உறுதிப்பாடு, நிலையற்ற சோதனைகளைத் தடுக்க உள்ளமைக்கப்பட்ட உறுதிப்பாடுகளைப் பயன்படுத்தவும்
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 மிகவும் சிக்கலானது
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 உறுப்புகளின் நிலையைக் கணக்கில் எடுத்துக்கொள்ளாமல் அவற்றின் உரையால் உறுப்புகளைக் கண்டறிகிறது
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 தனித்துவமான அடையாளங்களைப் பயன்படுத்தவும் (பெரும்பாலும் தனிப்பயன் உறுப்புகளுக்குப் பயன்படுத்தப்படுகிறது)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 அணுகல் பெயர்கள் (பெரும்பாலும் உள்ளூர் html உறுப்புகளுக்குப் பயன்படுத்தப்படுகிறது)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

மற்றொரு விஷயம் நாங்கள் சில நேரங்களில் பார்ப்பது என்னவென்றால் எளிய விஷயங்களுக்கு மிகவும் சிக்கலான தீர்வு உள்ளது.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## இணையாக குறியீட்டை இயக்குதல்

சில குறியீடு இயக்கப்படும் வரிசையைப் பற்றி நீங்கள் கவலைப்படவில்லை என்றால், செயல்பாட்டை வேகப்படுத்த [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) ஐப் பயன்படுத்தலாம்.

__குறிப்பு:__ இது குறியீட்டைப் படிப்பதை கடினமாக்குவதால், நீங்கள் ஒரு பக்க பொருள் அல்லது ஒரு செயல்பாட்டைப் பயன்படுத்தி இதை சுருக்கலாம், ஆனால் செயல்திறனில் உள்ள நன்மை படிப்பதன் செலவுக்கு மதிப்புள்ளதா என்பதையும் நீங்கள் கேள்வி கேட்க வேண்டும்.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

சுருக்கமாக இருந்தால், அது கீழே உள்ளது போல இருக்கலாம், அங்கு தர்க்கம் submitWithDataOf என்ற முறையில் வைக்கப்பட்டுள்ளது மற்றும் தரவு Person வகுப்பால் பெறப்படுகிறது.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```