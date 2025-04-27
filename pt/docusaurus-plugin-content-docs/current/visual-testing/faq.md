---
id: faq
title: Perguntas Frequentes
---

### Preciso usar os métodos `save(Screen/Element/FullPageScreen)` quando quero executar `check(Screen/Element/FullPageScreen)`?

Não, você não precisa fazer isso. O `check(Screen/Element/FullPageScreen)` fará isso automaticamente para você.

### Meus testes visuais falham com uma diferença, como posso atualizar minha baseline?

Você pode atualizar as imagens de baseline através da linha de comando adicionando o argumento `--update-visual-baseline`. Isso irá

-   automaticamente copiar a captura de tela atual e colocá-la na pasta de baseline
-   se houver diferenças, permitirá que o teste passe porque a baseline foi atualizada

**Uso:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Ao executar logs no modo info/debug, você verá os seguintes logs adicionados

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

Pode ser que o erro `Width and height cannot be negative` seja lançado. 9 em cada 10 vezes isso está relacionado à criação de uma imagem de um elemento que não está na visualização. Por favor, certifique-se sempre de que o elemento esteja na visualização antes de tentar fazer uma imagem do elemento.

### Instalação do Canvas no Windows falhou com logs do Node-Gyp

Se você encontrar problemas com a instalação do Canvas no Windows devido a erros do Node-Gyp, observe que isso se aplica apenas à Versão 4 e inferior. Para evitar esses problemas, considere atualizar para a Versão 5 ou superior, que não possui essas dependências e usa [Jimp](https://github.com/jimp-dev/jimp) para processamento de imagens.

Se você ainda precisa resolver os problemas com a Versão 4, verifique:

-   a seção Node Canvas no guia [Primeiros Passos](/docs/visual-testing#system-requirements)
-   [este post](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) para Resolver Problemas do Node-Gyp no Windows. (Obrigado a [IgorSasovets](https://github.com/IgorSasovets))