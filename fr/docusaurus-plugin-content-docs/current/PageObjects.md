---
id: pageobjects
title: Pattern Page Object
description: "Structurez vos tests avec le pattern page object en déplaçant les sélecteurs et les actions spécifiques à une page dans des classes de page réutilisables."
---

La version 5 de WebdriverIO a été conçue en tenant compte du support du Page Object Pattern. En introduisant le principe des « éléments comme citoyens de première classe », il est désormais possible de construire de grandes suites de tests en utilisant ce pattern.

Aucun package supplémentaire n'est nécessaire pour créer des page objects. Il s'avère que des classes modernes et épurées fournissent toutes les fonctionnalités dont nous avons besoin :

- l'héritage entre page objects
- le chargement paresseux (lazy loading) des éléments
- l'encapsulation des méthodes et des actions

L'objectif de l'utilisation des page objects est d'abstraire toute information relative à la page des tests eux-mêmes. Idéalement, vous devriez stocker tous les sélecteurs ou instructions spécifiques propres à une page donnée dans un page object, afin de pouvoir toujours exécuter votre test après avoir complètement remanié votre page.

## Créer un Page Object

Tout d'abord, nous avons besoin d'un page object principal que nous appelons `Page.js`. Il contiendra des sélecteurs ou méthodes généraux dont tous les page objects hériteront.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

Nous allons toujours exporter (`export`) une instance d'un page object, et ne jamais créer cette instance dans le test. Puisque nous écrivons des tests de bout en bout, nous considérons toujours la page comme une construction sans état&mdash;tout comme chaque requête HTTP est une construction sans état.

Certes, le navigateur peut transporter des informations de session et donc afficher différentes pages selon différentes sessions, mais cela ne devrait pas se refléter dans un page object. Ce genre de changements d'état devrait se trouver dans vos tests eux-mêmes.

Commençons à tester la première page. À des fins de démonstration, nous utilisons le site [The Internet](http://the-internet.herokuapp.com) d'[Elemental Selenium](http://elementalselenium.com) comme cobaye. Essayons de construire un exemple de page object pour la [page de connexion](http://the-internet.herokuapp.com/login).

## Utiliser `Get` pour vos sélecteurs

La première étape consiste à écrire tous les sélecteurs importants nécessaires dans notre objet `login.page` sous forme de fonctions getter :

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

Définir des sélecteurs dans des fonctions getter peut sembler un peu étrange, mais c'est vraiment utile. Ces fonctions sont évaluées _lorsque vous accédez à la propriété_, et non lorsque vous générez l'objet. Ainsi, vous demandez toujours l'élément avant d'effectuer une action dessus.

## Chaîner les commandes

WebdriverIO mémorise en interne le dernier résultat d'une commande. Si vous chaînez une commande d'élément avec une commande d'action, il trouve l'élément de la commande précédente et utilise le résultat pour exécuter l'action. Ainsi, vous pouvez supprimer le sélecteur (premier paramètre) et la commande devient aussi simple que :

```js
await LoginPage.username.setValue('Max Mustermann')
```

Ce qui revient pratiquement au même que :

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

ou

```js
await $('#username').setValue('Max Mustermann')
```

## Utiliser les Page Objects dans vos tests

Après avoir défini les éléments et méthodes nécessaires pour la page, vous pouvez commencer à écrire le test correspondant. Tout ce que vous avez à faire pour utiliser le page object est de l'importer (`import`, ou `require`). C'est tout !

Puisque vous avez exporté une instance déjà créée du page object, son importation vous permet de commencer à l'utiliser immédiatement.

Si vous utilisez un framework d'assertion, vos tests peuvent être encore plus expressifs :

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

D'un point de vue structurel, il est logique de séparer les fichiers de spécification et les page objects dans des répertoires différents. De plus, vous pouvez donner à chaque page object l'extension : `.page.js`. Cela indique plus clairement que vous importez un page object.

## Aller plus loin

Voici le principe de base pour écrire des page objects avec WebdriverIO. Mais vous pouvez construire des structures de page objects bien plus complexes que celle-ci ! Par exemple, vous pourriez avoir des page objects spécifiques pour les modales, ou diviser un énorme page object en différentes classes (chacune représentant une partie différente de la page web globale) qui héritent du page object principal. Ce pattern offre vraiment de nombreuses possibilités pour séparer les informations de page de vos tests, ce qui est important pour garder votre suite de tests structurée et claire à mesure que le projet et le nombre de tests augmentent.

Vous pouvez trouver cet exemple (et encore plus d'exemples de page objects) dans le [dossier `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) sur GitHub.