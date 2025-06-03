---
id: macos
title: MacOS
---

WebdriverIO może automatyzować dowolne aplikacje MacOS za pomocą [Appium](https://appium.io/). Wszystko, czego potrzebujesz, to zainstalowany na systemie [XCode](https://developer.apple.com/xcode/), Appium i [Mac2 Driver](https://github.com/appium/appium-mac2-driver) zainstalowane jako zależności oraz poprawnie ustawione capabilities.

## Rozpoczęcie pracy

Aby rozpocząć nowy projekt WebdriverIO, uruchom:

```sh
npm create wdio@latest ./
```

Kreator instalacji przeprowadzi Cię przez proces. Upewnij się, że wybierzesz _"Desktop Testing - of MacOS Applications"_, gdy zapyta Cię, jakiego rodzaju testowanie chcesz wykonać. Następnie po prostu zachowaj domyślne ustawienia lub zmodyfikuj je według swoich preferencji.

Kreator konfiguracji zainstaluje wszystkie wymagane pakiety Appium i utworzy plik `wdio.conf.js` lub `wdio.conf.ts` z niezbędną konfiguracją do testowania na MacOS. Jeśli zgodziłeś się na automatyczne wygenerowanie plików testowych, możesz uruchomić swój pierwszy test za pomocą `npm run wdio`.

<CreateMacOSProjectAnimation />

To wszystko 🎉

## Przykład

Tak może wyglądać prosty test, który otwiera aplikację Kalkulator, wykonuje obliczenie i weryfikuje jego wynik:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__Uwaga:__ aplikacja kalkulatora została automatycznie otwarta na początku sesji, ponieważ `'appium:bundleId': 'com.apple.calculator'` zostało zdefiniowane jako opcja capability. Możesz przełączać aplikacje podczas sesji w dowolnym momencie.

## Więcej informacji

Aby uzyskać informacje na temat specyfiki testowania na MacOS, zalecamy zapoznanie się z projektem [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).