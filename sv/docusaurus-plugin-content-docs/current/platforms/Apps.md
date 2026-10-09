---
id: apps-and-extensions
title: Tillägg och editorer
description: Läs in ett webbläsartillägg eller ett VS Code-tillägg i en WebdriverIO-session och testa det från början till slut.
---

WebdriverIO testar webbläsartillägg och editortillägg genom att läsa in dem i den riktiga värdapplikationen. Webbläsartillägg (webbtillägg) körs i Chrome eller Firefox. Du läser in dem via webbläsarens capabilities: `--load-extension` eller en base64-kodad `.crx` via `goog:chromeOptions` i Chrome, eller `browser.installAddOn()` för en `.xpi` i Firefox. I en WebDriver BiDi-session kan du också installera och ta bort ett tillägg mitt under sessionen med `browser.installExtension()` och `browser.uninstallExtension()`. Safari har ingen BiDi-session, så det kommandot täcker inte Safari. Därefter testar du innehållsskript och popup-sidor med de vanliga WebDriver-kommandona. VS Code-tillägg testas med communitytjänsten [`wdio-vscode-service`](/docs/wdio-vscode-service). Den laddar ner VS Code (stable, insiders eller en specifik version) och motsvarande Chromedriver, och startar sedan VS Code med ditt tillägg och anpassade användarinställningar. Page objects för arbetsytan (workbench) finns tillgängliga via `browser.getWorkbench()`, och `browser.executeWorkbench()` kör kod mot VS Code API. Samma tjänst kan också servera VS Code i en webbläsare för att testa webbtillägg. Obsidian-plugins har också en communitytjänst.

## Snabbstart

Installera först testrunnern och TypeScript-stöd:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

### Chrome-tillägg

Bygg ditt tillägg till en mapp (här `./dist`) och läs in det med Chrome-argumentet `--load-extension`:

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // ersätt med ett element som ditt innehållsskript lägger till på sidan
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

Att klicka på tilläggets ikon i verktygsfältet fungerar inte. För att testa en `default_popup`, hitta tilläggets id på `chrome://extensions/` och öppna `chrome-extension://<id>/<popup>.html` med `browser.url()`. [Guiden för webbtillägg](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) har ett färdigt anpassat kommando, `openExtensionPopup`, för detta.

### VS Code-tillägg

```sh
npm install --save-dev wdio-vscode-service
```

Lägg till `"wdio-vscode-service"` i `types`-arrayen i `tsconfig.json`.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // också möjligt: "insiders" eller en specifik version, t.ex. "1.80.0"
        'wdio:vscodeOptions': {
            // pekar på katalogen där tilläggets package.json finns
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

För att testa tillägget som ett VS Code-webbtillägg, sätt `browserName: 'chrome'` och behåll `wdio:vscodeOptions`. I det läget kan `browserVersion` bara vara `stable` eller `insiders`. `npm create wdio@latest ./` med "VS Code Extension Testing" genererar den här konfigurationen åt dig.

## Välj din väg

- [Testning av webbtillägg](/docs/extension-testing/web-extensions): läs in tillägg i Chrome (mapp eller `.crx`) och Firefox (`.xpi` via [`installAddOn`](/docs/api/gecko#installaddon)), eller installera och ta bort ett mitt under sessionen med [`installExtension`](/docs/api/browser/installExtension). Safari-webbtillägg täcks inte.
- [Firefox Profile Service](/docs/firefox-profile-service): bygg en Firefox-profil som innehåller tillägg.
- [Testning av VS Code-tillägg](/docs/extension-testing/vscode-extensions): konfiguration, TypeScript-inställning, page objects för arbetsytan och `executeWorkbench`.
- [VS Code Service](/docs/wdio-vscode-service): alla tjänstens alternativ, som `cachePath`, och hur du skriver egna page objects.
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service): en communitytjänst som testar Obsidian-plugins över olika Obsidian-versioner på Windows, macOS, Linux och Android.
- [Anpassade kommandon](/docs/customcommands): paketera hjälpfunktioner som `openExtensionPopup` för återanvändning.

Tester av webbtillägg körs i en vanlig Chrome- eller Firefox-session, så allt på [Webbläsare](/docs/platforms/web) gäller, inklusive selektorer, nätverksmockning och visuell testning.

## Felsökning

- Firefox vägrar ett lokalt byggt tillägg på grund av signering: installera det i `before`-hooken med `browser.installAddOn(extension.toString('base64'), true)` i stället för via en profil. Bygg `.xpi`-filen med `npx web-ext build`.
- Använder du Edge, Brave eller Opera i stället för Chrome: samma argument fungerar oftast med den webbläsarens options-capability, t.ex. `ms:edgeOptions`.
- Binärfilerna för VS Code och Chromedriver laddas ner till en cachekatalog. För att styra var de lagras, t.ex. för att cacha dem i CI, sätt `services: [['vscode', { cachePath: __dirname }]]`.
- TypeScript hittar inte `getWorkbench` eller `executeWorkbench`: lägg till `wdio-vscode-service` i `compilerOptions.types`.

## Nästa steg

- [Konfiguration](/docs/configuration) – referens för alla alternativ i `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) för att testa kompletta skrivbordsappar byggda på Chromium.
- Andra plattformar: [Webbläsare](/docs/platforms/web), [Mobilappar](/docs/platforms/mobile), [Skrivbordsappar](/docs/platforms/desktop).