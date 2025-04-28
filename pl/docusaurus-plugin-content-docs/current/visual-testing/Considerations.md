---
index: 1
id: considerations
title: Uwagi
---

# Kluczowe aspekty do optymalnego użytkowania

Przed zagłębieniem się w potężne funkcje `@wdio/visual-service`, kluczowe jest zrozumienie pewnych ważnych aspektów, które zapewnią maksymalne wykorzystanie tego narzędzia. Poniższe punkty mają na celu przeprowadzenie Cię przez najlepsze praktyki i częste pułapki, pomagając Ci osiągnąć dokładne i wydajne wyniki testów wizualnych. Te uwagi to nie tylko zalecenia, ale istotne aspekty, które należy mieć na uwadze, aby skutecznie korzystać z usługi w rzeczywistych scenariuszach.

## Natura porównania

-   **Porównanie piksel po pikselu:** Moduł wykonuje porównanie obrazów piksel po pikselu. Chociaż pewne aspekty można dostosować (patrz Opcje porównania), podstawowym podejściem pozostaje proste porównanie pikseli.
-   **Wpływ aktualizacji przeglądarek:** Miej świadomość, że aktualizacje przeglądarek, takich jak Chrome, mogą wpływać na renderowanie czcionek, potencjalnie wymagając aktualizacji bazowych obrazów.

## Spójność platform

-   **Porównywanie identycznych platform:** Upewnij się, że zrzuty ekranu są porównywane w obrębie tej samej platformy. Na przykład, zrzut ekranu z Chrome na Macu nie powinien być używany do porównania z Chrome na Ubuntu lub Windows.
-   **Analogia:** Mówiąc prościej, porównuj _'Jabłka z Jabłkami, a nie Jabłka z Androidami'_.

## Ostrożność z procentem niezgodności

-   **Ryzyko akceptowania niezgodności:** Zachowaj ostrożność przy akceptowaniu procentu niezgodności. Jest to szczególnie ważne dla dużych zrzutów ekranu, gdzie akceptacja niezgodności może nieumyślnie pominąć istotne rozbieżności, takie jak brakujące przyciski lub elementy.

## Symulacja ekranu mobilnego

-   **Unikaj zmiany rozmiaru przeglądarki dla symulacji mobilnej:** Nie próbuj symulować rozmiarów ekranów mobilnych poprzez zmianę rozmiaru przeglądarek desktopowych i traktowanie ich jako przeglądarek mobilnych. Przeglądarki desktopowe, nawet po zmianie rozmiaru, nie odtwarzają dokładnie renderowania rzeczywistych przeglądarek mobilnych.
-   **Autentyczność w porównaniu:** To narzędzie ma na celu porównanie wizualizacji tak, jak wyglądałyby dla użytkownika końcowego. Zmieniona rozmiarowo przeglądarka desktopowa nie odzwierciedla prawdziwego doświadczenia na urządzeniu mobilnym.

## Stanowisko wobec przeglądarek bezgłowych

-   **Niezalecane dla przeglądarek bezgłowych:** Korzystanie z tego modułu z przeglądarkami bezgłowymi nie jest zalecane. Uzasadnieniem jest to, że użytkownicy końcowi nie korzystają z przeglądarek bezgłowych, dlatego problemy wynikające z takiego użycia nie będą wspierane.