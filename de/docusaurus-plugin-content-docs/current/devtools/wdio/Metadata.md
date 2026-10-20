---
id: metadata
title: Metadaten
description: "Untersuchen Sie die Capabilities, die Umgebung und das Timing jeder Browser-Sitzung im DevTools-Tab „Metadata“, um umgebungsspezifische Fehler zu diagnostizieren."
---

Untersuchen Sie den vollständigen Kontext jeder Browser-Sitzung, die Ihr Test öffnet. Der Metadata-Tab zeigt die Capabilities, die Umgebung und das Timing hinter jedem Durchlauf an, sodass Sie genau bestätigen können, was getestet wurde, ohne sich durch Logs wühlen zu müssen.

**Was erfasst wird:**
- **Sitzungs-Capabilities** - Browsername und -version, Plattform und die ausgehandelten WebDriver-Capabilities
- **Sitzungsdetails** - Sitzungs-ID, Basis-URL und Viewport-Größe
- **Ausführungs-Timing** - Testdauer, Status sowie Start- und End-Zeitstempel
- **Ansicht pro Sitzung** - Jede Browser-Sitzung (einschließlich der durch `browser.reloadSession()` erstellten Sitzungen) wird unabhängig gespeichert und kann über ein Dropdown-Menü ausgewählt werden

Dies ist von unschätzbarem Wert, um umgebungsspezifische Fehler zu diagnostizieren, zu überprüfen, ob die richtigen Capabilities angewendet wurden, und zu verstehen, wie sich Tests mit mehreren Sitzungen verhalten haben.

## Demo

### 📋 Metadaten
![Metadata Demo](/img/devtools/metadata.gif)