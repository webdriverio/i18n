---
index: 1
id: considerations
title: Considérations
---

# Considérations clés pour une utilisation optimale

Avant de plonger dans les fonctionnalités puissantes du `@wdio/visual-service`, il est crucial de comprendre certaines considérations clés qui vous permettront de tirer le meilleur parti de cet outil. Les points suivants sont conçus pour vous guider à travers les meilleures pratiques et les pièges courants, vous aidant à obtenir des résultats de tests visuels précis et efficaces. Ces considérations ne sont pas seulement des recommandations, mais des aspects essentiels à garder à l'esprit pour utiliser efficacement le service dans des scénarios réels.

## Nature de la comparaison

-   **Base pixel par pixel :** Le module effectue une comparaison pixel par pixel des images. Bien que certains aspects puissent être ajustés (voir Options de comparaison), l'approche de base reste une comparaison de pixels simple.
-   **Impact des mises à jour de navigateur :** Soyez conscient que les mises à jour des navigateurs, comme Chrome, peuvent affecter le rendu des polices, nécessitant potentiellement une mise à jour de vos images de référence.

## Cohérence des plateformes

-   **Comparer des plateformes identiques :** Assurez-vous que les captures d'écran sont comparées au sein de la même plateforme. Par exemple, une capture d'écran de Chrome sur Mac ne devrait pas être utilisée pour comparer avec une capture de Chrome sur Ubuntu ou Windows.
-   **Analogie :** Pour simplifier, comparez _'des Pommes avec des Pommes, pas des Pommes avec des Androids'_.

## Prudence avec le pourcentage de différence

-   **Risque d'accepter des différences :** Soyez prudent lorsque vous acceptez un pourcentage de différence. C'est particulièrement vrai pour les grandes captures d'écran, où l'acceptation d'une différence pourrait involontairement négliger des écarts importants, comme des boutons ou des éléments manquants.

## Simulation d'écran mobile

-   **Évitez de redimensionner le navigateur pour simuler un mobile :** N'essayez pas de simuler des tailles d'écran mobile en redimensionnant les navigateurs de bureau et en les traitant comme des navigateurs mobiles. Les navigateurs de bureau, même redimensionnés, ne reproduisent pas fidèlement le rendu des navigateurs mobiles réels.
-   **Authenticité dans la comparaison :** Cet outil vise à comparer les visuels tels qu'ils apparaîtraient à un utilisateur final. Un navigateur de bureau redimensionné ne reflète pas l'expérience réelle sur un appareil mobile.

## Position sur les navigateurs headless

-   **Non recommandé pour les navigateurs headless :** L'utilisation de ce module avec des navigateurs headless n'est pas conseillée. La raison est que les utilisateurs finaux n'interagissent pas avec des navigateurs headless, et par conséquent, les problèmes découlant d'une telle utilisation ne seront pas pris en charge.