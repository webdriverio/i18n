---
id: bestpractices
title: Bonnes pratiques
description: "Écrivez des tests rapides et résilients avec WebdriverIO en utilisant des sélecteurs stables, moins de requêtes d'éléments, des assertions intégrées et aucune pause manuelle."
---

# Bonnes pratiques

Ce guide vise à partager nos bonnes pratiques qui vous aident à écrire des tests performants et résilients.

## Utilisez des sélecteurs résilients

En utilisant des sélecteurs résilients aux changements dans le DOM, vous aurez moins de tests en échec, voire aucun, lorsque, par exemple, une classe est supprimée d'un élément.

Les classes peuvent être appliquées à plusieurs éléments et doivent être évitées si possible, sauf si vous souhaitez délibérément récupérer tous les éléments ayant cette classe.

```js
// 👎
await $('.button')
```

Tous ces sélecteurs devraient renvoyer un seul élément.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Remarque :__ pour découvrir tous les sélecteurs possibles pris en charge par WebdriverIO, consultez notre page [Sélecteurs](./Selectors.md).

## Limitez le nombre de requêtes d'éléments

Chaque fois que vous utilisez la commande [`$`](https://webdriver.io/docs/api/browser/$) ou [`$$`](https://webdriver.io/docs/api/browser/$$) (y compris lorsque vous les enchaînez), WebdriverIO tente de localiser l'élément dans le DOM. Ces requêtes sont coûteuses, vous devez donc essayer de les limiter autant que possible.

Interroge trois éléments.

```js
// 👎
await $('table').$('tr').$('td')
```

N'interroge qu'un seul élément.

``` js
// 👍
await $('table tr td')
```

Le seul cas où vous devriez utiliser l'enchaînement est lorsque vous souhaitez combiner différentes [stratégies de sélection](https://webdriver.io/docs/selectors/#custom-selector-strategies).
Dans l'exemple, nous utilisons les [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), une stratégie permettant d'accéder au shadow DOM d'un élément.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Préférez localiser un seul élément plutôt que d'en prendre un dans une liste

Ce n'est pas toujours possible, mais en utilisant des pseudo-classes CSS comme [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child), vous pouvez cibler des éléments en fonction de leur index dans la liste des enfants de leur parent.

Interroge toutes les lignes du tableau.

```js
// 👎
await $$('table tr')[15]
```

Interroge une seule ligne du tableau.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Utilisez les assertions intégrées

N'utilisez pas d'assertions manuelles qui n'attendent pas automatiquement que les résultats correspondent, car cela entraînera des tests instables.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

En utilisant les assertions intégrées, WebdriverIO attendra automatiquement que le résultat réel corresponde au résultat attendu, ce qui donne des tests résilients.
Il y parvient en réessayant automatiquement l'assertion jusqu'à ce qu'elle réussisse ou expire.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Chargement paresseux et enchaînement de promesses

WebdriverIO a plus d'un tour dans son sac pour écrire du code propre, car il peut charger l'élément de manière paresseuse, ce qui vous permet d'enchaîner vos promesses et de réduire le nombre de `await`. Cela vous permet également de passer l'élément sous forme de ChainablePromiseElement au lieu d'un Element, et facilite l'utilisation avec les page objects.

Alors, quand devez-vous utiliser `await` ?
Vous devez toujours utiliser `await`, à l'exception des commandes `$` et `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// ou
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// ou
await $('div').$('button').click()
```

## N'abusez pas des commandes et des assertions

Lorsque vous utilisez expect.toBeDisplayed, vous attendez implicitement aussi que l'élément existe. Il n'est pas nécessaire d'utiliser les commandes waitForXXX lorsque vous avez déjà une assertion qui fait la même chose.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

Il n'est pas nécessaire d'attendre qu'un élément existe ou soit affiché lorsque vous interagissez avec lui ou que vous vérifiez quelque chose comme son texte, sauf si l'élément peut explicitement être invisible (opacity: 0 par exemple) ou peut explicitement être désactivé (attribut disabled par exemple), auquel cas attendre que l'élément soit affiché a du sens.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## Tests dynamiques

Utilisez des variables d'environnement pour stocker des données de test dynamiques, par exemple des identifiants secrets, dans votre environnement plutôt que de les coder en dur dans le test. Rendez-vous sur la page [Paramétrer les tests](parameterize-tests) pour plus d'informations à ce sujet.

## Analysez votre code avec un linter

En utilisant eslint pour analyser votre code, vous pouvez potentiellement détecter les erreurs tôt. Utilisez nos [règles de linting](https://www.npmjs.com/package/eslint-plugin-wdio) pour vous assurer que certaines des bonnes pratiques sont toujours appliquées.

## Ne faites pas de pause

Il peut être tentant d'utiliser la commande pause, mais c'est une mauvaise idée, car elle n'est pas résiliente et ne fera qu'entraîner des tests instables à long terme.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // attendre que le bouton d'envoi soit activé
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Boucles asynchrones

Lorsque vous avez du code asynchrone que vous souhaitez répéter, il est important de savoir que toutes les boucles ne le permettent pas.
Par exemple, la fonction forEach des tableaux ne permet pas les callbacks asynchrones, comme on peut le lire sur [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Remarque :__ vous pouvez toujours les utiliser lorsque vous n'avez pas besoin que l'opération soit asynchrone, comme dans cet exemple : `console.log(await $$('h1').map((h1) => h1.getText()))`.

Voici quelques exemples de ce que cela signifie.

Le code suivant ne fonctionnera pas, car les callbacks asynchrones ne sont pas pris en charge.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Le code suivant fonctionnera.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Restez simple

Nous voyons parfois nos utilisateurs mapper des données comme du texte ou des valeurs. Ce n'est souvent pas nécessaire et constitue souvent un « code smell ». Consultez les exemples ci-dessous pour comprendre pourquoi.

```js
// 👎 trop complexe, assertion synchrone, utilisez les assertions intégrées pour éviter les tests instables
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 trop complexe
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 trouve les éléments par leur texte mais ne tient pas compte de leur position
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 utilisez des identifiants uniques (souvent utilisés pour les éléments personnalisés)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 noms d'accessibilité (souvent utilisés pour les éléments html natifs)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Une autre chose que nous voyons parfois, c'est que des choses simples ont une solution trop compliquée.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## Exécuter du code en parallèle

Si l'ordre d'exécution de certaines parties du code vous importe peu, vous pouvez utiliser [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) pour accélérer l'exécution.

__Remarque :__ comme cela rend le code plus difficile à lire, vous pouvez l'abstraire à l'aide d'un page object ou d'une fonction, mais vous devriez aussi vous demander si le gain de performance vaut la perte de lisibilité.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

Une fois abstrait, cela pourrait ressembler à l'exemple ci-dessous, où la logique est placée dans une méthode appelée submitWithDataOf et où les données sont récupérées par la classe Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```