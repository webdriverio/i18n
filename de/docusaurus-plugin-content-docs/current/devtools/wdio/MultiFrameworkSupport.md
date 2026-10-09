---
id: multi-framework-support
title: Unterstützung mehrerer Frameworks
description: "Verwenden Sie den DevTools-Service mit Mocha, Jasmine oder Cucumber ohne framework-spezifische Konfiguration."
---

DevTools funktioniert automatisch mit Mocha, Jasmine und Cucumber, ohne dass eine framework-spezifische Konfiguration erforderlich ist. Fügen Sie einfach den Service zu Ihrer WebDriverIO-Konfiguration hinzu, und alle Funktionen arbeiten nahtlos, unabhängig davon, welches Test-Framework Sie verwenden.

**Unterstützte Frameworks:**
- **Mocha** - Ausführung auf Test- und Suite-Ebene mit Grep-Filterung
- **Jasmine** - Vollständige Integration mit Grep-basierter Filterung
- **Cucumber** - Ausführung auf Szenario- und Beispiel-Ebene mit Feature:Zeile-Targeting

Dieselbe Debugging-Oberfläche sowie dieselben Funktionen zum erneuten Ausführen von Tests und zur Visualisierung funktionieren einheitlich über alle Frameworks hinweg.

## Konfiguration

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // oder 'jasmine' oder 'cucumber'
    services: ['devtools'],
    // ...
};
```