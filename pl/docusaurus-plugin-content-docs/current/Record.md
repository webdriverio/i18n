---
id: record
title: Nagrywanie testów
description: "Nagrywaj ścieżki użytkownika za pomocą Chrome DevTools Recorder i eksportuj je jako testy WebdriverIO."
---

Chrome DevTools posiada panel _Recorder_, który pozwala użytkownikom nagrywać i odtwarzać zautomatyzowane kroki w przeglądarce Chrome. Kroki te można [wyeksportować do testów WebdriverIO za pomocą rozszerzenia](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), co sprawia, że pisanie testów jest bardzo łatwe.

## Czym jest Chrome DevTools Recorder

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) to narzędzie, które pozwala nagrywać i odtwarzać akcje testowe bezpośrednio w przeglądarce, a także eksportować je jako JSON (lub eksportować je jako test e2e) oraz mierzyć wydajność testów.

Narzędzie jest proste w obsłudze, a ponieważ jest wbudowane w przeglądarkę, mamy tę wygodę, że nie musimy zmieniać kontekstu ani korzystać z żadnego narzędzia zewnętrznego.

## Jak nagrać test za pomocą Chrome DevTools Recorder

Jeśli masz najnowszą wersję Chrome, Recorder jest już zainstalowany i dostępny. Wystarczy otworzyć dowolną stronę internetową, kliknąć prawym przyciskiem myszy i wybrać _"Zbadaj"_. W DevTools możesz otworzyć Recorder, naciskając `CMD/Control` + `Shift` + `p` i wpisując _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Aby rozpocząć nagrywanie ścieżki użytkownika, kliknij _"Start new recording"_, nadaj testowi nazwę, a następnie użyj przeglądarki, aby nagrać test:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

W następnym kroku kliknij _"Replay"_, aby sprawdzić, czy nagrywanie zakończyło się powodzeniem i robi to, co chciałeś. Jeśli wszystko jest w porządku, kliknij ikonę [eksportu](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) i wybierz _"Export as a WebdriverIO Test Script"_:

Opcja _"Export as a WebdriverIO Test Script"_ jest dostępna tylko wtedy, gdy zainstalujesz rozszerzenie [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).


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

Upewnij się, że przejrzysz niektóre lokatory i w razie potrzeby zastąpisz je bardziej niezawodnymi [typami selektorów](/docs/selectors). Możesz także wyeksportować przepływ jako plik JSON i użyć pakietu [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder), aby przekształcić go w rzeczywisty skrypt testowy.

## Kolejne kroki

Możesz użyć tego przepływu, aby łatwo tworzyć testy dla swoich aplikacji. Chrome DevTools Recorder oferuje wiele dodatkowych funkcji, np.:

- [Symulowanie wolnej sieci](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) lub
- [Mierzenie wydajności testów](https://developer.chrome.com/docs/devtools/recorder/#measure)

Koniecznie zapoznaj się z ich [dokumentacją](https://developer.chrome.com/docs/devtools/recorder).