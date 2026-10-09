---
index: 1
id: considerations
title: Uwagi
description: "Poznaj ograniczenia porównywania obrazów, spójności platform, procentów niezgodności oraz przeglądarek bezgłowych, zanim zaczniesz polegać na testach wizualnych."
---

# Kluczowe uwagi dotyczące optymalnego użytkowania

Zanim zagłębisz się w zaawansowane funkcje `@wdio/visual-service`, warto zrozumieć kilka kluczowych kwestii, które pozwolą Ci w pełni wykorzystać możliwości tego narzędzia. Poniższe punkty mają na celu przeprowadzenie Cię przez najlepsze praktyki i typowe pułapki, pomagając osiągnąć dokładne i wydajne wyniki testów wizualnych. Te uwagi to nie tylko zalecenia, ale istotne aspekty, o których należy pamiętać, aby skutecznie korzystać z usługi w rzeczywistych scenariuszach.

## Charakter porównania

-   **Porównanie percepcyjne:** Moduł wykonuje percepcyjne porównanie obrazów piksel po pikselu z wykorzystaniem przestrzeni barw YIQ, która lepiej odpowiada temu, jak ludzie postrzegają różnice kolorów. Niektóre aspekty można dostosować za pomocą [Opcji porównania](./compare-options).
-   **Wpływ aktualizacji przeglądarek:** Pamiętaj, że aktualizacje przeglądarek, takich jak Chrome, mogą wpływać na renderowanie czcionek, co może wymagać aktualizacji obrazów bazowych.

## Spójność platform

-   **Porównywanie identycznych platform:** Upewnij się, że zrzuty ekranu są porównywane w obrębie tej samej platformy. Na przykład zrzut ekranu z Chrome na komputerze Mac nie powinien być porównywany ze zrzutem z Chrome na Ubuntu lub Windows.
-   **Analogia:** Mówiąc najprościej, porównuj _'jabłka z jabłkami, a nie jabłka z Androidami'_.

## Ostrożność z procentem niezgodności

-   **Ryzyko akceptowania niezgodności:** Zachowaj ostrożność przy akceptowaniu procentu niezgodności. Dotyczy to zwłaszcza dużych zrzutów ekranu, w przypadku których zaakceptowanie niezgodności może nieumyślnie spowodować przeoczenie istotnych rozbieżności, takich jak brakujące przyciski lub elementy.

## Symulacja ekranów mobilnych

-   **Unikaj zmiany rozmiaru przeglądarki w celu symulacji urządzeń mobilnych:** Nie próbuj symulować rozmiarów ekranów mobilnych poprzez zmianę rozmiaru przeglądarek desktopowych i traktowanie ich jak przeglądarek mobilnych. Przeglądarki desktopowe, nawet po zmianie rozmiaru, nie odwzorowują dokładnie renderowania rzeczywistych przeglądarek mobilnych.
-   **Autentyczność porównania:** To narzędzie ma na celu porównywanie elementów wizualnych w taki sposób, w jaki widziałby je użytkownik końcowy. Przeglądarka desktopowa o zmienionym rozmiarze nie odzwierciedla rzeczywistego doświadczenia na urządzeniu mobilnym.

## Stanowisko wobec przeglądarek bezgłowych

-   **Niezalecane dla przeglądarek bezgłowych:** Nie zaleca się używania tego modułu z przeglądarkami bezgłowymi (headless). Uzasadnieniem jest to, że użytkownicy końcowi nie korzystają z przeglądarek bezgłowych, w związku z czym problemy wynikające z takiego użycia nie będą objęte wsparciem.