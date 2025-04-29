---
id: wdio-cleanuptotal-service
title: CleanupTotal Service
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---


> wdio-cleanuptotal-service ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

Mit dem `cleanup-total` Service für [webdriver.io](https://webdriver.io/) können Sie ganz einfach eine ordnungsgemäße Bereinigung nach jedem Test sicherstellen. Der Service bietet eine systematische Methode, um Entitäten direkt nach der Erstellung für die Löschung zu markieren. Dies ist besonders nützlich, wenn Tests die Erstellung komplexer Strukturen beinhalten, wie z.B. ein Bankkonto mit einem Anlageplan und einer Einzahlung. Ohne ordnungsgemäße Bereinigung kann der Versuch, das Konto zu löschen, zu Fehlern führen, wie z.B. eine Verweigerung, weil das Konto nicht leer ist. Mit __cleanup-total__ werden Entitäten jedoch in der richtigen Reihenfolge gelöscht, so dass Tests nach sich selbst aufräumen und sich nicht gegenseitig beeinträchtigen.

## Installation
Die einfachste Methode, dieses Modul als (Entwicklungs-)Abhängigkeit zu installieren, ist die Verwendung des folgenden Befehls:

```
npm install wdio-cleanuptotal-service --save-dev
```

## Verwendung

Fügen Sie wdio-cleanuptotal-service zu Ihrer `wdio.conf.ts` hinzu:

```typescript
export const config: WebdriverIO.Config = {
  // ... andere Optionen

  services: ['cleanuptotal']

  // ... andere Optionen
};
```

oder mit den Service-Optionen:

```typescript
export const config: WebdriverIO.Config = {
  // ... andere Optionen

  services: [
    [
      'cleanuptotal',
      {
        // Verwenden Sie eine benutzerdefinierte Logger-Funktion, um Nachrichten in den Testbericht zu schreiben
        customLoggerMethod: console.log(), // TODO: ersetzen Sie dies bei Bedarf durch Ihre eigene Logger-Funktion

        // Schreiben Sie nur dann in das Protokoll, wenn ein Fehler auftritt, um die Übersichtlichkeit zu verbessern
        logErrorsOnly: false, // TODO: erwägen Sie eine Änderung auf 'true', wenn Sie zu viele Nachrichten im Bericht haben
      }
    ]
  ]

  // ... andere Optionen
};
```

## Verwendung im Test

Sie können den __cleanuptotal__ Service überall dort importieren, wo er benötigt wird, sei es in Ihrer Testdatei oder einer anderen Klasse.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Erstellen Sie ein Konto und fügen Sie es der Bereinigungsliste zur Löschung nach dem Test hinzu
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Fügen Sie dem Konto einen Anlageplan hinzu und fügen Sie ihn der Bereinigungsliste hinzu
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Zahlen Sie Geld auf das Konto ein und fügen Sie es der Bereinigungsliste hinzu
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Beachten Sie, dass der eigentliche Bereinigungscode nach Abschluss des Tests ausgeführt wird
```

## Typescript-Unterstützung

Typescript wird für dieses Plugin unterstützt.

## Support

Für Unterstützung und Vorschläge können Sie mich gerne unter [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com) kontaktieren.