---
id: coverage
title: கவரேஜ்
---

WebdriverIO இன் பிரவுசர் ரன்னர் [`istanbul`](https://istanbul.js.org/) பயன்படுத்தி கோட் கவரேஜ் அறிக்கையை ஆதரிக்கிறது. டெஸ்ட்ரன்னர் தானாகவே உங்கள் கோடை இன்ஸ்ட்ரூமென்ட் செய்து கோட் கவரேஜை பிடித்துக் கொள்ளும்.

## அமைப்பு

கோட் கவரேஜ் அறிக்கையை இயக்க, WebdriverIO பிரவுசர் ரன்னர் கான்ஃபிகரேஷன் மூலம் அதை இயக்கவும், எ.கா:

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

அனைத்து [கவரேஜ் விருப்பங்களையும்](/docs/runner#coverage-options) பார்க்கவும், சரியாக கான்ஃபிகர் செய்வது எப்படி என்பதை அறிந்து கொள்ளவும்.

## கோடை புறக்கணித்தல்

உங்கள் கோட்பேஸில் சில பகுதிகளை கவரேஜ் டிராக்கிங்கிலிருந்து வேண்டுமென்றே விலக்க விரும்பலாம், அதற்கு பின்வரும் பார்சிங் குறிப்புகளைப் பயன்படுத்தலாம்:

- `/* istanbul ignore if */`: அடுத்த if ஸ்டேட்மென்ட்டை புறக்கணிக்கவும்.
- `/* istanbul ignore else */`: if ஸ்டேட்மென்ட்டின் else பகுதியை புறக்கணிக்கவும்.
- `/* istanbul ignore next */`: சோர்ஸ் கோடில் அடுத்த விஷயத்தை புறக்கணிக்கவும் (ஃபங்க்ஷன்கள், if ஸ்டேட்மென்ட்கள், கிளாஸ்கள் போன்றவை).
- `/* istanbul ignore file */`: முழு சோர்ஸ் ஃபைலையும் புறக்கணிக்கவும் (இது ஃபைலின் மேல் பகுதியில் வைக்கப்பட வேண்டும்).

:::info

உங்கள் டெஸ்ட் ஃபைல்களை கவரேஜ் அறிக்கையிலிருந்து விலக்குவது பரிந்துரைக்கப்படுகிறது, ஏனெனில் இது பிழைகளை ஏற்படுத்தக்கூடும், எ.கா. `execute` அல்லது `executeAsync` கமாண்ட்களை அழைக்கும்போது. நீங்கள் அவற்றை உங்கள் அறிக்கையில் வைக்க விரும்பினால், அவற்றை இன்ஸ்ட்ரூமென்ட் செய்வதை தவிர்க்க உறுதிப்படுத்தவும்:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::