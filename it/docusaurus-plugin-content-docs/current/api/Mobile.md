---
id: mobile
title: Comandi Mobile
---

# Introduzione ai comandi Mobile personalizzati e migliorati in WebdriverIO

Testare app mobile e applicazioni web per dispositivi mobili comporta sfide specifiche, soprattutto quando si affrontano le differenze tra piattaforme Android e iOS. Mentre Appium offre la flessibilità necessaria per gestire queste differenze, spesso richiede di approfondire documentazione complessa e dipendente dalla piattaforma ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) e comandi. Questo può rendere la scrittura degli script di test più dispendiosa in termini di tempo, soggetta a errori e difficile da mantenere.

Per semplificare il processo, WebdriverIO introduce **comandi mobile personalizzati e migliorati** specificamente adattati per i test web mobile e delle app native. Questi comandi astraggono le complessità delle API Appium sottostanti, consentendoti di scrivere script di test concisi, intuitivi e indipendenti dalla piattaforma. Concentrandoci sulla facilità d'uso, miriamo a ridurre il carico extra durante lo sviluppo di script Appium e permetterti di automatizzare le app mobile senza sforzo.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Perché utilizzare comandi Mobile personalizzati?

### 1. **Semplificare API complesse**
Alcuni comandi Appium, come i gesti o le interazioni con gli elementi, comportano una sintassi verbosa e complessa. Ad esempio, eseguire un'azione di pressione prolungata con l'API nativa di Appium richiede la costruzione manuale di una catena di `action`:

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

Con i comandi personalizzati di WebdriverIO, la stessa azione può essere eseguita con una singola riga di codice espressiva:

```ts
await $('~Contacts').longPress();
```

Questo riduce drasticamente il codice ripetitivo, rendendo i tuoi script più puliti e facili da comprendere.

### 2. **Astrazione multipiattaforma**
Le app mobile spesso richiedono una gestione specifica per piattaforma. Ad esempio, lo scorrimento nelle app native differisce significativamente tra [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) e [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO colma questa lacuna fornendo comandi unificati come `scrollIntoView()` che funzionano perfettamente su tutte le piattaforme, indipendentemente dall'implementazione sottostante.

```ts
await $('~element').scrollIntoView();
```

Questa astrazione garantisce che i tuoi test siano portabili e non richiedano costanti ramificazioni o logica condizionale per tenere conto delle differenze tra sistemi operativi.

### 3. **Maggiore produttività**
Riducendo la necessità di comprendere e implementare comandi Appium di basso livello, i comandi mobile di WebdriverIO ti consentono di concentrarti sul test della funzionalità della tua app piuttosto che lottare con sfumature specifiche della piattaforma. Questo è particolarmente vantaggioso per i team con esperienza limitata nell'automazione mobile o per coloro che cercano di accelerare il loro ciclo di sviluppo.

### 4. **Coerenza e manutenibilità**
I comandi personalizzati apportano uniformità ai tuoi script di test. Invece di avere implementazioni diverse per azioni simili, il tuo team può fare affidamento su comandi standardizzati e riutilizzabili. Questo non solo rende il codice più manutenibile, ma abbassa anche la barriera per l'inserimento di nuovi membri del team.

## Perché migliorare determinati comandi mobile?

### 1. Aggiungere flessibilità
Alcuni comandi mobile sono migliorati per fornire opzioni e parametri aggiuntivi che non sono disponibili nelle API Appium predefinite. Ad esempio, WebdriverIO aggiunge logica di ripetizione, timeout e la possibilità di filtrare le webview in base a criteri specifici, consentendo un maggiore controllo su scenari complessi.

```ts
// Esempio: Personalizzazione degli intervalli di ripetizione e timeout per il rilevamento delle webview
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Riprova ogni 1 secondo
  androidWebviewConnectTimeout: 10000,    // Timeout dopo 10 secondi
});
```

Queste opzioni aiutano ad adattare gli script di automazione al comportamento dinamico dell'app senza codice ripetitivo aggiuntivo.

### 2. Migliorare l'usabilità
I comandi migliorati astraggono le complessità e i modelli ripetitivi presenti nelle API native. Ti permettono di eseguire più azioni con meno righe di codice, riducendo la curva di apprendimento per i nuovi utenti e rendendo gli script più facili da leggere e mantenere.

```ts
// Esempio: Comando migliorato per cambiare contesto in base al titolo
await driver.switchContext({
  title: 'My Webview Title',
});
```

Rispetto ai metodi Appium predefiniti, i comandi migliorati eliminano la necessità di passaggi aggiuntivi come il recupero manuale dei contesti disponibili e il filtraggio tra di essi.

### 3. Standardizzare il comportamento
WebdriverIO garantisce che i comandi migliorati si comportino in modo coerente su piattaforme come Android e iOS. Questa astrazione multipiattaforma riduce al minimo la necessità di logica di ramificazione condizionale basata sul sistema operativo, portando a script di test più facilmente manutenibili.

```ts
// Esempio: Comando di scorrimento unificato per entrambe le piattaforme
await $('~element').scrollIntoView();
```

Questa standardizzazione semplifica le basi di codice, specialmente per i team che automatizzano i test su più piattaforme.

### 4. Aumentare l'affidabilità
Incorporando meccanismi di ripetizione, valori predefiniti intelligenti e messaggi di errore dettagliati, i comandi migliorati riducono la probabilità di test instabili. Questi miglioramenti garantiscono che i tuoi test siano resilienti a problemi come ritardi nell'inizializzazione della webview o stati transitori dell'app.

```ts
// Esempio: Cambio di webview migliorato con logica di corrispondenza robusta
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Questo rende l'esecuzione dei test più prevedibile e meno soggetta a fallimenti causati da fattori ambientali.

### 5. Migliorare le capacità di debug
I comandi migliorati spesso restituiscono metadati più ricchi, consentendo un debug più facile di scenari complessi, in particolare nelle app ibride. Ad esempio, comandi come getContext e getContexts possono restituire informazioni dettagliate sulle webview, inclusi titolo, url e stato di visibilità.

```ts
// Esempio: Recupero di metadati dettagliati per il debug
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Questi metadati aiutano a identificare e risolvere i problemi più rapidamente, migliorando l'esperienza di debug complessiva.


Migliorando i comandi mobile, WebdriverIO non solo rende l'automazione più facile, ma si allinea anche alla sua missione di fornire agli sviluppatori strumenti potenti, affidabili e intuitivi da utilizzare.

---

## App ibride

Le app ibride combinano contenuti web con funzionalità native e richiedono una gestione specializzata durante l'automazione. Queste app utilizzano webview per renderizzare contenuti web all'interno di un'applicazione nativa. WebdriverIO fornisce metodi migliorati per lavorare efficacemente con le app ibride.

### Comprendere le Webview
Una webview è un componente simile a un browser incorporato in un'app nativa:

- **Android:** Le webview sono basate su Chrome/System Webview e possono contenere più pagine (simili alle schede del browser). Queste webview richiedono ChromeDriver per automatizzare le interazioni. Appium può determinare automaticamente la versione ChromeDriver richiesta in base alla versione di System WebView o Chrome installata sul dispositivo e scaricarla automaticamente se non è già disponibile. Questo approccio garantisce una compatibilità perfetta e riduce al minimo la configurazione manuale. Consulta la [documentazione Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) per scoprire come Appium scarica automaticamente la versione corretta di ChromeDriver.
- **iOS:** Le webview sono alimentate da Safari (WebKit) e identificate da ID generici come `WEBVIEW_{id}`.

### Sfide con le app ibride
1. Identificare la webview corretta tra più opzioni.
2. Recuperare metadati aggiuntivi come titolo, URL o nome del pacchetto per un contesto migliore.
3. Gestire le differenze specifiche della piattaforma tra Android e iOS.
4. Passare in modo affidabile al contesto corretto in un'app ibrida.

### Comandi chiave per le app ibride

#### 1. `getContext`
Recupera il contesto corrente della sessione. Per impostazione predefinita, si comporta come il metodo getContext di Appium, ma può fornire informazioni dettagliate sul contesto quando `returnDetailedContext` è abilitato. Per maggiori informazioni vedi [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Restituisce un elenco dettagliato di contesti disponibili, migliorando il metodo contexts di Appium. Questo rende più facile identificare la webview corretta per l'interazione senza chiamare comandi extra per determinare titolo, url o `bundleId|packageName` attivo. Per maggiori informazioni vedi [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Passa a una specifica webview in base al nome, titolo o url. Fornisce flessibilità aggiuntiva, come l'uso di espressioni regolari per la corrispondenza. Per maggiori informazioni vedi [`switchContext`](/docs/api/mobile/switchContext)

### Caratteristiche chiave per le app ibride
1. Metadati dettagliati: Recupera dettagli completi per il debug e un cambio di contesto affidabile.
2. Coerenza multipiattaforma: Comportamento unificato per Android e iOS, gestendo senza problemi le peculiarità specifiche della piattaforma.
3. Logica di ripetizione personalizzata (Android): Regola gli intervalli di ripetizione e i timeout per il rilevamento delle webview.


:::info Note e limitazioni
- Android fornisce metadati aggiuntivi, come `packageName` e `webviewPageId`, mentre iOS si concentra su `bundleId`.
- La logica di ripetizione è personalizzabile per Android ma non applicabile a iOS.
- Ci sono diversi casi in cui iOS non riesce a trovare la Webview. Appium fornisce diverse capacità extra per il `appium-xcuitest-driver` per trovare la Webview. Se ritieni che la Webview non venga trovata, puoi provare a impostare una delle seguenti capacità:
    - `appium:includeSafariInWebviews`: Aggiunge i contesti web di Safari all'elenco dei contesti disponibili durante un test di app nativa/webview. Ciò è utile se il test apre Safari e deve essere in grado di interagire con esso. L'impostazione predefinita è `false`.
    - `appium:webviewConnectRetries`: Il numero massimo di tentativi prima di rinunciare al rilevamento delle pagine web view. Il ritardo tra ogni tentativo è di 500 ms, il valore predefinito è `10` tentativi.
    - `appium:webviewConnectTimeout`: La quantità massima di tempo in millisecondi da attendere affinché una pagina web view venga rilevata. Il valore predefinito è `5000` ms.

Per esempi avanzati e dettagli, consulta la documentazione dell'API Mobile di WebdriverIO.
:::


---

Il nostro crescente set di comandi riflette il nostro impegno nel rendere l'automazione mobile accessibile ed elegante. Che tu stia eseguendo gesti complessi o lavorando con elementi di app native, questi comandi si allineano con la filosofia di WebdriverIO di creare un'esperienza di automazione senza soluzione di continuità. E non ci fermiamo qui: se c'è una funzionalità che vorresti vedere, accogliamo con favore il tuo feedback. Sentiti libero di inviare le tue richieste tramite [questo link](https://github.com/webdriverio/webdriverio/issues/new/choose).