---
id: faq
title: FAQ
description: "Encontre respostas para perguntas comuns sobre testes visuais, como atualizar baselines, corrigir erros de instalação do canvas e atualizar para a v10."
---

### Preciso usar os métodos `save(Screen/Element/FullPageScreen)` quando quero executar `check(Screen/Element/FullPageScreen)`?

Não, você não precisa fazer isso. O `check(Screen/Element/FullPageScreen)` fará isso automaticamente para você.

### Meus testes visuais falham com uma diferença, como posso atualizar minha baseline?

Você pode atualizar as imagens de baseline pela linha de comando adicionando o argumento `--update-visual-baseline`. Isso irá

-   copiar automaticamente a captura de tela atual e colocá-la na pasta de baseline
-   se houver diferenças, permitirá que o teste passe porque a baseline foi atualizada

**Uso:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Ao executar os logs no modo info/debug, você verá os seguintes logs adicionados

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### Width and height cannot be negative

Pode ser que o erro `Width and height cannot be negative` seja lançado. Em 9 de cada 10 vezes, isso está relacionado à criação de uma imagem de um elemento que não está visível na tela. Certifique-se sempre de que o elemento está visível antes de tentar criar uma imagem dele.

### A instalação do Canvas no Windows falhou com logs do Node-Gyp

Se você encontrar problemas com a instalação do Canvas no Windows devido a erros do Node-Gyp, observe que isso se aplica apenas à Versão 4 e anteriores. Para evitar esses problemas, considere atualizar para a Versão 5 ou superior, que não possui essas dependências. As Versões 5 a 9 usavam o [Jimp](https://github.com/jimp-dev/jimp) para processamento de imagens; a Versão 10 em diante usa o [fast-png](https://github.com/image-js/fast-png) e o [Pixelmatch](https://github.com/mapbox/pixelmatch), sem dependências nativas.

Se ainda precisar resolver os problemas com a Versão 4, consulte:

-   a seção Node Canvas no guia [Primeiros Passos](/docs/visual-testing#system-requirements)
-   [este post](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) sobre como corrigir problemas do Node-Gyp no Windows. (Agradecimentos a [IgorSasovets](https://github.com/IgorSasovets))

### Atualizei para a v10, por que meus testes visuais estão falhando?

O mecanismo de comparação mudou do ResembleJS para o [Pixelmatch](https://github.com/mapbox/pixelmatch) na v10. O Pixelmatch usa um modelo de cores perceptual (YIQ) em vez de RGB puro, portanto as porcentagens de divergência diferem das da v9. Seus testes não quebraram; as baselines só precisam ser regeneradas uma vez. Execute seus testes com `--update-visual-baseline` para aceitar os novos valores, ou exclua sua pasta de baseline e deixe o `autoSaveBaseline` recriá-la.