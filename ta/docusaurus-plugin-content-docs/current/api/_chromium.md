---
id: chromium
title: குரோமியம்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
ஒரு எளிய உரையாடல் தற்போது திறந்திருக்கிறதா.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49) காணலாம்.

##### பயன்பாடு

```js
browser.isAlertOpen()
```

##### உதாரணம்


```js
console.log(browser.isAlertOpen()); // outputs: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // outputs: true
```


##### திருப்பி அனுப்புவது

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** எளிய உரையாடல் இருக்கிறதா இல்லையா என்பதன் அடிப்படையில் `true` அல்லது `false`.


---

## isAutoReporting
உலாவி பதிவுகளில் பிழைகளை தானாகவே உயர்த்த வேண்டுமா.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://codereview.chromium.org/101203012) காணலாம்.

##### பயன்பாடு

```js
browser.isAutoReporting()
```


##### திருப்பி அனுப்புவது

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** தானியங்கு அறிக்கை இயக்கப்பட்டுள்ளதா இல்லையா என்பதன் அடிப்படையில் `true` அல்லது `false`.


---

## setAutoReporting
அனைத்து அடுத்தடுத்த கட்டளைகளுக்கும் (ஒருமுறை இயக்கப்பட்டால்) முதல் உலாவி பிழையுடன் (எ.கா. 403/404 பதிலின் காரணமாக வளத்தை ஏற்ற முடியவில்லை) தெரியாத பிழையுடன் பதிலைத் திருப்பி அனுப்ப வேண்டுமா என்பதை மாற்றவும்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://codereview.chromium.org/101203012) காணலாம்.

##### பயன்பாடு

```js
browser.setAutoReporting(enabled)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>தானியங்கு அறிக்கை இயக்கப்பட வேண்டுமென்றால் `true`, முன்பு இயக்கப்பட்ட தானியங்கு அறிக்கையை முடக்க `false` ஐப் பயன்படுத்தவும்.</td>
    </tr>
  </tbody>
</table>

##### உதாரணங்கள்


```js
// Enable auto reporting first thing after session was initiated with empty browser logs
console.log(browser.setAutoReporting(true)); // outputs: null
// Upon requesting an non-existing resource it will abort execution due to thrown unknown error
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// During the session do some operations which populate the browser logs
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// Enable auto reporting which throws an unknown error for first browser log (404 response)
browser.setAutoReporting(true);
```


##### திருப்பி அனுப்புவது

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** முதல் உலாவி பிழை இந்த கட்டளையை செயல்படுத்துவதற்கு முன்பே ஏற்பட்டிருந்தால், பதிலாக தெரியாத பிழையை எறிகிறது, இது முதல் உலாவி பிழையை விவரிக்கும் 'message' விசையுடன் ஒரு பொருள். இல்லையெனில் வெற்றிக்கு `null` ஐத் திருப்பித் தருகிறது.


---

## isLoading
செயலில் உள்ள சாளர கையாளுதலுக்கான சுமை நிலையை தீர்மானிக்கிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802) காணலாம்.

##### பயன்பாடு

```js
browser.isLoading()
```

##### உதாரணம்


```js
console.log(browser.isLoading()); // outputs: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // outputs: true
```


##### திருப்பி அனுப்புவது

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** செயலில் உள்ள சாளர கையாளுதல் ஏற்றுகிறதா இல்லையா என்பதன் அடிப்படையில் `true` அல்லது `false`.


---

## takeHeapSnapshot
தற்போதைய செயல்படுத்தல் சூழலின் குவியல் ஸ்னாப்ஷாட்டை எடுக்கிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202) காணலாம்.

##### பயன்பாடு

```js
browser.takeHeapSnapshot()
```


##### திருப்பி அனுப்புவது

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** குவியல் ஸ்னாப்ஷாட்டின் JSON பிரதிநிதித்துவம். Chrome DevTools இல் கோப்பாக ஏற்றுவதன் மூலம் ஆய்வு செய்யலாம்.


---

## getNetworkConnection
நெட்வொர்க் போலியாக்கத்திற்கான இணைப்பு வகையைப் பெறுங்கள். தொலை முனை `networkConnectionEnabled` திறனை `true` என அமைத்து பதிலளிக்கும் போது மட்டுமே இந்த கட்டளை பொருந்தும்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) காணலாம்.

##### பயன்பாடு

```js
browser.getNetworkConnection()
```

##### உதாரணம்


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Network emulation requires device mode, which is only enabled when mobile emulation is on
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // outputs: 6 (Both Wi-Fi and data)
```


##### திருப்பி அனுப்புவது

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** பிட்மாஸ்க் நெட்வொர்க் இணைப்பு வகையை குறிக்கிறது. விமான முறை (`1`), Wi-Fi மட்டும் (`2`), Wi-Fi மற்றும் தரவு (`6`), 4G (`8`), 3G (`10`), 2G (`20`). இயல்பாக [Wi-Fi மற்றும் தரவு இயக்கப்பட்டுள்ளது](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37).


---

## setNetworkConnection
நெட்வொர்க் இணைப்புக்கான இணைப்பு வகையை மாற்றவும். தொலை முனை `networkConnectionEnabled` திறனை `true` என அமைத்து பதிலளிக்கும் போது மட்டுமே இந்த கட்டளை பொருந்தும்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) காணலாம்.

##### பயன்பாடு

```js
browser.setNetworkConnection(parameters)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>ConnectionType கொண்ட பொருள், பொருளில் `type` விசையின் மதிப்பாக பிட்மாஸ்க் அமைக்கவும். விமான முறை (`1`), Wi-Fi மட்டும் (`2`), Wi-Fi மற்றும் தரவு (`6`), 4G (`8`), 3G (`10`), 2G (`20`).</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Network emulation requires device mode, which is only enabled when mobile emulation is on
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // outputs: 1 (Airplane Mode)
```


##### திருப்பி அனுப்புவது

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** பிட்மாஸ்க் நெட்வொர்க் இணைப்பு வகையை குறிக்கிறது. பொருளில் குறிப்பிடப்பட்ட `type` உடன் மதிப்பு பொருந்த வேண்டும், இருப்பினும் சாதனம் கோரப்பட்ட நெட்வொர்க் இணைப்பு வகையை கையாள முடியாமல் போகலாம்.


---

## getNetworkConditions
போலியாக்கத்திற்காக பயன்படுத்தப்படும் தற்போதைய நெட்வொர்க் நிலைமைகளைப் பெறுங்கள்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859) காணலாம்.

##### பயன்பாடு

```js
browser.getNetworkConditions()
```


##### திருப்பி அனுப்புவது

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** `offline`, `latency`, `download_throughput` மற்றும் `upload_throughput` ஆகியவற்றுக்கான நெட்வொர்க் நிலைமைகளைக் கொண்ட பொருள். அதைப் பெறுவதற்கு முன் நெட்வொர்க் நிலைமைகள் அமைக்கப்பட வேண்டும்.


---

## setNetworkConditions
இணைப்பை கட்டுப்படுத்துவதன் மூலம் போலியாக்கத்திற்கு பயன்படுத்தப்படும் நெட்வொர்க் நிலைமைகளை அமைக்கவும்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722) காணலாம்.

##### பயன்பாடு

```js
browser.setNetworkConditions(network_conditions, network_name)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>`latency`, `throughput` (அல்லது `download_throughput`/`upload_throughput`) மற்றும் `offline` (விருப்ப) ஆகியவற்றைக் கொண்ட நெட்வொர்க் நிலைமைகளைக் கொண்ட பொருள்.</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>[நெட்வொர்க் த்ரோட்லிங் முன்அமைவு](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25) பெயர். `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `WiFi` அல்லது முடக்க `No throttling`. முன்அமைவு குறிப்பிடப்பட்டால், முதல் அளவுருவில் செலுத்தப்பட்ட மதிப்புகள் மதிக்கப்படாது.</td>
    </tr>
  </tbody>
</table>

##### உதாரணங்கள்


```js
// Use different download (25kb/s) and upload (50kb/s) throughput values for throttling with a latency of 1000ms
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// Force disconnected from network by setting 'offline' to true
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// When preset name (e.g. 'DSL') is specified it does not respect values in object (e.g. 'offline')
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// Best practice for specifying network throttling preset is to use an empty object
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
அமைக்கப்பட்டிருக்கக்கூடிய எந்த நெட்வொர்க் த்ரோட்லிங்கையும் முடக்கவும். `No throttling` முன்அமைவை அமைப்பதற்கு சமமானது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745) காணலாம்.

##### பயன்பாடு

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
DevTools டிபக்கருக்கு ஒரு கட்டளையை அனுப்பவும்.<br />கிடைக்கக்கூடிய கட்டளைகள் மற்றும் அவற்றின் அளவுருக்களின் பட்டியலுக்கு [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/) ஐப் பார்க்கவும்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304) காணலாம்.

##### பயன்பாடு

```js
browser.sendCommand(cmd, params)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>கட்டளையின் பெயர் (எ.கா. [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>கட்டளைக்கான அளவுருக்கள். கட்டளைக்கு எந்த அளவுருக்களும் இல்லை என்றால், வெற்று பொருளைக் குறிப்பிடவும்.</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
DevTools டிபக்கருக்கு ஒரு கட்டளையை அனுப்பி, முடிவுக்காக காத்திருக்கவும்.<br />கிடைக்கக்கூடிய கட்டளைகள் மற்றும் அவற்றின் அளவுருக்களின் பட்டியலுக்கு [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/) ஐப் பார்க்கவும்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320) காணலாம்.

##### பயன்பாடு

```js
browser.sendCommandAndGetResult(cmd, params)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>ஒரு முடிவைத் திருப்பித் தரும் கட்டளையின் பெயர் (எ.கா. [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>கட்டளைக்கான அளவுருக்கள். கட்டளைக்கு எந்த அளவுருக்களும் இல்லை என்றால், வெற்று பொருளைக் குறிப்பிடவும்.</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புவது

- **&lt;*&gt;**
            **<code><var>result</var></code>:** உங்கள் கட்டளையின் திரும்ப மதிப்பு, அல்லது உங்கள் கட்டளை தோல்வியடைந்ததற்கான காரணமாக இருந்த பிழை.


---

## file
உலாவி இயங்கும் தொலை இயந்திரத்திற்கு ஒரு கோப்பைப் பதிவேற்றவும்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065) காணலாம்.

##### பயன்பாடு

```js
browser.file(file)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>பதிவேற்றுவதற்கான __ஒற்றை__ கோப்பைக் கொண்ட base64-குறியாக்கப்பட்ட ஜிப் காப்பகம். base64-குறியாக்கப்பட்ட தரவு ஒரு ஜிப் காப்பகத்தைக் குறிக்கவில்லை அல்லது காப்பகத்தில் ஒன்றுக்கு மேற்பட்ட கோப்புகள் இருந்தால், அது தெரியாத பிழையை எறியும்.</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புவது

- **&lt;String&gt;**
            **<code><var>path</var></code>:** தொலை இயந்திரத்தில் பதிவேற்றப்பட்ட கோப்பின் முழுமையான பாதை.


---

## launchChromeApp
குறிப்பிட்ட ஐடி மூலம் ஒரு Chrome பயன்பாட்டைத் தொடங்குகிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539) காணலாம்.

##### பயன்பாடு

```js
browser.launchChromeApp(id)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>தொடங்கப்பட வேண்டிய பயன்பாட்டின் நீட்டிப்பு ஐடி, chrome://extensions இல் வரையறுக்கப்பட்டுள்ளபடி.</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Install upon starting browser in order to launch it
            extensions: [
              // Entry should be a base64-encoded packed Chrome app (.crx)
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google Docs (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
கொடுக்கப்பட்ட படிவக் கட்டுப்பாட்டு உறுப்பின் மதிப்பைப் பெறுகிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443) காணலாம்.

##### பயன்பாடு

```js
browser.getElementValue(elementId)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>மதிப்பைப் பெற வேண்டிய உறுப்பின் ஐடி</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புவது

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** உறுப்பின் தற்போதைய மதிப்பு. குறிப்பிட்ட உறுப்பு ஒரு படிவக் கட்டுப்பாட்டு உறுப்பாக இல்லை என்றால், அது `null` ஐத் திரும்பத் தரும்.


---

## elementHover
அடுத்த தொடர்புக்குப் பிறகு மீட்டமைக்கப்படும் ஒரு உறுப்புக்கு hover நிலையை இயக்கவும்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146) காணலாம்.

##### பயன்பாடு

```js
browser.elementHover(elementId)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>hover வேண்டிய உறுப்பின் ஐடி</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
ஒரு pinch zoom விளைவைத் தூண்டு.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827) காணலாம்.

##### பயன்பாடு

```js
browser.touchPinch(x, y, scale)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>pinch செய்ய வேண்டிய x நிலை</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>pinch செய்ய வேண்டிய y நிலை</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>pinch zoom அளவு</td>
    </tr>
  </tbody>
</table>



---

## freeze
தற்போதைய பக்கத்தை உறைய வைக்கவும். [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api) க்கான நீட்டிப்பு.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633) காணலாம்.

##### பயன்பாடு

```js
browser.freeze()
```



---

## resume
தற்போதைய பக்கத்தை மீண்டும் தொடரவும். [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api) க்கான நீட்டிப்பு.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645) காணலாம்.

##### பயன்பாடு

```js
browser.resume()
```



---

## getCastSinks
Chrome மீடியா ரூட்டருக்குக் கிடைக்கக்கூடிய காஸ்ட் சிங்க்களின் (காஸ்ட் சாதனங்கள்) பட்டியலைத் திருப்பித் தருகிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748) காணலாம்.

##### பயன்பாடு

```js
browser.getCastSinks()
```


##### திருப்பி அனுப்புவது

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** கிடைக்கக்கூடிய சிங்க்களின் பட்டியல்.


---

## selectCastSink
மீடியா ரூட்டர் நோக்கங்களின் (இணைக்க அல்லது இயக்க) பெறுநராக ஒரு காஸ்ட் சிங்கை (காஸ்ட் சாதனம்) தேர்ந்தெடுக்கிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737) காணலாம்.

##### பயன்பாடு

```js
browser.selectCastSink(sinkName)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>இலக்கு சாதனத்தின் பெயர்.</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
குறிப்பிட்ட சாதனத்தில் தற்போதைய உலாவி தாவலுக்கான தாவல் மிரரிங்கைத் தொடங்குகிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741) காணலாம்.

##### பயன்பாடு

```js
browser.startCastTabMirroring(sinkName)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>இலக்கு சாதனத்தின் பெயர்.</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
Cast அமர்வில் ஏதேனும் சிக்கல் இருந்தால் பிழை செய்தியைத் திருப்பித் தருகிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751) காணலாம்.

##### பயன்பாடு

```js
browser.getCastIssueMessage()
```


##### திருப்பி அனுப்புவது

- **&lt;String&gt;**
            **<code><var>message</var></code>:** பிழை செய்தி, ஏதேனும் இருந்தால்.


---

## stopCasting
இணைக்கப்பட்டிருந்தால், குறிப்பிட்ட சாதனத்திற்கு மீடியா ரூட்டரிலிருந்து காஸ்டிங் செய்வதை நிறுத்துகிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744) காணலாம்.

##### பயன்பாடு

```js
browser.stopCasting(sinkName)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>இலக்கு சாதனத்தின் பெயர்.</td>
    </tr>
  </tbody>
</table>



---

## shutdown
ChromeDriver செயல்முறையை முடித்து, அதன் விளைவாக அனைத்து செயலில் உள்ள அமர்வுகளையும் முடிக்கவும்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498) காணலாம்.

##### பயன்பாடு

```js
browser.shutdown()
```



---

## takeElementScreenshot
Take Element Screenshot கட்டளை ஒரு உறுப்பின் வரம்புப் பெட்டியால் அடங்கிய தெரியக்கூடிய பகுதியின் ஸ்கிரீன்ஷாட்டை எடுக்கிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://w3c.github.io/webdriver/#dfn-take-element-screenshot) காணலாம்.

##### பயன்பாடு

```js
browser.takeElementScreenshot(elementId, scroll)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>Find Element(s) இன் முந்தைய அழைப்பில் திருப்பிய உறுப்பின் ஐடி</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>உறுப்பை பார்வையில் ஸ்க்ரோல் செய்யவும். இயல்புநிலை: true</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புவது

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** பார்வையில் ஸ்க்ரோல் செய்த பிறகு, ஒரு உறுப்பின் வரம்புப் பெட்டியின் தெரியக்கூடிய பகுதியின் ஸ்கிரீன்ஷாட்டை உள்ளடக்கிய base64-குறியாக்கப்பட்ட PNG பட தரவு.


---

## getLogTypes
கிடைக்கக்கூடிய பதிவு வகைகளைப் பெறுங்கள்.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes) காணலாம்.

##### பயன்பாடு

```js
browser.getLogTypes()
```


##### திருப்பி அனுப்புவது

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** கிடைக்கக்கூடிய பதிவு வகைகளின் பட்டியல், உதாரணம்: browser, driver.


---

## getLogs
கொடுக்கப்பட்ட பதிவு வகைக்கான பதிவைப் பெறுங்கள். ஒவ்வொரு கோரிக்கைக்குப் பிறகும் பதிவு பஃபர் மீட்டமைக்கப்படுகிறது.<br /><br />அதிகாரபூர்வமற்ற மற்றும் ஆவணப்படுத்தப்படாத குரோமியம் கட்டளை. இந்த கட்டளை பற்றி மேலும் [இங்கே](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog) காணலாம்.

##### பயன்பாடு

```js
browser.getLogs(type)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>பதிவு வகை</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புவது

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** பதிவு உள்ளீடுகளின் பட்டியல்.

