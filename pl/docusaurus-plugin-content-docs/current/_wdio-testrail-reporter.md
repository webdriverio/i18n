---
id: wdio-testrail-reporter
title: Testrail Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter jest pakietem zewnętrznym, aby uzyskać więcej informacji, odwiedź [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

Ten reporter tworzy raporty TestRail. Pierwszą rzeczą, którą musisz zrobić, to włączyć API TestRail, aby raport mógł komunikować się z TestRail i przesyłać wyniki testów. Aby to zrobić, zaloguj się na swoje konto TestRail i przejdź do Administracja > Ustawienia witryny > API i upewnij się, że zaznaczyłeś pole wyboru przy Włącz API.

Dodaj identyfikator przypadku testowego TestRail do opisu testu. np.
```javascript
it("C123456 Page loads correctly", async () => {
```
Obsługuje to również wiele identyfikatorów przypadków. np.
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## Instalacja

Aby korzystać z reportera, dodaj go do swojego pliku `package.json`:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## Użycie

Dodaj reporter do swojego pliku konfiguracyjnego WDIO.

Przykład, gdy chcesz utworzyć nowy przebieg testowy:

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

Przykład, gdy chcesz zaktualizować istniejący przebieg testowy:

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

Przykład, gdy potrzebujesz różnych identyfikatorów projektów i/lub pakietów w zależności od zestawu testów do wykonania:

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


## Opcje

### `projectId`

ID projektu testrail.

Typ: `string`

### `suiteId`

ID pakietu, pakiet 1 jest domyślny.

Typ: `string`

### `domain`

Domena Twojej instancji testrail, np. `your-domain.testrail.io`.

Typ: `string`

### `username`

Nazwa użytkownika Twojej instancji testrail.

Typ: `string`

### `apiToken`

Token API Twojej instancji testrail.

Typ: `string`

### `runName`

Niestandardowa nazwa dla przebiegu testowego.

Typ: `string`

### `existingRunId`

Id istniejącego przebiegu testowego do aktualizacji.

Typ: `string`

### `oneReport`

Utwórz pojedynczy przebieg testowy.

Typ: `boolean`

### `includeAll`

Dołącz wszystkie testy w pakiecie do przebiegu testowego.

Typ: `boolean`

### `caseIdTagPrefix`

Prefiks używany do lokalizacji identyfikatora przypadku w tagach Cucumber, przydatny dla wieloplatformowych wykonań scenariuszy Cucumber

Typ: `string`

### `useCucumber`

Wskazuje, czy testy są napisane przy użyciu frameworka Cucumber. Domyślnie ustawione na `false`.

Typ: `boolean`

---

Aby uzyskać więcej informacji o WebdriverIO, odwiedź [stronę główną](https://webdriver.io).