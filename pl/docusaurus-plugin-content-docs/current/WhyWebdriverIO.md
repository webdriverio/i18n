---
id: why-webdriverio
title: Dlaczego Webdriver.IO?
---

WebdriverIO to progresywny framework automatyzacji stworzony do automatyzacji nowoczesnych aplikacji internetowych i mobilnych. Upraszcza interakcję z aplikacją i dostarcza zestaw wtyczek, które pomagają tworzyć skalowalny, solidny i stabilny zestaw testów.

Jest zaprojektowany, aby być:

- __Rozszerzalny__ - Dodawanie funkcji pomocniczych lub bardziej złożonych zestawów i kombinacji istniejących poleceń jest __proste__ i __naprawdę użyteczne__
- __Kompatybilny__ - WebdriverIO może być uruchamiany na [Protokole WebDriver](https://w3c.github.io/webdriver/) dla __prawdziwego testowania między przeglądarkami__ oraz na [Protokole Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) dla automatyzacji opartej na Chromium przy użyciu [Puppeteer](https://pptr.dev/).
- __Bogaty w funkcje__ - Ogromna różnorodność wbudowanych i społecznościowych wtyczek pozwala __łatwo integrować__ i __rozszerzać__ konfigurację, aby spełnić wymagania.

Możesz używać WebdriverIO do automatyzacji:

- 🌐 <span>&nbsp;</span> __nowoczesnych aplikacji internetowych__ napisanych w React, Vue, Angular, Svelte lub innych frameworkach frontendowych
- 📱 <span>&nbsp;</span> __hybrydowych__ lub __natywnych aplikacji mobilnych__ działających w emulatorze/symulatorze lub na prawdziwym urządzeniu
- 💻 <span>&nbsp;</span> __natywnych aplikacji desktopowych__ (np. napisanych z użyciem Electron.js)
- 📦 <span>&nbsp;</span> __testów jednostkowych lub komponentowych__ komponentów webowych w przeglądarce

## Oparty na standardach webowych

WebdriverIO wykorzystuje moc protokołów [WebDriver](https://w3c.github.io/webdriver/) i [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi), które są rozwijane i wspierane przez wszystkich dostawców przeglądarek i gwarantują prawdziwe doświadczenie testowania międzyprzeglądarkowego. Podczas gdy inne narzędzia automatyzacji wymagają pobierania zmodyfikowanych silników przeglądarek, których nie używają rzeczywiści użytkownicy, lub emulują zachowanie użytkownika poprzez wstrzykiwanie JavaScript, WebdriverIO opiera się na wspólnie uzgodnionym standardzie automatyzacji, który jest [odpowiednio przetestowany](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) i zapewnia kompatybilność na kolejne dekady.

Ponadto WebdriverIO obsługuje również alternatywne, własnościowe protokoły automatyzacji, takie jak [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) do celów debugowania i introspekcji. Pozwala to użytkownikowi płynnie przełączać się między konwencjonalnymi poleceniami opartymi na WebDriver a potężnymi interakcjami przeglądarki poprzez [Puppeteer](https://pptr.dev/).

Przeczytaj więcej o różnicach między tymi standardami automatyzacji w sekcji [Protokoły Automatyzacji](automationProtocols).

## Prawdziwe Open Source

W porównaniu do wielu narzędzi automatyzacji w ekosystemie, WebdriverIO jest prawdziwie projektem open source, który jest prowadzony z otwartym zarządzaniem i należy do organizacji non-profit o nazwie [OpenJS Foundation](https://openjsf.org/). Prawnie zobowiązuje to projekt do rozwijania się i kierowania w interesie wszystkich uczestników. Zespół projektowy ceni otwartość i współpracę i nie jest kierowany interesami monetarnymi.

To sprawia, że projekt jest niezależny w sposobie rozwijania i kierunku, w którym zmierza. Pozwala nam zapewniać darmowe wsparcie 24/7 w naszym [kanale społecznościowym](https://discord.webdriver.io), ponieważ budujemy zrównoważoną społeczność, która wzajemnie się wspiera i uczy. Wreszcie, daje wiele możliwości osobom, które przyczyniają się i angażują w projekt dzięki jego [otwartemu zarządzaniu](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md).