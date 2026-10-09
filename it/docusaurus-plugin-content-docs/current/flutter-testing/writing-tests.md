---
id: writing-tests
title: Scrivere i test
description: "Scrivi test WebdriverIO per app Flutter passando al contesto Flutter e interagendo con i widget tramite l'estensione flutter_driver."
---

Questa sezione illustra la struttura pratica per creare scenari di test automatizzati e come interagire direttamente con l'albero dei componenti interni di Flutter utilizzando WebdriverIO.

### Perché è necessario cambiare contesto?

Quando si avvia una sessione di automazione con Appium, il driver inizia l'esecuzione mappando il contesto nativo del sistema operativo, noto come `NATIVE_APP`. Questo contesto può vedere solo il guscio nativo che avvolge l'applicazione (come la barra di stato del sistema o le finestre di dialogo native di Android/iOS).

Poiché Flutter esegue il rendering della propria interfaccia utente all'interno di un Canvas isolato, gli elementi interni sono invisibili nel contesto `NATIVE_APP`. Per inviare comandi direttamente all'estensione di test di Flutter (`flutter_driver`), dobbiamo spostare esplicitamente il focus dell'automazione sul contesto `FLUTTER`. Senza questo cambio, qualsiasi tentativo di individuare un Widget genererà un errore di elemento non trovato.

:::tip Best practice: cambia sempre contesto in `beforeEach`
È una best practice consigliata includere `await driver.switchContext('FLUTTER')` in un hook `beforeEach` in ogni file di test. Questo garantisce che ogni test inizi l'esecuzione nel contesto `FLUTTER`, evitando instabilità o perdite di stato nel caso in cui un test precedente sia passato a `NATIVE_APP` (ad esempio, per gestire le finestre di dialogo dei permessi del sistema operativo) o se una sessione reimposta il contesto attivo.
:::

### Perché è necessario `appium-flutter-finder`?

I selettori tradizionali di WebdriverIO, come `$('~selector')` o `$('#id')`, sono progettati per individuare gli elementi utilizzando strategie pensate per interfacce Web o native mobile (come resource ID o XPath).

Flutter gestisce i propri elementi interni e utilizza metodi di ricerca proprietari (come `byValueKey`, `byText`, `byType`). La libreria `appium-flutter-finder` è necessaria perché funge da traduttore: espone queste strategie di localizzazione specifiche di Flutter in un formato serializzato (Base64/JSON) che `appium-flutter-driver` può interpretare ed eseguire all'interno della Dart Virtual Machine (VM).

### Esempi pratici di test

Documentiamo scenari comuni che utilizzano `appium-flutter-finder` per individuare i widget, combinati con comandi diretti dell'estensione eseguiti tramite `driver.execute('flutter:<command>')`.

:::info Comandi e finder dell'estensione Flutter Driver
`appium-flutter-driver` fornisce comandi specializzati per interagire con le applicazioni Flutter, tra cui:
- `flutter:waitFor`: attende che un widget diventi visibile.
- `flutter:waitForAbsent`: attende che un widget scompaia.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: gestisce lo scorrimento all'interno delle viste scorrevoli.
- `flutter:setTextEntryEmulation`: configura il comportamento dell'inserimento di testo.

Per l'elenco completo dei comandi disponibili, dei parametri e dei tipi di ritorno, consulta la [documentazione dei comandi di Appium Flutter Driver](https://github.com/appium/appium-flutter-driver#commands), il [codice sorgente del Finder per Node.js](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) e [appium-flutter-finder su npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### Esempio A — Interazione semplice (flusso del contatore)

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

### Esempio B — Navigazione stabile (evitare i timeout)

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

### Esempio C — Cambio di contesto (finestre di dialogo native del sistema operativo e permessi)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. Nel contesto FLUTTER: clicca sul widget che attiva una finestra di dialogo di permesso o di avviso a livello di sistema operativo
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. Passa al contesto NATIVE_APP per interagire con la finestra di dialogo del sistema operativo
        await driver.switchContext('NATIVE_APP');

        // Individua e clicca il pulsante nativo utilizzando i selettori standard di WebdriverIO
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Torna al contesto FLUTTER per continuare a verificare i widget Flutter
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## Flusso di build ed esecuzione

Per assicurarti che le modifiche recenti al codice Dart e alle Key siano visibili ai test, segui sempre questi passaggi:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

Puoi consultare gli esempi di codice nel repository: https://github.com/webdriverio/appium-boilerplate