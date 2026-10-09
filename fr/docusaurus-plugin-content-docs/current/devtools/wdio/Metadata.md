---
id: metadata
title: Métadonnées
description: "Inspectez les capacités, l'environnement et le timing de chaque session de navigateur dans l'onglet Metadata de DevTools pour diagnostiquer les échecs spécifiques à un environnement."
---

Inspectez le contexte complet de chaque session de navigateur ouverte par votre test. L'onglet Metadata expose les capacités, l'environnement et le timing de chaque exécution, afin que vous puissiez confirmer exactement ce qui a été testé sans avoir à fouiller dans les logs.

**Ce qui est capturé :**
- **Capacités de la session** - Nom et version du navigateur, plateforme et capacités WebDriver négociées
- **Détails de la session** - ID de session, URL de base et taille du viewport
- **Timing d'exécution** - Durée du test, statut et horodatages de début/fin
- **Vue par session** - Chaque session de navigateur (y compris les sessions créées par `browser.reloadSession()`) est conservée indépendamment et peut être sélectionnée dans une liste déroulante

C'est un outil précieux pour diagnostiquer les échecs spécifiques à un environnement, vérifier que les bonnes capacités ont été appliquées et comprendre le comportement des tests multi-sessions.

## Démo

### 📋 Métadonnées
![Metadata Demo](/img/devtools/metadata.gif)