---
id: writing-tests
title: Tests schreiben
description: "Schreiben Sie WebdriverIO-Tests für Flutter-Apps, indem Sie in den Flutter-Kontext wechseln und über die flutter_driver-Erweiterung mit Widgets interagieren."
---

Dieser Abschnitt behandelt die praktische Struktur zur Erstellung automatisierter Testszenarien und zeigt, wie Sie mit WebdriverIO direkt mit dem internen Komponentenbaum von Flutter interagieren.

### Warum ist ein Kontextwechsel notwendig?

Beim Starten einer Automatisierungssitzung mit Appium beginnt der Treiber die Ausführung, indem er den nativen Kontext des Betriebssystems abbildet, der als `NATIVE_APP` bezeichnet wird. Dieser Kontext kann nur die native Hülle sehen, die die Anwendung umgibt (wie z. B. die Statusleiste des Systems oder native Android/iOS-Dialoge).

Da Flutter seine Benutzeroberfläche innerhalb eines isolierten Canvas rendert, sind interne Elemente im `NATIVE_APP`-Kontext unsichtbar. Um Befehle direkt an die Testerweiterung von Flutter (`flutter_driver`) zu senden, müssen wir den Automatisierungsfokus explizit auf den `FLUTTER`-Kontext umschalten. Ohne diesen Wechsel führt jeder Versuch, ein Widget zu finden, zu einem Fehler, dass das Element nicht gefunden wurde.

:::tip Best Practice: Kontext immer in `beforeEach` wechseln
Es ist eine empfohlene Best Practice, `await driver.switchContext('FLUTTER')` in jeder Testdatei in einen `beforeEach`-Hook aufzunehmen. Dadurch wird sichergestellt, dass jeder Test im `FLUTTER`-Kontext beginnt. So werden instabile Tests oder ein Übertragen des Zustands vermieden, falls ein vorheriger Test zu `NATIVE_APP` gewechselt hat (z. B. um Berechtigungsdialoge des Betriebssystems zu behandeln) oder falls eine Sitzung den aktiven Kontext zurücksetzt.
:::

### Warum ist `appium-flutter-finder` notwendig?

Herkömmliche WebdriverIO-Selektoren wie `$('~selector')` oder `$('#id')` sind darauf ausgelegt, Elemente mithilfe von Strategien zu finden, die für Web- oder native mobile Oberflächen gedacht sind (wie z. B. Resource-IDs oder XPath).

Flutter verwaltet seine eigenen internen Elemente und verwendet proprietäre Suchmethoden (wie `byValueKey`, `byText`, `byType`). Die Bibliothek `appium-flutter-finder` wird benötigt, weil sie als Übersetzer fungiert: Sie stellt diese Flutter-spezifischen Locator-Strategien in einem serialisierten Format (Base64/JSON) bereit, das der `appium-flutter-driver` interpretieren und innerhalb der Dart Virtual Machine (VM) ausführen kann.

### Praktische Testbeispiele

Wir dokumentieren gängige Szenarien, in denen `appium-flutter-finder` zum Auffinden von Widgets verwendet wird, kombiniert mit direkten Erweiterungsbefehlen, die über `driver.execute('flutter:<command>')` ausgeführt werden.

:::info Befehle & Finder der Flutter-Driver-Erweiterung
Der `appium-flutter-driver` stellt spezielle Befehle für die Interaktion mit Flutter-Anwendungen bereit, darunter:
- `flutter:waitFor`: Wartet, bis ein Widget sichtbar wird.
- `flutter:waitForAbsent`: Wartet, bis ein Widget verschwindet.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: Steuert das Scrollen innerhalb scrollbarer Ansichten.
- `flutter:setTextEntryEmulation`: Konfiguriert das Verhalten der Texteingabe.

Die vollständige Liste der verfügbaren Befehle, Parameter und Rückgabetypen finden Sie in der [Appium Flutter Driver Commands Documentation](https://github.com/appium/appium-flutter-driver#commands), im [Node.js-Finder-Quellcode](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) und unter [appium-flutter-finder auf npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### Beispiel A — Einfache Interaktion (Counter-Ablauf)

```typescript
// counter.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Counter Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The counter should be successfully incremented by clicking the button.', async () => {
        const incrementButton = find.byTooltip('Increment');
        const counterText = find.byValueKey('counter_text');

        const initialValue = await driver.getElementText(counterText);
        expect(initialValue).toBe('0');

        await driver.elementClick(incrementButton);

        const finalValue = await driver.getElementText(counterText);
        expect(finalValue).toBe('1');
    });
});
```

### Beispiel B — Stabile Navigation (Timeouts vermeiden)

```typescript
// redirects.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Redirects Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should be able to navigate between the Redirect Example views and back to the first view.', async () => {
        const buttonGoToRedirectExampleTwoView = find.byValueKey('redirect_example_two_button');
        await driver.elementClick(buttonGoToRedirectExampleTwoView);

        const redirectExampleTwoBody = find.byValueKey('redirect_example_two_body');
        await driver.execute('flutter:waitFor', redirectExampleTwoBody);
        const textRedirectExampleTwoBody = await driver.getElementText(redirectExampleTwoBody);
        expect(textRedirectExampleTwoBody).toBe('This is the Redirect Example Two View');

        const buttonGoBackToRedirectExampleView = find.byValueKey('redirect_example_two_back_button');
        await driver.elementClick(buttonGoBackToRedirectExampleView);

        const redirectExampleBody = find.byValueKey('redirect_example_body');
        await driver.execute('flutter:waitFor', redirectExampleBody);
        const textRedirectExampleBody = await driver.getElementText(redirectExampleBody);
        expect(textRedirectExampleBody).toBe('This is the Redirect Example View');
    });
});
```

### Beispiel C — Kontextwechsel (Native Betriebssystemdialoge & Berechtigungen)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. Im FLUTTER-Kontext: Widget anklicken, das einen Berechtigungs- oder Warndialog auf Betriebssystemebene auslöst
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. In den NATIVE_APP-Kontext wechseln, um mit dem Betriebssystemdialog zu interagieren
        await driver.switchContext('NATIVE_APP');

        // Nativen Button mit Standard-WebdriverIO-Selektoren finden und anklicken
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Zurück in den FLUTTER-Kontext wechseln, um die Überprüfung der Flutter-Widgets fortzusetzen
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## Build- und Ausführungsablauf

Damit Ihre aktuellen Dart-Code- und Key-Änderungen für die Tests sichtbar sind, befolgen Sie immer diese Schritte:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

Die Codebeispiele finden Sie im Repository: https://github.com/webdriverio/appium-boilerplate