---
id: headless-and-xvfb
title: Headless & Xvfb con il Testrunner
description: Come WebdriverIO utilizza Xvfb per i test headless su Linux, opzioni di configurazione, ricette CI e risoluzione dei problemi.
---

Questa pagina spiega come il testrunner di WebdriverIO supporta l'esecuzione headless su Linux utilizzando Xvfb (X Virtual Framebuffer). Copre quando Xvfb è utile, come configurarlo e come si comporta in CI e Docker.

## Quando utilizzare Xvfb rispetto alla modalità headless nativa

- Utilizza la modalità headless nativa (ad esempio, Chrome `--headless=...`) quando possibile per un overhead minimo.
- Utilizza Xvfb quando:
  - Testi Electron o applicazioni che richiedono un window manager o un ambiente desktop
  - Ti affidi a comportamenti GLX o dipendenti da window-manager
  - I tuoi strumenti si aspettano un display server (`DISPLAY`)
  - Riscontri errori Chromium come:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    L'errore di collisione della directory dei dati utente può essere fuorviante, poiché spesso è il risultato di un crash del browser e di un riavvio immediato che riutilizza la stessa directory del profilo dell'istanza precedente. Garantire un display stabile (ad esempio, tramite Xvfb) spesso lo risolve - in caso contrario, dovresti passare un `--user-data-dir` unico per worker.

## Configurazione

Quattro opzioni del runner controllano il comportamento di Xvfb:

- `autoXvfb` (booleano, predefinito: true)
  - Interruttore autorevole per l'utilizzo. Se `false`, il runner non utilizza mai Xvfb.
  - Se `true`, il runner potrebbe utilizzare Xvfb quando necessario.

- `xvfbAutoInstall` (booleano, predefinito: false)
  - Abilita l'installazione automatica di `xvfb-run` se mancante
  - Quando è false, il runner avviserà e continuerà senza installare

- `xvfbAutoInstallMode` ('root' | 'sudo', predefinito: 'sudo')
  - 'root': installa solo se in esecuzione come root (no sudo)
  - 'sudo': consente sudo non interattivo (`sudo -n`) se non root; salta se sudo manca

- `xvfbAutoInstallCommand` (string | string[], opzionale)
  - Comando personalizzato da utilizzare per l'installazione invece del rilevamento automatico del gestore pacchetti
  - Quando fornito, questo comando viene eseguito così com'è e sostituisce la logica di installazione incorporata

- `xvfbMaxRetries` (numero, predefinito: 3)
  - Numero di tentativi di ripetizione per i fallimenti del processo xvfb.
  - Utile per ambienti CI instabili dove l'avvio di Xvfb potrebbe occasionalmente fallire.

- `xvfbRetryDelay` (numero, predefinito: 1000)
  - Ritardo base tra i tentativi in millisecondi per i fallimenti del processo xvfb.
  - Utilizza un ritardo progressivo: ritardo × numero del tentativo (ad es., 1000ms, 2000ms, 3000ms, ecc.).

Esempi:

```ts
export const config: WebdriverIO.Config = {
  // Usa Xvfb quando necessario
  autoXvfb: true,

  // Auto-installa i pacchetti Xvfb usando sudo
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
  // Usa Xvfb quando necessario
  autoXvfb: true,

  // Auto-installa i pacchetti Xvfb usando un comando personalizzato e sudo
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
  // Usa Xvfb quando necessario
  autoXvfb: true,

  // Auto-installa i pacchetti Xvfb usando sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Configura il comportamento di ripetizione per ambienti CI instabili
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Logica di rilevamento

- Il runner considera Xvfb quando:

  - È in esecuzione su Linux
  - Nessun `DISPLAY` è impostato (ambiente headless), o sono passati flag per browser headless

- Se `DISPLAY` è impostato, il runner non forzerà Xvfb per impostazione predefinita e rispetterà il tuo X server/window manager esistente.

Note:
- `autoXvfb: false` disabilita completamente l'uso di Xvfb (nessun wrapping con `xvfb-run`).
- `xvfbAutoInstall` influenza solo l'installazione se `xvfb-run` è mancante; non attiva/disattiva l'utilizzo.
- `xvfbAutoInstallMode` controlla il metodo di installazione: 'root' per installazioni solo root, 'sudo' per installazioni basate su sudo (predefinito: 'sudo').
- Le installazioni di pacchetti incorporate sono sempre non interattive. Solo root a meno che non si opti per la modalità 'sudo'.
- Il meccanismo di ripetizione utilizza ritardi progressivi: `xvfbRetryDelay × numero del tentativo` (ad es., 1000ms, 2000ms, 3000ms, ecc.).

## Utilizzo di un DISPLAY esistente in CI

Se il tuo CI configura il proprio X server/window manager (ad esempio, con `Xvfb :99` e un WM), puoi:

- Lasciare `autoXvfb: true` e assicurarti che `DISPLAY` sia esportato; il runner lo rispetterà ed eviterà il wrapping.
- Oppure impostare `autoXvfb: false` per disabilitare esplicitamente qualsiasi comportamento Xvfb dal runner.

## Ricette per CI e Docker

GitHub Actions (utilizzando headless nativo):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (display virtuale tramite Xvfb se mancante e abilitato):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (esempio Ubuntu/Debian – preinstallazione xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Per altre distribuzioni, adatta il gestore pacchetti e il nome del pacchetto di conseguenza (ad esempio, `dnf install xorg-x11-server-Xvfb` su Fedora/RHEL-based, `zypper install xvfb-run` su openSUSE/SLE).

## Supporto all'installazione automatica (xvfbAutoInstall)

Quando `xvfbAutoInstall` è abilitato, WebdriverIO tenta di installare `xvfb` utilizzando il gestore pacchetti del tuo sistema. Sono supportati i seguenti gestori e pacchetti:

| Gestore Pacchetti | Comando         | Distribuzioni (esempi)                                     | Nome(i) Pacchetto               |
|-----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt             | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, ecc.      | `xvfb`                           |
| dnf             | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, ecc.       | `xorg-x11-server-Xvfb`           |
| yum             | `yum`           | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper          | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman          | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, ecc.             | `xorg-server-xvfb`               |
| apk             | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install    | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

Note:
- Se il tuo ambiente utilizza un gestore pacchetti diverso, l'installazione fallirà con un errore; installa `xvfb` manualmente.
- I nomi dei pacchetti sono specifici per la distribuzione; la tabella riflette i nomi comuni per famiglia.

## Risoluzione dei problemi

- "xvfb-run non è riuscito ad avviarsi"
  - Il runner riprova automaticamente i fallimenti relativi a Xvfb con backoff progressivo. Se i fallimenti persistono, aumenta `xvfbMaxRetries` e `xvfbRetryDelay` per ambienti instabili.

- Xvfb avvolto inaspettatamente in CI
  - Se hai una configurazione personalizzata `DISPLAY` / WM, imposta `autoXvfb: false` o assicurati che `DISPLAY` sia esportato prima dell'avvio del runner.

- Mancanza di `xvfb-run`
  - Mantieni `xvfbAutoInstall: false` per evitare di modificare l'ambiente; installa tramite la tua immagine base o imposta `xvfbAutoInstall: true` per abilitarlo.

- Frequenti fallimenti di avvio di Xvfb in CI
  - Aumenta `xvfbMaxRetries` (ad es. a 5-10) e `xvfbRetryDelay` (ad es. a 2000ms) per un comportamento più resiliente in ambienti instabili.

## Avanzato

- Il runner crea processi tramite una factory che avvolge il worker node con `xvfb-run` se Xvfb è necessario e disponibile.
- I flag del browser headless (Chrome/Edge/Firefox) segnalano l'utilizzo headless e possono attivare Xvfb in ambienti senza un `DISPLAY`.