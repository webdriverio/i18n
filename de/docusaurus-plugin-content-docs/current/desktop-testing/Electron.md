---
id: electron
title: Electron
description: "Testen Sie Electron-Apps mit dem WebdriverIO Electron Service, der Chromedriver einrichtet, die Binärdatei Ihrer App erkennt und es Ihnen ermöglicht, Electron-APIs zu mocken."
---

Electron ist ein Framework zum Erstellen von Desktop-Anwendungen mit JavaScript, HTML und CSS. Durch die Einbettung von Chromium und Node.js in seine Binärdatei ermöglicht Electron es Ihnen, eine einzige JavaScript-Codebasis zu pflegen und plattformübergreifende Apps zu erstellen, die unter Windows, macOS und Linux funktionieren – Erfahrung in nativer Entwicklung ist nicht erforderlich.

WebdriverIO bietet einen integrierten Service, der die Interaktion mit Ihrer Electron-App vereinfacht und das Testen sehr einfach macht. Die Vorteile der Verwendung von WebdriverIO zum Testen von Electron-Anwendungen sind:

- 🚗 automatische Einrichtung des benötigten Chromedrivers
- 📦 automatische Pfaderkennung Ihrer Electron-Anwendung – unterstützt [Electron Forge](https://www.electronforge.io/) und [Electron Builder](https://www.electron.build/)
- 🧩 Zugriff auf Electron-APIs innerhalb Ihrer Tests
- 🕵️ Mocking von Electron-APIs über eine Vitest-ähnliche API

Sie benötigen nur wenige einfache Schritte, um loszulegen. Sehen Sie sich dieses einfache Schritt-für-Schritt-Einführungsvideo vom [WebdriverIO YouTube](https://www.youtube.com/@webdriverio)-Kanal an:

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Oder folgen Sie der Anleitung im folgenden Abschnitt.

## Erste Schritte

Um ein neues WebdriverIO-Projekt zu initiieren, führen Sie Folgendes aus:

```sh
npm create wdio@latest ./
```

Ein Installationsassistent führt Sie durch den Prozess. Wenn Sie gefragt werden, welche Art von Tests Sie durchführen möchten, wählen Sie _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ und anschließend bei der Framework-Abfrage _Electron_. Geben Sie danach den Pfad zu Ihrer kompilierten Electron-Anwendung an, z. B. `./dist`, und behalten Sie dann einfach die Standardeinstellungen bei oder passen Sie sie nach Ihren Wünschen an.

Der Konfigurationsassistent installiert alle erforderlichen Pakete und erstellt eine `wdio.conf.js` oder `wdio.conf.ts` mit der notwendigen Konfiguration zum Testen Ihrer Anwendung. Wenn Sie zustimmen, einige Testdateien automatisch generieren zu lassen, können Sie Ihren ersten Test über `npm run wdio` ausführen.

## Manuelle Einrichtung

Wenn Sie WebdriverIO bereits in Ihrem Projekt verwenden, können Sie den Installationsassistenten überspringen und einfach die folgenden Abhängigkeiten hinzufügen:

```sh
npm install --save-dev @wdio/electron-service
```

Anschließend können Sie die folgende Konfiguration verwenden:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

Das war's 🎉

Erfahren Sie mehr darüber, [wie Sie den Electron Service konfigurieren](/docs/desktop-testing/electron/configuration), [wie Sie Electron-APIs mocken](/docs/desktop-testing/electron/api-reference) und [wie Sie auf Electron-APIs zugreifen](/docs/desktop-testing/electron/api).