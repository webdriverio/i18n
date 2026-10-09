---
id: network-logs
title: Journaux réseau
description: "Inspectez chaque requête et réponse HTTP capturée par DevTools pendant un test pour déboguer les appels d'API, les payloads et les requêtes lentes."
---

Surveillez et inspectez toute l'activité réseau pendant vos tests. DevTools capture chaque requête et réponse HTTP, vous offrant une visibilité complète sur les appels d'API, le chargement des ressources et les temps réseau, exactement comme les DevTools du navigateur.

**Ce qui est capturé :**
- **Détails de la requête** - URL, méthode, en-têtes, paramètres de requête, corps de la requête
- **Données de la réponse** - Code de statut, en-têtes de réponse, corps de la réponse, temps de réponse
- **Types de ressources** - Requêtes XHR/Fetch, scripts, feuilles de style, images, et plus encore
- **Métriques de performance** - Temps des requêtes, durée et cascade réseau (waterfall)

C'est un outil précieux pour déboguer les problèmes d'API, identifier les requêtes lentes, valider les payloads de données et comprendre le comportement réseau de votre application pendant les tests.

## Démo

### 🌐 Journaux réseau
![Network Logs](/img/devtools/network-logs.gif)