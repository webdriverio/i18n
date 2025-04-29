---
id: wdio-vscode-service
title: Usługa Testowania Rozszerzeń VSCode
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-vscode-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

Przetestowano na:

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> Usługa WebdriverIO do testowania rozszerzeń VSCode.

Ta usługa WebdriverIO umożliwia bezproblemowe testowanie rozszerzeń VSCode od początku do końca w środowisku VSCode Desktop IDE lub jako rozszerzenie webowe. Wystarczy, że podasz ścieżkę do swojego rozszerzenia, a usługa zajmie się resztą poprzez:

- 🏗️ Instalację VSCode (zarówno `stable`, `insiders` lub określoną wersję)
- ⬇️ Pobieranie Chromedriver specyficznego dla danej wersji VSCode
- 🚀 Umożliwienie dostępu do API VSCode z poziomu testów
- 🖥️ Uruchamianie VSCode z niestandardowymi ustawieniami użytkownika (w tym obsługa VSCode na Ubuntu, MacOS i Windows)
- 🌐 Lub serwowanie VSCode z serwera, aby uzyskać dostęp przez dowolną przeglądarkę w celu testowania [rozszerzeń webowych](https://code.visualstudio.com/api/extension-guides/web-extensions)
- 📔 Przygotowanie obiektów stron z lokalizatorami pasującymi do Twojej wersji VSCode

Ten projekt został mocno zainspirowany projektem [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester), który bazuje na Selenium. Ten pakiet przejmuje ideę i dostosowuje ją do WebdriverIO.

Od wersji VSCode v1.86 wymagane jest używanie `webdriverio` w wersji 8.14 lub nowszej do instalacji Chromedriver bez konieczności dodatkowej konfiguracji. Jeśli potrzebujesz testować wcześniejsze wersje VSCode, zapoznaj się z sekcją [Konfiguracja Chromedriver](#chromedriver) poniżej.

## Instalacja

Aby rozpocząć nowy projekt WebdriverIO, uruchom:

```bash
npm create wdio ./
```

Kreator instalacji przeprowadzi Cię przez proces. Upewnij się, że wybierzesz TypeScript jako kompilator i nie generujesz obiektów stron, ponieważ ten projekt zawiera już wszystkie potrzebne obiekty stron. Następnie upewnij się, że wybierzesz `vscode` z listy usług:

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

Aby uzyskać więcej informacji na temat instalacji `WebdriverIO`, sprawdź [dokumentację projektu](https://webdriver.io/docs/gettingstarted).

## Przykładowa konfiguracja

Aby korzystać z usługi, musisz dodać `vscode` do swojej listy usług, opcjonalnie z obiektem konfiguracyjnym. Spowoduje to, że WebdriverIO pobierze odpowiednie binaria VSCode i odpowiednią wersję Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" lub "stable" dla najnowszej wersji VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Opcjonalnie zdefiniuj ścieżkę, w której WebdriverIO przechowuje wszystkie binaria VSCode, np.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Jeśli zdefiniujesz `wdio:vscodeOptions` z inną wartością `browserName` niż `vscode`, np. `chrome`, usługa będzie serwować rozszerzenie jako rozszerzenie webowe. Jeśli testujesz na Chrome, nie jest wymagana dodatkowa usługa sterownika, np.:

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

_Uwaga:_ podczas testowania rozszerzeń webowych możesz wybierać tylko między `stable` lub `insiders` jako `browserVersion`.

### Konfiguracja TypeScript

W pliku `tsconfig.json` upewnij się, że dodajesz `wdio-vscode-service` do listy typów:

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
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## Użycie

Możesz używać metody `getWorkbench` do uzyskania dostępu do obiektów stron dla lokalizatorów pasujących do wybranej wersji VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### Dostęp do API VSCode

Jeśli chcesz wykonać określoną automatyzację za pomocą [API VSCode](https://code.visualstudio.com/api/references/vscode-api), możesz to zrobić, uruchamiając zdalne polecenia za pomocą niestandardowego polecenia `executeWorkbench`. To polecenie umożliwia zdalne wykonywanie kodu z testu wewnątrz środowiska VSCode i zapewnia dostęp do API VSCode. Możesz przekazać dowolne parametry do funkcji, które następnie będą przekazane do funkcji. Obiekt `vscode` będzie zawsze przekazywany jako pierwszy argument, a następnie parametry funkcji zewnętrznej. Pamiętaj, że nie możesz uzyskać dostępu do zmiennych spoza zakresu funkcji, ponieważ wywołanie zwrotne jest wykonywane zdalnie. Oto przykład:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // outputs: "I am an API call!"
```

Pełną dokumentację obiektów stron znajdziesz w [dokumentacji](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Możesz znaleźć różne przykłady użycia w [zestawie testów tego projektu](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Konfiguracja

Za pomocą konfiguracji usługi możesz zarządzać wersją VSCode oraz ustawieniami użytkownika dla VSCode:

### Opcje usługi

Opcje usługi to opcje potrzebne do skonfigurowania środowiska testowego przez usługę.

#### `cachePath`

Zdefiniuj ścieżkę pamięci podręcznej, aby uniknąć ponownego pobierania pakietów VS Code. Jest to przydatne dla CI/CD, aby uniknąć ponownego pobierania VSCode dla każdego uruchomienia testu.

Typ: `string`<br />
Domyślnie: `process.cwd()`

### Możliwości VSCode (`wdio:vscodeOptions`)

Aby uruchomić testy przez VSCode, musisz zdefiniować `vscode` jako `browserName`. Możesz określić wersję VSCode, podając możliwość `browserVersion`. Niestandardowe opcje VSCode są następnie definiowane w ramach niestandardowej możliwości `wdio:vscodeOptions`. Opcje są następujące:

#### `binary`

Ścieżka do lokalnie zainstalowanego VSCode. Jeśli opcja nie jest podana, usługa pobierze VSCode na podstawie podanego `browserVersion` (lub `stable`, jeśli nie podano).

Typ: `string`

#### `extensionPath`

Zdefiniuj katalog do rozszerzenia, które chcesz przetestować.

Typ: `string`

#### `storagePath`

Zdefiniuj niestandardową lokalizację, w której VS Code przechowuje wszystkie swoje dane. Jest to katalog główny dla wewnętrznych katalogów VS Code, takich jak (niepełna lista)
* **user-data-dir**: Katalog, w którym przechowywane są wszystkie ustawienia użytkownika (globalne ustawienia), logi rozszerzeń itp.
* **extension-install-dir**: Katalog, w którym instalowane są rozszerzenia VS Code.

Jeśli nie zostanie podany, używany jest katalog tymczasowy.

Typ: `string`

#### `userSettings`

Zdefiniuj niestandardowe ustawienia użytkownika, które mają być zastosowane w VSCode.

Typ: `Record<string, number | string | object | boolean>`<br />
Domyślnie: `{}`

#### `workspacePath`

Otwiera VSCode dla konkretnego obszaru roboczego. Jeśli nie zostanie podany, VSCode uruchamia się bez otwartego obszaru roboczego.

Typ: `string`

#### `filePath`

Otwiera VSCode z określonym otwartym plikiem.

Typ: `string`

#### `vscodeArgs`

Dodatkowe argumenty uruchomieniowe jako obiekt, np.

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

zostaną przekazane jako:

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

Typ: `Record<string, string | boolean>`<br />
Domyślnie: zobacz [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

Jeśli ustawione na true, usługa rejestruje dane wyjściowe VSCode z hosta rozszerzenia i API konsoli.

Typ: `boolean`<br />
Domyślnie: `false`

#### `vscodeProxyOptions`

Konfiguracje proxy API VSCode definiują, w jaki sposób WebdriverIO łączy się z obszarem roboczym VSCode, aby zapewnić dostęp do API VSCode.

Typ: `VSCodeProxyOptions`<br />
Domyślnie:

```ts
{
    /**
     * Jeśli ustawione na true, usługa próbuje nawiązać połączenie z
     * obszarem roboczym VSCode, aby umożliwić dostęp do API VSCode
     */
    enable: true,
    /**
     * Port połączenia WebSocket używanego do połączenia z obszarem roboczym.
     * Domyślnie ustawiony na dostępny port w systemie operacyjnym.
     */
    // port?: number
    /**
     * Limit czasu na połączenie z WebSocket wewnątrz VSCode
     */
    connectionTimeout: 5000,
    /**
     * Limit czasu na wykonanie polecenia w VSCode
     */
    commandTimeout: 5000
}
```

### Chromedriver

Od wersji VSCode v1.86 wymagane jest używanie `webdriverio` w wersji 8.14 lub nowszej do instalacji Chromedriver bez konieczności dodatkowej konfiguracji. [Uproszczona konfiguracja automatyzacji przeglądarki](https://webdriver.io/blog/2023/07/31/driver-management) zajmie się wszystkim za Ciebie.

Aby przetestować wcześniejsze wersje VS Code, znajdź oczekiwaną wersję Chromedriver z logów, pobierz [Chromedriver](https://chromedriver.chromium.org/downloads) i skonfiguruj ścieżkę. Na przykład:

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## Tworzenie własnych PageObjects

Możesz ponownie wykorzystać komponenty używane w tej usłudze do własnych obiektów stron. W tym celu najpierw utwórz plik definiujący wszystkie selektory, np.:

```ts
// np. w /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // element kontenera komponentu
    submit: 'button[type="submit"]', // przycisk submit
    username: 'input.username', // pole username
    password: 'input.password' // pole password
}
```

Teraz możesz utworzyć obiekt strony w następujący sposób:

```ts
// np. w /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private klucz lokalizatora do identyfikacji mapy lokalizatorów (patrz locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

Teraz w swoim teście możesz użyć obiektu strony w następujący sposób:

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// np. w /test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // możesz również używać elementów obiektu strony bezpośrednio przez `[selector]$`
        // lub `[selector]$$`, np.:
        await loginForm.submit$.click()

        // lub uzyskać dostęp do lokalizatorów bezpośrednio
        console.log(loginForm.locators.username)
        // wyświetla: "input.username"
    })
})
```

## Wsparcie TypeScript

Jeśli używasz WebdriverIO z TypeScript, upewnij się, że dodałeś `wdio-vscode-service` do swoich `types` w pliku `tsconfig.json`, np.:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // dodaj tę usługę do swoich typów
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## Wsparcie dla Proxy

Podczas inicjalizacji tej usługi pobierane są ChromeDriver i dystrybucja VSCode. Możesz przekierować te żądania przez proxy, ustawiając zmienną środowiskową `HTTPS_PROXY` lub `https_proxy`. Np.:

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## Referencje

Następujące rozszerzenia VS Code używają `wdio-vscode-service`:

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k pobrań)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m pobrań)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k pobrań)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m pobrań)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k pobrań)

## Współpraca

Przed wysłaniem pull requesta, wykonaj następujące kroki:

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (lub `npm run ci`)

## Dowiedz się więcej

Jeśli chcesz dowiedzieć się więcej o testowaniu rozszerzeń VSCode, obejrzyj wystąpienie [Christiana Bromanna](https://twitter.com/bromann) na [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU):

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

Aby uzyskać więcej informacji na temat WebdriverIO, sprawdź [stronę główną](https://webdriver.io) projektu.