---
id: pageobjects
title: Modèle d'Objet Page
---

La version 5 de WebdriverIO a été conçue en tenant compte du support du modèle d'Objet Page. En introduisant le principe des "éléments en tant que citoyens de première classe", il est maintenant possible de construire de grandes suites de tests en utilisant ce modèle.

Aucun package supplémentaire n'est nécessaire pour créer des objets page. Il s'avère que les classes modernes et propres fournissent toutes les fonctionnalités nécessaires :

- héritage entre objets page
- chargement paresseux des éléments
- encapsulation des méthodes et actions

L'objectif de l'utilisation des objets page est d'abstraire toute information de page des tests réels. Idéalement, vous devriez stocker tous les sélecteurs ou instructions spécifiques qui sont uniques à une certaine page dans un objet page, afin que vous puissiez toujours exécuter votre test après avoir complètement redessiné votre page.

## Créer un Objet Page

Tout d'abord, nous avons besoin d'un objet page principal que nous appelons `Page.js`. Il contiendra des sélecteurs ou méthodes généraux dont tous les objets page hériteront.

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

Nous exporterons toujours une instance d'un objet page, et ne créerons jamais cette instance dans le test. Puisque nous écrivons des tests de bout en bout, nous considérons toujours la page comme une construction sans état&mdash;tout comme chaque requête HTTP est une construction sans état.

Bien sûr, le navigateur peut contenir des informations de session et donc afficher différentes pages basées sur différentes sessions, mais cela ne devrait pas se refléter dans un objet page. Ces types de changements d'état devraient se trouver dans vos tests réels.

Commençons à tester la première page. À des fins de démonstration, nous utilisons le site web [The Internet](http://the-internet.herokuapp.com) de [Elemental Selenium](http://elementalselenium.com) comme cobaye. Essayons de construire un exemple d'objet page pour la [page de connexion](http://the-internet.herokuapp.com/login).

## Obtenir vos sélecteurs avec `Get`

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

Ce qui est fondamentalement la même chose que :

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

ou

```js
await $('#username').setValue('Max Mustermann')
```

## Utiliser les objets page dans vos tests

Après avoir défini les éléments et méthodes nécessaires pour la page, vous pouvez commencer à écrire le test correspondant. Tout ce que vous avez à faire pour utiliser l'objet page est de l'`import`er (ou `require`). C'est tout !

Puisque vous avez exporté une instance déjà créée de l'objet page, l'importer vous permet de commencer à l'utiliser immédiatement.

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

Du point de vue structurel, il est logique de séparer les fichiers spec et les objets page dans différents répertoires. De plus, vous pouvez donner à chaque objet page la terminaison : `.page.js`. Cela rend plus clair le fait que vous importez un objet page.

## Aller plus loin

C'est le principe de base de la façon d'écrire des objets page avec WebdriverIO. Mais vous pouvez construire des structures d'objets page bien plus complexes que cela ! Par exemple, vous pourriez avoir des objets page spécifiques pour les modales, ou diviser un énorme objet page en différentes classes (chacune représentant une partie différente de la page web globale) qui héritent de l'objet page principal. Ce modèle offre vraiment beaucoup d'opportunités pour séparer les informations de page de vos tests, ce qui est important pour garder votre suite de tests structurée et claire à mesure que le projet et le nombre de tests augmentent.

Vous pouvez trouver cet exemple (et encore plus d'exemples d'objets page) dans le [`dossier example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) sur GitHub.