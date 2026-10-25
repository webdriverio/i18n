---
id: mobile
title: Test su dispositivi mobili
description: "Acquisisci le sessioni Appium (browser mobile, app native e ibride) in DevTools in modalità live e trace, ed esegui gli esempi mobile per ciascun adapter."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

DevTools acquisisce le sessioni Appium sia in modalità live sia in [Trace Mode](/docs/devtools/wdio/trace-mode). Ciò che acquisisce dipende da una sola domanda — **questa sessione ha un documento web in questo momento?** — perché ogni drain del DOM, script di pagina e lettura del viewport è un round trip che, senza documento, può solo fallire.

## Tre tipi di sessione

| Sessione | Ha un documento | Cosa viene acquisito |
|---|---|---|
| **Browser mobile** (Chrome su Android, Safari su iOS) | sempre | time-travel del DOM, console e replay come su desktop; la rete dal registro della pagina stessa, poiché Appium non offre BiDi (vedi [Network Logs](/docs/devtools/wdio/network-logs#without-webdriver-bidi)) |
| **App nativa** | mai | comandi, screenshot e dati degli elementi dall'albero XML della piattaforma; nessun DOM |
| **App ibrida** | solo mentre si trova in un contesto webview | le parti native come un'app, le parti webview come una pagina |

L'elemento discriminante è il **nome del browser nelle capabilities**, non il dispositivo: un browser mobile ne dichiara uno, un'app nativa nessuno. Non è nemmeno necessario un dispositivo: una sessione Mac2, WinAppDriver o tvOS non ha alcun documento e viene trattata allo stesso modo.

## App ibride e contesto attivo

Un'app ibrida è il caso a cui le sole capabilities non possono rispondere, perché la risposta cambia durante l'esecuzione. Appium riporta `NATIVE_APP` oppure un contesto webview, e **tutto ciò che non è `NATIVE_APP` conta come webview** — il prefisso `WEBVIEW_` è una convenzione, e a un driver che chiamasse la propria webview in modo diverso verrebbe altrimenti saltata l'acquisizione del DOM.

Seguire il contesto non costa alcun round trip aggiuntivo: il comando di cambio contesto porta la propria destinazione nei suoi argomenti, e un cambio non riuscito viene ignorato.

## Supporto degli adapter

Tutti e quattro gli adapter rilevano una sessione nativa e in tal caso saltano l'acquisizione lato pagina. Differiscono per le app ibride:

| Funzionalità | WebdriverIO | Selenium | Nightwatch | Python |
|---|---|---|---|---|
| Sessione nativa rilevata, acquisizione lato pagina saltata | ✅ | ✅ | ✅ | ✅ |
| Segue un'app ibrida nella sua webview | ✅ | ⚠️ ¹ | ⚠️ ¹ | ⚠️ ¹ |
| Rete dell'app nativa tramite appium-interceptor (`appium:intercept`) | ✅ | ✅ | ✅ | ✅ |

¹ Risponde solo in base alle capabilities iniziali, quindi la parte webview di una sessione ibrida viene acquisita come se fosse ancora nativa — nessun DOM per quelle azioni.

Il **dispositivo stesso** non richiede supporto da parte dell'adapter: viene ricavato dalle capabilities della sessione dal trace exporter condiviso durante la scrittura nell'archivio, e dalla dashboard per una sessione live il cui adapter non ne ha inviato alcuno. Ogni adapter ottiene quindi la cornice del dispositivo.

## Nella dashboard

Un'acquisizione da telefono viene inquadrata come il dispositivo: una colonna del dispositivo a tutta altezza con l'elenco delle azioni e il dock accanto, **sia** in modalità live sia nel [trace player](/docs/devtools/trace-player). Il `context-options` della trace registra piattaforma, modello e versione del sistema operativo, che vengono riletti all'apertura in modo che il player etichetti i frame senza dover indovinare.

In una sessione nativa la scheda A11y e i dati degli elementi provengono dall'albero XML della piattaforma anziché dal DOM, quindi i locator appaiono come `android=new UiSelector()…` o `-ios predicate string:…` anziché come CSS o XPath sull'HTML.

## Rete dell'app nativa

Un'app nativa non ha alcun documento e Appium non fornisce eventi di rete BiDi, quindi per impostazione predefinita la scheda Network di una sessione nativa è vuota. Ogni adapter può invece leggere il traffico dell'app dal plugin [appium-interceptor](https://github.com/AppiumTestDistribution/appium-interceptor-plugin), che instrada il dispositivo attraverso un proprio proxy. Installa il plugin e avvia Appium con esso:

```sh
appium plugin install --source=npm appium-interceptor
appium --use-plugins=appium-interceptor
```

Quindi richiedi il proxy con `appium:intercept: true` nelle capabilities della sessione (viene letto anche dall'interno di `appium:options`):

<Tabs groupId="devtools-mobile-network">
<TabItem value="wdio" label="WebdriverIO" default>

```ts
capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': '/path/to/app.apk',
    'appium:intercept': true
}]
```

</TabItem>
<TabItem value="selenium" label="Selenium (Node.js)">

```js
const driver = await new Builder()
  .usingServer('http://127.0.0.1:4723')
  .withCapabilities({
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': '/path/to/app.apk',
    'appium:intercept': true
  })
  .build()
```

</TabItem>
<TabItem value="nightwatch" label="Nightwatch">

```js
desiredCapabilities: {
  browserName: null,
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:app': '/path/to/app.apk',
  'appium:intercept': true
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from appium.options.android import UiAutomator2Options

options = UiAutomator2Options()
options.app = "/path/to/app.apk"
options.set_capability("appium:intercept", True)
```

</TabItem>
</Tabs>

L'adapter avvia un listener per ogni sessione, inclusa una che la sostituisce durante l'esecuzione, sia in modalità live sia in modalità trace. Legge ciò che il proxy ha registrato al massimo ogni 2 secondi tra un comando e l'altro, perché ogni lettura restituisce l'intera cronologia, e sempre alla fine di ogni test (prima che venga scritta la porzione di trace di quel test) e alla fine della sessione. Ogni richiesta mostra metodo, URL, stato, header e body. Il plugin non registra alcuna temporizzazione, quindi una richiesta viene collocata nel momento in cui è stata letta per la prima volta e non mostra alcuna durata, e le richieste che l'app effettua prima dell'avvio del listener (il suo traffico di avvio) non vengono elencate. Senza il plugin l'adapter registra un avviso e la sessione si svolge normalmente.

Ciò si applica solo alle sessioni native; una sessione di browser mobile acquisisce già la propria rete tramite la pagina. Il plugin supporta Android. Per il traffico HTTPS l'app deve considerare attendibile il certificato che il plugin installa sul dispositivo, cosa che una build di release di solito non fa (vedi la configurazione della sicurezza di rete di Android).

## Cosa non contiene una trace mobile

Gli snapshot per azione vengono emessi dall'interno dell'hook del comando, e Appium serializza una sonda dietro il comando che sta osservando. Laddove una sessione abbia un documento da sondare, quello snapshot viene quindi saltato.

In pratica: **le azioni nella webview di un'app ibrida non contengono dati degli elementi per azione, albero di accessibilità né screenshot di assestamento.** Le sessioni native, i browser mobili e tutte le sessioni desktop non sono interessati. Le righe dei comandi e i relativi screenshot, la console e l'archivio stesso vengono sempre acquisiti. La rete di un browser mobile proviene dal buffer Resource Timing della pagina e dalla sua patch di `fetch` / `XMLHttpRequest` anziché da BiDi, e una sessione nativa non ha acquisizione di rete a meno che non attivi il plugin appium-interceptor (vedi [Rete dell'app nativa](#native-app-network)), perché il driver non ne espone alcuna.

Queste assenze sono intenzionali. Non sono un errore di acquisizione, e sono la cosa principale da sapere prima di eseguire il debug di una trace ibrida.

## Eseguire un esempio

Il repository contiene un esempio mobile per ciascun adapter, e tutti e quattro
eseguono lo stesso flusso, quindi una differenza tra due dashboard è una differenza
nell'adapter e non nel test.

Gli esempi si trovano nel [repository devtools](https://github.com/webdriverio/devtools),
non nei pacchetti degli adapter, quindi installare un adapter nel proprio progetto
non fornisce questi script. Clona e compila quel repository una volta:

```sh
git clone https://github.com/webdriverio/devtools.git
cd devtools
pnpm install
pnpm build
```

L'esempio Python usa il `python3` presente nel tuo `PATH`, quindi installa prima
l'adapter e il client Appium al suo interno (un ambiente virtuale li tiene separati
dal Python di sistema):

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -e packages/selenium-devtools-py
pip install -r examples/selenium-py/requirements-mobile.txt
```

Quindi, con Appium e un dispositivo pronti (vedi [Prerequisiti](#prerequisites)),
esegui uno qualsiasi di essi dalla radice di quel checkout:

```sh
pnpm demo:wdio:mobile
pnpm demo:selenium:mobile
pnpm demo:nightwatch:mobile
pnpm demo:python:mobile
```

Eseguono l'**app Orologio**, inclusa in ogni immagine di sistema Android — quindi
non c'è alcun `.apk` da fornire, nulla da caricare e nessuna credenziale. Il flusso
rimane nella schermata di configurazione del timer: apri la scheda Timer, cancella
l'input fino a zero, digita una durata sul tastierino, rileggila e correggila con
il tasto backspace.

Volutamente non **avviano** mai un timer. Un timer in esecuzione sopravvive alla
sessione e sostituisce la schermata di configurazione con la propria scheda, quindi
uno spec che ne avvia uno è rieseguibile solo se lo porta anche a termine — un'esecuzione
interrotta comprometterebbe tutte quelle successive. Non avviarne uno elimina
questa classe di errori, e il tastierino mette comunque alla prova ciò per cui
esiste un esempio: input reale, cambiamento di stato reale, acquisito.

Evitano anche i chip predefiniti dell'Orologio, che sembrano controlli fissi ma
non lo sono: sono suggerimenti di durate usate di recente, quindi un Orologio appena
reimpostato offre solo il tastierino e un flusso basato sui predefiniti fallisce su
qualsiasi dispositivo senza cronologia dei timer — CI inclusa. Esistono due layout
dell'Orologio nella stessa versione dell'app, e il tastierino è comune a entrambi.

`DEVTOOLS_MODE=trace` porta uno qualsiasi di essi in modalità trace, `DEVTOOLS_MOBILE=web`
usa il browser del dispositivo invece di un'app — Chrome su Android, Safari su
iOS — e `APPIUM_APP` lo indirizza verso un'app reale. [`examples/MOBILE.md`](https://github.com/webdriverio/devtools/blob/main/examples/MOBILE.md)
nel repository è la guida completa alla configurazione.

## iOS

```sh
DEVTOOLS_MOBILE_PLATFORM=ios pnpm demo:wdio:mobile
```

**Tutti e quattro gli adapter.** Ciascuno contiene una directory di spec `android/`
e una `ios/` e il runner sceglie tra le due, quindi il comando sopra funziona anche con
`demo:selenium:mobile`, `demo:nightwatch:mobile` e `demo:python:mobile`.
L'acquisizione in sé non è mai stata specifica della piattaforma — ciò di cui ogni
adapter aveva bisogno era uno spec, non lavoro sull'adapter.

iOS usa **Impostazioni**, non Orologio, perché Orologio non è affatto installato
sul simulatore: `xcrun simctl listapps` elenca Impostazioni, Calendario, Promemoria,
Mappe e Safari, ma nessun Orologio. Impostazioni è presente su ogni simulatore e su
ogni dispositivo, la stessa proprietà che rende Orologio la scelta per Android. Il
flusso entra in Generali e torna indietro, verificando il titolo della barra di
navigazione in entrambe le direzioni — la stessa struttura del flusso Android, con
l'app che la piattaforma fornisce davvero.

Android e iOS sono **spec separati**, non un unico spec con una diramazione, perché
non condividono alcun selettore: i locator iOS sono accessibility id ed etichette
anziché resource-id.

Anche qui funziona `DEVTOOLS_MOBILE=web`, e richiede meno che su Android: apre
**Safari**, che il driver XCUITest gestisce da solo — nessun Chromedriver da
abbinare e nulla da aggiungere al comando `appium`.

**Il simulatore da usare viene risolto in un udid, mai in un semplice nome.**
Indicarne uno che non esiste non genera un errore — il driver XCUITest lo *crea*
e lo avvia, a ogni esecuzione, accanto al simulatore già in esecuzione, lasciando
ogni volta un nuovo simulatore. Per questo gli esempi usano per impostazione
predefinita il simulatore già avviato, e un `IOS_DEVICE_NAME` che non corrisponde
a nessuno di essi viene rifiutato mostrando l'elenco di quelli avviati, anziché
essere inoltrato.

Questa è una politica **locale**. `xcrun simctl` enumera solo i simulatori locali,
quindi `IOS_UDID` indica direttamente un dispositivo e non viene confrontato con
nulla — un dispositivo reale non ha alcuna voce corrispondente — e con un Appium
remoto o cloud (`APPIUM_HOST` impostato su qualsiasi valore diverso da localhost)
il nome del dispositivo viene inoltrato così com'è, poiché è indicandone il nome
che un tale servizio lo seleziona.

Oltre ai prerequisiti Android, nessuno dei quali è usato da iOS, ti servono Xcode
(i Command Line Tools non includono simulatori), un runtime del simulatore
(`xcodebuild -downloadPlatform iOS`, un download separato di circa 8 GB), un
simulatore avviato e `appium driver install xcuitest` — la cui prima esecuzione
compila anche WebDriverAgent. Appium carica i driver all'**avvio**, quindi un server
già in esecuzione quando hai installato il driver segnalerà di non trovare XCUITest
finché non lo riavvii.

## Prerequisiti

L'esecuzione su un emulatore Android locale richiede, oltre a quanto indicato in [Getting Started](/docs/devtools/getting-started):

1. **Java JDK** e l'**Android SDK** — con `ANDROID_HOME` che punta all'SDK in cui installa effettivamente il `sdkmanager` presente nel tuo `PATH`, che non è sempre `~/Library/Android/sdk`.
2. **Un AVD e un emulatore in esecuzione**, oppure un dispositivo fisico con il debug USB attivo.
3. **Appium con il driver UiAutomator2** (`appium driver install uiautomator2`), oppure il driver XCUITest per iOS — vedi [iOS](#ios) sopra.
4. **Un Chromedriver corrispondente**, per un browser mobile o un'app ibrida. Una webview è gestita da Chromedriver, e il download automatico di Appium spesso non dispone di una build corrispondente al Chrome dell'immagine di sistema — in entrambe le direzioni. Si manifesta come `No Chromedriver found that can automate Chrome '<version>'` all'ingresso in una webview, che sembra un errore di acquisizione ma è una lacuna dell'ambiente. Avvia Appium con `--default-capabilities '{"appium:chromedriverExecutableDir": "<path>"}'` più `--allow-insecure=uiautomator2:chromedriver_autodownload`. **Un'esecuzione su app nativa non richiede nulla di tutto ciò.**
5. **Protocollo WebDriver classico** per WebdriverIO — lo shim BiDi di Appium per UiAutomator2 non implementa tutti i comandi BiDi, quindi imposta `'wdio:enforceWebDriverClassic': true` nel blocco delle capabilities.