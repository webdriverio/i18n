---
id: security
title: Bezpieczeństwo
---

WebdriverIO ma na uwadze aspekt bezpieczeństwa przy dostarczaniu rozwiązań. Poniżej znajdują się sposoby na lepsze zabezpieczenie testów.

## Najlepsze praktyki

- Nigdy nie koduj na stałe poufnych danych, które mogą zaszkodzić Twojej organizacji, jeśli zostaną ujawnione w postaci zwykłego tekstu.
- Użyj mechanizmu (takiego jak vault) do bezpiecznego przechowywania kluczy i haseł oraz pobierania ich podczas uruchamiania testów end-to-end.
- Sprawdź, czy żadne poufne dane nie są ujawniane w logach i przez dostawcę chmury, takie jak tokeny uwierzytelniania w logach sieciowych.

:::info

Nawet w przypadku danych testowych ważne jest, aby zastanowić się, czy w niewłaściwych rękach złośliwa osoba mogłaby uzyskać informacje lub wykorzystać te zasoby w złych zamiarach.

:::

## Maskowanie poufnych danych

Jeśli używasz poufnych danych podczas testu, ważne jest, aby upewnić się, że nie są one widoczne dla wszystkich, na przykład w logach. Ponadto, podczas korzystania z dostawcy chmury często używane są klucze prywatne. Te informacje muszą być zamaskowane w logach, raportach i innych punktach kontaktowych. Poniżej przedstawiono kilka rozwiązań maskowania do uruchamiania testów bez ujawniania tych wartości.

### WebDriverIO

#### Maskowanie wartości tekstowej komend

Komendy `addValue` i `setValue` obsługują logiczną wartość mask, aby maskować w logach, a także w raportach. Ponadto inne narzędzia, takie jak narzędzia wydajnościowe i narzędzia innych firm, również otrzymają zamaskowaną wersję, zwiększając bezpieczeństwo.

Na przykład, jeśli używasz prawdziwego użytkownika produkcyjnego i musisz wprowadzić hasło, które chcesz zamaskować, to jest to możliwe w następujący sposób:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Powyższe ukryje wartość tekstową z logów WDIO w następujący sposób:

Przykład logów:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Reportery, takie jak Allure, oraz narzędzia innych firm, jak Percy od BrowserStack, również będą obsługiwać zamaskowaną wersję.
W połączeniu z odpowiednią wersją Appium, logi Appium również będą pozbawione poufnych danych.

:::info

Ograniczenia:
  - W Appium dodatkowe wtyczki mogą wyciekać dane, mimo że prosimy o zamaskowanie informacji.
  - Dostawcy chmury mogą używać proxy do logowania HTTP, które omija mechanizm maskowania.
  - Komenda `getValue` nie jest obsługiwana. Ponadto, jeśli zostanie użyta na tym samym elemencie, może ujawnić wartość, która miała być zamaskowana podczas używania `addValue` lub `setValue`.

Minimalne wymagane wersje:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Maskowanie w logach WDIO

Używając konfiguracji `maskingPatterns`, możemy maskować poufne informacje z logów WDIO. Jednak logi Appium nie są objęte.

Na przykład, jeśli używasz dostawcy chmury i używasz poziomu info, to najprawdopodobniej "wyciekniesz" klucz użytkownika, jak pokazano poniżej:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Aby temu zapobiec, możemy przekazać wyrażenie regularne `'--key=([^ ]*)'` i teraz w logach zobaczysz 

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Możesz osiągnąć powyższe, dostarczając wyrażenie regularne do pola `maskingPatterns` konfiguracji.
  - Dla wielu wyrażeń regularnych użyj pojedynczego ciągu, ale z wartościami oddzielonymi przecinkami.
  - Aby uzyskać więcej informacji na temat wzorców maskowania, zobacz [sekcję Masking Patterns w README Loggera WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

Minimalna wymagana wersja:
 - WDIO v9.15.0

:::

#### Wyłączanie loggerów WDIO

Innym sposobem zablokowania logowania poufnych danych jest obniżenie lub wyciszenie poziomu logowania lub wyłączenie loggera.
Można to osiągnąć w następujący sposób:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

### Rozwiązania firm trzecich

#### Appium
Appium oferuje własne rozwiązanie maskowania; zobacz [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Korzystanie z ich rozwiązania może być trudne. Jednym ze sposobów, jeśli to możliwe, jest przekazanie tokena w ciągu, takiego jak `@mask@` i użycie go jako wyrażenia regularnego
 - W niektórych wersjach Appium wartości są również logowane z każdym znakiem oddzielonym przecinkiem, więc musimy być ostrożni.
 - Niestety, BrowserStack nie obsługuje tego rozwiązania, ale jest ono nadal przydatne lokalnie
 
Używając przykładu `@mask@` wspomnianego wcześniej, możemy użyć następującego pliku JSON o nazwie `appiumMaskLogFilters.json`
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

Następnie przekaż nazwę pliku JSON do pola `logFilters` w konfiguracji usługi appium:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

#### BrowserStack

BrowserStack również oferuje pewien poziom maskowania, aby ukryć niektóre dane; zobacz [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Niestety, rozwiązanie jest typu "wszystko albo nic", więc wszystkie wartości tekstowe dostarczonych komend będą zamaskowane.