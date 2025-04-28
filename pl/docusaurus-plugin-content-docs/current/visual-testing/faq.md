---
id: faq
title: FAQ (Często zadawane pytania)
---

### Czy muszę używać metod `save(Screen/Element/FullPageScreen)`, gdy chcę uruchomić `check(Screen/Element/FullPageScreen)`?

Nie, nie musisz tego robić. Metoda `check(Screen/Element/FullPageScreen)` zrobi to automatycznie za ciebie.

### Moje testy wizualne nie przechodzą z powodu różnicy, jak mogę zaktualizować mój baseline?

Możesz zaktualizować obrazy bazowe przez wiersz poleceń, dodając argument `--update-visual-baseline`. Spowoduje to:

-   automatyczne skopiowanie aktualnie wykonanego zrzutu ekranu i umieszczenie go w folderze baseline
-   jeśli są różnice, test zostanie zaliczony, ponieważ baseline został zaktualizowany

**Użycie:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Podczas uruchamiania logów w trybie info/debug zobaczysz następujące logi

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### Width and height cannot be negative

Może pojawić się błąd `Width and height cannot be negative`. W 9 na 10 przypadków jest to związane z tworzeniem obrazu elementu, który nie jest widoczny w widoku. Upewnij się zawsze, że element jest widoczny w widoku, zanim spróbujesz wykonać jego obraz.

### Instalacja Canvas w systemie Windows nie powiodła się z logami Node-Gyp

Jeśli napotkasz problemy z instalacją Canvas w systemie Windows z powodu błędów Node-Gyp, pamiętaj, że dotyczy to tylko wersji 4 i niższych. Aby uniknąć tych problemów, rozważ aktualizację do wersji 5 lub wyższej, która nie ma tych zależności i używa [Jimp](https://github.com/jimp-dev/jimp) do przetwarzania obrazów.

Jeśli nadal musisz rozwiązać problemy z wersją 4, sprawdź:

-   sekcję Node Canvas w przewodniku [Pierwsze kroki](/docs/visual-testing#system-requirements)
-   [ten post](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) dotyczący rozwiązywania problemów z Node-Gyp w systemie Windows. (Dzięki dla [IgorSasovets](https://github.com/IgorSasovets))