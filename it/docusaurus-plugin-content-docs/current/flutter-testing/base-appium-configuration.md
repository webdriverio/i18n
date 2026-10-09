---
id: base-appium-configuration
title: Configurazione di base di Appium
description: "Installa il servizio Appium e il pacchetto Flutter finder e configura l'impostazione di base di Appium per testare le app Flutter con WebdriverIO."
---

WebdriverIO utilizza Appium per eseguire i test su emulatori mobili, simulatori e dispositivi reali. Il `@wdio/appium-service` gestisce automaticamente il ciclo di vita del server Appium durante l'esecuzione dei test.

Per la configurazione generale di Appium e le opzioni delle capability, consulta la [Documentazione del servizio Appium](https://webdriver.io/docs/appium-service/).

## Installazione delle dipendenze

Per testare le applicazioni Flutter, installa il servizio Appium e il pacchetto Flutter finder:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Installazione dell'Appium Flutter Driver

Puoi installare l'Appium Flutter Driver (`appium-flutter-driver`) in uno dei due modi seguenti:

#### Opzione 1: Come dipendenza di sviluppo (consigliata per CI/CD)

Aggiungere il driver direttamente alle tue `devDependencies` garantisce che tutti i membri del team e le pipeline CI/CD abbiano il driver installato automaticamente, senza richiedere passaggi di configurazione aggiuntivi:

```bash
npm install --save-dev appium-flutter-driver
```

> Puoi anche installare tutti i pacchetti necessari insieme con un unico comando:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Opzione 2: Tramite Appium CLI (configurazione locale)

In alternativa, puoi installare il driver localmente nel tuo ambiente Appium utilizzando l'Appium CLI:

```bash
npx appium driver install flutter
```

### Panoramica dei pacchetti

Questi pacchetti forniscono:
- **`@wdio/appium-service` & `appium`**: Avvia e gestisce il server Appium durante l'esecuzione dei test.
- **`appium-flutter-driver`**: Il driver Appium responsabile della comunicazione con l'estensione di test di Flutter.
- **`appium-flutter-finder`**: Libreria di supporto che fornisce strategie di localizzazione specifiche per Flutter (`byValueKey`, `byText`, `byTooltip`).