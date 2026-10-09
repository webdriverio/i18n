---
id: headless-and-display-servers
title: Headless och displayservrar
description: Kör webbläsare med synligt fönster och skrivbordsappar i Linux-CI och i containrar med den virtuella Weston- eller Xvfb-display som testrunnern startar, inklusive alternativ, CI-recept och felsökning.
---

På Linux startar testrunnern en virtuell displayserver för körningen när ingen display finns tillgänglig: [Weston](https://gitlab.freedesktop.org/wayland/weston) i headless-läge, eller [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer) som reserv. Den här sidan beskriver när det sker, hur du konfigurerar det och hur det beter sig i CI och Docker. I de flesta uppsättningar behöver du bara ha Weston eller Xvfb installerat i din image, eller `displayServerAutoInstall: true` i din konfiguration.

## När du ska använda en virtuell display respektive inbyggt headless-läge

Den virtuella displayen ger webbläsare och appar en skärm där det inte finns någon, till exempel på CI-runners och i containrar. Behåll den när:

- Du testar skrivbordsappar, som behöver ett riktigt fönster.
- Dina tester behöver en webbläsare med synligt fönster, till exempel för att matcha referensskärmbilder som tagits med en synlig webbläsare.
- Chrome inte startar och ger `DevToolsActivePort file doesn't exist` eller `user data directory is already in use`, som beskrivs under [Felsökning](#troubleshooting).

För webbläsartester som inte behöver ett synligt fönster har inbyggt headless-läge, till exempel Chromes `--headless=new`, mindre overhead. Ange `displayServerEnabled: false` tillsammans med det, annars startar testrunnern ändå en displayserver. Gör likadant när alla dina webbläsare körs på en molntjänst eller ett fjärrgrid, eftersom inget lokalt behöver en display.

## Så fungerar det

Testrunnern startar en displayserver innan någon tjänsts `onPrepare`-hook körs och sätter dess miljövariabler i `process.env`:

| Variabel | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | inte satt |
| `DISPLAY` | inte satt | den första lediga displayen, till exempel `:0` |
| `XDG_RUNTIME_DIR` | en privat katalog under `/tmp` för körningen | oförändrad |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

Workers ärver dessa variabler, och det gör även drivrutiner och appar som tjänster startar i `onPrepare`. Webbläsare och GUI-verktygslådor väljer Wayland eller X11 utifrån dem. Under Weston ersätter den privata `XDG_RUNTIME_DIR` det värde du eventuellt hade för körningen.

Displayservern fortsätter att köras tills `onComplete`-hookarna är klara, så att tjänster fortfarande kan använda den medan de avslutas. Därefter stoppar testrunnern den och återställer de tidigare värdena. Om processen avslutas tidigare, även vid Ctrl+C, avslutas displayservern tillsammans med den.

Testrunnern startar bara en displayserver när alla dessa villkor är uppfyllda:

- Den körs på Linux.
- Varken `DISPLAY` eller `WAYLAND_DISPLAY` är satt.
- `displayServerEnabled` är inte `false`.

Om en display redan finns använder testrunnern den och startar ingenting. Om bara `WAYLAND_DISPLAY` är satt, till exempel av en Weston som din CI startar, sätter testrunnern ändå `XDG_SESSION_TYPE`, `GDK_BACKEND` och `ELECTRON_OZONE_PLATFORM_HINT` till `wayland` för körningen. Det säkerställer att webbläsare använder rätt display genom att åsidosätta ärvda värden, till exempel `XDG_SESSION_TYPE=tty` från en SSH-inloggning, som annars skulle skicka dem till X11, där det inte finns någon server. Detta sker även med `displayServerEnabled: false`, som bara styr om en displayserver startas.

### Vilken displayserver som används

Med standardvärdet `displayServer: 'auto'` försöker testrunnern först med Weston och sedan med Xvfb. Installerade servrar prövas innan något installeras, så en befintlig Xvfb används i stället för att Weston installeras. Om Weston inte startar faller testrunnern tillbaka på Xvfb. Om ingen displayserver startar loggar testrunnern en varning och körningen fortsätter utan. Med `displayServer: 'wayland'` eller `displayServer: 'xvfb'` försöker testrunnern bara med den servern.

Weston 10 och senare stöds. Ubuntu 22.04 och Debian 11 levereras med Weston 9, och Enterprise Linux 9 med EPEL aktiverat får Weston 8, så ange `displayServer: 'xvfb'` där. Weston startar utan Xwayland, så den tillhandahåller ingen `DISPLAY`. Om dina tester eller verktyg behöver X11, till exempel `xdotool`, `xclip` eller en Java-app, ange `displayServer: 'xvfb'`.

### Fönsterfokus

Alla workers använder samma display. I WebdriverIO v9 kördes varje worker inuti `xvfb-run` och fick en egen display, så dess webbläsare hade alltid fokus. Chromium-baserade webbläsare som Chrome och Edge kan nu sakna fokus: under Weston får inget fönster fokus, och under Xvfb har bara det senast öppnade fönstret fokus. WebDriver-indata når fortfarande sidan, men `document.hasFocus()` returnerar `false`, `focus`-händelser utlöses inte och `:focus`-stilar tillämpas inte. Om dina tester är beroende av fokus, slå på fokusemulering, ett experimentellt Chrome DevTools Protocol-kommando (CDP) som kvarstår mellan sidladdningar:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

Firefox påverkas inte, eftersom den under WebDriver behandlar sina sidor som fokuserade.

### Fristående skript

Testrunnern startar displayservern själv. Ett fristående skript som anropar `remote()` kan starta en med `startDisplayDaemonFromConfig` från `@wdio/display-server`. Den tar samma `displayServer*`-alternativ, sätter displayens variabler i `process.env` så att webbläsaren ärver dem, och återställer dem vid `stop()`:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// null utanför Linux, när en X11-display redan finns, eller när ingen startar. Med en befintlig
// Wayland-display returneras ett handtag vars stop() återställer de sessionsvariabler det satte.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

Du kan också köra skriptet under `xvfb-run`, som i [Använda en befintlig display](#using-an-existing-display).

## Webbläsarkonfiguration

### Webbläsare som WebdriverIO startar

Dessa webbläsare behöver ingen konfiguration:

- Chrome och Edge 140 och senare, samt Chrome for Testing 135 och senare, följer den `XDG_SESSION_TYPE=wayland` som displayservern sätter.
- Äldre Chrome och Edge ignorerar `XDG_SESSION_TYPE`. För dem lägger WebdriverIO till `--ozone-platform=wayland` i argumenten för varje Chrome och Edge som startas medan Wayland körs utan X-server, såvida argumenten inte redan anger `--ozone-platform` eller `--headless`.
- Electron-appar: Electron 38 och senare följer `XDG_SESSION_TYPE`, och Electron 28 till 37 följer `ELECTRON_OZONE_PLATFORM_HINT`, som displayservern också sätter. Electron 27 och tidigare förlitar sig på flaggan `--ozone-platform=wayland`, som WebdriverIO lägger till när appen startas via Chromedriver.
- Firefox och GTK-appar, som Tauri-appar, väljer Wayland utifrån `WAYLAND_DISPLAY` och `GDK_BACKEND`. Firefox före version 120 är otestad.

### Webbläsare som WebdriverIO inte startar

Webbläsare på ett grid eller en molntjänst behöver ingen konfiguration, eftersom de körs på fjärrvärdens display.

Lokala webbläsare som startas av något annat, till exempel en drivrutin du startat, en Appium-server eller en tjänsts egen startfunktion, får inte WebdriverIO:s flagga `--ozone-platform=wayland`. Chrome och Edge 140 och senare, samt Electron 28 och senare, behöver den inte eftersom de följer sessionsvariablerna, men äldre Chrome och Edge gör det. Vad du ska göra beror på när webbläsaren startar:

- **Under körningen**, till exempel från en tjänsts `onPrepare`, behöver nyare webbläsare ingenting, eftersom de ärver displayen och sessionsvariablerna. För äldre Chrome och Edge kan du antingen:
  - ange `displayServer: 'xvfb'` för att använda Xvfb, eller
  - ange `displayServer: 'wayland'` och lägga till `--ozone-platform=wayland` i deras argument för att använda Weston.
- **Före WebdriverIO**, till exempel från ett tidigare CI-steg eller ett annat skal, kan de inte använda en displayserver som WebdriverIO startar, eftersom de inte ärver dess variabler. Starta displayen själv, som i [Använda en befintlig display](#using-an-existing-display), och antingen:
  - använd Xvfb, som inte behöver något mer, eller
  - använd Weston, exportera sedan `XDG_SESSION_TYPE=wayland` (Chrome och Edge 140 och senare, Electron 38 och senare) eller `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron 28 till 37), och lägg till `--ozone-platform=wayland` i argumenten för äldre Chrome och Edge.

## Konfiguration

Alla alternativ finns i [konfigurationsreferensen](/docs/configuration#displayserverenabled). Till exempel:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Installera en displayserver om ingen är installerad
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Använd alltid Xvfb i en mindre storlek, installerad med ett anpassat kommando som förutsätter en root-container
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

Det anpassade kommandot delas av båda servrarna. Med `displayServer: 'auto'` körs det först för Weston, och igen för Xvfb endast om Weston fortfarande inte är tillgänglig eller inte startar och Xvfb fortfarande saknas. Ange `displayServer` till den server som ditt kommando installerar, som i det här exemplet.

v9-alternativen `autoXvfb` och `xvfb*` är föråldrade och tas bort i v11. Se [migreringsguiden för v10](/docs/v10-migration#virtual-displays-on-linux) för deras ersättare.

## CI och Docker

Förinstallera en displayserver i din image, eller ange `displayServerAutoInstall: true` för att installera en när körningen startar.

### Förinstallera en displayserver

#### Weston

På Ubuntu 24.04 eller Debian 12 och senare:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

På RHEL 10 och Oracle Linux 10 aktiverar du EPEL och CodeReady Builder själv enligt [EPEL-dokumentationen](https://docs.fedoraproject.org/en-US/epel/getting-started/) och installerar sedan `weston`.

För att köra testrunnern inuti en egen Weston, som i [Använda en befintlig display](#using-an-existing-display), installera även `xwayland-run`. Det finns paketerat för Debian 13, Ubuntu 24.04, Fedora och openSUSE Tumbleweed. Utan det måste du starta Weston i bakgrunden med egen `XDG_RUNTIME_DIR` och `WAYLAND_DISPLAY`, och vänta på dess socket innan du startar WebdriverIO. Alternativt kan du använda Xvfb.

#### Xvfb

På Ubuntu eller Debian:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04 och Debian 11 levereras med en för gammal Weston, så använd Xvfb där. När bara Xvfb är installerat använder testrunnern det utan ytterligare konfiguration.

För andra distributioner, använd paketnamnen i [Stöd för automatisk installation](#automatic-installation-support).

### Använda en befintlig display

Om din CI redan tillhandahåller en display använder testrunnern den och startar ingenting.

För att använda Weston kör du testrunnern via `wlheadless-run` från paketet `xwayland-run`. Det ger Weston en privat runtime-katalog och väntar på dess socket, och flaggorna motsvarar den Weston som testrunnern startar:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

För att använda Xvfb kör du testrunnern via `xvfb-run`:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## Stöd för automatisk installation

`displayServerAutoInstall` fungerar med pakethanterarna nedan. Installationer är icke-interaktiva och avbryts efter 240 sekunder. Med andra pakethanterare installerar du displayservern själv.

| Pakethanterare | Distributioner | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- På Arch Linux kör installationen `pacman -Syu`, en fullständig systemuppgradering, eftersom Arch inte stöder partiella uppgraderingar. På en inaktuell image kan detta överskrida gränsen på 240 sekunder, så förinstallera displayservern där.
- Enterprise Linux 10 har ingen Xvfb och levererar Weston endast i EPEL, som kräver CRB. På CentOS Stream, AlmaLinux och Rocky Linux aktiverar installationen båda och lämnar dem aktiverade. På RHEL och Oracle Linux konfigurerar du dem själv, som i [Förinstallera en displayserver](#preinstalling-a-display-server).

## Loggar

Displayservern körs i launcher-processen, så dess meddelanden finns i launcher-loggen: `wdio.log` i din `outputDir`, eller i terminalen om `outputDir` inte är satt. Loggen visar vilken displayserver som startade och vilka variabler den satte. För mer detaljer, höj dess loggnivå:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## Felsökning

### Chrome misslyckas med `DevToolsActivePort file doesn't exist`

Det fullständiga meddelandet är `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. En vanlig orsak är en Chrome med synligt fönster utan någon display att öppna fönstret på. Kontrollera i [launcher-loggen](#logs) vilken displayserver som startade. Om ingen startade, se [Launcher-loggen visar `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). Om dina tester inte behöver ett synligt fönster, använd i stället inbyggt headless-läge, som i [När du ska använda en virtuell display respektive inbyggt headless-läge](#when-to-use-a-virtual-display-vs-native-headless).

### Chrome misslyckas med `user data directory is already in use`

Det fullständiga meddelandet börjar med `session not created: probably user data directory is already in use`. Det är ofta missvisande: det betyder oftast att webbläsaren kraschade och startade om med den tidigare instansens profilkatalog. En stabil display löser ofta problemet. Om inte, skicka en unik `--user-data-dir` per worker.

### Launcher-loggen visar `No display server could be started`

Det fullständiga meddelandet är `No display server could be started; continuing without a virtual display`. Ingen displayserver är installerad, eller ingen startade. Meddelandena före det anger varför:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` eller `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: inget är installerat och automatisk installation är avstängd.
- `wayland failed to start: ...` eller `xvfb failed to start: ...`: serverns felutdata följer.
- `Failed to install Weston` eller `Failed to install Xvfb`: installationen misslyckades.
- `wayland still not found after installing` eller `xvfb still not found after installing`: installationen lyckades men tillhandahöll inte den servern, till exempel för att ett anpassat `displayServerAutoInstallCommand` bara installerar den andra. Ange `displayServer` till den server som ditt kommando installerar.

Installera Weston eller Xvfb i din image, eller ange `displayServerAutoInstall: true`.

### Xvfb avslutas med `Failed to find a socket to listen on`

Xvfb skapar sin socket i `/tmp/.X11-unix`. Om katalogen finns måste den vara skrivbar för testanvändaren, vilket läget `1777` innebär.

### Chrome eller Electron misslyckas under Weston med `Missing X server or $DISPLAY`

Webbläsaren försökte använda X11 i stället för Wayland. Om WebdriverIO inte startade den, se [Webbläsare som WebdriverIO inte startar](#browsers-webdriverio-doesnt-launch). Annars, ta bort `--ozone-platform=x11` från dess argument.

### Fokusberoende tester misslyckas i Chrome eller Edge

`document.hasFocus()` returnerar `false` eftersom sidor på den delade displayen kan sakna fokus. Slå på fokusemulering, som i [Fönsterfokus](#window-focus).

### Ett X11-verktyg eller en X11-app misslyckas under Weston med `cannot open display` eller `Can't open display`

Weston tillhandahåller ingen `DISPLAY`. Ange `displayServer: 'xvfb'` så att testrunnern startar Xvfb i stället. Om du startade Weston själv, kör körningen via `xvfb-run`, eftersom testrunnern använder en befintlig display i stället för att starta en.

## Nästa steg

- [Konfigurationsreferensen](/docs/configuration#displayserverenabled) för alla `displayServer*`-alternativ.
- [Migreringsguiden för v10](/docs/v10-migration#virtual-displays-on-linux) för ersättarna till v9-alternativen `autoXvfb` och `xvfb*`.
- [Docker](/docs/docker) och [GitHub Actions](/docs/githubactions) för att köra din testsvit i CI.
- [Skrivbordsappar](/docs/platforms/desktop#linux) för Electron, Tauri och Dioxus på Linux.