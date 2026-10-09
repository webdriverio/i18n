---
id: selectors
title: Sélecteurs
description: "Choisissez des sélecteurs pour localiser des éléments sur des pages web et des applications mobiles lors de l'automatisation avec le serveur MCP de WebdriverIO."
---

Le serveur MCP de WebdriverIO prend en charge plusieurs stratégies de sélecteurs pour localiser des éléments sur des pages web et des applications mobiles.

:::info

Pour une documentation complète sur les sélecteurs, incluant toutes les stratégies de sélecteurs de WebdriverIO, consultez le guide principal [Sélecteurs](/docs/selectors). Cette page se concentre sur les sélecteurs couramment utilisés avec le serveur MCP.

:::

## Sélecteurs web

Pour l'automatisation de navigateur, le serveur MCP prend en charge tous les sélecteurs standard de WebdriverIO. Les plus couramment utilisés sont :

| Sélecteur | Exemple                        | Description                          |
| --------- | ------------------------------ | ------------------------------------ |
| CSS       | `#login-button`, `.submit-btn` | Sélecteurs CSS standard              |
| XPath     | `//button[@id='submit']`       | Expressions XPath                    |
| Texte     | `button=Submit`, `a*=Click`    | Sélecteurs de texte WebdriverIO      |
| ARIA      | `aria/Submit Button`           | Sélecteurs par nom d'accessibilité   |
| Test ID   | `[data-testid="submit"]`       | Recommandé pour les tests            |

Pour des exemples détaillés et les bonnes pratiques, consultez la documentation [Sélecteurs](/docs/selectors).

## Sélecteurs mobiles

Les sélecteurs mobiles fonctionnent sur les plateformes iOS et Android via Appium.

### Accessibility ID (recommandé)

Les Accessibility IDs sont le **sélecteur multiplateforme le plus fiable**. Ils fonctionnent sur iOS et Android et restent stables lors des mises à jour de l'application.

```text
# Syntaxe
~accessibilityId

# Exemples
~loginButton
~submitForm
~usernameField
```

:::tip Bonne pratique
Privilégiez toujours les Accessibility IDs lorsqu'ils sont disponibles. Ils offrent :
- Une compatibilité multiplateforme (iOS + Android)
- Une stabilité face aux changements d'interface
- Une meilleure maintenabilité des tests
- Une meilleure accessibilité de votre application
:::

### Sélecteurs Android

#### UiAutomator

Les sélecteurs UiAutomator sont puissants et rapides sur Android.

```text
# Par texte
android=new UiSelector().text("Login")

# Par texte partiel
android=new UiSelector().textContains("Log")

# Par Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Par nom de classe
android=new UiSelector().className("android.widget.Button")

# Par description (accessibilité)
android=new UiSelector().description("Login button")

# Conditions combinées
android=new UiSelector().className("android.widget.Button").text("Login")

# Conteneur défilable
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Les Resource IDs permettent une identification stable des éléments sur Android.

```text
# Resource ID complet
id=com.example.app:id/login_button

# ID partiel (package de l'application déduit)
id=login_button
```

#### XPath (Android)

XPath fonctionne sur Android mais est plus lent qu'UiAutomator.

```text
# Par classe et texte
//android.widget.Button[@text='Login']

# Par Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Par Content Description
//android.widget.ImageButton[@content-desc='Menu']

# Hiérarchique
//android.widget.LinearLayout/android.widget.Button[1]
```

### Sélecteurs iOS

#### Predicate String

Les Predicate Strings iOS sont rapides et puissants pour l'automatisation iOS.

```text
# Par label
-ios predicate string:label == "Login"

# Par label partiel
-ios predicate string:label CONTAINS "Log"

# Par nom
-ios predicate string:name == "loginButton"

# Par type
-ios predicate string:type == "XCUIElementTypeButton"

# Par valeur
-ios predicate string:value == "ON"

# Conditions combinées
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Visibilité
-ios predicate string:label == "Login" AND visible == 1

# Insensible à la casse
-ios predicate string:label ==[c] "login"
```

**Opérateurs de prédicat :**

| Opérateur    | Description                       |
| ------------ | --------------------------------- |
| `==`         | Égal à                            |
| `!=`         | Différent de                      |
| `CONTAINS`   | Contient la sous-chaîne           |
| `BEGINSWITH` | Commence par                      |
| `ENDSWITH`   | Se termine par                    |
| `LIKE`       | Correspondance avec jokers        |
| `MATCHES`    | Correspondance par regex          |
| `AND`        | ET logique                        |
| `OR`         | OU logique                        |

#### Class Chain

Les Class Chains iOS permettent une localisation hiérarchique des éléments avec de bonnes performances.

```text
# Enfant direct
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# N'importe quel descendant
-ios class chain:**/XCUIElementTypeButton

# Par index
-ios class chain:**/XCUIElementTypeCell[3]

# Combiné avec un prédicat
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Hiérarchique
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Dernier élément
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath fonctionne sur iOS mais est plus lent que les Predicate Strings.

```text
# Par type et label
//XCUIElementTypeButton[@label='Login']

# Par nom
//XCUIElementTypeTextField[@name='username']

# Par valeur
//XCUIElementTypeSwitch[@value='1']

# Hiérarchique
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## Stratégie de sélecteurs multiplateforme

Lorsque vous écrivez des tests qui doivent fonctionner à la fois sur iOS et Android, utilisez cet ordre de priorité :

### 1. Accessibility ID (le meilleur)

```text
# Fonctionne sur les deux plateformes
~loginButton
```

### 2. Sélecteurs spécifiques à la plateforme avec logique conditionnelle

Lorsque les Accessibility IDs ne sont pas disponibles, utilisez des sélecteurs spécifiques à la plateforme :

**Android :**
```text
android=new UiSelector().text("Login")
```

**iOS :**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (en dernier recours)

XPath fonctionne sur les deux plateformes, mais avec des types d'éléments différents :

**Android :**
```text
//android.widget.Button[@text='Login']
```

**iOS :**
```text
//XCUIElementTypeButton[@label='Login']
```

## Référence des types d'éléments

### Types d'éléments Android

| Type                          | Description              |
| ----------------------------- | ------------------------ |
| `android.widget.Button`       | Bouton                   |
| `android.widget.EditText`     | Champ de saisie          |
| `android.widget.TextView`     | Libellé de texte         |
| `android.widget.ImageView`    | Image                    |
| `android.widget.ImageButton`  | Bouton image             |
| `android.widget.CheckBox`     | Case à cocher            |
| `android.widget.RadioButton`  | Bouton radio             |
| `android.widget.Switch`       | Interrupteur             |
| `android.widget.Spinner`      | Liste déroulante         |
| `android.widget.ListView`     | Vue de liste             |
| `android.widget.RecyclerView` | Vue recycler             |
| `android.widget.ScrollView`   | Conteneur défilable      |

### Types d'éléments iOS

| Type                             | Description              |
| -------------------------------- | ------------------------ |
| `XCUIElementTypeButton`          | Bouton                   |
| `XCUIElementTypeTextField`       | Champ de saisie          |
| `XCUIElementTypeSecureTextField` | Champ de mot de passe    |
| `XCUIElementTypeStaticText`      | Libellé de texte         |
| `XCUIElementTypeImage`           | Image                    |
| `XCUIElementTypeSwitch`          | Interrupteur             |
| `XCUIElementTypeSlider`          | Curseur                  |
| `XCUIElementTypePicker`          | Sélecteur à roue         |
| `XCUIElementTypeTable`           | Vue de tableau           |
| `XCUIElementTypeCell`            | Cellule de tableau       |
| `XCUIElementTypeCollectionView`  | Vue de collection        |
| `XCUIElementTypeScrollView`      | Vue défilable            |

## Bonnes pratiques

### À faire

- **Utilisez les Accessibility IDs** pour des sélecteurs stables et multiplateformes
- **Ajoutez des attributs data-testid** aux éléments web pour les tests
- **Utilisez les Resource IDs** sur Android lorsque les Accessibility IDs ne sont pas disponibles
- **Privilégiez les Predicate Strings** plutôt que XPath sur iOS
- **Gardez des sélecteurs simples** et spécifiques

### À éviter

- **Évitez les longues expressions XPath** - elles sont lentes et fragiles
- **Ne vous fiez pas aux index** pour les listes dynamiques
- **Évitez les sélecteurs basés sur le texte** pour les applications localisées
- **N'utilisez pas de XPath absolu** (partant de la racine)

### Exemples de bons et de mauvais sélecteurs

```text
# Bon - Accessibility ID stable
~loginButton

# Mauvais - XPath fragile avec des index
//div[3]/form/button[2]

# Bon - CSS spécifique avec un test ID
[data-testid="submit-button"]

# Mauvais - Classe susceptible de changer
.btn-primary-lg-v2

# Bon - UiAutomator avec Resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Mauvais - Texte susceptible d'être localisé
android=new UiSelector().text("Submit")
```

## Débogage des sélecteurs

### Web (Chrome DevTools)

1. Ouvrez Chrome DevTools (F12)
2. Utilisez le panneau Elements pour inspecter les éléments
3. Faites un clic droit sur un élément → Copy → Copy selector
4. Testez les sélecteurs dans la Console : `document.querySelector('your-selector')`

### Mobile (Appium Inspector)

1. Lancez Appium Inspector
2. Connectez-vous à votre session en cours
3. Cliquez sur les éléments pour voir tous les attributs disponibles
4. Utilisez la fonctionnalité « Search for element » pour tester les sélecteurs

### Utilisation de `get_elements`

L'outil `get_elements` du serveur MCP renvoie plusieurs stratégies de sélecteurs pour chaque élément :

```text
Ask: "Get all visible elements on the screen"
```

Cela renvoie des éléments avec des sélecteurs pré-générés que vous pouvez utiliser directement.

#### Options avancées

Pour un meilleur contrôle de la découverte des éléments :

```text
# Obtenir uniquement les images et les éléments visuels
Get visible elements with elementType "visual"

# Obtenir les éléments avec leurs coordonnées pour déboguer la mise en page
Get visible elements with includeBounds enabled

# Obtenir les 20 éléments suivants (pagination)
Get visible elements with limit 20 and offset 20

# Inclure les conteneurs de mise en page pour le débogage
Get visible elements with includeContainers enabled
```

L'outil renvoie une réponse paginée :
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Utilisation de `get_accessibility` (navigateur uniquement)

Pour l'automatisation de navigateur, l'outil `get_accessibility` fournit des informations sémantiques sur les éléments de la page :

```text
# Obtenir tous les nœuds d'accessibilité nommés
Get accessibility tree

# Filtrer uniquement les boutons et les liens
Get accessibility tree filtered to button and link roles

# Obtenir la page de résultats suivante
Get accessibility tree with limit 50 and offset 50
```

C'est utile lorsque `get_elements` ne renvoie pas les éléments attendus, car cet outil interroge l'API d'accessibilité native du navigateur.