---
id: security
title: Bezpieczeństwo
description: "Chroń wrażliwe dane testowe, stosując najlepsze praktyki bezpieczeństwa i maskując hasła oraz klucze w logach i raportach."
---

WebdriverIO uwzględnia aspekt bezpieczeństwa podczas dostarczania rozwiązań. Poniżej przedstawiono kilka sposobów na lepsze zabezpieczenie testów.

## Najlepsze praktyki

- Nigdy nie umieszczaj na stałe w kodzie wrażliwych danych, które mogłyby zaszkodzić Twojej organizacji, gdyby zostały ujawnione w postaci jawnego tekstu.
- Używaj mechanizmu (takiego jak sejf, ang. vault) do bezpiecznego przechowywania kluczy i haseł oraz pobierania ich podczas uruchamiania testów end-to-end.
- Upewnij się, że żadne wrażliwe dane nie są ujawniane w logach ani przez dostawcę chmury, np. tokeny uwierzytelniające w logach sieciowych (Network Logs).

:::info

Nawet w przypadku danych testowych istotne jest zadanie sobie pytania, czy osoba o złych zamiarach mogłaby, gdyby dane trafiły w niepowołane ręce, uzyskać informacje lub wykorzystać te zasoby w złym celu.

:::

## Maskowanie wrażliwych danych

Jeśli podczas testu używasz wrażliwych danych, kluczowe jest zapewnienie, że nie są one widoczne dla wszystkich, np. w logach. Ponadto podczas korzystania z dostawcy chmury często wykorzystywane są klucze prywatne. Informacje te muszą być maskowane w logach, reporterach i innych punktach styku. Poniżej przedstawiono kilka rozwiązań maskujących, które pozwalają uruchamiać testy bez ujawniania tych wartości.

### WebDriverIO

#### Maskowanie wartości tekstowej poleceń

Polecenia `addValue` i `setValue` obsługują logiczną wartość `mask`, która pozwala maskować dane w logach, a także w reporterach. Co więcej, inne narzędzia, takie jak narzędzia do pomiaru wydajności i narzędzia firm trzecich, również otrzymają zamaskowaną wersję, co zwiększa bezpieczeństwo.

Na przykład, jeśli używasz prawdziwego użytkownika produkcyjnego i musisz wprowadzić hasło, które chcesz zamaskować, jest to teraz możliwe w następujący sposób:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Powyższy kod ukryje wartość tekstową w logach WDIO w następujący sposób:

Przykład logów:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Reportery, takie jak reportery Allure, oraz narzędzia firm trzecich, takie jak Percy od BrowserStack, również będą obsługiwać zamaskowaną wersję.
W połączeniu z odpowiednią wersją Appium również logi Appium nie będą zawierać Twoich wrażliwych danych.

:::info

Ograniczenia:
  - W Appium dodatkowe wtyczki mogą powodować wyciek danych, mimo że żądamy zamaskowania informacji.
  - Dostawcy chmury mogą używać proxy do logowania HTTP, co omija wdrożony mechanizm maskowania.
  - Polecenie `getValue` nie jest obsługiwane. Co więcej, jeśli zostanie użyte na tym samym elemencie, może ujawnić wartość, która miała zostać zamaskowana przy użyciu `addValue` lub `setValue`.

Minimalna wymagana wersja:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Maskowanie w logach WDIO

Za pomocą konfiguracji `maskingPatterns` możemy maskować wrażliwe informacje w logach WDIO. Nie obejmuje to jednak logów Appium.

Na przykład, jeśli korzystasz z dostawcy chmury i używasz poziomu info, to niemal na pewno dojdzie do „wycieku” klucza użytkownika, jak pokazano poniżej:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Aby temu przeciwdziałać, możemy przekazać wyrażenie regularne `'--key=([^ ]*)'`, a wtedy w logach zobaczysz

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Możesz osiągnąć powyższy efekt, podając wyrażenie regularne w polu `maskingPatterns` konfiguracji.
  - W przypadku wielu wyrażeń regularnych użyj pojedynczego ciągu znaków z wartościami oddzielonymi przecinkami.
  - Więcej szczegółów na temat wzorców maskowania znajdziesz w [sekcji Masking Patterns w README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

:::warning
W przypadku sekretów przekazywanych przez wiersz poleceń maskowanie może się nie powieść, ponieważ plik wdio.conf.ts jest parsowany później w cyklu wykonania. W takich przypadkach zdecydowanie zaleca się używanie zmiennych środowiskowych, co jest znacznie bezpieczniejsze.
:::

#### Wyłączanie loggerów WDIO

Innym sposobem na zablokowanie logowania wrażliwych danych jest obniżenie lub wyciszenie poziomu logowania albo wyłączenie loggera.
Można to osiągnąć w następujący sposób:

```ts
import logger from '@wdio/logger';

/**
  * Ustawia poziom loggera WDIO na 'silent' przed *uruchomieniem promise, co pomaga ukryć wrażliwe informacje w logach.
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
Appium oferuje własne rozwiązanie do maskowania; zobacz [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Korzystanie z ich rozwiązania może być kłopotliwe. Jednym ze sposobów, jeśli to możliwe, jest przekazanie w ciągu znaków tokenu, np. `@mask@`, i użycie go jako wyrażenia regularnego
 - W niektórych wersjach Appium wartości są również logowane z każdym znakiem oddzielonym przecinkiem, więc trzeba zachować ostrożność.
 - Niestety BrowserStack nie obsługuje tego rozwiązania, ale nadal jest ono przydatne lokalnie

Korzystając z wcześniej wspomnianego przykładu `@mask@`, możemy użyć następującego pliku JSON o nazwie `appiumMaskLogFilters.json`
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

Następnie przekaż nazwę pliku JSON w polu `logFilters` w konfiguracji usługi appium:
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

BrowserStack również oferuje pewien poziom maskowania pozwalający ukryć niektóre dane; zobacz [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Niestety jest to rozwiązanie typu „wszystko albo nic”, więc wszystkie wartości tekstowe wskazanych poleceń zostaną zamaskowane.