---
id: debugging
title: பிழைத்திருத்தம்
description: "browser.debug, VS Code அல்லது WebStorm breakpoints, நிலையற்ற (flaky) சோதனைகளுக்கான உத்திகள், மற்றும் CPU மற்றும் heap profiling மூலம் WebdriverIO சோதனைகளைப் பிழைத்திருத்தம் செய்யுங்கள்."
---

பல செயல்முறைகள் பல உலாவிகளில் டஜன் கணக்கான சோதனைகளை உருவாக்கும்போது பிழைத்திருத்தம் கணிசமாகக் கடினமாகிறது.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

தொடக்கத்தில், `maxInstances`-ஐ `1` ஆக அமைப்பதன் மூலம் இணையான செயல்பாட்டைக் கட்டுப்படுத்துவதும், பிழைத்திருத்தம் செய்ய வேண்டிய specs மற்றும் உலாவிகளை மட்டும் இலக்காகக் கொள்வதும் மிகவும் உதவியாக இருக்கும்.

`wdio.conf`-இல்:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Debug கட்டளை

பல சந்தர்ப்பங்களில், உங்கள் சோதனையை இடைநிறுத்தி உலாவியை ஆய்வு செய்ய [`browser.debug()`](/docs/api/browser/debug)-ஐப் பயன்படுத்தலாம்.

உங்கள் கட்டளை வரி இடைமுகமும் REPL பயன்முறைக்கு மாறும். இந்தப் பயன்முறை பக்கத்திலுள்ள கட்டளைகள் மற்றும் elements-உடன் சோதித்துப் பார்க்க உங்களை அனுமதிக்கிறது. REPL பயன்முறையில், உங்கள் சோதனைகளில் செய்வது போலவே `browser` object&mdash;அல்லது `$` மற்றும் `$$` functions&mdash;ஐ அணுகலாம்.

`browser.debug()`-ஐப் பயன்படுத்தும்போது, சோதனை அதிக நேரம் எடுப்பதால் test runner அதைத் தோல்வியடையச் செய்வதைத் தடுக்க, test runner-இன் timeout-ஐ அதிகரிக்க வேண்டியிருக்கலாம். எடுத்துக்காட்டாக:

`wdio.conf`-இல்:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

பிற frameworks-ஐப் பயன்படுத்தி இதை எப்படிச் செய்வது என்பது பற்றிய கூடுதல் தகவலுக்கு [timeouts](timeouts)-ஐப் பார்க்கவும்.

பிழைத்திருத்தத்திற்குப் பிறகு சோதனைகளைத் தொடர, shell-இல் `^C` குறுக்குவழியை அல்லது `.exit` கட்டளையைப் பயன்படுத்தவும்.

### ஒரு coding agent-க்காக இடைநிறுத்தம் (`--debug=agent`)

`wdio run --debug=agent` framework timeout-ஐ 24 மணிநேரமாக உயர்த்துகிறது, மேலும் ஒரு spec `await browser.debug()`-ஐ அழைக்கும்போது அல்லது ஒரு சோதனை தோல்வியடையும்போது worker-ஐ இடைநிறுத்துகிறது. இயக்கம் இது போன்ற ஒரு வரியை அச்சிடும்:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

இடைநிறுத்தப்பட்ட உலாவியை [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …) மூலம் ஆய்வு செய்யுங்கள், பின்னர் தொடர `wdio session -s debug-0-0 resume`-ஐப் பயன்படுத்துங்கள். `wdio session -s debug-0-0 close` இடைநிறுத்தப்பட்ட சோதனையை `Session closed from wdio session` உடன் தோல்வியடையச் செய்கிறது. Session பெயர் `debug-<cid>` ஆகும் (முதல் worker-க்கு `debug-0-0`). அந்தப் பணிப்பாய்வின் மீதமுள்ள பகுதி [WebdriverIO Session](/docs/session) பிரிவில் உள்ளது.
## இயக்கநிலை கட்டமைப்பு

`wdio.conf.js`-இல் Javascript இருக்கலாம் என்பதைக் கவனியுங்கள். உங்கள் timeout மதிப்பை நிரந்தரமாக 1 நாளாக மாற்ற நீங்கள் விரும்பமாட்டீர்கள் என்பதால், environment variable-ஐப் பயன்படுத்தி கட்டளை வரியிலிருந்து இந்த அமைப்புகளை மாற்றுவது பெரும்பாலும் உதவியாக இருக்கும்.

இந்த நுட்பத்தைப் பயன்படுத்தி, கட்டமைப்பை இயக்கநிலையில் மாற்றலாம்:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

பின்னர் `wdio` கட்டளைக்கு முன்னால் `debug` flag-ஐச் சேர்க்கலாம்:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...மேலும் உங்கள் spec கோப்பை DevTools மூலம் பிழைத்திருத்தம் செய்யுங்கள்!

## Visual Studio Code (VSCode) மூலம் பிழைத்திருத்தம்

சமீபத்திய VSCode-இல் breakpoints உடன் உங்கள் சோதனைகளைப் பிழைத்திருத்தம் செய்ய விரும்பினால், debugger-ஐத் தொடங்க இரண்டு விருப்பங்கள் உள்ளன, அவற்றில் விருப்பம் 1 மிக எளிதான முறையாகும்:
 1. debugger-ஐ தானாக இணைத்தல்
 2. கட்டமைப்புக் கோப்பைப் பயன்படுத்தி debugger-ஐ இணைத்தல்

### VSCode Toggle Auto Attach

VSCode-இல் பின்வரும் படிகளைப் பின்பற்றி debugger-ஐ தானாக இணைக்கலாம்:
 - CMD + Shift + P (Linux மற்றும் Macos) அல்லது CTRL + Shift + P (Windows) அழுத்தவும்
 - உள்ளீட்டுப் புலத்தில் "attach" என தட்டச்சு செய்யவும்
 - "Debug: Toggle Auto Attach" ஐத் தேர்ந்தெடுக்கவும்
 - "Only With Flag" ஐத் தேர்ந்தெடுக்கவும்

 அவ்வளவுதான்! இப்போது நீங்கள் உங்கள் சோதனைகளை இயக்கும்போது (முன்பு காட்டியபடி உங்கள் config-இல் --inspect flag அமைக்கப்பட வேண்டும் என்பதை நினைவில் கொள்ளுங்கள்) அது தானாகவே debugger-ஐத் தொடங்கி, அது அடையும் முதல் breakpoint-இல் நிற்கும்.

### VSCode கட்டமைப்புக் கோப்பு

அனைத்து அல்லது தேர்ந்தெடுக்கப்பட்ட spec கோப்பு(களை) இயக்க முடியும். Debug கட்டமைப்பு(கள்) `.vscode/launch.json`-இல் சேர்க்கப்பட வேண்டும், தேர்ந்தெடுக்கப்பட்ட spec-ஐப் பிழைத்திருத்தம் செய்ய பின்வரும் config-ஐச் சேர்க்கவும்:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

அனைத்து spec கோப்புகளையும் இயக்க `"args"`-இலிருந்து `"--spec", "${file}"`-ஐ நீக்கவும்

எடுத்துக்காட்டு: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

கூடுதல் தகவல்: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Atom உடன் இயக்கநிலை Repl

நீங்கள் ஒரு [Atom](https://atom.io/) hacker என்றால், [@kurtharriger](https://github.com/kurtharriger) உருவாக்கிய [`wdio-repl`](https://github.com/kurtharriger/wdio-repl)-ஐ முயற்சி செய்யலாம், இது Atom-இல் ஒற்றைக் குறியீட்டு வரிகளை இயக்க உங்களை அனுமதிக்கும் ஒரு இயக்கநிலை repl ஆகும். ஒரு demo-வைப் பார்க்க [இந்த](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTube வீடியோவைப் பாருங்கள்.

## WebStorm / Intellij மூலம் பிழைத்திருத்தம்
இது போன்ற ஒரு node.js debug கட்டமைப்பை உருவாக்கலாம்:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
ஒரு கட்டமைப்பை எப்படி உருவாக்குவது என்பது பற்றிய கூடுதல் தகவலுக்கு இந்த [YouTube வீடியோவைப்](https://www.youtube.com/watch?v=Qcqnmle6Wu8) பாருங்கள்.

## நிலையற்ற (flaky) சோதனைகளைப் பிழைத்திருத்தம் செய்தல்

நிலையற்ற சோதனைகளைப் பிழைத்திருத்தம் செய்வது மிகவும் கடினமாக இருக்கலாம், எனவே உங்கள் CI-இல் கிடைத்த அந்த நிலையற்ற முடிவை உள்ளூரில் மீண்டும் உருவாக்க முயற்சிப்பதற்கான சில உதவிக்குறிப்புகள் இங்கே.

### நெட்வொர்க்
நெட்வொர்க் தொடர்பான நிலையின்மையைப் பிழைத்திருத்தம் செய்ய [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork) கட்டளையைப் பயன்படுத்தவும்.
```js
await browser.throttleNetwork('Regular3G')
```

### Rendering வேகம்
சாதன வேகம் தொடர்பான நிலையின்மையைப் பிழைத்திருத்தம் செய்ய [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU) கட்டளையைப் பயன்படுத்தவும்.
இது உங்கள் பக்கங்களை மெதுவாக render செய்ய வைக்கும், இது உங்கள் CI-இல் பல செயல்முறைகளை இயக்குவது போன்ற பல காரணங்களால் ஏற்படலாம், அவை உங்கள் சோதனைகளை மெதுவாக்கக்கூடும்.
```js
await browser.throttleCPU(4)
```

### சோதனை இயக்க வேகம்

உங்கள் சோதனைகள் பாதிக்கப்படவில்லை என்று தோன்றினால், frontend framework / உலாவியின் புதுப்பிப்பை விட WebdriverIO வேகமாக இருக்க வாய்ப்புள்ளது. ஒத்திசைவான (synchronous) assertions-ஐப் பயன்படுத்தும்போது இது நிகழ்கிறது, ஏனெனில் WebdriverIO-க்கு இந்த assertions-ஐ மீண்டும் முயற்சிக்க வாய்ப்பு இல்லை. இதன் காரணமாக உடையக்கூடிய குறியீட்டின் சில எடுத்துக்காட்டுகள்:
```js
expect(elementList.length).toEqual(7) // assertion நேரத்தில் பட்டியல் நிரப்பப்படாமல் இருக்கலாம்
expect(await elem.getText()).toEqual('this button was clicked 3 times') // assertion நேரத்தில் உரை இன்னும் புதுப்பிக்கப்படாமல் இருக்கலாம், இதனால் பிழை ஏற்படும் ("this button was clicked 2 times" என்பது எதிர்பார்க்கப்பட்ட "this button was clicked 3 times" உடன் பொருந்தவில்லை)
expect(await elem.isDisplayed()).toBe(true) // இன்னும் காட்டப்படாமல் இருக்கலாம்
```
இந்தச் சிக்கலைத் தீர்க்க, அதற்குப் பதிலாக ஒத்திசைவற்ற (asynchronous) assertions பயன்படுத்தப்பட வேண்டும். மேலே உள்ள எடுத்துக்காட்டுகள் இப்படி இருக்கும்:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
இந்த assertions-ஐப் பயன்படுத்தும்போது, நிபந்தனை பொருந்தும் வரை WebdriverIO தானாகவே காத்திருக்கும். உரையை assert செய்யும்போது, element இருக்க வேண்டும் மற்றும் உரை எதிர்பார்க்கப்பட்ட மதிப்புக்குச் சமமாக இருக்க வேண்டும் என்பதே இதன் பொருள்.
இதைப் பற்றி எங்கள் [சிறந்த நடைமுறைகள் வழிகாட்டியில்](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) மேலும் விவாதிக்கிறோம்.

## செயல்திறன் Profiling

உங்கள் சோதனை இயக்கத்தில் உள்ள இடையூறுகள் அல்லது memory leaks-ஐக் கண்டறிய, உங்கள் சோதனைகளின் செயல்திறன் profiles-ஐப் பதிவுசெய்ய WebdriverIO உங்களை அனுமதிக்கிறது. இது Node.js-இன் சொந்த profiling திறன்களைப் பயன்படுத்துகிறது.

### CPU Profiling

CPU profile-ஐப் பதிவுசெய்ய, `--cpu-prof` CLI flag-ஐப் பயன்படுத்தலாம் அல்லது உங்கள் கட்டமைப்பில் `cpuProf: true` என அமைக்கலாம்.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

இது ஒவ்வொரு worker செயல்முறைக்கும் `./profiles` கோப்பகத்தில் (இயல்புநிலை) ஒரு `.cpuprofile` கோப்பை உருவாக்கும். இயக்கத்தை பகுப்பாய்வு செய்ய இந்தக் கோப்பை **Chrome DevTools > Performance > Load Profile**-இல் ஏற்றலாம்.

### Heap Profiling

Heap profile-ஐப் பதிவுசெய்ய, `--heap-prof` CLI flag-ஐப் பயன்படுத்தவும் அல்லது உங்கள் கட்டமைப்பில் `heapProf: true` என அமைக்கவும்.

```bash
npx wdio run wdio.conf.js --heap-prof
```

இது `./profiles` கோப்பகத்தில் ஒரு `.heapprofile` கோப்பை உருவாக்குகிறது (sampling heap profiler-ஐப் பயன்படுத்துகிறது). நினைவகப் பயன்பாட்டைப் பகுப்பாய்வு செய்ய இதை **Chrome DevTools > Memory > Load**-இல் ஏற்றலாம்.

### நேர அளவீடுகள்

Profiling இயக்கப்பட்டிருக்கும்போது, WebdriverIO உங்கள் சோதனையின் setup, execution மற்றும் teardown கட்டங்களுக்கான நேர அளவீடுகளையும் தானாகவே பதிவுசெய்கிறது, இது நேரம் எங்கே செலவிடப்படுகிறது என்பதைப் புரிந்துகொள்ள உதவுகிறது.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```