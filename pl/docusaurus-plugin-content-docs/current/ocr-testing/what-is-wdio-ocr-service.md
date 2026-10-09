---
id: ocr-testing
title: Testowanie OCR
description: "Lokalizuj elementy i wchodź z nimi w interakcję na podstawie ich widocznego tekstu w aplikacjach webowych i mobilnych za pomocą usługi OCR, gdy zwykłe selektory nie wystarczają."
---

Automatyczne testowanie natywnych aplikacji mobilnych i stron desktopowych może być szczególnie trudne, gdy mamy do czynienia z elementami, które nie mają unikalnych identyfikatorów. Standardowe [selektory WebdriverIO](https://webdriver.io/docs/selectors) nie zawsze mogą ci pomóc. Wkrocz w świat `@wdio/ocr-service`, potężnej usługi wykorzystującej OCR ([Optyczne Rozpoznawanie Znaków](https://en.wikipedia.org/wiki/Optical_character_recognition)) do wyszukiwania, oczekiwania na elementy ekranowe i interakcji z nimi na podstawie ich **widocznego tekstu**.

Następujące niestandardowe polecenia zostaną udostępnione i dodane do obiektu `browser/driver`, dzięki czemu otrzymasz odpowiedni zestaw narzędzi do wykonania swojej pracy.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Jak to działa

Ta usługa:

1. tworzy zrzut ekranu twojego ekranu/urządzenia. (W razie potrzeby możesz podać haystack, który może być elementem lub obiektem prostokąta, aby wskazać konkretny obszar. Zobacz dokumentację każdego polecenia.)
1. optymalizuje wynik pod kątem OCR, przekształcając zrzut ekranu w czarno-biały obraz o wysokim kontraście (wysoki kontrast jest potrzebny, aby zapobiec dużej ilości szumu tła obrazu. Można to dostosować dla każdego polecenia.)
1. wykorzystuje [Optyczne Rozpoznawanie Znaków](https://en.wikipedia.org/wiki/Optical_character_recognition) z [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract), aby pobrać cały tekst z ekranu i wyróżnić cały znaleziony tekst na obrazie. Obsługuje wiele języków, których listę można znaleźć [tutaj.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. wykorzystuje logikę rozmytą z [Fuse.js](https://fusejs.io/), aby znaleźć ciągi znaków, które są _w przybliżeniu równe_ danemu wzorcowi (a nie dokładnie równe). Oznacza to na przykład, że wartość wyszukiwania `Username` może również znaleźć tekst `Usename` lub odwrotnie.
1. udostępnia kreator CLI (`npx ocr-service`) do weryfikacji obrazów i pobierania tekstu przez terminal

Przykład kroków 1, 2 i 3 można zobaczyć na tym obrazie

![Process steps](/img/ocr/processing-steps.jpg)

Działa bez **ŻADNYCH** zależności systemowych (poza tymi, których używa WebdriverIO), ale w razie potrzeby może również współpracować z lokalną instalacją [Tesseract](https://tesseract-ocr.github.io/tessdoc/), co drastycznie skróci czas wykonywania! (Zobacz także [Optymalizacja wykonywania testów](#test-execution-optimization), aby dowiedzieć się, jak przyspieszyć swoje testy.)

Zainteresowany? Zacznij korzystać z niej już dziś, postępując zgodnie z przewodnikiem [Pierwsze kroki](./getting-started).

:::caution Ważne
Istnieje wiele powodów, dla których możesz nie uzyskać wyników dobrej jakości z Tesseract. Jednym z największych powodów, który może być związany z twoją aplikacją i tym modułem, może być brak odpowiedniego rozróżnienia kolorów między tekstem, który ma zostać znaleziony, a tłem. Na przykład biały tekst na ciemnym tle można _łatwo_ znaleźć, ale jasny tekst na białym tle lub ciemny tekst na ciemnym tle jest trudny do znalezienia.

Zobacz także [tę stronę](https://tesseract-ocr.github.io/tessdoc/ImproveQuality), aby uzyskać więcej informacji od Tesseract.

Nie zapomnij również przeczytać [FAQ](./ocr-faq).
:::