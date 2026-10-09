---
id: electron
title: Electron
description: "Testa Electron-appar med WebdriverIO:s Electron-tjänst, som konfigurerar Chromedriver, hittar din apps binärfil och låter dig mocka Electron-API:er."
---

Electron är ett ramverk för att bygga skrivbordsapplikationer med JavaScript, HTML och CSS. Genom att bädda in Chromium och Node.js i sin binärfil låter Electron dig underhålla en enda JavaScript-kodbas och skapa plattformsoberoende appar som fungerar på Windows, macOS och Linux – ingen erfarenhet av native-utveckling krävs.

WebdriverIO tillhandahåller en integrerad tjänst som förenklar interaktionen med din Electron-app och gör det mycket enkelt att testa den. Fördelarna med att använda WebdriverIO för att testa Electron-applikationer är:

- 🚗 automatisk konfiguration av nödvändig Chromedriver
- 📦 automatisk identifiering av sökvägen till din Electron-applikation – stöder [Electron Forge](https://www.electronforge.io/) och [Electron Builder](https://www.electron.build/)
- 🧩 åtkomst till Electron-API:er i dina tester
- 🕵️ mockning av Electron-API:er via ett Vitest-liknande API

Det krävs bara några enkla steg för att komma igång. Titta på den här enkla steg-för-steg-videoguiden för att komma igång från kanalen [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Eller följ guiden i följande avsnitt.

## Kom igång

För att starta ett nytt WebdriverIO-projekt, kör:

```sh
npm create wdio@latest ./
```

En installationsguide leder dig genom processen. När du tillfrågas vilken typ av testning du vill göra, välj _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ och välj sedan _Electron_ när du får frågan om ramverk. Ange därefter sökvägen till din kompilerade Electron-applikation, t.ex. `./dist`, och behåll sedan standardvärdena eller ändra dem efter dina önskemål.

Konfigurationsguiden installerar alla nödvändiga paket och skapar en `wdio.conf.js` eller `wdio.conf.ts` med den konfiguration som behövs för att testa din applikation. Om du godkänner att några testfiler genereras automatiskt kan du köra ditt första test via `npm run wdio`.

## Manuell konfiguration

Om du redan använder WebdriverIO i ditt projekt kan du hoppa över installationsguiden och bara lägga till följande beroenden:

```sh
npm install --save-dev @wdio/electron-service
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

Läs mer om hur du [konfigurerar Electron-tjänsten](/docs/desktop-testing/electron/configuration), [hur du mockar Electron-API:er](/docs/desktop-testing/electron/api-reference) och [hur du får åtkomst till Electron-API:er](/docs/desktop-testing/electron/api).