---
id: selenium
title: सेलेनियम स्टैंडअलोन
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
रिमोट मशीन पर एक फाइल अपलोड करें जिस पर ब्राउज़र चल रहा है।<br /><br />सेलेनियम स्टैंडअलोन कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल डॉक्स](https://www.seleniumhq.org/) में पाया जा सकता है।

##### उपयोग

```js
browser.file(file)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Base64-एनकोडेड ज़िप आर्काइव जिसमें __एकल__ फ़ाइल शामिल है जिसे अपलोड करना है। यदि base64-एनकोडेड डेटा ज़िप आर्काइव का प्रतिनिधित्व नहीं करता है या आर्काइव में एक से अधिक फ़ाइल है तो यह एक अज्ञात त्रुटि फेंकेगा।</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;String&gt;**
            **<code><var>path</var></code>:** रिमोट मशीन पर अपलोड की गई फ़ाइल का संपूर्ण पथ।


---

## getDownloadableFiles
डाउनलोड के लिए उपलब्ध रिमोट मशीन से फाइलों की सूची।<br /><br />सेलेनियम स्टैंडअलोन कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल डॉक्स](https://www.seleniumhq.org/) में पाया जा सकता है।

##### उपयोग

```js
browser.getDownloadableFiles()
```


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** रिमोट मशीन पर डाउनलोड करने योग्य फाइलों की सूची वाला ऑब्जेक्ट।


---

## download
रिमोट मशीन से एक फाइल डाउनलोड करें जिस पर ब्राउज़र चल रहा है।<br /><br />सेलेनियम स्टैंडअलोन कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल डॉक्स](https://www.seleniumhq.org/) में पाया जा सकता है।

##### उपयोग

```js
browser.download(name)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>डाउनलोड की जाने वाली फ़ाइल का नाम</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** डाउनलोड की गई फ़ाइल का नाम और उसकी सामग्री वाला ऑब्जेक्ट


---

## deleteDownloadableFiles
रिमोट मशीन से सभी डाउनलोड करने योग्य फाइलों को हटाएं जिस पर ब्राउज़र चल रहा है।<br /><br />सेलेनियम स्टैंडअलोन कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल डॉक्स](https://www.seleniumhq.org/) में पाया जा सकता है।

##### उपयोग

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
रिमोट रूप से हब कॉन्फिग प्राप्त करें।<br /><br />सेलेनियम स्टैंडअलोन कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल डॉक्स](https://github.com/nicegraham/selenium-grid2-api#gridapihub) में पाया जा सकता है।

##### उपयोग

```js
browser.getHubConfig()
```


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** स्लॉट काउंट, टाइमआउट और अन्य जानकारी के साथ हब कॉन्फिग वापस करता है।


---

## gridTestSession
सत्र चलाने वाले सेलेनियम ग्रिड नोड का विवरण प्राप्त करें।<br /><br />सेलेनियम स्टैंडअलोन कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल डॉक्स](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession) में पाया जा सकता है।

##### उपयोग

```js
browser.gridTestSession(session)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>हब विवरण प्राप्त करने के लिए सत्र की आईडी।</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** सत्र विवरण के बारे में जानकारी वाला ऑब्जेक्ट।


---

## gridProxyDetails
प्रॉक्सी विवरण प्राप्त करें।<br /><br />सेलेनियम स्टैंडअलोन कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल डॉक्स](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy) में पाया जा सकता है।

##### उपयोग

```js
browser.gridProxyDetails(id)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>प्रॉक्सी की आईडी (gridTestSession कमांड का उपयोग करके प्राप्त की जा सकती है)।</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** प्रॉक्सी के बारे में जानकारी वाला ऑब्जेक्ट।


---

## manageSeleniumHubLifecycle
हब नोड के जीवनचक्र का प्रबंधन करें।<br /><br />सेलेनियम स्टैंडअलोन कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल डॉक्स](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager) में पाया जा सकता है।

##### उपयोग

```js
browser.manageSeleniumHubLifecycle(action)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>सेलेनियम हब पर कॉल करने के लिए कमांड। एकमात्र कार्यान्वित क्रिया हब को 'shutdown' करना है।</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
सेलेनियम (हब या नोड) सर्वर को डेटा प्राप्त करने के लिए GraphQL क्वेरी भेजें। (केवल सेलेनियम v4 सर्वर के साथ समर्थित)<br /><br />सेलेनियम स्टैंडअलोन कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल डॉक्स](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/) में पाया जा सकता है।

##### उपयोग

```js
browser.queryGrid(query)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>सर्वर को भेजी जाने वाली GraphQL क्वेरी।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
const result = await browser.queryGrid('{ nodesInfo { nodes { status, uri } } }');
console.log(JSON.stringify(result, null, 4))
/**
 * outputs:
 * {
 *   "data": {
 *     "nodesInfo": {
 *       "nodes": [{
 *         "status": "UP",
 *         "uri": "http://192.168.0.39:4444"
 *       }]
 *     }
 *   }
 * }
 */
```


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** GraphQL क्वेरी का परिणाम।