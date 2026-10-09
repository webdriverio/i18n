---
id: protractor-migration
title: Von Protractor
description: "Migrieren Sie eine Protractor-Testsuite Schritt für Schritt zu WebdriverIO, einschließlich Abhängigkeiten, Konfigurationsdatei und Testdateien, mit Hilfe eines Codemods."
---

Dieses Tutorial richtet sich an Personen, die Protractor verwenden und ihr Framework zu WebdriverIO migrieren möchten. Es wurde ins Leben gerufen, nachdem das Angular-Team [angekündigt hat](https://github.com/angular/protractor/issues/5502), dass Protractor nicht länger unterstützt wird. WebdriverIO wurde von vielen Designentscheidungen von Protractor beeinflusst, weshalb es wahrscheinlich das naheliegendste Framework für eine Migration ist. Das WebdriverIO-Team schätzt die Arbeit jedes einzelnen Protractor-Mitwirkenden und hofft, dass dieses Tutorial den Umstieg auf WebdriverIO einfach und unkompliziert macht.

Auch wenn wir uns einen vollständig automatisierten Prozess dafür wünschen würden, sieht die Realität anders aus. Jeder hat ein anderes Setup und verwendet Protractor auf unterschiedliche Weise. Jeder Schritt sollte eher als Orientierungshilfe und weniger als Schritt-für-Schritt-Anleitung verstanden werden. Wenn Sie Probleme bei der Migration haben, zögern Sie nicht, [uns zu kontaktieren](https://github.com/webdriverio/codemod/discussions/new).

## Setup

Die APIs von Protractor und WebdriverIO sind tatsächlich sehr ähnlich, und zwar so sehr, dass die Mehrheit der Befehle automatisiert mithilfe eines [Codemods](https://github.com/webdriverio/codemod) umgeschrieben werden kann.

Um den Codemod zu installieren, führen Sie Folgendes aus:

```sh
npm install jscodeshift @wdio/codemod
```

## Strategie

Es gibt viele Migrationsstrategien. Abhängig von der Größe Ihres Teams, der Anzahl der Testdateien und der Dringlichkeit der Migration können Sie versuchen, alle Tests auf einmal oder Datei für Datei zu transformieren. Da Protractor noch bis Angular Version 15 (Ende 2022) gewartet wird, haben Sie noch genügend Zeit. Sie können Protractor- und WebdriverIO-Tests gleichzeitig laufen lassen und damit beginnen, neue Tests in WebdriverIO zu schreiben. Je nach Ihrem Zeitbudget können Sie dann zuerst die wichtigen Testfälle migrieren und sich bis zu den Tests vorarbeiten, die Sie möglicherweise sogar löschen können.

## Zuerst die Konfigurationsdatei

Nachdem wir den Codemod installiert haben, können wir mit der Transformation der ersten Datei beginnen. Werfen Sie zunächst einen Blick auf die [Konfigurationsoptionen von WebdriverIO](configuration). Konfigurationsdateien können sehr komplex werden, und es kann sinnvoll sein, nur die wesentlichen Teile zu portieren und zu sehen, wie der Rest hinzugefügt werden kann, sobald die entsprechenden Tests migriert werden, die bestimmte Optionen benötigen.

Für die erste Migration transformieren wir nur die Konfigurationsdatei und führen Folgendes aus:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Ihre Konfiguration kann anders benannt sein, das Prinzip sollte jedoch dasselbe sein: Beginnen Sie die Migration zuerst mit der Konfiguration.

:::

## WebdriverIO-Abhängigkeiten installieren

Der nächste Schritt besteht darin, ein minimales WebdriverIO-Setup zu konfigurieren, das wir während der Migration von einem Framework zum anderen ausbauen. Zunächst installieren wir die WebdriverIO CLI über:

```sh
npm install --save-dev @wdio/cli
```

Als Nächstes führen wir den Konfigurationsassistenten aus:

```sh
npx wdio config
```

Dieser führt Sie durch eine Reihe von Fragen. Für dieses Migrationsszenario sollten Sie:
- die Standardoptionen wählen
- wir empfehlen, keine Beispieldateien automatisch generieren zu lassen
- einen anderen Ordner für WebdriverIO-Dateien wählen
- und Mocha gegenüber Jasmine bevorzugen.

:::info Warum Mocha?
Auch wenn Sie Protractor bisher möglicherweise mit Jasmine verwendet haben, bietet Mocha bessere Wiederholungsmechanismen. Die Wahl liegt bei Ihnen!
:::

Nach dem kleinen Fragebogen installiert der Assistent alle notwendigen Pakete und speichert sie in Ihrer `package.json`.

## Konfigurationsdatei migrieren

Nachdem wir eine transformierte `conf.ts` und eine neue `wdio.conf.ts` haben, ist es nun an der Zeit, die Konfiguration von der einen in die andere zu migrieren. Achten Sie darauf, nur Code zu portieren, der für die Ausführung aller Tests unerlässlich ist. In unserem Fall portieren wir die Hook-Funktion und das Framework-Timeout.

Wir arbeiten nun nur noch mit unserer `wdio.conf.ts`-Datei weiter und benötigen daher keine Änderungen mehr an der ursprünglichen Protractor-Konfiguration. Wir können diese rückgängig machen, sodass beide Frameworks nebeneinander laufen können und wir eine Datei nach der anderen portieren können.

## Testdatei migrieren

Wir sind nun bereit, die erste Testdatei zu portieren. Um einfach zu beginnen, starten wir mit einer Datei, die nicht viele Abhängigkeiten zu Drittanbieterpaketen oder anderen Dateien wie PageObjects hat. In unserem Beispiel ist die erste zu migrierende Datei `first-test.spec.ts`. Erstellen Sie zunächst das Verzeichnis, in dem die neue WebdriverIO-Konfiguration ihre Dateien erwartet, und verschieben Sie die Datei dann dorthin:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Nun transformieren wir diese Datei:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

Das war's! Diese Datei ist so einfach, dass wir keine weiteren Änderungen mehr benötigen und direkt versuchen können, WebdriverIO auszuführen über:

```sh
npx wdio run wdio.conf.ts
```

Herzlichen Glückwunsch 🥳 Sie haben gerade die erste Datei migriert!

## Nächste Schritte

Ab diesem Punkt transformieren Sie weiter Test für Test und Page Object für Page Object. Es besteht die Möglichkeit, dass der Codemod bei bestimmten Dateien mit einem Fehler wie diesem fehlschlägt:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Für einige Protractor-Befehle gibt es in WebdriverIO schlicht keinen Ersatz. In diesem Fall gibt Ihnen der Codemod einige Hinweise, wie Sie den Code refaktorisieren können. Wenn Sie zu oft auf solche Fehlermeldungen stoßen, können Sie gerne [ein Issue erstellen](https://github.com/webdriverio/codemod/issues/new) und das Hinzufügen einer bestimmten Transformation anfragen. Auch wenn der Codemod bereits den Großteil der Protractor-API transformiert, gibt es noch viel Raum für Verbesserungen.

## Fazit

Wir hoffen, dass dieses Tutorial Sie ein wenig durch den Migrationsprozess zu WebdriverIO begleitet. Die Community verbessert den Codemod kontinuierlich, während sie ihn mit verschiedenen Teams in verschiedenen Organisationen testet. Zögern Sie nicht, [ein Issue zu erstellen](https://github.com/webdriverio/codemod/issues/new), wenn Sie Feedback haben, oder [eine Diskussion zu starten](https://github.com/webdriverio/codemod/discussions/new), wenn Sie während des Migrationsprozesses auf Schwierigkeiten stoßen.