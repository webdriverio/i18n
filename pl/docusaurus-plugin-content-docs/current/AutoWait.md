---
id: autowait
title: Automatyczne oczekiwanie
description: "Dowiedz się, jak WebdriverIO automatycznie czeka, aż elementy staną się interaktywne, kiedy należy czekać ręcznie i dlaczego niejawne limity czasu są odradzane."
---

Podczas używania polecenia, które bezpośrednio wchodzi w interakcję z elementem, WebdriverIO automatycznie poczeka, aż element będzie widoczny i interaktywny, więc przy korzystaniu z tych poleceń (np. click, setValue itp.) nie są potrzebne ręczne oczekiwania.
Element jest uważany za interaktywny, gdy spełnione są warunki dla [isClickable](https://webdriver.io/docs/api/element/isClickable).

Chociaż WebdriverIO automatycznie czeka, aż elementy staną się interaktywne, istnieją rzadkie przypadki, w których może być konieczne ręczne oczekiwanie. Na takie rzadkie przypadki oferujemy polecenia takie jak [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Niejawne limity czasu (niezalecane)

Choć nie zalecamy korzystania z tego rozwiązania, protokół WebDriver oferuje [niejawne limity czasu](https://w3c.github.io/webdriver/#timeouts), które pozwalają określić, jak długo sterownik ma czekać na pojawienie się elementu. Domyślnie ten limit czasu jest ustawiony na `0`, przez co sterownik natychmiast zwraca błąd `no such element`, jeśli element nie zostanie znaleziony na stronie. Zwiększenie tego limitu czasu za pomocą [`setTimeout`](/docs/api/browser/setTimeout) sprawi, że sterownik będzie czekał, co zwiększa szanse, że element ostatecznie się pojawi.

:::note

Przeczytaj więcej o limitach czasu związanych z WebDriver i frameworkiem w [przewodniku po limitach czasu](/docs/timeouts)

:::