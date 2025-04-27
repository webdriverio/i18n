---
id: cli-wizard
title: Assistente de CLI
---

Você pode validar qual texto pode ser encontrado em uma imagem sem executar um teste usando o Assistente de CLI OCR. As únicas coisas necessárias são:

-   você ter instalado o `@wdio/ocr-service` como dependência, veja [Primeiros Passos](./getting-started)
-   uma imagem que você deseja processar

Em seguida, execute o seguinte comando para iniciar o assistente

```sh
npx ocr-service
```

Isso iniciará um assistente que o guiará pelas etapas para selecionar uma imagem e usar um haystack mais o modo avançado. As seguintes perguntas são feitas

## Como você gostaria de especificar o arquivo?

As seguintes opções podem ser selecionadas

-   Usar um "explorador de arquivos"
-   Digitar o caminho do arquivo manualmente

### Usar um "explorador de arquivos"

O assistente de CLI fornece uma opção para usar um "explorador de arquivos" para procurar arquivos em seu sistema. Ele começa a partir da pasta de onde você chama o comando. Após selecionar uma imagem (use as teclas de seta e a tecla ENTER), você prosseguirá para a próxima pergunta

### Digitar o caminho do arquivo manualmente

Este é um caminho direto para um arquivo em algum lugar da sua máquina local

### Você gostaria de usar um haystack?

Aqui você tem a opção de selecionar uma área que precisa ser processada. Isso pode acelerar o processo ou reduzir/diminuir a quantidade de texto que o mecanismo OCR pode encontrar. Você precisa fornecer dados de `x`, `y`, `width`, `height` com base nas seguintes perguntas:

-   Digite a coordenada x:
-   Digite a coordenada y:
-   Digite a largura:
-   Digite a altura:

## Você quer usar o modo avançado?

O modo avançado terá recursos extras como:

-   configuração do contraste
-   mais recursos no futuro

## Demonstração

Aqui está uma demonstração

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>