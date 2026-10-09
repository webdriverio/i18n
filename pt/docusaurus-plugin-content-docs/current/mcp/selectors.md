---
id: selectors
title: Seletores
description: "Escolha seletores para localizar elementos em páginas web e aplicativos móveis ao automatizar com o servidor MCP do WebdriverIO."
---

O servidor MCP do WebdriverIO oferece suporte a várias estratégias de seletores para localizar elementos em páginas web e aplicativos móveis.

:::info

Para uma documentação completa sobre seletores, incluindo todas as estratégias de seletores do WebdriverIO, consulte o guia principal de [Seletores](/docs/selectors). Esta página foca nos seletores mais usados com o servidor MCP.

:::

## Seletores Web

Para automação de navegador, o servidor MCP oferece suporte a todos os seletores padrão do WebdriverIO. Os mais usados incluem:

| Seletor  | Exemplo                        | Descrição                              |
| -------- | ------------------------------ | -------------------------------------- |
| CSS      | `#login-button`, `.submit-btn` | Seletores CSS padrão                   |
| XPath    | `//button[@id='submit']`       | Expressões XPath                       |
| Text     | `button=Submit`, `a*=Click`    | Seletores de texto do WebdriverIO      |
| ARIA     | `aria/Submit Button`           | Seletores por nome de acessibilidade   |
| Test ID  | `[data-testid="submit"]`       | Recomendado para testes                |

Para exemplos detalhados e boas práticas, consulte a documentação de [Seletores](/docs/selectors).

## Seletores Mobile

Os seletores mobile funcionam nas plataformas iOS e Android por meio do Appium.

### Accessibility ID (Recomendado)

Os Accessibility IDs são o **seletor multiplataforma mais confiável**. Eles funcionam tanto no iOS quanto no Android e permanecem estáveis entre atualizações do aplicativo.

```text
# Sintaxe
~accessibilityId

# Exemplos
~loginButton
~submitForm
~usernameField
```

:::tip Boa Prática
Sempre prefira accessibility IDs quando disponíveis. Eles oferecem:
- Compatibilidade multiplataforma (iOS + Android)
- Estabilidade diante de mudanças na interface
- Melhor manutenibilidade dos testes
- Melhor acessibilidade do seu aplicativo
:::

### Seletores Android

#### UiAutomator

Os seletores UiAutomator são poderosos e rápidos no Android.

```text
# Por Texto
android=new UiSelector().text("Login")

# Por Texto Parcial
android=new UiSelector().textContains("Log")

# Por Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Por Nome de Classe
android=new UiSelector().className("android.widget.Button")

# Por Descrição (Acessibilidade)
android=new UiSelector().description("Login button")

# Condições Combinadas
android=new UiSelector().className("android.widget.Button").text("Login")

# Contêiner Rolável
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Os Resource IDs fornecem uma identificação estável de elementos no Android.

```text
# Resource ID Completo
id=com.example.app:id/login_button

# ID Parcial (pacote do app inferido)
id=login_button
```

#### XPath (Android)

O XPath funciona no Android, mas é mais lento que o UiAutomator.

```text
# Por Classe e Texto
//android.widget.Button[@text='Login']

# Por Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Por Content Description
//android.widget.ImageButton[@content-desc='Menu']

# Hierárquico
//android.widget.LinearLayout/android.widget.Button[1]
```

### Seletores iOS

#### Predicate String

As Predicate Strings do iOS são rápidas e poderosas para automação no iOS.

```text
# Por Label
-ios predicate string:label == "Login"

# Por Label Parcial
-ios predicate string:label CONTAINS "Log"

# Por Name
-ios predicate string:name == "loginButton"

# Por Tipo
-ios predicate string:type == "XCUIElementTypeButton"

# Por Value
-ios predicate string:value == "ON"

# Condições Combinadas
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Visibilidade
-ios predicate string:label == "Login" AND visible == 1

# Sem Diferenciar Maiúsculas e Minúsculas
-ios predicate string:label ==[c] "login"
```

**Operadores de Predicate:**

| Operador     | Descrição                    |
| ------------ | ---------------------------- |
| `==`         | Igual a                      |
| `!=`         | Diferente de                 |
| `CONTAINS`   | Contém a substring           |
| `BEGINSWITH` | Começa com                   |
| `ENDSWITH`   | Termina com                  |
| `LIKE`       | Correspondência com curinga  |
| `MATCHES`    | Correspondência com regex    |
| `AND`        | E lógico                     |
| `OR`         | OU lógico                    |

#### Class Chain

As Class Chains do iOS fornecem localização hierárquica de elementos com bom desempenho.

```text
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

O XPath funciona no iOS, mas é mais lento que as predicate strings.

```text
# Por Tipo e Label
//XCUIElementTypeButton[@label='Login']

# Por Name
//XCUIElementTypeTextField[@name='username']

# Por Value
//XCUIElementTypeSwitch[@value='1']

# Hierárquico
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## Estratégia de Seletores Multiplataforma

Ao escrever testes que precisam funcionar tanto no iOS quanto no Android, use esta ordem de prioridade:

### 1. Accessibility ID (Melhor)

```text
# Funciona em ambas as plataformas
~loginButton
```

### 2. Específico da Plataforma com Lógica Condicional

Quando accessibility IDs não estiverem disponíveis, use seletores específicos da plataforma:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (Último Recurso)

O XPath funciona em ambas as plataformas, mas com tipos de elementos diferentes:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## Referência de Tipos de Elementos

### Tipos de Elementos Android

| Tipo                          | Descrição            |
| ----------------------------- | -------------------- |
| `android.widget.Button`       | Botão                |
| `android.widget.EditText`     | Campo de texto       |
| `android.widget.TextView`     | Rótulo de texto      |
| `android.widget.ImageView`    | Imagem               |
| `android.widget.ImageButton`  | Botão de imagem      |
| `android.widget.CheckBox`     | Caixa de seleção     |
| `android.widget.RadioButton`  | Botão de opção       |
| `android.widget.Switch`       | Interruptor          |
| `android.widget.Spinner`      | Menu suspenso        |
| `android.widget.ListView`     | Visualização de lista |
| `android.widget.RecyclerView` | Recycler view        |
| `android.widget.ScrollView`   | Contêiner de rolagem |

### Tipos de Elementos iOS

| Tipo                             | Descrição                  |
| -------------------------------- | -------------------------- |
| `XCUIElementTypeButton`          | Botão                      |
| `XCUIElementTypeTextField`       | Campo de texto             |
| `XCUIElementTypeSecureTextField` | Campo de senha             |
| `XCUIElementTypeStaticText`      | Rótulo de texto            |
| `XCUIElementTypeImage`           | Imagem                     |
| `XCUIElementTypeSwitch`          | Interruptor                |
| `XCUIElementTypeSlider`          | Controle deslizante        |
| `XCUIElementTypePicker`          | Seletor em roda            |
| `XCUIElementTypeTable`           | Visualização de tabela     |
| `XCUIElementTypeCell`            | Célula de tabela           |
| `XCUIElementTypeCollectionView`  | Visualização de coleção    |
| `XCUIElementTypeScrollView`      | Visualização de rolagem    |

## Boas Práticas

### Faça

- **Use accessibility IDs** para seletores estáveis e multiplataforma
- **Adicione atributos data-testid** aos elementos web para testes
- **Use resource IDs** no Android quando accessibility IDs não estiverem disponíveis
- **Prefira predicate strings** em vez de XPath no iOS
- **Mantenha os seletores simples** e específicos

### Não Faça

- **Evite expressões XPath longas** - elas são lentas e frágeis
- **Não dependa de índices** para listas dinâmicas
- **Evite seletores baseados em texto** em aplicativos localizados
- **Não use XPath absoluto** (começando pela raiz)

### Exemplos de Seletores Bons vs Ruins

```text
# Bom - Accessibility ID estável
~loginButton

# Ruim - XPath frágil com índices
//div[3]/form/button[2]

# Bom - CSS específico com test ID
[data-testid="submit-button"]

# Ruim - Classe que pode mudar
.btn-primary-lg-v2

# Bom - UiAutomator com resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Ruim - Texto que pode ser localizado
android=new UiSelector().text("Submit")
```

## Depurando Seletores

### Web (Chrome DevTools)

1. Abra o Chrome DevTools (F12)
2. Use o painel Elements para inspecionar elementos
3. Clique com o botão direito em um elemento → Copy → Copy selector
4. Teste os seletores no Console: `document.querySelector('your-selector')`

### Mobile (Appium Inspector)

1. Inicie o Appium Inspector
2. Conecte-se à sua sessão em execução
3. Clique nos elementos para ver todos os atributos disponíveis
4. Use o recurso "Search for element" para testar seletores

### Usando `get_elements`

A ferramenta `get_elements` do servidor MCP retorna várias estratégias de seletores para cada elemento:

```text
Ask: "Get all visible elements on the screen"
```

Isso retorna elementos com seletores pré-gerados que você pode usar diretamente.

#### Opções Avançadas

Para mais controle sobre a descoberta de elementos:

```text
# Obter apenas imagens e elementos visuais
Get visible elements with elementType "visual"

# Obter elementos com suas coordenadas para depuração de layout
Get visible elements with includeBounds enabled

# Obter os próximos 20 elementos (paginação)
Get visible elements with limit 20 and offset 20

# Incluir contêineres de layout para depuração
Get visible elements with includeContainers enabled
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

### Usando `get_accessibility` (Somente Navegador)

Para automação de navegador, a ferramenta `get_accessibility` fornece informações semânticas sobre os elementos da página:

```text
# Obter todos os nós de acessibilidade com nome
Get accessibility tree

# Filtrar apenas botões e links
Get accessibility tree filtered to button and link roles

# Obter a próxima página de resultados
Get accessibility tree with limit 50 and offset 50
```

Isso é útil quando `get_elements` não retorna os elementos esperados, pois consulta a API de acessibilidade nativa do navegador.