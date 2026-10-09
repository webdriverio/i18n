---
id: writing-tests
title: Écrire des tests
description: "Écrivez des tests WebdriverIO pour les applications Flutter en basculant vers le contexte Flutter et en interagissant avec les widgets via l'extension flutter_driver."
---

Cette section présente la structure pratique pour créer des scénarios de tests automatisés, ainsi que la manière d'interagir directement avec l'arbre de composants interne de Flutter à l'aide de WebdriverIO.

### Pourquoi le changement de contexte est-il nécessaire ?

Lors du démarrage d'une session d'automatisation avec Appium, le driver commence son exécution en cartographiant le contexte natif du système d'exploitation, appelé `NATIVE_APP`. Ce contexte ne peut voir que l'enveloppe native qui entoure l'application (comme la barre d'état du système ou les boîtes de dialogue natives Android/iOS).

Comme Flutter effectue le rendu de son interface utilisateur dans un Canvas isolé, les éléments internes sont invisibles dans le contexte `NATIVE_APP`. Pour envoyer des commandes directement à l'extension de test de Flutter (`flutter_driver`), nous devons explicitement basculer le focus de l'automatisation vers le contexte `FLUTTER`. Sans ce changement, toute tentative de localiser un Widget entraînera une erreur d'élément introuvable.

:::tip Bonne pratique : toujours changer de contexte dans `beforeEach`
Il est recommandé d'inclure `await driver.switchContext('FLUTTER')` dans un hook `beforeEach` dans chaque fichier de test. Cela garantit que chaque test commence son exécution dans le contexte `FLUTTER`, évitant ainsi l'instabilité ou les fuites d'état si un test précédent a basculé vers `NATIVE_APP` (par exemple, pour gérer les boîtes de dialogue d'autorisation du système d'exploitation) ou si une session réinitialise le contexte actif.
:::

### Pourquoi `appium-flutter-finder` est-il nécessaire ?

Les sélecteurs WebdriverIO traditionnels, comme `$('~selector')` ou `$('#id')`, sont conçus pour localiser des éléments à l'aide de stratégies destinées aux interfaces Web ou mobiles natives (comme les resource IDs ou XPath).

Flutter gère ses propres éléments internes et utilise des méthodes de recherche propriétaires (comme `byValueKey`, `byText`, `byType`). La bibliothèque `appium-flutter-finder` est nécessaire car elle agit comme un traducteur : elle expose ces stratégies de localisation spécifiques à Flutter dans un format sérialisé (Base64/JSON) que `appium-flutter-driver` peut interpréter et exécuter à l'intérieur de la machine virtuelle (VM) Dart.

### Exemples de tests pratiques

Nous documentons des scénarios courants utilisant `appium-flutter-finder` pour localiser des widgets, combinés à des commandes d'extension directes exécutées via `driver.execute('flutter:<command>')`.

:::info Commandes et finders de l'extension Flutter Driver
`appium-flutter-driver` fournit des commandes spécialisées pour interagir avec les applications Flutter, notamment :
- `flutter:waitFor` : attend qu'un widget devienne visible.
- `flutter:waitForAbsent` : attend qu'un widget disparaisse.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible` : gère le défilement dans les vues défilantes.
- `flutter:setTextEntryEmulation` : configure le comportement de la saisie de texte.

Pour la liste complète des commandes disponibles, des paramètres et des types de retour, consultez la [documentation des commandes d'Appium Flutter Driver](https://github.com/appium/appium-flutter-driver#commands), le [code source du Finder Node.js](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) et [appium-flutter-finder sur npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### Exemple A — Interaction simple (flux du compteur)

```typescript
// counter.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Counter Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The counter should be successfully incremented by clicking the button.', async () => {
        const incrementButton = find.byTooltip('Increment');
        const counterText = find.byValueKey('counter_text');

        const initialValue = await driver.getElementText(counterText);
        expect(initialValue).toBe('0');

        await driver.elementClick(incrementButton);

        const finalValue = await driver.getElementText(counterText);
        expect(finalValue).toBe('1');
    });
});
```

### Exemple B — Navigation stable (éviter les timeouts)

```typescript
// redirects.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Redirects Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should be able to navigate between the Redirect Example views and back to the first view.', async () => {
        const buttonGoToRedirectExampleTwoView = find.byValueKey('redirect_example_two_button');
        await driver.elementClick(buttonGoToRedirectExampleTwoView);

        const redirectExampleTwoBody = find.byValueKey('redirect_example_two_body');
        await driver.execute('flutter:waitFor', redirectExampleTwoBody);
        const textRedirectExampleTwoBody = await driver.getElementText(redirectExampleTwoBody);
        expect(textRedirectExampleTwoBody).toBe('This is the Redirect Example Two View');

        const buttonGoBackToRedirectExampleView = find.byValueKey('redirect_example_two_back_button');
        await driver.elementClick(buttonGoBackToRedirectExampleView);

        const redirectExampleBody = find.byValueKey('redirect_example_body');
        await driver.execute('flutter:waitFor', redirectExampleBody);
        const textRedirectExampleBody = await driver.getElementText(redirectExampleBody);
        expect(textRedirectExampleBody).toBe('This is the Redirect Example View');
    });
});
```

### Exemple C — Changement de contexte (boîtes de dialogue natives du système et autorisations)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. Dans le contexte FLUTTER : cliquer sur le widget qui déclenche une boîte de dialogue d'autorisation ou d'alerte au niveau du système
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. Basculer vers le contexte NATIVE_APP pour interagir avec la boîte de dialogue du système
        await driver.switchContext('NATIVE_APP');

        // Localiser et cliquer sur le bouton natif à l'aide des sélecteurs WebdriverIO standards
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Revenir au contexte FLUTTER pour continuer à vérifier les widgets Flutter
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## Flux de build et d'exécution

Pour vous assurer que vos modifications récentes du code Dart et des Keys sont visibles par les tests, suivez toujours ces étapes :

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

Vous pouvez consulter les exemples de code dans le dépôt : https://github.com/webdriverio/appium-boilerplate