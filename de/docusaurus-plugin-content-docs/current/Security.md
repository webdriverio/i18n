---
id: security
title: Sicherheit
---

WebdriverIO berücksichtigt den Sicherheitsaspekt bei der Bereitstellung von Lösungen. Nachfolgend sind einige Möglichkeiten aufgeführt, um Ihre Tests besser zu schützen.

# Maskierung sensibler Daten

Wenn Sie während Ihres Tests sensible Daten verwenden, ist es wichtig sicherzustellen, dass diese nicht für jeden sichtbar sind, zum Beispiel in Logs. Auch bei der Nutzung eines Cloud-Anbieters sind oft private Schlüssel im Spiel. Diese Informationen müssen in Logs, Reportern und anderen Berührungspunkten maskiert werden. Im Folgenden werden einige Maskierungslösungen vorgestellt, um Tests durchzuführen, ohne diese Werte preiszugeben.

## WebDriverIO

### Maskieren von Textinhalten in Befehlen

Die Befehle `addValue` und `setValue` unterstützen einen booleschen Maskierungswert, um Inhalte in WDIO- und Appium-Logs sowie in Reportern zu maskieren. Darüber hinaus erhalten auch andere Tools, wie Performance-Tools und Drittanbieter-Tools, die maskierte Version, was die Sicherheit erhöht.

Wenn Sie beispielsweise einen echten Produktionsbenutzer verwenden und ein Passwort eingeben müssen, das Sie maskieren möchten, ist dies mit folgendem Code möglich:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Dies verbirgt den Textwert sowohl in WDIO- als auch in Appium-Logs.

Beispiel für Logs:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

Einschränkungen:
  - In Appium könnten zusätzliche Plugins Informationen preisgeben, obwohl wir die Maskierung anfordern.
  - Cloud-Anbieter könnten einen Proxy für HTTP-Logging verwenden, der den eingerichteten Maskierungsmechanismus umgeht.

:::info

Mindestens erforderliche Version:
 - WDIO v9.15.0
 - Appium v2.19.0

### Maskierung in WDIO-Logs

Durch die Verwendung der `maskingPatterns`-Konfiguration können wir sensible Informationen in WDIO-Logs maskieren. Appium-Logs sind davon jedoch nicht betroffen.

Wenn Sie beispielsweise einen Cloud-Anbieter verwenden und die Info-Ebene nutzen, werden Sie höchstwahrscheinlich den Schlüssel des Benutzers "leaken", wie unten gezeigt:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Um dem entgegenzuwirken, können wir den regulären Ausdruck `'--key=([^ ]*)'` übergeben, und in den Logs sehen Sie dann:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Sie können dies erreichen, indem Sie den regulären Ausdruck im Feld `maskingPatterns` der Konfiguration angeben.
  - Für mehrere reguläre Ausdrücke verwenden Sie einen einzelnen String mit kommagetrennten Werten.
  - Weitere Details zu Maskierungsmustern finden Sie im [Abschnitt Masking Patterns in der WDIO Logger README](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Mindestens erforderliche Version:
 - WDIO v9.15.0

### Deaktivieren von WDIO-Loggern

Eine andere Möglichkeit, die Protokollierung sensibler Daten zu blockieren, besteht darin, die Protokollierungsebene zu senken oder stummzuschalten oder den Logger zu deaktivieren.
Dies kann wie folgt erreicht werden:

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

## Lösungen von Drittanbietern

### Appium
Appium bietet seine eigene Maskierungslösung; siehe [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Die Verwendung ihrer Lösung kann knifflig sein. Eine Möglichkeit ist, wenn möglich, ein Token in Ihrem String wie `@mask@` zu übergeben und es als regulären Ausdruck zu verwenden.
 - In einigen Appium-Versionen werden die Werte auch mit durch Kommas getrennten Zeichen protokolliert, daher müssen wir vorsichtig sein.
 - Leider unterstützt BrowserStack diese Lösung nicht, aber sie ist lokal dennoch nützlich.
 
Unter Verwendung des zuvor erwähnten `@mask@`-Beispiels können wir die folgende JSON-Datei mit dem Namen `appiumMaskLogFilters.json` verwenden:
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

Dann übergeben Sie den JSON-Dateinamen an das Feld `logFilters` in der Appium-Service-Konfiguration:
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

BrowserStack bietet auch eine gewisse Maskierungsebene, um einige Daten zu verbergen; siehe [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Leider ist die Lösung alles oder nichts, sodass alle Textwerte der bereitgestellten Befehle maskiert werden.