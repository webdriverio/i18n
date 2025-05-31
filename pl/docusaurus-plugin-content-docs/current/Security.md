---
id: security
title: Bezpieczeństwo
---

WebdriverIO ma na uwadze aspekt bezpieczeństwa podczas dostarczania rozwiązań. Poniżej przedstawiono kilka sposobów lepszego zabezpieczenia testów.

# Maskowanie wrażliwych danych

Jeśli używasz wrażliwych danych podczas testowania, istotne jest, aby upewnić się, że nie są one widoczne dla wszystkich, na przykład w logach. Ponadto, podczas korzystania z dostawcy usług w chmurze, często używane są klucze prywatne. Te informacje muszą być maskowane w logach, raportach i innych punktach styku. Poniżej przedstawiono kilka rozwiązań maskowania, aby uruchomić testy bez ujawniania tych wartości.

## WebDriverIO

### Maskowanie wartości tekstowych poleceń

Polecenia `addValue` i `setValue` obsługują maskowanie za pomocą wartości boolean, aby ukryć dane w logach WDIO i Appium, a także w raportach. Co więcej, inne narzędzia, takie jak narzędzia wydajności i narzędzia firm trzecich, również otrzymają zamaskowaną wersję, zwiększając bezpieczeństwo.

Na przykład, jeśli używasz prawdziwego użytkownika produkcyjnego i musisz wprowadzić hasło, które chcesz zamaskować, możesz to teraz zrobić w następujący sposób:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Powyższy kod ukryje wartość tekstową w logach WDIO, a także w logach Appium.

Przykład logów:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

Ograniczenia:
  - W Appium dodatkowe wtyczki mogą wyciekać informacje, mimo że prosimy o zamaskowanie informacji.
  - Dostawcy usług w chmurze mogą używać proxy do logowania HTTP, które omija mechanizm maskowania.

:::info

Minimalna wymagana wersja:
 - WDIO v9.15.0
 - Appium v2.19.0

### Maskowanie w logach WDIO

Korzystając z konfiguracji `maskingPatterns`, możemy maskować wrażliwe informacje w logach WDIO. Jednak logi Appium nie są objęte tą funkcją.

Na przykład, jeśli korzystasz z dostawcy usług w chmurze i używasz poziomu info, najprawdopodobniej "wyciekniesz" klucz użytkownika, jak pokazano poniżej:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Aby temu zapobiec, możemy przekazać wyrażenie regularne `'--key=([^ ]*)'` i teraz w logach zobaczysz:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Możesz osiągnąć powyższe, dostarczając wyrażenie regularne do pola `maskingPatterns` konfiguracji.
  - Dla wielu wyrażeń regularnych użyj pojedynczego ciągu, ale z wartościami oddzielonymi przecinkami.
  - Więcej informacji na temat wzorców maskowania znajdziesz w [sekcji Masking Patterns w README loggera WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

### Wyłączanie loggerów WDIO

Innym sposobem na zablokowanie logowania wrażliwych danych jest obniżenie lub wyciszenie poziomu logowania lub wyłączenie loggera.
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

## Rozwiązania firm trzecich

### Appium
Appium oferuje własne rozwiązanie maskowania; zobacz [Log filter](https://appium.io/docs/en/2.0/guides/log-filters/)
 - Korzystanie z ich rozwiązania może być trudne. Jednym ze sposobów, jeśli to możliwe, jest przekazanie tokenu w ciągu, takiego jak `@mask@` i użycie go jako wyrażenia regularnego
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

### BrowserStack

BrowserStack również oferuje pewien poziom maskowania w celu ukrycia danych; zobacz [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Niestety, rozwiązanie to jest typu "wszystko albo nic", więc wszystkie wartości tekstowe dostarczonych poleceń będą maskowane.