---
id: network-logs
title: Netzwerkprotokolle
description: "Untersuchen Sie jede HTTP-Anfrage und -Antwort, die DevTools während eines Tests erfasst, um API-Aufrufe, Payloads und langsame Anfragen zu debuggen."
---

Überwachen und untersuchen Sie sämtliche Netzwerkaktivitäten während Ihrer Tests. DevTools erfasst jede HTTP-Anfrage und -Antwort und gibt Ihnen vollständigen Einblick in API-Aufrufe, das Laden von Ressourcen und das Netzwerk-Timing – genau wie die DevTools des Browsers.

**Was erfasst wird:**
- **Anfragedetails** – URL, Methode, Header, Query-Parameter, Request-Body
- **Antwortdaten** – Statuscode, Response-Header, Response-Body, Timing
- **Ressourcentypen** – XHR/Fetch-Anfragen, Skripte, Stylesheets, Bilder und mehr
- **Performance-Metriken** – Anfrage-Timing, Dauer und Netzwerk-Wasserfall

Dies ist von unschätzbarem Wert, um API-Probleme zu debuggen, langsame Anfragen zu identifizieren, Daten-Payloads zu validieren und das Netzwerkverhalten Ihrer Anwendung während der Tests zu verstehen.

## Ohne WebDriver BiDi

Safari und jede von Appium bereitgestellte Session (Safari auf iOS, Chrome auf Android) stellen kein WebDriver BiDi bereit, daher wird der Network-Tab dort von der Seite selbst befüllt, und zwar über denselben injizierten Collector, der auch das DOM aufzeichnet. Er nutzt zwei Quellen der Seite selbst:

- **`fetch` / `XMLHttpRequest`-Patch**: Jeder Aufruf, den die Seite tätigt, enthält Methode, Header, Status und Body.
- **Resource-Timing-Puffer**: Jeder Ladevorgang des Browsers (das Dokument, Skripte, Styles, Bilder, Schriftarten) mit seinen Timing-Phasen und seiner Größe sowie, unter Chromium, einem Status. Der Puffer wird ausgelesen, wenn der Collector installiert wird, sodass auch Ladevorgänge enthalten sind, die stattfanden, bevor er existierte.

Resource Timing kann keine Header oder Bodies sehen und meldet unter Safari keinen Status. Jede solche Zeile weist in ihrer Detailkarte darauf hin, eine Zeile ohne Status wird als unbekannt eingefärbt statt als fehlgeschlagen oder noch ausstehend, und die Methodenspalte zeigt einen Strich an, wo der Browser keine Methode nennt. In einem Trace enthält der `trace.network`-Eintrag der Zeile `_source: "resource-timing"` und den erfassten `_resourceType`, sodass ein erneut geöffneter Trace dieselbe Zeile darstellt. Eine Anfrage, die von beiden Quellen erfasst wurde, wird nur einmal aufgeführt.

Wenn BiDi die Session bedient, das heißt, wenn es ein Netzwerkereignis geliefert und nicht bloß ein Abonnement akzeptiert hat, werden die Resource-Timing-Zeilen verworfen, sodass jede Anfrage nur einmal aufgeführt wird. Unter Nightwatch ergänzt das Chrome-Performance-Log diese Zeilen direkt um die verfügbaren Header und den Status.

Eine Session einer nativen App hat kein Dokument, daher greift keine der beiden Quellen. Ihr Netzwerkverkehr kann stattdessen über das appium-interceptor-Plugin ausgelesen werden, wenn die Session `appium:intercept: true` setzt; siehe [Native app network](/docs/devtools/mobile#native-app-network).

## Demo

### 🌐 Netzwerkprotokolle
![Network Logs](/img/devtools/network-logs.gif)