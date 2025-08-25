---
id: headless-and-xvfb
title: Headless & Xvfb med Testrunner
description: Hur WebdriverIO använder Xvfb för headless-testning på Linux, konfigurationsalternativ, CI-recept och felsökning.
---

Denna sida förklarar hur WebdriverIO testrunner stödjer headless-körning på Linux med hjälp av Xvfb (X Virtual Framebuffer). Den beskriver när Xvfb är användbart, hur man konfigurerar det och hur det fungerar i CI och Docker.

## När man ska använda Xvfb vs native headless

- Använd native headless (t.ex. Chrome `--headless=...`) när det är möjligt för minimal overhead.
- Använd Xvfb när:
  - Du testar Electron eller appar som kräver en fönsterhanterare eller skrivbordsmiljö
  - Du förlitar dig på GLX eller beteenden som är beroende av fönsterhanterare
  - Dina verktyg förväntar sig en displayserver (`DISPLAY`)
  - Du stöter på Chromium-fel som:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    Felet med användardatakatalogkollision kan vara missvisande eftersom det ofta är resultatet av en webbläsarkrasch och omedelbar omstart som återanvänder samma profilkatalog från föregående instans. Att säkerställa en stabil display (t.ex. via Xvfb) löser ofta problemet - om inte, bör du skicka en unik `--user-data-dir` per worker.

## Konfiguration

Fyra runner-alternativ styr Xvfb-beteendet:

- `autoXvfb` (boolean, standard: true)
  - Avgörande växel för användning. Om `false` använder runnern aldrig Xvfb.
  - Om `true` kan runnern använda Xvfb vid behov.

- `xvfbAutoInstall` (boolean, standard: false)
  - Aktivera automatisk installation av `xvfb-run` om det saknas
  - När false kommer runnern att varna och fortsätta utan att installera

- `xvfbAutoInstallMode` ('root' | 'sudo', standard: 'sudo')
  - 'root': installera endast om körning sker som root (ingen sudo)
  - 'sudo': tillåt icke-interaktiv sudo (`sudo -n`) om inte root; hoppa över om sudo saknas

- `xvfbAutoInstallCommand` (string | string[], valfritt)
  - Anpassat kommando att använda för installation istället för inbyggd pakethanterardetektering
  - När det anges körs detta kommando som det är och åsidosätter den inbyggda installationslogiken

- `xvfbMaxRetries` (number, standard: 3)
  - Antal återförsök för xvfb-processfel.
  - Användbart för instabila CI-miljöer där Xvfb-uppstart ibland kan misslyckas.

- `xvfbRetryDelay` (number, standard: 1000)
  - Grundfördröjning mellan återförsök i millisekunder för xvfb-processfel.
  - Använder progressiv fördröjning: fördröjning × försöksnummer (t.ex. 1000ms, 2000ms, 3000ms, etc.).

Exempel:

```ts
export const config: WebdriverIO.Config = {
  // Använd Xvfb vid behov
  autoXvfb: true,

  // Auto-installera Xvfb-paket med sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Använd Xvfb vid behov
  autoXvfb: true,

  // Auto-installera Xvfb-paket med ett anpassat kommando och sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Använd Xvfb vid behov
  autoXvfb: true,

  // Auto-installera Xvfb-paket med sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Konfigurera återförsöksbeteende för instabila CI-miljöer
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Detekteringslogik

- Runnern överväger Xvfb när:

  - Kör på Linux
  - Ingen `DISPLAY` är inställd (headless-miljö), eller headless-webbläsarflaggor skickas

- Om `DISPLAY` är inställd, tvingar inte runnern Xvfb som standard och respekterar din befintliga X-server/fönsterhanterare.

Anteckningar:
- `autoXvfb: false` inaktiverar Xvfb-användning helt (ingen wrapper med `xvfb-run`).
- `xvfbAutoInstall` påverkar bara installation om `xvfb-run` saknas; det aktiverar/inaktiverar inte användning.
- `xvfbAutoInstallMode` styr installationsmetoden: 'root' för enbart root-installationer, 'sudo' för sudo-baserade installationer (standard: 'sudo').
- Inbyggda paketinstallationer är alltid icke-interaktiva. Enbart root om du inte väljer 'sudo'-läge.
- Återförsöksmekanismen använder progressiva fördröjningar: `xvfbRetryDelay × försöksnummer` (t.ex. 1000ms, 2000ms, 3000ms, etc.).

## Använda en befintlig DISPLAY i CI

Om din CI konfigurerar sin egen X-server/fönsterhanterare (t.ex. med `Xvfb :99` och en WM), antingen:

- Behåll `autoXvfb: true` och se till att `DISPLAY` exporteras; runnern kommer att respektera den och undvika wrapping.
- Eller ställ in `autoXvfb: false` för att uttryckligen inaktivera allt Xvfb-beteende från runnern.

## CI och Docker-recept

GitHub Actions (använder native headless):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (virtuell display via Xvfb om det saknas och är aktiverat):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (Ubuntu/Debian exempel – förinstallera xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

För andra distributioner, justera pakethanteraren och paketnamnet därefter (t.ex. `dnf install xorg-x11-server-Xvfb` på Fedora/RHEL-baserade, `zypper install xvfb-run` på openSUSE/SLE).

## Automatiskt installationsstöd (xvfbAutoInstall)

När `xvfbAutoInstall` är aktiverat försöker WebdriverIO installera `xvfb` med hjälp av systemets pakethanterare. Följande hanterare och paket stöds:

| Pakethanterare | Kommando        | Distributioner (exempel)                                    | Paketnamn                        |
|----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt            | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, etc.      | `xvfb`                           |
| dnf            | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, etc.       | `xorg-x11-server-Xvfb`           |
| yum            | `yum`           | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper         | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman         | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, etc.             | `xorg-server-xvfb`               |
| apk            | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install   | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

Anteckningar:
- Om din miljö använder en annan pakethanterare kommer installationen att misslyckas med ett felmeddelande; installera `xvfb` manuellt.
- Paketnamn är distributionsspecifika; tabellen återspeglar de vanliga namnen per familj.

## Felsökning

- "xvfb-run failed to start"
  - Runnern försöker automatiskt igen vid Xvfb-relaterade fel med progressiv fördröjning. Om felen kvarstår, öka `xvfbMaxRetries` och `xvfbRetryDelay` för instabila miljöer.

- Xvfb wrappades oväntat i CI
  - Om du har en anpassad `DISPLAY` / WM-konfiguration, ställ in `autoXvfb: false` eller se till att `DISPLAY` exporteras innan runnern startar.

- Saknar `xvfb-run`
  - Behåll `xvfbAutoInstall: false` för att undvika att ändra miljön; installera via din basbild eller ställ in `xvfbAutoInstall: true` för att aktivera.

- Frekventa Xvfb-startfel i CI
  - Öka `xvfbMaxRetries` (t.ex. till 5-10) och `xvfbRetryDelay` (t.ex. till 2000ms) för mer robust beteende i instabila miljöer.

## Avancerat

- Runnern skapar processer via en fabrik som wrappar node-worker med `xvfb-run` om Xvfb behövs och är tillgängligt.
- Headless-webbläsarflaggor (Chrome/Edge/Firefox) signalerar headless-användning och kan trigga Xvfb i miljöer utan en `DISPLAY`.