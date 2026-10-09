---
id: ocr-faq
title: Häufig gestellte Fragen
description: "Antworten auf häufige Fragen zu langsamen OCR-Tests, nicht gefundenem Text und der Kombination von OCR-Befehlen mit regulären Selektoren."
---

## Meine Tests sind sehr langsam

Wenn Sie den `@wdio/ocr-service` verwenden, tun Sie dies nicht, um Ihre Tests zu beschleunigen, sondern weil es Ihnen schwerfällt, Elemente in Ihrer Web-/Mobile-App zu finden, und Sie eine einfachere Möglichkeit suchen, diese zu lokalisieren. Und wie wir hoffentlich alle wissen: Wenn man etwas gewinnt, verliert man etwas anderes. **Aber....** es gibt eine Möglichkeit, den `@wdio/ocr-service` schneller als normal auszuführen. Weitere Informationen dazu finden Sie [hier](./more-test-optimization).

## Kann ich die Befehle dieses Services mit den Standard-Befehlen/-Selektoren von WebdriverIO verwenden?

Ja, Sie können die Befehle kombinieren, um Ihr Skript noch leistungsfähiger zu machen! Es wird empfohlen, so weit wie möglich die Standard-Befehle/-Selektoren von WebdriverIO zu verwenden und diesen Service nur dann einzusetzen, wenn Sie keinen eindeutigen Selektor finden können oder Ihr Selektor zu fragil wird.

## Mein Text wird nicht gefunden, wie ist das möglich?

Zunächst ist es wichtig zu verstehen, wie der OCR-Prozess in diesem Modul funktioniert. Bitte lesen Sie daher [diese](./ocr-testing) Seite. Wenn Sie Ihren Text immer noch nicht finden können, können Sie Folgendes versuchen.

### Der Bildbereich ist zu groß

Wenn das Modul einen großen Bereich des Screenshots verarbeiten muss, findet es den Text möglicherweise nicht. Sie können einen kleineren Bereich angeben, indem Sie bei der Verwendung eines Befehls einen Haystack angeben. Bitte prüfen Sie in den [Befehlen](./ocr-click-on-text), welche Befehle die Angabe eines Haystacks unterstützen.

### Der Kontrast zwischen Text und Hintergrund ist nicht korrekt

Das bedeutet, dass Sie möglicherweise hellen Text auf einem weißen Hintergrund oder dunklen Text auf einem dunklen Hintergrund haben. Dies kann dazu führen, dass Text nicht gefunden wird. In den folgenden Beispielen sehen Sie, dass der Text `Why WebdriverIO?` weiß ist und von einem grauen Button umgeben wird. In diesem Fall wird der Text `Why WebdriverIO?` nicht gefunden. Durch Erhöhen des Kontrasts für den jeweiligen Befehl wird der Text gefunden und kann angeklickt werden, siehe das zweite Bild.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Mit dem Standardkontrast von 0.25 wird der Text nicht gefunden
    contrast: 1,
});
```

![Contrast issues](/img/ocr/increased-contrast.jpg)

## Warum wird mein Element angeklickt, aber die Tastatur auf meinen Mobilgeräten erscheint nie?

Dies kann bei einigen Textfeldern passieren, bei denen der Klick als zu lang bewertet und als langer Tap interpretiert wird. Sie können die Option `clickDuration` bei [`ocrClickOnText`](./ocr-click-on-text) und [`ocrSetValue`](./ocr-set-value) verwenden, um dies zu beheben. Siehe [hier](./ocr-click-on-text#options).

## Kann dieses Modul mehrere Elemente zurückgeben, wie es WebdriverIO normalerweise kann?

Nein, das ist derzeit nicht möglich. Wenn das Modul mehrere Elemente findet, die dem angegebenen Selektor entsprechen, wählt es automatisch das Element mit der höchsten Übereinstimmungsbewertung aus.

## Kann ich meine App mit den von diesem Service bereitgestellten OCR-Befehlen vollständig automatisieren?

Ich habe es noch nie gemacht, aber theoretisch sollte es möglich sein. Bitte lassen Sie uns wissen, wenn es Ihnen gelingt ☺️.

## Ich sehe, dass eine zusätzliche Datei namens `{languageCode}.traineddata` hinzugefügt wird. Was ist das?

`{languageCode}.traineddata` ist eine Sprachdatendatei, die von Tesseract verwendet wird. Sie enthält die Trainingsdaten für die ausgewählte Sprache, einschließlich der notwendigen Informationen, damit Tesseract englische Zeichen und Wörter effektiv erkennen kann.

### Inhalt von `{languageCode}.traineddata`

Die Datei enthält im Allgemeinen:

1. **Zeichensatzdaten:** Informationen über die Zeichen der englischen Sprache.
1. **Sprachmodell:** Ein statistisches Modell darüber, wie Zeichen Wörter und Wörter Sätze bilden.
1. **Merkmalsextraktoren:** Daten darüber, wie Merkmale aus Bildern für die Zeichenerkennung extrahiert werden.
1. **Trainingsdaten:** Daten, die aus dem Training von Tesseract mit einer großen Menge englischer Textbilder gewonnen wurden.

### Warum ist `{languageCode}.traineddata` wichtig?

1. **Spracherkennung:** Tesseract ist auf diese Trainingsdatendateien angewiesen, um Text in einer bestimmten Sprache genau zu erkennen und zu verarbeiten. Ohne `{languageCode}.traineddata` könnte Tesseract keinen englischen Text erkennen.
1. **Leistung:** Die Qualität und Genauigkeit der OCR hängen direkt von der Qualität der Trainingsdaten ab. Die Verwendung der richtigen Trainingsdatendatei stellt sicher, dass der OCR-Prozess so genau wie möglich ist.
1. **Kompatibilität:** Wenn die Datei `{languageCode}.traineddata` in Ihr Projekt aufgenommen wird, lässt sich die OCR-Umgebung einfacher auf verschiedenen Systemen oder den Rechnern von Teammitgliedern reproduzieren.

### Versionierung von `{languageCode}.traineddata`

Es wird empfohlen, `{languageCode}.traineddata` aus folgenden Gründen in Ihr Versionskontrollsystem aufzunehmen:

1. **Konsistenz:** Es stellt sicher, dass alle Teammitglieder oder Deployment-Umgebungen genau dieselbe Version der Trainingsdaten verwenden, was zu konsistenten OCR-Ergebnissen in verschiedenen Umgebungen führt.
1. **Reproduzierbarkeit:** Das Speichern dieser Datei in der Versionskontrolle erleichtert es, Ergebnisse zu reproduzieren, wenn der OCR-Prozess zu einem späteren Zeitpunkt oder auf einem anderen Rechner ausgeführt wird.
1. **Abhängigkeitsverwaltung:** Die Aufnahme in das Versionskontrollsystem hilft bei der Verwaltung von Abhängigkeiten und stellt sicher, dass jede Einrichtung oder Umgebungskonfiguration die notwendigen Dateien enthält, damit das Projekt korrekt ausgeführt werden kann.

## Gibt es eine einfache Möglichkeit zu sehen, welcher Text auf meinem Bildschirm gefunden wird, ohne einen Test auszuführen?

Ja, Sie können dafür unseren CLI-Wizard verwenden. Die Dokumentation finden Sie [hier](./cli-wizard)