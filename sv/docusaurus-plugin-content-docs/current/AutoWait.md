---
id: autowait
title: Automatisk väntan
---

När du använder ett kommando som direkt interagerar med ett element kommer WebdriverIO automatiskt att vänta på att elementet blir synligt och interagerbart, inga manuella väntetider behövs när du använder kommandona (tänk på click, setValue etc).
Ett element anses vara interagerbart när villkoren för [isClickable](https://webdriver.io/docs/api/element/isClickable) är uppfyllda.

Medan WebdriverIO automatiskt väntar på att element ska bli interagerbara finns det sällsynta fall där du kan behöva vänta manuellt. För dessa sällsynta fall erbjuder vi kommandon som [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Implicita tidsgränser (rekommenderas inte)

Även om vi inte rekommenderar att använda detta, erbjuder WebDriver-protokollet [implicita tidsgränser](https://w3c.github.io/webdriver/#timeouts) som gör det möjligt att specificera hur länge drivrutinen ska vänta på att ett element ska visas. Som standard är denna tidsgräns inställd på `0` och gör därför att drivrutinen returnerar med ett `no such element`-fel omedelbart om ett element inte kunde hittas på sidan. Att öka denna tidsgräns med [`setTimeout`](/docs/api/browser/setTimeout) skulle få drivrutinen att vänta och ökar chanserna att elementet så småningom visas.

:::note

Läs mer om WebDriver och ramverksrelaterade tidsgränser i [timeouts-guiden](/docs/timeouts)

:::