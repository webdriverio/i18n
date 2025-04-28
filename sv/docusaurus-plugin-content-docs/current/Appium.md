---
id: appium
title: Appium Konfiguration
---

Med WebdriverIO kan du inte bara testa webbapplikationer i webbläsaren utan även andra plattformar som:

- 📱 mobilapplikationer på iOS, Android eller Tizen
- 🖥️ skrivbordsapplikationer på macOS eller Windows
- 📺 samt TV-appar för Roku, tvOS, Android TV och Samsung

Vi rekommenderar att du använder [Appium](https://appium.io/) för att underlätta dessa typer av tester. Du kan få en översikt om Appium på deras [officiella dokumentationssida](https://appium.io/docs/en/2.0/intro/).

Att konfigurera rätt miljö är inte helt enkelt. Lyckligtvis har Appium-ekosystemet bra verktyg för detta. För att konfigurera en av ovanstående miljöer, kör bara:

```sh
$ npx appium-installer
```

Detta startar [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) verktyget som guidar dig genom installationsprocessen.