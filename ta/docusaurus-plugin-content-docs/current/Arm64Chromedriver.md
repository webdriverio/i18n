---
id: arm64-chromedriver
title: ARM64 இல் Chromedriver
description: ARM64 macOS, Windows மற்றும் Linux இல் WebdriverIO எவ்வாறு Chromedriver ஐ அமைக்கிறது, மேலும் பொருந்தக்கூடிய Linux ARM64 டிரைவர் இல்லாதபோது என்ன செய்ய வேண்டும்.
---

WebdriverIO, ARM64 இல் Chromedriver ஐ தானாகவே அமைக்கிறது. **macOS** (Apple silicon) இல், Chrome for Testing ஒவ்வொரு பதிப்பிற்கும் நேட்டிவ் `mac-arm64` Chromedriver ஐ வெளியிடுகிறது, எனவே அமைக்க எதுவும் இல்லை. **Windows 11 on Arm** இலும் இது எந்த கட்டமைப்பும் இல்லாமல் செயல்படுகிறது: Chrome for Testing எந்த `win-arm64` Chromedriver ஐயும் வெளியிடுவதில்லை, ஆனால் அதன் `win64` (x64) Chromedriver, Windows இன் வெளிப்படையான [x64 எமுலேஷன்](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) கீழ் இயங்குகிறது, மேலும் நிறுவப்பட்ட ARM64 Chrome மற்றும் WebdriverIO இல்லையெனில் பதிவிறக்கும் x64 Chrome for Testing உலாவி ஆகிய இரண்டையும் இயக்குகிறது. **Linux ARM64** இல், `153.0.8001.0` ஐ விட பழைய Chrome பதிப்புகளுக்கு கூடுதல் கவனம் தேவை, அது கீழே விளக்கப்பட்டுள்ளது.

## Linux ARM64

Chrome for Testing, Chrome **`153.0.8001.0`** முதல் `linux-arm64` Chromedriver ஐ உருவாக்குகிறது, மேலும் WebdriverIO அதை நேரடியாகப் பயன்படுத்துகிறது. `goog:chromeOptions.binary` ஆக அமைக்கப்பட்டது போன்ற பழைய Chrome அல்லது Chromium க்கு, தேவையான Chromium முதன்மை (major) பதிப்புடன் பொருந்தும் [Electron வெளியீட்டில்](https://github.com/electron/electron/releases) தொகுக்கப்பட்ட Chromedriver ஐ அது பதிவிறக்குகிறது. `CHROMEDRIVER_CDNURL` அமைக்கப்பட்டிருந்தாலும் இந்தப் பதிவிறக்கம் GitHub இலிருந்தே வருகிறது, ஏனெனில் `153.0.8001.0` க்குக் கீழே ஒரு mirror வழங்குவதற்கு Chrome for Testing இல் `linux-arm64` Chromedriver இல்லை; ஆஃப்லைனில், [கீழே](#no-electron-release-ships-a-matching-chromedriver) காட்டியுள்ளபடி உங்கள் distribution இன் Chromium மற்றும் டிரைவரைப் பயன்படுத்தவும்.

`153.0.8001.0` க்கு முன் Chrome for Testing இல் `linux-arm64` உலாவி builds களும் இல்லை, எனவே ARM64 உலாவியைச் சுட்டும் `goog:chromeOptions.binary` உடன் சேர்த்து மட்டுமே `browserVersion` ஐ அதற்குக் கீழே pin செய்யவும்.

## Electron பயன்பாடுகள்

`wdio:electronVersion`, ஒவ்வொரு ARM64 தளத்திலும், குறிப்பிட்ட Electron வெளியீட்டுடன் தொகுக்கப்பட்ட Chromedriver ஐப் பதிவிறக்குகிறது. ஒரு Electron பயன்பாட்டிற்கு, Electron சேவை அதை பயன்பாட்டின் Electron பதிப்பிலிருந்து அமைக்கிறது. விவரங்களுக்கு [Capabilities](capabilities#wdioelectronversion) ஐப் பார்க்கவும்.

## சிக்கல் தீர்த்தல்

### பொருந்தும் Chromedriver ஐ எந்த Electron வெளியீடும் வழங்கவில்லை

145 போன்ற சில Chromium முதன்மை பதிப்புகள் எந்த Electron வெளியீட்டிலும் வெளிவரவில்லை. அப்போது பொருந்தாத டிரைவரை நிறுவுவதற்குப் பதிலாக WebdriverIO தோல்வியடைகிறது:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

இதைத் தீர்க்க:

- **Chrome/Chromium `153.0.8001.0` அல்லது அதற்குப் பிந்தைய பதிப்பைப் பயன்படுத்தவும்**, இதனால் Chrome for Testing டிரைவரை நேரடியாக வழங்கும்.
- **Debian இல், அதன் Chromium மற்றும் டிரைவரைப் பயன்படுத்தவும்**, இது பொருந்தக்கூடிய arm64 இணை:
  ```bash
  sudo apt-get install -y chromium chromium-driver
  ```
  ```ts title="wdio.conf.ts"
  export const config: WebdriverIO.Config = {
      // ...
      capabilities: [{
          browserName: 'chrome',
          'goog:chromeOptions': { binary: '/usr/bin/chromium' },
          'wdio:chromedriverOptions': { binary: '/usr/bin/chromedriver' }
      }]
  }
  ```
- `wdio:chromedriverOptions.binary` மூலம் **உங்கள் சொந்த Chromedriver ஐக் கொண்டு வாருங்கள்**, இது பதிவிறக்கத்தை முழுமையாக முடக்குகிறது.

## தொடர்புடையவை

- [Driver Binaries](driverbinaries): Chrome for Testing தோல்வியடையும்போது பயன்படுத்தப்படும் மாற்று வழி உட்பட, WebdriverIO உலாவி டிரைவர்களை எவ்வாறு பதிவிறக்கி cache செய்கிறது.
- [Capabilities](capabilities#wdioelectronversion): `wdio:electronVersion` விருப்பம்.