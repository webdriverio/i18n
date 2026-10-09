---
id: selectors
title: Selectores
description: "Elige selectores para localizar elementos en páginas web y aplicaciones móviles al automatizar con el servidor MCP de WebdriverIO."
---

El servidor MCP de WebdriverIO admite múltiples estrategias de selectores para localizar elementos en páginas web y aplicaciones móviles.

:::info

Para obtener documentación completa sobre selectores, incluidas todas las estrategias de selectores de WebdriverIO, consulta la guía principal de [Selectores](/docs/selectors). Esta página se centra en los selectores que se usan habitualmente con el servidor MCP.

:::

## Selectores web

Para la automatización de navegadores, el servidor MCP admite todos los selectores estándar de WebdriverIO. Los más utilizados incluyen:

| Selector | Ejemplo                        | Descripción                          |
| -------- | ------------------------------ | ------------------------------------ |
| CSS      | `#login-button`, `.submit-btn` | Selectores CSS estándar              |
| XPath    | `//button[@id='submit']`       | Expresiones XPath                    |
| Texto    | `button=Submit`, `a*=Click`    | Selectores de texto de WebdriverIO   |
| ARIA     | `aria/Submit Button`           | Selectores por nombre accesible      |
| Test ID  | `[data-testid="submit"]`       | Recomendado para pruebas             |

Para ver ejemplos detallados y buenas prácticas, consulta la documentación de [Selectores](/docs/selectors).

## Selectores móviles

Los selectores móviles funcionan tanto en plataformas iOS como Android a través de Appium.

### Accessibility ID (recomendado)

Los Accessibility IDs son el **selector multiplataforma más fiable**. Funcionan tanto en iOS como en Android y se mantienen estables entre actualizaciones de la aplicación.

```text
# Sintaxis
~accessibilityId

# Ejemplos
~loginButton
~submitForm
~usernameField
```

:::tip Buena práctica
Prefiere siempre los Accessibility IDs cuando estén disponibles. Proporcionan:
- Compatibilidad multiplataforma (iOS + Android)
- Estabilidad ante cambios en la interfaz
- Mejor mantenibilidad de las pruebas
- Mejor accesibilidad de tu aplicación
:::

### Selectores de Android

#### UiAutomator

Los selectores de UiAutomator son potentes y rápidos en Android.

```text
# Por texto
android=new UiSelector().text("Login")

# Por texto parcial
android=new UiSelector().textContains("Log")

# Por Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Por nombre de clase
android=new UiSelector().className("android.widget.Button")

# Por descripción (accesibilidad)
android=new UiSelector().description("Login button")

# Condiciones combinadas
android=new UiSelector().className("android.widget.Button").text("Login")

# Contenedor desplazable
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Los Resource IDs proporcionan una identificación estable de elementos en Android.

```text
# Resource ID completo
id=com.example.app:id/login_button

# ID parcial (se infiere el paquete de la app)
id=login_button
```

#### XPath (Android)

XPath funciona en Android, pero es más lento que UiAutomator.

```text
# Por clase y texto
//android.widget.Button[@text='Login']

# Por Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Por Content Description
//android.widget.ImageButton[@content-desc='Menu']

# Jerárquico
//android.widget.LinearLayout/android.widget.Button[1]
```

### Selectores de iOS

#### Predicate String

Los Predicate Strings de iOS son rápidos y potentes para la automatización en iOS.

```text
# Por label
-ios predicate string:label == "Login"

# Por label parcial
-ios predicate string:label CONTAINS "Log"

# Por name
-ios predicate string:name == "loginButton"

# Por tipo
-ios predicate string:type == "XCUIElementTypeButton"

# Por valor
-ios predicate string:value == "ON"

# Condiciones combinadas
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Visibilidad
-ios predicate string:label == "Login" AND visible == 1

# Sin distinguir mayúsculas y minúsculas
-ios predicate string:label ==[c] "login"
```

**Operadores de predicado:**

| Operador     | Descripción                 |
| ------------ | --------------------------- |
| `==`         | Igual a                     |
| `!=`         | Distinto de                 |
| `CONTAINS`   | Contiene la subcadena       |
| `BEGINSWITH` | Empieza por                 |
| `ENDSWITH`   | Termina en                  |
| `LIKE`       | Coincidencia con comodines  |
| `MATCHES`    | Coincidencia con regex      |
| `AND`        | AND lógico                  |
| `OR`         | OR lógico                   |

#### Class Chain

Los Class Chains de iOS permiten localizar elementos de forma jerárquica con un buen rendimiento.

```text
# Hijo directo
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Cualquier descendiente
-ios class chain:**/XCUIElementTypeButton

# Por índice
-ios class chain:**/XCUIElementTypeCell[3]

# Combinado con predicado
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Jerárquico
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Último elemento
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath funciona en iOS, pero es más lento que los Predicate Strings.

```text
# Por tipo y label
//XCUIElementTypeButton[@label='Login']

# Por name
//XCUIElementTypeTextField[@name='username']

# Por valor
//XCUIElementTypeSwitch[@value='1']

# Jerárquico
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## Estrategia de selectores multiplataforma

Al escribir pruebas que deben funcionar tanto en iOS como en Android, utiliza este orden de prioridad:

### 1. Accessibility ID (la mejor opción)

```text
# Funciona en ambas plataformas
~loginButton
```

### 2. Específicos de plataforma con lógica condicional

Cuando no haya Accessibility IDs disponibles, utiliza selectores específicos de cada plataforma:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (último recurso)

XPath funciona en ambas plataformas, pero con tipos de elementos diferentes:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## Referencia de tipos de elementos

### Tipos de elementos de Android

| Tipo                          | Descripción               |
| ----------------------------- | ------------------------- |
| `android.widget.Button`       | Botón                     |
| `android.widget.EditText`     | Campo de texto            |
| `android.widget.TextView`     | Etiqueta de texto         |
| `android.widget.ImageView`    | Imagen                    |
| `android.widget.ImageButton`  | Botón de imagen           |
| `android.widget.CheckBox`     | Casilla de verificación   |
| `android.widget.RadioButton`  | Botón de opción           |
| `android.widget.Switch`       | Interruptor               |
| `android.widget.Spinner`      | Menú desplegable          |
| `android.widget.ListView`     | Vista de lista            |
| `android.widget.RecyclerView` | Recycler view             |
| `android.widget.ScrollView`   | Contenedor desplazable    |

### Tipos de elementos de iOS

| Tipo                             | Descripción          |
| -------------------------------- | -------------------- |
| `XCUIElementTypeButton`          | Botón                |
| `XCUIElementTypeTextField`       | Campo de texto       |
| `XCUIElementTypeSecureTextField` | Campo de contraseña  |
| `XCUIElementTypeStaticText`      | Etiqueta de texto    |
| `XCUIElementTypeImage`           | Imagen               |
| `XCUIElementTypeSwitch`          | Interruptor          |
| `XCUIElementTypeSlider`          | Control deslizante   |
| `XCUIElementTypePicker`          | Rueda de selección   |
| `XCUIElementTypeTable`           | Vista de tabla       |
| `XCUIElementTypeCell`            | Celda de tabla       |
| `XCUIElementTypeCollectionView`  | Collection view      |
| `XCUIElementTypeScrollView`      | Vista desplazable    |

## Buenas prácticas

### Qué hacer

- **Usa Accessibility IDs** para obtener selectores estables y multiplataforma
- **Añade atributos data-testid** a los elementos web para las pruebas
- **Usa Resource IDs** en Android cuando no haya Accessibility IDs disponibles
- **Prefiere los Predicate Strings** frente a XPath en iOS
- **Mantén los selectores simples** y específicos

### Qué no hacer

- **Evita expresiones XPath largas**: son lentas y frágiles
- **No dependas de índices** en listas dinámicas
- **Evita selectores basados en texto** en aplicaciones localizadas
- **No uses XPath absolutos** (que empiezan desde la raíz)

### Ejemplos de selectores buenos y malos

```text
# Bueno - Accessibility ID estable
~loginButton

# Malo - XPath frágil con índices
//div[3]/form/button[2]

# Bueno - CSS específico con test ID
[data-testid="submit-button"]

# Malo - Clase que podría cambiar
.btn-primary-lg-v2

# Bueno - UiAutomator con Resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Malo - Texto que podría estar localizado
android=new UiSelector().text("Submit")
```

## Depuración de selectores

### Web (Chrome DevTools)

1. Abre Chrome DevTools (F12)
2. Usa el panel Elements para inspeccionar elementos
3. Haz clic derecho en un elemento → Copy → Copy selector
4. Prueba los selectores en la consola: `document.querySelector('your-selector')`

### Móvil (Appium Inspector)

1. Inicia Appium Inspector
2. Conéctate a tu sesión en ejecución
3. Haz clic en los elementos para ver todos los atributos disponibles
4. Usa la función "Search for element" para probar selectores

### Uso de `get_elements`

La herramienta `get_elements` del servidor MCP devuelve múltiples estrategias de selectores para cada elemento:

```text
Ask: "Get all visible elements on the screen"
```

Esto devuelve elementos con selectores pregenerados que puedes usar directamente.

#### Opciones avanzadas

Para tener más control sobre la detección de elementos:

```text
# Obtener solo imágenes y elementos visuales
Get visible elements with elementType "visual"

# Obtener elementos con sus coordenadas para depurar el diseño
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

### Uso de `get_accessibility` (solo navegador)

Para la automatización de navegadores, la herramienta `get_accessibility` proporciona información semántica sobre los elementos de la página:

```text
# Obtener todos los nodos de accesibilidad con nombre
Get accessibility tree

# Filtrar solo botones y enlaces
Get accessibility tree filtered to button and link roles

# Obtener la siguiente página de resultados
Get accessibility tree with limit 50 and offset 50
```

Esto resulta útil cuando `get_elements` no devuelve los elementos esperados, ya que consulta la API de accesibilidad nativa del navegador.