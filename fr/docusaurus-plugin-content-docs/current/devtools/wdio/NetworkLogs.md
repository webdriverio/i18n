---
id: network-logs
title: Journaux réseau
description: "Inspectez chaque requête et réponse HTTP capturée par DevTools pendant un test pour déboguer les appels d'API, les payloads et les requêtes lentes."
---

Surveillez et inspectez toute l'activité réseau pendant vos tests. DevTools capture chaque requête et réponse HTTP, vous offrant une visibilité complète sur les appels d'API, le chargement des ressources et la chronologie réseau - exactement comme les DevTools du navigateur.

**Ce qui est capturé :**
- **Détails de la requête** - URL, méthode, en-têtes, paramètres de requête, corps de la requête
- **Données de la réponse** - Code de statut, en-têtes de réponse, corps de la réponse, chronologie
- **Types de ressources** - Requêtes XHR/Fetch, scripts, feuilles de style, images, et plus encore
- **Métriques de performance** - Chronologie des requêtes, durée et cascade réseau

C'est inestimable pour déboguer les problèmes d'API, identifier les requêtes lentes, valider les payloads de données et comprendre le comportement réseau de votre application pendant les tests.

## Sans WebDriver BiDi

Safari et chaque session servie par Appium (Safari sur iOS, Chrome sur Android) n'exposent pas WebDriver BiDi ; l'onglet Network y est donc alimenté par la page elle-même, via le même collecteur injecté qui enregistre le DOM. Il utilise deux sources propres à la page :

- **Patch de `fetch` / `XMLHttpRequest`** : chaque appel effectué par la page transporte sa méthode, ses en-têtes, son statut et son corps.
- **Tampon Resource Timing** : chaque chargement effectué par le navigateur (le document, les scripts, les styles, les images, les polices) avec ses phases de chronologie et sa taille, ainsi qu'un statut sur Chromium. Le tampon est lu lors de l'installation du collecteur, de sorte que les chargements effectués avant son existence sont inclus.

Resource Timing ne peut pas voir les en-têtes ni les corps, et sur Safari il ne rapporte aucun statut. Chaque ligne concernée l'indique dans sa fiche de détail, une ligne sans statut est colorée comme inconnue plutôt que comme échouée ou toujours en cours, et la colonne de méthode affiche un tiret lorsque le navigateur n'en indique aucune. Dans une trace, l'entrée `trace.network` de la ligne contient `_source: "resource-timing"` et le `_resourceType` capturé, de sorte qu'une trace rouverte affiche la même ligne. Une requête vue par les deux sources n'est listée qu'une seule fois.

Lorsque BiDi sert la session, c'est-à-dire qu'il a délivré un événement réseau et pas simplement accepté un abonnement, les lignes Resource Timing sont supprimées afin que chaque requête ne soit listée qu'une seule fois. Sur Nightwatch, le journal de performance de Chrome met à jour ces lignes sur place avec les en-têtes et le statut dont il dispose.

Une session d'application native n'a pas de document, donc aucune des deux sources ne s'applique. Son réseau peut être lu à partir du plugin appium-interceptor lorsque la session définit `appium:intercept: true` ; voir [Réseau des applications natives](/docs/devtools/mobile#native-app-network).

## Démo

### 🌐 Journaux réseau
![Network Logs](/img/devtools/network-logs.gif)