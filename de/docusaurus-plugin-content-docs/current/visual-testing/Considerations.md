---
index: 1
id: considerations
title: Überlegungen
---

# Wichtige Überlegungen für den optimalen Einsatz

Bevor Sie in die leistungsstarken Funktionen des `@wdio/visual-service` eintauchen, ist es entscheidend, einige wichtige Überlegungen zu verstehen, die sicherstellen, dass Sie das Beste aus diesem Tool herausholen. Die folgenden Punkte sollen Sie durch Best Practices und häufige Fallstricke führen und Ihnen helfen, genaue und effiziente visuelle Testergebnisse zu erzielen. Diese Überlegungen sind nicht nur Empfehlungen, sondern wesentliche Aspekte, die Sie für die effektive Nutzung des Dienstes in realen Szenarien beachten sollten.

## Art des Vergleichs

-   **Pixel-für-Pixel-Basis:** Das Modul führt einen pixelgenauen Vergleich von Bildern durch. Während bestimmte Aspekte angepasst werden können (siehe Vergleichsoptionen), bleibt der Kernansatz ein grundlegender Pixelvergleich.
-   **Auswirkungen von Browser-Updates:** Beachten Sie, dass Updates für Browser wie Chrome die Schriftdarstellung beeinflussen können, was möglicherweise eine Aktualisierung Ihrer Baseline-Bilder erforderlich macht.

## Konsistenz bei Plattformen

-   **Vergleich identischer Plattformen:** Stellen Sie sicher, dass Screenshots innerhalb derselben Plattform verglichen werden. Ein Screenshot von Chrome auf einem Mac sollte beispielsweise nicht mit einem von Chrome auf Ubuntu oder Windows verglichen werden.
-   **Analogie:** Einfach ausgedrückt, vergleichen Sie _'Äpfel mit Äpfeln, nicht Äpfel mit Androiden'_.

## Vorsicht bei Abweichungsprozentsätzen

-   **Risiko bei der Akzeptanz von Abweichungen:** Seien Sie vorsichtig, wenn Sie einen Abweichungsprozentsatz akzeptieren. Dies gilt besonders für große Screenshots, bei denen die Akzeptanz einer Abweichung versehentlich erhebliche Diskrepanzen wie fehlende Schaltflächen oder Elemente übersehen könnte.

## Simulation von Mobilbildschirmen

-   **Vermeiden Sie Browser-Größenänderungen zur Mobilsimulation:** Versuchen Sie nicht, mobile Bildschirmgrößen durch Größenänderung von Desktop-Browsern zu simulieren und diese als mobile Browser zu behandeln. Desktop-Browser, selbst wenn sie in der Größe angepasst werden, replizieren nicht genau die Darstellung echter mobiler Browser.
-   **Authentizität beim Vergleich:** Dieses Tool zielt darauf ab, Visuals so zu vergleichen, wie sie einem Endbenutzer erscheinen würden. Ein in der Größe angepasster Desktop-Browser spiegelt nicht die wahre Erfahrung auf einem mobilen Gerät wider.

## Haltung zu Headless-Browsern

-   **Nicht empfohlen für Headless-Browser:** Die Verwendung dieses Moduls mit Headless-Browsern wird nicht empfohlen. Der Grund dafür ist, dass Endbenutzer nicht mit Headless-Browsern interagieren, und daher werden Probleme, die aus einer solchen Nutzung entstehen, nicht unterstützt.