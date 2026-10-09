---
id: metadata
title: Metadaten
description: "Untersuchen Sie die Capabilities, die Umgebung und das Timing jeder Browser-Session im DevTools-Tab „Metadata“, um umgebungsspezifische Fehler zu diagnostizieren."
---

Untersuchen Sie den vollständigen Kontext jeder Browser-Session, die Ihr Test öffnet. Der Metadata-Tab zeigt die Capabilities, die Umgebung und das Timing hinter jedem Durchlauf an, sodass Sie genau bestätigen können, was getestet wurde, ohne sich durch Logs wühlen zu müssen.

**Was erfasst wird:**
- **Session-Capabilities** - Browsername und -version, Plattform sowie die ausgehandelten WebDriver-Capabilities
- **Session-Details** - Session-ID, Basis-URL und Viewport-Größe
- **Ausführungs-Timing** - Testdauer, Status sowie Start- und End-Zeitstempel
- **Ansicht pro Session** - Jede Browser-Session (einschließlich der durch `browser.reloadSession()` erstellten Sessions) wird unabhängig gespeichert und ist über ein Dropdown-Menü auswählbar

Dies ist von unschätzbarem Wert, um umgebungsspezifische Fehler zu diagnostizieren, zu überprüfen, ob die richtigen Capabilities angewendet wurden, und zu verstehen, wie sich Tests mit mehreren Sessions verhalten haben.

## Demo

### 📋 Metadaten
![Metadata Demo](/img/devtools/metadata.gif)