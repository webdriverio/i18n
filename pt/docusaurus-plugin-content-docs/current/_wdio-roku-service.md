---
id: wdio-roku-service
title: Serviço Roku
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
Este serviço substitui muitas partes do WebdriverIO para permitir que sejam usadas com aplicativos Roku e fornece acesso ao [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) para controlar o Roku durante os testes.

## Requisitos

### Roku
Um canal de teste/channel.zip e um dispositivo Roku (com o Modo de Desenvolvedor habilitado) na mesma rede que seu mac.

### WebdriverIO
Este não é um produto autônomo -- é usado como um plugin de framework de teste WebdriverIO (ou Serviço, em seu vocabulário). Antes de usá-lo, você deve passar pela configuração do WDIO executando `npm init wdio@latest`.

Ao passar pelas etapas de configuração, para que você não precise navegar por todas as perguntas/opções, você pode simplesmente escolher as seguintes seleções durante a fase de inicialização:
- Roku Testing (NOTA: Use isso se seu repositório será usado apenas para testes de Roku, pois se tornará o serviço padrão e único instalado. Caso contrário, use E2E Testing para que você possa instalar vários serviços.)
- On my local machine (apenas E2E)
- Web (apenas E2E)
- Chrome (apenas E2E)
- Mocha
- Typescript [módulos funcionam para TS e JS, então escolha qualquer um]
- autogenerate some test files (Y)
-- local padrão
- page objects (Y)
-- local padrão
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Configuração do Typescript
Se você deseja usar Typescript para escrever testes, precisará garantir que as seguintes opções estejam definidas no arquivo tsconfig.json gerado pelo Webdriverio.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
Você pode então usar o serviço importando-o em seus testes conforme detalhado abaixo.

### Configuração WDIO
Atualmente, os testes são suportados apenas para um único dispositivo Roku. As seguintes atualizações de configuração são necessárias:
* `maxInstances` e `maxInstancesPerCapability` devem ser 1. Testes em vários dispositivos automaticamente não são suportados e resultarão em comandos duplicados sendo enviados ao Roku. Deve haver apenas uma única capacidade.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // ou se você quiser o modo headless:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* É recomendável aumentar o `waitforInterval` e `waitforTimeout`, pois cada intervalo envolve o download do xml do Roku. Para aproveitar mais o recurso `browser.debug()`, você também pode optar por estender o tempo limite do seu testrunner mocha para 5+ minutos para espaço de desenvolvimento.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //opcional:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

Você está pronto para escrever seu primeiro teste!

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('primeiro teste', () => {
    before('Na tela inicial do canal de teste', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('deve iniciar na tela inicial sem login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('deve retornar à tela inicial', async () => {
        await exitChannel()
    })
})

```

Também é recomendado que você use o recurso `browser.debug()` no wdio para interromper seu teste para depuração e criação de testes:

```js
// ...
    it('deve iniciar na tela inicial sem login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // o teste é interrompido, um REPL fica disponível para comandos

```
Se o chrome não estiver em modo headless, você pode ver a última vez que `openRokuXML()` foi chamado (provavelmente através de um `waitForX` ou `expect`). Usando o REPL em seu terminal, você pode usar qualquer comando `$` válido e alguns comandos personalizados adicionados (`browser.openRokuXML()` e `browser.saveScreenshot('path/to/ss.jpg')`) -- a classe `controller` não está anexada ao objeto `browser`, então você não pode usar esses comandos atualmente. Felizmente, você provavelmente está sentado ao lado do Roku e tem um controle remoto que pode usar para navegar e, ocasionalmente, chamar `browser.openRokuXML()` para ver o que aconteceu com o estado da página! E lembre-se de que o XML funciona nativamente com xpath no próprio navegador chrome, então você pode avaliar/desenvolver seus seletores diretamente no console do chrome durante a depuração.

### .env
Veja o arquivo `.env.example`. Copie-o e renomeie-o para `.env` dentro do seu projeto WebdriverIO que usa este serviço. Você provavelmente vai querer colocá-lo no .gitignore também.

* `ROKU_IP` deve ser o IP do seu Roku. Os comandos usarão esse IP para se comunicar com ele. Isso é obrigatório.
* `ROKU_USER` e `ROKU_PW`: Credenciais de login são necessárias para instalar um arquivo, bem como para tirar capturas de tela.
* `ROKU_APP_PATH` deve ser o caminho absoluto do arquivo zip do canal Roku.
* `ROKU_CHANNEL_ID` deve ser o ID do canal do seu canal Roku (geralmente é "dev").
* `DEBUG=wdio-roku-service` habilitará mensagens de depuração. Remova o '#' no início da linha se você quiser essas mensagens.

## Funções Modificadas
### Browser
* `waitUntil` buscará o xml do Roku a cada iteração para verificar mudanças.
* `saveScreenshot` baixará uma captura de tela da tela atual do Roku. Notavelmente, essas capturas de tela estão no formato .jpg, em vez do .png que o WebdriverIO normalmente usa.
* `openRokuXML` buscará o xml do Roku se você precisar fazê-lo manualmente, em vez de usar esperas.

### Elementos
* Todas as esperas são suportadas da mesma forma que o Browser. `waitForClickable` é mapeado para `waitForDisplayed`, e `waitForStable` é mapeado para `waitForExist`.
* `click`, `doubleClick` e `moveTo` não são suportados. Você deve navegar manualmente pelo aplicativo.
* `isFocused` verificará se um atributo `focused` no elemento é verdadeiro.
* `isDisplayed` verificará se há um atributo `bounds` no elemento e se `visible` não está definido como falso. Se `withinViewport` estiver definido, os limites serão comparados com o tamanho da tela do Roku.
* `getSize` e `getLocation` pegam os valores do atributo `bounds`, retornando 0 para tamanho e -Infinity para posição se não estiver presente.

Outras funções não foram alteradas, mas muitas ainda funcionam como esperado.

### Matchers
A maioria dos matchers foi atualizada para buscar o xml durante a espera. Alguns têm funcionalidades ligeiramente diferentes.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight` e `toHaveAttribute` funcionam como esperado, considerando as mudanças no Element.
* `toHaveElementProperty` é mapeado para `toHaveAttribute`.
* `toHaveElementClass` verifica o atributo `name` do elemento.
* `toHaveId` é mapeado para `toHaveElementClass`.
* `toHaveText` verifica o atributo `text` do elemento.
* `toHaveChildren` verifica o atributo `children` do elemento.
* `toHaveHTML` tratará o xml como se fosse HTML, embora provavelmente não seja muito útil.

Os seguintes não são atualmente suportados:
* `toBeSelected` - Pode ser suportado em breve após determinar como é o xml para botões selecionados, se houver diferença.
* `toBeChecked` - Pode ser suportado em breve após determinar como é o xml para caixas de seleção marcadas, se houver diferença.
* `toHaveComputedLabel` - Se você tiver um equivalente disso em seus elementos Roku, verifique o atributo com `toHaveAttribute`.
* `toHaveComputedRole` - Se você tiver um equivalente disso em seus elementos Roku, verifique o atributo com `toHaveAttribute`.
* `toHaveHref` - Se você tiver URLs em seus elementos Roku, verifique o atributo com `toHaveAttribute`.
* `toHaveStyle` - Os elementos xml não têm estilos.
* `toHaveClipboardText` - Isso não é conhecido.
* `toHaveTitle` - O título será o nome de arquivo temporário gerado aleatoriamente do xml.
* `toHaveUrl` - A URL será o caminho para o arquivo xml em seu computador.

## Uso
### Instalação do Canal

Isso requer que seu canal tenha um ID atribuído.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Instalação de Arquivo

É recomendável armazenar o caminho no .env, especialmente se você tiver vários desenvolvedores que podem ter locais e/ou nomes de arquivo diferentes.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Canal Pré-Instalado

Se você já instalou o canal por conta própria antes dos testes, pode simplesmente iniciá-lo.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Feche o canal se já estiver aberto. Se o canal suportar retomada instantânea, isso apenas o colocará em segundo plano
    await exitChannel();
    // Usar o ID de canal 'dev' iniciará o aplicativo sideloaded.
    await launchChannel('dev');
}
```

### Testes
`wdio-roku-service/controller` fornece a capacidade de enviar pressionamentos de botão para o Roku. `keySequence` é o principal, enviando vários pressionamentos de botão em sequência.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Navegue pelo aplicativo
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Busque a UI atual do aplicativo no Roku e carregue-a no navegador
await browser.openRokuXML();
// Ou use esperas, que carregarão repetidamente o XML até que expire o tempo ou a condição seja aprovada
await browser.waitUntil(condition);
await element.waitForDisplayed();
// use os matchers do WDIO no XML do Roku como se fosse uma página da web
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` também tem funções para segurar ou soltar botões, bem como digitar texto em um teclado.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('exemplo');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` fornece funcionalidade relacionada ao canal. `inputChannel` permite que você envie informações arbitrárias para seu aplicativo.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Outras Funções
`wdio-roku-service/info` fornece funcionalidade diversa, como obter o ícone do aplicativo ou nós órfãos.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` é a interface direta com o ECP se você precisar fazer algo altamente específico.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## Problemas Comuns
* Os elementos Roku têm seu texto em um atributo 'text', não entre suas tags. Ao fazer seletores, fazer `$('element=Text')` não funcionará para quase todos os elementos. Em vez disso, você terá que fazer `$('element[text=Text]')`.

## Roteiro de Recursos
* Haverá um PR enviado em breve que permitirá que este serviço seja instalado durante o questionário `npm init wdio@latest`.
* Atualmente avaliando a comunicação Socket com o Roku para que mais recursos possam ser implementados, como um meio para acordar um Roku em modo de suspensão.
* Recurso(s) de proxy de rede que permitem acionar com base na atividade de rede.

## Aproveitando o Relatório Allure com Capturas de Tela e Arquivos XML anexados

Por padrão, o Relatório Allure não possui uma configuração para gerar capturas de tela do aplicativo ou uma cópia do código XML representativo do estado atual do aplicativo Roku em qualquer ponto da execução do teste. A documentação a seguir explica como resolver isso para que uma captura de tela do estado atual do aplicativo seja gerada e anexada ao Relatório Allure cada vez que um teste `it` completa sua execução. Também permite obter um snapshot da fonte do XML representativo do estado atual do aplicativo Roku sempre que uma execução de teste `it` falhar.

Para a documentação completa do Allure Reporter, visite a documentação @wdio/allure-reporter https://webdriver.io/docs/allure-reporter/

### Dependência Utils.js
Adicione o seguinte código a um arquivo chamado `Utils.js`. Este arquivo pode ficar na sua pasta `/helpers` ou semelhante.
```js
/**
 * Retorna uma representação de string do timestamp 'atual' em milissegundos para a época.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Retorna uma representação de string do timestamp 'atual' seguindo o padrão: {AAAA}-{MM}-{DD}_{hora em 24H}-{Minuto}-{Segundo}-{Milissegundos}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * Um objeto contendo as representações de string de possíveis extensões de arquivo usadas para fins de relatório.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * Um objeto contendo as representações de string de possíveis tipos MIME usados para fins de relatório.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * Uma função para gerar um nome de arquivo com um possível prefixo, um timestamp e uma das possíveis extensões fornecidas.
 * @param {string} fileExtension Use um dos valores do objeto FILE_EXTENSIONS definido anteriormente.
 * @param {string} [fileNamePrefix] Um prefixo a ser anexado no início do nome do arquivo, se fornecido. Padrão é uma string vazia.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### código wdio.conf.js
Adicione as seguintes declarações de importação no arquivo `wdio.conf.js`:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<caminho do arquivo Utils.js>/Utils.js'  // Substitua <caminho do arquivo Utils.js> pelo caminho relativo real para o arquivo Utils.js

```

Defina o seguinte hook `afterTest` no arquivo `wdio.conf.js`. Se você já tiver código funcionando neste hook, anexe o código fornecido abaixo a ele.
```js
afterTest: async function (test, context, result) {
        // Lógica de salvamento e anexo de capturas de tela, independentemente do resultado do teste.
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Falha ao remover arquivo: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Erro ao manipular captura de tela ou anexo: ', error)
        }

        // Lógica de anexo de XML em caso de falha no teste.
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### Comportamento esperado
Com este código no lugar na configuração do projeto, a expectativa é que cada vez que um teste `it` for executado, independentemente do resultado do teste, uma captura de tela será tirada no final da execução e anexada à sua seção relevante no relatório Allure. No caso específico de falha no teste, um snapshot da fonte do estado do aplicativo em formato XML também será anexado à seção do teste no relatório Allure.

### Notas
* Por padrão, os relatórios Allure suportam capturas de tela no formato `.png`. As substituições de método neste serviço suportam a imagem no formato `.jpg`.
* Os anexos XML podem ser navegados no próprio relatório Allure ou abertos em uma guia separada no navegador.