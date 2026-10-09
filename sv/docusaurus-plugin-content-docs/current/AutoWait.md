---
id: autowait
title: Automatisk väntan
description: "Förstå hur WebdriverIO automatiskt väntar på att element ska bli interagerbara, när du behöver vänta manuellt och varför implicita timeouts avråds."
---

När du använder ett kommando som direkt interagerar med ett element väntar WebdriverIO automatiskt på att elementet ska vara synligt och interagerbart. Inga manuella väntanden behövs när du använder kommandona (till exempel click, setValue osv.).
Ett element anses vara interagerbart när villkoren för [isClickable](https://webdriver.io/docs/api/element/isClickable) är uppfyllda.

Även om WebdriverIO automatiskt väntar på att element ska bli interagerbara finns det sällsynta fall där du kan behöva vänta manuellt. För dessa sällsynta fall erbjuder vi kommandon som [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Implicita timeouts (rekommenderas inte)

Vi rekommenderar inte att du använder detta, men WebDriver-protokollet erbjuder [implicita timeouts](https://w3c.github.io/webdriver/#timeouts) som gör det möjligt att ange hur länge drivrutinen ska vänta på att ett element ska dyka upp. Som standard är denna timeout satt till `0`, vilket gör att drivrutinen omedelbart returnerar ett `no such element`-fel om ett element inte kunde hittas på sidan. Att öka denna timeout med [`setTimeout`](/docs/api/browser/setTimeout) skulle få drivrutinen att vänta och öka chanserna att elementet till slut dyker upp.

:::note

Läs mer om WebDriver- och ramverksrelaterade timeouts i [guiden om timeouts](/docs/timeouts)

:::