---
id: interactive-test-rerunning
title: Re-ejecución interactiva de pruebas y visualización
description: "Observa cómo se ejecutan las pruebas con vistas previas del navegador en vivo y capturas de pantalla por comando, y luego vuelve a ejecutar pruebas individuales o suites desde la interfaz de DevTools."
---

Observa cómo se ejecutan tus pruebas en tiempo real con vistas previas del navegador en vivo y capturas de pantalla automáticas tomadas después de cada comando de WebDriver. La interfaz muestra una línea de tiempo visual completa de la ejecución de tus pruebas, mostrando el estado exacto del navegador en cada paso.

Una vez que finalice la ejecución inicial de las pruebas, haz clic en cualquier caso de prueba o suite en la interfaz de DevTools para volver a ejecutarlo al instante. Esto elimina la necesidad de reiniciar todo el test runner o modificar tu código, lo que acelera drásticamente los ciclos de depuración.

**Características principales:**
- **Visualización en tiempo real** - Captura automática de pantalla después de cada comando (click, toBeExisting, etc.)
- **Vista previa del navegador en vivo** - Observa el estado actual de tu aplicación durante la ejecución de las pruebas
- **Línea de tiempo de comandos** - Consulta registros detallados con marcas de tiempo para cada acción
- **Re-ejecución interactiva** - Haz clic en cualquier prueba o suite para volver a ejecutarla al instante
- **Ejecución en la misma sesión** - Las pruebas se vuelven a ejecutar en la misma sesión del navegador para obtener retroalimentación más rápida
- **Historial desplazable** - Revisa cualquier punto de la ejecución de las pruebas

## Demostración

### ▶️ Test Runner
![Test Runner Demo](/img/devtools/test-runner.gif)

### 🛠️ Re-ejecutor de pruebas
![Test Rerunner Demo](/img/devtools/test-rerunner.gif)

### 🛑 Detener el Test Runner
![Stop Test Runner Demo](/img/devtools/stop-runner.gif)

### ⚡ Acciones, instantáneas y registros de comandos
![Actions, Snapshot & Command Logs Demo](/img/devtools/actions-command-logs.gif)