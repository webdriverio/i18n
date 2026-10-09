---
id: faq
title: Vanliga frågor
description: "Hitta svar på vanliga frågor om visuell testning, till exempel hur du uppdaterar baslinjer, åtgärdar installationsfel för canvas och uppgraderar till v10."
---

### Behöver jag använda metoderna `save(Screen/Element/FullPageScreen)` när jag vill köra `check(Screen/Element/FullPageScreen)`?

Nej, det behöver du inte. `check(Screen/Element/FullPageScreen)` gör detta automatiskt åt dig.

### Mina visuella tester misslyckas på grund av en skillnad, hur kan jag uppdatera min baslinje?

Du kan uppdatera baslinjebilderna via kommandoraden genom att lägga till argumentet `--update-visual-baseline`. Detta kommer att

-   automatiskt kopiera den faktiska skärmdumpen och placera den i baslinjemappen
-   låta testet passera om det finns skillnader, eftersom baslinjen har uppdaterats

**Användning:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

När loggarna körs i info-/debug-läge ser du följande loggar

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

Det kan hända att felet `Width and height cannot be negative` kastas. I 9 fall av 10 beror detta på att man försöker skapa en bild av ett element som inte är synligt i vyn. Se alltid till att elementet är synligt i vyn innan du försöker skapa en bild av det.

### Installationen av Canvas på Windows misslyckades med Node-Gyp-loggar

Om du stöter på problem med installationen av Canvas på Windows på grund av Node-Gyp-fel, observera att detta endast gäller version 4 och lägre. För att undvika dessa problem kan du uppdatera till version 5 eller högre, som inte har dessa beroenden. Version 5 till 9 använde [Jimp](https://github.com/jimp-dev/jimp) för bildbehandling; version 10 och senare använder [fast-png](https://github.com/image-js/fast-png) och [Pixelmatch](https://github.com/mapbox/pixelmatch) utan några native-beroenden.

Om du ändå behöver lösa problemen med version 4, se:

-   avsnittet om Node Canvas i guiden [Kom igång](/docs/visual-testing#system-requirements)
-   [detta inlägg](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) om att åtgärda Node-Gyp-problem på Windows. (Tack till [IgorSasovets](https://github.com/IgorSasovets))

### Jag uppgraderade till v10, varför misslyckas mina visuella tester?

Jämförelsemotorn byttes från ResembleJS till [Pixelmatch](https://github.com/mapbox/pixelmatch) i v10. Pixelmatch använder en perceptuell (YIQ) färgmodell i stället för rå RGB, så avvikelseprocenten skiljer sig från v9. Dina tester är inte trasiga; baslinjerna behöver bara genereras om en gång. Kör dina tester med `--update-visual-baseline` för att acceptera de nya värdena, eller ta bort din baslinjemapp och låt `autoSaveBaseline` återskapa den.