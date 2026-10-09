---
id: metadata
title: Metadatos
description: "Inspecciona las capacidades, el entorno y los tiempos de cada sesión del navegador en la pestaña Metadata de DevTools para diagnosticar fallos específicos del entorno."
---

Inspecciona el contexto completo de cada sesión del navegador que abre tu prueba. La pestaña Metadata muestra las capacidades, el entorno y los tiempos detrás de cada ejecución, para que puedas confirmar exactamente qué se estaba probando sin tener que revisar los registros.

**Qué se captura:**
- **Capacidades de la sesión** - Nombre y versión del navegador, plataforma y las capacidades de WebDriver negociadas
- **Detalles de la sesión** - ID de sesión, URL base y tamaño del viewport
- **Tiempos de ejecución** - Duración de la prueba, estado y marcas de tiempo de inicio/fin
- **Vista por sesión** - Cada sesión del navegador (incluidas las sesiones creadas por `browser.reloadSession()`) se conserva de forma independiente y se puede seleccionar desde un menú desplegable

Esto es de gran valor para diagnosticar fallos específicos del entorno, verificar que se aplicaron las capacidades correctas y comprender cómo se comportaron las pruebas con múltiples sesiones.

## Demo

### 📋 Metadatos
![Metadata Demo](/img/devtools/metadata.gif)