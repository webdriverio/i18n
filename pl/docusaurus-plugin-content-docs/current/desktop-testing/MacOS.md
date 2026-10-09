---
id: macos
title: MacOS
description: "Automatyzuj natywne aplikacje macOS za pomocą WebdriverIO, korzystając z Appium i sterownika Mac2, zaczynając od kreatora konfiguracji projektu."
---

WebdriverIO może automatyzować dowolne aplikacje MacOS za pomocą [Appium](https://appium.io/). Wszystko, czego potrzebujesz, to zainstalowany w systemie [XCode](https://developer.apple.com/xcode/), Appium oraz [Mac2 Driver](https://github.com/appium/appium-mac2-driver) zainstalowane jako zależności, a także poprawnie ustawione capabilities.

## Pierwsze kroki

Aby utworzyć nowy projekt WebdriverIO, uruchom:

```sh
npm create wdio@latest ./
```

Kreator instalacji przeprowadzi Cię przez cały proces. Upewnij się, że wybierzesz _"Desktop Testing - of MacOS Applications"_, gdy zostaniesz zapytany, jaki rodzaj testów chcesz przeprowadzać. Następnie po prostu pozostaw wartości domyślne lub zmodyfikuj je według własnych preferencji.

Kreator konfiguracji zainstaluje wszystkie wymagane pakiety Appium i utworzy plik `wdio.conf.js` lub `wdio.conf.ts` z konfiguracją niezbędną do testowania na MacOS. Jeśli zgodziłeś się na automatyczne wygenerowanie plików testowych, możesz uruchomić swój pierwszy test za pomocą `npm run wdio`.

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

__Uwaga:__ aplikacja kalkulatora została otwarta automatycznie na początku sesji, ponieważ `'appium:bundleId': 'com.apple.calculator'` zostało zdefiniowane jako opcja capability. W trakcie sesji możesz w dowolnym momencie przełączać się między aplikacjami.

## Więcej informacji

Aby uzyskać informacje o szczegółach testowania na MacOS, zalecamy zapoznanie się z projektem [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).