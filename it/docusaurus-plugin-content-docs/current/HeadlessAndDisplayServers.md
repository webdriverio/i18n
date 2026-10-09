---
id: headless-and-display-servers
title: Headless e server di visualizzazione
description: Esegui browser con interfaccia grafica e app desktop su CI Linux e nei container con il display virtuale Weston o Xvfb avviato dal testrunner, incluse le sue opzioni, le configurazioni per la CI e la risoluzione dei problemi.
---

Su Linux, quando non è disponibile alcun display, il testrunner avvia un server di visualizzazione virtuale per l'esecuzione: [Weston](https://gitlab.freedesktop.org/wayland/weston) in modalità headless, oppure [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer) come alternativa. Questa pagina spiega quando ciò accade, come configurarlo e come si comporta in CI e in Docker. Nella maggior parte delle configurazioni, tutto ciò che serve è avere Weston o Xvfb installato nella tua immagine, oppure `displayServerAutoInstall: true` nella tua configurazione.

## Quando usare un display virtuale e quando la modalità headless nativa

Il display virtuale fornisce a browser e app uno schermo dove non ce n'è uno, come sui runner di CI e nei container. Mantienilo quando:

- Testi app desktop, che necessitano di una finestra reale.
- I tuoi test richiedono un browser con interfaccia grafica, ad esempio per corrispondere a screenshot di riferimento acquisiti con un browser visibile.
- Chrome non si avvia con `DevToolsActivePort file doesn't exist` o `user data directory is already in use`, come descritto in [Risoluzione dei problemi](#troubleshooting).

Per i test del browser che non necessitano di una finestra visibile, la modalità headless nativa, come `--headless=new` di Chrome, ha un overhead minore. In questo caso imposta `displayServerEnabled: false`, altrimenti il testrunner avvia comunque un server di visualizzazione. Fai lo stesso quando tutti i tuoi browser vengono eseguiti su un servizio cloud o su una grid remota, poiché nulla in locale necessita di un display.

## Come funziona

Il testrunner avvia un server di visualizzazione prima dell'hook `onPrepare` di qualsiasi servizio e imposta il suo ambiente su `process.env`:

| Variabile | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | non impostata |
| `DISPLAY` | non impostata | il primo display libero, ad esempio `:0` |
| `XDG_RUNTIME_DIR` | una directory privata sotto `/tmp` per l'esecuzione | invariata |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

I worker ereditano queste variabili, così come i driver e le app che i servizi avviano in `onPrepare`. I browser e i toolkit grafici scelgono Wayland o X11 in base a esse. Con Weston, la `XDG_RUNTIME_DIR` privata sostituisce qualsiasi valore avessi impostato per l'esecuzione.

Il server di visualizzazione rimane in esecuzione finché gli hook `onComplete` non terminano, così i servizi possono ancora utilizzarlo durante la chiusura. Il testrunner quindi lo arresta e ripristina i valori precedenti. Se il processo termina prima, anche con Ctrl+C, il server di visualizzazione viene terminato insieme a esso.

Il testrunner avvia un server di visualizzazione solo quando tutte queste condizioni sono vere:

- È in esecuzione su Linux.
- Né `DISPLAY` né `WAYLAND_DISPLAY` sono impostate.
- `displayServerEnabled` non è `false`.

Se esiste già un display, il testrunner lo utilizza e non avvia nulla. Con solo `WAYLAND_DISPLAY` impostata, ad esempio da un Weston avviato dalla tua CI, il testrunner imposta comunque `XDG_SESSION_TYPE`, `GDK_BACKEND` e `ELECTRON_OZONE_PLATFORM_HINT` su `wayland` per l'esecuzione. Questo garantisce che i browser utilizzino il display corretto sovrascrivendo i valori ereditati, come `XDG_SESSION_TYPE=tty` da un login SSH, che li indirizzerebbero verso X11, dove non c'è alcun server. Lo fa anche con `displayServerEnabled: false`, che controlla solo se un server di visualizzazione viene avviato.

### Quale server di visualizzazione viene utilizzato

Con il valore predefinito `displayServer: 'auto'`, il testrunner prova prima Weston e poi Xvfb. I server installati vengono provati prima di installare qualsiasi cosa, quindi un Xvfb esistente viene utilizzato invece di installare Weston. Se Weston non si avvia, il testrunner ripiega su Xvfb. Se nessun server di visualizzazione si avvia, il testrunner registra un avviso e l'esecuzione prosegue senza. Con `displayServer: 'wayland'` o `displayServer: 'xvfb'`, il testrunner prova solo quel server.

Sono supportate le versioni di Weston 10 e successive. Ubuntu 22.04 e Debian 11 includono Weston 9, ed Enterprise Linux 9 con EPEL abilitato ottiene Weston 8, quindi in questi casi imposta `displayServer: 'xvfb'`. Weston si avvia senza Xwayland, quindi non fornisce alcun `DISPLAY`. Se i tuoi test o strumenti necessitano di X11, ad esempio `xdotool`, `xclip` o un'app Java, imposta `displayServer: 'xvfb'`.

### Focus della finestra

Tutti i worker utilizzano lo stesso display. In WebdriverIO v9, ogni worker veniva eseguito all'interno di `xvfb-run` e otteneva un proprio display, quindi il suo browser aveva sempre il focus. I browser basati su Chromium, come Chrome ed Edge, ora possono non avere il focus: con Weston nessuna finestra ottiene il focus, e con Xvfb solo l'ultima finestra aperta lo ha. L'input WebDriver raggiunge comunque la pagina, ma `document.hasFocus()` restituisce `false`, gli eventi `focus` non vengono attivati e gli stili `:focus` non vengono applicati. Se i tuoi test dipendono dal focus, attiva l'emulazione del focus, un comando sperimentale del Chrome DevTools Protocol (CDP) che persiste tra i caricamenti di pagina:

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

Firefox non è interessato, poiché con WebDriver tratta le sue pagine come aventi il focus.

### Script standalone

Il testrunner avvia autonomamente il server di visualizzazione. Uno script standalone che chiama `remote()` può avviarne uno con `startDisplayDaemonFromConfig` da `@wdio/display-server`. Accetta le stesse opzioni `displayServer*`, imposta le variabili del display su `process.env` in modo che il browser le erediti, e le ripristina con `stop()`:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// null al di fuori di Linux, quando esiste già un display X11, o quando nessuno si avvia. Con un display
// Wayland esistente, restituisce un handle il cui stop() ripristina le variabili di sessione impostate.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

Puoi anche eseguire lo script con `xvfb-run`, come in [Utilizzare un display esistente](#using-an-existing-display).

## Configurazione del browser

### Browser avviati da WebdriverIO

Questi browser non richiedono alcuna configurazione:

- Chrome ed Edge 140 e successivi, e Chrome for Testing 135 e successivi, seguono `XDG_SESSION_TYPE=wayland` impostato dal server di visualizzazione.
- Le versioni precedenti di Chrome ed Edge ignorano `XDG_SESSION_TYPE`. Per queste, WebdriverIO aggiunge `--ozone-platform=wayland` agli argomenti di ogni Chrome ed Edge che avvia mentre Wayland è attivo senza un server X, a meno che gli argomenti non impostino già `--ozone-platform` o `--headless`.
- App Electron: Electron 38 e successivi seguono `XDG_SESSION_TYPE`, ed Electron dalla 28 alla 37 segue `ELECTRON_OZONE_PLATFORM_HINT`, anch'essa impostata dal server di visualizzazione. Electron 27 e precedenti si affidano al flag `--ozone-platform=wayland`, che WebdriverIO aggiunge quando avvia l'app tramite Chromedriver.
- Firefox e le app GTK, come le app Tauri, scelgono Wayland in base a `WAYLAND_DISPLAY` e `GDK_BACKEND`. Firefox precedente alla 120 non è testato.

### Browser non avviati da WebdriverIO

I browser su una grid o un servizio cloud non richiedono alcuna configurazione, poiché vengono eseguiti sul display dell'host remoto.

I browser locali avviati da qualcos'altro, come un driver che hai avviato tu, un server Appium o il launcher proprio di un servizio, non ricevono il flag `--ozone-platform=wayland` di WebdriverIO. Chrome ed Edge 140 e successivi, ed Electron 28 e successivi, non ne hanno bisogno, poiché seguono le variabili di sessione, mentre le versioni precedenti di Chrome ed Edge sì. Cosa fare dipende da quando il browser si avvia:

- **Durante l'esecuzione**, ad esempio dall'`onPrepare` di un servizio, i browser più recenti non necessitano di nulla, poiché ereditano il display e le variabili di sessione. Per le versioni precedenti di Chrome ed Edge, puoi:
  - impostare `displayServer: 'xvfb'` per utilizzare Xvfb, oppure
  - impostare `displayServer: 'wayland'` e aggiungere `--ozone-platform=wayland` ai loro argomenti per utilizzare Weston.
- **Prima di WebdriverIO**, ad esempio da un passaggio precedente della CI o da un'altra shell, non possono utilizzare un server di visualizzazione avviato da WebdriverIO, poiché non ne ereditano le variabili. Avvia tu stesso il display, come in [Utilizzare un display esistente](#using-an-existing-display), e:
  - utilizza Xvfb, che non richiede altro, oppure
  - utilizza Weston, quindi esporta `XDG_SESSION_TYPE=wayland` (Chrome ed Edge 140 e successivi, Electron 38 e successivi) o `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron dalla 28 alla 37), e aggiungi `--ozone-platform=wayland` agli argomenti delle versioni precedenti di Chrome ed Edge.

## Configurazione

Tutte le opzioni sono elencate nel [riferimento alla configurazione](/docs/configuration#displayserverenabled). Ad esempio:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Installa un server di visualizzazione se non ne è installato nessuno
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Usa sempre Xvfb con dimensioni ridotte, installato da un comando personalizzato che presuppone un container root
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

Il comando personalizzato è condiviso da entrambi i server. Con `displayServer: 'auto'`, viene eseguito prima per Weston, e di nuovo per Xvfb solo se Weston non è ancora disponibile o non si avvia e Xvfb è ancora mancante. Imposta `displayServer` sul server installato dal tuo comando, come fa questo esempio.

Le opzioni v9 `autoXvfb` e `xvfb*` sono deprecate e verranno rimosse nella v11. Consulta la [guida alla migrazione alla v10](/docs/v10-migration#virtual-displays-on-linux) per le loro sostituzioni.

## CI e Docker

Preinstalla un server di visualizzazione nella tua immagine, oppure imposta `displayServerAutoInstall: true` per installarne uno all'avvio dell'esecuzione.

### Preinstallare un server di visualizzazione

#### Weston

Su Ubuntu 24.04 o Debian 12 e successivi:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

Su RHEL 10 e Oracle Linux 10, abilita tu stesso EPEL e CodeReady Builder, seguendo la [documentazione di EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/), quindi installa `weston`.

Per eseguire il testrunner all'interno di un tuo Weston, come in [Utilizzare un display esistente](#using-an-existing-display), installa anche `xwayland-run`. È disponibile come pacchetto per Debian 13, Ubuntu 24.04, Fedora e openSUSE Tumbleweed. Senza di esso, devi avviare Weston in background con i propri `XDG_RUNTIME_DIR` e `WAYLAND_DISPLAY`, e attendere il suo socket prima di avviare WebdriverIO. In alternativa, utilizza Xvfb.

#### Xvfb

Su Ubuntu o Debian:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04 e Debian 11 includono una versione di Weston troppo vecchia, quindi in questi casi utilizza Xvfb. Con solo Xvfb installato, il testrunner lo utilizza senza ulteriori configurazioni.

Per altre distribuzioni, utilizza i nomi dei pacchetti indicati in [Supporto all'installazione automatica](#automatic-installation-support).

### Utilizzare un display esistente

Se la tua CI fornisce già un display, il testrunner lo utilizza e non avvia nulla.

Per utilizzare Weston, esegui il testrunner all'interno di `wlheadless-run` dal pacchetto `xwayland-run`. Fornisce a Weston una directory di runtime privata e attende il suo socket, e i flag corrispondono a quelli del Weston avviato dal testrunner:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Per utilizzare Xvfb, esegui il testrunner all'interno di `xvfb-run`:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## Supporto all'installazione automatica

`displayServerAutoInstall` funziona con i gestori di pacchetti indicati di seguito. Le installazioni sono non interattive e vanno in timeout dopo 240 secondi. Con qualsiasi altro gestore di pacchetti, installa tu stesso il server di visualizzazione.

| Gestore di pacchetti | Distribuzioni | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- Su Arch Linux, l'installazione esegue `pacman -Syu`, un aggiornamento completo del sistema, poiché Arch non supporta aggiornamenti parziali. Su un'immagine non aggiornata questo può superare il limite di 240 secondi, quindi in questo caso preinstalla il server di visualizzazione.
- Enterprise Linux 10 non dispone di Xvfb e include Weston solo in EPEL, che richiede CRB. Su CentOS Stream, AlmaLinux e Rocky Linux, l'installazione abilita entrambi e li lascia abilitati. Su RHEL e Oracle Linux, configurali tu stesso, come in [Preinstallare un server di visualizzazione](#preinstalling-a-display-server).

## Log

Il server di visualizzazione viene eseguito nel processo del launcher, quindi i suoi messaggi si trovano nel log del launcher: `wdio.log` nella tua `outputDir`, oppure nel terminale se `outputDir` non è impostata. Il log mostra quale server di visualizzazione è stato avviato e le variabili che ha impostato. Per maggiori dettagli, aumenta il suo livello di log:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## Risoluzione dei problemi

### Chrome fallisce con `DevToolsActivePort file doesn't exist`

Il messaggio completo è `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. Una causa comune è un Chrome con interfaccia grafica senza un display su cui aprire la sua finestra. Controlla nel [log del launcher](#logs) quale server di visualizzazione è stato avviato. Se non ne è stato avviato nessuno, consulta [Il log del launcher mostra `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). Se i tuoi test non necessitano di una finestra visibile, utilizza invece la modalità headless nativa, come in [Quando usare un display virtuale e quando la modalità headless nativa](#when-to-use-a-virtual-display-vs-native-headless).

### Chrome fallisce con `user data directory is already in use`

Il messaggio completo inizia con `session not created: probably user data directory is already in use`. È spesso fuorviante: di solito significa che il browser si è bloccato ed è stato riavviato con la directory del profilo dell'istanza precedente. Un display stabile spesso risolve il problema. In caso contrario, passa un `--user-data-dir` univoco per ogni worker.

### Il log del launcher mostra `No display server could be started`

Il messaggio completo è `No display server could be started; continuing without a virtual display`. Nessun server di visualizzazione è installato, oppure nessuno è stato avviato. I messaggi precedenti ne indicano il motivo:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` o `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: non è installato nulla e l'installazione automatica è disattivata.
- `wayland failed to start: ...` o `xvfb failed to start: ...`: segue l'output di errore del server.
- `Failed to install Weston` o `Failed to install Xvfb`: l'installazione non è riuscita.
- `wayland still not found after installing` o `xvfb still not found after installing`: l'installazione è riuscita ma non ha fornito quel server, ad esempio perché un `displayServerAutoInstallCommand` personalizzato installa solo l'altro. Imposta `displayServer` sul server installato dal tuo comando.

Installa Weston o Xvfb nella tua immagine, oppure imposta `displayServerAutoInstall: true`.

### Xvfb termina con `Failed to find a socket to listen on`

Xvfb crea il suo socket in `/tmp/.X11-unix`. Se quella directory esiste, deve essere scrivibile dall'utente dei test, come lo è con la modalità `1777`.

### Chrome o Electron fallisce con Weston con `Missing X server or $DISPLAY`

Il browser ha tentato di utilizzare X11 invece di Wayland. Se non è stato avviato da WebdriverIO, consulta [Browser non avviati da WebdriverIO](#browsers-webdriverio-doesnt-launch). Altrimenti, rimuovi `--ozone-platform=x11` dai suoi argomenti.

### I test dipendenti dal focus falliscono in Chrome o Edge

`document.hasFocus()` restituisce `false` perché le pagine sul display condiviso possono non avere il focus. Attiva l'emulazione del focus, come in [Focus della finestra](#window-focus).

### Uno strumento o un'app X11 fallisce con Weston con `cannot open display` o `Can't open display`

Weston non fornisce alcun `DISPLAY`. Imposta `displayServer: 'xvfb'` in modo che il testrunner avvii invece Xvfb. Se hai avviato tu stesso Weston, esegui l'esecuzione all'interno di `xvfb-run`, poiché il testrunner utilizza un display esistente anziché avviarne uno.

## Prossimi passi

- Riferimento alla [Configurazione](/docs/configuration#displayserverenabled) per ogni opzione `displayServer*`.
- [Guida alla migrazione alla v10](/docs/v10-migration#virtual-displays-on-linux) per le sostituzioni delle opzioni v9 `autoXvfb` e `xvfb*`.
- [Docker](/docs/docker) e [GitHub Actions](/docs/githubactions) per eseguire la tua suite in CI.
- [App desktop](/docs/platforms/desktop#linux) per Electron, Tauri e Dioxus su Linux.