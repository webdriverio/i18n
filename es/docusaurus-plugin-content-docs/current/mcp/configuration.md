---
id: configuration
title: Configuración
---

Esta página documenta todas las opciones de configuración para el servidor MCP de WebdriverIO.

## Configuración del Servidor MCP

El servidor MCP se configura a través de los archivos de configuración de Claude Desktop o Claude Code.

### Configuración Básica

#### macOS

Edita `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

#### Windows

Edita `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

#### Claude Code

Edita el archivo `.claude/settings.json` de tu proyecto:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

---

## Variables de Entorno

Configura la conexión del servidor Appium y otras configuraciones a través de variables de entorno.

### Conexión Appium

| Variable | Tipo | Valor predeterminado | Descripción |
|----------|------|---------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Nombre de host del servidor Appium |
| `APPIUM_URL_PORT` | number | `4723` | Puerto del servidor Appium |
| `APPIUM_PATH` | string | `/` | Ruta del servidor Appium |

### Ejemplo con Variables de Entorno

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724",
                "APPIUM_PATH": "/wd/hub"
            }
        }
    }
}
```

---

## Opciones de Sesión del Navegador

Opciones disponibles al iniciar una sesión de navegador mediante la herramienta `start_browser`.

### `headless`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`

Ejecuta Chrome en modo headless (sin ventana visible del navegador). Útil para entornos CI/CD o cuando no necesitas ver el navegador.

### `windowWidth`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `1920`
-   **Rango:** `400` - `3840`

Ancho inicial de la ventana del navegador en píxeles.

### `windowHeight`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `1080`
-   **Rango:** `400` - `2160`

Altura inicial de la ventana del navegador en píxeles.

### `navigationUrl`

-   **Tipo:** `string`
-   **Obligatorio:** No

URL a la que navegar inmediatamente después de iniciar el navegador. Es más eficiente que llamar a `start_browser` seguido de `navigate` por separado.

**Ejemplo:** Iniciar navegador y navegar en una sola llamada:
```
Start Chrome and navigate to https://webdriver.io
```

---

## Opciones de Sesión Móvil

Opciones disponibles al iniciar una sesión de aplicación móvil mediante la herramienta `start_app_session`.

### Opciones de Plataforma

#### `platform`

-   **Tipo:** `string`
-   **Obligatorio:** Sí
-   **Valores:** `iOS` | `Android`

La plataforma móvil a automatizar.

#### `platformVersion`

-   **Tipo:** `string`
-   **Obligatorio:** No

La versión del sistema operativo del dispositivo/simulador/emulador (p. ej., `17.0` para iOS, `14` para Android).

#### `automationName`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valores:** `XCUITest` (iOS), `UiAutomator2` | `Espresso` (Android)

El controlador de automatización a utilizar. El valor predeterminado es `XCUITest` para iOS y `UiAutomator2` para Android.

### Opciones de Dispositivo

#### `deviceName`

-   **Tipo:** `string`
-   **Obligatorio:** Sí

Nombre del dispositivo, simulador o emulador a utilizar.

**Ejemplos:**
-   Simulador iOS: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Emulador Android: `Pixel 7`, `Nexus 5X`
-   Dispositivo real: El nombre del dispositivo como se muestra en tu sistema

#### `udid`

-   **Tipo:** `string`
-   **Obligatorio:** No (Requerido para dispositivos iOS reales)

Identificador único de dispositivo. Requerido para dispositivos iOS reales (identificador de 40 caracteres) y recomendado para dispositivos reales Android.

**Cómo encontrar el UDID:**
-   **iOS:** Conecta el dispositivo, abre Finder/iTunes, haz clic en el dispositivo → Número de serie (haz clic para mostrar el UDID)
-   **Android:** Ejecuta `adb devices` en la terminal

### Opciones de la Aplicación

#### `appPath`

-   **Tipo:** `string`
-   **Obligatorio:** No*

Ruta al archivo de aplicación para instalar y lanzar.

**Formatos admitidos:**
-   Simulador iOS: directorio `.app`
-   Dispositivo real iOS: archivo `.ipa`
-   Android: archivo `.apk`

*Se debe proporcionar `appPath`, o establecer `noReset: true` para conectarse a una aplicación ya en ejecución.

#### `appWaitActivity`

-   **Tipo:** `string`
-   **Obligatorio:** No (Solo Android)

Actividad a esperar en el lanzamiento de la aplicación. Si no se especifica, se utiliza la actividad principal/de inicio de la aplicación.

**Ejemplo:** `com.example.app.MainActivity`

### Opciones de Estado de Sesión

#### `noReset`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`

Preserva el estado de la aplicación entre sesiones. Cuando es `true`:
-   Los datos de la aplicación se preservan (estado de inicio de sesión, preferencias, etc.)
-   La sesión se **desvinculará** en lugar de cerrarse (mantiene la aplicación en ejecución)
-   Útil para probar recorridos de usuario a través de múltiples sesiones
-   Se puede usar sin `appPath` para conectarse a una aplicación ya en ejecución

#### `fullReset`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`

Reinicia completamente la aplicación antes de la sesión. Cuando es `true`:
-   iOS: Desinstala y reinstala la aplicación
-   Android: Borra los datos y la caché de la aplicación
-   Útil para comenzar con un estado limpio

Establece `fullReset: false` con `noReset: true` para preservar completamente el estado de la aplicación.

### Tiempo de Espera de Sesión

#### `newCommandTimeout`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `60`

Cuánto tiempo (en segundos) Appium esperará un nuevo comando antes de asumir que el cliente ha finalizado y terminar la sesión. Aumenta este valor para sesiones de depuración más largas.

**Ejemplos:**
-   `60` - Predeterminado, adecuado para la mayoría de las automatizaciones
-   `300` - 5 minutos, para depuración u operaciones más lentas
-   `600` - 10 minutos, para pruebas de muy larga duración

### Opciones de Manejo Automático

#### `autoGrantPermissions`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`

Concede automáticamente permisos de la aplicación en la instalación/inicio. Cuando es `true`:
-   Los permisos de cámara, micrófono, ubicación, etc. se conceden automáticamente
-   No se necesita manejo manual de diálogos de permisos
-   Agiliza la automatización al evitar ventanas emergentes de permisos

:::note Solo Android
Esta opción afecta principalmente a Android. Los permisos de iOS deben manejarse de manera diferente debido a las restricciones del sistema.
:::

#### `autoAcceptAlerts`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`

Acepta automáticamente alertas del sistema (diálogos) que aparecen durante la automatización.

**Ejemplos de alertas aceptadas automáticamente:**
-   "¿Permitir notificaciones?"
-   "La aplicación desea acceder a tu ubicación"
-   "¿Permitir que la aplicación acceda a fotos?"

#### `autoDismissAlerts`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`

Descarta (cancela) las alertas del sistema en lugar de aceptarlas. Tiene prioridad sobre `autoAcceptAlerts` cuando se establece en `true`.

### Anulación del Servidor Appium

Puedes anular la conexión del servidor Appium por sesión:

#### `appiumHost`

-   **Tipo:** `string`
-   **Obligatorio:** No

Nombre de host del servidor Appium. Anula la variable de entorno `APPIUM_URL`.

#### `appiumPort`

-   **Tipo:** `number`
-   **Obligatorio:** No

Puerto del servidor Appium. Anula la variable de entorno `APPIUM_URL_PORT`.

#### `appiumPath`

-   **Tipo:** `string`
-   **Obligatorio:** No

Ruta del servidor Appium. Anula la variable de entorno `APPIUM_PATH`.

---

## Opciones de Detección de Elementos

Opciones para la herramienta `get_visible_elements`.

### `elementType`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** `interactable`
-   **Valores:** `interactable` | `visual` | `all`

Tipo de elementos a devolver:
-   `interactable`: Botones, enlaces, campos de entrada y otros elementos en los que se puede hacer clic
-   `visual`: Imágenes, SVGs y elementos visuales
-   `all`: Tanto elementos interactivos como visuales

### `inViewportOnly`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`

Solo devuelve elementos que son visibles dentro del viewport actual. Cuando es `false`, devuelve todos los elementos en la jerarquía de vista (útil para encontrar elementos fuera de la pantalla).

### `includeContainers`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`

Incluye elementos contenedores/de diseño en los resultados. Cuando es `true`:

**Contenedores Android incluidos:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**Contenedores iOS incluidos:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

Útil para depurar problemas de diseño o entender la jerarquía de vista.

### `includeBounds`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`

Incluye los límites/coordenadas del elemento (x, y, ancho, alto) en la respuesta. Establece en `true` para:
-   Interacciones basadas en coordenadas
-   Depuración de diseño
-   Posicionamiento de elementos visuales

### Opciones de Paginación

Para páginas grandes con muchos elementos, usa la paginación para reducir el uso de tokens:

#### `limit`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `0` (ilimitado)

Número máximo de elementos a devolver.

#### `offset`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `0`

Número de elementos a omitir antes de devolver resultados.

**Ejemplo:** Obtener elementos 21-40:
```
Get visible elements with limit 20 and offset 20
```

---

## Opciones de Árbol de Accesibilidad

Opciones para la herramienta `get_accessibility` (solo navegador).

### `limit`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `100`

Número máximo de nodos a devolver. Usa `0` para ilimitado (no recomendado para páginas grandes).

### `offset`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `0`

Número de nodos a omitir para paginación.

### `roles`

-   **Tipo:** `string[]`
-   **Obligatorio:** No
-   **Valor predeterminado:** Todos los roles

Filtrar a roles de accesibilidad específicos.

**Roles comunes:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Ejemplo:** Obtener solo botones y enlaces:
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`

Solo devuelve nodos que tienen un nombre/etiqueta. Filtra contenedores anónimos y reduce el ruido en los resultados.

---

## Opciones de Captura de Pantalla

Opciones para la herramienta `take_screenshot`.

### `outputPath`

-   **Tipo:** `string`
-   **Obligatorio:** No

Ruta donde guardar el archivo de captura de pantalla. Si no se proporciona, devuelve datos de imagen codificados en base64.

### Optimización Automática

Las capturas de pantalla se procesan automáticamente para optimizarlas para el consumo de LLM:

| Optimización | Valor | Descripción |
|--------------|-------|-------------|
| Dimensión máxima | 2000px | Las imágenes mayores de 2000px se redimensionan |
| Tamaño máximo de archivo | 1MB | Las imágenes se comprimen para mantenerse por debajo de 1MB |
| Formato | PNG/JPEG | PNG con máxima compresión; JPEG si es necesario para el tamaño |

Esta optimización asegura que las capturas de pantalla puedan procesarse eficientemente sin exceder los límites de tokens.

---

## Comportamiento de Sesión

### Tipos de Sesión

El servidor MCP rastrea los tipos de sesión para proporcionar herramientas y comportamiento apropiados:

| Tipo | Descripción | Auto-Desvinculación |
|------|-------------|-------------|
| `browser` | Sesión del navegador Chrome | No |
| `ios` | Sesión de aplicación iOS | Sí (si `noReset: true` o sin `appPath`) |
| `android` | Sesión de aplicación Android | Sí (si `noReset: true` o sin `appPath`) |

### Modelo de Sesión Única

El servidor MCP opera con un **modelo de sesión única**:

-   Solo una sesión de navegador O aplicación puede estar activa a la vez
-   Iniciar una nueva sesión cerrará/desvinculará la sesión actual
-   El estado de la sesión se mantiene globalmente a través de las llamadas a herramientas

### Desvincular vs Cerrar

| Acción | `detach: false` (Cerrar) | `detach: true` (Desvincular) |
|--------|-------------------------|-------------------------|
| Navegador | Cierra Chrome completamente | Mantiene Chrome en ejecución, desconecta WebDriver |
| Aplicación Móvil | Termina la aplicación | Mantiene la aplicación en ejecución en el estado actual |
| Caso de uso | Estado limpio para la próxima sesión | Preservar estado, inspección manual |

---

## Consideraciones de Rendimiento

El servidor MCP está optimizado para una comunicación eficiente con LLM utilizando el formato **TOON (Token-Oriented Object Notation)**, que minimiza el uso de tokens al enviar datos a Claude.

### Automatización de Navegador

-   El **modo headless** es más rápido pero no renderiza elementos visuales
-   **Tamaños de ventana más pequeños** reducen el tiempo de captura de pantalla
-   La **detección de elementos** está optimizada con una única ejecución de script
-   La **optimización de capturas de pantalla** mantiene las imágenes por debajo de 1MB para un procesamiento eficiente
-   **`inViewportOnly: true`** (predeterminado) filtra a solo elementos visibles

### Automatización Móvil

-   El **análisis de código fuente XML de página** usa solo 2 llamadas HTTP (vs 600+ para consultas tradicionales de elementos)
-   Los **selectores de ID de accesibilidad** son los más rápidos y confiables
-   Los **selectores XPath** son los más lentos - úsalos solo como último recurso
-   **`inViewportOnly: true`** (predeterminado) reduce significativamente el recuento de elementos
-   La **paginación** (`limit` y `offset`) reduce el uso de tokens para pantallas con muchos elementos
-   **`includeBounds: false`** (predeterminado) omite datos de coordenadas a menos que sean necesarios

### Consejos de Uso de Tokens

| Configuración | Impacto |
|---------|--------|
| `inViewportOnly: true` | Filtra elementos fuera de pantalla, reduciendo el tamaño de respuesta |
| `includeContainers: false` | Excluye elementos de diseño (ViewGroup, etc.) |
| `includeBounds: false` | Omite datos x/y/ancho/alto |
| `limit` con paginación | Procesa elementos en lotes en vez de todos a la vez |
| `namedOnly: true` (accesibilidad) | Filtra nodos anónimos |

---

## Configuración del Servidor Appium

Antes de usar la automatización móvil, asegúrate de que Appium esté correctamente configurado.

### Configuración Básica

```sh
# Instalar Appium globalmente
npm install -g appium

# Instalar controladores
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Iniciar el servidor
appium
```

### Configuración Personalizada del Servidor

```sh
# Iniciar con host y puerto personalizados
appium --address 0.0.0.0 --port 4724

# Iniciar con registro
appium --log-level debug

# Iniciar con ruta base específica
appium --base-path /wd/hub
```

### Verificar Instalación

```sh
# Verificar controladores instalados
appium driver list --installed

# Verificar versión de Appium
appium --version

# Probar conexión
curl http://localhost:4723/status
```

---

## Solución de Problemas de Configuración

### El Servidor MCP No Inicia

1. Verifica que npm/npx está instalado: `npm --version`
2. Intenta ejecutarlo manualmente: `npx @wdio/mcp`
3. Revisa los registros de Claude Desktop para errores

### Problemas de Conexión con Appium

1. Verifica que Appium está ejecutándose: `curl http://localhost:4723/status`
2. Comprueba que las variables de entorno coincidan con la configuración del servidor Appium
3. Asegúrate de que el firewall permite conexiones en el puerto Appium

### La Sesión No Inicia

1. **Navegador:** Asegúrate de que Chrome está instalado
2. **iOS:** Verifica que Xcode y los simuladores están disponibles
3. **Android:** Comprueba `ANDROID_HOME` y que el emulador está ejecutándose
4. Revisa los registros del servidor Appium para mensajes de error detallados

### Tiempos de Espera de Sesión

Si las sesiones están agotando el tiempo de espera durante la depuración:
1. Aumenta `newCommandTimeout` al iniciar la sesión
2. Usa `noReset: true` para preservar el estado entre sesiones
3. Usa `detach: true` al cerrar para mantener la aplicación en ejecución