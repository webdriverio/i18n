---
id: percy-overview
title: Desvendando o Percy - Uma Visão Geral
description: "Tenha uma visão geral dos testes visuais para sites e aplicativos móveis nativos com o Percy e o App Percy, e de como o Percy compara snapshots."
---

## Introdução

[Percy](https://percy.io/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) é uma plataforma completa de testes e revisão visual. Ela captura screenshots, compara-os com a baseline e destaca as alterações visuais. Com maior cobertura visual, as equipes podem implantar alterações de código com confiança a cada commit.

O WebdriverIO oferece suporte nativo a testes visuais cross-browser usando o Percy e o App Percy. Você pode usar o Percy para testes visuais de sites e aplicativos móveis nativos.
Os benefícios de utilizar o Percy para testes visuais incluem os seguintes:

- Consistência: Promove uma experiência de usuário consistente ao identificar discrepâncias visuais no início do processo de desenvolvimento.
- Eficiência: Melhora a eficiência ao reduzir o tempo e o esforço necessários para identificar manualmente regressões visuais.
- Integrações: O Percy se integra com ferramentas e serviços populares como GitHub, GitLab, Bitbucket e outros.
- Colaboração: Melhora a colaboração entre desenvolvedores, designers e equipes de QA ao fornecer uma representação visual das alterações.
- Prevenção de regressões: Evita que você enfrente regressões visuais não intencionais.

## Como o Percy funciona?

O Percy compara novos snapshots com as baselines relevantes para detectar alterações visuais. O Percy gerencia a seleção de baselines entre branches para que seus testes sejam sempre relevantes. Se alterações visuais forem detectadas, o Percy destaca e agrupa as diferenças resultantes para que você as revise.

## Próximos passos

- [Use o Percy para aplicações web](https://webdriver.io/docs/visual-testing/integrate-with-percy)
- [Use o App Percy para aplicativos móveis](https://webdriver.io/docs/visual-testing/integrate-with-app-percy)