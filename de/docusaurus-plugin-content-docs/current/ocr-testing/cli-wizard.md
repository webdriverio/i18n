---
id: cli-wizard
title: CLI-Assistent
description: "Prüfen Sie mit dem OCR-CLI-Assistenten, welchen Text der OCR-Service in einem Bild finden kann, ohne einen Test auszuführen."
---

Sie können mit dem OCR-CLI-Assistenten überprüfen, welcher Text in einem Bild gefunden werden kann, ohne einen Test auszuführen. Dafür wird lediglich Folgendes benötigt:

-   Sie haben den `@wdio/ocr-service` als Abhängigkeit installiert, siehe [Erste Schritte](./getting-started)
-   ein Bild, das Sie verarbeiten möchten

Führen Sie dann den folgenden Befehl aus, um den Assistenten zu starten

```sh
npx ocr-service
```

Dadurch wird ein Assistent gestartet, der Sie durch die Schritte führt, um ein Bild auszuwählen und einen Haystack sowie den erweiterten Modus zu verwenden. Folgende Fragen werden gestellt

## Wie möchten Sie die Datei angeben?

Die folgenden Optionen können ausgewählt werden

-   Einen „Datei-Explorer“ verwenden
-   Den Dateipfad manuell eingeben

### Einen „Datei-Explorer“ verwenden

Der CLI-Assistent bietet die Möglichkeit, einen „Datei-Explorer“ zu verwenden, um nach Dateien auf Ihrem System zu suchen. Er startet in dem Ordner, in dem Sie den Befehl aufrufen. Nachdem Sie ein Bild ausgewählt haben (verwenden Sie Ihre Pfeiltasten und die ENTER-Taste), gelangen Sie zur nächsten Frage

### Den Dateipfad manuell eingeben

Dies ist ein direkter Pfad zu einer Datei irgendwo auf Ihrem lokalen Rechner

### Möchten Sie einen Haystack verwenden?

Hier haben Sie die Möglichkeit, einen Bereich auszuwählen, der verarbeitet werden soll. Dies kann den Vorgang beschleunigen oder die Menge an Text, die die OCR-Engine finden könnte, reduzieren bzw. eingrenzen. Sie müssen `x`-, `y`-, `width`- und `height`-Daten anhand der folgenden Fragen angeben:

-   Geben Sie die x-Koordinate ein:
-   Geben Sie die y-Koordinate ein:
-   Geben Sie die Breite ein:
-   Geben Sie die Höhe ein:

## Möchten Sie den erweiterten Modus verwenden?

Der erweiterte Modus enthält zusätzliche Funktionen wie:

-   das Einstellen des Kontrasts
-   weitere folgen in Zukunft

## Demo

Hier ist eine Demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>