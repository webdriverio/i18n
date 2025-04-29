---
id: firefox-profile-service
title: Firefox Profile Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Vill du köra din Firefox-webbläsare med ett specifikt tillägg eller behöver du ställa in några preferenser? Selenium låter dig använda en profil för Firefox-webbläsaren genom att skicka denna profil som `base64`-sträng till egenskapen `moz:firefoxOptions.profile` i dina önskade funktioner. Detta kräver att du bygger den profilen och konverterar den till `base64`. Denna tjänst för [wdio testrunner](https://webdriver.io/docs/clioptions) tar bort arbetet med att kompilera profilen från dig och låter dig bekvämt definiera dina önskade alternativ från `wdio.conf.js`-filen.

För att hitta alla möjliga alternativ, öppna [about:config](about:config) i din Firefox-webbläsare eller gå till [mozillaZine](http://kb.mozillazine.org/About:config_entries) webbplats för att hitta hela dokumentationen om varje inställning. Utöver det kan du definiera kompilerade (som `*.xpi`) Firefox-tillägg som ska installeras innan testet startar.

## Installation

Det enklaste sättet är att behålla `@wdio/firefox-profile-service` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted)

## Konfiguration

Konfigurera din profil genom att lägga till `firefox-profile`-tjänsten till din tjänstlista. Definiera sedan dina inställningar i egenskapen `firefoxProfile` så här:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // path to .xpi file
                '/path/to/extensionB' // or path to unpacked Firefox extension
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // only use for firefox <= 55
        }]
    ],
    // ...
};
```

Om du har byggt ett anpassat Firefox-tillägg som du vill installera i webbläsaren, se till att ställa in `'xpinstall.signatures.required': false` som en profilflagga eftersom Firefox-tillägg måste vara [signerade av Mozilla](https://wiki.mozilla.org/Add-ons/Extension_Signing).

För att använda anpassade osignerade tillägg behöver du också använda [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/) eftersom den vanliga Firefox 48 och nyare [inte tillåter detta](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Alternativ

Innehåller alla inställningar som nyckel-värde-par. Du kan hitta alla tillgängliga inställningar på sidan `about:config`.

### extensions

Lägg till ett eller flera tillägg till webbläsarsessionen. Alla poster kan antingen vara en absolut sökväg till `.xpi`-filen eller sökvägen till en uppackad Firefox-tilläggskatalogl.

Typ: `String[]`<br />
Standard: `[]`

### profileDirectory

Skapa Firefox-profil baserad på en befintlig genom att ange en absolut sökväg till den profilen.

Typ: `String`<br />
Standard: `null`

### proxy

Ställ in nätverkets proxyinställningar. Parametern `proxy` är en hash vars struktur beror på värdet av den obligatoriska nyckeln `proxyType`, som tar ett av följande strängvärden:

 * `direct` - direktanslutning (ingen proxy)
 * `system` - använd operativsystemets proxyinställningar
 * `pac` - använd en automatisk proxykonfiguration baserad på värdet av nyckeln `autoconfigUrl`
 * `manual` - manuella proxyinställningar definierade separat för olika protokoll med värden från följande nycklar: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Typ: `Object`<br />
Standard: `null`<br />
Exempel:

- Automatisk proxy:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- Manuell HTTP-proxy:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- Manuell HTTP- och HTTPS-proxy:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

Ställ in denna flagga till `true` om du använder Firefox v55 eller lägre.

Typ: `Boolean`<br />
Standard: `false`

----

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).