---
id: ai-steps
title: Étapes IA dans les tests
description: Écrivez des étapes de test sous forme d'intention avec browser.act() et lisez des données typées avec browser.extract() grâce à @wdio/ai-service, puis rejouez-les depuis un cache versionné sans modèle et examinez chaque réparation.
---

`@wdio/ai-service` permet à un test de décrire une étape au lieu de la scripter : `browser.act('Add a blue shirt to the cart')` demande à votre modèle de l'exécuter, enregistre les commandes WebdriverIO qu'il a lancées, puis les rejoue depuis un fichier de cache à chaque exécution suivante. Le modèle n'est appelé à nouveau que lorsque la page a changé et qu'une étape enregistrée ne peut plus être réparée sans lui. Utilisez-le pour des parcours dont le balisage change souvent, ou pour faire tourner un test avant de connaître les sélecteurs. Utilisez les commandes WebdriverIO classiques pour tout ce que vous savez déjà scripter.

## Configurer le service

Installez le service et le paquet LangChain de votre fournisseur de modèle :

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

Ajoutez le service à votre configuration et définissez la clé API du fournisseur (ici `ANTHROPIC_API_KEY`) dans l'environnement :

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

`webSocketUrl: true` ouvre une session WebDriver BiDi. Le service fonctionne aussi avec WebDriver Classic, mais BiDi lui permet de vérifier ce que chaque étape a fait et de lire les réponses API de la page. Consultez la page [AI Service](/docs/ai-service) pour découvrir toutes les options et tous les fournisseurs, y compris les modèles locaux via Ollama.

## Écrire un test

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

- `act` exécute l'étape et ne fait jamais d'assertion. Vérifiez le résultat avec `expect`.
- `extract` se contente de lire la page et valide la réponse par rapport au schéma. Il n'est jamais mis en cache.
- Les secrets vont dans des espaces réservés. Le modèle voit `{{password}}`, jamais la valeur :

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- Appelez `act` sur un élément pour que le modèle reste à l'intérieur de celui-ci, ou sur un frame ou un onglet ciblé :

```ts
await $('form#billing').act('Fill in a valid German address')
```

## Enregistrer une fois, rejouer sans modèle

La première exécution enregistre les étapes de chaque appel à `act` dans `__act__/<spec file>.json`, à côté de la spec :

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Versionnez le répertoire `__act__`. Les exécutions suivantes rejouent les commandes enregistrées : une exécution réussie n'effectue donc aucun appel au modèle et ne consomme aucun token.

| `cache` | À utiliser pour |
| --- | --- |
| `auto` (par défaut) | `write` en local, `heal` lorsque `process.env.CI` est défini |
| `write` | enregistrer et mettre à jour les fichiers de cache |
| `heal` | CI : réparer les étapes en échec, écrire les entrées réparées dans `<outputDir>/act-cache/` et ne pas toucher aux fichiers de cache |
| `locked` | les exécutions CI qui ne doivent pas appeler de modèle : rejeu uniquement, échec lorsqu'une étape ne peut pas être réparée sans le modèle |
| `off` | toujours interroger le modèle |

Lancez `npx wdio run wdio.conf.ts -s` pour réenregistrer tous les appels à `act`.

## Examiner les réparations

Lorsqu'une étape enregistrée échoue, le service essaie d'abord les autres sélecteurs qu'il a enregistrés pour l'élément, puis son rôle et son nom accessible. Ce n'est qu'en cas d'échec que le modèle reprend à partir de l'étape en échec. Chaque étape rejouée ou réparée doit faire ce qu'elle faisait lors de son enregistrement : envoyer les mêmes requêtes, naviguer vers la même page et modifier les mêmes parties de la page. Une réparation sur un bouton similaire mais incorrect est rejetée.

L'exécution se termine par un résumé :

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

Le dossier de preuves contient une capture d'écran de la page au moment où l'étape a échoué, une autre après chaque étape de réparation, ainsi qu'une vidéo de la réparation dans les navigateurs qui enregistrent un screencast WebDriver BiDi (Firefox à ce jour). Examinez la réparation, puis versionnez le fichier de cache mis à jour.

## Transformer les étapes en code classique

Une fois qu'un parcours est stable, remplacez ses appels à `act` par les commandes enregistrées :

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act : Ajouter une chemise bleue en taille M au panier
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## Dépannage

| Erreur | Solution |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | Définissez `model` dans les options du service ou exportez `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | Installez le paquet du fournisseur. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Exportez la clé dans le shell ou le secret CI qui exécute les tests. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | Enregistrez l'appel en local avec `cache: 'write'` et versionnez le fichier `__act__`. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | L'élément est toujours présent mais fait autre chose : il s'agit d'une régression, pas d'un changement de balisage. Vérifiez l'application. |
| `act("…") failed: …` suivi de `Evidence: <folder>` | Le modèle n'a pas pu mener à bien l'instruction. Le dossier contient chaque instantané qu'il a pris, les événements de console et de réseau ainsi que les étapes exécutées. |

## Prochaines étapes

- [AI Service](/docs/ai-service) : toutes les options, le format du cache, les effets des étapes et l'espace de travail
- [Sélecteurs](/docs/selectors#role-selector) : le sélecteur `role/` utilisé par les étapes enregistrées
- [WebdriverIO pour les agents de codage](/docs/ai-agents) : écrire des tests en collaboration avec un agent de codage