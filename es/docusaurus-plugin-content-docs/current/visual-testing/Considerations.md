---
index: 1
id: considerations
title: Consideraciones
---

# Consideraciones clave para un uso óptimo

Antes de sumergirse en las potentes características de `@wdio/visual-service`, es crucial entender algunas consideraciones clave que aseguran que obtenga el máximo provecho de esta herramienta. Los siguientes puntos están diseñados para guiarlo a través de las mejores prácticas y errores comunes, ayudándole a lograr resultados precisos y eficientes en las pruebas visuales. Estas consideraciones no son solo recomendaciones, sino aspectos esenciales a tener en cuenta para utilizar eficazmente el servicio en escenarios del mundo real.

## Naturaleza de la comparación

-   **Base píxel por píxel:** El módulo realiza una comparación píxel por píxel de las imágenes. Si bien ciertos aspectos pueden ajustarse (ver Opciones de comparación), el enfoque principal sigue siendo una comparación básica de píxeles.
-   **Impacto de las actualizaciones del navegador:** Tenga en cuenta que las actualizaciones de los navegadores, como Chrome, pueden afectar la renderización de fuentes, lo que potencialmente requiere una actualización de sus imágenes de referencia.

## Consistencia en las plataformas

-   **Comparación de plataformas idénticas:** Asegúrese de que las capturas de pantalla se comparen dentro de la misma plataforma. Por ejemplo, una captura de pantalla de Chrome en Mac no debe usarse para comparar con una de Chrome en Ubuntu o Windows.
-   **Analogía:** Para decirlo simplemente, compare _'Manzanas con Manzanas, no Manzanas con Androides'_.

## Precaución con el porcentaje de discrepancia

-   **Riesgo de aceptar discrepancias:** Tenga precaución al aceptar un porcentaje de discrepancia. Esto es especialmente cierto para capturas de pantalla grandes, donde aceptar una discrepancia podría pasar por alto inadvertidamente diferencias significativas, como botones o elementos faltantes.

## Simulación de pantalla móvil

-   **Evite redimensionar el navegador para simular dispositivos móviles:** No intente simular tamaños de pantalla móvil redimensionando navegadores de escritorio y tratándolos como navegadores móviles. Los navegadores de escritorio, incluso cuando se redimensionan, no replican con precisión la renderización de los navegadores móviles reales.
-   **Autenticidad en la comparación:** Esta herramienta tiene como objetivo comparar visuales como aparecerían para un usuario final. Un navegador de escritorio redimensionado no refleja la experiencia real en un dispositivo móvil.

## Postura sobre navegadores sin interfaz gráfica (headless)

-   **No recomendado para navegadores headless:** No se recomienda el uso de este módulo con navegadores headless. La razón es que los usuarios finales no interactúan con navegadores headless, y por lo tanto, los problemas que surjan de tal uso no serán soportados.