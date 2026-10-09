---
id: faq
title: FAQ
description: "Finden Sie Antworten auf häufige Fragen zum visuellen Testen, z. B. zum Aktualisieren von Baselines, zum Beheben von Canvas-Installationsfehlern und zum Upgrade auf v10."
---

### Muss ich die Methoden `save(Screen/Element/FullPageScreen)` verwenden, wenn ich `check(Screen/Element/FullPageScreen)` ausführen möchte?

Nein, das ist nicht nötig. `check(Screen/Element/FullPageScreen)` erledigt das automatisch für Sie.

### Meine visuellen Tests schlagen mit einer Abweichung fehl. Wie kann ich meine Baseline aktualisieren?

Sie können die Baseline-Bilder über die Kommandozeile aktualisieren, indem Sie das Argument `--update-visual-baseline` hinzufügen. Dadurch wird

-   der tatsächlich aufgenommene Screenshot automatisch kopiert und im Baseline-Ordner abgelegt
-   der Test bei Abweichungen als bestanden gewertet, da die Baseline aktualisiert wurde

**Verwendung:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Wenn Sie die Logs im Info-/Debug-Modus ausführen, sehen Sie die folgenden zusätzlichen Logs

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

Es kann vorkommen, dass der Fehler `Width and height cannot be negative` ausgelöst wird. In 9 von 10 Fällen hängt dies damit zusammen, dass ein Bild von einem Element erstellt wird, das sich nicht im sichtbaren Bereich befindet. Stellen Sie bitte immer sicher, dass sich das Element im sichtbaren Bereich befindet, bevor Sie versuchen, ein Bild des Elements zu erstellen.

### Installation von Canvas unter Windows mit Node-Gyp-Logs fehlgeschlagen

Wenn Sie aufgrund von Node-Gyp-Fehlern Probleme bei der Installation von Canvas unter Windows haben, beachten Sie bitte, dass dies nur für Version 4 und älter gilt. Um diese Probleme zu vermeiden, sollten Sie ein Update auf Version 5 oder höher in Betracht ziehen, die diese Abhängigkeiten nicht hat. Die Versionen 5 bis 9 verwendeten [Jimp](https://github.com/jimp-dev/jimp) für die Bildverarbeitung; ab Version 10 werden [fast-png](https://github.com/image-js/fast-png) und [Pixelmatch](https://github.com/mapbox/pixelmatch) ohne native Abhängigkeiten verwendet.

Falls Sie die Probleme mit Version 4 dennoch lösen müssen, sehen Sie sich bitte Folgendes an:

-   den Abschnitt zu Node Canvas im [Getting Started](/docs/visual-testing#system-requirements)-Leitfaden
-   [diesen Beitrag](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) zur Behebung von Node-Gyp-Problemen unter Windows. (Danke an [IgorSasovets](https://github.com/IgorSasovets))

### Ich habe auf v10 aktualisiert. Warum schlagen meine visuellen Tests fehl?

In v10 wurde die Vergleichs-Engine von ResembleJS auf [Pixelmatch](https://github.com/mapbox/pixelmatch) umgestellt. Pixelmatch verwendet ein wahrnehmungsbasiertes (YIQ-)Farbmodell anstelle von reinem RGB, daher unterscheiden sich die Abweichungsprozentsätze von v9. Ihre Tests sind nicht kaputt; die Baselines müssen lediglich einmal neu generiert werden. Führen Sie Ihre Tests mit `--update-visual-baseline` aus, um die neuen Werte zu übernehmen, oder löschen Sie Ihren Baseline-Ordner und lassen Sie ihn von `autoSaveBaseline` neu erstellen.