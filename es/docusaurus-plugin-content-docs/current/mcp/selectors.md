---
id: selectors
title: Selectores
---

El servidor MCP de WebdriverIO admite múltiples estrategias de selectores para localizar elementos en páginas web y aplicaciones móviles.

:::info

Para una documentación completa sobre selectores, incluyendo todas las estrategias de selectores de WebdriverIO, consulta la guía principal de [Selectores](/docs/selectors). Esta página se centra en los selectores comúnmente utilizados con el servidor MCP.

:::

## Selectores Web

Para la automatización de navegadores, el servidor MCP admite todos los selectores estándar de WebdriverIO. Los más utilizados incluyen:

| Selector | Ejemplo | Descripción |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Selectores CSS estándar |
| XPath | `//button[@id='submit']` | Expresiones XPath |
| Texto | `button=Submit`, `a*=Click` | Selectores de texto de WebdriverIO |
| ARIA | `aria/Submit Button` | Selectores de nombre de accesibilidad |
| Test ID | `[data-testid="submit"]` | Recomendado para pruebas |

Para ejemplos detallados y mejores prácticas, consulta la documentación de [Selectores](/docs/selectors).

---

## Selectores Móviles

Los selectores móviles funcionan con plataformas iOS y Android a través de Appium.

### Accessibility ID (Recomendado)

Los Accessibility IDs son el **selector multiplataforma más confiable**. Funcionan tanto en iOS como en Android y son estables a través de actualizaciones de la aplicación.

```
# Sintaxis
~accessibilityId

# Ejemplos
~loginButton
~submitForm
~usernameField
```

:::tip Mejor Práctica
Siempre prefiere los accessibility IDs cuando estén disponibles. Proporcionan:
- Compatibilidad multiplataforma (iOS + Android)
- Estabilidad durante cambios de UI
- Mejor mantenibilidad de pruebas
- Mejora de la accesibilidad de tu aplicación
:::

### Selectores Android

#### UiAutomator

Los selectores UiAutomator son potentes y rápidos para Android.

```
# Por Texto
android=new UiSelector().text("Login")

# Por Texto Parcial
android=new UiSelector().textContains("Log")

# Por Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Por Nombre de Clase
android=new UiSelector().className("android.widget.Button")

# Por Descripción (Accesibilidad)
android=new UiSelector().description("Login button")

# Condiciones Combinadas
android=new UiSelector().className("android.widget.Button").text("Login")

# Contenedor Desplazable
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Los Resource IDs proporcionan identificación estable de elementos en Android.

```
# Resource ID Completo
id=com.example.app:id/login_button

# ID Parcial (paquete de la app inferido)
id=login_button
```

#### XPath (Android)

XPath funciona en Android pero es más lento que UiAutomator.

```
# Por Clase y Texto
//android.widget.Button[@text='Login']

# Por Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Por Descripción de Contenido
//android.widget.ImageButton[@content-desc='Menu']

# Jerárquico
//android.widget.LinearLayout/android.widget.Button[1]
```

### Selectores iOS

#### Predicate String

Los Predicate Strings de iOS son rápidos y potentes para la automatización de iOS.

```
# Por Etiqueta
-ios predicate string:label == "Login"

# Por Etiqueta Parcial
-ios predicate string:label CONTAINS "Log"

# Por Nombre
-ios predicate string:name == "loginButton"

# Por Tipo
-ios predicate string:type == "XCUIElementTypeButton"

# Por Valor
-ios predicate string:value == "ON"

# Condiciones Combinadas
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Visibilidad
-ios predicate string:label == "Login" AND visible == 1

# Insensible a Mayúsculas/Minúsculas
-ios predicate string:label ==[c] "login"
```

**Operadores de Predicado:**

| Operador | Descripción |
|----------|-------------|
| `==` | Igual |
| `!=` | No igual |
| `CONTAINS` | Contiene subcadena |
| `BEGINSWITH` | Comienza con |
| `ENDSWITH` | Termina con |
| `LIKE` | Coincidencia con comodín |
| `MATCHES` | Coincidencia con regex |
| `AND` | AND lógico |
| `OR` | OR lógico |

#### Class Chain

Las Class Chains de iOS proporcionan ubicación jerárquica de elementos con buen rendimiento.

```
# Hijo Directo
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Cualquier Descendiente
-ios class chain:**/XCUIElementTypeButton

# Por Índice
-ios class chain:**/XCUIElementTypeCell[3]

# Combinado con Predicado
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Jerárquico
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Último Elemento
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath funciona en iOS pero es más lento que los predicate strings.

```
# Por Tipo y Etiqueta
//XCUIElementTypeButton[@label='Login']

# Por Nombre
//XCUIElementTypeTextField[@name='username']

# Por Valor
//XCUIElementTypeSwitch[@value='1']

# Jerárquico
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Estrategia de Selectores Multiplataforma

Al escribir pruebas que necesiten funcionar tanto en iOS como en Android, usa este orden de prioridad:

### 1. Accessibility ID (Mejor)

```
# Funciona en ambas plataformas
~loginButton
```

### 2. Específico de Plataforma con Lógica Condicional

Cuando los accessibility IDs no estén disponibles, usa selectores específicos de plataforma:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Último Recurso)

XPath funciona en ambas plataformas pero con diferentes tipos de elementos:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Referencia de Tipos de Elementos

### Tipos de Elementos Android

| Tipo | Descripción |
|------|-------------|
| `android.widget.Button` | Botón |
| `android.widget.EditText` | Entrada de texto |
| `android.widget.TextView` | Etiqueta de texto |
| `android.widget.ImageView` | Imagen |
| `android.widget.ImageButton` | Botón de imagen |
| `android.widget.CheckBox` | Casilla de verificación |
| `android.widget.RadioButton` | Botón de radio |
| `android.widget.Switch` | Interruptor |
| `android.widget.Spinner` | Desplegable |
| `android.widget.ListView` | Vista de lista |
| `android.widget.RecyclerView` | Vista recicladora |
| `android.widget.ScrollView` | Contenedor de desplazamiento |

### Tipos de Elementos iOS

| Tipo | Descripción |
|------|-------------|
| `XCUIElementTypeButton` | Botón |
| `XCUIElementTypeTextField` | Entrada de texto |
| `XCUIElementTypeSecureTextField` | Entrada de contraseña |
| `XCUIElementTypeStaticText` | Etiqueta de texto |
| `XCUIElementTypeImage` | Imagen |
| `XCUIElementTypeSwitch` | Interruptor |
| `XCUIElementTypeSlider` | Control deslizante |
| `XCUIElementTypePicker` | Selector |
| `XCUIElementTypeTable` | Vista de tabla |
| `XCUIElementTypeCell` | Celda de tabla |
| `XCUIElementTypeCollectionView` | Vista de colección |
| `XCUIElementTypeScrollView` | Vista de desplazamiento |

---

## Mejores Prácticas

### Hacer

- **Usar accessibility IDs** para selectores estables y multiplataforma
- **Añadir atributos data-testid** a elementos web para pruebas
- **Usar resource IDs** en Android cuando los accessibility IDs no estén disponibles
- **Preferir predicate strings** sobre XPath en iOS
- **Mantener los selectores simples** y específicos

### No Hacer

- **Evitar expresiones XPath largas** - son lentas y frágiles
- **No depender de índices** para listas dinámicas
- **Evitar selectores basados en texto** para apps localizadas
- **No usar XPath absoluto** (comenzando desde la raíz)

### Ejemplos de Buenos vs Malos Selectores

```
# Bueno - ID de accesibilidad estable
~loginButton

# Malo - XPath frágil con índices
//div[3]/form/button[2]

# Bueno - CSS específico con test ID
[data-testid="submit-button"]

# Malo - Clase que podría cambiar
.btn-primary-lg-v2

# Bueno - UiAutomator con resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Malo - Texto que podría estar localizado
android=new UiSelector().text("Submit")
```

---

## Depuración de Selectores

### Web (Chrome DevTools)

1. Abre Chrome DevTools (F12)
2. Usa el panel Elements para inspeccionar elementos
3. Haz clic derecho en un elemento → Copiar → Copiar selector
4. Prueba los selectores en la Consola: `document.querySelector('tu-selector')`

### Móvil (Appium Inspector)

1. Inicia Appium Inspector
2. Conéctate a tu sesión en ejecución
3. Haz clic en elementos para ver todos los atributos disponibles
4. Usa la función "Search for element" para probar selectores

### Usando `get_visible_elements`

La herramienta `get_visible_elements` del servidor MCP devuelve múltiples estrategias de selectores para cada elemento:

```
Ask Claude: "Get all visible elements on the screen"
```

Esto devuelve elementos con selectores pre-generados que puedes usar directamente.

#### Opciones Avanzadas

Para más control sobre el descubrimiento de elementos:

```
# Obtener solo imágenes y elementos visuales
Get visible elements with elementType "visual"

# Obtener elementos con sus coordenadas para depuración de diseño
Get visible elements with includeBounds enabled

# Obtener los siguientes 20 elementos (paginación)
Get visible elements with limit 20 and offset 20

# Incluir contenedores de diseño para depuración
Get visible elements with includeContainers enabled
```

La herramienta devuelve una respuesta paginada:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Usando `get_accessibility` (Solo Navegador)

Para automatización de navegador, la herramienta `get_accessibility` proporciona información semántica sobre elementos de la página:

```
# Obtener todos los nodos de accesibilidad con nombre
Get accessibility tree

# Filtrar solo a botones y enlaces
Get accessibility tree filtered to button and link roles

# Obtener siguiente página de resultados
Get accessibility tree with limit 50 and offset 50
```

Esto es útil cuando `get_visible_elements` no devuelve los elementos esperados, ya que consulta la API nativa de accesibilidad del navegador.