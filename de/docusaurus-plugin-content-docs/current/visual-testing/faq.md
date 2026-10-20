---
id: faq
title: FAQ
description: "Finden Sie Antworten auf häufige Fragen zum visuellen Testen, z. B. zum Aktualisieren von Baselines, zum Beheben von Canvas-Installationsfehlern und zum Upgrade auf v10."
---

### Muss ich die Methoden `save(Screen/Element/FullPageScreen)` verwenden, wenn ich `check(Screen/Element/FullPageScreen)` ausführen möchte?

Nein, das ist nicht nötig. `check(Screen/Element/FullPageScreen)` erledigt das automatisch für Sie.

### Meine visuellen Tests schlagen mit einer Abweichung fehl, wie kann ich meine Baseline aktualisieren?

Sie können die Baseline-Bilder über die Kommandozeile aktualisieren, indem Sie das Argument `--update-visual-baseline` hinzufügen. Dadurch wird

-   automatisch der tatsächlich aufgenommene Screenshot kopiert und im Baseline-Ordner abgelegt
-   bei Abweichungen der Test bestanden, da die Baseline aktualisiert wurde

**Verwendung:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Wenn Sie im Log-Modus info/debug ausführen, werden die folgenden Logs hinzugefügt

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

Es kann vorkommen, dass der Fehler `Width and height cannot be negative` ausgelöst wird. In 9 von 10 Fällen hängt dies damit zusammen, dass ein Bild von einem Element erstellt wird, das sich nicht im sichtbaren Bereich befindet. Stellen Sie daher immer sicher, dass sich das Element im sichtbaren Bereich befindet, bevor Sie versuchen, ein Bild des Elements zu erstellen.

### Installation von Canvas unter Windows mit Node-Gyp-Logs fehlgeschlagen

Wenn Sie aufgrund von Node-Gyp-Fehlern Probleme mit der Canvas-Installation unter Windows haben, beachten Sie bitte, dass dies nur für Version 4 und niedriger gilt. Um diese Probleme zu vermeiden, sollten Sie ein Update auf Version 5 oder höher in Betracht ziehen, die diese Abhängigkeiten nicht hat. Die Versionen 5 bis 9 verwendeten [Jimp](https://github.com/jimp-dev/jimp) für die Bildverarbeitung; ab Version 10 werden [fast-png](https://github.com/image-js/fast-png) und [Pixelmatch](https://github.com/mapbox/pixelmatch) ohne native Abhängigkeiten verwendet.

Wenn Sie die Probleme mit Version 4 dennoch lösen müssen, sehen Sie sich bitte Folgendes an:

-   den Abschnitt zu Node Canvas im Leitfaden [Erste Schritte](/docs/visual-testing#system-requirements)
-   [diesen Beitrag](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) zum Beheben von Node-Gyp-Problemen unter Windows. (Danke an [IgorSasovets](https://github.com/IgorSasovets))

### Ich habe auf v11 aktualisiert, warum hat sich ein Abweichungsprozentsatz geändert?

In v11 ist die Vergleichs-Engine pixelmatch 8, die Farbunterschiede im OKLab-Farbraum mit der HyAB-Distanz statt mit YIQ misst. Die Schwellenwertskala (`0` bis `1`) und die `ignore*`-Voreinstellungen haben sich nicht geändert, aber die Anzahl der abweichenden Pixel kann sich bei denselben Bildern leicht ändern (etwa −3 % bis +3 % bei echten Screenshots). Wenn eine Prüfung von einem exakten Abweichungsprozentsatz oder einer engen Toleranz abhängt, überprüfen Sie sie erneut und aktualisieren Sie die Baseline mit `--update-visual-baseline` nur dann, wenn das neue Ergebnis korrekt ist. Einige Fehlerbehebungen können eine Baseline auch einmalig verändern, zum Beispiel iOS-Element-Screenshots von Elementen, die größer als der Viewport sind und nun keinen schwarzen Bereich mehr aufweisen. Siehe den [v11-Migrationsleitfaden](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md).

### Ich habe auf v10 aktualisiert, warum schlagen meine visuellen Tests fehl?

Die Vergleichs-Engine wurde in v10 von ResembleJS auf [Pixelmatch](https://github.com/mapbox/pixelmatch) umgestellt. Pixelmatch verwendet ein wahrnehmungsbasiertes (YIQ-)Farbmodell statt reinem RGB, daher unterscheiden sich die Abweichungsprozentsätze von v9. Ihre Tests sind nicht kaputt; die Baselines müssen lediglich einmal neu generiert werden. Führen Sie Ihre Tests mit `--update-visual-baseline` aus, um die neuen Werte zu übernehmen, oder löschen Sie Ihren Baseline-Ordner und lassen Sie ihn von `autoSaveBaseline` neu erstellen.