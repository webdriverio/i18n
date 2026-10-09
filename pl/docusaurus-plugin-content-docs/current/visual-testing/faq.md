---
id: faq
title: FAQ
description: "Znajdź odpowiedzi na często zadawane pytania dotyczące testów wizualnych, takie jak aktualizacja obrazów bazowych, naprawianie błędów instalacji canvas oraz aktualizacja do wersji v10."
---

### Czy muszę używać metod `save(Screen/Element/FullPageScreen)`, gdy chcę uruchomić `check(Screen/Element/FullPageScreen)`?

Nie, nie musisz tego robić. Metoda `check(Screen/Element/FullPageScreen)` zrobi to za Ciebie automatycznie.

### Moje testy wizualne kończą się niepowodzeniem z powodu różnic, jak mogę zaktualizować obraz bazowy?

Możesz zaktualizować obrazy bazowe z poziomu wiersza poleceń, dodając argument `--update-visual-baseline`. Spowoduje to, że

-   aktualnie wykonany zrzut ekranu zostanie automatycznie skopiowany i umieszczony w folderze z obrazami bazowymi
-   jeśli wystąpią różnice, test zakończy się powodzeniem, ponieważ obraz bazowy został zaktualizowany

**Użycie:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Podczas uruchamiania w trybie logowania info/debug zobaczysz następujące dodatkowe logi

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

Może się zdarzyć, że zostanie zgłoszony błąd `Width and height cannot be negative`. W 9 na 10 przypadków jest to związane z tworzeniem obrazu elementu, który nie znajduje się w widoku. Zawsze upewnij się, że element jest widoczny w widoku, zanim spróbujesz utworzyć jego obraz.

### Instalacja Canvas w systemie Windows nie powiodła się z logami Node-Gyp

Jeśli napotkasz problemy z instalacją Canvas w systemie Windows z powodu błędów Node-Gyp, pamiętaj, że dotyczy to tylko wersji 4 i starszych. Aby uniknąć tych problemów, rozważ aktualizację do wersji 5 lub nowszej, która nie ma tych zależności. Wersje od 5 do 9 korzystały z [Jimp](https://github.com/jimp-dev/jimp) do przetwarzania obrazów; wersja 10 i nowsze korzystają z [fast-png](https://github.com/image-js/fast-png) oraz [Pixelmatch](https://github.com/mapbox/pixelmatch) bez natywnych zależności.

Jeśli nadal musisz rozwiązać problemy z wersją 4, sprawdź:

-   sekcję Node Canvas w przewodniku [Pierwsze kroki](/docs/visual-testing#system-requirements)
-   [ten wpis](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) dotyczący naprawiania problemów z Node-Gyp w systemie Windows. (Podziękowania dla [IgorSasovets](https://github.com/IgorSasovets))

### Zaktualizowałem do wersji v10, dlaczego moje testy wizualne kończą się niepowodzeniem?

W wersji v10 silnik porównywania zmienił się z ResembleJS na [Pixelmatch](https://github.com/mapbox/pixelmatch). Pixelmatch wykorzystuje percepcyjny model kolorów (YIQ) zamiast surowego RGB, więc procentowe wartości niezgodności różnią się od tych z wersji v9. Twoje testy nie są zepsute; obrazy bazowe trzeba po prostu jednorazowo wygenerować ponownie. Uruchom testy z argumentem `--update-visual-baseline`, aby zaakceptować nowe wartości, lub usuń folder z obrazami bazowymi i pozwól, aby `autoSaveBaseline` utworzył go ponownie.