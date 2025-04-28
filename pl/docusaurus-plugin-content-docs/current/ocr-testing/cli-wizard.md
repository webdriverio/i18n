---
id: cli-wizard
title: Kreator CLI
---

Możesz sprawdzić, jaki tekst znajduje się na obrazie bez uruchamiania testu, korzystając z Kreatora CLI OCR. Jedyne, czego potrzebujesz to:

-   zainstalowana zależność `@wdio/ocr-service`, zobacz [Pierwsze kroki](./getting-started)
-   obraz, który chcesz przetworzyć

Następnie uruchom poniższe polecenie, aby uruchomić kreator

```sh
npx ocr-service
```

Uruchomi to kreator, który przeprowadzi Cię przez etapy wyboru obrazu i korzystania z funkcji haystack oraz trybu zaawansowanego. Zadawane są następujące pytania

## W jaki sposób chciałbyś określić plik?

Można wybrać następujące opcje

-   Użyj "eksploratora plików"
-   Wpisz ścieżkę pliku ręcznie

### Użyj "eksploratora plików"

Kreator CLI oferuje opcję korzystania z "eksploratora plików" do wyszukiwania plików w systemie. Rozpoczyna od folderu, z którego wywołujesz polecenie. Po wybraniu obrazu (użyj klawiszy strzałek i klawisza ENTER) przejdziesz do następnego pytania

### Wpisz ścieżkę pliku ręcznie

Jest to bezpośrednia ścieżka do pliku znajdującego się gdzieś na Twoim lokalnym komputerze

### Czy chciałbyś użyć haystack?

Tutaj masz możliwość wybrania obszaru, który ma zostać przetworzony. Może to przyspieszyć proces lub zmniejszyć/zawęzić ilość tekstu, którą silnik OCR może znaleźć. Musisz podać dane `x`, `y`, `width`, `height` na podstawie następujących pytań:

-   Podaj współrzędną x:
-   Podaj współrzędną y:
-   Podaj szerokość:
-   Podaj wysokość:

## Czy chcesz użyć trybu zaawansowanego?

Tryb zaawansowany będzie zawierał dodatkowe funkcje, takie jak:

-   ustawianie kontrastu
-   więcej funkcji pojawi się w przyszłości

## Demo

Oto demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>