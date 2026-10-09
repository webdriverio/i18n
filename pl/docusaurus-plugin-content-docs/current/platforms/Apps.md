---
id: apps-and-extensions
title: Rozszerzenia i edytory
description: Załaduj rozszerzenie przeglądarki lub rozszerzenie VS Code do sesji WebdriverIO i przetestuj je end-to-end.
---

WebdriverIO testuje rozszerzenia przeglądarek i rozszerzenia edytorów, ładując je do rzeczywistej aplikacji hosta. Rozszerzenia przeglądarki (webowe) działają w Chrome lub Firefoksie. Ładujesz je za pomocą capabilities przeglądarki: `--load-extension` lub plik `.crx` zakodowany w base64 przez `goog:chromeOptions` w Chrome albo `browser.installAddOn()` dla pliku `.xpi` w Firefoksie. W sesji WebDriver BiDi możesz również zainstalować i usunąć rozszerzenie w trakcie sesji za pomocą `browser.installExtension()` i `browser.uninstallExtension()`. Safari nie obsługuje sesji BiDi, więc to polecenie nie obejmuje Safari. Następnie testujesz content scripts i strony popup za pomocą standardowych poleceń WebDriver. Rozszerzenia VS Code testuje się przy użyciu społecznościowego [`wdio-vscode-service`](/docs/wdio-vscode-service). Pobiera on VS Code (stable, insiders lub konkretną wersję) oraz pasujący Chromedriver, a następnie uruchamia VS Code z Twoim rozszerzeniem i niestandardowymi ustawieniami użytkownika. Page objects dla workbencha są dostępne przez `browser.getWorkbench()`, a `browser.executeWorkbench()` uruchamia kod korzystający z API VS Code. Ten sam serwis może również serwować VS Code w przeglądarce, aby testować rozszerzenia webowe. Pluginy Obsidian również mają własny serwis społecznościowy.

## Szybki start

Najpierw zainstaluj testrunner i obsługę TypeScript:

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

### Rozszerzenie Chrome

Zbuduj swoje rozszerzenie do folderu (tutaj `./dist`) i załaduj je za pomocą argumentu Chrome `--load-extension`:

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
        // zastąp elementem, który Twój content script dodaje do strony
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

Kliknięcie ikony rozszerzenia na pasku narzędzi nie działa. Aby przetestować `default_popup`, znajdź identyfikator rozszerzenia na `chrome://extensions/` i otwórz `chrome-extension://<id>/<popup>.html` za pomocą `browser.url()`. [Przewodnik po rozszerzeniach webowych](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) zawiera gotowe niestandardowe polecenie `openExtensionPopup` do tego celu.

### Rozszerzenie VS Code

```sh
npm install --save-dev wdio-vscode-service
```

Dodaj `"wdio-vscode-service"` do tablicy `types` w `tsconfig.json`.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // możliwe również: "insiders" lub konkretna wersja, np. "1.80.0"
        'wdio:vscodeOptions': {
            // wskazuje katalog, w którym znajduje się package.json rozszerzenia
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

Aby przetestować rozszerzenie jako rozszerzenie webowe VS Code, ustaw `browserName: 'chrome'` i pozostaw `wdio:vscodeOptions`. W tym trybie `browserVersion` może mieć tylko wartość `stable` lub `insiders`. `npm create wdio@latest ./` z opcją "VS Code Extension Testing" wygeneruje tę konfigurację za Ciebie.

## Wybierz swoją ścieżkę

- [Testowanie rozszerzeń webowych](/docs/extension-testing/web-extensions): ładowanie rozszerzeń w Chrome (folder lub `.crx`) i Firefoksie (`.xpi` przez [`installAddOn`](/docs/api/gecko#installaddon)) albo instalowanie i usuwanie ich w trakcie sesji za pomocą [`installExtension`](/docs/api/browser/installExtension). Rozszerzenia webowe Safari nie są obsługiwane.
- [Firefox Profile Service](/docs/firefox-profile-service): budowanie profilu Firefoksa zawierającego rozszerzenia.
- [Testowanie rozszerzeń VS Code](/docs/extension-testing/vscode-extensions): konfiguracja, ustawienia TypeScript, page objects workbencha i `executeWorkbench`.
- [VS Code Service](/docs/wdio-vscode-service): wszystkie opcje serwisu, takie jak `cachePath`, oraz sposób pisania własnych page objects.
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service): społecznościowy serwis do testowania pluginów Obsidian w różnych wersjach Obsidian na Windows, macOS, Linux i Android.
- [Niestandardowe polecenia](/docs/customcommands): pakowanie helperów, takich jak `openExtensionPopup`, do ponownego użycia.

Testy rozszerzeń webowych działają w zwykłej sesji Chrome lub Firefoksa, więc wszystko, co opisano w [Przeglądarki internetowe](/docs/platforms/web), ma zastosowanie, w tym selektory, mockowanie sieci i testy wizualne.

## Rozwiązywanie problemów

- Firefox odrzuca lokalnie zbudowane rozszerzenie z powodu podpisywania: zainstaluj je w hooku `before` za pomocą `browser.installAddOn(extension.toString('base64'), true)` zamiast przez profil. Zbuduj plik `.xpi` za pomocą `npx web-ext build`.
- Używasz Edge, Brave lub Opery zamiast Chrome: te same argumenty zwykle działają z capability opcji danej przeglądarki, np. `ms:edgeOptions`.
- Pliki binarne VS Code i Chromedriver są pobierane do katalogu cache. Aby kontrolować, gdzie są przechowywane, np. w celu cache'owania ich w CI, ustaw `services: [['vscode', { cachePath: __dirname }]]`.
- TypeScript nie może znaleźć `getWorkbench` ani `executeWorkbench`: dodaj `wdio-vscode-service` do `compilerOptions.types`.

## Następne kroki

- Dokumentacja [Konfiguracji](/docs/configuration) opisująca każdą opcję `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) do testowania pełnych aplikacji desktopowych zbudowanych na Chromium.
- Inne platformy: [Przeglądarki internetowe](/docs/platforms/web), [Aplikacje mobilne](/docs/platforms/mobile), [Aplikacje desktopowe](/docs/platforms/desktop).