---
id: savePDF
title: savePDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

Imprime a página do contexto de navegação atual para um arquivo PDF no seu sistema operacional.

##### Uso

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>caminho para o PDF gerado (sufixo `.pdf` é obrigatório) relativo ao diretório de execução</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`PDFPrintOptions`</td>
      <td>Opções de Impressão PDF</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>Orientação da página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Escala da página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Incluir fundo da página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Largura da página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Altura da página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Margem superior da página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Margem inferior da página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Margem esquerda da página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Margem direita da página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Encolher página para ajustar</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>Intervalo de páginas para incluir no PDF</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### Retorna

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    buffer da captura de tela