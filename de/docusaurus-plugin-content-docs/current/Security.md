---
id: security
title: Sicherheit
---

WebdriverIO berücksichtigt den Sicherheitsaspekt bei der Bereitstellung von Lösungen. Nachfolgend sind einige Möglichkeiten aufgeführt, um Ihre Tests besser abzusichern.

## Beste Praktiken

- Sensible Daten, die Ihrer Organisation schaden könnten, wenn sie im Klartext offengelegt werden, niemals hardcodieren.
- Verwenden Sie einen Mechanismus (wie einen Tresor), um Schlüssel und Passwörter sicher zu speichern und beim Start Ihrer End-to-End-Tests abzurufen.
- Überprüfen Sie, dass keine sensiblen Daten in Protokollen und vom Cloud-Anbieter offengelegt werden, wie z.B. Authentifizierungstoken in Netzwerkprotokollen.

:::info

Selbst für Testdaten ist es wichtig zu fragen, ob in falschen Händen eine böswillige Person Informationen abrufen oder diese Ressourcen mit böswilliger Absicht nutzen könnte.

:::

## Maskieren sensibler Daten

Wenn Sie während Ihres Tests sensible Daten verwenden, ist es wichtig sicherzustellen, dass diese nicht für jeden sichtbar sind, wie z.B. in Protokollen. Auch bei der Nutzung eines Cloud-Anbieters sind oft private Schlüssel involviert. Diese Informationen müssen in Protokollen, Reportern und anderen Berührungspunkten maskiert werden. Im Folgenden werden einige Maskierungslösungen vorgestellt, um Tests durchzuführen, ohne diese Werte offenzulegen.

### WebDriverIO

#### Maskieren von Textwerten in Befehlen

Die Befehle `addValue` und `setValue` unterstützen einen booleschen Maskierungswert, um in Protokollen sowie in Reportern zu maskieren. Darüber hinaus erhalten auch andere Tools wie Performance-Tools und Drittanbieter-Tools die maskierte Version, was die Sicherheit erhöht.

Wenn Sie beispielsweise einen echten Produktionsbenutzer verwenden und ein Passwort eingeben müssen, das Sie maskieren möchten, dann ist dies jetzt mit Folgendem möglich:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Das obige Beispiel verbirgt den Textwert in den WDIO-Protokollen wie folgt:

Beispiel für Protokolle:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Reporter, wie Allure-Reporter, und Drittanbieter-Tools wie Percy von BrowserStack verarbeiten ebenfalls die maskierte Version.
In Verbindung mit der richtigen Appium-Version werden auch die Appium-Protokolle von Ihren sensiblen Daten ausgenommen.

:::info

Einschränkungen:
  - In Appium könnten zusätzliche Plugins Informationen preisgeben, obwohl wir darum bitten, die Informationen zu maskieren.
  - Cloud-Anbieter könnten einen Proxy für HTTP-Protokollierung verwenden, der den eingerichteten Maskierungsmechanismus umgeht.
  - Der Befehl `getValue` wird nicht unterstützt. Wenn er auf dasselbe Element angewendet wird, kann er den Wert offenlegen, der bei Verwendung von `addValue` oder `setValue` maskiert werden sollte.

Mindestanforderungen an die Version:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Maskierung in WDIO-Protokollen

Mit der Konfiguration `maskingPatterns` können wir sensible Informationen in WDIO-Protokollen maskieren. Appium-Protokolle sind jedoch nicht abgedeckt.

Wenn Sie beispielsweise einen Cloud-Anbieter verwenden und die Info-Ebene nutzen, werden Sie höchstwahrscheinlich den Schlüssel des Benutzers "leaken", wie unten gezeigt:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Um dem entgegenzuwirken, können wir den regulären Ausdruck `'--key=([^ ]*)'` übergeben, und nun sehen Sie in den Protokollen:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Sie können dies erreichen, indem Sie den regulären Ausdruck im Feld `maskingPatterns` der Konfiguration angeben.
  - Für mehrere reguläre Ausdrücke verwenden Sie einen einzelnen String, aber mit durch Kommas getrennten Werten.
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

Mindestanforderungen an die Version:
 - WDIO v9.15.0

:::

#### Deaktivieren von WDIO-Loggern

Eine weitere Möglichkeit, die Protokollierung sensibler Daten zu blockieren, besteht darin, die Protokollierungsebene zu senken oder stumm zu schalten oder den Logger zu deaktivieren.
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

### Lösungen von Drittanbietern

#### Appium
Appium bietet seine eigene Maskierungslösung; siehe [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Die Verwendung dieser Lösung kann knifflig sein. Eine Möglichkeit, wenn möglich, besteht darin, in Ihrem String ein Token wie `@mask@` zu übergeben und es als regulären Ausdruck zu verwenden
 - In einigen Appium-Versionen werden die Werte auch mit jedem Zeichen durch Kommas getrennt protokolliert, daher müssen wir vorsichtig sein.
 - Leider unterstützt BrowserStack diese Lösung nicht, aber sie ist lokal dennoch nützlich
 
Mit dem zuvor erwähnten Beispiel `@mask@` können wir die folgende JSON-Datei mit dem Namen `appiumMaskLogFilters.json` verwenden
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

#### BrowserStack

BrowserStack bietet auch ein gewisses Maß an Maskierung, um einige Daten zu verbergen; siehe [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Leider ist die Lösung alles oder nichts, sodass alle Textwerte der bereitgestellten Befehle maskiert werden.