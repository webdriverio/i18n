---
id: introduction
title: Introducción
description: "Obtén una visión general de las pruebas de extremo a extremo de aplicaciones Flutter en Android e iOS con WebdriverIO, Appium y Appium Flutter Driver."
---

Esta guía cubre la configuración, estructuración y ejecución de pruebas de extremo a extremo (E2E) para aplicaciones **Flutter** utilizando **WebdriverIO** y **Appium**.

WebdriverIO proporciona un framework de pruebas basado en Node.js con soporte nativo para los protocolos WebDriver y Appium, lo que te permite automatizar aplicaciones Flutter tanto en Android como en iOS.

---

### El desafío arquitectónico: por qué Flutter es diferente

Al automatizar aplicaciones móviles nativas estándar (Kotlin/Java en Android o Swift/Objective-C en iOS), los drivers de Appium (`UiAutomator2` para Android, `XCUITest` para iOS) actúan como punto de acceso para inspeccionar e interactuar con la aplicación consultando el árbol de accesibilidad nativo del sistema operativo. Estos drivers leen los componentes de interfaz de usuario a nivel del sistema operativo (botones, campos de entrada, etiquetas) y los exponen a las herramientas de inspección y a los scripts de prueba mediante estrategias de localización estándar como ID, Accessibility ID o XPath.

Flutter funciona de manera diferente:

Flutter no utiliza los componentes de interfaz de usuario nativos del sistema operativo. En su lugar, renderiza su interfaz directamente sobre un lienzo mediante un motor gráfico alojado internamente. El framework dibuja sus propios widgets píxel a píxel.

#### Impacto en la automatización tradicional
Para los drivers e inspectores nativos estándar, una aplicación Flutter suele aparecer como una única superficie gráfica. Los widgets internos (como botones o campos de texto) no existen por defecto en el árbol de accesibilidad del sistema operativo. Como resultado, las estrategias de localización nativas estándar no pueden interactuar directamente con los widgets internos de Flutter.

---

### Cómo WebdriverIO y Appium manejan Flutter

WebdriverIO y Appium proporcionan las herramientas necesarias para interactuar con el árbol de widgets interno de Flutter, pero necesitas instalar y configurar el driver y las extensiones de localización adecuadas para tu proyecto.

Al utilizar [Appium Flutter Driver](https://github.com/appium/appium-flutter-driver), Appium se conecta a la extensión de pruebas de Flutter (`flutter_driver`). Esto te da acceso a estrategias de localización específicas de Flutter (Finders), entre ellas:

* `byValueKey`: Localiza widgets por su `Key` explícita en el código de Flutter.
* `byText`: Localiza widgets por su contenido de texto visible.
* `byTooltip`: Localiza widgets por el texto de su tooltip.

Las siguientes secciones explican los requisitos previos, la configuración del entorno y la escritura de tu primera suite de pruebas.