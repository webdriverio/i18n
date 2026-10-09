---
id: writing-tests
title: Skriva tester
description: "Skriv WebdriverIO-tester för Flutter-appar genom att byta till Flutter-kontexten och interagera med widgets via flutter_driver-tillägget."
---

Det här avsnittet beskriver den praktiska strukturen för att skapa automatiserade testscenarier och hur du interagerar direkt med Flutters interna komponentträd med hjälp av WebdriverIO.

### Varför är kontextbyte nödvändigt?

När en automatiseringssession startas med Appium börjar drivrutinen med att mappa operativsystemets inbyggda kontext, kallad `NATIVE_APP`. Den här kontexten kan bara se det inbyggda skalet som omsluter applikationen (till exempel systemets statusfält eller inbyggda Android/iOS-dialogrutor).

Eftersom Flutter renderar sitt användargränssnitt inuti en isolerad Canvas är de interna elementen osynliga i `NATIVE_APP`-kontexten. För att skicka kommandon direkt till Flutters testtillägg (`flutter_driver`) måste vi uttryckligen byta automatiseringsfokus till `FLUTTER`-kontexten. Utan detta byte kommer varje försök att hitta en widget att resultera i ett fel om att elementet inte hittades.

:::tip Bästa praxis: Byt alltid kontext i `beforeEach`
Det är rekommenderad bästa praxis att inkludera `await driver.switchContext('FLUTTER')` i en `beforeEach`-hook i varje testfil. Detta säkerställer att varje test börjar köras i `FLUTTER`-kontexten, vilket undviker instabilitet eller tillståndsläckage om ett tidigare test bytte till `NATIVE_APP` (t.ex. för att hantera behörighetsdialogrutor i operativsystemet) eller om en session återställer den aktiva kontexten.
:::

### Varför är `appium-flutter-finder` nödvändigt?

Traditionella WebdriverIO-selektorer, som `$('~selector')` eller `$('#id')`, är utformade för att hitta element med strategier avsedda för webben eller inbyggda mobilgränssnitt (såsom resurs-ID:n eller XPath).

Flutter hanterar sina egna interna element och använder egna sökmetoder (såsom `byValueKey`, `byText`, `byType`). Biblioteket `appium-flutter-finder` behövs eftersom det fungerar som en översättare: det exponerar dessa Flutter-specifika lokaliseringsstrategier i ett serialiserat format (Base64/JSON) som `appium-flutter-driver` kan tolka och köra inuti Dart Virtual Machine (VM).

### Praktiska testexempel

Vi dokumenterar vanliga scenarier där `appium-flutter-finder` används för att hitta widgets, kombinerat med direkta tilläggskommandon som körs via `driver.execute('flutter:<command>')`.

:::info Kommandon och finders i Flutter Driver-tillägget
`appium-flutter-driver` tillhandahåller specialiserade kommandon för att interagera med Flutter-applikationer, bland annat:
- `flutter:waitFor`: Väntar på att en widget ska bli synlig.
- `flutter:waitForAbsent`: Väntar på att en widget ska försvinna.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: Hanterar rullning i rullningsbara vyer.
- `flutter:setTextEntryEmulation`: Konfigurerar beteendet för textinmatning.

För den fullständiga listan över tillgängliga kommandon, parametrar och returtyper, se [Appium Flutter Driver Commands Documentation](https://github.com/appium/appium-flutter-driver#commands), [källkoden för Node.js Finder](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) och [appium-flutter-finder på npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### Exempel A — Enkel interaktion (räknarflöde)

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

### Exempel B — Stabil navigering (undvika timeouts)

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

### Exempel C — Byta kontexter (inbyggda OS-dialogrutor och behörigheter)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. I FLUTTER-kontexten: klicka på en widget som utlöser en behörighets- eller varningsdialogruta på OS-nivå
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. Byt till NATIVE_APP-kontexten för att interagera med OS-dialogrutan
        await driver.switchContext('NATIVE_APP');

        // Hitta och klicka på den inbyggda knappen med vanliga WebdriverIO-selektorer
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Byt tillbaka till FLUTTER-kontexten för att fortsätta verifiera Flutter-widgets
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## Bygg- och körflöde

För att säkerställa att dina senaste ändringar i Dart-koden och dina Keys är synliga för testerna ska du alltid följa dessa steg:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

Du kan se kodexemplen i repositoryt: https://github.com/webdriverio/appium-boilerplate