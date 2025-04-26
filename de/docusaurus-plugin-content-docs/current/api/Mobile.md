---
id: mobile
title: Mobile Befehle
---

# Einführung in benutzerdefinierte und erweiterte Mobile Befehle in WebdriverIO

Das Testen von mobilen Apps und mobilen Webanwendungen bringt eigene Herausforderungen mit sich, besonders wenn es um plattformspezifische Unterschiede zwischen Android und iOS geht. Während Appium die Flexibilität bietet, mit diesen Unterschieden umzugehen, erfordert es oft, dass Sie tief in komplexe, plattformabhängige Dokumentationen ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) und Befehle eintauchen. Dies kann das Schreiben von Testskripten zeitaufwändiger, fehleranfälliger und schwieriger zu warten machen.

Um den Prozess zu vereinfachen, führt WebdriverIO **benutzerdefinierte und erweiterte mobile Befehle** ein, die speziell für mobile Web- und native App-Tests zugeschnitten sind. Diese Befehle abstrahieren die Komplexität der zugrunde liegenden Appium-APIs und ermöglichen es Ihnen, präzise, intuitive und plattformunabhängige Testskripte zu schreiben. Mit dem Fokus auf Benutzerfreundlichkeit möchten wir die zusätzliche Belastung bei der Entwicklung von Appium-Skripten reduzieren und Sie in die Lage versetzen, mobile Apps mühelos zu automatisieren.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Warum benutzerdefinierte Mobile Befehle?

### 1. **Vereinfachung komplexer APIs**
Einige Appium-Befehle, wie Gesten oder Element-Interaktionen, erfordern eine ausführliche und komplizierte Syntax. Um beispielsweise eine Langdruck-Aktion mit der nativen Appium-API auszuführen, muss eine `action`-Kette manuell erstellt werden:

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

Mit WebdriverIOs benutzerdefinierten Befehlen kann dieselbe Aktion mit einer einzigen, aussagekräftigen Codezeile durchgeführt werden:

```ts
await $('~Contacts').longPress();
```

Dies reduziert den Boilerplate-Code drastisch und macht Ihre Skripte übersichtlicher und leichter verständlich.

### 2. **Plattformübergreifende Abstraktion**
Mobile Apps erfordern oft plattformspezifische Handhabung. Zum Beispiel unterscheidet sich das Scrollen in nativen Apps erheblich zwischen [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) und [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO überbrückt diese Lücke, indem es einheitliche Befehle wie `scrollIntoView()` bereitstellt, die plattformübergreifend nahtlos funktionieren, unabhängig von der zugrunde liegenden Implementierung.

```ts
await $('~element').scrollIntoView();
```

Diese Abstraktion stellt sicher, dass Ihre Tests portabel sind und keine ständigen Verzweigungen oder bedingte Logik erfordern, um Betriebssystemunterschiede zu berücksichtigen.

### 3. **Erhöhte Produktivität**
Durch die Reduzierung der Notwendigkeit, Low-Level-Appium-Befehle zu verstehen und zu implementieren, ermöglichen WebdriverIOs mobile Befehle Ihnen, sich auf das Testen der Funktionalität Ihrer App zu konzentrieren, anstatt mit plattformspezifischen Nuancen zu kämpfen. Dies ist besonders vorteilhaft für Teams mit begrenzter Erfahrung in der mobilen Automatisierung oder für diejenigen, die ihren Entwicklungszyklus beschleunigen möchten.

### 4. **Konsistenz und Wartbarkeit**
Benutzerdefinierte Befehle bringen Einheitlichkeit in Ihre Testskripte. Anstatt unterschiedliche Implementierungen für ähnliche Aktionen zu haben, kann Ihr Team auf standardisierte, wiederverwendbare Befehle zurückgreifen. Dies macht nicht nur den Codebase wartbarer, sondern senkt auch die Einstiegshürde für neue Teammitglieder.

## Warum bestimmte mobile Befehle verbessern?

### 1. Hinzufügen von Flexibilität
Bestimmte mobile Befehle werden verbessert, um zusätzliche Optionen und Parameter bereitzustellen, die in den Standard-Appium-APIs nicht verfügbar sind. Zum Beispiel fügt WebdriverIO Wiederholungslogik, Timeouts und die Möglichkeit hinzu, Webviews nach bestimmten Kriterien zu filtern, was mehr Kontrolle über komplexe Szenarien ermöglicht.

```ts
// Beispiel: Anpassen von Wiederholungsintervallen und Timeouts für die Webview-Erkennung
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Wiederholung alle 1 Sekunde
  androidWebviewConnectTimeout: 10000,    // Timeout nach 10 Sekunden
});
```

Diese Optionen helfen dabei, Automatisierungsskripte an dynamisches App-Verhalten anzupassen, ohne zusätzlichen Boilerplate-Code.

### 2. Verbesserung der Benutzerfreundlichkeit
Verbesserte Befehle abstrahieren Komplexitäten und sich wiederholende Muster in den nativen APIs. Sie ermöglichen es Ihnen, mehr Aktionen mit weniger Codezeilen durchzuführen, was die Lernkurve für neue Benutzer reduziert und Skripte leichter lesbar und wartbar macht.

```ts
// Beispiel: Verbesserter Befehl zum Wechseln des Kontexts nach Titel
await driver.switchContext({
  title: 'My Webview Title',
});
```

Im Vergleich zu den Standard-Appium-Methoden eliminieren verbesserte Befehle die Notwendigkeit zusätzlicher Schritte wie das manuelle Abrufen verfügbarer Kontexte und das Filtern durch diese.

### 3. Standardisierung des Verhaltens
WebdriverIO stellt sicher, dass verbesserte Befehle plattformübergreifend wie Android und iOS konsistent funktionieren. Diese plattformübergreifende Abstraktion minimiert die Notwendigkeit für bedingte Verzweigungslogik basierend auf dem Betriebssystem, was zu besser wartbaren Testskripten führt.

```ts
// Beispiel: Einheitlicher Scroll-Befehl für beide Plattformen
await $('~element').scrollIntoView();
```

Diese Standardisierung vereinfacht Codebases, besonders für Teams, die Tests auf mehreren Plattformen automatisieren.

### 4. Erhöhung der Zuverlässigkeit
Durch die Integration von Wiederholungsmechanismen, intelligenten Standardwerten und detaillierten Fehlermeldungen reduzieren verbesserte Befehle die Wahrscheinlichkeit von instabilen Tests. Diese Verbesserungen stellen sicher, dass Ihre Tests widerstandsfähig gegen Probleme wie Verzögerungen bei der Webview-Initialisierung oder vorübergehende App-Zustände sind.

```ts
// Beispiel: Verbesserter Webview-Wechsel mit robuster Matching-Logik
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Dies macht die Testausführung vorhersehbarer und weniger anfällig für Fehler, die durch Umgebungsfaktoren verursacht werden.

### 5. Verbesserung der Debugging-Fähigkeiten
Verbesserte Befehle liefern oft reichhaltigere Metadaten, was das Debugging komplexer Szenarien erleichtert, insbesondere in Hybrid-Apps. Befehle wie getContext und getContexts können beispielsweise detaillierte Informationen über Webviews zurückgeben, einschließlich Titel, URL und Sichtbarkeitsstatus.

```ts
// Beispiel: Abrufen detaillierter Metadaten zum Debugging
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Diese Metadaten helfen dabei, Probleme schneller zu identifizieren und zu lösen, was die gesamte Debugging-Erfahrung verbessert.


Durch die Verbesserung mobiler Befehle macht WebdriverIO die Automatisierung nicht nur einfacher, sondern richtet sich auch an seiner Mission aus, Entwicklern Werkzeuge zur Verfügung zu stellen, die leistungsstark, zuverlässig und intuitiv zu verwenden sind.

---

## Hybrid Apps

Hybrid-Apps kombinieren Webinhalte mit nativer Funktionalität und erfordern eine spezielle Behandlung während der Automatisierung. Diese Apps verwenden Webviews, um Webinhalte innerhalb einer nativen Anwendung darzustellen. WebdriverIO bietet verbesserte Methoden für die effektive Arbeit mit Hybrid-Apps.

### Verständnis von Webviews
Ein Webview ist eine browserähnliche Komponente, die in eine native App eingebettet ist:

- **Android:** Webviews basieren auf Chrome/System Webview und können mehrere Seiten enthalten (ähnlich wie Browser-Tabs). Diese Webviews benötigen ChromeDriver, um Interaktionen zu automatisieren. Appium kann automatisch die erforderliche ChromeDriver-Version basierend auf der Version des System WebView oder Chrome, die auf dem Gerät installiert ist, bestimmen und automatisch herunterladen, wenn sie noch nicht verfügbar ist. Dieser Ansatz gewährleistet nahtlose Kompatibilität und minimiert die manuelle Einrichtung. Siehe die [Appium UIAutomator2-Dokumentation](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver), um zu erfahren, wie Appium automatisch die richtige ChromeDriver-Version herunterlädt.
- **iOS:** Webviews werden von Safari (WebKit) angetrieben und durch generische IDs wie `WEBVIEW_{id}` identifiziert.

### Herausforderungen mit Hybrid-Apps
1. Identifizierung des richtigen Webviews unter mehreren Optionen.
2. Abrufen zusätzlicher Metadaten wie Titel, URL oder Paketname für einen besseren Kontext.
3. Umgang mit plattformspezifischen Unterschieden zwischen Android und iOS.
4. Zuverlässiges Wechseln zum richtigen Kontext in einer Hybrid-App.

### Wichtige Befehle für Hybrid-Apps

#### 1. `getContext`
Ruft den aktuellen Kontext der Sitzung ab. Standardmäßig verhält es sich wie Appiums getContext-Methode, kann aber detaillierte Kontextinformationen bereitstellen, wenn `returnDetailedContext` aktiviert ist. Weitere Informationen finden Sie unter [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Gibt eine detaillierte Liste verfügbarer Kontexte zurück und verbessert Appiums contexts-Methode. Dies erleichtert die Identifizierung des richtigen Webviews für die Interaktion, ohne zusätzliche Befehle aufrufen zu müssen, um Titel, URL oder aktive `bundleId|packageName` zu bestimmen. Weitere Informationen finden Sie unter [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Wechselt zu einem bestimmten Webview basierend auf Name, Titel oder URL. Bietet zusätzliche Flexibilität, wie die Verwendung regulärer Ausdrücke für das Matching. Weitere Informationen finden Sie unter [`switchContext`](/docs/api/mobile/switchContext)

### Hauptmerkmale für Hybrid-Apps
1. Detaillierte Metadaten: Umfassende Details für Debugging und zuverlässigen Kontextwechsel abrufen.
2. Plattformübergreifende Konsistenz: Einheitliches Verhalten für Android und iOS, nahtlose Handhabung plattformspezifischer Eigenheiten.
3. Benutzerdefinierte Wiederholungslogik (Android): Anpassung von Wiederholungsintervallen und Timeouts für die Webview-Erkennung.


:::info Hinweise und Einschränkungen
- Android bietet zusätzliche Metadaten wie `packageName` und `webviewPageId`, während iOS sich auf `bundleId` konzentriert.
- Die Wiederholungslogik ist für Android anpassbar, aber nicht für iOS anwendbar.
- Es gibt mehrere Fälle, in denen iOS das Webview nicht finden kann. Appium bietet verschiedene zusätzliche Capabilities für den `appium-xcuitest-driver`, um das Webview zu finden. Wenn Sie glauben, dass das Webview nicht gefunden wird, können Sie versuchen, eine der folgenden Capabilities zu setzen:
    - `appium:includeSafariInWebviews`: Fügt Safari-Webkontexte zur Liste der verfügbaren Kontexte während eines native/webview App-Tests hinzu. Dies ist nützlich, wenn der Test Safari öffnet und damit interagieren muss. Standardmäßig `false`.
    - `appium:webviewConnectRetries`: Die maximale Anzahl von Wiederholungsversuchen, bevor die Erkennung von Webview-Seiten aufgegeben wird. Die Verzögerung zwischen den Wiederholungen beträgt 500ms, Standard sind `10` Wiederholungen.
    - `appium:webviewConnectTimeout`: Die maximale Zeit in Millisekunden, die auf die Erkennung einer Webview-Seite gewartet wird. Standard ist `5000` ms.

Für fortgeschrittene Beispiele und Details siehe die WebdriverIO Mobile API-Dokumentation.
:::


---

Unser wachsender Satz von Befehlen spiegelt unser Engagement wider, mobile Automatisierung zugänglich und elegant zu gestalten. Ob Sie komplizierte Gesten ausführen oder mit nativen App-Elementen arbeiten, diese Befehle entsprechen WebdriverIOs Philosophie, ein nahtloses Automatisierungserleb