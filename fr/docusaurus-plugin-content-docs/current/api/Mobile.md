---
id: mobile
title: Commandes Mobiles
---

# Introduction aux commandes mobiles personnalisées et améliorées dans WebdriverIO

Tester des applications mobiles et des applications web mobiles comporte ses propres défis, en particulier lorsqu'il s'agit de gérer les différences spécifiques entre les plateformes Android et iOS. Bien qu'Appium offre la flexibilité nécessaire pour gérer ces différences, il vous oblige souvent à vous plonger dans des documentations complexes et dépendantes de la plateforme ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) ainsi que dans des commandes associées. Cela peut rendre l'écriture des scripts de test plus chronophage, sujette aux erreurs et difficile à maintenir.

Pour simplifier ce processus, WebdriverIO introduit des **commandes mobiles personnalisées et améliorées** spécialement conçues pour les tests web mobiles et d'applications natives. Ces commandes masquent les subtilités des API Appium sous-jacentes, vous permettant d'écrire des scripts de test concis, intuitifs et indépendants de la plateforme. En mettant l'accent sur la facilité d'utilisation, nous visons à réduire la charge supplémentaire lors du développement de scripts Appium et à vous permettre d'automatiser des applications mobiles sans effort.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Pourquoi des commandes mobiles personnalisées ?

### 1. **Simplifier les API complexes**
Certaines commandes Appium, comme les gestes ou les interactions avec les éléments, impliquent une syntaxe verbeuse et complexe. Par exemple, exécuter une action d'appui long avec l'API Appium native nécessite de construire manuellement une chaîne d'`action` :

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

Avec les commandes personnalisées de WebdriverIO, la même action peut être réalisée avec une seule ligne de code expressive :

```ts
await $('~Contacts').longPress();
```

Cela réduit considérablement le code répétitif, rendant vos scripts plus propres et plus faciles à comprendre.

### 2. **Abstraction multiplateforme**
Les applications mobiles nécessitent souvent une gestion spécifique à chaque plateforme. Par exemple, le défilement dans les applications natives diffère considérablement entre [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) et [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO comble cet écart en fournissant des commandes unifiées comme `scrollIntoView()` qui fonctionnent parfaitement sur toutes les plateformes, quelle que soit l'implémentation sous-jacente.

```ts
await $('~element').scrollIntoView();
```

Cette abstraction garantit que vos tests sont portables et ne nécessitent pas de branchements constants ou de logique conditionnelle pour tenir compte des différences entre systèmes d'exploitation.

### 3. **Productivité accrue**
En réduisant le besoin de comprendre et d'implémenter des commandes Appium de bas niveau, les commandes mobiles de WebdriverIO vous permettent de vous concentrer sur le test des fonctionnalités de votre application plutôt que de vous débattre avec les nuances propres à chaque plateforme. C'est particulièrement bénéfique pour les équipes ayant une expérience limitée de l'automatisation mobile ou celles qui cherchent à accélérer leur cycle de développement.

### 4. **Cohérence et maintenabilité**
Les commandes personnalisées apportent de l'uniformité à vos scripts de test. Au lieu d'avoir des implémentations variées pour des actions similaires, votre équipe peut s'appuyer sur des commandes standardisées et réutilisables. Cela rend non seulement la base de code plus maintenable, mais facilite également l'intégration de nouveaux membres dans l'équipe.

## Pourquoi améliorer certaines commandes mobiles ?

### 1. Ajouter de la flexibilité
Certaines commandes mobiles sont améliorées pour fournir des options et des paramètres supplémentaires qui ne sont pas disponibles dans les API Appium par défaut. Par exemple, WebdriverIO ajoute une logique de nouvelle tentative, des délais d'attente et la possibilité de filtrer les webviews selon des critères spécifiques, offrant ainsi plus de contrôle sur les scénarios complexes.

```ts
// Example: Customizing retry intervals and timeouts for webview detection
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Retry every 1 second
  androidWebviewConnectTimeout: 10000,    // Timeout after 10 seconds
});
```

Ces options permettent d'adapter les scripts d'automatisation au comportement dynamique des applications sans code répétitif supplémentaire.

### 2. Améliorer la facilité d'utilisation
Les commandes améliorées masquent les complexités et les schémas répétitifs présents dans les API natives. Elles vous permettent d'effectuer plus d'actions avec moins de lignes de code, réduisant la courbe d'apprentissage pour les nouveaux utilisateurs et rendant les scripts plus faciles à lire et à maintenir.

```ts
// Example: Enhanced command for switching context by title
await driver.switchContext({
  title: 'My Webview Title',
});
```

Comparées aux méthodes Appium par défaut, les commandes améliorées éliminent le besoin d'étapes supplémentaires, comme la récupération manuelle des contextes disponibles et leur filtrage.

### 3. Standardiser le comportement
WebdriverIO garantit que les commandes améliorées se comportent de manière cohérente sur les plateformes comme Android et iOS. Cette abstraction multiplateforme minimise le besoin de logique conditionnelle basée sur le système d'exploitation, ce qui conduit à des scripts de test plus maintenables.

```ts
// Example: Unified scroll command for both platforms
await $('~element').scrollIntoView();
```

Cette standardisation simplifie les bases de code, en particulier pour les équipes qui automatisent des tests sur plusieurs plateformes.

### 4. Augmenter la fiabilité
En intégrant des mécanismes de nouvelle tentative, des valeurs par défaut intelligentes et des messages d'erreur détaillés, les commandes améliorées réduisent la probabilité de tests instables. Ces améliorations garantissent que vos tests résistent à des problèmes tels que les retards d'initialisation des webviews ou les états transitoires de l'application.

```ts
// Example: Enhanced webview switching with robust matching logic
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Cela rend l'exécution des tests plus prévisible et moins sujette aux échecs causés par des facteurs environnementaux.

### 5. Améliorer les capacités de débogage
Les commandes améliorées renvoient souvent des métadonnées plus riches, facilitant le débogage de scénarios complexes, en particulier dans les applications hybrides. Par exemple, des commandes comme getContext et getContexts peuvent renvoyer des informations détaillées sur les webviews, notamment le titre, l'URL et l'état de visibilité.

```ts
// Example: Retrieving detailed metadata for debugging
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Ces métadonnées permettent d'identifier et de résoudre les problèmes plus rapidement, améliorant l'expérience globale de débogage.


En améliorant les commandes mobiles, WebdriverIO ne se contente pas de faciliter l'automatisation, mais s'inscrit également dans sa mission de fournir aux développeurs des outils puissants, fiables et intuitifs.

## Applications hybrides

Les applications hybrides combinent du contenu web avec des fonctionnalités natives et nécessitent une gestion spécifique lors de l'automatisation. Ces applications utilisent des webviews pour afficher du contenu web au sein d'une application native. WebdriverIO fournit des méthodes améliorées pour travailler efficacement avec les applications hybrides.

### Comprendre les webviews
Une webview est un composant semblable à un navigateur intégré dans une application native :

- **Android :** Les webviews sont basées sur Chrome/System Webview et peuvent contenir plusieurs pages (similaires aux onglets d'un navigateur). Ces webviews nécessitent ChromeDriver pour automatiser les interactions. Appium peut déterminer automatiquement la version de ChromeDriver requise en fonction de la version de System WebView ou de Chrome installée sur l'appareil, et la télécharger automatiquement si elle n'est pas déjà disponible. Cette approche garantit une compatibilité transparente et minimise la configuration manuelle. Consultez la [documentation Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) pour savoir comment Appium télécharge automatiquement la bonne version de ChromeDriver.
- **iOS :** Les webviews sont propulsées par Safari (WebKit) et identifiées par des identifiants génériques comme `WEBVIEW_{id}`.

### Défis des applications hybrides
1. Identifier la bonne webview parmi plusieurs options.
2. Récupérer des métadonnées supplémentaires telles que le titre, l'URL ou le nom du package pour un meilleur contexte.
3. Gérer les différences spécifiques entre Android et iOS.
4. Basculer de manière fiable vers le bon contexte dans une application hybride.

### Commandes clés pour les applications hybrides

#### 1. `getContext`
Récupère le contexte actuel de la session. Par défaut, elle se comporte comme la méthode getContext d'Appium, mais peut fournir des informations détaillées sur le contexte lorsque `returnDetailedContext` est activé. Pour plus d'informations, consultez [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Renvoie une liste détaillée des contextes disponibles, en améliorant la méthode contexts d'Appium. Cela facilite l'identification de la bonne webview pour l'interaction sans appeler de commandes supplémentaires pour déterminer le titre, l'URL ou le `bundleId|packageName` actif. Pour plus d'informations, consultez [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Bascule vers une webview spécifique en fonction du nom, du titre ou de l'URL. Offre une flexibilité supplémentaire, comme l'utilisation d'expressions régulières pour la correspondance. Pour plus d'informations, consultez [`switchContext`](/docs/api/mobile/switchContext)

### Fonctionnalités clés pour les applications hybrides
1. Métadonnées détaillées : récupérez des informations complètes pour le débogage et un changement de contexte fiable.
2. Cohérence multiplateforme : comportement unifié pour Android et iOS, gérant de manière transparente les particularités de chaque plateforme.
3. Logique de nouvelle tentative personnalisée (Android) : ajustez les intervalles de nouvelle tentative et les délais d'attente pour la détection des webviews.


:::info Notes et limitations
- Android fournit des métadonnées supplémentaires, telles que `packageName` et `webviewPageId`, tandis qu'iOS se concentre sur `bundleId`.
- La logique de nouvelle tentative est personnalisable pour Android mais ne s'applique pas à iOS.
- Il existe plusieurs cas où iOS ne parvient pas à trouver la webview. Appium fournit différentes capabilities supplémentaires pour `appium-xcuitest-driver` afin de trouver la webview. Si vous pensez que la webview n'est pas trouvée, vous pouvez essayer de définir l'une des capabilities suivantes :
    - `appium:includeSafariInWebviews` : ajoute les contextes web de Safari à la liste des contextes disponibles lors d'un test d'application native/webview. C'est utile si le test ouvre Safari et doit pouvoir interagir avec celui-ci. La valeur par défaut est `false`.
    - `appium:webviewConnectRetries` : le nombre maximal de tentatives avant d'abandonner la détection des pages webview. Le délai entre chaque tentative est de 500 ms, la valeur par défaut est de `10` tentatives.
    - `appium:webviewConnectTimeout` : la durée maximale en millisecondes à attendre pour qu'une page webview soit détectée. La valeur par défaut est de `5000` ms.

Pour des exemples avancés et plus de détails, consultez la documentation de l'API Mobile de WebdriverIO.
:::


---

Notre ensemble croissant de commandes reflète notre engagement à rendre l'automatisation mobile accessible et élégante. Que vous réalisiez des gestes complexes ou que vous travailliez avec des éléments d'applications natives, ces commandes s'inscrivent dans la philosophie de WebdriverIO visant à créer une expérience d'automatisation fluide. Et nous ne nous arrêtons pas là : s'il y a une fonctionnalité que vous aimeriez voir, vos retours sont les bienvenus. N'hésitez pas à soumettre vos demandes via [ce lien](https://github.com/webdriverio/webdriverio/issues/new/choose).