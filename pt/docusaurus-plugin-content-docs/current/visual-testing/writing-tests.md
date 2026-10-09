---
id: writing-tests
title: Escrevendo Testes
description: "Escreva testes visuais com Mocha, Jasmine ou Cucumber que salvam capturas de tela ou as comparam com imagens de referência usando matchers personalizados e métodos de verificação."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Suporte a Frameworks de Testrunner

`@wdio/visual-service` é agnóstico em relação ao framework de test-runner, o que significa que você pode usá-lo com todos os frameworks que o WebdriverIO suporta, como:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

Dentro dos seus testes, você pode _salvar_ capturas de tela ou comparar o estado visual atual da aplicação sob teste com uma baseline. Para isso, o serviço fornece [matcher personalizado](/docs/api/expect-webdriverio#visual-matcher), bem como métodos de _verificação_ (_check_):

<Tabs
    defaultValue="mocha"
    values={[
        {label: 'Mocha', value: 'mocha'},
        {label: 'Jasmine', value: 'jasmine'},
        {label: 'CucumberJS', value: 'cucumberjs'},
    ]}
>
<TabItem value="mocha">

```ts
describe('Mocha Example', () => {
    beforeEach(async () => {
        await browser.url('https://webdriver.io')
    })

    it('using visual matchers to assert against baseline', async () => {
        // Verifica se a tela corresponde exatamente à baseline
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // verifica se um elemento tem uma porcentagem de divergência de 5% em relação à baseline
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // verifica um elemento com opções para o comando `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* algumas opções */
        })

        // Verifica se um elemento corresponde exatamente à baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // verifica se um elemento tem uma porcentagem de divergência de 5% em relação à baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // verifica um elemento com opções para o comando `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* algumas opções */
        })

        // Verifica se uma captura de tela da página inteira corresponde à baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Verifica se uma captura de tela da página inteira tem uma porcentagem de divergência de 5% em relação à baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Verifica uma captura de tela da página inteira com opções para o comando `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* algumas opções */
        })

        // Verifica uma captura de tela da página inteira com todas as execuções de tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Verifica se uma captura de tela da página inteira tem uma porcentagem de divergência de 5% em relação à baseline
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Verifica uma captura de tela da página inteira com opções para o comando `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* algumas opções */
        })
    })

    it('should save some screenshots', async () => {
        // Salva uma tela
        await browser.saveScreen('examplePage', {
            /* algumas opções */
        })

        // Salva um elemento
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* algumas opções */
            }
        )

        // Salva uma captura de tela da página inteira
        await browser.saveFullPageScreen('fullPage', {
            /* algumas opções */
        })

        // Salva uma captura de tela da página inteira com todas as execuções de tab
        await browser.saveTabbablePage('save-tabbable', {
            /* algumas opções, use as mesmas opções que para saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Verifica uma tela
        await expect(
            await browser.checkScreen('examplePage', {
                /* algumas opções */
            })
        ).toEqual(0)

        // Verifica um elemento
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* algumas opções */
                }
            )
        ).toEqual(0)

        // Verifica uma captura de tela da página inteira
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* algumas opções */
            })
        ).toEqual(0)

        // Verifica uma captura de tela da página inteira com todas as execuções de tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* algumas opções, use as mesmas opções que para checkFullPageScreen */
            })
        ).toEqual(0)
    })
})
```

</TabItem>
<TabItem value="jasmine">

```ts
describe('Jasmine Example', () => {
    beforeEach(async () => {
        await browser.url('https://webdriver.io')
    })

    it('using visual matchers to assert against baseline', async () => {
        // Verifica se a tela corresponde exatamente à baseline
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // verifica se um elemento tem uma porcentagem de divergência de 5% em relação à baseline
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // verifica um elemento com opções para o comando `saveScreen`
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* algumas opções */
        })

        // Verifica se um elemento corresponde exatamente à baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // verifica se um elemento tem uma porcentagem de divergência de 5% em relação à baseline
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // verifica um elemento com opções para o comando `saveElement`
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* algumas opções */
        })

        // Verifica se uma captura de tela da página inteira corresponde à baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // Verifica se uma captura de tela da página inteira tem uma porcentagem de divergência de 5% em relação à baseline
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // Verifica uma captura de tela da página inteira com opções para o comando `checkFullPageScreen`
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* algumas opções */
        })

        // Verifica uma captura de tela da página inteira com todas as execuções de tab
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // Verifica se uma captura de tela da página inteira tem uma porcentagem de divergência de 5% em relação à baseline
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // Verifica uma captura de tela da página inteira com opções para o comando `checkTabbablePage`
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* algumas opções */
        })
    })

    it('should save some screenshots', async () => {
        // Salva uma tela
        await browser.saveScreen('examplePage', {
            /* algumas opções */
        })

        // Salva um elemento
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* algumas opções */
            }
        )

        // Salva uma captura de tela da página inteira
        await browser.saveFullPageScreen('fullPage', {
            /* algumas opções */
        })

        // Salva uma captura de tela da página inteira com todas as execuções de tab
        await browser.saveTabbablePage('save-tabbable', {
            /* algumas opções, use as mesmas opções que para saveFullPageScreen */
        })
    })

    it('should compare successful with a baseline', async () => {
        // Verifica uma tela
        await expect(
            await browser.checkScreen('examplePage', {
                /* algumas opções */
            })
        ).toEqual(0)

        // Verifica um elemento
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* algumas opções */
                }
            )
        ).toEqual(0)

        // Verifica uma captura de tela da página inteira
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* algumas opções */
            })
        ).toEqual(0)

        // Verifica uma captura de tela da página inteira com todas as execuções de tab
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* algumas opções, use as mesmas opções que para checkFullPageScreen */
            })
        ).toEqual(0)
    })
})
```

</TabItem>
<TabItem value="cucumberjs">

```ts
import { When, Then } from '@wdio/cucumber-framework'

When('I save some screenshots', async function () {
    // Salva uma tela
    await browser.saveScreen('examplePage', {
        /* algumas opções */
    })

    // Salva um elemento
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* algumas opções */
    })

    // Salva uma captura de tela da página inteira
    await browser.saveFullPageScreen('fullPage', {
        /* algumas opções */
    })

    // Salva uma captura de tela da página inteira com todas as execuções de tab
    await browser.saveTabbablePage('save-tabbable', {
        /* algumas opções, use as mesmas opções que para saveFullPageScreen */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // Verifica se a tela corresponde exatamente à baseline
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // verifica se um elemento tem uma porcentagem de divergência de 5% em relação à baseline
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // verifica um elemento com opções para o comando `saveScreen`
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* algumas opções */
    })

    // Verifica se um elemento corresponde exatamente à baseline
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // verifica se um elemento tem uma porcentagem de divergência de 5% em relação à baseline
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // verifica um elemento com opções para o comando `saveElement`
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* algumas opções */
    })

    // Verifica se uma captura de tela da página inteira corresponde à baseline
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // Verifica se uma captura de tela da página inteira tem uma porcentagem de divergência de 5% em relação à baseline
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // Verifica uma captura de tela da página inteira com opções para o comando `checkFullPageScreen`
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* algumas opções */
    })

    // Verifica uma captura de tela da página inteira com todas as execuções de tab
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // Verifica se uma captura de tela da página inteira tem uma porcentagem de divergência de 5% em relação à baseline
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // Verifica uma captura de tela da página inteira com opções para o comando `checkTabbablePage`
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* algumas opções */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // Verifica uma tela
    await expect(
        await browser.checkScreen('examplePage', {
            /* algumas opções */
        })
    ).toEqual(0)

    // Verifica um elemento
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* algumas opções */
            }
        )
    ).toEqual(0)

    // Verifica uma captura de tela da página inteira
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* algumas opções */
        })
    ).toEqual(0)

    // Verifica uma captura de tela da página inteira com todas as execuções de tab
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* algumas opções, use as mesmas opções que para checkFullPageScreen */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note IMPORTANTE

Este serviço fornece métodos `save` e `check`. Se você executar seus testes pela primeira vez, você **NÃO DEVE** combinar métodos `save` e `compare`; os métodos `check` criarão automaticamente uma imagem de baseline para você

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


Quando você tiver [desativado o salvamento automático de imagens de baseline](service-options#autosavebaseline), a Promise será rejeitada com o seguinte aviso.

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

Isso significa que a captura de tela atual é salva na pasta actual e você **precisa copiá-la manualmente para sua baseline**. Se você instanciar o `@wdio/visual-service` com [`autoSaveBaseline: true`](./service-options#autosavebaseline), a imagem será salva automaticamente na pasta de baseline.

:::