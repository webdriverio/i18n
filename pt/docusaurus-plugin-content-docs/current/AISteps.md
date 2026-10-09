---
id: ai-steps
title: Passos com IA em Testes
description: Escreva passos de teste como intenção com browser.act() e leia dados tipados com browser.extract() usando @wdio/ai-service, depois reproduza-os a partir de um cache versionado sem um modelo e revise cada correção.
---

O `@wdio/ai-service` permite que um teste descreva um passo em vez de programá-lo: `browser.act('Add a blue shirt to the cart')` pede ao seu modelo que o execute, registra os comandos do WebdriverIO que ele executou e os reproduz a partir de um arquivo de cache em todas as execuções seguintes. O modelo só é chamado novamente quando a página mudou e um passo registrado não pode mais ser reparado sem ele. Use-o para fluxos cuja marcação muda com frequência, ou para colocar um teste em funcionamento antes de conhecer os seletores. Use comandos simples do WebdriverIO para tudo o que você já sabe programar.

## Configurar o serviço

Instale o serviço e o pacote LangChain do seu provedor de modelo:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

Adicione o serviço à sua configuração e defina a chave de API do provedor (`ANTHROPIC_API_KEY` aqui) no ambiente:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        webSocketUrl: true
    }],
    framework: 'mocha',
    services: [['ai', {
        model: 'anthropic:claude-sonnet-5-5'
    }]]
}
```

`webSocketUrl: true` abre uma sessão WebDriver BiDi. O serviço também funciona com o WebDriver Classic, mas o BiDi permite verificar o que cada passo fez e ler as respostas de API da página. Consulte a página [AI Service](/docs/ai-service) para ver todas as opções e provedores, incluindo modelos locais através do Ollama.

## Escrever um teste

```ts title="test/specs/cart.e2e.ts"
import { browser, expect } from '@wdio/globals'
import { z } from 'zod'

describe('cart', () => {
    it('adds a shirt', async () => {
        await browser.url('https://shop.example/')
        await browser.act('Add a blue shirt in size M to the shopping cart')

        const cart = await browser.extract(
            'the line items in the cart',
            z.array(z.object({ name: z.string(), size: z.string(), qty: z.number() }))
        )
        expect(cart).toContainEqual({ name: 'Blue Shirt', size: 'M', qty: 1 })
    })
})
```

- `act` executa o passo e nunca faz asserções. Verifique o resultado com `expect`.
- `extract` apenas lê a página e valida a resposta com base no schema. Ele nunca é armazenado em cache.
- Segredos vão em placeholders. O modelo vê `{{password}}`, nunca o valor:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- Chame `act` em um elemento para manter o modelo dentro dele, ou em um frame ou aba específico:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## Grave uma vez, reproduza sem um modelo

A primeira execução grava os passos de cada chamada `act` em `__act__/<spec file>.json` ao lado da spec:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Faça commit do diretório `__act__`. As execuções seguintes reproduzem os comandos gravados, então uma execução bem-sucedida não faz chamadas ao modelo e não consome tokens.

| `cache` | Use para |
| --- | --- |
| `auto` (padrão) | `write` localmente, `heal` quando `process.env.CI` está definido |
| `write` | gravar e atualizar os arquivos de cache |
| `heal` | CI: reparar passos com falha, gravar as entradas reparadas em `<outputDir>/act-cache/` e não alterar os arquivos de cache |
| `locked` | execuções de CI que não devem chamar um modelo: apenas reprodução, falha quando um passo não pode ser reparado sem o modelo |
| `off` | sempre consultar o modelo |

Execute `npx wdio run wdio.conf.ts -s` para gravar novamente todas as chamadas `act`.

## Revisar correções

Quando um passo gravado falha, o serviço primeiro tenta os outros seletores que gravou para o elemento e, em seguida, seu papel (role) e nome acessível. Somente se isso falhar o modelo continua a partir do passo com falha. Cada passo reproduzido ou corrigido precisa fazer o mesmo que fez quando foi gravado: enviar as mesmas requisições, navegar para a mesma página e alterar as mesmas partes da página. Uma correção que aponte para um botão semelhante, mas errado, é rejeitada.

A execução termina com um resumo:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

A pasta de evidências contém uma captura de tela da página no momento em que o passo falhou, uma após cada passo de correção e um vídeo da correção em navegadores que gravam um screencast WebDriver BiDi (atualmente o Firefox). Revise a correção e, em seguida, faça commit do arquivo de cache atualizado.

## Transformar passos em código simples

Quando um fluxo estiver estável, substitua suas chamadas `act` pelos comandos gravados:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Add a blue shirt in size M to the shopping cart
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## Solução de problemas

| Erro | Solução |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | Defina `model` nas opções do serviço ou exporte `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | Instale o pacote do provedor. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Exporte a chave no shell ou no secret de CI que executa os testes. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | Grave a chamada localmente com `cache: 'write'` e faça commit do arquivo `__act__`. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | O elemento ainda existe, mas faz outra coisa: uma regressão, não uma mudança de marcação. Verifique a aplicação. |
| `act("…") failed: …` seguido de `Evidence: <folder>` | O modelo não conseguiu concluir a instrução. A pasta contém todos os snapshots que ele capturou, os eventos de console e de rede e os passos que foram executados. |

## Próximos passos

- [AI Service](/docs/ai-service): todas as opções, o formato do cache, os efeitos dos passos e o workspace
- [Seletores](/docs/selectors#role-selector): o seletor `role/` usado pelos passos gravados
- [WebdriverIO para Agentes de Programação](/docs/ai-agents): escreva testes em conjunto com um agente de programação