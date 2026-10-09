---
id: security
title: Sicherheit
description: "Schützen Sie sensible Testdaten, indem Sie bewährte Sicherheitspraktiken befolgen und Passwörter sowie Schlüssel in Logs und Berichten maskieren."
---

WebdriverIO berücksichtigt bei der Bereitstellung von Lösungen den Sicherheitsaspekt. Im Folgenden finden Sie einige Möglichkeiten, Ihre Tests besser abzusichern.

## Best Practice

- Hinterlegen Sie niemals sensible Daten fest im Code, die Ihrer Organisation schaden können, wenn sie im Klartext offengelegt werden.
- Verwenden Sie einen Mechanismus (z. B. einen Vault), um Schlüssel und Passwörter sicher zu speichern und sie beim Start Ihrer End-to-End-Tests abzurufen.
- Überprüfen Sie, dass keine sensiblen Daten in Logs und durch den Cloud-Anbieter offengelegt werden, wie z. B. Authentifizierungstokens in Netzwerk-Logs.

:::info

Selbst bei Testdaten ist es wichtig zu fragen, ob eine böswillige Person, in deren Hände diese Daten gelangen, Informationen abrufen oder diese Ressourcen mit böswilliger Absicht nutzen könnte.

:::

## Maskieren sensibler Daten

Wenn Sie während Ihres Tests sensible Daten verwenden, ist es wichtig sicherzustellen, dass sie nicht für jeden sichtbar sind, beispielsweise in Logs. Außerdem sind bei der Nutzung eines Cloud-Anbieters häufig private Schlüssel im Spiel. Diese Informationen müssen in Logs, Reportern und anderen Berührungspunkten maskiert werden. Im Folgenden finden Sie einige Maskierungslösungen, um Tests auszuführen, ohne diese Werte offenzulegen.

### WebDriverIO

#### Textwerte von Befehlen maskieren

Die Befehle `addValue` und `setValue` unterstützen einen booleschen Maskierungswert, um Werte in Logs sowie in Reportern zu maskieren. Darüber hinaus erhalten auch andere Tools, wie Performance-Tools und Drittanbieter-Tools, die maskierte Version, was die Sicherheit erhöht.

Wenn Sie beispielsweise einen echten Produktionsbenutzer verwenden und ein Passwort eingeben müssen, das Sie maskieren möchten, ist dies nun wie folgt möglich:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Das obige Beispiel verbirgt den Textwert in den WDIO-Logs wie folgt:

Log-Beispiel:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Reporter, wie z. B. Allure-Reporter, und Drittanbieter-Tools wie Percy von BrowserStack verarbeiten ebenfalls die maskierte Version.
In Kombination mit der passenden Appium-Version bleiben auch die Appium-Logs frei von Ihren sensiblen Daten.

:::info

Einschränkungen:
  - In Appium könnten zusätzliche Plugins Daten preisgeben, obwohl wir die Maskierung der Informationen anfordern.
  - Cloud-Anbieter könnten einen Proxy für HTTP-Logging verwenden, der den eingerichteten Maskierungsmechanismus umgeht.
  - Der Befehl `getValue` wird nicht unterstützt. Darüber hinaus kann er, wenn er auf demselben Element verwendet wird, den Wert offenlegen, der bei der Verwendung von `addValue` oder `setValue` maskiert werden sollte.

Mindestens erforderliche Version:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Maskieren in WDIO-Logs

Mit der Konfiguration `maskingPatterns` können wir sensible Informationen in WDIO-Logs maskieren. Appium-Logs werden jedoch nicht abgedeckt.

Wenn Sie beispielsweise einen Cloud-Anbieter verwenden und das Log-Level info nutzen, werden Sie mit großer Sicherheit den Schlüssel des Benutzers „preisgeben“, wie unten gezeigt:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Um dem entgegenzuwirken, können wir den regulären Ausdruck `'--key=([^ ]*)'` übergeben, und nun sehen Sie in den Logs

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Sie erreichen dies, indem Sie den regulären Ausdruck im Feld `maskingPatterns` der Konfiguration angeben.
  - Für mehrere reguläre Ausdrücke verwenden Sie einen einzelnen String, jedoch mit kommagetrennten Werten.
  - Weitere Details zu Maskierungsmustern finden Sie im [Abschnitt Masking Patterns in der README des WDIO Loggers](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * Testkonfigurationen
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
:::

:::warning
Bei Geheimnissen, die über die Kommandozeile übergeben werden, kann die Maskierung fehlschlagen, da die Datei wdio.conf.ts erst später im Ausführungszyklus geparst wird. Für diese Fälle wird die Verwendung von Umgebungsvariablen dringend empfohlen und ist deutlich sicherer.
:::

#### WDIO-Logger deaktivieren

Eine weitere Möglichkeit, das Protokollieren sensibler Daten zu verhindern, besteht darin, das Log-Level zu senken oder stummzuschalten oder den Logger zu deaktivieren.
Dies kann wie folgt erreicht werden:

```ts
import logger from '@wdio/logger';

/**
  * Setzt das Logger-Level des WDIO-Loggers auf 'silent', bevor *ein Promise ausgeführt wird, was hilft, sensible Informationen in den Logs zu verbergen.
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

### Drittanbieter-Lösungen

#### Appium
Appium bietet eine eigene Maskierungslösung an; siehe [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Die Verwendung dieser Lösung kann knifflig sein. Eine Möglichkeit besteht, wenn möglich, darin, ein Token wie `@mask@` in Ihren String einzufügen und es als regulären Ausdruck zu verwenden
 - In einigen Appium-Versionen werden die Werte zusätzlich mit kommagetrennten einzelnen Zeichen protokolliert, daher müssen wir vorsichtig sein.
 - Leider unterstützt BrowserStack diese Lösung nicht, sie ist aber lokal dennoch nützlich

Unter Verwendung des zuvor erwähnten `@mask@`-Beispiels können wir die folgende JSON-Datei mit dem Namen `appiumMaskLogFilters.json` verwenden
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

Übergeben Sie dann den Namen der JSON-Datei an das Feld `logFilters` in der Appium-Service-Konfiguration:
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

BrowserStack bietet ebenfalls ein gewisses Maß an Maskierung, um bestimmte Daten zu verbergen; siehe [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Leider funktioniert die Lösung nach dem Alles-oder-nichts-Prinzip, sodass alle Textwerte der angegebenen Befehle maskiert werden.