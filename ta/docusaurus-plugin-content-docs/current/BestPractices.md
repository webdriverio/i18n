---
id: bestpractices
title: சிறந்த நடைமுறைகள்
description: "நிலையான selectors, குறைவான element queries, உள்ளமைக்கப்பட்ட assertions மற்றும் கைமுறை இடைநிறுத்தங்கள் இல்லாமல் WebdriverIO மூலம் வேகமான, உறுதியான சோதனைகளை எழுதுங்கள்."
---

# சிறந்த நடைமுறைகள்

செயல்திறன் மிக்க மற்றும் உறுதியான சோதனைகளை எழுத உதவும் எங்கள் சிறந்த நடைமுறைகளைப் பகிர்வதே இந்த வழிகாட்டியின் நோக்கமாகும்.

## உறுதியான selectors-ஐப் பயன்படுத்துங்கள்

DOM-இல் ஏற்படும் மாற்றங்களுக்கு உறுதியாக இருக்கும் selectors-ஐப் பயன்படுத்துவதன் மூலம், எடுத்துக்காட்டாக ஒரு element-இலிருந்து ஒரு class அகற்றப்படும்போது, குறைவான அல்லது எந்தச் சோதனையும் தோல்வியடையாமல் இருக்கும்.

Classes பல elements-க்குப் பயன்படுத்தப்படலாம், எனவே அந்த class கொண்ட அனைத்து elements-ஐயும் வேண்டுமென்றே பெற விரும்பினால் தவிர, முடிந்தவரை அவற்றைத் தவிர்க்க வேண்டும்.

```js
// 👎
await $('.button')
```

இந்த selectors அனைத்தும் ஒரே ஒரு element-ஐ மட்டுமே திருப்பி அளிக்க வேண்டும்.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__குறிப்பு:__ WebdriverIO ஆதரிக்கும் அனைத்து சாத்தியமான selectors-ஐயும் அறிய, எங்கள் [Selectors](./Selectors.md) பக்கத்தைப் பாருங்கள்.

## Element queries-இன் எண்ணிக்கையைக் கட்டுப்படுத்துங்கள்

ஒவ்வொரு முறையும் நீங்கள் [`$`](https://webdriver.io/docs/api/browser/$) அல்லது [`$$`](https://webdriver.io/docs/api/browser/$$) command-ஐப் பயன்படுத்தும்போது (அவற்றை chaining செய்வதும் இதில் அடங்கும்), WebdriverIO DOM-இல் element-ஐக் கண்டறிய முயற்சிக்கிறது. இந்த queries அதிக செலவுடையவை, எனவே முடிந்தவரை அவற்றைக் கட்டுப்படுத்த முயற்சிக்க வேண்டும்.

மூன்று elements-ஐ query செய்கிறது.

```js
// 👎
await $('table').$('tr').$('td')
```

ஒரே ஒரு element-ஐ மட்டுமே query செய்கிறது.

``` js
// 👍
await $('table tr td')
```

வெவ்வேறு [selector strategies](https://webdriver.io/docs/selectors/#custom-selector-strategies)-ஐ இணைக்க விரும்பும்போது மட்டுமே நீங்கள் chaining-ஐப் பயன்படுத்த வேண்டும்.
இந்த எடுத்துக்காட்டில் நாங்கள் [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors)-ஐப் பயன்படுத்துகிறோம், இது ஒரு element-இன் shadow DOM-க்குள் செல்வதற்கான ஒரு strategy ஆகும்.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### ஒரு பட்டியலிலிருந்து ஒன்றை எடுப்பதற்குப் பதிலாக ஒற்றை element-ஐக் கண்டறிவதை விரும்புங்கள்

இதைச் செய்வது எப்போதும் சாத்தியமில்லை, ஆனால் [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) போன்ற CSS pseudo-classes-ஐப் பயன்படுத்தி, elements-இன் பெற்றோரின் child பட்டியலில் உள்ள அவற்றின் indexes அடிப்படையில் elements-ஐப் பொருத்தலாம்.

அனைத்து table rows-ஐயும் query செய்கிறது.

```js
// 👎
await $$('table tr')[15]
```

ஒரு table row-ஐ மட்டுமே query செய்கிறது.

```js
// 👍
await $('table tr:nth-child(15)')
```

## உள்ளமைக்கப்பட்ட assertions-ஐப் பயன்படுத்துங்கள்

முடிவுகள் பொருந்தும் வரை தானாகக் காத்திருக்காத கைமுறை assertions-ஐப் பயன்படுத்த வேண்டாம், ஏனெனில் இது நிலையற்ற (flaky) சோதனைகளுக்கு வழிவகுக்கும்.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

உள்ளமைக்கப்பட்ட assertions-ஐப் பயன்படுத்துவதன் மூலம், உண்மையான முடிவு எதிர்பார்க்கப்பட்ட முடிவுடன் பொருந்தும் வரை WebdriverIO தானாகவே காத்திருக்கும், இதன் விளைவாக உறுதியான சோதனைகள் கிடைக்கும்.
Assertion வெற்றியடையும் வரை அல்லது நேரம் முடியும் வரை அதைத் தானாக மீண்டும் முயற்சிப்பதன் மூலம் இது இதை அடைகிறது.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lazy loading மற்றும் promise chaining

சுத்தமான code எழுதுவதில் WebdriverIO-விடம் சில உத்திகள் உள்ளன, ஏனெனில் அது element-ஐ lazy load செய்ய முடியும், இது உங்கள் promises-ஐ chain செய்ய அனுமதிக்கிறது மற்றும் `await`-இன் எண்ணிக்கையைக் குறைக்கிறது. இது element-ஐ ஒரு Element-க்குப் பதிலாக ChainablePromiseElement ஆக அனுப்பவும், page objects உடன் எளிதாகப் பயன்படுத்தவும் அனுமதிக்கிறது.

அப்படியானால் நீங்கள் எப்போது `await`-ஐப் பயன்படுத்த வேண்டும்?
`$` மற்றும் `$$` command-களைத் தவிர, நீங்கள் எப்போதும் `await`-ஐப் பயன்படுத்த வேண்டும்.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// அல்லது
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// அல்லது
await $('div').$('button').click()
```

## Commands மற்றும் assertions-ஐ அளவுக்கு மீறிப் பயன்படுத்த வேண்டாம்

expect.toBeDisplayed-ஐப் பயன்படுத்தும்போது, element இருப்பதற்காகவும் நீங்கள் மறைமுகமாகக் காத்திருக்கிறீர்கள். அதே வேலையைச் செய்யும் ஒரு assertion ஏற்கனவே இருக்கும்போது waitForXXX commands-ஐப் பயன்படுத்த வேண்டிய அவசியமில்லை.

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

ஒரு element-உடன் தொடர்புகொள்ளும்போது அல்லது அதன் text போன்ற ஒன்றை assert செய்யும்போது, அந்த element இருப்பதற்காகவோ அல்லது காட்டப்படுவதற்காகவோ காத்திருக்க வேண்டியதில்லை. ஆனால் element வெளிப்படையாக கண்ணுக்குத் தெரியாமல் இருக்கக்கூடியதாக (எடுத்துக்காட்டாக opacity: 0) அல்லது வெளிப்படையாக முடக்கப்பட்டிருக்கக்கூடியதாக (எடுத்துக்காட்டாக disabled attribute) இருந்தால், element காட்டப்படுவதற்காகக் காத்திருப்பது பொருத்தமானது.

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

## Dynamic சோதனைகள்

ரகசிய credentials போன்ற dynamic சோதனைத் தரவுகளைச் சோதனையில் hard code செய்வதற்குப் பதிலாக, உங்கள் environment-இல் சேமிக்க environment variables-ஐப் பயன்படுத்துங்கள். இந்தத் தலைப்பு பற்றி மேலும் தகவலுக்கு [Parameterize Tests](parameterize-tests) பக்கத்திற்குச் செல்லுங்கள்.

## உங்கள் code-ஐ lint செய்யுங்கள்

உங்கள் code-ஐ lint செய்ய eslint-ஐப் பயன்படுத்துவதன் மூலம் பிழைகளை முன்கூட்டியே கண்டறியலாம். சில சிறந்த நடைமுறைகள் எப்போதும் பின்பற்றப்படுவதை உறுதிசெய்ய எங்கள் [linting rules](https://www.npmjs.com/package/eslint-plugin-wdio)-ஐப் பயன்படுத்துங்கள்.

## Pause செய்ய வேண்டாம்

pause command-ஐப் பயன்படுத்தத் தூண்டலாக இருக்கலாம், ஆனால் இதைப் பயன்படுத்துவது ஒரு மோசமான யோசனை, ஏனெனில் இது உறுதியானதல்ல மற்றும் நீண்ட காலத்தில் நிலையற்ற சோதனைகளையே ஏற்படுத்தும்.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // submit button இயக்கப்படும் வரை காத்திருக்கவும்
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Async loops

நீங்கள் மீண்டும் மீண்டும் இயக்க விரும்பும் asynchronous code இருக்கும்போது, எல்லா loops-ஆலும் இதைச் செய்ய முடியாது என்பதை அறிந்துகொள்வது முக்கியம்.
எடுத்துக்காட்டாக, [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)-இல் படிக்கக்கூடியது போல, Array-இன் forEach function asynchronous callbacks-ஐ அனுமதிப்பதில்லை.

__குறிப்பு:__ இந்த எடுத்துக்காட்டில் காட்டப்பட்டுள்ளது போல, செயல்பாடு asynchronous ஆக இருக்க வேண்டிய அவசியமில்லாதபோது நீங்கள் இவற்றை இன்னும் பயன்படுத்தலாம்: `console.log(await $$('h1').map((h1) => h1.getText()))`.

இதன் பொருள் என்ன என்பதற்கான சில எடுத்துக்காட்டுகள் கீழே உள்ளன.

asynchronous callbacks ஆதரிக்கப்படாததால் பின்வருவது வேலை செய்யாது.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

பின்வருவது வேலை செய்யும்.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## எளிமையாக வைத்திருங்கள்

சில நேரங்களில் எங்கள் பயனர்கள் text அல்லது values போன்ற தரவுகளை map செய்வதைக் காண்கிறோம். இது பெரும்பாலும் தேவையில்லை மற்றும் பெரும்பாலும் ஒரு code smell ஆகும். இது ஏன் என்பதற்குக் கீழே உள்ள எடுத்துக்காட்டுகளைப் பாருங்கள்.

```js
// 👎 மிகவும் சிக்கலானது, synchronous assertion, நிலையற்ற சோதனைகளைத் தடுக்க உள்ளமைக்கப்பட்ட assertions-ஐப் பயன்படுத்தவும்
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

// 👎 elements-ஐ அவற்றின் text மூலம் கண்டறிகிறது, ஆனால் elements-இன் நிலையைக் கணக்கில் எடுத்துக்கொள்வதில்லை
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 தனித்துவமான identifiers-ஐப் பயன்படுத்தவும் (பெரும்பாலும் custom elements-க்குப் பயன்படுத்தப்படுகிறது)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 accessibility names (பெரும்பாலும் native html elements-க்குப் பயன்படுத்தப்படுகிறது)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

நாங்கள் சில நேரங்களில் காணும் மற்றொரு விஷயம், எளிய விஷயங்களுக்கு மிகவும் சிக்கலான தீர்வு இருப்பது.

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

## Code-ஐ இணையாக இயக்குதல்

சில code இயக்கப்படும் வரிசையைப் பற்றி உங்களுக்குக் கவலை இல்லையென்றால், இயக்கத்தை விரைவுபடுத்த [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)-ஐப் பயன்படுத்தலாம்.

__குறிப்பு:__ இது code-ஐப் படிப்பதைக் கடினமாக்குவதால், ஒரு page object அல்லது function-ஐப் பயன்படுத்தி இதை abstract செய்யலாம். இருப்பினும், செயல்திறனில் கிடைக்கும் நன்மை வாசிப்புத்தன்மையை இழப்பதற்குத் தகுதியானதா என்பதையும் நீங்கள் கேள்வி கேட்க வேண்டும்.

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

Abstract செய்யப்பட்டால், அது கீழே உள்ளது போல இருக்கலாம்; இங்கு logic ஆனது submitWithDataOf எனப்படும் ஒரு method-இல் வைக்கப்பட்டு, தரவு Person class மூலம் பெறப்படுகிறது.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```