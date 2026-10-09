---
id: vscode-extensions
title: Testowanie rozszerzeń VS Code
description: "Testuj rozszerzenia VS Code end-to-end w desktopowym IDE lub jako rozszerzenia webowe za pomocą WebdriverIO i usługi VS Code."
---

WebdriverIO pozwala bezproblemowo testować Twoje rozszerzenia [VS Code](https://code.visualstudio.com/) end-to-end w desktopowym IDE VS Code lub jako rozszerzenie webowe. Wystarczy podać ścieżkę do rozszerzenia, a framework zajmie się resztą. Dzięki [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) wszystko jest obsługiwane automatycznie, a to nie wszystko:

- 🏗️ Instalacja VSCode (w wersji stable, insiders lub określonej wersji)
- ⬇️ Pobieranie Chromedrivera właściwego dla danej wersji VSCode
- 🚀 Umożliwia dostęp do API VSCode z poziomu testów
- 🖥️ Uruchamianie VSCode z niestandardowymi ustawieniami użytkownika (w tym obsługa VSCode na Ubuntu, MacOS i Windows)
- 🌐 Lub serwowanie VSCode z serwera, aby był dostępny w dowolnej przeglądarce do testowania rozszerzeń webowych
- 📔 Inicjalizacja obiektów stron (page objects) z lokatorami dopasowanymi do Twojej wersji VSCode

## Pierwsze kroki

Aby zainicjować nowy projekt WebdriverIO, uruchom:

```sh
npm create wdio@latest ./
```

Kreator instalacji przeprowadzi Cię przez cały proces. Upewnij się, że wybierzesz _"VS Code Extension Testing"_, gdy zostaniesz zapytany, jaki rodzaj testów chcesz przeprowadzać, a następnie po prostu zachowaj ustawienia domyślne lub zmodyfikuj je według własnych preferencji.

## Przykładowa konfiguracja

Aby korzystać z usługi, musisz dodać `vscode` do listy usług, opcjonalnie wraz z obiektem konfiguracyjnym. Spowoduje to, że WebdriverIO pobierze wskazane pliki binarne VSCode oraz odpowiednią wersję Chromedrivera:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" lub "stable" dla najnowszej wersji VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * opcjonalnie możesz zdefiniować ścieżkę, w której WebdriverIO przechowuje wszystkie
     * pliki binarne VSCode i Chromedrivera, np.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Jeśli zdefiniujesz `wdio:vscodeOptions` z jakąkolwiek inną wartością `browserName` niż `vscode`, np. `chrome`, usługa będzie serwować rozszerzenie jako rozszerzenie webowe. Jeśli testujesz w Chrome, nie jest wymagana żadna dodatkowa usługa sterownika, np.:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_Uwaga:_ podczas testowania rozszerzeń webowych jako `browserVersion` możesz wybrać jedynie `stable` lub `insiders`.

### Konfiguracja TypeScript

W pliku `tsconfig.json` upewnij się, że dodałeś `wdio-vscode-service` do listy typów:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Użycie

Następnie możesz użyć metody `getWorkbench`, aby uzyskać dostęp do obiektów stron z lokatorami dopasowanymi do wybranej wersji VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Od tego miejsca możesz uzyskać dostęp do wszystkich obiektów stron, korzystając z odpowiednich metod. Więcej informacji o wszystkich dostępnych obiektach stron i ich metodach znajdziesz w [dokumentacji obiektów stron](https://webdriverio-community.github.io/wdio-vscode-service/).

### Dostęp do API VSCode

Jeśli chcesz wykonać określoną automatyzację za pomocą [API VSCode](https://code.visualstudio.com/api/references/vscode-api), możesz to zrobić, uruchamiając zdalne polecenia za pomocą niestandardowej komendy `executeWorkbench`. Ta komenda pozwala zdalnie wykonywać kod z Twojego testu wewnątrz środowiska VSCode i umożliwia dostęp do API VSCode. Do funkcji możesz przekazać dowolne parametry, które zostaną następnie do niej przekazane. Obiekt `vscode` zawsze będzie przekazywany jako pierwszy argument, a po nim parametry funkcji zewnętrznej. Pamiętaj, że nie masz dostępu do zmiennych spoza zakresu funkcji, ponieważ callback jest wykonywany zdalnie. Oto przykład:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // wypisuje: "I am an API call!"
```

Pełną dokumentację obiektów stron znajdziesz w [dokumentacji](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Różne przykłady użycia znajdziesz w [zestawie testów tego projektu](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Więcej informacji

Więcej o tym, jak skonfigurować [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) i jak tworzyć niestandardowe obiekty stron, dowiesz się z [dokumentacji usługi](/docs/wdio-vscode-service). Możesz także obejrzeć wystąpienie [Christiana Bromanna](https://twitter.com/bromann) pt. [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>