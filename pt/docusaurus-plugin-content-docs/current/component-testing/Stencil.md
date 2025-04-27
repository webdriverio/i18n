---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) é uma biblioteca para construir bibliotecas de componentes reutilizáveis e escaláveis. Você pode testar componentes Stencil diretamente em um navegador real usando WebdriverIO e seu [browser runner](/docs/runner#browser-runner).

## Configuração

Para configurar o WebdriverIO dentro do seu projeto Stencil, siga as [instruções](/docs/component-testing#set-up) em nossa documentação de teste de componentes. Certifique-se de selecionar `stencil` como preset dentro das suas opções de runner, por exemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

Caso você use Stencil com um framework como React ou Vue, você deve manter o preset para esses frameworks.

:::

Você pode então iniciar os testes executando:

```sh
npx wdio run ./wdio.conf.ts
```

## Escrevendo Testes

Dado que você tem os seguintes componentes Stencil:

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

No seu teste, use o método `render` de `@wdio/browser-runner/stencil` para anexar o componente à página de teste. Para interagir com o componente, recomendamos usar comandos WebdriverIO, pois eles se comportam mais próximos das interações reais do usuário, por exemplo:

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### Opções de Renderização

O método `render` fornece as seguintes opções:

##### `components`

Uma matriz de componentes para testar. As classes de componentes podem ser importadas para o arquivo de especificação, então sua referência deve ser adicionada à matriz `component` para ser usada em todo o teste.

__Tipo:__ `CustomElementConstructor[]`<br />
__Padrão:__ `[]`

##### `flushQueue`

Se `false`, não limpa a fila de renderização na configuração inicial do teste.

__Tipo:__ `boolean`<br />
__Padrão:__ `true`

##### `template`

O JSX inicial que é usado para gerar o teste. Use `template` quando quiser inicializar um componente usando suas propriedades, em vez de seus atributos HTML. Ele renderizará o template especificado (JSX) no `document.body`.

__Tipo:__ `JSX.Template`

##### `html`

O HTML inicial usado para gerar o teste. Isso pode ser útil para construir uma coleção de componentes trabalhando juntos e atribuir atributos HTML.

__Tipo:__ `string`

##### `language`

Define o atributo `lang` simulado em `<html>`.

__Tipo:__ `string`

##### `autoApplyChanges`

Por padrão, quaisquer alterações nas propriedades e atributos do componente devem usar `env.waitForChanges()` para testar as atualizações. Como opção, `autoApplyChanges` limpa continuamente a fila em segundo plano.

__Tipo:__ `boolean`<br />
__Padrão:__ `false`

##### `attachStyles`

Por padrão, os estilos não são anexados ao DOM e não são refletidos no HTML serializado. Definir esta opção como `true` incluirá os estilos do componente na saída serializável.

__Tipo:__ `boolean`<br />
__Padrão:__ `false`

#### Ambiente de Renderização

O método `render` retorna um objeto de ambiente que fornece certos auxiliares de utilidade para gerenciar o ambiente do componente.

##### `flushAll`

Depois que as alterações foram feitas em um componente, como uma atualização em uma propriedade ou atributo, a página de teste não aplica automaticamente as alterações. Para esperar e aplicar a atualização, chame `await flushAll()`

__Tipo:__ `() => void`

##### `unmount`

Remove o elemento de contêiner do DOM.

__Tipo:__ `() => void`

##### `styles`

Todos os estilos definidos pelos componentes.

__Tipo:__ `Record<string, string>`

##### `container`

Elemento de contêiner no qual o template está sendo renderizado.

__Tipo:__ `HTMLElement`

##### `$container`

O elemento de contêiner como um elemento WebdriverIO.

__Tipo:__ `WebdriverIO.Element`

##### `root`

O componente raiz do template.

__Tipo:__ `HTMLElement`

##### `$root`

O componente raiz como um elemento WebdriverIO.

__Tipo:__ `WebdriverIO.Element`

### `waitForChanges`

Método auxiliar para esperar que o componente esteja pronto.

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## Atualizações de Elementos

Se você definir propriedades ou estados em seu componente Stencil, você precisa gerenciar quando essas mudanças devem ser aplicadas ao componente para ser re-renderizado.


## Exemplos

Você pode encontrar um exemplo completo de uma suíte de teste de componente WebdriverIO para Stencil em nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).