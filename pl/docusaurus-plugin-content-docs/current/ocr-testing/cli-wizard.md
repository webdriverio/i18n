---
id: cli-wizard
title: Kreator CLI
---

Możesz sprawdzić, jaki tekst można znaleźć na obrazie bez uruchamiania testu, korzystając z Kreatora OCR CLI. Jedyne co jest potrzebne to:

-   zainstalowana zależność `@wdio/ocr-service`, zobacz [Pierwsze kroki](./getting-started)
-   obraz, który chcesz przetworzyć

Następnie uruchom poniższe polecenie, aby uruchomić kreator

```sh
npx ocr-service
```

Spowoduje to uruchomienie kreatora, który przeprowadzi Cię przez kroki wyboru obrazu i użycia obszaru wyszukiwania (haystack) oraz trybu zaawansowanego. Zadawane są następujące pytania

## Jak chcesz określić plik?

Można wybrać następujące opcje

-   Użyj "eksploratora plików"
-   Wpisz ścieżkę do pliku ręcznie

### Użyj "eksploratora plików"

Kreator CLI oferuje opcję użycia "eksploratora plików" do wyszukiwania plików w Twoim systemie. Rozpoczyna od folderu, z którego wywołujesz polecenie. Po wybraniu obrazu (użyj klawiszy strzałek i klawisza ENTER) przejdziesz do następnego pytania

### Wpisz ścieżkę do pliku ręcznie

Jest to bezpośrednia ścieżka do pliku znajdującego się gdzieś na Twoim lokalnym komputerze

### Czy chcesz użyć obszaru wyszukiwania (haystack)?

Tutaj masz możliwość wybrania obszaru, który ma zostać przetworzony. Może to przyspieszyć proces lub zmniejszyć/zawęzić ilość tekstu, który silnik OCR może znaleźć. Musisz podać dane `x`, `y`, `width`, `height` na podstawie następujących pytań:

-   Wprowadź współrzędną x:
-   Wprowadź współrzędną y:
-   Wprowadź szerokość:
-   Wprowadź wysokość:

## Czy chcesz użyć trybu zaawansowanego?

Tryb zaawansowany będzie zawierał dodatkowe funkcje, takie jak:

-   ustawianie kontrastu
-   więcej funkcji pojawi się w przyszłości

## Demo

Oto demonstracja

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>