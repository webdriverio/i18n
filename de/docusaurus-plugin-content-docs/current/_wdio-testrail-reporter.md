---
id: wdio-testrail-reporter
title: Testrail Reporter Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

Dieser Reporter erstellt TestRail-Berichte. Zunächst müssen Sie die TestRail-API aktivieren, damit der Bericht mit TestRail kommunizieren und die Testergebnisse übertragen kann. Melden Sie sich dazu in Ihrem TestRail-Konto an und gehen Sie zu Administration > Site Settings > API und stellen Sie sicher, dass Sie das Kontrollkästchen neben Enable API aktivieren.

Fügen Sie die TestRail-Testfall-ID zur Testbeschreibung hinzu. z.B.
```javascript
it("C123456 Page loads correctly", async () => {
```
Dies unterstützt auch mehrere Fall-IDs. z.B.
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## Installation

Um den Reporter zu verwenden, fügen Sie ihn zu Ihrer `package.json` hinzu:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## Verwendung

Fügen Sie den Reporter zu Ihrer WDIO-Konfigurationsdatei hinzu.

Beispiel für die Erstellung eines neuen Testlaufs:

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

Beispiel für die Aktualisierung eines bestehenden Testlaufs:

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

Beispiel für den Fall, dass Sie unterschiedliche Projekt- und/oder Suite-IDs basierend auf der auszuführenden Testsuite benötigen:

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


## Optionen

### `projectId`

ID des TestRail-Projekts.

Typ: `string`

### `suiteId`

ID der Suite, Suite 1 ist Standard.

Typ: `string`

### `domain`

Domain Ihrer TestRail-Instanz, z.B. `your-domain.testrail.io`.

Typ: `string`

### `username`

Benutzername Ihrer TestRail-Instanz.

Typ: `string`

### `apiToken`

API-Token Ihrer TestRail-Instanz.

Typ: `string`

### `runName`

Benutzerdefinierter Name für den Testlauf.

Typ: `string`

### `existingRunId`

ID eines bestehenden Testlaufs, der aktualisiert werden soll.

Typ: `string`

### `oneReport`

Erstellt einen einzelnen Testlauf.

Typ: `boolean`

### `includeAll`

Alle Tests in der Suite in den Testlauf einbeziehen.

Typ: `boolean`

### `caseIdTagPrefix`

Präfix zur Lokalisierung der Fall-ID in Cucumber-Tags, nützlich für Ausführungen von Cucumber-Szenarien auf mehreren Plattformen.

Typ: `string`

### `useCucumber`

Gibt an, ob die Tests mit dem Cucumber-Framework geschrieben wurden. Standardmäßig ist es auf `false` gesetzt.

Typ: `boolean`

---

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).