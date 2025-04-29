---
id: wdio-testrail-reporter
title: Reporter Testrail
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---


> @wdio/testrail-reporter è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

Questo reporter crea report TestRail. La prima cosa necessaria è abilitare l'API TestRail in modo che il report possa comunicare con TestRail e inviare i risultati dei test. Per farlo, accedi al tuo account TestRail e vai su Administration > Site Settings > API e assicurati di selezionare la casella vicino a Enable API.

Aggiungi l'ID del caso di test di TestRail alla descrizione del test. es.
```javascript
it("C123456 Page loads correctly", async () => {
```
Questo supporta anche ID di casi multipli. es.
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## Installazione

Per utilizzare il reporter, aggiungilo al tuo `package.json`:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## Utilizzo

Aggiungi il reporter al tuo file di configurazione WDIO.

Esempio per quando vuoi creare una nuova esecuzione di test:

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

Esempio per quando vuoi aggiornare un'esecuzione di test esistente:

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

Esempio per quando hai bisogno di diversi ID di progetto e/o suite in base alla suite di test da eseguire:

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


## Opzioni

### `projectId`

ID del progetto testrail.

Tipo: `string`

### `suiteId`

ID della suite, la suite 1 è quella predefinita.

Tipo: `string`

### `domain`

Dominio della tua istanza testrail, es. `your-domain.testrail.io`.

Tipo: `string`

### `username`

Nome utente della tua istanza testrail.

Tipo: `string`

### `apiToken`

Token API della tua istanza testrail.

Tipo: `string`

### `runName`

Nome personalizzato per l'esecuzione del test.

Tipo: `string`

### `existingRunId`

ID di un'esecuzione di test esistente da aggiornare.

Tipo: `string`

### `oneReport`

Crea una singola esecuzione di test.

Tipo: `boolean`

### `includeAll`

Includi tutti i test nella suite nell'esecuzione del test.

Tipo: `boolean`

### `caseIdTagPrefix`

Prefisso utilizzato per individuare l'ID del caso nei tag Cucumber, utile per esecuzioni di Scenari Cucumber multi-piattaforma

Tipo: `string`

### `useCucumber`

Indica se i test sono scritti utilizzando il framework Cucumber. Di default, è impostato su `false`.

Tipo: `boolean`

---

Per maggiori informazioni su WebdriverIO consulta la [homepage](https://webdriver.io).