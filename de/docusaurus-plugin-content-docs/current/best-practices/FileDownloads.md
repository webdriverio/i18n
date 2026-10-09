---
id: file-download
title: Datei-Download
description: "Konfigurieren Sie Download-Verzeichnisse für Chrome, Firefox und Edge, warten Sie auf den Abschluss von Downloads und überprüfen Sie heruntergeladene Dateien browserübergreifend."
---

Bei der Automatisierung von Datei-Downloads im Web-Testing ist es wichtig, diese in verschiedenen Browsern einheitlich zu handhaben, um eine zuverlässige Testausführung zu gewährleisten.

Hier stellen wir Best Practices für Datei-Downloads vor und zeigen, wie Sie Download-Verzeichnisse für **Google Chrome**, **Mozilla Firefox** und **Microsoft Edge** konfigurieren.

## Download-Pfade

Das **Hardcodieren** von Download-Pfaden in Testskripten kann zu Wartungs- und Portabilitätsproblemen führen. Verwenden Sie **relative Pfade** für Download-Verzeichnisse, um Portabilität und Kompatibilität in verschiedenen Umgebungen sicherzustellen.

```javascript
// 👎
// Hartcodierter Download-Pfad
const downloadPath = '/path/to/downloads';

// 👍
// Relativer Download-Pfad
const downloadPath = path.join(__dirname, 'downloads');
```

## Wartestrategien

Werden keine geeigneten Wartestrategien implementiert, kann dies zu Race Conditions oder unzuverlässigen Tests führen, insbesondere beim Abschluss von Downloads. Implementieren Sie **explizite** Wartestrategien, um auf den Abschluss von Datei-Downloads zu warten und so die Synchronisation zwischen den Testschritten sicherzustellen.

```javascript
// 👎
// Kein explizites Warten auf den Abschluss des Downloads
await browser.pause(5000);

// 👍
// Auf den Abschluss des Datei-Downloads warten
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Konfigurieren von Download-Verzeichnissen

Um das Verhalten beim Datei-Download für **Google Chrome**, **Mozilla Firefox** und **Microsoft Edge** zu überschreiben, geben Sie das Download-Verzeichnis in den WebDriverIO-Capabilities an:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

Eine Beispielimplementierung finden Sie im [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Konfigurieren von Downloads in Chromium-Browsern

So ändern Sie den Download-Pfad für __Chromium-basierte__ Browser (wie Chrome, Edge, Brave usw.) mithilfe der WebDriverIO-Methode `getPuppeteer`, um auf die Chrome DevTools zuzugreifen.

```javascript
const page = await browser.getPuppeteer();
// Eine CDP-Session initiieren:
const cdpSession = await page.target().createCDPSession();
// Den Download-Pfad festlegen:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Umgang mit mehreren Datei-Downloads

Bei Szenarien mit mehreren Datei-Downloads ist es wichtig, Strategien zu implementieren, mit denen jeder Download effektiv verwaltet und validiert werden kann. Ziehen Sie die folgenden Ansätze in Betracht:

__Sequenzielle Download-Verarbeitung:__ Laden Sie Dateien nacheinander herunter und überprüfen Sie jeden Download, bevor Sie den nächsten starten, um eine geordnete Ausführung und eine genaue Validierung sicherzustellen.

__Parallele Download-Verarbeitung:__ Nutzen Sie Techniken der asynchronen Programmierung, um mehrere Datei-Downloads gleichzeitig zu starten und so die Testausführungszeit zu optimieren. Implementieren Sie robuste Validierungsmechanismen, um alle Downloads nach Abschluss zu überprüfen.

## Hinweise zur browserübergreifenden Kompatibilität

Obwohl WebDriverIO eine einheitliche Schnittstelle für die Browser-Automatisierung bietet, ist es wichtig, Unterschiede im Verhalten und in den Fähigkeiten der Browser zu berücksichtigen. Testen Sie Ihre Datei-Download-Funktionalität in verschiedenen Browsern, um Kompatibilität und Konsistenz sicherzustellen.

__Browserspezifische Konfigurationen:__ Passen Sie die Einstellungen für Download-Pfade und Wartestrategien an, um Unterschiede im Browserverhalten und in den Einstellungen von Chrome, Firefox, Edge und anderen unterstützten Browsern zu berücksichtigen.

__Kompatibilität von Browserversionen:__ Aktualisieren Sie Ihre WebDriverIO- und Browserversionen regelmäßig, um die neuesten Funktionen und Verbesserungen zu nutzen und gleichzeitig die Kompatibilität mit Ihrer bestehenden Testsuite sicherzustellen.