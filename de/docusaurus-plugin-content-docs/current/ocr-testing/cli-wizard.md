---
id: cli-wizard
title: CLI-Assistent
---

Sie können überprüfen, welcher Text in einem Bild gefunden werden kann, ohne einen Test auszuführen, indem Sie den OCR-CLI-Assistenten verwenden. Die einzigen Voraussetzungen sind:

-   Sie haben den `@wdio/ocr-service` als Abhängigkeit installiert, siehe [Erste Schritte](./getting-started)
-   ein Bild, das Sie verarbeiten möchten

Führen Sie dann den folgenden Befehl aus, um den Assistenten zu starten

```sh
npx ocr-service
```

Dies startet einen Assistenten, der Sie durch die Schritte zur Auswahl eines Bildes und zur Verwendung eines Heuhaufens plus erweitertem Modus führt. Die folgenden Fragen werden gestellt

## Wie möchten Sie die Datei angeben?

Die folgenden Optionen können ausgewählt werden

-   Verwenden Sie einen "Datei-Explorer"
-   Geben Sie den Dateipfad manuell ein

### Verwenden Sie einen "Datei-Explorer"

Der CLI-Assistent bietet die Möglichkeit, einen "Datei-Explorer" zu verwenden, um nach Dateien auf Ihrem System zu suchen. Er beginnt in dem Ordner, aus dem Sie den Befehl aufrufen. Nach der Auswahl eines Bildes (verwenden Sie die Pfeiltasten und die ENTER-Taste) gelangen Sie zur nächsten Frage

### Geben Sie den Dateipfad manuell ein

Dies ist ein direkter Pfad zu einer Datei irgendwo auf Ihrem lokalen Computer

### Möchten Sie einen Heuhaufen verwenden?

Hier haben Sie die Möglichkeit, einen Bereich auszuwählen, der verarbeitet werden soll. Dies kann den Prozess beschleunigen oder die Menge an Text, die die OCR-Engine finden könnte, reduzieren/eingrenzen. Sie müssen `x`, `y`, `width`, `height` Daten basierend auf den folgenden Fragen angeben:

-   Geben Sie die x-Koordinate ein:
-   Geben Sie die y-Koordinate ein:
-   Geben Sie die Breite ein:
-   Geben Sie die Höhe ein:

## Möchten Sie den erweiterten Modus verwenden?

Der erweiterte Modus bietet zusätzliche Funktionen wie:

-   Einstellen des Kontrasts
-   weitere Funktionen folgen in Zukunft

## Demo

Hier ist eine Demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>