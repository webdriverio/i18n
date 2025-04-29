---
id: wdio-wiremock-service
title: वायरमॉक सर्विस
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-service एक थर्ड पार्टी पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


यह सेवा आपको [WebdriverIO](https://webdriver.io) के साथ परीक्षण चलाते समय [WireMock](http://wiremock.org/) को निर्बाध रूप से चलाने में मदद करती है। यह सुप्रसिद्ध [Maven](https://mvnrepository.com/repos/central) रिपॉजिटरी का उपयोग करके आपके लिए WireMock jar डाउनलोड करती है जो फिर स्वचालित रूप से इंस्टॉल, शुरू और बंद हो जाती है। सहायता और समर्थन के लिए [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) पर समुदाय में शामिल होकर अपडेट रहें।

## इंस्टालेशन

```bash
npm i -D wdio-wiremock-service
```

`WebdriverIO` कैसे इंस्टॉल करें, इस पर निर्देश [यहाँ](https://webdriver.io/docs/gettingstarted.html) मिल सकते हैं।

## उपयोग

रूट डायरेक्टरी (डिफ़ॉल्ट `./mock`) में आपको दो उप-डायरेक्टरी मिलेंगी, `__files` और `mappings` जिनका उपयोग आपके फिक्स्चर्स और मॉक्स के लिए किया जाता है।

अधिक जानकारी के लिए, [WireMock के आधिकारिक दस्तावेज़](https://wiremock.org/docs/standalone/) देखें।

## कॉन्फ़िगरेशन

wdio टेस्टरनर के साथ सेवा का उपयोग करने के लिए आपको इसे अपनी सेवा सरणी में जोड़ना होगा:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

webdriverio स्टैंडअलोन का उपयोग करते समय आपको सेवा को जोड़ने और `onPrepare` और `onComplete` हुक को मैन्युअल रूप से ट्रिगर करने की आवश्यकता होती है। एक उदाहरण [यहाँ](####webdriverio-standalone) मिल सकता है (उदाहरण [Jest](https://jestjs.io/en/) का उपयोग करता है):

## विकल्प

निम्नलिखित विकल्प सेवा में जोड़े जा सकते हैं।

### port

वह पोर्ट जहां WireMock को चलना चाहिए।

प्रकार: `Number`

डिफ़ॉल्ट: `8080`

उदाहरण:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

वह पथ जहां WireMock फ़ाइलों को देखेगा।

प्रकार: `String`

डिफ़ॉल्ट: `./mock`

उदाहरण:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

WireMock का वर्जन जो डाउनलोड और उपयोग किया जाएगा।

प्रकार: `String`

डिफ़ॉल्ट: `3.3.1`

उदाहरण:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

सेवा को WireMock डाउनलोड करने को छोड़ने के लिए बताएं।

प्रकार: `Boolean`

डिफ़ॉल्ट: false

उदाहरण:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

स्थानीय Wiremock बाइनरी के लिए कस्टम पथ (अक्सर skipWiremockInstall के साथ उपयोग किया जाता है)।

प्रकार: `String`

डिफ़ॉल्ट: './wiremock-standalone-3.0.0.jar' (सेवा से सापेक्ष)

उदाहरण:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

WireMock के आउटपुट के लिए साइलेंट मोड (सेवा से अतिरिक्त लॉगिंग सहित)।

प्रकार: `Boolean`

डिफ़ॉल्ट: `false`

उदाहरण:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

Maven के लिए बेस डाउनलोड url।

प्रकार: `String`

डिफ़ॉल्ट: `https://repo1.maven.org/maven2`

उदाहरण:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

सूची जहां आप WireMock के कॉन्फ़िगर करने के लिए सभी समर्थित तर्क पास कर सकते हैं

नोट: आप यहां विकल्प (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) पास नहीं कर सकते क्योंकि उन्हें नजरअंदाज कर दिया जाएगा।

प्रकार: `Array`

उदाहरण:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [
		[
			'wiremock',
			{
				args: ['--verbose', '--match-headers'],
			},
		],
	],
	// ...
};
```

### परीक्षण लिखना

अपना पहला परीक्षण लिखना वास्तव में सीधा है:

#### WDIO टेस्टरनर का उपयोग करना

```js
import fetch from 'node-fetch'; // you can use any HTTP client you like
import { equal } from 'node:assert'; // you can use any assertion library you like

describe('example', () => {
	it(`should assert the mock data`, async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

#### WebdriverIO स्टैंडअलोन का उपयोग करना

```js
import fetch from 'node-fetch'; // you can use any HTTP client you like
import { equal } from 'node:assert'; // you can use any assertion library you like
import { remote } from 'webdriverio';
import { launcher } from 'wdio-wiremock-service';

const WDIO_OPTIONS = {
	capabilities: {
		browserName: 'chrome',
	},
};

describe('example', () => {
	let wiremockLauncher;
	let client;

	beforeAll(async () => {
		wiremockLauncher = new launcher(); // create instance of the service
		await wiremockLauncher.onPrepare(WDIO_OPTIONS); // run the onPrepare hook
		client = await remote(WDIO_OPTIONS);
	});

	afterAll(async () => {
		await client.deleteSession();
		await wiremockLauncher.onComplete(); // run the onComplete hook
	});

	test('should showoff a mocked api response', async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

WebdriverIO के बारे में अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।