---
id: multi-framework-support
title: Unterstützung mehrerer Frameworks
---

DevTools funktioniert automatisch mit Mocha, Jasmine und Cucumber, ohne dass eine framework-spezifische Konfiguration erforderlich ist. Fügen Sie einfach den Service zu Ihrer WebDriverIO-Konfiguration hinzu, und alle Funktionen arbeiten nahtlos zusammen, unabhängig davon, welches Test-Framework Sie verwenden.

**Unterstützte Frameworks:**
- **Mocha** - Test- und Suite-Level-Ausführung mit Grep-Filterung
- **Jasmine** - Vollständige Integration mit Grep-basierter Filterung
- **Cucumber** - Szenario- und Beispiel-Level-Ausführung mit Feature:Line-Targeting

Die gleiche Debugging-Schnittstelle, Test-Wiederholungsfunktionen und Visualisierungsfunktionen funktionieren konsistent über alle Frameworks hinweg.

## Konfiguration

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // or 'jasmine' or 'cucumber'
    services: ['devtools'],
    // ...
};
```