---
id: mobile
title: Comandi Mobile
---

# Introduzione ai comandi Mobile personalizzati e migliorati in WebdriverIO

Testare app mobile e applicazioni web mobile comporta sfide specifiche, soprattutto quando si ha a che fare con le differenze tra le piattaforme Android e iOS. Sebbene Appium offra la flessibilità necessaria per gestire queste differenze, spesso richiede di immergersi in documentazione complessa e dipendente dalla piattaforma ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) e in comandi altrettanto complessi. Questo può rendere la scrittura degli script di test più dispendiosa in termini di tempo, soggetta a errori e difficile da mantenere.

Per semplificare il processo, WebdriverIO introduce **comandi mobile personalizzati e migliorati**, pensati specificamente per il testing di web mobile e app native. Questi comandi astraggono le complessità delle API Appium sottostanti, consentendoti di scrivere script di test concisi, intuitivi e indipendenti dalla piattaforma. Puntando sulla facilità d'uso, il nostro obiettivo è ridurre il carico aggiuntivo durante lo sviluppo di script Appium e permetterti di automatizzare le app mobile senza sforzo.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Perché comandi mobile personalizzati?

### 1. **Semplificare API complesse**
Alcuni comandi Appium, come i gesti o le interazioni con gli elementi, comportano una sintassi prolissa e intricata. Ad esempio, eseguire un'azione di pressione prolungata con l'API nativa di Appium richiede di costruire manualmente una catena di `action`:

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

Con i comandi personalizzati di WebdriverIO, la stessa azione può essere eseguita con un'unica, espressiva riga di codice:

```ts
await $('~Contacts').longPress();
```

Questo riduce drasticamente il codice boilerplate, rendendo i tuoi script più puliti e più facili da comprendere.

### 2. **Astrazione multipiattaforma**
Le app mobile richiedono spesso una gestione specifica per piattaforma. Ad esempio, lo scrolling nelle app native differisce in modo significativo tra [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) e [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO colma questo divario fornendo comandi unificati come `scrollIntoView()` che funzionano senza problemi su tutte le piattaforme, indipendentemente dall'implementazione sottostante.

```ts
await $('~element').scrollIntoView();
```

Questa astrazione garantisce che i tuoi test siano portabili e non richiedano continue ramificazioni o logiche condizionali per tenere conto delle differenze tra sistemi operativi.

### 3. **Maggiore produttività**
Riducendo la necessità di comprendere e implementare comandi Appium di basso livello, i comandi mobile di WebdriverIO ti permettono di concentrarti sul test delle funzionalità della tua app anziché lottare con le sfumature specifiche di ogni piattaforma. Ciò è particolarmente vantaggioso per i team con esperienza limitata nell'automazione mobile o per chi desidera accelerare il proprio ciclo di sviluppo.

### 4. **Coerenza e manutenibilità**
I comandi personalizzati conferiscono uniformità ai tuoi script di test. Invece di avere implementazioni diverse per azioni simili, il tuo team può fare affidamento su comandi standardizzati e riutilizzabili. Questo non solo rende il codice più manutenibile, ma abbassa anche la barriera d'ingresso per l'inserimento di nuovi membri nel team.

## Perché migliorare alcuni comandi mobile?

### 1. Aggiungere flessibilità
Alcuni comandi mobile sono stati migliorati per fornire opzioni e parametri aggiuntivi non disponibili nelle API predefinite di Appium. Ad esempio, WebdriverIO aggiunge logica di retry, timeout e la possibilità di filtrare le webview in base a criteri specifici, offrendo un maggiore controllo su scenari complessi.

```ts
// Esempio: personalizzazione degli intervalli di retry e dei timeout per il rilevamento delle webview
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Riprova ogni secondo
  androidWebviewConnectTimeout: 10000,    // Timeout dopo 10 secondi
});
```

Queste opzioni aiutano ad adattare gli script di automazione al comportamento dinamico dell'app senza codice boilerplate aggiuntivo.

### 2. Migliorare l'usabilità
I comandi migliorati astraggono le complessità e gli schemi ripetitivi presenti nelle API native. Ti consentono di eseguire più azioni con meno righe di codice, riducendo la curva di apprendimento per i nuovi utenti e rendendo gli script più facili da leggere e mantenere.

```ts
// Esempio: comando migliorato per cambiare contesto in base al titolo
await driver.switchContext({
  title: 'My Webview Title',
});
```

Rispetto ai metodi predefiniti di Appium, i comandi migliorati eliminano la necessità di passaggi aggiuntivi come il recupero manuale dei contesti disponibili e il loro filtraggio.

### 3. Standardizzare il comportamento
WebdriverIO garantisce che i comandi migliorati si comportino in modo coerente su piattaforme come Android e iOS. Questa astrazione multipiattaforma riduce al minimo la necessità di logiche condizionali basate sul sistema operativo, portando a script di test più manutenibili.

```ts
// Esempio: comando di scroll unificato per entrambe le piattaforme
await $('~element').scrollIntoView();
```

Questa standardizzazione semplifica il codice, in particolare per i team che automatizzano test su più piattaforme.

### 4. Aumentare l'affidabilità
Integrando meccanismi di retry, impostazioni predefinite intelligenti e messaggi di errore dettagliati, i comandi migliorati riducono la probabilità di test instabili (flaky). Questi miglioramenti assicurano che i tuoi test siano resilienti a problemi come ritardi nell'inizializzazione delle webview o stati transitori dell'app.

```ts
// Esempio: cambio di webview migliorato con una logica di corrispondenza robusta
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Questo rende l'esecuzione dei test più prevedibile e meno soggetta a errori causati da fattori ambientali.

### 5. Potenziare le capacità di debug
I comandi migliorati restituiscono spesso metadati più ricchi, facilitando il debug di scenari complessi, in particolare nelle app ibride. Ad esempio, comandi come getContext e getContexts possono restituire informazioni dettagliate sulle webview, tra cui titolo, url e stato di visibilità.

```ts
// Esempio: recupero di metadati dettagliati per il debug
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Questi metadati aiutano a identificare e risolvere i problemi più rapidamente, migliorando l'esperienza complessiva di debug.


Migliorando i comandi mobile, WebdriverIO non solo rende l'automazione più semplice, ma resta anche fedele alla sua missione di fornire agli sviluppatori strumenti potenti, affidabili e intuitivi.

## App ibride

Le app ibride combinano contenuti web con funzionalità native e richiedono una gestione specifica durante l'automazione. Queste app utilizzano le webview per visualizzare contenuti web all'interno di un'applicazione nativa. WebdriverIO fornisce metodi migliorati per lavorare efficacemente con le app ibride.

### Comprendere le webview
Una webview è un componente simile a un browser incorporato in un'app nativa:

- **Android:** Le webview si basano su Chrome/System Webview e possono contenere più pagine (simili alle schede di un browser). Queste webview richiedono ChromeDriver per automatizzare le interazioni. Appium può determinare automaticamente la versione di ChromeDriver necessaria in base alla versione di System WebView o di Chrome installata sul dispositivo e scaricarla automaticamente se non è già disponibile. Questo approccio garantisce una compatibilità senza problemi e riduce al minimo la configurazione manuale. Consulta la [documentazione di Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) per scoprire come Appium scarica automaticamente la versione corretta di ChromeDriver.
- **iOS:** Le webview sono basate su Safari (WebKit) e identificate da ID generici come `WEBVIEW_{id}`.

### Sfide con le app ibride
1. Identificare la webview corretta tra più opzioni.
2. Recuperare metadati aggiuntivi come titolo, URL o nome del pacchetto per un contesto migliore.
3. Gestire le differenze specifiche tra le piattaforme Android e iOS.
4. Passare in modo affidabile al contesto corretto in un'app ibrida.

### Comandi principali per le app ibride

#### 1. `getContext`
Recupera il contesto corrente della sessione. Per impostazione predefinita, si comporta come il metodo getContext di Appium, ma può fornire informazioni dettagliate sul contesto quando `returnDetailedContext` è abilitato. Per maggiori informazioni consulta [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Restituisce un elenco dettagliato dei contesti disponibili, migliorando il metodo contexts di Appium. Questo rende più semplice identificare la webview corretta con cui interagire senza dover chiamare comandi aggiuntivi per determinare titolo, url o `bundleId|packageName` attivo. Per maggiori informazioni consulta [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Passa a una webview specifica in base a nome, titolo o url. Offre ulteriore flessibilità, come l'uso di espressioni regolari per la corrispondenza. Per maggiori informazioni consulta [`switchContext`](/docs/api/mobile/switchContext)

### Funzionalità principali per le app ibride
1. Metadati dettagliati: recupera informazioni complete per il debug e per un cambio di contesto affidabile.
2. Coerenza multipiattaforma: comportamento unificato per Android e iOS, gestendo senza problemi le peculiarità di ciascuna piattaforma.
3. Logica di retry personalizzata (Android): regola gli intervalli di retry e i timeout per il rilevamento delle webview.


:::info Note e limitazioni
- Android fornisce metadati aggiuntivi, come `packageName` e `webviewPageId`, mentre iOS si concentra su `bundleId`.
- La logica di retry è personalizzabile per Android ma non è applicabile a iOS.
- Ci sono diversi casi in cui iOS non riesce a trovare la Webview. Appium fornisce diverse capability aggiuntive per `appium-xcuitest-driver` per trovare la Webview. Se ritieni che la Webview non venga trovata, puoi provare a impostare una delle seguenti capability:
    - `appium:includeSafariInWebviews`: Aggiunge i contesti web di Safari all'elenco dei contesti disponibili durante un test di un'app nativa/webview. È utile se il test apre Safari e deve poter interagire con esso. Il valore predefinito è `false`.
    - `appium:webviewConnectRetries`: Il numero massimo di tentativi prima di rinunciare al rilevamento delle pagine web view. Il ritardo tra un tentativo e l'altro è di 500ms, il valore predefinito è `10` tentativi.
    - `appium:webviewConnectTimeout`: Il tempo massimo in millisecondi da attendere affinché una pagina web view venga rilevata. Il valore predefinito è `5000` ms.

Per esempi avanzati e dettagli, consulta la documentazione delle API Mobile di WebdriverIO.
:::


---

Il nostro insieme di comandi in continua crescita riflette il nostro impegno nel rendere l'automazione mobile accessibile ed elegante. Che tu stia eseguendo gesti complessi o lavorando con elementi di app native, questi comandi sono in linea con la filosofia di WebdriverIO di creare un'esperienza di automazione fluida. E non ci fermiamo qui: se c'è una funzionalità che vorresti vedere, accogliamo volentieri il tuo feedback. Sentiti libero di inviare le tue richieste tramite [questo link](https://github.com/webdriverio/webdriverio/issues/new/choose).