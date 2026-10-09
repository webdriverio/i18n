---
id: appium
title: Konfiguracja Appium
description: "Skonfiguruj Appium i jego sterowniki za pomocą narzędzia appium-installer, aby testować natywne aplikacje mobilne, hybrydowe i desktopowe z WebdriverIO."
---

Za pomocą WebdriverIO możesz testować nie tylko aplikacje internetowe w przeglądarce, ale także inne platformy, takie jak:

- 📱 aplikacje mobilne na iOS, Android lub Tizen
- 🖥️ aplikacje desktopowe na macOS lub Windows
- 📺 a także aplikacje telewizyjne dla Roku, tvOS, Android TV i Samsung

Zalecamy korzystanie z [Appium](https://appium.io/), aby ułatwić przeprowadzanie tego typu testów. Przegląd Appium znajdziesz na ich [oficjalnej stronie dokumentacji](https://appium.io/docs/en/latest/intro/).

Skonfigurowanie odpowiedniego środowiska nie jest proste. Na szczęście ekosystem Appium oferuje świetne narzędzia, które w tym pomagają. Aby skonfigurować jedno z powyższych środowisk, wystarczy uruchomić:

```sh
$ npx appium-installer
```

Spowoduje to uruchomienie narzędzia [appium-installer](https://github.com/AppiumTestDistribution/appium-installer), które przeprowadzi Cię przez proces konfiguracji.