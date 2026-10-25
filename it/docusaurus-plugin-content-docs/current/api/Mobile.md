---
id: mobile
title: Comandi Mobile
---

# Introduzione ai comandi Mobile personalizzati e migliorati in WebdriverIO

Testare app mobili e applicazioni web mobili comporta sfide specifiche, soprattutto quando si ha a che fare con le differenze specifiche della piattaforma tra Android e iOS. Sebbene Appium offra la flessibilità necessaria per gestire queste differenze, spesso richiede di immergersi in documentazione complessa e dipendente dalla piattaforma ([Android](https://appium.github.io/appium-uiautomator2-driver/latest/reference/execute-methods/#gestures), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) e in comandi altrettanto complessi. Questo può rendere la scrittura degli script di test più dispendiosa in termini di tempo, soggetta a errori e difficile da mantenere.

Per semplificare il processo, WebdriverIO introduce **comandi mobile personalizzati e migliorati** pensati specificamente per il testing di web mobile e app native. Questi comandi astraggono le complessità delle API Appium sottostanti, consentendoti di scrivere script di test concisi, intuitivi e indipendenti dalla piattaforma. Puntando sulla facilità d'uso, miriamo a ridurre il carico aggiuntivo durante lo sviluppo di script Appium e a permetterti di automatizzare le app mobili senza sforzo.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Perché i comandi Mobile personalizzati?

### 1. **Semplificare API complesse**
Alcuni comandi Appium, come i gesti o le interazioni con gli elementi, prevedono una sintassi prolissa e intricata. Ad esempio, eseguire un'azione di pressione prolungata con l'API nativa di Appium richiede di costruire manualmente una catena `action`:

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

Con i comandi personalizzati di WebdriverIO, la stessa azione può essere eseguita con una singola ed espressiva riga di codice:

```ts
await $('~Contacts').longPress();
```

Questo riduce drasticamente il codice boilerplate, rendendo i tuoi script più puliti e facili da comprendere.

### 2. **Astrazione multipiattaforma**
Le app mobili richiedono spesso una gestione specifica per piattaforma. Ad esempio, lo scorrimento nelle app native differisce in modo significativo tra [Android](https://appium.github.io/appium-uiautomator2-driver/latest/reference/execute-methods/#mobile-scrollgesture) e [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO colma questo divario fornendo comandi unificati come `scrollIntoView()` che funzionano senza problemi su tutte le piattaforme, indipendentemente dall'implementazione sottostante.

```ts
await $('~element').scrollIntoView();
```

Questa astrazione garantisce che i tuoi test siano portabili e non richiedano continue ramificazioni o logiche condizionali per tenere conto delle differenze tra sistemi operativi.

### 3. **Maggiore produttività**
Riducendo la necessità di comprendere e implementare comandi Appium di basso livello, i comandi mobile di WebdriverIO ti consentono di concentrarti sul test delle funzionalità della tua app anziché lottare con le sfumature specifiche della piattaforma. Questo è particolarmente vantaggioso per i team con esperienza limitata nell'automazione mobile o per quelli che desiderano accelerare il proprio ciclo di sviluppo.

### 4. **Coerenza e manutenibilità**
I comandi personalizzati portano uniformità ai tuoi script di test. Invece di avere implementazioni diverse per azioni simili, il tuo team può fare affidamento su comandi standardizzati e riutilizzabili. Questo non solo rende il codice più manutenibile, ma abbassa anche la barriera di ingresso per i nuovi membri del team.

## Perché migliorare alcuni comandi mobile?

### 1. Aggiungere flessibilità
Alcuni comandi mobile sono stati migliorati per fornire opzioni e parametri aggiuntivi non disponibili nelle API predefinite di Appium. Ad esempio, WebdriverIO aggiunge logica di ripetizione, timeout e la possibilità di filtrare le webview in base a criteri specifici, consentendo un maggiore controllo su scenari complessi.

```ts
// Example: Customizing retry intervals and timeouts for webview detection
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Retry every 1 second
  androidWebviewConnectTimeout: 10000,    // Timeout after 10 seconds
});
```

Queste opzioni aiutano ad adattare gli script di automazione al comportamento dinamico delle app senza codice boilerplate aggiuntivo.

### 2. Migliorare l'usabilità
I comandi migliorati astraggono le complessità e gli schemi ripetitivi presenti nelle API native. Ti permettono di eseguire più azioni con meno righe di codice, riducendo la curva di apprendimento per i nuovi utenti e rendendo gli script più facili da leggere e mantenere.

```ts
// Example: Enhanced command for switching context by title
await driver.switchContext({
  title: 'My Webview Title',
});
```

Rispetto ai metodi predefiniti di Appium, i comandi migliorati eliminano la necessità di passaggi aggiuntivi come il recupero manuale dei contesti disponibili e il loro filtraggio.

### 3. Standardizzare il comportamento
WebdriverIO garantisce che i comandi migliorati si comportino in modo coerente su piattaforme come Android e iOS. Questa astrazione multipiattaforma riduce al minimo la necessità di logiche condizionali basate sul sistema operativo, portando a script di test più manutenibili.

```ts
// Example: Unified scroll command for both platforms
await $('~element').scrollIntoView();
```

Questa standardizzazione semplifica il codice, soprattutto per i team che automatizzano i test su più piattaforme.

### 4. Aumentare l'affidabilità
Incorporando meccanismi di ripetizione, impostazioni predefinite intelligenti e messaggi di errore dettagliati, i comandi migliorati riducono la probabilità di test instabili (flaky). Questi miglioramenti garantiscono che i tuoi test siano resilienti a problemi come ritardi nell'inizializzazione delle webview o stati transitori dell'app.

```ts
// Example: Enhanced webview switching with robust matching logic
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Questo rende l'esecuzione dei test più prevedibile e meno soggetta a errori causati da fattori ambientali.

### 5. Migliorare le capacità di debug
I comandi migliorati spesso restituiscono metadati più ricchi, facilitando il debug di scenari complessi, in particolare nelle app ibride. Ad esempio, comandi come getContext e getContexts possono restituire informazioni dettagliate sulle webview, inclusi titolo, url e stato di visibilità.

```ts
// Example: Retrieving detailed metadata for debugging
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Questi metadati aiutano a identificare e risolvere i problemi più rapidamente, migliorando l'esperienza complessiva di debug.


Migliorando i comandi mobile, WebdriverIO non solo rende l'automazione più semplice, ma si allinea anche alla sua missione di fornire agli sviluppatori strumenti potenti, affidabili e intuitivi da usare.

## App ibride

Le app ibride combinano contenuti web con funzionalità native e richiedono una gestione specializzata durante l'automazione. Queste app utilizzano le webview per visualizzare contenuti web all'interno di un'applicazione nativa. WebdriverIO fornisce metodi migliorati per lavorare efficacemente con le app ibride.

### Comprendere le Webview
Una webview è un componente simile a un browser incorporato in un'app nativa:

- **Android:** Le webview sono basate su Chrome/System Webview e possono contenere più pagine (simili alle schede del browser). Queste webview richiedono ChromeDriver per automatizzare le interazioni. Appium può determinare automaticamente la versione di ChromeDriver richiesta in base alla versione di System WebView o di Chrome installata sul dispositivo e scaricarla automaticamente se non è già disponibile. Questo approccio garantisce una compatibilità senza problemi e riduce al minimo la configurazione manuale. Consulta la [documentazione di Appium UIAutomator2](https://appium.github.io/appium-uiautomator2-driver/latest/guides/hybrid/#automatic-discovery) per sapere come Appium scarica automaticamente la versione corretta di ChromeDriver.
- **iOS:** Le webview sono basate su Safari (WebKit) e identificate da ID generici come `WEBVIEW_{id}`.

### Sfide con le app ibride
1. Identificare la webview corretta tra più opzioni.
2. Recuperare metadati aggiuntivi come titolo, URL o nome del pacchetto per un contesto migliore.
3. Gestire le differenze specifiche della piattaforma tra Android e iOS.
4. Passare in modo affidabile al contesto corretto in un'app ibrida.

### Comandi chiave per le app ibride

#### 1. `getContext`
Recupera il contesto corrente della sessione. Per impostazione predefinita, si comporta come il metodo getContext di Appium, ma può fornire informazioni dettagliate sul contesto quando `returnDetailedContext` è abilitato. Per maggiori informazioni consulta [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Restituisce un elenco dettagliato dei contesti disponibili, migliorando il metodo contexts di Appium. Questo rende più facile identificare la webview corretta per l'interazione senza dover chiamare comandi aggiuntivi per determinare titolo, url o `bundleId|packageName` attivo. Per maggiori informazioni consulta [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Passa a una webview specifica in base a nome, titolo o url. Offre una flessibilità aggiuntiva, come l'uso di espressioni regolari per la corrispondenza. Per maggiori informazioni consulta [`switchContext`](/docs/api/mobile/switchContext)

### Funzionalità chiave per le app ibride
1. Metadati dettagliati: recupera informazioni complete per il debug e per un cambio di contesto affidabile.
2. Coerenza multipiattaforma: comportamento unificato per Android e iOS, gestendo senza problemi le peculiarità specifiche della piattaforma.
3. Logica di ripetizione personalizzata (Android): regola gli intervalli di ripetizione e i timeout per il rilevamento delle webview.


:::info Note e limitazioni
- Android fornisce metadati aggiuntivi, come `packageName` e `webviewPageId`, mentre iOS si concentra su `bundleId`.
- La logica di ripetizione è personalizzabile per Android ma non è applicabile a iOS.
- Ci sono diversi casi in cui iOS non riesce a trovare la Webview. Appium fornisce diverse capability aggiuntive per `appium-xcuitest-driver` per trovare la Webview. Se ritieni che la Webview non venga trovata, puoi provare a impostare una delle seguenti capability:
    - `appium:includeSafariInWebviews`: Aggiunge i contesti web di Safari all'elenco dei contesti disponibili durante un test di app nativa/webview. È utile se il test apre Safari e deve poter interagire con esso. Il valore predefinito è `false`.
    - `appium:webviewConnectRetries`: Il numero massimo di tentativi prima di rinunciare al rilevamento delle pagine web view. Il ritardo tra ogni tentativo è di 500ms, il valore predefinito è `10` tentativi.
    - `appium:webviewConnectTimeout`: La quantità massima di tempo in millisecondi da attendere affinché una pagina web view venga rilevata. Il valore predefinito è `5000` ms.

Per esempi avanzati e dettagli, consulta la documentazione dell'API Mobile di WebdriverIO.
:::


---

Il nostro insieme di comandi in continua crescita riflette il nostro impegno a rendere l'automazione mobile accessibile ed elegante. Che tu stia eseguendo gesti complessi o lavorando con elementi di app native, questi comandi sono in linea con la filosofia di WebdriverIO di creare un'esperienza di automazione senza interruzioni. E non ci fermiamo qui: se c'è una funzionalità che vorresti vedere, accogliamo con piacere il tuo feedback. Sentiti libero di inviare le tue richieste tramite [questo link](https://github.com/webdriverio/webdriverio/issues/new/choose).