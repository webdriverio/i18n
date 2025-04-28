---
id: ocr-testing
title: Testowanie OCR
---

Automatyczne testy na natywnych aplikacjach mobilnych i stronach desktopowych mogą być szczególnie trudne, gdy mamy do czynienia z elementami pozbawionymi unikalnych identyfikatorów. Standardowe [selektory WebdriverIO](https://webdriver.io/docs/selectors) nie zawsze mogą Ci pomóc. Wkrocz w świat `@wdio/ocr-service`, potężnej usługi wykorzystującej OCR ([Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition)) do wyszukiwania, oczekiwania i interakcji z elementami na ekranie na podstawie ich **widocznego tekstu**.

Następujące niestandardowe polecenia zostaną udostępnione i dodane do obiektu `browser/driver`, dzięki czemu otrzymasz odpowiedni zestaw narzędzi do wykonania swojej pracy.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Jak to działa

Ta usługa:

1. tworzy zrzut ekranu twojego ekranu/urządzenia. (W razie potrzeby możesz dostarczyć tzw. haystack, który może być elementem lub obiektem prostokątnym, aby wskazać określony obszar. Zobacz dokumentację dla każdego polecenia.)
1. optymalizuje wynik dla OCR, przekształcając zrzut ekranu w czarno-biały obraz o wysokim kontraście (wysoki kontrast jest potrzebny, aby zapobiec dużej ilości szumów tła obrazu. Można to dostosować dla każdego polecenia.)
1. wykorzystuje [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) z [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) do pobrania całego tekstu z ekranu i podświetlenia całego znalezionego tekstu na obrazie. Może obsługiwać kilka języków, które można znaleźć [tutaj.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. wykorzystuje logikę rozmytą z [Fuse.js](https://fusejs.io/) do znajdowania ciągów, które są _w przybliżeniu równe_ danemu wzorcowi (a nie dokładnie). Oznacza to na przykład, że wartość wyszukiwania `Username` może również znaleźć tekst `Usename` lub odwrotnie.
1. Dostarcza kreator CLI (`npx ocr-service`) do walidacji obrazów i pobierania tekstu przez terminal

Przykład kroków 1, 2 i 3 można znaleźć na tym obrazku

![Process steps](/img/ocr/processing-steps.jpg)

Działa bez ŻADNYCH zależności systemowych (poza tym, co wykorzystuje WebdriverIO), ale w razie potrzeby może również działać z lokalną instalacją [Tesseract](https://tesseract-ocr.github.io/tessdoc/), co drastycznie skróci czas wykonania! (Zobacz także [Optymalizację wykonania testów](#test-execution-optimization), aby dowiedzieć się, jak przyspieszyć testy.)

Jesteś entuzjastą? Zacznij korzystać już dziś, postępując zgodnie z przewodnikiem [Pierwsze kroki](./getting-started).

:::caution Ważne
Istnieje wiele powodów, dla których możesz nie uzyskać dobrej jakości wyników z Tesseract. Jednym z największych powodów, które mogą być związane z Twoją aplikacją i tym modułem, może być fakt, że nie ma odpowiedniego rozróżnienia kolorów między tekstem, który ma zostać znaleziony, a tłem. Na przykład biały tekst na ciemnym tle może być _łatwo_ znaleziony, ale jasny tekst na białym tle lub ciemny tekst na ciemnym tle jest trudny do znalezienia.

Zobacz także [tę stronę](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) aby uzyskać więcej informacji od Tesseract.

Nie zapomnij również przeczytać [FAQ](./ocr-faq).
:::