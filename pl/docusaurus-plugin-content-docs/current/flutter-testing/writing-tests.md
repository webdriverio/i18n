---
id: writing-tests
title: Pisanie testów
description: "Pisz testy WebdriverIO dla aplikacji Flutter, przełączając się do kontekstu Flutter i wchodząc w interakcje z widżetami za pomocą rozszerzenia flutter_driver."
---

Ta sekcja omawia praktyczną strukturę tworzenia zautomatyzowanych scenariuszy testowych oraz sposób bezpośredniej interakcji z wewnętrznym drzewem komponentów Fluttera przy użyciu WebdriverIO.

### Dlaczego przełączanie kontekstu jest konieczne?

Podczas rozpoczynania sesji automatyzacji z Appium sterownik zaczyna działanie od mapowania natywnego kontekstu systemu operacyjnego, znanego jako `NATIVE_APP`. Ten kontekst widzi jedynie natywną powłokę otaczającą aplikację (taką jak systemowy pasek stanu czy natywne okna dialogowe Androida/iOS).

Ponieważ Flutter renderuje swój interfejs użytkownika wewnątrz odizolowanego Canvasu, wewnętrzne elementy są niewidoczne w kontekście `NATIVE_APP`. Aby wysyłać polecenia bezpośrednio do rozszerzenia testowego Fluttera (`flutter_driver`), musimy jawnie przełączyć fokus automatyzacji na kontekst `FLUTTER`. Bez tego przełączenia każda próba zlokalizowania widżetu zakończy się błędem nieznalezienia elementu.

:::tip Dobra praktyka: Zawsze przełączaj kontekst w `beforeEach`
Zalecaną dobrą praktyką jest umieszczanie `await driver.switchContext('FLUTTER')` w hooku `beforeEach` w każdym pliku testowym. Gwarantuje to, że każdy test rozpoczyna wykonywanie w kontekście `FLUTTER`, co zapobiega niestabilności testów lub przenikaniu stanu, jeśli poprzedni test przełączył się na `NATIVE_APP` (np. w celu obsługi systemowych okien dialogowych z uprawnieniami) lub jeśli sesja resetuje aktywny kontekst.
:::

### Dlaczego `appium-flutter-finder` jest konieczny?

Tradycyjne selektory WebdriverIO, takie jak `$('~selector')` czy `$('#id')`, są zaprojektowane do lokalizowania elementów przy użyciu strategii przeznaczonych dla interfejsów webowych lub natywnych interfejsów mobilnych (takich jak identyfikatory zasobów czy XPath).

Flutter zarządza własnymi wewnętrznymi elementami i używa własnych metod wyszukiwania (takich jak `byValueKey`, `byText`, `byType`). Biblioteka `appium-flutter-finder` jest wymagana, ponieważ działa jako tłumacz: udostępnia te specyficzne dla Fluttera strategie lokalizowania w zserializowanym formacie (Base64/JSON), który `appium-flutter-driver` może zinterpretować i wykonać wewnątrz maszyny wirtualnej Dart (VM).

### Praktyczne przykłady testów

Opisujemy typowe scenariusze wykorzystujące `appium-flutter-finder` do lokalizowania widżetów, w połączeniu z bezpośrednimi poleceniami rozszerzenia wykonywanymi za pomocą `driver.execute('flutter:<command>')`.

:::info Polecenia rozszerzenia Flutter Driver i findery
`appium-flutter-driver` udostępnia wyspecjalizowane polecenia do interakcji z aplikacjami Flutter, w tym:
- `flutter:waitFor`: Czeka, aż widżet stanie się widoczny.
- `flutter:waitForAbsent`: Czeka, aż widżet zniknie.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: Obsługuje przewijanie w przewijalnych widokach.
- `flutter:setTextEntryEmulation`: Konfiguruje zachowanie wprowadzania tekstu.

Pełną listę dostępnych poleceń, parametrów i typów zwracanych wartości znajdziesz w [dokumentacji poleceń Appium Flutter Driver](https://github.com/appium/appium-flutter-driver#commands), [kodzie źródłowym findera dla Node.js](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) oraz na stronie [appium-flutter-finder w npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### Przykład A — Prosta interakcja (przepływ licznika)

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

### Przykład B — Stabilna nawigacja (unikanie przekroczeń limitu czasu)

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

### Przykład C — Przełączanie kontekstów (natywne okna dialogowe systemu i uprawnienia)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. W kontekście FLUTTER: kliknij widżet, który wywołuje systemowe okno dialogowe z uprawnieniami lub alertem
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. Przełącz się na kontekst NATIVE_APP, aby wejść w interakcję z systemowym oknem dialogowym
        await driver.switchContext('NATIVE_APP');

        // Zlokalizuj i kliknij natywny przycisk przy użyciu standardowych selektorów WebdriverIO
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Przełącz się z powrotem na kontekst FLUTTER, aby kontynuować weryfikację widżetów Fluttera
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## Przepływ budowania i wykonywania

Aby mieć pewność, że ostatnie zmiany w kodzie Dart i kluczach (Key) są widoczne dla testów, zawsze wykonuj następujące kroki:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

Przykłady kodu możesz zobaczyć w repozytorium: https://github.com/webdriverio/appium-boilerplate