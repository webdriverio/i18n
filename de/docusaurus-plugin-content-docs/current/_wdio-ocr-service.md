---
id: wdio-ocr-service
title: OCR-Testdienst
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/ocr-service ist ein Drittanbieter-Paket, weitere Informationen finden Sie auf [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/ocr-service)

Für die Dokumentation zum visuellen Testen mit WebdriverIO lesen Sie bitte die [Dokumentation](https://webdriver.io/docs/visual-testing). Dieses Projekt enthält alle relevanten Module für die Durchführung visueller Tests mit WebdriverIO. Im Verzeichnis `./packages` finden Sie:

-   `@wdio/visual-testing`: Der WebdriverIO-Dienst zur Integration visueller Tests
-   `webdriver-image-comparison`: Ein Modul zum Bildvergleich, das für verschiedene NodeJS-Testautomatisierungs-Frameworks verwendet werden kann, die das WebDriver-Protokoll unterstützen

## Storybook Runner (BETA)

<details>
  <summary>Klicken Sie hier, um weitere Dokumentation über den Storybook Runner BETA zu finden</summary>

> Storybook Runner befindet sich noch in der BETA-Phase, die Dokumentation wird später auf die [WebdriverIO](https://webdriver.io/docs/visual-testing) Dokumentationsseiten verschoben.

Dieses Modul unterstützt jetzt Storybook mit einem neuen Visual Runner. Dieser Runner scannt automatisch nach einer lokalen/entfernten Storybook-Instanz und erstellt Element-Screenshots für jede Komponente. Dies kann erreicht werden, indem Sie

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

zu Ihren `services` hinzufügen und `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` über die Befehlszeile ausführen.
Es verwendet standardmäßig Chrome im Headless-Modus als Browser.

> [!NOTE]
>
> -   Die meisten Optionen für Visual Testing funktionieren auch für den Storybook Runner, siehe die [WebdriverIO](https://webdriver.io/docs/visual-testing) Dokumentation.
> -   Der Storybook Runner überschreibt alle Ihre Capabilities und kann nur auf den Browsern ausgeführt werden, die er unterstützt, siehe [`--browsers`](#browsers).
> -   Der Storybook Runner unterstützt keine bestehende Konfiguration mit Multiremote-Capabilities und wirft einen Fehler.
> -   Der Storybook Runner unterstützt nur Desktop Web, nicht Mobile Web.

### Storybook Runner Service-Optionen

Service-Optionen können wie folgt bereitgestellt werden

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Einige Standardoptionen
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Die Storybook-Optionen, siehe CLI-Optionen für die Beschreibung
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` kann ein String sein ('example-button--secondary'),
                // ein Array (['example-button--secondary', 'example-button--small'])
                // oder ein Regex, der als String angegeben werden muss ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Optional - Ermöglicht das Überschreiben des Baseline-Pfads. Standardmäßig werden die Baselines nach Kategorie und Komponente gruppiert (z.B. forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Storybook Runner CLI-Optionen

#### `--additionalSearchParams`

-   **Typ:** `string`
-   **Erforderlich:** Nein
-   **Standard:** ''
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Es fügt zusätzliche Suchparameter zur Storybook-URL hinzu.
Siehe die [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) Dokumentation für weitere Informationen. Der String muss ein gültiger URLSearchParams-String sein.

> [!NOTE]
> Die doppelten Anführungszeichen sind notwendig, um zu verhindern, dass das `&` als Befehlstrennzeichen interpretiert wird.
> Zum Beispiel mit `--additionalSearchParams="foo=bar&abc=def"` wird die folgende Storybook-URL für den Story-Test generiert: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Typ:** `string`
-   **Erforderlich:** Nein
-   **Standard:** `chrome`, Sie können aus `chrome|firefox|edge|safari` wählen
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **HINWEIS:** Nur über die CLI verfügbar

Es verwendet die angegebenen Browser, um Komponenten-Screenshots zu erstellen

> [!NOTE]
> Stellen Sie sicher, dass die Browser, die Sie verwenden möchten, auf Ihrem lokalen Computer installiert sind

#### `--clip`

-   **Typ:** `boolean`
-   **Erforderlich:** Nein
-   **Standard:** `true`
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Wenn deaktiviert, wird ein Viewport-Screenshot erstellt. Wenn aktiviert, werden Element-Screenshots basierend auf dem [`--clipSelector`](#clipselector) erstellt, was die Menge an Leerraum um den Komponenten-Screenshot reduziert und die Größe des Screenshots verringert.

#### `--clipSelector`

-   **Typ:** `string`
-   **Erforderlich:** Nein
-   **Standard:** `#storybook-root > :first-child` für Storybook V7 und `#root > :first-child:not(script):not(style)` für Storybook V6, siehe auch [`--version`](#version)
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Dies ist der Selektor, der verwendet wird:

-   um das Element auszuwählen, von dem ein Screenshot erstellt werden soll
-   für das Element, das sichtbar sein muss, bevor ein Screenshot erstellt wird

#### `--devices`

-   **Typ:** `string`
-   **Erforderlich:** Nein
-   **Standard:** Sie können aus den [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) wählen
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **HINWEIS:** Nur über die CLI verfügbar

Es verwendet die angegebenen Geräte, die mit den [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) übereinstimmen, um Komponenten-Screenshots zu erstellen

> [!NOTE]
>
> -   Wenn Ihnen eine Gerätekonfiguration fehlt, können Sie gerne eine [Feature-Anfrage](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md) einreichen
> -   Dies funktioniert nur mit Chrome:
>     -   wenn Sie `--devices` angeben, werden alle Chrome-Instanzen im **Mobile Emulation**-Modus ausgeführt
>     -   wenn Sie auch andere Browser als Chrome angeben, wie `--devices --browsers=firefox,safari,edge`, wird Chrome im Mobile-Emulationsmodus automatisch hinzugefügt
> -   Der Storybook Runner erstellt standardmäßig Element-Snapshots. Wenn Sie den vollständigen Mobile-Emulierten Screenshot sehen möchten, geben Sie `--clip=false` über die Befehlszeile an
> -   Der Dateiname sieht zum Beispiel so aus: `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[SRC:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Das Testen einer mobilen Website auf einem Desktop mit mobiler Emulation kann nützlich sein, aber Tester sollten sich bewusst sein, dass es viele subtile Unterschiede gibt, wie:
>     -   völlig unterschiedliche GPU, was zu großen Leistungsänderungen führen kann;
>     -   mobile UI wird nicht emuliert (insbesondere beeinflusst die ausgeblendete URL-Leiste die Seitenhöhe);
>     -   das Disambiguation-Popup (bei dem Sie eines von mehreren Touch-Zielen auswählen) wird nicht unterstützt;
>     -   viele Hardware-APIs (zum Beispiel das orientationchange-Event) sind nicht verfügbar.

#### `--headless`

-   **Typ:** `boolean`
-   **Erforderlich:** Nein
-   **Standard:** `true`
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **HINWEIS:** Nur über die CLI verfügbar

Dies führt die Tests standardmäßig im Headless-Modus aus (wenn der Browser dies unterstützt) oder kann deaktiviert werden

#### `--numShards`

-   **Typ:** `number`
-   **Erforderlich:** Nein
-   **Standard:** `true`
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Dies ist die Anzahl der parallelen Instanzen, die zum Ausführen der Stories verwendet werden. Dies wird durch die `maxInstances` in Ihrer `wdio.conf`-Datei begrenzt.

> [!IMPORTANT]
> Wenn Sie im `headless`-Modus ausführen, erhöhen Sie die Anzahl nicht auf mehr als 20, um Instabilität aufgrund von Ressourcenbeschränkungen zu vermeiden

#### `--skipStories`

-   **Typ:** `string|regex`
-   **Erforderlich:** Nein
-   **Standard:** null
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Dies kann sein:

-   ein String (`example-button--secondary,example-button--small`)
-   oder ein Regex (`"/.*button.*/gm"`)

um bestimmte Stories zu überspringen. Verwenden Sie die `id` der Story, die in der URL der Story zu finden ist. Zum Beispiel ist die `id` in dieser URL `http://localhost:6006/?path=/story/example-page--logged-out` `example-page--logged-out`

#### `--url`

-   **Typ:** `string`
-   **Erforderlich:** Nein
-   **Standard:** `http://127.0.0.1:6006`
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

Die URL, unter der Ihre Storybook-Instanz gehostet wird.

#### `--version`

-   **Typ:** `number`
-   **Erforderlich:** Nein
-   **Standard:** 7
-   **Beispiel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Dies ist die Version von Storybook, standardmäßig `7`. Dies ist notwendig, um zu wissen, ob der V6 [`clipSelector`](#clipselector) verwendet werden muss.

### Storybook Interaktionstests

Storybook Interaktionstests ermöglichen es Ihnen, mit Ihrer Komponente zu interagieren, indem Sie benutzerdefinierte Skripte mit WDIO-Befehlen erstellen, um eine Komponente in einen bestimmten Zustand zu versetzen. Siehe zum Beispiel den Codeausschnitt unten:

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Es werden zwei Tests an zwei verschiedenen Komponenten ausgeführt. Jeder Test setzt zuerst einen Zustand und macht dann einen Screenshot. Sie werden auch bemerken, dass ein neuer benutzerdefinierter Befehl eingeführt wurde, der [hier](#new-custom-command) zu finden ist.

Die obige Spezifikationsdatei kann in einem Ordner gespeichert und mit folgendem Befehl zur Befehlszeile hinzugefügt werden:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Der Storybook Runner scannt zuerst automatisch Ihre Storybook-Instanz und fügt dann Ihre Tests zu den Stories hinzu, die verglichen werden müssen. Wenn Sie nicht möchten, dass die Komponenten, die Sie für Interaktionstests verwenden, zweimal verglichen werden, können Sie einen Filter hinzufügen, um die "Standardstories" aus dem Scan zu entfernen, indem Sie den [`--skipStories`](#--skipstories) Filter angeben. Dies würde so aussehen:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Neuer benutzerdefinierter Befehl

Ein neuer benutzerdefinierter Befehl namens `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` wird zum `browser/driver`-Objekt hinzugefügt, der automatisch die Komponente lädt und wartet, bis sie fertig ist, sodass Sie die Methode `browser.url('url.com')` nicht verwenden müssen. Es kann wie folgt verwendet werden

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Die Optionen sind:

#### `additionalSearchParams`

-   **Typ:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Erforderlich:** Nein
-   **Standard:** `new URLSearchParams()`
-   **Beispiel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

Dies fügt zusätzliche Suchparameter zur Storybook-URL hinzu. Im obigen Beispiel wird die URL `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def` sein.
Siehe die [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) Dokumentation für weitere Informationen.

#### `clipSelector`

-   **Typ:** `string`
-   **Erforderlich:** Nein
-   **Standard:** `#storybook-root > :first-child` für Storybook V7 und `#root > :first-child:not(script):not(style)` für Storybook V6
-   **Beispiel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

Dies ist der Selektor, der verwendet wird:

-   um das Element auszuwählen, von dem ein Screenshot erstellt werden soll
-   für das Element, das sichtbar sein muss, bevor ein Screenshot erstellt wird

#### `id`

-   **Typ:** `string`
-   **Erforderlich:** ja
-   **Beispiel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Verwenden Sie die `id` der Story, die in der URL der Story zu finden ist. Zum Beispiel ist die `id` in dieser URL `http://localhost:6006/?path=/story/example-page--logged-out` `example-page--logged-out`

#### `timeout`

-   **Typ:** `number`
-   **Erforderlich:** Nein
-   **Standard:** 1100 Millisekunden
-   **Beispiel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

Die maximale Wartezeit, die wir nach dem Laden der Komponente auf der Seite warten möchten, bis sie sichtbar wird

#### `url`

-   **Typ:** `string`
-   **Erforderlich:** Nein
-   **Standard:** `http://127.0.0.1:6006`
-   **Beispiel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

Die URL, unter der Ihre Storybook-Instanz gehostet wird.

</details>

## Mitwirken

### Aktualisieren der Pakete

Sie können die Pakete mit einem einfachen CLI-Tool aktualisieren. Stellen Sie sicher, dass Sie alle Abhängigkeiten installiert haben, dann können Sie

```sh
pnpm update.packages
```

ausführen. Dies löst ein CLI aus, das Ihnen die folgenden Fragen stellt

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

Dies führt zu den folgenden Logs

<details>
    <summary>Öffnen, um ein Beispiel der Logs zu sehen</summary>
    
```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? Minor
? Do you want to update the package.json files? yes
Updating root 'package.json' for minor updates...
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/package.json
[====================] 38/38 100%

@typescript-eslint/eslint-plugin ^8.7.0 → ^8.8.0
@typescript-eslint/parser ^8.7.0 → ^8.8.0
@typescript-eslint/utils ^8.7.0 → ^8.8.0
@vitest/coverage-v8 ^2.1.1 → ^2.1.2
vitest ^2.1.1 → ^2.1.2

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service/package.json
[====================] 11/11 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter/package.json
[====================] 11/11 100%

eslint-config-next 14.2.13 → 14.2.14
next 14.2.13 → 14.2.14

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service/package.json
[====================] 5/5 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison/package.json
[====================] 8/8 100%

All dependencies match the minor package versions :)
? Do you want to remove all "node_modules" and reinstall dependencies? yes
Removing root dependencies in /Users/wswebcreation/Git/wdio/visual-testing...
Removing dependencies in ocr-service...
Removing dependencies in visual-reporter...
Removing dependencies in visual-service...
Removing dependencies in webdriver-image-comparison...
? Would you like reinstall the dependencies? yes
Installing dependencies in /Users/wswebcreation/Git/wdio/visual-testing...

> @wdio/visual-testing-monorepo@ pnpm.install.workaround /Users/wswebcreation/Git/wdio/visual-testing
> pnpm install --shamefully-hoist

Scope: all 5 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: +1274
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1274, reused 1265, downloaded 0, added 1274, done

dependencies:

-   @wdio/ocr-service 2.0.0 <- packages/ocr-service
-   @wdio/visual-service 6.0.0 <- packages/visual-service

devDependencies:

-   @changesets/cli 2.27.8
-   @inquirer/prompts 5.5.0
-   @tsconfig/node20 20.1.4
-   @types/eslint 9.6.1
-   @types/jsdom 21.1.7
-   @types/node 20.16.4
-   @types/react 18.3.5
-   @types/react-dom 18.3.0
-   @types/xml2js 0.4.14
-   @typescript-eslint/eslint-plugin 8.8.0
-   @typescript-eslint/parser 8.8.0
-   @typescript-eslint/utils 8.8.0
-   @vitest/coverage-v8 2.1.2
-   @wdio/appium-service 9.1.2
-   @wdio/cli 9.1.2
-   @wdio/globals 9.1.2
-   @wdio/local-runner 9.1.2
-   @wdio/mocha-framework 9.1.2
-   @wdio/sauce-service 9.1.2
-   @wdio/shared-store-service 9.1.2
-   @wdio/spec-reporter 9.1.2
-   @wdio/types 9.1.2
-   eslint 9.11.1
-   eslint-plugin-import 2.30.0
-   eslint-plugin-unicorn 55.0.0
-   eslint-plugin-wdio 9.0.8
-   husky 9.1.6
-   jsdom 25.0.1
-   pnpm-run-all2 6.2.3
-   release-it 17.6.0
-   rimraf 6.0.1
-   saucelabs 8.0.0
-   ts-node 10.9.2
-   typescript 5.6.2
-   vitest 2.1.2
-   webdriverio 9.1.2

. prepare$ husky
└─ Done in 204ms
Done in 9.5s
All packages updated!

````

</details>

### Fragen

Bitte treten Sie unserem [Discord](https://discord.webdriver.io) Server bei, wenn Sie Fragen haben oder Probleme bei der Mitwirkung an diesem Projekt. Sie finden uns Mitwirkende im Kanal `🙏-contributing`.

### Probleme

Wenn Sie Fragen, Fehler oder Funktionsanfragen haben, reichen Sie bitte ein Issue ein. Bevor Sie ein Issue einreichen, durchsuchen Sie bitte das Issue-Archiv, um Duplikate zu vermeiden, und lesen Sie die [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Wenn Sie dort nicht fündig werden, können Sie ein Issue einreichen, in dem Sie:

-   🐛**Fehlerbericht**: Erstellen Sie einen Bericht, um uns bei der Verbesserung zu helfen
-   📖**Dokumentation**: Schlagen Sie Verbesserungen vor oder melden Sie fehlende/unklare Dokumentation
-   💡**Funktionsanfrage**: Schlagen Sie eine Idee für dieses Modul vor
-   💬**Frage**: Stellen Sie Fragen

### Entwicklungs-Workflow

Um einen PR für dieses Projekt zu erstellen und mit dem Beitragen zu beginnen, folgen Sie dieser Schritt-für-Schritt-Anleitung:

-   Forken Sie das Projekt.
-   Klonen Sie das Projekt irgendwo auf Ihrem Computer

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Gehen Sie in das Verzeichnis und richten Sie das Projekt ein

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Führen Sie den Überwachungsmodus aus, der den Code automatisch transpiliert

    ```sh
    $ pnpm watch
    ```

    um das Projekt zu bauen, führen Sie aus:

    ```sh
    $ pnpm build
    ```

-   Stellen Sie sicher, dass Ihre Änderungen keine Tests beeinträchtigen, führen Sie aus:

    ```sh
    $ pnpm test
    ```

Dieses Projekt verwendet [changesets](https://github.com/changesets/changesets), um automatisch Changelogs und Releases zu erstellen.

### Testen

Es müssen mehrere Tests ausgeführt werden, um das Modul testen zu können. Bei der Hinzufügung eines PR müssen mindestens alle lokalen Tests bestanden werden. Jeder PR wird automatisch gegen Sauce Labs getestet, siehe [unsere GitHub Actions Pipeline](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Bevor ein PR genehmigt wird, testen die Hauptmitwirkenden den PR gegen Emulatoren/Simulatoren / reale Geräte.

#### Lokales Testen

Zuerst muss eine lokale Baseline erstellt werden. Dies kann mit:

```sh
// Mit dem Webdriver-Protokoll
$ pnpm run test.local.init
````

erfolgen. Dieser Befehl erstellt einen Ordner namens `localBaseline`, der alle Baseline-Bilder enthält.

Führen Sie dann aus:

```sh
// Mit dem Webdriver-Protokoll
pnpm run test.local.desktop
```

Dies führt alle Tests auf einem lokalen Computer auf Chrome aus.

#### Lokaler Storybook Runner Testen (Beta)

Zuerst muss eine lokale Baseline erstellt werden. Dies kann mit:

```sh
pnpm run test.local.desktop.storybook
```

erfolgen. Dies führt Storybook-Tests mit Chrome im Headless-Modus gegen ein Demo-Storybook-Repo unter https://govuk-react.github.io/govuk-react/ aus.

Um die Tests mit mehr Browsern auszuführen, können Sie ausführen

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Stellen Sie sicher, dass die Browser, die Sie ausführen möchten, auf Ihrem lokalen Computer installiert sind

#### CI-Testen mit Sauce Labs (nicht für einen PR erforderlich)

Der folgende Befehl wird verwendet, um den Build auf GitHub Actions zu testen, er kann nur dort und nicht für die lokale Entwicklung verwendet werden.

```
$ pnpm run test.saucelabs
```

Es testet gegen viele Konfigurationen, die [hier](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts) gefunden werden können.
Alle PRs werden automatisch gegen Sauce Labs geprüft.

## Veröffentlichung

Um eine Version eines der oben aufgeführten Pakete zu veröffentlichen, gehen Sie wie folgt vor:

-   Starten Sie die [Release-Pipeline](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   Ein Release-PR wird generiert, lassen Sie diesen von einem anderen WebdriverIO-Mitglied überprüfen und genehmigen
-   Mergen Sie den PR
-   Starten Sie die [Release-Pipeline](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml) erneut
-   Eine neue Version sollte veröffentlicht werden 🎉

## Danksagungen

`@wdio/visual-testing` verwendet eine Open-Source-Lizenz von [LambdaTest](https://www.lambdatest.com/) und [Sauce Labs](https://saucelabs.com/).