---
id: record
title: Tests d'Enregistrement
---

Chrome DevTools dispose d'un panneau _Recorder_ qui permet aux utilisateurs d'enregistrer et de rejouer des étapes automatisées dans Chrome. Ces étapes peuvent être [exportées dans des tests WebdriverIO avec une extension](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) rendant l'écriture de tests très facile.

## Qu'est-ce que Chrome DevTools Recorder

Le [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) est un outil qui vous permet d'enregistrer et de rejouer des actions de test directement dans le navigateur et également de les exporter au format JSON (ou de les exporter en test e2e), ainsi que de mesurer les performances des tests.

L'outil est simple, et comme il est intégré au navigateur, nous avons l'avantage de ne pas changer de contexte ou de gérer un outil tiers.

## Comment enregistrer un test avec Chrome DevTools Recorder

Si vous avez la dernière version de Chrome, vous aurez déjà Recorder installé et disponible. Ouvrez simplement n'importe quel site web, faites un clic droit et sélectionnez _"Inspecter"_. Dans DevTools, vous pouvez ouvrir le Recorder en appuyant sur `CMD/Control` + `Shift` + `p` et en saisissant _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Pour commencer à enregistrer un parcours utilisateur, cliquez sur _"Start new recording"_, donnez un nom à votre test, puis utilisez le navigateur pour enregistrer votre test :

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Ensuite, cliquez sur _"Replay"_ pour vérifier si l'enregistrement a réussi et fait ce que vous vouliez faire. Si tout est correct, cliquez sur l'icône [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) et sélectionnez _"Export as a WebdriverIO Test Script"_ :

L'option _"Export as a WebdriverIO Test Script"_ n'est disponible que si vous installez l'extension [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).

![Chrome DevTools Recorder](/img/recorder/export.gif)

C'est tout !

## Exporter l'enregistrement

Si vous avez exporté le flux en tant que script de test WebdriverIO, il devrait télécharger un script que vous pouvez copier-coller dans votre suite de tests. Par exemple, l'enregistrement ci-dessus ressemble à ceci :

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

Assurez-vous de revoir certains des localisateurs et de les remplacer par des [types de sélecteurs](/docs/selectors) plus robustes si nécessaire. Vous pouvez également exporter le flux sous forme de fichier JSON et utiliser le package [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) pour le transformer en un véritable script de test.

## Prochaines étapes

Vous pouvez utiliser ce flux pour créer facilement des tests pour vos applications. Le Chrome DevTools Recorder dispose de diverses fonctionnalités supplémentaires, par exemple :

- [Simuler un réseau lent](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) ou
- [Mesurer les performances de vos tests](https://developer.chrome.com/docs/devtools/recorder/#measure)

N'oubliez pas de consulter leur [documentation](https://developer.chrome.com/docs/devtools/recorder).