---
id: firefox-profile-service
title: Firefox Profil Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---


Sie möchten Ihren Firefox-Browser mit einer bestimmten Erweiterung ausführen oder müssen einige Einstellungen festlegen? Selenium ermöglicht es Ihnen, ein Profil für den Firefox-Browser zu verwenden, indem Sie dieses Profil als `base64`-String an die Eigenschaft `moz:firefoxOptions.profile` in Ihren gewünschten Capabilities übergeben. Dies erfordert das Erstellen dieses Profils und die Konvertierung in `base64`. Dieser Service für den [wdio testrunner](https://webdriver.io/docs/clioptions) nimmt Ihnen die Arbeit der Profilzusammenstellung ab und ermöglicht es Ihnen, Ihre gewünschten Optionen bequem aus der Datei `wdio.conf.js` zu definieren.

Um alle möglichen Optionen zu finden, öffnen Sie [about:config](about:config) in Ihrem Firefox-Browser oder besuchen Sie die [mozillaZine](http://kb.mozillazine.org/About:config_entries) Website, um die vollständige Dokumentation zu jeder Einstellung zu finden. Zusätzlich können Sie kompilierte (als `*.xpi`) Firefox-Erweiterungen definieren, die vor dem Start des Tests installiert werden sollen.

## Installation

Der einfachste Weg ist, `@wdio/firefox-profile-service` als devDependency in Ihrer `package.json` zu behalten, via:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted)

## Konfiguration

Richten Sie Ihr Profil ein, indem Sie den `firefox-profile` Service zu Ihrer Service-Liste hinzufügen. Definieren Sie dann Ihre Einstellungen in der Eigenschaft `firefoxProfile` wie folgt:

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

Wenn Sie eine eigene Firefox-Erweiterung erstellt haben, die Sie im Browser installieren möchten, stellen Sie sicher, dass Sie `'xpinstall.signatures.required': false` als Profilkennzeichen setzen, da Firefox-Erweiterungen von [Mozilla signiert](https://wiki.mozilla.org/Add-ons/Extension_Signing) sein müssen.

Um benutzerdefinierte, unsignierte Erweiterungen zu verwenden, müssen Sie auch [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/) verwenden, da der reguläre Firefox 48 und neuere Version dies [nicht erlauben](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Optionen

Enthält alle Einstellungen als Schlüssel-Wert-Paare. Alle verfügbaren Einstellungen finden Sie auf der Seite `about:config`.

### extensions

Fügen Sie eine oder mehrere Erweiterungen zur Browser-Sitzung hinzu. Alle Einträge können entweder ein absoluter Pfad zur `.xpi`-Datei oder der Pfad zu einem entpackten Firefox-Erweiterungsverzeichnis sein.

Typ: `String[]`<br />
Standard: `[]`

### profileDirectory

Erstellen Sie ein Firefox-Profil basierend auf einem vorhandenen, indem Sie einen absoluten Pfad zu diesem Profil angeben.

Typ: `String`<br />
Standard: `null`

### proxy

Legen Sie Netzwerk-Proxy-Einstellungen fest. Der Parameter `proxy` ist ein Hash, dessen Struktur vom Wert des obligatorischen Schlüssels `proxyType` abhängt, der einen der folgenden Zeichenkettenwerte annimmt:

 * `direct` - direkte Verbindung (kein Proxy)
 * `system` - Proxy-Einstellungen des Betriebssystems verwenden
 * `pac` - automatische Proxy-Konfiguration verwenden, die auf dem Wert des Schlüssels `autoconfigUrl` basiert
 * `manual` - manuelle Proxy-Einstellungen, die separat für verschiedene Protokolle mit Werten aus den folgenden Schlüsseln definiert sind: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Typ: `Object`<br />
Standard: `null`<br />
Beispiel:

- Automatischer Proxy:
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

- Manueller HTTP-Proxy:
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

- Manueller HTTP- und HTTPS-Proxy:
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

Bitte setzen Sie dieses Flag auf `true`, wenn Sie Firefox v55 oder niedriger verwenden.

Typ: `Boolean`<br />
Standard: `false`

----

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).