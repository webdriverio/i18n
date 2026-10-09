---
index: 1
id: considerations
title: Considérations
description: "Comprenez les limites de la comparaison d'images, la cohérence des plateformes, les pourcentages de différence et les navigateurs headless avant de vous fier aux tests visuels."
---

# Considérations clés pour une utilisation optimale

Avant de plonger dans les puissantes fonctionnalités du `@wdio/visual-service`, il est crucial de comprendre certaines considérations clés qui vous permettront de tirer le meilleur parti de cet outil. Les points suivants sont conçus pour vous guider à travers les bonnes pratiques et les pièges courants, afin de vous aider à obtenir des résultats de tests visuels précis et efficaces. Ces considérations ne sont pas de simples recommandations, mais des aspects essentiels à garder à l'esprit pour utiliser efficacement le service dans des scénarios réels.

## Nature de la comparaison

-   **Comparaison perceptuelle :** Le module effectue une comparaison perceptuelle des pixels des images en utilisant l'espace colorimétrique YIQ, qui correspond davantage à la façon dont les humains perçoivent les différences de couleur. Certains aspects peuvent être ajustés via les [Options de comparaison](./compare-options).
-   **Impact des mises à jour des navigateurs :** Sachez que les mises à jour des navigateurs, comme Chrome, peuvent affecter le rendu des polices, ce qui peut nécessiter une mise à jour de vos images de référence.

## Cohérence des plateformes

-   **Comparer des plateformes identiques :** Assurez-vous que les captures d'écran sont comparées sur la même plateforme. Par exemple, une capture d'écran de Chrome sur Mac ne doit pas être comparée à une capture de Chrome sur Ubuntu ou Windows.
-   **Analogie :** Pour faire simple, comparez _« des pommes avec des pommes, pas des Apple avec des Android »_.

## Prudence avec le pourcentage de différence

-   **Risque d'accepter des différences :** Faites preuve de prudence lorsque vous acceptez un pourcentage de différence. C'est particulièrement vrai pour les grandes captures d'écran, où accepter une différence pourrait faire passer inaperçues des divergences importantes, comme des boutons ou des éléments manquants.

## Simulation d'écran mobile

-   **Évitez de redimensionner le navigateur pour simuler un mobile :** N'essayez pas de simuler des tailles d'écran mobile en redimensionnant des navigateurs de bureau et en les traitant comme des navigateurs mobiles. Les navigateurs de bureau, même redimensionnés, ne reproduisent pas fidèlement le rendu des véritables navigateurs mobiles.
-   **Authenticité de la comparaison :** Cet outil vise à comparer les éléments visuels tels qu'ils apparaîtraient à un utilisateur final. Un navigateur de bureau redimensionné ne reflète pas l'expérience réelle sur un appareil mobile.

## Position sur les navigateurs headless

-   **Non recommandé pour les navigateurs headless :** L'utilisation de ce module avec des navigateurs headless est déconseillée. La raison est que les utilisateurs finaux n'interagissent pas avec des navigateurs headless, et par conséquent, les problèmes découlant d'une telle utilisation ne seront pas pris en charge.