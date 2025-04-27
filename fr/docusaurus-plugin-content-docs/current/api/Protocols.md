---
id: protocols
title: Commandes de Protocole
---

WebdriverIO est un framework d'automatisation qui s'appuie sur divers protocoles d'automatisation pour contrôler un agent distant, par exemple pour un navigateur, un appareil mobile ou une télévision. Selon l'appareil distant, différents protocoles entrent en jeu. Ces commandes sont assignées à l'objet [Browser](/docs/api/browser) ou [Element](/docs/api/element) en fonction des informations de session fournies par le serveur distant (par exemple, le pilote de navigateur).

En interne, WebdriverIO utilise des commandes de protocole pour presque toutes les interactions avec l'agent distant. Cependant, des commandes supplémentaires assignées à l'objet [Browser](/docs/api/browser) ou [Element](/docs/api/element) simplifient l'utilisation de WebdriverIO. Par exemple, obtenir le texte d'un élément en utilisant des commandes de protocole ressemblerait à ceci :

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

En utilisant les commandes pratiques de l'objet [Browser](/docs/api/browser) ou [Element](/docs/api/element), cela peut être réduit à :

```js
$('#lst-ib').getText()
```

La section suivante explique chaque protocole individuel.

## Protocole WebDriver

Le protocole [WebDriver](https://w3c.github.io/webdriver/#elements) est une norme web pour l'automatisation des navigateurs. Contrairement à d'autres outils E2E, il garantit que l'automatisation peut être effectuée sur des navigateurs réels utilisés par vos utilisateurs, comme Firefox, Safari et Chrome et les navigateurs basés sur Chromium comme Edge, et pas seulement sur des moteurs de navigateur comme WebKit, qui sont très différents.

L'avantage d'utiliser le protocole WebDriver par opposition aux protocoles de débogage comme [Chrome DevTools](https://w3c.github.io/webdriver/#elements) est que vous disposez d'un ensemble spécifique de commandes qui permettent d'interagir avec le navigateur de la même manière sur tous les navigateurs, ce qui réduit les risques d'instabilité. De plus, ce protocole offre des capacités de mise à l'échelle massive en utilisant des fournisseurs cloud tels que [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) et [d'autres](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## Protocole WebDriver Bidi

Le protocole [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) est la deuxième génération du protocole et est actuellement développé par la plupart des fournisseurs de navigateurs. Par rapport à son prédécesseur, le protocole prend en charge une communication bidirectionnelle (d'où "Bidi") entre le framework et l'appareil distant. Il introduit également des primitives supplémentaires pour une meilleure introspection du navigateur afin de mieux automatiser les applications web modernes dans les navigateurs.

Étant donné que ce protocole est actuellement en cours de développement, d'autres fonctionnalités seront ajoutées au fil du temps et prises en charge par les navigateurs. Si vous utilisez les commandes pratiques de WebdriverIO, rien ne changera pour vous. WebdriverIO utilisera ces nouvelles capacités de protocole dès qu'elles seront disponibles et prises en charge dans le navigateur.

## Appium

Le projet [Appium](https://appium.io/) fournit des capacités pour automatiser les appareils mobiles, de bureau et tous les autres types d'appareils IoT. Alors que WebDriver se concentre sur les navigateurs et le web, la vision d'Appium est d'utiliser la même approche mais pour n'importe quel appareil. En plus des commandes définies par WebDriver, il dispose de commandes spéciales qui sont souvent spécifiques à l'appareil distant qui est automatisé. Pour les scénarios de test mobile, c'est idéal lorsque vous souhaitez écrire et exécuter les mêmes tests pour les applications Android et iOS.

Selon la [documentation](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) d'Appium, il a été conçu pour répondre aux besoins d'automatisation mobile selon une philosophie décrite par les quatre principes suivants :

- Vous ne devriez pas avoir à recompiler votre application ou la modifier de quelque manière que ce soit pour l'automatiser.
- Vous ne devriez pas être limité à un langage ou un framework spécifique pour écrire et exécuter vos tests.
- Un framework d'automatisation mobile ne devrait pas réinventer la roue en matière d'API d'automatisation.
- Un framework d'automatisation mobile devrait être open source, dans l'esprit et la pratique ainsi que dans le nom !

## Chromium

Le protocole Chromium offre un ensemble étendu de commandes en plus du protocole WebDriver qui n'est pris en charge que lors de l'exécution de sessions automatisées via [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) ou [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

Le protocole Firefox offre un ensemble étendu de commandes en plus du protocole WebDriver qui n'est pris en charge que lors de l'exécution de sessions automatisées via [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

Le protocole [Sauce Labs](https://saucelabs.com/) offre un ensemble étendu de commandes en plus du protocole WebDriver qui n'est pris en charge que lors de l'exécution de sessions automatisées à l'aide du cloud Sauce Labs.

## Selenium Standalone

Le protocole [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) offre un ensemble étendu de commandes en plus du protocole WebDriver qui n'est pris en charge que lors de l'exécution de sessions automatisées à l'aide de Selenium Grid.

## Protocole JSON Wire

Le [Protocole JSON Wire](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) est le prédécesseur du protocole WebDriver et est __déprécié__ aujourd'hui. Bien que certaines commandes puissent encore être prises en charge dans certains environnements, il n'est pas recommandé d'utiliser l'une de ses commandes.

## Protocole Mobile JSON Wire

Le [Protocole Mobile JSON Wire](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) est un ensemble étendu de commandes mobiles en plus du Protocole JSON Wire. Étant donné que ce dernier est déprécié, le Protocole Mobile JSON Wire est également __déprécié__. Appium peut encore prendre en charge certaines de ses commandes, mais il n'est pas recommandé de les utiliser.