---
index: 1
id: considerations
title: Überlegungen
description: "Verstehen Sie die Grenzen des Bildvergleichs, der Plattformkonsistenz, der Abweichungsprozentsätze und von Headless-Browsern, bevor Sie sich auf visuelle Tests verlassen."
---

# Wichtige Überlegungen für eine optimale Nutzung

Bevor Sie in die leistungsstarken Funktionen des `@wdio/visual-service` eintauchen, ist es wichtig, einige zentrale Überlegungen zu verstehen, die sicherstellen, dass Sie das Beste aus diesem Tool herausholen. Die folgenden Punkte sollen Sie durch Best Practices und häufige Fallstricke führen und Ihnen helfen, genaue und effiziente Ergebnisse bei visuellen Tests zu erzielen. Diese Überlegungen sind nicht nur Empfehlungen, sondern wesentliche Aspekte, die Sie beachten sollten, um den Service in realen Szenarien effektiv zu nutzen.

## Art des Vergleichs

-   **Wahrnehmungsbasierter Vergleich:** Das Modul führt einen wahrnehmungsbasierten Pixelvergleich von Bildern unter Verwendung des YIQ-Farbraums durch, der sich stärker daran orientiert, wie Menschen Farbunterschiede wahrnehmen. Bestimmte Aspekte können über die [Vergleichsoptionen](./compare-options) angepasst werden.
-   **Auswirkungen von Browser-Updates:** Beachten Sie, dass Updates von Browsern wie Chrome die Schriftdarstellung beeinflussen können, was möglicherweise eine Aktualisierung Ihrer Baseline-Bilder erforderlich macht.

## Konsistenz der Plattformen

-   **Vergleich identischer Plattformen:** Stellen Sie sicher, dass Screenshots innerhalb derselben Plattform verglichen werden. Beispielsweise sollte ein Screenshot von Chrome auf einem Mac nicht mit einem Screenshot von Chrome unter Ubuntu oder Windows verglichen werden.
-   **Analogie:** Einfach ausgedrückt: Vergleichen Sie _„Äpfel mit Äpfeln, nicht Äpfel mit Androids“_.

## Vorsicht beim Abweichungsprozentsatz

-   **Risiko beim Akzeptieren von Abweichungen:** Seien Sie vorsichtig, wenn Sie einen Abweichungsprozentsatz akzeptieren. Dies gilt insbesondere für große Screenshots, bei denen das Akzeptieren einer Abweichung unbeabsichtigt dazu führen kann, dass erhebliche Unterschiede übersehen werden, wie etwa fehlende Buttons oder Elemente.

## Simulation mobiler Bildschirme

-   **Vermeiden Sie Browser-Größenänderungen zur mobilen Simulation:** Versuchen Sie nicht, mobile Bildschirmgrößen zu simulieren, indem Sie die Größe von Desktop-Browsern ändern und diese als mobile Browser behandeln. Desktop-Browser bilden selbst bei geänderter Größe die Darstellung echter mobiler Browser nicht genau ab.
-   **Authentizität beim Vergleich:** Dieses Tool zielt darauf ab, die Darstellung so zu vergleichen, wie sie einem Endbenutzer erscheinen würde. Ein in der Größe veränderter Desktop-Browser spiegelt nicht das tatsächliche Erlebnis auf einem mobilen Gerät wider.

## Haltung zu Headless-Browsern

-   **Nicht empfohlen für Headless-Browser:** Die Verwendung dieses Moduls mit Headless-Browsern wird nicht empfohlen. Der Grund dafür ist, dass Endbenutzer nicht mit Headless-Browsern interagieren, weshalb Probleme, die sich aus einer solchen Nutzung ergeben, nicht unterstützt werden.