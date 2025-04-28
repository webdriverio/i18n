---
id: faq
title: Vanliga frågor
---

### Behöver jag använda metoderna `save(Screen/Element/FullPageScreen)` när jag vill köra `check(Screen/Element/FullPageScreen)`?

Nej, du behöver inte göra detta. Metoden `check(Screen/Element/FullPageScreen)` gör detta automatiskt åt dig.

### Mina visuella tester misslyckas med en skillnad, hur kan jag uppdatera min baseline?

Du kan uppdatera baseline-bilderna via kommandoraden genom att lägga till argumentet `--update-visual-baseline`. Detta kommer att

-   automatiskt kopiera den faktiska skärmbilden och placera den i baseline-mappen
-   om det finns skillnader kommer det att låta testet passera eftersom baseline har uppdaterats

**Användning:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

När du kör loggar i info/debug-läge kommer du att se följande loggar läggas till

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### Width and height cannot be negative

Det kan hända att felet `Width and height cannot be negative` kastas. 9 av 10 gånger beror detta på att man skapar en bild av ett element som inte är i vyn. Se till att du alltid ser till att elementet är i vyn innan du försöker skapa en bild av elementet.

### Installation av Canvas på Windows misslyckades med Node-Gyp loggar

Om du stöter på problem med Canvas-installation på Windows på grund av Node-Gyp-fel, observera att detta endast gäller för Version 4 och lägre. För att undvika dessa problem, överväg att uppdatera till Version 5 eller högre, som inte har dessa beroenden och använder [Jimp](https://github.com/jimp-dev/jimp) för bildbehandling.

Om du fortfarande behöver lösa problemen med Version 4, vänligen kontrollera:

-   Node Canvas-avsnittet i [Komma igång](/docs/visual-testing#system-requirements) guiden
-   [detta inlägg](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) för att åtgärda Node-Gyp-problem på Windows. (Tack till [IgorSasovets](https://github.com/IgorSasovets))