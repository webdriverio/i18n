---
id: record
title: Testy rejestrowane
---

Chrome DevTools posiada panel _Rejestrator (Recorder)_, który pozwala użytkownikom nagrywać i odtwarzać zautomatyzowane kroki w Chrome. Te kroki mogą być [eksportowane do testów WebdriverIO za pomocą rozszerzenia](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), co sprawia, że pisanie testów jest bardzo łatwe.

## Czym jest Rejestrator Chrome DevTools

[Rejestrator Chrome DevTools](https://developer.chrome.com/docs/devtools/recorder/) to narzędzie, które pozwala nagrywać i odtwarzać czynności testowe bezpośrednio w przeglądarce, a także eksportować je jako JSON (lub eksportować je jako testy e2e), a także mierzyć wydajność testów.

Narzędzie jest proste w obsłudze, a ponieważ jest zintegrowane z przeglądarką, mamy wygodę niezmiennego kontekstu i nie musimy korzystać z żadnych narzędzi zewnętrznych.

## Jak nagrać test za pomocą Rejestratora Chrome DevTools

Jeśli masz najnowszą wersję Chrome, Rejestrator będzie już zainstalowany i dostępny. Wystarczy otworzyć dowolną stronę internetową, kliknąć prawym przyciskiem myszy i wybrać _"Zbadaj"_. W DevTools możesz otworzyć Rejestrator, naciskając `CMD/Control` + `Shift` + `p` i wpisując _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Aby rozpocząć nagrywanie ścieżki użytkownika, kliknij _"Start new recording"_, nadaj nazwę swojemu testowi, a następnie używaj przeglądarki do nagrania testu:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Następnym krokiem jest kliknięcie _"Replay"_, aby sprawdzić, czy nagranie było udane i wykonuje to, co chciałeś zrobić. Jeśli wszystko jest w porządku, kliknij ikonę [eksportu](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) i wybierz _"Export as a WebdriverIO Test Script"_:

Opcja _"Export as a WebdriverIO Test Script"_ jest dostępna tylko po zainstalowaniu rozszerzenia [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).

![Chrome DevTools Recorder](/img/recorder/export.gif)

To wszystko!

## Eksport nagrania

Jeśli wyeksportowałeś przepływ jako skrypt testowy WebdriverIO, powinien zostać pobrany skrypt, który możesz skopiować i wkleić do swojego zestawu testów. Na przykład powyższe nagranie wygląda następująco:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

Upewnij się, że przejrzysz niektóre lokalizatory i w razie potrzeby zastąp je bardziej odpornymi [typami selektorów](/docs/selectors). Możesz również wyeksportować przepływ jako plik JSON i użyć pakietu [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) do przekształcenia go w rzeczywisty skrypt testowy.

## Następne kroki

Możesz użyć tego przepływu, aby łatwo tworzyć testy dla swoich aplikacji. Rejestrator Chrome DevTools posiada różne dodatkowe funkcje, np.:

- [Symulacja wolnej sieci](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) lub
- [Pomiar wydajności testów](https://developer.chrome.com/docs/devtools/recorder/#measure)

Koniecznie zapoznaj się z ich [dokumentacją](https://developer.chrome.com/docs/devtools/recorder).