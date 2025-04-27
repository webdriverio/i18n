---
id: percy-overview
title: Desbloqueando o Percy - Uma Visão Geral
---

## Introduction

[Percy](https://percy.io/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) é uma plataforma completa de teste visual e revisão. Ele captura capturas de tela, compara-as com a linha de base e destaca alterações visuais. Com maior cobertura visual, as equipes podem implantar alterações de código com confiança a cada commit.

O WebdriverIO suporta nativamente testes visuais entre navegadores usando Percy e App Percy. Você pode usar o Percy para testes visuais de sites e aplicativos móveis nativos.
Os benefícios de utilizar o Percy para testes visuais incluem:

- Consistência: Promove uma experiência de usuário consistente, identificando discrepâncias visuais no início do processo de desenvolvimento.
- Eficiência: Melhora a eficiência reduzindo o tempo e esforço necessários para detectar manualmente regressões visuais.
- Integrações: O Percy se integra com ferramentas e serviços populares como GitHub, GitLab, Bitbucket e outros.
- Colaboração: Melhora a colaboração entre desenvolvedores, designers e equipes de QA, fornecendo uma representação visual das alterações.
- Prevenção de regressão: Evita que você experimente regressões visuais não intencionais.

## How does Percy work?

O Percy compara novos snapshots com linhas de base relevantes para detectar alterações visuais. O Percy gerencia a seleção de linha de base em diferentes branches, garantindo que seus testes sejam sempre relevantes. Se alterações visuais forem detectadas, o Percy destaca e agrupa as diferenças resultantes para sua revisão.

## Next steps

- [Use Percy for web applications](https://webdriver.io/docs/visual-testing/integrate-with-percy)
- [Use App Percy for mobile applications](https://webdriver.io/docs/visual-testing/integrate-with-app-percy)