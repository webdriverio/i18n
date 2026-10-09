---
id: headless-and-display-servers
title: ஹெட்லெஸ் & டிஸ்ப்ளே சர்வர்கள்
description: Linux CI-யிலும் கன்டெய்னர்களிலும் testrunner தொடங்கும் Weston அல்லது Xvfb மெய்நிகர் டிஸ்ப்ளே மூலம் headed பிரவுசர்களையும் டெஸ்க்டாப் ஆப்களையும் இயக்குங்கள். இதில் அதன் விருப்பங்கள், CI வழிமுறைகள் மற்றும் சிக்கல் தீர்வுகள் அடங்கும்.
---

Linux-இல் டிஸ்ப்ளே எதுவும் இல்லாதபோது, testrunner அந்த ஓட்டத்திற்காக ஒரு மெய்நிகர் டிஸ்ப்ளே சர்வரைத் தொடங்குகிறது. முதலில் headless பயன்முறையில் [Weston](https://gitlab.freedesktop.org/wayland/weston)-ஐ முயல்கிறது. அது இயலாவிட்டால் மாற்றாக [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer)-ஐப் பயன்படுத்துகிறது. இது எப்போது நடக்கிறது, அதை எப்படி உள்ளமைப்பது, CI மற்றும் Docker-இல் அது எப்படிச் செயல்படுகிறது என்பதை இந்தப் பக்கம் விளக்குகிறது. பெரும்பாலான அமைப்புகளில், உங்கள் இமேஜில் Weston அல்லது Xvfb நிறுவப்பட்டிருந்தால் போதும். இல்லையெனில் உங்கள் config-இல் `displayServerAutoInstall: true` என அமைத்தால் போதும்.

## மெய்நிகர் டிஸ்ப்ளே vs நேட்டிவ் headless: எதை எப்போது பயன்படுத்துவது

CI runner-கள், கன்டெய்னர்கள் போன்ற திரை இல்லாத இடங்களில், மெய்நிகர் டிஸ்ப்ளே பிரவுசர்களுக்கும் ஆப்களுக்கும் ஒரு திரையை வழங்குகிறது. பின்வரும் சூழல்களில் இதைத் தொடர்ந்து பயன்படுத்துங்கள்:

- உண்மையான window தேவைப்படும் டெஸ்க்டாப் ஆப்களை நீங்கள் சோதிக்கும்போது.
- உங்கள் சோதனைகளுக்கு headed பிரவுசர் தேவைப்படும்போது. உதாரணமாக, தெரியும் பிரவுசரில் எடுக்கப்பட்ட screenshot baseline-களுடன் பொருத்த வேண்டியிருக்கும்போது.
- [சிக்கல் தீர்வு](#troubleshooting) பகுதியில் விவரிக்கப்பட்டுள்ளபடி, Chrome `DevToolsActivePort file doesn't exist` அல்லது `user data directory is already in use` பிழையுடன் தொடங்கத் தவறும்போது.

தெரியும் window தேவைப்படாத பிரவுசர் சோதனைகளுக்கு, Chrome-இன் `--headless=new` போன்ற நேட்டிவ் headless பயன்முறை குறைவான கூடுதல் சுமையைக் கொண்டது. அதனுடன் `displayServerEnabled: false` என அமைக்கவும். இல்லையெனில் testrunner அப்போதும் ஒரு டிஸ்ப்ளே சர்வரைத் தொடங்கும். உங்கள் எல்லா பிரவுசர்களும் ஒரு cloud சேவையிலோ தொலை grid-இலோ இயங்கினாலும் இதையே செய்யுங்கள், ஏனெனில் உள்ளூரில் எதற்கும் டிஸ்ப்ளே தேவையில்லை.

## இது எப்படி செயல்படுகிறது

எந்த ஒரு சேவையின் `onPrepare` hook-க்கும் முன்பே testrunner ஒரு டிஸ்ப்ளே சர்வரைத் தொடங்கி, அதன் சூழல் மாறிகளை `process.env`-இல் அமைக்கிறது:

| மாறி | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | அமைக்கப்படவில்லை |
| `DISPLAY` | அமைக்கப்படவில்லை | `:0` போன்ற முதல் காலியான டிஸ்ப்ளே |
| `XDG_RUNTIME_DIR` | இந்த ஓட்டத்திற்காக `/tmp`-இன் கீழ் உள்ள ஒரு தனிப்பட்ட கோப்பகம் | மாற்றப்படவில்லை |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

Worker-கள் இந்த மாறிகளைப் பெறுகின்றன. சேவைகள் `onPrepare`-இல் தொடங்கும் driver-களும் ஆப்களும் இவற்றைப் பெறுகின்றன. இவற்றைக் கொண்டு பிரவுசர்களும் GUI toolkit-களும் Wayland-ஐயோ X11-ஐயோ தேர்ந்தெடுக்கின்றன. Weston-இன் கீழ், இந்த ஓட்டத்திற்கு நீங்கள் வைத்திருந்த எந்த மதிப்பையும் தனிப்பட்ட `XDG_RUNTIME_DIR` மாற்றியமைக்கிறது.

`onComplete` hook-கள் முடியும் வரை டிஸ்ப்ளே சர்வர் இயங்கிக்கொண்டே இருக்கும். எனவே சேவைகள் தங்களை மூடும்போதும் அதைப் பயன்படுத்தலாம். அதன் பிறகு testrunner அதை நிறுத்தி, முந்தைய மதிப்புகளை மீட்டமைக்கிறது. Ctrl+C உட்பட, செயல்முறை முன்கூட்டியே வெளியேறினால், டிஸ்ப்ளே சர்வரும் அதனுடன் சேர்ந்து நிறுத்தப்படும்.

பின்வரும் அனைத்தும் உண்மையாக இருக்கும்போது மட்டுமே testrunner ஒரு டிஸ்ப்ளே சர்வரைத் தொடங்குகிறது:

- அது Linux-இல் இயங்குகிறது.
- `DISPLAY`, `WAYLAND_DISPLAY` இரண்டுமே அமைக்கப்படவில்லை.
- `displayServerEnabled` என்பது `false` அல்ல.

ஏற்கனவே ஒரு டிஸ்ப்ளே இருந்தால், testrunner அதைப் பயன்படுத்துகிறது, புதிதாக எதையும் தொடங்குவதில்லை. உதாரணமாக உங்கள் CI தொடங்கிய ஒரு Weston மூலம் `WAYLAND_DISPLAY` மட்டும் அமைக்கப்பட்டிருந்தாலும், testrunner அந்த ஓட்டத்திற்காக `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` ஆகியவற்றை `wayland` என அமைக்கிறது. மரபுரிமையாகப் பெறப்பட்ட மதிப்புகள், எ.கா. SSH login-இலிருந்து வரும் `XDG_SESSION_TYPE=tty`, பிரவுசர்களை சர்வர் இல்லாத X11-க்கு அனுப்பிவிடும். அவற்றை மேலெழுதுவதன் மூலம், பிரவுசர்கள் சரியான டிஸ்ப்ளேவைப் பயன்படுத்துவதை இது உறுதிசெய்கிறது. `displayServerEnabled: false` இருந்தாலும் இது இவ்வாறு செய்கிறது. ஏனெனில் அந்த விருப்பம் டிஸ்ப்ளே சர்வர் தொடங்குகிறதா என்பதை மட்டுமே கட்டுப்படுத்துகிறது.

### எந்த டிஸ்ப்ளே சர்வர் பயன்படுத்தப்படுகிறது

இயல்புநிலையான `displayServer: 'auto'` உடன், testrunner முதலில் Weston-ஐயும் இரண்டாவதாக Xvfb-ஐயும் முயல்கிறது. எதையும் நிறுவுவதற்கு முன் ஏற்கனவே நிறுவப்பட்ட சர்வர்கள் முயலப்படுகின்றன. எனவே Weston-ஐ நிறுவுவதற்குப் பதிலாக ஏற்கனவே உள்ள Xvfb பயன்படுத்தப்படும். Weston தொடங்கத் தவறினால், testrunner Xvfb-க்கு மாறுகிறது. எந்த டிஸ்ப்ளே சர்வரும் தொடங்காவிட்டால், testrunner ஒரு எச்சரிக்கையைப் பதிவுசெய்து, டிஸ்ப்ளே இல்லாமலேயே ஓட்டத்தைத் தொடர்கிறது. `displayServer: 'wayland'` அல்லது `displayServer: 'xvfb'` அமைத்தால், testrunner அந்த சர்வரை மட்டுமே முயல்கிறது.

Weston 10 மற்றும் அதற்குப் பிந்தைய பதிப்புகள் ஆதரிக்கப்படுகின்றன. Ubuntu 22.04, Debian 11 ஆகியவை Weston 9-ஐ வழங்குகின்றன. EPEL இயக்கப்பட்ட Enterprise Linux 9-இல் Weston 8 கிடைக்கிறது. எனவே அவற்றில் `displayServer: 'xvfb'` என அமைக்கவும். Weston, Xwayland இல்லாமல் தொடங்குவதால் அது `DISPLAY`-ஐ வழங்காது. உங்கள் சோதனைகளுக்கோ கருவிகளுக்கோ X11 தேவைப்பட்டால் `displayServer: 'xvfb'` என அமைக்கவும். உதாரணமாக `xdotool`, `xclip` அல்லது ஒரு Java ஆப்.

### Window focus

அனைத்து worker-களும் ஒரே டிஸ்ப்ளேவைப் பயன்படுத்துகின்றன. WebdriverIO v9-இல், ஒவ்வொரு worker-உம் `xvfb-run`-இல் சுற்றப்பட்டு தனக்கென ஒரு டிஸ்ப்ளேவைப் பெற்றது. அதனால் அதன் பிரவுசருக்கு எப்போதும் focus இருந்தது. இப்போது Chrome, Edge போன்ற Chromium அடிப்படையிலான பிரவுசர்களுக்கு focus இல்லாமல் போகலாம். Weston-இன் கீழ் எந்த window-க்கும் focus கிடைக்காது. Xvfb-இன் கீழ் மிகச் சமீபத்தில் திறக்கப்பட்ட window-க்கு மட்டுமே focus இருக்கும். WebDriver உள்ளீடு பக்கத்தை அடைகிறது. ஆனால் `document.hasFocus()` `false`-ஐத் தருகிறது, `focus` நிகழ்வுகள் தூண்டப்படுவதில்லை, `:focus` style-களும் பொருந்துவதில்லை. உங்கள் சோதனைகள் focus-ஐச் சார்ந்திருந்தால், focus emulation-ஐ இயக்குங்கள். இது பக்க ஏற்றங்களுக்கு இடையிலும் நீடிக்கும் ஒரு சோதனை நிலை Chrome DevTools Protocol (CDP) கட்டளை:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

Firefox பாதிக்கப்படுவதில்லை. ஏனெனில் WebDriver-இன் கீழ் அது தன் பக்கங்களை focus உள்ளவையாகவே கருதுகிறது.

### தனித்த ஸ்கிரிப்ட்கள்

Testrunner டிஸ்ப்ளே சர்வரைத் தானே தொடங்குகிறது. `remote()`-ஐ அழைக்கும் ஒரு தனித்த ஸ்கிரிப்ட், `@wdio/display-server`-இலிருந்து `startDisplayDaemonFromConfig`-ஐப் பயன்படுத்தி ஒரு டிஸ்ப்ளே சர்வரைத் தொடங்கலாம். இது அதே `displayServer*` விருப்பங்களை ஏற்கிறது. பிரவுசர் பெற்றுக்கொள்ளும் வகையில் டிஸ்ப்ளேவின் மாறிகளை `process.env`-இல் அமைக்கிறது. `stop()` அழைக்கப்படும்போது அவற்றை மீட்டமைக்கிறது:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// Linux அல்லாத கணினியில், ஏற்கனவே X11 டிஸ்ப்ளே இருக்கும்போது, அல்லது எதுவும் தொடங்காதபோது null. ஏற்கனவே
// Wayland டிஸ்ப்ளே இருந்தால், அது அமைத்த session மாறிகளை stop() மூலம் மீட்டமைக்கும் ஒரு handle-ஐத் தருகிறது.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

[ஏற்கனவே உள்ள டிஸ்ப்ளேவைப் பயன்படுத்துதல்](#using-an-existing-display) பகுதியில் உள்ளதுபோல், ஸ்கிரிப்டை `xvfb-run`-இன் கீழும் இயக்கலாம்.

## பிரவுசர் அமைப்பு

### WebdriverIO தொடங்கும் பிரவுசர்கள்

இந்தப் பிரவுசர்களுக்கு எந்த உள்ளமைவும் தேவையில்லை:

- Chrome, Edge 140 மற்றும் அதற்குப் பிந்தைய பதிப்புகள், Chrome for Testing 135 மற்றும் அதற்குப் பிந்தைய பதிப்புகள் ஆகியவை டிஸ்ப்ளே சர்வர் அமைக்கும் `XDG_SESSION_TYPE=wayland`-ஐப் பின்பற்றுகின்றன.
- பழைய Chrome, Edge பதிப்புகள் `XDG_SESSION_TYPE`-ஐப் புறக்கணிக்கின்றன. X சர்வர் இல்லாமல் Wayland இயங்கும்போது, WebdriverIO தான் தொடங்கும் ஒவ்வொரு Chrome, Edge-இன் args-இலும் `--ozone-platform=wayland`-ஐச் சேர்க்கிறது. Args ஏற்கனவே `--ozone-platform` அல்லது `--headless`-ஐ அமைத்திருந்தால் மட்டும் இது சேர்க்கப்படாது.
- Electron ஆப்கள்: Electron 38 மற்றும் அதற்குப் பிந்தைய பதிப்புகள் `XDG_SESSION_TYPE`-ஐப் பின்பற்றுகின்றன. Electron 28 முதல் 37 வரை `ELECTRON_OZONE_PLATFORM_HINT`-ஐப் பின்பற்றுகின்றன. இதையும் டிஸ்ப்ளே சர்வர் அமைக்கிறது. Electron 27 மற்றும் அதற்கு முந்தைய பதிப்புகள் `--ozone-platform=wayland` flag-ஐச் சார்ந்துள்ளன. Chromedriver மூலம் ஆப்பைத் தொடங்கும்போது WebdriverIO அதைச் சேர்க்கிறது.
- Firefox, Tauri ஆப்கள் போன்ற GTK ஆப்கள், `WAYLAND_DISPLAY`, `GDK_BACKEND` ஆகியவற்றைக் கொண்டு Wayland-ஐத் தேர்ந்தெடுக்கின்றன. Firefox 120-க்கு முந்தைய பதிப்புகள் சோதிக்கப்படவில்லை.

### WebdriverIO தொடங்காத பிரவுசர்கள்

Grid அல்லது cloud சேவையில் உள்ள பிரவுசர்கள் தொலை host-இன் டிஸ்ப்ளேவில் இயங்குவதால், அவற்றுக்கு எந்த உள்ளமைவும் தேவையில்லை.

வேறொன்று தொடங்கும் உள்ளூர் பிரவுசர்கள் WebdriverIO-வின் `--ozone-platform=wayland` flag-ஐப் பெறுவதில்லை. உதாரணமாக நீங்களே தொடங்கிய driver, ஒரு Appium சர்வர் அல்லது ஒரு சேவையின் சொந்த launcher. Chrome, Edge 140 மற்றும் அதற்குப் பிந்தைய பதிப்புகளும் Electron 28 மற்றும் அதற்குப் பிந்தைய பதிப்புகளும் session மாறிகளைப் பின்பற்றுவதால் அவற்றுக்கு இந்த flag தேவையில்லை. ஆனால் பழைய Chrome, Edge பதிப்புகளுக்குத் தேவை. என்ன செய்ய வேண்டும் என்பது பிரவுசர் எப்போது தொடங்குகிறது என்பதைப் பொறுத்தது:

- **ஓட்டத்தின்போது** தொடங்கினால், உதாரணமாக ஒரு சேவையின் `onPrepare`-இலிருந்து, புதிய பிரவுசர்களுக்கு எதுவும் தேவையில்லை. ஏனெனில் அவை டிஸ்ப்ளேவையும் session மாறிகளையும் பெற்றுக்கொள்கின்றன. பழைய Chrome, Edge-க்குப் பின்வருவனவற்றில் ஒன்றைச் செய்யுங்கள்:
  - Xvfb-ஐப் பயன்படுத்த `displayServer: 'xvfb'` என அமைக்கவும், அல்லது
  - Weston-ஐப் பயன்படுத்த `displayServer: 'wayland'` என அமைத்து, அவற்றின் args-இல் `--ozone-platform=wayland`-ஐச் சேர்க்கவும்.
- **WebdriverIO-க்கு முன்பே** தொடங்கினால், உதாரணமாக முந்தைய CI படியிலிருந்தோ வேறொரு shell-இலிருந்தோ, அவை WebdriverIO தொடங்கும் டிஸ்ப்ளே சர்வரைப் பயன்படுத்த முடியாது. ஏனெனில் அவை அதன் மாறிகளைப் பெறுவதில்லை. [ஏற்கனவே உள்ள டிஸ்ப்ளேவைப் பயன்படுத்துதல்](#using-an-existing-display) பகுதியில் உள்ளதுபோல் டிஸ்ப்ளேவை நீங்களே தொடங்கி, பின்வருவனவற்றில் ஒன்றைச் செய்யுங்கள்:
  - கூடுதலாக எதுவும் தேவைப்படாத Xvfb-ஐப் பயன்படுத்துங்கள், அல்லது
  - Weston-ஐப் பயன்படுத்துங்கள். பின்னர் `XDG_SESSION_TYPE=wayland` (Chrome, Edge 140 மற்றும் அதற்குப் பிந்தைய பதிப்புகள், Electron 38 மற்றும் அதற்குப் பிந்தைய பதிப்புகள்) அல்லது `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron 28 முதல் 37 வரை) என export செய்யுங்கள். பழைய Chrome, Edge-இன் args-இல் `--ozone-platform=wayland`-ஐச் சேர்க்கவும்.

## உள்ளமைவு

அனைத்து விருப்பங்களும் [உள்ளமைவுக் குறிப்பில்](/docs/configuration#displayserverenabled) பட்டியலிடப்பட்டுள்ளன. உதாரணமாக:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // எதுவும் நிறுவப்படவில்லை என்றால் ஒரு டிஸ்ப்ளே சர்வரை நிறுவவும்
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // எப்போதும் சிறிய அளவில் Xvfb-ஐப் பயன்படுத்தவும், root கன்டெய்னர் எனக் கருதும் ஒரு தனிப்பயன் கட்டளையால் நிறுவப்படுகிறது
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

தனிப்பயன் கட்டளை இரண்டு சர்வர்களுக்கும் பொதுவானது. `displayServer: 'auto'` உடன், அது முதலில் Weston-க்காக இயங்குகிறது. Weston இன்னும் கிடைக்கவில்லை அல்லது தொடங்கத் தவறினால், Xvfb-உம் இன்னும் இல்லையென்றால் மட்டுமே Xvfb-க்காக மீண்டும் இயங்குகிறது. இந்த உதாரணத்தில் உள்ளதுபோல், உங்கள் கட்டளை நிறுவும் சர்வரையே `displayServer` என அமைக்கவும்.

v9 விருப்பங்களான `autoXvfb`, `xvfb*` ஆகியவை deprecated செய்யப்பட்டுள்ளன, v11-இல் நீக்கப்படும். அவற்றுக்கான மாற்றுகளுக்கு [v10 இடம்பெயர்வு வழிகாட்டியைப்](/docs/v10-migration#virtual-displays-on-linux) பார்க்கவும்.

## CI மற்றும் Docker

உங்கள் இமேஜில் ஒரு டிஸ்ப்ளே சர்வரை முன்கூட்டியே நிறுவுங்கள். அல்லது ஓட்டம் தொடங்கும்போது ஒன்றை நிறுவ `displayServerAutoInstall: true` என அமைக்கவும்.

### டிஸ்ப்ளே சர்வரை முன்கூட்டியே நிறுவுதல்

#### Weston

Ubuntu 24.04 அல்லது Debian 12 மற்றும் அதற்குப் பிந்தைய பதிப்புகளில்:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

RHEL 10, Oracle Linux 10 ஆகியவற்றில், [EPEL ஆவணங்களைப்](https://docs.fedoraproject.org/en-US/epel/getting-started/) பின்பற்றி EPEL, CodeReady Builder இரண்டையும் நீங்களே இயக்குங்கள். பின்னர் `weston`-ஐ நிறுவுங்கள்.

[ஏற்கனவே உள்ள டிஸ்ப்ளேவைப் பயன்படுத்துதல்](#using-an-existing-display) பகுதியில் உள்ளதுபோல், testrunner-ஐ உங்கள் சொந்த Weston-இல் சுற்ற விரும்பினால், `xwayland-run`-ஐயும் நிறுவுங்கள். இது Debian 13, Ubuntu 24.04, Fedora, openSUSE Tumbleweed ஆகியவற்றுக்கு package ஆகக் கிடைக்கிறது. இது இல்லாவிட்டால், Weston-ஐ அதற்கென சொந்த `XDG_RUNTIME_DIR`, `WAYLAND_DISPLAY` ஆகியவற்றுடன் பின்னணியில் தொடங்கி, WebdriverIO-வைத் தொடங்குவதற்கு முன் அதன் socket தயாராகும் வரை காத்திருக்க வேண்டும். மாற்றாக, Xvfb-ஐப் பயன்படுத்துங்கள்.

#### Xvfb

Ubuntu அல்லது Debian-இல்:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04, Debian 11 ஆகியவை மிகவும் பழைய Weston-ஐ வழங்குவதால், அவற்றில் Xvfb-ஐப் பயன்படுத்துங்கள். Xvfb மட்டும் நிறுவப்பட்டிருந்தால், testrunner கூடுதல் உள்ளமைவு இல்லாமலேயே அதைப் பயன்படுத்துகிறது.

பிற distribution-களுக்கு, [தானியங்கி நிறுவல் ஆதரவு](#automatic-installation-support) பகுதியில் உள்ள package பெயர்களைப் பயன்படுத்துங்கள்.

### ஏற்கனவே உள்ள டிஸ்ப்ளேவைப் பயன்படுத்துதல்

உங்கள் CI ஏற்கனவே ஒரு டிஸ்ப்ளேவை வழங்கினால், testrunner அதைப் பயன்படுத்துகிறது, புதிதாக எதையும் தொடங்குவதில்லை.

Weston-ஐப் பயன்படுத்த, `xwayland-run` package-இல் உள்ள `wlheadless-run` கொண்டு testrunner-ஐச் சுற்றுங்கள். இது Weston-க்கு ஒரு தனிப்பட்ட runtime கோப்பகத்தை வழங்கி, அதன் socket தயாராகும் வரை காத்திருக்கிறது. இதன் flag-கள் testrunner தொடங்கும் Weston-இன் flag-களுடன் பொருந்துகின்றன:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Xvfb-ஐப் பயன்படுத்த, `xvfb-run` கொண்டு testrunner-ஐச் சுற்றுங்கள்:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## தானியங்கி நிறுவல் ஆதரவு

`displayServerAutoInstall` கீழே உள்ள package manager-களுடன் செயல்படுகிறது. நிறுவல்கள் பயனர் தலையீடு இல்லாமல் நடைபெறுகின்றன, 240 வினாடிகளுக்குப் பிறகு காலாவதியாகின்றன. வேறு எந்த package manager-ஐப் பயன்படுத்தினாலும், டிஸ்ப்ளே சர்வரை நீங்களே நிறுவுங்கள்.

| Package manager | Distribution-கள் | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- Arch Linux பகுதி மேம்படுத்தல்களை ஆதரிக்காது. எனவே Arch Linux-இல் நிறுவல் `pacman -Syu` என்ற முழு கணினி மேம்படுத்தலை இயக்குகிறது. காலாவதியான இமேஜில் இது 240 வினாடி வரம்பைத் தாண்டலாம். ஆகவே அங்கு டிஸ்ப்ளே சர்வரை முன்கூட்டியே நிறுவுங்கள்.
- Enterprise Linux 10-இல் Xvfb இல்லை. Weston, CRB தேவைப்படும் EPEL-இல் மட்டுமே கிடைக்கிறது. CentOS Stream, AlmaLinux, Rocky Linux ஆகியவற்றில் நிறுவல் இரண்டையும் இயக்கி, அவற்றை இயக்கத்திலேயே விட்டுவிடுகிறது. RHEL, Oracle Linux ஆகியவற்றில், [டிஸ்ப்ளே சர்வரை முன்கூட்டியே நிறுவுதல்](#preinstalling-a-display-server) பகுதியில் உள்ளதுபோல் அவற்றை நீங்களே அமைத்துக்கொள்ளுங்கள்.

## பதிவுகள்

டிஸ்ப்ளே சர்வர் launcher செயல்முறையில் இயங்குவதால், அதன் செய்திகள் launcher பதிவில் இருக்கும். அது உங்கள் `outputDir`-இல் உள்ள `wdio.log` ஆகும். `outputDir` அமைக்கப்படாவிட்டால் terminal-இல் இருக்கும். எந்த டிஸ்ப்ளே சர்வர் தொடங்கியது, அது எந்த மாறிகளை அமைத்தது என்பதைப் பதிவு காட்டுகிறது. கூடுதல் விவரங்களுக்கு, அதன் log level-ஐ உயர்த்துங்கள்:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## சிக்கல் தீர்வு

### Chrome `DevToolsActivePort file doesn't exist` பிழையுடன் தோல்வியடைகிறது

முழு செய்தி `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)` ஆகும். இதற்கான பொதுவான காரணம், headed Chrome தன் window-ஐத் திறக்க டிஸ்ப்ளே எதுவும் இல்லாதது. எந்த டிஸ்ப்ளே சர்வர் தொடங்கியது என்பதை [launcher பதிவில்](#logs) சரிபார்க்கவும். எதுவும் தொடங்கவில்லை என்றால், [Launcher பதிவு `No display server could be started` எனக் காட்டுகிறது](#the-launcher-log-shows-no-display-server-could-be-started) பகுதியைப் பார்க்கவும். உங்கள் சோதனைகளுக்குத் தெரியும் window தேவையில்லை என்றால், [மெய்நிகர் டிஸ்ப்ளே vs நேட்டிவ் headless: எதை எப்போது பயன்படுத்துவது](#when-to-use-a-virtual-display-vs-native-headless) பகுதியில் உள்ளதுபோல், அதற்குப் பதிலாக நேட்டிவ் headless பயன்முறையைப் பயன்படுத்துங்கள்.

### Chrome `user data directory is already in use` பிழையுடன் தோல்வியடைகிறது

முழு செய்தி `session not created: probably user data directory is already in use` என்று தொடங்குகிறது. இது பெரும்பாலும் தவறாக வழிநடத்தக்கூடியது. பொதுவாக இதன் பொருள், பிரவுசர் crash ஆகி, முந்தைய instance-இன் profile கோப்பகத்துடன் மீண்டும் தொடங்கியது என்பதே. நிலையான டிஸ்ப்ளே பெரும்பாலும் இதைத் தீர்க்கிறது. தீரவில்லை என்றால், ஒவ்வொரு worker-க்கும் தனித்துவமான `--user-data-dir`-ஐ வழங்குங்கள்.

### Launcher பதிவு `No display server could be started` எனக் காட்டுகிறது

முழு செய்தி `No display server could be started; continuing without a virtual display` ஆகும். டிஸ்ப்ளே சர்வர் எதுவும் நிறுவப்படவில்லை, அல்லது எதுவும் தொடங்கவில்லை. இதற்கு முன் வரும் செய்திகள் காரணத்தைக் கூறுகின்றன:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` அல்லது `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: எதுவும் நிறுவப்படவில்லை, தானியங்கி நிறுவலும் முடக்கப்பட்டுள்ளது.
- `wayland failed to start: ...` அல்லது `xvfb failed to start: ...`: சர்வரின் பிழை வெளியீடு இதைத் தொடர்ந்து வருகிறது.
- `Failed to install Weston` அல்லது `Failed to install Xvfb`: நிறுவல் தோல்வியடைந்தது.
- `wayland still not found after installing` அல்லது `xvfb still not found after installing`: நிறுவல் வெற்றியடைந்தது, ஆனால் அந்த சர்வரை வழங்கவில்லை. உதாரணமாக, ஒரு தனிப்பயன் `displayServerAutoInstallCommand` மற்ற சர்வரை மட்டுமே நிறுவுவதால் இது நிகழலாம். உங்கள் கட்டளை நிறுவும் சர்வரையே `displayServer` என அமைக்கவும்.

உங்கள் இமேஜில் Weston அல்லது Xvfb-ஐ நிறுவுங்கள், அல்லது `displayServerAutoInstall: true` என அமைக்கவும்.

### Xvfb `Failed to find a socket to listen on` பிழையுடன் வெளியேறுகிறது

Xvfb தன் socket-ஐ `/tmp/.X11-unix`-இல் உருவாக்குகிறது. அந்தக் கோப்பகம் இருந்தால், அது சோதனைப் பயனரால் எழுதக்கூடியதாக இருக்க வேண்டும். உதாரணமாக `1777` mode அவ்வாறு எழுத அனுமதிக்கிறது.

### Weston-இன் கீழ் Chrome அல்லது Electron `Missing X server or $DISPLAY` பிழையுடன் தோல்வியடைகிறது

பிரவுசர் Wayland-க்குப் பதிலாக X11-ஐ முயன்றது. WebdriverIO அதைத் தொடங்கவில்லை என்றால், [WebdriverIO தொடங்காத பிரவுசர்கள்](#browsers-webdriverio-doesnt-launch) பகுதியைப் பார்க்கவும். இல்லையெனில், அதன் args-இலிருந்து `--ozone-platform=x11`-ஐ நீக்குங்கள்.

### Chrome அல்லது Edge-இல் focus-ஐச் சார்ந்த சோதனைகள் தோல்வியடைகின்றன

பகிரப்பட்ட டிஸ்ப்ளேவில் உள்ள பக்கங்களுக்கு focus இல்லாமல் போகலாம். அதனால் `document.hasFocus()` `false`-ஐத் தருகிறது. [Window focus](#window-focus) பகுதியில் உள்ளதுபோல், focus emulation-ஐ இயக்குங்கள்.

### Weston-இன் கீழ் ஒரு X11 கருவி அல்லது ஆப் `cannot open display` அல்லது `Can't open display` பிழையுடன் தோல்வியடைகிறது

Weston, `DISPLAY`-ஐ வழங்குவதில்லை. Testrunner அதற்குப் பதிலாக Xvfb-ஐத் தொடங்க `displayServer: 'xvfb'` என அமைக்கவும். Weston-ஐ நீங்களே தொடங்கியிருந்தால், ஓட்டத்தை `xvfb-run` கொண்டு சுற்றுங்கள். ஏனெனில் testrunner புதிதாக ஒன்றைத் தொடங்குவதற்குப் பதிலாக ஏற்கனவே உள்ள டிஸ்ப்ளேவைப் பயன்படுத்துகிறது.

## அடுத்த படிகள்

- ஒவ்வொரு `displayServer*` விருப்பத்திற்குமான [உள்ளமைவுக்](/docs/configuration#displayserverenabled) குறிப்பு.
- v9 விருப்பங்களான `autoXvfb`, `xvfb*` ஆகியவற்றின் மாற்றுகளுக்கு [v10 இடம்பெயர்வு வழிகாட்டி](/docs/v10-migration#virtual-displays-on-linux).
- உங்கள் சோதனைத் தொகுப்பை CI-இல் இயக்க [Docker](/docs/docker) மற்றும் [GitHub Actions](/docs/githubactions).
- Linux-இல் Electron, Tauri, Dioxus ஆகியவற்றுக்கு [டெஸ்க்டாப் ஆப்கள்](/docs/platforms/desktop#linux).