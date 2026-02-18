---
id: network-logs
title: Netzwerk-Protokolle
---

Überwachen und inspizieren Sie alle Netzwerkaktivitäten während Ihrer Tests. DevTools erfasst jede HTTP-Anfrage und -Antwort und bietet Ihnen vollständige Einblicke in API-Aufrufe, Ressourcenladung und Netzwerk-Timing - genau wie Browser-DevTools.

**Was erfasst wird:**
- **Anfrage-Details** - URL, Methode, Header, Abfrageparameter, Anfrage-Body
- **Antwort-Daten** - Statuscode, Antwort-Header, Antwort-Body, Timing
- **Ressourcentypen** - XHR/Fetch-Anfragen, Skripte, Stylesheets, Bilder und mehr
- **Performance-Metriken** - Anfrage-Timing, Dauer und Netzwerk-Wasserfall

Dies ist unschätzbar wertvoll für die Fehlersuche bei API-Problemen, die Identifizierung langsamer Anfragen, die Validierung von Daten-Payloads und das Verständnis des Netzwerkverhaltens Ihrer Anwendung während der Tests.

## Demo

### 🌐 Netzwerk-Protokolle
![Network Logs Overview](./demo/network-logs-1.gif)

![Network Logs Details](./demo/network-logs-2.gif)