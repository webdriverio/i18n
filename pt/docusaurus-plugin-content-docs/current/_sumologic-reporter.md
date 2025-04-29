---
id: sumologic-reporter
title: Relator do Sumologic
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Um relator WebdriverIO que envia resultados de testes para o [Sumologic](https://www.sumologic.com/) para análise de dados

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## Instalação

A maneira mais fácil é manter o `@wdio/sumologic-reporter` como uma devDependency no seu `package.json`, via:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted).

## Configuração

Primeiro, temos que criar um novo coletor que coleta todos os logs dos seus testes. Para fazer isso, clique em __Manage__ na barra de navegação e vá para __Collection__. Lá você precisa adicionar um novo "Hosted Collector". Aplique um nome adequado, por exemplo, "test integration logs", descrição e uma categoria, por exemplo, "wdio". Clique em Save para criar o coletor.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

O próximo passo é adicionar uma fonte. Faz sentido ter uma fonte própria para cada um dos seus ambientes (por exemplo, build de branch, integração). Clique no link "Add Source" ao lado do seu coletor e adicione uma __HTTP Source__. Aplique novamente um nome e descrição adequados e defina uma "Source Category" que reflita o ambiente. Deixe as outras opções no estado padrão e clique em save.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

Um modal aparece com o endpoint da fonte. Copie essa url e cole-a em seu wdio.conf.js para que o relator saiba para onde enviar os dados.

O código a seguir mostra a configuração padrão do executor de teste wdio. Basta adicionar `'sumologic'` como relator ao array e adicionar seu endpoint de origem:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

Depois de executar os primeiros testes com o relator, você deve ser capaz de verificar os logs de testes com a seguinte consulta:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Em breve fornecerei alguns modelos de dashboard úteis para o Sumologic.

----

Para mais informações sobre o WebdriverIO, consulte a [homepage](https://webdriver.io).