---
id: introduction
title: Introduzione
description: "Una panoramica sui test end-to-end delle app Flutter su Android e iOS con WebdriverIO, Appium e l'Appium Flutter Driver."
---

Questa guida illustra come configurare, strutturare ed eseguire test End-to-End (E2E) per applicazioni **Flutter** utilizzando **WebdriverIO** e **Appium**.

WebdriverIO fornisce un framework di test basato su Node.js con supporto nativo per i protocolli WebDriver e Appium, consentendoti di automatizzare le applicazioni Flutter sia su Android che su iOS.

---

### La sfida architetturale: perché Flutter è diverso

Quando si automatizzano le app mobile native standard (Kotlin/Java su Android o Swift/Objective-C su iOS), i driver Appium (`UiAutomator2` per Android, `XCUITest` per iOS) fungono da punto di accesso per ispezionare e interagire con l'applicazione, interrogando l'albero di accessibilità nativo del sistema operativo. Questi driver leggono i componenti UI a livello di sistema operativo (pulsanti, campi di input, etichette) e li espongono agli strumenti di ispezione e agli script di test utilizzando strategie di localizzazione standard come ID, Accessibility ID o XPath.

Flutter funziona diversamente:

Flutter non utilizza i componenti UI nativi del sistema operativo. Al contrario, esegue il rendering della propria UI direttamente su un canvas tramite un motore grafico ospitato internamente. Il framework disegna i propri widget pixel per pixel.

#### Impatto sull'automazione tradizionale
Per i driver nativi e gli strumenti di ispezione standard, un'app Flutter appare spesso come un'unica superficie grafica. I widget interni (come pulsanti o campi di testo) non esistono per impostazione predefinita nell'albero di accessibilità del sistema operativo. Di conseguenza, le strategie di localizzazione native standard non possono interagire direttamente con i widget Flutter interni.

---

### Come WebdriverIO e Appium gestiscono Flutter

WebdriverIO e Appium forniscono gli strumenti necessari per interagire con l'albero dei widget interno di Flutter, ma è necessario installare e configurare il driver e le estensioni di localizzazione appropriati per il tuo progetto.

Utilizzando l'[Appium Flutter Driver](https://github.com/appium/appium-flutter-driver), Appium si connette all'estensione di test di Flutter (`flutter_driver`). Questo ti dà accesso a strategie di localizzazione specifiche di Flutter (Finder), tra cui:

* `byValueKey`: individua i widget tramite la loro `Key` esplicita nel codice Flutter.
* `byText`: individua i widget tramite il contenuto testuale visibile.
* `byTooltip`: individua i widget tramite il testo del loro tooltip.

Le sezioni seguenti illustrano i prerequisiti, la configurazione dell'ambiente e la scrittura della tua prima suite di test.