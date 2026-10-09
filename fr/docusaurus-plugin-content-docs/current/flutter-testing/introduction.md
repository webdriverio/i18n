---
id: introduction
title: Introduction
description: "Obtenez un aperçu des tests de bout en bout des applications Flutter sur Android et iOS avec WebdriverIO, Appium et l'Appium Flutter Driver."
---

Ce guide couvre la configuration, la structuration et l'exécution de tests de bout en bout (E2E) pour les applications **Flutter** à l'aide de **WebdriverIO** et **Appium**.

WebdriverIO fournit un framework de test basé sur Node.js avec une prise en charge native des protocoles WebDriver et Appium, ce qui vous permet d'automatiser des applications Flutter sur Android et iOS.

---

### Le défi architectural : pourquoi Flutter est différent

Lors de l'automatisation d'applications mobiles natives standard (Kotlin/Java sur Android ou Swift/Objective-C sur iOS), les drivers Appium (`UiAutomator2` pour Android, `XCUITest` pour iOS) servent de point d'accès pour inspecter l'application et interagir avec elle en interrogeant l'arbre d'accessibilité natif du système d'exploitation. Ces drivers lisent les composants d'interface utilisateur au niveau du système d'exploitation (boutons, champs de saisie, libellés) et les exposent aux outils d'inspection et aux scripts de test à l'aide de stratégies de localisation standard telles que l'ID, l'Accessibility ID ou XPath.

Flutter fonctionne différemment :

Flutter n'utilise pas les composants d'interface utilisateur natifs du système d'exploitation. À la place, il affiche son interface directement sur un canevas rendu par un moteur graphique hébergé en interne. Le framework dessine ses propres widgets pixel par pixel.

#### Impact sur l'automatisation traditionnelle
Pour les drivers et inspecteurs natifs standard, une application Flutter apparaît souvent comme une seule surface graphique. Les widgets internes (tels que les boutons ou les champs de texte) n'existent pas par défaut dans l'arbre d'accessibilité du système d'exploitation. Par conséquent, les stratégies de localisation natives standard ne peuvent pas interagir directement avec les widgets Flutter internes.

---

### Comment WebdriverIO et Appium gèrent Flutter

WebdriverIO et Appium fournissent les outils nécessaires pour interagir avec l'arbre de widgets interne de Flutter, mais vous devez installer et configurer le driver et les extensions de localisation appropriés pour votre projet.

En utilisant l'[Appium Flutter Driver](https://github.com/appium/appium-flutter-driver), Appium se connecte à l'extension de test de Flutter (`flutter_driver`). Cela vous donne accès à des stratégies de localisation spécifiques à Flutter (Finders), notamment :

* `byValueKey` : localise les widgets par leur `Key` explicite dans le code Flutter.
* `byText` : localise les widgets par leur contenu textuel visible.
* `byTooltip` : localise les widgets par le texte de leur info-bulle.

Les sections suivantes présentent les prérequis, la configuration de l'environnement et l'écriture de votre première suite de tests.