---
id: vscode-extensions
title: Testowanie rozszerzeń VS Code
---

WebdriverIO pozwala na płynne testowanie rozszerzeń [VS Code](https://code.visualstudio.com/) od początku do końca w środowisku IDE VS Code Desktop lub jako rozszerzenie internetowe. Wystarczy podać ścieżkę do rozszerzenia, a framework zajmie się resztą. Dzięki [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) wszystko jest obsługiwane i znacznie więcej:

- 🏗️ Instalacja VSCode (stabilna, insiders lub określona wersja)
- ⬇️ Pobieranie Chromedriver specyficznego dla danej wersji VSCode
- 🚀 Umożliwia dostęp do API VSCode z poziomu testów
- 🖥️ Uruchamianie VSCode z niestandardowymi ustawieniami użytkownika (w tym wsparcie dla VSCode na Ubuntu, MacOS i Windows)
- 🌐 Lub udostępnianie VSCode z serwera, aby umożliwić dostęp z dowolnej przeglądarki do testowania rozszerzeń internetowych
- 📔 Tworzenie obiektów stron z lokalizatorami dopasowanymi do twojej wersji VSCode

## Rozpoczęcie pracy

Aby zainicjować nowy projekt WebdriverIO, uruchom:

```sh
npm create wdio@latest ./
```

Kreator instalacji przeprowadzi Cię przez proces. Upewnij się, że wybierzesz opcję _"VS Code Extension Testing"_, gdy zostaniesz zapytany o rodzaj testów, następnie zachowaj ustawienia domyślne lub zmodyfikuj je według własnych preferencji.

## Przykładowa konfiguracja

Aby korzystać z usługi, musisz dodać `vscode` do listy usług, opcjonalnie wraz z obiektem konfiguracyjnym. To sprawi, że WebdriverIO pobierze określone pliki binarne VSCode i odpowiednią wersję Chromedriver:

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
     * opcjonalnie możesz zdefiniować ścieżkę, w której WebdriverIO przechowuje
     * pliki binarne VSCode i Chromedriver, np.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Jeśli zdefiniujesz `wdio:vscodeOptions` z inną wartością `browserName` niż `vscode`, np. `chrome`, usługa udostępni rozszerzenie jako rozszerzenie internetowe. Jeśli testujesz na Chrome, nie jest wymagana dodatkowa usługa sterownika, np.:

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

_Uwaga:_ podczas testowania rozszerzeń internetowych możesz wybierać tylko między `stable` lub `insiders` jako `browserVersion`.

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

Możesz użyć metody `getWorkbench`, aby uzyskać dostęp do obiektów stron dla lokalizatorów pasujących do wybranej wersji VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Stamtąd możesz uzyskać dostęp do wszystkich obiektów stron, używając odpowiednich metod obiektów stron. Dowiedz się więcej o wszystkich dostępnych obiektach stron i ich metodach w [dokumentacji obiektów stron](https://webdriverio-community.github.io/wdio-vscode-service/).

### Dostęp do API VSCode

Jeśli chcesz wykonać określoną automatyzację za pomocą [API VSCode](https://code.visualstudio.com/api/references/vscode-api), możesz to zrobić, uruchamiając zdalne polecenia za pomocą niestandardowego polecenia `executeWorkbench`. To polecenie umożliwia zdalne wykonanie kodu z testu wewnątrz środowiska VSCode i dostęp do API VSCode. Możesz przekazać dowolne parametry do funkcji, które zostaną następnie przekazane do funkcji. Obiekt `vscode` będzie zawsze przekazywany jako pierwszy argument, a następnie parametry funkcji zewnętrznej. Pamiętaj, że nie możesz uzyskać dostępu do zmiennych poza zakresem funkcji, ponieważ callback jest wykonywany zdalnie. Oto przykład:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // wyświetla: "I am an API call!"
```

Pełna dokumentacja obiektów stron znajduje się w [dokumentacji](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Możesz znaleźć różne przykłady użycia w [zestawie testów tego projektu](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Więcej informacji

Możesz dowiedzieć się więcej o konfigurowaniu [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) i jak tworzyć niestandardowe obiekty stron w [dokumentacji usługi](/docs/wdio-vscode-service). Możesz również obejrzeć poniższy wykład [Christiana Bromanna](https://twitter.com/bromann) na temat [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>