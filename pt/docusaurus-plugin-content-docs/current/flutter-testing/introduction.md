---
id: introduction
title: Introdução
description: "Obtenha uma visão geral dos testes end-to-end de aplicativos Flutter no Android e iOS com WebdriverIO, Appium e o Appium Flutter Driver."
---

Este guia aborda a configuração, estruturação e execução de testes End-to-End (E2E) para aplicativos **Flutter** usando **WebdriverIO** e **Appium**.

O WebdriverIO fornece um framework de testes baseado em Node.js com suporte nativo aos protocolos WebDriver e Appium, permitindo automatizar aplicativos Flutter tanto no Android quanto no iOS.

---

### O Desafio Arquitetural: Por que o Flutter é Diferente

Ao automatizar aplicativos móveis nativos padrão (Kotlin/Java no Android ou Swift/Objective-C no iOS), os drivers do Appium (`UiAutomator2` para Android, `XCUITest` para iOS) atuam como o ponto de acesso para inspecionar e interagir com o aplicativo, consultando a árvore de acessibilidade nativa do sistema operacional. Esses drivers leem os componentes de UI do sistema operacional (botões, campos de entrada, rótulos) e os expõem a ferramentas de inspeção e scripts de teste usando estratégias de localização padrão, como ID, Accessibility ID ou XPath.

O Flutter funciona de forma diferente:

O Flutter não utiliza os componentes de UI nativos do sistema operacional. Em vez disso, ele renderiza sua UI diretamente em um canvas renderizado por meio de um motor gráfico hospedado internamente. O framework desenha seus próprios widgets pixel por pixel.

#### Impacto na Automação Tradicional
Para drivers e inspetores nativos padrão, um aplicativo Flutter geralmente aparece como uma única superfície gráfica. Os widgets internos (como botões ou campos de texto) não existem na árvore de acessibilidade do sistema operacional por padrão. Como resultado, as estratégias de localização nativas padrão não conseguem interagir diretamente com os widgets internos do Flutter.

---

### Como o WebdriverIO e o Appium Lidam com o Flutter

O WebdriverIO e o Appium fornecem as ferramentas necessárias para interagir com a árvore de widgets interna do Flutter, mas você precisa instalar e configurar o driver e as extensões de localização apropriadas para o seu projeto.

Ao usar o [Appium Flutter Driver](https://github.com/appium/appium-flutter-driver), o Appium se conecta à extensão de testes do Flutter (`flutter_driver`). Isso dá acesso a estratégias de localização específicas do Flutter (Finders), incluindo:

* `byValueKey`: Localiza widgets pela sua `Key` explícita no código Flutter.
* `byText`: Localiza widgets pelo conteúdo de texto visível.
* `byTooltip`: Localiza widgets pelo texto do seu tooltip.

As seções a seguir abordam os pré-requisitos, a configuração do ambiente e a escrita da sua primeira suíte de testes.