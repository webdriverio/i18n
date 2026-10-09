---
id: appium
title: Appium-konfiguration
description: "Konfigurera Appium och dess drivrutiner med verktygslådan appium-installer för att testa native mobilappar, hybridappar och skrivbordsappar med WebdriverIO."
---

Med WebdriverIO kan du testa inte bara webbapplikationer i webbläsaren utan även andra plattformar, såsom:

- 📱 mobilapplikationer på iOS, Android eller Tizen
- 🖥️ skrivbordsapplikationer på macOS eller Windows
- 📺 samt TV-appar för Roku, tvOS, Android TV och Samsung

Vi rekommenderar att du använder [Appium](https://appium.io/) för att underlätta den här typen av tester. Du kan få en översikt över Appium på deras [officiella dokumentationssida](https://appium.io/docs/en/latest/intro/).

Att konfigurera rätt miljö är inte helt enkelt. Lyckligtvis har Appium-ekosystemet utmärkta verktyg som hjälper dig med detta. För att konfigurera någon av ovanstående miljöer kör du bara:

```sh
$ npx appium-installer
```

Detta startar verktygslådan [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) som guidar dig genom installationsprocessen.