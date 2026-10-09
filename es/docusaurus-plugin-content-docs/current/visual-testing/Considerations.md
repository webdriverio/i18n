---
index: 1
id: considerations
title: Consideraciones
description: "Comprende los límites de la comparación de imágenes, la consistencia entre plataformas, los porcentajes de discrepancia y los navegadores headless antes de confiar en las pruebas visuales."
---

# Consideraciones clave para un uso óptimo

Antes de sumergirte en las potentes funcionalidades de `@wdio/visual-service`, es fundamental comprender algunas consideraciones clave que te garantizarán sacar el máximo provecho de esta herramienta. Los siguientes puntos están diseñados para guiarte a través de las mejores prácticas y los errores más comunes, ayudándote a obtener resultados de pruebas visuales precisos y eficientes. Estas consideraciones no son solo recomendaciones, sino aspectos esenciales que debes tener en cuenta para utilizar el servicio de forma eficaz en escenarios reales.

## Naturaleza de la comparación

-   **Comparación perceptual:** El módulo realiza una comparación perceptual de píxeles de las imágenes utilizando el espacio de color YIQ, que se ajusta más a la forma en que los humanos perciben las diferencias de color. Ciertos aspectos se pueden ajustar mediante las [Opciones de comparación](./compare-options).
-   **Impacto de las actualizaciones del navegador:** Ten en cuenta que las actualizaciones de los navegadores, como Chrome, pueden afectar al renderizado de las fuentes, lo que podría hacer necesario actualizar tus imágenes de referencia (baseline).

## Consistencia entre plataformas

-   **Comparar plataformas idénticas:** Asegúrate de que las capturas de pantalla se comparen dentro de la misma plataforma. Por ejemplo, una captura de pantalla de Chrome en un Mac no debe usarse para compararla con una de Chrome en Ubuntu o Windows.
-   **Analogía:** Dicho de forma sencilla, compara _'manzanas con manzanas, no manzanas con Androids'_.

## Precaución con el porcentaje de discrepancia

-   **Riesgo de aceptar discrepancias:** Ten precaución al aceptar un porcentaje de discrepancia. Esto es especialmente cierto en capturas de pantalla grandes, donde aceptar una discrepancia podría hacer que pases por alto involuntariamente diferencias significativas, como botones o elementos que faltan.

## Simulación de pantallas móviles

-   **Evita redimensionar el navegador para simular móviles:** No intentes simular tamaños de pantalla móvil redimensionando navegadores de escritorio y tratándolos como navegadores móviles. Los navegadores de escritorio, incluso redimensionados, no replican con precisión el renderizado de los navegadores móviles reales.
-   **Autenticidad en la comparación:** Esta herramienta tiene como objetivo comparar los elementos visuales tal como los vería un usuario final. Un navegador de escritorio redimensionado no refleja la experiencia real en un dispositivo móvil.

## Postura sobre los navegadores headless

-   **No recomendado para navegadores headless:** No se aconseja el uso de este módulo con navegadores headless. El motivo es que los usuarios finales no interactúan con navegadores headless y, por lo tanto, no se dará soporte a los problemas derivados de dicho uso.