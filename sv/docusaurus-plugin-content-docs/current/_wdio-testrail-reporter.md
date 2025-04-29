---
id: wdio-testrail-reporter
title: Testrail Reporter Rapportör
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

Denna rapportör skapar TestRail-rapporter. Det första du behöver göra är att aktivera TestRail API så att rapporten kan kommunicera med TestRail och skicka testresultaten. För att göra detta, logga in på ditt TestRail-konto och gå till Administration > Site Settings > API och se till att du markerar kryssrutan vid Enable API.

Lägg till TestRails testfall-ID i testbeskrivningen. t.ex.
```javascript
it("C123456 Page loads correctly", async () => {
```
Detta stöder även flera caseIDs. t.ex.
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## Installera

För att använda rapportören, lägg till den i din `package.json`:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## Användning

Lägg till rapportören i din WDIO-konfigurationsfil.

Exempel för när du vill skapa en ny testkörning:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

Exempel för när du vill uppdatera en befintlig testkörning:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

Exempel för när du behöver olika projekt- och/eller suite-ID baserat på testsviten som ska köras:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## Alternativ

### `projectId`

ID för testrail-projektet.

Type: `string`

### `suiteId`

ID för sviten, svit 1 är standard.

Type: `string`

### `domain`

Domän för din testrail-instans, t.ex. `your-domain.testrail.io`.

Type: `string`

### `username`

Användarnamn för din testrail-instans.

Type: `string`

### `apiToken`

API-token för din testrail-instans.

Type: `string`

### `runName`

Anpassat namn för testkörningen.

Type: `string`

### `existingRunId`

Id för en befintlig testkörning att uppdatera.

Type: `string`

### `oneReport`

Skapa en enda testkörning.

Type: `boolean`

### `includeAll`

Inkludera alla tester i sviten i testkörningen.

Type: `boolean`

### `caseIdTagPrefix`

Prefix som används för att lokalisera case-ID i Cucumber-taggar, användbart för körningar av Cucumber-scenarier på flera plattformar.

Type: `string`

### `useCucumber`

Indikerar om testerna är skrivna med Cucumber-ramverket. Som standard är det inställt på `false`.

Type: `boolean`

---

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).