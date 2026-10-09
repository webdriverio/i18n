---
id: preserve-and-rerun
title: Preservar e Reexecutar (Comparar)
description: "Capture um snapshot de uma execução com falha e reexecute o teste com um clique usando Preservar e Reexecutar, depois compare as duas execuções para descobrir o que mudou."
---

Quando um teste falha, o ciclo habitual de depuração é: reexecutá-lo e depois comparar duas enormes quantidades de logs para descobrir o que mudou. O Preserve & Rerun reduz isso a um único clique. Ele **captura um snapshot da execução com falha e reexecuta o teste em uma única ação**, depois mostra as duas execuções lado a lado em uma visualização **Compare** alinhada comando por comando - assim você pode ver exatamente onde as duas divergiram sem precisar reler nada.

Esta é a maneira mais rápida de diagnosticar um teste instável (flaky): o comando que se comportou de forma diferente entre a execução bem-sucedida e a com falha é destacado para você, junto com a asserção que falhou.

Disponível nos três adaptadores - **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** e **[Nightwatch.js](/docs/devtools/nightwatch)**.

## Demonstração

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## Como funciona

1. Execute seus testes normalmente. Quando um teste terminar em estado de **falha**, passe o mouse sobre sua linha na barra lateral.
2. Um ícone de bug-play (🐞▶) aparece ao lado do botão ▶ de reexecução comum. Ele só aparece em linhas de testes/suítes com falha, onde quer que uma reexecução simples já seja suportada (por exemplo, cenários do Cucumber na linha do cenário, testes Mocha/Jasmine na linha do teste ou da suíte).
3. Clique nele. O DevTools captura um snapshot da execução com falha e, em seguida, reinicia apenas aquele teste.
4. A aba **Compare** é aberta com as duas execuções alinhadas por comando. O ponto de divergência e o erro de asserção (**Expected vs Received**) são destacados.

## Principais Recursos

- **Snapshot + reexecução com um clique** - Preserve a execução com falha e reexecute-a em uma única ação, sem alterações no código nem reinício de toda a suíte.
- **Alinhamento comando por comando** - As duas execuções são dispostas lado a lado e alinhadas por comando, para que as diferenças se destaquem instantaneamente.
- **Ponto de falha destacado** - Leva você diretamente ao comando em que as duas execuções divergiram.
- **Diff de asserção** - Mostra a asserção que falhou com Expected vs Received lado a lado.
- **Janela destacável** - Abra a comparação em uma janela separada e com tema para uma visualização mais espaçosa.
- **Triagem de testes instáveis** - Veja qual comando diferiu entre uma execução bem-sucedida e uma com falha sem precisar reler logs.

## Limitações

- **Cucumber**: a reexecução por step está desativada porque o filtro `--name` do Cucumber tem como alvo cenários, e não steps individuais do Gherkin. O Preserve & Rerun no nível do cenário continua funcionando.