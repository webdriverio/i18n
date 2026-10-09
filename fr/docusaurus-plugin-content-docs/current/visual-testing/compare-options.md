---
id: compare-options
title: Options de comparaison
description: "Ajustez la manière dont les captures d'écran sont comparées grâce aux options de sensibilité visuelle, pixelmatch, masquage mobile et de rapport du service visuel."
---

Les options de comparaison sont des options qui influencent la manière dont la comparaison est exécutée.

:::info NOTE
Toutes les options de comparaison peuvent être utilisées lors de l'instanciation du service ou pour chaque appel individuel de `checkElement`, `checkScreen` et `checkFullPageScreen`. Si une option de méthode a la même clé qu'une option définie lors de l'instanciation du service, alors l'option de comparaison de la méthode remplacera la valeur de l'option de comparaison du service.
:::

## Sensibilité visuelle

---

:::info Historique des versions pour les options `ignore*`
Les préréglages `ignore*` ont changé de comportement une fois, sous forme de changement majeur (breaking change), lorsque le moteur de comparaison est passé de ResembleJS à Pixelmatch :

| Version | Moteur | Notes |
| --- | --- | --- |
| v9 et antérieures | ResembleJS | Sémantique `ignore*` d'origine (basée sur RGB/luminosité, avec l'ordre des préréglages propre à resemble). |
| v10 et ultérieures | Pixelmatch | Les préréglages `ignore*` correspondent aux paramètres de seuil/AA de pixelmatch. Les valeurs par défaut et le comportement actuels sont documentés pour chaque option ci-dessous ; les nouvelles fonctionnalités/corrections apportées par la suite sont signalées par une note « Depuis » sur l'option concernée. |

:::

**Ordre « le dernier l'emporte » :** lorsque plusieurs indicateurs `ignore*` sont activés en même temps, un seul préréglage est réellement appliqué, selon cet ordre (le dernier l'emporte) : `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Un avertissement est journalisé indiquant quel préréglage l'a emporté.

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_
-   **Depuis :** `v10.1.0` : comparaison basée uniquement sur la luminosité, utilisant les pondérations de luminance de resemble (`0.3/0.59/0.11`).

Compare uniquement la luminosité, en ignorant les différences de teinte/couleur. Préréglage : seuil strict (~16/255), anticrénelage non toléré.

**Utilisez cette option lorsque** la couleur elle-même est censée varier (par ex. une interface avec thèmes, des images qui changent de couleur selon l'environnement) mais que vous souhaitez tout de même détecter les changements de mise en page ou de luminosité.

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_
-   **Depuis :** `v10.1.0` : applique sa propre règle de seuil/AA indépendamment des autres indicateurs `ignore*`.

Compare les images en ignorant les différences du canal alpha. Préréglage : seuil strict (~16/255), anticrénelage non toléré.

**Utilisez cette option lorsque** le rendu de la transparence/opacité est instable (par ex. superpositions, éléments semi-transparents) mais que les couleurs réelles des pixels sous-jacents comptent.

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_
-   **Depuis :** `v10` : la valeur par défaut est passée à `true` (était `false` en v9 et antérieures).

Tolère les pixels anticrénelés lors de la comparaison (seuil assoupli ~32/255). C'est le seul préréglage qui tolère l'anticrénelage, et il est activé par défaut afin que le bruit de rendu sous-pixel ne fasse pas échouer les comparaisons d'emblée. Définissez-le à `false` pour une comparaison stricte où les pixels anticrénelés doivent être comptés comme des différences.

**Utilisez cette option pour** résoudre la source la plus courante d'instabilité des tests visuels : les bords du texte et des formes qui s'affichent avec un anticrénelage légèrement différent d'une machine/d'un navigateur à l'autre, alors que rien n'a réellement changé.

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_
-   **Depuis :** `v10.1.0` : applique sa propre règle de seuil/AA indépendamment des autres indicateurs `ignore*`.

Compare les images en utilisant une tolérance RGB assouplie (~16/255 par canal dans l'espace YIQ). Préréglage : seuil strict, anticrénelage non toléré.

**Utilisez cette option lorsque** vous souhaitez un peu de marge pour un bruit de rendu mineur (artefacts de compression de type JPEG, léger arrondi des couleurs) sans tolérer l'anticrénelage.

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_
-   **Depuis :** `v10.1.0` : applique sa propre règle de seuil/AA indépendamment des autres indicateurs `ignore*`.

Utilise une tolérance nulle : toute différence de pixel compte comme une différence, y compris l'anticrénelage.

**Utilisez cette option lorsque** vous avez besoin d'une preuve au pixel près que rien n'a changé, par ex. pour vérifier qu'un correctif n'a introduit aucune régression, aussi minime soit-elle.

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Redimensionne les 2 images à la même taille avant l'exécution de la comparaison. Il est fortement recommandé d'activer `ignoreAntialiasing` et `ignoreAlpha`

</Option>
## Contrôle direct de pixelmatch

---

:::info Ajouté en v10.1.0
`compareOptions.pixelmatch` n'a pas d'équivalent en v9 (ResembleJS). C'est une toute nouvelle manière de contrôler directement le moteur de comparaison, au lieu d'utiliser un préréglage `ignore*`.
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin pour la méthode spécifique utilisée_
-   **Ajouté en :** `v10.1.0`

Transmet les paramètres directement à [pixelmatch](https://github.com/mapbox/pixelmatch) au lieu d'utiliser un préréglage `ignore*`. **Utilisez cette option lorsque les cinq préréglages `ignore*` sont trop grossiers :** vous avez besoin d'une valeur de seuil précise que les préréglages ne proposent pas, ou d'une image de différences réellement lisible dans vos rapports/sorties CI au lieu de la surbrillance magenta par défaut.

:::warning Mutuellement exclusifs au sein d'un même objet d'options
Placer une clé `ignore*` et `pixelmatch` dans le **même** objet d'options lève une erreur `CompareOptionsConflictError`, même lorsque la valeur `ignore*` est `false` (voir l'exemple invalide ci-dessous). Choisissez un seul mode par objet : les préréglages `ignore*` ou `pixelmatch`, jamais les deux.

Cela ne s'applique qu'au sein d'un même objet. La configuration du service et les options d'un appel de méthode sont des objets distincts, donc un appel `check*` **peut** utiliser un mode différent de celui de la configuration du service ; par exemple, le service utilise les préréglages `ignore*` mais un appel transmet `pixelmatch` à la place (ou inversement). Aucune erreur dans ce cas, seulement un avertissement journalisé signalant le changement de mode de comparaison.
:::

| Champ | Type | Défaut | À quoi il sert |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | Sensibilité de 0 (toute différence de pixel échoue) à 1 (presque rien n'échoue). Utilisez-le pour régler une valeur de sensibilité exacte au lieu de choisir le préréglage `ignore*` le plus proche. |
| `includeAA` | `boolean` | `false` | `true` compte les pixels de bord anticrénelés comme des différences ; `false` les tolère. Désactivez-le si les différences de rendu des bords de police/forme provoquent des échecs instables. |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Couleur RGB des pixels différents dans l'image de différences. Changez-la si le magenta se confond avec votre interface (par ex. un thème rose/violet) et que les différences sont difficiles à repérer. |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Couleur RGB des pixels anticrénelés, maintenue visuellement distincte des vraies différences afin de distinguer d'un coup d'œil le « bruit de rendu » d'un « vrai bug ». |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Couleur RGB des pixels ajoutés ou supprimés (pas seulement recolorés), utile pour repérer les décalages de mise en page par rapport aux changements de couleur. |
| `alpha` | `number` | `0.1` | Opacité de la superposition des différences par-dessus la capture d'écran réelle. Augmentez-la pour faire ressortir davantage les différences dans les rapports ; diminuez-la pour continuer à voir clairement l'interface sous-jacente. Sans rapport avec le préréglage `ignoreAlpha`. |
| `diffMask` | `boolean` | `false` | Définissez `true` pour produire uniquement la différence brute (fond transparent) au lieu de la différence dessinée par-dessus votre capture d'écran, utile pour créer votre propre visualiseur/rapport de différences personnalisé. |
| `checkerboard` | `boolean` | `true` | Contrôle la manière dont les pixels semi-transparents sont rendus dans la différence. Désactivez-le si le motif en damier se confond facilement avec le contenu réel de vos captures d'écran. |

**Configuration du service :**

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['visual', {
            compareOptions: {
                pixelmatch: {
                    threshold: 0.063,
                    includeAA: true,
                },
            },
        }],
    ],
}
```

**Remplacement au niveau de la méthode lorsque le service utilise les préréglages `ignore*` :**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**Remplacement au niveau de la méthode lorsque le service utilise `pixelmatch` :**

```js
await browser.checkScreen('homepage', {
    ignoreLess: true,
})
```

**Invalide : lève `CompareOptionsConflictError`**

```js
compareOptions: {
    ignoreLess: false,
    pixelmatch: { threshold: 0.063 },
}
```

Consultez la [documentation de pixelmatch](https://github.com/mapbox/pixelmatch) pour la sémantique complète des options.

</Option>
## Masquages mobiles

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin. Ceci est **uniquement pour mobile**_

Masque automatiquement la barre d'état et la barre d'adresse lors des comparaisons. Cela évite les échecs liés à l'heure, au wifi ou à l'état de la batterie.

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin. Ceci est **uniquement pour mobile**_

Masque automatiquement la barre d'outils.

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **Remarque :** _Ne peut être utilisé que pour `checkScreen()`. Cela remplacera le paramètre du plugin. Ceci est **uniquement pour iPad**_

Masque automatiquement la barre latérale des iPad en mode paysage lors des comparaisons. Cela évite les échecs liés au composant natif onglets/navigation privée/signets.

</Option>
## Résultats et rapports

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Si `true`, le pourcentage retourné sera de la forme `0.12345678`, la valeur par défaut est `0.12`

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Retourne toutes les données de comparaison, et pas seulement le pourcentage de différence

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Valeur admissible de `misMatchPercentage` qui empêche l'enregistrement des images présentant des différences

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **Remarque :** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Pertinent uniquement lorsque [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) est activé._

La proximité en pixels utilisée pour regrouper les pixels de différence dans les rapports JSON. Des valeurs plus élevées regroupent davantage de pixels dans moins de cadres de délimitation ; des valeurs plus faibles produisent des cadres plus précis mais plus nombreux.

</Option>