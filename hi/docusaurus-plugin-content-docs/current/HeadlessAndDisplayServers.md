---
id: headless-and-display-servers
title: हेडलेस और डिस्प्ले सर्वर
description: Linux CI और कंटेनरों में हेडेड ब्राउज़र और डेस्कटॉप ऐप्स को उस Weston या Xvfb वर्चुअल डिस्प्ले के साथ चलाएँ जिसे testrunner शुरू करता है। इसमें इसके विकल्प, CI रेसिपी और ट्रबलशूटिंग भी शामिल हैं।
---

Linux पर, जब कोई डिस्प्ले उपलब्ध नहीं होता, तो testrunner रन के लिए एक वर्चुअल डिस्प्ले सर्वर शुरू करता है: हेडलेस मोड में [Weston](https://gitlab.freedesktop.org/wayland/weston), या फ़ॉलबैक के रूप में [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer)। यह पेज बताता है कि ऐसा कब होता है, इसे कैसे कॉन्फ़िगर करें, और यह CI और Docker में कैसे काम करता है। ज़्यादातर सेटअप में, आपको बस अपनी इमेज में Weston या Xvfb इंस्टॉल करना होता है, या अपने कॉन्फ़िग में `displayServerAutoInstall: true` सेट करना होता है।

## वर्चुअल डिस्प्ले बनाम नेटिव हेडलेस का उपयोग कब करें

वर्चुअल डिस्प्ले ब्राउज़रों और ऐप्स को वहाँ एक स्क्रीन देता है जहाँ कोई स्क्रीन नहीं होती, जैसे CI रनर और कंटेनरों में। इसे तब रखें जब:

- आप डेस्कटॉप ऐप्स का परीक्षण करते हैं, जिन्हें एक वास्तविक विंडो की आवश्यकता होती है।
- आपके परीक्षणों को एक हेडेड ब्राउज़र की आवश्यकता है, उदाहरण के लिए दृश्यमान ब्राउज़र से लिए गए स्क्रीनशॉट बेसलाइन से मिलान करने के लिए।
- Chrome `DevToolsActivePort file doesn't exist` या `user data directory is already in use` के साथ शुरू होने में विफल रहता है, जैसा कि [ट्रबलशूटिंग](#troubleshooting) में बताया गया है।

उन ब्राउज़र परीक्षणों के लिए जिन्हें दृश्यमान विंडो की आवश्यकता नहीं है, नेटिव हेडलेस मोड, जैसे Chrome का `--headless=new`, कम ओवरहेड रखता है। इसके साथ `displayServerEnabled: false` सेट करें, अन्यथा testrunner फिर भी एक डिस्प्ले सर्वर शुरू करता है। यही तब भी करें जब आपके सभी ब्राउज़र किसी क्लाउड सेवा या रिमोट ग्रिड पर चलते हों, क्योंकि स्थानीय रूप से किसी चीज़ को डिस्प्ले की आवश्यकता नहीं होती।

## यह कैसे काम करता है

testrunner किसी भी सर्विस के `onPrepare` हुक से पहले एक डिस्प्ले सर्वर शुरू करता है और उसका एनवायरनमेंट `process.env` पर सेट करता है:

| वेरिएबल | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | सेट नहीं |
| `DISPLAY` | सेट नहीं | पहला खाली डिस्प्ले, जैसे `:0` |
| `XDG_RUNTIME_DIR` | रन के लिए `/tmp` के अंतर्गत एक निजी डायरेक्टरी | अपरिवर्तित |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

वर्कर्स इन वेरिएबल्स को इनहेरिट करते हैं, और वैसे ही वे ड्राइवर और ऐप्स भी जिन्हें सर्विसेज़ `onPrepare` में शुरू करती हैं। ब्राउज़र और GUI टूलकिट इन्हीं से Wayland या X11 चुनते हैं। Weston के अंतर्गत, निजी `XDG_RUNTIME_DIR` रन के लिए आपके किसी भी पिछले मान को बदल देता है।

डिस्प्ले सर्वर तब तक चलता रहता है जब तक `onComplete` हुक समाप्त नहीं हो जाते, ताकि सर्विसेज़ टियरडाउन के दौरान भी इसका उपयोग कर सकें। इसके बाद testrunner इसे रोक देता है और पिछले मानों को पुनर्स्थापित कर देता है। यदि प्रोसेस पहले ही बंद हो जाती है, जिसमें Ctrl+C भी शामिल है, तो डिस्प्ले सर्वर भी उसके साथ समाप्त कर दिया जाता है।

testrunner केवल तभी डिस्प्ले सर्वर शुरू करता है जब ये सभी शर्तें सत्य हों:

- यह Linux पर चलता है।
- न तो `DISPLAY` और न ही `WAYLAND_DISPLAY` सेट है।
- `displayServerEnabled` का मान `false` नहीं है।

यदि कोई डिस्प्ले पहले से मौजूद है, तो testrunner उसका उपयोग करता है और कुछ भी शुरू नहीं करता। केवल `WAYLAND_DISPLAY` सेट होने पर, उदाहरण के लिए आपके CI द्वारा शुरू किए गए Weston से, testrunner फिर भी रन के लिए `XDG_SESSION_TYPE`, `GDK_BACKEND` और `ELECTRON_OZONE_PLATFORM_HINT` को `wayland` पर सेट करता है। यह इनहेरिट किए गए मानों, जैसे SSH लॉगिन से आए `XDG_SESSION_TYPE=tty`, को ओवरराइड करके सुनिश्चित करता है कि ब्राउज़र सही डिस्प्ले का उपयोग करें, क्योंकि वे मान उन्हें X11 पर भेज देते जहाँ कोई सर्वर नहीं है। यह ऐसा `displayServerEnabled: false` होने पर भी करता है, जो केवल यह नियंत्रित करता है कि डिस्प्ले सर्वर शुरू हो या नहीं।

### कौन सा डिस्प्ले सर्वर उपयोग किया जाता है

डिफ़ॉल्ट `displayServer: 'auto'` के साथ, testrunner पहले Weston और फिर Xvfb आज़माता है। कुछ भी इंस्टॉल करने से पहले इंस्टॉल किए गए सर्वर आज़माए जाते हैं, इसलिए Weston इंस्टॉल करने के बजाय मौजूदा Xvfb का उपयोग किया जाता है। यदि Weston शुरू होने में विफल रहता है, तो testrunner Xvfb पर फ़ॉलबैक करता है। यदि कोई डिस्प्ले सर्वर शुरू नहीं होता, तो testrunner एक चेतावनी लॉग करता है और रन उसके बिना जारी रहता है। `displayServer: 'wayland'` या `displayServer: 'xvfb'` के साथ, testrunner केवल उसी सर्वर को आज़माता है।

Weston 10 और उसके बाद के संस्करण समर्थित हैं। Ubuntu 22.04 और Debian 11 में Weston 9 आता है, और EPEL सक्षम Enterprise Linux 9 में Weston 8 मिलता है, इसलिए वहाँ `displayServer: 'xvfb'` सेट करें। Weston, Xwayland के बिना शुरू होता है, इसलिए यह कोई `DISPLAY` प्रदान नहीं करता। यदि आपके परीक्षणों या टूल्स को X11 की आवश्यकता है, उदाहरण के लिए `xdotool`, `xclip` या कोई Java ऐप, तो `displayServer: 'xvfb'` सेट करें।

### विंडो फ़ोकस

सभी वर्कर्स एक ही डिस्प्ले का उपयोग करते हैं। WebdriverIO v9 में, प्रत्येक वर्कर को `xvfb-run` में रैप किया जाता था और उसे अपना अलग डिस्प्ले मिलता था, इसलिए उसके ब्राउज़र में हमेशा फ़ोकस रहता था। Chrome और Edge जैसे Chromium-आधारित ब्राउज़रों में अब फ़ोकस की कमी हो सकती है: Weston के अंतर्गत किसी भी विंडो को फ़ोकस नहीं मिलता, और Xvfb के अंतर्गत केवल सबसे हाल में खोली गई विंडो में फ़ोकस होता है। WebDriver इनपुट फिर भी पेज तक पहुँचता है, लेकिन `document.hasFocus()` `false` लौटाता है, `focus` इवेंट फ़ायर नहीं होते और `:focus` स्टाइल लागू नहीं होतीं। यदि आपके परीक्षण फ़ोकस पर निर्भर हैं, तो फ़ोकस इम्यूलेशन चालू करें, जो एक प्रायोगिक Chrome DevTools Protocol (CDP) कमांड है और पेज लोड के बीच बना रहता है:

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

Firefox प्रभावित नहीं होता, क्योंकि WebDriver के अंतर्गत यह अपने पेजों को फ़ोकस्ड मानता है।

### स्टैंडअलोन स्क्रिप्ट

testrunner डिस्प्ले सर्वर को स्वयं शुरू करता है। `remote()` को कॉल करने वाली एक स्टैंडअलोन स्क्रिप्ट `@wdio/display-server` से `startDisplayDaemonFromConfig` के साथ एक डिस्प्ले सर्वर शुरू कर सकती है। यह वही `displayServer*` विकल्प लेता है, डिस्प्ले के वेरिएबल्स को `process.env` पर सेट करता है ताकि ब्राउज़र उन्हें इनहेरिट करे, और `stop()` पर उन्हें पुनर्स्थापित करता है:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// Linux के अलावा, जब X11 डिस्प्ले पहले से मौजूद हो, या जब कोई शुरू न हो, तो null। मौजूदा
// Wayland डिस्प्ले के साथ, यह एक हैंडल लौटाता है जिसका stop() उसके द्वारा सेट किए गए सेशन वेरिएबल्स को पुनर्स्थापित करता है।
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

आप स्क्रिप्ट को `xvfb-run` के अंतर्गत भी चला सकते हैं, जैसा कि [मौजूदा डिस्प्ले का उपयोग करना](#using-an-existing-display) में बताया गया है।

## ब्राउज़र सेटअप

### WebdriverIO द्वारा लॉन्च किए गए ब्राउज़र

इन ब्राउज़रों को किसी कॉन्फ़िगरेशन की आवश्यकता नहीं है:

- Chrome और Edge 140 और उसके बाद के संस्करण, तथा Chrome for Testing 135 और उसके बाद के संस्करण, डिस्प्ले सर्वर द्वारा सेट किए गए `XDG_SESSION_TYPE=wayland` का पालन करते हैं।
- पुराने Chrome और Edge `XDG_SESSION_TYPE` को अनदेखा करते हैं। उनके लिए, जब X सर्वर के बिना Wayland चालू होता है, तो WebdriverIO अपने द्वारा लॉन्च किए गए प्रत्येक Chrome और Edge के args में `--ozone-platform=wayland` जोड़ता है, जब तक कि args पहले से `--ozone-platform` या `--headless` सेट न करते हों।
- Electron ऐप्स: Electron 38 और उसके बाद के संस्करण `XDG_SESSION_TYPE` का पालन करते हैं, और Electron 28 से 37 `ELECTRON_OZONE_PLATFORM_HINT` का पालन करते हैं, जिसे डिस्प्ले सर्वर भी सेट करता है। Electron 27 और उससे पहले के संस्करण `--ozone-platform=wayland` फ़्लैग पर निर्भर करते हैं, जिसे WebdriverIO तब जोड़ता है जब वह Chromedriver के माध्यम से ऐप शुरू करता है।
- Firefox और GTK ऐप्स, जैसे Tauri ऐप्स, `WAYLAND_DISPLAY` और `GDK_BACKEND` से Wayland चुनते हैं। 120 से पहले के Firefox का परीक्षण नहीं किया गया है।

### वे ब्राउज़र जिन्हें WebdriverIO लॉन्च नहीं करता

ग्रिड या क्लाउड सेवा पर चलने वाले ब्राउज़रों को किसी कॉन्फ़िगरेशन की आवश्यकता नहीं होती, क्योंकि वे रिमोट होस्ट के डिस्प्ले पर चलते हैं।

स्थानीय ब्राउज़र जिन्हें कोई और लॉन्च करता है, जैसे आपके द्वारा शुरू किया गया ड्राइवर, कोई Appium सर्वर या किसी सर्विस का अपना लॉन्चर, उन्हें WebdriverIO का `--ozone-platform=wayland` फ़्लैग नहीं मिलता। Chrome और Edge 140 और उसके बाद के संस्करणों, तथा Electron 28 और उसके बाद के संस्करणों को इसकी आवश्यकता नहीं है, क्योंकि वे सेशन वेरिएबल्स का पालन करते हैं, लेकिन पुराने Chrome और Edge को इसकी आवश्यकता होती है। क्या करना है यह इस पर निर्भर करता है कि ब्राउज़र कब शुरू होता है:

- **रन के दौरान**, उदाहरण के लिए किसी सर्विस के `onPrepare` से, नए ब्राउज़रों को कुछ नहीं चाहिए, क्योंकि वे डिस्प्ले और सेशन वेरिएबल्स इनहेरिट करते हैं। पुराने Chrome और Edge के लिए, इनमें से कोई एक करें:
  - Xvfb का उपयोग करने के लिए `displayServer: 'xvfb'` सेट करें, या
  - Weston का उपयोग करने के लिए `displayServer: 'wayland'` सेट करें और उनके args में `--ozone-platform=wayland` जोड़ें।
- **WebdriverIO से पहले**, उदाहरण के लिए किसी पिछले CI स्टेप या दूसरे शेल से, वे WebdriverIO द्वारा शुरू किए गए डिस्प्ले सर्वर का उपयोग नहीं कर सकते, क्योंकि वे उसके वेरिएबल्स इनहेरिट नहीं करते। डिस्प्ले स्वयं शुरू करें, जैसा कि [मौजूदा डिस्प्ले का उपयोग करना](#using-an-existing-display) में बताया गया है, और इनमें से कोई एक करें:
  - Xvfb का उपयोग करें, जिसके लिए और कुछ नहीं चाहिए, या
  - Weston का उपयोग करें, फिर `XDG_SESSION_TYPE=wayland` (Chrome और Edge 140 और उसके बाद, Electron 38 और उसके बाद) या `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron 28 से 37) एक्सपोर्ट करें, और पुराने Chrome और Edge के args में `--ozone-platform=wayland` जोड़ें।

## कॉन्फ़िगरेशन

सभी विकल्प [कॉन्फ़िगरेशन रेफ़रेंस](/docs/configuration#displayserverenabled) में सूचीबद्ध हैं। उदाहरण के लिए:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // यदि कोई डिस्प्ले सर्वर इंस्टॉल नहीं है तो एक इंस्टॉल करें
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // हमेशा छोटे आकार में Xvfb का उपयोग करें, जिसे एक कस्टम कमांड द्वारा इंस्टॉल किया जाता है जो रूट कंटेनर मानता है
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

कस्टम कमांड दोनों सर्वरों द्वारा साझा की जाती है। `displayServer: 'auto'` के साथ, यह पहले Weston के लिए चलती है, और Xvfb के लिए दोबारा केवल तभी चलती है जब Weston अभी भी उपलब्ध न हो या शुरू होने में विफल रहे और Xvfb अभी भी मौजूद न हो। `displayServer` को उस सर्वर पर सेट करें जिसे आपकी कमांड इंस्टॉल करती है, जैसा कि यह उदाहरण करता है।

v9 विकल्प `autoXvfb` और `xvfb*` अप्रचलित (deprecated) हैं और v11 में हटा दिए जाएँगे। उनके विकल्पों के लिए [v10 माइग्रेशन गाइड](/docs/v10-migration#virtual-displays-on-linux) देखें।

## CI और Docker

अपनी इमेज में एक डिस्प्ले सर्वर पहले से इंस्टॉल करें, या रन शुरू होने पर एक इंस्टॉल करने के लिए `displayServerAutoInstall: true` सेट करें।

### डिस्प्ले सर्वर पहले से इंस्टॉल करना

#### Weston

Ubuntu 24.04 या Debian 12 और उसके बाद के संस्करणों पर:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

RHEL 10 और Oracle Linux 10 पर, [EPEL दस्तावेज़](https://docs.fedoraproject.org/en-US/epel/getting-started/) का पालन करते हुए EPEL और CodeReady Builder को स्वयं सक्षम करें, फिर `weston` इंस्टॉल करें।

testrunner को अपने स्वयं के Weston में रैप करने के लिए, जैसा कि [मौजूदा डिस्प्ले का उपयोग करना](#using-an-existing-display) में है, `xwayland-run` भी इंस्टॉल करें। यह Debian 13, Ubuntu 24.04, Fedora और openSUSE Tumbleweed के लिए पैकेज किया गया है। इसके बिना, आपको Weston को उसके अपने `XDG_RUNTIME_DIR` और `WAYLAND_DISPLAY` के साथ बैकग्राउंड में शुरू करना होगा, और WebdriverIO शुरू करने से पहले उसके सॉकेट की प्रतीक्षा करनी होगी। वैकल्पिक रूप से, Xvfb का उपयोग करें।

#### Xvfb

Ubuntu या Debian पर:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04 और Debian 11 में आने वाला Weston बहुत पुराना है, इसलिए वहाँ Xvfb का उपयोग करें। केवल Xvfb इंस्टॉल होने पर, testrunner बिना किसी अतिरिक्त कॉन्फ़िगरेशन के इसका उपयोग करता है।

अन्य डिस्ट्रीब्यूशन के लिए, [स्वचालित इंस्टॉलेशन समर्थन](#automatic-installation-support) में दिए गए पैकेज नामों का उपयोग करें।

### मौजूदा डिस्प्ले का उपयोग करना

यदि आपका CI पहले से एक डिस्प्ले प्रदान करता है, तो testrunner उसका उपयोग करता है और कुछ भी शुरू नहीं करता।

Weston का उपयोग करने के लिए, testrunner को `xwayland-run` पैकेज के `wlheadless-run` से रैप करें। यह Weston को एक निजी रनटाइम डायरेक्टरी देता है और उसके सॉकेट की प्रतीक्षा करता है, और फ़्लैग्स testrunner द्वारा शुरू किए जाने वाले Weston से मेल खाते हैं:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Xvfb का उपयोग करने के लिए, testrunner को `xvfb-run` से रैप करें:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## स्वचालित इंस्टॉलेशन समर्थन

`displayServerAutoInstall` नीचे दिए गए पैकेज मैनेजरों के साथ काम करता है। इंस्टॉलेशन नॉन-इंटरैक्टिव होते हैं और 240 सेकंड के बाद टाइम आउट हो जाते हैं। किसी अन्य पैकेज मैनेजर के साथ, डिस्प्ले सर्वर स्वयं इंस्टॉल करें।

| पैकेज मैनेजर | डिस्ट्रीब्यूशन | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- Arch Linux पर, इंस्टॉलेशन `pacman -Syu` चलाता है, जो एक पूर्ण सिस्टम अपग्रेड है, क्योंकि Arch आंशिक अपग्रेड का समर्थन नहीं करता। पुरानी इमेज पर यह 240 सेकंड की सीमा से अधिक हो सकता है, इसलिए वहाँ डिस्प्ले सर्वर पहले से इंस्टॉल करें।
- Enterprise Linux 10 में Xvfb नहीं है और Weston केवल EPEL में आता है, जिसके लिए CRB की आवश्यकता होती है। CentOS Stream, AlmaLinux और Rocky Linux पर, इंस्टॉलेशन दोनों को सक्षम करता है और उन्हें सक्षम ही छोड़ देता है। RHEL और Oracle Linux पर, उन्हें स्वयं सेट अप करें, जैसा कि [डिस्प्ले सर्वर पहले से इंस्टॉल करना](#preinstalling-a-display-server) में बताया गया है।

## लॉग्स

डिस्प्ले सर्वर लॉन्चर प्रोसेस में चलता है, इसलिए उसके संदेश लॉन्चर लॉग में होते हैं: आपके `outputDir` में `wdio.log`, या यदि `outputDir` सेट नहीं है तो टर्मिनल में। लॉग दिखाता है कि कौन सा डिस्प्ले सर्वर शुरू हुआ और उसने कौन से वेरिएबल्स सेट किए। अधिक विवरण के लिए, इसका लॉग लेवल बढ़ाएँ:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## ट्रबलशूटिंग

### Chrome `DevToolsActivePort file doesn't exist` के साथ विफल होता है

पूरा संदेश `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)` है। इसका एक सामान्य कारण एक हेडेड Chrome है जिसके पास अपनी विंडो खोलने के लिए कोई डिस्प्ले नहीं है। शुरू हुए डिस्प्ले सर्वर के लिए [लॉन्चर लॉग](#logs) जाँचें। यदि कोई शुरू नहीं हुआ, तो [लॉन्चर लॉग `No display server could be started` दिखाता है](#the-launcher-log-shows-no-display-server-could-be-started) देखें। यदि आपके परीक्षणों को दृश्यमान विंडो की आवश्यकता नहीं है, तो इसके बजाय नेटिव हेडलेस मोड का उपयोग करें, जैसा कि [वर्चुअल डिस्प्ले बनाम नेटिव हेडलेस का उपयोग कब करें](#when-to-use-a-virtual-display-vs-native-headless) में बताया गया है।

### Chrome `user data directory is already in use` के साथ विफल होता है

पूरा संदेश `session not created: probably user data directory is already in use` से शुरू होता है। यह अक्सर भ्रामक होता है: इसका आमतौर पर मतलब होता है कि ब्राउज़र क्रैश हो गया और पिछले इंस्टेंस की प्रोफ़ाइल डायरेक्टरी के साथ पुनः शुरू हुआ। एक स्थिर डिस्प्ले अक्सर इसे हल कर देता है। यदि नहीं, तो प्रत्येक वर्कर के लिए एक अद्वितीय `--user-data-dir` पास करें।

### लॉन्चर लॉग `No display server could be started` दिखाता है

पूरा संदेश `No display server could be started; continuing without a virtual display` है। कोई डिस्प्ले सर्वर इंस्टॉल नहीं है, या कोई शुरू नहीं हुआ। इससे पहले के संदेश कारण बताते हैं:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` या `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: कुछ भी इंस्टॉल नहीं है और ऑटो-इंस्टॉल बंद है।
- `wayland failed to start: ...` या `xvfb failed to start: ...`: इसके बाद सर्वर का एरर आउटपुट आता है।
- `Failed to install Weston` या `Failed to install Xvfb`: इंस्टॉलेशन विफल रहा।
- `wayland still not found after installing` या `xvfb still not found after installing`: इंस्टॉलेशन सफल रहा लेकिन उसने वह सर्वर प्रदान नहीं किया, उदाहरण के लिए क्योंकि एक कस्टम `displayServerAutoInstallCommand` केवल दूसरा सर्वर इंस्टॉल करती है। `displayServer` को उस सर्वर पर सेट करें जिसे आपकी कमांड इंस्टॉल करती है।

अपनी इमेज में Weston या Xvfb इंस्टॉल करें, या `displayServerAutoInstall: true` सेट करें।

### Xvfb `Failed to find a socket to listen on` के साथ बंद हो जाता है

Xvfb अपना सॉकेट `/tmp/.X11-unix` में बनाता है। यदि वह डायरेक्टरी मौजूद है, तो वह टेस्ट यूज़र द्वारा लिखने योग्य होनी चाहिए, जैसा कि मोड `1777` में होता है।

### Weston के अंतर्गत Chrome या Electron `Missing X server or $DISPLAY` के साथ विफल होता है

ब्राउज़र ने Wayland के बजाय X11 आज़माया। यदि WebdriverIO ने इसे लॉन्च नहीं किया, तो [वे ब्राउज़र जिन्हें WebdriverIO लॉन्च नहीं करता](#browsers-webdriverio-doesnt-launch) देखें। अन्यथा, इसके args से `--ozone-platform=x11` हटाएँ।

### Chrome या Edge में फ़ोकस-निर्भर परीक्षण विफल होते हैं

`document.hasFocus()` `false` लौटाता है क्योंकि साझा डिस्प्ले पर पेजों में फ़ोकस की कमी हो सकती है। फ़ोकस इम्यूलेशन चालू करें, जैसा कि [विंडो फ़ोकस](#window-focus) में बताया गया है।

### Weston के अंतर्गत कोई X11 टूल या ऐप `cannot open display` या `Can't open display` के साथ विफल होता है

Weston कोई `DISPLAY` प्रदान नहीं करता। `displayServer: 'xvfb'` सेट करें ताकि testrunner इसके बजाय Xvfb शुरू करे। यदि आपने Weston स्वयं शुरू किया है, तो रन को `xvfb-run` से रैप करें, क्योंकि testrunner नया डिस्प्ले शुरू करने के बजाय मौजूदा डिस्प्ले का उपयोग करता है।

## अगले कदम

- हर `displayServer*` विकल्प के लिए [कॉन्फ़िगरेशन](/docs/configuration#displayserverenabled) रेफ़रेंस।
- v9 विकल्पों `autoXvfb` और `xvfb*` के विकल्पों के लिए [v10 माइग्रेशन गाइड](/docs/v10-migration#virtual-displays-on-linux)।
- CI में अपना सूट चलाने के लिए [Docker](/docs/docker) और [GitHub Actions](/docs/githubactions)।
- Linux पर Electron, Tauri और Dioxus के लिए [डेस्कटॉप ऐप्स](/docs/platforms/desktop#linux)।