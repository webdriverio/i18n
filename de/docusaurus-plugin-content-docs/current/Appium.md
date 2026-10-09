---
id: appium
title: Appium-Einrichtung
description: "Richten Sie Appium und seine Treiber mit dem appium-installer-Toolkit ein, um native mobile, hybride und Desktop-Apps mit WebdriverIO zu testen."
---

Mit WebdriverIO können Sie nicht nur Webanwendungen im Browser testen, sondern auch andere Plattformen wie:

- 📱 mobile Anwendungen auf iOS, Android oder Tizen
- 🖥️ Desktop-Anwendungen auf macOS oder Windows
- 📺 sowie TV-Apps für Roku, tvOS, Android TV und Samsung

Wir empfehlen, [Appium](https://appium.io/) zu verwenden, um diese Art von Tests zu erleichtern. Einen Überblick über Appium erhalten Sie auf der [offiziellen Dokumentationsseite](https://appium.io/docs/en/latest/intro/).

Die Einrichtung der richtigen Umgebung ist nicht ganz einfach. Glücklicherweise bietet das Appium-Ökosystem hervorragende Tools, die Ihnen dabei helfen. Um eine der oben genannten Umgebungen einzurichten, führen Sie einfach Folgendes aus:

```sh
$ npx appium-installer
```

Dadurch wird das [appium-installer](https://github.com/AppiumTestDistribution/appium-installer)-Toolkit gestartet, das Sie durch den Einrichtungsprozess führt.