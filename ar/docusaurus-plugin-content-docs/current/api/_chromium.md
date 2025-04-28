---
id: chromium
title: كروميوم
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
ما إذا كان هناك حوار بسيط مفتوح حاليًا.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49).

##### الاستخدام

```js
browser.isAlertOpen()
```

##### مثال


```js
console.log(browser.isAlertOpen()); // outputs: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // outputs: true
```


##### العائد

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** `true` أو `false` بناءً على ما إذا كان هناك حوار بسيط موجود أم لا.


---

## isAutoReporting
ما إذا كان يجب تلقائيًا رفع أخطاء على سجلات المتصفح.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://codereview.chromium.org/101203012).

##### الاستخدام

```js
browser.isAutoReporting()
```


##### العائد

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** `true` أو `false` بناءً على ما إذا كان الإبلاغ التلقائي ممكّنًا.


---

## setAutoReporting
تبديل ما إذا كان سيتم إرجاع استجابة مع خطأ غير معروف مع أول خطأ في المتصفح (على سبيل المثال، فشل في تحميل المورد بسبب استجابة 403/404) لجميع الأوامر اللاحقة (بمجرد تمكينها).<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://codereview.chromium.org/101203012).

##### الاستخدام

```js
browser.setAutoReporting(enabled)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>`true` إذا كان يجب تمكين الإبلاغ التلقائي، استخدم `false` لتعطيل الإبلاغ التلقائي الممكّن مسبقًا.</td>
    </tr>
  </tbody>
</table>

##### أمثلة


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


##### العائد

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** في حالة حدوث خطأ أول في المتصفح قبل تنفيذ هذا الأمر، سيتم إلقاء خطأ غير معروف كاستجابة، وهو كائن به مفتاح 'message' يصف أول خطأ في المتصفح. وإلا فإنه يعيد `null` في حالة النجاح.


---

## isLoading
يحدد حالة التحميل لمقبض النافذة النشط.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802).

##### الاستخدام

```js
browser.isLoading()
```

##### مثال


```js
console.log(browser.isLoading()); // outputs: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // outputs: true
```


##### العائد

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** `true` أو `false` بناءً على ما إذا كان مقبض النافذة النشط قيد التحميل أم لا.


---

## takeHeapSnapshot
يأخذ لقطة للكومة من سياق التنفيذ الحالي.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202).

##### الاستخدام

```js
browser.takeHeapSnapshot()
```


##### العائد

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** تمثيل JSON للقطة الكومة. والتي يمكن فحصها عن طريق تحميلها كملف في أدوات تطوير Chrome.


---

## getNetworkConnection
الحصول على نوع الاتصال لمحاكاة الشبكة. هذا الأمر ينطبق فقط عندما يرد الطرف البعيد بإمكانية `networkConnectionEnabled` المعينة على `true`.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### الاستخدام

```js
browser.getNetworkConnection()
```

##### مثال


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


##### العائد

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** قناع بت لتمثيل نوع اتصال الشبكة. وضع الطائرة (`1`)، Wi-Fi فقط (`2`)، Wi-Fi والبيانات (`6`)، 4G (`8`)، 3G (`10`)، 2G (`20`). بشكل افتراضي، [Wi-Fi والبيانات ممكنان](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37).


---

## setNetworkConnection
تغيير نوع الاتصال لاتصال الشبكة. هذا الأمر ينطبق فقط عندما يرد الطرف البعيد بإمكانية `networkConnectionEnabled` المعينة على `true`.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### الاستخدام

```js
browser.setNetworkConnection(parameters)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>كائن يحتوي على ConnectionType، عيّن قناع البت كقيمة لمفتاح `type` في الكائن. وضع الطائرة (`1`)، Wi-Fi فقط (`2`)، Wi-Fi والبيانات (`6`)، 4G (`8`)، 3G (`10`)، 2G (`20`).</td>
    </tr>
  </tbody>
</table>

##### مثال


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


##### العائد

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** قناع بت لتمثيل نوع اتصال الشبكة. يجب أن تتطابق القيمة مع `type` المحدد في الكائن، ومع ذلك قد لا يكون الجهاز قادرًا على نوع اتصال الشبكة المطلوب.


---

## getNetworkConditions
الحصول على ظروف الشبكة الحالية المستخدمة للمحاكاة.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859).

##### الاستخدام

```js
browser.getNetworkConditions()
```


##### العائد

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** كائن يحتوي على ظروف الشبكة لـ `offline`، و`latency`، و`download_throughput` و`upload_throughput`. يجب تعيين ظروف الشبكة قبل أن يمكن استردادها.


---

## setNetworkConditions
تعيين ظروف الشبكة المستخدمة للمحاكاة عن طريق خنق الاتصال.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722).

##### الاستخدام

```js
browser.setNetworkConditions(network_conditions, network_name)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>كائن يحتوي على ظروف الشبكة وهي `latency`، و`throughput` (أو `download_throughput`/`upload_throughput`) و`offline` (اختياري).</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اسم [إعداد مسبق لخنق الشبكة](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25). `GPRS`، أو `Regular 2G`، أو `Good 2G`، أو `Regular 3G`، أو `Good 3G`، أو `Regular 4G`، أو `DSL`، أو `WiFi` أو `No throttling` للتعطيل. عند تحديد الإعداد المسبق، لن يتم احترام القيم التي تم تمريرها في الوسيطة الأولى.</td>
    </tr>
  </tbody>
</table>

##### أمثلة


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
تعطيل أي خنق للشبكة قد يكون قد تم تعيينه. مكافئ لتعيين الإعداد المسبق `No throttling`.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745).

##### الاستخدام

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
إرسال أمر إلى المصحح DevTools.<br />للحصول على قائمة بالأوامر المتاحة ومعلماتها، راجع [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304).

##### الاستخدام

```js
browser.sendCommand(cmd, params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>اسم الأمر (مثل [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>معلمات الأمر. في حالة عدم وجود معلمات للأمر، حدد كائنًا فارغًا.</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
إرسال أمر إلى المصحح DevTools والانتظار للحصول على النتيجة.<br />للحصول على قائمة بالأوامر المتاحة ومعلماتها، راجع [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320).

##### الاستخدام

```js
browser.sendCommandAndGetResult(cmd, params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>اسم الأمر الذي يعيد نتيجة (مثل [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>معلمات الأمر. في حالة عدم وجود معلمات للأمر، حدد كائنًا فارغًا.</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;*&gt;**
            **<code><var>result</var></code>:** إما قيمة العودة لأمرك، أو الخطأ الذي كان سبب فشل أمرك.


---

## file
تحميل ملف إلى الجهاز البعيد الذي يعمل عليه المتصفح.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065).

##### الاستخدام

```js
browser.file(file)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>أرشيف zip مشفر بـ Base64 يحتوي على ملف __واحد__ للتحميل. في حالة أن البيانات المشفرة بـ base64 لا تمثل أرشيف zip أو أن الأرشيف يحتوي على أكثر من ملف واحد، سيتم إلقاء خطأ غير معروف.</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;String&gt;**
            **<code><var>path</var></code>:** المسار المطلق للملف الذي تم تحميله على الجهاز البعيد.


---

## launchChromeApp
يطلق تطبيق Chrome بواسطة المعرف المحدد.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539).

##### الاستخدام

```js
browser.launchChromeApp(id)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>معرف الامتداد للتطبيق المراد إطلاقه، كما هو محدد في chrome://extensions.</td>
    </tr>
  </tbody>
</table>

##### مثال


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
استرداد قيمة عنصر تحكم النموذج المعطى.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443).

##### الاستخدام

```js
browser.getElementValue(elementId)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف العنصر للحصول على القيمة منه</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** القيمة الحالية للعنصر. في حالة أن العنصر المحدد ليس عنصر تحكم نموذج، سيعيد `null`.


---

## elementHover
تمكين حالة التحويم للعنصر، والتي يتم إعادة تعيينها عند التفاعل التالي.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146).

##### الاستخدام

```js
browser.elementHover(elementId)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف العنصر للتحويم فوقه</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
تشغيل تأثير القرصة للتكبير/التصغير.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827).

##### الاستخدام

```js
browser.touchPinch(x, y, scale)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>موضع x للقرصة</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>موضع y للقرصة</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>مقياس القرصة للتكبير/التصغير</td>
    </tr>
  </tbody>
</table>



---

## freeze
تجميد الصفحة الحالية. امتداد لـ [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633).

##### الاستخدام

```js
browser.freeze()
```



---

## resume
استئناف الصفحة الحالية. امتداد لـ [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645).

##### الاستخدام

```js
browser.resume()
```



---

## getCastSinks
يعيد قائمة بأجهزة الاستقبال (أجهزة Cast) المتاحة لموجه وسائط Chrome.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748).

##### الاستخدام

```js
browser.getCastSinks()
```


##### العائد

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** قائمة بأجهزة الاستقبال المتاحة.


---

## selectCastSink
يحدد جهاز استقبال (جهاز Cast) كمستلم لنوايا موجه الوسائط (اتصال أو تشغيل).<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737).

##### الاستخدام

```js
browser.selectCastSink(sinkName)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>اسم الجهاز المستهدف.</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
يبدأ عكس تبويب المتصفح الحالي على الجهاز المحدد.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741).

##### الاستخدام

```js
browser.startCastTabMirroring(sinkName)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>اسم الجهاز المستهدف.</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
يعيد رسالة خطأ إذا كانت هناك أي مشكلة في جلسة Cast.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751).

##### الاستخدام

```js
browser.getCastIssueMessage()
```


##### العائد

- **&lt;String&gt;**
            **<code><var>message</var></code>:** رسالة الخطأ، إن وجدت.


---

## stopCasting
إيقاف البث من موجه الوسائط إلى الجهاز المحدد، إذا كان متصلاً.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744).

##### الاستخدام

```js
browser.stopCasting(sinkName)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>اسم الجهاز المستهدف.</td>
    </tr>
  </tbody>
</table>



---

## shutdown
إيقاف عملية ChromeDriver وبالتالي إنهاء جميع الجلسات النشطة.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498).

##### الاستخدام

```js
browser.shutdown()
```



---

## takeElementScreenshot
يأخذ أمر Take Element Screenshot لقطة شاشة للمنطقة المرئية التي يشملها المستطيل المحيط بعنصر.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

##### الاستخدام

```js
browser.takeElementScreenshot(elementId, scroll)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>التمرير لعرض العنصر. الافتراضي: true</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** بيانات صورة PNG المشفرة بـ base64 التي تشكل لقطة الشاشة للمنطقة المرئية من المستطيل المحيط بالعنصر بعد أن تم التمرير لعرضه.


---

## getLogTypes
الحصول على أنواع السجلات المتاحة.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes).

##### الاستخدام

```js
browser.getLogTypes()
```


##### العائد

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** قائمة بأنواع السجلات المتاحة، مثال: browser، driver.


---

## getLogs
الحصول على السجل لنوع سجل معين. يتم إعادة تعيين مخزن السجل بعد كل طلب.<br /><br />أمر كروميوم غير رسمي وغير موثق. يمكن العثور على المزيد حول هذا الأمر [هنا](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog).

##### الاستخدام

```js
browser.getLogs(type)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>نوع السجل</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** قائمة بإدخالات السجل.

