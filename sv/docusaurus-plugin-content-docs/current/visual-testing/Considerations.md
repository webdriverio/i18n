---
index: 1
id: considerations
title: Överväganden
description: "Förstå begränsningarna med bildjämförelse, plattformskonsekvens, procentuella avvikelser och headless-webbläsare innan du förlitar dig på visuella tester."
---

# Viktiga överväganden för optimal användning

Innan du dyker in i de kraftfulla funktionerna i `@wdio/visual-service` är det viktigt att förstå några centrala överväganden som säkerställer att du får ut det mesta av detta verktyg. Följande punkter är utformade för att vägleda dig genom bästa praxis och vanliga fallgropar, och hjälpa dig att uppnå korrekta och effektiva resultat vid visuell testning. Dessa överväganden är inte bara rekommendationer, utan viktiga aspekter att ha i åtanke för att effektivt använda tjänsten i verkliga scenarier.

## Jämförelsens natur

-   **Perceptuell jämförelse:** Modulen utför en perceptuell pixeljämförelse av bilder med hjälp av färgrymden YIQ, som bättre överensstämmer med hur människor uppfattar färgskillnader. Vissa aspekter kan justeras via [Jämförelsealternativ](./compare-options).
-   **Påverkan av webbläsaruppdateringar:** Var medveten om att uppdateringar av webbläsare, som Chrome, kan påverka typsnittsrenderingen, vilket potentiellt kan kräva att du uppdaterar dina baslinjebilder.

## Konsekvens mellan plattformar

-   **Jämföra identiska plattformar:** Se till att skärmdumpar jämförs inom samma plattform. Till exempel bör en skärmdump från Chrome på en Mac inte användas för att jämföras med en från Chrome på Ubuntu eller Windows.
-   **Analogi:** Enkelt uttryckt, jämför _'äpplen med äpplen, inte äpplen med Androids'_.

## Försiktighet med procentuell avvikelse

-   **Risk med att acceptera avvikelser:** Var försiktig när du accepterar en procentuell avvikelse. Detta gäller särskilt för stora skärmdumpar, där en accepterad avvikelse oavsiktligt kan leda till att betydande skillnader förbises, såsom saknade knappar eller element.

## Simulering av mobilskärmar

-   **Undvik att ändra webbläsarstorlek för mobilsimulering:** Försök inte simulera mobila skärmstorlekar genom att ändra storlek på skrivbordswebbläsare och behandla dem som mobila webbläsare. Skrivbordswebbläsare, även när storleken ändrats, återger inte renderingen i faktiska mobila webbläsare korrekt.
-   **Autenticitet i jämförelsen:** Detta verktyg syftar till att jämföra det visuella så som det skulle se ut för en slutanvändare. En skrivbordswebbläsare med ändrad storlek återspeglar inte den verkliga upplevelsen på en mobil enhet.

## Hållning till headless-webbläsare

-   **Rekommenderas inte för headless-webbläsare:** Användning av denna modul med headless-webbläsare avråds. Anledningen är att slutanvändare inte interagerar med headless-webbläsare, och därför kommer problem som uppstår vid sådan användning inte att få support.