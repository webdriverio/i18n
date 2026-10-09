---
id: cli-wizard
title: Assistente CLI
description: "Verifique qual texto o serviço de OCR consegue encontrar em uma imagem sem executar um teste, usando o assistente CLI de OCR."
---

Você pode validar qual texto pode ser encontrado em uma imagem sem executar um teste usando o Assistente CLI de OCR. As únicas coisas necessárias são:

-   ter instalado o `@wdio/ocr-service` como dependência, veja [Primeiros Passos](./getting-started)
-   uma imagem que você deseja processar

Em seguida, execute o seguinte comando para iniciar o assistente

```sh
npx ocr-service
```

Isso iniciará um assistente que guiará você pelas etapas para selecionar uma imagem e usar um haystack, além do modo avançado. As seguintes perguntas são feitas

## How would you like to specify the file?

As seguintes opções podem ser selecionadas

-   Use a "file explorer"
-   Type the file path manually

### Use a "file explorer"

O assistente CLI oferece uma opção para usar um "explorador de arquivos" para procurar arquivos no seu sistema. Ele começa a partir da pasta onde você executa o comando. Após selecionar uma imagem (use as setas do teclado e a tecla ENTER), você seguirá para a próxima pergunta

### Type the file path manually

Este é um caminho direto para um arquivo em algum lugar da sua máquina local

### Would you like to use a haystack?

Aqui você tem a opção de selecionar uma área que precisa ser processada. Isso pode acelerar o processo ou reduzir/limitar a quantidade de texto que o mecanismo de OCR pode encontrar. Você precisa fornecer os dados `x`, `y`, `width`, `height` com base nas seguintes perguntas:

-   Enter the x coordinate:
-   Enter the y coordinate:
-   Enter the width:
-   Enter the height:

## Do you want to use the advanced mode?

O modo avançado conterá recursos extras como:

-   definir o contraste
-   mais recursos virão no futuro

## Demonstração

Aqui está uma demonstração

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>