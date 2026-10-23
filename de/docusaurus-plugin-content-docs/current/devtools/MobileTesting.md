---
id: mobile
title: Mobile-Tests
description: "Erfassen Sie Appium-Sitzungen (mobiler Browser, native und hybride Apps) im Live- und Trace-Modus von DevTools und führen Sie die mobilen Beispiele für jeden Adapter aus."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

DevTools erfasst Appium-Sitzungen sowohl im Live-Modus als auch im [Trace-Modus](/docs/devtools/wdio/trace-mode). Was erfasst wird, hängt von einer Frage ab — **hat diese Sitzung gerade ein Web-Dokument?** — denn jedes Auslesen des DOM, jedes Seitenskript und jedes Auslesen des Viewports ist ein Roundtrip, der ohne ein Dokument nur fehlschlagen kann.

## Drei Arten von Sitzungen

| Sitzung | Hat ein Dokument | Was erfasst wird |
|---|---|---|
| **Mobiler Browser** (Chrome auf Android, Safari auf iOS) | immer | DOM-Zeitreise, Konsole und Wiedergabe wie auf dem Desktop; Netzwerk aus den eigenen Aufzeichnungen der Seite, da Appium kein BiDi bereitstellt (siehe [Netzwerkprotokolle](/docs/devtools/wdio/network-logs#without-webdriver-bidi)) |
| **Native App** | nie | Befehle, Screenshots und Elementdaten aus dem XML-Baum der Plattform; kein DOM |
| **Hybride App** | nur in einem Webview-Kontext | native Teile wie eine App, Webview-Teile wie eine Seite |

Das Unterscheidungsmerkmal ist der **Browsername in den Capabilities**, nicht das Gerät: Ein mobiler Browser gibt einen an, eine native App keinen. Ein Gerät ist ebenfalls nicht erforderlich — eine Mac2-, WinAppDriver- oder tvOS-Sitzung hat kein Dokument und wird genauso behandelt.

## Hybride Apps und der aktive Kontext

Eine hybride App ist der Fall, den die Capabilities allein nicht beantworten können, weil sich die Antwort während des Laufs ändert. Appium meldet entweder `NATIVE_APP` oder einen Webview-Kontext, und **alles, was nicht `NATIVE_APP` ist, zählt als Webview** — das Präfix `WEBVIEW_` ist eine Konvention, und bei einem Treiber, der seinen Webview anders benennt, würde die DOM-Erfassung sonst übersprungen.

Das Verfolgen des Kontexts kostet keinen zusätzlichen Roundtrip: Der Befehl zum Kontextwechsel trägt sein Ziel in seinen eigenen Argumenten, und ein fehlgeschlagener Wechsel wird ignoriert.

## Adapter-Unterstützung

Alle vier Adapter erkennen eine native Sitzung und überspringen dort die seitenseitige Erfassung. Bei hybriden Apps unterscheiden sie sich:

| Fähigkeit | WebdriverIO | Selenium | Nightwatch | Python |
|---|---|---|---|---|
| Native Sitzung erkannt, seitenseitige Erfassung übersprungen | ✅ | ✅ | ✅ | ✅ |
| Folgt einer hybriden App in ihren Webview | ✅ | ⚠️ ¹ | ⚠️ ¹ | ⚠️ ¹ |
| Netzwerk nativer Apps über appium-interceptor (`appium:intercept`) | ✅ | ✅ | ✅ | ✅ |

¹ Antwortet nur anhand der Start-Capabilities, sodass der Webview-Teil einer hybriden Sitzung so erfasst wird, als wäre er noch nativ — kein DOM für diese Aktionen.

Das **Gerät selbst** benötigt keine Adapter-Unterstützung: Es wird aus den Capabilities der Sitzung abgeleitet, und zwar vom gemeinsamen Trace-Exporter auf dem Weg ins Archiv und vom Dashboard für eine Live-Sitzung, deren Adapter keines gesendet hat. Jeder Adapter erhält daher den Geräterahmen.

## Im Dashboard

Eine Telefonaufnahme wird als Gerät dargestellt: eine Gerätespalte in voller Höhe mit der Aktionsliste und dem Dock daneben, und zwar **sowohl** im Live-Modus als auch im [Trace-Player](/docs/devtools/trace-player). Die `context-options` des Traces speichern Plattform, Modell und Betriebssystemversion, die beim Öffnen zurückgelesen werden, damit der Player die Frames ohne Raten beschriftet.

Bei einer nativen Sitzung stammen der A11y-Tab und die Elementdaten aus dem XML-Baum der Plattform statt aus dem DOM, sodass Locatoren als `android=new UiSelector()…` oder `-ios predicate string:…` statt als CSS oder XPath über HTML erscheinen.

## Netzwerk nativer Apps

Eine native App hat kein Dokument und Appium stellt keine BiDi-Netzwerkereignisse bereit, daher ist der Network-Tab einer nativen Sitzung standardmäßig leer. Jeder Adapter kann den Datenverkehr der App stattdessen aus dem [appium-interceptor](https://github.com/AppiumTestDistribution/appium-interceptor-plugin)-Plugin lesen, das das Gerät über einen eigenen Proxy leitet. Installieren Sie das Plugin und starten Sie Appium damit:

```sh
appium plugin install --source=npm appium-interceptor
appium --use-plugins=appium-interceptor
```

Fordern Sie dann den Proxy mit `appium:intercept: true` in den Capabilities der Sitzung an (es wird auch innerhalb von `appium:options` gelesen):

<Tabs groupId="devtools-mobile-network">
<TabItem value="wdio" label="WebdriverIO" default>

```ts
capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': '/path/to/app.apk',
    'appium:intercept': true
}]
```

</TabItem>
<TabItem value="selenium" label="Selenium (Node.js)">

```js
const driver = await new Builder()
  .usingServer('http://127.0.0.1:4723')
  .withCapabilities({
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': '/path/to/app.apk',
    'appium:intercept': true
  })
  .build()
```

</TabItem>
<TabItem value="nightwatch" label="Nightwatch">

```js
desiredCapabilities: {
  browserName: null,
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:app': '/path/to/app.apk',
  'appium:intercept': true
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from appium.options.android import UiAutomator2Options

options = UiAutomator2Options()
options.app = "/path/to/app.apk"
options.set_capability("appium:intercept", True)
```

</TabItem>
</Tabs>

Der Adapter startet für jede Sitzung einen Listener, auch für eine, die sie während des Laufs ersetzt, und zwar sowohl im Live- als auch im Trace-Modus. Er liest das vom Proxy Aufgezeichnete zwischen den Befehlen höchstens alle 2 Sekunden, da jeder Lesevorgang den gesamten Verlauf zurückgibt, und immer am Ende jedes Tests (bevor der Trace-Abschnitt dieses Tests geschrieben wird) sowie am Ende der Sitzung. Jede Anfrage zeigt Methode, URL, Status, Header und Bodies. Das Plugin zeichnet keine Zeitangaben auf, daher wird eine Anfrage zu dem Zeitpunkt eingeordnet, an dem sie zuerst gelesen wurde, und zeigt keine Dauer; Anfragen, die die App vor dem Start des Listeners stellt (ihr Start-Datenverkehr), werden nicht aufgeführt. Ohne das Plugin protokolliert der Adapter eine Warnung und die Sitzung läuft wie gewohnt.

Dies gilt nur für native Sitzungen; eine Sitzung im mobilen Browser erfasst ihr Netzwerk bereits über die Seite. Das Plugin unterstützt Android. Für HTTPS-Datenverkehr muss die App dem Zertifikat vertrauen, das das Plugin auf dem Gerät installiert, was ein Release-Build normalerweise nicht tut (siehe die Netzwerksicherheitskonfiguration von Android).

## Was ein mobiler Trace nicht enthält

Snapshots pro Aktion werden aus dem Command-Hook heraus ausgelöst, und Appium reiht eine Abfrage hinter dem Befehl ein, den sie beobachtet. Wo eine Sitzung ein Dokument zum Abfragen hat, wird dieser Snapshot daher übersprungen.

In der Praxis: **Die Webview-Aktionen einer hybriden App enthalten keine Elementdaten pro Aktion, keinen Accessibility-Baum und keinen Settle-Screenshot.** Native Sitzungen, mobile Browser und alle Desktop-Sitzungen sind nicht betroffen. Befehlszeilen und ihre Screenshots, die Konsole und das Archiv selbst werden immer erfasst. Das Netzwerk eines mobilen Browsers stammt aus dem Resource-Timing-Puffer der Seite und deren `fetch`- / `XMLHttpRequest`-Patch statt aus BiDi, und eine native Sitzung hat keine Netzwerkerfassung, sofern sie sich nicht für das appium-interceptor-Plugin entscheidet (siehe [Netzwerk nativer Apps](#native-app-network)), da der Treiber keine bereitstellt.

Diese Lücken sind beabsichtigt. Sie sind kein Erfassungsfehler, und sie sind das Wichtigste, was man vor dem Debuggen eines hybriden Traces wissen sollte.

## Ein Beispiel ausführen

Das Repo enthält ein mobiles Beispiel pro Adapter, und alle vier steuern denselben
Ablauf, sodass ein Unterschied zwischen zwei Dashboards ein Unterschied im Adapter
und nicht im Test ist.

Die Beispiele befinden sich im [devtools-Repo](https://github.com/webdriverio/devtools),
nicht in den Adapter-Paketen, daher erhalten Sie diese Skripte nicht, wenn Sie einen
Adapter in Ihr eigenes Projekt installieren. Klonen und bauen Sie dieses Repo einmal:

```sh
git clone https://github.com/webdriverio/devtools.git
cd devtools
pnpm install
pnpm build
```

Das Python-Beispiel verwendet das `python3` in Ihrem `PATH`, installieren Sie also zuerst den Adapter und
den Appium-Client dort hinein (eine virtuelle Umgebung hält sie aus Ihrem
System-Python heraus):

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -e packages/selenium-devtools-py
pip install -r examples/selenium-py/requirements-mobile.txt
```

Führen Sie dann, mit Appium und einem bereiten Gerät (siehe [Voraussetzungen](#prerequisites)),
eines davon im Stammverzeichnis dieses Checkouts aus:

```sh
pnpm demo:wdio:mobile
pnpm demo:selenium:mobile
pnpm demo:nightwatch:mobile
pnpm demo:python:mobile
```

Sie steuern die **Uhr-App**, die mit jedem Android-Systemabbild ausgeliefert wird — es
muss also keine `.apk` bereitgestellt, nichts hochgeladen und keine Zugangsdaten angegeben werden. Der Ablauf
bleibt auf dem Timer-Einrichtungsbildschirm: Timer-Tab öffnen, die Eingabe per Rücktaste auf
null löschen, eine Dauer auf dem Ziffernblock eingeben, sie zurücklesen und mit der Rücktaste korrigieren.

Sie **starten** bewusst nie einen Timer. Ein laufender Timer überdauert die Sitzung
und ersetzt den Einrichtungsbildschirm durch seine Karte, sodass eine Spec, die einen startet,
nur dann wiederholbar ist, wenn sie ihn auch beendet — ein unterbrochener Lauf würde jeden
folgenden Lauf zerstören. Keinen zu starten beseitigt diese Fehlerklasse, und der Ziffernblock
deckt trotzdem ab, wofür ein Beispiel da ist: echte Eingabe, echte Zustandsänderung, erfasst.

Sie vermeiden außerdem die Voreinstellungs-Chips der Uhr, die wie feste Bedienelemente aussehen, es aber
nicht sind: Es sind Vorschläge zuletzt verwendeter Dauern, sodass eine frisch zurückgesetzte Uhr
nur den Ziffernblock anbietet und ein auf Voreinstellungen basierender Ablauf auf jedem Gerät ohne
Timer-Verlauf fehlschlägt — einschließlich CI. Bei derselben App-Version gibt es zwei Uhr-Layouts, und
der Ziffernblock ist beiden gemeinsam.

`DEVTOOLS_MODE=trace` schaltet jedes davon in den Trace-Modus, `DEVTOOLS_MOBILE=web`
steuert statt einer App den eigenen Browser des Geräts — Chrome auf Android, Safari auf
iOS — und `APPIUM_APP` richtet eines auf eine echte App. [`examples/MOBILE.md`](https://github.com/webdriverio/devtools/blob/main/examples/MOBILE.md)
im Repo ist die vollständige Einrichtungsanleitung.

## iOS

```sh
DEVTOOLS_MOBILE_PLATFORM=ios pnpm demo:wdio:mobile
```

**Alle vier Adapter.** Jeder enthält ein `android/`- und ein `ios/`-Spec-Verzeichnis
und der Runner wählt zwischen ihnen, sodass der obige Befehl auch mit
`demo:selenium:mobile`, `demo:nightwatch:mobile` und `demo:python:mobile` funktioniert.
Die Erfassung selbst war nie plattformspezifisch — was jeder Adapter brauchte, war eine
Spec, keine Arbeit am Adapter.

iOS steuert **Einstellungen**, nicht die Uhr, weil die Uhr auf dem
Simulator überhaupt nicht installiert ist: `xcrun simctl listapps` listet Einstellungen, Kalender, Erinnerungen,
Karten und Safari auf, aber keine Uhr. Einstellungen gibt es auf jedem Simulator und jedem Gerät,
was dieselbe Eigenschaft ist, die die Uhr zur Wahl für Android macht. Der Ablauf
navigiert in Allgemein hinein und zurück und prüft dabei jeweils den Titel der Navigationsleiste —
dieselbe Form wie der Android-Ablauf, mit der App, die die Plattform tatsächlich mitliefert.

Android und iOS sind **separate Specs**, nicht eine Spec mit Verzweigung, weil sie
keine Selektoren gemeinsam haben: iOS-Locatoren sind Accessibility-IDs und Labels statt
Resource-IDs.

`DEVTOOLS_MOBILE=web` funktioniert auch hier und benötigt weniger als auf Android: Es
öffnet **Safari**, das der XCUITest-Treiber selbst steuert — kein passender Chromedriver
nötig und nichts, was dem `appium`-Befehl hinzugefügt werden muss.

**Welcher Simulator gesteuert wird, wird in eine UDID aufgelöst, niemals in einen bloßen Namen.** Einen
nicht existierenden zu benennen schlägt nicht fehl — der XCUITest-Treiber *erstellt* ihn und
bootet ihn bei jedem Lauf neben dem bereits laufenden Simulator, sodass jedes Mal ein neuer
Simulator zurückbleibt. Daher verwenden die Beispiele standardmäßig den Simulator, der
bereits gebootet ist, und ein `IOS_DEVICE_NAME`, der zu keinem davon passt, wird mit
der Liste der gebooteten Simulatoren abgelehnt, statt durchgereicht zu werden.

Das ist eine **lokale** Regel. `xcrun simctl` listet lokale Simulatoren auf und sonst nichts,
daher benennt `IOS_UDID` ein Gerät direkt und wird gegen nichts geprüft — ein
echtes Gerät hat keinen Eintrag zum Abgleichen — und bei einem entfernten oder Cloud-Appium
(`APPIUM_HOST` auf etwas anderes als localhost gesetzt) wird ein Gerätename direkt
durchgereicht, da ein solcher Dienst ein Gerät über dessen Namen auswählt.

Über die Android-Voraussetzungen hinaus, von denen iOS keine verwendet, benötigen Sie Xcode (die
Command Line Tools enthalten keine Simulatoren), eine Simulator-Laufzeit
(`xcodebuild -downloadPlatform iOS`, ein separater Download von ca. 8 GB), einen gebooteten
Simulator und `appium driver install xcuitest` — dessen erster Lauf außerdem
WebDriverAgent baut. Appium lädt Treiber beim **Start**, daher meldet ein Server, der
bereits lief, als Sie den Treiber installiert haben, dass er XCUITest nicht finden kann,
bis Sie ihn neu starten.

## Voraussetzungen

Die Ausführung gegen einen lokalen Android-Emulator erfordert, über [Erste Schritte](/docs/devtools/getting-started) hinaus:

1. **Java JDK** und das **Android SDK** — wobei `ANDROID_HOME` auf das SDK zeigen muss, in das der `sdkmanager` in Ihrem `PATH` tatsächlich installiert, was nicht immer `~/Library/Android/sdk` ist.
2. **Ein AVD und einen laufenden Emulator** oder ein physisches Gerät mit USB-Debugging.
3. **Appium mit dem UiAutomator2-Treiber** (`appium driver install uiautomator2`) oder den XCUITest-Treiber für iOS — siehe [iOS](#ios) oben.
4. **Einen passenden Chromedriver** für einen mobilen Browser oder eine hybride App. Ein Webview wird von Chromedriver gesteuert, und der automatische Download von Appium hat häufig keinen Build, der zum Chrome auf dem Systemabbild passt — in beide Richtungen. Dies äußert sich beim Wechsel in einen Webview als `No Chromedriver found that can automate Chrome '<version>'`, was wie ein Erfassungsfehler aussieht, aber eine Lücke in der Umgebung ist. Starten Sie Appium mit `--default-capabilities '{"appium:chromedriverExecutableDir": "<path>"}'` plus `--allow-insecure=uiautomator2:chromedriver_autodownload`. **Ein Lauf mit nativer App benötigt nichts davon.**
5. **Klassisches WebDriver-Protokoll** für WebdriverIO — Appiums BiDi-Shim für UiAutomator2 implementiert nicht jeden BiDi-Befehl, setzen Sie daher `'wdio:enforceWebDriverClassic': true` im Capability-Block.