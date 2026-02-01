---
id: selectors
title: Sélecteurs
---

Le serveur WebdriverIO MCP prend en charge plusieurs stratégies de sélecteurs pour localiser des éléments sur des pages web et des applications mobiles.

:::info

Pour une documentation complète sur les sélecteurs, y compris toutes les stratégies de sélecteurs WebdriverIO, consultez le guide principal [Sélecteurs](/docs/selectors). Cette page se concentre sur les sélecteurs couramment utilisés avec le serveur MCP.

:::

## Sélecteurs Web

Pour l'automatisation du navigateur, le serveur MCP prend en charge tous les sélecteurs WebdriverIO standard. Les plus couramment utilisés incluent :

| Sélecteur | Exemple | Description |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Sélecteurs CSS standard |
| XPath | `//button[@id='submit']` | Expressions XPath |
| Texte | `button=Submit`, `a*=Click` | Sélecteurs de texte WebdriverIO |
| ARIA | `aria/Submit Button` | Sélecteurs de nom d'accessibilité |
| Test ID | `[data-testid="submit"]` | Recommandé pour les tests |

Pour des exemples détaillés et les meilleures pratiques, consultez la documentation [Sélecteurs](/docs/selectors).

---

## Sélecteurs Mobile

Les sélecteurs mobiles fonctionnent avec les plateformes iOS et Android via Appium.

### Accessibility ID (Recommandé)

Les Accessibility IDs sont les **sélecteurs multi-plateformes les plus fiables**. Ils fonctionnent sur iOS et Android et sont stables lors des mises à jour d'applications.

```
# Syntaxe
~accessibilityId

# Exemples
~loginButton
~submitForm
~usernameField
```

:::tip Bonne Pratique
Préférez toujours les accessibility IDs lorsqu'ils sont disponibles. Ils offrent :
- Compatibilité multi-plateforme (iOS + Android)
- Stabilité lors des changements d'interface
- Meilleure maintenabilité des tests
- Amélioration de l'accessibilité de votre application
:::

### Sélecteurs Android

#### UiAutomator

Les sélecteurs UiAutomator sont puissants et rapides pour Android.

```
# Par Texte
android=new UiSelector().text("Login")

# Par Texte Partiel
android=new UiSelector().textContains("Log")

# Par Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Par Nom de Classe
android=new UiSelector().className("android.widget.Button")

# Par Description (Accessibilité)
android=new UiSelector().description("Login button")

# Conditions Combinées
android=new UiSelector().className("android.widget.Button").text("Login")

# Conteneur Défilable
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Les Resource IDs fournissent une identification stable des éléments sur Android.

```
# Resource ID Complet
id=com.example.app:id/login_button

# ID Partiel (package de l'app inféré)
id=login_button
```

#### XPath (Android)

XPath fonctionne sur Android mais est plus lent qu'UiAutomator.

```
# Par Classe et Texte
//android.widget.Button[@text='Login']

# Par Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Par Description de Contenu
//android.widget.ImageButton[@content-desc='Menu']

# Hiérarchique
//android.widget.LinearLayout/android.widget.Button[1]
```

### Sélecteurs iOS

#### Predicate String

Les Predicate Strings iOS sont rapides et puissants pour l'automatisation iOS.

```
# Par Label
-ios predicate string:label == "Login"

# Par Label Partiel
-ios predicate string:label CONTAINS "Log"

# Par Nom
-ios predicate string:name == "loginButton"

# Par Type
-ios predicate string:type == "XCUIElementTypeButton"

# Par Valeur
-ios predicate string:value == "ON"

# Conditions Combinées
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Visibilité
-ios predicate string:label == "Login" AND visible == 1

# Insensible à la Casse
-ios predicate string:label ==[c] "login"
```

**Opérateurs Predicate :**

| Opérateur | Description |
|----------|-------------|
| `==` | Égal à |
| `!=` | Différent de |
| `CONTAINS` | Contient la sous-chaîne |
| `BEGINSWITH` | Commence par |
| `ENDSWITH` | Termine par |
| `LIKE` | Correspondance avec joker |
| `MATCHES` | Correspondance regex |
| `AND` | ET logique |
| `OR` | OU logique |

#### Class Chain

Les Class Chains iOS permettent une localisation hiérarchique des éléments avec de bonnes performances.

```
# Enfant Direct
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Descendant Quelconque
-ios class chain:**/XCUIElementTypeButton

# Par Index
-ios class chain:**/XCUIElementTypeCell[3]

# Combiné avec Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Hiérarchique
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Dernier Élément
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath fonctionne sur iOS mais est plus lent que les predicate strings.

```
# Par Type et Label
//XCUIElementTypeButton[@label='Login']

# Par Nom
//XCUIElementTypeTextField[@name='username']

# Par Valeur
//XCUIElementTypeSwitch[@value='1']

# Hiérarchique
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Stratégie de Sélecteurs Multi-plateformes

Pour écrire des tests qui fonctionnent à la fois sur iOS et Android, utilisez cet ordre de priorité :

### 1. Accessibility ID (Meilleur)

```
# Fonctionne sur les deux plateformes
~loginButton
```

### 2. Sélecteurs Spécifiques à la Plateforme avec Logique Conditionnelle

Quand les accessibility IDs ne sont pas disponibles, utilisez des sélecteurs spécifiques à la plateforme :

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Dernier Recours)

XPath fonctionne sur les deux plateformes mais avec différents types d'éléments :

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Référence des Types d'Éléments

### Types d'Éléments Android

| Type | Description |
|------|-------------|
| `android.widget.Button` | Bouton |
| `android.widget.EditText` | Champ de texte |
| `android.widget.TextView` | Étiquette de texte |
| `android.widget.ImageView` | Image |
| `android.widget.ImageButton` | Bouton image |
| `android.widget.CheckBox` | Case à cocher |
| `android.widget.RadioButton` | Bouton radio |
| `android.widget.Switch` | Interrupteur à bascule |
| `android.widget.Spinner` | Menu déroulant |
| `android.widget.ListView` | Vue en liste |
| `android.widget.RecyclerView` | Vue recyclable |
| `android.widget.ScrollView` | Conteneur défilant |

### Types d'Éléments iOS

| Type | Description |
|------|-------------|
| `XCUIElementTypeButton` | Bouton |
| `XCUIElementTypeTextField` | Champ de texte |
| `XCUIElementTypeSecureTextField` | Champ de mot de passe |
| `XCUIElementTypeStaticText` | Étiquette de texte |
| `XCUIElementTypeImage` | Image |
| `XCUIElementTypeSwitch` | Interrupteur à bascule |
| `XCUIElementTypeSlider` | Curseur |
| `XCUIElementTypePicker` | Roue de sélection |
| `XCUIElementTypeTable` | Vue en tableau |
| `XCUIElementTypeCell` | Cellule de tableau |
| `XCUIElementTypeCollectionView` | Vue en collection |
| `XCUIElementTypeScrollView` | Vue défilante |

---

## Bonnes Pratiques

### À faire

- **Utiliser les accessibility IDs** pour des sélecteurs stables et multi-plateformes
- **Ajouter des attributs data-testid** aux éléments web pour les tests
- **Utiliser les resource IDs** sur Android quand les accessibility IDs ne sont pas disponibles
- **Préférer les predicate strings** au XPath sur iOS
- **Garder les sélecteurs simples** et spécifiques

### À éviter

- **Éviter les expressions XPath longues** - elles sont lentes et fragiles
- **Ne pas se fier aux indices** pour les listes dynamiques
- **Éviter les sélecteurs basés sur le texte** pour les applications localisées
- **Ne pas utiliser de XPath absolu** (partant de la racine)

### Exemples de Bons et Mauvais Sélecteurs

```
# Bon - Accessibility ID stable
~loginButton

# Mauvais - XPath fragile avec indices
//div[3]/form/button[2]

# Bon - CSS spécifique avec test ID
[data-testid="submit-button"]

# Mauvais - Classe qui pourrait changer
.btn-primary-lg-v2

# Bon - UiAutomator avec resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Mauvais - Texte qui pourrait être localisé
android=new UiSelector().text("Submit")
```

---

## Débogage des Sélecteurs

### Web (Chrome DevTools)

1. Ouvrez Chrome DevTools (F12)
2. Utilisez le panneau Elements pour inspecter les éléments
3. Clic droit sur un élément → Copier → Copier le sélecteur
4. Testez les sélecteurs dans la Console : `document.querySelector('votre-selecteur')`

### Mobile (Appium Inspector)

1. Démarrez Appium Inspector
2. Connectez-vous à votre session en cours
3. Cliquez sur les éléments pour voir tous les attributs disponibles
4. Utilisez la fonction "Search for element" pour tester les sélecteurs

### Utilisation de `get_visible_elements`

L'outil `get_visible_elements` du serveur MCP renvoie plusieurs stratégies de sélection pour chaque élément :

```
Demandez à Claude: "Get all visible elements on the screen"
```

Cela renvoie des éléments avec des sélecteurs pré-générés que vous pouvez utiliser directement.

#### Options Avancées

Pour un contrôle plus précis de la découverte des éléments :

```
# Obtenir uniquement les images et éléments visuels
Get visible elements with elementType "visual"

# Obtenir les éléments avec leurs coordonnées pour le débogage de mise en page
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

### Utilisation de `get_accessibility` (Navigateur Uniquement)

Pour l'automatisation du navigateur, l'outil `get_accessibility` fournit des informations sémantiques sur les éléments de la page :

```
# Obtenir tous les nœuds d'accessibilité nommés
Get accessibility tree

# Filtrer pour n'avoir que les boutons et liens
Get accessibility tree filtered to button and link roles

# Obtenir la page suivante de résultats
Get accessibility tree with limit 50 and offset 50
```

Ceci est utile quand `get_visible_elements` ne renvoie pas les éléments attendus, car il interroge l'API d'accessibilité native du navigateur.