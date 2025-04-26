---
id: protractor-migration
title: Von Protractor
---

Dieses Tutorial richtet sich an Personen, die Protractor verwenden und ihr Framework zu WebdriverIO migrieren möchten. Es wurde initiiert, nachdem das Angular-Team [angekündigt hat](https://github.com/angular/protractor/issues/5502), dass Protractor nicht mehr unterstützt wird. WebdriverIO wurde von vielen Designentscheidungen von Protractor beeinflusst, weshalb es wahrscheinlich das am nächsten liegende Framework für eine Migration ist. Das WebdriverIO-Team schätzt die Arbeit jedes einzelnen Protractor-Mitwirkenden und hofft, dass dieses Tutorial den Übergang zu WebdriverIO einfach und unkompliziert gestaltet.

Obwohl wir gerne einen vollständig automatisierten Prozess dafür hätten, sieht die Realität anders aus. Jeder hat ein anderes Setup und verwendet Protractor auf unterschiedliche Weise. Jeder Schritt sollte als Orientierungshilfe und weniger als schrittweise Anleitung verstanden werden. Wenn Sie Probleme bei der Migration haben, zögern Sie nicht, [uns zu kontaktieren](https://github.com/webdriverio/codemod/discussions/new).

## Setup

Die Protractor- und WebdriverIO-API sind tatsächlich sehr ähnlich, bis zu dem Punkt, an dem die Mehrheit der Befehle durch einen [Codemod](https://github.com/webdriverio/codemod) automatisch umgeschrieben werden kann.

Um den Codemod zu installieren, führen Sie aus:

```sh
npm install jscodeshift @wdio/codemod
```

## Strategie

Es gibt viele Migrationsstrategien. Abhängig von der Größe Ihres Teams, der Anzahl der Testdateien und der Dringlichkeit der Migration können Sie versuchen, alle Tests auf einmal oder Datei für Datei zu transformieren. Da Protractor bis Angular Version 15 (Ende 2022) weiterhin gepflegt wird, haben Sie noch genügend Zeit. Sie können Protractor- und WebdriverIO-Tests gleichzeitig ausführen und beginnen, neue Tests in WebdriverIO zu schreiben. Je nach Ihrem Zeitbudget können Sie dann mit der Migration der wichtigsten Testfälle beginnen und sich zu Tests vorarbeiten, die Sie möglicherweise sogar löschen können.

## Zuerst die Konfigurationsdatei

Nachdem wir den Codemod installiert haben, können wir mit der Transformation der ersten Datei beginnen. Schauen Sie sich zunächst die [WebdriverIO-Konfigurationsoptionen](configuration) an. Konfigurationsdateien können sehr komplex werden, und es könnte sinnvoll sein, nur die wesentlichen Teile zu übertragen und zu sehen, wie der Rest hinzugefügt werden kann, sobald die entsprechenden Tests, die bestimmte Optionen benötigen, migriert werden.

Für die erste Migration transformieren wir nur die Konfigurationsdatei und führen aus:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

Ihre Konfiguration kann anders benannt sein, aber das Prinzip sollte dasselbe sein: Beginnen Sie mit der Migration der Konfiguration.

:::

## WebdriverIO-Abhängigkeiten installieren

Der nächste Schritt besteht darin, ein minimales WebdriverIO-Setup zu konfigurieren, das wir aufbauen, während wir von einem Framework zum anderen migrieren. Zuerst installieren wir die WebdriverIO CLI über:

```sh
npm install --save-dev @wdio/cli
```

Als Nächstes führen wir den Konfigurationsassistenten aus:

```sh
npx wdio config
```

Dies führt Sie durch einige Fragen. Für dieses Migrationsszenario:
- wählen Sie die Standardoptionen
- wir empfehlen, keine Beispieldateien automatisch zu generieren
- wählen Sie einen anderen Ordner für WebdriverIO-Dateien
- und wählen Sie Mocha anstelle von Jasmine.

:::info Warum Mocha?
Auch wenn Sie Protractor zuvor mit Jasmine verwendet haben, bietet Mocha bessere Wiederholungsmechanismen. Die Wahl liegt bei Ihnen!
:::

Nach dem kleinen Fragebogen installiert der Assistent alle notwendigen Pakete und speichert sie in Ihrer `package.json`.

## Konfigurationsdatei migrieren

Nachdem wir eine transformierte `conf.ts` und eine neue `wdio.conf.ts` haben, ist es jetzt an der Zeit, die Konfiguration von einer Konfiguration zur anderen zu migrieren. Stellen Sie sicher, dass Sie nur Code übertragen, der für alle Tests wesentlich ist, um ausgeführt werden zu können. In unserem Fall übertragen wir die Hook-Funktion und das Framework-Timeout.

Wir werden jetzt nur mit unserer `wdio.conf.ts`-Datei fortfahren und benötigen daher keine Änderungen mehr an der ursprünglichen Protractor-Konfiguration. Wir können diese zurücksetzen, damit beide Frameworks nebeneinander laufen können und wir eine Datei nach der anderen portieren können.

## Testdatei migrieren

Wir sind jetzt bereit, die erste Testdatei zu portieren. Um einfach zu beginnen, starten wir mit einer, die nicht viele Abhängigkeiten zu Drittanbieter-Paketen oder anderen Dateien wie PageObjects hat. In unserem Beispiel ist die erste zu migrierende Datei `first-test.spec.ts`. Erstellen Sie zunächst das Verzeichnis, in dem die neue WebdriverIO-Konfiguration ihre Dateien erwartet, und verschieben Sie es dann:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Jetzt transformieren wir diese Datei:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

Das war's! Diese Datei ist so einfach, dass wir keine zusätzlichen Änderungen mehr benötigen und direkt versuchen können, WebdriverIO auszuführen:

```sh
npx wdio run wdio.conf.ts
```

Herzlichen Glückwunsch 🥳 Sie haben gerade die erste Datei migriert!

## Nächste Schritte

Von diesem Punkt an fahren Sie fort, Test für Test und Page Object für Page Object zu transformieren. Es besteht die Möglichkeit, dass der Codemod für bestimmte Dateien mit einem Fehler wie diesem fehlschlägt:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Für einige Protractor-Befehle gibt es einfach keinen Ersatz in WebdriverIO. In diesem Fall gibt Ihnen der Codemod einige Ratschläge, wie Sie ihn umgestalten können. Wenn Sie zu oft auf solche Fehlermeldungen stoßen, können Sie gerne [ein Issue erstellen](https://github.com/webdriverio/codemod/issues/new) und die Hinzufügung einer bestimmten Transformation anfordern. Während der Codemod bereits den Großteil der Protractor-API transformiert, gibt es noch viel Raum für Verbesserungen.

## Fazit

Wir hoffen, dass dieses Tutorial Sie ein wenig durch den Migrationsprozess zu WebdriverIO führt. Die Community verbessert den Codemod kontinuierlich, während sie ihn mit verschiedenen Teams in verschiedenen Organisationen testet. Zögern Sie nicht, [ein Issue zu erstellen](https://github.com/webdriverio/codemod/issues/new), wenn Sie Feedback haben, oder [eine Diskussion zu starten](https://github.com/webdriverio/codemod/discussions/new), wenn Sie während des Migrationsprozesses Schwierigkeiten haben.