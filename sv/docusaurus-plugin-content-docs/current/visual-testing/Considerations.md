---
index: 1
id: considerations
title: Överväganden
---

# Viktiga överväganden för optimal användning

Innan du dyker in i de kraftfulla funktionerna i `@wdio/visual-service`, är det avgörande att förstå några viktiga överväganden som säkerställer att du får ut det mesta av detta verktyg. Följande punkter är utformade för att guida dig genom bästa praxis och vanliga fallgropar, vilket hjälper dig att uppnå noggranna och effektiva resultat vid visuell testning. Dessa överväganden är inte bara rekommendationer, utan väsentliga aspekter att ha i åtanke för att effektivt använda tjänsten i verkliga scenarier.

## Jämförelsens natur

-   **Pixel-för-pixel-basis:** Modulen utför en pixel-för-pixel-jämförelse av bilder. Även om vissa aspekter kan justeras (se Jämförelsealternativ), så förblir kärnmetoden en grundläggande pixeljämförelse.
-   **Påverkan av webbläsaruppdateringar:** Var medveten om att uppdateringar av webbläsare, som Chrome, kan påverka teckensnittåtergivning, vilket potentiellt kräver en uppdatering av dina referensbilder.

## Konsekvens i plattformar

-   **Jämföra identiska plattformar:** Se till att skärmdumpar jämförs inom samma plattform. Till exempel bör en skärmdump från Chrome på en Mac inte användas för att jämföra med en från Chrome på Ubuntu eller Windows.
-   **Analogi:** För att uttrycka det enkelt, jämför _'Äpplen med äpplen, inte äpplen med androider'_.

## Försiktighet med misspassningsprocent

-   **Risk för att acceptera misspassningar:** Var försiktig när du accepterar en misspassningsprocent. Detta är särskilt viktigt för stora skärmdumpar, där accepterande av en misspassning oavsiktligt kan förbise betydande avvikelser, som saknade knappar eller element.

## Simulering av mobilskärm

-   **Undvik webbläsarändring av storlek för mobilsimulering:** Försök inte simulera mobilskärmstorlekar genom att ändra storlek på skrivbordswebbläsare och behandla dem som mobilwebbläsare. Skrivbordswebbläsare, även när de ändras i storlek, replikerar inte korrekt renderingen av faktiska mobilwebbläsare.
-   **Autenticitet i jämförelse:** Detta verktyg syftar till att jämföra visuella element som de skulle visas för en slutanvändare. En storleksändrad skrivbordswebbläsare speglar inte den verkliga upplevelsen på en mobil enhet.

## Ställningstagande om headless-webbläsare

-   **Rekommenderas inte för headless-webbläsare:** Användning av denna modul med headless-webbläsare rekommenderas inte. Motiveringen är att slutanvändare inte interagerar med headless-webbläsare, och därför kommer problem som uppstår vid sådan användning inte att stödjas.