---
id: clock
title: கடிகார பொருள்
---

நீங்கள் [`emulate`](/docs/emulation) கட்டளையைப் பயன்படுத்தி உலாவி அமைப்பு கடிகாரத்தை மாற்றலாம். இது நேரம் தொடர்பான இயற்கையான உலகளாவிய செயல்பாடுகளை மாற்றி அமைக்கிறது, இதனால் அவற்றை `clock.tick()` அல்லது பெறப்பட்ட கடிகார பொருள் மூலம் ஒருங்கிணைந்து கட்டுப்படுத்த முடியும். இதில் கட்டுப்படுத்துவது உள்ளடங்கும்:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

கடிகாரம் யுனிக்ஸ் எபாக்கில் (டைம்ஸ்டாம்ப் 0) தொடங்குகிறது. அதாவது, உங்கள் பயன்பாட்டில் புதிய Date ஐ நீங்கள் உருவாக்கும்போது, நீங்கள் `emulate` கட்டளைக்கு வேறு எந்த விருப்பங்களையும் அனுப்பவில்லை என்றால், அது ஜனவரி 1, 1970 நேரத்தைக் கொண்டிருக்கும்.

## உதாரணம்

`browser.emulate('clock', { ... })` என அழைக்கும்போது, அது தற்போதைய பக்கம் மற்றும் அனைத்து அடுத்த பக்கங்களுக்கும் உலகளாவிய செயல்பாடுகளை உடனடியாக மேலெழுதும், எ.கா.:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('http://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

நீங்கள் [`setSystemTime`](/docs/api/clock/setSystemTime) அல்லது [`tick`](/docs/api/clock/tick) ஐ அழைப்பதன் மூலம் அமைப்பு நேரத்தை மாற்றலாம்.