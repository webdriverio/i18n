---
id: selenium
title: செலினியம் ஸ்டேண்டலோன்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
உலாவி இயங்கும் தொலைநிலை கணினிக்கு கோப்பை பதிவேற்றவும்.<br /><br />செலினியம் ஸ்டேண்டலோன் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.seleniumhq.org/) காணலாம்.

##### பயன்பாடு

```js
browser.file(file)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Base64-encoded zip archive containing __single__ file which to upload. In case base64-encoded data does not represent a zip archive or archive contains more than one file it will throw an unknown error.</td>
    </tr>
  </tbody>
</table>


##### திரும்பும் மதிப்பு

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Absolute path of uploaded file on remote machine.


---

## getDownloadableFiles
தொலைநிலை கணினியிலிருந்து பதிவிறக்கத்திற்கு கிடைக்கக்கூடிய கோப்புகளை பட்டியலிடவும்.<br /><br />செலினியம் ஸ்டேண்டலோன் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.seleniumhq.org/) காணலாம்.

##### பயன்பாடு

```js
browser.getDownloadableFiles()
```


##### திரும்பும் மதிப்பு

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Object containing a list of downloadable files on remote machine.


---

## download
உலாவி இயங்கும் தொலைநிலை கணினியிலிருந்து கோப்பை பதிவிறக்கவும்.<br /><br />செலினியம் ஸ்டேண்டலோன் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.seleniumhq.org/) காணலாம்.

##### பயன்பாடு

```js
browser.download(name)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Name of the file to be downloaded</td>
    </tr>
  </tbody>
</table>


##### திரும்பும் மதிப்பு

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Object containing downloaded file name and its content


---

## deleteDownloadableFiles
உலாவி இயங்கும் தொலைநிலை கணினியிலிருந்து அனைத்து பதிவிறக்கக்கூடிய கோப்புகளையும் அகற்றவும்.<br /><br />செலினியம் ஸ்டேண்டலோன் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.seleniumhq.org/) காணலாம்.

##### பயன்பாடு

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
தொலைநிலையில் ஹப் உள்ளமைவைப் பெறவும்.<br /><br />செலினியம் ஸ்டேண்டலோன் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/nicegraham/selenium-grid2-api#gridapihub) காணலாம்.

##### பயன்பாடு

```js
browser.getHubConfig()
```


##### திரும்பும் மதிப்பு

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Returns the hub config with slotCount, timeouts and other information.


---

## gridTestSession
அமர்வை இயக்கும் செலினியம் கிரிட் நோடின் விவரங்களைப் பெறவும்.<br /><br />செலினியம் ஸ்டேண்டலோன் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession) காணலாம்.

##### பயன்பாடு

```js
browser.gridTestSession(session)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>The id of the session to receive hub details for.</td>
    </tr>
  </tbody>
</table>


##### திரும்பும் மதிப்பு

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Object containing information about session details.


---

## gridProxyDetails
பிராக்ஸி விவரங்களைப் பெறவும்.<br /><br />செலினியம் ஸ்டேண்டலோன் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy) காணலாம்.

##### பயன்பாடு

```js
browser.gridProxyDetails(id)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>the id of the proxy (can be received using gridTestSession command).</td>
    </tr>
  </tbody>
</table>


##### திரும்பும் மதிப்பு

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Object containing information about proxy.


---

## manageSeleniumHubLifecycle
ஹப் நோடின் வாழ்க்கைச் சுழற்சியை நிர்வகிக்கவும்.<br /><br />செலினியம் ஸ்டேண்டலோன் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager) காணலாம்.

##### பயன்பாடு

```js
browser.manageSeleniumHubLifecycle(action)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>Command to call on Selenium Hub. The only implemented action is to 'shutdown' the hub.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
தரவைப் பெற செலினியம் (ஹப் அல்லது நோட்) சர்வருக்கு GraphQL வினவல்களை அனுப்பவும். (செலினியம் v4 சர்வருடன் மட்டுமே ஆதரிக்கப்படுகிறது)<br /><br />செலினியம் ஸ்டேண்டலோன் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/) காணலாம்.

##### பயன்பாடு

```js
browser.queryGrid(query)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>A GraphQL query to be send to the server.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு


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


##### திரும்பும் மதிப்பு

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Result of the GraphQL query.