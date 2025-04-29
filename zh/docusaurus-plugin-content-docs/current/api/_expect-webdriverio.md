---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---



在编写测试时，您经常需要检查值是否满足特定条件。`expect` 为您提供了许多"匹配器"，让您能够在 `browser`、`element` 或 `mock` 对象上进行各种验证。

## 默认选项

以下默认选项与配置中设置的 [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) 和 [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) 选项相关联。

只有当您想为断言设置特定的超时时间时，才需要设置以下选项。

```js
{
    wait: 2000, // ms to wait for expectation to succeed
    interval: 100, // interval between attempts
}
```

如果您想选择不同的超时和间隔时间，可以这样设置这些选项：

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### 匹配器选项

每个匹配器都可以接受多个选项，允许您修改断言：

##### 命令选项

| 名称 | 类型 | 详情 |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | 等待期望成功的时间（毫秒）。默认值：`3000` |
| <code><var>interval</var></code> | number | 尝试之间的间隔。默认值：`100` |
| <code><var>beforeAssertion</var></code> | function | 在断言之前调用的函数 |
| <code><var>afterAssertion</var></code> | function | 在断言之后调用的包含断言结果的函数 |
| <code><var>message</var></code> | string | 断言错误前添加的用户消息 |

##### 字符串选项

在断言字符串时，可以在命令选项之外应用此选项。

| 名称 | 类型 | 详情 |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | 对实际值和期望值应用 `toLowerCase` |
| <code><var>trim</var></code> | boolean | 对实际值应用 `trim` |
| <code><var>replace</var></code> | Replacer \| Replacer[] | 替换实际值中与字符串/正则表达式匹配的部分。替换器可以是字符串或函数。
| <code><var>containing</var></code> | boolean | 期望实际值包含期望值，否则严格相等。 |
| <code><var>asString</var></code> | boolean | 可能有助于强制将属性值转换为字符串 |
| <code><var>atStart</var></code> | boolean | 期望实际值以期望值开始 |
| <code><var>atEnd</var></code> | boolean | 期望实际值以期望值结束 |
| <code><var>atIndex</var></code> | number | 期望实际值在给定索引处具有期望值 |

##### 数字选项

在断言数字时，可以在命令选项之外应用此选项。

| 名称 | 类型 | 详情 |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | 等于 |
| <code><var>lte</var></code> | number | 小于等于 |
| <code><var>gte</var></code> | number | 大于等于 |

### 处理 HTML 实体

HTML 实体是一段以"&"符号开始并以分号";"结束的文本（"字符串"）。实体通常用于显示保留字符（否则会被解释为 HTML 代码）和不可见字符（如不间断空格，例如 `&nbsp;`）。

要查找或与此类元素交互，请使用实体的 Unicode 等效项。例如：

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

您可以在 [HTML 规范](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references) 中找到所有 Unicode 引用。

**注意：** Unicode 不区分大小写，因此 `\u00a0` 和 `\u00A0` 都有效。要在浏览器检查中查找元素，请从 Unicode 中删除 `u`，例如：`div[data="Some\00a0Value"]`

## 浏览器匹配器

### toHaveUrl

检查浏览器是否在特定页面上。

##### 用法

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### 用法

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

检查网站是否有特定标题。

##### 用法

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

检查浏览器的剪贴板中是否存储了特定文本。

##### 用法

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## 元素匹配器

### toBeDisplayed

在给定元素上调用 [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/)。

##### 用法

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

在给定元素上调用 [`isExisting`](https://webdriver.io/docs/api/element/isExisting)。

##### 用法

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

与 `toExist` 相同。

##### 用法

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

与 `toExist` 相同。

##### 用法

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

检查元素是否有焦点。此断言仅在 Web 上下文中有效。

##### 用法

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

检查元素是否具有具有特定值的某个属性。

##### 用法

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

与 `toHaveAttribute` 相同。

##### 用法

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

检查元素是否具有单个类名。当元素可以有多个类名时，也可以使用数组作为参数调用。

##### 用法

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

检查元素是否具有特定属性。

##### 用法

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

检查输入元素是否具有特定值。

##### 用法

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

通过在元素上调用 [`isClickable`](https://webdriver.io/docs/api/element/isClickable) 检查元素是否可点击。

##### 用法

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

通过在元素上调用 [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) 检查元素是否被禁用。

##### 用法

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// same as
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

通过在元素上调用 [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) 检查元素是否启用。

##### 用法

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// same as
await expect(elem).not.toBeDisabled()
```

### toBeSelected

通过在元素上调用 [`isSelected`](https://webdriver.io/docs/api/element/isSelected) 检查元素是否已选择。

##### 用法

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

与 `toBeSelected` 相同。

##### 用法

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

检查元素是否有特定的计算 WAI-ARIA 标签。在元素可以有不同标签的情况下，也可以使用数组作为参数调用。

##### 用法

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### 用法

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

检查元素是否有特定的计算 WAI-ARIA 角色。在元素可以有不同标签的情况下，也可以使用数组作为参数调用。

##### 用法

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### 用法

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

检查链接元素是否有特定的链接目标。

##### 用法

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

与 `toHaveHref` 相同。

##### 用法

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

检查元素是否具有特定的 `id` 属性。

##### 用法

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

检查元素是否具有特定文本。在元素可以具有不同文本的情况下，也可以使用数组作为参数调用。

##### 用法

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

如果 div 中有一个元素列表：

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

您可以使用数组对它们进行断言：

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

检查元素是否具有特定文本。在元素可以具有不同文本的情况下，也可以使用数组作为参数调用。

##### 用法

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### 用法

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

通过在元素上调用 [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) 检查元素是否在视口内。

##### 用法

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

通过调用 `element.$('./*')` 命令检查获取元素的子元素数量。

##### 用法

```js
const list = await $('ul')
await expect(list).toHaveChildren() // the list has at least one item
// same as
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // the list has 3 items
// same as 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

检查元素是否具有特定宽度。

##### 用法

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

检查元素是否具有特定高度。

##### 用法

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

检查元素是否具有特定尺寸。

##### 用法

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

使用 [`$$`](https://webdriver.io/docs/api/element/$) 命令检查获取元素的数量。

**注意：** 如果断言通过，此匹配器将使用最新元素更新传递的数组。但是，如果您重新分配了变量，则需要再次获取元素。

##### 用法

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 items in the list

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// same as
assert.ok(listItems.length <= 10)
```

## 网络匹配器

### toBeRequested

检查是否调用了模拟

##### 用法

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

检查模拟是否被调用了预期的次数

##### 用法

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // request called at least 5 times but less than 11
```

### toBeRequestedWith

检查是否根据预期选项调用了模拟。

大多数选项支持 expect/jasmine 部分匹配器，如 [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### 用法

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [optional] string | function | custom matcher
    method: 'POST',                                 // [optional] string | array
    statusCode: 200,                                // [optional] number | array
    requestHeaders: { Authorization: 'foo' },       // [optional] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [optional] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [optional] object | function | custom matcher
    response: { success: true },                    // [optional] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // either POST or PUT
    statusCode: [401, 403],  // either 401 or 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## 快照匹配器

WebdriverIO 支持基本快照测试以及 DOM 快照测试。

### toMatchSnapshot

检查任意对象是否匹配特定值。如果传入 [`WebdriverIO.Element`](https://webdriver.io/docs/api/element)，它将自动对其 [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) 状态进行快照。

##### 用法

```js
// snapshot arbitrary objects (no "await" needed here)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot `outerHTML` of WebdriverIO.Element (DOM snapshot, requires "await")
await expect($('elem')).toMatchSnapshot()
// snapshot result of element command
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

同样，您可以使用 `toMatchInlineSnapshot()` 将快照内联存储在测试文件中。例如：

```js
await expect($('img')).toMatchInlineSnapshot()
```

WebdriverIO 不会创建快照文件，而是直接修改测试文件以将快照更新为字符串：

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## 视觉快照匹配器

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

以下匹配器是作为 `@wdio/visual-service` 插件的一部分实现的，仅在设置服务时可用。确保您按照[设置说明](https://webdriver.io/docs/visual-testing)正确操作。

### toMatchElementSnapshot

检查给定元素是否与基线快照匹配。

##### 用法

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // options
})
```

预期结果默认为 `0`，因此您可以将相同的断言写为：

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // options
})
```

或者完全不传递任何选项：

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

检查当前屏幕是否与基线快照匹配。

##### 用法

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // options
})
```

预期结果默认为 `0`，因此您可以将相同的断言写为：

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // options
})
```

或者完全不传递任何选项：

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

检查完整页面截图是否与基线快照匹配。

##### 用法

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // options
})
```

预期结果默认为 `0`，因此您可以将相同的断言写为：

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // options
})
```

或者完全不传递任何选项：

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

检查包含标签标记的完整页面截图是否与基线快照匹配。

##### 用法

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // options
})
```

预期结果默认为 `0`，因此您可以将相同的断言写为：

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // options
})
```

或者完全不传递任何选项：

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## 使用正则表达式

对于所有进行文本比较的匹配器，您也可以直接使用正则表达式。

##### 用法

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## 默认匹配器

除了 `expect-webdriverio` 匹配器外，您还可以使用内置的 Jest [expect](https://jestjs.io/docs/en/expect) 断言或 Jasmine 的 [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect)。

## 非对称匹配器

WebdriverIO 支持在比较文本值的任何地方使用非对称匹配器，例如：

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

或

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

如果您使用的是 [WDIO Testrunner](https://webdriver.io/docs/clioptions)，一切都将自动设置。只需按照文档中的[设置指南](https://webdriver.io/docs/typescript#framework-setup)操作即可。但是，如果您使用不同的测试运行器或在简单的 Node.js 脚本中运行 WebdriverIO，则需要在 `tsconfig.json` 中将 `expect-webdriverio` 添加到 `types` 中。

- `"expect-webdriverio"` 适用于除 Jasmine/Jest 用户以外的所有人。
- `"expect-webdriverio/jasmine"` 适用于 Jasmine
- `"expect-webdriverio/jest"` 适用于 Jest

## JavaScript (VSCode)

需要在项目根目录中创建 `jsconfig.json` 并引用类型定义，以使纯 js 中的自动完成功能正常工作。

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## 添加自己的匹配器

与 `expect-webdriverio` 扩展 Jasmine/Jest 匹配器的方式类似，也可以添加自定义匹配器。

- Jasmine 请参阅[自定义匹配器](https://jasmine.github.io/2.5/custom_matcher.html)文档
- 其他人请参阅 Jest 的 [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers)

自定义匹配器应该在 wdio `before` 钩子中添加

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - Jest example
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Temporary workaround. See https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```