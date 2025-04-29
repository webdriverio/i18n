---
id: wdio-wiremock-service
title: வயர்மாக் சேவை
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-service என்பது ஒரு மூன்றாம் தரப்பு பேக்கேஜ், மேலும் தகவலுக்கு தயவுசெய்து [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service) ஐப் பார்க்கவும்

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


இந்த சேவை [WebdriverIO](https://webdriver.io) உடன் சோதனைகளை இயக்கும்போது [WireMock](http://wiremock.org/) ஐ எளிமையாக இயக்க உதவுகிறது. இது நன்கு அறியப்பட்ட [Maven](https://mvnrepository.com/repos/central) களஞ்சியத்தைப் பயன்படுத்தி WireMock jar ஐ உங்களுக்காகப் பதிவிறக்குகிறது, இது பின்னர் தானாகவே நிறுவப்பட்டு, தொடங்கப்பட்டு மற்றும் நிறுத்தப்படுகிறது. உதவி மற்றும் ஆதரவுக்காக [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) இல் சமூகத்தில் சேர்வதன் மூலம் புதுப்பிப்புகளைப் பெறுங்கள்.

## நிறுவல்

```bash
npm i -D wdio-wiremock-service
```

`WebdriverIO` ஐ எவ்வாறு நிறுவுவது என்பதற்கான அறிவுறுத்தல்கள் [இங்கே](https://webdriver.io/docs/gettingstarted.html) காணலாம்.

## பயன்பாடு

ரூட் டைரக்டரியில் (இயல்புநிலை `./mock`), நீங்கள் இரண்டு துணை டைரக்டரிகளைக் காணலாம், `__files` மற்றும் `mappings`, இவை உங்கள் fixtures மற்றும் mocks க்குப் பயன்படுகின்றன.

மேலும் தகவலுக்கு, [WireMock இன் அதிகாரப்பூர்வ ஆவணத்தைப்](https://wiremock.org/docs/standalone/) பார்க்கவும்.

## கட்டமைப்பு

wdio டெஸ்ட்ரன்னருடன் சேவையைப் பயன்படுத்த, உங்கள் சேவை அரேயில் அதைச் சேர்க்க வேண்டும்:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

webdriverio standalone ஐப் பயன்படுத்தும்போது, சேவையைச் சேர்க்க வேண்டும் மற்றும் `onPrepare` மற்றும் `onComplete` hooks ஐ கைமுறையாக தூண்ட வேண்டும். ஒரு எடுத்துக்காட்டு [இங்கே](####webdriverio-standalone) காணலாம் (எடுத்துக்காட்டு [Jest](https://jestjs.io/en/) ஐப் பயன்படுத்துகிறது):

## விருப்பங்கள்

பின்வரும் விருப்பங்களை சேவைக்குச் சேர்க்கலாம்.

### port

WireMock இயங்க வேண்டிய போர்ட்.

வகை: `Number`

இயல்புநிலை: `8080`

எடுத்துக்காட்டு:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

WireMock கோப்புகளைத் தேடும் பாதை.

வகை: `String`

இயல்புநிலை: `./mock`

எடுத்துக்காட்டு:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

பதிவிறக்கப்பட்டு பயன்படுத்தப்படும் WireMock பதிப்பு.

வகை: `String`

இயல்புநிலை: `3.3.1`

எடுத்துக்காட்டு:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

WireMock ஐ பதிவிறக்குவதைத் தவிர்க்க சேவைக்குச் சொல்லுங்கள்.

வகை: `Boolean`

இயல்புநிலை: false

எடுத்துக்காட்டு:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

உள்ளூர் Wiremock binary க்கான தனிப்பயன் பாதை (பெரும்பாலும் skipWiremockInstall உடன் சேர்த்துப் பயன்படுத்தப்படுகிறது).

வகை: `String`

இயல்புநிலை: './wiremock-standalone-3.0.0.jar' (சேவையிலிருந்து தொடர்புடையது)

எடுத்துக்காட்டு:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

WireMock இன் வெளியீட்டிற்கான அமைதி முறை (சேவையிலிருந்து கூடுதல் பதிவு உட்பட).

வகை: `Boolean`

இயல்புநிலை: `false`

எடுத்துக்காட்டு:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

Maven க்கான அடிப்படை பதிவிறக்க url.

வகை: `String`

இயல்புநிலை: `https://repo1.maven.org/maven2`

எடுத்துக்காட்டு:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

WireMock ஐ கட்டமைப்பதற்கான அனைத்து ஆதரிக்கப்படும் அர்குமெண்ட்களையும் நீங்கள் அனுப்பக்கூடிய பட்டியல்

குறிப்பு: நீங்கள் விருப்பங்களை (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) இங்கே அனுப்ப முடியாது, அவை புறக்கணிக்கப்படும்.

வகை: `Array`

எடுத்துக்காட்டு:

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

### சோதனைகளை எழுதுதல்

உங்கள் முதல் சோதனையை எழுதுவது மிகவும் நேரடியானது:

#### WDIO டெஸ்ட்ரன்னரைப் பயன்படுத்துதல்

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

#### WebdriverIO Standalone ஐப் பயன்படுத்துதல்

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

WebdriverIO பற்றிய மேலும் தகவலுக்கு [முகப்புப் பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.