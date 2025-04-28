---
id: autowait
title: Automatyczne oczekiwanie
---

Podczas używania polecenia, które bezpośrednio wchodzi w interakcję z elementem, WebdriverIO automatycznie poczeka, aż element będzie widoczny i interaktywny, nie są potrzebne ręczne oczekiwania podczas korzystania z tych poleceń (np. click, setValue itp.).
Element jest uważany za interaktywny, gdy spełnione są warunki dla [isClickable](https://webdriver.io/docs/api/element/isClickable).

Chociaż WebdriverIO automatycznie czeka, aż elementy staną się interaktywne, istnieją rzadkie przypadki, w których może być konieczne ręczne oczekiwanie. Dla tych rzadkich przypadków oferujemy polecenia takie jak [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Timeouty domyślne (niezalecane)

Chociaż nie zalecamy ich używania, protokół WebDriver oferuje [timeouty domyślne](https://w3c.github.io/webdriver/#timeouts), które pozwalają określić, jak długo sterownik ma czekać na pojawienie się elementu. Domyślnie ten timeout jest ustawiony na `0`, co sprawia, że sterownik natychmiast zwraca błąd `no such element`, jeśli element nie został znaleziony na stronie. Zwiększenie tego timeoutu za pomocą [`setTimeout`](/docs/api/browser/setTimeout) spowoduje, że sterownik będzie czekał i zwiększy szanse, że element w końcu się pojawi.

:::note

Przeczytaj więcej o timeoutach związanych z WebDriver i frameworkiem w [przewodniku po timeoutach](/docs/timeouts)

:::