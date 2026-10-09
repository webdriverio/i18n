---
id: cli-wizard
title: Kreator CLI
description: "Sprawdź, jaki tekst usługa OCR może znaleźć na obrazie, bez uruchamiania testu, korzystając z kreatora OCR CLI."
---

Możesz sprawdzić, jaki tekst można znaleźć na obrazie, bez uruchamiania testu, korzystając z kreatora OCR CLI. Potrzebujesz jedynie:

-   zainstalowanego pakietu `@wdio/ocr-service` jako zależności, zobacz [Pierwsze kroki](./getting-started)
-   obrazu, który chcesz przetworzyć

Następnie uruchom poniższe polecenie, aby uruchomić kreator

```sh
npx ocr-service
```

Spowoduje to uruchomienie kreatora, który przeprowadzi Cię przez kolejne kroki wyboru obrazu oraz użycia haystacka i trybu zaawansowanego. Zadawane są następujące pytania

## How would you like to specify the file?

Można wybrać jedną z następujących opcji

-   Use a "file explorer"
-   Type the file path manually

### Use a "file explorer"

Kreator CLI udostępnia opcję użycia „eksploratora plików” do wyszukiwania plików w systemie. Rozpoczyna on od folderu, z którego wywołujesz polecenie. Po wybraniu obrazu (użyj klawiszy strzałek i klawisza ENTER) przejdziesz do następnego pytania

### Type the file path manually

Jest to bezpośrednia ścieżka do pliku znajdującego się gdzieś na Twoim komputerze

### Would you like to use a haystack?

Tutaj masz możliwość wybrania obszaru, który ma zostać przetworzony. Może to przyspieszyć proces lub ograniczyć/zawęzić ilość tekstu, jaką może znaleźć silnik OCR. Musisz podać dane `x`, `y`, `width`, `height` w odpowiedzi na następujące pytania:

-   Enter the x coordinate:
-   Enter the y coordinate:
-   Enter the width:
-   Enter the height:

## Do you want to use the advanced mode?

Tryb zaawansowany zawiera dodatkowe funkcje, takie jak:

-   ustawianie kontrastu
-   więcej w przyszłości

## Demo

Oto demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>