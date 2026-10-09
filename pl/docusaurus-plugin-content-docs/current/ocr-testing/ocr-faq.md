---
id: ocr-faq
title: Często zadawane pytania
description: "Znajdź odpowiedzi na częste pytania dotyczące wolnych testów OCR, nieodnalezionego tekstu oraz łączenia poleceń OCR ze zwykłymi selektorami."
---

## Moje testy są bardzo wolne

Kiedy korzystasz z `@wdio/ocr-service`, nie robisz tego po to, aby przyspieszyć swoje testy, lecz dlatego, że masz trudności z lokalizowaniem elementów w swojej aplikacji webowej/mobilnej i chcesz łatwiejszego sposobu na ich odnalezienie. Wszyscy zapewne wiemy, że gdy chcemy coś zyskać, tracimy coś innego. **Ale...** istnieje sposób, aby `@wdio/ocr-service` działał szybciej niż zwykle. Więcej informacji na ten temat znajdziesz [tutaj](./more-test-optimization).

## Czy mogę używać poleceń z tej usługi razem z domyślnymi poleceniami/selektorami WebdriverIO?

Tak, możesz łączyć polecenia, aby Twój skrypt był jeszcze potężniejszy! Zalecamy jak najczęstsze korzystanie z domyślnych poleceń/selektorów WebdriverIO i używanie tej usługi tylko wtedy, gdy nie możesz znaleźć unikalnego selektora lub Twój selektor stałby się zbyt kruchy.

## Mój tekst nie został znaleziony, jak to możliwe?

Najpierw ważne jest, aby zrozumieć, jak działa proces OCR w tym module, dlatego przeczytaj [tę](./ocr-testing) stronę. Jeśli nadal nie możesz znaleźć swojego tekstu, możesz spróbować poniższych rozwiązań.

### Obszar obrazu jest zbyt duży

Gdy moduł musi przetworzyć duży obszar zrzutu ekranu, może nie znaleźć tekstu. Możesz wskazać mniejszy obszar, podając haystack podczas używania polecenia. Sprawdź w sekcji [polecenia](./ocr-click-on-text), które polecenia obsługują podawanie haystacka.

### Kontrast między tekstem a tłem jest nieodpowiedni

Oznacza to, że możesz mieć jasny tekst na białym tle lub ciemny tekst na ciemnym tle. Może to skutkować nieodnalezieniem tekstu. W poniższych przykładach widać, że tekst `Why WebdriverIO?` jest biały i otoczony szarym przyciskiem. W tym przypadku tekst `Why WebdriverIO?` nie zostanie znaleziony. Zwiększenie kontrastu dla konkretnego polecenia sprawia, że tekst zostaje znaleziony i można go kliknąć – zobacz drugi obraz.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Przy domyślnym kontraście 0.25 tekst nie zostaje znaleziony
    contrast: 1,
});
```

![Contrast issues](/img/ocr/increased-contrast.jpg)

## Dlaczego mój element zostaje kliknięty, ale klawiatura na moich urządzeniach mobilnych nigdy się nie pojawia?

Może się to zdarzyć w przypadku niektórych pól tekstowych, gdy kliknięcie trwa zbyt długo i jest traktowane jako długie dotknięcie. Aby temu zaradzić, możesz użyć opcji `clickDuration` w [`ocrClickOnText`](./ocr-click-on-text) i [`ocrSetValue`](./ocr-set-value). Zobacz [tutaj](./ocr-click-on-text#options).

## Czy ten moduł może zwracać wiele elementów, tak jak zwykle potrafi to WebdriverIO?

Nie, obecnie nie jest to możliwe. Jeśli moduł znajdzie wiele elementów pasujących do podanego selektora, automatycznie wybierze element o najwyższym wyniku dopasowania.

## Czy mogę w pełni zautomatyzować swoją aplikację za pomocą poleceń OCR udostępnianych przez tę usługę?

Nigdy tego nie robiłem, ale teoretycznie powinno to być możliwe. Daj nam znać, jeśli Ci się to uda ☺️.

## Widzę, że dodawany jest dodatkowy plik o nazwie `{languageCode}.traineddata`, co to jest?

`{languageCode}.traineddata` to plik danych językowych używany przez Tesseract. Zawiera dane treningowe dla wybranego języka, w tym informacje niezbędne do tego, aby Tesseract skutecznie rozpoznawał angielskie znaki i słowa.

### Zawartość `{languageCode}.traineddata`

Plik zazwyczaj zawiera:

1. **Dane zestawu znaków:** Informacje o znakach występujących w języku angielskim.
1. **Model językowy:** Model statystyczny opisujący, jak znaki tworzą słowa, a słowa tworzą zdania.
1. **Ekstraktory cech:** Dane o tym, jak wyodrębniać cechy z obrazów w celu rozpoznawania znaków.
1. **Dane treningowe:** Dane uzyskane z trenowania Tesseracta na dużym zbiorze obrazów z angielskim tekstem.

### Dlaczego `{languageCode}.traineddata` jest ważny?

1. **Rozpoznawanie języka:** Tesseract opiera się na tych plikach z danymi treningowymi, aby dokładnie rozpoznawać i przetwarzać tekst w określonym języku. Bez `{languageCode}.traineddata` Tesseract nie byłby w stanie rozpoznać angielskiego tekstu.
1. **Wydajność:** Jakość i dokładność OCR są bezpośrednio związane z jakością danych treningowych. Korzystanie z właściwego pliku danych treningowych zapewnia możliwie najwyższą dokładność procesu OCR.
1. **Kompatybilność:** Uwzględnienie pliku `{languageCode}.traineddata` w projekcie ułatwia odtworzenie środowiska OCR na różnych systemach lub komputerach członków zespołu.

### Wersjonowanie `{languageCode}.traineddata`

Zaleca się dodanie `{languageCode}.traineddata` do systemu kontroli wersji z następujących powodów:

1. **Spójność:** Zapewnia, że wszyscy członkowie zespołu lub środowiska wdrożeniowe korzystają z dokładnie tej samej wersji danych treningowych, co prowadzi do spójnych wyników OCR w różnych środowiskach.
1. **Powtarzalność:** Przechowywanie tego pliku w systemie kontroli wersji ułatwia odtworzenie wyników podczas uruchamiania procesu OCR w późniejszym terminie lub na innym komputerze.
1. **Zarządzanie zależnościami:** Uwzględnienie go w systemie kontroli wersji pomaga w zarządzaniu zależnościami i gwarantuje, że każda konfiguracja lub ustawienie środowiska zawiera pliki niezbędne do prawidłowego działania projektu.

## Czy istnieje łatwy sposób, aby zobaczyć, jaki tekst został znaleziony na moim ekranie, bez uruchamiania testu?

Tak, możesz w tym celu użyć naszego kreatora CLI. Dokumentację znajdziesz [tutaj](./cli-wizard)