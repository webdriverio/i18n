---
id: wdio-cleanuptotal-service
title: Service CleanupTotal
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---


> wdio-cleanuptotal-service est un package tiers, pour plus d'informations, consultez [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

Avec le service `cleanup-total` pour [webdriver.io](https://webdriver.io/), vous pouvez facilement assurer un nettoyage approprié après chaque test. Le service fournit une méthode systématique pour marquer les entités à supprimer immédiatement après leur création. Cela est particulièrement utile lorsque les tests impliquent la création de structures complexes, comme un compte bancaire avec un plan d'investissement et un dépôt. Sans un nettoyage approprié, tenter de supprimer le compte peut entraîner des erreurs, comme un refus dû au fait que le compte n'est pas vide. Cependant, avec __cleanup-total__, les entités sont supprimées dans le bon ordre, garantissant que les tests se nettoient après eux-mêmes et n'interfèrent pas les uns avec les autres.

## Installation
La façon la plus simple d'installer ce module en tant que dépendance (de développement) est d'utiliser la commande suivante :

```
npm install wdio-cleanuptotal-service --save-dev
```

## Utilisation

Ajoutez wdio-cleanuptotal-service à votre `wdio.conf.ts` :

```typescript
export const config: WebdriverIO.Config = {
  // ... autres options

  services: ['cleanuptotal']

  // ... autres options
};
```

ou avec les options de service :

```typescript
export const config: WebdriverIO.Config = {
  // ... autres options

  services: [
    [
      'cleanuptotal',
      {
        // Utilisez une fonction de journalisation personnalisée pour écrire des messages dans le rapport de test
        customLoggerMethod: console.log(), // TODO: remplacez par votre propre fonction de journalisation si nécessaire

        // N'écrivez dans le journal que lorsqu'une erreur se produit pour réduire l'encombrement
        logErrorsOnly: false, // TODO: envisagez de passer à 'true' si vous avez trop de messages dans le rapport
      }
    ]
  ]

  // ... autres options
};
```

## Utilisation dans les tests

Vous pouvez importer le service __cleanuptotal__ partout où c'est nécessaire, que ce soit dans votre fichier de test ou dans n'importe quelle autre classe.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Créer un compte et l'ajouter à la liste de nettoyage pour suppression après le test
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Ajouter un plan d'investissement au compte et l'ajouter à la liste de nettoyage
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Déposer des fonds sur le compte et ajouter à la liste de nettoyage
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Notez que le code de nettoyage sera exécuté après la fin du test
```

## Support TypeScript

TypeScript est pris en charge pour ce plugin.

## Support

Pour le support et les suggestions, n'hésitez pas à me contacter à [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com).