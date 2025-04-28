---
id: electron
title: Electron
---

Electron är ett ramverk för att bygga skrivbordsapplikationer med JavaScript, HTML och CSS. Genom att bädda in Chromium och Node.js i sin binärfil, låter Electron dig behålla en JavaScript-kodbas och skapa plattformsoberoende appar som fungerar på Windows, macOS och Linux — ingen erfarenhet av nativ utveckling krävs.

WebdriverIO tillhandahåller en integrerad tjänst som förenklar interaktionen med din Electron-app och gör testningen mycket enkel. Fördelarna med att använda WebdriverIO för att testa Electron-applikationer är:

- 🚗 automatisk installation av nödvändig Chromedriver
- 📦 automatisk sökvägsdetektion av din Electron-applikation - stödjer [Electron Forge](https://www.electronforge.io/) och [Electron Builder](https://www.electron.build/)
- 🧩 åtkomst till Electron-API:er i dina tester
- 🕵️ mockning av Electron-API:er via ett Vitest-liknande API

Du behöver bara några enkla steg för att komma igång. Titta på denna enkla steg-för-steg komma igång-videohandledning från [WebdriverIO YouTube](https://www.youtube.com/@webdriverio)-kanalen:

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Eller följ guiden i följande avsnitt.

## Komma igång

För att starta ett nytt WebdriverIO-projekt, kör:

```sh
npm create wdio@latest ./
```

En installationsguide kommer att vägleda dig genom processen. Se till att välja _"Desktop Testing - of Electron Applications"_ när den frågar vilken typ av testning du vill göra. Ange sedan sökvägen till din kompilerade Electron-applikation, t.ex. `./dist`, behåll sedan standardinställningarna eller ändra efter dina önskemål.

Konfigurationsguiden kommer att installera alla nödvändiga paket och skapa en `wdio.conf.js` eller `wdio.conf.ts` med den nödvändiga konfigurationen för att testa din applikation. Om du går med på att automatiskt generera några testfiler kan du köra ditt första test via `npm run wdio`.

## Manuell installation

Om du redan använder WebdriverIO i ditt projekt kan du hoppa över installationsguiden och bara lägga till följande beroenden:

```sh
npm install --save-dev wdio-electron-service
```

Sedan kan du använda följande konfiguration:

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

Det var allt 🎉

Lär dig mer om hur [man konfigurerar Electron Service](/docs/desktop-testing/electron/configuration), [hur man mockar Electron-API:er](/docs/desktop-testing/electron/mocking) och [hur man kommer åt Electron-API:er](/docs/desktop-testing/electron/api).