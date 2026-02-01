---
id: selectors
title: Seletores
---

O servidor MCP do WebdriverIO suporta múltiplas estratégias de seletores para localizar elementos em páginas web e aplicativos móveis.

:::info

Para documentação completa de seletores, incluindo todas as estratégias de seletores do WebdriverIO, consulte o guia principal [Seletores](/docs/selectors). Esta página concentra-se nos seletores comumente usados com o servidor MCP.

:::

## Seletores Web

Para automação de navegador, o servidor MCP suporta todos os seletores padrão do WebdriverIO. Os mais comumente usados incluem:

| Seletor | Exemplo | Descrição |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Seletores CSS padrão |
| XPath | `//button[@id='submit']` | Expressões XPath |
| Texto | `button=Submit`, `a*=Click` | Seletores de texto do WebdriverIO |
| ARIA | `aria/Submit Button` | Seletores de nome de acessibilidade |
| Test ID | `[data-testid="submit"]` | Recomendado para testes |

Para exemplos detalhados e melhores práticas, consulte a documentação de [Seletores](/docs/selectors).

---

## Seletores Móveis

Os seletores móveis funcionam com plataformas iOS e Android através do Appium.

### Accessibility ID (Recomendado)

Os Accessibility IDs são o **seletor multiplataforma mais confiável**. Funcionam tanto no iOS quanto no Android e são estáveis durante atualizações do aplicativo.

```
# Sintaxe
~accessibilityId

# Exemplos
~loginButton
~submitForm
~usernameField
```

:::tip Melhores Práticas
Sempre prefira accessibility IDs quando disponíveis. Eles fornecem:
- Compatibilidade multiplataforma (iOS + Android)
- Estabilidade durante mudanças de UI
- Melhor manutenção de testes
- Melhor acessibilidade para seu aplicativo
:::

### Seletores Android

#### UiAutomator

Seletores UiAutomator são poderosos e rápidos para Android.

```
# Por Texto
android=new UiSelector().text("Login")

# Por Texto Parcial
android=new UiSelector().textContains("Log")

# Por Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Por Nome da Classe
android=new UiSelector().className("android.widget.Button")

# Por Descrição (Acessibilidade)
android=new UiSelector().description("Login button")

# Condições Combinadas
android=new UiSelector().className("android.widget.Button").text("Login")

# Container Rolável
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Os Resource IDs fornecem identificação estável de elementos no Android.

```
# Resource ID Completo
id=com.example.app:id/login_button

# ID Parcial (pacote do aplicativo inferido)
id=login_button
```

#### XPath (Android)

XPath funciona no Android, mas é mais lento que UiAutomator.

```
# Por Classe e Texto
//android.widget.Button[@text='Login']

# Por Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Por Descrição de Conteúdo
//android.widget.ImageButton[@content-desc='Menu']

# Hierárquico
//android.widget.LinearLayout/android.widget.Button[1]
```

### Seletores iOS

#### Predicate String

Predicate Strings do iOS são rápidos e poderosos para automação iOS.

```
# Por Label
-ios predicate string:label == "Login"

# Por Label Parcial
-ios predicate string:label CONTAINS "Log"

# Por Nome
-ios predicate string:name == "loginButton"

# Por Tipo
-ios predicate string:type == "XCUIElementTypeButton"

# Por Valor
-ios predicate string:value == "ON"

# Condições Combinadas
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Visibilidade
-ios predicate string:label == "Login" AND visible == 1

# Insensível a Maiúsculas
-ios predicate string:label ==[c] "login"
```

**Operadores de Predicate:**

| Operador | Descrição |
|----------|-------------|
| `==` | Igual |
| `!=` | Diferente |
| `CONTAINS` | Contém substring |
| `BEGINSWITH` | Começa com |
| `ENDSWITH` | Termina com |
| `LIKE` | Correspondência com curinga |
| `MATCHES` | Correspondência com regex |
| `AND` | E lógico |
| `OR` | OU lógico |

#### Class Chain

iOS Class Chains fornecem localização hierárquica de elementos com bom desempenho.

```
# Filho Direto
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Qualquer Descendente
-ios class chain:**/XCUIElementTypeButton

# Por Índice
-ios class chain:**/XCUIElementTypeCell[3]

# Combinado com Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Hierárquico
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Último Elemento
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath funciona no iOS, mas é mais lento que predicate strings.

```
# Por Tipo e Label
//XCUIElementTypeButton[@label='Login']

# Por Nome
//XCUIElementTypeTextField[@name='username']

# Por Valor
//XCUIElementTypeSwitch[@value='1']

# Hierárquico
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Estratégia de Seletor Multiplataforma

Ao escrever testes que precisam funcionar tanto em iOS quanto em Android, use esta ordem de prioridade:

### 1. Accessibility ID (Melhor)

```
# Funciona em ambas plataformas
~loginButton
```

### 2. Específico da Plataforma com Lógica Condicional

Quando accessibility IDs não estão disponíveis, use seletores específicos da plataforma:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Último Recurso)

XPath funciona em ambas as plataformas, mas com diferentes tipos de elementos:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Referência de Tipos de Elementos

### Tipos de Elementos Android

| Tipo | Descrição |
|------|-------------|
| `android.widget.Button` | Botão |
| `android.widget.EditText` | Entrada de texto |
| `android.widget.TextView` | Rótulo de texto |
| `android.widget.ImageView` | Imagem |
| `android.widget.ImageButton` | Botão de imagem |
| `android.widget.CheckBox` | Caixa de seleção |
| `android.widget.RadioButton` | Botão de rádio |
| `android.widget.Switch` | Interruptor |
| `android.widget.Spinner` | Menu suspenso |
| `android.widget.ListView` | Visualização de lista |
| `android.widget.RecyclerView` | Visualização reciclável |
| `android.widget.ScrollView` | Container de rolagem |

### Tipos de Elementos iOS

| Tipo | Descrição |
|------|-------------|
| `XCUIElementTypeButton` | Botão |
| `XCUIElementTypeTextField` | Entrada de texto |
| `XCUIElementTypeSecureTextField` | Entrada de senha |
| `XCUIElementTypeStaticText` | Rótulo de texto |
| `XCUIElementTypeImage` | Imagem |
| `XCUIElementTypeSwitch` | Interruptor |
| `XCUIElementTypeSlider` | Controle deslizante |
| `XCUIElementTypePicker` | Roda seletora |
| `XCUIElementTypeTable` | Visualização de tabela |
| `XCUIElementTypeCell` | Célula de tabela |
| `XCUIElementTypeCollectionView` | Visualização de coleção |
| `XCUIElementTypeScrollView` | Visualização de rolagem |

---

## Melhores Práticas

### Faça

- **Use accessibility IDs** para seletores estáveis e multiplataforma
- **Adicione atributos data-testid** a elementos web para testes
- **Use resource IDs** no Android quando accessibility IDs não estiverem disponíveis
- **Prefira predicate strings** em vez de XPath no iOS
- **Mantenha os seletores simples** e específicos

### Não Faça

- **Evite expressões XPath longas** - são lentas e frágeis
- **Não confie em índices** para listas dinâmicas
- **Evite seletores baseados em texto** para aplicativos localizados
- **Não use XPath absoluto** (começando da raiz)

### Exemplos de Bons vs Maus Seletores

```
# Bom - ID de acessibilidade estável
~loginButton

# Mau - XPath frágil com índices
//div[3]/form/button[2]

# Bom - CSS específico com ID de teste
[data-testid="submit-button"]

# Mau - Classe que pode mudar
.btn-primary-lg-v2

# Bom - UiAutomator com resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Mau - Texto que pode ser localizado
android=new UiSelector().text("Submit")
```

---

## Depurando Seletores

### Web (Chrome DevTools)

1. Abra o Chrome DevTools (F12)
2. Use o painel Elements para inspecionar elementos
3. Clique com o botão direito em um elemento → Copiar → Copiar seletor
4. Teste seletores no Console: `document.querySelector('seu-seletor')`

### Mobile (Appium Inspector)

1. Inicie o Appium Inspector
2. Conecte-se à sua sessão em execução
3. Clique nos elementos para ver todos os atributos disponíveis
4. Use o recurso "Buscar elemento" para testar seletores

### Usando `get_visible_elements`

A ferramenta `get_visible_elements` do servidor MCP retorna múltiplas estratégias de seletor para cada elemento:

```
Pergunte ao Claude: "Obtenha todos os elementos visíveis na tela"
```

Isso retorna elementos com seletores pré-gerados que você pode usar diretamente.

#### Opções Avançadas

Para mais controle sobre a descoberta de elementos:

```
# Obter apenas imagens e elementos visuais
Obtenha elementos visíveis com elementType "visual"

# Obter elementos com suas coordenadas para depuração de layout
Obtenha elementos visíveis com includeBounds ativado

# Obter os próximos 20 elementos (paginação)
Obtenha elementos visíveis com limite 20 e offset 20

# Incluir contêineres de layout para depuração
Obtenha elementos visíveis com includeContainers ativado
```

A ferramenta retorna uma resposta paginada:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Usando `get_accessibility` (Apenas Navegador)

Para automação de navegador, a ferramenta `get_accessibility` fornece informações semânticas sobre elementos da página:

```
# Obter todos os nós de acessibilidade nomeados
Obtenha a árvore de acessibilidade

# Filtrar apenas para botões e links
Obtenha a árvore de acessibilidade filtrada para funções de botão e link

# Obter próxima página de resultados
Obtenha a árvore de acessibilidade com limite 50 e offset 50
```

Isso é útil quando `get_visible_elements` não retorna os elementos esperados, pois consulta a API de acessibilidade nativa do navegador.