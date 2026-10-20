---
id: cli-wizard
title: CLI-Assistent
description: "Prüfe mit dem OCR-CLI-Assistenten, welchen Text der OCR-Service in einem Bild finden kann, ohne einen Test auszuführen."
---

Du kannst mit dem OCR-CLI-Assistenten überprüfen, welcher Text in einem Bild gefunden werden kann, ohne einen Test auszuführen. Du benötigst lediglich Folgendes:

-   du hast den `@wdio/ocr-service` als Abhängigkeit installiert, siehe [Erste Schritte](./getting-started)
-   ein Bild, das du verarbeiten möchtest

Führe dann den folgenden Befehl aus, um den Assistenten zu starten

```sh
npx ocr-service
```

Dadurch wird ein Assistent gestartet, der dich durch die Schritte zur Auswahl eines Bildes und zur Verwendung eines Haystacks sowie des erweiterten Modus führt. Die folgenden Fragen werden gestellt

## Wie möchtest du die Datei angeben?

Die folgenden Optionen können ausgewählt werden

-   Einen "Datei-Explorer" verwenden
-   Den Dateipfad manuell eingeben

### Einen "Datei-Explorer" verwenden

Der CLI-Assistent bietet die Möglichkeit, einen "Datei-Explorer" zu verwenden, um nach Dateien auf deinem System zu suchen. Er startet in dem Ordner, in dem du den Befehl aufrufst. Nachdem du ein Bild ausgewählt hast (verwende die Pfeiltasten und die ENTER-Taste), gelangst du zur nächsten Frage

### Den Dateipfad manuell eingeben

Dies ist ein direkter Pfad zu einer Datei irgendwo auf deinem lokalen Rechner

### Möchtest du einen Haystack verwenden?

Hier hast du die Möglichkeit, einen Bereich auszuwählen, der verarbeitet werden soll. Dies kann den Prozess beschleunigen oder die Menge an Text, die die OCR-Engine finden könnte, reduzieren bzw. eingrenzen. Du musst die Daten `x`, `y`, `width`, `height` anhand der folgenden Fragen angeben:

-   Gib die x-Koordinate ein:
-   Gib die y-Koordinate ein:
-   Gib die Breite ein:
-   Gib die Höhe ein:

## Möchtest du den erweiterten Modus verwenden?

Der erweiterte Modus bietet zusätzliche Funktionen wie:

-   Einstellen des Kontrasts
-   weitere folgen in der Zukunft

## Demo

Hier ist eine Demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>