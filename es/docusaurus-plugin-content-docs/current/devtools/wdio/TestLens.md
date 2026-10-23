---
id: testlens
title: TestLens
description: "Salta desde una prueba o comando en la interfaz de DevTools directamente a su línea de código fuente, en la pestaña Source o en VS Code, con TestLens."
---

TestLens ofrece una navegación de código inteligente entre la interfaz de DevTools y los archivos fuente de tus pruebas. Haz clic en cualquier prueba o comando en la interfaz para abrir su código fuente en la línea exacta en la pestaña **Source** del panel y, desde allí, abrir el archivo en VS Code.

**Cómo funciona:**
- **Jerarquía visual de pruebas** - Visualiza la estructura de tus pruebas (suites, pruebas, escenarios) en una vista de árbol
- **Mapeo de código fuente** - Cada prueba enlaza a su ubicación exacta en tus archivos fuente
- **Navegación con un clic** - Haz clic en cualquier prueba o comando para mostrar su línea de código fuente en la pestaña **Source**
- **Enlace al editor** - El enlace **Open in editor** de la pestaña Source abre el archivo en esa línea en VS Code (`vscode://file/...`)

Esta conexión fluida entre la interfaz y el código acelera la depuración, ya que elimina la búsqueda manual de código al investigar fallos en las pruebas.

## Demo

### 🔍︎ TestLens
![TestLens Demo](/img/devtools/testlens.gif)