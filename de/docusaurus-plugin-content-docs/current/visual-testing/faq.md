---
id: faq
title: FAQ
---

### Muss ich eine `save(Screen/Element/FullPageScreen)`-Methode verwenden, wenn ich `check(Screen/Element/FullPageScreen)` ausführen möchte?

Nein, das ist nicht nötig. Die `check(Screen/Element/FullPageScreen)`-Methode erledigt das automatisch für dich.

### Meine visuellen Tests schlagen mit einer Differenz fehl, wie kann ich meine Baseline aktualisieren?

Du kannst die Baseline-Bilder über die Kommandozeile aktualisieren, indem du das Argument `--update-visual-baseline` hinzufügst. Dies wird

-   automatisch den aktuellen Screenshot kopieren und in den Baseline-Ordner legen
-   wenn es Unterschiede gibt, wird der Test bestanden, da die Baseline aktualisiert wurde

**Verwendung:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Bei der Ausführung im Info/Debug-Modus werden folgende Logs angezeigt

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

Es kann sein, dass der Fehler `Width and height cannot be negative` auftritt. In 9 von 10 Fällen hängt dies damit zusammen, dass ein Bild von einem Element erstellt wird, das nicht im Sichtfeld ist. Bitte stelle sicher, dass das Element immer im Sichtfeld ist, bevor du versuchst, ein Bild davon zu erstellen.

### Installation von Canvas unter Windows ist mit Node-Gyp-Logs fehlgeschlagen

Wenn du bei der Installation von Canvas unter Windows auf Probleme mit Node-Gyp-Fehlern stößt, beachte bitte, dass dies nur für Version 4 und niedriger gilt. Um diese Probleme zu vermeiden, solltest du auf Version 5 oder höher aktualisieren, die diese Abhängigkeiten nicht hat und [Jimp](https://github.com/jimp-dev/jimp) für die Bildverarbeitung verwendet.

Wenn du die Probleme mit Version 4 trotzdem lösen musst, überprüfe bitte:

-   den Node Canvas-Abschnitt im [Getting Started](/docs/visual-testing#system-requirements)-Leitfaden
-   [diesen Beitrag](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) zur Behebung von Node-Gyp-Problemen unter Windows. (Danke an [IgorSasovets](https://github.com/IgorSasovets))