---
id: snapshots
title: Snapshots e refs
description: Leia a página com wdio session snapshot e, em seguida, aja sobre as refs que ele imprime.
---

Tire um snapshot antes de clicar. O snapshot é a lista de elementos sobre os quais você pode agir. Cada linha interativa termina com uma ref como `[ref=e3]`.

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

Uma linha se parece com `button "Add to cart" [ref=e3]`. O próximo comando usa essa ref:

```sh
npx wdio session click e3
```

As refs vêm do snapshot mais recente. Após uma navegação, tire um novo snapshot. Uma ref antiga falha com `REF_STALE`. Uma ref desconhecida falha com `REF_NOT_FOUND`.

:::caution Experimental

O layout de texto de um snapshot, e o formato que `--json` imprime para ele, são experimentais: uma versão minor pode alterá-los, por exemplo para compartilhar um único mecanismo de snapshot com o [trace do DevTools](/docs/devtools/wdio/trace-mode). A sintaxe das refs (`e3`, `@e3`), as ações que recebem uma ref e o código que elas registram permanecem estáveis. Obtenha as refs de um snapshot e não faça parsing do restante de suas linhas.

:::

## O que executar

| Comando | Use-o para |
| --- | --- |
| `snapshot --interactive` | Os elementos sobre os quais você pode agir, cada um com uma ref |
| `find "Add to cart"` | Cada correspondência com o nó ao seu redor, por exemplo um item de lista inteiro, de modo que um valor ao lado da correspondência venha junto. `-A`, `-B` e `-C` imprimem contexto de linhas simples, como o grep |
| `diff` | O que mudou desde o snapshot anterior |
| `screenshot` | Layout. Dispense-o quando um snapshot responder à pergunta |
| `source` | O HTML da página ou o XML nativo |

`snapshot` sem `--interactive` inclui mais da árvore. Prefira `--interactive` quando estiver prestes a clicar ou digitar.

## O que uma ação alterou

Em uma sessão web, `open` imprime o snapshot interativo da página que abriu, e toda ação que pode alterar a página (`click`, `fill`, `type`, `press`, `select`, `check`, `navigate`, `frame`, …) informa o que mudou:

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

Quando a ação abriu uma aba, o relatório informa isso (`Opened a new tab [1]: https://…`); a sessão permanece na aba atual até você executar `tabs switch`. Quando a página é uma verificação anti-bot (Cloudflare, DataDome, Akamai, …) em vez do site, o relatório também informa isso, uma vez por página. A sessão não tenta contorná-la; em um navegador headless, ela sugere reabrir com `--headed`.

Na mesma página, você recebe as linhas novas ou alteradas com suas refs, incluindo texto que não é interativo, como o status acima. Após uma navegação, você recebe os elementos interativos da nova página ou, no caso de uma página grande, um resumo de uma linha que aponta para `find`. Assim, raramente você precisa de um `snapshot` separado após uma ação. Defina `WDIO_SESSION_CHANGES=0` para desativar o relatório e passe `open --no-snapshot` para pular o snapshot após `open`.

## Frames

Em uma sessão WebDriver BiDi, o snapshot mostra o conteúdo dos iframes da página, incluindo os de origem cruzada, sob o iframe em que estão:

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

Ações sobre essas refs entram no frame, agem e voltam para a página, e o código impresso faz o mesmo. São exibidos até cinco iframes, cada um cortado em 300 elementos; `frame e4` e `snapshot` mostram todo o conteúdo de um frame que foi cortado. Iframes menores que 100 pixels quadrados, como pixels de rastreamento, são omitidos.

## Shadow DOM e elementos clicáveis sem role

Com WebDriver BiDi, o snapshot também abrange shadow roots fechados, e elementos que possuem apenas um listener de clique (um ícone conectado com `addEventListener`) recebem uma ref. Esse tipo de elemento não tem nome acessível, então o snapshot o descreve:

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

No Android, iOS, macOS e Windows, o snapshot vem do page source do Appium. Dois controles que compartilham um accessibility id permanecem como refs separadas quando o restante de seus seletores difere. `snapshot --scope e3` limita a árvore a essa ref.

## Controles repetidos

Quando vários controles compartilham uma role e um nome, como o botão "Add to cart" de cada linha em uma tabela de produtos, a linha da ref termina com `∈ "<text>"`, o texto da linha, card ou item de lista que contém esse controle e nenhum outro com o mesmo nome:

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

O texto é cortado em 80 caracteres. Um controle cujo item é um landmark da página (um link "Sign in" tanto no cabeçalho quanto no rodapé) não recebe nenhum. O rótulo de um controle de formulário visível não é listado: o controle carrega o nome.

## Toques nativos

Sessões web usam `click`. Sessões mobile e desktop nativas usam `tap` na mesma ref:

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## Solução de problemas

| Mensagem | O que fazer |
| --- | --- |
| `REF_STALE` | O elemento do último snapshot não existe mais. Execute `snapshot` e use uma nova ref. |
| `REF_NOT_FOUND` | Esse id nunca existiu nesta sessão. A ref no seu comando não corresponde ao snapshot mais recente. |
| `NO_MATCH` | `find` não encontrou esse texto. Tire um snapshot e leia os nomes que realmente estão lá. |
| `NOT_EDITABLE` | O alvo de `fill` não é um campo editável e não possui um único campo editável dentro dele (ou por trás de `aria-controls`/`aria-owns`/label). Execute `snapshot --scope <target>` e preencha a ref do campo. |

## Próximos passos

- [Executar código](/docs/session/exec) — asserções e etapas que vão além de um único comando
- [Comandos](/docs/session-commands) — flags de `snapshot`, `find`, `diff`, `screenshot` e `source`