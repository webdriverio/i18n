---
id: bestpractices
title: Bonnes Pratiques
---

# Bonnes Pratiques

Ce guide vise à partager nos meilleures pratiques qui vous aident à écrire des tests performants et robustes.

## Utiliser des sélecteurs robustes

En utilisant des sélecteurs qui résistent aux changements dans le DOM, vous aurez moins de tests qui échouent, voire aucun, lorsque par exemple une classe est supprimée d'un élément.

Les classes peuvent être appliquées à plusieurs éléments et devraient être évitées si possible, sauf si vous souhaitez délibérément récupérer tous les éléments avec cette classe.

```js
// 👎
await $('.button')
```

Tous ces sélecteurs devraient retourner un seul élément.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Note:__ Pour découvrir tous les sélecteurs possibles que WebdriverIO prend en charge, consultez notre page [Selectors](./Selectors.md).

## Limiter le nombre de requêtes d'éléments

Chaque fois que vous utilisez la commande [`$`](https://webdriver.io/docs/api/browser/$) ou [`$$`](https://webdriver.io/docs/api/browser/$$) (y compris en les chaînant), WebdriverIO essaie de localiser l'élément dans le DOM. Ces requêtes sont coûteuses, vous devriez donc essayer de les limiter autant que possible.

Requête trois éléments.

```js
// 👎
await $('table').$('tr').$('td')
```

Requête un seul élément.

``` js
// 👍
await $('table tr td')
```

Le seul moment où vous devriez utiliser le chaînage est lorsque vous voulez combiner différentes [stratégies de sélection](https://webdriver.io/docs/selectors/#custom-selector-strategies).
Dans l'exemple, nous utilisons les [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), qui est une stratégie pour accéder au shadow DOM d'un élément.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Préférer localiser un seul élément plutôt que d'en prendre un dans une liste

Ce n'est pas toujours possible, mais en utilisant des pseudo-classes CSS comme [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child), vous pouvez faire correspondre des éléments en fonction des indices des éléments dans la liste enfant de leurs parents.

Requête toutes les lignes du tableau.

```js
// 👎
await $$('table tr')[15]
```

Requête une seule ligne de tableau.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Utiliser les assertions intégrées

N'utilisez pas d'assertions manuelles qui n'attendent pas automatiquement que les résultats correspondent, car cela entraînera des tests instables.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

En utilisant les assertions intégrées, WebdriverIO attendra automatiquement que le résultat réel corresponde au résultat attendu, ce qui donne des tests robustes.
Il y parvient en réessayant automatiquement l'assertion jusqu'à ce qu'elle réussisse ou expire.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Chargement paresseux et chaînage de promesses

WebdriverIO a quelques astuces en ce qui concerne l'écriture de code propre, car il peut charger paresseusement l'élément, ce qui vous permet de chaîner vos promesses et de réduire la quantité de `await`. Cela vous permet également de passer l'élément en tant que ChainablePromiseElement au lieu d'un Element et pour une utilisation plus facile avec les objets de page.

Alors quand devez-vous utiliser `await` ?
Vous devriez toujours utiliser `await` à l'exception des commandes `$` et `$$`.

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

## Ne pas surutiliser les commandes et les assertions

Lorsque vous utilisez expect.toBeDisplayed, vous attendez implicitement également que l'élément existe. Il n'est pas nécessaire d'utiliser les commandes waitForXXX lorsque vous avez déjà une assertion qui fait la même chose.

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

Pas besoin d'attendre qu'un élément existe ou soit affiché lors de l'interaction ou lors de l'assertion de quelque chose comme son texte, sauf si l'élément peut explicitement être invisible (opacity: 0 par exemple) ou peut explicitement être désactivé (attribut disabled par exemple), auquel cas attendre que l'élément soit affiché a du sens.

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

## Tests Dynamiques

Utilisez des variables d'environnement pour stocker des données de test dynamiques, par exemple des identifiants secrets, dans votre environnement plutôt que de les coder en dur dans le test. Rendez-vous sur la page [Parameterize Tests](parameterize-tests) pour plus d'informations à ce sujet.

## Lintez votre code

En utilisant eslint pour linter votre code, vous pouvez potentiellement détecter les erreurs tôt, utilisez nos [règles de linting](https://www.npmjs.com/package/eslint-plugin-wdio) pour vous assurer que certaines des meilleures pratiques sont toujours appliquées.

## Ne pas mettre en pause

Il peut être tentant d'utiliser la commande pause, mais c'est une mauvaise idée car elle n'est pas robuste et ne fera que causer des tests instables à long terme.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Boucles asynchrones

Lorsque vous avez du code asynchrone que vous souhaitez répéter, il est important de savoir que toutes les boucles ne peuvent pas faire cela.
Par exemple, la fonction forEach du tableau ne permet pas les callbacks asynchrones, comme on peut le lire sur [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Note:__ Vous pouvez toujours les utiliser lorsque vous n'avez pas besoin que l'opération soit asynchrone comme dans cet exemple `console.log(await $$('h1').map((h1) => h1.getText()))`.

Voici quelques exemples de ce que cela signifie.

Ce qui suit ne fonctionnera pas car les callbacks asynchrones ne sont pas pris en charge.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Ce qui suit fonctionnera.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Garder les choses simples

Parfois, nous voyons nos utilisateurs mapper des données comme du texte ou des valeurs. Ce n'est souvent pas nécessaire et est souvent un signe de code malodorant, consultez les exemples ci-dessous pour comprendre pourquoi c'est le cas.

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

// 👎 trouve des éléments par leur texte mais ne prend pas en compte la position des éléments
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 utiliser des identifiants uniques (souvent utilisés pour les éléments personnalisés)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 noms d'accessibilité (souvent utilisés pour les éléments html natifs)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Une autre chose que nous voyons parfois est que des choses simples ont une solution trop compliquée.

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

## Exécution de code en parallèle

Si vous ne vous souciez pas de l'ordre dans lequel un certain code est exécuté, vous pouvez utiliser [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) pour accélérer l'exécution.

__Note:__ Comme cela rend le code plus difficile à lire, vous pourriez l'abstraire en utilisant un objet de page ou une fonction, bien que vous devriez également vous demander si le gain de performance vaut le coût de lisibilité.

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

Si abstrait, cela pourrait ressembler à ce qui suit où la logique est placée dans une méthode appelée submitWithDataOf et les données sont récupérées par la classe Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```