---
id: mobile
title: Commandes Mobiles
---

# Introduction aux commandes mobiles personnalisées et améliorées dans WebdriverIO

Tester des applications mobiles et des applications web mobiles présente ses propres défis, en particulier lorsqu'il s'agit de gérer les différences spécifiques aux plateformes entre Android et iOS. Bien qu'Appium offre la flexibilité nécessaire pour gérer ces différences, il vous oblige souvent à plonger profondément dans une documentation complexe et dépendante de la plateforme ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) et des commandes. Cela peut rendre l'écriture de scripts de test plus chronophage, sujette aux erreurs et difficile à maintenir.

Pour simplifier le processus, WebdriverIO introduit des **commandes mobiles personnalisées et améliorées** spécialement conçues pour les tests web mobiles et d'applications natives. Ces commandes font abstraction des complexités des API Appium sous-jacentes, vous permettant d'écrire des scripts de test concis, intuitifs et indépendants de la plateforme. En mettant l'accent sur la facilité d'utilisation, nous visons à réduire la charge supplémentaire lors du développement de scripts Appium et à vous permettre d'automatiser les applications mobiles sans effort.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Pourquoi des commandes mobiles personnalisées ?

### 1. **Simplification des API complexes**
Certaines commandes Appium, comme les gestes ou les interactions avec les éléments, impliquent une syntaxe verbeuse et complexe. Par exemple, l'exécution d'une action d'appui long avec l'API native d'Appium nécessite de construire manuellement une chaîne d'`action` :

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

Avec les commandes personnalisées de WebdriverIO, la même action peut être effectuée avec une seule ligne de code expressive :

```ts
await $('~Contacts').longPress();
```

Cela réduit considérablement le code standard, rendant vos scripts plus propres et plus faciles à comprendre.

### 2. **Abstraction multiplateforme**
Les applications mobiles nécessitent souvent une gestion spécifique à la plateforme. Par exemple, le défilement dans les applications natives diffère considérablement entre [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) et [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO comble cette lacune en fournissant des commandes unifiées comme `scrollIntoView()` qui fonctionnent parfaitement sur toutes les plateformes, quelle que soit l'implémentation sous-jacente.

```ts
await $('~element').scrollIntoView();
```

Cette abstraction garantit que vos tests sont portables et ne nécessitent pas de branchement constant ou de logique conditionnelle pour tenir compte des différences entre systèmes d'exploitation.

### 3. **Productivité accrue**
En réduisant la nécessité de comprendre et d'implémenter des commandes Appium de bas niveau, les commandes mobiles de WebdriverIO vous permettent de vous concentrer sur le test des fonctionnalités de votre application plutôt que de lutter avec les nuances spécifiques à la plateforme. Cela est particulièrement bénéfique pour les équipes ayant une expérience limitée en automatisation mobile ou celles qui cherchent à accélérer leur cycle de développement.

### 4. **Cohérence et maintenabilité**
Les commandes personnalisées apportent de l'uniformité à vos scripts de test. Au lieu d'avoir des implémentations variables pour des actions similaires, votre équipe peut s'appuyer sur des commandes standardisées et réutilisables. Cela rend non seulement la base de code plus maintenable, mais abaisse également la barrière pour l'intégration de nouveaux membres dans l'équipe.

## Pourquoi améliorer certaines commandes mobiles ?

### 1. Ajouter de la flexibilité
Certaines commandes mobiles sont améliorées pour fournir des options et des paramètres supplémentaires qui ne sont pas disponibles dans les API Appium par défaut. Par exemple, WebdriverIO ajoute une logique de réessai, des délais d'attente et la possibilité de filtrer les webviews selon des critères spécifiques, permettant un meilleur contrôle sur des scénarios complexes.

```ts
// Exemple : Personnalisation des intervalles de réessai et des délais d'attente pour la détection de webview
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Réessayer toutes les 1 seconde
  androidWebviewConnectTimeout: 10000,    // Délai d'attente après 10 secondes
});
```

Ces options aident à adapter les scripts d'automatisation au comportement dynamique de l'application sans code standard supplémentaire.

### 2. Améliorer la convivialité
Les commandes améliorées font abstraction des complexités et des modèles répétitifs trouvés dans les API natives. Elles vous permettent d'effectuer plus d'actions avec moins de lignes de code, réduisant la courbe d'apprentissage pour les nouveaux utilisateurs et rendant les scripts plus faciles à lire et à maintenir.

```ts
// Exemple : Commande améliorée pour changer de contexte par titre
await driver.switchContext({
  title: 'My Webview Title',
});
```

Par rapport aux méthodes Appium par défaut, les commandes améliorées éliminent la nécessité d'étapes supplémentaires comme la récupération manuelle des contextes disponibles et le filtrage à travers eux.

### 3. Standardiser le comportement
WebdriverIO garantit que les commandes améliorées se comportent de manière cohérente sur les plateformes comme Android et iOS. Cette abstraction multiplateforme minimise le besoin de logique de branchement conditionnel basée sur le système d'exploitation, conduisant à des scripts de test plus maintenables.

```ts
// Exemple : Commande de défilement unifiée pour les deux plateformes
await $('~element').scrollIntoView();
```

Cette standardisation simplifie les bases de code, en particulier pour les équipes qui automatisent les tests sur plusieurs plateformes.

### 4. Augmenter la fiabilité
En incorporant des mécanismes de réessai, des valeurs par défaut intelligentes et des messages d'erreur détaillés, les commandes améliorées réduisent la probabilité de tests instables. Ces améliorations garantissent que vos tests sont résistants aux problèmes tels que les retards dans l'initialisation de la webview ou les états transitoires de l'application.

```ts
// Exemple : Changement de webview amélioré avec une logique de correspondance robuste
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Cela rend l'exécution des tests plus prévisible et moins sujette aux échecs causés par des facteurs environnementaux.

### 5. Améliorer les capacités de débogage
Les commandes améliorées renvoient souvent des métadonnées plus riches, permettant un débogage plus facile des scénarios complexes, en particulier dans les applications hybrides. Par exemple, les commandes comme getContext et getContexts peuvent renvoyer des informations détaillées sur les webviews, y compris le titre, l'URL et le statut de visibilité.

```ts
// Exemple : Récupération de métadonnées détaillées pour le débogage
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Ces métadonnées aident à identifier et à résoudre les problèmes plus rapidement, améliorant l'expérience globale de débogage.


En améliorant les commandes mobiles, WebdriverIO non seulement facilite l'automatisation mais s'aligne également sur sa mission de fournir aux développeurs des outils puissants, fiables et intuitifs à utiliser.

---

## Applications hybrides

Les applications hybrides combinent du contenu web avec des fonctionnalités natives et nécessitent une gestion spécialisée pendant l'automatisation. Ces applications utilisent des webviews pour afficher du contenu web au sein d'une application native. WebdriverIO fournit des méthodes améliorées pour travailler efficacement avec les applications hybrides.

### Comprendre les webviews
Une webview est un composant similaire à un navigateur intégré dans une application native :

- **Android :** Les webviews sont basées sur Chrome/System Webview et peuvent contenir plusieurs pages (similaires aux onglets du navigateur). Ces webviews nécessitent ChromeDriver pour automatiser les interactions. Appium peut automatiquement déterminer la version de ChromeDriver requise en fonction de la version de System WebView ou Chrome installée sur l'appareil et la télécharger automatiquement si elle n'est pas déjà disponible. Cette approche assure une compatibilité transparente et minimise la configuration manuelle. Consultez la [documentation Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) pour savoir comment Appium télécharge automatiquement la version correcte de ChromeDriver.
- **iOS :** Les webviews sont alimentées par Safari (WebKit) et identifiées par des identifiants génériques comme `WEBVIEW_{id}`.

### Défis avec les applications hybrides
1. Identifier la bonne webview parmi plusieurs options.
2. Récupérer des métadonnées supplémentaires telles que le titre, l'URL ou le nom du package pour un meilleur contexte.
3. Gérer les différences spécifiques à la plateforme entre Android et iOS.
4. Passer de manière fiable au contexte correct dans une application hybride.

### Commandes clés pour les applications hybrides

#### 1. `getContext`
Récupère le contexte actuel de la session. Par défaut, il se comporte comme la méthode getContext d'Appium mais peut fournir des informations de contexte détaillées lorsque `returnDetailedContext` est activé. Pour plus d'informations, voir [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Renvoie une liste détaillée des contextes disponibles, améliorant la méthode contexts d'Appium. Cela facilite l'identification de la bonne webview pour l'interaction sans avoir à appeler des commandes supplémentaires pour déterminer le titre, l'url ou le `bundleId|packageName` actif. Pour plus d'informations, voir [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Bascule vers une webview spécifique en fonction du nom, du titre ou de l'url. Offre une flexibilité supplémentaire, comme l'utilisation d'expressions régulières pour la correspondance. Pour plus d'informations, voir [`switchContext`](/docs/api/mobile/switchContext)

### Fonctionnalités clés pour les applications hybrides
1. Métadonnées détaillées : Récupérez des détails complets pour le débogage et le changement de contexte fiable.
2. Cohérence multiplateforme : Comportement unifié pour Android et iOS, gérant les particularités spécifiques à la plateforme de manière transparente.
3. Logique de réessai personnalisée (Android) : Ajustez les intervalles de réessai et les délais d'attente pour la détection de webview.


:::info Remarques et limitations
- Android fournit des métadonnées supplémentaires, telles que `packageName` et `webviewPageId`, tandis qu'iOS se concentre sur `bundleId`.
- La logique de réessai est personnalisable pour Android mais non applicable à iOS.
- Il existe plusieurs cas où iOS ne peut pas trouver la Webview. Appium fournit différentes capacités supplémentaires pour le `appium-xcuitest-driver` pour trouver la Webview. Si vous pensez que la Webview n'est pas trouvée, vous pouvez essayer de définir l'une des capacités suivantes :
    - `appium:includeSafariInWebviews` : Ajoute les contextes web Safari à la liste des contextes disponibles pendant un test d'application native/webview. Ceci est utile si le test ouvre Safari et doit pouvoir interagir avec lui. La valeur par défaut est `false`.
    - `appium:webviewConnectRetries` : Le nombre maximum de tentatives avant d'abandonner la détection des pages de webview. Le délai entre chaque tentative est de 500 ms, la valeur par défaut est de `10` tentatives.
    - `appium:webviewConnectTimeout` : Le temps maximum en millisecondes à attendre pour qu'une page de webview soit détectée. La valeur par défaut est de `5000` ms.

Pour des exemples avancés et des détails, consultez la documentation de l'API Mobile WebdriverIO.
:::


---

Notre ensemble croissant de commandes reflète notre engagement à rendre l'automatisation mobile accessible et élégante. Que vous effectuiez des gestes complexes ou que vous travailliez avec des éléments d'application native, ces commandes s'alignent sur la philosophie de WebdriverIO de créer une expérience d'automatisation fluide. Et nous ne nous arrêtons pas là — s'il y a une fonctionnalité que vous aimeriez voir, nous accueillons vos commentaires. N'hésitez pas à soumettre vos demandes via [ce lien](https://github.com/webdriverio/webdriverio/issues/new/choose).